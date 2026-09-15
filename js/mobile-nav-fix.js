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

    // One controller only: intercept bottom-nav clicks during capture so
    // legacy main.js/inline handlers cannot toggle the same panel a second time.
    document.addEventListener('click', event => {
      const button = event.target.closest('#mobileBottomNav .mobile-nav-button');
      if (!button) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;
      const isOpen = panel.classList.contains('active');
      if (isOpen) closeAll();
      else openPanel(button, panel);
    }, true);

    // Remove legacy inline handlers after the new controller is installed.
    buttons.forEach(button => button.removeAttribute('onclick'));

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

    // Safety net: never allow two mobile panels to remain open at once.
    const observer = new MutationObserver(() => {
      const openPanels = panels.filter(panel => panel.classList.contains('active'));
      if (openPanels.length > 1) {
        const keep = openPanels[openPanels.length - 1];
        openPanels.forEach(panel => {
          if (panel !== keep) {
            panel.classList.remove('active');
            panel.setAttribute('aria-hidden', 'true');
          }
        });
      }
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

    closeAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
