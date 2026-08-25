/**
 * js/main.js — Chris LEE.PAPA 공통 스크립트
 * Header / Footer / Navigation / Language / Share / Today / Bible logout
 */
'use strict';

const BASE_I18N={
 ko:{nav_home:'Home',nav_works:'Works',nav_faith:'Faith',nav_squad:'Sister Squad',nav_play:'Play',nav_journal:'Journal',nav_about:'About',nav_music:'Music',nav_movie:'Movies',nav_book:'Books',nav_bible:'Bible',nav_worship:'Worship',nav_today:'Today',nav_squad_short:'SQUAD',nav_squad_1:'SISTER SQUAD',nav_squad_2:'SISTER SQUAD 2',nav_game:'GAME',share_title:'SHARE ARCHIVE',share_desc:'이곳의 기록과 영감을 소중한 사람들에게 전하세요.',share_copy:'COPY LINK',share_sns:'SNS SHARE',share_close:'Close',footer_text:'© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',footer_privacy:'개인정보처리방침',footer_terms:'이용약관',toast_copy:'링크가 복사되었습니다 ✓',toast_error:'지원하지 않는 브라우저입니다.'},
 en:{nav_home:'Home',nav_works:'Works',nav_faith:'Faith',nav_squad:'Sister Squad',nav_play:'Play',nav_journal:'Journal',nav_about:'About',nav_music:'Music',nav_movie:'Movies',nav_book:'Books',nav_bible:'Bible',nav_worship:'Worship',nav_today:'Today',nav_squad_short:'SQUAD',nav_squad_1:'SISTER SQUAD',nav_squad_2:'SISTER SQUAD 2',nav_game:'GAME',share_title:'SHARE ARCHIVE',share_desc:'Share the records and inspiration here with your loved ones.',share_copy:'COPY LINK',share_sns:'SNS SHARE',share_close:'Close',footer_text:'© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',footer_privacy:'Privacy Policy',footer_terms:'Terms of Use',toast_copy:'Link copied ✓',toast_error:'Sharing is not supported in this browser.'}
};
let i18n={ko:{...BASE_I18N.ko},en:{...BASE_I18N.en}},currentLang='ko';

function getSiteRoot(){
 const s=document.querySelector('script[src*="/js/main.js"],script[src^="js/main.js"]');
 if(s&&s.src)try{return new URL('../',s.src).href}catch(_){ }
 return new URL('/',document.baseURI).href;
}
function getSiteFileUrl(file){return new URL(file.replace(/^\//,''),getSiteRoot()).href;}
async function loadComponent(id,file){
 const target=document.getElementById(id);if(!target)return false;
 try{const r=await fetch(getSiteFileUrl(file),{cache:'no-cache'});if(!r.ok)throw new Error(`HTTP ${r.status}`);target.innerHTML=await r.text();return true}
 catch(e){console.warn(`[main.js] ${file} 로드 실패`,e);return false}
}
async function loadComponents(){
 if(window.PAGE_I18N){i18n.ko={...BASE_I18N.ko,...(window.PAGE_I18N.ko||{})};i18n.en={...BASE_I18N.en,...(window.PAGE_I18N.en||{})}}
 await Promise.all([loadComponent('site-nav','components/header.html'),loadComponent('site-footer','components/footer.html')]);
 initScrollProgress();initNavScroll();initMobileMenu();initDesktopDropdowns();initActiveNavLink();initLangDropdown();initShareModal();initBibleLogout();initSecurity();initMouseOrb();
 let saved='ko';try{saved=localStorage.getItem('pref-lang')||'ko'}catch(_){ }setLanguage(saved);
 if(typeof window.onMainReady==='function')window.onMainReady();
}

function initScrollProgress(){const bar=document.getElementById('scroll-progress');if(!bar)return;const u=()=>{const m=document.documentElement.scrollHeight-window.innerHeight,v=m>0?((window.scrollY||0)/m)*100:0;bar.style.width=`${Math.max(0,Math.min(100,v))}%`};window.addEventListener('scroll',u,{passive:true});window.addEventListener('resize',u,{passive:true});u()}
function initNavScroll(){const nav=document.getElementById('main-nav');if(!nav)return;const u=()=>nav.classList.toggle('scrolled',(window.scrollY||0)>40);window.addEventListener('scroll',u,{passive:true});u()}

function initMobileMenu(){
 const moreBtn=document.getElementById('mobileMoreBtn'),morePanel=document.getElementById('mobileMoreOverlay'),worksBtn=document.querySelector('[data-mobile-menu="works"]'),worksPanel=document.getElementById('mobileWorksMenu'),faithBtn=document.querySelector('[data-mobile-menu="faith"]'),faithPanel=document.getElementById('mobileFaithMenu'),squadBtn=document.querySelector('[data-mobile-menu="squad"]'),squadPanel=document.getElementById('mobileSquadMenu');
 const panels=[morePanel,worksPanel,faithPanel,squadPanel].filter(Boolean),buttons=[moreBtn,worksBtn,faithBtn,squadBtn].filter(Boolean);
 const closeAll=()=>{panels.forEach(p=>{p.classList.remove('active');p.setAttribute('aria-hidden','true')});buttons.forEach(b=>b.setAttribute('aria-expanded','false'));document.body.classList.remove('mobile-panel-open')};
 const open=(p,b)=>{if(!p)return;closeAll();p.classList.add('active');p.setAttribute('aria-hidden','false');if(b)b.setAttribute('aria-expanded','true');document.body.classList.add('mobile-panel-open')};
 [[moreBtn,morePanel],[worksBtn,worksPanel],[faithBtn,faithPanel],[squadBtn,squadPanel]].forEach(([b,p])=>{if(!b||!p)return;b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();p.classList.contains('active')?closeAll():open(p,b)})});
 document.querySelectorAll('#mobileMoreClose,#mobileSquadClose,.mobile-submenu-close').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();closeAll()}));
 panels.forEach(p=>{p.addEventListener('click',e=>{if(e.target===p)closeAll()});p.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeAll))});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});window.addEventListener('resize',()=>{if(window.innerWidth>900)closeAll()})
}

