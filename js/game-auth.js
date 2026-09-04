/** Shared account auth for game pages. Uses the common auth.js login modal. */
'use strict';
(() => {
    const GAME_PAGES = new Set(['game','booktop','fiveinrow','curling','tetris','switch']);
    const page=(location.pathname.split('/').pop()||'index').replace(/\.html$/i,'').toLowerCase();

    if(page==='gameinfo'){
        const removeBaduk = () => {
            document.querySelectorAll('a.game-card[href*="baduk_easy"]').forEach(card => card.remove());
            document.querySelectorAll('[data-i18n="guide6_heading"]').forEach(heading => {
                const block = heading.closest('div[style*="border-bottom"], div[style*="padding-bottom"]');
                if(block) block.remove();
            });
            document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(meta => {
                if(meta.content){
                    meta.content = meta.content.replace(/,?\s*바둑 EASY/g,'').replace(/·바둑EASY/g,'').replace(/7가지/g,'6가지');
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

    let accountInitials='';

    function addAccountBar(target){
        if(!target||!accountInitials)return;
        let bar=target.querySelector(':scope > .clp-game-account');
        if(!bar){
            bar=document.createElement('div');
            bar.className='clp-game-account';
            bar.innerHTML='<span class="clp-game-account-id">👤 <strong></strong></span><button type="button" class="clp-game-logout">LOG OUT</button>';
            const input=findAccountFields(target)[0];
            if(input) input.insertAdjacentElement('beforebegin',bar); else target.prepend(bar);
        }
        bar.querySelector('strong').textContent=accountInitials;
        const button=bar.querySelector('.clp-game-logout');
        if(button&&!button.dataset.bound){
            button.dataset.bound='true';
            button.addEventListener('click',event=>{
                event.preventDefault();
                event.stopPropagation();
                if(window.CLPAuth&&typeof window.CLPAuth.logout==='function') window.CLPAuth.logout();
                else { try{localStorage.removeItem('chrisleepapa-auth-session-v3')}catch(_){}; location.reload(); }
            });
        }
    }

    function removeAccountBars(){document.querySelectorAll('.clp-game-account').forEach(el=>el.remove());}

    function addGameAccountBar(){
        removeAccountBars();
        const fields=findAccountFields();
        if(fields.length){
            fields.forEach(input=>{
                input.classList.add('clp-account-initials');
                input.value=accountInitials;
                input.readOnly=true;
                input.setAttribute('aria-readonly','true');
                input.style.setProperty('display','none','important');
                const label=input.previousElementSibling;
                if(label&&/INITIALS|이니셜/i.test(label.textContent||'')) label.style.setProperty('display','none','important');
                addAccountBar(input.parentElement||document.body);
            });
        } else {
            let bar=document.getElementById('clp-game-account-fixed');
            if(!bar){
                bar=document.createElement('div');
                bar.id='clp-game-account-fixed';
                bar.className='clp-game-account clp-game-account-fixed';
                bar.innerHTML='<span class="clp-game-account-id">👤 <strong></strong></span><button type="button" class="clp-game-logout">LOG OUT</button>';
                document.body.appendChild(bar);
            }
            bar.querySelector('strong').textContent=accountInitials;
            const button=bar.querySelector('.clp-game-logout');
            if(button&&!button.dataset.bound){
                button.dataset.bound='true';
                button.addEventListener('click',event=>{
                    event.preventDefault();event.stopPropagation();
                    if(window.CLPAuth&&typeof window.CLPAuth.logout==='function')window.CLPAuth.logout();
                    else {try{localStorage.removeItem('chrisleepapa-auth-session-v3')}catch(_){};location.reload();}
                });
            }
        }
    }

    function injectAccountStyle(){
        if(document.getElementById('clp-game-account-style'))return;
        const style=document.createElement('style');
        style.id='clp-game-account-style';
        style.textContent=`
.clp-game-account{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;margin:0 0 12px;padding:7px 0;box-sizing:border-box}
.clp-game-account-id{display:inline-flex;align-items:center;justify-content:center;padding:7px 11px;border:1px solid rgba(255,215,0,.28);border-radius:999px;background:rgba(255,255,255,.045);color:#fff;font:700 12px/1.1 Arial,sans-serif;letter-spacing:.08em;white-space:nowrap}
.clp-game-account-id strong{color:#FFD700;margin-left:3px}
.clp-game-logout{display:inline-flex;align-items:center;justify-content:center;padding:7px 11px;border:1px solid rgba(255,215,0,.32);border-radius:999px;background:rgba(255,255,255,.045);color:#FFD700;font:700 12px/1.1 Arial,sans-serif;letter-spacing:.05em;cursor:pointer;white-space:nowrap}
.clp-game-logout:hover{background:rgba(255,215,0,.10)}
.clp-game-account-fixed{position:fixed;top:12px;right:12px;z-index:10000;width:auto;margin:0;padding:0}
@media(max-width:600px){.clp-game-account-fixed{top:8px;right:8px}.clp-game-account-fixed .clp-game-account-id,.clp-game-account-fixed .clp-game-logout{padding:6px 9px;font-size:10px}}
        `;
        document.head.appendChild(style);
    }

    function loadAuth(){if(window.CLPAuth)return Promise.resolve();return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='/js/auth.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
    function isAccountField(el){if(!el||el.tagName!=='INPUT'||el.type==='hidden')return false;if(el.id==='clp-game-login-initials'||el.id==='clp-game-login-pin')return false;return !!el.matches('#player-initial,#player-initials,#initialsInput,#playerInitials,#ini,[name="initial"],[name="initials"],.initials-input,input[id*="initial" i],input[name*="initial" i]')}
    function findAccountFields(root=document){return Array.from(root.querySelectorAll('input')).filter(isAccountField)}
    function protectAccountFields(){if(!accountInitials)return;findAccountFields().forEach(input=>{input.value=accountInitials;input.readOnly=true;input.setAttribute('readonly','readonly');input.setAttribute('aria-readonly','true');input.setAttribute('tabindex','-1');input.setAttribute('title','로그인된 계정 이니셜');input.style.setProperty('caret-color','transparent','important');input.style.setProperty('cursor','default','important');input.style.setProperty('user-select','none','important');input.style.setProperty('-webkit-user-select','none','important');input.style.setProperty('pointer-events','none','important');input.classList.add('clp-account-initials')})}
    function blockUserEditing(event){const target=event.target;if(!isAccountField(target))return;event.preventDefault();event.stopImmediatePropagation();if(accountInitials){target.value=accountInitials;target.blur()}}
    ['beforeinput','input','keydown','paste','cut','drop','mousedown','mouseup','click','focusin'].forEach(type=>document.addEventListener(type,blockUserEditing,true));

    function showLogin(){
        if(window.CLPAuth&&typeof window.CLPAuth.showLoginModal==='function'){
            window.CLPAuth.showLoginModal({prefix:'clp-game-login',onSuccess:()=>location.reload()});
        }
    }

    function onAuthChange(event){
        if(event?.detail?.user){
            accountInitials=String(event.detail.user.initials||'').trim().toUpperCase();
            setTimeout(()=>{injectAccountStyle();protectAccountFields();addGameAccountBar()},0);
        }else{
            accountInitials='';
            removeAccountBars();
            showLogin();
        }
    }
    window.addEventListener('chrisleepapa-auth-change',onAuthChange);

    async function init(){
        try{
            await loadAuth();
            injectAccountStyle();
            if(!window.CLPAuth||!window.CLPAuth.isLoggedIn()){showLogin();return}
            const user=window.CLPAuth.getUser();
            accountInitials=String(user?.initials||'').trim().toUpperCase();
            if(!accountInitials)return;
            const apply=()=>{protectAccountFields();addGameAccountBar()};
            if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
            else apply();
            setTimeout(apply,300);setTimeout(apply,1000);
        }catch(e){console.error('[game-auth]',e)}
    }

    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addGameCenterLink,{once:true});
    else addGameCenterLink();
    init();
})();
