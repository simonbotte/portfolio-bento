import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import jwt from "jsonwebtoken";
import { createAppleMusicService } from "../server/utils/apple-music.js";

const { privateKey, publicKey } = generateKeyPairSync("ec", {
    namedCurve: "P-256",
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
});
const config = {
    APPLE_TEAM_ID: "TESTTEAMID",
    APPLE_KEY_ID: "TESTKEYID1",
    APPLE_PRIVATE_KEY: Buffer.from(privateKey).toString("base64"),
    APPLE_USER_TOKEN: "test-user-token-never-public",
};
const attributes = {
    name: "Un morceau",
    artistName: "Un artiste",
    url: "https://music.apple.com/fr/album/un-morceau/123?i=456",
    artwork: { url: "https://is1-ssl.mzstatic.com/image/{w}x{h}bb.jpg" },
    privateMetadata: "not-public",
};
const track = {
    name: attributes.name,
    artistName: attributes.artistName,
    url: attributes.url,
    artworkUrl: "https://is1-ssl.mzstatic.com/image/100x100bb.jpg",
};
const appleResponse = (value = attributes) => Response.json({ data: [{ attributes: value }] });

async function fixture(t, options = {}) {
    const directory = await mkdtemp(join(tmpdir(), "portfolio-music-"));
    t.after(() => rm(directory, { recursive: true, force: true }));
    const cacheFile = join(directory, "music/last-played.json");
    const warnings = [];
    let time = Date.now();
    const settings = {
        cacheFile,
        now: () => time,
        logger: { warn: (message) => warnings.push(message) },
        ...options,
    };
    return {
        cacheFile,
        warnings,
        settings,
        advance: (milliseconds) => { time += milliseconds; },
        async seed() {
            await mkdir(dirname(cacheFile), { recursive: true });
            await writeFile(cacheFile, JSON.stringify({ track, updatedAt: time }));
        },
        service: (overrides = {}) => createAppleMusicService({ ...settings, ...overrides }),
    };
}

test("récupère et sauvegarde un morceau sans exposer les jetons", async (t) => {
    let calls = 0;
    const f = await fixture(t, {
        request: async (url, options) => {
            calls++;
            assert.equal(url, "https://api.music.apple.com/v1/me/recent/played/tracks?limit=1");
            assert.equal(options.headers["Music-User-Token"], config.APPLE_USER_TOKEN);
            const token = options.headers.Authorization.slice("Bearer ".length);
            const claims = jwt.verify(token, publicKey, { algorithms: ["ES256"], issuer: config.APPLE_TEAM_ID });
            assert.equal(claims.exp - claims.iat, 3_600);
            assert.ok(options.signal instanceof AbortSignal);
            return appleResponse();
        },
    });
    const service = f.service();
    const result = await service.getLastPlayed(config);
    assert.deepEqual(result.track, track);
    assert.ok(result.updatedAt);
    assert.deepEqual(await service.getLastPlayed(config), result);
    assert.equal(calls, 1);

    const saved = JSON.parse(await readFile(f.cacheFile, "utf8"));
    assert.deepEqual(saved.track, track);
    for (const value of [config.APPLE_USER_TOKEN, config.APPLE_PRIVATE_KEY, "privateMetadata"]) {
        assert.equal(JSON.stringify([result, saved, f.warnings]).includes(value), false);
    }
    assert.deepEqual(await readdir(dirname(f.cacheFile)), ["last-played.json"]);
});

test("retrouve le morceau sur disque après un redémarrage", async (t) => {
    const f = await fixture(t);
    const initial = await f.service({ request: async () => appleResponse() }).getLastPlayed(config);
    const restarted = f.service({ request: async () => assert.fail("Le cache est encore frais") });
    assert.deepEqual(await restarted.getLastPlayed(config), initial);
});

test("sert immédiatement le cache périmé et mutualise les actualisations concurrentes", async (t) => {
    const f = await fixture(t);
    await f.seed();
    f.advance(30_000);
    let completeRequest;
    let calls = 0;
    const service = f.service({
        request: () => {
            calls++;
            return new Promise((resolve) => { completeRequest = resolve; });
        },
    });
    const background = [];
    const waitUntil = (promise) => background.push(promise);
    const first = await service.getLastPlayed(config, waitUntil);
    const second = await service.getLastPlayed(config, waitUntil);
    assert.deepEqual(first.track, track);
    assert.deepEqual(second, first);
    assert.equal(calls, 1);

    completeRequest(appleResponse({ ...attributes, name: "Une nouvelle écoute" }));
    await Promise.all(background);
    const updated = await service.getLastPlayed(config);
    assert.equal(updated.track.name, "Une nouvelle écoute");
    assert.notEqual(updated.updatedAt, first.updatedAt);
    assert.deepEqual((await f.service().getLastPlayed(config)).track, updated.track);
});

test("le contrôle client récupère la nouvelle écoute dès la réponse, au bout de 30 secondes", async (t) => {
    let calls = 0;
    const f = await fixture(t, { request: async () => {
        calls++;
        return appleResponse({ ...attributes, name: "Le morceau suivant" });
    } });
    await f.seed();
    const service = f.service();
    f.advance(29_999);
    assert.deepEqual((await service.getLastPlayed(config, undefined, { waitForRefresh: true })).track, track);
    assert.equal(calls, 0);

    f.advance(1);
    const updated = await service.getLastPlayed(config, undefined, { waitForRefresh: true });
    assert.equal(updated.track.name, "Le morceau suivant");
    assert.equal(calls, 1);
    assert.deepEqual(JSON.parse(await readFile(f.cacheFile, "utf8")).track, updated.track);
    assert.deepEqual(await service.getLastPlayed(config, undefined, { waitForRefresh: true }), updated);
    assert.equal(calls, 1);
});

