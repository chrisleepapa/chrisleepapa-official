/* SISTER SQUAD 2 — Embedded Original Soundtrack Player + Story Enhancement */
'use strict';
(() => {
  const page=(location.pathname.split('/').pop()||'').replace(/\.html$/i,'').toLowerCase();
  if(page!=='sistersquad2') return;

  const loadStory=()=>{
    if(document.querySelector('script[data-ss2-story]')) return;
    const s=document.createElement('script');
    s.src='/js/sistersquad2-story.js?v=20260827';
    s.defer=true;
    s.dataset.ss2Story='true';
    document.head.appendChild(s);
  };

  const tracks={
    main:{label:'MAIN',title:'SISTER SQUAD 2',desc:'Original Soundtrack · Main Edition',playlist:'OLAK5uy_l3U9R17KJHI7S9KmNghpZB4x0UwQZ7Ays',spotify:'https://open.spotify.com/album/0I7RHUq69cULsANnEFvQ4k?si=dBKTAPeVR3utuy4J2uvSwA'},
    inst:{label:'INST',title:'INSTRUMENTAL',desc:'Original Soundtrack · Instrumental Edition',playlist:'OLAK5uy_nGd1bPJ7YwYlGbQG9DmIbbULjA426BhpA',spotify:'https://open.spotify.com/album/5w23wx8ihguUVltYUwBJB6?si=VxsMEeShQDaccNwRxrd4ng'},
    eng:{label:'ENG',title:'ENGLISH EDITION',desc:'Original Soundtrack · English Edition',playlist:'OLAK5uy_kmoWB2g7y9KqX45Zfj7IB293OlpVhjkCY',spotify:'https://open.spotify.com/album/74AEW3zgsEOQ4qA7IpWL0G?si=PL4tWdU0SZm2oz5Vdzd_5A'}
  };

  const init=()=>{
    loadStory();
    if(document.getElementById('ss2-embedded-ost')) return;
    const oldNote=document.querySelector('.ost-note');
    const anchor=oldNote||document.querySelector('.section-title[data-i18n="ost_sec_title"]');
    if(!anchor) return;

    const section=document.createElement('section');
    section.id='ss2-embedded-ost';
    section.setAttribute('aria-labelledby','ss2-ost-title');
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
        #ss2-embedded-ost .ss2-ost-links{display:flex;gap:8px;margin-top:13px}
        #ss2-embedded-ost .ss2-ost-link{display:inline-flex;align-items:center;justify-content:center;min-height:34px;padding:0 12px;border:1px solid rgba(255,255,255,.12);border-radius:999px;color:#dfe2ea;text-decoration:none;font-size:.65rem;letter-spacing:.08em;transition:.25s}
        #ss2-embedded-ost .ss2-ost-link:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px)}
        #ss2-embedded-ost .ss2-ost-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        #ss2-embedded-ost .ss2-ost-card{cursor:pointer;text-align:left;min-height:170px;padding:22px 20px;border-radius:18px;border:1px solid rgba(255,255,255,.09);background:linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.015));transition:transform .3s,border-color .3s,box-shadow .3s;position:relative;color:inherit;font:inherit}
        #ss2-embedded-ost .ss2-ost-card:hover{transform:translateY(-4px);border-color:var(--accent);box-shadow:0 15px 35px rgba(0,0,0,.35)}
        #ss2-embedded-ost .ss2-ost-card.active{border-color:var(--accent);box-shadow:0 0 25px rgba(255,255,255,.06),inset 0 0 25px rgba(255,255,255,.025)}
        #ss2-embedded-ost .main{--accent:#e8d08a}.inst{--accent:#6fd7ff}.eng{--accent:#ff8a65}
        #ss2-embedded-ost .ss2-ost-type{display:inline-block;color:var(--accent);border:1px solid color-mix(in srgb,var(--accent) 60%,transparent);border-radius:999px;padding:4px 9px;font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.16em}
        #ss2-embedded-ost h3{margin:17px 0 5px;color:#fff;font-family:Cinzel,serif;font-size:1rem;letter-spacing:.07em}
        #ss2-embedded-ost p{margin:0;color:#8f94a5;font-size:.7rem;line-height:1.6}
        @media(max-width:760px){#ss2-embedded-ost{padding:0;margin-bottom:65px}#ss2-embedded-ost .ss2-ost-grid{grid-template-columns:1fr}#ss2-embedded-ost .ss2-ost-card{min-height:135px}}
      </style>
      <div class="ss2-ost-heading">
        <span class="ss2-ost-kicker">ORIGINAL SOUNDTRACK</span>
        <h2 id="ss2-ost-title" class="ss2-ost-title">SISTER SQUAD 2 OST</h2>
        <p class="ss2-ost-desc">페이지를 떠나지 않고 SISTER SQUAD 2의 OST를 바로 감상할 수 있습니다.</p>
      </div>
      <div class="ss2-ost-player">
        <iframe id="ss2-ost-frame" class="ss2-ost-frame" title="SISTER SQUAD 2 Original Soundtrack" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
        <div class="ss2-ost-current"><strong id="ss2-ost-current-title">SISTER SQUAD 2</strong><span id="ss2-ost-current-desc">Original Soundtrack · Main Edition</span><div class="ss2-ost-links"><a id="ss2-ost-youtube" class="ss2-ost-link" href="#" target="_blank" rel="noopener">YOUTUBE ↗</a><a id="ss2-ost-spotify" class="ss2-ost-link" href="#" target="_blank" rel="noopener">SPOTIFY ↗</a></div></div>
      </div>
      <div class="ss2-ost-grid" role="tablist" aria-label="SISTER SQUAD 2 OST editions">
        <button type="button" class="ss2-ost-card main active" data-ost="main" role="tab" aria-selected="true"><span class="ss2-ost-type">MAIN</span><h3>SISTER SQUAD 2</h3><p>Original Soundtrack · Main Edition</p></button>
        <button type="button" class="ss2-ost-card inst" data-ost="inst" role="tab" aria-selected="false"><span class="ss2-ost-type">INST</span><h3>INSTRUMENTAL</h3><p>Original Soundtrack · Instrumental Edition</p></button>
        <button type="button" class="ss2-ost-card eng" data-ost="eng" role="tab" aria-selected="false"><span class="ss2-ost-type">ENG</span><h3>ENGLISH EDITION</h3><p>Original Soundtrack · English Edition</p></button>
      </div>`;

    if(oldNote) oldNote.replaceWith(section);
    else anchor.insertAdjacentElement('afterend',section);

    const frame=section.querySelector('#ss2-ost-frame');
    const title=section.querySelector('#ss2-ost-current-title');
    const desc=section.querySelector('#ss2-ost-current-desc');
    const yt=section.querySelector('#ss2-ost-youtube');
    const spotify=section.querySelector('#ss2-ost-spotify');
    const cards=section.querySelectorAll('[data-ost]');
    const select=(key)=>{
      const item=tracks[key];
      frame.src=`https://www.youtube.com/embed/videoseries?list=${item.playlist}&rel=0`;
      title.textContent=item.title;
      desc.textContent=item.desc;
      yt.href=`https://www.youtube.com/playlist?list=${item.playlist}`;
      spotify.href=item.spotify;
      cards.forEach(card=>{
        const active=card.dataset.ost===key;
        card.classList.toggle('active',active);
        card.setAttribute('aria-selected',String(active));
      });
    };
    cards.forEach(card=>card.addEventListener('click',()=>select(card.dataset.ost)));
    select('main');
  };

  const applySecondJourneyLanguage=()=>{
    const lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    const heading = document.querySelector('h3[data-second-journey]');
    if (heading) heading.textContent = lang === 'en' ? 'THE SECOND JOURNEY' : '두 번째 여정';
  };

  const ensureSecondJourneyHook=()=>{
    const headings=[...document.querySelectorAll('h3')];
    const heading=headings.find(el=>{
      const text=el.textContent.trim();
      return text==='THE JOURNEY CONTINUES' || text==='THE SECOND JOURNEY' || text==='두 번째 여정';
    });
    if(heading){
      heading.dataset.secondJourney='true';
      applySecondJourneyLanguage();
    }
  };

  window.onLangChange = function(){
    ensureSecondJourneyHook();
    applySecondJourneyLanguage();
  };

  const observeLanguage=()=>{
    const root=document.documentElement;
    if(!root) return;
    const observer=new MutationObserver(()=>{
      ensureSecondJourneyHook();
      applySecondJourneyLanguage();
    });
    observer.observe(root,{attributes:true,attributeFilter:['lang']});
  };

  const run=()=>{
    init();
    ensureSecondJourneyHook();
    applySecondJourneyLanguage();
    observeLanguage();
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();
