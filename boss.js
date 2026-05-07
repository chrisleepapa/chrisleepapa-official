const bossBullets=[];

function spawnBossBullet(x,y,angle,speed){

  bossBullets.push({
    x,
    y,
    vx:Math.cos(angle)*speed,
    vy:Math.sin(angle)*speed,
    r:12
  });
}

function bossPattern(x,y){

  for(let i=0;i<18;i++){

    spawnBossBullet(
      x,
      y,
      (Math.PI*2/18)*i,
      5
    );
  }

  showWarning();
}