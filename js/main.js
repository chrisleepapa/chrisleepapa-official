/**
 * js/main.js — Chris LEE.PAPA Official Site
 * Common loader / navigation / language / share / Today / Bible logout
 */
'use strict';

const BASE_I18N = {
    ko: {
        nav_home:'Home', nav_works:'Works', nav_faith:'Faith', nav_squad:'Sister Squad',
        nav_play:'Play', nav_journal:'Journal', nav_about:'About', nav_music:'Music',
        nav_movie:'Movies', nav_book:'Books', nav_bible:'Bible', nav_worship:'Worship',
        nav_today:'Today', nav_squad_short:'SQUAD', nav_squad_1:'SISTER SQUAD',
        nav_squad_2:'SISTER SQUAD 2', nav_game:'GAME',
        share_title:'SHARE ARCHIVE', share_desc:'이곳의 기록과 영감을 소중한 사람들에게 전하세요.',
        share_copy:'COPY LINK', share_sns:'SNS SHARE', share_close:'Close',
        footer_text:'© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',
        footer_privacy:'개인정보처리방침', footer_terms:'이용약관',
        toast_copy:'링크가 복사되었습니다 ✓', toast_error:'지원하지 않는 브라우저입니다.'
    },
    en: {
        nav_home:'Home', nav_works:'Works', nav_faith:'Faith', nav_squad:'Sister Squad',
        nav_play:'Play', nav_journal:'Journal', nav_about:'About', nav_music:'Music',
        nav_movie:'Movies', nav_book:'Books', nav_bible:'Bible', nav_worship:'Worship',
        nav_today:'Today', nav_squad_short:'SQUAD', nav_squad_1:'SISTER SQUAD',
        nav_squad_2:'SISTER SQUAD 2', nav_game:'GAME',
        share_title:'SHARE ARCHIVE', share_desc:'Share the records and inspiration here with your loved ones.',
        share_copy:'COPY LINK', share_sns:'SNS SHARE', share_close:'Close',
        footer_text:'© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',
        footer_privacy:'Privacy Policy', footer_terms:'Terms of Use',
        toast_copy:'Link copied ✓', toast_error:'Sharing is not supported in this browser.'
    }
};

let i18n = { ko:{...BASE_I18N.ko}, en:{...BASE_I18N.en} };
let currentLang = 'ko';

