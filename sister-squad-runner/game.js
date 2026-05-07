const canvas=document.getElementById('game');
const cx=canvas.getContext('2d');

let W=canvas.width=innerWidth;
let H=canvas.height=innerHeight;

window.addEventListener('resize',()=>{
  W=canvas.width=innerWidth;
  H=canvas.height=innerHeight;
});

const CAMERA={
  zoom:1,
  targetZoom:1,
  shakePower:0
};

const gravity=.8;

let SCORE=0;
let COMBO=0;
let HITSTOP=0;

const enemies=[];
const OBSTACLE_TYPES=['stone','tree','grass','flower'];

let GAME_STARTED=false;
let groundOffset=0;

PLAYER.y=H-220;

function addEnemy(){

  if(!GAME_STARTED) return;

  const type=OBSTACLE_TYPES[Math.floor(Math.random()*OBSTACLE_TYPES.length)];
  const sizes={
    stone:{w:68,h:46},
    tree:{w:56,h:96},
    grass:{w:72,h:36},
    flower:{w:46,h:62}
  };
  const size=sizes[type];

  enemies.push({
    type,
    x:W+100,
    y:H-120-size.h,
    w:size.w,
    h:size.h,
    hp:100,
    hitBySkill:false
  });
}

function getPlayerHitbox(){

  return {
    x:PLAYER.x+22,
    y:PLAYER.y+38,
    w:PLAYER.w-38,
    h:PLAYER.h-48
  };
}

function rectsOverlap(a,b){

  return a.x<b.x+b.w &&
         a.x+a.w>b.x &&
         a.y<b.y+b.h &&
         a.y+a.h>b.y;
}

function startGame(){

  GAME_STARTED=true;
  PLAYER.y=H-220;
  PLAYER.vy=0;
  PLAYER.grounded=true;

  if(enemies.length===0){
    addEnemy();
  }
}

setInterval(addEnemy,1800);

window.addEventListener('keydown',e=>{

  if(e.code==='Space' && PLAYER.grounded){

    PLAYER.vy=-18;
    PLAYER.grounded=false;
  }

  if(e.key==='Shift') triggerDash();

  if(e.key==='z') useSkill();
});

function update(){

  if(!GAME_STARTED) return;

  groundOffset=(groundOffset+(FEVER_MODE ? 12 : 8))%80;

  if(HITSTOP>0){
    HITSTOP--;
    return;
  }

  CAMERA.shakePower*=.88;

  CAMERA.zoom+=
  (CAMERA.targetZoom-CAMERA.zoom)*.08;

  CAMERA.targetZoom+=
  (1-CAMERA.targetZoom)*.05;

  PLAYER.vy+=gravity;
  PLAYER.y+=PLAYER.vy;

  if(PLAYER.y>H-220){

    PLAYER.y=H-220;
    PLAYER.vy=0;
    PLAYER.grounded=true;

    CAMERA.shakePower=4;
  }

  if(DASH_TIMER>0){
    DASH_TIMER--;
  }else{
    DASH=false;
  }

  if(DASH_CD>0) DASH_CD--;

  if(SKILL_CD>0) SKILL_CD--;

  if(SKILL_FLASH>0) SKILL_FLASH--;

  if(FEVER_MODE){

    FEVER-=.4;

    if(FEVER<=0){
      FEVER_MODE=false;
    }
  }

  const playerHitbox=getPlayerHitbox();

  enemies.forEach((e,i)=>{

    e.x-=FEVER_MODE ? 12 : 8;

    if(rectsOverlap(playerHitbox,e)){

      HITSTOP=6;

      CAMERA.shakePower=10;
      CAMERA.targetZoom=1.1;

      COMBO=0;
      SCORE=Math.max(0,SCORE-25);

      enemies.splice(i,1);
      return;
    }

    if(e.x+e.w<0){

      SCORE+=10;
      COMBO++;
      FEVER=Math.min(100,FEVER+2);

      enemies.splice(i,1);
      return;
    }

    if(e.hp<=0){

      SCORE+=100;
      COMBO++;
      FEVER+=8;

      if(e.hitBySkill){
        addPart(
          e.x+e.w/2,
          e.y+e.h/2,
          ['#FFD700','#FF8C00','#FFFFFF'],
          36,
          10,
          14,
          1.2,
          .05
        );
      }

      enemies.splice(i,1);

      if(FEVER>=100){
        activateFever();
      }
    }
  });

  particles.forEach((p,i)=>{

    p.x+=p.vx;
    p.y+=p.vy;

    p.vy+=p.grav;

    p.life-=.02;

    if(p.life<=0){
      particles.splice(i,1);
    }
  });

  bossBullets.forEach(b=>{

    b.x+=b.vx;
    b.y+=b.vy;
  });

  updateHUD();
}

