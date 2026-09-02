/* Korean Worship bilingual language layer
   /worship remains the canonical Korean Worship URL.
   Language selection is handled by the shared header KOR/ENG control.
   English mode uses Google Website Translator so all existing page copy and all 30 lyrics are translated without duplicating the lyric source. */
(function(){
  'use strict';
  if(!/\/worship(?:\.html)?\/?$/.test(window.location.pathname)) return;

  var EN_TITLE='WORSHIP — My Hymn Vol.1–3 | Chris LEE.PAPA';
  var EN_DESC='The Korean Worship Archive of Chris LEE.PAPA — My Hymn Vol.1, Vol.2 and Vol.3, including the story behind the albums, worship reflections and the complete lyrics archive.';
  var KO_TITLE='WORSHIP – 나의 찬양 앨범 이야기와 가사집 | Chris LEE.PAPA';
  var KO_DESC='Chris LEE.PAPA의 Korean Worship Archive. 나의 찬양 Vol.1, Vol.2, Vol.3의 앨범 이야기, 제작 과정, 가사집과 공식 스트리밍 링크를 기록합니다.';

  function cookie(name,value,days){
    var expires='';
    if(days){var d=new Date();d.setTime(d.getTime()+days*864e5);expires='; expires='+d.toUTCString();}
    document.cookie=name+'='+value+expires+'; path=/; SameSite=Lax';
  }
  function clearCookie(name){
    document.cookie=name+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax';
  }
  function saved(){
    try{return localStorage.getItem('pref-lang')||'ko';}catch(e){return'ko';}
  }

  function metadata(){
    var en=saved()==='en';
    document.documentElement.lang=en?'en':'ko';
    document.title=en?EN_TITLE:KO_TITLE;
    var m=document.querySelector('meta[name="description"]');if(m)m.setAttribute('content',en?EN_DESC:KO_DESC);
    var ogt=document.querySelector('meta[property="og:title"]');if(ogt)ogt.setAttribute('content',en?EN_TITLE:KO_TITLE);
    var ogd=document.querySelector('meta[property="og:description"]');if(ogd)ogd.setAttribute('content',en?EN_DESC:KO_DESC);
  }

  function ensureGoogle(){
    window.googleTranslateElementInit=function(){
      if(!window.google||!google.translate||!google.translate.TranslateElement)return;
      try{new google.translate.TranslateElement({pageLanguage:'ko',includedLanguages:'en',autoDisplay:false,multilanguagePage:true},'google_translate_element');}catch(e){}
    };
    if(document.getElementById('google-translate-script')) return;
    var hidden=document.createElement('div');hidden.id='google_translate_element';hidden.setAttribute('aria-hidden','true');hidden.style.cssText='position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none';
    document.body.appendChild(hidden);
    var script=document.createElement('script');script.id='google-translate-script';script.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';script.defer=true;document.body.appendChild(script);
  }

  /* The shared header calls this after its KOR/ENG button changes pref-lang. */
  window.onLangChange=function(lang){
    if(lang==='en'){
      cookie('googtrans','/ko/en',30);
      window.location.reload();
    }else{
      clearCookie('googtrans');
      window.location.reload();
    }
  };

  function boot(){
    metadata();
    if(saved()==='en' && !document.cookie.match(/(?:^|; )googtrans=\/ko\/en/)){
      cookie('googtrans','/ko/en',30);window.location.reload();return;
    }
    ensureGoogle();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
