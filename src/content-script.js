/**
 * GOG Games Extended - Content Script
 * Enrichit les pages de gog-games.to avec des médias provenant de GOG Database
 * Version 1.2.0 - Support pour SPA + Background script pour CORS
 */

(function() {
  'use strict';

  console.log('[GOG Games Extended] Extension chargée');

  let mediaInjected = false;
  let currentUrl = window.location.href;

  // Fonction pour extraire le product ID depuis le lien GOGDB
  function extractProductId() {
    // Le lien GOGDB est caché dans un menu déroulant
    // Il faut d'abord s'assurer que le contenu est chargé
    const gogdbLink = document.querySelector('a[href*="gogdb.org/product/"]');
    if (!gogdbLink) {
      console.log('[GOG Games Extended] Lien GOGDB non trouvé (contenu peut-être pas encore chargé)');
      return null;
    }

    const match = gogdbLink.href.match(/\/product\/(\d+)/);
    if (match && match[1]) {
      console.log('[GOG Games Extended] Product ID trouvé:', match[1]);
      return match[1];
    }

    return null;
  }

  // Fonction pour récupérer les données depuis GOGDB via le background script
  async function fetchGOGDBData(productId) {
    try {
      console.log('[GOG Games Extended] Envoi de la requête au background script pour product ID:', productId);
      
      // Envoyer un message au background script
      const response = await browser.runtime.sendMessage({
        action: 'fetchGOGDBData',
        productId: productId
      });
      
      if (response.success) {
        console.log('[GOG Games Extended] Données récupérées:', response.data);
        return response.data;
      } else {
        console.error('[GOG Games Extended] Erreur du background script:', response.error);
        return null;
      }
    } catch (error) {
      console.error('[GOG Games Extended] Erreur lors de la communication avec le background script:', error);
      return null;
    }
  }

  // Fonction pour construire l'URL d'une image à partir du hash
  function buildImageUrl(hash, size = 'ggvgm') {
    if (!hash) return null;
    // Format: https://images.gog-statics.com/{hash}_{size}.jpg
    // _ggvgm pour miniatures, .jpg pour pleine résolution
    const suffix = size === 'full' ? '.jpg' : '_ggvgm.jpg';
    return `https://images.gog-statics.com/${hash}${suffix}`;
  }

  // Fonction pour créer la galerie de screenshots
  function createScreenshotsGallery(screenshots) {
    if (!screenshots || screenshots.length === 0) {
      return null;
    }

    const gallery = document.createElement('div');
    gallery.className = 'gge-screenshots-gallery';

    const title = document.createElement('h3');
    title.textContent = `📸 Captures d'écran (${screenshots.length})`;
    gallery.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'gge-screenshots-grid';

    screenshots.forEach((hash, index) => {
      const thumbnailUrl = buildImageUrl(hash, 'ggvgm');
      const fullUrl = buildImageUrl(hash, 'full');

      const item = document.createElement('div');
      item.className = 'gge-screenshot-item';

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

  // Fonction pour créer la galerie de vidéos
  function createVideosGallery(videos) {
    if (!videos || videos.length === 0) {
      return null;
    }

    const gallery = document.createElement('div');
    gallery.className = 'gge-videos-gallery';

    const title = document.createElement('h3');
    title.textContent = `🎬 Vidéos (${videos.length})`;
    gallery.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'gge-videos-grid';

    videos.forEach((video, index) => {
      const item = document.createElement('div');
      item.className = 'gge-video-item';

      if (video.provider === 'youtube') {
        // Extraire l'ID YouTube de l'URL
        const videoIdMatch = video.video_url.match(/embed\/([^?]+)/);
        if (videoIdMatch) {
          const videoId = videoIdMatch[1];
          
          const thumbnail = document.createElement('img');
          thumbnail.src = video.thumbnail_url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          thumbnail.alt = `Vidéo ${index + 1}`;
          thumbnail.loading = 'lazy';

          const playButton = document.createElement('div');
          playButton.className = 'gge-play-button';
          playButton.innerHTML = '▶';

          item.onclick = () => {
            // Remplacer la miniature par un iframe YouTube
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

  // Fonction pour injecter les galeries dans la page
  function injectMediaGalleries(data) {
    // Vérifier si déjà injecté
    if (document.getElementById('gge-media-container')) {
      console.log('[GOG Games Extended] Galeries déjà injectées');
      return;
    }

    // Trouver le bouton "More" ou un conteneur approprié
    const moreButton = Array.from(document.querySelectorAll('label')).find(l => l.textContent.trim() === 'More');
    if (!moreButton || !moreButton.parentElement) {
      console.log('[GOG Games Extended] Impossible de trouver un point d\'insertion');
      return;
    }

    // Créer le conteneur principal pour les médias
    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'gge-media-container';
    mediaContainer.id = 'gge-media-container';

    const header = document.createElement('div');
    header.className = 'gge-header';
    header.innerHTML = '<h2>🎮 Médias GOG Database</h2><p>Fourni par <a href="https://www.gogdb.org" target="_blank">GOG Database</a></p>';
    mediaContainer.appendChild(header);

    // Ajouter les vidéos en premier (plus attractif)
    if (data.videos && data.videos.length > 0) {
      const videosGallery = createVideosGallery(data.videos);
      if (videosGallery) {
        mediaContainer.appendChild(videosGallery);
      }
    }

    // Ajouter les screenshots
    if (data.screenshots && data.screenshots.length > 0) {
      const screenshotsGallery = createScreenshotsGallery(data.screenshots);
      if (screenshotsGallery) {
        mediaContainer.appendChild(screenshotsGallery);
      }
    }

    // Insérer après le bouton More
    moreButton.parentElement.insertAdjacentElement('afterend', mediaContainer);

    console.log('[GOG Games Extended] Galeries injectées avec succès');
    mediaInjected = true;
  }

  // Fonction principale
  async function processPage() {
    // Vérifier qu'on est bien sur une page de jeu
    if (!window.location.pathname.startsWith('/game/')) {
      console.log('[GOG Games Extended] Pas une page de jeu');
      return;
    }

    // Réinitialiser si on change de page
    if (currentUrl !== window.location.href) {
      mediaInjected = false;
      currentUrl = window.location.href;
      // Supprimer l'ancien conteneur s'il existe
      const oldContainer = document.getElementById('gge-media-container');
      if (oldContainer) {
        oldContainer.remove();
      }
    }

    // Ne pas réinjecter si déjà fait
    if (mediaInjected) {
      return;
    }

    // Attendre que le lien GOGDB soit disponible
    const productId = extractProductId();
    if (!productId) {
      console.log('[GOG Games Extended] Product ID non disponible, réessai plus tard');
      return;
    }

    // Récupérer les données GOGDB
    const data = await fetchGOGDBData(productId);
    if (!data) {
      console.log('[GOG Games Extended] Impossible de récupérer les données');
      return;
    }

    // Vérifier qu'il y a des médias à afficher
    const hasMedia = (data.screenshots && data.screenshots.length > 0) || 
                     (data.videos && data.videos.length > 0);
    
    if (!hasMedia) {
      console.log('[GOG Games Extended] Aucun média trouvé pour ce jeu');
      mediaInjected = true; // Marquer comme traité pour ne pas réessayer
      return;
    }

    // Injecter les galeries
    injectMediaGalleries(data);
  }

  // Observer les changements du DOM pour détecter le chargement du contenu
  const observer = new MutationObserver((mutations) => {
    // Vérifier si le lien GOGDB est maintenant disponible
    const gogdbLink = document.querySelector('a[href*="gogdb.org/product/"]');
    if (gogdbLink && !mediaInjected) {
      console.log('[GOG Games Extended] Contenu détecté, traitement de la page');
      processPage();
    }
  });

  // Configuration de l'observer
  const config = {
    childList: true,
    subtree: true,
    attributes: false
  };

  // Démarrer l'observation
  observer.observe(document.body, config);

  // Essayer immédiatement au cas où le contenu serait déjà chargé
  setTimeout(() => {
    processPage();
  }, 1000);

  // Écouter les changements d'URL (pour les SPAs)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      console.log('[GOG Games Extended] URL changée, réinitialisation');
      mediaInjected = false;
      currentUrl = url;
      setTimeout(() => processPage(), 1000);
    }
  }).observe(document, {subtree: true, childList: true});

  console.log('[GOG Games Extended] Observer activé');

})();
