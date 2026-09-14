(() => {
  'use strict';

  // Official Spotify playlist chosen by Chris LEE.PAPA for the Worship page.
  const PLAYLIST_ID = '5Uf6TrRZoQLHp5swSEhpCx';
  const EMBED_URL = `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`;

  function mount() {
    if (document.getElementById('worship-spotify-bg')) return;

    const wrap = document.createElement('aside');
    wrap.id = 'worship-spotify-bg';
    wrap.setAttribute('aria-label', 'Worship background music');
    wrap.innerHTML = `
      <button class="worship-spotify-close" type="button" aria-label="Hide worship music player">×</button>
      <div class="worship-spotify-label">WORSHIP BACKGROUND MUSIC</div>
      <iframe
        title="Worship background music playlist"
        src="${EMBED_URL}"
        width="100%"
        height="152"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #worship-spotify-bg {
        position: fixed;
        z-index: 9998;
        right: 18px;
        bottom: 18px;
        width: min(380px, calc(100vw - 36px));
        padding: 10px;
        border: 1px solid rgba(201,168,76,.28);
        border-radius: 16px;
        background: rgba(3,3,5,.94);
        box-shadow: 0 18px 55px rgba(0,0,0,.55);
        backdrop-filter: blur(14px);
      }
      #worship-spotify-bg iframe { display:block; width:100%; border-radius:10px; }
      .worship-spotify-label {
        padding: 2px 30px 8px 5px;
        color: #c9a84c;
        font: 700 10px/1.4 Cinzel, serif;
        letter-spacing: .16em;
      }
      .worship-spotify-close {
        position:absolute;
        top:7px;
        right:8px;
        z-index:2;
        width:25px;
        height:25px;
        border:0;
        border-radius:50%;
        background:rgba(255,255,255,.08);
        color:#fff;
        font-size:18px;
        line-height:25px;
        cursor:pointer;
      }
      .worship-spotify-close:hover { background:rgba(255,255,255,.16); }
      @media (max-width:760px) {
        #worship-spotify-bg { left:10px; right:10px; bottom:10px; width:auto; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(wrap);

    wrap.querySelector('.worship-spotify-close').addEventListener('click', () => {
      wrap.remove();
      style.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
