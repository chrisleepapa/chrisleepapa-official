/* Journal 1–6: Galaxy S26-class mobile typography/layout tuning */
'use strict';
(() => {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width:700px){
      .page-wrapper{
        padding:calc(var(--nav-height) + 34px) 14px 72px;
        width:auto;
        max-width:none;
      }
      .page-header{margin-bottom:28px}
      .page-header-tag{
        font-size:.58rem;
        line-height:1.5;
        letter-spacing:.18em;
        white-space:normal;
        overflow-wrap:anywhere;
      }
      .article-meta-row{
        gap:7px;
        font-size:.68rem;
        line-height:1.55;
      }
      .article-meta-row .cat{padding:3px 9px}
      .page-title{
        font-size:1.42rem;
        line-height:1.48;
        margin-bottom:16px;
        word-break:keep-all;
        overflow-wrap:anywhere;
      }
      .article-card{
        padding:24px 17px;
        border-radius:18px;
        margin-bottom:26px;
      }
      .journal-body p{
        font-size:.9rem;
        line-height:1.85;
        margin-bottom:17px;
        word-break:keep-all;
        overflow-wrap:anywhere;
      }
      .journal-body h2{
        font-size:1.14rem;
        line-height:1.55;
        margin:32px 0 14px;
        padding-top:10px;
        word-break:keep-all;
        overflow-wrap:anywhere;
      }
      .journal-body .journal-quote,
      .journal-body .journal-note{
        padding:15px 16px;
        font-size:.84rem;
        line-height:1.75;
        word-break:keep-all;
      }
      .article-footer{
        font-size:.76rem;
        line-height:1.7;
      }
      .journal-nav{gap:10px;margin-bottom:30px}
      .journal-nav a{padding:15px 16px}
      .journal-nav .dir{font-size:.56rem;letter-spacing:.12em}
      .journal-nav .ttl{font-size:.82rem;line-height:1.5;word-break:keep-all}
      .back-link{font-size:.76rem;line-height:1.6;margin-bottom:18px;word-break:keep-all}
    }
    @media (max-width:390px){
      .page-wrapper{padding-left:10px;padding-right:10px}
      .article-card{padding:21px 14px}
      .page-title{font-size:1.28rem}
      .journal-body p{font-size:.86rem;line-height:1.82}
      .journal-body h2{font-size:1.08rem}
      .journal-body .journal-quote,
      .journal-body .journal-note{font-size:.8rem}
      .journal-nav .ttl{font-size:.78rem}
    }
  `;
  document.head.appendChild(style);
})();
