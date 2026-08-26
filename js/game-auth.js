/** Shared account auth for game pages. Uses the common auth.js login modal. */
'use strict';
(() => {
    const GAME_PAGES = new Set(['game','booktop','fiveinrow','curling','tetris','switch']);
    const page=(location.pathname.split('/').pop()||'index').replace(/\.html$/i,'').toLowerCase();

    // Miracle Shot is a WORKS detail page, not a game. This file is already
    // loaded by the page, so use the same entry point to load its enhancement.
    if(page==='miracleshot'){
        const s=document.createElement('script');
        s.src='/js/work-miracle-shot.js';
        s.defer=true;
        document.head.appendChild(s);
        return;
    }

    if(!GAME_PAGES.has(page))return;
    let accountInitials='';
    function loadAuth(){if(window.CLPAuth)return Promise.resolve();return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='/js/auth.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
    function isAccountField(el){if(!el||el.tagName!=='INPUT'||el.type==='hidden')return false;if(el.id==='clp-game-login-initials'||el.id==='clp-game-login-pin')return false;return !!el.matches('#player-initial,#player-initials,#initialsInput,#playerInitials,[name="initial"],[name="initials"],.initials-input,input[id*="initial" i],input[name*="initial" i]')}
    function findAccountFields(){return Array.from(document.querySelectorAll('input')).filter(isAccountField)}
    function markAccountField(input){if(!input||!accountInitials)return;input.value=accountInitials;input.readOnly=true;input.setAttribute('readonly','readonly');input.setAttribute('aria-readonly','true');input.setAttribute('tabindex','-1');input.setAttribute('title','로그인된 계정 이니셜');input.style.setProperty('caret-color','transparent','important');input.style.setProperty('cursor','default','important');input.style.setProperty('user-select','none','important');input.style.setProperty('-webkit-user-select','none','important');input.style.setProperty('pointer-events','none','important');input.classList.add('clp-account-initials')}
    function protectAccountFields(){if(accountInitials)findAccountFields().forEach(markAccountField)}
    function blockUserEditing(event){const target=event.target;if(!isAccountField(target))return;if(event.type==='focusin'){markAccountField(target);target.blur();return}event.preventDefault();event.stopImmediatePropagation();markAccountField(target)}
    ['beforeinput','input','keydown','paste','cut','drop','mousedown','mouseup','click','focusin'].forEach(type=>document.addEventListener(type,blockUserEditing,true));
    function showLogin(){window.CLPAuth.showLoginModal({prefix:'clp-game-login',onSuccess:()=>location.reload()})}
    async function init(){try{await loadAuth();if(!window.CLPAuth||!window.CLPAuth.isLoggedIn()){showLogin();return}const user=window.CLPAuth.getUser();accountInitials=String(user?.initials||'').trim().toUpperCase();if(!accountInitials)return;const apply=()=>protectAccountFields();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();setTimeout(apply,300);setTimeout(apply,1000)}catch(e){console.error('[game-auth]',e)}}
    init();
})();
