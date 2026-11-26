/* Site-wide link and image sharing. Hosted share previews use each page's static OG tags. */
(function(){
  'use strict';
  var overlay=document.getElementById('shareOverlay');
  if(!overlay || overlay.dataset.shareReady==='1')return;
  overlay.dataset.shareReady='1';
  var openBtn=document.getElementById('shareOpenBtn');
  var mobileBtn=document.getElementById('mobileShareOpenBtn');
  var closeBtn=document.getElementById('shareCloseBtn');
  var copyBtn=document.getElementById('shareCopyBtn');
  var snsBtn=document.getElementById('shareSNSBtn');
  var imageBtn=document.getElementById('shareImageBtn');
  var previewImg=document.getElementById('sharePreviewImg');
  var previewTitle=document.getElementById('sharePreviewTitle');
  var previewDescription=document.getElementById('sharePreviewDescription');
  var previewURL=document.getElementById('sharePreviewURL');
  var previewLink=document.getElementById('sharePreviewLink');
  var lastFocus, shareInfo, open=false;
  function meta(selector){return document.querySelector(selector)?.getAttribute('content')?.trim()||'';}
  function fullUrl(path){try{var u=new URL(path,location.origin);if(u.hostname==='chrisleepapa.com'&&location.hostname!=='chrisleepapa.com')return new URL(u.pathname+u.search,location.origin).href;return u.href}catch(_){return location.origin+'/images/og_share.png';}}
  function pageInfo(href, label){
    /* Always share public URLs, even when testing on the develop subdomain. */
    var url=new URL(href||location.href,location.origin);
    if(url.origin!==location.origin&&url.origin!=='https://chrisleepapa.com')return null;
    url.searchParams.delete('promo');
    url.protocol='https:';
    url.host='chrisleepapa.com';
    var path=url.pathname.replace(/\/$/,'')||'/';
    var current=path===(location.pathname.replace(/\/$/,'')||'/');
    var title=current?(meta('meta[property="og:title"]')||document.title):'';
    var desc=current?(meta('meta[property="og:description"]')||meta('meta[name="description"]')):'';
    var img=current?meta('meta[property="og:image"]'):'';
    if(path==='/'){
      title='Chris LEE.PAPA | 책, 영상, 음악 그리고 제작기';
      desc='Chris LEE.PAPA의 창작 세계 — SISTER SQUAD 3, 도서와 음악, 영상, 제작기';
      img='/images/ss3_front.jpg';
      if(url.hash==='#sistersquad3-premiere'){
        title='SISTER SQUAD 3 | 2050 로봇 전쟁';
        desc='마법을 넘어 2050년 로봇의 도시로. 율이와 정이의 새로운 모험, SISTER SQUAD 3.';
      }else url.hash='';
    }
    if(!title)title=label||'Chris LEE.PAPA';
    if(!desc)desc='Chris LEE.PAPA — Books, music, films and creative stories.';
    if(!img) {
      var imgMap={'/sistersquad':'/images/sistersquad1.png','/sistersquad2':'/images/sistersquad2_poster.jpg','/sistersquad-hub':'/images/sistersquad_amazon.png','/sistersquad-share':'/images/sistersquad_amazon.png','/shop':'/images/sistersquad2_poster.jpg','/miracleshot':'/images/miracleshot1.png','/music':'/images/music.jpg','/movie':'/images/movie.png','/wallpaper':'/images/wallpaper01.png','/yul':'/images/yul01.png','/jung':'/images/jung01.png'};
      img=imgMap[path]||'/images/og_share.png';
    }
    return {title:title,description:desc,url:url.href,image:fullUrl(img)};
  }
  function selectedLang(){return document.documentElement.lang==='en'?'en':'ko';}
  function escapeText(s){return String(s||'').replace(/\s+/g,' ').trim();}
  function setPreview(info){
    shareInfo=info;
    previewImg.src=info.image;
    previewImg.alt=selectedLang()==='en'?'Preview artwork for shared page':'공유할 페이지의 대표 이미지';
    previewTitle.textContent=escapeText(info.title);
    previewDescription.textContent=escapeText(info.description);
    previewURL.textContent=info.url;
    previewLink.href=info.url;
  }
  function show(href,label){
    var info=pageInfo(href,label);
    if(!info)return;
    lastFocus=document.activeElement;
    setPreview(info);
    overlay.style.display='flex';
    overlay.setAttribute('aria-hidden','false');
    overlay.classList.add('active');
    open=true;
    closeBtn?.focus({preventScroll:true});
  }
  function close(){
    if(!open)return;
    open=false;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden','true');
    overlay.style.display='none';
    if(lastFocus&&lastFocus.isConnected)lastFocus.focus({preventScroll:true});
  }
  function feedback(ko,en){if(typeof window.showToast==='function')window.showToast(selectedLang()==='en'?en:ko);}
  async function copyText(value){
    if(navigator.clipboard&&window.isSecureContext){
      try{await navigator.clipboard.writeText(value);return true}catch(_){}
    }
    var node=document.createElement('textarea');
    node.value=value;node.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';
    document.body.appendChild(node);node.select();
    var ok=false;try{ok=document.execCommand('copy')}catch(_){}
    node.remove();return ok;
  }
  openBtn?.addEventListener('click',function(){show('/')});
  mobileBtn?.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();show('/')});
  closeBtn?.addEventListener('click',close);
  overlay.addEventListener('click',function(e){if(e.target===overlay)close()});
  overlay.addEventListener('keydown',function(e){
    if(e.key==='Escape'){e.preventDefault();close();return}
    if(e.key!=='Tab')return;
    var list=Array.from(overlay.querySelectorAll('a[href],button:not([disabled])')).filter(function(el){return el.getClientRects().length>0});
    if(!list.length)return;
    var first=list[0],last=list[list.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  });
  copyBtn?.addEventListener('click',async function(){
    if(await copyText(shareInfo.url)){feedback('페이지 링크를 복사했습니다.','Page link copied.');close()}
    else feedback('링크를 복사할 수 없습니다.','Could not copy link.');
  });
  snsBtn?.addEventListener('click',async function(){
    if(!shareInfo)return;
    var info=shareInfo;
    if(navigator.share){
      try{await navigator.share({title:info.title,text:info.description,url:info.url});close();return}
      catch(e){if(e.name==='AbortError')return}
    }
    if(await copyText(info.url)) feedback('링크를 복사했습니다. 카카오톡이나 SNS에 붙여넣으세요.','Link copied. Paste it into your social app.');
  });
  imageBtn?.addEventListener('click',async function(){
    if(!shareInfo)return;
    var info=shareInfo;
    try{
      var res=await fetch(info.image,{mode:'cors'});
      if(!res.ok)throw Error('image fetch failed');
      var blob=await res.blob(), type=blob.type||'image/png';
      if(!/^image\/(png|jpeg|webp)$/.test(type))throw Error('unsupported image');
      var extension=type==='image/jpeg'?'jpg':type==='image/webp'?'webp':'png';
      var file=new File([blob],'chrisleepapa-share.'+extension,{type:type});
      if(navigator.share && navigator.canShare && navigator.canShare({files:[file]})){
        await navigator.share({files:[file],title:info.title,text:info.url});
        close();return;
      }
      var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},5000);
      feedback('이미지를 저장했습니다. 링크는 별도 복사해 주세요.','Image downloaded. Copy the link separately.');
    }catch(err){if(err.name!=='AbortError')feedback('이미지 공유를 지원하지 않는 브라우저입니다. 링크 공유를 이용해 주세요.','Image sharing is not supported here. Please share the link.')}
  });
  /* Keep only the shared header controls; remove legacy content share controls. */
  document.querySelectorAll('main .site-share-content-tools, main .site-share-page-action, main [data-site-share-action]').forEach(function(node){node.remove();});
})();