function initDesktopDropdowns(){
 const ws=[...document.querySelectorAll('.nav-dropdown-wrapper')];
 ws.forEach(w=>{const t=w.querySelector('.nav-dropdown-trigger');if(!t)return;t.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=!w.classList.contains('active');ws.forEach(x=>{x.classList.remove('active');const z=x.querySelector('.nav-dropdown-trigger');if(z)z.setAttribute('aria-expanded','false')});if(open){w.classList.add('active');t.setAttribute('aria-expanded','true')}})});
 document.addEventListener('click',e=>{if(e.target.closest('.nav-dropdown-wrapper'))return;ws.forEach(w=>{w.classList.remove('active');const t=w.querySelector('.nav-dropdown-trigger');if(t)t.setAttribute('aria-expanded','false')})});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')ws.forEach(w=>w.classList.remove('active'))})
}

function getCurrentPageKey(){let p=(location.pathname||'/').split('?')[0].split('#')[0].replace(/\/+$/,'');if(!p)return'index';return((p.split('/').pop()||'index').replace(/\.html$/i,'')||'index').toLowerCase()}
function initActiveNavLink(){
 const page=getCurrentPageKey();document.querySelectorAll('[data-page]').forEach(e=>e.classList.remove('active'));document.querySelectorAll('[data-page]').forEach(e=>{if((e.dataset.page||'').toLowerCase()===page)e.classList.add('active')});
 const groups=[{p:['music','movie','book'],s:'a[href*="/music"],a[href*="/movie"],a[href*="/book"]',m:'works'},{p:['bible','worship'],s:'a[href*="/bible"],a[href*="/worship"]',m:'faith'},{p:['sistersquad','sistersquad2','sister-squad','game','gameinfo'],s:'a[href*="sistersquad"],a[href*="sister-squad"],a[href*="gameinfo"],a[data-page="gameinfo"]',m:'squad'}];
 groups.forEach(g=>{if(!g.p.includes(page))return;document.querySelectorAll('.nav-dropdown-wrapper').forEach(w=>{if(w.querySelector(g.s))w.classList.add('active')});const b=document.querySelector(`[data-mobile-menu="${g.m}"]`);if(b)b.classList.add('active')});
 if(page==='today')document.querySelectorAll('[data-page="today"]').forEach(e=>e.classList.add('active'));
 if(['gameinfo','game','journal','about','privacy','terms'].includes(page)){const b=document.getElementById('mobileMoreBtn');if(b)b.classList.add('active')}
}

