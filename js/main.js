/**
 * js/main.js — Chris LEE.PAPA 공식 사이트 공통 스크립트
 * =======================================================
 * 모든 페이지에서 중복되던 로직을 하나로 통합합니다.
 *
 * [사용법] 각 페이지 </body> 직전에 아래 두 줄 추가:
 *
 *   <div id="site-nav"></div>    ← <body> 최상단 (nav 주입 위치)
 *   <div id="site-footer"></div> ← </body> 직전 (footer 주입 위치)
 *   <script src="js/main.js"></script>
 *
 * [페이지별 i18n 확장] main.js 로드 전에 window.PAGE_I18N 정의:
 *
 *   <script>
 *     window.PAGE_I18N = {
 *       ko: { share_desc: "이 페이지만의 공유 문구" },
 *       en: { share_desc: "Page-specific share text" }
 *     };
 *   </script>
 *
 * [현재 페이지 active 링크] 파일명으로 자동 감지합니다. (별도 설정 불필요)
 */

'use strict';

/* ─────────────────────────────────────────────
   1. 공통 i18n 사전 (nav / share modal / footer)
   페이지별 문자열은 window.PAGE_I18N 으로 병합됩니다.
───────────────────────────────────────────── */
const BASE_I18N = {
    ko: {
        nav_home:    'Home',
        nav_bible:   'Bible',
        nav_worship: 'Worship',
        nav_music:   'Music',
        nav_book:    'Books',
        nav_movie:   'Movies',

        share_title: 'SHARE ARCHIVE',
        share_desc:  '이곳의 기록과 영감을 소중한 사람들에게 전하세요.',
        share_copy:  'COPY LINK',
        share_sns:   'SNS SHARE',
        share_close: 'Close',

        footer_text: '© 2026 Chris LEE.PAPA — The Creative Archive',

        toast_copy:  '링크가 복사되었습니다 ✓',
        toast_error: '지원하지 않는 브라우저입니다.',
    },
    en: {
        nav_home:    'Home',
        nav_bible:   'Bible',
        nav_worship: 'Worship',
        nav_music:   'Music',
        nav_book:    'Books',
        nav_movie:   'Movies',

        share_title: 'SHARE ARCHIVE',
        share_desc:  'Share the records and inspiration here with your loved ones.',
        share_copy:  'COPY LINK',
        share_sns:   'SNS SHARE',
        share_close: 'Close',

        footer_text: '© 2026 Chris LEE.PAPA — The Creative Archive',

        toast_copy:  'Link copied ✓',
        toast_error: 'Sharing is not supported in this browser.',
    },
};

/* 런타임에 병합된 최종 사전 */
let i18n = { ko: { ...BASE_I18N.ko }, en: { ...BASE_I18N.en } };
let currentLang = 'ko';

/* ─────────────────────────────────────────────
   2. 컴포넌트 로더 (header / footer fetch)
───────────────────────────────────────────── */

/**
 * HTML 파일을 fetch 하여 대상 요소의 innerHTML 에 주입합니다.
 * 실패해도 조용히 처리합니다 (오프라인 / 로컬 환경 대비).
 */
async function loadComponent(targetId, url) {
    const target = document.getElementById(targetId);
    if (!target) return;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        target.innerHTML = await res.text();
    } catch (err) {
        console.warn(`[main.js] 컴포넌트 로드 실패: ${url}`, err);
    }
}

/**
 * header + footer 를 병렬로 로드한 뒤 전체 초기화를 실행합니다.
 */
async function loadComponents() {
    /* PAGE_I18N 이 있으면 BASE_I18N 에 병합 */
    if (window.PAGE_I18N) {
        i18n.ko = { ...BASE_I18N.ko, ...window.PAGE_I18N.ko };
        i18n.en = { ...BASE_I18N.en, ...window.PAGE_I18N.en };
    }

    await Promise.all([
        loadComponent('site-nav',    'components/header.html'),
        loadComponent('site-footer', 'components/footer.html'),
    ]);

    /* 컴포넌트가 DOM 에 삽입된 뒤 모든 기능 초기화 */
    initScrollProgress();
    initNavScroll();
    initMobileMenu();
    initActiveNavLink();
    initLangDropdown();
    initShareModal();
    initSecurity();
    initMouseOrb();

    /* 저장된 언어 적용 (DOMContentLoaded 이미 지났을 수 있으므로 직접 호출) */
    let savedLang = 'ko';
    try { savedLang = localStorage.getItem('pref-lang') || 'ko'; } catch (_) {}
    setLanguage(savedLang);

    /* 페이지별 초기화 콜백이 있으면 실행 */
    if (typeof window.onMainReady === 'function') {
        window.onMainReady();
    }
}

/* ─────────────────────────────────────────────
   3. 스크롤 진행 바
───────────────────────────────────────────── */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrolled  = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        bar.style.width = (scrolled / (maxScroll || 1) * 100) + '%';
    }, { passive: true });
}

/* ─────────────────────────────────────────────
   4. 내비게이션 스크롤 효과
───────────────────────────────────────────── */
function initNavScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
}

