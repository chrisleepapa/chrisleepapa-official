(() => {
  'use strict';

  function mount() {
    if (document.getElementById('worship-confession')) return;

    const intro = document.querySelector('main.container .intro');
    if (!intro) return;

    const section = document.createElement('section');
    section.id = 'worship-confession';
    section.className = 'worship-confession';
    section.setAttribute('aria-labelledby', 'worship-confession-title');
    section.innerHTML = `
      <div class="worship-confession-inner">
        <div class="worship-confession-kicker">THE BEGINNING OF WORSHIP</div>
        <div class="worship-confession-line" aria-hidden="true"></div>
        <h2 id="worship-confession-title">그날, 나는 죽었고<br><span>다시 살아났습니다</span></h2>
        <p class="worship-confession-lead">세상의 모든 것이 무너진 것 같았던 그날,<br>이전의 나는 죽었습니다.</p>
        <p>그리고 예수 그리스도의 보혈로<br>다시 살아난 하나님의 자녀로<br>새로운 삶을 시작했습니다.</p>
        <p><strong>WORSHIP은 바로 그 자리에서 시작되었습니다.</strong></p>
        <p>내가 무엇인가를 잘해서가 아니라<br>끝까지 나를 놓지 않으신 하나님의 신실하심과<br>완전하신 사랑을 기억하고 찬송하기 위해<br>노래를 만들기 시작했습니다.</p>
        <blockquote>“나의 찬양은 내가 하나님께 무엇을 드리는 이야기가 아니라,<br class="desktop-break"> 하나님께서 먼저 나에게 무엇을 주셨는지를 고백하는 노래입니다.”</blockquote>
      </div>
    </section>`;

    const style = document.createElement('style');
    style.id = 'worship-confession-style';
    style.textContent = `
      .worship-confession {
        position: relative;
        margin: 0 0 76px;
        padding: 76px 28px 82px;
        overflow: hidden;
        border-top: 1px solid rgba(201,168,76,.18);
        border-bottom: 1px solid rgba(201,168,76,.18);
        background:
          radial-gradient(circle at 50% 0%, rgba(201,168,76,.11), transparent 48%),
          linear-gradient(180deg, rgba(255,255,255,.018), rgba(255,255,255,0));
        text-align: center;
      }
      .worship-confession::before {
        content: '✦';
        position: absolute;
        top: 22px;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(201,168,76,.42);
        font-size: 12px;
      }
      .worship-confession-inner { max-width: 880px; margin: 0 auto; }
      .worship-confession-kicker {
        color: #c9a84c;
        font: 700 .72rem/1.5 Cinzel, serif;
        letter-spacing: .28em;
      }
      .worship-confession-line {
        width: 56px;
        height: 1px;
        margin: 18px auto 28px;
        background: linear-gradient(90deg, transparent, #c9a84c, transparent);
      }
      .worship-confession h2 {
        margin: 0 0 30px;
        color: #f5f1e8;
        font-family: 'Noto Serif KR', 'Noto Serif', serif;
        font-size: clamp(2rem, 5vw, 3.8rem);
        font-weight: 500;
        line-height: 1.38;
        letter-spacing: -.025em;
        text-shadow: 0 0 34px rgba(201,168,76,.12);
      }
      .worship-confession h2 span { color: #d9b95b; }
      .worship-confession p {
        margin: 0 auto 24px;
        color: #bfc3cc;
        font-family: 'Noto Serif KR', 'Noto Serif', serif;
        font-size: clamp(.98rem, 1.7vw, 1.12rem);
        line-height: 2;
        letter-spacing: -.01em;
      }
      .worship-confession .worship-confession-lead { color: #e1e0dc; margin-bottom: 30px; }
      .worship-confession strong { color: #eee5ca; font-weight: 600; }
      .worship-confession blockquote {
        position: relative;
        margin: 44px auto 0;
        padding: 30px 22px 0;
        border: 0;
        color: #d9b95b;
        font-family: 'Noto Serif KR', 'Noto Serif', serif;
        font-size: clamp(1.05rem, 2vw, 1.35rem);
        line-height: 1.9;
        font-weight: 600;
        letter-spacing: -.015em;
        text-shadow: 0 0 28px rgba(201,168,76,.13);
      }
      .worship-confession blockquote::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 90px;
        height: 1px;
        transform: translateX(-50%);
        background: linear-gradient(90deg, transparent, rgba(201,168,76,.8), transparent);
      }
      @media (max-width:760px) {
        .worship-confession { margin-bottom: 56px; padding: 60px 18px 66px; }
        .worship-confession h2 { margin-bottom: 25px; }
        .worship-confession p { line-height: 1.9; }
        .desktop-break { display: none; }
      }
    `;

    document.head.appendChild(style);
    intro.insertAdjacentElement('afterend', section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
