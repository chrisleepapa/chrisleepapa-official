/** Keep Bible initialization single-owner on each page load. */
'use strict';
(() => {
  if (window.__clpBibleInitGuardInstalled) return;
  const originalCheckAuth = window.checkAuth;
  if (typeof originalCheckAuth !== 'function') return;

  let started = false;
  window.checkAuth = function() {
    if (started) {
      console.info('[Bible] duplicate checkAuth ignored');
      return window.__clpBibleInitPromise || Promise.resolve();
    }
    started = true;
    console.info('[Bible] checkAuth initialization started');
    try {
      const result = originalCheckAuth.apply(this, arguments);
      window.__clpBibleInitPromise = result && typeof result.then === 'function' ? result : Promise.resolve(result);
      return result;
    } catch (error) {
      window.__clpBibleInitPromise = Promise.reject(error);
      throw error;
    }
  };

  window.__clpBibleInitGuardInstalled = true;
  console.info('[Bible] single initialization guard installed');
})();
