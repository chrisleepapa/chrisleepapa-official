(function(){
  'use strict';
  if(!/^\/movie\/?$/i.test(window.location.pathname)) return;

  function init(){
    var furious=document.querySelector('.creation-notes');
    if(!furious || document.getElementById('movieExtraCreationNotesLive')) return;

    document.querySelectorAll('a[href="/movie-creation"]').forEach(function(a){
      var sub=a.closest('.nav-project-submenu,.mobile-project-children');
      if(sub) sub.remove(); else a.remove();
    });

    document.querySelectorAll('h3').forEach(function(h){
      if(h.textContent.trim()!=='✦   VIDEO LIST' && h.textContent.trim()!=='✦ &nbsp; VIDEO LIST' && h.textContent.indexOf('VIDEO LIST')===-1) return;
      h.textContent='✦  SHORTS VIDEO ARCHIVE';
      var list=h.nextElementSibling;
      if(list){
        list.innerHTML='<p class="movie-shorts-archive-ko" style="color:#a0a0b5;font-size:0.9rem;line-height:1.95;word-break:keep-all;text-align:left;margin:0;">Chris LEE.PAPA의 <strong style="color:#e8d08a;">VERTICAL ARCHIVES</strong>에 모은 쇼츠 영상들은 긴 뮤직비디오나 단편 영상과는 다른 방식으로 아이디어와 장면을 빠르게 보여주는 짧은 영상 기록입니다. 생성형 AI로 만든 시네마틱 이미지와 캐릭터, 음악과 움직임을 짧은 호흡 안에 담아 새로운 장면과 분위기를 실험했습니다. 하나의 완성된 작품뿐 아니라 다양한 시각적 아이디어가 어떻게 영상으로 발전하는지를 보여주는 <strong style="color:#c9a84c;">짧은 창작 실험의 아카이브</strong>입니다.</p><p class="movie-shorts-archive-en" style="color:#a0a0b5;font-size:0.9rem;line-height:1.95;word-break:keep-all;text-align:left;margin:0;">The Shorts collected in Chris LEE.PAPA's <strong style="color:#e8d08a;">VERTICAL ARCHIVES</strong> are short-form records that explore ideas and scenes in a different way from longer music videos and short films. They experiment with cinematic images, characters, music and movement created with generative AI, capturing new scenes and moods in a compact format. Together, they form an archive of short creative experiments showing how visual ideas can develop into videos.</p>';
      }
    });

    var editorial=document.createElement('section');
    editorial.className='movie-editorial-context';
    editorial.innerHTML='<div class="movie-editorial-inner"><div class="movie-extra-kicker">✦ HOW TO READ THIS ARCHIVE</div><h2 class="movie-extra-title"></h2><div class="movie-editorial-copy"><p></p><div class="movie-editorial-points"><article><h3></h3><p></p></article><article><h3></h3><p></p></article><article><h3></h3><p></p></article></div></div></div>';

    var style=document.createElement('style');
    style.textContent='.movie-editorial-context{max-width:1100px;margin:0 auto 50px;padding:0 20px;position:relative;z-index:10}.movie-editorial-inner{padding:38px 44px;border:1px solid rgba(201,168,76,.14);border-radius:22px;background:rgba(10,10,18,.58);box-shadow:0 14px 40px rgba(0,0,0,.25)}.movie-editorial-copy>p{color:#c8c4bc;font-size:1rem;line-height:1.95;max-width:900px;word-break:keep-all;margin-bottom:26px}.movie-editorial-copy strong{color:#e8d08a}.movie-editorial-points{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.movie-editorial-points article{padding:22px;border:1px solid rgba(255,255,255,.07);border-radius:16px;background:rgba(255,255,255,.02)}.movie-editorial-points h3{color:#fff;font-size:1rem;margin:0 0 10px}.movie-editorial-points p{color:#aaa6a0;font-size:.9rem;line-height:1.85;word-break:keep-all}@media(max-width:800px){.movie-editorial-inner{padding:30px 20px}.movie-editorial-points{grid-template-columns:1fr}}';
    document.head.appendChild(style);
    furious.insertAdjacentElement('beforebegin',editorial);

    var extra=document.createElement('section');
    extra.className='movie-extra-notes-live'; extra.id='movieExtraCreationNotesLive';
    extra.innerHTML='<div class="movie-extra-notes-inner"><div class="movie-extra-kicker">✦ CREATION RECORDS</div><h2 class="movie-extra-title"></h2><article class="movie-work-live" data-video-index="1"><h3></h3><p class="work-lead"></p><div class="movie-work-grid"><div><h4></h4><p></p></div><div><h4></h4><p></p></div><div><h4></h4><p></p></div></div><div class="movie-work-prompt"><h4></h4><pre>Create a photorealistic behind-the-scenes scene from a live-action Japanese fantasy sword-fighting movie. Transform anime-inspired characters into believable live-action actors while preserving their recognizable costume design, hairstyle, color palette and character identity. Show a professional film production set with cinema cameras, lighting equipment, crew members, practical props and a large cinematic set surrounding the actors. Realistic actors, detailed costumes, natural skin texture, realistic lighting, cinematic photography, Japanese period-fantasy atmosphere, documentary-style behind-the-scenes photography, high production value, photorealistic details.</pre></div></article><article class="movie-work-live" data-video-index="2"><h3></h3><p class="work-lead"></p><div class="movie-work-grid"><div><h4></h4><p></p></div><div><h4></h4><p></p></div><div><h4></h4><p></p></div></div><div class="movie-work-prompt"><h4></h4><pre>Create a cinematic emotional music-video scene about love, memories and longing. Show two people connected by a deep emotional relationship in a quiet and intimate atmosphere. Natural emotional expressions, subtle body language, realistic cinematic lighting, beautiful environmental details, shallow depth of field, poetic visual storytelling, realistic skin and clothing textures, emotionally powerful but understated. The scene should feel like a frame from an emotional feature film about remembering someone deeply loved. Photorealistic, cinematic composition, natural lighting, high-end film cinematography.</pre></div></article></div>';

    var extraStyle=document.createElement('style');
    extraStyle.textContent='.movie-extra-notes-live{max-width:1100px;margin:0 auto 80px;padding:0 20px}.movie-extra-notes-inner{padding:42px 44px;border:1px solid rgba(201,168,76,.18);border-radius:22px;background:linear-gradient(145deg,rgba(201,168,76,.045),rgba(10,10,18,.72));text-align:left}.movie-extra-kicker{color:#c9a84c;font-family:Cinzel,serif;font-size:.78rem;letter-spacing:2px}.movie-extra-title{color:#fff;font-family:Cinzel,serif;font-size:clamp(1.35rem,3vw,1.85rem);margin:10px 0 24px}.movie-work-live{display:none;padding:30px 0;border-top:1px solid rgba(255,255,255,.08)}.movie-work-live.is-active{display:block}.movie-work-live h3{color:#fff;margin:0 0 12px}.movie-work-live .work-lead,.movie-work-live p{color:#aaa6a0;line-height:1.9;word-break:keep-all}.movie-work-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid rgba(201,168,76,.12);border-bottom:1px solid rgba(255,255,255,.06)}.movie-work-grid>div{padding:24px 20px;border-right:1px solid rgba(255,255,255,.07)}.movie-work-grid>div:last-child{border-right:0}.movie-work-grid h4,.movie-work-prompt h4{color:#e8d08a;margin:0 0 10px;font-size:.88rem}.movie-work-prompt{margin-top:22px;padding-top:22px;border-top:1px solid rgba(255,255,255,.06)}.movie-work-prompt pre{padding:18px;border-radius:12px;background:rgba(0,0,0,.32);color:#d8d3c8;white-space:pre-wrap;word-break:break-word;line-height:1.7}@media(max-width:900px){.movie-work-grid{grid-template-columns:1fr}.movie-work-grid>div{border-right:0;border-bottom:1px solid rgba(255,255,255,.07)}}@media(max-width:760px){.movie-extra-notes-inner{padding:30px 20px}}';
    document.head.appendChild(extraStyle); furious.insertAdjacentElement('afterend',extra);

    var shortsData=[
      {ko:'체인소맨 Rev It Up',en:'Chainsaw Man Rev It Up',desc:'체인소맨의 캐릭터들이 하나의 락밴드로 모여 강렬한 음악과 화려한 무대를 펼치는 상상 속 라이브 공연을 영상으로 표현했습니다.'},
      {ko:'주술회전 영역전개',en:'Jujutsu Kaisen Domain Expansion',desc:'주술회전의 캐릭터들이 격투와 퍼포먼스가 결합된 무대에서 강렬한 에너지와 화려한 액션을 선보이는 쇼케이스를 표현했습니다.'},
      {ko:'귀멸의칼날 벽력일섬',en:'Demon Slayer Thunderclap and Flash',desc:'귀멸의칼날 캐릭터들의 빠르고 강렬한 움직임과 무술 퍼포먼스를 중심으로, 한순간의 긴장감과 에너지를 담아낸 영상입니다.'},
      {ko:'귀멸의칼날 난리났어',en:'Demon Slayer What a Riot',desc:'귀멸의칼날의 매력적인 여성 캐릭터들이 음악에 맞춰 화려한 퍼포먼스를 펼치는 모습을 유쾌하고 역동적인 댄스 영상으로 표현했습니다.'},
      {ko:'로봇전쟁 Final Round',en:'Robot War Final Round',desc:'자동차에서 거대한 로봇으로 변신하는 캐릭터들이 도심 한가운데에서 맞붙는 강렬한 결투를 역동적인 영상으로 표현했습니다.'},
      {ko:'귀멸의칼날 촬영준비',en:'Demon Slayer Preparing for the Shoot',desc:'귀멸의칼날의 캐릭터들이 실제 영화 촬영을 준비하는 현장을 상상해, 본편에서는 볼 수 없는 실사 촬영 전의 모습을 스케치처럼 담아낸 영상입니다.'},
      {ko:'귀멸의칼날 촬영 비하인드',en:'Demon Slayer Behind the Scenes',desc:'귀멸의칼날 캐릭터들이 실제 작품의 촬영을 마친 뒤 현장에서 이야기를 나누는 모습을 상상해 만든 유쾌한 비하인드 영상입니다.'},
      {ko:'귀멸의칼날 Flash bang',en:'Demon Slayer Flash Bang',desc:'귀멸의칼날의 매력적인 여성 캐릭터들이 강렬한 음악과 함께 화려한 퍼포먼스를 펼치는 모습을 감각적인 댄스 영상으로 표현했습니다.'}
    ];
    var shorts=document.querySelectorAll('.shorts-section .shorts-link');
    shorts.forEach(function(card,i){
      var data=shortsData[i]; if(!data) return;
      card.setAttribute('data-short-index',i);
      card.setAttribute('aria-label',data.ko+' — Chris LEE.PAPA YouTube Shorts');
      var img=card.querySelector('.shorts-thumb'); if(img) img.alt=data.ko+' — Chris LEE.PAPA YouTube Shorts';
      var label=document.createElement('div'); label.className='shorts-title-overlay'; label.textContent=data.ko; label.title=data.desc; card.appendChild(label);
    });
    var shortsTitleStyle=document.createElement('style');
    shortsTitleStyle.textContent='.shorts-title-overlay{position:absolute;left:0;right:0;bottom:0;padding:34px 12px 12px;background:linear-gradient(to top,rgba(0,0,0,.92),rgba(0,0,0,0));color:#fff;font:600 .82rem/1.35 Pretendard,sans-serif;text-align:left;word-break:keep-all;text-shadow:0 1px 3px rgba(0,0,0,.8);pointer-events:none}.shorts-link:hover .shorts-title-overlay{color:#e8d08a}@media(max-width:700px){.shorts-title-overlay{font-size:.76rem;padding:30px 10px 10px}}';
    document.head.appendChild(shortsTitleStyle);

    var editorialData={
      ko:{title:'영상만 보여주는 아카이브가 아니라, 영상을 만든 이유를 기록합니다',lead:'이 페이지는 완성된 영상을 모아 보여주는 데서 끝나지 않습니다. 각 작품에서 <strong>무엇을 표현하려 했는지, 어떤 장면을 선택했는지, 생성형 AI를 왜 사용했는지, 작업하면서 무엇을 배웠는지</strong>를 함께 기록합니다. 같은 AI 도구를 사용하더라도 주제와 음악에 따라 장면을 설계하고 선택하는 방식이 달라지기 때문에, 결과물과 제작 과정을 함께 보는 것이 이 아카이브의 핵심입니다.',cards:[['FURIOUS','전쟁과 갈등을 바라보며 느낀 감정을 음악과 영상의 긴장감으로 옮긴 뮤직비디오입니다. 화려한 장면 자체보다 음악의 감정과 장면의 연결을 중요하게 생각했습니다.'],['귀멸의 칼날 촬영현장의 상상','애니메이션 캐릭터가 실제 영화 제작 현장에 존재한다는 상상에서 출발했습니다. 캐릭터의 정체성을 유지하면서 배우·세트·카메라·조명을 하나의 촬영 현장으로 구성하는 실험입니다.'],['사랑한다고','사랑과 기억, 그리움을 인물의 표정과 공간의 분위기로 표현한 뮤직비디오입니다. 큰 사건보다 음악이 전달하는 감정을 시각적인 거리감과 장면의 흐름으로 옮기는 데 집중했습니다.']]},
      en:{title:'This archive records why each video was made, not just the finished videos',lead:'This page goes beyond collecting finished videos. For each work, it records <strong>what I wanted to express, which scenes I chose, why I used generative AI, and what I learned during the process</strong>. Even when using the same AI tools, the way scenes are designed and selected changes with the subject and music, so seeing the finished work together with the making process is central to this archive.',cards:[['FURIOUS','A music video that turns the emotions I felt while looking at war and conflict into the tension of music and visuals. I focused on the connection between the emotion of the music and each scene rather than spectacle alone.'],['Imagining a Demon Slayer Film Set','This began with the idea of anime characters existing on a real film production set. It is an experiment in building one believable production environment with actors, sets, cameras and lighting while preserving each character’s identity.'],['Love Song','A music video that expresses love, memory and longing through facial expressions and the atmosphere of each space. I focused on translating the emotion carried by the music through visual distance and the flow between scenes.']]}
    };
    var workData={
      1:{ko:{title:'귀멸의 칼날 촬영현장의 제작기록',lead:'애니메이션 캐릭터가 실제 영화 제작 현장에 존재한다면 어떤 모습일까라는 상상에서 출발했습니다. 배우와 스태프, 카메라와 조명까지 존재하는 하나의 영화 세트를 만들어 촬영 현장의 이야기가 느껴지도록 구성했습니다.',steps:[['01 · 아이디어','애니메이션 세계와 실제 영화 제작 현장의 경계를 섞어, 장면을 촬영하고 있는 순간을 보여주는 데 초점을 맞췄습니다.'],['02 · 제작 방법','Gemini를 활용해 캐릭터의 의상·헤어스타일·색감 정체성을 유지하면서 실제 배우와 영화 세트를 설계하고 카메라·조명·소품을 추가했습니다.'],['03 · AI를 사용한 이유','존재하지 않는 캐릭터와 영화 세트를 동시에 상상하고 빠르게 여러 방향으로 시각화하기 위해 생성형 AI를 활용했습니다.']]},en:{title:'Demon Slayer Film Set — Production Notes',lead:'This began with the idea of what anime characters might look like on a real film production set. I built a believable movie set with actors, crew, cameras and lighting so the atmosphere of a real shoot could be felt.',steps:[['01 · The Idea','I focused on blending the boundary between an anime world and a real film production set, showing the moment a scene is being filmed.'],['02 · Production Process','I used Gemini to design live-action actors and a film set while preserving the characters’ costume, hairstyle, color identity and recognizable features, then added cameras, lighting and props.'],['03 · Why AI','Generative AI made it possible to imagine fictional characters and a complete film set together and quickly visualize multiple directions.']]}},
      2:{ko:{title:'사랑한다고 뮤직비디오의 제작기록',lead:'사랑과 기억, 그리고 그리움이라는 감정을 영상으로 옮기는 데서 출발했습니다. 큰 사건보다 음악이 가진 감정을 인물의 표정과 공간, 거리감으로 전달하는 방향을 선택했습니다.',steps:[['01 · 아이디어','사랑과 기억의 장면을 하나의 영화적 순간처럼 만들고, 말보다 표정과 분위기로 감정을 전달하는 것을 목표로 했습니다.'],['02 · 제작 방법','음악의 핵심 감정을 정리한 뒤 Gemini로 인물과 공간의 분위기를 설계하고 자연스러운 표정·몸짓과 영화적인 조명으로 장면을 구성했습니다.'],['03 · AI를 사용한 이유','기억과 그리움처럼 눈에 보이지 않는 감정을 인물과 공간의 분위기로 시각화하고 여러 장면을 빠르게 실험하기 위해 활용했습니다.']]},en:{title:'Love Song Music Video — Production Notes',lead:'This began with translating love, memory and longing into moving images. Rather than relying on major events, I chose to communicate the emotion of the music through expressions, spaces and visual distance.',steps:[['01 · The Idea','I wanted each moment of love and memory to feel cinematic, communicating emotion through expressions and atmosphere rather than words.'],['02 · Production Process','After identifying the core emotion of the music, I used Gemini to design the characters and environments, then built scenes with natural expressions, gestures and cinematic lighting.'],['03 · Why AI','Generative AI helped visualize invisible emotions such as memory and longing through people and spaces, while allowing me to experiment with many scenes quickly.']]}}
    };

    function currentLang(){return document.documentElement.lang==='en'?'en':'ko';}
    function applyLanguage(){
      var lang=currentLang();
      document.querySelectorAll('.i18n-ko').forEach(function(e){e.style.display=lang==='ko'?'':'none';});
      document.querySelectorAll('.i18n-en').forEach(function(e){e.style.display=lang==='en'?'':'none';});
      document.querySelectorAll('.shorts-title.i18n-ko').forEach(function(e){e.style.display=lang==='ko'?'block':'none';});
      document.querySelectorAll('.shorts-title.i18n-en').forEach(function(e){e.style.display=lang==='en'?'block':'none';});
      document.querySelectorAll('.shorts-title-overlay').forEach(function(e){var d=shortsData[Number(e.parentElement.getAttribute('data-short-index'))];if(d)e.textContent=d[lang];});
      var ed=editorialData[lang], et=editorial.querySelector('.movie-extra-title'), ep=editorial.querySelector('.movie-editorial-copy>p');
      if(et)et.textContent=ed.title; if(ep)ep.innerHTML=ed.lead;
      editorial.querySelectorAll('.movie-editorial-points article').forEach(function(a,i){var c=ed.cards[i];if(!c)return;var h=a.querySelector('h3'),p=a.querySelector('p');if(h)h.textContent=c[0];if(p)p.textContent=c[1];});
      var active=extra.querySelector('.movie-work-live.is-active');
      if(active){var idx=Number(active.dataset.videoIndex),d=workData[idx]&&workData[idx][lang];if(d){extra.querySelector('.movie-extra-title').textContent=d.title;active.querySelector('h3').textContent=d.title;active.querySelector('.work-lead').textContent=d.lead;active.querySelectorAll('.movie-work-grid>div').forEach(function(el,i){if(d.steps[i]){el.querySelector('h4').textContent=d.steps[i][0];el.querySelector('p').textContent=d.steps[i][1];}});active.querySelector('.movie-work-prompt h4').textContent=lang==='en'?'Production Prompt':'제작 프롬프트';}}
      var archiveKo=document.querySelector('.movie-shorts-archive-ko'),archiveEn=document.querySelector('.movie-shorts-archive-en');if(archiveKo)archiveKo.style.display=lang==='ko'?'block':'none';if(archiveEn)archiveEn.style.display=lang==='en'?'block':'none';
    }

    function switchNotes(index){
      var works=extra.querySelectorAll('.movie-work-live'), title=extra.querySelector('.movie-extra-title');
      if(index===0){furious.style.display='block';extra.style.display='none';}
      else{furious.style.display='none';extra.style.display='block';works.forEach(function(w){w.classList.toggle('is-active',Number(w.dataset.videoIndex)===index);});if(title) title.textContent=index===1?'귀멸의 칼날 촬영현장의 제작기록':'사랑한다고 뮤직비디오의 제작기록';}
      setTimeout(applyLanguage,0);
    }
    switchNotes(0); window.addEventListener('movieVideoChanged',function(e){switchNotes(Number(e.detail&&e.detail.index)||0);});

    var oldLangChange=window.onLangChange;
    window.onLangChange=function(lang){if(typeof oldLangChange==='function')oldLangChange(lang);setTimeout(applyLanguage,0);};
    new MutationObserver(applyLanguage).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    applyLanguage();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();