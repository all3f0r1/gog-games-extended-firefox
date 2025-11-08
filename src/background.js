/**
 * GOG Games Extended - Background Script
 * Handles API requests to GOGDB (CORS bypass)
 */

console.log('[GOG Games Extended] Background script loaded');

// Listen for messages from content script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[GOG Games Extended] Message received:', message);

  if (message.action === 'fetchGOGDBData') {
    const productId = message.productId;
    const url = `https://www.gogdb.org/data/products/${productId}/product.json`;
    
    console.log('[GOG Games Extended] Fetching data:', url);

    // Perform request with background script permissions
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('[GOG Games Extended] Data retrieved successfully');
        sendResponse({ success: true, data: data });
      })
      .catch(error => {
        console.error('[GOG Games Extended] Error during fetch:', error);
        sendResponse({ success: false, error: error.message });
      });

    // Return true to indicate async response
    return true;
  }
});
