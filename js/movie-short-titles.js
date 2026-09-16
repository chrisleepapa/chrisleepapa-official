/* Movie Archive Shorts: bilingual work titles and accessible labels */
'use strict';
(() => {
  const TITLES = {
    gQ4Ip6cyr1U: {ko:'체인소맨 Rev It Up', en:'Chainsaw Man Rev It Up'},
    'z-2LOBuWos8': {ko:'주술회전 영역전개', en:'Jujutsu Kaisen Domain Expansion'},
    pGibrT9Pp3I: {ko:'귀멸의칼날 벽력일섬', en:'Demon Slayer Thunderclap and Flash'},
    VXWdSOXGwKQ: {ko:'귀멸의칼날 난리났어', en:'Demon Slayer What a Riot'},
    XjSUJRduAzI: {ko:'로봇전쟁 Final Round', en:'Robot War Final Round'},
    MYlAYewAdu4: {ko:'귀멸의칼날 촬영준비', en:'Demon Slayer Preparing for the Shoot'},
    '0d-rUizVukQ': {ko:'귀멸의칼날 촬영 비하인드', en:'Demon Slayer Behind the Scenes'},
    tgR1Kq3fGWE: {ko:'귀멸의칼날 Flash bang', en:'Demon Slayer Flash Bang'}
  };

  const apply = () => {
    const lang = (window.getCurrentLang ? window.getCurrentLang() : document.documentElement.lang || 'ko').toString().toLowerCase().startsWith('en') ? 'en' : 'ko';
    document.querySelectorAll('.shorts-link[href*="/shorts/"]').forEach(card => {
      const match = card.href.match(/\/shorts\/([^?&#/]+)/);
      if (!match || !TITLES[match[1]]) return;
      const title = TITLES[match[1]][lang];
      card.setAttribute('aria-label', `${title} — Chris LEE.PAPA YouTube Shorts`);
      const img = card.querySelector('.shorts-thumb');
      if (img) img.alt = `${title} — Chris LEE.PAPA YouTube Shorts`;

      let label = card.querySelector('.clp-short-title');
      if (!label) {
        label = document.createElement('span');
        label.className = 'clp-short-title';
        label.style.cssText = 'position:absolute;left:0;right:0;bottom:0;z-index:4;padding:38px 14px 14px;color:#fff;font:600 .9rem/1.35 Pretendard,sans-serif;text-align:center;word-break:keep-all;background:linear-gradient(to top,rgba(0,0,0,.92),rgba(0,0,0,0));pointer-events:none;';
        card.appendChild(label);
      }
      label.textContent = title;
    });
  };

  const init = () => {
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, {childList:true, subtree:true, attributes:true, attributeFilter:['lang']});
    const previous = window.onLangChange;
    window.onLangChange = function(lang){
      if (typeof previous === 'function') previous(lang);
      apply();
    };
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
