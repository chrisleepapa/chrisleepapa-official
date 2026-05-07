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

let GAME_STARTED=false;

PLAYER.y=H-220;

function addEnemy(){

let GAME_STARTED=false;
  
  enemies.push({
    x:W+100,
    y:H-200,
    w:70,
    h:70,
    hp:100
  });
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

  enemies.forEach((e,i)=>{

    e.x-=FEVER_MODE ? 12 : 8;

    if(e.x<PLAYER.x+PLAYER.w &&
       e.x+e.w>PLAYER.x){

      HITSTOP=4;

      CAMERA.shakePower=10;
      CAMERA.targetZoom=1.12;

      e.hp-=FEVER_MODE ? 30 : 15;

      addPart(
        e.x,
        e.y,
        ['#FF5555','#FFFFFF'],
        24,
        6,
        12,
        1,
        .06
      );
    }

    if(e.hp<=0){

      SCORE+=100;
      COMBO++;
      FEVER+=8;

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

  drawPlayer(cx);

  enemies.forEach(e=>{

    cx.fillStyle='#8B2EFF';

    cx.fillRect(
      e.x,
      e.y,
      e.w,
      e.h
    );
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
