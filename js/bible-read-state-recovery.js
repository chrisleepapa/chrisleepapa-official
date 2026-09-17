/** Start the Bible app through its original auth/init path once. */
'use strict';
(() => {
  if (window.__clpBibleReadRecoveryInstalled) return;
  window.__clpBibleReadRecoveryInstalled = true;

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function start() {
    for (let attempt = 0; attempt < 30; attempt++) {
      if (typeof window.checkAuth === 'function') {
        if (window.__clpBibleRecoveryInitStarted) return;
        window.__clpBibleRecoveryInitStarted = true;
        try {
          window.checkAuth();
          console.info('[Bible] original auth initialization started');
        } catch (error) {
          window.__clpBibleRecoveryInitStarted = false;
          console.error('[Bible] auth initialization failed', error);
        }
        return;
      }
      await wait(300);
    }
  }

  window.addEventListener('load', () => setTimeout(start, 300), { once: true });
})();
