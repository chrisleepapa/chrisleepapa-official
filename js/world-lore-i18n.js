/* WORLD LORE language cleanup — live KOR/ENG switching */
'use strict';
(() => {
  const EN = {
    '율이':'YUL','정이':'JUNG','크리스':'CHRIS','제인':'JANE','아빠':'DAD','엄마':'MOM',
    '프리티':'PRETTY','큐티':'CUTIE','브록':'BROCK','브룩':'BROCK','엘리온':'ELION','포포':'POPO',
    '크라운':'CROWN','베인':'VANE','어둠의 기사단':'DARK KNIGHTS','좀비 큐티':'ZOMBIE CUTIE',
    '좀비 요정들':'ZOMBIE FAIRIES','글루톤':'GLUTON','스콜 & 게일':'SKOLL & GALE','카이':'KAI',
    '루미나':'LUMINA','아르카디아':'ARCADIA','죽음의 늪':'DEATH SWAMP','거인의 등뼈':'GIANT’S SPINE',
    '고요의 계곡':'VALLEY OF SILENCE','희망 시장':'HOPE MARKET','이성의 검':'SWORD OF REASON','교감의 활':'BOW OF EMPATHY'
  };
  const KO = Object.fromEntries(Object.entries(EN).map(([ko,en]) => [en,ko]));

  function getLang() {
    try {
      const v = localStorage.getItem('pref-lang') || localStorage.getItem('language') || localStorage.getItem('lang') || document.documentElement.lang || 'ko';
      return String(v).toLowerCase().startsWith('en') ? 'en' : 'ko';
    } catch (_) { return document.documentElement.lang?.toLowerCase().startsWith('en') ? 'en' : 'ko'; }
  }

  function label(text) {
    const parts = text.split('·').map(s => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      const ko = parts.find(p => /[가-힣]/.test(p));
      const en = parts.find(p => !/[가-힣]/.test(p) && !/^(DAD|MOM)$/.test(p));
      if (getLang() === 'en') {
        if (ko && EN[ko]) return EN[ko];
        return en || parts[parts.length - 1];
      }
      if (ko) return ko;
    }
    const table = getLang() === 'en' ? EN : KO;
    return table[text] || text;
  }

  function apply() {
    document.querySelectorAll('.lore-card h3, .lore-section h2, .lore-nav a, .lore-kicker').forEach(el => {
      if (!el.dataset.worldLoreOriginalText) el.dataset.worldLoreOriginalText = el.textContent.trim();
      const original = el.dataset.worldLoreOriginalText;
      if (original) el.textContent = label(original);
    });
  }

  // main.js uses this hook when its language button is clicked.
  window.onLangChange = apply;
  apply();
  document.addEventListener('DOMContentLoaded', apply, { once:true });
  window.addEventListener('languageChanged', apply);
  document.addEventListener('siteLanguageChanged', apply);
  window.addEventListener('storage', e => { if (['pref-lang','language','lang'].includes(e.key)) apply(); });
  setTimeout(apply, 100);
  setTimeout(apply, 500);
})();
