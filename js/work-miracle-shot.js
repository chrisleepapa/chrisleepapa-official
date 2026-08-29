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
    s.src = '/js/miracle-shot-story-v2.js?v=20260829-4';
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
        .char-card {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
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
    if (document.documentElement.dataset.miracleCardEvents === '4') return;
    document.documentElement.dataset.miracleCardEvents = '4';

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
    let lastTouchCard = null;
    let lastTouchTime = 0;

    // A normal short tap should immediately flip the card.  Use touchend
    // rather than pointerdown + preventDefault so mobile browsers are not
    // forced into long-press behavior.  Event delegation keeps this working
    // even if the story/card DOM is rebuilt after a language change.
    document.addEventListener('touchend', event => {
      if (!isMobile()) return;
      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      const card = target ? target.closest('.char-card') : null;
      if (!card || target.closest('a,button')) return;

      card.classList.toggle('flipped');
      lastTouchCard = card;
      lastTouchTime = Date.now();
    }, { capture: true, passive: true });

    // Desktop remains hover-only. This click fallback also covers mobile
    // browsers/environments where touchend is not exposed, while preventing
    // the synthetic click that follows touchend from flipping twice.
    document.addEventListener('click', event => {
      if (!isMobile()) return;
      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      const card = target ? target.closest('.char-card') : null;
      if (!card || target.closest('a,button')) return;

      if (lastTouchCard === card && Date.now() - lastTouchTime < 700) {
        lastTouchCard = null;
        return;
      }

      card.classList.toggle('flipped');
    }, { capture: true });
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
