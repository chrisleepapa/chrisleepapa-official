/**
 * js/auth.js — Chris LEE.PAPA shared site authentication
 * =====================================================
 * One shared site account: 3 English initials + 4 digit PIN.
 * Supabase is the persistent backend; localStorage remains as a
 * compatibility cache so existing pages keep working during rollout.
 */
'use strict';

(() => {
    const ACCOUNT_PREFIX = 'chrisleepapa-account-v3-';
    const SESSION_KEY = 'chrisleepapa-auth-session-v3';
    const TODAY_PREFIX = 'chrisleepapa-today-';

    const SUPA_URL = 'https://cvfmkcxmxkmemmshfttn.supabase.co';
    const SUPA_KEY = 'sb_publishable_Bb_GkRPWRFeAPvIduwPTJg_O1z_sStm';

    const read = (key, fallback = null) => {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : JSON.parse(value);
        } catch (_) { return fallback; }
    };

    const write = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (_) { return false; }
    };

    const remove = key => { try { localStorage.removeItem(key); } catch (_) {} };

    async function hash(value) {
        const data = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return [...new Uint8Array(digest)]
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    function normalizeInitials(value) { return String(value || '').trim().toUpperCase(); }
    function validInitials(value) { return /^[A-Z]{3}$/.test(value); }
    function validPin(value) { return /^\d{4}$/.test(String(value || '')); }

    function getUser() {
        const session = read(SESSION_KEY, null);
        if (!session || !validInitials(session.initials)) return null;
        return session;
    }

    function isLoggedIn() { return !!getUser(); }

    async function supabaseRPC(name, body) {
        try {
            const response = await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`, {
                method: 'POST',
                headers: {
                    apikey: SUPA_KEY,
                    Authorization: `Bearer ${SUPA_KEY}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) return { ok: false, status: response.status };
            return { ok: true, data: await response.json() };
        } catch (_) { return { ok: false, status: 0 }; }
    }

    async function login(initials, pin, createIfMissing = true) {
        initials = normalizeInitials(initials);
        pin = String(pin || '').trim();

        if (!validInitials(initials)) return { ok:false, error:'이니셜은 영문 3자리로 입력해주세요.' };
        if (!validPin(pin)) return { ok:false, error:'비밀번호는 숫자 4자리로 입력해주세요.' };

        const pinHash = await hash(pin);
        const key = ACCOUNT_PREFIX + initials;
        const localAccount = read(key, null);

        const remote = await supabaseRPC('clp_login', {
            p_initials: initials,
            p_pin_hash: pinHash,
            p_create_if_missing: !!createIfMissing
        });

        if (remote.ok) {
            const result = Array.isArray(remote.data) ? remote.data[0] : remote.data;
            if (!result || result.ok !== true) {
                return { ok:false, error: result?.error || '로그인 정보를 확인해주세요.' };
            }
        } else if (localAccount && localAccount.pinHash !== pinHash) {
            return { ok:false, error:'비밀번호가 일치하지 않습니다.' };
        } else if (!localAccount && !createIfMissing) {
            return { ok:false, error:'등록되지 않은 계정입니다.' };
        }

        if (!localAccount) {
            write(key, { initials, pinHash, createdAt:new Date().toISOString() });
        }

        const session = {
            initials,
            pinHash,
            loginAt:new Date().toISOString(),
            backend: remote.ok ? 'supabase' : 'local-cache'
        };

        write(SESSION_KEY, session);
        window.dispatchEvent(new CustomEvent('chrisleepapa-auth-change', { detail:{user:session} }));
        await hydrateTodayFromSupabase(session);

        return { ok:true, user:session };
    }

    function logout() {
        remove(SESSION_KEY);
        window.dispatchEvent(new CustomEvent('chrisleepapa-auth-change', { detail:{user:null} }));
    }

    function clearLegacyTodaySession() { remove('chrisleepapa-today-session'); }

    function todayKeyForUser(initials, date) { return `${TODAY_PREFIX}${initials}-${date}`; }

    function todayDateFromKey(key) {
        const match = String(key || '').match(/^chrisleepapa-today-[A-Z]{3}-(\d{4}-\d{2}-\d{2})$/i);
        return match ? match[1] : null;
    }

    async function hydrateTodayFromSupabase(session) {
        if (!session?.initials || !session?.pinHash) return;
        const date = new Date().toISOString().slice(0, 10);
        const remote = await supabaseRPC('clp_load_today', {
            p_initials: session.initials,
            p_pin_hash: session.pinHash,
            p_date: date
        });
        if (!remote.ok || !remote.data) return;
        const data = Array.isArray(remote.data) ? remote.data[0] : remote.data;
        if (!data || data.ok === false) return;
        const payload = data.data || { todos:[], memo:'', prayer:'' };
        write(todayKeyForUser(session.initials, date), payload);
    }

    let syncing = false;

    async function syncTodayKey(key, rawValue) {
        if (syncing) return;
        const session = getUser();
        const date = todayDateFromKey(key);
        if (!session?.initials || !session?.pinHash || !date) return;
        let payload;
        try { payload = JSON.parse(rawValue); } catch (_) { return; }
        if (!payload || typeof payload !== 'object') return;
        syncing = true;
        try {
            await supabaseRPC('clp_save_today', {
                p_initials: session.initials,
                p_pin_hash: session.pinHash,
                p_date: date,
                p_data: payload
            });
        } finally { syncing = false; }
    }

    try {
        const storageProto = Storage.prototype;
        const originalSetItem = storageProto.setItem;
        if (!storageProto.__clpTodaySyncPatched) {
            storageProto.setItem = function(key, value) {
                const result = originalSetItem.call(this, key, value);
                if (this === localStorage && String(key).startsWith(TODAY_PREFIX)) {
                    syncTodayKey(String(key), String(value));
                }
                return result;
            };
            Object.defineProperty(storageProto, '__clpTodaySyncPatched', { value:true });
        }
    } catch (_) {}

    window.CLPAuth = {
        login,
        logout,
        getUser,
        isLoggedIn,
        normalizeInitials,
        validInitials,
        validPin,
        clearLegacyTodaySession,
        sessionKey:SESSION_KEY,
        supabaseUrl:SUPA_URL,
        backend:'supabase'
    };

    /* Migrate the old TODAY session if one exists. */
    try {
        const legacy = localStorage.getItem('chrisleepapa-today-session');
        const current = localStorage.getItem(SESSION_KEY);
        if (!current && legacy) {
            const initials = normalizeInitials(legacy);
            if (validInitials(initials)) {
                write(SESSION_KEY, {
                    initials,
                    loginAt:new Date().toISOString(),
                    migrated:true
                });
            }
        }
    } catch (_) {}

    /*
     * Shared-session auto resume:
     * TODAY has its own login overlay for first-time users, but once the
     * shared account already exists we automatically submit that overlay.
     * This prevents a second login every time the user returns to TODAY.
     */
    function autoResumeToday() {
        if (!isLoggedIn()) return;
        const button = document.getElementById('authSubmit');
        const initials = document.getElementById('authInitials');
        const pin = document.getElementById('authPin');
        if (!button || !initials || !pin) return;

        const session = getUser();
        const account = read(ACCOUNT_PREFIX + session.initials, null);
        if (!account?.pinHash) return;

        initials.value = session.initials;
        pin.value = '';

        /* TODAY's current login flow requires the PIN field. We cannot
           reconstruct the original PIN from its hash, so do not fake a
           password submission. Instead, close the overlay and restore the
           already authenticated profile directly when the page exposes its
           startToday() function. */
        if (typeof window.startToday === 'function') {
            try {
                window.startToday();
                return;
            } catch (_) {}
        }

        window.dispatchEvent(new CustomEvent('chrisleepapa-auth-ready', {
            detail:{user:session, autoResume:true}
        }));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(autoResumeToday, 0), { once:true });
    } else {
        setTimeout(autoResumeToday, 0);
    }
})();
