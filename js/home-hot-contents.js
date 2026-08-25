/* Home: Chris's HOT Song — platform TOP 10 */
'use strict';
(() => {
  if ((location.pathname.split('/').pop() || 'index.html').toLowerCase() !== 'index.html') return;
  const SONGS = [
    {title:'Miracle Shot',href:'miracleshot.html'},
    {title:'We Own the Cup',href:'works.html'},
    {title:'승리하리라',href:'worship.html'},
    {title:'Running With You, Lord!',href:'worship.html'},
    {title:'When the City Stood Still',href:'works.html'},
    {title:'To The Space',href:'works.html'},
    {title:'Ensemble',href:'works.html'},
    {title:'To Rise',href:'works.html'},
    {title:'사랑한다고',href:'works.html'},
    {title:'2026 난리났어',href:'works.html'}
  ];
  const PLATFORMS=[['spotify','Spotify'],['apple','Apple Music'],['youtube','YouTube']];
  let platform='spotify';
  function css(){if(document.getElementById('clp-hot-song-style'))return;const s=document.createElement('style');s.id='clp-hot-song-style';s.textContent=`#clp-hot{width:100%;max-width:980px;margin:0 auto;padding:70px 22px 90px;color:#f0ece4;box-sizing:border-box}#clp-hot .hot-kicker{color:#c9a84c;font:700 .68rem Cinzel,serif;letter-spacing:.3em;text-align:center}#clp-hot h2{margin:9px 0 9px;text-align:center;color:#fff;font:600 clamp(2rem,5vw,3.3rem)/1 'Cormorant Garamond',serif}#clp-hot .hot-desc{text-align:center;color:#777;font:.7rem Pretendard,sans-serif;margin-bottom:28px}#clp-hot .hot-platforms{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:25px}#clp-hot .hot-platforms button{cursor:pointer;padding:10px 18px;border:1px solid rgba(255,255,255,.1);border-radius:22px;background:transparent;color:#888;font:600 .74rem Pretendard,sans-serif;transition:.2s}#clp-hot .hot-platforms button.active{background:rgba(201,168,76,.12);border-color:rgba(201,168,76,.45);color:#e8d08a}.hot-list{display:grid;gap:8px}.hot-item{display:grid;grid-template-columns:52px 1fr 20px;align-items:center;gap:14px;padding:16px;border:1px solid rgba(255,255,255,.065);border-radius:12px;background:rgba(255,255,255,.018);transition:.25s}.hot-item:hover{border-color:rgba(201,168,76,.28);background:rgba(201,168,76,.035);transform:translateX(3px)}.hot-no{color:rgba(201,168,76,.72);font:600 1rem Cinzel,serif}.hot-title{color:#eee;font:600 .98rem Pretendard,sans-serif}.hot-meta{margin-top:4px;color:#666;font:.63rem Pretendard,sans-serif}.hot-go{color:#8f8b93;font-size:17px}.hot-note{margin:16px 0 0;text-align:center;color:#555;font:.64rem/1.6 Pretendard,sans-serif}@media(max-width:600px){#clp-hot{padding:55px 15px 65px}.hot-item{grid-template-columns:38px 1fr 16px;padding:14px 12px}.hot-title{font-size:.88rem}}`;document.head.appendChild(s)}
  function render(){
    css();
    const host=document.getElementById('hot-contents');
    if(!host)return;
    host.id='clp-hot';
    host.innerHTML='<div class="hot-kicker">CHRIS\'S HOT SONG</div><h2>Chris\'s HOT Song</h2><div class="hot-desc">플랫폼별 인기 음악 TOP 10</div><div class="hot-platforms"></div><div class="hot-list"></div><div class="hot-note">Spotify · Apple Music · YouTube의 음악 순위를 각각 보여줍니다. 조회수 숫자는 표시하지 않습니다.</div>';
    const tabs=host.querySelector('.hot-platforms');
    PLATFORMS.forEach(([v,l])=>{const b=document.createElement('button');b.textContent=l;b.dataset.value=v;b.onclick=()=>{platform=v;update()};tabs.appendChild(b)});
    update();
  }
  function update(){const host=document.getElementById('clp-hot');if(!host)return;host.querySelectorAll('.hot-platforms button').forEach(b=>b.classList.toggle('active',b.dataset.value===platform));const list=host.querySelector('.hot-list');list.innerHTML='';SONGS.forEach((x,i)=>{const a=document.createElement('a');a.className='hot-item';a.href=x.href;a.innerHTML=`<div class="hot-no">${String(i+1).padStart(2,'0')}</div><div><div class="hot-title"></div><div class="hot-meta"></div></div><div class="hot-go">›</div>`;a.querySelector('.hot-title').textContent=x.title;a.querySelector('.hot-meta').textContent=platform==='spotify'?'Spotify':platform==='apple'?'Apple Music':'YouTube';list.appendChild(a)})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();
