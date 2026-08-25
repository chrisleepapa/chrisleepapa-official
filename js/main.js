/**
 * js/main.js — Chris LEE.PAPA 공식 사이트 공통 스크립트
 * =======================================================
 * Desktop Navigation
 * Mobile Bottom Navigation
 * Language / Share / Scroll / Footer / Security
 * Sister Squad Navigation
 * Bible logout control
 * =======================================================
 */

'use strict';

/* =====================================================
   1. i18n
   ===================================================== */

const BASE_I18N = {
    ko: {
        nav_home: 'Home',
        nav_works: 'Works',
        nav_faith: 'Faith',
        nav_squad: 'Sister Squad',
        nav_play: 'Play',
        nav_journal: 'Journal',
        nav_about: 'About',
        nav_music: 'Music',
        nav_movie: 'Movies',
        nav_book: 'Books',
        nav_bible: 'Bible',
        nav_worship: 'Worship',
        nav_squad_short: 'SQUAD',
        nav_squad_1: 'SISTER SQUAD',
        nav_squad_2: 'SISTER SQUAD 2',
        nav_game: 'GAME',
        share_title: 'SHARE ARCHIVE',
        share_desc: '이곳의 기록과 영감을 소중한 사람들에게 전하세요.',
        share_copy: 'COPY LINK',
        share_sns: 'SNS SHARE',
        share_close: 'Close',
        footer_text: '© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',
        footer_privacy: '개인정보처리방침',
        footer_terms: '이용약관',
        toast_copy: '링크가 복사되었습니다 ✓',
        toast_error: '지원하지 않는 브라우저입니다.'
    },
    en: {
        nav_home: 'Home',
        nav_works: 'Works',
        nav_faith: 'Faith',
        nav_squad: 'Sister Squad',
        nav_play: 'Play',
        nav_journal: 'Journal',
        nav_about: 'About',
        nav_music: 'Music',
        nav_movie: 'Movies',
        nav_book: 'Books',
        nav_bible: 'Bible',
        nav_worship: 'Worship',
        nav_squad_short: 'SQUAD',
        nav_squad_1: 'SISTER SQUAD',
        nav_squad_2: 'SISTER SQUAD 2',
        nav_game: 'GAME',
        share_title: 'SHARE ARCHIVE',
        share_desc: 'Share the records and inspiration here with your loved ones.',
        share_copy: 'COPY LINK',
        share_sns: 'SNS SHARE',
        share_close: 'Close',
        footer_text: '© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',
        footer_privacy: 'Privacy Policy',
        footer_terms: 'Terms of Use',
        toast_copy: 'Link copied ✓',
        toast_error: 'Sharing is not supported in this browser.'
    }
};

let i18n = {
    ko: { ...BASE_I18N.ko },
    en: { ...BASE_I18N.en }
};

let currentLang = 'ko';

/* =====================================================
   2. COMPONENT LOADER
   ===================================================== */

function getMainScriptUrl() {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
        const src = scripts[i].src || '';
        if (src.includes('/js/main.js')) return src;
    }
    return new URL('js/main.js', document.baseURI).href;
}

function getSiteFileUrl(fileName) {
    return new URL('../' + fileName, getMainScriptUrl()).href;
}

async function loadComponent(targetId, fileName) {
    const target = document.getElementById(targetId);
    if (!target) return false;

    const url = getSiteFileUrl(fileName);

    try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        target.innerHTML = await res.text();
        return true;
    } catch (err) {
        console.warn(`[main.js] 컴포넌트 로드 실패: ${url}`, err);
        return false;
    }
}

async function loadComponents() {
    if (window.PAGE_I18N) {
        i18n.ko = { ...BASE_I18N.ko, ...(window.PAGE_I18N.ko || {}) };
        i18n.en = { ...BASE_I18N.en, ...(window.PAGE_I18N.en || {}) };
    }

    await Promise.all([
        loadComponent('site-nav', 'components/header.html'),
        loadComponent('site-footer', 'components/footer.html')
    ]);

    initScrollProgress();
    initNavScroll();
    initMobileMenu();
    initDesktopDropdowns();
    initActiveNavLink();
    initLangDropdown();
    initShareModal();
    initSecurity();
    initMouseOrb();
    initBibleLogout();

    let savedLang = 'ko';
    try {
        savedLang = localStorage.getItem('pref-lang') || 'ko';
    } catch (_) {}

    setLanguage(savedLang);

    if (typeof window.onMainReady === 'function') {
        window.onMainReady();
    }
}

