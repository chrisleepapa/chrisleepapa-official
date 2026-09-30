(() => {
  'use strict';

  const SET=[
    {ko:{q:'성경의 첫 번째 책은 무엇일까요?',o:['출애굽기','창세기','레위기','민수기'],a:1,n:'창세기는 성경의 첫 번째 책이며 창조와 아브라함, 이삭, 야곱, 요셉의 이야기를 담고 있습니다.',ref:[1,1]},en:{q:'What is the first book of the Bible?',o:['Exodus','Genesis','Leviticus','Numbers'],a:1,n:'Genesis is the first book of the Bible and includes the stories of creation, Abraham, Isaac, Jacob, and Joseph.',ref:[1,1]}},
    {ko:{q:'예수님께 세례를 베푼 사람은 누구일까요?',o:['베드로','세례 요한','바울','야고보'],a:1,n:'예수님은 요단강에서 세례 요한에게 세례를 받으셨습니다.',ref:[40,3]},en:{q:'Who baptized Jesus?',o:['Peter','John the Baptist','Paul','James'],a:1,n:'Jesus was baptized by John the Baptist in the Jordan River.',ref:[40,3]}},
    {ko:{q:'다음 중 복음서가 아닌 것은 무엇일까요?',o:['마태복음','마가복음','사도행전','요한복음'],a:2,n:'사도행전은 복음서가 아니라 예수님의 승천 이후 초대 교회의 이야기를 기록한 책입니다.',ref:[44,1]},en:{q:'Which of these is not one of the four Gospels?',o:['Matthew','Mark','Acts','John'],a:2,n:'Acts is not a Gospel; it records the story of the early church after Jesus’ ascension.',ref:[44,1]}},
    {ko:{q:'노아의 방주 이야기에서 홍수 후 언약의 표징은 무엇일까요?',o:['무지개','별','비둘기','구름'],a:0,n:'창세기에서 무지개는 홍수 후 언약의 표징으로 등장합니다.',ref:[1,9]},en:{q:'What sign did God give after the flood in Noah’s story?',o:['A rainbow','A star','A dove','A cloud'],a:0,n:'In Genesis, the rainbow is given as a sign of God’s covenant after the flood.',ref:[1,9]}},
    {ko:{q:'예수님이 태어나신 곳으로 알려진 도시는 어디일까요?',o:['나사렛','베들레헴','예루살렘','가버나움'],a:1,n:'복음서의 기록에 따르면 예수님은 유대 베들레헴에서 태어나셨습니다.',ref:[40,2]},en:{q:'Which city is traditionally identified as the birthplace of Jesus?',o:['Nazareth','Bethlehem','Jerusalem','Capernaum'],a:1,n:'According to the Gospel accounts, Jesus was born in Bethlehem of Judea.',ref:[40,2]}},
    {ko:{q:'구약성경에서 가장 긴 장으로 알려진 것은 무엇일까요?',o:['시편 23편','시편 119편','이사야 53장','창세기 1장'],a:1,n:'시편 119편은 성경에서 가장 긴 장으로 알려져 있습니다.',ref:[19,119]},en:{q:'Which chapter is known as the longest chapter in the Bible?',o:['Psalm 23','Psalm 119','Isaiah 53','Genesis 1'],a:1,n:'Psalm 119 is known as the longest chapter in the Bible.',ref:[19,119]}}
  ];

  const T={
    ko:{title:'오늘의 성경 퀴즈',desc:'매일 새로운 순서로 5문제가 출제됩니다. 오늘의 성경 지식을 확인해보세요.',start:'퀴즈 시작',q:'문제',next:'다음 문제',finish:'오늘의 퀴즈 완료',score:'오늘의 점수',yes:'정답입니다 ✓',no:'아쉬워요',good:'잘했어요! 오늘의 퀴즈를 완료했습니다.',try:'좋아요. 틀린 문제의 말씀을 다시 찾아보세요.',close:'닫기',read:'관련 성경 읽기 →'},
    en:{title:'Today’s Bible Quiz',desc:'Five questions are selected in a new order each day. Test your Bible knowledge today.',start:'START QUIZ',q:'Question',next:'NEXT QUESTION',finish:'COMPLETE TODAY’S QUIZ',score:'Today’s Score',yes:'Correct ✓',no:'Not quite',good:'Great job! You completed today’s quiz.',try:'Good try. Look up the passages behind the questions you missed.',close:'Close',read:'READ RELATED SCRIPTURE →'}
  };

  let lang='ko',qs=[],i=0,score=0,locked=false;
  const STATE_KEY='chris_daily_bible_quiz_v2';
  const todayKey=()=>new Date().toISOString().slice(0,10);
  const isHome=()=>location.pathname==='/'||location.pathname==='/index.html';

  function installStyles(){
    if(document.getElementById('home-bible-quiz-modal-style'))return;
    const style=document.createElement('style');
    style.id='home-bible-quiz-modal-style';
    style.textContent=`
      #home-bible-quiz{padding:28px 20px 42px;background:transparent;text-align:center}.home-quiz-section{max-width:720px;margin:0 auto;padding:24px 22px;border:1px solid rgba(201,169,107,.24);border-radius:18px;background:rgba(201,169,107,.035)}.home-quiz-section h2{margin:0;color:#f4efe5;font:600 clamp(25px,5vw,34px)/1.15 Cormorant Garamond,Georgia,serif}.home-quiz-section p{margin:10px auto 0;max-width:580px;color:#99999f;font:400 13px/1.7 Pretendard,Arial,sans-serif}
      .home-quiz-launch{display:inline-flex;align-items:center;gap:12px;padding:15px 24px;border:1px solid rgba(201,169,107,.48);border-radius:999px;background:rgba(201,169,107,.06);color:#d8bc83;font:600 12px/1 Cinzel,serif;letter-spacing:.16em;cursor:pointer;transition:.25s}
      .home-quiz-launch:hover{background:rgba(201,169,107,.14);border-color:#c9a96b;transform:translateY(-1px)}
      .home-quiz-launch span{font-size:18px;line-height:0}
      .home-quiz-backdrop{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.78);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
      .home-quiz-modal{position:relative;width:min(620px,100%);max-height:min(760px,calc(100vh - 40px));overflow:auto;border:1px solid rgba(201,169,107,.38);border-radius:22px;background:linear-gradient(145deg,#101014,#07070a);box-shadow:0 28px 90px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.025);color:#eee;text-align:left}
      .home-quiz-close{position:absolute;right:16px;top:14px;width:38px;height:38px;border:1px solid rgba(255,255,255,.1);border-radius:50%;background:rgba(255,255,255,.035);color:#aaa;font-size:20px;cursor:pointer}
      .home-quiz-close:hover{color:#d8bc83;border-color:rgba(201,169,107,.4)}
      .home-quiz-inner,.home-quiz-result{padding:42px 42px 38px}
      .home-quiz-kicker{display:block;margin-bottom:12px;color:#c9a96b;font:600 10px/1.2 Cinzel,serif;letter-spacing:.22em}
      .home-quiz-copy h2,.home-quiz-result h2{margin:0;color:#f4efe5;font:600 clamp(25px,5vw,36px)/1.15 Cormorant Garamond,Georgia,serif}
      .home-quiz-copy p,.home-quiz-result p{margin:15px 0 28px;color:#a9a9ae;font:400 14px/1.75 Pretendard,Arial,sans-serif}
      .home-quiz-start,.home-quiz-next{border:1px solid #c9a96b;border-radius:999px;background:#c9a96b;color:#080808;padding:13px 20px;font:700 11px/1 Cinzel,serif;letter-spacing:.12em;cursor:pointer}
      .home-quiz-start:hover,.home-quiz-next:hover{filter:brightness(1.08);transform:translateY(-1px)}
      .home-quiz-start span{margin-left:7px;font-size:15px}
      .home-quiz-top{display:flex;justify-content:space-between;gap:16px;color:#888;font:600 10px/1.2 Cinzel,serif;letter-spacing:.12em}
      .home-quiz-progress{height:2px;margin:14px 0 30px;background:#202025;overflow:hidden}
      .home-quiz-progress i{display:block;height:100%;background:#c9a96b;transition:width .25s}
      .home-quiz-question h2{margin:0 0 25px;color:#f4efe5;font:600 clamp(23px,4.5vw,31px)/1.3 Cormorant Garamond,Georgia,serif}
      .home-quiz-options{display:grid;gap:10px}
      .home-quiz-options button{display:flex;align-items:center;gap:13px;width:100%;padding:13px 15px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:#0d0d11;color:#ddd;text-align:left;cursor:pointer;font:500 14px/1.4 Pretendard,Arial,sans-serif;transition:.2s}
      .home-quiz-options button:hover:not(:disabled){border-color:rgba(201,169,107,.65);background:#15130f}
      .home-quiz-options button b{display:grid;place-items:center;width:27px;height:27px;flex:0 0 27px;border:1px solid rgba(201,169,107,.35);border-radius:50%;color:#c9a96b;font-size:10px}
      .home-quiz-options button.is-correct{border-color:#c9a96b;background:rgba(201,169,107,.12);color:#f2d9a7}
      .home-quiz-options button.is-wrong{border-color:#71464a;background:rgba(113,70,74,.13);color:#caa9ab}
      .home-quiz-feedback{display:none;margin-top:20px;padding:17px;border-left:2px solid #c9a96b;background:rgba(201,169,107,.055)}
      .home-quiz-feedback.show{display:block}
      .home-quiz-feedback strong{color:#d8bc83;font:700 12px/1.4 Pretendard,Arial,sans-serif}
      .home-quiz-feedback p{margin:7px 0 15px;color:#a9a9ae;font:400 13px/1.65 Pretendard,Arial,sans-serif}\n      .home-quiz-next{padding:10px 16px;font-size:10px}
      .home-quiz-result{text-align:center}
      .home-quiz-score{margin:18px 0 8px;color:#c9a96b;font:500 72px/.95 Cormorant Garamond,Georgia,serif}
      .home-quiz-score small{font-size:22px;color:#777}
      @media(max-width:560px){
        #home-bible-quiz{padding:22px 16px 34px}
        .home-quiz-inner,.home-quiz-result{padding:34px 22px 26px}
        .home-quiz-backdrop{padding:10px}
        .home-quiz-modal{max-height:calc(100vh - 20px);border-radius:18px}
        .home-quiz-question h2{font-size:25px}
      }
    `;
    document.head.appendChild(style);
  }

  const el=()=>document.getElementById('home-bible-quiz');
  const getLang=()=>document.documentElement.lang==='en'?'en':'ko';

  function pick(){
    const day=Math.floor(Date.now()/86400000);
    const pool=SET.map((item,index)=>({item,index}));
    let seed=(day*9301+49297)%233280;
    const rand=()=>{seed=(seed*9301+49297)%233280;return seed/233280;};
    for(let n=pool.length-1;n>0;n--){
      const j=Math.floor(rand()*(n+1));
      [pool[n],pool[j]]=[pool[j],pool[n]];
    }
    return pool.slice(0,5).map(x=>x.item);
  }

  function renderLauncher(){
    const r=el();
    if(r){
      lang=getLang();
      r.innerHTML='<div class="home-quiz-section"><span class="home-quiz-kicker">DAILY CHALLENGE</span><h2>'+T[lang].title+'</h2><p>'+T[lang].desc+'</p><button class="home-quiz-launch" type="button" aria-haspopup="dialog">'+T[lang].title+' <span>→</span></button></div>'; r.querySelector('.home-quiz-launch').onclick=openModal;
    }
    const fab=document.getElementById('home-quiz-fab');
    if(fab) fab.remove();
  }
  window.refreshBibleQuizSection=renderLauncher;

  function getSavedState(){
    try{
      const raw=sessionStorage.getItem(STATE_KEY);
      if(!raw)return null;
      const state=JSON.parse(raw);
      return state&&state.date===todayKey()&&Array.isArray(state.qs)&&state.qs.length===5?state:null;
    }catch(e){return null;}
  }
  function saveState(){
    try{sessionStorage.setItem(STATE_KEY,JSON.stringify({date:todayKey(),qs:qs.map(q=>SET.indexOf(q)),i,score}));}catch(e){}
  }
  function restoreState(){
    const state=getSavedState();
    if(!state)return false;
    qs=state.qs.map(n=>SET[n]).filter(Boolean);
    if(qs.length!==5)return false;
    i=Math.min(Math.max(Number(state.i)||0,0),qs.length);
    score=Math.max(Number(state.score)||0,0);
    locked=false;
    return true;
  }
  function clearState(){try{sessionStorage.removeItem(STATE_KEY);}catch(e){}}

  function openModal(){
    lang=getLang();
    const restored=restoreState();
    if(!restored){qs=[];i=0;score=0;locked=false;}

    const backdrop=document.createElement('div');
    backdrop.className='home-quiz-backdrop';
    backdrop.setAttribute('role','dialog');
    backdrop.setAttribute('aria-modal','true');
    backdrop.innerHTML='<div class="home-quiz-modal"><button class="home-quiz-close" type="button" aria-label="'+T[lang].close+'">×</button><div id="home-quiz-modal-content"></div></div>';
    document.body.appendChild(backdrop);
    document.body.style.overflow='hidden';
    backdrop.querySelector('.home-quiz-close').onclick=closeModal;
    backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeModal();});
    document.addEventListener('keydown',escClose);
    render();
  }

  function escClose(e){if(e.key==='Escape')closeModal();}
  function closeModal(){
    const b=document.querySelector('.home-quiz-backdrop');if(b)b.remove();
    document.body.style.overflow='';
    document.removeEventListener('keydown',escClose);
  }

  function modalEl(){return document.getElementById('home-quiz-modal-content');}

  function render(){
    const r=modalEl();if(!r)return;
    lang=getLang();const t=T[lang];
    if(!qs.length){
      r.innerHTML='<div class="home-quiz-inner"><span class="home-quiz-kicker">DAILY CHALLENGE</span><div class="home-quiz-copy"><h2>'+t.title+'</h2><p>'+t.desc+'</p></div><button class="home-quiz-start" type="button">'+t.start+' <span>→</span></button></div>';
      r.querySelector('button').onclick=start;return;
    }
    if(i>=qs.length){
      r.innerHTML='<div class="home-quiz-result"><span class="home-quiz-kicker">DAILY CHALLENGE</span><h2>'+t.score+'</h2><div class="home-quiz-score">'+score+' <small>/ '+qs.length+'</small></div><p>'+(score===qs.length?t.good:t.try)+'</p><button class="home-quiz-start home-quiz-complete" type="button">'+t.finish+' ✓</button></div>';
      r.querySelector('.home-quiz-complete').onclick=()=>{clearState();renderLauncher();closeModal();};return;
    }
    const q=qs[i][lang];
    r.innerHTML='<div class="home-quiz-inner"><div class="home-quiz-top"><span>'+t.q+' '+(i+1)+' / '+qs.length+'</span><span>'+score+' PTS</span></div><div class="home-quiz-progress"><i style="width:'+((i)/qs.length*100)+'%"></i></div><div class="home-quiz-question"><h2>'+q.q+'</h2><div class="home-quiz-options">'+q.o.map((x,n)=>'<button type="button" data-n="'+n+'"><b>'+String.fromCharCode(65+n)+'</b><span>'+x+'</span></button>').join('')+'</div><div class="home-quiz-feedback" aria-live="polite"></div></div></div>';
    r.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>answer(+b.dataset.n));
  }

  function start(){qs=pick();i=0;score=0;locked=false;saveState();renderLauncher();render();}
  function answer(n){
    if(locked)return;
    locked=true;
    const q=qs[i][lang],buttons=modalEl().querySelectorAll('[data-n]');
    buttons.forEach((b,k)=>{b.disabled=true;if(k===q.a)b.classList.add('is-correct');if(k===n&&n!==q.a)b.classList.add('is-wrong');});
    if(n===q.a)score++;
    saveState();
    renderLauncher();
    const f=modalEl().querySelector('.home-quiz-feedback'),t=T[lang];
    f.innerHTML='<strong>'+(n===q.a?t.yes:t.no)+'</strong><p>'+q.n+'</p><button class="home-quiz-next" type="button">'+(i===qs.length-1?t.finish:t.next)+' →</button>';
    f.classList.add('show');
    f.querySelector('button').onclick=()=>{i++;locked=false;saveState();renderLauncher();render();};
  }

  const old=window.onLangChange;
  window.onLangChange=function(l){if(typeof old==='function')old(l);lang=l;if(el()){renderLauncher();if(document.querySelector('.home-quiz-backdrop'))render();}};
  document.addEventListener('DOMContentLoaded',()=>{
    installStyles();
    renderLauncher();
    if(isHome()) setTimeout(()=>{if(!document.querySelector('.home-quiz-backdrop'))openModal();},700);
  });
})();