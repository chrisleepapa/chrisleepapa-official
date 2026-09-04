/** Shared account auth for game pages. Uses the common auth.js login modal. */
'use strict';
(() => {
    const GAME_PAGES = new Set(['game','booktop','fiveinrow','curling','tetris','switch']);
    const page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/i,'').toLowerCase();

    if (page === 'gameinfo') {
        const removeBaduk = () => {
            document.querySelectorAll('a.game-card[href*="baduk_easy"]').forEach(card => card.remove());
            document.querySelectorAll('[data-i18n="guide6_heading"]').forEach(heading => {
                const block = heading.closest('div[style*="border-bottom"], div[style*="padding-bottom"]');
                if (block) block.remove();
            });
            document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(meta => {
                if (meta.content) meta.content = meta.content.replace(/,?\s*바둑 EASY/g,'').replace(/·바둑EASY/g,'').replace(/7가지/g,'6가지');
            });
            const intro = document.querySelector('[data-i18n="game_intro_desc"]');
            if (intro) intro.innerHTML = intro.innerHTML.replace(/<strong style="color:#e8d08a;">7가지 무료 온라인 미니게임<\/strong>/g,'<strong style="color:#e8d08a;">6가지 무료 온라인 미니게임</strong>');
        };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', removeBaduk, {once:true}); else removeBaduk();
        return;
    }
    if (page === 'miracleshot') {
        const s = document.createElement('script'); s.src = '/js/work-miracle-shot.js'; s.defer = true; document.head.appendChild(s); return;
    }
    if (!GAME_PAGES.has(page)) return;

    /* Legacy ranking inputs stay in the DOM for the games' internal ranking logic,
       but the common YOUR ID modal must remain completely visible. */
    function injectLegacyAccountPrehideStyle() {
        if (document.getElementById('clp-game-legacy-account-prehide')) return;
        const style = document.createElement('style');
        style.id = 'clp-game-legacy-account-prehide';
        style.textContent = `
#player-initial,#player-initials,#initialsInput,#playerInitials,#ini,#initials-input,
[name="initial"],[name="initials"],.initials-input,
input[id*="initial" i]:not(#clp-game-login-initials),input[name*="initial" i]:not(#clp-game-login-initials){display:none!important;visibility:hidden!important;opacity:0!important}
#initialForm:has(input),.initial-form-container:has(input[id*="initial" i]),
.initial-form-container:has(.initials-input){display:none!important;visibility:hidden!important;opacity:0!important}
#s-login #initialsInput + button,
#s-login #player-initial + button,
#s-login #player-initials + button{position:relative}
#s-login [id="initialsInput"] + button{display:none!important}
`;
        document.head.appendChild(style);
    }
    injectLegacyAccountPrehideStyle();

    function addGameCenterLink() {
        if (document.getElementById('game-center-back')) return;
        const link = document.createElement('a');
        link.id = 'game-center-back'; link.href = '/gameinfo'; link.textContent = '← GAME CENTER';
        link.setAttribute('aria-label','Back to Game Center');
        link.style.cssText = 'position:fixed;top:12px;left:12px;z-index:10000;display:inline-flex;align-items:center;padding:8px 13px;border:1px solid rgba(255,215,0,.45);border-radius:999px;background:rgba(8,4,22,.82);backdrop-filter:blur(8px);color:#FFD700;font:700 12px/1.2 Arial,sans-serif;letter-spacing:.08em;text-decoration:none;box-shadow:0 4px 18px rgba(0,0,0,.45);transition:transform .2s ease,background .2s ease;';
        link.addEventListener('mouseenter',()=>{link.style.transform='translateY(-1px)';link.style.background='rgba(20,10,45,.95)'});
        link.addEventListener('mouseleave',()=>{link.style.transform='';link.style.background='rgba(8,4,22,.82)'});
        (document.body || document.documentElement).appendChild(link);
    }

    let accountInitials = '';
    function addAccountBar() {
        if (!accountInitials) return;
        let bar = document.getElementById('clp-game-account-fixed');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'clp-game-account-fixed';
            bar.className = 'clp-game-account clp-game-account-fixed';
            bar.innerHTML = '<span class="clp-game-account-id">👤 <strong></strong></span><button type="button" class="clp-game-logout">LOG OUT</button>';
            document.body.appendChild(bar);
        }
        bar.querySelector('strong').textContent = accountInitials;
        const button = bar.querySelector('.clp-game-logout');
        if (button && !button.dataset.bound) {
            button.dataset.bound = 'true';
            button.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
                if (window.CLPAuth && typeof window.CLPAuth.logout === 'function') window.CLPAuth.logout();
                else {
                    try { localStorage.removeItem('chrisleepapa-auth-session-v3'); } catch (_) {}
                    location.reload();
                }
            });
        }
    }
    function removeAccountBars() { document.querySelectorAll('.clp-game-account').forEach(el => el.remove()); }
    function addGameAccountBar() {
        removeAccountBars();
        const fields = findAccountFields();
        if (fields.length) {
            fields.forEach(input => {
                input.classList.add('clp-account-initials');
                input.value = accountInitials;
                input.readOnly = true;
                input.setAttribute('aria-readonly','true');
                input.style.setProperty('display','none','important');
                const label = input.previousElementSibling;
                if (label && /INITIALS|이니셜/i.test(label.textContent || '')) label.style.setProperty('display','none','important');
            });
        }
        addAccountBar();
    }
    function injectAccountStyle() {
        if (document.getElementById('clp-game-account-style')) return;
        const style=document.createElement('style'); style.id='clp-game-account-style';
        style.textContent=`.clp-game-account{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;margin:0 0 12px;padding:7px 0;box-sizing:border-box}.clp-game-account-id{display:inline-flex;align-items:center;justify-content:center;padding:7px 11px;border:1px solid rgba(255,215,0,.28);border-radius:999px;background:rgba(255,255,255,.045);color:#fff;font:700 12px/1.1 Arial,sans-serif;letter-spacing:.08em;white-space:nowrap}.clp-game-account-id strong{color:#FFD700;margin-left:3px}.clp-game-logout{display:inline-flex;align-items:center;justify-content:center;padding:7px 11px;border:1px solid rgba(255,215,0,.32);border-radius:999px;background:rgba(255,255,255,.045);color:#FFD700;font:700 12px/1.1 Arial,sans-serif;letter-spacing:.05em;cursor:pointer;white-space:nowrap}.clp-game-logout:hover{background:rgba(255,215,0,.10)}.clp-game-account-fixed{position:fixed;top:12px;right:12px;z-index:10000;width:auto;margin:0;padding:0}@media(max-width:600px){.clp-game-account-fixed{top:8px;right:8px}.clp-game-account-fixed .clp-game-account-id,.clp-game-account-fixed .clp-game-logout{padding:6px 9px;font-size:10px}}`;
        document.head.appendChild(style);
    }
    function injectMobileGamePerformanceStyle(){
        if(page!=='game'||document.getElementById('clp-mobile-game-performance'))return;
        const style=document.createElement('style');style.id='clp-mobile-game-performance';
        style.textContent=`@media(max-width:600px){.board{animation:none!important;box-shadow:0 0 24px rgba(155,89,182,.28)!important}.board::before{animation:none!important;background-size:100% 100%!important;background-position:50% 50%!important}.board::after{animation:none!important;mix-blend-mode:normal!important;opacity:.38!important}.tok.a0,.tok.a1{filter:none!important;animation:tbounce .8s ease-in-out infinite!important}.cell{transition:none!important}.cell:hover{transform:none!important;box-shadow:none!important}}@media(prefers-reduced-motion:reduce){.board,.board::before,.board::after,.tok.a0,.tok.a1{animation:none!important}}`;
        document.head.appendChild(style);
    }
    function loadAuth(){
        if(window.CLPAuth)return Promise.resolve();
        return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='/js/auth.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
    }
    function isAccountField(el){
        if(!el||el.tagName!=='INPUT'||el.type==='hidden')return false;
        if(el.id==='clp-game-login-initials'||el.id==='clp-game-login-pin')return false;
        return !!el.matches('#player-initial,#player-initials,#initialsInput,#playerInitials,#ini,#initials-input,[name="initial"],[name="initials"],.initials-input,input[id*="initial" i],input[name*="initial" i]');
    }
    function findAccountFields(root=document){return Array.from(root.querySelectorAll('input')).filter(isAccountField)}
    function protectAccountFields(){
        if(!accountInitials)return;
        findAccountFields().forEach(input=>{
            input.value=accountInitials; input.readOnly=true; input.setAttribute('readonly','readonly'); input.setAttribute('aria-readonly','true'); input.setAttribute('tabindex','-1');
            input.setAttribute('title','로그인된 계정 이니셜'); input.style.setProperty('caret-color','transparent','important'); input.style.setProperty('cursor','default','important'); input.style.setProperty('user-select','none','important'); input.style.setProperty('-webkit-user-select','none','important'); input.style.setProperty('pointer-events','none','important'); input.classList.add('clp-account-initials');
        });
    }
    function blockUserEditing(event){const target=event.target;if(!isAccountField(target))return;event.preventDefault();event.stopImmediatePropagation();if(accountInitials){target.value=accountInitials;target.blur()}}
    ['beforeinput','input','keydown','paste','cut','drop','mousedown','mouseup','click','focusin'].forEach(type=>document.addEventListener(type,blockUserEditing,true));
    function showLogin(){if(window.CLPAuth&&typeof window.CLPAuth.showLoginModal==='function')window.CLPAuth.showLoginModal({prefix:'clp-game-login',onSuccess:()=>location.reload()})}
    function onAuthChange(event){
        if(event?.detail?.user){
            accountInitials=String(event.detail.user.initials||'').trim().toUpperCase();
            setTimeout(()=>{injectAccountStyle();injectMobileGamePerformanceStyle();protectAccountFields();addGameAccountBar()},0);
        } else {accountInitials='';removeAccountBars();showLogin()}
    }
    window.addEventListener('chrisleepapa-auth-change',onAuthChange);
    async function init(){
        try{
            await loadAuth(); injectAccountStyle(); injectMobileGamePerformanceStyle();
            if(!window.CLPAuth||!window.CLPAuth.isLoggedIn()){showLogin();return}
            const user=window.CLPAuth.getUser(); accountInitials=String(user?.initials||'').trim().toUpperCase(); if(!accountInitials)return;
            const apply=()=>{protectAccountFields();addGameAccountBar()};
            if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
            setTimeout(apply,300);setTimeout(apply,1000);
            if(page==='tetris'){
                const enterTetrisArena=()=>{
                    const input=document.getElementById('initialsInput');
                    if(input && !input.value) input.value=accountInitials;
                    if(typeof window.enterArena==='function') window.enterArena();
                };
                if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(enterTetrisArena,150),{once:true});
                else setTimeout(enterTetrisArena,150);
            }
        }catch(e){console.error('[game-auth]',e)}
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addGameCenterLink,{once:true});else addGameCenterLink();
    init();

    /* TETRIS: reliable manual start screen.
       This is intentionally isolated to /tetris and does not touch auth or ranking logic. */
    if (page === 'tetris') {
        const initTetrisStartScreen = () => {
            if (document.getElementById('clp-tetris-start-screen')) return;
            const login = document.getElementById('s-login');
            const gameWrap = document.getElementById('gameWrap');
            if (!login || !gameWrap) return;

            const style = document.createElement('style');
            style.id = 'clp-tetris-start-style';
            style.textContent = `
#clp-tetris-start-screen{
 position:absolute;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;
 padding:28px;background:rgba(3,3,5,.94);backdrop-filter:blur(14px);text-align:center;
}
#clp-tetris-start-screen.visible{display:flex!important}
#clp-tetris-start-screen .clp-tetris-start-card{
 width:min(360px,88vw);padding:30px 24px;border:1px solid rgba(255,255,255,.2);border-radius:26px;
 background:rgba(10,5,20,.96);box-shadow:0 24px 70px rgba(0,0,0,.72),0 0 36px rgba(255,0,127,.22);
}
#clp-tetris-start-screen .clp-tetris-start-icon{font-size:3.2rem;line-height:1;margin-bottom:14px}
#clp-tetris-start-screen .clp-tetris-start-title{font-family:'Cinzel',serif;font-size:1.8rem;font-weight:900;letter-spacing:2px}
#clp-tetris-start-screen .clp-tetris-start-player{margin:10px 0 6px;color:#00e5ff;font-family:'Exo 2',sans-serif;font-size:1.05rem;font-weight:900;letter-spacing:2px}
#clp-tetris-start-screen .clp-tetris-start-desc{font-size:.8rem;color:#aaa;margin-bottom:8px}
#clp-tetris-start-screen button{display:block!important;visibility:visible!important;opacity:1!important;position:relative;z-index:10000}
`;
            document.head.appendChild(style);

            const screen = document.createElement('div');
            screen.id = 'clp-tetris-start-screen';
            screen.innerHTML = `
<div class="clp-tetris-start-card">
  <div class="clp-tetris-start-icon">🎮</div>
  <div class="clp-tetris-start-title">READY?</div>
  <div class="clp-tetris-start-player">PLAYER <span id="clp-tetris-ready-initials">---</span></div>
  <div class="clp-tetris-start-desc">배틀 필드에 입장했습니다.</div>
  <div class="clp-tetris-start-desc">준비가 되면 게임을 시작하세요.</div>
  <button id="clp-tetris-start-button" class="btn-magic" type="button">게임 시작</button>
</div>`;
            gameWrap.appendChild(screen);

            const sync = () => {
                const visible = login.classList.contains('hidden');
                const initials = document.getElementById('hudInit')?.innerText || '---';
                const ready = document.getElementById('clp-tetris-ready-initials');
                if (ready) ready.textContent = initials || '---';
                screen.classList.toggle('visible', visible);
            };

            document.getElementById('clp-tetris-start-button').addEventListener('click', () => {
                screen.classList.remove('visible');
                const legacy = document.getElementById('game-start-overlay');
                if (legacy) legacy.classList.add('hidden');
                if (typeof window.startGame === 'function') window.startGame();
            });

            const observer = new MutationObserver(sync);
            observer.observe(login, {attributes:true,attributeFilter:['class']});
            sync();
        };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTetrisStartScreen, {once:true});
        else initTetrisStartScreen();
    }
})();