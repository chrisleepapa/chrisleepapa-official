/*
 * BIBLE shared account gate.
 * BIBLE uses the same CLPAuth session as TODAY and GAME.
 * Legacy BIBLE keys are mirrored only for compatibility with the existing
 * BIBLE data layer; no separate BIBLE login is required.
 * v2026-08-27: keep the shared gate active after the page's inline app code loads.
 */
'use strict';
(() => {
    const AUTH_SRC = '/js/auth.js';
    const STYLE_ID = 'clp-bible-auth-gate-style';
    const MODAL_ID = 'clp-bible-auth-gate';
    const SESSION_KEY = 'chrisleepapa-auth-session-v3';
    const LEGACY_USER_KEY = 'bible_user_id';
    const LEGACY_PIN_KEY = 'bible_pin_hash';

    function getSession() {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            const session = raw ? JSON.parse(raw) : null;
            return session && session.initials && session.pinHash ? session : null;
        } catch (_) { return null; }
    }

    function mirrorLegacySession(session) {
        if (!session) return;
        try {
            localStorage.setItem(LEGACY_USER_KEY, session.initials);
            localStorage.setItem(LEGACY_PIN_KEY, session.pinHash);
        } catch (_) {}
    }

    function loadAuth() {
        if (window.CLPAuth) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const existing = document.querySelector('script[data-clp-auth-loader]');
            if (existing) {
                existing.addEventListener('load', resolve, { once:true });
                existing.addEventListener('error', reject, { once:true });
                return;
            }
            const script = document.createElement('script');
            script.src = AUTH_SRC;
            script.async = false;
            script.dataset.clpAuthLoader = 'true';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    function styles() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            #${MODAL_ID}{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(3,3,5,.94);backdrop-filter:blur(12px)}
            #${MODAL_ID}[hidden]{display:none}
            #${MODAL_ID} .clp-bible-auth-box{width:min(420px,100%);box-sizing:border-box;padding:32px 26px;border:1px solid rgba(201,168,76,.38);border-radius:22px;background:linear-gradient(145deg,#17151a,#08080c);box-shadow:0 30px 90px rgba(0,0,0,.7);text-align:center;font-family:Pretendard,Arial,sans-serif}
            #${MODAL_ID} h2{margin:0 0 8px;color:#e8d08a;font-family:Cinzel,serif;letter-spacing:.08em;font-size:1.45rem}
            #${MODAL_ID} p{margin:0 0 22px;color:#aaa8b3;font-size:.88rem;line-height:1.65}
            #${MODAL_ID} input{width:100%;height:48px;box-sizing:border-box;margin:6px 0;padding:0 14px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:rgba(255,255,255,.05);color:#fff;text-align:center;outline:none;font-size:1rem;letter-spacing:.16em}
            #${MODAL_ID} input:focus{border-color:#c9a84c}
            #${MODAL_ID} input[type=password]{letter-spacing:.35em}
            #${MODAL_ID} button{width:100%;height:48px;margin-top:10px;border:0;border-radius:10px;background:#c9a84c;color:#080808;font-weight:700;cursor:pointer}
            #${MODAL_ID} .clp-bible-auth-error{min-height:22px;margin-top:10px;color:#e88b8b;font-size:.82rem}
        `;
        document.head.appendChild(style);
    }

    function hideLegacyAuthModal() {
        const modal = document.getElementById('authModal');
        if (!modal) return;
        modal.classList.remove('active');
        modal.style.display = 'none';
    }

    function showGate() {
        styles();
        if (document.getElementById(MODAL_ID)) return;
        const modal = document.createElement('div');
        modal.id = MODAL_ID;
        modal.setAttribute('role','dialog');
        modal.setAttribute('aria-modal','true');
        modal.innerHTML = `
            <div class="clp-bible-auth-box">
                <h2>BIBLE LOGIN</h2>
                <p>사이트 공통 계정으로 로그인하세요.<br>영문 이니셜 3자리 + 숫자 비밀번호 4자리</p>
                <form autocomplete="on">
                    <input id="clp-bible-login-initials" maxlength="3" minlength="3" pattern="[A-Za-z]{3}" placeholder="INITIALS" autocomplete="username" autocapitalize="characters" required>
                    <input id="clp-bible-login-pin" maxlength="4" minlength="4" pattern="[0-9]{4}" inputmode="numeric" type="password" placeholder="4-DIGIT PIN" autocomplete="current-password" required>
                    <button type="submit">LOGIN</button>
                    <div class="clp-bible-auth-error" aria-live="polite"></div>
                </form>
            </div>`;
        document.body.appendChild(modal);

        const form = modal.querySelector('form');
        const initials = modal.querySelector('#clp-bible-login-initials');
        const pin = modal.querySelector('#clp-bible-login-pin');
        const error = modal.querySelector('.clp-bible-auth-error');
        initials.focus();

        form.addEventListener('submit', async event => {
            event.preventDefault();
            error.textContent = '';
            const result = await window.CLPAuth.login(initials.value, pin.value, true);
            if (!result.ok) {
                error.textContent = result.error || '로그인할 수 없습니다.';
                return;
            }
            mirrorLegacySession(result.user);
            modal.remove();
            document.documentElement.classList.remove('clp-auth-required');
            hideLegacyAuthModal();
            if (typeof window.checkAuth === 'function') window.checkAuth();
            else window.dispatchEvent(new CustomEvent('chrisleepapa-auth-ready', { detail:{user:result.user} }));
        });
    }

    async function init() {
        try {
            await loadAuth();
            const session = getSession();
            if (session) {
                mirrorLegacySession(session);
                hideLegacyAuthModal();
                return;
            }
            document.documentElement.classList.add('clp-auth-required');
            showGate();
        } catch (error) {
            console.error('[bible-auth-gate]', error);
        }
    }

    window.addEventListener('chrisleepapa-auth-change', event => {
        const session = event.detail?.user || getSession();
        if (session) {
            mirrorLegacySession(session);
            hideLegacyAuthModal();
        }
    });

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
    else init();
})();
