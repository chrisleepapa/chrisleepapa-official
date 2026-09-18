(function(){
  'use strict';
  if(!/^\/movie(?:\.html)?\/?$/i.test(window.location.pathname)) return;

  var script=document.createElement('script');
  script.src='/js/movie-notes-switch-original.js?v=20260918-5';
  document.head.appendChild(script);
})();
