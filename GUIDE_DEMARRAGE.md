# Guide de démarrage - EduApps

## Installation de l'environnement

### 1. Installer Rust

```bash
# Linux / macOS
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Windows
# Télécharger depuis https://rustup.rs/
```

### 2. Installer les dépendances système pour Tauri

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

#### macOS
```bash
xcode-select --install
```

#### Windows
Installez Microsoft Visual Studio C++ Build Tools.

### 3. Installer Node.js
Téléchargez Node.js v18 ou supérieur depuis https://nodejs.org/

### 4. Cloner et installer le projet

```bash
git clone <votre-repo>
cd EduApps
npm install
```

## Commandes disponibles

### Développement

```bash
# Lancer l'application en mode dev
npm run tauri:dev

# Lancer uniquement le frontend
npm run dev
```

### Build

```bash
# Build de l'application native
npm run tauri:build

# Build du frontend uniquement
npm run build
```

### Autres commandes

```bash
# Linter
npm run lint

# Preview du build
npm run preview
```

## Structure de l'application

### Types TypeScript
Les types sont définis dans `src/types/` :
- `student.ts` : Élèves, parents, protocoles
- `evaluation.ts` : Compétences, notes, bilans
- `schoolLife.ts` : Absences, retards, punitions
- `schedule.ts` : Emploi du temps, rappels
- `config.ts` : Configuration utilisateur

### State Management
Utilisation de Zustand dans `src/stores/` :
- `authStore.ts` : Authentification

### Composants React
Organisation par fonctionnalité dans `src/components/`.

## Développement avec Tauri

### Commandes Tauri Rust

```bash
# Depuis src-tauri/
cargo build
cargo run
cargo test
```

### Ajouter des commandes Tauri

1. Définir la commande dans `src-tauri/src/main.rs`
2. L'appeler depuis React avec `@tauri-apps/api`

Exemple :
```rust
// Dans main.rs
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
```

```typescript
// Dans React
import { invoke } from '@tauri-apps/api/tauri';
const greeting = await invoke('greet', { name: 'World' });
```

## Déploiement

### Build pour production

```bash
npm run tauri:build
```

Les fichiers générés se trouvent dans :
- **Windows** : `src-tauri/target/release/bundle/msi/`
- **macOS** : `src-tauri/target/release/bundle/dmg/`
- **Linux** : `src-tauri/target/release/bundle/deb/` ou `appimage/`

## Bonnes pratiques

1. **Types TypeScript** : Toujours typer vos composants et fonctions
2. **State management** : Utiliser Zustand pour l'état global
3. **Composants** : Créer des composants réutilisables
4. **CSS** : Utiliser Tailwind CSS pour le styling
5. **Tauri** : Utiliser les APIs Tauri pour accéder au système de fichiers

## Débogage

### Frontend
Utilisez les DevTools React dans le navigateur de dev.

### Backend Rust
Ajoutez des `println!()` ou `dbg!()` dans votre code Rust.

### Logs Tauri
Les logs s'affichent dans la console du terminal où vous avez lancé `npm run tauri:dev`.

## Ressources

- [Documentation Tauri](https://tauri.app/)
- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vitejs.dev/)
- [Documentation Zustand](https://zustand-demo.pmnd.rs/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)

## Support

Pour toute question, consultez la documentation ou ouvrez une issue sur GitHub.
