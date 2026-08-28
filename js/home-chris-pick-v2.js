/* Home: Chris's Pick — one deterministic random work per day */
'use strict';
(() => {
  const PICKS = [
    {
      type: 'MUSIC', icon: '♫', title: 'Miracle Shot', sub: 'Chris LEE.PAPA · Single',
      desc: {
        ko: '남들과 조금 다르다는 이유로 소외받던 아이들이 풋살 공동체를 통해 하나님이 주신 달란트와 자신만의 빛을 발견해가는 성장 드라마를 음악으로 담았습니다. 각자의 상처와 재능을 가진 네 아이가 풋살 공동체 안에서 서로의 다름을 받아들이고, 자신의 진짜 빛을 발견해가는 이야기입니다.',
        en: 'A musical story about four children who, after being isolated for being different, discover their God-given gifts and their own light through a futsal community. Each child carries different wounds and talents, and together they learn to embrace their differences and discover who they truly are.'
      },
      image: 'https://i.scdn.co/image/ab67616d0000b2739ca1fa71b9788981b26ad329',
      href: 'miracleshot.html', action: { ko: '작품 보기', en: 'View Work' }
    },
    {
      type: 'BOOK', icon: '✦', title: 'SISTER SQUAD 1', sub: 'The Book of Whispers · Book 1',
      desc: {
        ko: '율이와 정이의 첫 번째 모험. 요정 마을 루미나에서 시작된 두 자매의 판타지 이야기.',
        en: 'The first adventure of Yuli and Jeong-i in the fantasy world of Lumina.'
      },
      image: '/images/sistersquad1.png?v=20260828',
      href: 'sistersquad.html', action: { ko: '1권 보러가기', en: 'Read Book 1' }
    },
    {
      type: 'BOOK', icon: '✦', title: 'SISTER SQUAD 2', sub: 'The Cursed Fairy Village · Book 2',
      desc: {
        ko: '율이와 정이, 그리고 아빠 크리스가 저주받은 요정 마을을 구하기 위해 떠나는 두 번째 모험.',
        en: 'The second adventure of Yuli, Jeong-i and Chris as they set out to save the cursed fairy village.'
      },
      image: '/images/sistersquad2_poster.jpg',
      href: 'sistersquad2.html', action: { ko: '2권 보러가기', en: 'Read Book 2' }
    },
    {
      type: 'WORSHIP', icon: '♩', title: '승리하리라', sub: 'Worship · CCM',
      desc: {
        ko: '다시 일어설 용기와 믿음을 노래합니다.',
        en: 'A worship song about courage, faith, and rising again.'
      },
      image: '/images/My hymn3.jpg',
      href: 'worship.html', action: { ko: '워십 보기', en: 'View Worship' }
    }
  ];

  const style = document.createElement('style');
  style.textContent = `
    #chris-pick{width:100%;box-sizing:border-box;padding:105px 20px 80px;background:radial-gradient(circle at 50% 35%,rgba(201,168,76,.08),transparent 38%),linear-gradient(180deg,#030305,#08080d);overflow:hidden}
    #chris-pick .clp-pick-content{width:100%;max-width:880px;margin:0 auto;box-sizing:border-box;text-align:center}
    .clp-pick-heading{margin:0;color:#f8f3e8;font:600 clamp(2.4rem,7vw,4.8rem)/1.05 'Cormorant Garamond',serif;overflow-wrap:break-word;word-break:keep-all}
    .clp-pick-date{margin:12px 0 30px;color:rgba(240,236,228,.42);font:.72rem Pretendard,sans-serif;letter-spacing:.2em;overflow-wrap:break-word}
    .clp-pick-card{display:grid;grid-template-columns:300px minmax(0,1fr);width:100%;max-width:780px;margin:0 auto;overflow:hidden;border:1px solid rgba(201,168,76,.34);border-radius:24px;background:rgba(8,8,13,.88);box-shadow:0 30px 90px rgba(0,0,0,.6);text-align:left;box-sizing:border-box}
    .clp-pick-art{position:relative;min-height:300px;background:#111;overflow:hidden}
    .clp-pick-art img{display:block;width:100%;height:100%;object-fit:cover}
    .clp-pick-mark{position:absolute;right:18px;top:16px;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(3,3,5,.62);border:1px solid rgba(201,168,76,.35);color:#e8d08a}
    .clp-pick-body{padding:34px;display:flex;flex-direction:column;justify-content:center;min-width:0}
    .clp-pick-type{color:#c9a84c;font:700 .65rem Cinzel,serif;letter-spacing:.22em;margin-bottom:14px;overflow-wrap:break-word}
    .clp-pick-title{margin:0;color:#fff;font:600 clamp(2rem,4vw,3rem)/1.1 'Cormorant Garamond',serif;overflow-wrap:break-word;word-break:keep-all}
    .clp-pick-sub{margin:10px 0 15px;color:#e8d08a;font:.72rem Pretendard,sans-serif;overflow-wrap:break-word}
    .clp-pick-desc{margin:0;color:rgba(240,236,228,.62);font:.9rem/1.75 Pretendard,sans-serif;overflow-wrap:break-word;word-break:keep-all}
    .clp-pick-actions{display:flex;gap:9px;margin-top:25px;flex-wrap:wrap}
    .clp-pick-main{display:inline-flex;align-items:center;justify-content:center;padding:11px 18px;border-radius:22px;min-width:125px;background:#c9a84c;color:#090909;font:700 .76rem Pretendard,sans-serif;white-space:normal;text-align:center;overflow-wrap:break-word}
    .clp-pick-next{margin-top:18px;color:rgba(240,236,228,.34);font:.68rem/1.6 Pretendard,sans-serif;overflow-wrap:break-word;word-break:keep-all}
    @media(max-width:700px){
      #chris-pick{padding:95px 15px 65px}
      .clp-pick-card{grid-template-columns:1fr}
      .clp-pick-art{min-height:235px;max-height:300px}
      .clp-pick-body{padding:25px 22px 24px}
      .clp-pick-heading{font-size:3rem}
      .clp-pick-actions{flex-direction:column}
      .clp-pick-main{width:100%;box-sizing:border-box}
      .clp-pick-desc{font-size:.88rem;line-height:1.8}
    }
  `;
  document.head.appendChild(style);

  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function getDailyPick() {
    const key = getTodayKey();
    let hash = 2166136261;
    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    hash >>>= 0;
    return PICKS[hash % PICKS.length];
  }

  function render() {
    const target = document.getElementById('chris-pick');
    if (!target) return;
    const lang = window.getCurrentLang ? window.getCurrentLang() : 'ko';
    const d = new Date();
    const date = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
    const pick = getDailyPick();
    target.innerHTML = `
      <div class="clp-pick-content">
        <h1 class="clp-pick-heading">Chris's Pick</h1>
        <div class="clp-pick-date">${date} · ${lang==='ko'?'오늘의 선정 작품':'TODAY’S FEATURED WORK'}</div>
        <div class="clp-pick-card">
          <div class="clp-pick-art">
            <img src="${pick.image}" alt="${pick.title}" loading="eager">
            <span class="clp-pick-mark">${pick.icon}</span>
          </div>
          <div class="clp-pick-body">
            <div class="clp-pick-type">${pick.type}</div>
            <h2 class="clp-pick-title">${pick.title}</h2>
            <div class="clp-pick-sub">${pick.sub}</div>
            <p class="clp-pick-desc">${pick.desc[lang]}</p>
            <div class="clp-pick-actions">
              <a class="clp-pick-main" href="${pick.href}">${pick.action[lang]} →</a>
            </div>
          </div>
        </div>
        <div class="clp-pick-next">${lang==='ko'?'매일 전체 작품 중 하나를 자동으로 선정합니다.':'One work is automatically selected from the full featured collection each day.'}</div>
      </div>`;
  }

  const previous = window.onLangChange;
  window.onLangChange = function(lang) {
    if (typeof previous === 'function') previous(lang);
    render();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, {once:true});
  else render();
})();
