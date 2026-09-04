(() => {
  'use strict';

  function addGoalCard() {
    if (!location.pathname.endsWith('/gameinfo') && !location.pathname.endsWith('/gameinfo.html')) return;
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

  function init() {
    const style = document.createElement('style');
    style.textContent = `
      .goal-game-card-image { overflow:hidden; background:#050509; aspect-ratio:16/9; }
      .goal-game-card-image img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .45s ease; }
      .goal-game-card:hover .goal-game-card-image img { transform:scale(1.05); }
    `;
    document.head.appendChild(style);

    addGoalCard();
    new MutationObserver(addGoalCard).observe(document.body, { childList:true, subtree:true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
