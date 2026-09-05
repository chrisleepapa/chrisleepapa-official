'use strict';
(()=>{
const style=document.createElement('style');
style.textContent=`.player-mini small{display:block!important;font-size:12px!important;font-weight:900!important;letter-spacing:.08em!important;line-height:1.3!important;color:var(--cyan)!important}.player-mini small::before{content:'KICKS · ';color:var(--gold)}@media(max-width:650px){.player-mini small{font-size:9px!important}.player-mini small::before{content:'KICKS · ';}}`;
document.head.appendChild(style);
function fixResult(){const r=document.getElementById('resultScreen');if(!r||!r.classList.contains('active'))return;const a=Number(document.getElementById('finalP1')?.textContent||0),b=Number(document.getElementById('finalP2')?.textContent||0);const title=document.getElementById('resultTitle'),wins=document.getElementById('roundWins'),msg=document.getElementById('resultMessage');if(title)title.textContent=a>b?'PLAYER 1 WINS':b>a?'PLAYER 2 WINS':'DRAW';if(wins)wins.textContent=`FINAL SCORE · PLAYER 1 ${a} — ${b} PLAYER 2`;if(msg)msg.textContent=a>b?'MIRACLE SHOT!':b>a?'GREAT SHOT!':'TIED MATCH!'}
const observer=new MutationObserver(fixResult);observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
setInterval(fixResult,250);
})();
