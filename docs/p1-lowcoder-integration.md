# P1.2 — Intégration du véritable Runtime Lowcoder

## Entrée confirmée
Le fichier `apps/runtime-poc/src/fixtures/maintenance-control.json` est un export d'application contenant une enveloppe `applicationName`, `applicationType` et `applicationDSL`. Le Runtime attend la valeur de `applicationDSL`, pas l'enveloppe.

## Source vérifiée
`lowcoder-org/lowcoder/client/packages/lowcoder/src/appView/AppViewInstance.tsx` :
- `AppViewInstanceOptions.appDsl` accepte un DSL local.
- `loadData()` clone `appDsl` et saute l'appel HTTP `/api/applications/{id}/view` quand il est fourni.
- L'absence de cet appel précis ne garantit pas zéro autre requête réseau.

`client/packages/lowcoder/src/appView/AppView.tsx` :
- `RootComp` reçoit `initialValue: dsl`.
- Le rendu dépend aussi de `lowcoder-core`, du store Redux, du routeur et d'autres modules.

## Point d'attention majeur
Le package `lowcoder` est un package privé du monorepo et dépend de packages `workspace:^` (`lowcoder-core`, `lowcoder-design`). Un simple `npm install lowcoder` n'est pas une méthode d'intégration vérifiée. Il faut construire depuis le workspace Lowcoder ou créer une extraction contrôlée des dépendances.

## Étapes suivantes
1. Figer le commit Lowcoder et vérifier sa licence.
2. Construire le workspace Lowcoder dans un environnement Node/Yarn compatible.
3. Exposer `bootstrapAppAt` ou `AppViewInstance` depuis un bundle dédié.
4. Fournir `exportedApplication.applicationDSL` comme `appDsl`.
5. Tester le rendu, les interactions et toutes les requêtes réseau.
6. Vérifier l'exécution dans le sandbox Grist.

## Statut
Le JSON est maintenant réellement lu par la page Vite. Cela valide seulement l'import et l'inspection de la structure JSON, pas le moteur Lowcoder.
