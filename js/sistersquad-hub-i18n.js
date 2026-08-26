/* SISTER SQUAD HUB language layer
 * Uses the site's existing KOR / ENG switch in main.js.
 */
'use strict';

(function(){
  if(!/sistersquad-hub/i.test(window.location.pathname||'')) return;

  const KO = {
    lead:'가족, 자매, 용기와 희망에 관한 이야기.',
    birthTitle:'가족의 사랑에서 시작된 이야기',
    birth:[
      'SISTER SQUAD는 2023년 겨울, 개인적으로 그리고 가족에게 큰 위기의 시간을 지나며 시작되었습니다.',
      '그 시간을 극복하는 과정에서 신앙은 중요한 힘이 되어주었습니다. 동시에 가족의 사랑과 두 딸의 존재 자체가 다시 일어설 수 있는 가장 큰 힘이 되어주었습니다.',
      '그 경험을 통해 가족이 서로에게 얼마나 큰 힘이 될 수 있는지를 깊이 생각하게 되었고, 그 마음이 SISTER SQUAD라는 이야기의 출발점이 되었습니다.'
    ],
    futureTitle:'언젠가를 위한 이야기',
    future:[
      '먼 훗날 엄마와 아빠가 늙고 병들어 아이들 곁에 오래 머물 수 없는 시간이 오더라도, 남겨진 두 자매가 서로의 손을 잡고 살아가기를 바라는 마음으로 이 이야기를 기획했습니다.',
      '세상이 아무리 어렵고 현실의 벽이 아무리 높아도 서로를 의지하고, 함께 힘을 모아 시련을 넘어 한 걸음씩 앞으로 나아가기를 바라는 마음. 그것이 SISTER SQUAD를 관통하는 이야기의 뼈대입니다.'
    ],
    heartTitle:'이야기를 움직이는 네 가지 마음',
    themes:['가족은 서로에게 힘이 됩니다.','두 자매는 서로를 지켜줍니다.','두려워도 함께 앞으로 나아갑니다.','시련을 넘어 한 걸음씩 나아갑니다.'],
    sistersTitle:'현실에서 판타지로',
    sisters:[
      'SISTER SQUAD의 두 주인공은 실제 두 딸의 모습을 바탕으로 만들어졌습니다. 실제 성격과 서로를 대하는 모습을 가능한 한 캐릭터에 담으려고 노력했습니다.',
      '그 위에 판타지 세계와 모험을 더했습니다. 현실에서 시작된 가족에 대한 마음을 재미있게 읽을 수 있는 이야기로 확장하고, 두 자매가 다양한 시련을 함께 지나며 성장하는 모습을 그려냈습니다.'
    ],
    yul:'실제 아이의 성격과 모습을 바탕으로 이야기를 이끌어가는 언니 캐릭터입니다.',
    jung:'실제 아이의 성격과 모습을 바탕으로 언니와 함께 모험을 만들어가는 동생 캐릭터입니다.',
    realTitle:'현실의 마음을 판타지에 담다',
    realCards:['가족의 사랑','두 자매의 모험','함께 극복하기'],
    realText:['실제 경험에서 느낀 가족의 사랑과 두 자매의 존재가 출발점이 되었습니다.','현실의 마음을 판타지 세계와 모험 속에 녹여냈습니다.','서로 의지하며 시련을 극복하고 한 걸음씩 나아가는 이야기를 담았습니다.'],
    musicTitle:'이야기를 음악으로 이어가다',
    music:[
      'SISTER SQUAD의 OST 역시 이 이야기의 중심에 있는 가족과 자매의 사랑, 그리고 함께 시련을 이겨내는 마음을 담았습니다.',
      '책에서 표현하고 싶었던 감정과 메시지를 음악으로 다시 풀어내고, 이야기의 세계를 소리로 확장했습니다.'
    ],
    exploreTitle:'작품과 세계, 게임 만나보기',
    cards:['첫 번째 이야기 · 줄거리 · 캐릭터 · OST →','두 번째 이야기 · 줄거리 · 캐릭터 · OST →','두 권을 연결하는 공식 세계관 →','SISTER SQUAD 게임과 PLAY 콘텐츠 →'],
    note:'“가족이 서로에게 가장 든든한 편이 되어주기를.”',
    cite:'CREATOR’S NOTE · CHRIS LEE.PAPA',
    meta:'SISTER SQUAD의 탄생 배경과 창작 철학, 두 자매의 이야기, 작품과 OST, 게임으로 이어지는 오리지널 IP를 소개합니다.'
  };

  const EN = {
    lead:'A story about family, sisterhood, courage, and hope.',
    birthTitle:'A Story Born from Family Love',
    birth:[
      'SISTER SQUAD began in the winter of 2023, during a deeply difficult season for me and my family.',
      'Faith became an important source of strength as we worked through that time. At the same time, the love of family and the very presence of my two daughters gave me the greatest strength to stand again.',
      'That experience made me think deeply about how much strength a family can give one another. That feeling became the starting point of SISTER SQUAD.'
    ],
    futureTitle:'A Story for the Future',
    future:[
      'I created this story with the hope that, even someday when Mom and Dad grow old and can no longer stay by their children’s side for long, the two sisters will still hold each other’s hands and keep moving forward together.',
      'No matter how difficult the world becomes or how high the walls of reality may seem, I hope they will rely on each other, gather their strength, overcome every trial, and take the next step together. That is the foundation running through SISTER SQUAD.'
    ],
    heartTitle:'Four Hearts That Drive the Story',
    themes:['Family gives us strength.','Two sisters protect one another.','Even when they are afraid, they move forward together.','They overcome hardship, one step at a time.'],
    sistersTitle:'From Real Life to Fantasy',
    sisters:[
      'The two protagonists of SISTER SQUAD are based on my two daughters. I tried to bring their real personalities and the way they relate to each other into the characters as honestly as possible.',
      'Then I added a fantasy world and adventure. Feelings about family that began in real life were expanded into a story that can be enjoyed, while the sisters grow as they face many trials together.'
    ],
    yul:'The older sister character, inspired by a real child’s personality and the way she sees the world.',
    jung:'The younger sister character, inspired by a real child’s personality and the way she creates adventures with her sister.',
    realTitle:'Turning Real Feelings into Fantasy',
    realCards:['Family Love','Two Sisters’ Adventure','Overcoming Together'],
    realText:['The love of family and the presence of two sisters, experienced in real life, became the starting point.','Those real feelings were woven into a fantasy world and an adventure.','The story is about relying on one another, overcoming trials, and moving forward one step at a time.'],
    musicTitle:'The Story Continues Through Music',
    music:[
      'The SISTER SQUAD OST also carries the heart of this story: family, sisterhood, and the courage to overcome trials together.',
      'The emotions and messages I wanted to express in the books are reimagined through music, expanding the world of the story through sound.'
    ],
    exploreTitle:'Explore the World of SISTER SQUAD',
    cards:['The first story · Story · Characters · OST →','The second story · Story · Characters · OST →','The official world lore connecting both books →','SISTER SQUAD games and PLAY content →'],
    note:'“May family always be each other’s strongest ally.”',
    cite:'CREATOR’S NOTE · CHRIS LEE.PAPA',
    meta:'Discover the origins and creative philosophy of SISTER SQUAD, the sisters’ story, and the original IP expanding through books, music, and games.'
  };

  function setText(el,text){if(el)el.textContent=text;}
  function setPs(container,items){if(!container)return;container.innerHTML=items.map(t=>`<p>${t}</p>`).join('');}
  function apply(lang){
    const d=lang==='en'?EN:KO;
    const hero=document.querySelector('.sq-hero');
    setText(hero&&hero.querySelector('.sq-lead'),d.lead);

    const sections=[...document.querySelectorAll('.sq-section')];
    if(sections[0]){setText(sections[0].querySelector('.sq-h2'),d.birthTitle);setPs(sections[0].querySelector('.sq-copy'),d.birth);}
    if(sections[1]){setText(sections[1].querySelector('.sq-h2'),d.futureTitle);setPs(sections[1].querySelector('.sq-copy'),d.future);}
    if(sections[2]){setText(sections[2].querySelector('.sq-h2'),d.heartTitle);sections[2].querySelectorAll('.sq-theme span').forEach((e,i)=>setText(e,d.themes[i]));}
    if(sections[3]){setText(sections[3].querySelector('.sq-h2'),d.sistersTitle);setPs(sections[3].querySelector('.sq-copy'),d.sisters);setText(sections[3].querySelectorAll('.sq-person p')[0],d.yul);setText(sections[3].querySelectorAll('.sq-person p')[1],d.jung);}
    if(sections[4]){setText(sections[4].querySelector('.sq-h2'),d.realTitle);sections[4].querySelectorAll('.sq-card h3').forEach((e,i)=>setText(e,d.realCards[i]));sections[4].querySelectorAll('.sq-card p').forEach((e,i)=>setText(e,d.realText[i]));}
    if(sections[5]){setText(sections[5].querySelector('.sq-h2'),d.musicTitle);setPs(sections[5].querySelector('.sq-copy'),d.music);}
    if(sections[6]){setText(sections[6].querySelector('.sq-h2'),d.exploreTitle);sections[6].querySelectorAll('.sq-link small').forEach((e,i)=>setText(e,d.cards[i]));}
    const note=document.querySelector('.sq-note');
    if(note){setText(note.querySelector('blockquote'),d.note);setText(note.querySelector('cite'),d.cite);}
    document.title=lang==='en'?'SISTER SQUAD | Chris LEE.PAPA':'SISTER SQUAD | Chris LEE.PAPA';
    const meta=document.querySelector('meta[name="description"]');if(meta)meta.setAttribute('content',d.meta);
  }

  window.onLangChange=function(lang){apply(lang)};
  window.addEventListener('load',function(){apply(typeof window.getCurrentLang==='function'?window.getCurrentLang():'ko')});
  apply(typeof window.getCurrentLang==='function'?window.getCurrentLang():'ko');
})();
