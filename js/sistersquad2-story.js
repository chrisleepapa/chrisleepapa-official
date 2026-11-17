/* SISTER SQUAD 2 — Story / World / Growth enhancement */
'use strict';
(() => {
  const page=(location.pathname.split('/').pop()||'').replace(/\.html$/i,'').toLowerCase();
  if(page!=='sistersquad2') return;

  const translations={
    ko:{
      kicker:'두 번째 여정',
      journey:'SISTER SQUAD 2의 여정',
      stops:['루미나','희망 시장','죽음의 늪','거인의 등뼈','고요의 계곡','귀환'],
      title:'루미나에서 아르카디아까지',
      lead:'1년 전 루미나를 구했던 율이와 정이는 다시 평범한 일상으로 돌아왔습니다. 그러나 고대의 저주와 <b style="color:#6fd7ff">혼돈의 시간</b> 파편이 결합하면서 루미나는 생명력을 잃은 잿빛 폐허가 됩니다. 자매와 아빠 크리스는 유일한 희망인 <b style="color:#e8d08a">월광초</b>를 찾아 아르카디아로 향하고, 그 과정에서 가족과 서로를 믿는 법을 다시 배웁니다.',
      stages:[
        ['잿빛으로 변한 루미나','프리티의 구조 신호가 울리고, 한때 아름다웠던 요정 마을은 저주와 혼돈의 시간에 잠식되어 좀비 요정들이 배회하는 폐허가 되어 있습니다.'],
        ['희망 시장과 아르카디아','브록은 절망 속에서도 희망 시장을 지키며 일행에게 정보를 건넵니다. 월광초를 찾기 위해 미지의 고대 도시 아르카디아로 길을 이어갑니다.'],
        ['죽음의 늪 · 글루톤','시간 왜곡과 환영을 다루는 글루톤과 맞서며 자매는 공포와 서로의 차이를 마주합니다. 힘보다 지혜와 협동이 필요한 첫 번째 관문입니다.'],
        ['거인의 등뼈 유적','돌문은 한쪽의 힘만으로 열리지 않습니다. 율이의 이성과 정이의 직관이 조화를 이룰 때 길이 열리고, 자매는 다름이 약점이 아니라 힘임을 깨닫습니다.'],
        ['고요의 계곡 · 스콜 & 게일','월광초를 지키는 냉기와 화염의 쌍둥이 그리핀과 마지막 전투를 벌입니다. 아빠 크리스는 치명적인 대가를 감수하고 타임 브레이크를 사용합니다.'],
        ['루미나의 정화','자매와 프리티가 월광초를 손에 넣고 루미나로 돌아옵니다. 월광초와 생명의 샘, 그리고 요정들의 희망이 무너진 생명을 다시 일으킵니다.']
      ],
      themes:[
        ['율이 · 통제에서 신뢰로','완벽한 계획으로 동생을 통제하려던 율이는 모든 것을 통제할 수 없다는 사실을 받아들이고 정이의 선택을 믿는 법을 배웁니다.'],
        ['정이 · 직관을 믿고 성장하다','언니의 판단에만 의존하지 않고 자신의 직관을 믿습니다. 위기의 순간 태고의 야생 영혼까지 깨우며 진정한 테이밍 마스터로 성장합니다.'],
        ['크리스 · 두려움에서 희생으로','카이를 잃은 죄책감 때문에 두려워했던 시간 마법을 다시 사용합니다. 딸들을 대신해 싸우기보다 끝까지 곁에 서는 아빠가 됩니다.']
      ]
    },
    en:{
      kicker:'THE SECOND JOURNEY',
      journey:'SISTER SQUAD 2 journey',
      stops:['LUMINA','HOPE MARKET','SWAMP OF DEATH',"GIANT’S SPINE",'VALLEY OF SILENCE','RETURN'],
      title:'From Lumina to Arcadia',
      lead:'Yul and Jung, who saved Lumina a year ago, have returned to ordinary life. But when fragments of an ancient curse merge with <b style="color:#6fd7ff">Chaos Time</b>, Lumina becomes an ash-grey ruin stripped of life. The sisters and their father Chris journey to Arcadia in search of the last hope, the <b style="color:#e8d08a">Moonlight Herb</b>, and along the way learn once again how to trust their family and each other.',
      stages:[
        ['Lumina Turned to Ash','Pretty\'s distress signal sounds. The once-beautiful fairy village has been consumed by the curse and Chaos Time, leaving a ruin where zombified fairies wander.'],
        ['Hope Market & Arcadia','Brock keeps the Hope Market alive even in despair and gives the travelers vital information. Their path continues toward the unknown ancient city of Arcadia in search of the Moonlight Herb.'],
        ['Swamp of Death · Glutton','Facing Glutton, who commands time distortions and illusions, the sisters confront their fears and differences. It is the first trial where wisdom and teamwork matter more than strength.'],
        ["Giant's Spine Ruins",'The stone gate cannot be opened by one side alone. When Yul\'s reason and Jung\'s intuition work together, the path opens and the sisters realize that their differences are not weaknesses, but strengths.'],
        ['Valley of Silence · Squall & Gale','The sisters face the twin griffins of frost and flame who guard the Moonlight Herb. Chris uses Time Break, accepting a devastating price to protect his daughters.'],
        ['Purification of Lumina','The sisters and Pretty obtain the Moonlight Herb and return to Lumina. The herb, the Fountain of Life, and the fairies\' hope restore the lives that were lost.']
      ],
      themes:[
        ['YUL · CONTROL → TRUST','Yul, who tried to control her sister with perfect plans, accepts that she cannot control everything and learns to trust Jung\'s choices.'],
        ['JUNG · INTUITION → TAMER','Jung stops relying only on her sister\'s judgment and trusts her own intuition. In the crisis, she awakens even an ancient wild spirit and grows into a true Taming Master.'],
        ['CHRIS · FEAR → SACRIFICE','Chris uses the time magic he once feared because of his guilt over losing Kai. Rather than fighting in his daughters\' place, he becomes the father who stays beside them to the end.']
      ]
    }
  };


  const render=()=>{
    if(document.getElementById('ss2-story-expansion')) return;
    const family=document.querySelector('.character-grid');
    if(!family) return;
    const section=document.createElement('section');
    section.id='ss2-story-expansion';
    section.className='ss2-editorial-journey';
    section.innerHTML=`
<style>
#ss2-story-expansion{margin:clamp(45px,8vw,95px) auto 90px;max-width:1100px;scroll-margin-top:110px;color:#f4f0e9}
#ss2-story-expansion *{box-sizing:border-box}
#ss2-story-expansion .journey-shell{background:#202a37;border:1px solid #415063;border-radius:22px;overflow:hidden;box-shadow:none}
#ss2-story-expansion .journey-intro{padding:clamp(27px,5vw,65px);background:linear-gradient(125deg,#24394a,#202a37);text-align:left}
#ss2-story-expansion .journey-kicker{color:#9bd8e8;font-size:12px;letter-spacing:.13em;font-weight:750;margin:0 0 16px}
#ss2-story-expansion h2{font-size:clamp(25px,3.5vw,42px);font-family:'Noto Serif KR',serif;line-height:1.4;color:#f7e9c7;letter-spacing:-.04em;margin:0 0 20px;word-break:keep-all;overflow-wrap:break-word;text-align:left}
#ss2-story-expansion .journey-lead{color:#e2e8f0;max-width:800px;font-size:clamp(15px,1.7vw,18px);line-height:1.9;word-break:keep-all;overflow-wrap:break-word;margin:0}
#ss2-story-expansion .journey-lead b{color:#e6c987!important;font-weight:700}
#ss2-story-expansion .journey-summary{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #506071}
#ss2-story-expansion .journey-summary>div{padding:24px 28px;border-right:1px solid #506071}
#ss2-story-expansion .journey-summary>div:last-child{border-right:0}
#ss2-story-expansion .journey-summary span{display:block;font-size:11px;color:#9bd8e8;letter-spacing:.12em;margin-bottom:9px}
#ss2-story-expansion .journey-summary strong{font-size:15px;color:#fff;line-height:1.6;word-break:keep-all}
#ss2-story-expansion .journey-detail{padding:clamp(25px,5vw,60px);background:#f8f7f3;color:#202b37}
#ss2-story-expansion .journey-detail-head{display:flex;align-items:baseline;justify-content:space-between;gap:18px;border-bottom:1px solid #d4d8d9;padding-bottom:18px;margin-bottom:12px}
#ss2-story-expansion .journey-detail h3{font-size:clamp(21px,2.8vw,31px);font-family:'Noto Serif KR',serif;letter-spacing:-.05em;margin:0;color:#202b37;word-break:keep-all}
#ss2-story-expansion .journey-detail-head p{font-size:12px;color:#66717d;margin:0}
#ss2-story-expansion .journey-list{list-style:none;margin:0;padding:0}
#ss2-story-expansion .journey-list li{border-bottom:1px solid #dce0e1}
#ss2-story-expansion .journey-list button{display:grid;grid-template-columns:42px 1fr 22px;gap:12px;align-items:center;width:100%;padding:20px 0;background:none;border:0;color:#273341;text-align:left;cursor:pointer;font:inherit}
#ss2-story-expansion .journey-list button span{font-size:12px;font-weight:750;color:#376d88}
#ss2-story-expansion .journey-list button strong{font-size:17px;line-height:1.5;word-break:keep-all}
#ss2-story-expansion .journey-list button i{font-size:20px;font-style:normal;transition:transform .2s}
#ss2-story-expansion .journey-list button[aria-expanded="true"] i{transform:rotate(45deg)}
#ss2-story-expansion .journey-list p{padding:0 30px 20px 54px;margin:0;color:#52606c;font-size:15px;line-height:1.9;word-break:keep-all;overflow-wrap:break-word}
#ss2-story-expansion .journey-growth{padding:clamp(28px,5vw,60px);border-top:1px solid #dce0e1;background:#f1eee7;color:#202b37}
#ss2-story-expansion .journey-growth h3{font-size:clamp(21px,2.8vw,30px);font-family:'Noto Serif KR',serif;margin:0 0 23px;letter-spacing:-.04em}
#ss2-story-expansion .growth-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
#ss2-story-expansion .growth-grid article{border-top:2px solid #a77958;padding-top:17px}
#ss2-story-expansion .growth-grid strong{font-size:17px;line-height:1.55;display:block;word-break:keep-all}
#ss2-story-expansion .growth-grid p{font-size:14px;line-height:1.85;color:#52606c;word-break:keep-all;margin:12px 0 0}
html[data-theme="light"] #ss2-story-expansion .journey-intro{background:linear-gradient(125deg,#24394a,#202a37)}
@media(max-width:700px){#ss2-story-expansion{margin:40px 0 60px}#ss2-story-expansion .journey-shell{border-radius:15px}#ss2-story-expansion .journey-summary{grid-template-columns:1fr}#ss2-story-expansion .journey-summary>div{border-right:0;border-bottom:1px solid #506071;padding:15px 25px}#ss2-story-expansion .journey-detail-head{display:block}#ss2-story-expansion .journey-detail-head p{margin-top:8px}#ss2-story-expansion .growth-grid{grid-template-columns:1fr;gap:24px}#ss2-story-expansion .journey-list button{grid-template-columns:30px 1fr 20px;gap:9px}#ss2-story-expansion .journey-list button strong{font-size:15px}#ss2-story-expansion .journey-list p{padding:0 0 19px 39px;font-size:14px}}
</style>
<div class="journey-shell">
<header class="journey-intro"><p class="journey-kicker" data-ss2-story="kicker"></p><h2 data-ss2-story="title"></h2><p class="journey-lead" data-ss2-story="lead"></p></header>
<div class="journey-summary" aria-label="Story highlights"><div><span>01 · START</span><strong data-ss2-summary="0"></strong></div><div><span>02 · QUEST</span><strong data-ss2-summary="1"></strong></div><div><span>03 · HOPE</span><strong data-ss2-summary="2"></strong></div></div>
<div class="journey-detail"><div class="journey-detail-head"><h3 data-ss2-heading="stages"></h3><p data-ss2-heading="hint"></p></div><ol class="journey-list">${translations.ko.stages.map((_,i)=>`<li><button type="button" aria-expanded="false" aria-controls="ss2-stage-panel-${i}"><span>${String(i+1).padStart(2,'0')}</span><strong data-ss2-stage-title="${i}"></strong><i aria-hidden="true">+</i></button><p id="ss2-stage-panel-${i}" data-ss2-stage-desc="${i}" hidden></p></li>`).join('')}</ol></div>
<div class="journey-growth"><h3 data-ss2-heading="growth"></h3><div class="growth-grid">${translations.ko.themes.map((_,i)=>`<article><strong data-ss2-theme-title="${i}"></strong><p data-ss2-theme-desc="${i}"></p></article>`).join('')}</div></div>
</div>`;
    family.insertAdjacentElement('afterend',section);
    section.querySelectorAll('.journey-list button').forEach(button=>button.addEventListener('click',()=>{
      const expanded=button.getAttribute('aria-expanded')==='true';
      button.setAttribute('aria-expanded',String(!expanded));
      document.getElementById(button.getAttribute('aria-controls')).hidden=expanded;
    }));
    const applyLanguage=()=>{
      const lang=document.documentElement.lang.toLowerCase().startsWith('en')?'en':'ko';
      const t=translations[lang];
      const labels=lang==='ko'?{stages:'여정의 여섯 장면',hint:'궁금한 장면을 펼쳐 보세요',growth:'이 모험이 남긴 변화',summary:['저주받은 루미나','월광초를 찾아 떠나는 길','서로를 믿는 가족']}:{stages:'Six moments of the journey',hint:'Open a chapter to read more',growth:'How the journey changes them',summary:['A cursed Lumina','The search for Moonlight Herb','A family learning to trust']};
      section.querySelector('[data-ss2-story="kicker"]').textContent=t.kicker;
      section.querySelector('[data-ss2-story="title"]').textContent=t.title;
      section.querySelector('[data-ss2-story="lead"]').innerHTML=t.lead;
      section.querySelector('[data-ss2-heading="stages"]').textContent=labels.stages;
      section.querySelector('[data-ss2-heading="hint"]').textContent=labels.hint;
      section.querySelector('[data-ss2-heading="growth"]').textContent=labels.growth;
      section.querySelectorAll('[data-ss2-summary]').forEach(el=>el.textContent=labels.summary[Number(el.dataset.ss2Summary)]);
      section.querySelectorAll('[data-ss2-stage-title]').forEach(el=>el.textContent=t.stages[Number(el.dataset.ss2StageTitle)][0]);
      section.querySelectorAll('[data-ss2-stage-desc]').forEach(el=>el.textContent=t.stages[Number(el.dataset.ss2StageDesc)][1]);
      section.querySelectorAll('[data-ss2-theme-title]').forEach(el=>el.textContent=t.themes[Number(el.dataset.ss2ThemeTitle)][0]);
      section.querySelectorAll('[data-ss2-theme-desc]').forEach(el=>el.textContent=t.themes[Number(el.dataset.ss2ThemeDesc)][1]);
    };
    window.applySS2StoryLanguage=applyLanguage;applyLanguage();
    new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang'))applyLanguage()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();
