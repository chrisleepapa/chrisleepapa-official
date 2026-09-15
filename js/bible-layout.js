(() => {
  'use strict';

  const HERO_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Psalm_118.jpg/2560px-Psalm_118.jpg';

  function applyBibleLayout() {
    const story = document.getElementById('bible-creator-story');
    if (!story || document.getElementById('bible-page-hero')) return;

    const hero = document.createElement('section');
    hero.id = 'bible-page-hero';
    hero.setAttribute('aria-labelledby', 'bible-page-hero-title');
    hero.style.cssText = [
      'position:relative',
      'width:100%',
      'min-height:clamp(260px,32vw,430px)',
      'margin:0 0 52px',
      'overflow:hidden',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'background:#030305'
    ].join(';');

    hero.innerHTML = `
      <div aria-hidden="true" style="position:absolute;inset:0;background-image:linear-gradient(90deg,rgba(3,3,5,.92) 0%,rgba(3,3,5,.58) 42%,rgba(3,3,5,.72) 100%),linear-gradient(180deg,rgba(3,3,5,.15),rgba(3,3,5,.86)),url('${HERO_IMAGE}');background-size:cover;background-position:center 58%;filter:saturate(.72) contrast(1.05);transform:scale(1.02)"></div>
      <div aria-hidden="true" style="position:absolute;inset:0;border-bottom:1px solid rgba(201,168,76,.25);box-shadow:inset 0 0 120px rgba(0,0,0,.55)"></div>
      <div style="position:relative;z-index:1;width:min(1080px,calc(100% - 40px));padding:56px 20px;text-align:center">
        <div style="font-family:Cinzel,serif;color:#c9a84c;font-size:.76rem;letter-spacing:4px;margin-bottom:14px">CHRIS LEE.PAPA · FAITH ARCHIVE</div>
        <h1 id="bible-page-hero-title" style="font-family:Cinzel,serif;color:#f2ead8;font-size:clamp(1.8rem,5vw,3.6rem);letter-spacing:3px;line-height:1.15;margin:0 0 15px;text-shadow:0 3px 24px rgba(0,0,0,.8)">BIBLE IN MY HAND</h1>
        <p style="max-width:620px;margin:0 auto;color:#ddd5c5;font-family:'Noto Serif KR',serif;font-size:clamp(.9rem,1.6vw,1.05rem);line-height:1.9;text-shadow:0 2px 12px rgba(0,0,0,.85)">말씀을 읽고, 마음에 남기고, 다시 돌아오기 위해 만든 나만의 성경 읽기 공간</p>
      </div>
    `;

    const bibleContainer = document.querySelector('.bible-container');
    if (bibleContainer) {
      bibleContainer.parentNode.insertBefore(hero, bibleContainer);
      bibleContainer.parentNode.insertBefore(story, bibleContainer);
    } else {
      story.parentNode.insertBefore(hero, story);
    }

    story.style.marginTop = '0';
    story.style.marginBottom = '64px';
  }

  function init() {
    applyBibleLayout();
    if (!document.getElementById('bible-page-hero')) {
      setTimeout(applyBibleLayout, 500);
      setTimeout(applyBibleLayout, 1500);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
