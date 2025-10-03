# Stratégie de test EduApps

Document de référence pour orchestrer la qualité fonctionnelle et non-fonctionnelle de l'application (React + Tauri). À maintenir à jour à chaque itération.

## Objectifs & périmètre

- Garantir les parcours critiques (authentification, navigation, sauvegarde) sur desktop (Windows, macOS, Linux).
- Couvrir les modules coeur : Tableau de bord, Plan de classe, Évaluations, Vie scolaire, Protocoles, Widgets, Configuration.
- Valider l'import/export de données (CSV, JSON, iCal) et la persistance locale (Tauri).
- Suivre les performances, l'accessibilité et la sécurité basique.

## Prérequis & environnements

- **Stack** : Node.js ≥ 18, Rust toolchain (nightly non requis), npm.
- **Commandes** : `npm install`, `npm run tauri:dev`, `npm run tauri:build`.
- **Données par défaut** : identifiants `test/test` (enseignant), `admin/admin` (admin), CSV d'exemple dans `src/assets/data/`.
- **Jeux à préparer** :
	- `fixtures/students-valid.csv` — élèves valides.
	- `fixtures/students-invalid.csv` — colonnes manquantes/encodage.
	- `fixtures/competences.csv` — référentiel compétences.
	- `fixtures/timetable.ics` — import iCal.
- **Environnements cibles** :
	- `DEV` : build debug Tauri, base de données locale.
	- `STAGING` : build release + import données seed.
	- `PROD` : build signé (lorsque disponible).

## Niveaux de test

### 🚦 Smoke tests (à exécuter après chaque build)

- **SMK-001 — Connexion enseignant**
	- Pré-requis : application fraîchement lancée.
	- Étapes : saisir `test/test`, valider.
	- Attendu : redirection vers Dashboard, affichage du nom de l'enseignant.
- **SMK-002 — Navigation onglets**
	- Étapes : cliquer successivement sur tous les onglets de la barre latérale/topbar.
	- Attendu : rendu sans erreur, titre cohérent, état réinitialisé.
- **SMK-003 — Sauvegarde rapide**
	- Étapes : ouvrir Configuration, modifier un champ, cliquer « Enregistrer ».
	- Attendu : toast de succès, fichier/entrée créé côté Tauri (log).

### 🧪 Tests fonctionnels par module

