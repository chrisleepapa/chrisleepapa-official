/* Miracle Shot UI fix: language sync + mobile character tap behavior */
(function () {
  'use strict';

  function applyStoryLanguage(lang) {
    const isEn = lang === 'en';
    const values = {
      story_label: isEn ? 'THE STORY' : 'THE STORY',
      story_desc: isEn
        ? 'Miracle Shot follows ordinary children who are often left out because they are different. Through a futsal community, they discover their own light and the gifts God has given them.<br><br>After losing his former glory and facing the closure of his after-school sports class, Coach Lee gathers a group of unlikely children with one goal: to win a national youth futsal tournament.'
        : '남들과 조금 다르다는 이유로 소외받던 평범한 아이들이 <b>풋살 공동체</b>를 통해 자신만의 진짜 빛과 <b>하나님이 주신 달란트</b>를 발견해가는 성장 드라마입니다.<br><br>과거의 영광을 잃고 방과 후 체육 교실마저 폐지될 위기에 놓인 <b>이 코치</b>는 전국 유소년 풋살대회 우승을 목표로 오합지졸 아이들을 모으기 시작합니다.',
      world_sec_title: isEn ? 'World & Story' : '세계관과 이야기',
      world_label: 'THE WORLD',
      world_title: isEn ? 'A Story of Ordinary Kids Finding Their Light' : '평범한 아이들이 빛을 찾는 이야기',
      world_desc: isEn
        ? 'Miracle Shot is not a story about perfect heroes. It is about children who feel excluded because they are different, learning to accept one another and discovering their gifts within a community. On a small futsal court, they become teammates who help one another discover what is possible.'
        : 'Miracle Shot은 특별한 영웅이 태어나는 이야기가 아니라, <strong>남들과 조금 다르다는 이유로 소외받던 아이들</strong>이 서로의 다름을 받아들이고 공동체 안에서 자신의 재능을 발견해가는 이야기입니다. 좁은 풋살 코트에서 아이들은 경쟁자가 아니라 서로의 가능성을 발견하게 하는 동료가 됩니다.'
    };

    Object.keys(values).forEach(function (key) {
      document.querySelectorAll('[data-i18n="' + key + '"]').forEach(function (el) {
        el.innerHTML = values[key];
      });
    });
  }

  function applyMobileCardMode() {
    if (!document.getElementById('miracleshot-mobile-card-fix')) {
      const style = document.createElement('style');
      style.id = 'miracleshot-mobile-card-fix';
      style.textContent = `
        @media (max-width: 900px) {
          .char-card:hover { transform: none !important; box-shadow: none !important; }
          .char-card:hover .char-photo { opacity: 1 !important; }
          .char-card:hover .bible-photo { opacity: 0 !important; }
          .char-card.flipped .char-photo { opacity: 0 !important; }
          .char-card.flipped .bible-photo { opacity: 1 !important; }
          .char-card.flipped:hover .char-photo { opacity: 0 !important; }
          .char-card.flipped:hover .bible-photo { opacity: 1 !important; }
          .char-card { -webkit-tap-highlight-color: transparent; }
        }
        @media (min-width: 901px) {
          .char-card:hover .char-photo { opacity: 0 !important; }
          .char-card:hover .bible-photo { opacity: 1 !important; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  function bindLanguage() {
    window.onLangChange = function (lang) {
      applyStoryLanguage(lang);
      applyMobileCardMode();
    };

    document.querySelectorAll('.lang-btn').forEach(function (button) {
      if (button.dataset.miracleLangBound === 'true') return;
      button.dataset.miracleLangBound = 'true';
      button.addEventListener('click', function () {
        const lang = button.dataset.lang === 'en' ? 'en' : 'ko';
        setTimeout(function () { applyStoryLanguage(lang); }, 0);
      });
    });

    const lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    applyStoryLanguage(lang);
  }

  function init() {
    applyMobileCardMode();
    bindLanguage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
