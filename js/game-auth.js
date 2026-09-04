/** Shared account auth for game pages. Uses the common auth.js login modal. */
'use strict';
(() => {
    const GAME_PAGES = new Set(['game','booktop','fiveinrow','curling','tetris','switch']);
    const page=(location.pathname.split('/').pop()||'index').replace(/\.html$/i,'').toLowerCase();

    // gameinfo is the game selection page. Remove the retired Baduk entry
    // without loading any game-auth helpers or the removed title-fix script.
    if(page==='gameinfo'){
        const removeBaduk = () => {
            document.querySelectorAll('a.game-card[href*="baduk_easy"]').forEach(card => card.remove());
            document.querySelectorAll('[data-i18n="guide6_heading"]').forEach(heading => {
                const block = heading.closest('div[style*="border-bottom"], div[style*="padding-bottom"]');
                if(block) block.remove();
            });
            document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(meta => {
                if(meta.content){
                    meta.content = meta.content
                        .replace(/,?\s*바둑 EASY/g,'')
                        .replace(/·바둑EASY/g,'')
                        .replace(/7가지/g,'6가지');
                }
            });
            const intro = document.querySelector('[data-i18n="game_intro_desc"]');
            if(intro) intro.innerHTML = intro.innerHTML.replace(/<strong style="color:#e8d08a;">7가지 무료 온라인 미니게임<\/strong>/g, '<strong style="color:#e8d08a;">6가지 무료 온라인 미니게임</strong>');
        };
        if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', removeBaduk, {once:true});
        else removeBaduk();
        return;
    }

    if(page==='miracleshot'){
        const s=document.createElement('script');
        s.src='/js/work-miracle-shot.js';
        s.defer=true;
        document.head.appendChild(s);
        return;
    }

    if(!GAME_PAGES.has(page))return;

    // Full-screen game pages intentionally do not use the archive header.
    // Provide a consistent way back to the Game Center without covering gameplay controls.
    function addGameCenterLink(){
        if(document.getElementById('game-center-back'))return;
        const link=document.createElement('a');
        link.id='game-center-back';
        link.href='/gameinfo';
        link.textContent='← GAME CENTER';
        link.setAttribute('aria-label','Back to Game Center');
        link.style.cssText='position:fixed;top:12px;left:12px;z-index:10000;display:inline-flex;align-items:center;padding:8px 13px;border:1px solid rgba(255,215,0,.45);border-radius:999px;background:rgba(8,4,22,.82);backdrop-filter:blur(8px);color:#FFD700;font:700 12px/1.2 Arial,sans-serif;letter-spacing:.08em;text-decoration:none;box-shadow:0 4px 18px rgba(0,0,0,.45);transition:transform .2s ease,background .2s ease;';
        link.addEventListener('mouseenter',()=>{link.style.transform='translateY(-1px)';link.style.background='rgba(20,10,45,.95)';});
        link.addEventListener('mouseleave',()=>{link.style.transform='';link.style.background='rgba(8,4,22,.82)';});
        (document.body||document.documentElement).appendChild(link);
    }
    function addGameLogout(){
        if(document.getElementById('game-logout-btn'))return;
        const button=document.createElement('button');
        button.type='button';
        button.id='game-logout-btn';
        button.textContent='LOG OUT';
        button.setAttribute('aria-label','Log out');
        button.style.cssText='position:fixed;top:12px;right:12px;z-index:10000;display:inline-flex;align-items:center;justify-content:center;padding:8px 13px;border:1px solid rgba(255,215,0,.45);border-radius:999px;background:rgba(8,4,22,.82);backdrop-filter:blur(8px);color:#FFD700;font:700 12px/1.2 Arial,sans-serif;letter-spacing:.08em;text-decoration:none;box-shadow:0 4px 18px rgba(0,0,0,.45);cursor:pointer;transition:transform .2s ease,background .2s ease;';
        button.addEventListener('mouseenter',()=>{button.style.transform='translateY(-1px)';button.style.background='rgba(20,10,45,.95)';});
        button.addEventListener('mouseleave',()=>{button.style.transform='';button.style.background='rgba(8,4,22,.82)';});
        button.addEventListener('click',()=>{
            if(window.CLPAuth&&typeof window.CLPAuth.logout==='function'){
                window.CLPAuth.logout();
            }else{
                try{localStorage.removeItem('chrisleepapa-auth-session-v3');}catch(_){}
                location.reload();
            }
        });
        (document.body||document.documentElement).appendChild(button);
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{addGameCenterLink();addGameLogout();},{once:true});
    else{addGameCenterLink();addGameLogout();}

    let accountInitials='';
    function loadAuth(){if(window.CLPAuth)return Promise.resolve();return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='/js/auth.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
    function isAccountField(el){if(!el||el.tagName!=='INPUT'||el.type==='hidden')return false;if(el.id==='clp-game-login-initials'||el.id==='clp-game-login-pin')return false;return !!el.matches('#player-initial,#player-initials,#initialsInput,#playerInitials,#ini,[name="initial"],[name="initials"],.initials-input,input[id*="initial" i],input[name*="initial" i]')}
    function findAccountFields(){return Array.from(document.querySelectorAll('input')).filter(isAccountField)}
    function markAccountField(input){if(!input||!accountInitials)return;input.value=accountInitials;input.readOnly=true;input.setAttribute('readonly','readonly');input.setAttribute('aria-readonly','true');input.setAttribute('tabindex','-1');input.setAttribute('title','로그인된 계정 이니셜');input.style.setProperty('caret-color','transparent','important');input.style.setProperty('cursor','default','important');input.style.setProperty('user-select','none','important');input.style.setProperty('-webkit-user-select','none','important');input.style.setProperty('pointer-events','none','important');input.classList.add('clp-account-initials')}
    function protectAccountFields(){if(accountInitials)findAccountFields().forEach(markAccountField)}
    function blockUserEditing(event){const target=event.target;if(!isAccountField(target))return;if(event.type==='focusin'){markAccountField(target);target.blur();return}event.preventDefault();event.stopImmediatePropagation();markAccountField(target)}
    ['beforeinput','input','keydown','paste','cut','drop','mousedown','mouseup','click','focusin'].forEach(type=>document.addEventListener(type,blockUserEditing,true));
    function showLogin(){window.CLPAuth.showLoginModal({prefix:'clp-game-login',onSuccess:()=>location.reload()})}
    async function init(){try{await loadAuth();if(!window.CLPAuth||!window.CLPAuth.isLoggedIn()){showLogin();return}const user=window.CLPAuth.getUser();accountInitials=String(user?.initials||'').trim().toUpperCase();if(!accountInitials)return;const apply=()=>protectAccountFields();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();setTimeout(apply,300);setTimeout(apply,1000)}catch(e){console.error('[game-auth]',e)}}
    init();
})();
