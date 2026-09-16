/* Movie Archive Shorts: real bilingual titles for every Shorts card */
'use strict';
(() => {
  const TITLES = {
    gQ4Ip6cyr1U: { ko: '체인소맨 Rev It Up', en: 'Chainsaw Man Rev It Up' },
    'z-2LOBuWos8': { ko: '주술회전 영역전개', en: 'Jujutsu Kaisen Domain Expansion' },
    pGibrT9Pp3I: { ko: '귀멸의칼날 벽력일섬', en: 'Demon Slayer Thunderclap and Flash' },
    VXWdSOXGwKQ: { ko: '귀멸의칼날 난리났어', en: 'Demon Slayer What a Riot' },
    XjSUJRduAzI: { ko: '로봇전쟁 Final Round', en: 'Robot War Final Round' },
    MYlAYewAdu4: { ko: '귀멸의칼날 촬영준비', en: 'Demon Slayer Preparing for the Shoot' },
    '0d-rUizVukQ': { ko: '귀멸의칼날 촬영 비하인드', en: 'Demon Slayer Behind the Scenes' },
    tgR1Kq3fGWE: { ko: '귀멸의칼날 Flash bang', en: 'Demon Slayer Flash Bang' }
  };

  const getLang = () => {
    try {
      return localStorage.getItem('pref-lang') === 'en' ? 'en' : 'ko';
    } catch (_) {
      return 'ko';
    }
  };

  const apply = (forcedLang) => {
    const lang = forcedLang === 'en' || forcedLang === 'ko' ? forcedLang : getLang();

    document.querySelectorAll('.shorts-link[href*="/shorts/"]').forEach(card => {
      const match = card.href.match(/\/shorts\/([^?&#/]+)/);
      const item = match && TITLES[match[1]];
      if (!item) return;

      const title = item[lang] || item.ko;
      const label = `${title} — Chris LEE.PAPA YouTube Shorts`;

      card.dataset.shortTitle = title;
      card.setAttribute('aria-label', label);

      const img = card.querySelector('.shorts-thumb');
      if (img) img.alt = label;

      // Replace any generic visible label that may already exist in the HTML.
      card.querySelectorAll('*').forEach(node => {
        if (node.children.length === 0 && /AI\s*생성\s*영상\s*쇼츠\s*[1-8]/.test(node.textContent || '')) {
          node.textContent = title;
        }
      });
    });
  };

  const init = () => {
    let style = document.getElementById('movie-short-titles-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'movie-short-titles-style';
      style.textContent = `
        .shorts-link[data-short-title]::after {
          content: attr(data-short-title);
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 10px;
          z-index: 5;
          padding: 28px 8px 8px;
          color: #fff;
          font: 600 .88rem/1.35 Pretendard, sans-serif;
          text-align: center;
          word-break: keep-all;
          pointer-events: none;
          background: linear-gradient(to top, rgba(0,0,0,.88), rgba(0,0,0,0));
        }
        @media (max-width: 600px) {
          .shorts-link[data-short-title]::after {
            left: 7px;
            right: 7px;
            bottom: 7px;
            padding: 24px 5px 6px;
            font-size: .76rem;
            line-height: 1.3;
          }
        }
      `;
      document.head.appendChild(style);
    }

    apply();

    const previous = window.onLangChange;
    window.onLangChange = function(lang) {
      if (typeof previous === 'function') {
        try { previous(lang); } catch (_) {}
      }
      apply(lang);
    };

    let lastLang = getLang();
    window.setInterval(() => {
      const current = getLang();
      if (current !== lastLang) {
        lastLang = current;
        apply(current);
      }
    }, 300);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
