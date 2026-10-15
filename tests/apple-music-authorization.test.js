import assert from "node:assert/strict";
import test from "node:test";
import { setupAuthorization } from "../scripts/apple-music-authorization-client.js";

async function page({ authorize = async () => "test-user-token", save = async () => Response.json({ saved: true }) } = {}) {
    const events = new Map();
    const elements = {
        "#connect": { disabled: true, addEventListener: (name, handler) => events.set(name, handler) },
        "#status": { textContent: "" },
        "#alternative": { hidden: true },
    };
    const requests = [];
    setupAuthorization({
        document: { querySelector: (selector) => elements[selector], addEventListener: () => {} },
        request: async (url, options) => {
            requests.push({ url, body: JSON.parse(options.body) });
            return url.endsWith("/diagnostic") ? Response.json({ received: true }) : save();
        },
        location: { pathname: "/private-path" },
        getMusicKit: () => ({ configure: async () => {}, getInstance: () => ({ authorize }) }),
        configuration: { developerToken: "test-developer-token" },
    });
    await Promise.resolve();
    assert.equal(elements["#connect"].disabled, false);
    await events.get("click")();
    return { elements, requests, message: elements["#status"].textContent };
}

test("un refus de MusicKit après autorisation ne lance aucune sauvegarde", async () => {
    const result = await page({ authorize: async () => {
        throw Object.assign(new Error("Details containing a secret token"), { name: "AUTHORIZATION_ERROR" });
    } });
    assert.match(result.message, /AUTHORIZATION_ERROR/);
    assert.match(result.message, /Aucun jeton n’a été reçu/);
    assert.equal(result.requests.some(({ url }) => url.endsWith("/token")), false);
    assert.equal(JSON.stringify(result.requests).includes("secret token"), false);
    assert.equal(result.elements["#alternative"].hidden, false);
    assert.equal(result.elements["#connect"].disabled, false);
});

test("un résultat vide d’Apple ne lance aucune sauvegarde", async () => {
    const result = await page({ authorize: async () => undefined });
    assert.match(result.message, /n’a pas fourni de jeton/);
    assert.equal(result.requests.some(({ url }) => url.endsWith("/token")), false);
    assert.ok(result.requests.some(({ body }) => body.code === "MISSING_USER_TOKEN"));
});

test("une connexion réussie transmet le jeton uniquement à la route locale de sauvegarde", async () => {
    const result = await page();
    assert.match(result.message, /Compte reconnecté/);
    assert.equal(result.elements["#connect"].disabled, true);
    assert.deepEqual(result.requests.filter(({ url }) => url.endsWith("/token")), [
        { url: "/private-path/token", body: { token: "test-user-token" } },
    ]);
    assert.equal(JSON.stringify(result.requests.filter(({ url }) => url.endsWith("/diagnostic"))).includes("test-user-token"), false);
});

test("une erreur d’écriture du serveur est affichée distinctement de la connexion Apple", async () => {
    const message = "Apple a accepté la connexion, mais l’écriture du fichier .env a échoué (EACCES).";
    const result = await page({ save: async () => Response.json({ code: "EACCES", message }, { status: 500 }) });
    assert.equal(result.message, message);
    assert.equal(result.elements["#connect"].disabled, false);
});

test("un serveur arrêté est signalé sans accuser l’authentification Apple", async () => {
    const result = await page({ save: async () => { throw new TypeError("Failed to fetch"); } });
    assert.match(result.message, /serveur local est injoignable/);
    assert.match(result.message, /npm run authorize:music/);
    assert.equal(result.elements["#connect"].disabled, false);
});

test("une réponse non JSON est identifiée avec son statut HTTP", async () => {
    const result = await page({ save: async () => new Response("Forbidden", { status: 403 }) });
    assert.match(result.message, /réponse inattendue \(HTTP 403\)/);
    assert.equal(result.elements["#connect"].disabled, false);
});

test("un refus du nouveau jeton par Apple conserve l’explication du serveur", async () => {
    const message = "La connexion a fourni un jeton, mais Apple refuse l’accès aux écoutes (HTTP 403).";
    const result = await page({ save: async () => Response.json({ code: "APPLE_HTTP_403", message }, { status: 400 }) });
    assert.equal(result.message, message);
    assert.equal(result.elements["#alternative"].hidden, true);
});