function initLangDropdown(){const w=document.getElementById('langWrapper'),b=document.getElementById('langToggleBtn');if(!w||!b)return;b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const o=w.classList.toggle('active');b.setAttribute('aria-expanded',String(o))});document.addEventListener('click',e=>{if(w.contains(e.target))return;w.classList.remove('active');b.setAttribute('aria-expanded','false')});w.querySelectorAll('.lang-btn').forEach(x=>x.addEventListener('click',()=>setLanguage(x.dataset.lang)))}
function setLanguage(lang){currentLang=i18n[lang]?lang:'ko';document.documentElement.lang=currentLang;try{localStorage.setItem('pref-lang',currentLang)}catch(_){ }document.querySelectorAll('[data-i18n]').forEach(e=>{const k=e.dataset.i18n;if(i18n[currentLang][k]!==undefined)e.innerHTML=i18n[currentLang][k]});const d=i18n[currentLang];if(d.meta_title)document.title=d.meta_title;[['meta[name="description"]','meta_description'],['meta[property="og:title"]','og_title'],['meta[property="og:description"]','og_description'],['meta[name="twitter:title"]','twitter_title'],['meta[name="twitter:description"]','twitter_description']].forEach(([s,k])=>{const e=document.querySelector(s);if(e&&d[k])e.setAttribute('content',d[k])});document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===currentLang));const x=document.getElementById('currentLangText');if(x)x.textContent=currentLang==='ko'?'KOR':'ENG';const w=document.getElementById('langWrapper');const b=document.getElementById('langToggleBtn');if(w)w.classList.remove('active');if(b)b.setAttribute('aria-expanded','false');if(typeof window.onLangChange==='function')window.onLangChange(currentLang)}
window.setLanguage=setLanguage;window.getCurrentLang=()=>currentLang;

function initShareModal(){const o=document.getElementById('shareOverlay');if(!o)return;const open=document.getElementById('shareOpenBtn'),closeBtn=document.getElementById('shareCloseBtn'),copy=document.getElementById('shareCopyBtn'),sns=document.getElementById('shareSNSBtn');const close=()=>{o.classList.remove('active');o.setAttribute('aria-hidden','true');setTimeout(()=>{if(!o.classList.contains('active'))o.style.display='none'},300)},show=()=>{o.style.display='flex';o.setAttribute('aria-hidden','false');requestAnimationFrame(()=>o.classList.add('active'))};if(open)open.addEventListener('click',show);if(closeBtn)closeBtn.addEventListener('click',close);o.addEventListener('click',e=>{if(e.target===o)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&o.classList.contains('active'))close()});if(copy)copy.addEventListener('click',async()=>{let ok=false,url=location.href;if(navigator.clipboard&&isSecureContext)try{await navigator.clipboard.writeText(url);ok=true}catch(_){ }if(!ok){const t=document.createElement('textarea');t.id='temp-copy-area';t.value=url;t.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.appendChild(t);t.focus();t.select();try{ok=document.execCommand('copy')}catch(_){ }t.remove()}if(ok)showToast(i18n[currentLang].toast_copy);close()});if(sns)sns.addEventListener('click',async()=>{if(!navigator.share){showToast(i18n[currentLang].toast_error);return}try{await navigator.share({title:document.title||'Chris LEE.PAPA',text:'Chris LEE.PAPA',url:location.href})}catch(_){}})}
function showToast(m){const t=document.getElementById('toast');if(!t)return;t.textContent=m;t.style.display='block';clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.style.display='none',2500)}window.showToast=showToast;

function initBibleLogout(){const bs=document.querySelectorAll('#logoutBtn,#logoutButton,[data-action="logout"],[data-logout],.logout-btn,.logout-button');if(!bs.length)return;bs.forEach(b=>{if(b.dataset.logoutBound==='true')return;b.dataset.logoutBound='true';b.addEventListener('click',e=>{e.preventDefault();try{Object.keys(localStorage).filter(k=>/bible|auth|user|login|session/i.test(k)).forEach(k=>localStorage.removeItem(k));Object.keys(sessionStorage).forEach(k=>sessionStorage.removeItem(k))}catch(_){ }if(typeof window.onBibleLogout==='function')window.onBibleLogout();else location.href='/bible'})})}window.initBibleLogout=initBibleLogout;

function initSecurity(){document.addEventListener('contextmenu',e=>{if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;e.preventDefault()});document.addEventListener('copy',e=>{if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;const s=window.getSelection?window.getSelection().toString():'';if(s)e.preventDefault()});document.addEventListener('keydown',e=>{if(e.target.closest&&e.target.closest('input,textarea,select,[contenteditable="true"]'))return;const k=String(e.key||'').toUpperCase();if(k==='F12'||(e.ctrlKey&&e.shiftKey&&(k==='I'||k==='J'))||(e.ctrlKey&&k==='U')){e.preventDefault();return}if(e.ctrlKey&&['C','S','P'].includes(k)&&window.getSelection&&window.getSelection().toString())e.preventDefault()})}
function initMouseOrb(){const o=document.getElementById('mouse-orb');if(!o||!matchMedia('(min-width:901px)').matches)return;document.addEventListener('mousemove',e=>{o.style.left=`${e.clientX}px`;o.style.top=`${e.clientY}px`},{passive:true})}
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').then(()=>console.log('[main.js] ServiceWorker registered')).catch(e=>console.warn('[main.js] ServiceWorker failed',e)));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadComponents);else loadComponents();
