/* Journal 6 ↔ Worship cross-link */
'use strict';
(() => {
  if ((location.pathname.split('/').pop() || '').replace(/\.html$/i, '').toLowerCase() !== 'journal-6') return;

  const copy = {
    ko: {
      kicker: 'WORSHIP ARCHIVE',
      title: '이 기도가 시작된 곳 — 나의 찬양',
      text: '이 글에 기록한 기도는 Worship 프로젝트와 따로 떨어진 이야기가 아닙니다. 삶이 무너졌던 자리에서 예수님의 보혈과 하나님의 신실하심을 붙들며 시작한 찬양들이 이 기도의 바탕이 되었습니다. 실제 찬양과 가사를 함께 들으며 그 고백의 출발점을 만나보세요.',
      link: 'WORSHIP ARCHIVE 보러가기 →'
    },
    en: {
      kicker: 'WORSHIP ARCHIVE',
      title: 'Where This Prayer Began — My Worship',
      text: 'The prayer recorded in this journal is not separate from the Worship project. These songs began in a season when life felt broken, as I held on to the blood of Jesus and the faithfulness of God. Listen to the worship songs and read the lyrics to see where this confession began.',
      link: 'VISIT THE WORSHIP ARCHIVE →'
    }
  };

  function render() {
    if (document.getElementById('journal6-worship-link')) return true;
    const anchor = document.querySelector('.article-footer') || document.querySelector('.journal-nav');
    if (!anchor) return false;
    const lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    const c = copy[lang];
    const section = document.createElement('section');
    section.id = 'journal6-worship-link';
    section.setAttribute('aria-labelledby', 'journal6-worship-title');
    section.innerHTML = `<div class="j6w-kicker">${c.kicker}</div><h2 id="journal6-worship-title">${c.title}</h2><p>${c.text}</p><a href="/worship">${c.link}</a>`;
    anchor.parentNode.insertBefore(section, anchor);
    return true;
  }

  if (!document.getElementById('journal6-worship-link-style')) {
    const style = document.createElement('style');
    style.id = 'journal6-worship-link-style';
    style.textContent = `#journal6-worship-link{margin:0 0 32px;padding:30px 28px;border:1px solid rgba(201,168,76,.22);border-radius:20px;background:linear-gradient(135deg,rgba(201,168,76,.055),rgba(10,10,18,.72));text-align:center}#journal6-worship-link .j6w-kicker{margin-bottom:10px;color:#c9a84c;font:700 .65rem Cinzel,serif;letter-spacing:.22em}#journal6-worship-link h2{margin:0 0 14px;color:#f8f3e8;font:500 clamp(1.2rem,3vw,1.55rem)/1.5 'Noto Serif KR',serif;word-break:keep-all}#journal6-worship-link p{margin:0 auto 20px;max-width:650px;color:#aaa5ad;font:400 .9rem/1.9 Pretendard,'Noto Serif KR',sans-serif;word-break:keep-all}#journal6-worship-link a{display:inline-flex;padding:10px 17px;border:1px solid rgba(232,208,138,.38);border-radius:999px;color:#e8d08a;font:600 .72rem/1.4 Pretendard,sans-serif;letter-spacing:.03em}#journal6-worship-link a:hover{border-color:#e8d08a;background:rgba(201,168,76,.08)}@media(max-width:700px){#journal6-worship-link{padding:24px 18px}#journal6-worship-link p{font-size:.86rem;line-height:1.85}}`;
    document.head.appendChild(style);
  }

  let attempts = 0;
  const tryRender = () => { if (render() || attempts++ > 40) return; setTimeout(tryRender, 250); };
  const observer = new MutationObserver(() => { if (document.documentElement) render(); });
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['lang'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tryRender, { once: true });
  else tryRender();
})();
