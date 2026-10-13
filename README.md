TP2 - To-Do List (Angular)
Application de gestion de tâches développée en Angular (composants standalone, Signals et formulaires réactifs) dans le cadre du cours de Framework JS.
---
Fonctionnalités principales
Gestion des tâches :
Ajout d'une tâche avec un titre obligatoire (minimum 3 caractères, hors espaces).
Ajout optionnel d'une description et d'une date d'échéance (validée : au plus tôt à la date du jour).
Marquage d'une tâche comme faite ou à faire (avec mise à jour en temps réel des compteurs).
Suppression d'une tâche.
Filtres, recherche et tri :
Filtrage par statut (Toutes, À faire, Faites).
Recherche textuelle instantanée sur le titre.
Tri automatique par date d'échéance (les tâches sans date sont rejetées à la fin), puis par ordre alphabétique du titre.
Persistance des données :
Sauvegarde automatique et transparente dans le `localStorage` du navigateur grâce à un service réactif et l'utilisation de `effect()`.
Routage :
Navigation fluide sans rechargement de page via Angular Router :
`/` : Vue principale (formulaire, filtres, recherche et liste des tâches).
`/stats` : Vue dédiée au tableau de bord et aux indicateurs clés (KPIs : total, faites, à faire, et pourcentage de réussite).
---
Exigences techniques
Framework : Angular (version moderne avec architecture standalone)
État réactif : Utilisation des `signal()` et des propriétés calculées `computed()`
Formulaires : Reactive Forms avec validateurs personnalisés
Style : CSS natif / minimaliste
---
Installation et Lancement
Suis ces étapes pour installer et lancer le projet sur ta machine :
Ouvrir le dossier du projet dans ton terminal :
```bash
   cd ton-dossier-tp2
   ```
Installer les dépendances :
```bash
   npm install
   ```
Lancer le serveur de développement :
```bash
   ng serve
   ```
Accéder à l'application :
Ouvre ton navigateur et rends-toi sur l'adresse : `http://localhost:4200/`
---
Structure du projet
```text
src/app/
├── app.ts                  # Composant racine (Layout principal avec router-outlet)
├── app.html                # Template HTML principal
├── app.routes.ts           # Configuration des routes (/ et /stats)
├── task.ts                 # Interface TypeScript du modèle Task
├── task.store.ts           # Service global (Store) gérant l'état et le localStorage
├── task-validators.ts      # Validateurs personnalisés pour le formulaire
├── task-form.ts            # Logique du formulaire d'ajout
├── task-form.html          # Template du formulaire d'ajout
├── task-list.ts            # Logique de la liste, filtres, recherche et tri
├── task-list.html          # Template de la liste des tâches
├── stats.ts                # Logique du tableau de bord / statistiques
└── stats.html              # Template de la vue /stats
```
---
