/** Initialize the Bible app once and let the normal initializer restore persisted chapter checks. */
'use strict';
(() => {
  if (window.__clpBibleReadRecoveryInstalled) return;
  window.__clpBibleReadRecoveryInstalled = true;

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  function getSession() {
    try {
      const raw = localStorage.getItem('chrisleepapa-auth-session-v3');
      const session = raw ? JSON.parse(raw) : null;
      return session && session.initials ? session : null;
    } catch (_) {
      return null;
    }
  }

  async function restore() {
    for (let attempt = 0; attempt < 30; attempt++) {
      const session = getSession();
      if (session && typeof window.initAppAfterAuth === 'function') {
        if (window.__clpBibleRecoveryInitStarted) return;
        window.__clpBibleRecoveryInitStarted = true;
        try {
          window.localUserId = session.initials;
          window.localUserPin = session.pinHash || '';
          await window.initAppAfterAuth();
          console.info('[Bible] Bible initialization completed; persisted chapter state is restored by the normal loader');
        } catch (error) {
          window.__clpBibleRecoveryInitStarted = false;
          console.error('[Bible] Bible initialization failed', error);
        }
        return;
      }
      await wait(300);
    }
  }

  window.addEventListener('load', () => setTimeout(restore, 300), { once: true });
})();
