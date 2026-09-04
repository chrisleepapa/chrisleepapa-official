/* Game Center: titles + remove retired Baduk EASY + GOAL card. */
'use strict';
(() => {
  const KO = ['부르마블 게임','책 쌓기 마스터','전략 오목','매직 컬링','테트리스','요정 포포의 여정','골이예요 (GOAL)'];
  const EN = ['Blue Marble Game','Book Stacking Master','Dynamic Omok','Magic Curling','Tetris','Fairy Popo’s Journey','GOAL'];

  function removeRetiredBaduk() {
    document.querySelectorAll('a.game-card[href*="baduk_easy.html"], img[src*="badukeasy"], [data-i18n="baduk_title"], [data-i18n="baduk_desc"]').forEach(el => {
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
      if (/바둑\s*EASY|Baduk\s*EASY/i.test(el.textContent || '')) el.remove();
    });
  }

  function ensureGoalCard() {
    const grid = document.querySelector('.game-cards');
    if (!grid || grid.querySelector('a[href*="goal.html"],a[href="/goal"]')) return;

    const card = document.createElement('a');
    card.href = '/goal.html';
    card.className = 'game-card game-card-image-mode';
    card.innerHTML = `
      <div class="card-image-bg bg-goal">
        <img src="/images/goal.png" alt="골이예요 GOAL — Miracle Shot 축구 슈팅 게임" loading="lazy">
      </div>
      <div class="card-overlay"></div>
      <div class="game-tag tag-goal">Sports Game</div>
      <div class="game-card-content-wrap">
        <h3 class="game-card-title">골이예요 (GOAL)</h3>
        <p class="game-card-desc" style="word-break:keep-all;">MIRACLE SHOT의 네 주인공 중 한 명을 선택해 거대한 점수벽을 향해 슛을 날리는 축구 게임입니다. 방향, 세기, 커브와 각도를 조절해 최고의 점수를 노려보세요.</p>
      </div>`;
    grid.appendChild(card);
  }

  function updateDescriptions() {
    document.querySelectorAll('meta[name="description"],meta[property="og:description"]').forEach(meta => {
      if (!meta.content) return;
      meta.content = meta.content.replace(/6가지|7가지/g,'7가지');
      if (!/골이예요|GOAL/i.test(meta.content)) meta.content += ' 골이예요(GOAL) 축구 슈팅 게임도 만나보세요.';
    });
    const intro = document.querySelector('[data-i18n="game_intro_desc"]');
    if (intro && !/골이예요|GOAL/i.test(intro.textContent || '')) {
      intro.innerHTML += ' <span style="color:#e8d08a;">새롭게 추가된 골이예요(GOAL)에서는 MIRACLE SHOT의 네 주인공과 함께 슈팅을 즐길 수 있습니다.</span>';
    }
  }

  function apply() {
    removeRetiredBaduk();
    ensureGoalCard();
    updateDescriptions();
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