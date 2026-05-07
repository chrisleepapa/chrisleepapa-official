const PLAYER={
  x:180,
  y:0,
  w:80,
  h:80,
  vy:0,
  grounded:false
};

let DASH=false;
let DASH_TIMER=0;
let DASH_CD=0;

let FEVER=0;
let FEVER_MODE=false;

let SKILL_CD=0;

function triggerDash(){

  if(DASH_CD>0) return;

  DASH=true;
  DASH_TIMER=12;
  DASH_CD=40;

  CAMERA.targetZoom=1.08;
  CAMERA.shakePower=6;

  addPart(
    PLAYER.x,
    PLAYER.y,
    ['#8BE9FF','#FFFFFF'],
    20,
    6,
    10,
    1,
    .04
  );
}

function activateFever(){

  FEVER_MODE=true;
  FEVER=100;

  CAMERA.targetZoom=1.12;

  addPart(
    PLAYER.x,
    PLAYER.y,
    ['#FFD700','#FF69B4'],
    60,
    8,
    20,
    2,
    .04
  );
}

function useSkill(){

  if(SKILL_CD>0) return;

  SKILL_CD=240;

  CAMERA.targetZoom=1.18;
  CAMERA.shakePower=14;

  addPart(
    PLAYER.x,
    PLAYER.y,
    ['#FF69B4','#FFFFFF','#FFD700'],
    100,
    10,
    24,
    2,
    .05
  );

  enemies.forEach(e=>{
    e.hp-=80;
  });
}

function drawPlayer(cx){

  if(DASH){

    cx.globalAlpha=.15;

    for(let i=1;i<6;i++){

      cx.fillStyle='#8BE9FF';

      cx.fillRect(
        PLAYER.x-i*14,
        PLAYER.y,
        PLAYER.w,
        PLAYER.h
      );
    }

    cx.globalAlpha=1;
  }

  cx.fillStyle=FEVER_MODE ? '#FFD700' : '#FF69B4';

  cx.shadowBlur=24;
  cx.shadowColor='#FF69B4';

  cx.fillRect(
    PLAYER.x,
    PLAYER.y,
    PLAYER.w,
    PLAYER.h
  );

  cx.shadowBlur=0;
}
