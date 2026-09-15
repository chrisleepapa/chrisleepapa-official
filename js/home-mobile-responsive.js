/* Home mobile responsive tuning — Galaxy S26 baseline */
(() => {
  'use strict';
  const style = document.createElement('style');
  style.id = 'home-mobile-responsive-style';
  style.textContent = `
    /* Keep Korean words intact and prevent horizontal overflow on the home page. */
    #chris-pick, #chris-note { overflow-x:hidden; }
    #chris-pick *, #chris-note * { min-width:0; }

    @media (max-width:700px){
      #chris-pick { padding-left:16px; padding-right:16px; box-sizing:border-box; }
      #chris-pick .clp-pick-title,
      #chris-pick h1,
      #chris-pick h2,
      #chris-pick h3 { word-break:keep-all; overflow-wrap:anywhere; line-height:1.35; }
      #chris-pick .clp-pick-title { font-size:1.45rem; }
      #chris-pick .clp-pick-sub { font-size:.82rem; line-height:1.55; word-break:keep-all; }
      #chris-pick .clp-pick-desc { font-size:.9rem; line-height:1.75; word-break:keep-all; }
      #chris-pick .clp-pick-main { font-size:.78rem; line-height:1.45; white-space:normal; word-break:keep-all; }
      #chris-pick p { word-break:keep-all; overflow-wrap:anywhere; }

      #chris-note { padding-left:15px; padding-right:15px; }
      #chris-note .chris-note-head { margin-bottom:26px; }
      #chris-note .chris-note-label { font-size:.6rem; line-height:1.5; letter-spacing:.14em; white-space:normal; overflow-wrap:anywhere; }
      #chris-note .chris-note-title { font-size:2rem; line-height:1.25; word-break:keep-all; }
      #chris-note .chris-note-intro { font-size:.86rem; line-height:1.75; word-break:keep-all; }
      #chris-note .home-editorial { padding:22px 17px; margin-bottom:34px; border-radius:18px; }
      #chris-note .home-editorial-kicker { font-size:.58rem; line-height:1.5; letter-spacing:.12em; }
      #chris-note .home-editorial h3 { font-size:1.2rem; line-height:1.5; word-break:keep-all; }
      #chris-note .home-editorial p { font-size:.84rem; line-height:1.8; word-break:keep-all; }
      #chris-note .home-editorial-grid { grid-template-columns:1fr; gap:9px; }
      #chris-note .home-editorial-item { padding:14px; }
      #chris-note .home-editorial-item strong { font-size:.68rem; line-height:1.5; }
      #chris-note .home-editorial-item span { font-size:.78rem; line-height:1.7; word-break:keep-all; }
      #chris-note .home-editorial-links { gap:7px; }
      #chris-note .home-editorial-links a { padding:7px 11px; font-size:.67rem; white-space:normal; word-break:keep-all; }
      #chris-note .chris-note-grid { grid-template-columns:1fr; gap:10px; }
      #chris-note .chris-note-card { padding:20px 17px; border-radius:15px; }
      #chris-note .chris-note-no { font-size:.58rem; line-height:1.5; }
      #chris-note .chris-note-card h3 { margin:13px 0 8px; font-size:.98rem; line-height:1.55; word-break:keep-all; }
      #chris-note .chris-note-card p { font-size:.8rem; line-height:1.75; word-break:keep-all; }
      #chris-note .chris-note-meta { font-size:.6rem; line-height:1.6; word-break:keep-all; }
      #chris-note .chris-note-read { font-size:.67rem; line-height:1.5; }
    }

    @media (max-width:390px){
      #chris-pick { padding-left:12px; padding-right:12px; }
      #chris-pick .clp-pick-title { font-size:1.32rem; }
      #chris-pick .clp-pick-desc { font-size:.86rem; }
      #chris-note { padding-left:10px; padding-right:10px; }
      #chris-note .chris-note-title { font-size:1.82rem; }
      #chris-note .chris-note-intro { font-size:.82rem; }
      #chris-note .home-editorial { padding:20px 14px; }
      #chris-note .home-editorial h3 { font-size:1.12rem; }
      #chris-note .home-editorial p { font-size:.8rem; }
      #chris-note .home-editorial-item span { font-size:.75rem; }
      #chris-note .chris-note-card { padding:18px 15px; }
      #chris-note .chris-note-card h3 { font-size:.94rem; }
      #chris-note .chris-note-card p { font-size:.77rem; }
    }
  `;
  document.head.appendChild(style);
})();
