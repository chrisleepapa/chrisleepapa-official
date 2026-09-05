'use strict';
(()=>{
const style=document.createElement('style');
style.textContent=`.player-mini small{display:block!important;font-size:12px!important;font-weight:900!important;letter-spacing:.08em!important;line-height:1.3!important;color:var(--cyan)!important}.player-mini small::before{content:'KICKS · ';color:var(--gold)}.meters > div:nth-child(2),.meters > div:nth-child(3){display:none!important}@media(max-width:650px){.player-mini small{font-size:9px!important}.player-mini small::before{content:'KICKS · ';}}`;
document.head.appendChild(style);
})();
