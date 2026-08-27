/* WORLD LORE language cleanup
 * KOR: Korean only
 * ENG: English only
 * Character/location/artifact headings in world-lore.html are legacy bilingual text;
 * this script removes the opposite language without changing the page content.
 */
'use strict';
(() => {
  const EN = {
    '율이':'YUL', '정이':'JUNG', '크리스':'CHRIS', '제인':'JANE',
    '프리티':'PRETTY', '큐티':'CUTIE', '브록':'BROCK', '브룩':'BROCK',
    '엘리온':'ELION', '포포':'POPO', '크라운':'CROWN', '베인':'VANE',
    '어둠의 기사단':'DARK KNIGHTS', '좀비 큐티':'ZOMBIE CUTIE',
    '좀비 요정들':'ZOMBIE FAIRIES', '글루톤':'GLUTON',
    '스콜 & 게일':'SKOLL & GALE', '카이':'KAI',
    '루미나':'LUMINA', '아르카디아':'ARCADIA', '죽음의 늪':'DEATH SWAMP',
    '거인의 등뼈':'GIANT’S SPINE', '고요의 계곡':'VALLEY OF SILENCE',
    '희망 시장':'HOPE MARKET', '이성의 검':'SWORD OF REASON',
    '교감의 활':'BOW OF EMPATHY'
  };
  const KO = Object.fromEntries(Object.entries(EN).map(([k,v]) => [v,k]));

  function lang() {
    const l = (localStorage.getItem('language') || localStorage.getItem('lang') || document.documentElement.lang || 'ko').toLowerCase();
    return l.startsWith('en') ? 'en' : 'ko';
  }

  function cleanText(el) {
    if (!el || !el.textContent) return;
    let text = el.textContent.trim();
    // Legacy bilingual labels: Korean · ENGLISH
    if (text.includes('·')) {
      const parts = text.split('·').map(s => s.trim()).filter(Boolean);
      if (parts.length === 2) {
        const ko = parts.find(p => /[가-힣]/.test(p));
        const en = parts.find(p => !/[가-힣]/.test(p));
        if (ko && en) { el.textContent = lang() === 'en' ? en : ko; return; }
      }
    }
    // Handle known names when not separated by a dot.
    if (lang() === 'en') {
      for (const [ko,en] of Object.entries(EN)) {
        if (text === ko) { el.textContent = en; return; }
      }
    } else {
      for (const [en,ko] of Object.entries(KO)) {
        if (text === en) { el.textContent = ko; return; }
      }
    }
  }

  function apply() {
    document.querySelectorAll('.lore-card h3, .lore-section h2, .lore-nav a, .lore-kicker').forEach(cleanText);
  }

  // Run after the shared language system has initialized, and again after delayed DOM updates.
  apply();
  document.addEventListener('DOMContentLoaded', apply, { once: true });
  window.addEventListener('languageChanged', apply);
  window.addEventListener('storage', e => { if (e.key === 'language' || e.key === 'lang') apply(); });
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
})();
