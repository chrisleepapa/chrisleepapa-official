
'use client'
import React, { useState, useRef, useEffect } from "react";

export default function Page() {
  const [current, setCurrent] = useState(null);
  const audioRef = useRef(null);

  const tracks = [
    { title: "Furious", src: "/audio/furious.mp3" },
    { title: "Rise Again", src: "/audio/rise.mp3" },
    { title: "Awake Praise", src: "/audio/awake.mp3" }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setCurrent((prev) => (prev + 1) % tracks.length);
      };
    }
  }, [current]);

  return (
    <div style={{background:"black",color:"white",minHeight:"100vh",padding:"40px"}}>
      <h1>Chris Lee.Papa - Creative Archive</h1>

      {tracks.map((t,i)=>(
        <div key={i} style={{margin:"10px 0"}}>
          <button onClick={()=>setCurrent(i)}>{t.title} ▶</button>
        </div>
      ))}

      {current !== null && (
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#111",padding:"20px"}}>
          <audio ref={audioRef} controls autoPlay style={{width:"100%"}}>
            <source src={tracks[current].src} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  )
}
