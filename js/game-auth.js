/** Shared account auth for game pages. Uses the common auth.js login modal. */
'use strict';
(() => {
    const GAME_PAGES = new Set(['game','booktop','fiveinrow','curling','tetris','switch','goal']);
    const page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/i,'').toLowerCase();

    if (page === 'gameinfo') {
        const removeBaduk = () => {
            document.querySelectorAll('a.game-card[href*="baduk_easy"]').forEach(card => card.remove());
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
