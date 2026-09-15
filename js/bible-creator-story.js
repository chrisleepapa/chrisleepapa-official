(() => {
  'use strict';

  function injectBibleCreatorStory() {
    if (document.getElementById('bible-creator-story')) return;

    const footer = document.querySelector('footer');
    const section = document.createElement('section');
    section.id = 'bible-creator-story';
    section.setAttribute('aria-labelledby', 'bible-creator-story-title');
    section.style.cssText = [
      'max-width:900px',
      'margin:72px auto 48px',
      'padding:0 24px',
      'font-family:Pretendard, Noto Serif KR, sans-serif'
    ].join(';');

    const responsiveStyle = document.createElement('style');
    responsiveStyle.textContent = `
      #bible-creator-story,
      #bible-creator-story * { box-sizing:border-box; }
      #bible-creator-story article { overflow-wrap:break-word; word-break:normal; }
      #bible-creator-story p { margin:0 0 18px; }
      #bible-creator-story h3 { word-break:keep-all; overflow-wrap:normal; }
      #bible-creator-story > div > div:last-child { min-width:0; }

      @media (max-width:700px) {
        #bible-creator-story {
          width:100%;
          max-width:100%;
          margin:46px auto 34px !important;
          padding:0 14px !important;
          overflow:hidden;
        }
        #bible-creator-story > div {
          padding-top:30px !important;
        }
        #bible-creator-story > div > div:first-child {
          font-size:.62rem !important;
          line-height:1.5 !important;
          letter-spacing:2px !important;
          margin-bottom:10px !important;
          word-break:keep-all;
        }
        #bible-creator-story-title {
          font-size:1.28rem !important;
          line-height:1.42 !important;
          letter-spacing:.5px !important;
          margin-bottom:22px !important;
          word-break:keep-all;
          overflow-wrap:normal;
        }
        #bible-creator-story article {
          width:100%;
          max-width:100%;
          font-size:.9rem !important;
          line-height:1.82 !important;
          word-break:normal;
          overflow-wrap:break-word;
        }
        #bible-creator-story article h3 {
          font-size:1.05rem !important;
          line-height:1.55 !important;
          letter-spacing:0 !important;
          margin:27px 0 11px !important;
          word-break:keep-all;
          overflow-wrap:normal;
        }
        #bible-creator-story article p {
          margin:0 0 16px !important;
          word-break:normal;
          overflow-wrap:break-word;
        }
        #bible-creator-story article strong,
        #bible-creator-story article code,
        #bible-creator-story article a {
          overflow-wrap:anywhere;
        }
        #bible-creator-story article > div {
          width:100% !important;
          max-width:100% !important;
          grid-template-columns:1fr !important;
          gap:10px !important;
          margin:16px 0 22px !important;
        }
        #bible-creator-story article > div > div {
          width:100% !important;
          min-width:0 !important;
          padding:15px 14px !important;
          font-size:.84rem !important;
          line-height:1.72 !important;
          overflow-wrap:break-word;
        }
        #bible-creator-story article > div > div strong {
          font-size:.92rem;
        }
        #bible-creator-story article > div[style*="border-left"] {
          display:block !important;
          padding:15px 14px !important;
          font-size:.8rem !important;
          line-height:1.72 !important;
        }
        #bible-creator-story article > div[style*="border-left"] p {
          margin-bottom:8px !important;
        }
      }

      @media (max-width:390px) {
        #bible-creator-story {
          padding-left:11px !important;
          padding-right:11px !important;
        }
        #bible-creator-story > div {
          padding-top:26px !important;
        }
        #bible-creator-story-title {
          font-size:1.2rem !important;
        }
        #bible-creator-story article {
          font-size:.86rem !important;
          line-height:1.8 !important;
        }
        #bible-creator-story article h3 {
          font-size:1rem !important;
          line-height:1.52 !important;
        }
        #bible-creator-story article > div > div {
          padding:14px 13px !important;
          font-size:.81rem !important;
        }
      }
    `;
    document.head.appendChild(responsiveStyle);

    section.innerHTML = `
      <div style="border-top:1px solid rgba(201,168,76,.28);padding-top:46px">
        <div style="font-family:Cinzel,serif;color:#c9a84c;font-size:.78rem;letter-spacing:3px;margin-bottom:14px">THE MAKING OF BIBLE IN MY HAND</div>
        <h2 id="bible-creator-story-title" style="font-family:Cinzel,serif;color:#eee8d8;font-size:clamp(1.35rem,3vw,2rem);letter-spacing:1.5px;line-height:1.35;margin:0 0 28px">Why I Made Bible in my hand</h2>

        <article style="color:#d0ccc4;line-height:2;font-size:.97rem">
          <h3 style="color:#e8d08a;font-family:Cormorant Garamond,Noto Serif KR,serif;font-size:1.35rem;margin:34px 0 12px">1. 성경을 ‘읽는 것’에서 끝내고 싶지 않았습니다</h3>
          <p>성경을 읽다 보면 한 구절이 오래 마음에 남을 때가 있습니다. 다시 찾고 싶어서 책장을 넘기고, 같은 구절에 표시를 남기고, 그때의 생각을 메모해 두기도 합니다. 저는 그런 작은 기록들이 시간이 지나면서 하나의 믿음의 기록이 된다고 생각했습니다.</p>
          <p>그래서 <strong style="color:#e8d08a">Bible in my hand</strong>를 만들 때 단순히 성경 본문을 웹페이지에 보여주는 것으로 끝내고 싶지 않았습니다. ‘오늘 무엇을 읽었는가’뿐 아니라 ‘무엇이 마음에 남았는가’를 다시 찾아갈 수 있는 개인적인 읽기 공간을 만들고 싶었습니다.</p>

          <h3 style="color:#e8d08a;font-family:Cormorant Garamond,Noto Serif KR,serif;font-size:1.35rem;margin:34px 0 12px">2. 제가 원했던 것은 작은 성경 읽기 도구였습니다</h3>
          <p>처음부터 거대한 성경 서비스나 복잡한 소셜 플랫폼을 만들려고 한 것은 아닙니다. 오히려 책을 선택하고, 장을 열고, 본문을 읽고, 마음에 남는 구절을 표시하고, 다음에 다시 돌아오는 흐름이 자연스럽게 이어지는 것을 중요하게 생각했습니다.</p>
          <p>그래서 기능도 읽기의 흐름을 방해하지 않는 방향으로 정리했습니다. 형광펜, 북마크, 메모, 퀴즈, 일독 진행률 같은 기능은 서로 따로 존재하는 기능이 아니라 <strong style="color:#e8d08a">읽기 → 기억하기 → 기록하기 → 다시 읽기</strong>라는 하나의 흐름을 만들기 위한 장치입니다.</p>

          <h3 style="color:#e8d08a;font-family:Cormorant Garamond,Noto Serif KR,serif;font-size:1.35rem;margin:34px 0 12px">3. 주요 기능은 이렇습니다</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin:20px 0 24px">
            <div style="padding:20px;border:1px solid rgba(201,168,76,.16);background:rgba(255,255,255,.025)"><strong style="color:#e8d08a">형광펜</strong><br><span>다시 보고 싶은 구절을 눈에 남기는 기능입니다. 단순한 색칠보다 ‘나에게 중요한 말씀’을 다시 찾는 것을 목적으로 했습니다.</span></div>
            <div style="padding:20px;border:1px solid rgba(201,168,76,.16);background:rgba(255,255,255,.025)"><strong style="color:#e8d08a">북마크</strong><br><span>특정 구절을 나중에 다시 찾아가기 위한 개인적인 책갈피입니다. 읽기의 흐름을 끊지 않고 기억할 지점을 남기도록 했습니다.</span></div>
            <div style="padding:20px;border:1px solid rgba(201,168,76,.16);background:rgba(255,255,255,.025)"><strong style="color:#e8d08a">메모</strong><br><span>말씀을 읽은 순간의 생각과 기도를 기록할 수 있도록 했습니다. 본문과 개인적인 기록이 함께 남는 것을 중요하게 생각했습니다.</span></div>
            <div style="padding:20px;border:1px solid rgba(201,168,76,.16);background:rgba(255,255,255,.025)"><strong style="color:#e8d08a">퀴즈</strong><br><span>읽은 내용을 가볍게 되돌아볼 수 있는 장치입니다. 공부를 위한 시험보다 ‘방금 읽은 내용을 기억하고 있는가’를 확인하는 데 초점을 두었습니다.</span></div>
            <div style="padding:20px;border:1px solid rgba(201,168,76,.16);background:rgba(255,255,255,.025)"><strong style="color:#e8d08a">일독 진행률</strong><br><span>전체 1189장을 하나의 큰 목표로만 보지 않고, 지금 어디까지 왔는지 확인하면서 다음 읽기를 이어갈 수 있도록 했습니다.</span></div>
          </div>

          <h3 style="color:#e8d08a;font-family:Cormorant Garamond,Noto Serif KR,serif;font-size:1.35rem;margin:34px 0 12px">4. 본문 데이터는 공개적으로 접근 가능한 데이터를 바탕으로 연결했습니다</h3>
          <p>이 페이지의 성경 본문은 제가 직접 번역하거나 새로 작성한 것이 아닙니다. 현재 기본 성경 데이터는 공개 GitHub 프로젝트 <strong style="color:#e8d08a">stranger828/bibleAPI</strong>의 구조화된 JSON 데이터를 브라우저에서 불러오는 방식으로 연결되어 있습니다. 해당 프로젝트 README는 <strong>개역개정</strong> 데이터를 약 3만 1천여 구절의 JSON으로 제공한다고 설명합니다.</p>
          <p>또한 현재 <strong style="color:#e8d08a">야고보서 1~5장</strong>은 별도로 연결한 Supabase의 <code style="color:#e8d08a">bible_content</code> 테이블에서 장을 선택할 때 가져오도록 구성되어 있습니다. 즉, 이 사이트의 역할은 성경 번역 자체를 만드는 것이 아니라 공개적으로 제공되는 본문 데이터를 읽기·기록·진행 관리 기능과 연결하는 것입니다.</p>
          <div style="margin:20px 0;padding:18px 20px;border-left:2px solid #c9a84c;background:rgba(201,168,76,.045);font-size:.9rem">
            <div style="color:#e8d08a;margin-bottom:8px;font-weight:600">DATA SOURCE &amp; RIGHTS NOTE</div>
            <p style="margin:0 0 9px">본문 데이터 출처: <a href="https://github.com/stranger828/bibleAPI" target="_blank" rel="noopener noreferrer" style="color:#e8d08a">stranger828/bibleAPI — Bible Web Search</a></p>
            <p style="margin:0">해당 프로젝트 README는 개역개정 성경 데이터의 저작권이 대한성서공회에 있을 수 있으며 상업적 이용 시 확인이 필요하다고 안내합니다. 따라서 이 사이트는 데이터 출처와 권리 안내를 명시하고, 성경 본문 자체를 이 사이트의 독창적 창작물로 주장하지 않습니다.</p>
          </div>

          <h3 style="color:#e8d08a;font-family:Cormorant Garamond,Noto Serif KR,serif;font-size:1.35rem;margin:34px 0 12px">5. 만드는 과정에서 중요했던 것은 기능보다 흐름이었습니다</h3>
          <p>웹에서 성경을 보여주는 것 자체는 어렵지 않습니다. 하지만 실제로 사용하려면 데이터가 안정적으로 로드되어야 하고, 책과 장을 빠르게 선택할 수 있어야 하며, 읽던 내용을 다시 이어갈 수 있어야 합니다. 특히 본문 데이터가 외부 소스에서 들어오는 구조에서는 로딩 실패나 네트워크 상황도 고려해야 했습니다.</p>
          <p>그래서 이 페이지는 본문을 한 번 불러온 뒤 사용할 수 있도록 캐시를 활용하고, 데이터가 준비된 뒤 책과 장을 렌더링하는 흐름을 두었습니다. 특정 장을 별도의 데이터베이스에서 가져오는 기능도 추가하면서, 단순한 정적 페이지가 아니라 <strong style="color:#e8d08a">데이터 → 화면 → 개인 기록</strong>이 연결되는 작은 웹 앱으로 발전시켰습니다.</p>

          <h3 style="color:#e8d08a;font-family:Cormorant Garamond,Noto Serif KR,serif;font-size:1.35rem;margin:34px 0 12px">6. 만들면서 배운 것</h3>
          <p>처음에는 기능을 하나씩 추가하면 좋은 성경 앱이 될 것이라고 생각했습니다. 하지만 작업을 이어갈수록 중요한 것은 기능의 숫자가 아니라 사용자가 다음에 무엇을 하게 되는지라는 것을 알게 되었습니다.</p>
          <p>그래서 지금도 이 페이지를 완성된 제품이라기보다 계속 다듬어 가는 작업으로 보고 있습니다. 어떤 기능이 정말 필요한지, 읽는 흐름을 방해하지 않는지, 기록이 실제로 다시 사용되는지를 살펴보면서 조금씩 수정하고 있습니다.</p>

          <h3 style="color:#e8d08a;font-family:Cormorant Garamond,Noto Serif KR,serif;font-size:1.35rem;margin:34px 0 12px">7. Bible in my hand가 제 창작 안에서 갖는 의미</h3>
          <p>저에게 이 프로젝트는 단순한 웹 기능 하나가 아닙니다. 음악을 만들고, 글을 쓰고, 영상을 만들면서도 결국 제가 계속 돌아가고 싶은 곳이 무엇인지 생각하게 한 작업입니다.</p>
          <p>그래서 <strong style="color:#e8d08a">WORSHIP</strong>에서 노래로 고백했던 마음과, <strong style="color:#e8d08a">JOURNAL</strong>에 글로 기록했던 생각이 이곳에서는 말씀을 읽고 기록하는 형태로 이어집니다. 서로 다른 페이지처럼 보이지만 제가 무엇을 만들고 왜 만드는지를 따라가 보면 하나의 같은 방향을 가지고 있습니다.</p>
          <p>저는 성경을 더 많이 보여주는 서비스를 만들고 싶은 것이 아니라, 한 사람이 말씀 앞에 다시 앉을 수 있도록 돕는 작은 공간을 만들고 싶었습니다. <strong style="color:#e8d08a">Bible in my hand</strong>라는 이름에도 그 마음을 담았습니다.</p>
        </article>
      </div>
    `;

    if (footer) footer.parentNode.insertBefore(section, footer);
    else document.body.appendChild(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBibleCreatorStory, { once: true });
  } else {
    injectBibleCreatorStory();
  }
})();