function getSiteRoot(){
    const script = document.querySelector('script[src*="main.js"]');
    if(script && script.src){
        try { return new URL('../', script.src).href; } catch(_) {}
    }
    return new URL('/', document.baseURI).href;
}
function getSiteFileUrl(file){ return new URL(String(file).replace(/^\//,''), getSiteRoot()).href; }
async function loadComponent(id,file){
    const target=document.getElementById(id); if(!target)return false;
    try{const response=await fetch(getSiteFileUrl(file),{cache:'no-cache'});if(!response.ok)throw new Error(`HTTP ${response.status}`);target.innerHTML=await response.text();return true;}catch(error){console.warn(`[main.js] component load failed: ${file}`,error);return false;}
}
async function loadComponents(){
    if(window.PAGE_I18N){i18n.ko={...BASE_I18N.ko,...(window.PAGE_I18N.ko||{})};i18n.en={...BASE_I18N.en,...(window.PAGE_I18N.en||{})};}
    await Promise.all([loadComponent('site-nav','components/header.html'),loadComponent('site-footer','components/footer.html')]);
    initScrollProgress();initNavScroll();initMobileMenu();initDesktopDropdowns();initActiveNavLink();initLangDropdown();initShareModal();initBibleLogout();initSecurity();initMouseOrb();
    let savedLang='ko';try{savedLang=localStorage.getItem('pref-lang')||'ko';}catch(_){}setLanguage(savedLang);
    if(typeof window.onMainReady==='function')window.onMainReady();
}
function initScrollProgress(){const bar=document.getElementById('scroll-progress');if(!bar)return;const update=()=>{const scroll=window.scrollY||window.pageYOffset||0;const max=document.documentElement.scrollHeight-window.innerHeight;const value=max>0?(scroll/max)*100:0;bar.style.width=`${Math.max(0,Math.min(100,value))}%`;};window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});update();}
function initNavScroll(){const nav=document.getElementById('main-nav');if(!nav)return;const update=()=>nav.classList.toggle('scrolled',(window.scrollY||0)>40);window.addEventListener('scroll',update,{passive:true});update();}
function initMobileMenu(){
    const moreBtn=document.getElementById('mobileMoreBtn');const morePanel=document.getElementById('mobileMoreOverlay');
    const worksBtn=document.querySelector('[data-mobile-menu="works"]');const worksPanel=document.getElementById('mobileWorksMenu');
    const faithBtn=document.querySelector('[data-mobile-menu="faith"]');const faithPanel=document.getElementById('mobileFaithMenu');
    const squadBtn=document.querySelector('[data-mobile-menu="squad"]');const squadPanel=document.getElementById('mobileSquadMenu');
    const panels=[morePanel,worksPanel,faithPanel,squadPanel].filter(Boolean);const buttons=[moreBtn,worksBtn,faithBtn,squadBtn].filter(Boolean);
    const closeAll=()=>{panels.forEach(panel=>{panel.classList.remove('active');panel.setAttribute('aria-hidden','true');});buttons.forEach(button=>button.setAttribute('aria-expanded','false'));document.body.classList.remove('mobile-panel-open');};
    const openPanel=(panel,button)=>{if(!panel)return;closeAll();panel.classList.add('active');panel.setAttribute('aria-hidden','false');if(button)button.setAttribute('aria-expanded','true');document.body.classList.add('mobile-panel-open');};
    [[moreBtn,morePanel],[worksBtn,worksPanel],[faithBtn,faithPanel],[squadBtn,squadPanel]].forEach(([button,panel])=>{if(!button||!panel)return;button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();panel.classList.contains('active')?closeAll():openPanel(panel,button);});});
    document.querySelectorAll('#mobileMoreClose,#mobileSquadClose,.mobile-submenu-close').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();closeAll();}));
    panels.forEach(panel=>{panel.addEventListener('click',event=>{if(event.target===panel)closeAll();});panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeAll));});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAll();});window.addEventListener('resize',()=>{if(window.innerWidth>900)closeAll();});
}
function closeDesktopDropdowns(except=null){document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper=>{if(wrapper===except)return;wrapper.classList.remove('active');const trigger=wrapper.querySelector('.nav-dropdown-trigger');if(trigger){trigger.classList.remove('active');trigger.setAttribute('aria-expanded','false');}});}
function initDesktopDropdowns(){const wrappers=[...document.querySelectorAll('.nav-dropdown-wrapper')];if(!wrappers.length)return;wrappers.forEach(wrapper=>{const trigger=wrapper.querySelector('.nav-dropdown-trigger');if(!trigger)return;trigger.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const willOpen=!wrapper.classList.contains('active');closeDesktopDropdowns(wrapper);wrapper.classList.toggle('active',willOpen);trigger.classList.toggle('active',willOpen);trigger.setAttribute('aria-expanded',String(willOpen));});});document.addEventListener('click',event=>{if(!event.target.closest('.nav-dropdown-wrapper'))closeDesktopDropdowns();});document.addEventListener('keydown',event=>{if(event.key==='Escape')closeDesktopDropdowns();});}
function getCurrentPageKey(){let path=window.location.pathname||'/';path=path.split('?')[0].split('#')[0].replace(/\/+$/,'');if(!path)return'index';const file=path.split('/').pop()||'index';return(file.replace(/\.html$/i,'')||'index').toLowerCase();}
function markActivePage(page){document.querySelectorAll('[data-page]').forEach(link=>link.classList.toggle('active',(link.dataset.page||'').toLowerCase()===page));}
function activateDropdownContaining(selector){document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper=>{const trigger=wrapper.querySelector('.nav-dropdown-trigger');const active=!!wrapper.querySelector(selector);wrapper.classList.toggle('active',active);if(trigger){trigger.classList.toggle('active',active);trigger.setAttribute('aria-expanded',String(active));}});}
function initActiveNavLink(){const page=getCurrentPageKey();markActivePage(page);if(['music','movie','book'].includes(page))activateDropdownContaining(`[data-page="${page}"]`);if(['bible','worship'].includes(page))activateDropdownContaining(`[data-page="${page}"]`);if(['sistersquad','sistersquad2','sister-squad','game','gameinfo'].includes(page))activateDropdownContaining(`[data-page="${page}"], [href*="sistersquad"], [href*="sister-squad"], [href*="gameinfo"]`);if(page==='today')document.querySelectorAll('[data-page="today"]').forEach(link=>link.classList.add('active'));const mobileMap={works:['music','movie','book'],faith:['bible','worship']};Object.entries(mobileMap).forEach(([name,pages])=>{if(pages.includes(page)){const button=document.querySelector(`[data-mobile-menu="${name}"]`);if(button)button.classList.add('active');}});if(['gameinfo','game','journal','about','privacy','terms','sistersquad','sistersquad2','sister-squad'].includes(page)){const more=document.getElementById('mobileMoreBtn');if(more)more.classList.add('active');}}
function initLangDropdown(){const wrapper=document.getElementById('langWrapper');const toggle=document.getElementById('langToggleBtn');if(!wrapper||!toggle)return;toggle.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const open=wrapper.classList.toggle('active');toggle.setAttribute('aria-expanded',String(open));});document.addEventListener('click',event=>{if(wrapper.contains(event.target))return;wrapper.classList.remove('active');toggle.setAttribute('aria-expanded','false');});wrapper.querySelectorAll('.lang-btn').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));}
function setLanguage(lang){currentLang=i18n[lang]?lang:'ko';document.documentElement.lang=currentLang;try{localStorage.setItem('pref-lang',currentLang);}catch(_){}document.querySelectorAll('[data-i18n]').forEach(element=>{const key=element.dataset.i18n;if(i18n[currentLang][key]!==undefined)element.innerHTML=i18n[currentLang][key];});const dict=i18n[currentLang];if(dict.meta_title)document.title=dict.meta_title;[['meta[name="description"]','meta_description'],['meta[property="og:title"]','og_title'],['meta[property="og:description"]','og_description'],['meta[name="twitter:title"]','twitter_title'],['meta[name="twitter:description"]','twitter_description']].forEach(([selector,key])=>{const element=document.querySelector(selector);if(element&&dict[key])element.setAttribute('content',dict[key]);});document.querySelectorAll('.lang-btn').forEach(button=>button.classList.toggle('active',button.dataset.lang===currentLang));const display=document.getElementById('currentLangText');if(display)display.textContent=currentLang==='ko'?'KOR':'ENG';const wrapper=document.getElementById('langWrapper');const toggle=document.getElementById('langToggleBtn');if(wrapper)wrapper.classList.remove('active');if(toggle)toggle.setAttribute('aria-expanded','false');if(typeof window.onLangChange==='function')window.onLangChange(currentLang);}
window.setLanguage=setLanguage;window.getCurrentLang=()=>currentLang;
function initShareModal(){const overlay=document.getElementById('shareOverlay');if(!overlay)return;const openButton=document.getElementById('shareOpenBtn');const closeButton=document.getElementById('shareCloseBtn');const copyButton=document.getElementById('shareCopyBtn');const snsButton=document.getElementById('shareSNSBtn');const close=()=>{overlay.classList.remove('active');overlay.setAttribute('aria-hidden','true');setTimeout(()=>{if(!overlay.classList.contains('active'))overlay.style.display='none';},300);};const open=()=>{overlay.style.display='flex';overlay.setAttribute('aria-hidden','false');requestAnimationFrame(()=>overlay.classList.add('active'));};if(openButton)openButton.addEventListener('click',open);if(closeButton)closeButton.addEventListener('click',close);overlay.addEventListener('click',event=>{if(event.target===overlay)close();});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&overlay.classList.contains('active'))close();});if(copyButton)copyButton.addEventListener('click',async()=>{const url=window.location.href;let ok=false;if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(url);ok=true;}catch(_){}}if(!ok){const textarea=document.createElement('textarea');textarea.id='temp-copy-area';textarea.value=url;textarea.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.appendChild(textarea);textarea.focus();textarea.select();try{ok=document.execCommand('copy');}catch(_){}textarea.remove();}if(ok)showToast(i18n[currentLang].toast_copy);close();});if(snsButton)snsButton.addEventListener('click',async()=>{if(!navigator.share){showToast(i18n[currentLang].toast_error);return;}try{await navigator.share({title:document.title||'Chris LEE.PAPA',text:'Chris LEE.PAPA',url:window.location.href});}catch(_){}});}
function showToast(message){const toast=document.getElementById('toast');if(!toast)return;toast.textContent=message;toast.style.display='block';clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{toast.style.display='none';},2500);}window.showToast=showToast;
function initBibleLogout(){const buttons=document.querySelectorAll('#logoutBtn,#logoutButton,[data-action="logout"],[data-logout],.logout-btn,.logout-button');buttons.forEach(button=>{if(button.dataset.logoutBound==='true')return;button.dataset.logoutBound='true';button.addEventListener('click',event=>{event.preventDefault();try{Object.keys(localStorage).filter(key=>/bible|auth|user|login|session/i.test(key)).forEach(key=>localStorage.removeItem(key));Object.keys(sessionStorage).forEach(key=>sessionStorage.removeItem(key));}catch(_){}if(typeof window.onBibleLogout==='function')window.onBibleLogout();else window.location.href='/bible';});});}window.initBibleLogout=initBibleLogout;
function initSecurity(){document.addEventListener('contextmenu',event=>{if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;event.preventDefault();});document.addEventListener('copy',event=>{if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;const selected=window.getSelection?window.getSelection().toString():'';if(selected)event.preventDefault();});document.addEventListener('keydown',event=>{if(event.target.closest&&event.target.closest('input,textarea,select,[contenteditable="true"]'))return;const key=String(event.key||'').toUpperCase();if(key==='F12'||(event.ctrlKey&&event.shiftKey&&(key==='I'||key==='J'))||(event.ctrlKey&&key==='U')){event.preventDefault();return;}if(event.ctrlKey&&['C','S','P'].includes(key)&&window.getSelection&&window.getSelection().toString())event.preventDefault();});}
function initMouseOrb(){const orb=document.getElementById('mouse-orb');if(!orb||!window.matchMedia||!window.matchMedia('(min-width:901px)').matches)return;document.addEventListener('mousemove',event=>{orb.style.left=`${event.clientX}px`;orb.style.top=`${event.clientY}px`;},{passive:true});}
if('serviceWorker'in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').then(()=>console.log('[main.js] ServiceWorker registered')).catch(error=>console.warn('[main.js] ServiceWorker failed',error));});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadComponents);else loadComponents();
