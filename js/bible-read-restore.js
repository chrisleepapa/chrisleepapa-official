/** Restore Bible chapter-read checks after initialization without depending on CLPAuth timing. */
'use strict';
(() => {
  let attempts = 0;
  const maxAttempts = 120;
  let restored = false;

  function hasUserContext() {
    try {
      const session = window.CLPAuth?.getUser?.();
      if (session?.initials) return true;
      const raw = localStorage.getItem('chrisleepapa-auth-session-v3');
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed?.initials) return true;
      return !!localStorage.getItem('bible_user_id');
    } catch (_) {
      return false;
    }
  }

  async function restore() {
    if (restored) return;
    attempts += 1;
    if (attempts > maxAttempts) return;

    if (typeof window.loadSupabaseData !== 'function' ||
        typeof window.renderChapterGrid !== 'function' ||
        typeof window.renderContent !== 'function') {
      return setTimeout(restore, 200);
    }

    const grid = document.getElementById('chapterGrid');
    if (!grid || !hasUserContext()) return setTimeout(restore, 300);

    try {
      await window.loadSupabaseData();
      window.renderChapterGrid();
      window.renderContent();
      restored = true;
      console.info('[Bible] persisted chapter-read state restored after initialization');
    } catch (error) {
      console.error('[Bible] chapter-read restore failed:', error);
      if (attempts < maxAttempts) setTimeout(restore, 500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(restore, 800), { once: true });
  } else {
    setTimeout(restore, 800);
  }
})();
