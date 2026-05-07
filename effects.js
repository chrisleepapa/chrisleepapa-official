const particles = [];

function addPart(x,y,colors,count,speed,size,life,grav){

  for(let i=0;i<count;i++){

    particles.push({
      x,
      y,
      vx:(Math.random()-.5)*speed,
      vy:(Math.random()-.5)*speed,
      size:Math.random()*size+2,
      color:colors[Math.floor(Math.random()*colors.length)],
      life,
      grav
    });
  }
}