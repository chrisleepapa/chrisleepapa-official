/* TODAY uses the same shared login modal as GAME and BIBLE. */
'use strict';
(() => {
    function loadReadabilityLayer() {
        if (document.querySelector('link[data-today-readability]')) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/today-readability.css?v=20260828';
        link.dataset.todayReadability = 'true';
        document.head.appendChild(link);
    }

    function init() {
        loadReadabilityLayer();
        const legacy = document.getElementById('todayAuth');
        if (legacy) {
            legacy.style.display = 'none';
            legacy.setAttribute('aria-hidden', 'true');
        }

        if (!window.CLPAuth) return;

        if (window.CLPAuth.isLoggedIn()) {
            const user = window.CLPAuth.getUser();
            window.profile = String(user?.initials || '').toUpperCase();
            if (typeof window.startToday === 'function') {
                try { window.startToday(); } catch (_) {}
            }
            return;
        }

        window.CLPAuth.showLoginModal({
            prefix: 'today-shared',
            onSuccess: user => {
                window.profile = String(user?.initials || '').toUpperCase();
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
