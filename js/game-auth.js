/** Shared account auth for game pages. */
'use strict';
(() => {
    const GAME_PAGES = new Set(['game','booktop','fiveinrow','curling','tetris','switch']);
    const page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/i, '').toLowerCase();
    if (!GAME_PAGES.has(page)) return;

    let accountInitials = '';

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

    function addModalStyles() {
        if (document.getElementById('clp-game-auth-style')) return;
        const style = document.createElement('style');
        style.id = 'clp-game-auth-style';
        style.textContent = `
            #clp-game-auth{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:20px;background:rgba(3,3,5,.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
            #clp-game-auth .clp-auth-card{width:min(360px,100%);box-sizing:border-box;padding:30px 26px 26px;border:1px solid rgba(201,168,76,.25);border-radius:18px;background:#101014;box-shadow:0 24px 70px rgba(0,0,0,.55);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
            #clp-game-auth .clp-auth-mark{width:42px;height:42px;margin:0 auto 16px;border:1px solid rgba(201,168,76,.55);border-radius:50%;display:grid;place-items:center;color:#c9a84c;font-size:18px}
            #clp-game-auth h2{margin:0;text-align:center;color:#f4f1e8;font-size:1.2rem;font-weight:650;letter-spacing:.04em}
            #clp-game-auth .clp-auth-desc{margin:8px 0 22px;text-align:center;color:#8f8d96;font-size:.82rem;line-height:1.55}
            #clp-game-auth .clp-auth-label{display:block;margin:0 0 6px;color:#b9b6bf;font-size:.72rem;font-weight:600;letter-spacing:.06em}
            #clp-game-auth input{display:block;width:100%;height:46px;box-sizing:border-box;margin:0 0 12px;padding:0 13px;border:1px solid rgba(255,255,255,.1);border-radius:9px;background:#18181e;color:#fff;outline:none;font-size:.95rem}
            #clp-game-auth input:focus{border-color:rgba(201,168,76,.7);box-shadow:0 0 0 3px rgba(201,168,76,.08)}
            #clp-game-auth #clp-game-login-initials{text-transform:uppercase;letter-spacing:.18em;text-align:center}
            #clp-game-auth #clp-game-login-pin{letter-spacing:.28em;text-align:center}
            #clp-game-auth button{display:block;width:100%;height:46px;margin-top:5px;border:0;border-radius:9px;background:#c9a84c;color:#0a0907;font-size:.9rem;font-weight:700;cursor:pointer;transition:opacity .15s,transform .15s}
            #clp-game-auth button:hover{opacity:.9}
            #clp-game-auth button:active{transform:translateY(1px)}
            #clp-game-auth #clp-game-auth-error{min-height:20px;margin-top:9px;text-align:center;color:#e79a9a;font-size:.78rem}
            @media(max-width:420px){#clp-game-auth .clp-auth-card{padding:26px 20px 22px;border-radius:16px}}
        `;
        document.head.appendChild(style);
    }

    function isAccountField(el) {
        if (!el || el.tagName !== 'INPUT' || el.type === 'hidden') return false;
        if (el.id === 'clp-game-login-initials' || el.id === 'clp-game-login-pin') return false;
        return !!el.matches('#player-initial, #player-initials, #initialsInput, #playerInitials, [name="initial"], [name="initials"], .initials-input, input[id*="initial" i], input[name*="initial" i]');
    }

    function findAccountFields() {
        return Array.from(document.querySelectorAll('input')).filter(isAccountField);
    }

    function markAccountField(input) {
        if (!input || !accountInitials) return;
        input.value = accountInitials;
        input.readOnly = true;
        input.setAttribute('readonly', 'readonly');
        input.setAttribute('aria-readonly', 'true');
        input.setAttribute('tabindex', '-1');
        input.setAttribute('title', '로그인된 계정 이니셜');
        input.style.setProperty('caret-color', 'transparent', 'important');
        input.style.setProperty('cursor', 'default', 'important');
        input.style.setProperty('user-select', 'none', 'important');
        input.style.setProperty('-webkit-user-select', 'none', 'important');
        input.style.setProperty('pointer-events', 'none', 'important');
        input.classList.add('clp-account-initials');
    }

    function protectAccountFields() {
        if (!accountInitials) return;
        findAccountFields().forEach(markAccountField);
    }

    function blockUserEditing(event) {
        const target = event.target;
        if (!isAccountField(target)) return;
        if (event.type === 'focusin') {
            markAccountField(target);
            target.blur();
            return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        markAccountField(target);
    }

    ['beforeinput', 'input', 'keydown', 'paste', 'cut', 'drop', 'mousedown', 'mouseup', 'click', 'focusin'].forEach(type => {
        document.addEventListener(type, blockUserEditing, true);
    });

    function showLogin() {
        addModalStyles();
        const wrap = document.createElement('div');
        wrap.id = 'clp-game-auth';
        wrap.innerHTML = `<div class="clp-auth-card"><div class="clp-auth-mark">✦</div><h2>게임 로그인</h2><p class="clp-auth-desc">사이트 공통 계정으로 로그인하세요.</p><form autocomplete="on"><label class="clp-auth-label" for="clp-game-login-initials">이니셜</label><input id="clp-game-login-initials" maxlength="3" minlength="3" pattern="[A-Za-z]{3}" placeholder="ABC" autocomplete="username" autocapitalize="characters" required><label class="clp-auth-label" for="clp-game-login-pin">비밀번호</label><input id="clp-game-login-pin" maxlength="4" minlength="4" pattern="[0-9]{4}" inputmode="numeric" type="password" placeholder="4자리 숫자" autocomplete="current-password" required><button type="submit">로그인</button><div id="clp-game-auth-error" aria-live="polite"></div></form></div>`;
        document.body.appendChild(wrap);
        const form = wrap.querySelector('form');
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const error = wrap.querySelector('#clp-game-auth-error');
            error.textContent = '';
            const r = await window.CLPAuth.login(wrap.querySelector('#clp-game-login-initials').value, wrap.querySelector('#clp-game-login-pin').value, true);
            if (!r.ok) { error.textContent = r.error || '로그인 정보를 확인해주세요.'; return; }
            wrap.remove();
            location.reload();
        });
    }

    async function init() {
        try {
            await loadAuth();
            if (!window.CLPAuth || !window.CLPAuth.isLoggedIn()) { showLogin(); return; }
            const user = window.CLPAuth.getUser();
            accountInitials = String(user?.initials || '').trim().toUpperCase();
            if (!accountInitials) return;
            const apply = () => protectAccountFields();
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
