/* Home: Chris's Pick — deterministic daily featured work */
'use strict';
(() => {
  const PICKS = [
    {type:'BOOK',icon:'✦',title:'SISTER SQUAD 1',sub:'The Book of Whispers · Book 1',desc:{ko:'율과 정, 두 자매가 신비로운 마법 세계 페어리 타운에서 펼치는 첫 번째 판타지 모험입니다. 소설과 컬러링북, OST로 이어지는 SISTER SQUAD의 시작을 만나보세요.',en:'The first fantasy adventure of two sisters, Yul and Jung, in the mysterious Fairy Town.'},image:'/images/sistersquad1.png?v=20260828',href:'sistersquad.html',action:{ko:'1권 보러가기',en:'Read Book 1'}},
    {type:'BOOK',icon:'✦',title:'SISTER SQUAD 2',sub:'저주받은 요정마을 · Book 2',desc:{ko:'사춘기 소녀가 된 율과 독립심 강한 정, 그리고 아빠 크리스가 잿빛으로 변한 요정마을 루미나를 구하기 위해 떠나는 두 번째 모험입니다.',en:'The second adventure of Yul, Jung, and their father Chris as they set out to save Lumina.'},image:'/images/sistersquad2_poster.jpg',href:'sistersquad2.html',action:{ko:'2권 보러가기',en:'Read Book 2'}},
    {type:'BOOK',icon:'✦',title:'Miracle Shot',sub:'Story · Book',desc:{ko:'풋살을 통해 서로 다른 아이들이 자신의 재능과 빛을 발견해가는 Miracle Shot의 이야기입니다.',en:'The Miracle Shot story of children discovering their gifts through futsal.'},image:'/images/og_share.png',href:'miracleshot.html',action:{ko:'작품 보기',en:'View Work'}},
    {type:'MUSIC',icon:'♫',title:'When the City Stood Still',sub:'Music Archive',spotifyAlbumId:'5qWOsYCJgw1bmXqvko7Thv',desc:{ko:'사랑하는 사람과의 추억이 담긴 도시의 시간이 멈춰버린 사랑처럼, 잠시 멈춘 듯한 순간들을 음악으로 기록한 작품. 애절하고 애틋한 그리움이 담긴 앨범.',en:'A musical record of moments that seem to have stopped, like a city frozen in memories of someone you love. An album filled with aching and tender longing.'},href:'music.html?album=5qWOsYCJgw1bmXqvko7Thv',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'To The Space',sub:'Music Archive',spotifyAlbumId:'1JyYgZ8VTbh5mASNezCTcJ',desc:{ko:'SpaceX의 상장과 우주산업의 새로운 시대에 대한 기대를 담은 싱글. 더 넓은 미래와 미지의 세계를 향한 설렘을 음악으로 표현한 작품.',en:'A single inspired by SpaceX’s IPO and anticipation for a new era of the space industry, expressing excitement for a wider future and the unknown.'},href:'music.html?album=1JyYgZ8VTbh5mASNezCTcJ',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'Ensemble',sub:'Music Archive',spotifyAlbumId:'2X3dnf8vnhCSQ0c7H9oZht',desc:{ko:'오케스트라의 선율을 중심으로 피아노, 바이올린 등 다양한 악기의 협주가 돋보이는 연주곡 앨범. 여러 악기가 하나의 음악으로 어우러지는 조화를 담았다.',en:'An instrumental album centered on orchestral melodies, featuring piano, violin, and other instruments in concert. It captures the harmony of many instruments becoming one music.'},href:'music.html?album=2X3dnf8vnhCSQ0c7H9oZht',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'To Rise',sub:'Music Archive',spotifyAlbumId:'2OSKuof7gooLElmFYvoygK',desc:{ko:'다시 일어나 앞으로 나아가는 순간을 담은 instrumental 작품. 멈춰 있던 마음을 일으켜 다시 한 걸음 내딛는 순간의 감정을 음악으로 표현했다.',en:'An instrumental work capturing the moment of rising again and moving forward, expressing the feeling of taking one more step after a heart that had been still.'},href:'music.html?album=2OSKuof7gooLElmFYvoygK',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'사랑한다고',sub:'Music Archive',spotifyAlbumId:'2s7tJtoaxDT8KUkJ3OL8DD',desc:{ko:'소중한 사람을 잃은 아픔과 그리움을 담은 노래. 전하지 못했던 마음과 사랑한다는 말을 음악으로 전하는 작품.',en:'A song about the pain and longing of losing someone precious, carrying unspoken feelings and the words “I love you” through music.'},href:'music.html?album=2s7tJtoaxDT8KUkJ3OL8DD',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'2026 난리났어',sub:'Music Archive',spotifyAlbumId:'2AzUPgjWYDodUqFTNjPU1l',desc:{ko:'2026년의 힘찬 시작을 알리는 기대와 설렘이 공존하는 앨범. 새로운 한 해를 향한 긍정적인 에너지와 앞으로 펼쳐질 이야기에 대한 기대를 담았다.',en:'An album filled with anticipation and excitement that announces a powerful start to 2026, carrying positive energy for the new year and anticipation for the stories ahead.'},href:'music.html?album=2AzUPgjWYDodUqFTNjPU1l',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'벽력일섬',sub:'Music Archive',spotifyAlbumId:'25T549XyXnmiZhqGn7p4x4',desc:{ko:'《귀멸의 칼날》의 주(柱)들과 그들이 보여주는 강력한 카리스마에서 영감을 받은 앨범. 날카롭고 빠르게 몰아치는 에너지와 강렬한 존재감을 음악으로 담아냈다.',en:'An album inspired by the Hashira of Demon Slayer and their powerful charisma, capturing sharp, fast-moving energy and a striking presence.'},href:'music.html?album=25T549XyXnmiZhqGn7p4x4',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'영역전개',sub:'Music Archive',spotifyAlbumId:'6rZBdEFTJ5mLwINtn9C8KZ',desc:{ko:'《주술회전》의 캐릭터와 강렬한 기술에서 영감을 받아 제작한 앨범. 압도적인 힘과 긴장감, 폭발적인 에너지를 음악으로 표현한 작품. 료이키텐카이!',en:'An album inspired by the characters and powerful techniques of Jujutsu Kaisen, expressing overwhelming power, tension, and explosive energy through music. Ryoiki Tenkai!'},href:'music.html?album=6rZBdEFTJ5mLwINtn9C8KZ',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'We own the Cup',sub:'Music Archive',spotifyAlbumId:'0sR4hKvhzN4U2GaQKx6Qek',desc:{ko:'경쟁과 승리의 순간이 가진 에너지에서 출발한 작품. 스포츠와 젊음, 뜨거운 여름의 분위기를 음악으로 표현한 앨범.',en:'A work born from the energy of competition and victory, expressing sports, youth, and the atmosphere of a hot summer through music.'},href:'music.html?album=0sR4hKvhzN4U2GaQKx6Qek',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'Run It Back',sub:'Music · 2026',spotifyAlbumId:'1VCjArWmxZJakdawRkEeCi',desc:{ko:'아이돌 음악의 감성을 담은 곡들로 구성된 EP. 한 번 지나간 순간을 다시 되돌리고 싶은 마음에서 출발한 작품.',en:'An EP of songs carrying the sensibility of idol music, born from the desire to turn back a moment that has already passed.'},href:'music.html?album=1VCjArWmxZJakdawRkEeCi',action:{ko:'음악 듣기',en:'Listen'}},
    {type:'MUSIC',icon:'♫',title:'Spotify Release',sub:'Music Archive',spotifyAlbumId:'1K2UDyLeDFF7Ti5KzMknWN',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html?album=1K2UDyLeDFF7Ti5KzMknWN',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'Spotify Release',sub:'Music Archive',spotifyAlbumId:'7F4P40iGbLcUceu1mTNdCF',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html?album=7F4P40iGbLcUceu1mTNdCF',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'Miracle Shot OST',sub:'Miracle Shot · Original Soundtrack',desc:{ko:'Miracle Shot의 세계와 이야기를 음악으로 확장한 오리지널 사운드트랙입니다.',en:'The original soundtrack expanding the world and story of Miracle Shot.'},image:'/images/og_share.png',href:'miracleshot.html',action:{ko:'OST 보기',en:'View OST'}},
    {type:'MUSIC',icon:'♫',title:'SISTER SQUAD 2 OST',sub:'SISTER SQUAD 2 · Original Soundtrack',desc:{ko:'SISTER SQUAD 2의 세계와 이야기를 음악으로 확장한 오리지널 사운드트랙입니다.',en:'The original soundtrack expanding the world and story of SISTER SQUAD 2.'},image:'/images/sistersquad2_poster.jpg',href:'sistersquad2.html',action:{ko:'OST 보기',en:'View OST'}},
    {type:'VIDEO',icon:'▶',title:'FURIOUS',sub:'AI Music Video',desc:{ko:'강대국들의 전쟁과 갈등으로 병들어가는 세계의 모습을 바라보며 만든 뮤직비디오입니다. 반복되는 충돌 속에서 수많은 사람들이 목숨을 잃고 삶의 터전과 재산을 잃는 현실을 바라보며 느낀 분노와 안타까움을 음악과 AI 영상으로 표현했습니다.',en:'A music video created while looking at a world becoming wounded by wars and conflicts among powerful nations. It expresses the anger and sorrow felt while witnessing people lose their lives, homes, and livelihoods, combining music with AI-generated visuals.'},image:'https://img.youtube.com/vi/kAkGg2t1Ats/maxresdefault.jpg',href:'movie.html#furious',action:{ko:'영상 보기',en:'Watch Video'}},
    {type:'VIDEO',icon:'▶',title:'사랑한다고 MV',sub:'Music Video',desc:{ko:'소중한 가족, 친구, 연인을 먼저 떠나보낸 사람들이 느끼는 말로 다 표현할 수 없는 슬픔과 그리움을 담아낸 뮤직비디오입니다. 이별 이후에도 마음속에 남아 있는 사랑과 추억을 음악과 영상으로 표현하고자 했습니다.',en:'A music video expressing the indescribable grief and longing felt by those who have lost a beloved family member, friend, or partner. It was created to capture the love and memories that remain in the heart even after farewell.'},image:'/images/og_share.png',href:'movie.html#saranghandago',action:{ko:'영상 보기',en:'Watch Video'}},
    {type:'VIDEO',icon:'▶',title:'SISTER SQUAD Cinematic Trailer',sub:'Official Trailer',desc:{ko:'인기 일본 애니메이션 귀멸의 칼날에 등장하는 캐릭터들이 실제 영화나 드라마의 촬영 현장에 존재한다면 어떤 모습일지를 상상해 AI 영상으로 만들어본 작품입니다. 애니메이션 캐릭터와 현실적인 촬영 공간을 결합해 애니메이션과 실사의 경계를 넘나드는 장면을 표현했습니다.',en:'An AI video imagining what the characters from the popular Japanese anime Demon Slayer might look like on a real film or drama set. It combines familiar animated characters with realistic production environments to explore the boundary between animation and live action.'},image:'/images/og_share.png',href:'movie.html#demon-slayer',action:{ko:'영상 보기',en:'Watch Video'}},
    {type:'WORSHIP',icon:'♩',title:'나의 찬양 Vol.1',sub:'The First Confession',desc:{ko:'영혼 깊은 곳에서 올려드리는 고백과 찬양을 담은 첫 번째 워십 앨범입니다.',en:'The first worship album, a record of confession and praise.'},image:'/images/My hymn1.jpg',href:'worship.html#vol1',action:{ko:'작품 보기',en:'View Work'}},
    {type:'WORSHIP',icon:'♩',title:'나의 찬양 Vol.2',sub:'2nd Confession',desc:{ko:'첫 번째 고백에 이어 이어지는 두 번째 찬양의 기록입니다.',en:'The second record of worship and confession.'},image:'/images/My hymn2.png',href:'worship.html#vol2',action:{ko:'작품 보기',en:'View Work'}},
    {type:'WORSHIP',icon:'♩',title:'나의 찬양 Vol.3',sub:'3rd Confession',desc:{ko:'연약하고 부족한 나의 진솔하고 담백한 고백',en:'A sincere and simple confession from one who is weak and lacking.'},image:'/images/My hymn3.jpg',href:'worship.html#vol3',action:{ko:'작품 보기',en:'View Work'}},
    {type:'WORSHIP',icon:'♩',title:'Shout',sub:'Worship · Praise',desc:{ko:'주님을 향한 외침과 찬양을 담은 Worship 작품입니다.',en:'A worship work of praise and a heartfelt shout toward God.'},image:'/images/shout.png',href:'worship_eng.html',action:{ko:'English Worship 보기',en:'View English Worship'}}
  ];

  function getTodayIndex() {
    const d = new Date();
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
    return Math.abs(hash) % PICKS.length;
  }

  function renderPick(lang) {
    const pick = PICKS[getTodayIndex()];
    const root = document.getElementById('chris-pick');
    if (!root) return;
    root.innerHTML = `
      <article class="clp-pick-card">
        <div class="clp-pick-media">
          ${pick.image ? `<img src="${pick.image}" alt="${pick.title}" loading="lazy">` : ''}
        </div>
        <div class="clp-pick-content">
          <div class="clp-pick-meta">${pick.type} · ${pick.sub}</div>
          <h3 class="clp-pick-title">${pick.title}</h3>
          <p class="clp-pick-desc">${pick.desc[lang]}</p>
          <a class="clp-pick-action" href="${pick.href}">${pick.action[lang]}</a>
        </div>
      </article>`;
  }

  window.renderChrisPick = renderPick;
  const lang = localStorage.getItem('siteLanguage') || 'ko';
  renderPick(lang);
})();
