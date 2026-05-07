function saveGame(){

  localStorage.setItem(
    'ssr_highscore',
    SCORE
  );
}

function loadGame(){

  return Number(
    localStorage.getItem('ssr_highscore') || 0
  );
}
