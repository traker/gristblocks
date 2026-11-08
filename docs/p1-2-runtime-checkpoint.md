# P1.2 — Point de sauvegarde du Runtime Lowcoder

Date : 2026-11-08. Branche de travail : `p1/runtime-poc`.

## Résultats observés localement

- Le DSL exporté **Maintenance control** est accessible, avec **14 composants** (9 text, 1 table, 2 input, 1 select, 1 button).
- Le frontend Lowcoder a été compilé dans le clone local.
- Un serveur **Vite minimal** sur le port 8200 affiche une page HTML indépendante et une page React indépendante.
- Avec les alias TypeScript des packages du monorepo, le support SVGR, le plugin `globalDepPlugin()` et plusieurs constantes `REACT_APP_*` définies pour le test, `LowcoderAppView` affiche le formulaire à partir de `maintenanceControl.applicationDSL`.
- L'utilisateur a confirmé le fonctionnement des champs et du menu déroulant, sans erreur bloquante.
- Le backend Lowcoder n'était pas lancé pendant ce test.

**Limites :** des avertissements React (mise à jour d'état avant montage) et des messages de diagnostic `cacheUtils.ts` subsistent. L'absence de toute dépendance réseau, notamment WebSocket, n'est pas encore entièrement démontrée. P1.3 (iframe Grist) n'a pas commencé.

## Fichiers locaux à préserver

Dans le clone `lowcoder/client/packages/lowcoder` :

- `vite.gristblocks-probe.mts` — configuration Vite qui fonctionne (à copier **telle quelle**).
- `gristblocks-runtime.html` — page du Runtime.
- `src/gristblocks-test.tsx` — point d'entrée React qui importe `LowcoderAppView`.
- `src/gristblocks-maintenance.json` — copie du DSL de test.

Les fichiers de diagnostic `gristblocks-probe.html`, `gristblocks-react-probe.html` et `src/gristblocks-react-probe.tsx` sont facultatifs.

Ces fichiers **ne sont pas automatiquement présents dans le dépôt GristBlocks**. Les copier depuis le poste de développement, sans reconstituer approximativement leur contenu, puis les committer sur `p1/runtime-poc`.

## Reprise des travaux

1. Préserver les quatre fichiers ci-dessus dans `apps/runtime-poc/lowcoder-local/` du dépôt GristBlocks.
2. Noter que les imports relatifs dans `src/gristblocks-test.tsx` restent conçus pour le clone Lowcoder ; la copie est un **instantané de référence**, pas un projet autonome directement exécutable.
3. Conserver le DSL existant dans `apps/runtime-poc/src/fixtures/maintenance-control.json`.
4. Relancer le serveur minimal depuis `lowcoder/client/packages/lowcoder` avec `corepack yarn vite --config vite.gristblocks-probe.mts --force`, puis ouvrir `http://127.0.0.1:8200/gristblocks-runtime.html`.
5. Vérifier le formulaire et les requêtes réseau, puis préparer l'empaquetage pour l'iframe Grist (P1.3).

Ne pas démarrer de backend Lowcoder pour masquer des dépendances ; isoler et documenter les éventuels appels réseau.