/* ─────────────────────────────────────────────
   5. 모바일 햄버거 메뉴
───────────────────────────────────────────── */
function initMobileMenu() {
    const toggle   = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.toggle('active');
        navLinks.classList.toggle('active', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    /* 링크 클릭 시 메뉴 닫기 */
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ─────────────────────────────────────────────
   6. 현재 페이지 active 링크 자동 감지
───────────────────────────────────────────── */
function initActiveNavLink() {
    /* 파일명 추출: "/bible.html" → "bible", "/" → "index" */
    const path     = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '') || 'index';

    document.querySelectorAll('#navLinks a[data-page]').forEach(link => {
        link.classList.toggle('active', link.dataset.page === filename);
    });
}

/* ─────────────────────────────────────────────
   7. 언어 드롭다운 & 다국어 처리
───────────────────────────────────────────── */
function initLangDropdown() {
    const wrapper  = document.getElementById('langWrapper');
    const toggleBtn = document.getElementById('langToggleBtn');
    if (!wrapper || !toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isOpen = wrapper.classList.toggle('active');
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    /* 드롭다운 외부 클릭 시 닫기 */
    document.addEventListener('click', e => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });

    /* 언어 버튼 클릭 */
    wrapper.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
}

/**
 * 언어를 변경하고 data-i18n 속성을 가진 모든 요소를 업데이트합니다.
 * @param {string} lang - 'ko' | 'en'
 */
function setLanguage(lang) {
    currentLang = i18n[lang] ? lang : 'ko';
    lang = currentLang;

    document.documentElement.lang = lang;
    try { localStorage.setItem('pref-lang', lang); } catch (_) {}

    /* data-i18n 요소 일괄 업데이트 */
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (i18n[lang][key] !== undefined) el.innerHTML = i18n[lang][key];
    });

    /* 언어 버튼 active 상태 */
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    /* 현재 언어 표시 텍스트 */
    const display = document.getElementById('currentLangText');
    if (display) display.textContent = lang === 'ko' ? 'KOR' : 'ENG';

    /* 드롭다운 닫기 */
    const wrapper  = document.getElementById('langWrapper');
    const toggleBtn = document.getElementById('langToggleBtn');
    if (wrapper)   wrapper.classList.remove('active');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');

    /* 페이지별 언어 콜백 */
    if (typeof window.onLangChange === 'function') {
        window.onLangChange(lang);
    }
}

/* 외부에서 호출 가능하도록 전역 노출 */
window.setLanguage = setLanguage;
window.getCurrentLang = () => currentLang;

/* ─────────────────────────────────────────────
   8. 공유 모달
───────────────────────────────────────────── */
function initShareModal() {
    const overlay   = document.getElementById('shareOverlay');
    const openBtn   = document.getElementById('shareOpenBtn');
    const copyBtn   = document.getElementById('shareCopyBtn');
    const snsBtn    = document.getElementById('shareSNSBtn');
    const closeBtn  = document.getElementById('shareCloseBtn');
    if (!overlay) return;

    function openModal() {
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');
        setTimeout(() => overlay.classList.add('active'), 10);
    }

    function closeModal() {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        setTimeout(() => overlay.style.display = 'none', 300);
    }

    if (openBtn)  openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    /* 오버레이 배경 클릭 시 닫기 */
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
    });

    /* ESC 키로 닫기 */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const url = window.location.href;
            let ok = false;
            if (navigator.clipboard && window.isSecureContext) {
                try { await navigator.clipboard.writeText(url); ok = true; } catch (_) {}
            }
            if (!ok) {
                const ta = document.createElement('textarea');
                ta.value = url;
                ta.id = 'temp-copy-area';
                ta.style.cssText = 'position:fixed;left:-9999px';
                document.body.appendChild(ta);
                ta.focus(); ta.select();
                try { ok = document.execCommand('copy'); } catch (_) {}
                document.body.removeChild(ta);
            }
            if (ok) showToast(i18n[currentLang].toast_copy);
            closeModal();
        });
    }

    if (snsBtn) {
        snsBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({ title: 'Chris LEE.PAPA', url: window.location.href });
            } else {
                showToast(i18n[currentLang].toast_error);
            }
        });
    }
}

/**
 * 토스트 메시지를 표시합니다.
 * @param {string} msg
 */
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

window.showToast = showToast;

/* ─────────────────────────────────────────────
   9. 보안 스크립트 (우클릭 / 복사 / 단축키 방지)
───────────────────────────────────────────── */
function initSecurity() {
    document.addEventListener('contextmenu', e => e.preventDefault());

    document.addEventListener('copy', e => {
        if (e.target.id !== 'temp-copy-area' && window.getSelection().toString().length > 0) {
            e.preventDefault();
        }
    });

    document.addEventListener('keydown', e => {
        /* F12, Ctrl+Shift+I/J, Ctrl+U */
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(e.key)) ||
            (e.ctrlKey && e.key === 'U')
        ) {
            e.preventDefault();
        }
        /* Ctrl+C/S/P (선택 텍스트 있을 때만) */
        if (e.ctrlKey && ['c', 's', 'p'].includes(e.key)) {
            if (e.target.id !== 'temp-copy-area' && window.getSelection().toString().length > 0) {
                e.preventDefault();
            }
        }
    });
}

/* ─────────────────────────────────────────────
   10. 마우스 오브 (데스크톱 황금빛 글로우)
───────────────────────────────────────────── */
function initMouseOrb() {
    const orb = document.getElementById('mouse-orb');
    if (!orb) return;
    document.addEventListener('mousemove', e => {
        orb.style.left = e.clientX + 'px';
        orb.style.top  = e.clientY + 'px';
    }, { passive: true });
}

/* ─────────────────────────────────────────────
   11. Service Worker 등록
───────────────────────────────────────────── */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('[main.js] ServiceWorker registered'))
            .catch(err => console.warn('[main.js] ServiceWorker failed', err));
    });
}

/* ─────────────────────────────────────────────
   12. 진입점 — DOM 준비 후 컴포넌트 로드 시작
───────────────────────────────────────────── */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    /* 이미 로드 완료된 경우 (script defer 등) */
    loadComponents();
}
