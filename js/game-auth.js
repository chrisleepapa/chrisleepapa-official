/** Shared account auth for game pages. */
'use strict';
(() => {
    const GAME_PAGES = new Set(['game','booktop','fiveinrow','curling','tetris','switch']);
    const page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/i, '').toLowerCase();
    if (!GAME_PAGES.has(page)) return;

    function loadAuth() {
        if (window.CLPAuth) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = '/js/auth.js';
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    function markAccountField(input, initials) {
        if (!input || input.id === 'clp-game-initials') return;
        input.value = initials;
        input.readOnly = true;
        input.setAttribute('readonly', 'readonly');
        input.setAttribute('aria-readonly', 'true');
        input.setAttribute('tabindex', '-1');
        input.setAttribute('title', '로그인된 계정 이니셜');
        input.style.caretColor = 'transparent';
        input.style.cursor = 'default';
        input.style.userSelect = 'none';
        input.style.pointerEvents = 'none';
        input.classList.add('clp-account-initials');
    }

    function findAccountFields() {
        return Array.from(document.querySelectorAll(
            '#player-initial, #player-initials, #initialsInput, #playerInitials,' +
            '[name="initial"], [name="initials"], .initials-input,' +
            'input[id*="initial" i], input[name*="initial" i]'
        )).filter(el => el.tagName === 'INPUT' && el.type !== 'hidden');
    }

    function protectAccountFields(initials) {
        findAccountFields().forEach(input => markAccountField(input, initials));
    }

    function showLogin() {
        const wrap = document.createElement('div');
        wrap.id = 'clp-game-auth';
        wrap.innerHTML = '<form><h2>GAME LOGIN</h2><p>사이트 공통 계정으로 로그인하세요.</p>' +
            '<input id="clp-game-login-initials" maxlength="3" pattern="[A-Za-z]{3}" placeholder="INITIALS" required>' +
            '<input id="clp-game-login-pin" maxlength="4" pattern="[0-9]{4}" inputmode="numeric" type="password" placeholder="4-DIGIT PIN" required>' +
            '<button>LOGIN</button><div id="clp-game-auth-error"></div></form>';
        Object.assign(wrap.style, {position:'fixed',inset:'0',zIndex:'2147483647',display:'grid',placeItems:'center',background:'#030305',padding:'20px'});
        document.body.appendChild(wrap);
        wrap.querySelector('form').addEventListener('submit', async e => {
            e.preventDefault();
            const r = await window.CLPAuth.login(wrap.querySelector('#clp-game-login-initials').value, wrap.querySelector('#clp-game-login-pin').value, true);
            if (!r.ok) { wrap.querySelector('#clp-game-auth-error').textContent = r.error || '로그인 실패'; return; }
            wrap.remove();
            location.reload();
        });
    }

    async function init() {
        try {
            await loadAuth();
            if (!window.CLPAuth || !window.CLPAuth.isLoggedIn()) { showLogin(); return; }
            const user = window.CLPAuth.getUser();
            const initials = String(user?.initials || '').trim().toUpperCase();
            if (!initials) return;

            /* 게임 DOM이 만들어진 뒤 한 번만 적용합니다. 게임 로직을 감시/변조하지 않습니다. */
            const apply = () => protectAccountFields(initials);
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, {once:true});
            else apply();
            setTimeout(apply, 300);
            setTimeout(apply, 1000);
        } catch (e) {
            console.error('[game-auth]', e);
        }
    }

    init();
})();
