/* Chris's News language controller */
'use strict';
(() => {
  const root = document.getElementById('chris-news');
  if (!root) return;

  const apply = () => {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    root.querySelectorAll('[data-ko][data-en]').forEach((el) => {
      const value = el.getAttribute('data-' + lang);
      if (value !== null) el.textContent = value;
    });
    root.querySelectorAll('img[data-ko-src]').forEach((img) => {
      const target = lang === 'en' ? img.dataset.enSrc || img.src : img.dataset.koSrc;
      if (target && !img.src.endsWith(target)) img.src = target;
      const alt = img.getAttribute('data-' + lang + '-alt');
      if (alt) img.alt = alt;
    });
  };

  apply();

  if (window.MutationObserver) {
    new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === 'attributes' && m.attributeName === 'lang')) apply();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
})();