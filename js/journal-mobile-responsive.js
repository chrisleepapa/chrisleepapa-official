/* Journal 1–6: Galaxy S26-class mobile typography/layout tuning */
'use strict';
(() => {
  if (window.__clpJournalMobileResponsiveLoaded) return;
  window.__clpJournalMobileResponsiveLoaded = true;

  /* IMPORTANT: do not change the user's browser zoom/pinch-zoom behavior. */
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width:700px){
      .page-wrapper{padding:calc(var(--nav-height) + 34px) 14px 72px;width:auto;max-width:none}
      .page-header{margin-bottom:28px}
      .page-header-tag{font-size:.58rem;line-height:1.5;letter-spacing:.18em;white-space:normal;overflow-wrap:anywhere}
      .article-meta-row{gap:7px;font-size:.68rem;line-height:1.55}
      .article-meta-row .cat{padding:3px 9px}
      .page-title{font-size:1.42rem;line-height:1.48;margin-bottom:16px;word-break:keep-all;overflow-wrap:anywhere}
      .article-card{padding:24px 17px;border-radius:18px;margin-bottom:26px}
      .journal-body p{font-size:.9rem;line-height:1.85;margin-bottom:17px;word-break:keep-all;overflow-wrap:anywhere}
      .journal-body .journal-subhead,.journal-body h2{font-size:1.08rem;line-height:1.55;margin:28px 0 13px;padding:8px 0 0 11px;word-break:keep-all;overflow-wrap:anywhere}
      .journal-body > .journal-subhead:first-child,.journal-body > h2:first-child{margin-top:4px}
      .journal-body .journal-quote,.journal-body .journal-note{padding:15px 16px;font-size:.84rem;line-height:1.75;word-break:keep-all;overflow-wrap:anywhere}
      .journal-body .journal-prompt{padding:16px 15px;margin:14px 0 22px;font-size:.82rem;line-height:1.78;word-break:keep-all;overflow-wrap:anywhere}
      .journal-body .journal-prompt p{font-size:.82rem;line-height:1.78;margin-bottom:9px}
      .journal-body .journal-prompt-label{font-size:.56rem;line-height:1.5;letter-spacing:.14em;margin-bottom:9px}
      .journal-body .journal-dialogue{padding-left:12px;margin:14px 0;font-size:.84rem;line-height:1.75;word-break:keep-all}
      .journal-table-wrap{max-width:100%;margin:14px 0 22px;overflow-x:auto}
      .journal-table{min-width:430px;font-size:.76rem}
      .journal-table th,.journal-table td{padding:8px 10px;line-height:1.6;word-break:keep-all}
      .article-footer{font-size:.76rem;line-height:1.7}
      .journal-nav{gap:10px;margin-bottom:30px}
      .journal-nav a{padding:15px 16px;min-width:0}
      .journal-nav .dir{font-size:.56rem;letter-spacing:.12em}
      .journal-nav .ttl{font-size:.82rem;line-height:1.5;word-break:keep-all;overflow-wrap:anywhere}
      .back-link{font-size:.76rem;line-height:1.6;margin-bottom:18px;word-break:keep-all}
    }
    @media (max-width:390px){
      .page-wrapper{padding-left:10px;padding-right:10px}
      .article-card{padding:21px 14px}
      .page-title{font-size:1.28rem}
      .journal-body p{font-size:.86rem;line-height:1.82}
      .journal-body .journal-subhead,.journal-body h2{font-size:1.03rem;line-height:1.55}
      .journal-body .journal-quote,.journal-body .journal-note{font-size:.8rem}
      .journal-body .journal-prompt,.journal-body .journal-prompt p{font-size:.79rem}
      .journal-body .journal-dialogue{font-size:.8rem}
      .journal-table{font-size:.72rem}
      .journal-table th,.journal-table td{padding:7px 8px}
      .journal-nav .ttl{font-size:.78rem}
    }
  `;
  document.head.appendChild(style);
})();
