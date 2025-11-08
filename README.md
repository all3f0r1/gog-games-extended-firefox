# 🎮 GOG Games Extended

Une extension Firefox qui enrichit les pages de [gog-games.to](https://gog-games.to) avec des médias (captures d'écran et vidéos) provenant de [GOG Database](https://www.gogdb.org).

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Firefox](https://img.shields.io/badge/Firefox-Compatible-orange.svg)

## ✨ Fonctionnalités

Cette extension améliore votre expérience de navigation sur gog-games.to en ajoutant automatiquement :

- **📸 Galerie de captures d'écran** : Affiche toutes les captures d'écran disponibles sur GOG Database
- **🎬 Galerie de vidéos** : Intègre les trailers et vidéos promotionnelles
- **🎨 Interface élégante** : Design moderne avec dégradé violet/bleu et animations fluides
- **⚡ Chargement rapide** : Les médias sont chargés de manière optimisée avec lazy loading
- **📱 Responsive** : S'adapte parfaitement aux écrans mobiles et desktop

## 🚀 Installation

### Installation manuelle (développement)

1. Téléchargez ou clonez ce repository :
   ```bash
   git clone https://github.com/all3f0r1/gog-games-extended-firefox.git
   ```

2. Ouvrez Firefox et accédez à `about:debugging#/runtime/this-firefox`

3. Cliquez sur **"Charger un module complémentaire temporaire..."**

4. Sélectionnez le fichier `manifest.json` dans le dossier de l'extension

5. L'extension est maintenant active ! Visitez une page de jeu sur gog-games.to pour voir les médias.

### Installation depuis Firefox Add-ons (à venir)

L'extension sera bientôt disponible sur le store officiel Firefox Add-ons.

## 📖 Utilisation

1. Naviguez vers n'importe quelle page de jeu sur [gog-games.to](https://gog-games.to)
   - Par exemple : https://gog-games.to/game/frostpunk_2

2. Attendez que la page charge complètement

3. **Cliquez sur le bouton "More"** pour révéler les liens (le lien GOGDB doit être visible)

4. Une section "🎮 Médias GOG Database" apparaît automatiquement avec :
   - Les vidéos (trailers, gameplay, etc.)
   - Les captures d'écran en haute qualité

5. Cliquez sur une capture d'écran pour l'ouvrir en pleine résolution dans un nouvel onglet

6. Cliquez sur une vidéo pour la lire directement sur la page

## 🔧 Fonctionnement technique

L'extension utilise les technologies suivantes :

### Architecture

- **Manifest V3** : Standard moderne pour les extensions Firefox
- **Background Script** : Gère les requêtes API pour contourner CORS
- **Content Script** : Injecte le contenu dans les pages gog-games.to
- **Message Passing** : Communication entre background et content scripts
- **Host Permissions** : Autorisations pour contourner les restrictions CORS

### Workflow

1. Le content script détecte la page de jeu sur gog-games.to
2. Un **MutationObserver** surveille le chargement dynamique du contenu (SPA)
3. Extraction du lien vers GOG Database présent sur la page
4. Récupération du Product ID depuis l'URL GOGDB
5. Le content script envoie un message au background script avec le Product ID
6. Le **background script** effectue la requête vers l'API JSON de GOGDB (bypass CORS)
7. Le background script renvoie les données au content script
8. Parsing des données (screenshots, vidéos)
9. Construction et injection d'une galerie HTML/CSS dans la page
10. Chargement optimisé des images (miniatures puis pleine résolution)

### Pourquoi un background script ?

Les **content scripts** sont exécutés dans le contexte de la page web et sont soumis aux restrictions CORS, même avec les permissions déclarées dans le manifest. Seuls les **background scripts** peuvent effectuer des requêtes cross-origin en utilisant les `host_permissions`.

### Permissions requises

L'extension demande les permissions suivantes :

- `*://gog-games.to/*` : Pour injecter le contenu sur les pages de jeux
- `https://www.gogdb.org/*` : Pour récupérer les données de l'API GOGDB
- `https://images.gog-statics.com/*` : Pour charger les images hébergées par GOG

Ces permissions permettent au background script de contourner les restrictions CORS.

## 📁 Structure du projet

```
gog-games-extended-firefox/
├── manifest.json              # Configuration de l'extension
├── icons/                     # Icônes de l'extension
│   ├── icon-48.png           # Icône 48x48
│   └── icon-96.png           # Icône 96x96
├── src/                       # Code source
│   ├── background.js         # Background script (gestion API)
│   ├── content-script.js     # Content script (injection UI)
│   └── styles.css            # Styles pour les galeries
├── CHANGELOG.md               # Historique des versions
├── test_extension.md          # Guide de test
├── LICENSE                    # Licence MIT
└── README.md                  # Documentation
```

## 🛠️ Développement

### Prérequis

- Firefox Developer Edition (recommandé) ou Firefox stable
- Éditeur de code (VS Code, Sublime Text, etc.)

### Modifications

Pour modifier l'extension :

1. Éditez les fichiers dans le dossier `src/`
2. Rechargez l'extension dans `about:debugging`
3. Rafraîchissez la page gog-games.to pour voir les changements

### Débogage

- Ouvrez la console du navigateur (F12) sur une page gog-games.to
- Les logs du content script sont préfixés par `[GOG Games Extended]`
- Pour voir les logs du background script, allez dans `about:debugging` > "Inspecter" l'extension
- Inspectez les éléments injectés avec l'inspecteur DOM

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Changelog

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique complet des versions.

### Version actuelle : 1.2.0 (2025-11-08)

**🔧 Corrections critiques**
- Fix CORS : Ajout d'un background script pour gérer les requêtes API
- Les content scripts ne peuvent pas utiliser `host_permissions` dans Firefox
- Communication via `browser.runtime.sendMessage` entre scripts

## ⚠️ Avertissement

Cette extension est un projet indépendant et n'est pas affiliée à GOG, CD Projekt, ou gog-games.to. Elle utilise les données publiquement accessibles de GOG Database pour améliorer l'expérience utilisateur.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [GOG Database](https://www.gogdb.org) pour l'API et les données
- [gog-games.to](https://gog-games.to) pour la plateforme
- La communauté Firefox pour les outils de développement d'extensions

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Développé avec ❤️ par Manus AI**
