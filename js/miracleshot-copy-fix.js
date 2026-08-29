// Miracle Shot — language + character interaction fix
(function () {
  const translations = {
    ko: {
      worldTitle: '평범한 아이들이 빛을 찾는 이야기',
      storyLabel: 'THE STORY'
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
    const lang = getLang();
    const t = translations[lang];

    // The page has used data-i18n="world_title", but main.js can re-render
    // translated nodes after this file runs. Re-apply to the live DOM.
    document.querySelectorAll('[data-i18n="world_title"]').forEach(el => {
      if (el.textContent !== t.worldTitle) el.textContent = t.worldTitle;
    });

    // Also handle the visible STORY card when its label is not data-i18n-bound.
    document.querySelectorAll('.world-grid .info-card').forEach(card => {
      const label = card.querySelector('.info-label');
      if (!label) return;
      if (/^THE STORY$/i.test(label.textContent.trim()) || /스토리/.test(label.textContent.trim())) {
        label.textContent = t.storyLabel;
      }
    });
  }

  function initCharacterClickFlip() {
    document.querySelectorAll('.char-card').forEach(card => {
      if (card.dataset.clickFlipInitialized === 'true') return;
      card.dataset.clickFlipInitialized = 'true';

      // Desktop hover must not reveal the Bible character.
      const style = document.createElement('style');
      style.textContent = `
        .char-card:not(.flipped):hover .char-photo { opacity: 1 !important; }
        .char-card:not(.flipped):hover .bible-photo { opacity: 0 !important; }
        .char-card.flipped .char-photo { opacity: 0 !important; }
        .char-card.flipped .bible-photo { opacity: 1 !important; }
      `;
      document.head.appendChild(style);

      card.addEventListener('click', function (event) {
        if (event.target.closest('a, button')) return;
        card.classList.toggle('flipped');
      });
    });
  }

  function applyAll() {
    applyStoryLanguage();
    initCharacterClickFlip();
  }

  document.addEventListener('DOMContentLoaded', applyAll);
  window.addEventListener('languageChanged', applyAll);

  // main.js changes <html lang>. Observe that change and DOM replacements.
  const html = document.documentElement;
  if (html) {
    new MutationObserver(applyStoryLanguage).observe(html, {
      attributes: true,
      attributeFilter: ['lang']
    });
  }

  const bodyObserver = new MutationObserver(() => {
    applyStoryLanguage();
    initCharacterClickFlip();
  });

  function startBodyObserver() {
    if (document.body) {
      bodyObserver.observe(document.body, { childList: true, subtree: true });
      applyAll();
    } else {
      requestAnimationFrame(startBodyObserver);
    }
  }

  startBodyObserver();
})();
