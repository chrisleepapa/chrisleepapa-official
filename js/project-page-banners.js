(() => {
  'use strict';

  const page = (location.pathname || '').replace(/\/$/, '').toLowerCase();

  function addStyle() {
    if (document.getElementById('project-page-banner-style')) return;
    const style = document.createElement('style');
    style.id = 'project-page-banner-style';
    style.textContent = `
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

  function makeHero(image, kicker, title, subtitle, oldElement) {
    if (document.getElementById('project-page-image-hero')) return true;
    if (!oldElement) return false;
    const hero = document.createElement('section');
    hero.id = 'project-page-image-hero';
    hero.className = 'project-page-image-hero' + (page === '/sistersquad-hub' ? ' sq-project-image-hero' : '');
    hero.setAttribute('aria-labelledby', 'project-page-image-hero-title');
    hero.innerHTML = `<img src="${image}" alt="${title}" fetchpriority="high"><div class="project-page-image-hero-content"><div class="project-page-image-hero-kicker">${kicker}</div><h1 id="project-page-image-hero-title">${title}</h1><p>${subtitle}</p></div>`;
    oldElement.replaceWith(hero);
    return true;
  }

  function mountSisterSquad() {
    const oldHero = document.querySelector('.sq-hero');
    if (!oldHero) return false;
    return makeHero('/images/banner_sister.jpg', 'ORIGINAL IP · CHRIS LEE.PAPA', 'SISTER SQUAD', 'A story about family, sisterhood, courage, and hope.', oldHero);
  }

  function mountMiracleShot() {
    const oldHero = document.querySelector('.page-header');
    if (!oldHero) return false;
    return makeHero('/images/miracleshot1.png', 'ORIGINAL STORY · CHRIS LEE.PAPA', 'MIRACLE SHOT', 'A story about finding your own light.', oldHero);
  }

  function boot() {
    if (page !== '/sistersquad-hub' && page !== '/miracleshot') return;
    addStyle();
    const mounted = page === '/sistersquad-hub' ? mountSisterSquad() : mountMiracleShot();
    if (mounted) return;
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      const done = page === '/sistersquad-hub' ? mountSisterSquad() : mountMiracleShot();
      if (done || tries >= 50) clearInterval(timer);
    }, 200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