test("les contrôles clients concurrents attendent la même actualisation tandis que le rendu serveur reste immédiat", async (t) => {
    const f = await fixture(t);
    await f.seed();
    f.advance(30_000);
    let completeRequest;
    let calls = 0;
    const service = f.service({ request: () => {
        calls++;
        return new Promise((resolve) => { completeRequest = resolve; });
    } });
    const pendingClients = [
        service.getLastPlayed(config, undefined, { waitForRefresh: true }),
        service.getLastPlayed(config, undefined, { waitForRefresh: true }),
    ];
    const background = [];
    assert.deepEqual((await service.getLastPlayed(config, (promise) => background.push(promise))).track, track);
    assert.equal(calls, 1);
    completeRequest(appleResponse({ ...attributes, name: "Une nouvelle écoute" }));
    const clients = await Promise.all(pendingClients);
    assert.equal(clients[0].track.name, "Une nouvelle écoute");
    assert.deepEqual(clients[1], clients[0]);
    await Promise.all(background);
});

test("un contrôle client qui attend Apple conserve le morceau en cas de panne", async (t) => {
    const f = await fixture(t, { request: async () => new Response(null, { status: 503 }) });
    await f.seed();
    f.advance(30_000);
    assert.deepEqual((await f.service().getLastPlayed(config, undefined, { waitForRefresh: true })).track, track);
    assert.deepEqual(JSON.parse(await readFile(f.cacheFile, "utf8")).track, track);
});

test("conserve le cache lorsque Apple refuse l’authentification, sans relancer à chaque visite", async (t) => {
    for (const status of [401, 403]) {
        await t.test(`HTTP ${status}`, async (t) => {
            const f = await fixture(t);
            await f.seed();
            const originalFile = await readFile(f.cacheFile, "utf8");
            f.advance(5 * 60_000);
            let calls = 0;
            const service = f.service({ request: async () => {
                calls++;
                return new Response(null, { status });
            } });
            const background = [];
            const result = await service.getLastPlayed(config, (promise) => background.push(promise));
            await Promise.all(background);
            assert.deepEqual(result.track, track);
            assert.equal(await readFile(f.cacheFile, "utf8"), originalFile);
            f.advance(60_000);
            assert.deepEqual((await service.getLastPlayed(config)).track, track);
            assert.equal(calls, 1);
            assert.match(f.warnings[0], /Authentification refusée/);
            assert.equal(f.warnings.join().includes(config.APPLE_USER_TOKEN), false);
        });
    }
});

test("conserve le cache en cas de timeout, d’erreur réseau, de réponse vide ou invalide", async (t) => {
    const failures = [
        async () => { throw new DOMException("Timed out", "TimeoutError"); },
        async () => { throw new Error(`Network failure ${config.APPLE_USER_TOKEN}`); },
        async () => new Response(null, { status: 429 }),
        async () => new Response(null, { status: 503 }),
        async () => Response.json({ data: [] }),
        async () => new Response("not-json"),
        async () => appleResponse({ ...attributes, url: "javascript:alert(1)" }),
    ];
    for (const request of failures) {
        const f = await fixture(t, { request });
        await f.seed();
        f.advance(5 * 60_000);
        const background = [];
        const service = f.service();
        const result = await service.getLastPlayed(config, (promise) => background.push(promise));
        await Promise.all(background);
        assert.deepEqual(result.track, track);
        assert.deepEqual(JSON.parse(await readFile(f.cacheFile, "utf8")).track, track);
        assert.equal(f.warnings.join().includes(config.APPLE_USER_TOKEN), false);
    }
});

test("sans cache, une panne donne une réponse vide puis une nouvelle tentative récupère le morceau", async (t) => {
    let calls = 0;
    const f = await fixture(t, { request: async () => {
        calls++;
        return calls === 1 ? new Response(null, { status: 503 }) : appleResponse();
    } });
    const service = f.service();
    assert.deepEqual(await service.getLastPlayed(config), { track: null, updatedAt: null });
    assert.deepEqual(await service.getLastPlayed(config), { track: null, updatedAt: null });
    assert.equal(calls, 1);
    f.advance(60_000);
    assert.deepEqual((await service.getLastPlayed(config)).track, track);
    assert.equal(calls, 2);
});

test("une configuration absente ne fait aucun appel Apple et conserve le cache", async (t) => {
    const f = await fixture(t, { request: async () => assert.fail("Aucun jeton disponible") });
    await f.seed();
    f.advance(5 * 60_000);
    const background = [];
    const result = await f.service().getLastPlayed({}, (promise) => background.push(promise));
    await Promise.all(background);
    assert.deepEqual(result.track, track);
    assert.match(f.warnings[0], /Configuration incomplète/);
});

test("un cache corrompu est remplacé après une récupération réussie", async (t) => {
    const f = await fixture(t, { request: async () => appleResponse() });
    await mkdir(dirname(f.cacheFile), { recursive: true });
    await writeFile(f.cacheFile, "invalid-json");
    assert.deepEqual((await f.service().getLastPlayed(config)).track, track);
    assert.deepEqual(JSON.parse(await readFile(f.cacheFile, "utf8")).track, track);
});

test("un échec d’écriture ne masque pas le morceau récupéré", async (t) => {
    const f = await fixture(t, { request: async () => appleResponse() });
    await mkdir(f.cacheFile, { recursive: true });
    assert.deepEqual((await f.service().getLastPlayed(config)).track, track);
    assert.ok(f.warnings.some((message) => message.includes("Sauvegarde impossible")));
});