- **Authentification**
	- AUTH-001 connexion enseignant réussie.
	- AUTH-002 connexion admin (vérifier accès aux paramètres avancés).
	- AUTH-003 refus identifiants erronés (message d'erreur, lockout au bout de 5 essais si implémenté).
	- AUTH-004 déconnexion (vider le store, retour écran login).
- **Tableau de bord**
	- DASH-001 emploi du temps conforme aux données.
	- DASH-002 mode classe masque les données sensibles.
	- DASH-003 rappels/notifications affichés par priorité.
- **Plan de classe**
	- CLSS-001 création/modification plan (rangées/colonnes).
	- CLSS-002 attribution élève ↔ place avec couleur de niveau.
	- CLSS-003 journalisation événements (retard, absence) visible dans Vie scolaire.
- **Évaluations**
	- EVAL-001 saisie niveaux compétences (A-D) avec validation.
	- EVAL-002 calcul moyenne pondérée (notes + coefficients).
	- EVAL-003 génération bilan par période.
	- EVAL-004 édition modèle de lettre (prévisualisation + export).
- **Vie scolaire**
	- LIFE-001 enregistrement absence/retard avec justificatif.
	- LIFE-002 suivi punitions et retenues (statut, date).
	- LIFE-003 consultation notes personnelles (filtrage par élève).
- **Protocoles**
	- PROT-001 affichage liste PAI/PAP/PPRE.
	- PROT-002 actions à entreprendre (checklist + pièces jointes).
- **Widgets**
	- WIDG-001 accès aux mini-apps (QR code, dictionnaire, etc.).
	- WIDG-002 désactivation/activation via Configuration.
- **Configuration**
	- CONF-001 modification infos personnelles/établissement.
	- CONF-002 import CSV élèves + mapping colonnes.
	- CONF-003 import iCal et projection dans Dashboard.
	- CONF-004 personnalisation thème & sécurité (mot de passe).
- **Fonctionnalités transverses**
	- TRANS-001 bouton Enregistrer (topbar) déclenche persistance.
	- TRANS-002 changement de langue (quand implémenté) rafraîchit libellés.
	- TRANS-003 statistiques (bottombar) agrègent données évaluations/vie scolaire.

### ⚠️ Cas limites & erreurs

- CSV vide, séparateur `;`, encodage ISO-8859-1 → message explicite.
- Import JSON de configuration incompatible (ancienne version) → migration ou refus clair.
- Perte de connexion disque (Tauri) lors de la sauvegarde → rollback et alerte.
- Session expirée → redirection login + conservation formulaire.
- Tentative d'accès onglet en rôle enseignant à fonctionnalité admin → interdiction + feedback.

### 📊 Non-fonctionnels

- **Performance** : temps de chargement initial < 3 s, changement d'onglet < 500 ms, navigation fluide avec 150 élèves.
- **Accessibilité** : navigation clavier complète, contraste AA, focus visible, labels ARIA sur modales.
- **Sécurité** : stockage sécurisé des credentials (pas en clair), protection des fichiers générés, validation inputs.

## Scénarios E2E priorisés

| ID | Objectif | Étapes clés | Résultat attendu |
| --- | --- | --- | --- |
| E2E-001 | Première connexion enseignant | Lancer app → login `test/test` → parcourir onglets → activer Mode Classe | Aucune erreur, mode classe masque infos personnelles |
| E2E-002 | Gestion d'un élève | Plan de classe → attribuer élève → consigner retard + participation → consulter Vie scolaire | Historique synchronisé entre modules |
| E2E-003 | Création d'évaluation | Évaluations → créer compétence → saisir niveaux → générer bilan → prévisualiser lettre | Bilan généré, lettre éditable |
| E2E-004 | Configuration complète | Configuration → remplir infos → importer CSV → importer iCal → personnaliser thème → sauvegarder | Données persistées et visibles dans Dashboard |

## Jeux de données & fixtures

- Regrouper les fichiers de test dans `fixtures/` (à créer si manquant).
- Documenter pour chaque fichier : format, colonnes, but, source.
- Prévoir scripts de génération (`scripts/generate-fixtures.ts`) pour peupler rapidement des jeux volumineux (>200 élèves).

## Automatisation & scripts

- **Unitaires (Vitest + React Testing Library)**
	- Couvrir stores Zustand (`authStore`, `appStore`, `evaluationStore`).
	- Tester `csvService` (parse, erreurs, conversion).
	- Valider helpers (`utils/colors`, `mockData`).
- **Intégration**
	- Tests sur import/export JSON avec Zod (schéma `FormData`).
	- Tests Tauri (Rust) via `cargo test` pour les commandes `save_config`, `import_csv`.
- **E2E (Playwright ou Cypress)**
	- Scripts reprenant E2E-001 à E2E-004.
	- Exécution headless dans CI (GitHub Actions), artefacts screenshots/vidéos.
- **Scripts npm suggérés**
	- `npm run test` → Vitest unitaire.
	- `npm run test:e2e` → lancement Playwright.
	- `npm run lint` → ESLint + (optionnel) Prettier.

## Suivi des anomalies & limitations

- Consigner chaque anomalie dans GitHub Issues avec template : contexte, steps to reproduce, résultat attendu/obtenu, logs.
- Relier les points « À corriger » au backlog produit :
	- BUG-CSV — Import CSV (implémentation + tests).
	- BUG-ICAL — Import iCal.
	- BUG-PERSIST — Persistance Tauri.
	- BUG-PDF — Génération PDF.
	- BUG-QR — Générateur QR codes.
- Limitations connues : données en mémoire, pas de synchro cloud, pas de notifications, pas de mode offline, pas d'i18n (documenter les plans de mitigation).

## Journal de campagnes

| Date | Version | Environnement | Suites exécutées | Résultat | Anomalies ouvertes |
| --- | --- | --- | --- | --- | --- |
| __/__/____ | 0.x.x | DEV/STAGING | Smoke + Fonctionnels + E2E | ✅/⚠️ | Réf. issues |

## Roadmap QA

1. Mettre en place Vitest + couverture minimale (authStore, csvService).
2. Configurer Playwright et automatiser E2E-001 & E2E-004.
3. Intégrer lint/test/build dans GitHub Actions (matrice OS).
4. Outiller la persistance Tauri (mocks + tests Rust).
5. Ajouter audits automatiques accessibilité/performance (Lighthouse CI).
6. Déployer un tableau de bord qualité (Notion/Jira) synchronisé avec ce document.

---

**Date de test** : _______________
**Testeur** : _______________
**Version** : _______________
