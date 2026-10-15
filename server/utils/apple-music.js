import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import jwt from "jsonwebtoken";

const REFRESH_INTERVAL = 30_000;
const RETRY_INTERVAL = 60_000;
const AUTH_RETRY_INTERVAL = 5 * 60_000;

function httpsUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "https:" ? url.href : null;
    } catch {
        return null;
    }
}

function normalizeTrack(attributes) {
    if (!attributes || typeof attributes.name !== "string" || !attributes.name.trim()) {
        return null;
    }

    const url = httpsUrl(attributes.url);
    if (!url || new URL(url).hostname !== "music.apple.com") {
        return null;
    }

    const artwork = attributes.artwork?.url ?? attributes.artworkUrl;
    return {
        name: attributes.name,
        artistName: typeof attributes.artistName === "string" ? attributes.artistName : "",
        url,
        artworkUrl: typeof artwork === "string"
            ? httpsUrl(artwork.replaceAll("{w}", "100").replaceAll("{h}", "100"))
            : null,
    };
}

export function createAppleMusicService({
    cacheFile = resolve(process.cwd(), ".data/music/last-played.json"),
    request = globalThis.fetch,
    now = Date.now,
    logger = console,
} = {}) {
    let cached = null;
    let cacheLoaded;
    let pendingRefresh = null;
    let retryAfter = 0;

    function loadCache() {
        cacheLoaded ??= (async () => {
            try {
                const saved = JSON.parse(await readFile(cacheFile, "utf8"));
                const track = normalizeTrack(saved.track);
                if (track && Number.isFinite(saved.updatedAt) && saved.updatedAt > 0) {
                    cached = { track, updatedAt: Math.min(saved.updatedAt, now()) };
                }
            } catch (error) {
                if (error.code !== "ENOENT") {
                    logger.warn("[Apple Music] Cache illisible ; une nouvelle récupération sera tentée.");
                }
            }
        })();
        return cacheLoaded;
    }

    async function saveCache(snapshot) {
        const temporaryFile = `${cacheFile}.${process.pid}.${randomUUID()}.tmp`;
        try {
            await mkdir(dirname(cacheFile), { recursive: true, mode: 0o700 });
            await writeFile(temporaryFile, JSON.stringify(snapshot), { mode: 0o600 });
            await rename(temporaryFile, cacheFile);
        } catch {
            logger.warn("[Apple Music] Sauvegarde impossible ; vérifier les droits du dossier de cache.");
        } finally {
            await rm(temporaryFile, { force: true }).catch(() => {});
        }
    }

    async function refresh(config) {
        try {
            if (!config.APPLE_TEAM_ID || !config.APPLE_KEY_ID
                || !config.APPLE_PRIVATE_KEY || !config.APPLE_USER_TOKEN) {
                retryAfter = now() + AUTH_RETRY_INTERVAL;
                logger.warn("[Apple Music] Configuration incomplète ; dernière écoute conservée.");
                return;
            }

            const privateKey = Buffer.from(config.APPLE_PRIVATE_KEY, "base64").toString("utf8");
            const developerToken = jwt.sign({}, privateKey, {
                algorithm: "ES256",
                expiresIn: "1h",
                issuer: config.APPLE_TEAM_ID,
                header: { kid: config.APPLE_KEY_ID },
            });

            const response = await request("https://api.music.apple.com/v1/me/recent/played/tracks?limit=1", {
                headers: {
                    Authorization: `Bearer ${developerToken}`,
                    "Music-User-Token": config.APPLE_USER_TOKEN,
                },
                signal: AbortSignal.timeout(5_000),
            });

            if (!response.ok) {
                const authenticationFailed = response.status === 401 || response.status === 403;
                retryAfter = now() + (authenticationFailed ? AUTH_RETRY_INTERVAL : RETRY_INTERVAL);
                logger.warn(authenticationFailed
                    ? "[Apple Music] Authentification refusée ; vérifier les jetons et réautoriser le compte si nécessaire. Dernière écoute conservée."
                    : `[Apple Music] Réponse HTTP ${response.status} ; dernière écoute conservée.`);
                return;
            }

            const payload = await response.json();
            const track = Array.isArray(payload.data)
                ? payload.data.map((item) => normalizeTrack(item?.attributes)).find(Boolean)
                : null;

            if (!track) {
                retryAfter = now() + REFRESH_INTERVAL;
                return;
            }

            cached = { track, updatedAt: now() };
            retryAfter = 0;
            await saveCache(cached);
        } catch {
            // Do not log the request or error: they can contain authentication headers.
            retryAfter = now() + RETRY_INTERVAL;
            logger.warn("[Apple Music] Actualisation impossible ; dernière écoute conservée.");
        }
    }

    return {
        async getLastPlayed(config, waitUntil, { waitForRefresh = false } = {}) {
            await loadCache();

            const stale = !cached || now() - cached.updatedAt >= REFRESH_INTERVAL;
            if (stale && now() >= retryAfter) {
                pendingRefresh ??= refresh(config).finally(() => {
                    pendingRefresh = null;
                });

                if (cached && !waitForRefresh) {
                    // Serve the saved track immediately while Nitro finishes the refresh.
                    waitUntil?.(pendingRefresh);
                } else {
                    await pendingRefresh;
                }
            }

            return {
                track: cached?.track ?? null,
                updatedAt: cached ? new Date(cached.updatedAt).toISOString() : null,
            };
        },
    };
}
