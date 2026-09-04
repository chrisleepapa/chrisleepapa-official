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

    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,strong,div,span')];
    const guideHeading = headings.find(el => {
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
      return text === '게임 가이드' || text === 'GAME GUIDE' || text.includes('게임 가이드') || text.includes('GAME GUIDE');
    });
    if (!guideHeading) return;

    const guideSection = guideHeading.closest('section') || guideHeading.parentElement;
    if (!guideSection) return;

    const item = document.createElement('article');
    item.dataset.goalGameGuide = 'true';
    item.className = 'goal-game-guide-item';
    item.innerHTML = `
      <div class="goal-guide-kicker">MIRACLE SHOT · GAME</div>
      <h3>골이예요 GOAL</h3>
      <p><strong>골이예요 GOAL</strong>은 MIRACLE SHOT의 네 주인공 <strong>황·길·고·영</strong> 중 한 명을 선택해 거대한 점수벽을 향해 슛을 날리는 1:1 축구 게임입니다.</p>
      <p>컴퓨터 또는 PLAYER 2와 대결할 수 있으며, 각 세트마다 한 번씩 슛을 시도해 <strong>5세트 누적 점수</strong>로 승부합니다. 동점이면 승부가 날 때까지 연장 슛을 진행합니다.</p>
      <p>공을 터치한 뒤 드래그하여 <strong>방향·세기·커브·각도</strong>를 조절하세요. 점수벽에는 <strong>-100부터 +100</strong>까지의 다양한 점수판이 무작위로 배치되며, 맞힌 점수가 그대로 누적됩니다.</p>
      <p>높은 점수판을 정확하게 노리는 것뿐 아니라, 거리와 각도를 계산해 최고의 슛을 만들어내는 것이 핵심입니다.</p>
      <a href="/goal.html" class="goal-guide-link">PLAY GOAL →</a>`;

    guideSection.appendChild(item);
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
        .goal-game-guide-item { margin-top:28px; padding:28px 30px; border:1px solid rgba(201,168,76,.22); border-radius:18px; background:linear-gradient(145deg,rgba(15,15,22,.78),rgba(5,5,8,.88)); color:rgba(240,236,228,.78); text-align:left; line-height:1.8; }
        .goal-game-guide-item h3 { margin:6px 0 12px; color:#fff; font-size:1.35rem; }
        .goal-game-guide-item p { margin:8px 0; }
        .goal-guide-kicker { color:#c9a84c; font-size:.68rem; font-weight:700; letter-spacing:2px; }
        .goal-guide-link { display:inline-block; margin-top:14px; color:#e8d08a; font-weight:700; text-decoration:none; letter-spacing:1px; }
        .goal-guide-link:hover { text-decoration:underline; }
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
