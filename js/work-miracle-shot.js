/* WORKS detail enhancement: Miracle Shot */
'use strict';
(() => {
  const page = (location.pathname.split('/').pop() || '').replace(/\.html$/i, '').toLowerCase();
  if (page !== 'miracleshot') return;

  function render(){
    if (document.getElementById('work-story-enhancement')) return;
    const container = document.querySelector('.container');
    if (!container) return;

    const style = document.createElement('style');
    style.textContent = `
      #work-story-enhancement{max-width:900px;margin:90px auto 30px;padding:0 20px}
      .wse-shell{border-top:1px solid rgba(201,168,76,.22);padding-top:42px}
      .wse-kicker{font:700 .68rem Cinzel,serif;letter-spacing:.25em;color:#00d4ff;text-align:center;margin-bottom:12px}
      .wse-title{margin:0 0 18px;text-align:center;font:600 clamp(2rem,5vw,3.2rem)/1.05 'Cormorant Garamond',serif;color:#f0ece4}
      .wse-lead{max-width:760px;margin:0 auto 42px;text-align:center;color:#bdb9c0;font:400 .95rem/2 Pretendard,'Noto Serif KR',sans-serif;word-break:keep-all}
      .wse-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
      .wse-card{padding:25px 22px;border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(255,255,255,.025)}
      .wse-num{display:block;color:#c9a84c;font:700 .68rem Cinzel,serif;letter-spacing:.16em;margin-bottom:12px}
      .wse-card h3{margin:0 0 10px;color:#e8d08a;font:600 1.05rem/1.3 'Noto Serif KR',serif}
      .wse-card p{margin:0;color:#aaa7ad;font:400 .86rem/1.85 Pretendard,'Noto Serif KR',sans-serif;word-break:keep-all}
      .wse-quote{margin:38px auto 0;max-width:760px;padding:24px 28px;border-left:2px solid #c9a84c;background:rgba(201,168,76,.045);color:#d9d4cc;font:400 .92rem/1.9 'Noto Serif KR',serif;word-break:keep-all}
      .wse-meta{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;margin-top:28px}
      .wse-meta span{padding:7px 12px;border:1px solid rgba(255,255,255,.1);border-radius:999px;color:#8f8b93;font:.68rem Pretendard,sans-serif}
      .wse-journal{display:flex;justify-content:center;margin-top:30px}
      .wse-journal a{display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border:1px solid rgba(201,168,76,.35);border-radius:999px;color:#e8d08a;font:.75rem Pretendard,sans-serif;transition:.25s}
      .wse-journal a:hover{background:rgba(201,168,76,.08);transform:translateY(-2px)}
      @media(max-width:720px){#work-story-enhancement{margin-top:65px}.wse-grid{grid-template-columns:1fr}.wse-card{padding:22px}.wse-lead{font-size:.9rem;line-height:1.85}.wse-quote{padding:20px 22px}}
    `;
    document.head.appendChild(style);

    const section = document.createElement('section');
    section.id = 'work-story-enhancement';
    section.innerHTML = `
      <div class="wse-shell">
        <div class="wse-kicker">CREATOR'S NOTE</div>
        <h2 class="wse-title">Why I Made Miracle Shot</h2>
        <p class="wse-lead">Miracle Shot은 단순히 풋살을 소재로 만든 이야기가 아닙니다. 서로 다른 아이들이 실패를 겪고도 다시 일어나 서로를 믿는 순간, 혼자서는 만들 수 없었던 기적이 시작된다는 이야기를 담고 싶었습니다.</p>
        <div class="wse-grid">
          <article class="wse-card"><span class="wse-num">01 · THE IDEA</span><h3>왜 풋살이었을까?</h3><p>좁은 코트에서는 한 사람의 재능만으로 경기를 풀어갈 수 없습니다. 네 아이가 계속 패스하고 움직이며 서로를 믿어야 한다는 점이 이 이야기의 주제와 잘 맞았습니다.</p></article>
          <article class="wse-card"><span class="wse-num">02 · THE CHARACTERS</span><h3>네 명의 다른 아이들</h3><p>영, 황, 길, 고는 각자 잘하는 것이 다릅니다. 골키퍼, 슈터, 스피드, 패스라는 능력보다 중요한 것은 서로의 부족한 부분을 받아들이는 과정입니다.</p></article>
          <article class="wse-card"><span class="wse-num">03 · THE MESSAGE</span><h3>혼자가 아닌 팀</h3><p>아이들이 실패를 피하는 이야기가 아니라 실패를 지나 함께 성장하는 이야기를 만들고 싶었습니다. 마지막의 한 발은 한 사람의 슛이 아니라 네 사람의 믿음으로 완성됩니다.</p></article>
        </div>
        <div class="wse-quote">“아이들이 각자의 재능을 자랑하는 것이 아니라, 서로 다른 아이들이 한 팀이 되었을 때 만들어지는 순간을 이야기하고 싶었습니다.”</div>
        <div class="wse-meta"><span>Original IP</span><span>Sports Fantasy</span><span>Futsal Story</span><span>Created by Chris LEE.PAPA</span></div>
        <div class="wse-journal"><a href="journal.html">Chris's Note에서 제작 이야기도 읽어보기 →</a></div>
      </div>`;

    const lightbox = document.getElementById('lightbox-overlay');
    container.insertBefore(section, lightbox || null);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render,{once:true});
  else render();
})();
