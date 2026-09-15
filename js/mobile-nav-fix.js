(() => {
  'use strict';

  function init() {
    if (window.__clpMobileNavFixInitialized) return;
    window.__clpMobileNavFixInitialized = true;

    const buttons = [
      document.querySelector('[data-mobile-menu="projects"]'),
      document.querySelector('[data-mobile-menu="play"]'),
      document.querySelector('[data-mobile-menu="faith"]'),
      document.getElementById('mobileMoreBtn')
    ].filter(Boolean);

    const panels = buttons.map(button => {
      const id = button.getAttribute('aria-controls');
      return id ? document.getElementById(id) : null;
    }).filter(Boolean);

    if (!buttons.length || !panels.length) return;

    const closeAll = () => {
      panels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
      });
      buttons.forEach(button => button.setAttribute('aria-expanded', 'false'));
      document.body.classList.remove('mobile-panel-open');
    };

    const openPanel = (button, panel) => {
      closeAll();
      panel.classList.add('active');
      panel.setAttribute('aria-hidden', 'false');
      button.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mobile-panel-open');
    };

    // Remove the older inline handlers so every mobile item uses one click system.
    buttons.forEach(button => {
      button.removeAttribute('onclick');
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        if (!panel) return;
        const isOpen = panel.classList.contains('active');
        if (isOpen) closeAll();
        else openPanel(button, panel);
      });
    });

    document.querySelectorAll('.mobile-submenu-close, #mobileMoreClose').forEach(closeButton => {
      closeButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        closeAll();
      });
    });

    panels.forEach(panel => {
      panel.addEventListener('click', event => {
        if (event.target === panel) closeAll();
      });
      panel.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => closeAll());
      });
    });

    document.addEventListener('click', event => {
      if (!event.target.closest('#mobileBottomNav') && !event.target.closest('.mobile-submenu-overlay') && !event.target.closest('.mobile-more-overlay')) {
        closeAll();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeAll();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeAll();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
