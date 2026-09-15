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
    function syncProfile(user) {
        const initials = String(user?.initials || window.CLPAuth?.getUser?.()?.initials || '').trim().toUpperCase();
        window.profile = initials;
        const el = document.getElementById('profileInitials');
        if (el) el.textContent = initials;
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
        if (!window.CLPAuth) return;
        if (window.CLPAuth.isLoggedIn()) {
            const user = window.CLPAuth.getUser();
            syncProfile(user);
            if (typeof window.startToday === 'function') {
                try { window.startToday(); } catch (_) {}
            }
            return;
        }
        window.CLPAuth.showLoginModal({
            prefix: 'today-shared',
            onSuccess: user => {
                syncProfile(user);
                if (typeof window.startToday === 'function') window.startToday();
            }
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0), { once: true });
    } else {
        setTimeout(init, 0);
    }
})();
