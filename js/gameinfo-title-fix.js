/* Game Center: language-only titles for ALL GAME GUIDE. */
'use strict';
(() => {
  const KO = ['부르마블 게임','책 쌓기 마스터','전략 오목','매직 컬링','테트리스','바둑 EASY','요정 포포의 여정'];
  const EN = ['Blue Marble Game','Book Stacking Master','Dynamic Omok','Magic Curling','Tetris','Baduk EASY','Fairy Popo’s Journey'];

  function apply() {
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