/* =====================================================
   3. SCROLL PROGRESS
   ===================================================== */

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    function updateProgress() {
        const scrolled = window.scrollY || window.pageYOffset || 0;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
        bar.style.width = Math.min(100, Math.max(0, percentage)) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

/* =====================================================
   4. NAVIGATION SCROLL
   ===================================================== */

function initNavScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    function updateNav() {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
}

/* =====================================================
   5. MOBILE NAVIGATION
   ===================================================== */

function initMobileMenu() {
    const moreBtn = document.getElementById('mobileMoreBtn');
    const moreOverlay = document.getElementById('mobileMoreOverlay');
    const moreClose = document.getElementById('mobileMoreClose');

    const worksBtn = document.querySelector('[data-mobile-menu="works"]');
    const worksOverlay = document.getElementById('mobileWorksMenu');

    const faithBtn = document.querySelector('[data-mobile-menu="faith"]');
    const faithOverlay = document.getElementById('mobileFaithMenu');

    const squadBtn = document.querySelector('[data-mobile-menu="squad"]');
    const squadOverlay = document.getElementById('mobileSquadMenu');
    const squadClose = document.getElementById('mobileSquadClose');

    const panels = [moreOverlay, worksOverlay, faithOverlay, squadOverlay];
    const buttons = [moreBtn, worksBtn, faithBtn, squadBtn];

    function closeAllPanels() {
        panels.forEach(panel => {
            if (!panel) return;
            panel.classList.remove('active');
            panel.setAttribute('aria-hidden', 'true');
        });

        buttons.forEach(button => {
            if (!button) return;
            button.setAttribute('aria-expanded', 'false');
        });

        document.body.classList.remove('mobile-panel-open');
    }

    function openPanel(panel, button) {
        if (!panel) return;
        closeAllPanels();
        panel.classList.add('active');
        panel.setAttribute('aria-hidden', 'false');
        if (button) button.setAttribute('aria-expanded', 'true');
        document.body.classList.add('mobile-panel-open');
    }

    function bindToggle(button, panel) {
        if (!button || !panel) return;
        button.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            if (panel.classList.contains('active')) closeAllPanels();
            else openPanel(panel, button);
        });
    }

    bindToggle(moreBtn, moreOverlay);
    bindToggle(worksBtn, worksOverlay);
    bindToggle(faithBtn, faithOverlay);
    bindToggle(squadBtn, squadOverlay);

    if (moreClose) {
        moreClose.addEventListener('click', event => {
            event.preventDefault();
            closeAllPanels();
        });
    }

    if (squadClose) {
        squadClose.addEventListener('click', event => {
            event.preventDefault();
            closeAllPanels();
        });
    }

    panels.forEach(panel => {
        if (!panel) return;

        panel.addEventListener('click', event => {
            if (event.target === panel) closeAllPanels();
        });

        panel.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeAllPanels);
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            const hasOpen = panels.some(panel => panel && panel.classList.contains('active'));
            if (hasOpen) closeAllPanels();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeAllPanels();
    });
}

/* =====================================================
   6. DESKTOP DROPDOWN
   ===================================================== */

