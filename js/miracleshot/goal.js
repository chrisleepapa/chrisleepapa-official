'use strict';
(() => {
  const chars={g:{name:'길',img:'/images/g00.jpg',power:82,accuracy:94,curve:72},h:{name:'황',img:'/images/h00.jpg',power:96,accuracy:78,curve:55},k:{name:'고',img:'/images/k00.jpg',power:86,accuracy:82,curve:96},y:{name:'영',img:'/images/y00.jpg',power:88,accuracy:90,curve:78}};
  const state={mode:'cpu',p1:'h',p2:'g',set:1,total:[0,0],shots:[0,0],turn:0,aim:{power:0,curve:0,angle:0},targets:[],locked:false,charging:false,chargeStarted:0,chargeFrame:0,gesture:null};
  const $=id=>document.getElementById(id);
  const screens={setup:$('setupScreen'),game:$('gameScreen'),result:$('resultScreen')};
  const show=s=>{Object.values(screens).forEach(x=>x.classList.remove('active'));s.classList.add('active')};

  function requireLogin(){
    if(window.CLPAuth?.isLoggedIn?.()){
      $('accountBadge').textContent=String(window.CLPAuth.getUser?.()?.initials||'').toUpperCase();
      return true;
    }
    if(window.CLPAuth?.showLoginModal){window.CLPAuth.showLoginModal({prefix:'clp-goal-login',onSuccess:()=>location.reload()});}
    return false;
  }
  function randomCharacter(){const keys=Object.keys(chars);return keys[Math.floor(Math.random()*keys.length)]}
  function buildWall(){
    const wall=$('targetWall');wall.innerHTML='';state.targets=[];
    // Fixed score distribution: the value displayed on a tile is always the value awarded when that tile falls.
    const values=[-100,-80,-60,-50,-40,-30,-20,-10,0,10,20,30,40,50,60,80,100];
    for(let i=0;i<63;i++){
      const value=values[Math.floor(Math.random()*values.length)],el=document.createElement('div');
      el.className='target '+(value>0?'plus':value<0?'minus':'zero');
      el.textContent=value>0?'+'+value:value;
      el.style.setProperty('--r',`${(Math.random()*6-3).toFixed(1)}deg`);
      el.style.setProperty('--z',`${Math.floor(Math.random()*35)}px`);
      el.dataset.value=String(value);wall.appendChild(el);state.targets.push(el);
    }
  }
  function updateHeader(){
    $('setNumber').textContent=state.set<=5?state.set:`OT${state.set-5}`;
    $('p1Total').textContent=state.total[0];$('p2Total').textContent=state.total[1];
    const c=chars[state.turn?state.p2:state.p1];$('turnLabel').textContent=`PLAYER ${state.turn+1} · ${c.name} TURN`;
  }
  function updateOpponentUI(){
    const area=$('opponentSelectArea');area.classList.toggle('is-cpu',state.mode==='cpu');
    $('opponentName').textContent=state.mode==='cpu'?'COMPUTER · RANDOM':`PLAYER 2 · ${chars[state.p2].name}`;
    document.querySelectorAll('.opponent-card').forEach(card=>card.classList.toggle('selected',state.mode==='human'&&card.dataset.opponent===state.p2));
  }
  function selectSetup(){
    document.querySelectorAll('.mode-btn').forEach(b=>b.onclick=()=>{
      document.querySelectorAll('.mode-btn').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');state.mode=b.dataset.mode;
      if(state.mode==='cpu')state.p2=randomCharacter();updateOpponentUI();
    });
    document.querySelectorAll('.character-card:not(.opponent-card)').forEach(card=>card.onclick=()=>{
      document.querySelectorAll('#characterGrid .character-card').forEach(x=>x.classList.remove('selected'));card.classList.add('selected');state.p1=card.dataset.character;
      // Player 2 may still choose any of the four characters in local multiplayer; both sides are independent.
    });
    document.querySelectorAll('.opponent-card').forEach(card=>card.onclick=()=>{
      if(state.mode!=='human')return;document.querySelectorAll('.opponent-card').forEach(x=>x.classList.remove('selected'));card.classList.add('selected');state.p2=card.dataset.opponent;$('opponentName').textContent=`PLAYER 2 · ${chars[state.p2].name}`;
    });
    $('battleStart').onclick=()=>{if(state.mode==='cpu')state.p2=randomCharacter();if(requireLogin())startMatch()};
    $('againBtn').onclick=()=>{state.set=1;state.total=[0,0];state.shots=[0,0];state.turn=0;state.locked=false;show(screens.setup);if(state.mode==='cpu')state.p2=randomCharacter();updateOpponentUI()};
    updateOpponentUI();
  }
  function startMatch(){state.set=1;state.total=[0,0];state.shots=[0,0];state.turn=0;show(screens.game);applyProfiles();buildWall();resetBall();updateHeader()}
  function applyProfiles(){const a=chars[state.p1],b=chars[state.p2];$('p1Img').src=a.img;$('p1Label').textContent=`PLAYER 1 · ${a.name}`;$('p2Label').textContent=`PLAYER 2 · ${b.name}`;$('p2Img').src=b.img;$('accountBadge').textContent=String(window.CLPAuth?.getUser?.()?.initials||'').toUpperCase()}
  function resetBall(){
    const b=$('ball');b.textContent='⚽';b.style.left='50%';b.style.bottom='9%';b.style.transform='translateX(-50%) scale(1)';b.style.opacity='1';b.style.transition='';
    state.aim={power:0,curve:0,angle:0};state.locked=false;state.charging=false;state.gesture=null;cancelAnimationFrame(state.chargeFrame);updateAim();
    $('kickBtn').disabled=state.mode==='cpu'&&state.turn===1;
  }
  function updateAim(){
    $('powerValue').textContent=state.aim.power+'%';$('curveValue').textContent=(state.aim.curve>0?'+':'')+state.aim.curve;$('angleValue').textContent=(state.aim.angle>0?'+':'')+state.aim.angle+'°';
    const fill=$('powerFill');if(fill)fill.style.width=state.aim.power+'%';
  }
  function updateCharge(now){
    if(!state.charging)return;
    const elapsed=now-state.chargeStarted;
    // Full charge in 1.8s, then cycle down/up so the player can choose the strength precisely.
    const cycle=3600,phase=elapsed%cycle,raw=phase<=1800?phase/1800:(3600-phase)/1800;
    const power=Math.round(raw*100);state.aim.power=power;updateAim();
    state.chargeFrame=requestAnimationFrame(updateCharge);
  }
  function getGesture(e){
    if(!state.gesture)return;
    const p=e.touches?e.touches[0]:e,dx=p.clientX-state.gesture.x,dy=p.clientY-state.gesture.y;
    const distance=Math.hypot(dx,dy);
    if(distance<4)return;
    // Drag direction determines the actual target direction. Vertical drag controls lift, horizontal drag controls left/right.
    const horizontal=Math.max(-1,Math.min(1,dx/140));
    const vertical=Math.max(-1,Math.min(1,-dy/140));
    state.aim.angle=Math.round(horizontal*45);
    state.aim.curve=Math.round(vertical*100);
    state.gesture.lastX=p.clientX;state.gesture.lastY=p.clientY;updateAim();
  }
  function nearestTarget(power,angle,curve){
    const available=state.targets.filter(t=>!t.classList.contains('hit'));if(!available.length)return null;
    const wall=$('targetWall').getBoundingClientRect();
    // Convert the finger direction into a landing point on the wall.
    const xNorm=.5+(angle/45)*.46;
    const yNorm=.52-(curve/100)*.34+(power/100)*.08;
    const wantedX=wall.left+wall.width*Math.max(.03,Math.min(.97,xNorm));
    const wantedY=wall.top+wall.height*Math.max(.05,Math.min(.95,yNorm));
    let best=null,bestDistance=Infinity;
    available.forEach(t=>{const r=t.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,d=Math.hypot(cx-wantedX,cy-wantedY);if(d<bestDistance){bestDistance=d;best=t;}});
    return best;
  }
  function animateKick(power,angle,curve,onDone){
    const b=$('ball'),stage=$('wallStage'),rect=stage.getBoundingClientRect(),target=nearestTarget(power,angle,curve),tr=target?.getBoundingClientRect();
    const tx=tr?((tr.left+tr.width/2-rect.left)/rect.width*100):50+(angle*.9);
    const ty=tr?((rect.bottom-(tr.top+tr.height/2))/rect.height*100):55+(curve*.18);
    b.classList.remove('dragging');
    // No aiming line: the kick is represented only by the ball's movement, scale and curve.
    b.style.transition='left 1.05s cubic-bezier(.18,.72,.12,1),bottom 1.05s cubic-bezier(.18,.72,.12,1),transform 1.05s,opacity .25s';
    b.style.left=Math.max(4,Math.min(96,tx))+'%';b.style.bottom=Math.max(26,Math.min(82,ty))+'%';
    b.style.transform=`translateX(-50%) scale(.22) rotate(${curve*2.4}deg) skewX(${angle*.12}deg)`;
    setTimeout(()=>{if(target)target.classList.add('hit');b.style.opacity='.15';onDone(target)},1100);
  }
  function finishShot(value){
    state.total[state.turn]+=value;state.shots[state.turn]++;updateHeader();
    setTimeout(()=>{
      if(state.turn===0){state.turn=1;buildWall();resetBall();updateHeader();if(state.mode==='cpu')setTimeout(cpuKick,650)}
      else if(state.set<5){state.set++;state.turn=0;buildWall();resetBall();updateHeader()}
      else if(state.total[0]===state.total[1]){state.set++;state.turn=0;buildWall();resetBall();updateHeader()}
      else finishMatch();
    },900);
  }
  function humanKick(){
    if(state.locked)return;state.locked=true;state.charging=false;cancelAnimationFrame(state.chargeFrame);
    const {power,angle,curve}=state.aim;const target=nearestTarget(power,angle,curve);
    animateKick(power,angle,curve,hit=>{const value=hit?Number(hit.dataset.value):0;showShotPopup(value);finishShot(value)});
  }
  function cpuKick(){
    if(state.locked)return;state.locked=true;const c=chars[state.p2],power=68+Math.floor(Math.random()*28),angle=Math.floor(Math.random()*55)-27,curve=Math.floor(Math.random()*70)-35;
    state.aim={power,angle,curve};updateAim();setTimeout(()=>{const target=nearestTarget(power,angle,curve);animateKick(power,angle,curve,hit=>{const value=hit?Number(hit.dataset.value):0;showShotPopup(value);finishShot(value)})},250);
  }
  function showShotPopup(value){const p=document.createElement('div');p.className='shot-popup';p.textContent=value>0?'+'+value:value;document.body.appendChild(p);setTimeout(()=>p.remove(),1100)}
  function finishMatch(){show(screens.result);$('finalP1').textContent=state.total[0];$('finalP2').textContent=state.total[1];$('resultTitle').textContent=state.total[0]>state.total[1]?'PLAYER 1 WINS':state.total[0]<state.total[1]?'PLAYER 2 WINS':'DRAW';$('resultMessage').textContent=state.total[0]>state.total[1]?'MIRACLE SHOT!':state.total[0]<state.total[1]?'GREAT SHOT!':'TIED MATCH!'}
  function bindDrag(){
    const b=$('ball');
    const start=(e)=>{
      if((state.turn===1&&state.mode==='cpu')||state.locked)return;
      const p=e.touches?e.touches[0]:e;state.gesture={x:p.clientX,y:p.clientY,lastX:p.clientX,lastY:p.clientY};state.charging=true;state.chargeStarted=performance.now();state.aim.power=0;state.aim.angle=0;state.aim.curve=0;b.classList.add('dragging');updateAim();state.chargeFrame=requestAnimationFrame(updateCharge);e.preventDefault();
    };
    const move=(e)=>{if(!state.gesture||state.locked)return;getGesture(e);e.preventDefault()};
    const end=()=>{if(!state.gesture)return;state.gesture=null;state.charging=false;cancelAnimationFrame(state.chargeFrame);b.classList.remove('dragging');if(state.aim.power>=12)humanKick();else{state.aim.power=0;updateAim()}};
    b.addEventListener('pointerdown',start,{passive:false});window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
    $('kickBtn').onclick=()=>{if(state.aim.power>=12)humanKick()};
  }
  selectSetup();bindDrag();
  if(window.CLPAuth?.isLoggedIn?.())$('accountBadge').textContent=String(window.CLPAuth.getUser?.()?.initials||'').toUpperCase();else if(window.CLPAuth?.showLoginModal)setTimeout(()=>window.CLPAuth.showLoginModal({prefix:'clp-goal-login',onSuccess:()=>location.reload()}),50);
})();