function draw(){

  cx.clearRect(0,0,W,H);

  const shakeX=(Math.random()-.5)*CAMERA.shakePower;
  const shakeY=(Math.random()-.5)*CAMERA.shakePower;

  cx.save();

  cx.translate(shakeX,shakeY);

  cx.translate(W/2,H/2);
  cx.scale(CAMERA.zoom,CAMERA.zoom);
  cx.translate(-W/2,-H/2);

  const sky=cx.createLinearGradient(0,0,0,H);

  sky.addColorStop(0,'#0B1026');
  sky.addColorStop(1,'#1D1140');

  cx.fillStyle=sky;
  cx.fillRect(0,0,W,H);

  if(FEVER_MODE){

    cx.fillStyle='rgba(255,215,0,.05)';
    cx.fillRect(0,0,W,H);
  }

  cx.fillStyle='#15152A';
  cx.fillRect(0,H-120,W,120);

  cx.fillStyle='rgba(255,255,255,.18)';

  for(let x=-groundOffset;x<W;x+=80){
    cx.fillRect(x,H-64,42,6);
  }

  if(GAME_STARTED){
    drawPlayer(cx);
  }

  enemies.forEach(e=>{
    drawObstacle(cx,e);
  });

  particles.forEach(p=>{

    cx.globalAlpha=p.life;

    cx.fillStyle=p.color;

    cx.beginPath();
    cx.arc(p.x,p.y,p.size,0,Math.PI*2);
    cx.fill();

    cx.globalAlpha=1;
  });

  cx.fillStyle='#FF3355';

  bossBullets.forEach(b=>{

    cx.beginPath();
    cx.arc(b.x,b.y,b.r,0,Math.PI*2);
    cx.fill();
  });

  cx.restore();
}

function drawObstacle(cx,e){

  cx.save();
  cx.translate(e.x,e.y);

  if(e.type==='stone'){
    cx.fillStyle='#6E6A63';
    cx.beginPath();
    cx.ellipse(e.w*.5,e.h*.58,e.w*.48,e.h*.42,0,0,Math.PI*2);
    cx.fill();

    cx.fillStyle='#9B968D';
    cx.beginPath();
    cx.ellipse(e.w*.34,e.h*.38,e.w*.16,e.h*.12,-.4,0,Math.PI*2);
    cx.fill();
  }else if(e.type==='tree'){
    cx.fillStyle='#7B4A22';
    cx.fillRect(e.w*.42,e.h*.4,e.w*.18,e.h*.58);

    cx.fillStyle='#2FA35A';
    cx.beginPath();
    cx.arc(e.w*.5,e.h*.28,e.w*.33,0,Math.PI*2);
    cx.fill();

    cx.fillStyle='#4BCB72';
    cx.beginPath();
    cx.arc(e.w*.36,e.h*.38,e.w*.22,0,Math.PI*2);
    cx.arc(e.w*.64,e.h*.4,e.w*.24,0,Math.PI*2);
    cx.fill();
  }else if(e.type==='grass'){
    cx.strokeStyle='#57D36E';
    cx.lineWidth=5;

    for(let i=0;i<6;i++){
      const x=8+i*11;
      cx.beginPath();
      cx.moveTo(x,e.h);
      cx.quadraticCurveTo(x+4,e.h*.45,x+10,e.h*.12);
      cx.stroke();
    }
  }else{
    cx.strokeStyle='#50C878';
    cx.lineWidth=4;
    cx.beginPath();
    cx.moveTo(e.w*.5,e.h);
    cx.lineTo(e.w*.5,e.h*.36);
    cx.stroke();

    cx.fillStyle='#FF69B4';

    for(let i=0;i<6;i++){
      const angle=(Math.PI*2/6)*i;
      cx.beginPath();
      cx.ellipse(
        e.w*.5+Math.cos(angle)*10,
        e.h*.3+Math.sin(angle)*10,
        8,
        5,
        angle,
        0,
        Math.PI*2
      );
      cx.fill();
    }

    cx.fillStyle='#FFD700';
    cx.beginPath();
    cx.arc(e.w*.5,e.h*.3,7,0,Math.PI*2);
    cx.fill();
  }

  cx.restore();
}

function loop(){

  update();
  draw();

  requestAnimationFrame(loop);
}

loop();

setInterval(()=>{

  if(GAME_STARTED) bossPattern(W-300,H-350);

},8000);

setInterval(saveGame,5000);
