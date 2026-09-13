(function(){
  'use strict';

  var I18N = {
    ko: {
      title: 'Movie Creation Notes',
      hero: '영상 결과만 보여주는 대신, 각 작품을 어떤 생각으로 기획했고 생성형 AI를 어떻게 활용했는지 기록합니다. 아래의 제작 프롬프트는 작품의 분위기와 제작 의도를 다시 구현할 수 있도록 정리한 실전형 프롬프트입니다.',
      works: [
        {
          eyebrow: '01 · MUSIC VIDEO', title: 'FURIOUS 💥',
          desc: '전쟁과 갈등으로 병들어가는 세계를 바라보며 느낀 분노와 안타까움을 음악과 AI 영상으로 표현한 작품입니다. 화려한 전쟁 장면 자체보다 반복되는 충돌 속에서 사람이 겪는 상실과 긴장감을 시각적인 언어로 전달하는 데 초점을 두었습니다.',
          watch: 'YouTube에서 영상 보기', method: '제작 방법', promptTitle: '제작 프롬프트', lesson: '제작하면서 중요했던 점',
          steps: ['완성된 음악의 분위기와 가사에서 영상의 핵심 감정을 추출합니다.','전쟁, 충돌, 파괴, 긴장감과 같은 핵심 이미지를 장면 단위로 나눕니다.','장면마다 필요한 시각적 콘셉트를 프롬프트로 구체화해 생성합니다.','생성된 장면을 음악의 흐름과 리듬에 맞춰 연결하고 전체 분위기를 통일합니다.'],
          stepNames: ['01 · 음악','02 · 장면 기획','03 · Gemini','04 · 편집'],
          lessonText: 'AI가 만들어주는 장면을 그대로 나열하기보다 음악의 감정 변화에 맞춰 장면의 강도와 속도를 조절하는 것이 중요했습니다. 영상은 음악을 설명하는 별도의 이미지 모음이 아니라 음악의 감정을 확장하는 또 하나의 표현 수단으로 접근했습니다.'
        },
        {
          eyebrow: '02 · LIVE-ACTION CONCEPT', title: '귀멸의 칼날 실사 촬영 현장',
          desc: '애니메이션 속 캐릭터를 실제 영화로 제작한다면 어떤 촬영 현장이 만들어질까라는 상상에서 출발한 작품입니다. 완성된 실사 장면보다 영화가 만들어지는 순간 자체를 보여주는 메이킹 영상의 느낌을 살리는 방향으로 제작했습니다.',
          watch: 'YouTube에서 영상 보기', method: '제작 방법', promptTitle: '제작 프롬프트', lesson: '제작하면서 중요했던 점',
          methodText: '캐릭터의 의상, 헤어스타일, 색감과 같은 핵심 특징을 유지하면서 실제 배우와 영화 제작 현장처럼 보이도록 구성했습니다. 카메라, 조명, 스태프와 세트 등의 요소를 함께 넣어 ‘애니메이션을 실사 영화로 촬영하는 현장’이라는 하나의 상황을 만드는 방식으로 Gemini를 활용했습니다.',
          lessonText: '실사화의 핵심은 단순히 캐릭터를 사람처럼 만드는 것이 아니라 원래 캐릭터의 인상을 유지하면서도 실제 영화 촬영장에 존재하는 것처럼 보이게 만드는 데 있습니다. 따라서 캐릭터 설명과 촬영 현장 설명을 하나의 프롬프트 안에서 함께 유지하는 것이 중요합니다.'
        },
        {
          eyebrow: '03 · MUSIC VIDEO', title: '사랑한다고',
          desc: '음악이 전달하는 사랑과 그리움의 감정을 영상으로 확장한 뮤직비디오입니다. 강한 시각 효과보다 인물과 공간, 조명과 분위기를 이용해 노래가 가진 감정을 따라가는 것을 목표로 했습니다.',
          watch: 'YouTube에서 영상 보기', method: '제작 방법', promptTitle: '제작 프롬프트', lesson: '제작하면서 중요했던 점',
          methodText: '노래에서 가장 중요한 감정을 먼저 정리하고, 그 감정을 표현할 수 있는 인물과 공간을 구상했습니다. Gemini로 영화적인 장면을 만들고 각각의 장면이 하나의 감정선으로 연결되도록 구성한 뒤 음악의 흐름에 맞춰 편집하는 방식으로 완성했습니다.',
          lessonText: '감성적인 뮤직비디오에서는 모든 장면을 화려하게 만들기보다 음악이 전달하는 감정이 먼저 보이도록 하는 것이 중요합니다. 인물의 표정과 공간의 분위기를 중심에 두고 영상이 음악을 방해하지 않도록 구성했습니다.'
        }
      ]
    },
    en: {
      title: 'Movie Creation Notes',
      hero: 'Instead of showing only the finished videos, this page records the ideas behind each work and how generative AI was used in the process. The prompts below are practical prompts organized to recreate the mood and creative intent of each work.',
      works: [
        {
          eyebrow: '01 · MUSIC VIDEO', title: 'FURIOUS 💥',
          desc: 'A music video expressing the anger and sadness I felt while looking at a world damaged by war and conflict through music and AI-generated visuals. Rather than glorifying spectacular battle scenes, the work focuses on communicating the loss and tension people experience amid repeated conflict.',
          watch: 'Watch on YouTube', method: 'Production Method', promptTitle: 'Production Prompt', lesson: 'What Mattered During Production',
          steps: ['Extract the core emotions from the finished music, its mood and lyrics.','Break key images such as war, conflict, destruction and tension into individual scenes.','Develop the visual concept needed for each scene into a detailed prompt and generate it.','Connect the generated scenes to the flow and rhythm of the music and unify the overall mood.'],
          stepNames: ['01 · Music','02 · Scene Planning','03 · Gemini','04 · Editing'],
          lessonText: 'It was important not to simply line up AI-generated scenes, but to adjust their intensity and pace according to changes in the emotion of the music. I approached the video not as a collection of images explaining the song, but as another visual language that expands its emotion.'
        },
        {
          eyebrow: '02 · LIVE-ACTION CONCEPT', title: 'Demon Slayer — Live-Action Film Set',
          desc: 'This work began with the idea of what a real film set might look like if the characters from an animation were being made into a live-action movie. Rather than focusing only on the finished live-action scenes, I aimed to capture the feeling of a behind-the-scenes production in the moment a film is being made.',
          watch: 'Watch on YouTube', method: 'Production Method', promptTitle: 'Production Prompt', lesson: 'What Mattered During Production',
          methodText: 'I kept key character features such as costumes, hairstyles and color palettes while constructing the scene to look like a real film production with live-action actors. Gemini was used to combine cameras, lighting, crew members and sets into one coherent situation: a real film crew shooting an anime-inspired live-action movie.',
          lessonText: 'The key to live-action adaptation is not simply turning a character into a person. The original character identity must remain recognizable while the character also feels as if they genuinely exist on a real film set. That is why character details and production-set details need to remain consistent within the same prompt.'
        },
        {
          eyebrow: '03 · MUSIC VIDEO', title: 'I Love You',
          desc: 'A music video that expands the feelings of love and longing carried by the song into visual storytelling. Instead of relying on strong visual effects, the work follows the emotion of the song through people, spaces, lighting and atmosphere.',
          watch: 'Watch on YouTube', method: 'Production Method', promptTitle: 'Production Prompt', lesson: 'What Mattered During Production',
          methodText: 'I first identified the most important emotion in the song and then imagined the people and spaces that could express it. I used Gemini to create cinematic scenes, connected them through one emotional arc, and edited them to follow the flow of the music.',
          lessonText: 'In an emotional music video, it is more important to let the feeling of the music come through than to make every scene spectacular. I kept the characters’ expressions and the atmosphere of each space at the center so the visuals would support rather than distract from the song.'
        }
      ]
    }
  };

  function apply(lang){
    var current = lang === 'en' ? 'en' : 'ko';
    var data = I18N[current];
    var heroTitle = document.querySelector('.hero h1');
    var heroDesc = document.querySelector('.hero p');
    if(heroTitle) heroTitle.textContent = data.title;
    if(heroDesc) heroDesc.textContent = data.hero;
    document.querySelectorAll('.work').forEach(function(work, index){
      var item = data.works[index]; if(!item) return;
      var h2=work.querySelector('h2'), desc=work.querySelector('p'), watch=work.querySelector('.watch');
      if(h2) h2.textContent=item.title;
      if(desc) desc.textContent=item.desc;
      if(watch) watch.textContent=item.watch;
      var hs=work.querySelectorAll('h3');
      if(index===0){
        var steps=work.querySelectorAll('.step');
        steps.forEach(function(step,i){
          var b=step.querySelector('b');
          if(b && item.stepNames) b.textContent=item.stepNames[i];
          if(item.steps && item.steps[i]){
            var br=step.querySelector('br');
            if(br && br.nextSibling) br.nextSibling.textContent=item.steps[i];
          }
        });
      }
      if(index>0 && item.methodText){
        var ps=work.querySelectorAll('p');
        if(ps[1]) ps[1].textContent=item.methodText;
      }
      if(hs[0]) hs[0].textContent=item.method;
      if(hs[1]) hs[1].textContent=item.promptTitle;
      if(hs[2]) hs[2].textContent=item.lesson;
      var allP=work.querySelectorAll('p');
      var lessonP=allP[allP.length-1];
      if(lessonP) lessonP.textContent=item.lessonText;
    });
    document.documentElement.lang=current;
  }

  var previous = window.onLangChange;
  window.onLangChange = function(lang){
    if(typeof previous === 'function') previous(lang);
    apply(lang);
  };

  /* main.js is loaded after this page script, so its own language handler can replace the chain above.
     Capture the actual language-button click as a page-level fallback so this page always updates. */
  document.addEventListener('click', function(event){
    var button = event.target && event.target.closest ? event.target.closest('.lang-btn[data-lang]') : null;
    if(!button) return;
    var lang = button.getAttribute('data-lang') === 'en' ? 'en' : 'ko';
    try{localStorage.setItem('pref-lang',lang);}catch(e){}
    apply(lang);
  }, true);

  apply((function(){try{return localStorage.getItem('pref-lang')||'ko';}catch(e){return 'ko';}})());
})();