(() => {
  'use strict';

  const isGameInfo = () => location.pathname.endsWith('/gameinfo') || location.pathname.endsWith('/gameinfo.html');

  function addGoalCard() {
    if (!isGameInfo()) return;
    if (document.querySelector('a.goal-game-card')) return;

    const popoCard = document.querySelector('.game-card[href="switch.html"], .game-card[href="/switch.html"]');
    if (!popoCard || !popoCard.parentElement) return;

    // Clone the existing Popo card so GOAL uses exactly the same card structure,
    // image treatment, spacing, hover behavior and yellow border effect.
    const card = popoCard.cloneNode(true);
    card.classList.add('goal-game-card');
    card.href = '/goal.html';
    card.setAttribute('aria-label', '골이예요 GOAL');

    const image = card.querySelector('.card-image-bg img');
    if (image) {
      image.src = '/images/goal.png';
      image.alt = '골이예요 GOAL';
    }

    const tag = card.querySelector('.game-tag');
    if (tag) {
      tag.textContent = 'MIRACLE SHOT GAME';
      tag.className = 'game-tag tag-switch';
    }

    const title = card.querySelector('.game-card-title');
    if (title) {
      title.textContent = '골이예요 GOAL';
      title.removeAttribute('data-i18n');
    }

    const desc = card.querySelector('.game-card-desc');
    if (desc) {
      desc.textContent = 'MIRACLE SHOT의 네 주인공 중 한 명을 선택해 거대한 점수벽을 향해 슛을 날리고, 맞힌 점수를 누적해 승부를 겨루는 1:1 축구 게임입니다.';
      desc.removeAttribute('data-i18n');
    }

    popoCard.insertAdjacentElement('afterend', card);
  }

  function addGoalGuide() {
    if (!isGameInfo()) return;
    if (document.querySelector('[data-goal-game-guide="true"]')) return;

    const popoHeading = document.querySelector('[data-i18n="guide7_heading"]');
    if (!popoHeading) return;

    const popoBlock = popoHeading.closest('div[style*="border-bottom"], div[style*="padding-bottom"]');
    if (!popoBlock) return;

    // Existing Popo guide becomes number 6.
    popoHeading.textContent = '⑥ 요정포포의 여정';
    popoHeading.removeAttribute('data-i18n');

    const popoDesc = popoBlock.querySelector('[data-i18n="guide7_desc"]');
    if (popoDesc) {
      popoDesc.textContent = '요정 포포를 조종해 하늘에서 떨어지는 장애물을 피하고, 화면에 등장하는 아이템을 먹으며 끝까지 살아남는 액션 게임입니다.';
      popoDesc.removeAttribute('data-i18n');
    }

    // Clone the real Popo guide item for GOAL so its formatting is identical.
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
        .goal-game-card.game-card-image-mode:hover,
        .goal-game-card.game-card-image-mode:focus-visible {
          transform:translateY(-12px) scale(1.02);
          border-color:var(--gold-light);
          box-shadow:0 20px 60px rgba(201,168,76,0.25);
        }
        .goal-game-card.game-card-image-mode:hover .card-image-bg,
        .goal-game-card.game-card-image-mode:focus-visible .card-image-bg { transform:scale(1.08); }
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