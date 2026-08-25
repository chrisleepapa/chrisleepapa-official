/**
 * js/game-auth.js — Shared login gate for Game Center
 * Uses the same CLPAuth account/session as TODAY and BIBLE.
 * Game pages reuse the logged-in account initials automatically.
 */
'use strict';

(() => {
    const GAME_PAGES = new Set(['game','booktop','fiveinrow','curling','tetris','switch']);
    const page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/i, '').toLowerCase();
    if (!GAME_PAGES.has(page)) return;

    const AUTH_SRC = '/js/auth.js';

    function loadAuth() {
        if (window.CLPAuth) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const existing = document.querySelector('script[data-clp-auth]');
            if (existing) {
                existing.addEventListener('load', resolve, { once:true });
                existing.addEventListener('error', reject, { once:true });
                return;
            }
            const script = document.createElement('script');
            script.src = AUTH_SRC;
            script.async = false;
            script.dataset.clpAuth = 'true';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    function addStyles() {
        if (document.getElementById('clp-game-auth-style')) return;
        const style = document.createElement('style');
        style.id = 'clp-game-auth-style';
        style.textContent = `
            body.clp-game-locked > * { visibility:hidden !important; }
            #clp-game-auth { position:fixed; inset:0; z-index:2147483647; display:flex; align-items:center; justify-content:center; padding:24px; background:rgba(3,3,5,.96); font-family:Pretendard,Arial,sans-serif; }
            #clp-game-auth .box { width:min(420px,100%); padding:34px 28px; border:1px solid rgba(201,168,76,.35); border-radius:22px; background:linear-gradient(145deg,rgba(20,20,28,.98),rgba(6,6,10,.98)); box-shadow:0 24px 80px rgba(0,0,0,.55); text-align:center; }
            #clp-game-auth h2 { margin:0 0 8px; color:#f0ece4; font-size:1.5rem; }
            #clp-game-auth p { margin:0 0 22px; color:#aaa8b3; line-height:1.6; font-size:.9rem; }
            #clp-game-auth input { box-sizing:border-box; width:100%; height:48px; margin:6px 0; padding:0 14px; border:1px solid rgba(255,255,255,.12); border-radius:10px; background:rgba(255,255,255,.05); color:#fff; outline:none; text-align:center; font-size:1rem; letter-spacing:.16em; }
            #clp-game-auth button { width:100%; height:48px; margin-top:12px; border:0; border-radius:10px; background:#c9a84c; color:#080808; font-weight:700; cursor:pointer; }
            #clp-game-auth .error { min-height:22px; margin-top:10px; color:#e88b8b; font-size:.82rem; }
        `;
        document.head.appendChild(style);
    }

    function showLogin() {
        addStyles();
        document.body.classList.add('clp-game-locked');
        let overlay = document.getElementById('clp-game-auth');
        if (overlay) return;
        overlay = document.createElement('div');
        overlay.id = 'clp-game-auth';
        overlay.innerHTML = `<div class="box" role="dialog" aria-modal="true" aria-labelledby="clp-game-auth-title"><h2 id="clp-game-auth-title">GAME LOGIN</h2><p>사이트 공통 계정으로 로그인하세요.<br>영문 이니셜 3자리 + 숫자 비밀번호 4자리</p><form id="clp-game-auth-form" autocomplete="on"><input id="clp-game-initials" maxlength="3" minlength="3" pattern="[A-Za-z]{3}" placeholder="INITIALS" autocomplete="username" autocapitalize="characters" required><input id="clp-game-pin" maxlength="4" minlength="4" pattern="[0-9]{4}" inputmode="numeric" type="password" placeholder="4-DIGIT PIN" autocomplete="current-password" required><button type="submit">LOGIN</button><div class="error" id="clp-game-auth-error"></div></form></div>`;
        document.body.appendChild(overlay);
        const initials = overlay.querySelector('#clp-game-initials');
        const pin = overlay.querySelector('#clp-game-pin');
        const error = overlay.querySelector('#clp-game-auth-error');
        initials.focus();
        overlay.querySelector('form').addEventListener('submit', async event => {
            event.preventDefault();
            error.textContent = '';
            const result = await window.CLPAuth.login(initials.value, pin.value, true);
            if (!result.ok) { error.textContent = result.error || '로그인할 수 없습니다.'; return; }
            overlay.remove();
            document.body.classList.remove('clp-game-locked');
            showUserBadge();
            autoFillInitials(result.user);
            window.dispatchEvent(new CustomEvent('clp-game-auth-ready', { detail:result.user }));
        });
    }

    function showUserBadge() {
        const user = window.CLPAuth && window.CLPAuth.getUser();
        if (!user || document.getElementById('clp-game-user')) return;
        const badge = document.createElement('div');
        badge.id = 'clp-game-user';
        badge.style.cssText = 'position:fixed;right:14px;top:14px;z-index:10000;display:flex;gap:7px;align-items:center;padding:7px 10px;border:1px solid rgba(201,168,76,.25);border-radius:999px;background:rgba(5,5,8,.78);backdrop-filter:blur(10px);font:12px Pretendard,Arial,sans-serif;color:#ddd;';
        badge.innerHTML = `<span>${user.initials}</span><button type="button" style="border:0;background:none;color:#aaa;cursor:pointer;font-size:11px;">LOGOUT</button>`;
        badge.querySelector('button').addEventListener('click', () => { window.CLPAuth.logout(); location.reload(); });
        document.body.appendChild(badge);
    }

    /* 게임마다 다른 입력 id/class를 모두 지원합니다. 기존 게임 로직은 건드리지 않습니다. */
    function findInitialInputs() {
        return Array.from(document.querySelectorAll([
            '#initialsInput', '#playerInitials', '#player-initials',
            '[name="initials"]', '.initials-input',
            'input[id*="initial" i]', 'input[name*="initial" i]'
        ].join(','))).filter(input => input.type !== 'hidden');
    }

    function autoFillInitials(user) {
        const initials = String(user?.initials || '').trim().toUpperCase();
        if (!initials) return;
        let attempts = 0;
        const timer = setInterval(() => {
            attempts++;
            const inputs = findInitialInputs();
            if (inputs.length) {
                inputs.forEach(input => {
                    input.value = initials;
                    input.dispatchEvent(new Event('input', { bubbles:true }));
                    input.dispatchEvent(new Event('change', { bubbles:true }));
                    input.dispatchEvent(new Event('blur', { bubbles:true }));
                });
                clearInterval(timer);
            }
            if (attempts >= 50) clearInterval(timer);
        }, 100);
    }

    async function init() {
        addStyles();
        document.body.classList.add('clp-game-locked');
        try {
            await loadAuth();
            if (window.CLPAuth && window.CLPAuth.isLoggedIn()) {
                document.body.classList.remove('clp-game-locked');
                const user = window.CLPAuth.getUser();
                showUserBadge();
                autoFillInitials(user);
            } else showLogin();
        } catch (error) {
            console.error('[game-auth] auth.js failed', error);
            document.body.classList.remove('clp-game-locked');
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
    else init();
})();
