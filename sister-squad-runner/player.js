const CHARACTER_OPTIONS={
  jeong:{
    id:'jeong',
    name:'동생 정이',
    src:'/images/jeong_spritesheet.png',
    frames:5,
    tint:'#FF69B4'
  },
  yul:{
    id:'yul',
    name:'언니 율이',
    src:'/images/yul_spritesheet.png',
    frames:5,
    tint:'#4DA3FF'
  }
};

const savedCharacter=localStorage.getItem('ssr_character') || 'jeong';
let selectedCharacter=CHARACTER_OPTIONS[savedCharacter] ? savedCharacter : 'jeong';

const characterSprites={};

Object.values(CHARACTER_OPTIONS).forEach(character=>{
  const image=new Image();
  image.src=character.src;
  characterSprites[character.id]=image;
});

const PLAYER={
  x:180,
  y:0,
  w:80,
  h:120,
  vy:0,
  grounded:false,
  frameTick:0
};

let DASH=false;
let DASH_TIMER=0;
let DASH_CD=0;

let FEVER=0;
let FEVER_MODE=false;

let SKILL_CD=0;
let SKILL_FLASH=0;

function selectCharacter(id){

  if(!CHARACTER_OPTIONS[id]) return;

  selectedCharacter=id;
  localStorage.setItem('ssr_character',id);
}

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
  SKILL_FLASH=32;
  
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

function getPlayerFrame(){
  
  const character=CHARACTER_OPTIONS[selectedCharacter];
  
  if(SKILL_FLASH>0) return character.frames-1;
  
  if(FEVER_MODE) return 3;
  
  if(DASH) return 2;
  
  return Math.floor(PLAYER.frameTick/10)%Math.min(2,character.frames);
}

  function drawPlayerFallback(cx,character){

  cx.fillStyle=FEVER_MODE ? '#FFD700' : character.tint;
    
  cx.shadowBlur=24;
  cx.shadowColor=character.tint;
    
  cx.fillRect(
    PLAYER.x,
    PLAYER.y,
    PLAYER.w,
    PLAYER.h
  );

  cx.shadowBlur=0;
}
function drawPlayerSprite(cx,character,image,frame){

  const frameW=image.naturalWidth/character.frames;
  const frameH=image.naturalHeight;
  const drawH=150;
  const drawW=drawH*(frameW/frameH);
  const drawX=PLAYER.x-(drawW-PLAYER.w)/2;
  const drawY=PLAYER.y-(drawH-PLAYER.h);

  if(FEVER_MODE){
    cx.shadowBlur=26;
    cx.shadowColor='#FFD700';
  }else{
    cx.shadowBlur=20;
    cx.shadowColor=character.tint;
  }

  cx.drawImage(
    image,
    frameW*frame,
    0,
    frameW,
    frameH,
    drawX,
    drawY,
    drawW,
    drawH
  );

  cx.shadowBlur=0;
}

function drawPlayer(cx){

  const character=CHARACTER_OPTIONS[selectedCharacter];
  const image=characterSprites[selectedCharacter];
  const frame=getPlayerFrame();

  PLAYER.frameTick++;

  if(DASH){

    cx.globalAlpha=.15;

    for(let i=1;i<6;i++){

      if(image.complete && image.naturalWidth>0){
        const frameW=image.naturalWidth/character.frames;
        const frameH=image.naturalHeight;
        const drawH=150;
        const drawW=drawH*(frameW/frameH);
        const drawX=PLAYER.x-(drawW-PLAYER.w)/2-i*14;
        const drawY=PLAYER.y-(drawH-PLAYER.h);

        cx.drawImage(
          image,
          frameW*frame,
          0,
          frameW,
          frameH,
          drawX,
          drawY,
          drawW,
          drawH
        );
      }else{
        cx.fillStyle='#8BE9FF';

        cx.fillRect(
          PLAYER.x-i*14,
          PLAYER.y,
          PLAYER.w,
          PLAYER.h
        );
      }
    }

    cx.globalAlpha=1;
  }

  if(image.complete && image.naturalWidth>0){
    drawPlayerSprite(cx,character,image,frame);
  }else{
    drawPlayerFallback(cx,character);
  }
}
