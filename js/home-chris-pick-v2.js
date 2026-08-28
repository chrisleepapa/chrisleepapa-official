/* Home: Chris's Pick — deterministic daily featured work */
'use strict';
(() => {
  const PICKS = [
    {type:'BOOK',icon:'✦',title:'SISTER SQUAD 1',sub:'The Book of Whispers · Book 1',desc:{ko:'율과 정, 두 자매가 신비로운 마법 세계 페어리 타운에서 펼치는 첫 번째 판타지 모험입니다. 소설과 컬러링북, OST로 이어지는 SISTER SQUAD의 시작을 만나보세요.',en:'The first fantasy adventure of two sisters, Yul and Jung, in the mysterious Fairy Town.'},image:'/images/sistersquad1.png?v=20260828',href:'sistersquad.html',action:{ko:'1권 보러가기',en:'Read Book 1'}},
    {type:'BOOK',icon:'✦',title:'SISTER SQUAD 2',sub:'저주받은 요정마을 · Book 2',desc:{ko:'사춘기 소녀가 된 율과 독립심 강한 정, 그리고 아빠 크리스가 잿빛으로 변한 요정마을 루미나를 구하기 위해 떠나는 두 번째 모험입니다.',en:'The second adventure of Yul, Jung, and their father Chris as they set out to save Lumina.'},image:'/images/sistersquad2_poster.jpg',href:'sistersquad2.html',action:{ko:'2권 보러가기',en:'Read Book 2'}},
    {type:'BOOK',icon:'✦',title:'Miracle Shot',sub:'Story · Book',desc:{ko:'풋살을 통해 서로 다른 아이들이 자신의 재능과 빛을 발견해가는 Miracle Shot의 이야기입니다.',en:'The Miracle Shot story of children discovering their gifts through futsal.'},image:'/images/og_share.png',href:'miracleshot.html',action:{ko:'작품 보기',en:'View Work'}},
    {type:'MUSIC',icon:'♫',title:'When the City Stood Still',sub:'Music Archive',spotifyAlbumId:'5qWOsYCJgw1bmXqvko7Thv',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'To The Space',sub:'Music Archive',spotifyAlbumId:'1JyYgZ8VTbh5mASNezCTcJ',desc:{ko:'스페이스X 상장을 기념하고 새로운 우주로의 도약을 기대하는 마음에서 만든 노래',en:'A song created to commemorate SpaceX’s IPO and look forward to a leap into a new universe.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'Ensemble',sub:'Music Archive',spotifyAlbumId:'2X3dnf8vnhCSQ0c7H9oZht',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'To Rise',sub:'Music Archive',spotifyAlbumId:'2OSKuof7gooLElmFYvoygK',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'사랑한다고',sub:'Music Archive',spotifyAlbumId:'2s7tJtoaxDT8KUkJ3OL8DD',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'2026 난리났어',sub:'Music Archive',spotifyAlbumId:'2AzUPgjWYDodUqFTNjPU1l',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'벽력일섬',sub:'Music Archive',spotifyAlbumId:'25T549XyXnmiZhqGn7p4x4',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'영역전개',sub:'Music Archive',spotifyAlbumId:'6rZBdEFTJ5mLwINtn9C8KZ',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'We own the Cup',sub:'Music Archive',spotifyAlbumId:'0sR4hKvhzN4U2GaQKx6Qek',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'Run It Back',sub:'Music · 2026',spotifyAlbumId:'1VCjArWmxZJakdawRkEeCi',desc:{ko:'Chris LEE.PAPA의 최신 음악 작품 Run It Back입니다. 2026년 7월 공개된 작품입니다.',en:'Run It Back is a 2026 Chris LEE.PAPA music release.'},href:'music.html',action:{ko:'음악 듣기',en:'Listen'}},
    {type:'MUSIC',icon:'♫',title:'Spotify Release',sub:'Music Archive',spotifyAlbumId:'1K2UDyLeDFF7Ti5KzMknWN',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'Spotify Release',sub:'Music Archive',spotifyAlbumId:'7F4P40iGbLcUceu1mTNdCF',desc:{ko:'Chris LEE.PAPA MUSIC ARCHIVE에 수록된 창작 음악 작품입니다.',en:'A creative music work from the Chris LEE.PAPA MUSIC ARCHIVE.'},href:'music.html',action:{ko:'음악 보기',en:'View Music'}},
    {type:'MUSIC',icon:'♫',title:'Miracle Shot OST',sub:'Miracle Shot · Original Soundtrack',desc:{ko:'Miracle Shot의 세계와 이야기를 음악으로 확장한 오리지널 사운드트랙입니다.',en:'The original soundtrack expanding the world and story of Miracle Shot.'},image:'/images/og_share.png',href:'miracleshot.html',action:{ko:'OST 보기',en:'View OST'}},
    {type:'MUSIC',icon:'♫',title:'SISTER SQUAD 2 OST',sub:'SISTER SQUAD 2 · Original Soundtrack',desc:{ko:'SISTER SQUAD 2의 세계와 이야기를 음악으로 확장한 오리지널 사운드트랙입니다.',en:'The original soundtrack expanding the world and story of SISTER SQUAD 2.'},image:'/images/sistersquad2_poster.jpg',href:'sistersquad2.html',action:{ko:'OST 보기',en:'View OST'}},
    {type:'VIDEO',icon:'▶',title:'FURIOUS',sub:'AI Music Video',desc:{ko:'생성형 AI 비주얼과 음악으로 제작한 Chris LEE.PAPA의 오리지널 영상 작품입니다.',en:'An original Chris LEE.PAPA video work created with generative AI visuals and music.'},image:'/images/og_share.png',href:'movie.html',action:{ko:'영상 보기',en:'Watch Video'}},
    {type:'VIDEO',icon:'▶',title:'사랑한다고 MV',sub:'Music Video',desc:{ko:'창작 음악 사랑한다고를 영상으로 확장한 오리지널 뮤직비디오입니다.',en:'An original music video expanding 사랑한다고 into moving images.'},image:'/images/og_share.png',href:'movie.html',action:{ko:'영상 보기',en:'Watch Video'}},
    {type:'VIDEO',icon:'▶',title:'SISTER SQUAD Cinematic Trailer',sub:'Official Trailer',desc:{ko:'두 자매 율과 정이의 마법 세계 모험을 소개하는 공식 시네마틱 트레일러입니다.',en:'The official cinematic trailer introducing Yul and Jung’s adventure.'},image:'/images/og_share.png',href:'sistersquad.html',action:{ko:'트레일러 보기',en:'Watch Trailer'}},
    {type:'WORSHIP',icon:'♩',title:'나의 찬양 Vol.1',sub:'The First Confession',desc:{ko:'영혼 깊은 곳에서 올려드리는 고백과 찬양을 담은 첫 번째 워십 앨범입니다.',en:'The first worship album, a record of confession and praise.'},image:'/images/My hymn1.jpg',href:'worship.html',action:{ko:'워십 보기',en:'View Worship'}},
    {type:'WORSHIP',icon:'♩',title:'나의 찬양 Vol.2',sub:'2nd Confession',desc:{ko:'첫 번째 고백에 이어 이어지는 두 번째 찬양의 기록입니다.',en:'The second record of worship and confession.'},image:'/images/My hymn2.jpg',href:'worship.html',action:{ko:'워십 보기',en:'View Worship'}},
    {type:'WORSHIP',icon:'♩',title:'나의 찬양 Vol.3',sub:'3rd Confession',desc:{ko:'연약하고 부족한 나의 진솔하고 담백한 고백',en:'A sincere and simple confession from one who is weak and lacking.'},image:'/images/My hymn3.jpg',href:'worship.html',action:{ko:'워십 보기',en:'View Worship'}},
    {type:'WORSHIP',icon:'♩',title:'승리하리라',sub:'Worship · CCM',desc:{ko:'다시 일어설 용기와 믿음을 노래하는 찬양 작품입니다.',en:'A worship song about courage, faith, and rising again.'},image:'/images/My hymn3.jpg',href:'worship.html',action:{ko:'워십 보기',en:'View Worship'}}
  ];

  const style=document.createElement('style');
  style.textContent=`#chris-pick{width:100%;box-sizing:border-box;padding:105px 20px 80px;background:radial-gradient(circle at 50% 35%,rgba(201,168,76,.08),transparent 38%),linear-gradient(180deg,#030305,#08080d);overflow:hidden}#chris-pick .clp-pick-content{width:100%;max-width:880px;margin:0 auto;box-sizing:border-box;text-align:center}.clp-pick-heading{margin:0;color:#f8f3e8;font:600 clamp(2.4rem,7vw,4.8rem)/1.05 'Cormorant Garamond',serif}.clp-pick-date{margin:12px 0 30px;color:rgba(240,236,228,.42);font:.72rem Pretendard,sans-serif;letter-spacing:.2em}.clp-pick-card{display:grid;grid-template-columns:300px minmax(0,1fr);width:100%;max-width:780px;margin:0 auto;overflow:hidden;border:1px solid rgba(201,168,76,.34);border-radius:24px;background:rgba(8,8,13,.88);box-shadow:0 30px 90px rgba(0,0,0,.6);text-align:left;box-sizing:border-box}.clp-pick-art{position:relative;min-height:300px;background:#111;overflow:hidden}.clp-pick-art img{display:block;width:100%;height:100%;object-fit:cover}.clp-pick-mark{position:absolute;right:18px;top:16px;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(3,3,5,.62);border:1px solid rgba(201,168,76,.35);color:#e8d08a}.clp-pick-body{padding:34px;display:flex;flex-direction:column;justify-content:center;min-width:0}.clp-pick-type{color:#c9a84c;font:700 .65rem Cinzel,serif;letter-spacing:.22em;margin-bottom:14px}.clp-pick-title{margin:0;color:#fff;font:600 clamp(2rem,4vw,3rem)/1.1 'Cormorant Garamond',serif;overflow-wrap:break-word;word-break:keep-all}.clp-pick-sub{margin:10px 0 15px;color:#e8d08a;font:.72rem Pretendard,sans-serif}.clp-pick-desc{margin:0;color:rgba(240,236,228,.62);font:.9rem/1.75 Pretendard,sans-serif;word-break:keep-all}.clp-pick-actions{display:flex;gap:9px;margin-top:25px;flex-wrap:wrap}.clp-pick-main{display:inline-flex;align-items:center;justify-content:center;padding:11px 18px;border-radius:22px;min-width:125px;background:#c9a84c;color:#090909;font:700 .76rem Pretendard,sans-serif;text-align:center}.clp-pick-next{margin-top:18px;color:rgba(240,236,228,.34);font:.68rem/1.6 Pretendard,sans-serif}@media(max-width:700px){#chris-pick{padding:95px 15px 65px}.clp-pick-card{grid-template-columns:1fr}.clp-pick-art{min-height:235px;max-height:300px}.clp-pick-body{padding:25px 22px 24px}.clp-pick-heading{font-size:3rem}.clp-pick-actions{flex-direction:column}.clp-pick-main{width:100%;box-sizing:border-box}.clp-pick-desc{font-size:.88rem;line-height:1.8}}`;
  document.head.appendChild(style);

  const coverCache=new Map();
  const storageKey='clp:spotify-cover:';
  async function getSpotifyCover(albumId){
    if(!albumId)return '';
    if(coverCache.has(albumId))return coverCache.get(albumId);
    try{const saved=localStorage.getItem(storageKey+albumId);if(saved){coverCache.set(albumId,saved);return saved;}}catch(e){}
    try{
      const url=`https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/album/${albumId}`)}`;
      const r=await fetch(url,{mode:'cors',cache:'no-store'});
      if(!r.ok)throw new Error('Spotify oEmbed failed');
      const d=await r.json();
      if(d.thumbnail_url){coverCache.set(albumId,d.thumbnail_url);try{localStorage.setItem(storageKey+albumId,d.thumbnail_url);}catch(e){}return d.thumbnail_url;}
    }catch(e){console.warn('Spotify cover unavailable:',albumId,e);}
    return '';
  }

  function getTodayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
  function getDailyPick(){let hash=2166136261;const key=getTodayKey();for(let i=0;i<key.length;i++){hash^=key.charCodeAt(i);hash=Math.imul(hash,16777619);}return PICKS[(hash>>>0)%PICKS.length];}
  async function render(){
    const target=document.getElementById('chris-pick');
    if(!target)return;
    const lang=window.getCurrentLang?window.getCurrentLang():'ko';
    const d=new Date();
    const date=`${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
    const pick=getDailyPick();
    // Spotify album artwork is resolved BEFORE inserting the card, so the real cover
    // is the first image users see rather than a temporary og_share placeholder.
    const image=pick.spotifyAlbumId ? (await getSpotifyCover(pick.spotifyAlbumId) || pick.image || '/images/og_share.png') : (pick.image || '/images/og_share.png');
    target.innerHTML=`<div class="clp-pick-content"><h1 class="clp-pick-heading">Chris's Pick</h1><div class="clp-pick-date">${date} · ${lang==='ko'?'오늘의 선정 작품':'TODAY’S FEATURED WORK'}</div><div class="clp-pick-card"><div class="clp-pick-art"><img src="${image}" alt="${pick.title}" loading="eager" decoding="async"></div><div class="clp-pick-body"><div class="clp-pick-type">${pick.type}</div><h2 class="clp-pick-title">${pick.title}</h2><div class="clp-pick-sub">${pick.sub}</div><p class="clp-pick-desc">${pick.desc[lang]}</p><div class="clp-pick-actions"><a class="clp-pick-main" href="${pick.href}">${pick.action[lang]} →</a></div></div></div><div class="clp-pick-next">${lang==='ko'?'매일 전체 작품 중 하나를 자동으로 선정합니다.':'One work is automatically selected from the full featured collection each day.'}</div></div>`;
  }
  const previous=window.onLangChange;window.onLangChange=function(lang){if(typeof previous==='function')previous(lang);render();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();