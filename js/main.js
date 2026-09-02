/* 3단계 UX / navigation layer */
'use strict';

const BASE_I18N = {
  ko: { nav_home:'Home',nav_works:'Works',nav_faith:'Faith',nav_squad:'Sister Squad',nav_play:'Play',nav_journal:'Journal',nav_about:'About',nav_music:'Music',nav_movie:'Movies',nav_bible:'Bible',nav_worship:'Worship',nav_today:'Today',nav_squad_short:'SQUAD',nav_squad_1:'SISTER SQUAD',nav_squad_2:'SISTER SQUAD 2',nav_game:'GAME',share_title:'SHARE ARCHIVE',share_desc:'이곳의 기록과 영감을 소중한 사람들에게 전하세요.',share_copy:'COPY LINK',share_sns:'SNS SHARE',share_close:'Close',footer_text:'© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',footer_privacy:'개인정보처리방침',footer_terms:'이용약관',toast_copy:'링크가 복사되었습니다 ✓',toast_error:'지원하지 않는 브라우저입니다.' },
  en: { nav_home:'Home',nav_works:'Works',nav_faith:'Faith',nav_squad:'Sister Squad',nav_play:'Play',nav_journal:'Journal',nav_about:'About',nav_music:'Music',nav_movie:'Movies',nav_bible:'Bible',nav_worship:'Worship',nav_today:'Today',nav_squad_short:'SQUAD',nav_squad_1:'SISTER SQUAD',nav_squad_2:'SISTER SQUAD 2',nav_game:'GAME',share_title:'SHARE ARCHIVE',share_desc:'Share the records and inspiration here with your loved ones.',share_copy:'COPY LINK',share_sns:'SNS SHARE',share_close:'Close',footer_text:'© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',footer_privacy:'Privacy Policy',footer_terms:'Terms of Use',toast_copy:'Link copied ✓',toast_error:'Sharing is not supported in this browser.' }
};

const WORSHIP_I18N = {
  ko: {
    meta_title:'WORSHIP – 나의 찬양 앨범 이야기와 가사집 | Chris LEE.PAPA',
    meta_description:'Chris LEE.PAPA의 Korean Worship Archive. 나의 찬양 Vol.1, Vol.2, Vol.3의 앨범 이야기, 제작 과정, 가사집과 공식 스트리밍 링크를 기록합니다.',
    og_title:'WORSHIP – 나의 찬양 앨범 이야기와 가사집 | Chris LEE.PAPA',
    og_description:'나의 찬양 Vol.1 · Vol.2 · Vol.3. 앨범을 만들게 된 이야기와 예배의 고백, 가사 아카이브를 한곳에 기록합니다.',
    worship_header_slogan:'영혼 깊은 곳에서 올려드리는 고백과 찬양',
    worship_intro_title:'나의 찬양, 그리고 나의 예배',
    worship_intro_desc:'이곳은 단순히 음악을 모아놓은 페이지가 아니라, 하나님께 드리고 싶었던 마음을 노래로 기록해 온 예배의 아카이브입니다. 완성된 음원뿐 아니라 왜 만들었는지, 어떤 마음으로 만들었는지, 그리고 그 노래에 담긴 고백까지 함께 기록합니다.',
    albums_heading:'나의 찬양 앨범',
    albums_intro:'한 장씩 쌓여온 찬양의 기록입니다. 각 앨범의 이야기를 읽고 음악을 들어보세요.',
    vol1_title:'나의 찬양 Vol.1',
    vol1_card:'처음 드리는 고백처럼, 하나님을 향한 마음을 담은 첫 번째 찬양의 기록.',
    vol2_title:'나의 찬양 Vol.2',
    vol2_card:'첫 고백에 이어 더 깊어진 믿음과 감사의 마음을 담은 두 번째 찬양.',
    vol3_title:'나의 찬양 Vol.3',
    vol3_card:'연약하고 부족한 나의 진솔하고 담백한 고백. 완벽한 사람이 아니라 주님을 바라보며 다시 일어나는 사람의 노래입니다.',
    story_heading:'앨범을 만들게 된 이야기',
    story_intro:'이 음원들은 거창한 음악 프로젝트에서 시작된 것이 아니라, 일상 속에서 하나님께 드리고 싶었던 마음을 한 곡씩 기록하면서 시작되었습니다.'
  },
  en: {
    meta_title:'WORSHIP — My Hymn Vol.1–3 | Chris LEE.PAPA',
    meta_description:'The Korean Worship Archive of Chris LEE.PAPA — My Hymn Vol.1, Vol.2 and Vol.3, including the stories behind the albums, worship reflections and the complete Korean lyrics archive.',
    og_title:'WORSHIP — My Hymn Vol.1–3 | Chris LEE.PAPA',
    og_description:'My Hymn Vol.1 · Vol.2 · Vol.3. The stories behind the albums, reflections of worship, and the complete Korean lyrics archive.',
    worship_header_slogan:'Confessions and praise lifted from the depths of the soul',
    worship_intro_title:'My Hymn, and My Worship',
    worship_intro_desc:'This is more than a page collecting music. It is an archive of worship, recording in song the heart I wanted to offer to God — not only the finished recordings, but why they were made, what was in my heart, and the confessions carried by each song.',
    albums_heading:'My Hymn Albums',
    albums_intro:'A record of praise built one album at a time. Read the story behind each album and listen to the music.',
    vol1_title:'My Hymn Vol.1',
    vol1_card:'The first record of praise, carrying a heart turned toward God like a first confession.',
    vol2_title:'My Hymn Vol.2',
    vol2_card:'A second collection of praise, carrying a deeper faith and a growing heart of gratitude after the first confession.',
    vol3_title:'My Hymn Vol.3',
    vol3_card:'An honest and simple confession from someone weak and imperfect — a song about getting back up while keeping our eyes on the Lord.',
    story_heading:'The Stories Behind the Albums',
    story_intro:'These recordings did not begin as a grand music project. They began one song at a time, as I recorded the heart I wanted to offer to God in everyday life.'
  }
};

