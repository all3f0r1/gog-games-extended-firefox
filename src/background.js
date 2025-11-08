/**
 * GOG Games Extended - Background Script
 * Gère les requêtes API vers GOGDB (contournement CORS)
 */

console.log('[GOG Games Extended] Background script chargé');

// Écouter les messages du content script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[GOG Games Extended] Message reçu:', message);

  if (message.action === 'fetchGOGDBData') {
    const productId = message.productId;
    const url = `https://www.gogdb.org/data/products/${productId}/product.json`;
    
    console.log('[GOG Games Extended] Récupération des données:', url);

    // Effectuer la requête avec les permissions du background script
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('[GOG Games Extended] Données récupérées avec succès');
        sendResponse({ success: true, data: data });
      })
      .catch(error => {
        console.error('[GOG Games Extended] Erreur lors de la récupération:', error);
        sendResponse({ success: false, error: error.message });
      });

    // Retourner true pour indiquer qu'on va répondre de manière asynchrone
    return true;
  }
});
