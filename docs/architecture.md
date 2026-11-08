# Architecture GristBlocks — P1

## Objectif
Exécuter une application Lowcoder à partir d'un DSL local, sans backend Lowcoder obligatoire, puis l'intégrer dans un widget Grist.

## Composants
- `apps/runtime-poc`: banc d'essai React/Vite.
- `packages/lowcoder-runtime`: couche d'intégration Lowcoder, à implémenter après validation du build.
- `packages/grist-bridge`: future interface vers l'API Widget Grist.
- `apps/grist-widget`: future entrée iframe Grist.

## Points d'entrée Lowcoder audités
- `client/packages/lowcoder/src/appView/AppViewInstance.tsx`: option `appDsl` permettant de fournir directement un DSL.
- `client/packages/lowcoder/src/appView/AppView.tsx`: composant recevant un `dsl`.
- `client/packages/lowcoder/src/pages/editor/appEditorInternal.tsx`: sérialisation du Studio via `comp.toJsonValue()`.

Source : https://github.com/lowcoder-org/lowcoder

## Contraintes
- Ne pas modifier Grist core.
- Ne pas introduire de dépendance à Lowcoder Cloud.
- Ne pas confondre affichage statique et fonctionnement complet du Runtime.
- Auditer les requêtes réseau, l'authentification, les plugins, les modules et les événements.
- Conserver les mentions de licence et de provenance du code Lowcoder (AGPL-3.0).

## Stratégie
1. Valider le bundling minimal du Runtime Lowcoder.
2. Fournir un DSL local valide, provenant d'un export Lowcoder.
3. Vérifier le rendu et les interactions sans backend.
4. Tester le bundle dans le sandbox Grist.
5. Ajouter le Grist Bridge progressivement.
