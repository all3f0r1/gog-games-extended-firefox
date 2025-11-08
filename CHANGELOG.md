# Changelog

All notable changes to this project will be documented in this file.

## [1.3.2] - 2025-11-08

### 🐛 Bug Fixes - AMO Validation
- **Added extension ID**: `gog-games-extended@manus.ai` in manifest (required for Manifest V3)
- **Added data_collection_permissions**: Explicitly set all to false (no data collection)
- **Fixed icon sizes**: Resized icons from 1024x1024 to correct sizes (48x48 and 96x96)
- **Removed innerHTML**: Replaced all `innerHTML` usage with secure DOM methods
  - `createErrorMessage()`: Now uses `createElement()` and `textContent`
  - `createNoMediaMessage()`: Now uses `createElement()` and `textContent`
  - Video gallery: Now uses `textContent` for play button
  - Header: Now uses `createElement()` for all elements

### 🔒 Security Improvements
- All dynamic content now created using secure DOM manipulation
- No more unsafe `innerHTML` assignments
- Better protection against XSS attacks

### 📝 Technical Details
These changes were required to pass Firefox Add-ons (AMO) validation. The extension now follows all Mozilla security and quality guidelines.

## [1.3.1] - 2025-11-08

### 🐛 Critical Bug Fix
- **Fix SPA navigation**: Extension now works when navigating from homepage to game page
- Content script now injected on all gog-games.to pages (not just /game/*)
- Improved URL change detection with better state reset
- Added popstate event listener for browser back/forward navigation
- Increased delay to 1.5s after URL change for better stability

### 📝 Technical Details
The content script was only injected on `/game/*` pages, so when navigating from the homepage via SPA (Single Page Application), the script was never loaded. Now the script is injected on all pages and properly detects when the URL changes to a game page.

## [1.3.0] - 2025-11-08

### ✨ New Features
- **Better visual integration**: CSS redesigned to match gog-games.to style
- **Error handling**: Clear messages when API fails or no media is found
- **English translation**: All text content translated to English

### 🎨 Design Changes
- Removed gradient background, using simple gray to match site
- Cleaner borders and sections matching site's design
- Purple accent color (#6a4da5) matching site theme
- Simplified animations and transitions
- Better responsive design

### 🐛 Bug Fixes
- Error messages now displayed when GOGDB API fails
- Info message shown when game has no media
- Better error logging for debugging

## [1.2.1] - 2025-11-08

### 🐛 Corrections
- **Fix injection timing**: Les galeries s'affichent maintenant dès la première visite
- Amélioration de la logique de détection pour éviter les déclenchements multiples
- Ajout d'un flag `processingInProgress` pour éviter les traitements simultanés
- Meilleur point d'insertion des galeries (après le titre du jeu)
- Délai de 500ms après détection du lien GOGDB pour stabiliser le DOM

### 📝 Détails techniques
Le MutationObserver déclenchait plusieurs fois le traitement car l'injection elle-même modifiait le DOM. Ajout de protections pour éviter les injections multiples et amélioration du timing.

## [1.2.0] - 2025-11-08

### 🔧 Corrections
- **Fix CORS**: Les content scripts ne peuvent pas utiliser les `host_permissions` dans Firefox
- Ajout d'un **background script** pour gérer les requêtes API vers GOGDB
- Communication entre content script et background script via `browser.runtime.sendMessage`

### 📝 Détails techniques
Les content scripts sont exécutés dans le contexte de la page web et sont soumis aux restrictions CORS, même avec les permissions déclarées dans le manifest. Seuls les background scripts peuvent effectuer des requêtes cross-origin en utilisant les `host_permissions`.

**Architecture mise à jour** :
1. Content script détecte le lien GOGDB et extrait le product ID
2. Content script envoie un message au background script avec le product ID
3. Background script effectue la requête vers l'API GOGDB (bypass CORS)
4. Background script renvoie les données au content script
5. Content script injecte les galeries dans la page

## [1.1.0] - 2025-11-08

### ✨ Nouvelles fonctionnalités
- Support pour les Single Page Applications (SPA)
- Ajout d'un **MutationObserver** pour détecter le chargement dynamique du contenu
- Détection des changements d'URL pour la navigation SPA
- Protection contre les injections multiples

### 🐛 Corrections
- L'extension attend maintenant que le contenu soit chargé avant de chercher le lien GOGDB
- Gestion correcte du menu déroulant "More" qui contient les liens

## [1.0.0] - 2025-11-07

### 🎉 Version initiale
- Galerie de captures d'écran avec lazy loading
- Galerie de vidéos YouTube intégrées
- Design moderne avec dégradé violet/bleu
- Animations fluides
- Support responsive pour mobile
- Documentation complète
