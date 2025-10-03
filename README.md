# EduApps - Générateur de Carnet de Bord

Application React + TypeScript pour générer des carnets de bord personnalisés pour enseignants.

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

### Build de production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`.

## 🧪 Tests

### Exécuter les tests

```bash
# Lancer tous les tests
npm test

# Mode watch (recommandé en développement)
npm test -- --watch

# Avec rapport de couverture
npm run test:coverage

# Interface UI (si installée)
npm run test:ui
```

### Structure des tests

```
src/
├── stores/
│   ├── authStore.ts
│   └── __tests__/
│       └── authStore.test.ts
├── services/
│   ├── csvService.ts
│   └── __tests__/
│       └── csvService.test.ts
└── test/
    └── setup.ts
```

Pour plus de détails, consultez [TESTS.md](./TESTS.md).

## 🛠️ Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## 📦 Structure du projet

```
src/
├── components/        # Composants React
│   ├── ClassBlock.tsx
│   ├── ColorPicker.tsx
│   ├── GeneratedPages.tsx
│   ├── HelpModal.tsx
│   ├── LayoutEditor.tsx
│   └── LoadingOverlay.tsx
├── stores/           # Stores Zustand
│   └── authStore.ts
├── services/         # Services et utilitaires
│   └── csvService.ts
├── types/            # Définitions TypeScript
│   └── index.ts
├── utils/            # Fonctions utilitaires
│   ├── colors.ts
│   └── mockData.ts
├── App.tsx           # Composant principal
└── main.tsx          # Point d'entrée
```

## ✨ Fonctionnalités

- ✅ Configuration personnalisée (enseignant, établissement, matière)
- ✅ Gestion des niveaux et classes
- ✅ Éditeur de plans de classe avec modèles
- ✅ Configuration des évaluations (notes et/ou compétences)
- ✅ Import/Export de configuration JSON
- ✅ Import de listes d'élèves CSV
- ✅ Génération de carnet prêt à imprimer
- ✅ Tests unitaires pour stores et services

## 🔄 Import/Export

### Export de configuration

Sauvegardez votre configuration en cliquant sur "Exporter JSON" dans l'interface.

### Import CSV d'élèves

Format attendu :
```csv
Nom,Prénom
Dupont,Jean
Martin,Marie
```

## 🧪 Qualité du code

```bash
# Vérification du code
npm run lint

# Build de production
npm run build
```

## 📚 Documentation

- [Guide de tests complet](./TESTS.md) - Stratégie de tests et scénarios
- [Types TypeScript](./src/types/index.ts) - Interfaces et types

## 🗺️ Roadmap

### Actuellement implémenté
- [x] Configuration de base
- [x] Éditeur de plans de classe
- [x] Import/Export JSON
- [x] Tests unitaires (stores, services)
- [x] Infrastructure de tests

### À venir
- [ ] Persistance locale (localStorage/IndexedDB)
- [ ] Intégration Tauri (version desktop)
- [ ] Tests de composants React
- [ ] Tests end-to-end (E2E)
- [ ] Import emploi du temps iCal
- [ ] Génération de rapports PDF
- [ ] Mode hors-ligne
- [ ] Notifications et rappels

## 🤝 Contribution

1. Créez une branche pour votre fonctionnalité
2. Écrivez des tests pour votre code
3. Assurez-vous que tous les tests passent (`npm test`)
4. Vérifiez le linting (`npm run lint`)
5. Créez une Pull Request

## 📄 Licence

Ce projet est sous licence privée.

## 🐛 Signaler un bug

Utilisez les [GitHub Issues](https://github.com/amzalpro/EduApps/issues) pour signaler des bugs ou suggérer des améliorations.
