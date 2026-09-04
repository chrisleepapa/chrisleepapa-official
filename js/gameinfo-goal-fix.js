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
        <p class="game-card-desc">거대한 점수벽을 향해 슛을 날리고 가장 높은 점수를 노리는 1:1 축구 게임입니다.</p>
      </div>`;

    firstCard.parentElement.appendChild(card);
  }

  function addGoalGuide() {
    if (!isGameInfo()) return;
    if (document.querySelector('[data-goal-game-guide="true"]')) return;

    // game-auth removes the retired Baduk EASY guide (guide 6), so
    // the existing Fairy Popo guide (guide 7) becomes guide 6.
    const popoHeading = document.querySelector('[data-i18n="guide7_heading"]');
    if (!popoHeading) return;

    const popoBlock = popoHeading.closest('div[style*="border-bottom"], div[style*="padding-bottom"]');
    if (!popoBlock) return;

    // Keep the existing guide item's exact structure and only change its number/text.
    popoHeading.textContent = '⑥ 요정포포의 여정';
    popoHeading.removeAttribute('data-i18n');

    const popoDesc = popoBlock.querySelector('[data-i18n="guide7_desc"]');
    if (popoDesc) {
      popoDesc.textContent = '요정 포포를 조종해 하늘에서 떨어지는 장애물을 피하고, 화면에 등장하는 아이템을 먹으며 끝까지 살아남는 액션 게임입니다.';
      popoDesc.removeAttribute('data-i18n');
    }

    // Clone the real Popo guide item so GOAL has exactly the same
    // structure, spacing, borders and typography as the existing guide items.
    const item = popoBlock.cloneNode(true);
    item.dataset.goalGameGuide = 'true';

    const heading = item.querySelector('[data-i18n="guide7_heading"]');
    if (heading) {
      heading.textContent = '⑦ 골이예요';
      heading.removeAttribute('data-i18n');
    }

    const desc = item.querySelector('[data-i18n="guide7_desc"]');
    if (desc) {
      desc.textContent = 'MIRACLE SHOT의 네 주인공 중 한 명을 선택해 거대한 점수벽을 향해 슛을 날리고, 맞힌 점수를 누적해 승부를 겨루는 1:1 축구 게임입니다.';
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
        .goal-game-card:hover,
        .goal-game-card:focus-visible { transform:translateY(-12px) scale(1.02); border-color:var(--gold-light); box-shadow:0 20px 60px rgba(201,168,76,0.25); }
        .goal-game-card:hover .goal-game-card-image img,
        .goal-game-card:focus-visible .goal-game-card-image img { transform:scale(1.05); }
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
