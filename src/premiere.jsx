import React, {useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';

const scenes = [
  ['SISTER SQUAD 3', '2050, 로봇 전쟁', '2050, Robot War', '강철의 도시에서, 엄마와 똑같은 목소리가 들려왔다.', 'In a city of steel, they heard a voice that sounded like Mom.', '/images/ss3_front.jpg', '/sistersquad-hub#sistersquad3', '3권 미리보기', 'Preview Book 3'],
  ['SISTER SQUAD 2', '저주받은 요정마을', 'The Cursed Fairy Village', '두 자매와 아빠가 저주받은 루미나로 향합니다.', 'The sisters and their dad set out for cursed Lumina.', '/assets/home/sister-squad-2.webp', '/sistersquad2#ss2-full-story', '본편 감상', 'Watch the film'],
  ['MIRACLE SHOT', '미라클 샷', 'Miracle Shot', '풋살 코트에서 시작된 아이들의 이야기.', 'A story of friendship on the futsal court.', '/assets/home/miracle-shot.webp', '/miracleshot', '작품 보기', 'Explore the story']
];
function Label({ko,en}) {
  return <><span className="nav-label-ko" lang="ko">{ko}</span><span className="nav-label-en" lang="en">{en}</span></>;
}
function Premiere() {
  const [index,setIndex] = useState(0);
  const touch = useRef(null);
  const [series,title,en,hook,enHook,image,url,cta,enCta] = scenes[index];
  function move(step) { setIndex(i => (i + step + scenes.length) % scenes.length); }
  function endSwipe(event) {
    if (!touch.current) return;
    const point = event.changedTouches[0];
    const dx = point.clientX - touch.current.x;
    const dy = point.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)*1.5) move(dx < 0 ? 1 : -1);
  }
  return <div className="premiere-stage" onTouchStart={e => {touch.current = {x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={endSwipe} onTouchCancel={()=>{touch.current=null;}} onKeyDown={e=>{
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {e.preventDefault(); move(e.key === 'ArrowRight' ? 1 : -1);}
  }}>
    <img key={image} className="premiere-art" alt="" src={image} fetchPriority="high"/>
    <div className="premiere-copy" aria-live="polite">
      <p>{series}</p><h1 id="home-title"><Label ko={title} en={en}/></h1>
      <p><Label ko={hook} en={enHook}/></p>
      <a href={url}><Label ko={cta} en={enCta}/> ↗</a>
    </div>
    <div className="premiere-switch">{scenes.map(([name],i)=><button type="button" key={name} aria-pressed={index===i} onClick={()=>setIndex(i)}>{name}</button>)}</div>
  </div>;
}
const host = document.getElementById('sistersquad3-premiere');
if (host) createRoot(host).render(<Premiere/>);
