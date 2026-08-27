/* WORLD LORE language cleanup
 * KOR: Korean only
 * ENG: English only
 * Keeps world-lore labels synchronized with the site's live language switch.
 */
'use strict';
(() => {
  const EN = {
    '율이':'YUL', '정이':'JUNG', '크리스':'CHRIS', '제인':'JANE',
    '아빠':'DAD', '엄마':'MOM',
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
    try {
      const l = (
        localStorage.getItem('pref-lang') ||
        localStorage.getItem('language') ||
        localStorage.getItem('lang') ||
        document.documentElement.lang || 'ko'
      ).toLowerCase();
      return l.startsWith('en') ? 'en' : 'ko';
    } catch (_) {
      return document.documentElement.lang?.toLowerCase().startsWith('en') ? 'en' : 'ko';
    }
  }

  function splitBilingual(text) {
    const separators = ['·', '｜', '|', ' / ', ' — ', ' – ', ' - '];
    for (const separator of separators) {
      if (!text.includes(separator)) continue;
      const parts = text.split(separator).map(s => s.trim()).filter(Boolean);
      if (parts.length !== 2) continue;
      const ko = parts.find(p => /[가-힣]/.test(p));
      const en = parts.find(p => !/[가-힣]/.test(p));
      if (ko && en) return lang() === 'en' ? en : ko;
    }
    return null;
  }

  function cleanText(el) {
    if (!el) return;
    const original = el.dataset.worldLoreOriginalText || el.textContent.trim();
    if (!original) return;
    el.dataset.worldLoreOriginalText = original;

    const bilingual = splitBilingual(original);
    if (bilingual) {
      el.textContent = bilingual;
      return;
    }

    const table = lang() === 'en' ? EN : KO;
    if (table[original] !== undefined) {
      el.textContent = table[original];
    }
  }

  function apply() {
    document.querySelectorAll(
      '.lore-card h3, .lore-section h2, .lore-nav a, .lore-kicker, .lore-card, .lore-section'
    ).forEach(cleanText);
  }

  // Apply immediately and after the shared header/language system is ready.
  apply();
  document.addEventListener('DOMContentLoaded', apply, { once: true });
  window.addEventListener('languageChanged', apply);
  document.addEventListener('siteLanguageChanged', apply);
  window.addEventListener('storage', e => {
    if (e.key === 'pref-lang' || e.key === 'language' || e.key === 'lang') apply();
  });
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
})();
