/* Home: simple site guide */
'use strict';
(() => {
  function render(){
    const root=document.getElementById('site-guide');
    if(!root)return;
    if(document.getElementById('clp-guide-style'))return;
    const s=document.createElement('style');s.id='clp-guide-style';s.textContent=`#site-guide{padding:70px 20px 90px;background:#08080d;border-top:1px solid rgba(201,168,76,.10)}.clp-guide{max-width:980px;margin:0 auto;text-align:center}.clp-guide-label{color:#c9a84c;font:700 .68rem Cinzel,serif;letter-spacing:.3em;text-transform:uppercase;margin-bottom:12px}.clp-guide h2{margin:0;color:#f8f3e8;font:600 clamp(2rem,5vw,3.3rem)/1.05 'Cormorant Garamond',serif}.clp-guide-intro{margin:14px auto 35px;max-width:620px;color:rgba(240,236,228,.58);font:.9rem/1.7 Pretendard,sans-serif}.clp-guide-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.clp-guide-card{display:block;padding:25px 16px;border:1px solid rgba(255,255,255,.09);border-radius:18px;background:rgba(255,255,255,.025);transition:.3s}.clp-guide-card:hover{transform:translateY(-4px);border-color:rgba(201,168,76,.4)}.clp-guide-card b{display:block;color:#e8d08a;font:700 .8rem Cinzel,serif;letter-spacing:.12em}.clp-guide-card span{display:block;margin-top:8px;color:rgba(240,236,228,.58);font:.78rem/1.5 Pretendard,sans-serif}@media(max-width:700px){#site-guide{padding:55px 15px 75px}.clp-guide-grid{grid-template-columns:repeat(2,1fr)}.clp-guide-card{padding:22px 12px}}`;
    document.head.appendChild(s);
    root.innerHTML=`<div class="clp-guide"><div class="clp-guide-label">QUICK GUIDE</div><h2>읽고 · 듣고 · 보고 · 놀다</h2><p class="clp-guide-intro">Chris LEE.PAPA의 창작과 기록을 네 가지 메뉴에서 간단하게 만나보세요.</p><div class="clp-guide-grid"><a class="clp-guide-card" href="/music"><b>WORKS</b><span>음악 · 영상 · 책</span></a><a class="clp-guide-card" href="/bible"><b>FAITH</b><span>성경 · 워십</span></a><a class="clp-guide-card" href="/sistersquad.html"><b>SQUAD</b><span>Sister Squad 이야기</span></a><a class="clp-guide-card" href="/today"><b>TODAY</b><span>말씀 · 메모 · 기도</span></a></div></div>`;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();
