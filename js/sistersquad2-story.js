/* SISTER SQUAD 2 — Story / World / Growth enhancement */
'use strict';
(() => {
  const page=(location.pathname.split('/').pop()||'').replace(/\.html$/i,'').toLowerCase();
  if(page!=='sistersquad2') return;

  const render=()=>{
    if(document.getElementById('ss2-story-expansion')) return;
    const container=document.querySelector('.container');
    const family=document.querySelector('.character-grid');
    if(!container || !family) return;

    const section=document.createElement('section');
    section.id='ss2-story-expansion';
    section.innerHTML=`
      <style>
        #ss2-story-expansion{margin:0 0 90px}
        #ss2-story-expansion .ss2-story-box{border:1px solid rgba(201,168,76,.16);border-radius:24px;background:linear-gradient(145deg,rgba(20,24,35,.72),rgba(8,9,14,.82));padding:46px 34px;box-shadow:0 25px 60px rgba(0,0,0,.28)}
        #ss2-story-expansion .ss2-kicker{text-align:center;color:#6fd7ff;font-family:Cinzel,serif;font-size:.7rem;letter-spacing:.28em;margin-bottom:10px}
        #ss2-story-expansion h2{text-align:center;color:#e8d08a;font-family:Cinzel,serif;font-size:clamp(1.35rem,3vw,2rem);letter-spacing:.12em;margin:0 0 14px}
        #ss2-story-expansion .ss2-lead{text-align:center;max-width:820px;margin:0 auto 38px;color:#cdd6f4;font-size:.95rem;line-height:2;word-break:keep-all}
        #ss2-story-expansion .ss2-journey{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:38px}
        #ss2-story-expansion .ss2-stage{position:relative;padding:22px 20px;border:1px solid rgba(255,255,255,.08);border-radius:17px;background:rgba(255,255,255,.025);min-height:150px}
        #ss2-story-expansion .ss2-stage-num{color:#6fd7ff;font-family:Cinzel,serif;font-size:.62rem;letter-spacing:.16em}
        #ss2-story-expansion .ss2-stage h3{color:#fff;font-size:1rem;margin:10px 0 8px}
        #ss2-story-expansion .ss2-stage p{color:#9fa4b4;font-size:.78rem;line-height:1.75;margin:0;word-break:keep-all}
        #ss2-story-expansion .ss2-themes{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        #ss2-story-expansion .ss2-theme{padding:22px 20px;border-radius:17px;background:rgba(201,168,76,.045);border:1px solid rgba(201,168,76,.12)}
        #ss2-story-expansion .ss2-theme strong{display:block;color:#e8d08a;font-family:Cinzel,serif;font-size:.78rem;letter-spacing:.08em;margin-bottom:9px}
        #ss2-story-expansion .ss2-theme span{display:block;color:#b7b7c4;font-size:.78rem;line-height:1.8;word-break:keep-all}
        @media(max-width:760px){#ss2-story-expansion .ss2-story-box{padding:34px 18px}#ss2-story-expansion .ss2-journey,#ss2-story-expansion .ss2-themes{grid-template-columns:1fr}.ss2-stage{min-height:auto}}
      </style>
      <div class="ss2-story-box">
        <div class="ss2-kicker">THE SECOND JOURNEY</div>
        <h2>루미나에서 아르카디아까지</h2>
        <p class="ss2-lead">1년 전 루미나를 구했던 율이와 정이는 다시 평범한 일상으로 돌아왔습니다. 그러나 고대의 저주와 <b style="color:#6fd7ff">혼돈의 시간</b> 파편이 결합하면서 루미나는 생명력을 잃은 잿빛 폐허가 됩니다. 자매와 아빠 크리스는 유일한 희망인 <b style="color:#e8d08a">월광초</b>를 찾아 아르카디아로 향하고, 그 과정에서 가족과 서로를 믿는 법을 다시 배웁니다.</p>
        <div class="ss2-journey" aria-label="SISTER SQUAD 2 journey">
          <article class="ss2-stage"><div class="ss2-stage-num">01 · LUMINA</div><h3>잿빛으로 변한 루미나</h3><p>프리티의 구조 신호가 울리고, 한때 아름다웠던 요정 마을은 저주와 혼돈의 시간에 잠식되어 좀비 요정들이 배회하는 폐허가 되어 있습니다.</p></article>
          <article class="ss2-stage"><div class="ss2-stage-num">02 · HOPE MARKET</div><h3>희망 시장과 아르카디아</h3><p>브록은 절망 속에서도 희망 시장을 지키며 일행에게 정보를 건넵니다. 월광초를 찾기 위해 미지의 고대 도시 아르카디아로 길을 이어갑니다.</p></article>
          <article class="ss2-stage"><div class="ss2-stage-num">03 · DEATH SWAMP</div><h3>죽음의 늪 · 글루톤</h3><p>시간 왜곡과 환영을 다루는 글루톤과 맞서며 자매는 공포와 서로의 차이를 마주합니다. 힘보다 지혜와 협동이 필요한 첫 번째 관문입니다.</p></article>
          <article class="ss2-stage"><div class="ss2-stage-num">04 · GIANT'S SPINE</div><h3>거인의 등뼈 유적</h3><p>돌문은 한쪽의 힘만으로 열리지 않습니다. 율이의 이성과 정이의 직관이 조화를 이룰 때 길이 열리고, 자매는 다름이 약점이 아니라 힘임을 깨닫습니다.</p></article>
          <article class="ss2-stage"><div class="ss2-stage-num">05 · SILENT VALLEY</div><h3>고요의 계곡 · 스콜 & 게일</h3><p>월광초를 지키는 냉기와 화염의 쌍둥이 그리핀과 마지막 전투를 벌입니다. 아빠 크리스는 치명적인 대가를 감수하고 타임 브레이크를 사용합니다.</p></article>
          <article class="ss2-stage"><div class="ss2-stage-num">06 · RETURN</div><h3>루미나의 정화</h3><p>자매와 프리티가 월광초를 손에 넣고 루미나로 돌아옵니다. 월광초와 생명의 샘, 그리고 요정들의 희망이 무너진 생명을 다시 일으킵니다.</p></article>
        </div>
        <div class="ss2-themes">
          <div class="ss2-theme"><strong>율이 · CONTROL → TRUST</strong><span>완벽한 계획으로 동생을 통제하려던 율이는 모든 것을 통제할 수 없다는 사실을 받아들이고 정이의 선택을 믿는 법을 배웁니다.</span></div>
          <div class="ss2-theme"><strong>정이 · INTUITION → TAMER</strong><span>언니의 판단에만 의존하지 않고 자신의 직관을 믿습니다. 위기의 순간 태고의 야생 영혼까지 깨우며 진정한 테이밍 마스터로 성장합니다.</span></div>
          <div class="ss2-theme"><strong>CHRIS · FEAR → SACRIFICE</strong><span>카이를 잃은 죄책감 때문에 두려워했던 시간 마법을 다시 사용합니다. 딸들을 대신해 싸우기보다 끝까지 곁에 서는 아빠가 됩니다.</span></div>
        </div>
      </div>`;
    family.insertAdjacentElement('afterend',section);

    const author=[...container.querySelectorAll('p')].find(p=>p.textContent.includes('소소한')||p.textContent.includes('Chris LEE.PAPA'));
    if(!document.getElementById('ss2-author-message')){
      const message=document.createElement('section');
      message.id='ss2-author-message';
      message.style.cssText='max-width:900px;margin:0 auto 90px;padding:34px 30px;border-left:2px solid #c9a84c;background:rgba(201,168,76,.035);border-radius:0 18px 18px 0;';
      message.innerHTML='<div style="font-family:Cinzel,serif;color:#c9a84c;font-size:.7rem;letter-spacing:.22em;margin-bottom:12px">A FAMILY LETTER</div><p style="margin:0;color:#c0bcb4;font-size:.92rem;line-height:2;word-break:keep-all">세상을 구하는 거대한 모험이 끝난 뒤에도 가족은 다시 평범한 하루로 돌아갑니다. 함께 흙먼지를 털어내고 웃으며 목욕하는 소소한 일상, 서로 다투더라도 다시 안아줄 수 있는 관계가 이 이야기에서 지켜내고 싶은 가장 위대한 기적입니다.</p>';
      const target=author?author.closest('section'):container.lastElementChild;
      if(target) target.insertAdjacentElement('afterend',message); else container.appendChild(message);
    }
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render,{once:true});
  else render();
})();
