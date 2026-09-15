/* Faith pages: Galaxy S26-class mobile typography/layout tuning */
'use strict';
(() => {
  if (window.__clpFaithMobileResponsiveLoaded) return;
  window.__clpFaithMobileResponsiveLoaded = true;

  const style = document.createElement('style');
  style.textContent = `
    @media (max-width:700px){
      html,body{width:100%;max-width:100%;min-width:0;overflow-x:hidden}
      img,video,canvas,iframe{max-width:100%}
      .page-wrapper,.bible-container,.container{width:100%;max-width:100%;min-width:0;box-sizing:border-box;overflow-x:hidden}
      .page-wrapper{padding-left:12px;padding-right:12px}
      .page-header{max-width:100%;min-width:0;overflow:hidden;padding-left:14px;padding-right:14px}
      .page-title,.header-title{max-width:100%;word-break:keep-all;overflow-wrap:anywhere;line-height:1.35}
      .page-header p,.header-slogan{max-width:100%;word-break:keep-all;overflow-wrap:anywhere;line-height:1.7}
      .container,.bible-container{padding-left:12px;padding-right:12px}
      .intro,.section-heading{max-width:100%;min-width:0}
      .intro h2,.section-heading h2{font-size:1.35rem;line-height:1.5;word-break:keep-all}
      .intro p,.section-heading p{font-size:.86rem;line-height:1.85;word-break:keep-all;overflow-wrap:anywhere}
      .albums-grid,.story-grid{grid-template-columns:1fr!important;gap:14px}
      .album-card{width:100%;min-width:0;min-height:390px;max-width:100%}
      .album-info{padding:21px}
      .album-title{font-size:1.15rem;line-height:1.5;word-break:keep-all}
      .album-desc{font-size:.8rem;line-height:1.75;word-break:keep-all}
      .album-badge,.story-number{font-size:.58rem;line-height:1.5;letter-spacing:.14em;overflow-wrap:anywhere}
      .stream-row{gap:7px}
      .stream-btn{font-size:.7rem;padding:7px 12px;max-width:100%;white-space:normal}
      .story-card{padding:20px 17px;min-width:0}
      .story-card h3{font-size:1.05rem;line-height:1.55;word-break:keep-all}
      .story-card p{font-size:.82rem;line-height:1.8;word-break:keep-all;overflow-wrap:anywhere}
      .lyrics-intro,.final-note{max-width:100%;padding:20px 16px;font-size:.82rem;line-height:1.8;word-break:keep-all;overflow-wrap:anywhere}
      .lyrics-item{width:100%;max-width:100%;min-width:0}
      .lyrics-item summary{padding:16px 14px;gap:10px;align-items:flex-start}
      .lyrics-title{font-size:.88rem;line-height:1.55;word-break:keep-all;overflow-wrap:anywhere}
      .lyrics-meta{font-size:.62rem;line-height:1.5;overflow-wrap:anywhere}
      .lyrics-body{padding:0 14px 18px;font-size:.8rem;line-height:1.85;word-break:keep-all;overflow-wrap:anywhere}
      .lyrics-body p{word-break:keep-all;overflow-wrap:anywhere}

      /* Bible app: keep controls and reading area inside the phone width. */
      .selector-panel{width:100%;max-width:100%;min-width:0;padding:22px 14px;border-radius:20px;overflow:hidden}
      .panel-header-tools{gap:8px;margin-bottom:20px}
      .tool-action-btn{min-width:0;max-width:100%;padding:7px 11px;font-size:.72rem;white-space:normal;line-height:1.45}
      .testament-row{gap:8px;margin-bottom:25px}
      .testament-tab{min-width:0;padding:10px 7px;font-size:.78rem;line-height:1.45;word-break:keep-all}
      .book-grid,.chapter-grid{width:100%;max-width:100%;min-width:0}
      .book-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important}
      .chapter-grid{grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:6px!important}
      .book-grid>*,.chapter-grid>*{min-width:0;max-width:100%;overflow:hidden;text-overflow:ellipsis;word-break:keep-all}
      .reader-panel,.bible-reader,.chapter-content,.verse-list{width:100%;max-width:100%;min-width:0;box-sizing:border-box;overflow-wrap:anywhere}
      .verse,.verse-text,.bible-text{max-width:100%;word-break:keep-all;overflow-wrap:anywhere}
      .verse-text,.bible-text{font-size:1rem;line-height:2}
      .reader-toolbar,.chapter-toolbar{max-width:100%;min-width:0;flex-wrap:wrap;gap:7px}
      .reader-toolbar button,.chapter-toolbar button{max-width:100%;white-space:normal}
      table{width:100%!important;max-width:100%!important;min-width:0!important;table-layout:fixed}
      th,td{white-space:normal;word-break:break-word;overflow-wrap:anywhere}
      button,a{max-width:100%;overflow-wrap:anywhere}
    }
    @media (max-width:390px){
      .container,.bible-container{padding-left:9px;padding-right:9px}
      .page-header{padding-left:10px;padding-right:10px}
      .header-title{font-size:2.45rem;letter-spacing:.1em}
      .intro h2,.section-heading h2{font-size:1.25rem}
      .intro p,.section-heading p{font-size:.82rem}
      .album-card{min-height:370px}
      .album-info{padding:18px}
      .album-title{font-size:1.08rem}
      .story-card{padding:18px 14px}
      .story-card p{font-size:.79rem}
      .lyrics-body{font-size:.77rem}
      .chapter-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important}
      .book-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
      .verse-text,.bible-text{font-size:.94rem;line-height:1.9}
    }
  `;
  document.head.appendChild(style);
})();
