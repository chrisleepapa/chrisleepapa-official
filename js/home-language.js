/* Home language controller
 * Homepage action cards and Faith Journey follow the document language directly,
 * avoiding timing conflicts with global i18n.
 */
'use strict';
(() => {
  const roots = ['home-actions', 'faith-journey']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (!roots.length) return;

  const apply = () => {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    roots.forEach((root) => {
      root.querySelectorAll('[data-ko][data-en]').forEach((el) => {
        const value = el.getAttribute('data-' + lang);
        if (value !== null) el.textContent = value;
      });
    });
    const actions = document.getElementById('home-actions');
    if (actions) actions.style.visibility = 'visible';
  };

  apply();

  if (window.MutationObserver) {
    new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === 'attributes' && m.attributeName === 'lang')) apply();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
})();