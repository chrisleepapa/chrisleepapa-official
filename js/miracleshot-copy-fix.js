// Miracle Shot — responsive character flip + Story language support
(function () {
  const STORY = {
    ko: {
      label: '스토리',
      title: '평범한 아이들이 빛을 찾는 이야기'
    },
    en: {
      label: 'THE STORY',
      title: 'A Story of Ordinary Children Finding Their Light'
    }
  };

  const getLang = () => document.documentElement.lang === 'en' ? 'en' : 'ko';

  function applyStoryLanguage() {
    const t = STORY[getLang()];

    // Support both the intended i18n hook and the existing static Story markup.
    document.querySelectorAll('[data-i18n="world_title"]').forEach(el => {
      el.textContent = t.title;
    });

    document.querySelectorAll('.world-grid .info-card').forEach(card => {
      const label = card.querySelector('.info-label');
      if (!label) return;
      const value = label.textContent.trim().toUpperCase();
      if (value === 'THE STORY' || value === 'STORY' || value === '스토리') {
        label.textContent = t.label;
      }
    });

    // If the page uses a section heading rather than .info-label, translate it too.
    document.querySelectorAll('.world-grid h2, .world-grid h3').forEach(el => {
      const value = el.textContent.trim();
      if (value === '평범한 아이들이 빛을 찾는 이야기' || value === 'A Story of Ordinary Children Finding Their Light') {
        el.textContent = t.title;
      }
    });
  }

  function addMobileFlipCSS() {
    if (document.getElementById('miracle-shot-mobile-flip-style')) return;
    const style = document.createElement('style');
    style.id = 'miracle-shot-mobile-flip-style';
    style.textContent = `
      /* PC: original hover behavior remains intact. */
      @media (min-width: 769px) {
        .char-card:hover .char-photo { opacity: 0 !important; }
        .char-card:hover .bible-photo { opacity: 1 !important; }
      }

      /* Mobile: hover must never control the image. Tap toggles it. */
      @media (max-width: 768px) {
        .char-card:not(.flipped) .char-photo,
        .char-card:not(.flipped):hover .char-photo { opacity: 1 !important; }
        .char-card:not(.flipped) .bible-photo,
        .char-card:not(.flipped):hover .bible-photo { opacity: 0 !important; }
        .char-card.flipped .char-photo,
        .char-card.flipped:hover .char-photo { opacity: 0 !important; }
        .char-card.flipped .bible-photo,
        .char-card.flipped:hover .bible-photo { opacity: 1 !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function initMobileFlip() {
    addMobileFlipCSS();
    document.querySelectorAll('.char-card').forEach(card => {
      if (card.dataset.miracleFlip === '1') return;
      card.dataset.miracleFlip = '1';

      card.addEventListener('click', event => {
        if (!window.matchMedia('(max-width: 768px)').matches) return;
        if (event.target.closest('a, button')) return;
        card.classList.toggle('flipped');
      });
    });
  }

  function applyAll() {
    applyStoryLanguage();
    initMobileFlip();
  }

  document.addEventListener('DOMContentLoaded', applyAll);

  // main.js uses onLangChange (not a languageChanged event).
  const previousOnLangChange = window.onLangChange;
  window.onLangChange = function (lang) {
    if (typeof previousOnLangChange === 'function') previousOnLangChange(lang);
    applyStoryLanguage();
  };

  // Also catch direct <html lang> changes.
  const html = document.documentElement;
  if (html) {
    new MutationObserver(applyStoryLanguage).observe(html, {
      attributes: true,
      attributeFilter: ['lang']
    });
  }

  // Character cards are static, but retry after shared components finish loading.
  const start = () => {
    applyAll();
    if (document.body) {
      new MutationObserver(() => {
        applyStoryLanguage();
        initMobileFlip();
      }).observe(document.body, { childList: true, subtree: true });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
