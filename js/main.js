/**
 * js/main.js — Chris LEE.PAPA Official Site
 * Common loader / navigation / language / share / Today / Bible logout
 */
'use strict';

const BASE_I18N = {
    ko: {
        nav_home:'Home', nav_works:'Works', nav_faith:'Faith', nav_projects:'Projects',
        nav_play:'Play', nav_journal:'Journal', nav_about:'About', nav_music:'Music',
        nav_movie:'Movies', nav_book:'Books', nav_bible:'Bible', nav_worship:'Worship',
        nav_today:'Today', nav_squad_1:'SISTER SQUAD', nav_miracle:'MIRACLE SHOT',
        share_title:'SHARE ARCHIVE', share_desc:'이곳의 기록과 영감을 소중한 사람들에게 전하세요.',
        share_copy:'COPY LINK', share_sns:'SNS SHARE', share_close:'Close',
        footer_text:'© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',
        footer_privacy:'개인정보처리방침', footer_terms:'이용약관',
        toast_copy:'링크가 복사되었습니다 ✓', toast_error:'지원하지 않는 브라우저입니다.'
    },
    en: {
        nav_home:'Home', nav_works:'Works', nav_faith:'Faith', nav_projects:'Projects',
        nav_play:'Play', nav_journal:'Journal', nav_about:'About', nav_music:'Music',
        nav_movie:'Movies', nav_book:'Books', nav_bible:'Bible', nav_worship:'Worship',
        nav_today:'Today', nav_squad_1:'SISTER SQUAD', nav_miracle:'MIRACLE SHOT',
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
    if(script && script.src){ try { return new URL('../', script.src).href; } catch(_) {} }
    return new URL('/', document.baseURI).href;
}
function getSiteFileUrl(file){ return new URL(String(file).replace(/^\//,''), getSiteRoot()).href; }
async function loadComponent(id, file){
    const target = document.getElementById(id);
    if(!target) return false;
    try{ const response = await fetch(getSiteFileUrl(file), {cache:'no-cache'}); if(!response.ok) throw new Error(`HTTP ${response.status}`); target.innerHTML = await response.text(); return true; }
    catch(error){ console.warn(`[main.js] component load failed: ${file}`, error); return false; }
}
async function loadComponents(){
    if(window.PAGE_I18N){ i18n.ko = {...BASE_I18N.ko, ...(window.PAGE_I18N.ko || {})}; i18n.en = {...BASE_I18N.en, ...(window.PAGE_I18N.en || {})}; }
    await Promise.all([loadComponent('site-nav','components/header.html'),loadComponent('site-footer','components/footer.html')]);
    initScrollProgress(); initNavScroll(); initMobileMenu(); initDesktopDropdowns(); initActiveNavLink(); initLangDropdown(); initShareModal(); initBibleLogout(); initSecurity(); initMouseOrb();
    let savedLang = 'ko'; try { savedLang = localStorage.getItem('pref-lang') || 'ko'; } catch(_) {}
    setLanguage(savedLang);
    if(typeof window.onMainReady === 'function') window.onMainReady();
}
function initScrollProgress(){
    const bar = document.getElementById('scroll-progress'); if(!bar) return;
    const update = () => { const scroll=window.scrollY||window.pageYOffset||0; const max=document.documentElement.scrollHeight-window.innerHeight; bar.style.width=`${Math.max(0,Math.min(100,max>0?(scroll/max)*100:0))}%`; };
    window.addEventListener('scroll',update,{passive:true}); window.addEventListener('resize',update,{passive:true}); update();
}
function initNavScroll(){ const nav=document.getElementById('main-nav'); if(!nav)return; const update=()=>nav.classList.toggle('scrolled',(window.scrollY||0)>40); window.addEventListener('scroll',update,{passive:true}); update(); }

function initMobileMenu(){
    const moreBtn=document.getElementById('mobileMoreBtn'), morePanel=document.getElementById('mobileMoreOverlay');
    const worksBtn=document.querySelector('[data-mobile-menu="works"]'), worksPanel=document.getElementById('mobileWorksMenu');
    const faithBtn=document.querySelector('[data-mobile-menu="faith"]'), faithPanel=document.getElementById('mobileFaithMenu');
    const projectsBtn=document.querySelector('[data-mobile-menu="projects"]'), projectsPanel=document.getElementById('mobileProjectsMenu');
    const panels=[morePanel,worksPanel,faithPanel,projectsPanel].filter(Boolean), buttons=[moreBtn,worksBtn,faithBtn,projectsBtn].filter(Boolean);
    const closeAll=()=>{ panels.forEach(panel=>{panel.classList.remove('active');panel.classList.remove('open');panel.setAttribute('aria-hidden','true');}); buttons.forEach(button=>button.setAttribute('aria-expanded','false')); document.body.classList.remove('mobile-panel-open'); };
    const openPanel=(panel,button)=>{ if(!panel)return; closeAll(); panel.classList.add('active'); panel.classList.add('open'); panel.setAttribute('aria-hidden','false'); if(button)button.setAttribute('aria-expanded','true'); document.body.classList.add('mobile-panel-open'); };
    [[moreBtn,morePanel],[worksBtn,worksPanel],[faithBtn,faithPanel],[projectsBtn,projectsPanel]].forEach(([button,panel])=>{ if(!button||!panel)return; button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();panel.classList.contains('active')?closeAll():openPanel(panel,button);}); });
    document.querySelectorAll('#mobileMoreClose,.mobile-submenu-close').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();closeAll();}));
    panels.forEach(panel=>{ panel.addEventListener('click',event=>{if(event.target===panel)closeAll();}); panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeAll)); });
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAll();});
    window.addEventListener('resize',()=>{if(window.innerWidth>900)closeAll();});
}
function closeDesktopDropdowns(except=null){ document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper=>{if(wrapper===except)return;wrapper.classList.remove('active');const trigger=wrapper.querySelector('.nav-dropdown-trigger');if(trigger){trigger.classList.remove('active');trigger.setAttribute('aria-expanded','false');}}); }
function initDesktopDropdowns(){
    const wrappers=[...document.querySelectorAll('.nav-dropdown-wrapper')]; if(!wrappers.length)return;
    wrappers.forEach(wrapper=>{const trigger=wrapper.querySelector('.nav-dropdown-trigger');if(!trigger)return;trigger.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const willOpen=!wrapper.classList.contains('active');closeDesktopDropdowns(wrapper);wrapper.classList.toggle('active',willOpen);trigger.classList.toggle('active',willOpen);trigger.setAttribute('aria-expanded',String(willOpen));});});
    document.addEventListener('click',event=>{if(!event.target.closest('.nav-dropdown-wrapper'))closeDesktopDropdowns();}); document.addEventListener('keydown',event=>{if(event.key==='Escape')closeDesktopDropdowns();});
}
function getCurrentPageKey(){ let path=window.location.pathname||'/'; path=path.split('?')[0].split('#')[0].replace(/\/+$/,''); if(!path)return'index'; const file=path.split('/').pop()||'index'; return(file.replace(/\.html$/i,'')||'index').toLowerCase(); }
function markActivePage(page){ document.querySelectorAll('[data-page]').forEach(link=>link.classList.toggle('active',(link.dataset.page||'').toLowerCase()===page)); }
function activateDropdownContaining(selector){ document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper=>{const trigger=wrapper.querySelector('.nav-dropdown-trigger');const active=!!wrapper.querySelector(selector);wrapper.classList.toggle('active',active);if(trigger){trigger.classList.toggle('active',active);trigger.setAttribute('aria-expanded',String(active));}}); }
function initActiveNavLink(){
    const page=getCurrentPageKey(); markActivePage(page);
    if(['music','movie','book'].includes(page))activateDropdownContaining(`[data-page="${page}"]`);
    if(['bible','worship'].includes(page))activateDropdownContaining(`[data-page="${page}"]`);
    if(['sistersquad','miracleshot'].includes(page))activateDropdownContaining(`[data-page="${page}"]`);
    if(page==='today')document.querySelectorAll('[data-page="today"]').forEach(link=>link.classList.add('active'));
}

