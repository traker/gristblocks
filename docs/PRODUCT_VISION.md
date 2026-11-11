# GristBlocks — Vision produit et périmètre

**Décision de cadrage : 9 novembre 2026**
**Revue documentaire : 11 novembre 2026**

## Vision

**GristBlocks est un constructeur visuel d'interfaces métier pour Grist, sans programmation personnalisée et sans serveur Lowcoder.**

L'utilisateur conçoit, utilise et modifie ses interfaces directement dans Grist. Lowcoder fournit le moteur de composants et le format DSL ; il n'est pas nécessaire de disposer d'une instance Lowcoder pour créer ou exécuter une application GristBlocks.

La priorité n'est donc **pas** d'importer des DSL créés dans une instance Lowcoder puis de rédiger manuellement des mappings JSON. Cette voie peut rester utile techniquement, mais elle n'est pas l'expérience utilisateur cible.

## Répartition des responsabilités

- **Grist** : source de vérité des données métier, tables, colonnes, formules Python, persistance et permissions.
- **GristBlocks Studio** : création et modification visuelles des interfaces, choix des tables et colonnes, configuration des propriétés, des liaisons et des actions prédéfinies.
- **GristBlocks Runtime** : chargement et exécution d'une interface, synchronisation des composants avec Grist, lecture et écriture via le bridge.
- **Lowcoder standalone** : moteur React de rendu, composants et réactivité. Le Studio produit un **DSL Lowcoder compatible**, sans inventer un DSL concurrent.

Le Studio et le Runtime doivent rester séparés : une interface publiée n'a pas besoin d'embarquer l'éditeur.

## Périmètre fonctionnel

### Inclus

- Construire une interface visuellement dans le widget GristBlocks.
- Choisir une table Grist dès la conception et lier ses colonnes aux composants via des sélecteurs.
- Ajouter et configurer progressivement des composants : **Input**, **Button**, **Table** pour commencer.
- Configurer des interactions et actions Grist prédéfinies, notamment la lecture, la sélection et la modification d'enregistrements.
- Afficher un aperçu, enregistrer, recharger et modifier une interface.
- À terme, conserver des applications/templates dans une ou plusieurs tables Grist, les dupliquer et les réutiliser.
- Exploiter les colonnes calculées par les **formules Python de Grist** plutôt que réimplémenter une logique métier dans GristBlocks.

### Exclus du périmètre initial

- **Aucune exécution de JavaScript personnalisé saisi par l'utilisateur.**
- **Aucune requête HTTP externe configurable par l'utilisateur**, pour le moment.
- Pas de ressources, connecteurs ou backend Lowcoder.
- Pas de reproduction complète du builder Lowcoder dès la première version.
- Pas de moteur de calcul métier parallèle à Grist.

Le JavaScript interne indispensable au runtime Lowcoder reste autorisé ; il ne doit pas devenir une capacité de scripting exposée aux utilisateurs. Les expressions et liaisons nécessaires à la réactivité peuvent être **générées par le Studio** à partir de choix visuels, sans éditeur libre de code.

**Exigence de sécurité :** masquer les options interdites dans le Studio ne suffit pas. Le chargement du DSL et la surface d'exécution doivent être étudiés et contrôlés pour empêcher l'exécution de scripts utilisateur ou de requêtes externes via un DSL importé ou modifié. Les mécanismes précis restent à concevoir et tester.

## Expérience utilisateur cible

1. Ajouter GristBlocks à un document Grist.
2. Ouvrir le Studio et choisir une table.
3. Ajouter quelques composants ou générer un formulaire simple depuis les colonnes.
4. Configurer visuellement les libellés, l'ordre, les liaisons et les actions.
5. Prévisualiser l'interface.
6. Enregistrer l'application dans Grist, puis la recharger, la dupliquer ou la modifier.

Le JSON (DSL + configuration des bindings + métadonnées) est un **format interne de stockage et d'échange**, pas une étape obligatoire pour l'utilisateur.

## Stratégie technique

Prendre le builder Lowcoder comme **référence** et réutiliser ses mécanismes frontend lorsqu'ils peuvent fonctionner sans serveur. Ne pas présumer que l'éditeur complet est autonome : identifier et tester séparément les dépendances de la palette, de la création de composants, de la sélection, de la mise en page et de l'édition de propriétés.

Si une fonction du builder dépend trop du backend, implémenter seulement la fonction minimale nécessaire dans le Studio. Ne pas réécrire le moteur de rendu.

## Jalons : cadrage initial et progression

Les jalons du 9 novembre 2026 décrivaient une **direction de travail**, non une liste de fonctionnalités déjà réalisées :

| Jalon initial | Objectif initial |
| --- | --- |
| P5.1 | Explorer le frontend du builder Lowcoder et ses dépendances serveur. |
| P5.2 | Ajouter un premier Input éditable (création, sélection, libellé, aperçu). |
| P5.3 | Sélectionner visuellement une table et une colonne Grist pour lier l'Input. |
| P5.4 | Étendre à Button et Table avec propriétés et actions essentielles. |
| P5.5 | Enregistrer et recharger DSL, bindings et métadonnées depuis une table Grist. |
| Suite | Réédition, duplication, templates, mise en page et nouveaux composants. |

**Évolution du séquencement :** le développement local a introduit un Button natif et stabilisé le placement de plusieurs composants avant de réaliser la sélection visuelle table/colonne Grist. Les numéros P5.3.1 et P5.3.2 désignent ces étapes locales validées ; ils ne signifient pas que l'objectif initial de liaison Grist de P5.3 est terminé.

Les prochaines sous-étapes **proposées, non encore approuvées**, sont la sélection native Input/Button (P5.3.3) puis un inspecteur contextuel (P5.3.4), avant les sélecteurs de table/colonne et les bindings visuels Grist. Les étapes ultérieures (actions, persistance, réédition, templates) restent à détailler après validation de leurs dépendances.

Pour l'état des réalisations et les références de commits, consulter [DEVELOPMENT_STATUS.md](DEVELOPMENT_STATUS.md).

L'externalisation d'un JSON de configuration (ancien P4.5.2) n'est pas la priorité produit immédiate.

## État de départ et méthode

Le démonstrateur de maintenance a validé le runtime standalone, les lectures et écritures Grist, les interactions réactives et la configuration déclarative. La séparation de la configuration métier dans un module TypeScript (P4.5.1) a été **validée par build et test**. La présence de ces modifications dans un commit local ou dans ce dépôt GitHub n'est pas présumée.

**Méthode : une modification → un test → une validation → un commit.** Conserver le démonstrateur comme test de non-régression, et ne pas introduire de logique spécifique à la maintenance dans le bridge générique.