(() => {
  'use strict';

  const HERO_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Psalm_118.jpg/2560px-Psalm_118.jpg';
  const FALLBACK_IMAGE = 'https://www.publicdomainpictures.net/pictures/60000/velka/bible-open-to-psalm-118-1378400894gXP.jpg';

  function removeDuplicateIntroBlocks() {
    const creationContext = document.getElementById('bible-creation-context');
    if (creationContext) creationContext.remove();

    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) pageHeader.remove();

    document.querySelectorAll('section').forEach(section => {
      if (section.id === 'bible-page-hero' || section.id === 'bible-creator-story') return;
      const text = (section.textContent || '').replace(/\s+/g, ' ').trim();
      const heading = section.querySelector('h2, h3, h4');
      const headingText = heading ? (heading.textContent || '').replace(/\s+/g, ' ').trim().toUpperCase() : '';
      if (
        headingText.includes('ABOUT THIS APP') ||
        (text.includes('BIBLE IN MY HAND') && text.includes('주요 기능') && text.includes('만든 이유'))
      ) {
        section.remove();
      }
    });
  }

  function applyBibleLayout() {
    removeDuplicateIntroBlocks();

    const story = document.getElementById('bible-creator-story');
    if (!story || document.getElementById('bible-page-hero')) {
      moveAccountBar();
      return;
    }

    const hero = document.createElement('section');
    hero.id = 'bible-page-hero';
    hero.setAttribute('aria-label', 'Bible in my hand banner');
    hero.style.cssText = [
      'position:relative',
      'width:100%',
      'height:clamp(260px,32vw,430px)',
      'margin:0 0 52px',
      'overflow:hidden',
      'background:#030305',
      'border-top:1px solid rgba(201,168,76,.12)',
      'border-bottom:1px solid rgba(201,168,76,.25)',
      'box-shadow:0 18px 60px rgba(0,0,0,.45)'
    ].join(';');

    hero.innerHTML = `
      <img src="${HERO_IMAGE}" alt="Bible opened to Psalm 118" loading="eager" decoding="async" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'" style="position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;object-position:center 58%;filter:saturate(.72) contrast(1.05);transform:scale(1.01)">
      <div aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,3,5,.74),rgba(3,3,5,.20) 50%,rgba(3,3,5,.74)),linear-gradient(180deg,rgba(3,3,5,.05),rgba(3,3,5,.80))"></div>
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;z-index:1">
        <div>
          <div style="font-family:Cinzel,serif;color:#e8d08a;font-size:clamp(1.8rem,5vw,4.2rem);font-weight:600;letter-spacing:clamp(3px,1vw,8px);line-height:1.1;text-shadow:0 3px 22px rgba(0,0,0,.85)">BIBLE IN MY HAND</div>
          <div style="margin-top:16px;color:#f1eadc;font-family:'Noto Serif KR',serif;font-size:clamp(.85rem,1.6vw,1.05rem);line-height:1.8;text-shadow:0 2px 14px #000">말씀을 읽고, 마음에 남기고, 다시 돌아오기 위해 만든 나만의 성경 읽기 공간</div>
        </div>
      </div>
    `;

    const bibleContainer = document.querySelector('.bible-container');
    if (bibleContainer && bibleContainer.parentNode) {
      bibleContainer.parentNode.insertBefore(hero, bibleContainer);
      bibleContainer.parentNode.insertBefore(story, bibleContainer);
    } else {
      document.body.insertBefore(hero, document.body.firstChild);
    }

    moveAccountBar();

    story.style.marginTop = '0';
    story.style.marginBottom = '64px';
  }

  function moveAccountBar() {
    const accountBar = document.getElementById('bible-account-bar');
    const bibleContainer = document.querySelector('.bible-container');
    if (!accountBar || !bibleContainer) return;

    if (accountBar.parentElement !== bibleContainer) {
      bibleContainer.insertBefore(accountBar, bibleContainer.firstChild);
    }
    accountBar.style.cssText = [
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'gap:10px',
      'margin:0 auto 22px',
      'padding:0 4px',
      'flex-wrap:wrap',
      'position:relative',
      'z-index:20'
    ].join(';');
  }

  function installTop5ProgressSync() {
    if (window.__clpTop5ProgressSyncInstalled || typeof window.updateOverallProgress !== 'function') return;
    const original = window.updateOverallProgress;
    const SUPA_URL = 'https://cvfmkcxmxkmemmshfttn.supabase.co';
    const SUPA_KEY = 'sb_publishable_Bb_GkRPWRFeAPvIduwPTJg_O1z_sStm';
    const TOTAL_CHAPTERS = 1189;

    window.updateOverallProgress = async function () {
      try {
        const pending = window.__clpBibleChapterSavePending;
        if (pending) await pending;
      } catch (_) {}

      const session = window.CLPAuth?.getUser?.();
      const userId = String(session?.initials || window.localUserId || localStorage.getItem('bible_user_id') || '').trim();
      if (!userId) return original();

      try {
        const headers = { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` };
        const chapterRes = await fetch(`${SUPA_URL}/rest/v1/bible?select=verse_key,is_read&user_id=eq.${encodeURIComponent(userId)}&verse_key=like.*-CH`, { cache: 'no-store', headers });
        if (!chapterRes.ok) return original();
        const rows = await chapterRes.json();
        const totalRead = rows.filter(row => typeof row.verse_key === 'string' && row.verse_key.endsWith('-CH') && row.is_read === true).length;
        const payload = { user_id: userId, verse_key: 'PROGRESS', is_read: true, memo_text: String(totalRead) };
        const progressRes = await fetch(`${SUPA_URL}/rest/v1/bible?on_conflict=user_id,verse_key`, {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates, return=minimal' },
          body: JSON.stringify(payload)
        });
        if (!progressRes.ok) return original();
        if (typeof window.loadLeaderboard === 'function') await window.loadLeaderboard();
        window.__clpBibleProgressUpdate = Promise.resolve();
      } catch (_) {
        return original();
      }
    };
    window.__clpTop5ProgressSyncInstalled = true;
  }

  function init() {
    applyBibleLayout();
    installTop5ProgressSync();
    setTimeout(applyBibleLayout, 500);
    setTimeout(applyBibleLayout, 1500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();