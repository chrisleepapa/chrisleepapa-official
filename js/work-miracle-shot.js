/* Miracle Shot project interaction loader */
'use strict';
(() => {
  const page=(location.pathname.split('/').pop()||'').replace(/\.html$/i,'').toLowerCase();
  if(page!=='miracleshot') return;

  const load=()=>{
    if(document.getElementById('mshot-story-script')) return;
    const s=document.createElement('script');
    s.id='mshot-story-script';
    s.src='/js/miracle-shot-story-v2.js?v=20260829';
    s.defer=true;
    document.head.appendChild(s);
  };

  const initMobileCharacterFlip=()=>{
    if(!document.getElementById('miracle-shot-mobile-flip-style')){
      const style=document.createElement('style');
      style.id='miracle-shot-mobile-flip-style';
      style.textContent=`
        @media (min-width:769px){
          .char-card:hover .char-photo{opacity:0 !important}
          .char-card:hover .bible-photo{opacity:1 !important}
        }
        @media (max-width:768px){
          .char-card:hover .char-photo{opacity:1 !important}
          .char-card:hover .bible-photo{opacity:0 !important}
          .char-card.flipped:hover .char-photo{opacity:0 !important}
          .char-card.flipped:hover .bible-photo{opacity:1 !important}
          .char-card:not(.flipped) .char-photo{opacity:1 !important}
          .char-card:not(.flipped) .bible-photo{opacity:0 !important}
          .char-card.flipped .char-photo{opacity:0 !important}
          .char-card.flipped .bible-photo{opacity:1 !important}
        }
      `;
      document.head.appendChild(style);
    }

    document.querySelectorAll('.char-card').forEach(card=>{
      if(card.dataset.mobileFlipReady==='1') return;
      card.dataset.mobileFlipReady='1';
      card.addEventListener('click',event=>{
        if(!window.matchMedia('(max-width:768px)').matches) return;
        if(event.target.closest('a,button')) return;
        card.classList.toggle('flipped');
      });
    });
  };

  const start=()=>{
    load();
    initMobileCharacterFlip();
    setTimeout(initMobileCharacterFlip,300);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
