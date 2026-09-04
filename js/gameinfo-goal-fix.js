(() => {
  'use strict';

  const isGameInfo = () => location.pathname.endsWith('/gameinfo') || location.pathname.endsWith('/gameinfo.html');

  function addGoalCard() {
    if (!isGameInfo()) return;
    if (document.querySelector('[data-goal-game-card="true"]')) return;

    const firstCard = document.querySelector('.game-card');
    if (!firstCard || !firstCard.parentElement) return;

    const card = document.createElement('a');
    card.href = '/goal.html';
    card.className = 'game-card goal-game-card';
    card.dataset.goalGameCard = 'true';
    card.setAttribute('aria-label', '골이예요 GOAL');
    card.innerHTML = `
      <div class="game-card-image goal-game-card-image">
        <img src="/images/goal.png" alt="골이예요 GOAL" loading="lazy">
      </div>
      <div class="game-card-content">
        <span class="game-card-tag">MIRACLE SHOT GAME</span>
        <h3 class="game-card-title">골이예요 <span>GOAL</span></h3>
        <p class="game-card-desc">MIRACLE SHOT의 네 주인공 중 한 명을 선택해 거대한 점수벽을 향해 슛을 날려 최고의 점수를 노리는 축구 게임입니다.</p>
      </div>`;

    firstCard.parentElement.appendChild(card);
  }

  function addGoalGuide() {
    if (!isGameInfo()) return;
    if (document.querySelector('[data-goal-game-guide="true"]')) return;

    // game-auth removes the retired Baduk EASY guide (guide 6), so the
    // existing Fairy Popo guide (guide 7) becomes the sixth guide.
    const popoHeading = document.querySelector('[data-i18n="guide7_heading"]');
    if (!popoHeading) return;

    const popoBlock = popoHeading.closest('div[style*="border-bottom"], div[style*="padding-bottom"]');
    if (!popoBlock) return;

    // Renumber Fairy Popo from ⑦ to ⑥ while keeping its original formatting.
    const popoHeadingText = (popoHeading.textContent || '').replace(/^⑦\s*/, '');
    popoHeading.textContent = `⑥ ${popoHeadingText}`;
    popoHeading.removeAttribute('data-i18n');

    // Clone the real guide item so GOAL uses exactly the same structure,
    // spacing, borders and typography as the existing All Games Guide items.
    const item = popoBlock.cloneNode(true);
    item.dataset.goalGameGuide = 'true';

    const heading = item.querySelector('[data-i18n="guide7_heading"]');
    if (heading) {
      heading.textContent = '⑦ 골이예요 GOAL — MIRACLE SHOT / Sports';
      heading.removeAttribute('data-i18n');
    }

    const desc = item.querySelector('[data-i18n="guide7_desc"]');
    if (desc) {
      desc.textContent = `MIRACLE SHOT의 네 주인공 황·길·고·영 중 한 명을 선택해 거대한 점수벽을 향해 슛을 날리는 1:1 축구 게임입니다.\n                            COMPUTER 또는 PLAYER 2와 대결할 수 있으며, 각 세트마다 양쪽이 한 번씩 슛을 시도합니다. 총 5세트의 누적 점수로 승부를 결정하고, 동점이면 승부가 날 때까지 연장 슛을 진행합니다.\n                            공을 터치한 뒤 드래그하여 방향·세기·커브·각도를 조절하세요. 거대한 점수벽에는 -100부터 +100까지의 점수판이 무작위로 배치되며, 맞힌 점수가 그대로 누적됩니다. 정확한 슛과 전략적인 조준으로 최고의 점수에 도전하세요.`;
      desc.removeAttribute('data-i18n');
    }

    popoBlock.insertAdjacentElement('afterend', item);
  }

  function init() {
    if (!isGameInfo()) return;

    if (!document.getElementById('goal-game-fix-style')) {
      const style = document.createElement('style');
      style.id = 'goal-game-fix-style';
      style.textContent = `
        .goal-game-card-image { overflow:hidden; background:#050509; aspect-ratio:16/9; }
        .goal-game-card-image img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .45s ease; }
        .goal-game-card:hover .goal-game-card-image img { transform:scale(1.05); }
      `;
      document.head.appendChild(style);
    }

    addGoalCard();
    addGoalGuide();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();

  new MutationObserver(init).observe(document.documentElement, { childList:true, subtree:true });
})();
