/* Miracle Shot project interaction loader */
'use strict';
(() => {
  const page = (location.pathname.split('/').pop() || '').replace(/\.html$/i, '').toLowerCase();
  if (page !== 'miracleshot') return;

  // Bridge the shared site's pref-lang/onLangChange system to the Miracle Shot story layer.
  window.onLangChange = function (lang) {
    try { localStorage.setItem('siteLang', lang); } catch (_) {}
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    reloadStoryLayer();
  };

  function loadStoryLayer() {
    if (document.getElementById('mshot-story-script')) return;
    const s = document.createElement('script');
    s.id = 'mshot-story-script';
    s.src = '/js/miracle-shot-story-v2.js?v=20260829';
    s.defer = true;
    document.head.appendChild(s);
  }

  function reloadStoryLayer() {
    const oldStory = document.getElementById('mshot-story');
    if (oldStory) oldStory.remove();

    const oldStyle = document.getElementById('mshot-story-css');
    if (oldStyle) oldStyle.remove();

    const oldScript = document.getElementById('mshot-story-script');
    if (oldScript) oldScript.remove();

    // Re-run the story renderer using main.js's current language.
    requestAnimationFrame(loadStoryLayer);
  }

  function initMobileCharacterFlip() {
    if (!document.getElementById('miracle-shot-mobile-flip-style')) {
      const style = document.createElement('style');
      style.id = 'miracle-shot-mobile-flip-style';
      style.textContent = `
        /* Desktop: keep the original hover interaction. */
        @media (min-width: 769px) {
          .char-card:hover .char-photo { opacity: 0 !important; }
          .char-card:hover .bible-photo { opacity: 1 !important; }
        }

        /* Mobile: hover must never flip the card; tap controls .flipped. */
        @media (max-width: 768px) {
          .char-card:hover .char-photo { opacity: 1 !important; }
          .char-card:hover .bible-photo { opacity: 0 !important; }
          .char-card:not(.flipped) .char-photo { opacity: 1 !important; }
          .char-card:not(.flipped) .bible-photo { opacity: 0 !important; }
          .char-card.flipped .char-photo,
          .char-card.flipped:hover .char-photo { opacity: 0 !important; }
          .char-card.flipped .bible-photo,
          .char-card.flipped:hover .bible-photo { opacity: 1 !important; }
          .char-card { -webkit-tap-highlight-color: transparent; }
        }
      `;
      document.head.appendChild(style);
    }

    document.querySelectorAll('.char-card').forEach(card => {
      if (card.dataset.mobileFlipReady === '1') return;
      card.dataset.mobileFlipReady = '1';

      card.addEventListener('click', event => {
        if (!window.matchMedia('(max-width: 768px)').matches) return;
        if (event.target.closest('a, button')) return;
        card.classList.toggle('flipped');
      });
    });
  }

  function start() {
    loadStoryLayer();
    initMobileCharacterFlip();
    setTimeout(initMobileCharacterFlip, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