const WORSHIP_STORY_I18N = {
  ko: [
    ['노래를 만들기 시작한 이유','처음에는 좋은 음악을 만들고 싶다는 마음보다 하나님께 드리고 싶은 마음을 노래로 남기고 싶었습니다. 한 곡씩 만들다 보니 음악은 결과물이 아니라 믿음과 일상을 기록하는 방법이 되었습니다.'],
    ['첫 번째 고백','Vol.1은 완성된 사람의 찬양이 아니라 부족하고 흔들리는 사람이 주님을 바라보며 다시 걸어가는 고백입니다. 평범한 하루와 가족, 두려움과 감사가 노래의 출발점이 되었습니다.'],
    ['더 넓어진 예배','Vol.2에서는 개인의 고백을 넘어 함께 노래하고 예배하는 기쁨을 담았습니다. 힘 있게 외치는 찬양부터 조용한 고백, 어린이와 공동체를 위한 노래까지 예배의 폭을 넓혔습니다.'],
    ['나를 아시는 주님','Vol.3은 지나온 시간을 돌아보며 결국 모든 것이 은혜였음을 고백하는 앨범입니다. 어린 믿음, 가족, 공동체, 천국의 소망과 마지막까지 주님을 바라보겠다는 믿음을 여러 형태의 보컬과 예배 음악으로 기록했습니다.']
  ],
  en: [
    ['Why I Started Making Songs','At first, I wanted to leave behind in song not simply a desire to make good music, but the heart I wanted to offer to God. As I made one song after another, music became a way of recording faith and everyday life rather than simply producing finished works.'],
    ['The First Confession','Vol.1 is not the praise of someone who has it all together. It is the confession of someone who is weak and shaken, yet looks to the Lord and gets back on the road. Ordinary days, family, fear and gratitude became the starting points for these songs.'],
    ['A Wider Expression of Worship','Vol.2 moves beyond personal confession to capture the joy of singing and worshiping together. From powerful songs of praise to quiet confessions, children’s songs and music for the community, the scope of worship grew wider.'],
    ['The Lord Who Knows Me','Vol.3 looks back over the years and confesses that, in the end, everything was grace. It records faith through worship music and different vocal arrangements — faith in a young belief, family, community, the hope of heaven, and the desire to keep looking to the Lord until the end.']
  ]
};

const WORSHIP_FINAL_NOTE_I18N = {
  ko:'나의 찬양은 한 번에 완성된 프로젝트가 아니라, 일상과 믿음 속에서 한 곡씩 쌓아온 기록입니다. Vol.1의 첫 고백에서 Vol.2의 공동체적 찬양을 지나 Vol.3에서는 나를 아시는 주님, 천국의 소망, 공동체와 가정의 축복까지 더 넓은 예배의 이야기를 담았습니다.',
  en:'My Hymn is not a project completed all at once, but a record built one song at a time through everyday life and faith. From the first confession of Vol.1, through the communal praise of Vol.2, to Vol.3, the story of worship expands to the Lord who knows me, the hope of heaven, the community, and the blessing of family.'
};

let i18n={ko:{...BASE_I18N.ko},en:{...BASE_I18N.en}},currentLang='ko';

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

