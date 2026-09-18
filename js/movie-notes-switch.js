(function(){
  'use strict';
  var path=window.location.pathname;
  if(!/^\/movie(?:\.html)?\/?$/i.test(path)) return;

  var original=document.createElement('script');
  original.src='/js/movie-notes-switch-original.js?v=20260918-1';
  original.onload=fix;
  original.onerror=fix;
  document.head.appendChild(original);

  function lang(){ return document.documentElement.lang==='en' ? 'en' : 'ko'; }

  function fix(){
    var l=lang();
    document.querySelectorAll('.shorts-title.i18n-ko').forEach(function(e){e.style.display=l==='ko'?'block':'none';});
    document.querySelectorAll('.shorts-title.i18n-en').forEach(function(e){e.style.display=l==='en'?'block':'none';});

    var creationTitle=document.querySelector('.creation-notes-title');
    if(creationTitle) creationTitle.textContent='FURIOUS — '+(l==='en'?'Production Notes':'제작 기록');

    var cards=document.querySelectorAll('.shorts-section .shorts-link');
    var titles=[
      ['체인소맨 Rev It Up','Chainsaw Man Rev It Up'],['주술회전 영역전개','Jujutsu Kaisen Domain Expansion'],
      ['귀멸의칼날 벽력일섬','Demon Slayer Thunderclap and Flash'],['귀멸의칼날 난리났어','Demon Slayer What a Riot'],
      ['로봇전쟁 Final Round','Robot War Final Round'],['귀멸의칼날 촬영준비','Demon Slayer Preparing for the Shoot'],
      ['귀멸의칼날 촬영 비하인드','Demon Slayer Behind the Scenes'],['귀멸의칼날 Flash bang','Demon Slayer Flash Bang']
    ];
    cards.forEach(function(card,i){
      var t=titles[i]; if(!t)return;
      var label=card.querySelector('.shorts-title-overlay');
      if(!label){ label=document.createElement('div'); label.className='shorts-title-overlay'; card.appendChild(label); }
      label.textContent=t[l==='en'?1:0];
      label.style.cssText='position:absolute;left:0;right:0;bottom:0;padding:34px 12px 12px;background:linear-gradient(to top,rgba(0,0,0,.92),rgba(0,0,0,0));color:#fff;font:600 .82rem/1.35 Pretendard,sans-serif;pointer-events:none;z-index:3';
      card.style.position='relative';
    });

    var archive=document.querySelector('.movie-editorial-context');
    if(!archive){
      var anchor=document.querySelector('.creation-notes');
      if(anchor){
        archive=document.createElement('section');
        archive.className='movie-editorial-context';
        archive.innerHTML='<div class="movie-editorial-inner"><div class="movie-extra-kicker">✦ HOW TO READ THIS ARCHIVE</div><h2 class="movie-extra-title"></h2><div class="movie-editorial-copy"><p></p><div class="movie-editorial-points"><article><h3></h3><p></p></article><article><h3></h3><p></p></article><article><h3></h3><p></p></article></div></div></div>';
        archive.style.cssText='max-width:1100px;margin:0 auto 50px;padding:0 20px;position:relative;z-index:10';
        archive.querySelector('.movie-editorial-inner').style.cssText='padding:38px 44px;border:1px solid rgba(201,168,76,.14);border-radius:22px;background:rgba(10,10,18,.58)';
        anchor.parentNode.insertBefore(archive,anchor);
      }
    }
    if(archive){
      var data=l==='en' ? {
        title:'This archive records why each video was made, not just the finished videos',
        lead:'This page goes beyond collecting finished videos. For each work, it records <strong>what I wanted to express, which scenes I chose, why I used generative AI, and what I learned during the process</strong>.',
        cards:[['FURIOUS','A music video that turns the emotions of war and conflict into the tension of music and visuals.'],['Imagining a Demon Slayer Film Set','An experiment in placing anime characters inside a believable live-action film production set.'],['Love Song','A music video expressing love, memory and longing through expressions, spaces and visual distance.']]
      } : {
        title:'영상만 보여주는 아카이브가 아니라, 영상을 만든 이유를 기록합니다',
        lead:'이 페이지는 완성된 영상을 모아 보여주는 데서 끝나지 않습니다. 각 작품에서 <strong>무엇을 표현하려 했는지, 어떤 장면을 선택했는지, 생성형 AI를 왜 사용했는지, 작업하면서 무엇을 배웠는지</strong>를 함께 기록합니다.',
        cards:[['FURIOUS','전쟁과 갈등을 바라보며 느낀 감정을 음악과 영상의 긴장감으로 옮긴 뮤직비디오입니다.'],['귀멸의 칼날 촬영현장의 상상','애니메이션 캐릭터가 실제 영화 제작 현장에 존재한다는 상상에서 출발한 실험입니다.'],['사랑한다고','사랑과 기억, 그리움을 인물의 표정과 공간의 분위기로 표현한 뮤직비디오입니다.']]
      };
      archive.querySelector('.movie-extra-title').textContent=data.title;
      archive.querySelector('.movie-editorial-copy>p').innerHTML=data.lead;
      archive.querySelectorAll('.movie-editorial-points article').forEach(function(a,i){a.querySelector('h3').textContent=data.cards[i][0];a.querySelector('p').textContent=data.cards[i][1];});
    }

    if(!window.__movieLanguageFixInstalled){
      window.__movieLanguageFixInstalled=true;
      var old=window.onLangChange;
      window.onLangChange=function(value){if(typeof old==='function')old(value);setTimeout(fix,0);};
      new MutationObserver(function(){fix();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    }
  }
})();