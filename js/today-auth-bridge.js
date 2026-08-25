/* TODAY uses the same shared login modal as GAME and BIBLE. */
'use strict';
(() => {
    function init() {
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
