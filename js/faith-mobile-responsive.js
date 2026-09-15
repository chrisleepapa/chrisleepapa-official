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

      /* Bible */
      .page-header{padding:92px 12px 24px!important;min-height:0!important;overflow:hidden}
      .page-title{font-size:2rem!important;line-height:1.25!important;letter-spacing:.09em!important;word-break:keep-all}
      .cloud-status{font-size:.7rem;line-height:1.5;flex-wrap:wrap}
      .bible-container{width:100%;max-width:100%;min-width:0;padding:0 10px 80px!important;box-sizing:border-box;overflow:hidden}
      .selector-panel{width:100%;max-width:100%;min-width:0;padding:18px 11px!important;border-radius:18px!important;margin-bottom:24px!important;min-height:0!important;box-sizing:border-box;overflow:hidden}
      .panel-header-tools{gap:6px!important;margin-bottom:16px!important;flex-wrap:wrap!important}
      .tool-action-btn{flex:1 1 calc(50% - 6px)!important;min-width:0!important;padding:7px 6px!important;font-size:.68rem!important;line-height:1.4;white-space:normal!important;word-break:keep-all}
      .testament-row{gap:7px!important;margin-bottom:18px!important}
      .testament-tab{max-width:none!important;padding:9px 5px!important;font-size:.76rem!important;line-height:1.4}

      /* Actual Bible book selector classes */
      .book-list-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important;padding:5px!important;max-height:360px!important;box-sizing:border-box}
      .book-item{min-width:0!important;padding:11px 10px!important;border-radius:12px!important;font-size:.82rem!important;line-height:1.45!important;gap:6px;word-break:keep-all;overflow:hidden}
      .book-item span{min-width:0;overflow-wrap:anywhere}
      .chapter-selection-header{margin-bottom:15px!important;padding-bottom:11px!important;gap:8px}
      .btn-back{font-size:.74rem!important;gap:5px}
      .selected-book-title{font-size:1rem!important;line-height:1.45;word-break:keep-all}
      .chapter-grid-row{grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:6px!important}
      .chapter-btn{width:100%!important;min-width:0!important;font-size:.82rem!important;border-radius:9px!important}
      .top5-leaderboard{margin-top:20px;padding-top:15px}
      .top5-leaderboard h4{font-size:.72rem!important}

      /* Actual Bible reader classes */
      .bible-reader{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box;padding:28px 15px!important;border-radius:18px!important;margin-bottom:35px!important;overflow:hidden}
      .chapter-heading{margin-bottom:25px!important}
      .chapter-heading h2{font-size:1.45rem!important;line-height:1.4;word-break:keep-all}
      .verse-main{gap:9px!important}
      .verse-number{font-size:.72rem!important;min-width:24px}
      .verse-text{font-size:.9rem!important;line-height:1.9!important;word-break:normal;overflow-wrap:break-word}
      .verse-actions{gap:5px;flex-wrap:wrap}
      .verse-actions button{font-size:.68rem!important;padding:5px 7px!important}

      /* Keep Korean explanatory text from leaving a one-character orphan on the next line. */
      .bible-reader p,.bible-reader li,.bible-reader .description,.bible-reader .info-text{word-break:normal;overflow-wrap:normal;white-space:normal}

      /* Any generated reading/table content must stay inside the viewport. */
      .bible-reader *{max-width:100%;box-sizing:border-box}
      table{width:100%!important;max-width:100%!important;min-width:0!important;table-layout:fixed}
      th,td{white-space:normal;word-break:break-word;overflow-wrap:anywhere}
    }
    @media (max-width:390px){
      .page-header{padding-top:82px!important;padding-bottom:20px!important}
      .page-title{font-size:1.8rem!important}
      .bible-container{padding-left:7px!important;padding-right:7px!important}
      .selector-panel{padding:16px 9px!important}
      .book-item{padding:10px 8px!important;font-size:.77rem!important}
      .chapter-grid-row{grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:5px!important}
      .chapter-btn{font-size:.76rem!important}
      .bible-reader{padding:24px 12px!important}
      .chapter-heading h2{font-size:1.3rem!important}
      .verse-text{font-size:.86rem!important;line-height:1.85!important}
      .bible-reader p,.bible-reader li,.bible-reader .description,.bible-reader .info-text{word-break:normal;overflow-wrap:normal}
    }
  `;
  document.head.appendChild(style);

  // The sentence below is not tied to a stable class in the existing page markup.
  // Target its actual rendered element so Korean text is never split inside the final word.
  function fixDesignSentence(){
    if (window.innerWidth > 700) return;
    const target = '3. 주요 기능을 이렇게 설계했습니다.';
    const normalize = value => String(value || '').replace(/\s+/g, ' ').trim();
    const elements = Array.from(document.body.querySelectorAll('*'));
    let match = elements.find(el => normalize(el.textContent) === target);
    if (!match) {
      match = elements.find(el => {
        const text = normalize(el.textContent);
        return text.includes(target);
      });
    }
    if (!match) return;
    match.style.setProperty('word-break', 'keep-all', 'important');
    match.style.setProperty('overflow-wrap', 'normal', 'important');
    match.style.setProperty('white-space', 'normal', 'important');
    match.style.setProperty('text-wrap', 'balance', 'important');
  }

  fixDesignSentence();
  if (document.readyState !== 'complete') {
    window.addEventListener('load', fixDesignSentence, { once:true });
  }
  const observer = new MutationObserver(fixDesignSentence);
  observer.observe(document.body, { childList:true, subtree:true });
})();
