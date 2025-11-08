/**
 * GOG Games Extended - Content Script
 * Enriches gog-games.to pages with media from GOG Database
 * Version 1.3.0 - Better styling, error handling, and English translation
 */

(function() {
  'use strict';

  console.log('[GOG Games Extended] Extension loaded');

  let mediaInjected = false;
  let currentUrl = window.location.href;
  let processingInProgress = false;

  // Extract product ID from GOGDB link
  function extractProductId() {
    const gogdbLink = document.querySelector('a[href*="gogdb.org/product/"]');
    if (!gogdbLink) {
      console.log('[GOG Games Extended] GOGDB link not found (content may not be loaded yet)');
      return null;
    }

    const match = gogdbLink.href.match(/\/product\/(\d+)/);
    if (match && match[1]) {
      console.log('[GOG Games Extended] Product ID found:', match[1]);
      return match[1];
    }

    return null;
  }

  // Fetch data from GOGDB via background script
  async function fetchGOGDBData(productId) {
    try {
      console.log('[GOG Games Extended] Sending request to background script for product ID:', productId);
      
      const response = await browser.runtime.sendMessage({
        action: 'fetchGOGDBData',
        productId: productId
      });
      
      if (response.success) {
        console.log('[GOG Games Extended] Data retrieved successfully');
        return { success: true, data: response.data };
      } else {
        console.error('[GOG Games Extended] Background script error:', response.error);
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('[GOG Games Extended] Error communicating with background script:', error);
      return { success: false, error: error.message };
    }
  }

  // Build image URL from hash
  function buildImageUrl(hash, size = 'ggvgm') {
    if (!hash) return null;
    const suffix = size === 'full' ? '.jpg' : '_ggvgm.jpg';
    return `https://images.gog-statics.com/${hash}${suffix}`;
  }

  // Create screenshots gallery
  function createScreenshotsGallery(screenshots) {
    if (!screenshots || screenshots.length === 0) {
      return null;
    }

    const gallery = document.createElement('div');
    gallery.className = 'gge-screenshots-gallery';

    const title = document.createElement('h3');
    title.textContent = `📸 Screenshots (${screenshots.length})`;
    gallery.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'gge-screenshots-grid';

    screenshots.forEach((hash, index) => {
      const thumbnailUrl = buildImageUrl(hash, 'ggvgm');
      const fullUrl = buildImageUrl(hash, 'full');

      const item = document.createElement('div');
      item.className = 'gge-screenshot-item';
      item.title = 'Click to view full resolution';

      const img = document.createElement('img');
      img.src = thumbnailUrl;
      img.alt = `Screenshot ${index + 1}`;
      img.loading = 'lazy';
      img.onclick = () => window.open(fullUrl, '_blank');

      item.appendChild(img);
      grid.appendChild(item);
    });

    gallery.appendChild(grid);
    return gallery;
  }

  // Create videos gallery
  function createVideosGallery(videos) {
    if (!videos || videos.length === 0) {
      return null;
    }

    const gallery = document.createElement('div');
    gallery.className = 'gge-videos-gallery';

    const title = document.createElement('h3');
    title.textContent = `🎬 Videos (${videos.length})`;
    gallery.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'gge-videos-grid';

    videos.forEach((video, index) => {
      const item = document.createElement('div');
      item.className = 'gge-video-item';
      item.title = 'Click to play video';

      if (video.provider === 'youtube') {
        const videoIdMatch = video.video_url.match(/embed\/([^?]+)/);
        if (videoIdMatch) {
          const videoId = videoIdMatch[1];
          
          const thumbnail = document.createElement('img');
          thumbnail.src = video.thumbnail_url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          thumbnail.alt = `Video ${index + 1}`;
          thumbnail.loading = 'lazy';

          const playButton = document.createElement('div');
          playButton.className = 'gge-play-button';
          playButton.innerHTML = '▶';

          item.onclick = () => {
            item.innerHTML = '';
            const iframe = document.createElement('iframe');
            iframe.src = video.video_url;
            iframe.width = '100%';
            iframe.height = '200';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            item.appendChild(iframe);
          };

          item.appendChild(thumbnail);
          item.appendChild(playButton);
        }
      }

      grid.appendChild(item);
    });

    gallery.appendChild(grid);
    return gallery;
  }

  // Create error message
  function createErrorMessage(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'gge-error';
    errorDiv.innerHTML = `
      <strong>⚠️ Unable to load media</strong>
      <p>Failed to retrieve data from GOG Database. This may be due to a network issue or the game not being available in the database.</p>
      <p><small>Error: ${error}</small></p>
    `;
    return errorDiv;
  }

  // Create info message (no media)
  function createNoMediaMessage() {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'gge-info';
    infoDiv.innerHTML = `
      <strong>ℹ️ No media available</strong>
      <p>This game doesn't have any screenshots or videos in the GOG Database yet.</p>
    `;
    return infoDiv;
  }

  // Find best insertion point
  function findInsertionPoint() {
    const gameTitle = document.querySelector('h1, h2');
    if (gameTitle) {
      return { element: gameTitle, position: 'afterend' };
    }

    const moreButton = Array.from(document.querySelectorAll('label')).find(l => l.textContent.trim() === 'More');
    if (moreButton && moreButton.parentElement) {
      return { element: moreButton.parentElement, position: 'afterend' };
    }

    return { element: document.body, position: 'beforeend' };
  }

  // Inject media galleries into page
  function injectMediaGalleries(result) {
    if (document.getElementById('gge-media-container')) {
      console.log('[GOG Games Extended] Galleries already injected, skipping');
      return;
    }

    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'gge-media-container';
    mediaContainer.id = 'gge-media-container';

    const header = document.createElement('div');
    header.className = 'gge-header';
    header.innerHTML = '<h2>🎮 GOG Database Media</h2><p>Provided by <a href="https://www.gogdb.org" target="_blank">GOG Database</a></p>';
    mediaContainer.appendChild(header);

    // Handle errors
    if (!result.success) {
      const errorMsg = createErrorMessage(result.error);
      mediaContainer.appendChild(errorMsg);
      const insertion = findInsertionPoint();
      insertion.element.insertAdjacentElement(insertion.position, mediaContainer);
      console.log('[GOG Games Extended] Error message displayed');
      mediaInjected = true;
      return;
    }

    const data = result.data;
    const hasMedia = (data.screenshots && data.screenshots.length > 0) || 
                     (data.videos && data.videos.length > 0);
    
    // No media available
    if (!hasMedia) {
      const noMediaMsg = createNoMediaMessage();
      mediaContainer.appendChild(noMediaMsg);
      const insertion = findInsertionPoint();
      insertion.element.insertAdjacentElement(insertion.position, mediaContainer);
      console.log('[GOG Games Extended] No media message displayed');
      mediaInjected = true;
      return;
    }

    // Add videos first (more engaging)
    if (data.videos && data.videos.length > 0) {
      const videosGallery = createVideosGallery(data.videos);
      if (videosGallery) {
        mediaContainer.appendChild(videosGallery);
      }
    }

    // Add screenshots
    if (data.screenshots && data.screenshots.length > 0) {
      const screenshotsGallery = createScreenshotsGallery(data.screenshots);
      if (screenshotsGallery) {
        mediaContainer.appendChild(screenshotsGallery);
      }
    }

    const insertion = findInsertionPoint();
    insertion.element.insertAdjacentElement(insertion.position, mediaContainer);

    console.log('[GOG Games Extended] Galleries injected successfully');
    mediaInjected = true;
  }

  // Main processing function
  async function processPage() {
    if (!window.location.pathname.startsWith('/game/')) {
      console.log('[GOG Games Extended] Not a game page');
      return;
    }

    // Reset if URL changed
    if (currentUrl !== window.location.href) {
      mediaInjected = false;
      processingInProgress = false;
      currentUrl = window.location.href;
      const oldContainer = document.getElementById('gge-media-container');
      if (oldContainer) {
        oldContainer.remove();
      }
    }

    // Skip if already processed or in progress
    if (mediaInjected || processingInProgress) {
      return;
    }

    processingInProgress = true;

    // Wait for GOGDB link to be available
    const productId = extractProductId();
    if (!productId) {
      console.log('[GOG Games Extended] Product ID not available, will retry later');
      processingInProgress = false;
      return;
    }

    // Fetch data from GOGDB
    const result = await fetchGOGDBData(productId);
    
    // Inject galleries (or error/info message)
    injectMediaGalleries(result);
    processingInProgress = false;
  }

  // Observe DOM changes to detect content loading
  const observer = new MutationObserver((mutations) => {
    if (processingInProgress || mediaInjected) {
      return;
    }

    const gogdbLink = document.querySelector('a[href*="gogdb.org/product/"]');
    if (gogdbLink) {
      console.log('[GOG Games Extended] Content detected, processing page');
      setTimeout(() => processPage(), 500);
    }
  });

  const config = {
    childList: true,
    subtree: true,
    attributes: false
  };

  observer.observe(document.body, config);

  // Try immediately in case content is already loaded
  setTimeout(() => {
    processPage();
  }, 1000);

  // Listen for URL changes (SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      console.log('[GOG Games Extended] URL changed, resetting');
      mediaInjected = false;
      processingInProgress = false;
      currentUrl = url;
      setTimeout(() => processPage(), 1000);
    }
  }).observe(document, {subtree: true, childList: true});

  console.log('[GOG Games Extended] Observer activated');

})();