function initDesktopDropdowns() {
    const wrappers = document.querySelectorAll('.nav-dropdown-wrapper');
    if (!wrappers.length) return;

    wrappers.forEach(wrapper => {
        const trigger = wrapper.querySelector('.nav-dropdown-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = wrapper.classList.contains('active');

            wrappers.forEach(other => {
                if (other === wrapper) return;
                other.classList.remove('active');
                const otherTrigger = other.querySelector('.nav-dropdown-trigger');
                if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            });

            wrapper.classList.toggle('active', !isOpen);
            trigger.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    document.addEventListener('click', event => {
        if (event.target.closest('.nav-dropdown-wrapper')) return;
        wrappers.forEach(wrapper => {
            wrapper.classList.remove('active');
            const trigger = wrapper.querySelector('.nav-dropdown-trigger');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        wrappers.forEach(wrapper => {
            wrapper.classList.remove('active');
            const trigger = wrapper.querySelector('.nav-dropdown-trigger');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
    });
}

/* =====================================================
   7. CURRENT PAGE / ACTIVE NAVIGATION
   ===================================================== */

function getCurrentPageKey() {
    let path = window.location.pathname || '/';
    path = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
    if (!path || path === '/') return 'index';

    let filename = path.split('/').pop() || 'index';
    filename = filename.replace(/\.html$/i, '');
    return filename.toLowerCase();
}

function initActiveNavLink() {
    const currentPage = getCurrentPageKey();

    document.querySelectorAll('[data-page]').forEach(link => {
        link.classList.remove('active');
    });

    document.querySelectorAll('[data-page]').forEach(link => {
        const page = (link.dataset.page || '').toLowerCase();
        if (page === currentPage) link.classList.add('active');
    });

    const worksPages = ['music', 'movie', 'book'];
    const faithPages = ['bible', 'worship'];
    const squadPages = ['sistersquad', 'sistersquad2', 'sister-squad', 'game', 'gameinfo'];

    if (worksPages.includes(currentPage)) {
        document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper => {
            if (wrapper.querySelector('a[href*="/music"], a[href*="/movie"], a[href*="/book"]')) {
                wrapper.classList.add('active');
            }
        });
        const button = document.querySelector('[data-mobile-menu="works"]');
        if (button) button.classList.add('active');
    }

    if (faithPages.includes(currentPage)) {
        document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper => {
            if (wrapper.querySelector('a[href*="/bible"], a[href*="/worship"]')) {
                wrapper.classList.add('active');
            }
        });
        const button = document.querySelector('[data-mobile-menu="faith"]');
        if (button) button.classList.add('active');
    }

    if (squadPages.includes(currentPage)) {
        document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper => {
            if (wrapper.querySelector('a[href*="sistersquad"], a[href*="sister-squad"], a[href*="gameinfo"], a[data-page="game"]')) {
                wrapper.classList.add('active');
            }
        });

        document.querySelectorAll('[data-page]').forEach(link => {
            const page = (link.dataset.page || '').toLowerCase();
            if (page === currentPage || (page === 'game' && currentPage === 'gameinfo')) {
                link.classList.add('active');
            }
        });

        const squad = document.querySelector('[data-mobile-menu="squad"]');
        if (squad) squad.classList.add('active');
    }

    const morePages = ['play', 'gameinfo', 'game', 'journal', 'about', 'privacy', 'terms'];
    if (morePages.includes(currentPage)) {
        const more = document.getElementById('mobileMoreBtn');
        if (more) more.classList.add('active');
    }
}

/* =====================================================
   8. LANGUAGE DROPDOWN
   ===================================================== */

function initLangDropdown() {
    const wrapper = document.getElementById('langWrapper');
    const toggleBtn = document.getElementById('langToggleBtn');
    if (!wrapper || !toggleBtn) return;

    toggleBtn.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const isOpen = wrapper.classList.toggle('active');
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', event => {
        if (wrapper.contains(event.target)) return;
        wrapper.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
    });

    wrapper.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
}

/* =====================================================
   9. LANGUAGE SETTER
   ===================================================== */

function setLanguage(lang) {
    currentLang = i18n[lang] ? lang : 'ko';
    lang = currentLang;

    document.documentElement.lang = lang;

    try {
        localStorage.setItem('pref-lang', lang);
    } catch (_) {}

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (i18n[lang][key] !== undefined) el.innerHTML = i18n[lang][key];
    });

    const dict = i18n[lang];

    if (dict.meta_title) document.title = dict.meta_title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.meta_description) metaDesc.setAttribute('content', dict.meta_description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && dict.og_title) ogTitle.setAttribute('content', dict.og_title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && dict.og_description) ogDesc.setAttribute('content', dict.og_description);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle && dict.twitter_title) twTitle.setAttribute('content', dict.twitter_title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && dict.twitter_description) twDesc.setAttribute('content', dict.twitter_description);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const display = document.getElementById('currentLangText');
    if (display) display.textContent = lang === 'ko' ? 'KOR' : 'ENG';

    const wrapper = document.getElementById('langWrapper');
    const toggleBtn = document.getElementById('langToggleBtn');
    if (wrapper) wrapper.classList.remove('active');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');

    if (typeof window.onLangChange === 'function') window.onLangChange(lang);
}

window.setLanguage = setLanguage;
window.getCurrentLang = () => currentLang;

/* =====================================================
   10. SHARE MODAL
   ===================================================== */

function initShareModal() {
    const overlay = document.getElementById('shareOverlay');
    if (!overlay) return;

    const openBtn = document.getElementById('shareOpenBtn');
    const copyBtn = document.getElementById('shareCopyBtn');
    const snsBtn = document.getElementById('shareSNSBtn');
    const closeBtn = document.getElementById('shareCloseBtn');

    function openModal() {
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => overlay.classList.add('active'));
    }

    function closeModal() {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            if (!overlay.classList.contains('active')) overlay.style.display = 'none';
        }, 300);
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', event => {
        if (event.target === overlay) closeModal();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const url = window.location.href;
            let ok = false;

            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(url);
                    ok = true;
                } catch (_) {}
            }

            if (!ok) {
                const ta = document.createElement('textarea');
                ta.value = url;
                ta.id = 'temp-copy-area';
                ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
                document.body.appendChild(ta);
                ta.focus();
                ta.select();
                try { ok = document.execCommand('copy'); } catch (_) {}
                ta.remove();
            }

            if (ok) showToast(i18n[currentLang].toast_copy);
            closeModal();
        });
    }

    if (snsBtn) {
        snsBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: document.title || 'Chris LEE.PAPA',
                        text: 'Chris LEE.PAPA',
                        url: window.location.href
                    });
                } catch (_) {}
            } else {
                showToast(i18n[currentLang].toast_error);
            }
        });
    }
}

