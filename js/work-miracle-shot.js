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
    s.src = '/js/miracle-shot-story-v2.js?v=20260829-3';
    s.onload = () => {
      if (typeof window.renderMiracleShotStory === 'function') window.renderMiracleShotStory();
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
      @media (min-width: 769px) {
        .char-card:hover .char-photo { opacity: 0 !important; }
        .char-card:hover .bible-photo { opacity: 1 !important; }
      }
      @media (max-width: 768px) {
        .char-card { cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        .char-card:hover { transform: none !important; }
        .char-card:not(.flipped) .char-photo { opacity: 1 !important; }
        .char-card:not(.flipped) .bible-photo { opacity: 0 !important; }
        .char-card.flipped .char-photo { opacity: 0 !important; }
        .char-card.flipped .bible-photo { opacity: 1 !important; }
        .char-card.flipped, .char-card.flipped:hover {
          transform: translateY(-8px) !important;
          border-color: var(--accent) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,.5), 0 0 25px var(--accent-glow) !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function installMobileCardEvents() {
    if (document.documentElement.dataset.miracleCardEvents === '2') return;
    document.documentElement.dataset.miracleCardEvents = '2';

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    // Use pointerdown in capture phase so the card toggles before any other
    // page-level click handler can interfere. This is the mobile interaction
    // only; desktop keeps the original CSS hover behavior.
    document.addEventListener('pointerdown', event => {
      if (!isMobile()) return;
      const card = event.target instanceof Element ? event.target.closest('.char-card') : null;
      if (!card || event.pointerType === 'mouse') return;
      if (event.target.closest('a,button')) return;
      event.preventDefault();
      card.classList.toggle('flipped');
    }, { capture: true, passive: false });
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
