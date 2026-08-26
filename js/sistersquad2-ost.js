/* SISTER SQUAD 2 — Original Soundtrack cards */
'use strict';
(() => {
  const page=(location.pathname.split('/').pop()||'').replace(/\.html$/i,'').toLowerCase();
  if(page!=='sistersquad2') return;
  const init=()=>{
    if(document.getElementById('ss2-ost-cards')) return;
    const note=document.querySelector('.ost-note');
    if(!note) return;
    const section=document.createElement('section');
    section.id='ss2-ost-cards';
    section.innerHTML=`
      <style>
        #ss2-ost-cards{margin:0 auto 90px;max-width:1000px}
        #ss2-ost-cards .ss2-ost-kicker{display:block;text-align:center;color:#e8d08a;font-family:Cinzel,serif;font-size:.72rem;letter-spacing:.25em;margin-bottom:10px}
        #ss2-ost-cards .ss2-ost-title{margin:0;text-align:center;color:#fff;font-family:Cinzel,serif;font-size:clamp(1.35rem,3vw,1.9rem);letter-spacing:.12em}
        #ss2-ost-cards .ss2-ost-desc{max-width:680px;margin:14px auto 30px;text-align:center;color:#aeb1c0;font-size:.82rem;line-height:1.8;word-break:keep-all}
        #ss2-ost-cards .ss2-ost-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        #ss2-ost-cards .ss2-ost-card{position:relative;min-height:220px;padding:26px 22px 22px;border-radius:20px;border:1px solid rgba(255,255,255,.09);background:linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.015));display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s}
        #ss2-ost-cards .ss2-ost-card:before{content:'';position:absolute;width:130px;height:130px;border-radius:50%;right:-55px;top:-55px;background:var(--ss2-accent);opacity:.12;filter:blur(4px)}
        #ss2-ost-cards .ss2-ost-card:hover{transform:translateY(-6px);border-color:var(--ss2-accent);box-shadow:0 18px 45px rgba(0,0,0,.35),0 0 22px color-mix(in srgb,var(--ss2-accent) 18%,transparent)}
        #ss2-ost-cards .ss2-ost-card.main{--ss2-accent:#e8d08a}.ss2-ost-card.inst{--ss2-accent:#6fd7ff}.ss2-ost-card.eng{--ss2-accent:#ff8a65}
        #ss2-ost-cards .ss2-ost-type{display:inline-block;align-self:flex-start;padding:5px 10px;border:1px solid color-mix(in srgb,var(--ss2-accent) 65%,transparent);border-radius:999px;color:var(--ss2-accent);font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.16em}
        #ss2-ost-cards h3{margin:22px 0 6px;color:#fff;font-family:Cinzel,serif;font-size:1.18rem;letter-spacing:.08em}
        #ss2-ost-cards p{margin:0;color:#8f94a5;font-size:.72rem;line-height:1.65}
        #ss2-ost-cards .ss2-ost-links{display:flex;gap:8px;margin-top:22px}
        #ss2-ost-cards .ss2-ost-links a{flex:1;text-align:center;padding:9px 7px;border-radius:9px;font-family:Pretendard,sans-serif;font-size:.62rem;font-weight:600;letter-spacing:.05em;transition:.25s}
        #ss2-ost-cards .ss2-youtube{border:1px solid rgba(255,0,0,.45);color:#ff6b6b;background:rgba(255,0,0,.06)}
        #ss2-ost-cards .ss2-youtube:hover{background:rgba(255,0,0,.16)}
        #ss2-ost-cards .ss2-spotify{border:1px solid rgba(29,185,84,.45);color:#6ee7a0;background:rgba(29,185,84,.06)}
        #ss2-ost-cards .ss2-spotify:hover{background:rgba(29,185,84,.16)}
        @media(max-width:760px){#ss2-ost-cards .ss2-ost-grid{grid-template-columns:1fr}#ss2-ost-cards .ss2-ost-card{min-height:185px;padding:22px 19px}}
      </style>
      <span class="ss2-ost-kicker">ORIGINAL SOUNDTRACK</span>
      <h2 class="ss2-ost-title">SISTER SQUAD 2 OST</h2>
      <p class="ss2-ost-desc">SISTER SQUAD 2의 음악을 세 가지 버전으로 만날 수 있습니다. Main, Instrumental, English Edition을 각각 감상해보세요.</p>
      <div class="ss2-ost-grid">
        <article class="ss2-ost-card main"><div><span class="ss2-ost-type">MAIN</span><h3>SISTER SQUAD 2</h3><p>Original soundtrack · Main Edition</p></div><div class="ss2-ost-links"><a class="ss2-youtube" href="https://youtube.com/playlist?list=OLAK5uy_l3U9R17KJHI7S9KmNghpZB4x0UwQZ7Ays&si=I9swsYXdJVfuwb-u" target="_blank" rel="noopener noreferrer">YOUTUBE</a><a class="ss2-spotify" href="https://open.spotify.com/album/0I7RHUq69cULsANnEFvQ4k?si=dBKTAPeVR3utuy4J2uvSwA" target="_blank" rel="noopener noreferrer">SPOTIFY</a></div></article>
        <article class="ss2-ost-card inst"><div><span class="ss2-ost-type">INST</span><h3>INSTRUMENTAL</h3><p>Original soundtrack · Instrumental Edition</p></div><div class="ss2-ost-links"><a class="ss2-youtube" href="https://youtube.com/playlist?list=OLAK5uy_nGd1bPJ7YwYlGbQG9DmIbbULjA426BhpA&si=0iJqpPu9BmbySWoK" target="_blank" rel="noopener noreferrer">YOUTUBE</a><a class="ss2-spotify" href="https://open.spotify.com/album/5w23wx8ihguUVltYUwBJB6?si=VxsMEeShQDaccNwRxrd4ng" target="_blank" rel="noopener noreferrer">SPOTIFY</a></div></article>
        <article class="ss2-ost-card eng"><div><span class="ss2-ost-type">ENG</span><h3>ENGLISH EDITION</h3><p>Original soundtrack · English Edition</p></div><div class="ss2-ost-links"><a class="ss2-youtube" href="https://youtube.com/playlist?list=OLAK5uy_kmoWB2g7y9KqX45Zfj7IB293OlpVhjkCY&si=iFvkVfSjnnAifxW7" target="_blank" rel="noopener noreferrer">YOUTUBE</a><a class="ss2-spotify" href="https://open.spotify.com/album/74AEW3zgsEOQ4qA7IpWL0G?si=PL4tWdU0SZm2oz5Vdzd_5A" target="_blank" rel="noopener noreferrer">SPOTIFY</a></div></article>
      </div>`;
    note.insertAdjacentElement('afterend',section);
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
