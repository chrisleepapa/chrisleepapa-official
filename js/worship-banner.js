(() => {
  'use strict';

  function mount() {
    if (document.getElementById('worship-page-hero')) return;

    const header = document.querySelector('.page-header');
    if (!header) return;

    const image = 'images/My hymn3.jpg';
    const hero = document.createElement('section');
    hero.id = 'worship-page-hero';
    hero.setAttribute('aria-labelledby', 'worship-page-hero-title');
    hero.innerHTML = `
      <img class="worship-page-hero-image" src="${image}" alt="나의 찬양 Vol.3 앨범 이미지">
      <div class="worship-page-hero-overlay"></div>
      <div class="worship-page-hero-content">
        <div class="worship-page-hero-kicker">CHRIS LEE.PAPA · WORSHIP ARCHIVE</div>
        <h1 id="worship-page-hero-title">WORSHIP</h1>
        <p>영혼 깊은 곳에서 올려드리는 고백과 찬양</p>
      </div>
    `;

    header.replaceWith(hero);

    const style = document.createElement('style');
    style.id = 'worship-page-hero-style';
    style.textContent = `
      #worship-page-hero {
        position: relative;
        min-height: clamp(300px, 38vw, 500px);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        isolation: isolate;
        text-align: center;
        background: #050507;
      }
      .worship-page-hero-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 46%;
        z-index: -2;
      }
      .worship-page-hero-overlay {
        position: absolute;
        inset: 0;
        z-index: -1;
        background:
          linear-gradient(180deg, rgba(0,0,0,.38), rgba(0,0,0,.56) 48%, rgba(3,3,5,.94)),
          radial-gradient(circle at center, rgba(201,168,76,.10), transparent 58%);
      }
      .worship-page-hero-content {
        position: relative;
        z-index: 2;
        padding: 70px 20px 58px;
      }
      .worship-page-hero-kicker {
        margin-bottom: 14px;
        color: #c9a84c;
        font: 700 .68rem/1.5 Cinzel, serif;
        letter-spacing: .28em;
      }
      #worship-page-hero h1 {
        margin: 0;
        color: #e8d08a;
        font: 700 clamp(3rem, 9vw, 6.2rem)/1.05 Cinzel, serif;
        letter-spacing: .14em;
        text-shadow: 0 5px 35px rgba(0,0,0,.75), 0 0 32px rgba(201,168,76,.14);
      }
      #worship-page-hero p {
        margin: 18px 0 0;
        color: #e0d9c9;
        font-size: clamp(.85rem, 1.7vw, 1.05rem);
        letter-spacing: .08em;
      }
      @media (max-width: 760px) {
        #worship-page-hero { min-height: 330px; }
        .worship-page-hero-content { padding: 64px 16px 48px; }
        .worship-page-hero-kicker { letter-spacing: .18em; font-size: .58rem; }
        #worship-page-hero p { letter-spacing: .02em; }
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
