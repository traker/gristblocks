# GristBlocks — État du développement

**Mise à jour documentaire : 11 novembre 2026**
**Dernier jalon local confirmé : P5.3.2, commit `641a948` (non poussé)**

> **Attention à la provenance :** ce document décrit aussi des validations effectuées dans le dépôt de développement **Lowcoder local**, sur la branche `gristblocks/p1-runtime-sync`. Il ne constitue pas une preuve que le code correspondant se trouve sur la branche `main` du dépôt public `traker/gristblocks`. Au moment de la revue documentaire, ce dépôt public contient essentiellement sa documentation et sa licence.

## Objectif et architecture

Construire et exécuter des interfaces métier pour Grist avec un Studio visuel et un runtime Lowcoder standalone, **sans serveur Lowcoder**.

```text
Grist (tables / colonnes / formules / permissions / persistance)
             ↕
GristBlocks bridge (mapping / bindings / actions)
             ↕
Lowcoder standalone (DSL / composants / réactivité)
             ↑
GristBlocks Studio (édition visuelle du DSL)
```

Le Studio et le Runtime ont des responsabilités distinctes. Le démonstrateur de maintenance utilisant `Projects` sert aux tests et ne doit pas imposer de logique métier au bridge générique.

## Historique des validations

### P1 — Runtime et lecture

- Chargement du DSL Lowcoder JSON et exécution du runtime React standalone.
- Intégration dans un Grist Custom Widget.
- Lecture Grist via `onRecords` et `fetchTable` en repli.
- Alimentation réactive de la table Lowcoder sans réinitialiser les Inputs.
- Synchronisation des données après initialisation du modèle.

### P2 — Interactions

- Lecture des valeurs de composants et de `selectedRow`.
- Action `triggerHostEvent` et interception côté hôte.
- Bindings déclaratifs des champs du formulaire depuis la ligne sélectionnée.

### P3 — Écriture

- Construction d'un payload depuis la sélection et les Inputs.
- Écriture Grist via `applyUserActions`, après confirmation.
- Tests réussis sur `ndevis` (chaîne) et `actif` (booléen), séparément et ensemble.
- Propagation des mises à jour observée entre deux instances du widget.

### P4 — Configuration déclarative du démonstrateur

- **P4.1** : `src/gristblocks/columnMapping.ts` — `mapColumns()`, correspondances de colonnes et `booleanLabels`.
- **P4.2** : `src/gristblocks/recordActions.ts` — `buildUpdateRecordAction()`, validation de la table, de l'ID et des champs.
- **P4.3** : `src/gristblocks/writeBindings.ts` — bindings d'écriture, transformations `booleanFromLabels`, tests de synchronisation.
- **P4.5.1** : séparation de la configuration métier dans un module TypeScript, **validée par build et test**, selon le cadrage produit du 9 novembre 2026.

**Traçabilité à compléter :** les commits et validations détaillés de P4.4 et des éventuelles étapes intermédiaires ne sont pas établis par les documents publics consultés. Ne pas les déclarer terminés sans vérification de l'historique local.

### P5.1 — Audit du builder Lowcoder

- Exploration des mécanismes frontend natifs et de leurs dépendances au serveur.
- Choix d'un Studio léger réutilisant le DSL, les composants et les actions Lowcoder plutôt que de reproduire le builder complet.

### P5.2 — Studio autonome et premier Input

- Création du Studio autonome, `DslStore` et `LowcoderPreview`.
- Rendu d'un Input natif et édition de son libellé par les actions du modèle Lowcoder.
- Déplacement et redimensionnement avec synchronisation du layout dans le DSL.
- Conservation des modifications après plusieurs actions.
- Commit local de référence pour le Studio : `43b8f3a` (d'après l'historique de développement transmis).

### P5.3.1 — Ajout natif d'un Button

- `DslStore.addButton()` utilise `simpleContainerAddAction` et `defaultLayout`.
- Ajout atomique dans `ui.items` et `ui.layout` sans mutation directe du DSL.
- Commit local : `dffcc0c`.

### P5.3.2 — Plusieurs composants et placement stable

- Ajout de Buttons avec noms uniques (`submitButton`, `submitButton2`, etc.).
- Commande temporaire « Ajouter un Button » dans le Studio.
- Input et Buttons visibles simultanément et déplaçables via le mécanisme natif Lowcoder.
- Placement côte à côte, sans chevauchement persistant observé dans le DSL.
- Retrait de règles CSS perturbant le drag (`min-height: 50px` et `top: 0; left: 0`) ; maintien du positionnement relatif du wrapper.
- Ajustement initial des hauteurs observé, suivi de dimensions stables durant les déplacements testés ; ne pas présenter cette observation comme une garantie pour tous les composants.
- **Validation locale : 29 tests / 6 suites réussis, build réussi, `git diff --check` propre.**
- **Commit local : `641a948f8f0e3800e903c70a7f03aaeef2456f67`**, branche `gristblocks/p1-runtime-sync`, **non poussé** au moment du compte rendu.

## Ce qui reste à réaliser dans le Studio

Les capacités du démonstrateur Runtime ne doivent pas être confondues avec des fonctionnalités configurables dans le Studio :

- Sélection native exploitable d'un Input ou Button dans le canvas et inspecteur contextuel multi-composants.
- Sélection visuelle d'une table et d'une colonne Grist.
- Génération et édition visuelle des bindings Grist.
- Propriétés et actions essentielles du Button, puis ajout de Table.
- Enregistrement et rechargement des interfaces, bindings et métadonnées dans Grist.
- Réédition, duplication et templates.
- Contrôles de sécurité du DSL chargé : empêcher les scripts utilisateur et les requêtes externes configurables, y compris lorsqu'un DSL est modifié ou importé.

## Proposition de suite — à valider

| Étape proposée | Objectif | Statut |
| --- | --- | --- |
| P5.3.3 | Sélection native Input/Button dans le Studio | Proposition, non commencée |
| P5.3.4 | Inspecteur contextuel du composant sélectionné | Proposition, non commencée |
| Étape à numéroter | Sélecteurs visuels table/colonne Grist et bindings | Objectif produit initial P5.3, non réalisé dans le Studio |
| Étapes ultérieures | Actions, Table, persistance Grist, réédition et templates | À cadrer |

L'ordre ci-dessus est une **proposition de plan**, pas une décision déjà validée. Avant toute nouvelle implémentation, confirmer le périmètre de la prochaine étape.

## Limites et points de vigilance

- La configuration du démonstrateur reste distincte de la configuration visuelle future du Studio.
- Un second DSL et une autre table Grist n'ont pas été confirmés comme validés par les documents publics examinés.
- Les écritures peuvent réécrire des champs configurés même s'ils n'ont pas été modifiés ; les conflits concurrents et la politique des valeurs nulles restent à étudier.
- Un écart visuel résiduel entre hauteur du contenu et hauteur allouée par la grille a été documenté après P5.3.2, sans corruption du DSL observée.
- Les tests Jest ont présenté un pic mémoire local élevé (~15 Go). Son origine exacte nécessite un profilage avant toute affirmation définitive ; ce sujet n'a pas bloqué la validation de P5.3.2.
- La comparaison en navigateur avec le builder Lowcoder complet n'a pas été effectuée lors des diagnostics de drag.

## Méthode et disponibilité du code

**Une modification → tests → validation utilisateur → commit.** Pas de push sans autorisation.

Le code P5 décrit ici appartient à l'environnement de développement Lowcoder local. La documentation publiée dans `traker/gristblocks` ne doit pas être interprétée comme une publication du code ou d'une version installable de GristBlocks.