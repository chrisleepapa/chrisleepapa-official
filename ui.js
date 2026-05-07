const scoreEl=document.getElementById('score');
const comboEl=document.getElementById('combo');
const feverFill=document.getElementById('feverFill');
const warningEl=document.getElementById('warning');

function updateHUD(){

  scoreEl.textContent=SCORE;
  comboEl.textContent=COMBO;
  feverFill.style.width=`${FEVER}%`;
}

function showWarning(){

  warningEl.style.opacity=1;

  setTimeout(()=>{
    warningEl.style.opacity=0;
  },700);
}