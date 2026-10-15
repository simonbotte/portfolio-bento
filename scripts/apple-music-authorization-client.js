export function setupAuthorization({ document, request, location, getMusicKit, configuration }) {
    const button = document.querySelector("#connect");
    const status = document.querySelector("#status");
    const alternative = document.querySelector("#alternative");
    const headers = { "Content-Type": "application/json" };
    let initialized = false;

    const errorCode = (error) => {
        const value = error?.name ?? error?.code;
        return typeof value === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(value)
            ? value : "AUTHORIZATION_FAILED";
    };
    const report = (stage, code = null) => request(`${location.pathname}/diagnostic`, {
        method: "POST", headers, body: JSON.stringify({ stage, code }),
    }).catch(() => {});

    async function initialize() {
        if (initialized) return;
        initialized = true;
        try {
            await getMusicKit().configure({
                developerToken: configuration.developerToken,
                app: { name: "Portfolio de Simon Botte", build: "1.0" },
            });
            button.disabled = false;
            status.textContent = "Prêt à ouvrir la connexion sécurisée Apple.";
        } catch (error) {
            const code = errorCode(error);
            status.textContent = `MusicKit ne peut pas démarrer (${code}). Vérifie les identifiants développeur.`;
            alternative.hidden = false;
            void report("configuration-failed", code);
        }
    }

    document.addEventListener("musickitloaded", initialize);
    if (getMusicKit()) void initialize();

    button.addEventListener("click", async () => {
        button.disabled = true;
        alternative.hidden = true;
        status.textContent = "Termine la connexion dans la fenêtre Apple.";
        void report("authorizing");

        let token;
        try {
            // Keep authorize() directly in the click handler so the popup is allowed.
            token = await getMusicKit().getInstance().authorize();
        } catch (error) {
            const code = errorCode(error);
            status.textContent = `La connexion Apple n’a pas abouti (${code}). Aucun jeton n’a été reçu et le fichier .env n’a pas été modifié. Tu peux essayer l’autre version de la connexion Apple.`;
            alternative.hidden = false;
            button.disabled = false;
            void report("authorization-failed", code);
            return;
        }

        if (typeof token !== "string" || !token.trim()) {
            status.textContent = "Apple n’a pas fourni de jeton utilisateur. Le fichier .env n’a pas été modifié.";
            alternative.hidden = false;
            button.disabled = false;
            void report("authorization-failed", "MISSING_USER_TOKEN");
            return;
        }

        void report("authorization-succeeded");
        status.textContent = "Connexion reçue. Vérification auprès d’Apple et sauvegarde locale…";
        try {
            const response = await request(`${location.pathname}/token`, {
                method: "POST", headers, body: JSON.stringify({ token }),
            });
            let result;
            try {
                result = await response.json();
            } catch {
                status.textContent = `Le serveur local a renvoyé une réponse inattendue (HTTP ${response.status}). Relance l’outil et recharge la page.`;
                button.disabled = false;
                return;
            }
            if (!response.ok || !result.saved) {
                status.textContent = result.message || `La sauvegarde locale a échoué (HTTP ${response.status}).`;
                button.disabled = false;
                return;
            }
            status.textContent = "Compte reconnecté. Le fichier .env est mis à jour. Relance le serveur local ; pour la production, mets à jour le secret APPLE_USER_TOKEN puis redéploie.";
            button.textContent = "Compte reconnecté";
        } catch {
            status.textContent = "Connexion Apple terminée, mais le serveur local est injoignable. Relance npm run authorize:music et ouvre sa nouvelle URL.";
            button.disabled = false;
        }
    });
}

if (typeof window !== "undefined") {
    setupAuthorization({
        document,
        request: window.fetch.bind(window),
        location: window.location,
        getMusicKit: () => window.MusicKit,
        configuration: JSON.parse(document.querySelector("#configuration").textContent),
    });
}
