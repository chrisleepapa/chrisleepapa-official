(() => {
  'use strict';

  function mountHero() {
    if (document.getElementById('english-worship-page-hero')) return true;
    const header = document.querySelector('.page-header');
    if (!header) return false;

    const hero = document.createElement('section');
    hero.id = 'english-worship-page-hero';
    hero.setAttribute('aria-labelledby', 'english-worship-page-hero-title');
    hero.innerHTML = `
      <img class="english-worship-page-hero-image" src="images/shout.png" alt="SHOUT English Worship album cover">
      <div class="english-worship-page-hero-overlay"></div>
      <div class="english-worship-page-hero-content">
        <div class="english-worship-page-hero-kicker">CHRIS LEE.PAPA · ENGLISH WORSHIP ARCHIVE</div>
        <h1 id="english-worship-page-hero-title">ENGLISH WORSHIP</h1>
        <p>Praise beyond language · Worship without borders</p>
      </div>`;
    header.replaceWith(hero);

    const style = document.createElement('style');
    style.id = 'english-worship-page-hero-style';
    style.textContent = `
      #english-worship-page-hero{position:relative;min-height:clamp(300px,38vw,500px);display:flex;align-items:center;justify-content:center;overflow:hidden;isolation:isolate;text-align:center;background:#050507}
      .english-worship-page-hero-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center center;z-index:-2}
      .english-worship-page-hero-overlay{position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(0,0,0,.38),rgba(0,0,0,.56) 48%,rgba(3,3,5,.94)),radial-gradient(circle at center,rgba(201,168,76,.10),transparent 58%)}
      .english-worship-page-hero-content{position:relative;z-index:2;padding:70px 20px 58px}
      .english-worship-page-hero-kicker{margin-bottom:14px;color:#c9a84c;font:700 .68rem/1.5 Cinzel,serif;letter-spacing:.28em}
      #english-worship-page-hero h1{margin:0;color:#e8d08a;font:700 clamp(2.6rem,8vw,5.8rem)/1.05 Cinzel,serif;letter-spacing:.12em;text-shadow:0 5px 35px rgba(0,0,0,.75),0 0 32px rgba(201,168,76,.14)}
      #english-worship-page-hero p{margin:18px 0 0;color:#e0d9c9;font-size:clamp(.85rem,1.7vw,1.05rem);letter-spacing:.08em}
      @media(max-width:760px){#english-worship-page-hero{min-height:330px}.english-worship-page-hero-content{padding:64px 16px 48px}.english-worship-page-hero-kicker{letter-spacing:.14em;font-size:.55rem}#english-worship-page-hero p{letter-spacing:.02em}}
    `;
    document.head.appendChild(style);
    return true;
  }

  function removeOldStory() {
    document.querySelectorAll('main.container .section-heading h2').forEach((heading) => {
      const text = (heading.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (text === 'the story of shout') {
        const section = heading.closest('section');
        if (section) section.remove();
      }
    });
  }

  function mountStory() {
    if (document.getElementById('english-worship-confession')) return true;
    const intro = document.querySelector('main.container .intro');
    if (!intro) return false;

    removeOldStory();

    const section = document.createElement('section');
    section.id = 'english-worship-confession';
    section.className = 'english-worship-confession';
    section.setAttribute('aria-labelledby', 'english-worship-confession-title');
    section.innerHTML = `
      <div class="english-worship-confession-inner">
        <div class="english-worship-confession-kicker">THE MAKING OF ENGLISH WORSHIP</div>
        <div class="english-worship-confession-line" aria-hidden="true"></div>
        <h2 id="english-worship-confession-title">Why I Made Worship</h2>
        <article class="english-worship-story">
          <h3>That day, I died<br><span>and was born again.</span></h3>
          <p class="english-worship-story-lead">On the day when it felt as though everything in my world had fallen apart,<br>the person I had been before was no longer the same.</p>
          <p class="english-worship-story-lead english-worship-story-centered">Through the blood of Jesus Christ,<br>I was given new life as a child of God,<br>and began to walk a new path.</p>
          <p class="english-worship-story-emphasis"><strong>WORSHIP began right there.</strong></p>
          <h4>1. Why I Started Making Worship Music</h4>
          <p>I did not begin with a plan to make an album. As I learned to live this new life, I kept asking how I could bring my gratitude, repentance and prayers before God.</p>
          <p>Music became the most natural language for that confession. So I began creating one song at a time — not first as music for an audience, but as worship offered to God.</p>
          <h4>2. One Confession Became an Album</h4>
          <p>After one song came another. There were songs I wanted to sing while looking back on the past, prayers for the life I was living, and worship songs for the road still ahead.</p>
          <p>Those individual songs gradually became a story. <strong>SHOUT</strong> is more than a collection of English songs. It is a record of praise, faith and confession that continued after I encountered God and began again.</p>
          <div class="english-worship-story-cards">
            <div><strong>SHOUT</strong><span>An English voice of praise</span></div>
            <div><strong>15 TRACKS</strong><span>Confession, gratitude and faith</span></div>
            <div><strong>WORSHIP WITHOUT BORDERS</strong><span>Praise beyond one language</span></div>
          </div>
          <h4>3. This Album Is Part of My Story</h4>
          <p>These songs are not the story of someone who has perfect faith. They are the story of someone who has struggled, fallen, returned to God and learned to trust Him again.</p>
          <p>Some songs are gratitude. Some are repentance. Some are prayer. But beneath them all is one confession: <strong>I did not hold on to God first. God held on to me first.</strong></p>
          <h4>4. Why English Worship</h4>
          <p>SHOUT is my English-language worship collection, created from the same personal faith journey that shaped my Korean worship albums. English became another doorway through which these prayers and songs could be shared.</p>
          <p>I hope someone listening in another language can still recognize the same heart — a person who was given new life, who is still learning, and who wants to turn that life back toward God in worship.</p>
          <blockquote>“My worship is not a story about what I give to God,<br class="desktop-break"> but a confession of what God gave to me first.”</blockquote>
        </article>
      </div>`;

    const style = document.createElement('style');
    style.id = 'english-worship-confession-style';
    style.textContent = `
      .english-worship-confession{position:relative;margin:0 0 76px;padding:76px 28px 82px;overflow:hidden;border-top:1px solid rgba(201,168,76,.18);border-bottom:1px solid rgba(201,168,76,.18);background:radial-gradient(circle at 50% 0%,rgba(201,168,76,.11),transparent 48%),linear-gradient(180deg,rgba(255,255,255,.018),rgba(255,255,255,0));text-align:center}
      .english-worship-confession::before{content:'✦';position:absolute;top:22px;left:50%;transform:translateX(-50%);color:rgba(201,168,76,.42);font-size:12px}
      .english-worship-confession-inner{max-width:900px;margin:0 auto}.english-worship-confession-kicker{color:#c9a84c;font:700 .78rem/1.5 Cinzel,serif;letter-spacing:.22em;margin-bottom:14px}.english-worship-confession-line{width:56px;height:1px;margin:0 auto 24px;background:linear-gradient(90deg,transparent,#c9a84c,transparent)}
      .english-worship-confession h2{margin:0 0 42px;color:#eee8d8;font-family:Cinzel,'Noto Serif',serif;font-size:clamp(1.45rem,3.4vw,2.15rem);font-weight:500;letter-spacing:1.5px;line-height:1.35}
      .english-worship-story{color:#d0ccc4;font-family:Pretendard,'Noto Serif',sans-serif;line-height:2;font-size:.98rem;text-align:left}.english-worship-story h3{margin:0 0 30px;color:#f5f1e8;font-family:'Noto Serif',serif;font-size:clamp(2rem,5vw,3.7rem);font-weight:500;line-height:1.3;letter-spacing:-.025em;text-align:center;text-shadow:0 0 34px rgba(201,168,76,.12)}.english-worship-story h3 span{color:#d9b95b}.english-worship-story p{margin:0 0 22px}.english-worship-story-lead{color:#e1e0dc;font-family:'Noto Serif',serif;font-size:1.05rem;line-height:2;text-align:center;margin-bottom:22px!important}.english-worship-story-centered{margin-bottom:28px!important}.english-worship-story-emphasis{margin:34px 0 42px!important;color:#eee5ca;text-align:center;font-family:'Noto Serif',serif;font-size:1.08rem}.english-worship-story h4{margin:42px 0 12px;color:#e8d08a;font-family:'Cormorant Garamond','Noto Serif',serif;font-size:1.35rem;line-height:1.45;font-weight:600}.english-worship-story strong{color:#e8d08a;font-weight:600}
      .english-worship-story-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:28px 0 36px}.english-worship-story-cards div{padding:22px 18px;border:1px solid rgba(201,168,76,.16);background:rgba(255,255,255,.025);text-align:center}.english-worship-story-cards strong{display:block;min-height:2.4em;margin-bottom:8px;font-family:Cinzel,'Noto Serif',serif;font-size:.78rem;letter-spacing:.04em}.english-worship-story-cards span{color:#aaaeb7;font-size:.88rem;line-height:1.7}
      .english-worship-story blockquote{position:relative;margin:46px 0 0;padding:30px 20px 0;border:0;color:#d9b95b;font-family:'Noto Serif',serif;font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.9;font-weight:600;letter-spacing:-.015em;text-align:center;text-shadow:0 0 28px rgba(201,168,76,.13)}.english-worship-story blockquote::before{content:'';position:absolute;top:0;left:50%;width:90px;height:1px;transform:translateX(-50%);background:linear-gradient(90deg,transparent,rgba(201,168,76,.8),transparent)}
      @media(max-width:760px){.english-worship-confession{margin-bottom:56px;padding:60px 18px 66px}.english-worship-confession h2{margin-bottom:34px}.english-worship-story{font-size:.95rem}.english-worship-story h4{margin-top:36px}.english-worship-story-cards{grid-template-columns:1fr;gap:10px}.english-worship-story-cards div{padding:18px 16px}.english-worship-story-cards strong{min-height:0}.desktop-break{display:none}}
    `;
    document.head.appendChild(style);
    intro.replaceWith(section);
    return true;
  }

  function boot() {
    const hero = mountHero();
    const story = mountStory();
    if (hero && story) return;
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      const h = mountHero();
      const s = mountStory();
      if ((h && s) || tries >= 50) clearInterval(timer);
    }, 200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
