
/* Theme preference: default to light mode; keep the user's saved choice. */
(function(){
  try{
    const saved=localStorage.getItem('clp-theme');
    document.documentElement.dataset.theme=saved==='dark'?'dark':'light';
  }catch(_){document.documentElement.dataset.theme='light';}
})();
/* 3단계 UX / navigation layer */
'use strict';

const BASE_I18N = {
  ko: { nav_home:'Home',nav_works:'Works',nav_squad:'Sister Squad',nav_journal:'Journal',nav_about:'About',nav_music:'Music',nav_movie:'Movies',nav_squad_short:'SQUAD',nav_squad_1:'SISTER SQUAD',nav_squad_2:'SISTER SQUAD 2',share_title:'SHARE ARCHIVE',share_desc:'이곳의 기록과 영감을 소중한 사람들에게 전하세요.',share_copy:'COPY LINK',share_sns:'SNS SHARE',share_close:'Close',footer_text:'© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',footer_privacy:'개인정보처리방침',footer_terms:'이용약관',toast_copy:'링크가 복사되었습니다 ✓',toast_error:'지원하지 않는 브라우저입니다.',home_static_title:'창작 기록과 제작 과정',home_static_intro:'Chris LEE.PAPA는 음악, 이야기, 영상, 워십을 하나의 창작 기록으로 이어갑니다. 완성된 작품만 보여주는 대신, 무엇을 만들었는지와 함께 왜 시작했는지, 어떤 과정을 거쳤는지, 무엇을 배웠는지를 기록합니다.',home_archive_squad:'SISTER SQUAD',home_archive_music:'Music Archive',home_archive_worship:'Worship Archive',home_recent_heading:'최근 창작 기록',home_recent_1_title:'오랫동안 품어온 나만의 이야기',home_recent_1_desc:'— SISTER SQUAD가 시작된 배경과 첫 번째 창작 과정을 기록했습니다.',home_recent_2_title:'Skywork로 그림소설 만들기',home_recent_2_desc:'— 프롬프트부터 수정과 퇴고까지 실제 제작 과정을 정리했습니다.',home_recent_3_title:'POD로 직접 책을 출판하는 법',home_recent_3_desc:'— 원고와 표지 제작부터 ISBN, 유통과 출판까지의 경험을 기록했습니다.',home_journal_all:'전체 Journal에서 더 많은 제작 기록 읽기 →' },
  en: { nav_home:'Home',nav_works:'Works',nav_squad:'Sister Squad',nav_journal:'Journal',nav_about:'About',nav_music:'Music',nav_movie:'Movies',nav_squad_short:'SQUAD',nav_squad_1:'SISTER SQUAD',nav_squad_2:'SISTER SQUAD 2',share_title:'SHARE ARCHIVE',share_desc:'Share the records and inspiration here with your loved ones.',share_copy:'COPY LINK',share_sns:'SNS SHARE',share_close:'Close',footer_text:'© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',footer_privacy:'Privacy Policy',footer_terms:'Terms of Use',toast_copy:'Link copied ✓',toast_error:'Sharing is not supported in this browser.',home_static_title:'Creative Records & Production Process',home_static_intro:'Chris LEE.PAPA connects music, stories, films, and worship into one creative record. Instead of showing only finished works, this archive records why each project began, how it was made, and what was learned along the way.',home_archive_squad:'SISTER SQUAD',home_archive_music:'Music Archive',home_archive_worship:'Worship Archive',home_recent_heading:'Recent Creative Records',home_recent_1_title:'A Story I Had Carried for a Long Time',home_recent_1_desc:'— The background behind SISTER SQUAD and the process of creating the first story.',home_recent_2_title:'Creating a Picture Story with Skywork',home_recent_2_desc:'— The actual production process, from prompts to revision and editing.',home_recent_3_title:'How I Published a Book with POD',home_recent_3_desc:'— My experience from manuscript and cover production to ISBN, distribution, and publication.',home_journal_all:'Read more production stories in the full Journal →' }
};

let currentLang='ko';
/* Resolve the saved language before Home's deferred renderer scripts run. */
currentLang=getSavedLanguage();
document.documentElement.lang=currentLang;
window.getCurrentLang=()=>currentLang;
let i18n={ko:{...BASE_I18N.ko},en:{...BASE_I18N.en}};