/* =====================================================
   11. TOAST
   ===================================================== */

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = msg;
    toast.style.display = 'block';
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
}

window.showToast = showToast;

/* =====================================================
   12. BIBLE LOGOUT
   ===================================================== */

function initBibleLogout() {
    const isBiblePage = /(?:^|\/)bible(?:\.html)?\/?$/i.test(window.location.pathname || '');
    if (!isBiblePage) return;

    // bible.html은 자체 인증을 사용하므로, 인증 키가 없는 상태에서는 버튼을 만들지 않습니다.
    let userId = null;
    try {
        userId = localStorage.getItem('bible_user_id');
    } catch (_) {}

    if (!userId) return;

    // Bible 페이지의 상태 표시 영역을 기준으로 안전하게 버튼을 추가합니다.
    const status = document.querySelector('.cloud-status');
    if (!status || document.getElementById('bibleLogoutBtn')) return;

    const button = document.createElement('button');
    button.id = 'bibleLogoutBtn';
    button.type = 'button';
    button.textContent = 'LOGOUT';
    button.setAttribute('aria-label', 'Bible 로그아웃');
    button.style.cssText = [
        'margin-left:12px',
        'padding:5px 11px',
        'border:1px solid rgba(201,168,76,0.45)',
        'border-radius:14px',
        'background:rgba(255,255,255,0.04)',
        'color:#c9a84c',
        'font-size:0.72rem',
        'font-family:Pretendard,sans-serif',
        'letter-spacing:0.08em',
        'cursor:pointer',
        'transition:all .2s ease'
    ].join(';');

    button.addEventListener('mouseenter', () => {
        button.style.background = 'rgba(201,168,76,0.12)';
        button.style.color = '#e8d08a';
    });

    button.addEventListener('mouseleave', () => {
        button.style.background = 'rgba(255,255,255,0.04)';
        button.style.color = '#c9a84c';
    });

    button.addEventListener('click', () => {
        const confirmed = window.confirm('성경 계정에서 로그아웃하시겠습니까?');
        if (!confirmed) return;

        try {
            localStorage.removeItem('bible_user_id');
            localStorage.removeItem('bible_pin_hash');
        } catch (_) {}

        // bible.html의 checkAuth()가 다시 로그인 화면을 표시하도록 새로고침합니다.
        window.location.reload();
    });

    status.appendChild(button);
}

window.bibleLogout = function () {
    try {
        localStorage.removeItem('bible_user_id');
        localStorage.removeItem('bible_pin_hash');
    } catch (_) {}
    window.location.reload();
};

/* =====================================================
   13. SECURITY
   ===================================================== */

function initSecurity() {
    document.addEventListener('contextmenu', event => event.preventDefault());

    document.addEventListener('copy', event => {
        const target = event.target;
        const isCopyArea = target && target.id === 'temp-copy-area';
        if (!isCopyArea && window.getSelection && window.getSelection().toString().length > 0) {
            event.preventDefault();
        }
    });

    document.addEventListener('keydown', event => {
        const key = String(event.key || '').toUpperCase();
        const target = event.target;
        const isCopyArea = target && target.id === 'temp-copy-area';

        if (
            key === 'F12' ||
            (event.ctrlKey && event.shiftKey && (key === 'I' || key === 'J')) ||
            (event.ctrlKey && key === 'U')
        ) {
            event.preventDefault();
            return;
        }

        if (
            event.ctrlKey &&
            (key === 'C' || key === 'S' || key === 'P') &&
            !isCopyArea &&
            window.getSelection &&
            window.getSelection().toString().length > 0
        ) {
            event.preventDefault();
        }
    });
}

/* =====================================================
   14. MOUSE ORB
   ===================================================== */

function initMouseOrb() {
    const orb = document.getElementById('mouse-orb');
    if (!orb) return;

    if (window.matchMedia && window.matchMedia('(max-width: 900px)').matches) return;

    document.addEventListener('mousemove', event => {
        orb.style.left = event.clientX + 'px';
        orb.style.top = event.clientY + 'px';
    }, { passive: true });
}

/* =====================================================
   15. SERVICE WORKER
   ===================================================== */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swUrl = getSiteFileUrl('sw.js');
        navigator.serviceWorker.register(swUrl)
            .then(() => console.log('[main.js] ServiceWorker registered'))
            .catch(err => console.warn('[main.js] ServiceWorker failed', err));
    });
}

/* =====================================================
   16. ENTRY POINT
   ===================================================== */

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
