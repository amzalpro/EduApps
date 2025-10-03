# Architecture de l'application EduApps

## Vue d'ensemble

EduApps est une application native multi-plateforme construite avec :
- **Frontend** : Vite + React + TypeScript + Tailwind CSS
- **Backend** : Tauri (Rust)
- **State Management** : Zustand
- **Navigation** : React Router (si nécessaire)

## Structure des fichiers

```
EduApps/
│
├── src/                                    # Code source React
│   │
│   ├── components/                         # Composants React
│   │   ├── Auth/                          # Authentification
│   │   │   └── Login.tsx                  # Page de connexion
│   │   │
│   │   ├── Layout/                        # Mise en page
│   │   │   ├── TopBar.tsx                # Barre supérieure (Enregistrer, Langue, Paramètres)
│   │   │   ├── TabBar.tsx                # Barre d'onglets (Navigation)
│   │   │   ├── BottomBar.tsx             # Barre inférieure (Statistiques)
│   │   │   └── MainLayout.tsx            # Layout principal
│   │   │
│   │   ├── Dashboard/                     # Tableau de bord
│   │   │   └── Dashboard.tsx             # Vue principale (Emploi du temps, Notes, Rappels)
│   │   │
│   │   ├── ClassRoom/                     # Plan de classe
│   │   │   └── ClassRoom.tsx             # Grille interactive des places
│   │   │
│   │   ├── Evaluations/                   # Évaluations
│   │   │   └── Evaluations.tsx           # Compétences, Notes, Bilans, Lettres
│   │   │
│   │   ├── SchoolLife/                    # Vie scolaire
│   │   │   └── SchoolLife.tsx            # Absences, Retards, Punitions
│   │   │
│   │   ├── Protocols/                     # Protocoles
│   │   │   └── Protocols.tsx             # PAI, PAP, PPRE, etc.
│   │   │
│   │   ├── Widgets/                       # Widgets
│   │   │   └── Widgets.tsx               # Jeux, Annuaire, QR Code, etc.
│   │   │
│   │   └── Configuration/                 # Configuration
│   │       └── Configuration.tsx          # Paramètres de l'application
│   │
│   ├── stores/                            # State Management (Zustand)
│   │   └── authStore.ts                  # Gestion de l'authentification
│   │
│   ├── types/                             # Types TypeScript
│   │   ├── index.ts                      # Export central
│   │   ├── student.ts                    # Types Élèves
│   │   ├── evaluation.ts                 # Types Évaluations
│   │   ├── schoolLife.ts                 # Types Vie scolaire
│   │   ├── schedule.ts                   # Types Emploi du temps
│   │   └── config.ts                     # Types Configuration
│   │
│   ├── services/                          # Services API
│   │   └── (à créer selon les besoins)
│   │
│   ├── hooks/                             # Custom hooks
│   │   └── (à créer selon les besoins)
│   │
│   ├── assets/                            # Ressources
│   │   └── data/                         # Données CSV, JSON
│   │
│   ├── EduApp.tsx                         # Application principale
│   ├── main.tsx                           # Point d'entrée React
│   └── index.css                          # Styles globaux
│
├── src-tauri/                             # Backend Rust
│   ├── src/
│   │   ├── main.rs                       # Point d'entrée Rust
│   │   └── lib.rs                        # Bibliothèque Tauri
│   │
│   ├── Cargo.toml                        # Dépendances Rust
│   ├── tauri.conf.json                   # Configuration Tauri
│   │
│   └── capabilities/                      # Permissions Tauri
│       └── default.json
│
├── package.json                           # Dépendances npm
├── vite.config.ts                         # Configuration Vite
├── tailwind.config.js                     # Configuration Tailwind
├── tsconfig.json                          # Configuration TypeScript
│
├── README_EDUAPPS.md                      # Documentation principale
└── GUIDE_DEMARRAGE.md                     # Guide de démarrage
```

## Flux de données

### 1. Authentification
```
Login.tsx → authStore (Zustand) → EduApp.tsx
```

### 2. Navigation
```
TabBar.tsx → activeTab (state) → EduApp.tsx → renderContent()
```

### 3. Sauvegarde
```
TopBar.tsx → onSave() → Tauri Command (Rust) → Système de fichiers
```

### 4. Import CSV
```
Configuration.tsx → Tauri Command → Lecture fichier → Parse CSV → Store
```

## Composants principaux

### 1. **EduApp.tsx**
- Point d'entrée de l'application
- Gestion de l'authentification
- Router principal des sections

### 2. **MainLayout.tsx**
- Structure de mise en page
- TopBar, TabBar, BottomBar
- Zone de contenu principale

### 3. **Stores (Zustand)**
- `authStore` : Gestion utilisateur et authentification
- (À ajouter) : `studentStore`, `evaluationStore`, etc.

## Types de données

### Student (Élève)
```typescript
{
  id, firstName, lastName, dateOfBirth, classRoom,
  parents, protocols, seatPosition
}
```

### Evaluation
```typescript
{
  id, studentId, date, type,
  competenceId, level, grade, comment
}
```

### Absence/Retard/Behavior
```typescript
{
  id, studentId, date, type, justified, comment
}
```

## Fonctionnalités Tauri

### Commandes à implémenter (Rust)
1. **Gestion des fichiers**
   - `save_data(data)` : Sauvegarder les données
   - `load_data()` : Charger les données
   - `import_csv(path)` : Importer un CSV
   - `export_csv(data)` : Exporter en CSV

2. **Gestion des fichiers iCal**
   - `import_ical(url)` : Télécharger et parser un fichier .ics
   - `parse_schedule(data)` : Parser l'emploi du temps

3. **Génération de documents**
   - `generate_pdf(template, data)` : Générer un PDF
   - `generate_qrcode(data, type)` : Générer un QR code

## Sécurité

- Authentification locale (pas de backend externe)
- Données stockées localement
- Chiffrement des mots de passe (à implémenter)
- Permissions Tauri limitées au strict nécessaire

## Performance

- Lazy loading des composants
- Virtualisation des listes (pour grandes quantités d'élèves)
- Debouncing pour les recherches
- Optimisation des rendus React avec `memo`

## Extensions futures

1. **Multi-langue** : i18n
2. **Thèmes** : Mode clair/sombre personnalisable
3. **Plugins** : Système de plugins pour étendre les fonctionnalités
4. **Sync cloud** : Synchronisation optionnelle via API
5. **Mobile** : Version mobile avec Tauri Mobile
6. **Collaboration** : Partage de données entre enseignants

## Conventions de code

### TypeScript
- PascalCase pour les composants
- camelCase pour les fonctions et variables
- UPPER_CASE pour les constantes

### React
- Functional components uniquement
- Hooks pour la gestion d'état locale
- Props typées avec TypeScript

### CSS
- Tailwind CSS pour le styling
- Classes utilitaires en priorité
- Composants personnalisés si nécessaire

## Tests (à implémenter)

- **Tests unitaires** : Vitest
- **Tests composants** : React Testing Library
- **Tests E2E** : Playwright ou Cypress

---

Cette architecture est évolutive et peut être adaptée selon les besoins spécifiques du projet.
