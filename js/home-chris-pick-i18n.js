/* Chris's Pick Shorts: localize titles without changing YouTube links or thumbnails */
'use strict';
(() => {
  const TITLES = {
    '체인소맨 Rev It Up': 'Chainsaw Man Rev It Up',
    '주술회전 영역전개': 'Jujutsu Kaisen Domain Expansion',
    '귀멸의칼날 벽력일섬': 'Demon Slayer Thunderclap and Flash',
    '귀멸의칼날 난리났어': 'Demon Slayer What a Riot',
    '로봇전쟁 Final Round': 'Robot War Final Round',
    '귀멸의칼날 촬영준비': 'Demon Slayer Preparing for the Shoot',
    '귀멸의칼날 촬영 비하인드': 'Demon Slayer Behind the Scenes',
    '귀멸의칼날 Flash bang': 'Demon Slayer Flash Bang'
  };

  const apply = () => {
    const root = document.getElementById('chris-pick');
    if (!root) return;
    const title = root.querySelector('.clp-pick-title');
    if (!title) return;
    const stored = title.dataset.clpKoTitle || title.textContent.trim();
    if (!TITLES[stored]) return;
    title.dataset.clpKoTitle = stored;
    const lang = (window.getCurrentLang ? window.getCurrentLang() : document.documentElement.lang || 'ko').toString().toLowerCase().startsWith('en') ? 'en' : 'ko';
    title.textContent = lang === 'en' ? TITLES[stored] : stored;
  };

  const init = () => {
    const root = document.getElementById('chris-pick');
    if (!root) return;
    new MutationObserver(apply).observe(root, {childList:true, subtree:true});
    apply();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
