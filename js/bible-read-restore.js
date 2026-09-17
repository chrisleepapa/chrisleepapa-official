/** Final Bible chapter-read restore: re-reads persisted -CH rows after page initialization. */
'use strict';
(() => {
  let attempts = 0;
  const maxAttempts = 100;
  let restored = false;

  async function restore() {
    if (restored) return;
    attempts += 1;
    if (attempts > maxAttempts) return;

    if (typeof window.loadSupabaseData !== 'function' ||
        typeof window.renderChapterGrid !== 'function') {
      return setTimeout(restore, 200);
    }

    const grid = document.getElementById('chapterGrid');
    if (!grid) return setTimeout(restore, 200);

    const session = window.CLPAuth?.getUser?.();
    if (!session?.initials) return setTimeout(restore, 200);

    try {
      await window.loadSupabaseData();
      window.renderChapterGrid();
      if (typeof window.renderContent === 'function') window.renderContent();
      restored = true;
      console.info('[Bible] persisted chapter-read state restored after initialization');
    } catch (error) {
      console.error('[Bible] final chapter-read restore failed:', error);
      if (attempts < maxAttempts) setTimeout(restore, 500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(restore, 500), { once: true });
  } else {
    setTimeout(restore, 500);
  }
})();
