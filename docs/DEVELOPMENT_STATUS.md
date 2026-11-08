# GristBlocks — État du développement

**Mise à jour :** 8 novembre 2026  
**État :** P4.3 validé en test ; reprise prévue à P4.4

> Ce document suit les étapes validées dans l'environnement de développement. Le runtime et les modules `src/gristblocks/` sont encore développés dans le dépôt Lowcoder local ; leur présence dans ce dépôt GitHub n'est pas impliquée par ce récapitulatif.

## Objectif

Exécuter un DSL JSON Lowcoder dans un widget Grist, sans serveur Lowcoder.

- **Grist** : données, permissions, persistance.
- **Lowcoder** : interface React, composants, expressions réactives.
- **GristBlocks** : bridge générique entre Grist et Lowcoder.

La table `Projects` et l'application de maintenance constituent un démonstrateur, pas une dépendance cible du bridge.

## Étapes validées

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

### P4.1 — Mapping déclaratif de lecture

**Module :** `src/gristblocks/columnMapping.ts`

- `mapColumns()` : correspondance configurable source → cible.
- Transformation `booleanLabels` pour l'affichage.
- Table, sélection et champs réactifs validés après intégration.

### P4.2 — Construction générique d'actions

**Module :** `src/gristblocks/recordActions.ts`

- `buildUpdateRecordAction()` construit une action `UpdateRecord`.
- Vérification de la table, de l'identifiant et de la présence de champs.
- Écritures réelles validées.

### P4.3 — Bindings déclaratifs d'écriture

**Module :** `src/gristblocks/writeBindings.ts`

- Configuration colonne Grist → composant et propriété Lowcoder.
- `transformWriteValue()` : conversion `booleanFromLabels`, avec erreur si valeur invalide.
- `resolveWriteFields()` : lecture des valeurs courantes et résolution des champs.
- Tests validés : chaîne, booléen, écriture mono-/multichamp et synchronisation.
- Validation et confirmation conservées avant écriture.

## Architecture en cours

```text
Grist (onRecords / fetchTable / applyUserActions)
             ↕
GristBlocks (mapping / bindings / actions)
             ↕
Lowcoder standalone (DSL JSON / UI / réactivité)
```

Le démonstrateur est actuellement intégré au dépôt de développement Lowcoder, notamment dans `src/gristblocks-test.tsx`. Les modules génériques sont développés sous `src/gristblocks/` dans cet environnement.

## Limites et points de vigilance

- La configuration est encore déclarée dans le code du démonstrateur, non chargée depuis un fichier externe.
- Un second DSL et une autre table Grist n'ont pas encore été validés.
- Les écritures peuvent réécrire des champs configurés même s'ils n'ont pas été modifiés.
- Pas de gestion spécifique des conflits d'écriture concurrents.
- Les propriétés exposées autres que `value` restent à valider pour l'écriture.
- Les valeurs nulles et les conversions de types nécessitent une politique plus générale.

## Reprise — P4.4 : configuration globale

Regrouper dans une configuration cohérente :

1. La table Grist source et le composant Lowcoder cible.
2. Les mappings de lecture et leurs transformations.
3. Les bindings d'écriture et leurs transformations.
4. Les événements qui déclenchent les actions.

**Critère de réussite à terme :** exécuter un autre DSL Lowcoder avec une autre table Grist sans modifier le code générique du bridge.

## Méthode

**Une modification → un test → une validation → un commit.**

Éviter d'introduire des règles propres à l'application de maintenance dans les modules génériques.
