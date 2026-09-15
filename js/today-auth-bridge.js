/* TODAY uses the same shared login modal as GAME and BIBLE. */
'use strict';
(() => {
    function loadScript(src, id, onload) {
        if (document.getElementById(id)) return;
        if ([...document.scripts].some(s => s.src === new URL(src, document.baseURI).href)) return;
        const s = document.createElement('script');
        s.id = id;
        s.src = src;
        s.defer = true;
        if (onload) s.onload = onload;
        document.head.appendChild(s);
    }
    function loadReadabilityLayer() {
        if (document.querySelector('link[data-today-readability]')) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/today-readability.css?v=20260828';
        link.dataset.todayReadability = 'true';
        document.head.appendChild(link);
    }
    function normalizeProfile(user) {
        return String(user?.initials || window.CLPAuth?.getUser?.()?.initials || '').trim().toUpperCase();
    }
    function syncProfile(user) {
        const initials = normalizeProfile(user);
        window.profile = initials;
        try { sessionStorage.setItem('clp-today-profile', initials); } catch (_) {}
        const el = document.getElementById('profileInitials');
        if (el) el.textContent = initials;
        return initials;
    }
    function patchTodayProfile() {
        // today.html keeps a legacy local `profile` variable. The shared auth modal
        // lives outside that scope, so make the public data-key/display helpers
        // resolve the authenticated initials directly from CLPAuth.
        if (typeof window.profileKey === 'function' && !window.profileKey.__sharedAuthPatched) {
            const original = window.profileKey;
            const patched = function() {
                const initials = normalizeProfile(window.CLPAuth?.getUser?.());
                if (initials) {
                    try { sessionStorage.setItem('clp-today-profile', initials); } catch (_) {}
                    const el = document.getElementById('profileInitials');
                    if (el) el.textContent = initials;
                    return 'chrisleepapa-today-' + initials + '-' + new Date().toISOString().slice(0,10);
                }
                return original();
            };
            patched.__sharedAuthPatched = true;
            window.profileKey = patched;
        }
        if (typeof window.startToday === 'function' && !window.startToday.__sharedAuthPatched) {
            const originalStart = window.startToday;
            const patchedStart = function() {
                const initials = normalizeProfile(window.CLPAuth?.getUser?.());
                if (initials) {
                    try { sessionStorage.setItem('clp-today-profile', initials); } catch (_) {}
                    const el = document.getElementById('profileInitials');
                    if (el) el.textContent = initials;
                }
                return originalStart.apply(this, arguments);
            };
            patchedStart.__sharedAuthPatched = true;
            window.startToday = patchedStart;
        }
    }
    function init() {
        loadReadabilityLayer();
        loadScript('/js/main.js?v=20260916', 'today-main-js', () => {
            if (typeof window.loadComponents === 'function') {
                try { window.loadComponents(); } catch (_) {}
            }
        });
        const legacy = document.getElementById('todayAuth');
        if (legacy) {
            legacy.style.display = 'none';
            legacy.setAttribute('aria-hidden', 'true');
        }
        patchTodayProfile();
        if (!window.CLPAuth) return;
        if (window.CLPAuth.isLoggedIn()) {
            const user = window.CLPAuth.getUser();
            syncProfile(user);
            patchTodayProfile();
            if (typeof window.startToday === 'function') {
                try { window.startToday(); } catch (_) {}
            }
            return;
        }
        window.CLPAuth.showLoginModal({
            prefix: 'today-shared',
            onSuccess: user => {
                const initials = syncProfile(user);
                patchTodayProfile();
                if (initials && typeof window.startToday === 'function') window.startToday();
            }
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0), { once: true });
    } else {
        setTimeout(init, 0);
    }
})();