function getSiteRoot(){const script=document.querySelector('script[src*="main.js"]');if(script&&script.src){try{return new URL('../',script.src).href}catch(_){}}return new URL('/',document.baseURI).href;}
function getSiteFileUrl(file){return new URL(String(file).replace(/^\//,''),getSiteRoot()).href;}
async function loadComponent(id,file){const target=document.getElementById(id);if(!target)return false;try{const response=await fetch(getSiteFileUrl(file),{cache:'no-cache'});if(!response.ok)throw new Error(`HTTP ${response.status}`);target.innerHTML=await response.text();return true;}catch(error){console.warn(`[main.js] component load failed: ${file}`,error);return false;}}
function getSavedLanguage(){try{const saved=localStorage.getItem('pref-lang');return saved==='en'||saved==='ko'?saved:'ko';}catch(_){return'ko';}}
function getCurrentPageKey(){let path=(window.location.pathname||'/').split('?')[0].split('#')[0].replace(/\/+$/,'');if(!path)return'index';return((path.split('/').pop()||'index').replace(/\.html$/i,'')||'index').toLowerCase();}
function loadScriptOnce(src,id){if(id&&document.getElementById(id))return;if([...document.scripts].some(script=>script.src===new URL(src,document.baseURI).href))return;const script=document.createElement('script');if(id)script.id=id;script.src=src;script.defer=true;document.head.appendChild(script);}

function normalizeInternalLinks(){
  const page=getCurrentPageKey();
  if(/^journal(?:-\d+)?$/.test(page)){
    document.querySelectorAll('a[href="book"],a[href="/book"],a[href="book/"]').forEach(link=>{
      link.setAttribute('href','/sistersquad-hub');
      if((link.textContent||'').toLowerCase().includes('book')) link.setAttribute('aria-label','SISTER SQUAD HUB — BOOK archive');
    });
  }
  document.querySelectorAll('a.back-link').forEach(link=>{
    const text=(link.textContent||'').toLowerCase();
    if(text.includes('journal') && /^journal(?:-\d+)?$/.test(page)) link.setAttribute('href','/journal');
  });
}

function loadPageSpecificScripts(){const page=getCurrentPageKey();
  if(page==='sistersquad-hub'||page==='miracleshot') loadScriptOnce('/js/project-page-banners.js?v=20261115');
  if(/^journal-[1-6]$/.test(page)) loadScriptOnce('/js/journal-mobile-responsive.js?v=20260915-2');
  if(page==='music'||page==='movie') loadScriptOnce('/js/play-mobile-responsive.js?v=20260915-1');
  if(page==='sistersquad-hub'){const card=document.querySelector('.sq-links .sq-link:nth-child(1)');if(card)card.style.backgroundImage="url('/images/sistersquad1.png?v=20260828')";loadScriptOnce('/js/sistersquad-hub-i18n.js?v=20261013','sistersquad-hub-i18n');return;}if(page==='sistersquad2'){loadScriptOnce('/js/sistersquad2-ost.js?v=20261115-language','sistersquad2-ost');return;}}

async function loadComponents(){if(window.PAGE_I18N){i18n.ko={...BASE_I18N.ko,...(window.PAGE_I18N.ko||{})};i18n.en={...BASE_I18N.en,...(window.PAGE_I18N.en||{})};}/* Apply the saved language before waiting for async header/footer components. */setLanguage(currentLang);await Promise.all([loadComponent('site-nav','components/header.html?v=creative'),loadComponent('site-footer','components/footer.html?v=creative')]);/* Re-apply after async components so Home content and newly injected UI always use the saved language. */setLanguage(currentLang);initScrollProgress();initNavScroll();initActiveNavLink();initLangDropdown();initThemeToggle();initShareModal();initSecurity();normalizeInternalLinks();loadPageSpecificScripts();if(typeof window.onMainReady==='function')window.onMainReady();}
function initScrollProgress(){const bar=document.getElementById('scroll-progress');if(!bar)return;const update=()=>{const scroll=window.scrollY||window.pageYOffset||0,max=document.documentElement.scrollHeight-window.innerHeight,percent=max>0?Math.max(0,Math.min(100,(scroll/max)*100)):0;bar.style.width=`${percent}%`;};window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});update();}
function initNavScroll(){const nav=document.getElementById('main-nav');if(!nav)return;const update=()=>nav.classList.toggle('scrolled',(window.scrollY||0)>40);window.addEventListener('scroll',update,{passive:true});update();}
function initActiveNavLink(){
  const page = getCurrentPageKey();
  const journal = /^journal(?:-\d+)?$/.test(page);
  const work = /^(?:sistersquad(?:-hub|2)?|yul|jung|miracleshot|music|movie|wallpaper)$/.test(page);
  const section = journal ? 'journal' : work ? 'works' : page;
  function update(){
    const activeSection = page === 'index' && location.hash === '#works' ? 'works' : section;
    document.querySelectorAll('#site-nav [data-page]').forEach(link => {
      const active = link.dataset.page === activeSection;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', link.dataset.page === page ? 'page' : 'location');
      else link.removeAttribute('aria-current');
    });
  }
  update();
  if (page === 'index') window.addEventListener('hashchange', update);
}
function initLangDropdown(){[['langWrapper','langToggleBtn'],['mobileLangWrapper','mobileLangToggleBtn']].forEach(([wrapperId,toggleId])=>{const wrapper=document.getElementById(wrapperId),toggle=document.getElementById(toggleId);if(!wrapper||!toggle)return;toggle.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const open=!wrapper.classList.contains('active');document.querySelectorAll('.lang-dropdown-wrapper').forEach(w=>w.classList.remove('active'));wrapper.classList.toggle('active',open);toggle.setAttribute('aria-expanded',String(open));});wrapper.querySelectorAll('.lang-btn').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();setLanguage(button.dataset.lang);}));});document.addEventListener('click',event=>document.querySelectorAll('.lang-dropdown-wrapper').forEach(wrapper=>{if(!wrapper.contains(event.target)){wrapper.classList.remove('active');const toggle=wrapper.querySelector('.lang-current');if(toggle)toggle.setAttribute('aria-expanded','false');}}));}
function setLanguage(lang){currentLang=i18n[lang]?lang:'ko';document.documentElement.lang=currentLang;try{localStorage.setItem('pref-lang',currentLang);}catch(_){}const pageDict=(window.PAGE_I18N&&window.PAGE_I18N[currentLang])||{};const dict={...(i18n[currentLang]||{}),...pageDict};document.querySelectorAll('[data-i18n]').forEach(element=>{const key=element.dataset.i18n;if(dict[key]!==undefined)element.innerHTML=dict[key];});['placeholder','aria-label','title','alt'].forEach(attribute=>{const marker='data-i18n-'+attribute;document.querySelectorAll('['+marker+']').forEach(element=>{const key=element.getAttribute(marker);if(dict[key]!==undefined)element.setAttribute(attribute,dict[key]);});});if(dict.meta_title)document.title=dict.meta_title;[['meta[name="description"]','meta_description'],['meta[property="og:title"]','og_title'],['meta[property="og:description"]','og_description'],['meta[name="twitter:title"]','twitter_title'],['meta[name="twitter:description"]','twitter_description']].forEach(([selector,key])=>{const element=document.querySelector(selector);if(element&&dict[key])element.setAttribute('content',dict[key]);});document.querySelectorAll('.lang-btn').forEach(button=>button.classList.toggle('active',button.dataset.lang===currentLang));const text=currentLang==='ko'?'KOR':'ENG',desktop=document.getElementById('currentLangText'),mobile=document.getElementById('mobileCurrentLangText');if(desktop)desktop.textContent=text;if(mobile)mobile.textContent=text;document.querySelectorAll('.lang-dropdown-wrapper').forEach(wrapper=>wrapper.classList.remove('active'));document.querySelectorAll('.lang-current').forEach(toggle=>toggle.setAttribute('aria-expanded','false'));if(typeof window.onLangChange==='function')window.onLangChange(currentLang);}
window.setLanguage=setLanguage;
function initThemeToggle(){
  const buttons=document.querySelectorAll('#themeToggleBtn,#mobileThemeToggleBtn');
  if(!buttons.length)return;
  const apply=(theme)=>{
    const light=theme==='light';
    document.documentElement.dataset.theme=light?'light':'dark';
    try{localStorage.setItem('clp-theme',light?'light':'dark');}catch(_){}
    buttons.forEach(button=>{const icon=button.querySelector('.theme-toggle-icon');if(icon)icon.textContent=light?'☾':'☀';button.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');button.title=light?'Dark mode':'Light mode';});
  };
  const initial=document.documentElement.dataset.theme==='light'?'light':'dark';
  apply(initial);
  buttons.forEach(button=>button.addEventListener('click',()=>apply(document.documentElement.dataset.theme==='light'?'dark':'light')));
}
function initShareModal(){const overlay=document.getElementById('shareOverlay');if(!overlay)return;const openButton=document.getElementById('shareOpenBtn'),closeButton=document.getElementById('shareCloseBtn'),copyButton=document.getElementById('shareCopyBtn'),snsButton=document.getElementById('shareSNSBtn'),close=()=>{overlay.classList.remove('active');overlay.setAttribute('aria-hidden','true');setTimeout(()=>{if(!overlay.classList.contains('active'))overlay.style.display='none';},300)},open=()=>{overlay.style.display='flex';overlay.setAttribute('aria-hidden','false');requestAnimationFrame(()=>overlay.classList.add('active'));};if(openButton)openButton.addEventListener('click',open);if(closeButton)closeButton.addEventListener('click',close);overlay.addEventListener('click',event=>{if(event.target===overlay)close();});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&overlay.classList.contains('active'))close();});if(copyButton)copyButton.addEventListener('click',async()=>{const url=window.location.href;let ok=false;if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(url);ok=true;}catch(_){} }if(!ok){const textarea=document.createElement('textarea');textarea.value=url;textarea.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.appendChild(textarea);textarea.focus();textarea.select();try{ok=document.execCommand('copy');}catch(_){}textarea.remove();}if(ok)showToast(i18n[currentLang].toast_copy);close();});if(snsButton)snsButton.addEventListener('click',async()=>{if(!navigator.share){showToast(i18n[currentLang].toast_error);return;}try{await navigator.share({title:document.title||'Chris LEE.PAPA',text:'Chris LEE.PAPA',url:window.location.href});}catch(_){}});}
function showToast(message){const toast=document.getElementById('toast');if(!toast)return;toast.textContent=message;toast.style.display='block';clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{toast.style.display='none';},2500);}window.showToast=showToast;
function initSecurity(){document.addEventListener('contextmenu',event=>{if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;event.preventDefault();});document.addEventListener('copy',event=>{if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;if(window.getSelection&&window.getSelection().toString())event.preventDefault();});document.addEventListener('keydown',event=>{if(event.target.closest&&event.target.closest('input,textarea,select,[contenteditable="true"]'))return;const key=String(event.key||'').toUpperCase();if(key==='F12'||(event.ctrlKey&&event.shiftKey&&(key==='I'||key==='J'))||(event.ctrlKey&&key==='U')){event.preventDefault();return;}if(event.ctrlKey&&['C','S','P'].includes(key)&&window.getSelection&&window.getSelection().toString())event.preventDefault();});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadComponents,{once:true});else loadComponents();

/* Shared guestbook: restore it on every standard page with a shared footer.
   Pages that already load guestbook.js keep their existing single instance. */
(function ensureSharedGuestbook(){
  function loadGuestbookIfNeeded(){
    if(!document.getElementById('site-footer')) return;
    if(document.getElementById('guestbook-section')) return;
    if(Array.from(document.scripts).some(script => /(?:^|\/)guestbook\.js(?:[?#]|$)/i.test(script.getAttribute('src') || ''))) return;
    const script = document.createElement('script');
    script.src = '/js/guestbook.js?v=20261115-language';
    script.async = false;
    script.dataset.clpGuestbook = 'shared';
    document.body.appendChild(script);
  }
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGuestbookIfNeeded, { once: true });
  } else {
    loadGuestbookIfNeeded();
  }
})();

