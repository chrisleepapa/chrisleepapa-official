(function(){
  if(!/^\/movie-creation\/?$/i.test(window.location.pathname)) return;
  var map={
    '영상 결과만 보여주는 대신, 각 작품을 어떤 생각으로 기획했고 생성형 AI를 어떻게 활용했는지 기록합니다. 아래의 제작 프롬프트는 작품의 분위기와 제작 의도를 다시 구현할 수 있도록 정리한 실전형 프롬프트입니다.':'Instead of showing only the finished videos, this page records how each work was conceived and how generative AI was used. The prompts below are practical prompts organized to recreate the mood and creative intent of each work.',
    '귀멸의 칼날 실사 촬영 현장':'Demon Slayer — Live-Action Film Set','사랑한다고':'I Love You','제작 방법':'Production Method','제작 프롬프트':'Production Prompt','제작하면서 중요했던 점':'What Mattered During Production','YouTube에서 영상 보기':'Watch the video on YouTube',
    '01 · 음악':'01 · MUSIC','02 · 장면 기획':'02 · SCENE PLANNING','03 · Gemini':'03 · GEMINI','04 · 편집':'04 · EDITING',
    '완성된 음악의 분위기와 가사에서 영상의 핵심 감정을 추출합니다.':'Extract the core emotions from the finished music and lyrics.','전쟁, 충돌, 파괴, 긴장감과 같은 핵심 이미지를 장면 단위로 나눕니다.':'Break key images such as war, conflict, destruction and tension into individual scenes.','장면마다 필요한 시각적 콘셉트를 프롬프트로 구체화해 생성합니다.':'Develop visual concepts for each scene and generate them with detailed prompts.','생성된 장면을 음악의 흐름과 리듬에 맞춰 연결하고 전체 분위기를 통일합니다.':'Connect the generated scenes to the flow and rhythm of the music and unify the overall atmosphere.',
    '전쟁과 갈등으로 병들어가는 세계를 바라보며 느낀 분노와 안타까움을 음악과 AI 영상으로 표현한 작품입니다. 화려한 전쟁 장면 자체보다 반복되는 충돌 속에서 사람이 겪는 상실과 긴장감을 시각적인 언어로 전달하는 데 초점을 두었습니다.':'This work expresses the anger and sadness I felt while watching a world damaged by war and conflict through music and AI-generated visuals. Rather than glorifying spectacular battle scenes, it focuses on the loss and tension people experience amid repeated conflict.',
    '애니메이션 속 캐릭터를 실제 영화로 제작한다면 어떤 촬영 현장이 만들어질까라는 상상에서 출발한 작품입니다. 완성된 실사 장면보다 영화가 만들어지는 순간 자체를 보여주는 메이킹 영상의 느낌을 살리는 방향으로 제작했습니다.':'This work began with the question of what a real film set would look like if animated characters were produced as a live-action movie. The goal was to capture the feeling of a behind-the-scenes production rather than simply presenting finished scenes.',
    '음악이 전달하는 사랑과 그리움의 감정을 영상으로 확장한 뮤직비디오입니다. 강한 시각 효과보다 인물과 공간, 조명과 분위기를 이용해 노래가 가진 감정을 따라가는 것을 목표로 했습니다.':'This music video expands the feelings of love and longing conveyed by the song into visual storytelling. It follows the emotion of the song through people, spaces, lighting and atmosphere rather than relying on strong visual effects.',
    'AI가 만들어주는 장면을 그대로 나열하기보다 음악의 감정 변화에 맞춰 장면의 강도와 속도를 조절하는 것이 중요했습니다. 영상은 음악을 설명하는 별도의 이미지 모음이 아니라 음악의 감정을 확장하는 또 하나의 표현 수단으로 접근했습니다.':'Rather than simply listing AI-generated scenes, it was important to adjust their intensity and pacing to the emotional changes in the music. I approached the video as another medium that expands the emotion of the music.',
    '캐릭터의 의상, 헤어스타일, 색감과 같은 핵심 특징을 유지하면서 실제 배우와 영화 제작 현장처럼 보이도록 구성했습니다. 카메라, 조명, 스태프와 세트 등의 요소를 함께 넣어 애니메이션을 실사 영화로 촬영하는 현장이라는 하나의 상황을 만드는 방식으로 Gemini를 활용했습니다.':'I preserved key character traits such as costumes, hairstyles and color palettes while making the characters and environment feel like a real film production. Gemini was used to combine cameras, lighting, crew members and sets into one believable live-action filming situation.',
    '실사화의 핵심은 단순히 캐릭터를 사람처럼 만드는 것이 아니라 원래 캐릭터의 인상을 유지하면서도 실제 영화 촬영장에 존재하는 것처럼 보이게 만드는 데 있습니다. 따라서 캐릭터 설명과 촬영 현장 설명을 하나의 프롬프트 안에서 함께 유지하는 것이 중요합니다.':'The key to live-action adaptation is preserving the original character identity while making the character feel present on a real film set. Keeping both the character and production-set descriptions in one prompt was important.',
    '노래에서 가장 중요한 감정을 먼저 정리하고, 그 감정을 표현할 수 있는 인물과 공간을 구상했습니다. Gemini로 영화적인 장면을 만들고 각각의 장면이 하나의 감정선으로 연결되도록 구성한 뒤 음악의 흐름에 맞춰 편집하는 방식으로 완성했습니다.':'I first identified the most important emotion in the song and designed people and spaces that could express it. I created cinematic scenes with Gemini, connected them along one emotional arc, and edited them to follow the music.',
    '감성적인 뮤직비디오에서는 모든 장면을 화려하게 만들기보다 음악이 전달하는 감정이 먼저 보이도록 하는 것이 중요합니다. 인물의 표정과 공간의 분위기를 중심에 두고 영상이 음악을 방해하지 않도록 구성했습니다.':'For an emotional music video, it is more important for the emotion of the music to come through than to make every scene spectacular. I centered the visuals on expressions and atmosphere so the video supports rather than distracts from the music.'
  };
  function apply(lang){
    var current=lang==='en'?'en':'ko';
    document.documentElement.lang=current;
    if(current==='ko') return;
    document.querySelectorAll('body *').forEach(function(el){
      if(el.children.length) return;
      var t=el.textContent.trim();
      if(map[t]) el.textContent=map[t];
    });
  }
  window.onLangChange=apply;
  try{apply(localStorage.getItem('pref-lang')||'ko');}catch(e){apply('ko');}
})();