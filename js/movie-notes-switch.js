(function(){
  'use strict';
  if(!/^\/movie\/?$/i.test(window.location.pathname)) return;

  function init(){
    var furious=document.querySelector('.creation-notes');
    if(!furious || document.getElementById('movieExtraCreationNotesLive')) return;

    var extra=document.createElement('section');
    extra.className='movie-extra-notes-live';
    extra.id='movieExtraCreationNotesLive';
    extra.innerHTML=`
      <div class="movie-extra-notes-inner">
        <div class="movie-extra-kicker">✦ CREATION RECORDS</div>
        <h2 class="movie-extra-title">선택한 영상의 제작 기록</h2>
        <article class="movie-work-live" data-video-index="1">
          <h3>귀멸의 칼날 실사 촬영 현장</h3>
          <p class="work-lead">애니메이션 캐릭터가 실제 영화 제작 현장에 존재한다면 어떤 모습일까라는 상상에서 출발했습니다. 단순히 캐릭터를 실사화하는 것보다 배우와 스태프, 카메라와 조명까지 존재하는 하나의 영화 세트를 만들어 ‘촬영 현장’이라는 이야기가 느껴지도록 구성했습니다.</p>
          <div class="movie-work-grid">
            <div class="movie-work-card"><h4>01 · 아이디어</h4><p>애니메이션 속 세계와 실제 영화 제작 현장의 경계를 섞어, 완성된 장면보다 그 장면을 촬영하고 있는 순간을 보여주는 데 초점을 맞췄습니다.</p></div>
            <div class="movie-work-card"><h4>02 · 제작 방법</h4><p>Gemini를 활용해 캐릭터의 의상과 헤어스타일, 색감 같은 정체성을 유지하면서 실제 배우처럼 보이는 인물과 영화 세트를 함께 설계했습니다. 카메라, 조명, 소품 등의 요소를 추가해 촬영 현장의 분위기를 강화했습니다.</p></div>
            <div class="movie-work-card"><h4>03 · AI를 사용한 이유</h4><p>실제로 존재하지 않는 캐릭터와 영화 세트를 동시에 상상하고 하나의 장면으로 구성해야 했기 때문에 생성형 AI를 활용하면 아이디어를 빠르게 시각화하고 여러 방향으로 실험할 수 있었습니다.</p></div>
          </div>
          <div class="movie-work-prompt"><h4>제작 프롬프트</h4><pre>Create a photorealistic behind-the-scenes scene from a live-action Japanese fantasy sword-fighting movie.

Transform anime-inspired characters into believable live-action actors while preserving their recognizable costume design, hairstyle, color palette and character identity.

Show a professional film production set with cinema cameras, lighting equipment, crew members, practical props and a large cinematic set surrounding the actors.

Realistic actors, detailed costumes, natural skin texture, realistic lighting, cinematic photography, Japanese period-fantasy atmosphere, documentary-style behind-the-scenes photography, high production value, photorealistic details.</pre></div>
        </article>
        <article class="movie-work-live" data-video-index="2">
          <h3>사랑한다고</h3>
          <p class="work-lead">이 작품은 사랑과 기억, 그리고 그리움이라는 감정을 영상으로 옮기는 데서 출발했습니다. 큰 사건을 보여주기보다 음악이 가진 감정을 인물의 표정과 공간, 거리감으로 전달하는 방향을 선택했습니다.</p>
          <div class="movie-work-grid">
            <div class="movie-work-card"><h4>01 · 아이디어</h4><p>음악을 들었을 때 떠오르는 사랑과 기억의 장면을 하나의 영화적 순간처럼 만들고, 말보다 표정과 분위기로 감정을 전달하는 것을 목표로 했습니다.</p></div>
            <div class="movie-work-card"><h4>02 · 제작 방법</h4><p>먼저 음악에서 핵심 감정을 정리한 뒤 Gemini를 활용해 인물과 공간의 분위기를 설계했습니다. 자연스러운 표정과 몸짓, 영화적인 조명과 얕은 심도를 중심으로 장면을 구성하고 음악의 흐름에 맞춰 연결했습니다.</p></div>
            <div class="movie-work-card"><h4>03 · AI를 사용한 이유</h4><p>기억과 그리움처럼 눈에 보이지 않는 감정을 특정한 인물과 공간의 분위기로 시각화하고, 실제 촬영만으로는 반복하기 어려운 장면을 빠르게 실험하기 위해 활용했습니다.</p></div>
          </div>
          <div class="movie-work-prompt"><h4>제작 프롬프트</h4><pre>Create a cinematic emotional music-video scene about love, memories and longing.

Show two people connected by a deep emotional relationship in a quiet and intimate atmosphere.

Natural emotional expressions, subtle body language, realistic cinematic lighting, beautiful environmental details, shallow depth of field, poetic visual storytelling, realistic skin and clothing textures, emotionally powerful but understated.

The scene should feel like a frame from an emotional feature film about remembering someone deeply loved.

Photorealistic, cinematic composition, natural lighting, high-end film cinematography.</pre></div>
        </article>
      </div>`;

    var style=document.createElement('style');
    style.textContent=`
      .movie-extra-notes-live{max-width:1100px;margin:0 auto 80px;padding:0 20px;position:relative;z-index:10}
      .movie-extra-notes-inner{padding:42px 44px;border:1px solid rgba(201,168,76,.18);border-radius:22px;background:linear-gradient(145deg,rgba(201,168,76,.045),rgba(10,10,18,.72));box-shadow:0 18px 50px rgba(0,0,0,.35);text-align:left}
      .movie-extra-kicker{color:#c9a84c;font-family:'Cinzel',serif;font-size:.78rem;letter-spacing:2px;margin-bottom:10px}
      .movie-extra-title{color:#fff;font-family:'Cinzel',serif;font-size:clamp(1.35rem,3vw,1.85rem);letter-spacing:1px;margin-bottom:24px}
      .movie-work-live{display:none;padding:30px 0;border-top:1px solid rgba(255,255,255,.08)}
      .movie-work-live.is-active{display:block}
      .movie-work-live h3{margin:0 0 12px;color:#fff;font-family:'Cinzel','Noto Serif KR',serif;font-size:1.12rem}
      .movie-work-live .work-lead{margin:0 0 24px;color:#bdb8b0;font-size:.95rem;line-height:1.9;word-break:keep-all}
      .movie-work-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid rgba(201,168,76,.12);border-bottom:1px solid rgba(255,255,255,.06)}
      .movie-work-card{padding:24px 22px 26px;border-right:1px solid rgba(255,255,255,.07)}
      .movie-work-card:last-child{border-right:0}
      .movie-work-card h4,.movie-work-prompt h4{margin:0 0 11px;color:#e8d08a;font-size:.88rem}
      .movie-work-card p{margin:0;color:#aaa6a0;font-size:.91rem;line-height:1.9;word-break:keep-all}
      .movie-work-prompt{margin-top:22px;padding-top:24px;border-top:1px solid rgba(255,255,255,.06)}
      .movie-work-prompt pre{margin:0;padding:20px 22px;overflow-x:auto;border-radius:12px;background:rgba(0,0,0,.32);border:1px solid rgba(201,168,76,.16);color:#d8d3c8;font:.8rem/1.8 'Pretendard',sans-serif;white-space:pre-wrap;word-break:break-word}
      @media(max-width:900px){.movie-work-grid{grid-template-columns:1fr}.movie-work-card{border-right:0;border-bottom:1px solid rgba(255,255,255,.07)}.movie-work-card:last-child{border-bottom:0}}
      @media(max-width:760px){.movie-extra-notes-live{margin-bottom:55px;padding:0 16px}.movie-extra-notes-inner{padding:30px 20px}.movie-work-live .work-lead{font-size:.9rem}.movie-work-card{padding:22px 0}.movie-work-card p{font-size:.88rem}.movie-work-prompt pre{padding:16px;font-size:.73rem}}
    `;
    document.head.appendChild(style);
    furious.insertAdjacentElement('afterend',extra);

    function switchNotes(index){
      var works=extra.querySelectorAll('.movie-work-live');
      if(index===0){furious.style.display='block';extra.style.display='none';}
      else{furious.style.display='none';extra.style.display='block';works.forEach(function(w){w.classList.toggle('is-active',Number(w.dataset.videoIndex)===index);});}
    }
    switchNotes(0);
    window.addEventListener('movieVideoChanged',function(e){switchNotes(Number(e.detail&&e.detail.index)||0);});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
