/* Miracle Shot — page-specific interaction bridge */
'use strict';
(() => {
  const page = (location.pathname.split('/').pop() || '').replace(/\.html$/i, '').toLowerCase();
  if (page !== 'miracleshot') return;

  let reloadTimer = null;

  function loadStoryLayer() {
    if (document.getElementById('mshot-story-script')) return;
    const s = document.createElement('script');
    s.id = 'mshot-story-script';
    s.src = '/js/miracle-shot-story-v2.js?v=20260829-2';
    s.onload = () => {
      // The story layer reads the current language when it renders.
      // If main.js has already selected ENG, render the story in ENG too.
      if (typeof window.renderMiracleShotStory === 'function') {
        window.renderMiracleShotStory();
      }
    };
    document.head.appendChild(s);
  }

  function reloadStoryLayer() {
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(() => {
      const oldStory = document.getElementById('mshot-story');
      if (oldStory) oldStory.remove();

      const oldStyle = document.getElementById('mshot-story-css');
      if (oldStyle) oldStyle.remove();

      const oldScript = document.getElementById('mshot-story-script');
      if (oldScript) oldScript.remove();

      loadStoryLayer();
    }, 0);
  }

  // main.js calls this after every language selection.
  const previousLangHandler = window.onLangChange;
  window.onLangChange = function (lang) {
    try { localStorage.setItem('pref-lang', lang); } catch (_) {}
    if (typeof previousLangHandler === 'function') {
      try { previousLangHandler(lang); } catch (_) {}
    }
    reloadStoryLayer();
  };

  function installMobileCardBehavior() {
    if (document.getElementById('miracle-shot-mobile-card-style')) return;

    const style = document.createElement('style');
    style.id = 'miracle-shot-mobile-card-style';
    style.textContent = `
      /* Desktop remains the original hover interaction. */
      @media (min-width: 769px) {
        .char-card:hover .char-photo { opacity: 0 !important; }
        .char-card:hover .bible-photo { opacity: 1 !important; }
      }

      /* Touch devices: hover is disabled as a visual trigger. The .flipped class is the only trigger. */
      @media (hover: none), (pointer: coarse) {
        .char-card:not(.flipped):hover {
          transform: none !important;
          border-color: rgba(255,255,255,.06) !important;
          box-shadow: none !important;
        }
        .char-card:not(.flipped):hover .char-photo { opacity: 1 !important; }
        .char-card:not(.flipped):hover .bible-photo { opacity: 0 !important; }
        .char-card.flipped,
        .char-card.flipped:hover {
          transform: translateY(-8px) !important;
          border-color: var(--accent) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,.5), 0 0 25px var(--accent-glow) !important;
        }
        .char-card.flipped .char-photo,
        .char-card.flipped:hover .char-photo { opacity: 0 !important; }
        .char-card.flipped .bible-photo,
        .char-card.flipped:hover .bible-photo { opacity: 1 !important; }
        .char-card { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
      }
    `;
    document.head.appendChild(style);
  }

  function installMobileCardEvents() {
    if (document.documentElement.dataset.miracleCardEvents === '1') return;
    document.documentElement.dataset.miracleCardEvents = '1';

    // Delegation is intentional: the story layer can recreate DOM nodes.
    const toggleCard = event => {
      if (!window.matchMedia('(max-width: 768px)').matches) return;
      const card = event.target.closest('.char-card');
      if (!card) return;
      if (event.target.closest('a,button')) return;
      event.preventDefault();
      card.classList.toggle('flipped');
    };

    document.addEventListener('click', toggleCard, { passive: false });
  }

  function start() {
    installMobileCardBehavior();
    installMobileCardEvents();
    loadStoryLayer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
