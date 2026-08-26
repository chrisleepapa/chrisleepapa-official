/* SISTER SQUAD 1 — content enhancement layer */
(function(){
  'use strict';
  if(window.__sisterSquad1ContentLoaded)return;
  window.__sisterSquad1ContentLoaded=true;

  const section=document.createElement('section');
  section.className='sq1-enhancement';
  section.setAttribute('aria-labelledby','sq1-world-title');
  section.innerHTML=`
    <style>
      .sq1-enhancement{margin:0 auto 90px;max-width:1000px}
      .sq1-panel{background:rgba(15,15,20,.55);border:1px solid rgba(201,168,76,.16);border-radius:24px;padding:44px 42px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);margin-bottom:28px;box-shadow:0 18px 45px rgba(0,0,0,.25)}
      .sq1-kicker{display:block;color:#ffb4c8;font-family:'Cinzel',serif;font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;margin-bottom:12px}
      .sq1-title{font-family:'Cinzel',serif;color:#e8d08a;font-size:1.45rem;letter-spacing:.12em;margin-bottom:18px}
      .sq1-lead{color:#f0ece4;font-size:1.03rem;line-height:2;word-break:keep-all;margin-bottom:18px}
      .sq1-text{color:#c0bcb4;font-size:.94rem;line-height:1.95;word-break:keep-all}
      .sq1-quote{margin:24px 0 0;padding:20px 22px;border-left:3px solid #c9a84c;background:rgba(201,168,76,.055);color:#e8d08a;font-size:1.08rem;line-height:1.8;word-break:keep-all}
      .sq1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:22px}
      .sq1-card{padding:24px;border:1px solid rgba(255,255,255,.07);border-radius:18px;background:rgba(255,255,255,.025)}
      .sq1-card h3{font-family:'Cinzel',serif;color:#fff;font-size:1.05rem;margin-bottom:10px;letter-spacing:.06em}
      .sq1-meta{color:#c9a84c;font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px}
      .sq1-card p{color:#aaa9b5;font-size:.9rem;line-height:1.85;word-break:keep-all}
      .sq1-timeline{display:grid;gap:12px;margin-top:22px}
      .sq1-step{display:grid;grid-template-columns:54px 1fr;gap:16px;align-items:start;padding:18px 0;border-bottom:1px solid rgba(255,255,255,.06)}
      .sq1-step:last-child{border-bottom:0;padding-bottom:0}
      .sq1-num{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(201,168,76,.45);color:#e8d08a;font-family:'Cinzel',serif;font-size:.78rem}
      .sq1-step h3{color:#f0ece4;font-size:.98rem;margin-bottom:5px}
      .sq1-step p{color:#aaa9b5;font-size:.88rem;line-height:1.8;word-break:keep-all}
      @media(max-width:700px){.sq1-enhancement{margin-bottom:60px}.sq1-panel{padding:30px 20px;border-radius:18px}.sq1-title{font-size:1.12rem}.sq1-lead{font-size:.94rem}.sq1-text{font-size:.88rem}.sq1-grid{grid-template-columns:1fr}.sq1-step{grid-template-columns:44px 1fr;gap:12px}}
    </style>

    <div class="sq1-panel">
      <span class="sq1-kicker" data-i18n="sq1_world_kicker">THE WORLD</span>
      <h2 id="sq1-world-title" class="sq1-title" data-i18n="sq1_world_title">루미나와 그림자 성</h2>
      <p class="sq1-lead" data-i18n="sq1_world_lead">평범한 두 자매가 아빠의 서재에서 발견한 낡은 책을 통해 마법의 세계로 들어가면서 SISTER SQUAD의 첫 번째 모험이 시작됩니다.</p>
      <p class="sq1-text" data-i18n="sq1_world_text">그들이 도착한 곳은 빛과 생명이 넘치는 요정 마을 루미나. 하지만 이 평화로운 세계는 어둠의 마왕 크라운이 지배하는 그림자 성 세력의 위협을 받고 있습니다. 예언서는 두 자매를 이 세계로 이끌었고, 자매는 자신들이 왜 선택되었는지 알아가는 과정 속에서 거대한 모험에 뛰어듭니다.</p>
    </div>

    <div class="sq1-panel">
      <span class="sq1-kicker" data-i18n="sq1_sisters_kicker">THE SISTERS</span>
      <h2 class="sq1-title" data-i18n="sq1_sisters_title">서로 달라서, 함께 강해지는 두 자매</h2>
      <div class="sq1-grid">
        <article class="sq1-card"><div class="sq1-meta" data-i18n="sq1_yul_meta">YUL · 11 · THE BRAVE LEADER</div><h3 data-i18n="sq1_yul_title">율이</h3><p data-i18n="sq1_yul_text">모든 것을 머리로 이해하려는 논리적인 언니입니다. 브록이 만들어준 이성의 검을 사용하며, 동생을 지키려는 간절한 마음을 통해 사물을 띄우는 염력의 힘을 각성합니다.</p></article>
        <article class="sq1-card"><div class="sq1-meta" data-i18n="sq1_jung_meta">JUNG · 7 · THE HEART WEAVER</div><h3 data-i18n="sq1_jung_title">정이</h3><p data-i18n="sq1_jung_text">세상에 대한 호기심과 순수한 영혼을 가진 동생입니다. 순수의 활을 다루며 숲의 동물과 몬스터까지 친구가 되는 테이밍 능력으로 예상하지 못한 활약을 펼칩니다.</p></article>
      </div>
      <p class="sq1-quote" data-i18n="sq1_sister_quote">두 자매는 서로 같은 사람이 되어서 강해지는 것이 아니라, 서로 다른 모습 그대로 서로의 빈자리를 채우면서 성장합니다.</p>
    </div>

    <div class="sq1-panel">
      <span class="sq1-kicker" data-i18n="sq1_adventure_kicker">THE ADVENTURE</span>
      <h2 class="sq1-title" data-i18n="sq1_adventure_title">패배에서 각성으로</h2>
      <div class="sq1-timeline">
        <div class="sq1-step"><div class="sq1-num">01</div><div><h3 data-i18n="sq1_step1_title">소환</h3><p data-i18n="sq1_step1_text">숨바꼭질을 하던 두 자매는 낡은 책을 통해 마법의 세계로 소환됩니다.</p></div></div>
        <div class="sq1-step"><div class="sq1-num">02</div><div><h3 data-i18n="sq1_step2_title">첫 번째 패배</h3><p data-i18n="sq1_step2_text">어둠의 검신 베인이 이끄는 기사단의 습격을 받으며 자매는 자신들의 무력함을 처음 마주합니다.</p></div></div>
        <div class="sq1-step"><div class="sq1-num">03</div><div><h3 data-i18n="sq1_step3_title">훈련과 성장</h3><p data-i18n="sq1_step3_text">좌절을 딛고 혹독한 훈련을 거치며 두 자매는 각자의 방식으로 힘과 용기를 배워갑니다.</p></div></div>
        <div class="sq1-step"><div class="sq1-num">04</div><div><h3 data-i18n="sq1_step4_title">능력의 각성</h3><p data-i18n="sq1_step4_text">율이는 염력의 힘을, 정이는 생명과 교감하는 힘을 통해 자신만의 역할을 발견합니다.</p></div></div>
        <div class="sq1-step"><div class="sq1-num">05</div><div><h3 data-i18n="sq1_step5_title">베인과의 전투</h3><p data-i18n="sq1_step5_text">성장한 자매는 다시 베인과 맞서며 첫 번째 큰 위기를 넘어섭니다.</p></div></div>
        <div class="sq1-step"><div class="sq1-num">06</div><div><h3 data-i18n="sq1_step6_title">마왕 크라운</h3><p data-i18n="sq1_step6_text">정이의 희생 앞에서 율이의 빛의 힘이 폭발하고, 정이는 용서와 생명의 화살로 마왕을 정화합니다.</p></div></div>
      </div>
    </div>

    <div class="sq1-panel">
      <span class="sq1-kicker" data-i18n="sq1_message_kicker">THE MESSAGE</span>
      <h2 class="sq1-title" data-i18n="sq1_message_title">아무리 강한 어둠도</h2>
      <p class="sq1-lead" data-i18n="sq1_message_lead">SISTER SQUAD 1은 단순한 선과 악의 대결을 넘어, 두려움을 극복하는 용기와 서로를 믿는 협동심, 그리고 가족의 사랑을 이야기합니다.</p>
      <p class="sq1-quote" data-i18n="sq1_message_quote">“아무리 강한 어둠도 한 줄기 빛을 이겨내진 못해.”</p>
      <p class="sq1-text" data-i18n="sq1_message_text">거대한 힘을 갖는 것보다 중요한 것은 자신의 마음속에 있는 당당함과 기쁨을 잃지 않는 것입니다. 서로 다른 두 자매가 함께할 때 만들어지는 힘이 이 이야기의 가장 중요한 메시지입니다.</p>
    </div>

    <div class="sq1-panel">
      <span class="sq1-kicker" data-i18n="sq1_creator_kicker">CREATOR'S NOTE</span>
      <h2 class="sq1-title" data-i18n="sq1_creator_title">이 이야기를 시작한 마음</h2>
      <p class="sq1-text" data-i18n="sq1_creator_text">SISTER SQUAD는 가족의 사랑과 두 딸의 존재에서 얻은 힘을 바탕으로 기획된 이야기입니다. 실제 두 딸의 성격과 모습을 캐릭터에 최대한 담아내고, 그 위에 판타지와 모험을 더해 아이들이 재미있게 읽을 수 있는 세계를 만들고자 했습니다.</p>
    </div>
  `;

  const anchor=document.querySelector('.character-grid')?.parentElement;
  if(anchor && anchor.parentElement){anchor.parentElement.insertBefore(section,anchor.nextElementSibling);}
  else {document.querySelector('main.container')?.appendChild(section);}

  const ko={
    sq1_world_kicker:'THE WORLD',sq1_world_title:'루미나와 그림자 성',sq1_world_lead:'평범한 두 자매가 아빠의 서재에서 발견한 낡은 책을 통해 마법의 세계로 들어가면서 SISTER SQUAD의 첫 번째 모험이 시작됩니다.',sq1_world_text:'그들이 도착한 곳은 빛과 생명이 넘치는 요정 마을 루미나. 하지만 이 평화로운 세계는 어둠의 마왕 크라운이 지배하는 그림자 성 세력의 위협을 받고 있습니다. 예언서는 두 자매를 이 세계로 이끌었고, 자매는 자신들이 왜 선택되었는지 알아가는 과정 속에서 거대한 모험에 뛰어듭니다.',
    sq1_sisters_kicker:'THE SISTERS',sq1_sisters_title:'서로 달라서, 함께 강해지는 두 자매',sq1_yul_meta:'YUL · 11 · THE BRAVE LEADER',sq1_yul_title:'율이',sq1_yul_text:'모든 것을 머리로 이해하려는 논리적인 언니입니다. 브록이 만들어준 이성의 검을 사용하며, 동생을 지키려는 간절한 마음을 통해 사물을 띄우는 염력의 힘을 각성합니다.',sq1_jung_meta:'JUNG · 7 · THE HEART WEAVER',sq1_jung_title:'정이',sq1_jung_text:'세상에 대한 호기심과 순수한 영혼을 가진 동생입니다. 순수의 활을 다루며 숲의 동물과 몬스터까지 친구가 되는 테이밍 능력으로 예상하지 못한 활약을 펼칩니다.',sq1_sister_quote:'두 자매는 서로 같은 사람이 되어서 강해지는 것이 아니라, 서로 다른 모습 그대로 서로의 빈자리를 채우면서 성장합니다.',
    sq1_adventure_kicker:'THE ADVENTURE',sq1_adventure_title:'패배에서 각성으로',sq1_step1_title:'소환',sq1_step1_text:'숨바꼭질을 하던 두 자매는 낡은 책을 통해 마법의 세계로 소환됩니다.',sq1_step2_title:'첫 번째 패배',sq1_step2_text:'어둠의 검신 베인이 이끄는 기사단의 습격을 받으며 자매는 자신들의 무력함을 처음 마주합니다.',sq1_step3_title:'훈련과 성장',sq1_step3_text:'좌절을 딛고 혹독한 훈련을 거치며 두 자매는 각자의 방식으로 힘과 용기를 배워갑니다.',sq1_step4_title:'능력의 각성',sq1_step4_text:'율이는 염력의 힘을, 정이는 생명과 교감하는 힘을 통해 자신만의 역할을 발견합니다.',sq1_step5_title:'베인과의 전투',sq1_step5_text:'성장한 자매는 다시 베인과 맞서며 첫 번째 큰 위기를 넘어섭니다.',sq1_step6_title:'마왕 크라운',sq1_step6_text:'정이의 희생 앞에서 율이의 빛의 힘이 폭발하고, 정이는 용서와 생명의 화살로 마왕을 정화합니다.',
    sq1_message_kicker:'THE MESSAGE',sq1_message_title:'아무리 강한 어둠도',sq1_message_lead:'SISTER SQUAD 1은 단순한 선과 악의 대결을 넘어, 두려움을 극복하는 용기와 서로를 믿는 협동심, 그리고 가족의 사랑을 이야기합니다.',sq1_message_quote:'“아무리 강한 어둠도 한 줄기 빛을 이겨내진 못해.”',sq1_message_text:'거대한 힘을 갖는 것보다 중요한 것은 자신의 마음속에 있는 당당함과 기쁨을 잃지 않는 것입니다. 서로 다른 두 자매가 함께할 때 만들어지는 힘이 이 이야기의 가장 중요한 메시지입니다.',sq1_creator_kicker:"CREATOR'S NOTE",sq1_creator_title:'이 이야기를 시작한 마음',sq1_creator_text:'SISTER SQUAD는 가족의 사랑과 두 딸의 존재에서 얻은 힘을 바탕으로 기획된 이야기입니다. 실제 두 딸의 성격과 모습을 캐릭터에 최대한 담아내고, 그 위에 판타지와 모험을 더해 아이들이 재미있게 읽을 수 있는 세계를 만들고자 했습니다.'
  };
  const en={
    sq1_world_kicker:'THE WORLD',sq1_world_title:'Lumina and the Shadow Castle',sq1_world_lead:'The first SISTER SQUAD adventure begins when two ordinary sisters discover an old book in their father’s study and enter a magical world.',sq1_world_text:'They arrive in Lumina, a fairy village filled with light and life. Yet this peaceful world is threatened by the forces of Shadow Castle, ruled by the Dark Lord Crown. A prophecy has brought the sisters here, and their adventure unfolds as they begin to discover why they were chosen.',sq1_sisters_kicker:'THE SISTERS',sq1_sisters_title:'Different by nature, stronger together',sq1_yul_meta:'YUL · 11 · THE BRAVE LEADER',sq1_yul_title:'Yul',sq1_yul_text:'The logical older sister who wants to understand everything through reason. Wielding Brock’s Sword of Reason, she awakens telekinesis through her desperate desire to protect her sister.',sq1_jung_meta:'JUNG · 7 · THE HEART WEAVER',sq1_jung_title:'Jung',sq1_jung_text:'The younger sister with endless curiosity and a pure spirit. She wields the Bow of Purity and can tame animals and monsters, often creating unexpected turning points.',sq1_sister_quote:'The sisters do not become strong by becoming alike. They grow by filling each other’s empty spaces while remaining completely themselves.',sq1_adventure_kicker:'THE ADVENTURE',sq1_adventure_title:'From Defeat to Awakening',sq1_step1_title:'The Summoning',sq1_step1_text:'While playing hide-and-seek, the sisters are summoned into the magical world through the old book.',sq1_step2_title:'First Defeat',sq1_step2_text:'Attacked by the knight order led by Vain, the Sword God of Darkness, they face their helplessness for the first time.',sq1_step3_title:'Training and Growth',sq1_step3_text:'They overcome their frustration and endure demanding training, learning strength and courage in their own ways.',sq1_step4_title:'Awakening',sq1_step4_text:'Yul discovers telekinesis while Jung discovers her extraordinary connection with living things.',sq1_step5_title:'The Battle with Vain',sq1_step5_text:'The sisters return stronger and overcome their first great enemy together.',sq1_step6_title:'Dark Lord Crown',sq1_step6_text:'When Jung sacrifices herself, Yul’s light erupts. Jung then fires an arrow of forgiveness and life, purifying the Dark Lord.',sq1_message_kicker:'THE MESSAGE',sq1_message_title:'Even the strongest darkness',sq1_message_lead:'SISTER SQUAD 1 goes beyond a simple battle between good and evil. It is a story about courage in the face of fear, cooperation built on trust, and the love of family.',sq1_message_quote:'“No matter how strong the darkness, it cannot overcome a single ray of light.”',sq1_message_text:'What matters more than possessing great power is keeping the confidence and joy within your heart. The strength created when two very different sisters stand together is the heart of this story.',sq1_creator_kicker:"CREATOR'S NOTE",sq1_creator_title:'The Heart Behind the Story',sq1_creator_text:'SISTER SQUAD was conceived from the strength found in family love and in the very existence of two daughters. Their real personalities and qualities inspired the sisters, while fantasy and adventure were woven around them to create a world children could enjoy reading.'
  };
  const previous=window.onLangChange;
  window.onLangChange=function(lang){if(typeof previous==='function')previous(lang);const dict=lang==='en'?en:ko;section.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(dict[key]!==undefined)el.innerHTML=dict[key]});};
  if(typeof window.setLanguage==='function')window.setLanguage(window.getCurrentLang?window.getCurrentLang():'ko');
})();
