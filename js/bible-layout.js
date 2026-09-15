(() => {
  'use strict';

  const HERO_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Psalm_118.jpg/2560px-Psalm_118.jpg';
  const FALLBACK_IMAGE = 'https://www.publicdomainpictures.net/pictures/60000/velka/bible-open-to-psalm-118-1378400894gXP.jpg';

  function removeDuplicateIntroBlocks() {
    const creationContext = document.getElementById('bible-creation-context');
    if (creationContext) creationContext.remove();

    document.querySelectorAll('section').forEach(section => {
      if (section.id === 'bible-page-hero' || section.id === 'bible-creator-story') return;
      const text = (section.textContent || '').replace(/\s+/g, ' ').trim();
      if (text.includes('BIBLE IN MY HAND') && text.includes('주요 기능') && text.includes('만든 이유')) {
        section.remove();
      }
    });
  }

  function applyBibleLayout() {
    removeDuplicateIntroBlocks();

    const story = document.getElementById('bible-creator-story');
    if (!story || document.getElementById('bible-page-hero')) return;

    const hero = document.createElement('section');
    hero.id = 'bible-page-hero';
    hero.setAttribute('aria-label', 'Bible in my hand image');
    hero.style.cssText = [
      'position:relative',
      'width:100%',
      'height:clamp(240px,30vw,410px)',
      'margin:0 0 52px',
      'overflow:hidden',
      'background:#030305',
      'border-top:1px solid rgba(201,168,76,.12)',
      'border-bottom:1px solid rgba(201,168,76,.25)',
      'box-shadow:0 18px 60px rgba(0,0,0,.45)'
    ].join(';');

    hero.innerHTML = `
      <img src="${HERO_IMAGE}" alt="Bible opened to Psalm 118" loading="eager" decoding="async" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'" style="position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;object-position:center 58%;filter:saturate(.72) contrast(1.05);transform:scale(1.01)">
      <div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,3,5,.72),rgba(3,3,5,.16) 48%,rgba(3,3,5,.72)),linear-gradient(180deg,rgba(3,3,5,.08),rgba(3,3,5,.78))"></div>
      <div style="position:absolute;left:0;right:0;bottom:0;padding:22px 24px;text-align:center;z-index:1">
        <div style="font-family:Cinzel,serif;color:#e8d08a;font-size:.72rem;letter-spacing:3px;text-shadow:0 2px 12px #000">FAITH ARCHIVE</div>
        <div style="color:#ddd5c5;font-family:'Noto Serif KR',serif;font-size:.9rem;line-height:1.7;text-shadow:0 2px 12px #000">말씀을 읽고, 마음에 남기고, 다시 돌아오기 위해</div>
      </div>
    `;

    const pageHeader = document.querySelector('.page-header');
    const bibleContainer = document.querySelector('.bible-container');
    if (pageHeader && pageHeader.parentNode) {
      pageHeader.parentNode.insertBefore(hero, pageHeader.nextSibling);
    } else if (bibleContainer && bibleContainer.parentNode) {
      bibleContainer.parentNode.insertBefore(hero, bibleContainer);
    } else {
      document.body.insertBefore(hero, document.body.firstChild);
    }

    if (bibleContainer && bibleContainer.parentNode) {
      bibleContainer.parentNode.insertBefore(story, bibleContainer);
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