/* Home language controller
 * Home action cards keep both translations in the markup and follow
 * the document language directly, avoiding timing conflicts with global i18n.
 */
'use strict';
(() => {
  const root = document.getElementById('home-actions');
  if (!root) return;

  const apply = () => {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    root.querySelectorAll('[data-ko][data-en]').forEach((el) => {
      const value = el.getAttribute('data-' + lang);
      if (value !== null) el.textContent = value;
    });
    root.style.visibility = 'visible';
  };

  apply();

  if (window.MutationObserver) {
    new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === 'attributes' && m.attributeName === 'lang')) apply();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
})();