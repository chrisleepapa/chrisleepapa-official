/* SISTER SQUAD 2 — Embedded Original Soundtrack Player */
'use strict';
(() => {
  const page=(location.pathname.split('/').pop()||'').replace(/\.html$/i,'').toLowerCase();
  if(page!=='sistersquad2') return;

  const tracks={
    main:{label:'MAIN',title:'SISTER SQUAD 2',desc:'Original Soundtrack · Main Edition',playlist:'OLAK5uy_l3U9R17KJHI7S9KmNghpZB4x0UwQZ7Ays'},
    inst:{label:'INST',title:'INSTRUMENTAL',desc:'Original Soundtrack · Instrumental Edition',playlist:'OLAK5uy_nGd1bPJ7YwYlGbQG9DmIbbULjA426BhpA'},
    eng:{label:'ENG',title:'ENGLISH EDITION',desc:'Original Soundtrack · English Edition',playlist:'OLAK5uy_kmoWB2g7y9KqX45Zfj7IB293OlpVhjkCY'}
  };

  const init=()=>{
    if(document.getElementById('ss2-embedded-ost')) return;
    const oldNote=document.querySelector('.ost-note');
    const anchor=oldNote||document.querySelector('.section-title[data-i18n="ost_sec_title"]');
    if(!anchor) return;

    const section=document.createElement('section');
    section.id='ss2-embedded-ost';
    section.innerHTML=`
      <style>
        #ss2-embedded-ost{max-width:1000px;margin:0 auto 90px;padding:0 4px}
        #ss2-embedded-ost .ss2-ost-heading{text-align:center;margin-bottom:28px}
        #ss2-embedded-ost .ss2-ost-kicker{display:block;color:#e8d08a;font-family:Cinzel,serif;font-size:.7rem;letter-spacing:.25em;margin-bottom:9px}
        #ss2-embedded-ost .ss2-ost-title{margin:0;color:#fff;font-family:Cinzel,serif;font-size:clamp(1.35rem,3vw,1.9rem);letter-spacing:.12em}
        #ss2-embedded-ost .ss2-ost-desc{max-width:680px;margin:12px auto 0;color:#aeb1c0;font-size:.82rem;line-height:1.8;word-break:keep-all}
        #ss2-embedded-ost .ss2-ost-player{background:#000;border:1px solid rgba(255,255,255,.1);border-radius:20px;overflow:hidden;box-shadow:0 22px 55px rgba(0,0,0,.45);margin-bottom:20px}
        #ss2-embedded-ost .ss2-ost-frame{display:block;width:100%;aspect-ratio:16/9;border:0;background:#000}
        #ss2-embedded-ost .ss2-ost-current{padding:15px 20px;border-top:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.025)}
        #ss2-embedded-ost .ss2-ost-current strong{display:block;color:#fff;font-family:Cinzel,serif;font-size:.9rem;letter-spacing:.08em}
        #ss2-embedded-ost .ss2-ost-current span{display:block;color:#8f94a5;font-size:.7rem;margin-top:3px}
        #ss2-embedded-ost .ss2-ost-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        #ss2-embedded-ost .ss2-ost-card{cursor:pointer;text-align:left;min-height:150px;padding:22px 20px;border-radius:18px;border:1px solid rgba(255,255,255,.09);background:linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.015));transition:.3s;position:relative}
        #ss2-embedded-ost .ss2-ost-card:hover{transform:translateY(-4px);border-color:var(--accent);box-shadow:0 15px 35px rgba(0,0,0,.35)}
        #ss2-embedded-ost .ss2-ost-card.active{border-color:var(--accent);box-shadow:0 0 25px rgba(255,255,255,.06),inset 0 0 25px rgba(255,255,255,.025)}
        #ss2-embedded-ost .main{--accent:#e8d08a}.inst{--accent:#6fd7ff}.eng{--accent:#ff8a65}
        #ss2-embedded-ost .ss2-ost-type{display:inline-block;color:var(--accent);border:1px solid color-mix(in srgb,var(--accent) 60%,transparent);border-radius:999px;padding:4px 9px;font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.16em}
        #ss2-embedded-ost h3{margin:17px 0 5px;color:#fff;font-family:Cinzel,serif;font-size:1rem;letter-spacing:.07em}
        #ss2-embedded-ost p{margin:0;color:#8f94a5;font-size:.7rem;line-height:1.6}
        @media(max-width:760px){#ss2-embedded-ost{padding:0;margin-bottom:65px}#ss2-embedded-ost .ss2-ost-grid{grid-template-columns:1fr}#ss2-embedded-ost .ss2-ost-card{min-height:120px}}
      </style>
      <div class="ss2-ost-heading">
        <span class="ss2-ost-kicker">ORIGINAL SOUNDTRACK</span>
        <h2 class="ss2-ost-title">SISTER SQUAD 2 OST</h2>
        <p class="ss2-ost-desc">페이지를 떠나지 않고 SISTER SQUAD 2의 OST를 바로 감상할 수 있습니다.</p>
      </div>
      <div class="ss2-ost-player">
        <iframe id="ss2-ost-frame" class="ss2-ost-frame" title="SISTER SQUAD 2 Original Soundtrack" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
        <div class="ss2-ost-current"><strong id="ss2-ost-current-title">SISTER SQUAD 2</strong><span id="ss2-ost-current-desc">Original Soundtrack · Main Edition</span></div>
      </div>
      <div class="ss2-ost-grid">
        <button type="button" class="ss2-ost-card main active" data-ost="main"><span class="ss2-ost-type">MAIN</span><h3>SISTER SQUAD 2</h3><p>Original Soundtrack · Main Edition</p></button>
        <button type="button" class="ss2-ost-card inst" data-ost="inst"><span class="ss2-ost-type">INST</span><h3>INSTRUMENTAL</h3><p>Original Soundtrack · Instrumental Edition</p></button>
        <button type="button" class="ss2-ost-card eng" data-ost="eng"><span class="ss2-ost-type">ENG</span><h3>ENGLISH EDITION</h3><p>Original Soundtrack · English Edition</p></button>
      </div>`;

    if(oldNote){oldNote.replaceWith(section)} else {anchor.insertAdjacentElement('afterend',section)}

    const frame=section.querySelector('#ss2-ost-frame');
    const title=section.querySelector('#ss2-ost-current-title');
    const desc=section.querySelector('#ss2-ost-current-desc');
    const cards=section.querySelectorAll('[data-ost]');
    const select=(key)=>{
      const item=tracks[key];
      frame.src=`https://www.youtube.com/embed/videoseries?list=${item.playlist}&rel=0`;
      title.textContent=item.title;
      desc.textContent=item.desc;
      cards.forEach(card=>card.classList.toggle('active',card.dataset.ost===key));
    };
    cards.forEach(card=>card.addEventListener('click',()=>select(card.dataset.ost)));
    select('main');
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