function loadPageSpecificScripts(){const page=getCurrentPageKey();if(page==='sistersquad-hub'){const card=document.querySelector('.sq-links .sq-link:nth-child(1)');if(card)card.style.backgroundImage="url('/images/sistersquad1.png?v=20260828')";loadScriptOnce('/js/sistersquad-hub-i18n.js?v=20260827','sistersquad-hub-i18n');return;}if(page==='sistersquad2'){loadScriptOnce('/js/sistersquad2-ost.js?v=20260826','sistersquad2-ost');return;}if(page==='miracleshot'){loadScriptOnce('/js/work-miracle-shot.js?v=20260829','work-miracle-shot');return;}}

async function loadComponents(){const page=getCurrentPageKey();if(window.PAGE_I18N){i18n.ko={...BASE_I18N.ko,...(window.PAGE_I18N.ko||{})};i18n.en={...BASE_I18N.en,...(window.PAGE_I18N.en||{})};}if(page==='worship'){i18n.ko={...i18n.ko,...WORSHIP_I18N.ko};i18n.en={...i18n.en,...WORSHIP_I18N.en};}await Promise.all([loadComponent('site-nav','components/header.html'),loadComponent('site-footer','components/footer.html')]);initScrollProgress();initNavScroll();initMobileMenu();initDesktopDropdowns();initActiveNavLink();initLangDropdown();initShareModal();initBibleLogout();initSecurity();initMouseOrb();normalizeInternalLinks();setLanguage(getSavedLanguage());loadPageSpecificScripts();if(typeof window.onMainReady==='function')window.onMainReady();}
function initScrollProgress(){const bar=document.getElementById('scroll-progress');if(!bar)return;const update=()=>{const scroll=window.scrollY||window.pageYOffset||0,max=document.documentElement.scrollHeight-window.innerHeight,percent=max>0?Math.max(0,Math.min(100,(scroll/max)*100)):0;bar.style.width=`${percent}%`;};window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});update();}
function initNavScroll(){const nav=document.getElementById('main-nav');if(!nav)return;const update=()=>nav.classList.toggle('scrolled',(window.scrollY||0)>40);window.addEventListener('scroll',update,{passive:true});update();}
function closeDesktopDropdowns(except=null){document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper=>{if(wrapper===except)return;wrapper.classList.remove('active');const trigger=wrapper.querySelector('.nav-dropdown-trigger');if(trigger){trigger.classList.remove('active');trigger.setAttribute('aria-expanded','false');}});}
function initDesktopDropdowns(){document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper=>{const trigger=wrapper.querySelector('.nav-dropdown-trigger');if(!trigger)return;trigger.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const open=!wrapper.classList.contains('active');closeDesktopDropdowns(wrapper);wrapper.classList.toggle('active',open);trigger.classList.toggle('active',open);trigger.setAttribute('aria-expanded',String(open));});});document.addEventListener('click',event=>{if(!event.target.closest('.nav-dropdown-wrapper')&&!event.target.closest('.lang-dropdown-wrapper'))closeDesktopDropdowns();});document.addEventListener('keydown',event=>{if(event.key==='Escape')closeDesktopDropdowns();});}
function initMobileMenu(){const moreBtn=document.getElementById('mobileMoreBtn'),morePanel=document.getElementById('mobileMoreOverlay'),faithBtn=document.querySelector('[data-mobile-menu="faith"]'),faithPanel=document.getElementById('mobileFaithMenu'),projectsBtn=document.querySelector('[data-mobile-menu="squad"]'),projectsPanel=document.getElementById('mobileSquadMenu'),panels=[morePanel,faithPanel,projectsPanel].filter(Boolean),buttons=[moreBtn,faithBtn,projectsBtn].filter(Boolean);const closeAll=()=>{panels.forEach(panel=>{panel.classList.remove('active');panel.setAttribute('aria-hidden','true');});buttons.forEach(button=>button.setAttribute('aria-expanded','false'));document.body.classList.remove('mobile-panel-open');};const openPanel=(panel,button)=>{closeAll();panel.classList.add('active');panel.setAttribute('aria-hidden','false');if(button)button.setAttribute('aria-expanded','true');document.body.classList.add('mobile-panel-open');};[[moreBtn,morePanel],[faithBtn,faithPanel],[projectsBtn,projectsPanel]].forEach(([button,panel])=>{if(!button||!panel)return;button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();panel.classList.contains('active')?closeAll():openPanel(panel,button);});});document.querySelectorAll('#mobileMoreClose,#mobileSquadClose,.mobile-submenu-close').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();closeAll();}));panels.forEach(panel=>{panel.addEventListener('click',event=>{if(event.target===panel)closeAll();});panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeAll));});document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAll();});window.addEventListener('resize',()=>{if(window.innerWidth>900)closeAll();});}
function markActivePage(page){document.querySelectorAll('[data-page]').forEach(link=>link.classList.toggle('active',(link.dataset.page||'').toLowerCase()===page));}
function activateDropdownContaining(selector){document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper=>{const trigger=wrapper.querySelector('.nav-dropdown-trigger'),active=!!wrapper.querySelector(selector);wrapper.classList.toggle('active',active);if(trigger){trigger.classList.toggle('active',active);trigger.setAttribute('aria-expanded',String(active));}});}
function initActiveNavLink(){const page=getCurrentPageKey();markActivePage(page);const projectPages=['sistersquad-hub','sistersquad','sistersquad2','world-lore','game','gameinfo','miracleshot','music','movie'],faithPages=['bible','worship','worship_eng'],morePages=['journal','about','privacy','terms'],projectActive=projectPages.includes(page),faithActive=faithPages.includes(page),moreActive=morePages.includes(page);if(projectActive)activateDropdownContaining(`[data-page="${page}"], [href*="sistersquad"], [href*="world-lore"], [href*="gameinfo"], [href*="miracleshot"], [href*="music"], [href*="movie"]`);if(faithActive)activateDropdownContaining(`[data-page="${page}"]`);document.querySelectorAll('[data-mobile-menu="squad"]').forEach(button=>button.classList.toggle('active',projectActive));document.querySelectorAll('[data-mobile-menu="faith"]').forEach(button=>button.classList.toggle('active',faithActive));document.querySelectorAll('#mobileMoreBtn').forEach(button=>button.classList.toggle('active',moreActive));document.querySelectorAll('#mobileSquadMenu [href],#mobileFaithMenu [href],#mobileMoreOverlay [href]').forEach(link=>{const href=(link.getAttribute('href')||'').replace(/^\//,'').replace(/\.html$/i,'').replace(/\/$/,'').toLowerCase();link.classList.toggle('active',href===page);});if(page==='today')document.querySelectorAll('[data-page="today"]').forEach(link=>link.classList.add('active'));}
function initLangDropdown(){[['langWrapper','langToggleBtn'],['mobileLangWrapper','mobileLangToggleBtn']].forEach(([wrapperId,toggleId])=>{const wrapper=document.getElementById(wrapperId),toggle=document.getElementById(toggleId);if(!wrapper||!toggle)return;toggle.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();const open=!wrapper.classList.contains('active');document.querySelectorAll('.lang-dropdown-wrapper').forEach(w=>w.classList.remove('active'));wrapper.classList.toggle('active',open);toggle.setAttribute('aria-expanded',String(open));});wrapper.querySelectorAll('.lang-btn').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();setLanguage(button.dataset.lang);}));});document.addEventListener('click',event=>document.querySelectorAll('.lang-dropdown-wrapper').forEach(wrapper=>{if(!wrapper.contains(event.target)){wrapper.classList.remove('active');const toggle=wrapper.querySelector('.lang-current');if(toggle)toggle.setAttribute('aria-expanded','false');}}));}
function applyWorshipStaticLanguage(){if(getCurrentPageKey()!=='worship')return;const stories=WORSHIP_STORY_I18N[currentLang]||WORSHIP_STORY_I18N.ko;document.querySelectorAll('.story-card').forEach((card,index)=>{const pair=stories[index];if(!pair)return;const title=card.querySelector('h3'),body=card.querySelector('p');if(title)title.textContent=pair[0];if(body)body.textContent=pair[1];});const final=document.querySelector('.final-note p');if(final)final.textContent=WORSHIP_FINAL_NOTE_I18N[currentLang]||WORSHIP_FINAL_NOTE_I18N.ko;}
function setLanguage(lang){currentLang=i18n[lang]?lang:'ko';document.documentElement.lang=currentLang;try{localStorage.setItem('pref-lang',currentLang);}catch(_){}document.querySelectorAll('[data-i18n]').forEach(element=>{const key=element.dataset.i18n;if(i18n[currentLang][key]!==undefined)element.innerHTML=i18n[currentLang][key];});const dict=i18n[currentLang];if(dict.meta_title)document.title=dict.meta_title;[['meta[name="description"]','meta_description'],['meta[property="og:title"]','og_title'],['meta[property="og:description"]','og_description'],['meta[name="twitter:title"]','twitter_title'],['meta[name="twitter:description"]','twitter_description']].forEach(([selector,key])=>{const element=document.querySelector(selector);if(element&&dict[key])element.setAttribute('content',dict[key]);});applyWorshipStaticLanguage();document.querySelectorAll('.lang-btn').forEach(button=>button.classList.toggle('active',button.dataset.lang===currentLang));const text=currentLang==='ko'?'KOR':'ENG',desktop=document.getElementById('currentLangText'),mobile=document.getElementById('mobileCurrentLangText');if(desktop)desktop.textContent=text;if(mobile)mobile.textContent=text;document.querySelectorAll('.lang-dropdown-wrapper').forEach(wrapper=>wrapper.classList.remove('active'));document.querySelectorAll('.lang-current').forEach(toggle=>toggle.setAttribute('aria-expanded','false'));if(typeof window.onLangChange==='function')window.onLangChange(currentLang);}
window.setLanguage=setLanguage;window.getCurrentLang=()=>currentLang;
function initShareModal(){const overlay=document.getElementById('shareOverlay');if(!overlay)return;const openButton=document.getElementById('shareOpenBtn'),closeButton=document.getElementById('shareCloseBtn'),copyButton=document.getElementById('shareCopyBtn'),snsButton=document.getElementById('shareSNSBtn'),close=()=>{overlay.classList.remove('active');overlay.setAttribute('aria-hidden','true');setTimeout(()=>{if(!overlay.classList.contains('active'))overlay.style.display='none';},300)},open=()=>{overlay.style.display='flex';overlay.setAttribute('aria-hidden','false');requestAnimationFrame(()=>overlay.classList.add('active'));};if(openButton)openButton.addEventListener('click',open);if(closeButton)closeButton.addEventListener('click',close);overlay.addEventListener('click',event=>{if(event.target===overlay)close();});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&overlay.classList.contains('active'))close();});if(copyButton)copyButton.addEventListener('click',async()=>{const url=window.location.href;let ok=false;if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(url);ok=true;}catch(_){} }if(!ok){const textarea=document.createElement('textarea');textarea.value=url;textarea.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.appendChild(textarea);textarea.focus();textarea.select();try{ok=document.execCommand('copy');}catch(_){}textarea.remove();}if(ok)showToast(i18n[currentLang].toast_copy);close();});if(snsButton)snsButton.addEventListener('click',async()=>{if(!navigator.share){showToast(i18n[currentLang].toast_error);return;}try{await navigator.share({title:document.title||'Chris LEE.PAPA',text:'Chris LEE.PAPA',url:window.location.href});}catch(_){}});}
function showToast(message){const toast=document.getElementById('toast');if(!toast)return;toast.textContent=message;toast.style.display='block';clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{toast.style.display='none';},2500);}window.showToast=showToast;
function initBibleLogout(){document.querySelectorAll('#logoutBtn,#logoutButton,[data-action="logout"],[data-logout],.logout-btn,.logout-button').forEach(button=>{if(button.dataset.logoutBound==='true')return;button.dataset.logoutBound='true';button.addEventListener('click',event=>{event.preventDefault();try{Object.keys(localStorage).filter(key=>/bible|auth|user|login|session/i.test(key)).forEach(key=>localStorage.removeItem(key));Object.keys(sessionStorage).forEach(key=>sessionStorage.removeItem(key));}catch(_){}if(typeof window.onBibleLogout==='function')window.onBibleLogout();else window.location.href='/bible';});});}window.initBibleLogout=initBibleLogout;
function initSecurity(){document.addEventListener('contextmenu',event=>{if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;event.preventDefault();});document.addEventListener('copy',event=>{if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;if(window.getSelection&&window.getSelection().toString())event.preventDefault();});document.addEventListener('keydown',event=>{if(event.target.closest&&event.target.closest('input,textarea,select,[contenteditable="true"]'))return;const key=String(event.key||'').toUpperCase();if(key==='F12'||(event.ctrlKey&&event.shiftKey&&(key==='I'||key==='J'))||(event.ctrlKey&&key==='U')){event.preventDefault();return;}if(event.ctrlKey&&['C','S','P'].includes(key)&&window.getSelection&&window.getSelection().toString())event.preventDefault();});}
function initMouseOrb(){const orb=document.getElementById('mouse-orb');if(!orb||!window.matchMedia||!window.matchMedia('(min-width:901px)').matches)return;document.addEventListener('mousemove',event=>{orb.style.left=`${event.clientX}px`;orb.style.top=`${event.clientY}px`;},{passive:true});}
if('serviceWorker'in navigator)window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').then(()=>console.log('[main.js] ServiceWorker registered')).catch(error=>console.warn('[main.js] ServiceWorker failed',error));});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadComponents);else loadComponents();
