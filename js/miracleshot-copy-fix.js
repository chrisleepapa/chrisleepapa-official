// Miracle Shot — language + responsive character interaction fix
(function () {
  const translations = {
    ko: {
      worldTitle: '평범한 아이들이 빛을 찾는 이야기',
      storyLabel: '스토리'
    },
    en: {
      worldTitle: 'A Story of Ordinary Children Finding Their Light',
      storyLabel: 'THE STORY'
    }
  };

  function getLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'ko';
  }

  function applyStoryLanguage() {
    const t = translations[getLang()];
    document.querySelectorAll('[data-i18n="world_title"]').forEach(el => {
      el.textContent = t.worldTitle;
    });
    document.querySelectorAll('.world-grid .info-card').forEach(card => {
      const label = card.querySelector('.info-label');
      if (!label) return;
      if (/^(THE STORY|스토리)$/i.test(label.textContent.trim())) {
        label.textContent = t.storyLabel;
      }
    });
  }

  function initCharacterClickFlip() {
    if (!document.getElementById('miracle-shot-click-flip-style')) {
      const style = document.createElement('style');
      style.id = 'miracle-shot-click-flip-style';
      style.textContent = `
        /* Desktop: preserve the original hover behavior. */
        @media (min-width: 769px) {
          .char-card:not(.flipped):hover .char-photo { opacity: 0 !important; }
          .char-card:not(.flipped):hover .bible-photo { opacity: 1 !important; }
          .char-card.flipped:hover .char-photo { opacity: 0 !important; }
          .char-card.flipped:hover .bible-photo { opacity: 1 !important; }
        }
        /* Mobile: no hover dependency; tap toggles character/Bible person. */
        @media (max-width: 768px) {
          .char-card:hover .char-photo,
          .char-card:hover .bible-photo { opacity: initial; }
          .char-card:not(.flipped) .char-photo { opacity: 1 !important; }
          .char-card:not(.flipped) .bible-photo { opacity: 0 !important; }
          .char-card.flipped .char-photo { opacity: 0 !important; }
          .char-card.flipped .bible-photo { opacity: 1 !important; }
        }
      `;
      document.head.appendChild(style);
    }

    document.querySelectorAll('.char-card').forEach(card => {
      if (card.dataset.clickFlipInitialized === 'true') return;
      card.dataset.clickFlipInitialized = 'true';

      card.addEventListener('click', function (event) {
        if (event.target.closest('a, button')) return;
        if (window.matchMedia('(max-width: 768px)').matches) {
          card.classList.toggle('flipped');
        }
      });
    });
  }

  function applyAll() {
    applyStoryLanguage();
    initCharacterClickFlip();
  }

  document.addEventListener('DOMContentLoaded', applyAll);
  window.addEventListener('languageChanged', applyAll);

  const html = document.documentElement;
  if (html) {
    new MutationObserver(applyStoryLanguage).observe(html, {
      attributes: true,
      attributeFilter: ['lang']
    });
  }

  function startBodyObserver() {
    if (!document.body) {
      requestAnimationFrame(startBodyObserver);
      return;
    }
    const bodyObserver = new MutationObserver(() => {
      applyStoryLanguage();
      initCharacterClickFlip();
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
    applyAll();
  }

  startBodyObserver();
})();
