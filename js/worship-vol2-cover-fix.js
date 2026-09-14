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
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();
})();
