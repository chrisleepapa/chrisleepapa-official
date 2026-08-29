// Miracle Shot — language-aware copy correction
// Keeps the existing page content and switches the World & Story title with KOR/ENG.
(function () {
  const translations = {
    ko: '평범한 아이들이 빛을 찾는 이야기',
    en: 'A Story of Ordinary Children Finding Their Light'
  };

  function getLang() {
    return document.documentElement.lang === 'en' ? 'en' : 'ko';
  }

  function applyLanguage() {
    const title = document.querySelector('[data-i18n="world_title"]');
    if (title) title.textContent = translations[getLang()];
  }

  document.addEventListener('DOMContentLoaded', applyLanguage);
  window.addEventListener('languageChanged', applyLanguage);

  const html = document.documentElement;
  if (html) {
    new MutationObserver(applyLanguage).observe(html, {
      attributes: true,
      attributeFilter: ['lang']
    });
  }
})();
