/* Miracle Shot project story loader */
'use strict';
(() => {
  const page=(location.pathname.split('/').pop()||'').replace(/\.html$/i,'').toLowerCase();
  if(page!=='miracleshot') return;
  const load=()=>{
    if(document.getElementById('mshot-story-script')) return;
    const s=document.createElement('script');
    s.id='mshot-story-script';
    s.src='/js/miracle-shot-story-v2.js?v=20260826';
    s.defer=true;
    document.head.appendChild(s);
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',load,{once:true});
  else load();
})();
