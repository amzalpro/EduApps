# EduApps - Application de Gestion Scolaire

Application native de gestion scolaire pour les enseignants, développée avec **Vite + ReactJS + TypeScript** et **Tauri (Rust)**.

## 🎯 Fonctionnalités principales

### Tableau de bord
- **Mode Classe** : Masque les informations personnelles pour la projection
- Emploi du temps de la semaine (40%)
- Pense-bête, agenda personnel, réunions (30%)
- Rappels : retenues, appels, rendez-vous parents, cours et devoirs (30%)

### Plan de classe interactif
- Disposition personnalisable des élèves
- Saisie rapide d'événements :
  - Retards, absences, bavardages
  - Comportements, oublis, manque de travail
  - Participation positive

### Évaluations
- **Compétences** : Évaluation par niveaux (A, B, C, D)
- **Notes** : Gestion des notes avec coefficients
- **Bilans** : Bilans périodiques (trimestres/semestres)
- **Modèles de lettres** : Templates personnalisables

### Vie scolaire
- Absences (justifiées/non justifiées)
- Retards
- Punitions et retenues
- Exclusions
- Notes personnelles

### Protocoles (PAI, PAP, etc.)
- Liste des élèves concernés
- Actions à entreprendre pour chaque protocole
- Documents associés

### Widgets
- Jeux éducatifs
- Annuaire
- Dictionnaire
- Sites favoris
- Générateur QR Code (SMS, email, WhatsApp, calendrier, liens)

### Configuration
- Informations personnelles et établissement
- **Import CSV** : Élèves et compétences
- **Import iCal** : Synchronisation de l'emploi du temps
- Paramètres de l'emploi du temps (semaines A/B)
- Configuration des périodes (trimestres, vacances, jours fériés)
- Personnalisation de l'apparence
- Sécurité (identifiants et mot de passe)

## 🔐 Authentification

L'application dispose de deux niveaux d'accès :

- **Enseignant** : `test` / `test`
- **Admin** : `admin` / `admin`

## 🚀 Installation et lancement

### Prérequis

- **Node.js** (v18 ou supérieur)
- **Rust** (pour Tauri)
- **npm** ou **yarn**

### Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd EduApps

# Installer les dépendances
npm install
```

### Développement

```bash
# Lancer l'application en mode développement
npm run tauri:dev
```

### Build production

```bash
# Build de l'application native
npm run tauri:build
```

L'application sera compilée pour votre système d'exploitation dans le dossier `src-tauri/target/release/`.

## 📁 Structure du projet

```
EduApps/
├── src/
│   ├── components/
│   │   ├── Auth/              # Authentification
│   │   ├── Layout/            # Composants de mise en page
│   │   ├── Dashboard/         # Tableau de bord
│   │   ├── ClassRoom/         # Plan de classe
│   │   ├── Evaluations/       # Gestion des évaluations
│   │   ├── SchoolLife/        # Vie scolaire
│   │   ├── Protocols/         # Protocoles (PAI, PAP, etc.)
│   │   ├── Widgets/           # Widgets optionnels
│   │   └── Configuration/     # Paramètres
│   ├── stores/                # State management (Zustand)
│   ├── types/                 # Types TypeScript
│   ├── services/              # Services API
│   ├── hooks/                 # Custom hooks
│   ├── assets/                # Images, données
│   ├── EduApp.tsx             # Composant principal
│   └── main.tsx               # Point d'entrée
├── src-tauri/                 # Backend Rust (Tauri)
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
├── package.json
├── vite.config.ts
└── README.md
```

## 🛠️ Technologies utilisées

### Frontend
- **Vite** : Build tool ultra-rapide
- **React** 18 : Bibliothèque UI
- **TypeScript** : Typage statique
- **Tailwind CSS** : Framework CSS
- **Zustand** : State management
- **Lucide React** : Icônes
- **React Router** : Navigation

### Backend
- **Tauri** : Framework pour applications natives
- **Rust** : Langage système performant

## 📝 Fonctionnalités à venir

- [ ] Import/Export de données CSV
- [ ] Synchronisation iCal pour l'emploi du temps
- [ ] Génération de QR codes
- [ ] Graphiques et statistiques
- [ ] Export PDF des bilans et lettres
- [ ] Notifications et rappels
- [ ] Mode hors ligne
- [ ] Synchronisation cloud (optionnel)
- [ ] Multi-langue (FR, EN, ES)

## 🎨 Personnalisation

L'application permet de personnaliser :
- Les thèmes (clair/sombre)
- Les outils disponibles
- Les périodes scolaires
- L'emploi du temps
- Les modèles de lettres

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📧 Contact

Pour toute question ou suggestion, contactez-nous à : [votre-email@example.com]

---

**Développé avec ❤️ pour les enseignants**
