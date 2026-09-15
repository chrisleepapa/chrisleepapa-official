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

  function init() {
    loadPageBanners();
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
