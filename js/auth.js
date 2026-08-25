/**
 * js/auth.js — Chris LEE.PAPA shared site authentication
 * One account per site: 3 English initials + 4 digit PIN.
 * Session is shared by all pages on the same browser.
 * v3: authentication storage reset for unified TODAY / BIBLE / GAME login.
 */
'use strict';

(() => {
    const ACCOUNT_PREFIX = 'chrisleepapa-account-v3-';
    const SESSION_KEY = 'chrisleepapa-auth-session-v3';

    const read = (key, fallback = null) => {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : JSON.parse(value);
        } catch (_) {
            return fallback;
        }
    };

    const write = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (_) {
            return false;
        }
    };

    const remove = key => {
        try { localStorage.removeItem(key); } catch (_) {}
    };

    async function hash(value) {
        const data = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return [...new Uint8Array(digest)]
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    function normalizeInitials(value) {
        return String(value || '').trim().toUpperCase();
    }

    function validInitials(value) {
        return /^[A-Z]{3}$/.test(value);
    }

    function validPin(value) {
        return /^\d{4}$/.test(String(value || ''));
    }

    function getUser() {
        const session = read(SESSION_KEY, null);
        if (!session || !validInitials(session.initials)) return null;
        return session;
    }

    function isLoggedIn() {
        return !!getUser();
    }

    async function login(initials, pin, createIfMissing = true) {
        initials = normalizeInitials(initials);
        pin = String(pin || '').trim();

        if (!validInitials(initials)) {
            return { ok:false, error:'이니셜은 영문 3자리로 입력해주세요.' };
        }
        if (!validPin(pin)) {
            return { ok:false, error:'비밀번호는 숫자 4자리로 입력해주세요.' };
        }

        const pinHash = await hash(pin);
        const key = ACCOUNT_PREFIX + initials;
        const account = read(key, null);

        if (account && account.pinHash !== pinHash) {
            return { ok:false, error:'비밀번호가 일치하지 않습니다.' };
        }

        if (!account) {
            if (!createIfMissing) {
                return { ok:false, error:'등록되지 않은 계정입니다.' };
            }
            write(key, {
                initials,
                pinHash,
                createdAt:new Date().toISOString()
            });
        }

        const session = {
            initials,
            loginAt:new Date().toISOString()
        };
        write(SESSION_KEY, session);
        window.dispatchEvent(new CustomEvent('chrisleepapa-auth-change', { detail:{user:session} }));
        return { ok:true, user:session };
    }

    function logout() {
        remove(SESSION_KEY);
        window.dispatchEvent(new CustomEvent('chrisleepapa-auth-change', { detail:{user:null} }));
    }

    function clearLegacyTodaySession() {
        remove('chrisleepapa-today-session');
    }

    window.CLPAuth = {
        login,
        logout,
        getUser,
        isLoggedIn,
        normalizeInitials,
        validInitials,
        validPin,
        clearLegacyTodaySession,
        sessionKey:SESSION_KEY
    };

    try {
        const legacy = localStorage.getItem('chrisleepapa-today-session');
        const current = localStorage.getItem(SESSION_KEY);
        if (!current && legacy) {
            const initials = normalizeInitials(legacy);
            if (validInitials(initials)) {
                write(SESSION_KEY, { initials, loginAt:new Date().toISOString(), migrated:true });
            }
        }
    } catch (_) {}
})();
