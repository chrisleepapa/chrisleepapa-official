/* PLAY pages: Galaxy S26-class mobile typography/layout tuning */
'use strict';
(() => {
  if (window.__clpPlayMobileResponsiveLoaded) return;
  window.__clpPlayMobileResponsiveLoaded = true;

  const style = document.createElement('style');
  style.textContent = `
    @media (max-width:700px){
      html,body{width:100%;max-width:100%;min-width:0;overflow-x:hidden}
      img,video,iframe,canvas,svg{max-width:100%}
      .page-wrapper,.page-container,.content-wrapper,.main-content{width:100%;max-width:100%;min-width:0;box-sizing:border-box;overflow-x:hidden}
      .page-header{max-width:100%;min-width:0;padding-left:14px;padding-right:14px;box-sizing:border-box}
      .page-title,.header-title,h1,h2,h3{max-width:100%;word-break:keep-all;overflow-wrap:anywhere}
      p,li,a,button,span{overflow-wrap:anywhere}
      .interactive-player-wrapper{width:100%;max-width:100%;min-width:0;box-sizing:border-box;margin-left:0;margin-right:0;padding:0 12px;display:flex;flex-direction:column;gap:16px}
      .player-focus,.playlist-sidebar{width:100%;max-width:100%;min-width:0;box-sizing:border-box}
      .player-focus{padding:24px 16px}
      .playlist-sidebar{padding:18px 14px;max-height:none;overflow:visible}
      .album-art-large{max-width:72vw;margin-bottom:22px}
      .active-info h2{font-size:1.45rem;line-height:1.45;word-break:keep-all}
      .active-info p{font-size:.84rem;line-height:1.7;word-break:keep-all}
      .page-header + *{max-width:100%;min-width:0}
      .music-grid,.album-grid,.track-grid,.playlist-grid,.video-grid,.movie-grid,.game-grid,.game-selection-wrapper{width:100%;max-width:100%;min-width:0;box-sizing:border-box}
      .music-grid,.album-grid,.track-grid,.playlist-grid,.video-grid,.movie-grid{grid-template-columns:1fr!important}
      .music-card,.album-card,.track-card,.playlist-card,.video-card,.movie-card,.game-card,.game-selection-card{width:100%;max-width:100%;min-width:0;box-sizing:border-box}
      .music-card img,.album-card img,.track-card img,.video-card img,.movie-card img,.game-card img{max-width:100%;height:auto}
      .game-selection-wrapper{padding-left:12px;padding-right:12px}
      .game-selection-wrapper img{max-width:100%;height:auto}
      .game-selection-wrapper a,.game-selection-wrapper button{max-width:100%;white-space:normal;word-break:keep-all}
      table{width:100%!important;max-width:100%;min-width:0!important;table-layout:fixed}
      th,td{max-width:100%;white-space:normal;word-break:break-word;overflow-wrap:anywhere}
      .video-container,.video-wrapper,.youtube-wrapper,.embed-wrapper{width:100%;max-width:100%;min-width:0;box-sizing:border-box}
      iframe{width:100%;max-width:100%}
    }
    @media (max-width:390px){
      .page-header{padding-left:10px;padding-right:10px}
      .interactive-player-wrapper{padding-left:8px;padding-right:8px}
      .player-focus{padding:20px 13px}
      .playlist-sidebar{padding:16px 12px}
      .active-info h2{font-size:1.3rem}
    }
  `;
  document.head.appendChild(style);
})();
