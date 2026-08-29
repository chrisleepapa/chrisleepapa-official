/*
 * BIBLE shared account gate.
 * BIBLE uses the same CLPAuth session as TODAY and GAME.
 * Legacy BIBLE keys are mirrored only for compatibility with the existing
 * BIBLE data layer; no separate BIBLE login is required.
 * v2026-08-27: reset old client-side BIBLE data once and bind new data to the
 * currently authenticated CLPAuth initials.
 * v2026-08-29: resilient Bible data loader with GitHub raw fallback + cache.
 */
'use strict';
(() => {
    const AUTH_SRC = '/js/auth.js';
    const STYLE_ID = 'clp-bible-auth-gate-style';
    const MODAL_ID = 'clp-bible-auth-gate';
    const SESSION_KEY = 'chrisleepapa-auth-session-v3';
    const LEGACY_USER_KEY = 'bible_user_id';
    const LEGACY_PIN_KEY = 'bible_pin_hash';
    const DATA_RESET_KEY = 'clp-bible-data-reset-v20260827';
    const BIBLE_CACHE_KEY = 'clp-bible-structured-cache-v1';
    const BIBLE_DATA_URLS = [
        'https://raw.githubusercontent.com/stranger828/bibleAPI/main/bible_structured.json',
        'https://raw.githubusercontent.com/stranger828/bibleAPI/main/bible.json'
    ];

    function getSession() {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            const session = raw ? JSON.parse(raw) : null;
            return session && session.initials ? session : null;
        } catch (_) { return null; }
    }

    function resetLegacyClientDataOnce() {
        try {
            if (localStorage.getItem(DATA_RESET_KEY) === '1') return;
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key) continue;
                const lower = key.toLowerCase();
                if (lower.includes('bible') && key !== SESSION_KEY) keys.push(key);
            }
            keys.forEach(key => localStorage.removeItem(key));
            localStorage.setItem(DATA_RESET_KEY, '1');
        } catch (_) {}
    }

    function mirrorLegacySession(session) {
        if (!session) return;
        try {
            localStorage.setItem(LEGACY_USER_KEY, session.initials);
            if (session.pinHash) localStorage.setItem(LEGACY_PIN_KEY, session.pinHash);
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

    function normalizeBiblePayload(payload) {
        if (Array.isArray(payload)) return payload;
        if (!payload || typeof payload !== 'object') return null;
        if (Array.isArray(payload.data)) return payload.data;
        if (Array.isArray(payload.verses)) return payload.verses;
        if (Array.isArray(payload.bible)) return payload.bible;
        return null;
    }

    function validateBibleData(data) {
        if (!Array.isArray(data) || data.length < 30000) return false;
        const sample = data.slice(0, 100);
        return sample.some(v => v && v.book != null && v.chapter != null && v.verse != null && (v.content || v.text));
    }

    function setBibleData(data, source) {
        if (!validateBibleData(data)) throw new Error('Bible data validation failed');
        globalBibleData = data;
        isDataReady = true;
        try {
            localStorage.setItem(BIBLE_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
        } catch (_) {
            // Mobile browsers may reject a large localStorage value; live data still works.
        }
        console.info('[Bible] data ready:', data.length, 'verses from', source);
    }

    async function fetchWithTimeout(url, timeoutMs = 12000) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } finally {
            clearTimeout(timer);
        }
    }

    async function loadBibleDataResilient(spinner) {
        // 1) Live structured dataset — the site's original public Bible DB.
        for (const url of BIBLE_DATA_URLS) {
            try {
                if (spinner) spinner.innerHTML = 'LOADING BIBLE...<br><small>성경 본문을 불러오는 중입니다.</small>';
                const payload = await fetchWithTimeout(url);
                const data = normalizeBiblePayload(payload);
                if (validateBibleData(data)) {
                    setBibleData(data, url);
                    return;
                }
            } catch (error) {
                console.warn('[Bible] source failed:', url, error);
            }
        }

        // 2) Last known good local cache — protects the reader from a temporary CDN/GitHub outage.
        try {
            const cached = JSON.parse(localStorage.getItem(BIBLE_CACHE_KEY) || 'null');
            if (cached && validateBibleData(cached.data)) {
                setBibleData(cached.data, 'local cache');
                console.warn('[Bible] using last known good cached dataset');
                return;
            }
        } catch (error) {
            console.warn('[Bible] cache unavailable:', error);
        }

        throw new Error('No valid Bible dataset available');
    }

    function installBibleDataRecovery() {
        if (window.__clpBibleRecoveryInstalled) return;
        if (typeof window.initAppAfterAuth !== 'function') return;
        window.__clpBibleRecoveryInstalled = true;

        const originalInit = window.initAppAfterAuth;
        window.initAppAfterAuth = async function() {
            initBibleLogout();
            const spinner = document.getElementById('loadingSpinner');
            try {
                await loadSupabaseData();
                await loadBibleDataResilient(spinner);
                if (spinner) spinner.style.display = 'none';
                renderBooks('ot');
                selectBook(1, false);
                setupNotifications();
                updateOverallProgress();
            } catch (error) {
                console.error('[Bible] data initialization failed:', error);
                if (spinner) spinner.innerHTML = 'CONNECTION FAILED.<br><small>성경 본문을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.</small>';
            }
        };
        console.info('[Bible] resilient data loader installed');
    }

    async function init() {
        try {
            await loadAuth();
            resetLegacyClientDataOnce();
            const session = getSession();
            if (session) {
                mirrorLegacySession(session);
                hideLegacyAuthModal();
            } else {
                document.documentElement.classList.add('clp-auth-required');
                showGate();
            }

            // bible.html defines initAppAfterAuth in a later inline script.
            // Defer one tick so this recovery layer can safely replace it.
            setTimeout(installBibleDataRecovery, 0);
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