/* Home screen installation */
(() => {
  'use strict';

  if (location.origin !== 'https://chrisleepapa.com') return;

  const standalone = window.matchMedia('(display-mode: standalone), (display-mode: window-controls-overlay)');
  const installedMode = () => standalone.matches || navigator.standalone === true;
  if (installedMode()) return;

  const userAgent = navigator.userAgent;
  const appleMobile = /iPhone|iPad|iPod/.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const appleSafari = appleMobile && /Version\//.test(userAgent) && /Safari\//.test(userAgent)
    && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent);
  const android = /Android/.test(userAgent);
  const samsungInternet = /SamsungBrowser\//.test(userAgent);
  const inApp = /; wv\)|KAKAOTALK|NAVER\(inapp|FBAN|FBAV|Instagram|TikTok|BytedanceWebview/i.test(userAgent);
  const manualHelp = appleMobile ? (appleSafari && !inApp ? 'ios' : 'iosExternal')
    : android ? (inApp ? 'androidExternal' : samsungInternet ? 'samsung' : 'android') : null;
  const copy = {
    ko: {
      title: '홈 화면에 추가', description: '아이콘을 눌러 바로 열어 보세요.',
      install: '추가하기', later: '나중에', installed: '이미 추가했어요',
      ios: 'Safari의 공유 메뉴에서 ‘홈 화면에 추가’를 선택하세요. ‘웹 앱으로 열기’가 보이면 켜고 추가하세요.',
      iosExternal: '이 페이지를 Safari에서 열고, 공유 메뉴에서 ‘홈 화면에 추가’를 선택하세요.',
      android: '브라우저 메뉴에서 ‘홈 화면에 추가’, ‘앱 설치’ 또는 ‘설치 및 바로가기 만들기’를 선택하세요.',
      samsung: '삼성 인터넷 메뉴에서 ‘현재 페이지 추가’를 누른 뒤 ‘홈 화면’을 선택하세요.',
      androidExternal: '앱 메뉴에서 ‘브라우저로 열기’를 선택하세요. Chrome이나 삼성 인터넷에서 열린 뒤 ‘홈 화면에 추가’를 선택하세요.'
    },
    en: {
      title: 'Add to your home screen', description: 'Open it in one tap from its icon.',
      install: 'Add app', later: 'Not now', installed: 'Already added',
      ios: 'In Safari, open Share and choose Add to Home Screen. Turn on Open as Web App if shown, then tap Add.',
      iosExternal: 'Open this page in Safari, then open Share and choose Add to Home Screen.',
      android: 'Open the browser menu and choose Add to Home screen, Install app, or Install and create shortcut.',
      samsung: 'In Samsung Internet, open the menu, tap Add page to, and choose Home screen.',
      androidExternal: 'Choose Open in browser from the app menu. In Chrome or Samsung Internet, choose Add to Home screen.'
    }
  };
  const stateKey = 'clp-home-screen-install';
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  let nativeOffer = null;
  let detectedInstall = false;
  let manualReady = false;
  let dismissedThisPage = false;
  let instructionsOpen = false;
  let asking = false;
  let card;
  let parts;

  function readPreference() {
    try { return localStorage.getItem(stateKey); } catch { return null; }
  }

  function hideCard() {
    if (card) card.hidden = true;
  }

  function dismiss(alreadyInstalled = false) {
    dismissedThisPage = true;
    try {
      localStorage.setItem(stateKey, alreadyInstalled ? 'already-added' : String(Date.now() + sevenDays));
    } catch {}
    hideCard();
  }

  function render() {
    const stored = readPreference();
    const manual = manualReady && manualHelp;
    if (detectedInstall || installedMode() || dismissedThisPage || stored === 'already-added'
      || Number(stored) > Date.now() || (!nativeOffer && !manual)) {
      hideCard();
      return;
    }
    if (!document.body || asking) return;
    if (!card) mount();

    const words = copy[document.documentElement.lang.startsWith('en') ? 'en' : 'ko'];
    parts.title.textContent = words.title + ' · ChrisPapa';
    parts.description.textContent = words.description;
    parts.add.textContent = words.install;
    parts.later.textContent = words.later;
    parts.installed.textContent = words.installed;
    parts.help.textContent = words[manualHelp] || '';
    parts.help.hidden = !manual || !instructionsOpen;
    parts.installed.hidden = !manual;
    card.hidden = false;
  }

  async function add() {
    if (!nativeOffer) {
      instructionsOpen = true;
      render();
      return;
    }
    const offer = nativeOffer;
    asking = true;
    nativeOffer = null;
    hideCard();
    try {
      const result = await offer.prompt();
      const choice = result?.outcome ? result : await offer.userChoice;
      if (choice?.outcome === 'accepted') detectedInstall = true;
      else dismiss();
    } catch {
      manualReady = true;
      instructionsOpen = true;
    } finally {
      asking = false;
      render();
    }
  }

  function mount() {
    card = document.createElement('aside');
    card.className = 'home-install home-install--creative';
    card.setAttribute('aria-labelledby', 'home-install-title');
    card.hidden = true;
    card.innerHTML = '<img class="home-install-icon" alt="" width="44" height="44">'
      + '<div class="home-install-copy"><strong id="home-install-title"></strong><p></p></div>'
      + '<div class="home-install-actions"><button class="home-install-add" type="button"></button>'
      + '<button class="home-install-later" type="button"></button>'
      + '<button class="home-install-done" type="button" hidden></button></div>'
      + '<p class="home-install-help" role="status" hidden></p>';
    const select = selector => card.querySelector(selector);
    select('img').src = '/images/icon-192.png?v=studio-blue';
    parts = {
      title: select('strong'), description: select('.home-install-copy p'), add: select('.home-install-add'),
      later: select('.home-install-later'), installed: select('.home-install-done'), help: select('.home-install-help')
    };
    parts.add.addEventListener('click', add);
    parts.later.addEventListener('click', () => dismiss());
    parts.installed.addEventListener('click', () => dismiss(true));
    document.body.append(card);
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    if (typeof event.prompt === 'function') nativeOffer = event;
    render();
  });
  window.addEventListener('appinstalled', () => {
    nativeOffer = null;
    detectedInstall = true;
    hideCard();
  });
  standalone.addEventListener?.('change', render);
  window.addEventListener('storage', event => {
    if (event.key === stateKey || event.key === null) render();
  });

  async function start() {
    if (manualHelp) {
      window.setTimeout(() => {
        manualReady = true;
        render();
      }, 1600);
    }
    try {
      const apps = await navigator.getInstalledRelatedApps?.();
      detectedInstall ||= apps?.some(app => app.platform === 'webapp'
        && (app.id === location.origin + '/' || app.id === location.origin
          || (app.url && new URL(app.url, location.origin).origin === location.origin))) === true;
    } catch {}
    render();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();


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
  if(page==='sistersquad-hub'){const card=document.querySelector('.sq-links .sq-link:nth-child(1)');if(card)card.style.backgroundImage="url('/images/sistersquad1.png?v=20260828')";loadScriptOnce('/js/sistersquad-hub-i18n.js?v=20261117-seo','sistersquad-hub-i18n');return;}if(page==='sistersquad2'){loadScriptOnce('/js/sistersquad2-ost.js?v=20261115-language','sistersquad2-ost');return;}}

