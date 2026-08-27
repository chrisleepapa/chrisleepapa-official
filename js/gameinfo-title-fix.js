/* Game Center: language-only titles + remove retired Baduk EASY card. */
'use strict';
(() => {
  const KO = ['부르마블 게임','책 쌓기 마스터','전략 오목','매직 컬링','테트리스','요정 포포의 여정'];
  const EN = ['Blue Marble Game','Book Stacking Master','Dynamic Omok','Magic Curling','Tetris','Fairy Popo’s Journey'];

  function removeRetiredBaduk() {
    document.querySelectorAll('a[href*="baduk_easy.html"], img[src*="badukeasy"], [data-i18n="baduk_title"], [data-i18n="baduk_desc"]').forEach(el => {
      const card = el.closest('.game-card');
      if (card) card.remove();
      else el.remove();
    });

    document.querySelectorAll('meta').forEach(meta => {
      const attrs = [meta.getAttribute('content') || '', meta.getAttribute('property') || '', meta.getAttribute('name') || ''];
      if (attrs.some(v => /바둑\s*EASY|baduk\s*easy/i.test(v))) {
        const content = meta.getAttribute('content');
        if (content) {
          const cleaned = content
            .replace(/,?\s*바둑\s*EASY\s*/gi, '')
            .replace(/,?\s*바둑EASY\s*/gi, '')
            .replace(/·바둑EASY/g, '')
            .replace(/·바둑 EASY/g, '')
            .replace(/\s{2,}/g, ' ')
            .replace(/\s+까지 무료로/, '까지 무료로');
          meta.setAttribute('content', cleaned);
        }
      }
    });

    document.querySelectorAll('body *').forEach(el => {
      if (el.children.length) return;
      if (/바둑\s*EASY|Baduk\s*EASY/i.test(el.textContent || '')) {
        el.remove();
      }
    });
  }

  function apply() {
    removeRetiredBaduk();
    const titles = document.querySelectorAll('.game-card-title');
    if (!titles.length) return;
    const lang = (document.documentElement.lang || 'ko').toLowerCase().startsWith('en') ? 'en' : 'ko';
    titles.forEach((el, i) => {
      const value = (lang === 'en' ? EN : KO)[i];
      if (value) el.textContent = value;
    });
  }

  window.gameInfoTitleFix = apply;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();

  new MutationObserver(mutations => {
    if (mutations.some(m => m.type === 'attributes' && m.attributeName === 'lang')) apply();
  }).observe(document.documentElement, { attributes: true });

  const observer = new MutationObserver(apply);
  observer.observe(document.body, { childList: true, subtree: true });
})();
