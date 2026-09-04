'use strict';
(() => {
  const chars={g:{name:'길',img:'/images/g00.jpg',power:82,accuracy:94,curve:72},h:{name:'황',img:'/images/h00.jpg',power:96,accuracy:78,curve:55},k:{name:'고',img:'/images/k00.jpg',power:86,accuracy:82,curve:96},y:{name:'영',img:'/images/y00.jpg',power:88,accuracy:90,curve:78}};
  const state={mode:'cpu',p1:'h',p2:'g',set:1,total:[0,0],shots:[0,0],turn:0,aim:{power:0,curve:0,angle:0},targets:[],locked:false};
  const $=id=>document.getElementById(id);
  const screens={setup:$('setupScreen'),game:$('gameScreen'),result:$('resultScreen')};
  const show=s=>{Object.values(screens).forEach(x=>x.classList.remove('active'));s.classList.add('active')};

  function requireLogin(){
    if(window.CLPAuth?.isLoggedIn?.()){
      $('accountBadge').textContent=String(window.CLPAuth.getUser?.()?.initials||'').toUpperCase();
      return true;
    }
    if(window.CLPAuth?.showLoginModal){
      window.CLPAuth.showLoginModal({prefix:'clp-goal-login',onSuccess:()=>location.reload()});
    }
    return false;
  }
  function randomScore(){return Math.floor(Math.random()*21)*10-100}
  function buildWall(){
    const wall=$('targetWall'); wall.innerHTML=''; state.targets=[];
    for(let i=0;i<63;i++){
      const value=randomScore(),el=document.createElement('div');
      el.className='target '+(value>0?'plus':value<0?'minus':'zero');
      el.textContent=value>0?'+'+value:value;
      el.style.setProperty('--r',`${(Math.random()*8-4).toFixed(1)}deg`);
      el.style.setProperty('--z',`${Math.floor(Math.random()*70)}px`);el.dataset.value=value;
      wall.appendChild(el);state.targets.push(el);
    }
  }
  function updateHeader(){
    $('setNumber').textContent=state.set<=5?state.set:`OT${state.set-5}`;
    $('p1Total').textContent=state.total[0];$('p2Total').textContent=state.total[1];
    const c=chars[state.turn?state.p2:state.p1];$('turnLabel').textContent=`PLAYER ${state.turn+1} · ${c.name} TURN`;
  }
  function selectSetup(){
    document.querySelectorAll('.mode-btn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.mode-btn').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');state.mode=b.dataset.mode;$('opponentName').textContent=state.mode==='cpu'?'COMPUTER':'PLAYER 2';});
    document.querySelectorAll('.character-card').forEach(card=>card.onclick=()=>{document.querySelectorAll('.character-card').forEach(x=>x.classList.remove('selected'));card.classList.add('selected');state.p1=card.dataset.character;});
    $('battleStart').onclick=()=>{if(requireLogin())startMatch()};
    $('againBtn').onclick=()=>{state.set=1;state.total=[0,0];state.shots=[0,0];state.locked=false;show(screens.setup)};
  }
  function startMatch(){state.set=1;state.total=[0,0];state.shots=[0,0];state.turn=0;show(screens.game);applyProfiles();buildWall();resetBall();updateHeader()}
  function applyProfiles(){const a=chars[state.p1];$('p1Img').src=a.img;$('p1Label').textContent=`PLAYER 1 · ${a.name}`;$('p2Label').textContent=state.mode==='cpu'?'COMPUTER':'PLAYER 2';$('p2Img').src=state.mode==='cpu'?chars[state.p2].img:chars.g.img;$('accountBadge').textContent=String(window.CLPAuth?.getUser?.()?.initials||'').toUpperCase()}
  function resetBall(){const b=$('ball');b.textContent='⚽';b.style.left='50%';b.style.bottom='9%';b.style.transform='translateX(-50%) scale(1)';b.style.opacity='1';b.style.transition='';$('flightLine').style.width='0';$('flightLine').style.transform='none';state.aim={power:0,curve:0,angle:0};state.locked=false;updateAim();$('kickBtn').disabled=state.mode==='cpu'&&state.turn===1}
  function updateAim(){$('powerValue').textContent=state.aim.power+'%';$('curveValue').textContent=(state.aim.curve>0?'+':'')+state.aim.curve;$('angleValue').textContent=(state.aim.angle>0?'+':'')+state.aim.angle+'°'}
  function chooseTarget(power,angle,curve){const available=state.targets.filter(t=>!t.classList.contains('hit'));if(!available.length)return null;const bias=(angle+curve*.35)/100;const idx=Math.max(0,Math.min(available.length-1,Math.floor((.5+bias*.42)*available.length+(power-50)/180*available.length)));return available[idx]}
  function animateKick(power,angle,curve,onDone){
    const b=$('ball'),stage=$('wallStage'),rect=stage.getBoundingClientRect(),target=chooseTarget(power,angle,curve),tr=target?.getBoundingClientRect();
    const tx=tr?((tr.left+tr.width/2-rect.left)/rect.width*100):50+(angle*.25),ty=tr?((rect.bottom-(tr.top+tr.height/2))/rect.height*100):55;
    b.classList.remove('dragging');b.style.transition='left 1.25s cubic-bezier(.2,.7,.1,1),bottom 1.25s cubic-bezier(.2,.7,.1,1),transform 1.25s,opacity .3s';b.style.left=Math.max(5,Math.min(95,tx))+'%';b.style.bottom=Math.max(28,Math.min(76,ty))+'%';b.style.transform=`translateX(-50%) scale(.22) rotate(${curve*3}deg)`;$('flightLine').style.width=Math.min(70,Math.max(18,power*.65))+'%';$('flightLine').style.transform=`rotate(${angle*.35}deg)`;
    setTimeout(()=>{if(target)target.classList.add('hit');b.style.opacity='.15';onDone(target)},1350)
  }
  function finishShot(value){
    state.total[state.turn]+=value;state.shots[state.turn]++;updateHeader();
    setTimeout(()=>{
      if(state.turn===0){state.turn=1;buildWall();resetBall();updateHeader();if(state.mode==='cpu')setTimeout(cpuKick,650)}
      else if(state.set<5){state.set++;state.turn=0;buildWall();resetBall();updateHeader()}
      else if(state.total[0]===state.total[1]){state.set++;state.turn=0;buildWall();resetBall();updateHeader()}
      else finishMatch();
    },900)
  }
  function humanKick(){if(state.locked)return;state.locked=true;const {power,angle,curve}=state.aim;const target=chooseTarget(power,angle,curve);animateKick(power,angle,curve,hit=>{let value=hit?Number(hit.dataset.value):0;const c=chars[state.turn?state.p2:state.p1];if(Math.random()>(.82+(c.accuracy/100)*.14))value=0;showShotPopup(value);finishShot(value)})}
  function cpuKick(){if(state.locked)return;state.locked=true;const c=chars[state.p2],power=68+Math.floor(Math.random()*28),angle=Math.floor(Math.random()*55)-27,curve=Math.floor(Math.random()*70)-35;state.aim={power,angle,curve};updateAim();setTimeout(()=>{const target=chooseTarget(power,angle,curve);animateKick(power,angle,curve,hit=>{let value=hit?Number(hit.dataset.value):0;if(Math.random()>.7+c.accuracy/400)value=0;showShotPopup(value);finishShot(value)})},250)}
  function showShotPopup(value){const p=document.createElement('div');p.className='shot-popup';p.textContent=value>0?'+'+value:value;document.body.appendChild(p);setTimeout(()=>p.remove(),1100)}
  function finishMatch(){show(screens.result);$('finalP1').textContent=state.total[0];$('finalP2').textContent=state.total[1];$('resultTitle').textContent=state.total[0]>state.total[1]?'PLAYER 1 WINS':'PLAYER 2 WINS';$('resultMessage').textContent=state.total[0]>state.total[1]?'MIRACLE SHOT!':'GREAT SHOT!'}
  function bindDrag(){
    const b=$('ball');let start=null;
    const move=e=>{if(!start||state.locked)return;const p=e.touches?e.touches[0]:e,dx=p.clientX-start.x,dy=p.clientY-start.y;state.aim.power=Math.min(100,Math.max(0,Math.round(Math.hypot(dx,dy)*.8)));state.aim.angle=Math.max(-45,Math.min(45,Math.round(dx*.22)));state.aim.curve=Math.max(-100,Math.min(100,Math.round(-dy*.55)));updateAim()};
    const end=()=>{if(!start)return;start=null;if(state.aim.power<12){b.classList.remove('dragging');return}humanKick()};
    b.addEventListener('pointerdown',e=>{if(state.turn===1&&state.mode==='cpu'||state.locked)return;start={x:e.clientX,y:e.clientY};b.classList.add('dragging');e.preventDefault()});window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',end);$('kickBtn').onclick=()=>{if(state.aim.power>=12)humanKick()}
  }
  selectSetup();bindDrag();
  if(window.CLPAuth?.isLoggedIn?.())$('accountBadge').textContent=String(window.CLPAuth.getUser?.()?.initials||'').toUpperCase();else if(window.CLPAuth?.showLoginModal)setTimeout(()=>window.CLPAuth.showLoginModal({prefix:'clp-goal-login',onSuccess:()=>location.reload()}),50);
})();