async function loadComponents(){if(window.PAGE_I18N){i18n.ko={...BASE_I18N.ko,...(window.PAGE_I18N.ko||{})};i18n.en={...BASE_I18N.en,...(window.PAGE_I18N.en||{})};}/* Apply the saved language before waiting for async header/footer components. */setLanguage(currentLang);await Promise.all([loadComponent('site-nav','components/header.html?v=v4'),loadComponent('site-footer','components/footer.html?v=creative')]);/* Re-apply after async components so Home content and newly injected UI always use the saved language. */setLanguage(currentLang);initScrollProgress();initNavScroll();initActiveNavLink();initWorksNavigation();initLangDropdown();initThemeToggle();loadScriptOnce('/js/site-share.js?v=7','site-share-ui');initSecurity();normalizeInternalLinks();loadPageSpecificScripts();if(typeof window.onMainReady==='function')window.onMainReady();}
function initScrollProgress(){const bar=document.getElementById('scroll-progress');if(!bar)return;const update=()=>{const scroll=window.scrollY||window.pageYOffset||0,max=document.documentElement.scrollHeight-window.innerHeight,percent=max>0?Math.max(0,Math.min(100,(scroll/max)*100)):0;bar.style.width=`${percent}%`;};window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});update();}
function initNavScroll(){const nav=document.getElementById('main-nav');if(!nav)return;const update=()=>nav.classList.toggle('scrolled',(window.scrollY||0)>40);window.addEventListener('scroll',update,{passive:true});update();}
function initWorksNavigation(){const desk=document.querySelector('.nav-works-wrapper'),trigger=document.querySelector('.nav-works-trigger'),mobile=document.getElementById('mobileWorksTrigger'),menu=document.getElementById('mobileWorksMenu'),close=document.getElementById('mobileWorksClose');if(!desk||!trigger||!mobile||!menu||!close)return;function closeAll(){desk.classList.remove('open');trigger.setAttribute('aria-expanded','false');menu.hidden=true;mobile.setAttribute('aria-expanded','false')}trigger.addEventListener('click',e=>{e.stopPropagation();const open=!desk.classList.contains('open');closeAll();if(open){desk.classList.add('open');trigger.setAttribute('aria-expanded','true')}});mobile.addEventListener('click',e=>{e.stopPropagation();const open=menu.hidden;closeAll();if(open){menu.hidden=false;mobile.setAttribute('aria-expanded','true')}});close.addEventListener('click',closeAll);document.addEventListener('click',e=>{if(!desk.contains(e.target)&&!menu.contains(e.target)&&!mobile.contains(e.target))closeAll()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeAll))}
function initActiveNavLink(){
  const page = getCurrentPageKey();
  const journal = /^journal(?:-\d+)?$/.test(page);
  const work = /^(?:sistersquad(?:-hub|2)?|yul|jung|miracleshot|music|movie|wallpaper)$/.test(page);
  const section = journal ? 'journal' : work ? 'works' : page;
  function update(){
    const activeSection = page === 'index' && location.hash === '#series-media' ? 'series-media' : section;
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
function showToast(message){const toast=document.getElementById('toast');if(!toast)return;toast.textContent=message;toast.style.display='block';clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{toast.style.display='none';},2500);}window.showToast=showToast;
function initSecurity(){document.addEventListener('contextmenu',event=>{if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;event.preventDefault();});document.addEventListener('copy',event=>{if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;if(window.getSelection&&window.getSelection().toString())event.preventDefault();});document.addEventListener('keydown',event=>{if(event.target.closest&&event.target.closest('input,textarea,select,[contenteditable="true"]'))return;const key=String(event.key||'').toUpperCase();if(key==='F12'||(event.ctrlKey&&event.shiftKey&&(key==='I'||key==='J'))||(event.ctrlKey&&key==='U')){event.preventDefault();return;}if(event.ctrlKey&&['C','S','P'].includes(key)&&window.getSelection&&window.getSelection().toString())event.preventDefault();});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadComponents,{once:true});else loadComponents();

/* Shared guestbook: restore it on every standard page with a shared footer.
   Pages that already load guestbook.js keep their existing single instance. */
(function ensureSharedGuestbook(){
  function loadGuestbookIfNeeded(){
    if(!/^\/guestbook(?:\.html)?\/?$/i.test(window.location.pathname)) return;
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

