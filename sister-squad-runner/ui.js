const scoreEl=document.getElementById('score');
const comboEl=document.getElementById('combo');
const feverFill=document.getElementById('feverFill');
const warningEl=document.getElementById('warning');
const characterSelectEl=document.getElementById('characterSelect');
const characterCards=document.querySelectorAll('.character-card');

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
function updateCharacterCards(){

  characterCards.forEach(card=>{
    const isSelected=card.dataset.character===selectedCharacter;

    card.classList.toggle('selected',isSelected);
    card.setAttribute('aria-pressed',String(isSelected));
  });
}

function closeCharacterSelect(){

  GAME_STARTED=true;
  characterSelectEl.classList.add('hidden');
}

characterCards.forEach(card=>{
  card.addEventListener('click',()=>{
    selectCharacter(card.dataset.character);
    updateCharacterCards();
    closeCharacterSelect();
  });
});

updateCharacterCards();
