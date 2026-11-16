(function(){
if(!/\/music(?:\.html)?\/?$/.test(location.pathname))return;
const R={
'When the city stood still':['도시의 시간이 멈춘 듯한 순간과 사랑하는 사람을 향한 그리움을 음악으로 기록한 작품.','애절한 감정과 여운이 가사와 멜로디에 남도록 감성적인 팝 사운드를 중심으로 구성.','후렴에서 먼저 보컬을 따라가고, 같은 부분을 다시 들으며 피아노와 신스가 보컬 뒤에 남기는 공간에 귀를 기울여 보세요. 편곡의 여백이 그리움을 어떻게 받쳐 주는지 비교할 수 있습니다.','Emotional cinematic pop, tender vocal, nostalgic piano, warm synth pads, spacious arrangement, melancholic but beautiful atmosphere, heartfelt melody, polished modern production.'],
'We own the Cup':['경쟁과 승리의 순간에서 느껴지는 뜨거운 에너지를 스포츠 앤섬처럼 표현한 작품.','강한 리듬과 반복되는 훅을 중심으로 누구나 함께 따라갈 수 있는 밝고 역동적인 사운드를 구성.','개인의 감정보다 함께 외칠 수 있는 에너지에 초점을 둔 곡으로, 킥·베이스와 반복 훅이 곡 전체의 추진력을 만드는지를 살펴볼 수 있다.','High-energy sports anthem, upbeat dance-pop, powerful drums, driving bass, bright synth hooks, energetic vocal, catchy sing-along chorus, triumphant summer atmosphere.'],
'Winter town':['겨울의 차가움과 따뜻한 기억을 하나의 음악적 풍경으로 표현한 작품.','차분한 겨울의 공간감과 따뜻한 감정을 함께 느낄 수 있도록 부드러운 신스와 멜로디를 중심으로 구성.','차가운 계절 이미지와 따뜻한 기억이 동시에 느껴지는지가 핵심이다. 강한 비트보다 공간감과 멜로디가 분위기를 유지하는지를 중심으로 들을 수 있다.','Dreamy winter pop, warm soft synths, gentle electronic groove, atmospheric pads, intimate vocal, nostalgic melody, cozy winter night feeling, emotional and comforting.'],
'Run it back':['지나간 순간을 다시 되돌리고 싶은 마음과 아이돌 음악의 밝은 에너지를 담은 EP.','짧고 기억에 남는 훅과 선명한 리듬을 중심으로 여러 곡이 하나의 에너지를 이어가도록 구성.','EP에서 두 곡을 골라 첫 후렴을 비교해 보세요. 훅과 리듬이 달라져도 짧고 또렷한 후렴이 곡들을 같은 분위기로 묶는지 들어보면 좋습니다.','Modern K-pop inspired pop, energetic idol vocals, punchy drums, tight bass, bright synths, catchy hooks, explosive chorus, polished dance production.'],
'To The Space':['우주산업과 새로운 미래에 대한 기대를 더 넓은 세계로 나아가는 이미지로 표현한 싱글.','미래적인 신스와 넓은 공간감을 사용해 지상에서 우주로 확장되는 듯한 분위기를 구성.','현실의 우주산업이라는 주제를 직접 설명하기보다 넓어지는 공간감과 상승하는 신스의 이미지로 옮긴 곡이다. 제목의 확장감이 음악에서도 느껴지는지를 들을 수 있다.','Futuristic electronic pop, spacious synths, uplifting arpeggios, powerful drums, expansive chorus, cosmic feeling, optimistic futuristic mood, cinematic build.'],
'Ensemble':['서로 다른 악기가 하나의 음악 안에서 만나 조화를 이루는 연주곡.','피아노와 현악기, 오케스트라적 질감이 서로의 공간을 나누면서 하나의 흐름으로 연결되도록 구성.','보컬이나 가사보다 악기 사이의 관계가 중심인 작품이다. 피아노의 선율과 현악기의 층이 따로 들리면서도 하나의 흐름으로 이어지는지를 감상 포인트로 삼을 수 있다.','Emotional orchestral instrumental, expressive piano, warm violin ensemble, cinematic strings, dynamic orchestration, elegant melody, gradual build, powerful climax.'],
'To Rise':['멈춰 있던 마음을 다시 일으켜 앞으로 나아가는 순간을 담은 instrumental 작품.','여백에서 시작해 리듬과 멜로디의 에너지를 점차 높이며 상승하는 감정을 표현.','초반의 여백과 후반의 리듬을 번갈아 들어 보세요. 멜로디와 리듬에 힘이 붙으면서 제목이 말하는 ‘다시 일어서는 느낌’이 어떻게 만들어지는지 들을 수 있습니다.','Uplifting instrumental, gentle piano, atmospheric pads, gradual rhythmic build, inspiring melody, warm strings, hopeful cinematic mood, emotional rise.'],
'영역전개':['강력한 캐릭터와 기술에서 느껴지는 압도적인 힘과 긴장감을 음악으로 표현한 작품.','짧고 강한 리듬, 공격적인 신스와 극적인 전개로 한순간에 분위기가 폭발하는 듯한 사운드를 구성.','기술명에서 느껴지는 압도적인 분위기를 설명문으로 풀기보다 강한 타격감과 급격한 에너지 변화로 전달하는 방향이다.','Dark high-energy anime soundtrack, aggressive electronic drums, heavy bass, sharp synth stabs, dramatic tension, explosive drop, powerful vocal, supernatural atmosphere.'],
'벽력일섬':['검을 휘두르는 순간처럼 빠르고 날카로운 에너지와 강렬한 존재감을 담은 작품.','속도감 있는 리듬과 강한 타격감, 긴장감을 끌어올리는 전개로 순간적인 폭발력을 표현.','짧은 순간에 힘을 집중하는 이미지가 핵심이다. 긴 설명보다 빠른 템포와 타격음, 급격한 에너지 상승이 제목의 번개 같은 이미지를 전달하는지를 중심으로 들을 수 있다.','Explosive anime action theme, very fast tempo, sharp percussion, heavy impact hits, aggressive bass, dramatic strings, intense vocal, lightning-fast energy, explosive chorus.'],
'2026 앨범':['새로운 한 해의 시작과 앞으로 펼쳐질 가능성에 대한 기대와 에너지를 담은 앨범.','강한 리듬과 밝은 신스, 미래적인 사운드를 활용해 2026년의 이미지를 표현.','특정 한 곡의 감정보다 새로운 연도라는 공통된 이미지를 앨범 전체의 에너지로 묶는 데 의미가 있다. 밝은 신스와 강한 리듬이 ‘새로운 시작’이라는 인상을 만드는지를 살펴볼 수 있다.','Modern futuristic pop dance, punchy drums, powerful bass, bright synth hooks, energetic vocals, optimistic atmosphere, catchy choruses, confident new-beginning feeling.'],
'Winter groove':['겨울의 계절감을 유지하면서도 무겁지 않고 리드미컬하게 즐길 수 있는 음악.','겨울의 이미지에 펑키한 베이스와 반복적인 그루브를 결합해 몸을 움직이게 하는 방향으로 구성.','겨울 음악을 느린 발라드로만 풀지 않고 계절 이미지와 춤출 수 있는 그루브를 결합한 것이 핵심이다. 펑키한 베이스와 반복 리듬이 계절감을 해치지 않으면서 움직임을 만드는지를 들을 수 있다.','Upbeat winter groove, funky bass, crisp four-on-the-floor drums, catchy synth hook, warm keys, rhythmic vocal, playful seasonal atmosphere, addictive groove.'],
'사랑한다고':['소중한 사람에게 전하고 싶은 사랑의 말을 음악으로 표현한 작품.','과장된 편곡보다 보컬과 가사의 감정이 먼저 들리도록 공간을 두고 후렴의 메시지를 오래 남게 구성.','이 곡의 중심은 화려한 사운드보다 제목의 말을 직접 전하는 감정이다. 보컬과 가사가 편곡에 묻히지 않고 후렴의 메시지가 오래 남는지를 중심으로 감상할 수 있다.','Emotional Korean pop ballad, intimate expressive vocal, warm piano, soft strings, ambient pads, slow tempo, heartfelt melody, nostalgic atmosphere, sincere production.'],
'JPOP ver.1':['일본 음악 특유의 감성과 스타일을 바탕으로 신나는 아이돌 팝과 감성적인 록 발라드 리믹스를 함께 담은 작품.','밝고 탄력 있는 아이돌 팝의 리듬과 록 발라드의 드라마틱한 감정선을 함께 떠올리며, 선명한 후렴과 강한 밴드 에너지가 돋보이는 방향으로 소개.','아이돌 팝의 경쾌한 추진력과 록 발라드의 감정적인 고조가 어떻게 대비되는지, 후렴의 멜로디와 드럼·기타의 에너지가 기억에 남는지를 들어볼 수 있다.','Japanese J-pop inspired, energetic idol pop, emotional rock ballad remix, soaring melodic hooks, punchy drums, bright synths, expressive vocals, powerful electric guitars, dramatic chorus, polished modern production.'],
'Zumba ver.1':['환상적인 비트에 몸을 맡기며 자연스럽게 움직이게 되는 에너지 넘치는 피트니스 음악.','운동과 댄스에 어울리는 탄탄한 퍼커션, 반복적인 리듬, 활기찬 베이스와 밝은 훅을 중심으로 움직임을 이끄는 사운드를 강조.','비트가 일정하게 몸의 움직임을 이끄는지, 퍼커션과 베이스가 충분한 추진력을 주는지, 반복되는 훅이 운동의 에너지를 유지하는지를 중심으로 감상할 수 있다.','High-energy Zumba fitness dance music, infectious Latin-inspired rhythms, driving percussion, punchy bass, bright brass and synth hooks, upbeat dance groove, energetic workout atmosphere, rhythmic transitions, feel-good party energy.']};
const EN={
'When the city stood still':['A song capturing a moment when time seems to stop in the city and the longing for someone dear.','Emotional pop textures let the ache and lingering feeling remain in the lyrics and melody.','Follow the vocal in the chorus, then listen again for the space the piano and synths leave behind it. Hear how the open arrangement supports the sense of longing.'],
'We own the Cup':['A sports-anthem-style work capturing the energy of competition and victory.','Bright, dynamic production built around strong rhythms and a memorable sing-along hook.','Notice how the kick, bass and repeated hook drive the track with collective energy.'],
'Winter town':['A musical landscape blending winter’s chill with warm memories.','Soft synths and melody balance winter stillness with a sense of warmth.','Notice how spacious textures and melody hold both cold-season imagery and warm memories.'],
'Run it back':['An EP blending the wish to revisit past moments with the bright energy of idol pop.','Short, memorable hooks and clear rhythms connect the tracks with shared energy.','Pick two tracks from the EP and compare their first choruses. Listen for how the short, clear hooks connect the tracks even when their rhythms change.'],
'To The Space':['A single expressing hopes for space exploration and the future as a journey into a wider world.','Futuristic synths and expansive space suggest a movement from Earth toward the cosmos.','Expansion is conveyed through spacious textures and rising synths rather than direct explanation.'],
'Ensemble':['An instrumental piece in which different instruments meet and blend in harmony.','Piano, strings and orchestral textures share space while forming one continuous flow.','Listen for how piano and string layers remain distinct yet connected.'],
'To Rise':['An instrumental work about lifting a paused spirit and moving forward again.','The emotion gradually rises from open space into stronger rhythm and melody.','Compare the space in the opening with the rhythm later on. Hear how the growing energy in the melody and rhythm gives the title its sense of rising again.'],
'영역전개':['A work expressing overwhelming power and tension through formidable characters and techniques.','Forceful rhythms, aggressive synths and dramatic progression create an explosive sound.','Impact and sudden shifts in energy convey the overwhelming atmosphere suggested by the title.'],
'벽력일섬':['A work with the sharp energy and striking presence of a swift sword strike.','Fast rhythms, powerful impacts and rising tension capture a sudden burst of force.','Fast tempo and a rapid surge of energy convey concentrated power in an instant.'],
'2026 앨범':['An album filled with anticipation and energy for a new year and its possibilities.','Strong rhythms, bright synths and futuristic sounds evoke the spirit of 2026.','The album uses shared energy to express a new beginning.'],
'Winter groove':['Rhythmic, easy-to-enjoy music that keeps a winter feeling without becoming heavy.','Funky bass and a repeating groove combine with winter imagery to invite movement.','The key is combining seasonal atmosphere with a danceable groove rather than treating winter only as a slow ballad.'],
'사랑한다고':['A musical expression of the words of love we want to say to someone precious.','The arrangement leaves room for the vocal and lyrics, allowing the chorus message to linger.','Listen for the sincere emotion of saying “I love you” and for the lyrics to remain clear above the arrangement.'],
'JPOP ver.1':['A work blending the distinctive feel of Japanese music, from energetic idol pop to emotionally charged rock-ballad remixes.','Present the bright momentum of idol pop alongside the dramatic emotional arc of rock ballads, with memorable choruses and strong band energy.','Listen for the contrast between upbeat idol-pop drive and the emotional lift of rock ballads, especially the chorus melody, drums and guitars.'],
'Zumba ver.1':['High-energy fitness music that invites you to surrender to fantastic beats and move naturally.','Emphasize driving percussion, repeating rhythms, lively bass and bright hooks that keep the body moving during dance and workouts.','Notice whether the beat guides movement, the percussion and bass maintain momentum, and the recurring hooks sustain workout energy.']
};
const labelsByLanguage = {
  ko: {
    heading: '작품별 제작 노트',
    intro: '작품을 선택해 작업의 출발점, 제작 방향, 감상 포인트를 살펴보세요.',
    picker: '작품 선택',
    direction: '제작 방향',
    listening: '감상 포인트',
    openPlayer: '플레이어에서 이 앨범 열기',
    prompt: '제작 프롬프트',
    promptNote: '작품의 분위기와 주제를 바탕으로 재구성한 참고용 프롬프트'
  },
  en: {
    heading: 'Behind each release',
    intro: 'Choose a release to read how it began, how it was shaped, and what to listen for.',
    picker: 'Choose a release',
    direction: 'Production Direction',
    listening: 'What to Listen For',
    openPlayer: 'Open this release in the player',
    prompt: 'Creative Prompt',
    promptNote: 'Illustrative prompt reconstructed from the work’s mood and theme'
  }
};
const essay = document.querySelector('.music-creation-notes');
if (!essay) return;

const section = document.createElement('section');
section.id = 'music-work-notes';
section.className = 'media-section media-editorial music-work-notes';
section.setAttribute('aria-labelledby', 'music-production-heading');
section.innerHTML = `
  <div class="editorial-header"><h2 id="music-production-heading"></h2><p></p></div>
  <div class="music-note-layout">
    <div class="music-note-picker" role="group" aria-labelledby="music-note-picker-title">
      <p id="music-note-picker-title"></p>
      <div class="music-note-options"></div>
    </div>
    <div class="music-note-reader" id="music-production-record-list" aria-live="polite"></div>
  </div>`;
essay.after(section);
const jump = document.querySelector('a[href="#music-work-notes"]');
if (jump) jump.hidden = false;

const options = section.querySelector('.music-note-options');
const reader = section.querySelector('.music-note-reader');
let selectedIndex = 0;
const entries = Object.entries(R).map(([title, original], index) => {
  const albumIndex = typeof musicData === 'undefined' ? -1 : musicData.findIndex(item => item.title === title);
  const album = albumIndex >= 0 ? musicData[albumIndex] : null;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'music-note-option';
  button.innerHTML = '<span class="music-note-cover"></span><span class="music-note-option-title"></span>';
  button.querySelector('.music-note-option-title').textContent = title;

  const panel = document.createElement('article');
  panel.id = `music-work-note-${index + 1}`;
  panel.className = 'music-note-panel';
  panel.innerHTML = `
    <header class="music-note-masthead">
      <span class="music-note-cover"></span>
      <div><h3></h3><p></p></div>
    </header>
    <div class="music-note-body">
      <section class="music-note-direction"><h4></h4><p></p></section>
      <section class="music-note-listening"><h4></h4><p></p></section>
    </div>
    <details class="music-note-prompt"><summary></summary><p></p><pre lang="en"></pre></details>`;
  panel.querySelector('h3').textContent = title;
  panel.querySelector('.music-note-prompt pre').textContent = original[3];
  button.setAttribute('aria-controls', panel.id);

  if (album && typeof selectAlbum === 'function') {
    const playerLink = document.createElement('button');
    playerLink.type = 'button';
    playerLink.className = 'music-note-player-link';
    playerLink.addEventListener('click', () => selectAlbum(albumIndex, 'music-feature'));
    panel.querySelector('.music-note-listening').append(playerLink);
  }

  if (album && coverCache[album.id]) {
    for (const cover of [button.querySelector('.music-note-cover'), panel.querySelector('.music-note-cover')]) {
      const image = document.createElement('img');
      image.alt = '';
      image.loading = 'lazy';
      image.width = image.height = 128;
      setImageSource(image, album);
      cover.append(image);
    }
  }

  panel.hidden = index !== 0;
  button.setAttribute('aria-pressed', index === 0);
  button.addEventListener('click', () => {
    if (index === selectedIndex) return;
    const current = entries[selectedIndex];
    current.panel.hidden = true;
    current.button.setAttribute('aria-pressed', 'false');
    panel.hidden = false;
    button.setAttribute('aria-pressed', 'true');
    selectedIndex = index;
  });

  options.append(button);
  reader.append(panel);
  return { title, original, panel, button };
});

function renderLanguage() {
  const lang = musicLang();
  const labels = labelsByLanguage[lang];
  section.querySelector('h2').textContent = labels.heading;
  section.querySelector('.editorial-header p').textContent = labels.intro;
  section.querySelector('#music-note-picker-title').textContent = labels.picker;

  for (const { title, original, panel } of entries) {
    const notes = lang === 'en' ? EN[title] : original;
    panel.querySelector('.music-note-masthead p').textContent = notes[0];
    panel.querySelector('.music-note-direction h4').textContent = labels.direction;
    panel.querySelector('.music-note-direction p').textContent = notes[1];
    panel.querySelector('.music-note-listening h4').textContent = labels.listening;
    panel.querySelector('.music-note-listening p').textContent = notes[2];
    const playerLink = panel.querySelector('.music-note-player-link');
    if (playerLink) playerLink.textContent = labels.openPlayer;
    panel.querySelector('.music-note-prompt summary').textContent = labels.prompt;
    panel.querySelector('.music-note-prompt p').textContent = labels.promptNote;
  }
}

renderLanguage();
new MutationObserver(renderLanguage).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
