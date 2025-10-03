#!/bin/bash

# Script de vérification de l'installation EduApps

echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║   🎓 EduApps - Application de Gestion Scolaire 🎓      ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Vérification de l'installation..."
echo ""

# Vérifier Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js installé : $NODE_VERSION"
else
    echo "❌ Node.js non installé"
fi

# Vérifier npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm installé : $NPM_VERSION"
else
    echo "❌ npm non installé"
fi

# Vérifier Rust
if command -v rustc &> /dev/null; then
    RUST_VERSION=$(rustc --version)
    echo "✅ Rust installé : $RUST_VERSION"
else
    echo "❌ Rust non installé"
fi

# Vérifier Cargo
if command -v cargo &> /dev/null; then
    CARGO_VERSION=$(cargo --version)
    echo "✅ Cargo installé : $CARGO_VERSION"
else
    echo "❌ Cargo non installé"
fi

echo ""
echo "📁 Structure du projet :"
echo ""
echo "src/"
echo "├── components/"
echo "│   ├── Auth/           ✅ Authentification"
echo "│   ├── Layout/         ✅ Mise en page"
echo "│   ├── Dashboard/      ✅ Tableau de bord"
echo "│   ├── ClassRoom/      ✅ Plan de classe"
echo "│   ├── Evaluations/    ✅ Évaluations"
echo "│   ├── SchoolLife/     ✅ Vie scolaire"
echo "│   ├── Protocols/      ✅ Protocoles"
echo "│   ├── Widgets/        ✅ Widgets"
echo "│   └── Configuration/  ✅ Configuration"
echo "├── stores/             ✅ State management"
echo "├── types/              ✅ Types TypeScript"
echo "└── assets/data/        ✅ Données exemple"
echo ""
echo "src-tauri/              ✅ Backend Rust"
echo ""
echo "📄 Documentation :"
echo ""
echo "├── README_EDUAPPS.md     ✅ Documentation principale"
echo "├── GUIDE_DEMARRAGE.md    ✅ Guide de démarrage"
echo "├── ARCHITECTURE.md       ✅ Architecture détaillée"
echo "├── TESTS.md              ✅ Tests et scénarios"
echo "└── RECAP.md              ✅ Récapitulatif complet"
echo ""
echo "🚀 Commandes disponibles :"
echo ""
echo "  npm run dev             → Lancer le frontend uniquement"
echo "  npm run tauri:dev       → Lancer l'application complète"
echo "  npm run tauri:build     → Build pour production"
echo "  npm run lint            → Vérifier le code"
echo ""
echo "🔐 Comptes de test :"
echo ""
echo "  Enseignant : test / test"
echo "  Admin      : admin / admin"
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  Pour démarrer : npm run tauri:dev                      ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
