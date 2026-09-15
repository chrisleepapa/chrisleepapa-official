(() => {
  'use strict';

  function insertCreatorNote() {
    if (location.pathname.replace(/\/$/, '') !== '/gameinfo') return;
    if (document.querySelector('[data-clp-game-creator-note]')) return;

    const wrapper = document.querySelector('.game-selection-wrapper');
    if (!wrapper) return;

    const heading = wrapper.querySelector('.section-heading-title');
    const anchor = heading?.closest('div');
    const note = document.createElement('section');
    note.dataset.clpGameCreatorNote = 'true';
    note.setAttribute('aria-labelledby', 'game-creator-note-title');
    note.innerHTML = `
      <div class="clp-game-creator-note">
        <p class="clp-game-creator-kicker">THE MAKING OF THE GAME ARCHIVE</p>
        <h2 id="game-creator-note-title">놀이를 직접 만들어 보는 과정</h2>
        <p class="clp-game-creator-lead">이 Game Archive는 다른 게임을 모아 놓은 목록이 아니라, Chris LEE.PAPA가 직접 기획하고 구현해 본 인터랙티브 창작 기록입니다.</p>
        <div class="clp-game-creator-grid">
          <div><strong>아이디어 → 규칙</strong><span>간단한 아이디어를 실제로 플레이할 수 있는 규칙과 목표로 바꾸는 과정을 실험했습니다.</span></div>
          <div><strong>캐릭터 → 인터랙션</strong><span>캐릭터와 이미지가 화면 안에서 움직이고 반응하도록 UI와 게임 동작을 함께 설계했습니다.</span></div>
          <div><strong>플레이 → 개선</strong><span>직접 플레이하면서 조작감, 화면 구성, 난이도와 피드백을 계속 다듬는 방식으로 완성도를 높였습니다.</span></div>
        </div>
        <p class="clp-game-creator-close">작은 게임 하나도 결국 하나의 이야기와 경험이 될 수 있다고 생각합니다. 이곳에서는 그 실험과 결과를 함께 볼 수 있습니다.</p>
      </div>
    `;

    const style = document.createElement('style');
    style.dataset.clpGameCreatorStyle = 'true';
    style.textContent = `
      .clp-game-creator-note{width:min(980px,100%);margin:0 auto 48px;padding:30px 34px;border:1px solid rgba(201,168,76,.18);border-radius:22px;background:rgba(10,10,18,.72);box-sizing:border-box;color:#c8c3bb;line-height:1.8}
      .clp-game-creator-kicker{margin:0 0 8px;color:#c9a84c;font:600 .72rem/1.4 Cinzel,serif;letter-spacing:.16em}
      .clp-game-creator-note h2{margin:0 0 12px;color:#f0ece4;font:500 clamp(1.5rem,4vw,2.1rem)/1.3 'Cormorant Garamond','Noto Serif KR',serif}
      .clp-game-creator-lead{margin:0;max-width:850px;color:#d5d0c8;font-size:1rem}
      .clp-game-creator-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:22px}
      .clp-game-creator-grid>div{padding:18px;border:1px solid rgba(255,255,255,.07);border-radius:16px;background:rgba(255,255,255,.025)}
      .clp-game-creator-grid strong{display:block;margin-bottom:7px;color:#fff}
      .clp-game-creator-grid span{display:block;font-size:.88rem}
      .clp-game-creator-close{margin:22px 0 0;color:#aaa49b}
      @media(max-width:700px){
        .clp-game-creator-note{padding:22px 16px;margin:0 12px 32px;width:auto;border-radius:18px;line-height:1.72}
        .clp-game-creator-kicker{font-size:.62rem;letter-spacing:.11em;line-height:1.5;white-space:normal;overflow-wrap:anywhere}
        .clp-game-creator-note h2{font-size:1.35rem;line-height:1.45;margin-bottom:10px;word-break:keep-all}
        .clp-game-creator-lead{font-size:.9rem;line-height:1.75;word-break:keep-all}
        .clp-game-creator-grid{grid-template-columns:1fr;gap:10px;margin-top:18px}
        .clp-game-creator-grid>div{padding:14px 15px;border-radius:13px}
        .clp-game-creator-grid strong{font-size:.92rem;line-height:1.5;margin-bottom:5px;word-break:keep-all}
        .clp-game-creator-grid span{font-size:.82rem;line-height:1.7;word-break:keep-all}
        .clp-game-creator-close{font-size:.84rem;line-height:1.75;margin-top:17px;word-break:keep-all}
      }
      @media(max-width:390px){
        .clp-game-creator-note{padding:20px 14px;margin-left:8px;margin-right:8px}
        .clp-game-creator-note h2{font-size:1.25rem}
        .clp-game-creator-lead{font-size:.86rem}
        .clp-game-creator-grid span{font-size:.79rem}
      }
    `;

    document.head.appendChild(style);
    if (anchor && anchor.parentNode === wrapper) {
      wrapper.insertBefore(note, anchor.nextSibling);
    } else {
      wrapper.insertBefore(note, wrapper.firstChild);
    }
  }

  function start() {
    insertCreatorNote();
    let attempts = 0;
    const timer = setInterval(() => {
      insertCreatorNote();
      attempts += 1;
      if (document.querySelector('[data-clp-game-creator-note]') || attempts >= 50) clearInterval(timer);
    }, 200);

    const observer = new MutationObserver(() => insertCreatorNote());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
