(() => {
  'use strict';

  const HERO_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Psalm_118.jpg/2560px-Psalm_118.jpg';
  const FALLBACK_IMAGE = 'https://www.publicdomainpictures.net/pictures/60000/velka/bible-open-to-psalm-118-1378400894gXP.jpg';

  function removeDuplicateIntroBlocks() {
    // Keep the detailed creator story, but remove the older short motivation block
    // that was re-inserted immediately before the shared guestbook.
    const creationContext = document.getElementById('bible-creation-context');
    if (creationContext) creationContext.remove();
  }

  function watchForDuplicateCreationContext() {
    if (!document.body || window.__clpBibleCreationContextObserver) return;
    const observer = new MutationObserver(() => removeDuplicateIntroBlocks());
    observer.observe(document.body, { childList: true, subtree: true });
    window.__clpBibleCreationContextObserver = observer;
    removeDuplicateIntroBlocks();
  }

  function applyBibleLayout() {
    removeDuplicateIntroBlocks();

    const story = document.getElementById('bible-creator-story');
    const existingHero = document.getElementById('bible-page-hero');
    const bibleContainer = document.querySelector('.bible-container');

    // The banner is now static in bible.html. Even when it already exists,
    // the creator story must still be placed directly beneath it.
    if (existingHero) {
      if (story && bibleContainer && bibleContainer.parentNode) {
        bibleContainer.parentNode.insertBefore(story, bibleContainer);
        story.style.marginTop = '0';
        story.style.marginBottom = '64px';
      }
      moveAccountBar();
      return;
    }

    if (!story) {
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
          <div class="header-title bible-hero-title" style="margin:8px 0 4px!important;font-family:Cinzel,serif!important;font-size:clamp(3rem,10vw,5.2rem)!important;letter-spacing:.15em!important;font-weight:400!important;color:#e8d08a!important;line-height:1.1!important;white-space:nowrap!important">BIBLE IN MY HAND</div>
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

    window.updateOverallProgress = async function () {
      try {
        const pending = window.__clpBibleChapterSavePending;
        if (pending) await pending;
      } catch (error) {
        console.warn('[Bible] pending chapter save failed:', error);
      }
      const session = window.CLPAuth?.getUser?.();
      const initials = String(session?.initials || window.localUserId || localStorage.getItem('bible_user_id') || '').trim();
      const pinHash = session?.pinHash || window.localUserPin || localStorage.getItem('bible_pin_hash') || '';
      if (!initials || !pinHash) return original();

      const rpc = async (name, body) => {
        const response = await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`, {
          method: 'POST',
          headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error(`Bible RPC ${name} HTTP ${response.status}`);
        const result = await response.json();
        if (!result || result.ok !== true) throw new Error(result?.error || `Bible RPC ${name} failed`);
        return result;
      };
      try {
        const args = { p_initials: initials, p_pin_hash: pinHash };
        const records = await rpc('clp_load_bible_records', args);
        const totalRead = (records.records || []).filter(row => typeof row.verse_key === 'string' && row.verse_key.endsWith('-CH') && row.is_read === true).length;
        await rpc('clp_save_bible_record', {
          ...args, p_verse_key: 'PROGRESS', p_is_read: false,
          p_is_highlighted: false, p_is_bookmarked: false, p_memo_text: String(totalRead)
        });
        if (typeof window.loadLeaderboard === 'function') await window.loadLeaderboard();
        window.__clpBibleProgressUpdate = Promise.resolve();
      } catch (error) {
        console.error('[Bible] secure progress sync failed:', error);
        throw error;
      }
    };
    window.__clpTop5ProgressSyncInstalled = true;
  }

  function init() {
    applyBibleLayout();
    watchForDuplicateCreationContext();
    installTop5ProgressSync();
    setTimeout(applyBibleLayout, 500);
    setTimeout(applyBibleLayout, 1500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();