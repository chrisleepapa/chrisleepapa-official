'use strict';
(()=>{
const style=document.createElement('style');
style.textContent=`
.player-mini small{display:block!important;font-size:12px!important;font-weight:900!important;letter-spacing:.08em!important;line-height:1.3!important;color:var(--cyan)!important}.player-mini small::before{content:'KICKS · ';color:var(--gold)}
.meters > div:nth-child(2),.meters > div:nth-child(3){display:none!important}
@media(max-width:650px){.player-mini small{font-size:9px!important}.player-mini small::before{content:'KICKS · ';}}
`;
document.head.appendChild(style);
const p1=$('p1Total'),p2=$('p2Total'),s1=$('p1Shots'),s2=$('p2Shots');
let round=0,lastShots=[0,0],baseline=[0,0],matchTotal=[0,0],roundScore=[0,0],roundWins=[0,0],roundClosed=false,suppress=false;
function $(id){return document.getElementById(id)}
function showFinal(){const game=$('gameScreen'),result=$('resultScreen');if(!game||!result)return;game.classList.remove('active');result.classList.add('active');$('finalP1').textContent=matchTotal[0];$('finalP2').textContent=matchTotal[1];fixResult()}
function fixResult(){const r=$('resultScreen');if(!r||!r.classList.contains('active'))return;const a=Number($('finalP1')?.textContent||matchTotal[0]),b=Number($('finalP2')?.textContent||matchTotal[1]);const title=$('resultTitle'),wins=$('roundWins'),msg=$('resultMessage');if(title)title.textContent=a>b?'PLAYER 1 WINS':b>a?'PLAYER 2 WINS':'DRAW';if(wins)wins.textContent=`ROUND WINS · PLAYER 1 ${roundWins[0]} — ${roundWins[1]} PLAYER 2 · FINAL SCORE ${a} — ${b}`;if(msg)msg.textContent=a>b?'MIRACLE SHOT!':b>a?'GREAT SHOT!':'TIED MATCH!'}
function tick(){
 const game=$('gameScreen');if(!game||!game.classList.contains('active')){fixResult();return}
 const r=Number($('setNumber')?.textContent||1),aShots=parseInt(($('p1Shots')?.textContent||'0').match(/\d+/)?.[0]||0),bShots=parseInt(($('p2Shots')?.textContent||'0').match(/\d+/)?.[0]||0);
 const aDom=Number(p1?.textContent||0),bDom=Number(p2?.textContent||0);
 if(round===0){round=r;baseline=[0,0];matchTotal=[aDom,bDom];roundScore=[0,0];lastShots=[aShots,bShots];}
 if(r!==round){round=r;baseline=[...matchTotal];roundScore=[0,0];roundClosed=false;lastShots=[aShots,bShots];suppress=true;if(p1)p1.textContent='0';if(p2)p2.textContent='0';suppress=false;return}
 const shotChanged=aShots!==lastShots[0]||bShots!==lastShots[1];
 if(shotChanged){
   if(aShots>lastShots[0]){matchTotal[0]=aDom;roundScore[0]=matchTotal[0]-baseline[0]}
   if(bShots>lastShots[1]){matchTotal[1]=bDom;roundScore[1]=matchTotal[1]-baseline[1]}
   lastShots=[aShots,bShots];
 }
 if(!roundClosed&&aShots>=10&&bShots>=10){
   roundClosed=true;
   if(roundScore[0]>roundScore[1])roundWins[0]++;else if(roundScore[1]>roundScore[0])roundWins[1]++;
   if(roundWins[0]>=2||roundWins[1]>=2){showFinal();return}
 }
 suppress=true;if(p1)p1.textContent=String(roundScore[0]);if(p2)p2.textContent=String(roundScore[1]);suppress=false;
}
const observer=new MutationObserver(()=>{if(!suppress)tick();if($('resultScreen')?.classList.contains('active'))fixResult()});
observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
setInterval(tick,100);
})();
