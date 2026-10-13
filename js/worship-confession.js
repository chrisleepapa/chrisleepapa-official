(() => {
  'use strict';

  function removeDuplicateStorySection() {
    document.querySelectorAll('main.container .section-heading h2').forEach((heading) => {
      const text = (heading.textContent || '').replace(/\s+/g, ' ').trim();
      if (text === '앨범을 만들게 된 이야기' || text.includes('앨범을 만들게 된 이야기')) {
        const section = heading.closest('section');
        if (section) section.remove();
      }
    });
  }

  function mount() {
    removeDuplicateStorySection();
    if (document.getElementById('worship-confession')) return;

    const intro = document.querySelector('main.container .intro');
    if (!intro) return;

    const section = document.createElement('section');
    section.id = 'worship-confession';
    section.className = 'worship-confession';
    section.setAttribute('aria-labelledby', 'worship-confession-title');
    section.innerHTML = `
      <div class="worship-confession-inner">
        <div class="worship-confession-kicker" data-worship-i18n="kicker">THE MAKING OF WORSHIP</div>
        <div class="worship-confession-line" aria-hidden="true"></div>
        <h2 id="worship-confession-title" data-worship-i18n="title">Why I Made Worship</h2>
        <article class="worship-story">
          <h3 data-worship-i18n="storyTitle">그날, 나는 죽었고<br><span>다시 살아났습니다</span></h3>
          <p class="worship-story-lead" data-worship-i18n="lead1">세상의 모든 것이 무너진 것 같았던 그날,<br>이전의 나는 죽었습니다.</p>
          <p data-worship-i18n="lead2">그리고 예수 그리스도의 보혈로<br>다시 살아난 하나님의 자녀로<br>새로운 삶을 시작했습니다.</p>
          <p class="worship-story-emphasis" data-worship-i18n="emphasis"><strong>WORSHIP은 바로 그 자리에서 시작되었습니다.</strong></p>
          <h4 data-worship-i18n="heading1">1. 왜 찬양을 만들기 시작했는가</h4>
          <p data-worship-i18n="paragraph1">처음부터 앨범을 만들겠다고 계획했던 것은 아니었습니다. 다시 살아난 삶을 살아가면서, 마음속에 쌓여 있던 감사와 회개와 고백을 어떻게 하나님께 올려드릴 수 있을까 생각했습니다.</p>
          <p data-worship-i18n="paragraph2">그때 제게 가장 자연스러운 언어가 노래였습니다. 그래서 한 곡씩 만들기 시작했습니다. 누군가에게 들려주기 위한 음악보다, 먼저 하나님 앞에서 제 마음을 고백하기 위한 찬양이었습니다.</p>
          <h4 data-worship-i18n="heading2">2. 한 곡의 고백이 앨범이 되었습니다</h4>
          <p data-worship-i18n="paragraph3">한 곡을 만들고 나면 또 다른 이야기가 떠올랐습니다. 지나온 시간을 돌아보며 부르고 싶은 노래가 생겼고, 지금의 삶에서 드리고 싶은 기도가 생겼고, 앞으로 걸어갈 길을 하나님께 맡기며 부르고 싶은 찬양도 생겼습니다.</p>
          <p data-worship-i18n="paragraph4">그렇게 각각의 노래가 하나의 흐름을 이루기 시작했습니다. <strong>나의 찬양 Vol.1, Vol.2, Vol.3</strong>는 단순히 곡을 모아놓은 앨범이 아니라, 한 사람이 하나님을 만나고 다시 살아난 뒤 계속해서 드려 온 고백의 기록입니다.</p>
          <div class="worship-story-cards">
            <div><strong data-worship-i18n="card1Title">나의 찬양 Vol.1</strong><span data-worship-i18n="card1Desc">처음 시작된 고백과 찬양</span></div>
            <div><strong data-worship-i18n="card2Title">나의 찬양 Vol.2</strong><span data-worship-i18n="card2Desc">더 깊어진 믿음과 삶의 이야기</span></div>
            <div><strong data-worship-i18n="card3Title">나의 찬양 Vol.3</strong><span data-worship-i18n="card3Desc">오늘도 계속되는 기도와 예배</span></div>
          </div>
          <h4 data-worship-i18n="heading3">3. 그래서 이 앨범들은 ‘나의 이야기’입니다</h4>
          <p data-worship-i18n="paragraph5">제가 만든 찬양에는 완벽하게 믿음이 있는 사람의 이야기가 담겨 있지 않습니다. 흔들리고, 넘어지고, 다시 하나님께 돌아오는 사람의 이야기가 담겨 있습니다.</p>
          <p data-worship-i18n="paragraph6">그래서 어떤 곡은 감사이고, 어떤 곡은 회개이며, 어떤 곡은 기도입니다. 각각의 노래가 다른 표정을 가지고 있지만 그 중심에는 하나의 고백이 있습니다. <strong>내가 하나님을 붙잡은 것이 아니라, 하나님께서 먼저 나를 붙잡으셨다는 것.</strong></p>
          <h4 data-worship-i18n="heading4">4. 내가 만들고 싶은 Worship</h4>
          <p data-worship-i18n="paragraph7">저에게 Worship은 단순히 찬양을 재생하는 페이지가 아닙니다. 한 곡을 듣다가 자신의 이야기를 떠올리고, 잠시 멈춰 기도하고, 다시 하나님을 바라볼 수 있는 작은 공간이었으면 합니다.</p>
          <p data-worship-i18n="paragraph8">그래서 이곳에는 제가 만든 앨범과 노래뿐 아니라, 그 노래가 어디에서 시작되었는지에 대한 이야기도 함께 남기고 있습니다. 음악만 남기는 것이 아니라 <strong>그 음악을 만들게 한 마음까지 기록하는 것</strong>이 제가 이 아카이브를 만드는 이유입니다.</p>
          <blockquote data-worship-i18n="quote">“나의 찬양은 내가 하나님께 무엇을 드리는 이야기가 아니라,<br class="desktop-break"> 하나님께서 먼저 나에게 무엇을 주셨는지를 고백하는 노래입니다.”</blockquote>
        </article>
      </div>
    </section>`;


    const worshipStoryCopy = {
      ko: {
        kicker:'THE MAKING OF WORSHIP', title:'Why I Made Worship',
        storyTitle:'그날, 나는 죽었고<br><span>다시 살아났습니다</span>',
        lead1:'세상의 모든 것이 무너진 것 같았던 그날,<br>이전의 나는 죽었습니다.',
        lead2:'그리고 예수 그리스도의 보혈로<br>다시 살아난 하나님의 자녀로<br>새로운 삶을 시작했습니다.',
        emphasis:'<strong>WORSHIP은 바로 그 자리에서 시작되었습니다.</strong>',
        heading1:'1. 왜 찬양을 만들기 시작했는가',
        paragraph1:'처음부터 앨범을 만들겠다고 계획했던 것은 아니었습니다. 다시 살아난 삶을 살아가면서, 마음속에 쌓여 있던 감사와 회개와 고백을 어떻게 하나님께 올려드릴 수 있을까 생각했습니다.',
        paragraph2:'그때 제게 가장 자연스러운 언어가 노래였습니다. 그래서 한 곡씩 만들기 시작했습니다. 누군가에게 들려주기 위한 음악보다, 먼저 하나님 앞에서 제 마음을 고백하기 위한 찬양이었습니다.',
        heading2:'2. 한 곡의 고백이 앨범이 되었습니다',
        paragraph3:'한 곡을 만들고 나면 또 다른 이야기가 떠올랐습니다. 지나온 시간을 돌아보며 부르고 싶은 노래가 생겼고, 지금의 삶에서 드리고 싶은 기도가 생겼고, 앞으로 걸어갈 길을 하나님께 맡기며 부르고 싶은 찬양도 생겼습니다.',
        paragraph4:'그렇게 각각의 노래가 하나의 흐름을 이루기 시작했습니다. <strong>나의 찬양 Vol.1, Vol.2, Vol.3</strong>는 단순히 곡을 모아놓은 앨범이 아니라, 한 사람이 하나님을 만나고 다시 살아난 뒤 계속해서 드려 온 고백의 기록입니다.',
        card1Title:'나의 찬양 Vol.1',card1Desc:'처음 시작된 고백과 찬양',
        card2Title:'나의 찬양 Vol.2',card2Desc:'더 깊어진 믿음과 삶의 이야기',
        card3Title:'나의 찬양 Vol.3',card3Desc:'오늘도 계속되는 기도와 예배',
        heading3:'3. 그래서 이 앨범들은 ‘나의 이야기’입니다',
        paragraph5:'제가 만든 찬양에는 완벽하게 믿음이 있는 사람의 이야기가 담겨 있지 않습니다. 흔들리고, 넘어지고, 다시 하나님께 돌아오는 사람의 이야기가 담겨 있습니다.',
        paragraph6:'그래서 어떤 곡은 감사이고, 어떤 곡은 회개이며, 어떤 곡은 기도입니다. 각각의 노래가 다른 표정을 가지고 있지만 그 중심에는 하나의 고백이 있습니다. <strong>내가 하나님을 붙잡은 것이 아니라, 하나님께서 먼저 나를 붙잡으셨다는 것.</strong>',
        heading4:'4. 내가 만들고 싶은 Worship',
        paragraph7:'저에게 Worship은 단순히 찬양을 재생하는 페이지가 아닙니다. 한 곡을 듣다가 자신의 이야기를 떠올리고, 잠시 멈춰 기도하고, 다시 하나님을 바라볼 수 있는 작은 공간이었으면 합니다.',
        paragraph8:'그래서 이곳에는 제가 만든 앨범과 노래뿐 아니라, 그 노래가 어디에서 시작되었는지에 대한 이야기도 함께 남기고 있습니다. 음악만 남기는 것이 아니라 <strong>그 음악을 만들게 한 마음까지 기록하는 것</strong>이 제가 이 아카이브를 만드는 이유입니다.',
        quote:'“나의 찬양은 내가 하나님께 무엇을 드리는 이야기가 아니라,<br class="desktop-break"> 하나님께서 먼저 나에게 무엇을 주셨는지를 고백하는 노래입니다.”'
      },
      en: {
        kicker:'THE MAKING OF WORSHIP', title:'Why I Made Worship',
        storyTitle:'That day, I died<br><span>and was born again.</span>',
        lead1:'On the day when it felt as though everything in my world had fallen apart,<br>the person I had been before was no longer the same.',
        lead2:'Through the blood of Jesus Christ,<br>I was given new life as a child of God<br>and began to walk a new path.',
        emphasis:'<strong>WORSHIP began right there.</strong>',
        heading1:'1. Why I Started Making Worship Music',
        paragraph1:'I did not begin with a plan to make an album. As I learned to live this new life, I kept asking how I could bring my gratitude, repentance, and confession before God.',
        paragraph2:'Music became the most natural language for me. So I began creating one song at a time—not first as music for an audience, but as worship offered from my heart before God.',
        heading2:'2. One Confession Became an Album',
        paragraph3:'After one song came another. I found songs I wanted to sing while looking back on the past, prayers I wanted to offer for the life I was living, and praise to sing as I entrusted the road ahead to God.',
        paragraph4:'Gradually, these individual songs began to form a story. <strong>My Hymn Vol.1, Vol.2, and Vol.3</strong> are more than collections of songs; they record the confessions I have continued to offer since encountering God and being given new life.',
        card1Title:'My Hymn Vol.1',card1Desc:'The first songs of confession and praise',
        card2Title:'My Hymn Vol.2',card2Desc:'A deeper faith and the story of everyday life',
        card3Title:'My Hymn Vol.3',card3Desc:'Prayer and worship that continue today',
        heading3:'3. These Albums Are Part of My Story',
        paragraph5:'My worship songs do not tell the story of someone with perfect faith. They tell the story of someone who struggles, stumbles, and returns to God again.',
        paragraph6:'Some songs express gratitude, others repentance, and others prayer. Each has its own character, yet they share one confession: <strong>I was not the one who first held on to God; God was the One who held on to me first.</strong>',
        heading4:'4. The Worship I Hope to Create',
        paragraph7:'To me, Worship is more than a page where songs are played. I hope it can be a small space where someone hears a song, remembers their own story, pauses to pray, and turns their eyes to God again.',
        paragraph8:'That is why I share not only the albums and songs I have made, but also the stories of where they began. I want to preserve not only the music, but <strong>the heart that inspired it</strong>—that is why I am building this archive.',
        quote:'“My worship is not a story about what I give to God,<br class="desktop-break"> but a confession of what God gave to me first.”'
      }
    };
    function applyWorshipStoryLanguage(lang) {
      const root = document.getElementById('worship-confession');
      if (!root) return;
      const copy = worshipStoryCopy[lang === 'en' ? 'en' : 'ko'];
      root.querySelectorAll('[data-worship-i18n]').forEach((element) => {
        const key = element.getAttribute('data-worship-i18n');
        if (Object.prototype.hasOwnProperty.call(copy, key)) element.innerHTML = copy[key];
      });
    }
    const previousOnLangChange = window.onLangChange;
    window.onLangChange = function(lang) {
      if (typeof previousOnLangChange === 'function') previousOnLangChange(lang);
      applyWorshipStoryLanguage(lang);
    };

    const style = document.createElement('style');
    style.id = 'worship-confession-style';
    style.textContent = `
      .worship-confession{position:relative;margin:0 0 76px;padding:76px 28px 82px;overflow:hidden;border-top:1px solid rgba(201,168,76,.18);border-bottom:1px solid rgba(201,168,76,.18);background:radial-gradient(circle at 50% 0%,rgba(201,168,76,.11),transparent 48%),linear-gradient(180deg,rgba(255,255,255,.018),rgba(255,255,255,0));text-align:center}
      .worship-confession::before{content:'✦';position:absolute;top:22px;left:50%;transform:translateX(-50%);color:rgba(201,168,76,.42);font-size:12px}
      .worship-confession-inner{max-width:900px;margin:0 auto}.worship-confession-kicker{color:#c9a84c;font:700 .78rem/1.5 Cinzel,serif;letter-spacing:.25em;margin-bottom:14px}.worship-confession-line{width:56px;height:1px;margin:0 auto 24px;background:linear-gradient(90deg,transparent,#c9a84c,transparent)}
      .worship-confession h2{margin:0 0 42px;color:#eee8d8;font-family:Cinzel,'Noto Serif KR',serif;font-size:clamp(1.45rem,3.4vw,2.15rem);font-weight:500;letter-spacing:1.5px;line-height:1.35}
      .worship-story{color:#d0ccc4;font-family:Pretendard,'Noto Serif KR',sans-serif;line-height:2;font-size:.98rem;text-align:left}.worship-story h3{margin:0 0 30px;color:#f5f1e8;font-family:'Noto Serif KR','Noto Serif',serif;font-size:clamp(2rem,5vw,3.7rem);font-weight:500;line-height:1.4;letter-spacing:-.025em;text-align:center;text-shadow:0 0 34px rgba(201,168,76,.12)}.worship-story h3 span{color:#d9b95b}.worship-story p{margin:0 0 22px}.worship-story-lead{color:#e1e0dc;font-family:'Noto Serif KR',serif;font-size:1.05rem;line-height:2;text-align:center;margin-bottom:26px!important}.worship-story-lead + p{text-align:center;margin-bottom:28px}.worship-story-emphasis{margin:34px 0 42px!important;color:#eee5ca;text-align:center;font-family:'Noto Serif KR',serif;font-size:1.08rem}.worship-story h4{margin:42px 0 12px;color:#e8d08a;font-family:'Cormorant Garamond','Noto Serif KR',serif;font-size:1.35rem;line-height:1.45;font-weight:600}.worship-story strong{color:#e8d08a;font-weight:600}
      .worship-story-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:28px 0 36px}.worship-story-cards div{padding:22px 18px;border:1px solid rgba(201,168,76,.16);background:rgba(255,255,255,.025);text-align:center}.worship-story-cards strong{display:block;margin-bottom:8px;font-family:Cinzel,'Noto Serif KR',serif;font-size:.9rem;letter-spacing:.04em}.worship-story-cards span{color:#aaaeb7;font-size:.88rem;line-height:1.7}
      .worship-story blockquote{position:relative;margin:46px 0 0;padding:30px 20px 0;border:0;color:#d9b95b;font-family:'Noto Serif KR','Noto Serif',serif;font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.9;font-weight:600;letter-spacing:-.015em;text-align:center;text-shadow:0 0 28px rgba(201,168,76,.13)}.worship-story blockquote::before{content:'';position:absolute;top:0;left:50%;width:90px;height:1px;transform:translateX(-50%);background:linear-gradient(90deg,transparent,rgba(201,168,76,.8),transparent)}
      @media(max-width:760px){.worship-confession{margin-bottom:56px;padding:60px 18px 66px}.worship-confession h2{margin-bottom:34px}.worship-story{font-size:.95rem}.worship-story h4{margin-top:36px}.worship-story-cards{grid-template-columns:1fr;gap:10px}.worship-story-cards div{padding:18px 16px}.desktop-break{display:none}}
    `;
    document.head.appendChild(style);
    intro.replaceWith(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
