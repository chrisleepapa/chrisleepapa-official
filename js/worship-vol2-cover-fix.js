/* Vol.2 album cover loading fix — scoped to /worship only. */
(() => {
  'use strict';
  const apply = () => {
    const page = (location.pathname.split('/').pop() || '').replace(/\.html$/i, '').toLowerCase();
    if (page !== 'worship') return;
    const cover = document.querySelector('.albums-grid .album-card:nth-child(2) .album-cover');
    if (!cover) return;
    cover.loading = 'eager';
    cover.decoding = 'async';
    cover.src = '/images/My%20hymn2.png?v=20260914';

    // Restore the Vol.3 deep-link target used by Chris's Pick.
    const vol3 = document.querySelector('.albums-grid .album-card:nth-child(3)');
    if (vol3) vol3.id = 'vol3';
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();
})();
