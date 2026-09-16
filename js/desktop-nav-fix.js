(() => {
  'use strict';
  function loadPageBanners() {
    if (document.querySelector('script[data-clp-page-banners]')) return;
    const script = document.createElement('script');
    script.src = '/js/project-page-banners.js?v=20260915-2';
    script.async = true;
    script.dataset.clpPageBanners = 'true';
    document.head.appendChild(script);
  }
  function loadGameCreatorNote() {
    if (location.pathname.replace(/\/$/, '') !== '/gameinfo') return;
    if (document.querySelector('script[data-clp-game-creator-note]')) return;
    const script = document.createElement('script');
    script.src = '/js/gameinfo-creator-note.js?v=20260915-1';
    script.async = true;
    script.dataset.clpGameCreatorNote = 'true';
    document.head.appendChild(script);
  }
  function loadPlayResponsive() {
    const path = location.pathname.replace(/\/$/, '');
    if (!['/music', '/movie', '/movie.html', '/gameinfo'].includes(path)) return;
    if (document.querySelector('script[data-clp-play-responsive]')) return;
    const script = document.createElement('script');
    script.src = '/js/play-mobile-responsive.js?v=20260915-1';
    script.async = true;
    script.dataset.clpPlayResponsive = 'true';
    document.head.appendChild(script);
  }
  function loadFaithResponsive() {
    const path = location.pathname.replace(/\/$/, '');
    if (!['/bible', '/worship', '/worship_eng'].includes(path)) return;
    if (document.querySelector('script[data-clp-faith-responsive]')) return;
    const script = document.createElement('script');
    script.src = '/js/faith-mobile-responsive.js?v=20260915-2';
    script.async = true;
    script.dataset.clpFaithResponsive = 'true';
    document.head.appendChild(script);
  }
  function syncMovieShortsLanguage() {
    const path = location.pathname.replace(/\/$/, '');
    if (!['/movie', '/movie.html'].includes(path)) return;

    // CSS is the primary switch so the result does not depend on script timing.
    if (!document.getElementById('clp-movie-shorts-lang-style')) {
      const style = document.createElement('style');
      style.id = 'clp-movie-shorts-lang-style';
      style.textContent = `
        html[lang="ko"] .shorts-title.i18n-en { display: none !important; }
        html[lang="ko"] .shorts-title.i18n-ko { display: block !important; }
        html[lang="en"] .shorts-title.i18n-ko { display: none !important; }
        html[lang="en"] .shorts-title.i18n-en { display: block !important; }
      `;
      document.head.appendChild(style);
    }

    const apply = () => {
      const lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
      document.querySelectorAll('.shorts-title.i18n-ko').forEach(el => {
        el.style.display = lang === 'ko' ? 'block' : 'none';
      });
      document.querySelectorAll('.shorts-title.i18n-en').forEach(el => {
        el.style.display = lang === 'en' ? 'block' : 'none';
      });
    };
    apply();

    new MutationObserver(apply).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });

    // Re-apply if page content is inserted/re-rendered after initialization.
    new MutationObserver(apply).observe(document.body, { childList: true, subtree: true });

    if (typeof window.onLangChange === 'function') {
      const previous = window.onLangChange;
      window.onLangChange = function(lang) {
        previous(lang);
        apply();
      };
    }
  }
  function init() {
    loadPageBanners();
    loadGameCreatorNote();
    loadPlayResponsive();
    loadFaithResponsive();
    syncMovieShortsLanguage();
    if (window.__clpDesktopNavFixInitialized) return;
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    window.__clpDesktopNavFixInitialized = true;
    const wrappers = Array.from(nav.querySelectorAll('.nav-dropdown-wrapper'));
    const closeAll = () => {
      wrappers.forEach(wrapper => {
        wrapper.classList.remove('active');
        const trigger = wrapper.querySelector('.nav-dropdown-trigger');
        if (trigger) {
          trigger.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    };
    const closeOthers = current => {
      wrappers.forEach(wrapper => {
        if (wrapper === current) return;
        wrapper.classList.remove('active');
        const trigger = wrapper.querySelector('.nav-dropdown-trigger');
        if (trigger) {
          trigger.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    };
    wrappers.forEach(wrapper => {
      wrapper.addEventListener('mouseenter', () => closeOthers(wrapper), true);
      wrapper.addEventListener('click', event => {
        const link = event.target.closest('a');
        if (link) closeAll();
      }, true);
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('#main-nav')) closeAll();
    }, true);
    const observer = new MutationObserver(() => {
      const active = wrappers.filter(wrapper => wrapper.classList.contains('active'));
      if (active.length > 1) {
        active.slice(0, -1).forEach(wrapper => {
          wrapper.classList.remove('active');
          const trigger = wrapper.querySelector('.nav-dropdown-trigger');
          if (trigger) {
            trigger.classList.remove('active');
            trigger.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
    wrappers.forEach(wrapper => observer.observe(wrapper, { attributes: true, attributeFilter: ['class'] }));
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
