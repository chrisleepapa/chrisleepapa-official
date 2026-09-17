/** Restore chapter read checks from Supabase after Bible initialization. */
'use strict';
(() => {
  if (window.__clpBibleReadRecoveryInstalled) return;
  window.__clpBibleReadRecoveryInstalled = true;

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function restore() {
    for (let attempt = 0; attempt < 20; attempt++) {
      if (typeof window.loadSupabaseData === 'function' &&
          typeof window.renderChapterGrid === 'function' &&
          typeof window.renderContent === 'function' &&
          window.localUserId) {
        try {
          await window.loadSupabaseData();
          window.renderChapterGrid();
          window.renderContent();
          console.info('[Bible] chapter read state restored');
          return;
        } catch (error) {
          console.error('[Bible] chapter read state restore failed', error);
        }
      }
      await wait(500);
    }
  }

  window.addEventListener('load', () => setTimeout(restore, 1200), { once: true });
})();
