# 🚀 EduApps - Référence Rapide

## Démarrage Instantané

```bash
# Lancer l'application (déjà en cours)
npm run dev
```

**URL:** http://localhost:5174/

## 🔐 Connexion

| Rôle | ID | Mot de passe |
|------|-----|--------------|
| **Enseignant** | `test` | `test` |
| **Admin** | `admin` | `admin` |

## 📂 Fichiers Importants

| Fichier | Description |
|---------|-------------|
| `src/EduApp.tsx` | Composant principal |
| `src/main.tsx` | Point d'entrée |
| `src/stores/authStore.ts` | Authentification |
| `src/services/csvService.ts` | Import/Export CSV |
| `src-tauri/tauri.conf.json` | Config Tauri |

## 🎨 Composants Principaux

```
src/components/
├── Auth/Login.tsx           → Page de connexion
├── Layout/
│   ├── TopBar.tsx          → Barre supérieure
│   ├── TabBar.tsx          → Navigation onglets
│   ├── BottomBar.tsx       → Barre inférieure
│   └── MainLayout.tsx      → Layout principal
├── Dashboard/              → Tableau de bord
├── ClassRoom/              → Plan de classe
├── Evaluations/            → Évaluations
├── SchoolLife/             → Vie scolaire
├── Protocols/              → Protocoles (PAI)
├── Widgets/                → Widgets
└── Configuration/          → Paramètres
```

## 🛠️ Commandes Essentielles

```bash
# Développement web
npm run dev

# Développement Tauri (natif)
npm run tauri:dev

# Build production
npm run build
npm run tauri:build

# Vérifier le code
npm run lint

# Vérifier l'install
bash check-install.sh
```

## 📊 CSV Formats

### Élèves
```csv
id,nom,prenom,dateNaissance,classe,email,telephone
```

### Compétences
```csv
id,code,nom,description,categorie,niveau
```

Exemples dans : `src/assets/data/`

## 🔧 Dépendances Clés

- **React 18** - UI
- **TypeScript** - Types
- **Vite** - Build
- **Tailwind CSS** - Styles
- **Zustand** - State
- **Tauri 2** - Native
- **Rust** - Backend

## 📖 Documentation Complète

- `README_EDUAPPS.md` - Guide complet
- `GUIDE_DEMARRAGE.md` - Installation
- `ARCHITECTURE.md` - Architecture
- `TESTS.md` - Tests
- `RECAP.md` - Récapitulatif
- `BUILD_SUCCESS.txt` - Résumé de build

## 🎯 Fonctionnalités

✅ Tableau de bord avec mode classe  
✅ Plan de classe interactif  
✅ Évaluations par compétences  
✅ Gestion vie scolaire  
✅ Protocoles (PAI, PAP, etc.)  
✅ Widgets & outils  
✅ Configuration complète  
✅ Import/Export CSV  
✅ Authentification  

## 💡 Astuces

1. **Mode Classe** : Masque les infos personnelles pour projection
2. **CSV Import** : Glisser-déposer ou bouton import
3. **Sauvegarde** : Bouton "Enregistrer" en haut
4. **Navigation** : Utilisez les onglets

## 🐛 Dépannage Rapide

```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# Redémarrer le serveur
Ctrl+C puis npm run dev

# Vérifier les erreurs
npm run lint
```

## 📱 Prochaines Étapes

1. ✅ Tester dans le navigateur
2. ⏭️ Importer données CSV
3. ⏭️ Personnaliser l'interface
4. ⏭️ Tester mode Tauri natif
5. ⏭️ Déployer en production

---

**🎓 Bon enseignement avec EduApps !**