function initLangDropdown(){
    const wrapper=document.getElementById('langWrapper'),btn=document.getElementById('langToggleBtn');if(!wrapper||!btn)return;
    btn.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();wrapper.classList.toggle('open');btn.setAttribute('aria-expanded',String(wrapper.classList.contains('open')));});
    document.addEventListener('click',event=>{if(!event.target.closest('#langWrapper')){wrapper.classList.remove('open');btn.setAttribute('aria-expanded','false');}});
    document.querySelectorAll('.lang-btn').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang||'ko')));
}
function setLanguage(lang){ currentLang=(lang==='en'?'en':'ko'); try{localStorage.setItem('pref-lang',currentLang);}catch(_){} document.documentElement.lang=currentLang; const dict=i18n[currentLang]||i18n.ko; document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(dict[key]!=null)el.textContent=dict[key];}); const current=document.getElementById('currentLangText');if(current)current.textContent=currentLang==='en'?'ENG':'KOR';document.querySelectorAll('.lang-btn').forEach(btn=>btn.classList.toggle('active',(btn.dataset.lang||'')===currentLang));
}

function initShareModal(){ const overlay=document.getElementById('shareOverlay'),open=document.getElementById('shareOpenBtn'),close=document.getElementById('shareCloseBtn'),copy=document.getElementById('shareCopyBtn'),sns=document.getElementById('shareSNSBtn');if(!overlay||!open)return; const closeModal=()=>{overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');}; open.addEventListener('click',()=>{overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');}); if(close)close.addEventListener('click',closeModal);overlay.addEventListener('click',event=>{if(event.target===overlay)closeModal();});if(copy)copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);showToast(i18n[currentLang].toast_copy);}catch(_){showToast(i18n[currentLang].toast_error);}});if(sns)sns.addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:document.title,url:location.href});}catch(_){}}else{try{await navigator.clipboard.writeText(location.href);showToast(i18n[currentLang].toast_copy);}catch(_){showToast(i18n[currentLang].toast_error);}}}); }
function showToast(message){const toast=document.getElementById('toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);}
function initBibleLogout(){}
function initSecurity(){}
function initMouseOrb(){const orb=document.getElementById('mouse-orb');if(!orb)return;window.addEventListener('mousemove',e=>{orb.style.left=`${e.clientX}px`;orb.style.top=`${e.clientY}px`},{passive:true});}

document.addEventListener('DOMContentLoaded',loadComponents);
