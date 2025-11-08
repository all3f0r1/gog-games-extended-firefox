# Test de l'extension GOG Games Extended v1.1.0

## Corrections apportées

### Problème identifié
Le site gog-games.to est une **Single Page Application (SPA)** qui charge son contenu dynamiquement via JavaScript. Le DOM n'est pas prêt immédiatement au chargement de la page, ce qui empêchait l'extension de trouver le lien GOGDB.

### Solutions implémentées

1. **MutationObserver** : Surveille les changements du DOM pour détecter quand le contenu est chargé
2. **Délai initial** : Attend 1 seconde avant le premier essai
3. **Détection de changement d'URL** : Pour les navigations SPA sans rechargement de page
4. **Protection contre les injections multiples** : Vérifie si les galeries sont déjà présentes

## Comment tester

### 1. Recharger l'extension dans Firefox

1. Allez à `about:debugging#/runtime/this-firefox`
2. Trouvez "GOG Games Extended"
3. Cliquez sur "Recharger"

### 2. Tester sur une page de jeu

1. Visitez https://gog-games.to/game/frostpunk_2
2. Attendez que la page charge complètement (spinner disparaît)
3. Cliquez sur le bouton "More" pour révéler les liens
4. Les galeries devraient apparaître automatiquement après quelques secondes

### 3. Vérifier dans la console

Ouvrez la console (F12) et cherchez les messages :
```
[GOG Games Extended] Extension chargée
[GOG Games Extended] Observer activé
[GOG Games Extended] Contenu détecté, traitement de la page
[GOG Games Extended] Product ID trouvé: 1728870436
[GOG Games Extended] Récupération des données: https://www.gogdb.org/data/products/1728870436/product.json
[GOG Games Extended] Données récupérées: {Object}
[GOG Games Extended] Galeries injectées avec succès
```

## Comportement attendu

- ✅ L'extension attend que le contenu soit chargé
- ✅ Elle détecte le lien GOGDB même s'il est dans un menu déroulant
- ✅ Elle récupère les données de l'API GOGDB
- ✅ Elle injecte une section "🎮 Médias GOG Database" avec :
  - Galerie de vidéos (cliquables pour lire)
  - Galerie de captures d'écran (cliquables pour voir en pleine résolution)
- ✅ Le design est moderne avec dégradé violet/bleu

## Dépannage

### Si les galeries n'apparaissent pas

1. Vérifiez que vous êtes bien sur une page `/game/*`
2. Vérifiez que le bouton "More" a été cliqué (le lien GOGDB doit être visible)
3. Regardez la console pour les erreurs
4. Rechargez la page complètement (Ctrl+F5)

### Si le lien GOGDB n'est pas trouvé

Le lien GOGDB est caché dans un menu déroulant. Il faut :
1. Cliquer sur le bouton "More" 
2. Le lien "GOGDB" devrait apparaître
3. L'extension le détectera automatiquement grâce au MutationObserver
