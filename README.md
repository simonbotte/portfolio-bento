# Portfolio de Simon Botté

Site construit avec Nuxt 4, Vue 3 et Tailwind CSS 4.

## Installation

Utiliser Node.js 24 LTS (version 24.15.0 minimum), comme le workflow GitHub Actions :

```bash
nvm install
nvm use
npm ci
```

Configurer le fichier local `.env` avec les variables `STRAPI_URL`, `STRAPI_TOKEN`,
`GOOGLE_ANALYTICS_ID`, `APPLE_TEAM_ID`, `APPLE_KEY_ID`, `APPLE_PRIVATE_KEY` et
`APPLE_USER_TOKEN` pour les intégrations Strapi, Google Analytics et Apple Music.

## Développement

```bash
npm run dev
```

Le site est accessible sur `http://localhost:3000`.

## Production

```bash
npm run build
npm run preview
```

La compilation produit un serveur Node.js dans `.output/server/index.mjs` et les
fichiers publics dans `.output/public`. Le serveur de production doit également
utiliser une version de Node.js compatible avec `engines.node` dans `package.json`.
La compilation charge le fichier `.env` ; le serveur compilé ne le charge pas
automatiquement.

Le workflow GitHub Actions installe les versions du `package-lock.json` avec
`npm ci`, compile le site avec Node.js 24, puis déploie le résultat sur Alwaysdata.

Tailwind CSS utilise le plugin Vite `@tailwindcss/vite`. Les couleurs, dimensions
et points de rupture du thème sont définis dans `assets/css/main.css`.

Les projets proviennent de Strapi, avec des ajouts locaux dans `data/projects.js`.
Si un projet local est ensuite ajouté à Strapi avec le même slug, la version Strapi
est utilisée pour éviter les doublons.

## Tuile Apple Music

La tuile appelle uniquement `GET /api/music/last-played`. Les jetons Apple restent
côté serveur ; les anciennes routes publiques `/api/security/apple-jwt` et
`/api/security/apple-user-token` sont supprimées.

La dernière écoute est sauvegardée dans `.data/music/last-played.json`, relativement
au dossier de démarrage du serveur. Ce dossier doit être accessible en écriture.
Sur Alwaysdata, démarrer le serveur depuis la racine du déploiement : le workflow
remplace `public` et `server`, mais conserve `.data`. Pour choisir un emplacement
indépendant du déploiement, définir `NUXT_APPLE_MUSIC_CACHE_FILE` sur un chemin
absolu dans les variables d’environnement du serveur Alwaysdata.

Le rendu serveur affiche immédiatement le morceau sauvegardé et déclenche une
actualisation en arrière-plan si les données ont plus de 30 secondes. La tuile
consulte `/api/music/last-played?fresh=1` au montage, toutes les 30 secondes tant que
l’onglet est visible, au retour sur la fenêtre et au rétablissement de la connexion.
Cette requête attend l’actualisation éventuelle pour afficher le nouveau morceau
dès sa réponse, sans effacer le morceau précédent pendant le chargement. Les
visiteurs partagent une actualisation Apple au maximum toutes les 30 secondes.
Il n’y a pas de tâche planifiée lorsque le site n’est pas consulté.
Les erreurs, délais d’attente et réponses vides d’Apple n’effacent jamais le dernier
morceau sauvegardé. Avant la première récupération réussie, un texte d’attente ou
d’indisponibilité s’affiche.

L’API utilisée renvoie l’historique des écoutes récentes : la tuile reflète le
dernier morceau publié dans cet historique, plutôt que l’état de lecture instantané
de l’app Musique. La documentation Apple ne garantit pas de délai de mise à jour :
[Get Recently Played Tracks](https://developer.apple.com/documentation/applemusicapi/get-v1-me-recent-played-tracks).

Le jeton développeur est signé automatiquement côté serveur. Le jeton utilisateur
`APPLE_USER_TOKEN` reste à réautoriser via MusicKit s’il est refusé par Apple : le
cache maintient alors l’affichage, mais les nouvelles écoutes ne peuvent pas être
récupérées avant cette réautorisation.

Pour réautoriser le compte depuis le projet local :

```bash
npm run authorize:music
```

Ouvrir l’URL locale affichée et cliquer sur « Se connecter avec Apple Music ».
L’outil écoute uniquement sur `127.0.0.1`, vérifie le nouveau jeton auprès d’Apple,
le sauvegarde dans `.env` sans l’afficher, puis s’arrête. Relancer le serveur local
pour prendre en compte ce jeton. Pour la production, mettre à jour le secret
GitHub Actions `APPLE_USER_TOKEN` et redéployer, ou définir `NUXT_APPLE_USER_TOKEN`
dans l’environnement du serveur et le redémarrer.

Si la connexion échoue après avoir autorisé l’accès dans la fenêtre Apple, la page
indique désormais si MusicKit n’a pas retourné de jeton, si Apple a refusé le jeton
ou si l’écriture de `.env` a échoué. Les étapes et codes d’erreur sont également
affichés dans le terminal, sans jetons ni détails de compte. Le lien « Essayer
l’autre version de la connexion Apple » permet de comparer MusicKit v3 avec la
version v1 utilisée dans l’exemple officiel de connexion d’Apple.

Les logs serveur signalent les refus d’authentification sans écrire les jetons.
La gestion du jeton utilisateur est documentée par
[Apple](https://developer.apple.com/documentation/applemusicapi/user-authentication-for-musickit).

Les scénarios de cache et de panne sont vérifiés avec `npm run test:music`.
