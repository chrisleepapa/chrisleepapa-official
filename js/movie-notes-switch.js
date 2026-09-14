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
        list.innerHTML='<p style="color:#a0a0b5;font-size:0.9rem;line-height:1.95;word-break:keep-all;text-align:left;margin:0;">Chris LEE.PAPA의 <strong style="color:#e8d08a;">VERTICAL ARCHIVES</strong>에 모은 쇼츠 영상들은 긴 뮤직비디오나 단편 영상과는 다른 방식으로 아이디어와 장면을 빠르게 보여주는 짧은 영상 기록입니다. 생성형 AI로 만든 시네마틱 이미지와 캐릭터, 음악과 움직임을 짧은 호흡 안에 담아 새로운 장면과 분위기를 실험했습니다. 하나의 완성된 작품뿐 아니라 다양한 시각적 아이디어가 어떻게 영상으로 발전하는지를 보여주는 <strong style="color:#c9a84c;">짧은 창작 실험의 아카이브</strong>입니다.</p><p style="color:#888;font-size:0.82rem;line-height:1.8;word-break:keep-all;text-align:left;margin:18px 0 0;">Each Short is a small visual experiment — a cinematic moment, character idea, atmosphere, or movement developed with generative AI. Together, these vertical videos document the process of exploring new visual languages in short form.</p>';
      }
    });

    var editorial=document.createElement('section');
    editorial.className='movie-editorial-context';
    editorial.innerHTML='<div class="movie-editorial-inner"><div class="movie-extra-kicker">✦ HOW TO READ THIS ARCHIVE</div><h2 class="movie-extra-title">영상만 보여주는 아카이브가 아니라, 영상을 만든 이유를 기록합니다</h2><div class="movie-editorial-copy"><p>이 페이지는 완성된 영상을 모아 보여주는 데서 끝나지 않습니다. 각 작품에서 <strong>무엇을 표현하려 했는지, 어떤 장면을 선택했는지, 생성형 AI를 왜 사용했는지, 작업하면서 무엇을 배웠는지</strong>를 함께 기록합니다. 같은 AI 도구를 사용하더라도 주제와 음악에 따라 장면을 설계하고 선택하는 방식이 달라지기 때문에, 결과물과 제작 과정을 함께 보는 것이 이 아카이브의 핵심입니다.</p><div class="movie-editorial-points"><article><h3>FURIOUS</h3><p>전쟁과 갈등을 바라보며 느낀 감정을 음악과 영상의 긴장감으로 옮긴 뮤직비디오입니다. 화려한 장면 자체보다 음악의 감정과 장면의 연결을 중요하게 생각했습니다.</p></article><article><h3>귀멸의 칼날 촬영현장의 상상</h3><p>애니메이션 캐릭터가 실제 영화 제작 현장에 존재한다는 상상에서 출발했습니다. 캐릭터의 정체성을 유지하면서 배우·세트·카메라·조명을 하나의 촬영 현장으로 구성하는 실험입니다.</p></article><article><h3>사랑한다고</h3><p>사랑과 기억, 그리움을 인물의 표정과 공간의 분위기로 표현한 뮤직비디오입니다. 큰 사건보다 음악이 전달하는 감정을 시각적인 거리감과 장면의 흐름으로 옮기는 데 집중했습니다.</p></article></div></div></div>';

    var style=document.createElement('style');
    style.textContent='.movie-editorial-context{max-width:1100px;margin:0 auto 50px;padding:0 20px;position:relative;z-index:10}.movie-editorial-inner{padding:38px 44px;border:1px solid rgba(201,168,76,.14);border-radius:22px;background:rgba(10,10,18,.58);box-shadow:0 14px 40px rgba(0,0,0,.25)}.movie-editorial-copy>p{color:#c8c4bc;font-size:1rem;line-height:1.95;max-width:900px;word-break:keep-all;margin-bottom:26px}.movie-editorial-copy strong{color:#e8d08a}.movie-editorial-points{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.movie-editorial-points article{padding:22px;border:1px solid rgba(255,255,255,.07);border-radius:16px;background:rgba(255,255,255,.02)}.movie-editorial-points h3{color:#fff;font-size:1rem;margin:0 0 10px}.movie-editorial-points p{color:#aaa6a0;font-size:.9rem;line-height:1.85;word-break:keep-all}@media(max-width:800px){.movie-editorial-inner{padding:30px 20px}.movie-editorial-points{grid-template-columns:1fr}}';
    document.head.appendChild(style);
    furious.insertAdjacentElement('beforebegin',editorial);

    var extra=document.createElement('section');
    extra.className='movie-extra-notes-live'; extra.id='movieExtraCreationNotesLive';
    extra.innerHTML='<div class="movie-extra-notes-inner"><div class="movie-extra-kicker">✦ CREATION RECORDS</div><h2 class="movie-extra-title"></h2><article class="movie-work-live" data-video-index="1"><h3>귀멸의 칼날 촬영현장의 제작기록</h3><p class="work-lead">애니메이션 캐릭터가 실제 영화 제작 현장에 존재한다면 어떤 모습일까라는 상상에서 출발했습니다. 배우와 스태프, 카메라와 조명까지 존재하는 하나의 영화 세트를 만들어 촬영 현장의 이야기가 느껴지도록 구성했습니다.</p><div class="movie-work-grid"><div><h4>01 · 아이디어</h4><p>애니메이션 세계와 실제 영화 제작 현장의 경계를 섞어, 장면을 촬영하고 있는 순간을 보여주는 데 초점을 맞췄습니다.</p></div><div><h4>02 · 제작 방법</h4><p>Gemini를 활용해 캐릭터의 의상·헤어스타일·색감 정체성을 유지하면서 실제 배우와 영화 세트를 설계하고 카메라·조명·소품을 추가했습니다.</p></div><div><h4>03 · AI를 사용한 이유</h4><p>존재하지 않는 캐릭터와 영화 세트를 동시에 상상하고 빠르게 여러 방향으로 시각화하기 위해 생성형 AI를 활용했습니다.</p></div></div><div class="movie-work-prompt"><h4>제작 프롬프트</h4><pre>Create a photorealistic behind-the-scenes scene from a live-action Japanese fantasy sword-fighting movie. Transform anime-inspired characters into believable live-action actors while preserving their recognizable costume design, hairstyle, color palette and character identity. Show a professional film production set with cinema cameras, lighting equipment, crew members, practical props and a large cinematic set surrounding the actors. Realistic actors, detailed costumes, natural skin texture, realistic lighting, cinematic photography, Japanese period-fantasy atmosphere, documentary-style behind-the-scenes photography, high production value, photorealistic details.</pre></div></article><article class="movie-work-live" data-video-index="2"><h3>사랑한다고 뮤직비디오의 제작기록</h3><p class="work-lead">사랑과 기억, 그리고 그리움이라는 감정을 영상으로 옮기는 데서 출발했습니다. 큰 사건보다 음악이 가진 감정을 인물의 표정과 공간, 거리감으로 전달하는 방향을 선택했습니다.</p><div class="movie-work-grid"><div><h4>01 · 아이디어</h4><p>사랑과 기억의 장면을 하나의 영화적 순간처럼 만들고, 말보다 표정과 분위기로 감정을 전달하는 것을 목표로 했습니다.</p></div><div><h4>02 · 제작 방법</h4><p>음악의 핵심 감정을 정리한 뒤 Gemini로 인물과 공간의 분위기를 설계하고 자연스러운 표정·몸짓과 영화적인 조명으로 장면을 구성했습니다.</p></div><div><h4>03 · AI를 사용한 이유</h4><p>기억과 그리움처럼 눈에 보이지 않는 감정을 인물과 공간의 분위기로 시각화하고 여러 장면을 빠르게 실험하기 위해 활용했습니다.</p></div></div><div class="movie-work-prompt"><h4>제작 프롬프트</h4><pre>Create a cinematic emotional music-video scene about love, memories and longing. Show two people connected by a deep emotional relationship in a quiet and intimate atmosphere. Natural emotional expressions, subtle body language, realistic cinematic lighting, beautiful environmental details, shallow depth of field, poetic visual storytelling, realistic skin and clothing textures, emotionally powerful but understated. The scene should feel like a frame from an emotional feature film about remembering someone deeply loved. Photorealistic, cinematic composition, natural lighting, high-end film cinematography.</pre></div></article></div>';

    var extraStyle=document.createElement('style');
    extraStyle.textContent='.movie-extra-notes-live{max-width:1100px;margin:0 auto 80px;padding:0 20px}.movie-extra-notes-inner{padding:42px 44px;border:1px solid rgba(201,168,76,.18);border-radius:22px;background:linear-gradient(145deg,rgba(201,168,76,.045),rgba(10,10,18,.72));text-align:left}.movie-extra-kicker{color:#c9a84c;font-family:Cinzel,serif;font-size:.78rem;letter-spacing:2px}.movie-extra-title{color:#fff;font-family:Cinzel,serif;font-size:clamp(1.35rem,3vw,1.85rem);margin:10px 0 24px}.movie-work-live{display:none;padding:30px 0;border-top:1px solid rgba(255,255,255,.08)}.movie-work-live.is-active{display:block}.movie-work-live h3{color:#fff;margin:0 0 12px}.movie-work-live .work-lead,.movie-work-live p{color:#aaa6a0;line-height:1.9;word-break:keep-all}.movie-work-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid rgba(201,168,76,.12);border-bottom:1px solid rgba(255,255,255,.06)}.movie-work-grid>div{padding:24px 20px;border-right:1px solid rgba(255,255,255,.07)}.movie-work-grid>div:last-child{border-right:0}.movie-work-grid h4,.movie-work-prompt h4{color:#e8d08a;margin:0 0 10px;font-size:.88rem}.movie-work-prompt{margin-top:22px;padding-top:22px;border-top:1px solid rgba(255,255,255,.06)}.movie-work-prompt pre{padding:18px;border-radius:12px;background:rgba(0,0,0,.32);color:#d8d3c8;white-space:pre-wrap;word-break:break-word;line-height:1.7}@media(max-width:900px){.movie-work-grid{grid-template-columns:1fr}.movie-work-grid>div{border-right:0;border-bottom:1px solid rgba(255,255,255,.07)}}@media(max-width:760px){.movie-extra-notes-inner{padding:30px 20px}}';
    document.head.appendChild(extraStyle); furious.insertAdjacentElement('afterend',extra);

    function switchNotes(index){
      var works=extra.querySelectorAll('.movie-work-live'), title=extra.querySelector('.movie-extra-title');
      if(index===0){furious.style.display='block';extra.style.display='none';}
      else{furious.style.display='none';extra.style.display='block';works.forEach(function(w){w.classList.toggle('is-active',Number(w.dataset.videoIndex)===index);});if(title) title.textContent=index===1?'귀멸의 칼날 촬영현장의 제작기록':'사랑한다고 뮤직비디오의 제작기록';}
    }
    switchNotes(0); window.addEventListener('movieVideoChanged',function(e){switchNotes(Number(e.detail&&e.detail.index)||0);});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();