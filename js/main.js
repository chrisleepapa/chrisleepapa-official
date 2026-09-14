/* Chris LEE.PAPA main loader — preserves the original navigation layer in main-core.js */
'use strict';
(() => {
  const load = (src, id) => new Promise((resolve, reject) => {
    if (id && document.getElementById(id)) return resolve();
    const script = document.createElement('script');
    if (id) script.id = id;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  const start = async () => {
    try {
      await load('/js/main-core.js?v=20260914', 'clp-main-core');
      const page = (location.pathname.split('/').pop() || '').replace(/\.html$/i,'').toLowerCase();
      if (page === 'worship') {
        await load('/js/worship-origin-story.js?v=20260914', 'worship-origin-story-script');
      }
      if (page === 'journal-6') {
        await load('/js/journal6-worship-link.js?v=20260914', 'journal6-worship-link-script');
      }
    } catch (error) {
      console.error('[main.js] loader failed:', error);
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();