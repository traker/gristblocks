# GristBlocks

**GristBlocks** est un projet de constructeur visuel d'interfaces métier pour [Grist](https://www.getgrist.com/), utilisant les composants et le DSL de Lowcoder **sans serveur Lowcoder**.

Le projet vise à permettre de concevoir une interface dans un **Studio**, de l'exécuter dans un **Runtime** séparé, et de lire ou modifier les données métier via les API de Grist. Grist reste la source de vérité pour les tables, colonnes, formules, permissions et données.

## État du projet

Le développement est **en cours**. Un démonstrateur Runtime a validé des lectures, interactions et écritures Grist ; un Studio local permet déjà de rendre et déplacer des Inputs et Buttons natifs Lowcoder. Les liaisons visuelles aux tables et colonnes Grist, la persistance des interfaces et les contrôles de sécurité du chargement des DSL restent à développer ou à finaliser.

**Important :** ces validations proviennent d'un environnement de développement Lowcoder local. Leur code n'est pas nécessairement présent dans ce dépôt GitHub public, qui ne constitue pas encore une distribution installable du Studio ou du Runtime. Aucune procédure d'installation publique n'est annoncée à ce stade.

## Documentation

- [Vision produit et périmètre](docs/PRODUCT_VISION.md) — objectifs, architecture, exclusions et jalons de cadrage.
- [État du développement](docs/DEVELOPMENT_STATUS.md) — réalisations vérifiées, limites et prochaines étapes proposées.

## Principes

- Réutiliser les mécanismes frontend natifs Lowcoder plutôt que créer un moteur ou un DSL parallèle.
- Garder le Studio distinct du Runtime.
- Ne pas exposer de JavaScript personnalisé ni de requêtes HTTP externes configurables aux utilisateurs ; la sécurité du chargement des DSL doit être vérifiée avant mise à disposition.
- Avancer par étapes : **une modification → tests → validation → commit**.