import { randomBytes, randomUUID } from "node:crypto";
import { readFile, rename, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";

const config = process.env;
if (!config.APPLE_TEAM_ID || !config.APPLE_KEY_ID || !config.APPLE_PRIVATE_KEY) {
    throw new Error("Renseigner APPLE_TEAM_ID, APPLE_KEY_ID et APPLE_PRIVATE_KEY dans .env avant de continuer.");
}

function developerToken() {
    return jwt.sign({}, Buffer.from(config.APPLE_PRIVATE_KEY, "base64").toString("utf8"), {
        algorithm: "ES256",
        expiresIn: "1h",
        issuer: config.APPLE_TEAM_ID,
        header: { kid: config.APPLE_KEY_ID },
    });
}
developerToken(); // Validate the signing key before starting the local server.
const secretPath = `/${randomBytes(24).toString("hex")}`;
const envFile = fileURLToPath(new URL("../.env", import.meta.url));
let origin;
let saving = false;
let diagnostic = { stage: "ready", code: null };

function json(response, status, value) {
    response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(value));
}

async function readJson(request) {
    let body = "";
    for await (const chunk of request) {
        body += chunk;
        if (Buffer.byteLength(body) > 16_384) throw new Error("Request too large");
    }
    return JSON.parse(body);
}

function report(stage, code) {
    diagnostic = { stage, code };
    console.log(`[Apple Music] ${stage}${code ? ` (${code})` : ""}`);
}

async function saveUserToken(token) {
    const contents = await readFile(envFile, "utf8");
    const assignment = `APPLE_USER_TOKEN=${JSON.stringify(token)}`;
    const pattern = /^[\t ]*(?:export[\t ]+)?APPLE_USER_TOKEN[\t ]*=.*$/gm;
    let updated = pattern.test(contents)
        ? contents.replace(pattern, () => assignment)
        : `${contents.trimEnd()}\n${assignment}\n`;
    updated = updated.replace(/^[\t ]*(?:export[\t ]+)?NUXT_APPLE_USER_TOKEN[\t ]*=.*$/gm,
        () => `NUXT_${assignment}`);
    const temporaryFile = `${envFile}.${randomUUID()}.tmp`;
    try {
        await writeFile(temporaryFile, updated, { mode: 0o600 });
        await rename(temporaryFile, envFile);
    } finally {
        await rm(temporaryFile, { force: true }).catch(() => {});
    }
}

const server = createServer(async (request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    response.setHeader("X-Frame-Options", "DENY");
    response.setHeader("X-Content-Type-Options", "nosniff");

    if (request.headers.host !== new URL(origin).host) {
        json(response, 403, { code: "INVALID_HOST", message: "Adresse locale refusée. Utilise l’URL affichée dans le terminal." });
        return;
    }

    const url = new URL(request.url, origin);
    if (request.method === "GET" && url.pathname === secretPath) {
        try {
            const sdkVersion = url.searchParams.get("sdk") === "v1" ? "v1" : "v3";
            const template = await readFile(new URL("./apple-music-authorization.html", import.meta.url), "utf8");
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end(template
                .replaceAll("__BASE_PATH__", secretPath)
                .replaceAll("__SDK_VERSION__", sdkVersion)
                .replaceAll("__OTHER_SDK__", sdkVersion === "v3" ? "v1" : "v3")
                .replace("__CONFIGURATION__", JSON.stringify({ developerToken: developerToken(), sdkVersion })));
        } catch {
            json(response, 500, { code: "PAGE_UNAVAILABLE", message: "Impossible de charger la page locale. Relance l’outil." });
        }
        return;
    }

    if (request.method === "GET" && url.pathname === `${secretPath}/client.js`) {
        response.setHeader("Content-Type", "text/javascript; charset=utf-8");
        response.end(await readFile(new URL("./apple-music-authorization-client.js", import.meta.url), "utf8"));
        return;
    }

    if (request.method === "GET" && url.pathname === `${secretPath}/diagnostic`) {
        json(response, 200, diagnostic);
        return;
    }

    if (request.method !== "POST" || request.headers.origin !== origin) {
        json(response, 403, { code: "LOCAL_REQUEST_REJECTED", message: "Requête locale refusée. Recharge la page depuis l’URL du terminal." });
        return;
    }

    if (url.pathname === `${secretPath}/diagnostic`) {
        try {
            const value = await readJson(request);
            const stages = ["authorizing", "authorization-failed", "authorization-succeeded", "configuration-failed"];
            if (!stages.includes(value.stage)) throw new Error("Invalid stage");
            const code = typeof value.code === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(value.code)
                ? value.code : null;
            report(value.stage, code);
            json(response, 200, { received: true });
        } catch {
            json(response, 400, { code: "INVALID_DIAGNOSTIC" });
        }
        return;
    }

    if (url.pathname !== `${secretPath}/token` || saving) {
        json(response, saving ? 409 : 404, { code: saving ? "SAVE_IN_PROGRESS" : "NOT_FOUND", message: "Une sauvegarde est déjà en cours ou la page a expiré. Recharge la page." });
        return;
    }

    saving = true;
    let stage = "request";
    try {
        const { token } = await readJson(request);
        if (typeof token !== "string" || !token.trim() || /[\r\n"\\]/.test(token)) {
            json(response, 400, { code: "MISSING_USER_TOKEN", message: "Apple n’a pas fourni de jeton utilisateur valide. Aucune sauvegarde n’a été effectuée." });
            return;
        }
        stage = "apple-validation";
        report(stage, null);
        const apple = await fetch("https://api.music.apple.com/v1/me/recent/played/tracks?limit=1", {
            headers: { Authorization: `Bearer ${developerToken()}`, "Music-User-Token": token },
            signal: AbortSignal.timeout(5_000),
        });
        if (!apple.ok) {
            const code = `APPLE_HTTP_${apple.status}`;
            report(stage, code);
            json(response, 400, { code, message: `La connexion a fourni un jeton, mais Apple refuse l’accès aux écoutes (HTTP ${apple.status}). Le fichier .env n’a pas été modifié.` });
            return;
        }
        stage = "saving";
        report(stage, null);
        await saveUserToken(token);
        json(response, 200, { saved: true });
        console.log("Compte réautorisé. APPLE_USER_TOKEN a été mis à jour dans .env ; aucun jeton n’est affiché.");
        server.close();
    } catch (error) {
        const code = typeof error.code === "string" && /^[A-Z0-9_]{1,32}$/.test(error.code)
            ? error.code : error.name === "TimeoutError" ? "TIMEOUT" : "REQUEST_FAILED";
        report(stage, code);
        const message = stage === "saving"
            ? `Apple a accepté la connexion, mais l’écriture du fichier .env a échoué (${code}). Vérifie les droits du projet.`
            : stage === "apple-validation"
                ? `La vérification auprès d’Apple a échoué (${code}). Le fichier .env n’a pas été modifié.`
                : "Le serveur local a reçu une requête invalide. Recharge la page et recommence.";
        json(response, stage === "saving" ? 500 : 400, { stage, code, message });
    } finally {
        saving = false;
    }
});

server.requestTimeout = 15_000;
server.listen(0, "127.0.0.1", () => {
    origin = `http://127.0.0.1:${server.address().port}`;
    console.log(`Ouvre cette page locale pour réautoriser Apple Music :\n${origin}${secretPath}`);
    console.log("Le serveur est accessible uniquement depuis cet ordinateur. Ctrl+C pour annuler.");
});
