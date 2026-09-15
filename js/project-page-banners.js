(() => {
  'use strict';
  const page = (location.pathname || '').replace(/\/$/, '').toLowerCase();
  const configs = {
    '/sistersquad-hub': {image:'/images/banner_sister.jpg',kicker:'ORIGINAL IP · CHRIS LEE.PAPA',title:'SISTER SQUAD',subtitle:'A story about family, sisterhood, courage, and hope.',selector:'.sq-hero'},
    '/miracleshot': {image:'/images/miracleshot1.png',kicker:'ORIGINAL STORY · CHRIS LEE.PAPA',title:'MIRACLE SHOT',subtitle:'A story about finding your own light.',selector:'.page-header'},
    '/music': {image:'',kicker:'MUSIC · CHRIS LEE.PAPA',title:'MUSIC ARCHIVE',subtitle:'AI music, original songs, albums, and creative experiments.',selector:'.page-header'},
    '/movie': {image:'https://i.ytimg.com/vi/kAkGg2t1Ats/hqdefault.jpg',kicker:'MOVIE · CHRIS LEE.PAPA',title:'MOVIE ARCHIVE',subtitle:'Music, stories, and visual worlds created with generative AI.',selector:'.page-header'},
    '/gameinfo': {image:'/images/goal.png',kicker:'PLAY · CHRIS LEE.PAPA',title:'GAME ARCHIVE',subtitle:'Playable stories, characters, and interactive worlds.',selector:'.page-header'}
  };
  const config = configs[page];
  if (!config) return;

  function addStyle(){
    if(document.getElementById('project-page-banner-style')) return;
    const style=document.createElement('style'); style.id='project-page-banner-style';
    style.textContent=`
      .project-page-image-hero{position:relative;width:100%;min-height:clamp(330px,42vw,520px);display:flex;align-items:center;justify-content:center;overflow:hidden;isolation:isolate;text-align:center;background:#030305}
      .project-page-image-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:-2}
      .project-page-image-hero::after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(3,3,5,.28),rgba(3,3,5,.48) 45%,rgba(3,3,5,.94)),radial-gradient(circle at center,rgba(201,168,76,.12),transparent 58%)}
      .project-page-image-hero-content{position:relative;z-index:2;padding:76px 20px 62px}
      .project-page-image-hero-kicker{margin-bottom:14px;color:#e8d08a;font:700 .68rem/1.5 Cinzel,serif;letter-spacing:.28em}
      .project-page-image-hero h1{margin:0;color:#f0ece4;font:700 clamp(2.7rem,8vw,6rem)/1.05 Cinzel,serif;letter-spacing:.12em;text-shadow:0 5px 35px rgba(0,0,0,.8),0 0 32px rgba(201,168,76,.14)}
      .project-page-image-hero p{margin:18px 0 0;color:#ddd8cc;font:italic clamp(1rem,2vw,1.25rem)/1.5 'Cormorant Garamond',serif;letter-spacing:.08em}
      .sq-project-image-hero{margin:0!important;border-radius:0!important}
      @media(max-width:760px){.project-page-image-hero{min-height:340px}.project-page-image-hero-content{padding:68px 16px 52px}.project-page-image-hero-kicker{font-size:.55rem;letter-spacing:.15em}.project-page-image-hero h1{letter-spacing:.07em}.project-page-image-hero p{letter-spacing:.02em}}
    `;
    document.head.appendChild(style);
  }

  async function musicCover(){
    const spotifyId='5qWOsYCJgw1bmXqvko7Thv';
    try{
      const response=await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/album/${spotifyId}`,{cache:'force-cache'});
      if(!response.ok) throw new Error('Spotify oEmbed failed');
      const data=await response.json();
      return data.thumbnail_url || '';
    }catch(error){console.warn('Music banner cover unavailable:',error);return '';}
  }

  function makeHero(oldElement,imageOverride){
    if(document.getElementById('project-page-image-hero')) return true;
    if(!oldElement) return false;
    const image=imageOverride || config.image;
    const hero=document.createElement('section'); hero.id='project-page-image-hero';
    hero.className='project-page-image-hero'+(page==='/sistersquad-hub'?' sq-project-image-hero':'');
    hero.setAttribute('aria-labelledby','project-page-image-hero-title');
    hero.innerHTML=`<img src="${image}" alt="${config.title}" fetchpriority="high"><div class="project-page-image-hero-content"><div class="project-page-image-hero-kicker">${config.kicker}</div><h1 id="project-page-image-hero-title">${config.title}</h1><p>${config.subtitle}</p></div>`;
    oldElement.replaceWith(hero); return true;
  }

  async function boot(){
    addStyle();
    if(page==='/music'){
      const image=await musicCover();
      if(makeHero(document.querySelector(config.selector),image)) return;
    }else if(makeHero(document.querySelector(config.selector))) return;
    let tries=0;
    const timer=setInterval(()=>{tries++;const done=makeHero(document.querySelector(config.selector));if(done||tries>=50)clearInterval(timer);},200);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
