/**
 * js/main.js — Chris LEE.PAPA 공식 사이트 공통 스크립트
 * =======================================================
 * Desktop Navigation
 * Mobile Bottom Navigation
 * Language / Share / Scroll / Footer / Security
 * Sister Squad Navigation
 * =======================================================
 */

'use strict';


/* =====================================================
   1. 공통 i18n
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

        footer_text:
            '© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',

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
        share_desc:
            'Share the records and inspiration here with your loved ones.',

        share_copy: 'COPY LINK',
        share_sns: 'SNS SHARE',
        share_close: 'Close',

        footer_text:
            '© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',

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

async function loadComponent(targetId, url) {

    const target = document.getElementById(targetId);

    if (!target) return;

    try {

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        target.innerHTML = await res.text();

    } catch (err) {

        console.warn(
            `[main.js] 컴포넌트 로드 실패: ${url}`,
            err
        );

    }

}


async function loadComponents() {

    /* PAGE_I18N */

    if (window.PAGE_I18N) {

        i18n.ko = {
            ...BASE_I18N.ko,
            ...(window.PAGE_I18N.ko || {})
        };

        i18n.en = {
            ...BASE_I18N.en,
            ...(window.PAGE_I18N.en || {})
        };

    }


    /* Header / Footer */

    await Promise.all([

        loadComponent(
            'site-nav',
            '/components/header.html'
        ),

        loadComponent(
            'site-footer',
            '/components/footer.html'
        )

    ]);


    /* 공통 기능 */

    initScrollProgress();
    initNavScroll();
    initMobileMenu();
    initDesktopDropdowns();
    initActiveNavLink();
    initLangDropdown();
    initShareModal();
    initSecurity();
    initMouseOrb();


    /* 저장된 언어 */

    let savedLang = 'ko';

    try {

        savedLang =
            localStorage.getItem('pref-lang') || 'ko';

    } catch (_) {}


    setLanguage(savedLang);


    /* 페이지별 초기화 */

    if (
        typeof window.onMainReady ===
        'function'
    ) {

        window.onMainReady();

    }

}


/* =====================================================
   3. SCROLL PROGRESS
   ===================================================== */

function initScrollProgress() {

    const bar =
        document.getElementById(
            'scroll-progress'
        );

    if (!bar) return;


    function updateProgress() {

        const scrolled =
            window.scrollY ||
            window.pageYOffset ||
            0;

        const maxScroll =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            maxScroll > 0
                ? (scrolled / maxScroll) * 100
                : 0;

        bar.style.width =
            Math.min(
                100,
                Math.max(0, percentage)
            ) + '%';

    }


    window.addEventListener(
        'scroll',
        updateProgress,
        { passive: true }
    );

    updateProgress();

}


/* =====================================================
   4. NAVIGATION SCROLL
   ===================================================== */

function initNavScroll() {

    const nav =
        document.getElementById(
            'main-nav'
        );

    if (!nav) return;


    function updateNav() {

        nav.classList.toggle(
            'scrolled',
            window.scrollY > 40
        );

    }


    window.addEventListener(
        'scroll',
        updateNav,
        { passive: true }
    );

    updateNav();

}


/* =====================================================
   5. MOBILE NAVIGATION
   ===================================================== */

function initMobileMenu() {

    const moreBtn =
        document.getElementById(
            'mobileMoreBtn'
        );

    const moreOverlay =
        document.getElementById(
            'mobileMoreOverlay'
        );

    const moreClose =
        document.getElementById(
            'mobileMoreClose'
        );


    const worksBtn =
        document.querySelector(
            '[data-mobile-menu="works"]'
        );

    const worksOverlay =
        document.getElementById(
            'mobileWorksMenu'
        );


    const faithBtn =
        document.querySelector(
            '[data-mobile-menu="faith"]'
        );

    const faithOverlay =
        document.getElementById(
            'mobileFaithMenu'
        );


    /* SQUAD */

    const squadBtn =
        document.querySelector(
            '[data-mobile-menu="squad"]'
        );

    const squadOverlay =
        document.getElementById(
            'mobileSquadMenu'
        );

    const squadClose =
        document.getElementById(
            'mobileSquadClose'
        );


    /* ---------------------------------------------
       패널 닫기
       --------------------------------------------- */

    function closeAllPanels() {

        const panels = [
            moreOverlay,
            worksOverlay,
            faithOverlay,
            squadOverlay
        ];

        panels.forEach(panel => {

            if (!panel) return;

            panel.classList.remove('active');

            panel.setAttribute(
                'aria-hidden',
                'true'
            );

        });


        const buttons = [
            moreBtn,
            worksBtn,
            faithBtn,
            squadBtn
        ];

        buttons.forEach(button => {

            if (!button) return;

            button.setAttribute(
                'aria-expanded',
                'false'
            );

        });


        document.body.classList.remove(
            'mobile-panel-open'
        );

    }


    /* ---------------------------------------------
       패널 열기
       --------------------------------------------- */

    function openPanel(panel, button) {

        if (!panel) return;

        closeAllPanels();

        panel.classList.add('active');

        panel.setAttribute(
            'aria-hidden',
            'false'
        );

        if (button) {

            button.setAttribute(
                'aria-expanded',
                'true'
            );

        }

        document.body.classList.add(
            'mobile-panel-open'
        );

    }


    /* ---------------------------------------------
       MORE
       --------------------------------------------- */

    if (moreBtn && moreOverlay) {

        moreBtn.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    moreOverlay.classList.contains(
                        'active'
                    );

                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        moreOverlay,
                        moreBtn
                    );

                }

            }
        );

    }


    /* ---------------------------------------------
       WORKS
       --------------------------------------------- */

    if (worksBtn && worksOverlay) {

        worksBtn.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    worksOverlay.classList.contains(
                        'active'
                    );

                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        worksOverlay,
                        worksBtn
                    );

                }

            }
        );

    }


    /* ---------------------------------------------
       FAITH
       --------------------------------------------- */

    if (faithBtn && faithOverlay) {

        faithBtn.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    faithOverlay.classList.contains(
                        'active'
                    );

                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        faithOverlay,
                        faithBtn
                    );

                }

            }
        );

    }


    /* ---------------------------------------------
       SQUAD
       --------------------------------------------- */

    if (squadBtn && squadOverlay) {

        squadBtn.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    squadOverlay.classList.contains(
                        'active'
                    );

                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        squadOverlay,
                        squadBtn
                    );

                }

            }
        );

    }


    /* ---------------------------------------------
       MORE CLOSE
       --------------------------------------------- */

    if (moreClose) {

        moreClose.addEventListener(
            'click',
            event => {

                event.preventDefault();

                closeAllPanels();

            }
        );

    }


    /* ---------------------------------------------
       SQUAD CLOSE
       --------------------------------------------- */

    if (squadClose) {

        squadClose.addEventListener(
            'click',
            event => {

                event.preventDefault();

                closeAllPanels();

            }
        );

    }


    /* ---------------------------------------------
       Overlay 배경 클릭
       --------------------------------------------- */

    [
        moreOverlay,
        worksOverlay,
        faithOverlay,
        squadOverlay
    ].forEach(overlay => {

        if (!overlay) return;

        overlay.addEventListener(
            'click',
            event => {

                if (
                    event.target === overlay
                ) {

                    closeAllPanels();

                }

            }
        );

    });


    /* ---------------------------------------------
       패널 내부 링크
       --------------------------------------------- */

    [
        moreOverlay,
        worksOverlay,
        faithOverlay,
        squadOverlay
    ].forEach(panel => {

        if (!panel) return;

        panel
            .querySelectorAll('a')
            .forEach(link => {

                link.addEventListener(
                    'click',
                    () => {

                        closeAllPanels();

                    }
                );

            });

    });


    /* ---------------------------------------------
       ESC
       --------------------------------------------- */

    document.addEventListener(
        'keydown',
        event => {

            if (event.key !== 'Escape') {
                return;
            }

            const open =
                moreOverlay?.classList.contains('active') ||
                worksOverlay?.classList.contains('active') ||
                faithOverlay?.classList.contains('active') ||
                squadOverlay?.classList.contains('active');

            if (open) {
                closeAllPanels();
            }

        }
    );


    /* ---------------------------------------------
       PC 화면으로 변경
       --------------------------------------------- */

    window.addEventListener(
        'resize',
        () => {

            if (window.innerWidth > 900) {
                closeAllPanels();
            }

        }
    );

}


/* =====================================================
   6. DESKTOP DROPDOWN
   ===================================================== */

function initDesktopDropdowns() {

    const wrappers =
        document.querySelectorAll(
            '.nav-dropdown-wrapper'
        );

    if (!wrappers.length) return;


    wrappers.forEach(wrapper => {

        const trigger =
            wrapper.querySelector(
                '.nav-dropdown-trigger'
            );

        if (!trigger) return;


        trigger.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    wrapper.classList.contains(
                        'active'
                    );


                wrappers.forEach(other => {

                    if (other === wrapper) {
                        return;
                    }

                    other.classList.remove(
                        'active'
                    );

                    const otherTrigger =
                        other.querySelector(
                            '.nav-dropdown-trigger'
                        );

                    if (otherTrigger) {

                        otherTrigger.setAttribute(
                            'aria-expanded',
                            'false'
                        );

                    }

                });


                wrapper.classList.toggle(
                    'active',
                    !isOpen
                );


                trigger.setAttribute(
                    'aria-expanded',
                    String(!isOpen)
                );

            }
        );

    });


    /* 외부 클릭 */

    document.addEventListener(
        'click',
        event => {

            if (
                event.target.closest(
                    '.nav-dropdown-wrapper'
                )
            ) {
                return;
            }

            wrappers.forEach(wrapper => {

                wrapper.classList.remove(
                    'active'
                );

                const trigger =
                    wrapper.querySelector(
                        '.nav-dropdown-trigger'
                    );

                if (trigger) {

                    trigger.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                }

            });

        }
    );


    /* ESC */

    document.addEventListener(
        'keydown',
        event => {

            if (event.key !== 'Escape') {
                return;
            }

            wrappers.forEach(wrapper => {

                wrapper.classList.remove(
                    'active'
                );

                const trigger =
                    wrapper.querySelector(
                        '.nav-dropdown-trigger'
                    );

                if (trigger) {

                    trigger.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                }

            });

        }
    );

}


/* =====================================================
   7. CURRENT PAGE
   ===================================================== */

function getCurrentPageKey() {

    let path =
        window.location.pathname || '/';


    path =
        path
            .split('?')[0]
            .split('#')[0];


    path =
        path.replace(
            /\/+$/,
            ''
        );


    if (
        path === '' ||
        path === '/'
    ) {

        return 'index';

    }


    let filename =
        path.split('/').pop() || 'index';


    filename =
        filename.replace(
            /\.html$/i,
            ''
        );


    return filename.toLowerCase();

}


function initActiveNavLink() {

    const currentPage =
        getCurrentPageKey();


    /* ---------------------------------------------
       초기화
       --------------------------------------------- */

    document
        .querySelectorAll('[data-page]')
        .forEach(link => {

            link.classList.remove(
                'active'
            );

        });


    /* ---------------------------------------------
       직접 페이지
       --------------------------------------------- */

    document
        .querySelectorAll('[data-page]')
        .forEach(link => {

            const page =
                String(
                    link.dataset.page || ''
                ).toLowerCase();

            if (page === currentPage) {

                link.classList.add(
                    'active'
                );

            }

        });


    /* ---------------------------------------------
       WORKS
       --------------------------------------------- */

    const worksPages = [
        'music',
        'movie',
        'book'
    ];


    if (
        worksPages.includes(
            currentPage
        )
    ) {

        document
            .querySelectorAll(
                '[data-dropdown="works"]'
            )
            .forEach(el => {

                el.classList.add(
                    'active'
                );

            });

    }


    /* 기존 구조 대응 */

    if (
        worksPages.includes(
            currentPage
        )
    ) {

        document
            .querySelectorAll(
                '.nav-dropdown-wrapper'
            )
            .forEach(wrapper => {

                if (
                    wrapper.querySelector(
                        'a[href="/music"]'
                    )
                ) {

                    wrapper.classList.add(
                        'active'
                    );

                }

            });

    }


    /* ---------------------------------------------
       FAITH
       --------------------------------------------- */

    const faithPages = [
        'bible',
        'worship'
    ];


    if (
        faithPages.includes(
            currentPage
        )
    ) {

        document
            .querySelectorAll(
                '[data-dropdown="faith"]'
            )
            .forEach(el => {

                el.classList.add(
                    'active'
                );

            });

    }


    if (
        faithPages.includes(
            currentPage
        )
    ) {

        document
            .querySelectorAll(
                '.nav-dropdown-wrapper'
            )
            .forEach(wrapper => {

                if (
                    wrapper.querySelector(
                        'a[href="/bible"]'
                    )
                ) {

                    wrapper.classList.add(
                        'active'
                    );

                }

            });

    }


    /* ---------------------------------------------
       SISTER SQUAD
       --------------------------------------------- */

    const squadPages = [
        'sistersquad',
        'sistersquad2',
        'sister-squad',
        'gameinfo',
        'game'
    ];


    if (
        squadPages.includes(
            currentPage
        )
    ) {

        document
            .querySelectorAll(
                '[data-page="sistersquad"]'
            )
            .forEach(link => {

                link.classList.add(
                    'active'
                );

            });


        document
            .querySelectorAll(
                '[data-mobile-menu="squad"]'
            )
            .forEach(button => {

                button.classList.add(
                    'active'
                );

            });

    }


    /* ---------------------------------------------
       SQUAD 개별 페이지
       --------------------------------------------- */

    if (
        currentPage === 'sistersquad'
    ) {

        document
            .querySelectorAll(
                '[data-page="sistersquad"]'
            )
            .forEach(link => {

                link.classList.add(
                    'active'
                );

            });

    }


    if (
        currentPage === 'sistersquad2'
    ) {

        document
            .querySelectorAll(
                '[data-page="sistersquad2"]'
            )
            .forEach(link => {

                link.classList.add(
                    'active'
                );

            });

    }


    if (
        currentPage === 'gameinfo' ||
        currentPage === 'game'
    ) {

        document
            .querySelectorAll(
                '[data-page="gameinfo"], [data-page="game"]'
            )
            .forEach(link => {

                link.classList.add(
                    'active'
                );

            });

    }


    /* ---------------------------------------------
       모바일 WORKS / FAITH
       --------------------------------------------- */

    if (
        worksPages.includes(
            currentPage
        )
    ) {

        const button =
            document.querySelector(
                '[data-mobile-menu="works"]'
            );

        if (button) {
            button.classList.add('active');
        }

    }


    if (
        faithPages.includes(
            currentPage
        )
    ) {

        const button =
            document.querySelector(
                '[data-mobile-menu="faith"]'
            );

        if (button) {
            button.classList.add('active');
        }

    }


    /* ---------------------------------------------
       MORE
       --------------------------------------------- */

    const morePages = [
        'play',
        'gameinfo',
        'game',
        'journal',
        'about',
        'privacy',
        'terms'
    ];


    if (
        morePages.includes(
            currentPage
        )
    ) {

        const button =
            document.getElementById(
                'mobileMoreBtn'
            );

        if (button) {
            button.classList.add('active');
        }

    }

}


/* =====================================================
   8. LANGUAGE DROPDOWN
   ===================================================== */

function initLangDropdown() {

    const wrapper =
        document.getElementById(
            'langWrapper'
        );

    const toggleBtn =
        document.getElementById(
            'langToggleBtn'
        );


    if (
        !wrapper ||
        !toggleBtn
    ) {

        return;

    }


    toggleBtn.addEventListener(
        'click',
        event => {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                wrapper.classList.toggle(
                    'active'
                );

            toggleBtn.setAttribute(
                'aria-expanded',
                String(isOpen)
            );

        }
    );


    document.addEventListener(
        'click',
        event => {

            if (
                wrapper.contains(
                    event.target
                )
            ) {

                return;

            }

            wrapper.classList.remove(
                'active'
            );

            toggleBtn.setAttribute(
                'aria-expanded',
                'false'
            );

        }
    );


    wrapper
        .querySelectorAll('.lang-btn')
        .forEach(btn => {

            btn.addEventListener(
                'click',
                event => {

                    event.preventDefault();

                    setLanguage(
                        btn.dataset.lang
                    );

                }
            );

        });

}


/* =====================================================
   9. LANGUAGE SETTER
   ===================================================== */

function setLanguage(lang) {

    currentLang =
        i18n[lang]
            ? lang
            : 'ko';


    lang = currentLang;


    document.documentElement.lang =
        lang;


    try {

        localStorage.setItem(
            'pref-lang',
            lang
        );

    } catch (_) {}


    /* ---------------------------------------------
       일반 텍스트
       --------------------------------------------- */

    document
        .querySelectorAll('[data-i18n]')
        .forEach(el => {

            const key =
                el.dataset.i18n;

            if (
                i18n[lang][key] !== undefined
            ) {

                el.innerHTML =
                    i18n[lang][key];

            }

        });


    /* ---------------------------------------------
       SEO META
       --------------------------------------------- */

    const dict =
        i18n[lang];


    if (dict.meta_title) {

        document.title =
            dict.meta_title;

    }


    if (dict.meta_description) {

        const meta =
            document.querySelector(
                'meta[name="description"]'
            );

        if (meta) {

            meta.setAttribute(
                'content',
                dict.meta_description
            );

        }

    }


    if (dict.og_title) {

        const meta =
            document.querySelector(
                'meta[property="og:title"]'
            );

        if (meta) {

            meta.setAttribute(
                'content',
                dict.og_title
            );

        }

    }


    if (dict.og_description) {

        const meta =
            document.querySelector(
                'meta[property="og:description"]'
            );

        if (meta) {

            meta.setAttribute(
                'content',
                dict.og_description
            );

        }

    }


    if (dict.twitter_title) {

        const meta =
            document.querySelector(
                'meta[name="twitter:title"]'
            );

        if (meta) {

            meta.setAttribute(
                'content',
                dict.twitter_title
            );

        }

    }


    if (dict.twitter_description) {

        const meta =
            document.querySelector(
                'meta[name="twitter:description"]'
            );

        if (meta) {

            meta.setAttribute(
                'content',
                dict.twitter_description
            );

        }

    }


    /* ---------------------------------------------
       언어 버튼
       --------------------------------------------- */

    document
        .querySelectorAll('.lang-btn')
        .forEach(btn => {

            btn.classList.toggle(
                'active',
                btn.dataset.lang === lang
            );

        });


    const display =
        document.getElementById(
            'currentLangText'
        );


    if (display) {

        display.textContent =
            lang === 'ko'
                ? 'KOR'
                : 'ENG';

    }


    /* ---------------------------------------------
       메뉴 닫기
       --------------------------------------------- */

    const wrapper =
        document.getElementById(
            'langWrapper'
        );

    const toggle =
        document.getElementById(
            'langToggleBtn'
        );


    if (wrapper) {

        wrapper.classList.remove(
            'active'
        );

    }


    if (toggle) {

        toggle.setAttribute(
            'aria-expanded',
            'false'
        );

    }


    /* 페이지 콜백 */

    if (
        typeof window.onLangChange ===
        'function'
    ) {

        window.onLangChange(lang);

    }

}


window.setLanguage =
    setLanguage;


window.getCurrentLang =
    () => currentLang;


/* =====================================================
   10. SHARE MODAL
   ===================================================== */

function initShareModal() {

    const overlay =
        document.getElementById(
            'shareOverlay'
        );

    if (!overlay) return;


    const openBtn =
        document.getElementById(
            'shareOpenBtn'
        );

    const copyBtn =
        document.getElementById(
            'shareCopyBtn'
        );

    const snsBtn =
        document.getElementById(
            'shareSNSBtn'
        );

    const closeBtn =
        document.getElementById(
            'shareCloseBtn'
        );


    function openModal() {

        overlay.style.display =
            'flex';

        overlay.setAttribute(
            'aria-hidden',
            'false'
        );

        requestAnimationFrame(() => {

            overlay.classList.add(
                'active'
            );

        });

    }


    function closeModal() {

        overlay.classList.remove(
            'active'
        );

        overlay.setAttribute(
            'aria-hidden',
            'true'
        );

        setTimeout(() => {

            if (
                !overlay.classList.contains(
                    'active'
                )
            ) {

                overlay.style.display =
                    'none';

            }

        }, 300);

    }


    if (openBtn) {

        openBtn.addEventListener(
            'click',
            openModal
        );

    }


    if (closeBtn) {

        closeBtn.addEventListener(
            'click',
            closeModal
        );

    }


    overlay.addEventListener(
        'click',
        event => {

            if (
                event.target === overlay
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Escape' &&
                overlay.classList.contains(
                    'active'
                )
            ) {

                closeModal();

            }

        }
    );


    /* ---------------------------------------------
       COPY
       --------------------------------------------- */

    if (copyBtn) {

        copyBtn.addEventListener(
            'click',
            async () => {

                const url =
                    window.location.href;

                let ok = false;


                if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    try {

                        await navigator.clipboard.writeText(
                            url
                        );

                        ok = true;

                    } catch (_) {}

                }


                if (!ok) {

                    const textarea =
                        document.createElement(
                            'textarea'
                        );

                    textarea.value =
                        url;

                    textarea.id =
                        'temp-copy-area';

                    textarea.style.cssText =
                        'position:fixed;left:-9999px;top:0;opacity:0;';

                    document.body.appendChild(
                        textarea
                    );

                    textarea.focus();
                    textarea.select();

                    try {

                        ok =
                            document.execCommand(
                                'copy'
                            );

                    } catch (_) {}

                    textarea.remove();

                }


                if (ok) {

                    showToast(
                        i18n[currentLang].toast_copy
                    );

                }


                closeModal();

            }
        );

    }


    /* ---------------------------------------------
       SNS SHARE
       --------------------------------------------- */

    if (snsBtn) {

        snsBtn.addEventListener(
            'click',
            async () => {

                if (
                    navigator.share
                ) {

                    try {

                        await navigator.share({

                            title:
                                document.title ||
                                'Chris LEE.PAPA',

                            text:
                                'Chris LEE.PAPA',

                            url:
                                window.location.href

                        });

                    } catch (_) {}

                } else {

                    showToast(
                        i18n[currentLang].toast_error
                    );

                }

            }
        );

    }

}


/* =====================================================
   11. TOAST
   ===================================================== */

function showToast(msg) {

    const toast =
        document.getElementById(
            'toast'
        );

    if (!toast) return;


    toast.textContent =
        msg;

    toast.style.display =
        'block';


    clearTimeout(
        showToast._timer
    );


    showToast._timer =
        setTimeout(() => {

            toast.style.display =
                'none';

        }, 2500);

}


window.showToast =
    showToast;


/* =====================================================
   12. SECURITY
   ===================================================== */

function initSecurity() {

    /* 우클릭 */

    document.addEventListener(
        'contextmenu',
        event => {

            event.preventDefault();

        }
    );


    /* Copy */

    document.addEventListener(
        'copy',
        event => {

            const target =
                event.target;

            const isCopyArea =
                target &&
                target.id ===
                'temp-copy-area';


            if (
                !isCopyArea &&
                window.getSelection &&
                window.getSelection()
                    .toString()
                    .length > 0
            ) {

                event.preventDefault();

            }

        }
    );


    /* Keyboard */

    document.addEventListener(
        'keydown',
        event => {

            const key =
                String(
                    event.key || ''
                ).toUpperCase();

            const target =
                event.target;

            const isCopyArea =
                target &&
                target.id ===
                'temp-copy-area';


            /* 개발자 도구 / 소스 */

            if (

                key === 'F12' ||

                (
                    event.ctrlKey &&
                    event.shiftKey &&
                    (
                        key === 'I' ||
                        key === 'J'
                    )
                ) ||

                (
                    event.ctrlKey &&
                    key === 'U'
                )

            ) {

                event.preventDefault();

                return;

            }


            /* 복사 / 저장 / 인쇄 */

            if (

                event.ctrlKey &&

                (
                    key === 'C' ||
                    key === 'S' ||
                    key === 'P'
                ) &&

                !isCopyArea &&

                window.getSelection &&
                window.getSelection()
                    .toString()
                    .length > 0

            ) {

                event.preventDefault();

            }

        }
    );

}


/* =====================================================
   13. MOUSE ORB
   ===================================================== */

function initMouseOrb() {

    const orb =
        document.getElementById(
            'mouse-orb'
        );

    if (!orb) return;


    if (
        window.matchMedia &&
        window.matchMedia(
            '(max-width: 900px)'
        ).matches
    ) {

        return;

    }


    document.addEventListener(
        'mousemove',
        event => {

            orb.style.left =
                event.clientX + 'px';

            orb.style.top =
                event.clientY + 'px';

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   14. SERVICE WORKER
   ===================================================== */

if (
    'serviceWorker' in navigator
) {

    window.addEventListener(
        'load',
        () => {

            navigator.serviceWorker
                .register('/sw.js')
                .then(() => {

                    console.log(
                        '[main.js] ServiceWorker registered'
                    );

                })
                .catch(err => {

                    console.warn(
                        '[main.js] ServiceWorker failed',
                        err
                    );

                });

        }
    );

}


/* =====================================================
   15. ENTRY POINT
   ===================================================== */

if (
    document.readyState ===
    'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        loadComponents
    );

} else {

    loadComponents();

                   }        nav_squad_short: 'SQUAD',

        nav_squad_1: 'SISTER SQUAD',
        nav_squad_2: 'SISTER SQUAD 2',
        nav_game:    'GAME',

        share_title: 'SHARE ARCHIVE',
        share_desc:  '이곳의 기록과 영감을 소중한 사람들에게 전하세요.',
        share_copy:  'COPY LINK',
        share_sns:   'SNS SHARE',
        share_close: 'Close',

        footer_text:
            '© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',

        footer_privacy:
            '개인정보처리방침',

        footer_terms:
            '이용약관',

        toast_copy:
            '링크가 복사되었습니다 ✓',

        toast_error:
            '지원하지 않는 브라우저입니다.'
    },


    en: {

        nav_home:    'Home',
        nav_works:   'Works',
        nav_faith:   'Faith',
        nav_squad:   'Sister Squad',
        nav_play:    'Play',
        nav_journal: 'Journal',
        nav_about:   'About',

        nav_music:   'Music',
        nav_movie:   'Movies',
        nav_book:    'Books',

        nav_bible:   'Bible',
        nav_worship: 'Worship',

        nav_squad_short: 'SQUAD',

        nav_squad_1: 'SISTER SQUAD',
        nav_squad_2: 'SISTER SQUAD 2',
        nav_game:    'GAME',

        share_title: 'SHARE ARCHIVE',

        share_desc:
            'Share the records and inspiration here with your loved ones.',

        share_copy:  'COPY LINK',
        share_sns:   'SNS SHARE',
        share_close: 'Close',

        footer_text:
            '© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',

        footer_privacy:
            'Privacy Policy',

        footer_terms:
            'Terms of Use',

        toast_copy:
            'Link copied ✓',

        toast_error:
            'Sharing is not supported in this browser.'
    }

};


/* 런타임에 병합되는 최종 사전 */

let i18n = {
    ko: { ...BASE_I18N.ko },
    en: { ...BASE_I18N.en }
};

let currentLang = 'ko';



/* =====================================================
   2. COMPONENT LOADER
   ===================================================== */

/**
 * HTML 파일을 fetch하여 대상 요소에 삽입
 */
async function loadComponent(targetId, url) {

    const target =
        document.getElementById(targetId);

    if (!target) return;


    try {

        const res =
            await fetch(url);

        if (!res.ok) {

            throw new Error(
                `HTTP ${res.status}`
            );

        }

        target.innerHTML =
            await res.text();

    } catch (err) {

        console.warn(
            `[main.js] 컴포넌트 로드 실패: ${url}`,
            err
        );

    }

}


/**
 * Header + Footer를 병렬로 로드한 뒤
 * 모든 기능을 초기화
 */
async function loadComponents() {

    /* ---------------------------------------------
       PAGE_I18N 병합
       --------------------------------------------- */

    if (window.PAGE_I18N) {

        i18n.ko = {
            ...BASE_I18N.ko,
            ...(window.PAGE_I18N.ko || {})
        };

        i18n.en = {
            ...BASE_I18N.en,
            ...(window.PAGE_I18N.en || {})
        };

    }


    /* ---------------------------------------------
       Header / Footer 로드
       --------------------------------------------- */

    await Promise.all([

        loadComponent(
            'site-nav',
            'components/header.html'
        ),

        loadComponent(
            'site-footer',
            'components/footer.html'
        )

    ]);


    /* ---------------------------------------------
       공통 기능 초기화
       --------------------------------------------- */

    initScrollProgress();

    initNavScroll();

    initMobileMenu();

    initDesktopDropdowns();

    initActiveNavLink();

    initLangDropdown();

    initShareModal();

    initSecurity();

    initMouseOrb();


    /* ---------------------------------------------
       저장된 언어 적용
       --------------------------------------------- */

    let savedLang = 'ko';

    try {

        savedLang =
            localStorage.getItem('pref-lang') || 'ko';

    } catch (_) {}


    setLanguage(savedLang);


    /* ---------------------------------------------
       페이지별 초기화 콜백
       --------------------------------------------- */

    if (
        typeof window.onMainReady ===
        'function'
    ) {

        window.onMainReady();

    }

}



/* =====================================================
   3. SCROLL PROGRESS
   ===================================================== */

function initScrollProgress() {

    const bar =
        document.getElementById(
            'scroll-progress'
        );

    if (!bar) return;


    function updateProgress() {

        const scrolled =
            window.scrollY ||
            window.pageYOffset ||
            0;


        const maxScroll =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            maxScroll > 0
                ? (scrolled / maxScroll) * 100
                : 0;


        bar.style.width =
            Math.min(
                100,
                Math.max(0, percentage)
            ) + '%';

    }


    window.addEventListener(
        'scroll',
        updateProgress,
        { passive: true }
    );


    updateProgress();

}



/* =====================================================
   4. NAVIGATION SCROLL EFFECT
   ===================================================== */

function initNavScroll() {

    const nav =
        document.getElementById(
            'main-nav'
        );

    if (!nav) return;


    function updateNav() {

        nav.classList.toggle(
            'scrolled',
            window.scrollY > 40
        );

    }


    window.addEventListener(
        'scroll',
        updateNav,
        { passive: true }
    );


    updateNav();

}



/* =====================================================
   5. MOBILE NAVIGATION
   ===================================================== */

/**
 * 모바일 하단 메뉴
 *
 * HOME
 * WORKS
 * FAITH
 * SQUAD
 * MORE
 */
function initMobileMenu() {

    /* ---------------------------------------------
       MORE
       --------------------------------------------- */

    const moreBtn =
        document.getElementById(
            'mobileMoreBtn'
        );

    const moreOverlay =
        document.getElementById(
            'mobileMoreOverlay'
        );

    const moreClose =
        document.getElementById(
            'mobileMoreClose'
        );


    /* ---------------------------------------------
       WORKS
       --------------------------------------------- */

    const worksBtn =
        document.querySelector(
            '[data-mobile-menu="works"]'
        );

    const worksOverlay =
        document.getElementById(
            'mobileWorksMenu'
        );


    /* ---------------------------------------------
       FAITH
       --------------------------------------------- */

    const faithBtn =
        document.querySelector(
            '[data-mobile-menu="faith"]'
        );

    const faithOverlay =
        document.getElementById(
            'mobileFaithMenu'
        );


    /* ---------------------------------------------
       SQUAD
       --------------------------------------------- */

    const squadBtn =
        document.querySelector(
            '[data-mobile-menu="squad"]'
        );

    const squadOverlay =
        document.getElementById(
            'mobileSquadMenu'
        );

    const squadClose =
        document.getElementById(
            'mobileSquadClose'
        );


    /* ---------------------------------------------
       공통 패널 닫기
       --------------------------------------------- */

    function closeAllPanels() {

        const panels = [

            moreOverlay,
            worksOverlay,
            faithOverlay,
            squadOverlay

        ];


        panels.forEach(panel => {

            if (!panel) return;


            panel.classList.remove(
                'active'
            );


            panel.setAttribute(
                'aria-hidden',
                'true'
            );

        });


        const buttons = [

            moreBtn,
            worksBtn,
            faithBtn,
            squadBtn

        ];


        buttons.forEach(button => {

            if (!button) return;


            button.setAttribute(
                'aria-expanded',
                'false'
            );

        });


        document.body.classList.remove(
            'mobile-panel-open'
        );

    }


    /* ---------------------------------------------
       패널 열기
       --------------------------------------------- */

    function openPanel(
        panel,
        button
    ) {

        if (!panel) return;


        closeAllPanels();


        panel.classList.add(
            'active'
        );


        panel.setAttribute(
            'aria-hidden',
            'false'
        );


        if (button) {

            button.setAttribute(
                'aria-expanded',
                'true'
            );

        }


        document.body.classList.add(
            'mobile-panel-open'
        );

    }


    /* ---------------------------------------------
       MORE
       --------------------------------------------- */

    if (
        moreBtn &&
        moreOverlay
    ) {

        moreBtn.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();


                const isOpen =
                    moreOverlay.classList.contains(
                        'active'
                    );


                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        moreOverlay,
                        moreBtn
                    );

                }

            }
        );

    }


    /* ---------------------------------------------
       WORKS
       --------------------------------------------- */

    if (
        worksBtn &&
        worksOverlay
    ) {

        worksBtn.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();


                const isOpen =
                    worksOverlay.classList.contains(
                        'active'
                    );


                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        worksOverlay,
                        worksBtn
                    );

                }

            }
        );

    }


    /* ---------------------------------------------
       FAITH
       --------------------------------------------- */

    if (
        faithBtn &&
        faithOverlay
    ) {

        faithBtn.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();


                const isOpen =
                    faithOverlay.classList.contains(
                        'active'
                    );


                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        faithOverlay,
                        faithBtn
                    );

                }

            }
        );

    }


    /* ---------------------------------------------
       SQUAD
       --------------------------------------------- */

    if (
        squadBtn &&
        squadOverlay
    ) {

        squadBtn.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();


                const isOpen =
                    squadOverlay.classList.contains(
                        'active'
                    );


                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        squadOverlay,
                        squadBtn
                    );

                }

            }
        );

    }


    /* ---------------------------------------------
       MORE 닫기
       --------------------------------------------- */

    if (moreClose) {

        moreClose.addEventListener(
            'click',
            event => {

                event.preventDefault();

                closeAllPanels();

            }
        );

    }


    /* ---------------------------------------------
       SQUAD 닫기
       --------------------------------------------- */

    if (squadClose) {

        squadClose.addEventListener(
            'click',
            event => {

                event.preventDefault();

                closeAllPanels();

            }
        );

    }


    /* ---------------------------------------------
       Overlay 배경 클릭
       --------------------------------------------- */

    [

        moreOverlay,
        worksOverlay,
        faithOverlay,
        squadOverlay

    ].forEach(overlay => {

        if (!overlay) return;


        overlay.addEventListener(
            'click',
            event => {

                if (
                    event.target ===
                    overlay
                ) {

                    closeAllPanels();

                }

            }
        );

    });


    /* ---------------------------------------------
       패널 내부 링크 클릭
       --------------------------------------------- */

    [

        moreOverlay,
        worksOverlay,
        faithOverlay,
        squadOverlay

    ].forEach(panel => {

        if (!panel) return;


        panel.querySelectorAll('a')
            .forEach(link => {

                link.addEventListener(
                    'click',
                    () => {

                        closeAllPanels();

                    }
                );

            });

    });


    /* ---------------------------------------------
       ESC로 닫기
       --------------------------------------------- */

    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key !== 'Escape'
            ) {

                return;

            }


            const hasOpenPanel =

                moreOverlay?.classList
                    .contains('active') ||

                worksOverlay?.classList
                    .contains('active') ||

                faithOverlay?.classList
                    .contains('active') ||

                squadOverlay?.classList
                    .contains('active');


            if (hasOpenPanel) {

                closeAllPanels();

            }

        }
    );


    /* ---------------------------------------------
       화면이 PC로 전환되면 모바일 패널 닫기
       --------------------------------------------- */

    window.addEventListener(
        'resize',
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeAllPanels();

            }

        }
    );

}



/* =====================================================
   6. DESKTOP DROPDOWN
   ===================================================== */

/**
 * WORKS / FAITH / SQUAD 드롭다운
 *
 * PC 마우스 hover는 CSS가 담당하고
 * 키보드 / 터치 / 접근성은 JS가 담당합니다.
 */
function initDesktopDropdowns() {

    const wrappers =
        document.querySelectorAll(
            '.nav-dropdown-wrapper'
        );


    if (!wrappers.length) return;


    wrappers.forEach(wrapper => {

        const trigger =
            wrapper.querySelector(
                '.nav-dropdown-trigger'
            );


        if (!trigger) return;


        trigger.addEventListener(
            'click',
            event => {

                event.preventDefault();
                event.stopPropagation();


                const isOpen =
                    wrapper.classList.contains(
                        'active'
                    );


                /* 다른 dropdown 닫기 */

                wrappers.forEach(other => {

                    if (
                        other !== wrapper
                    ) {

                        other.classList.remove(
                            'active'
                        );


                        const otherTrigger =
                            other.querySelector(
                                '.nav-dropdown-trigger'
                            );


                        if (otherTrigger) {

                            otherTrigger.setAttribute(
                                'aria-expanded',
                                'false'
                            );

                        }

                    }

                });


                /* 현재 dropdown */

                wrapper.classList.toggle(
                    'active',
                    !isOpen
                );


                trigger.setAttribute(
                    'aria-expanded',
                    String(!isOpen)
                );

            }
        );

    });


    /* ---------------------------------------------
       외부 클릭 시 dropdown 닫기
       --------------------------------------------- */

    document.addEventListener(
        'click',
        event => {

            if (
                !event.target.closest(
                    '.nav-dropdown-wrapper'
                )
            ) {

                wrappers.forEach(wrapper => {

                    wrapper.classList.remove(
                        'active'
                    );


                    const trigger =
                        wrapper.querySelector(
                            '.nav-dropdown-trigger'
                        );


                    if (trigger) {

                        trigger.setAttribute(
                            'aria-expanded',
                            'false'
                        );

                    }

                });

            }

        }
    );


    /* ---------------------------------------------
       ESC
       --------------------------------------------- */

    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key !== 'Escape'
            ) {

                return;

            }


            wrappers.forEach(wrapper => {

                wrapper.classList.remove(
                    'active'
                );


                const trigger =
                    wrapper.querySelector(
                        '.nav-dropdown-trigger'
                    );


                if (trigger) {

                    trigger.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                }

            });

        }
    );

}



/* =====================================================
   7. CURRENT PAGE ACTIVE NAVIGATION
   ===================================================== */

/**
 * 현재 URL을 기준으로 메뉴 자동 활성화
 *
 * /
 * /music
 * /movie
 * /book
 * /bible
 * /worship
 * /sistersquad
 * /sistersquad2
 * /gameinfo
 * /journal
 * /about
 */
function getCurrentPageKey() {

    let path =
        window.location.pathname || '/';


    /* query / hash 제거 */

    path =
        path
            .split('?')[0]
            .split('#')[0];


    /* 마지막 slash 제거 */

    path =
        path.replace(
            /\/+$/,
            ''
        );


    /* 홈페이지 */

    if (
        path === '' ||
        path === '/'
    ) {

        return 'index';

    }


    /* 마지막 경로 */

    let filename =
        path.split('/').pop() ||
        'index';


    /* .html 제거 */

    filename =
        filename.replace(
            /\.html$/i,
            ''
        );


    return filename.toLowerCase();

}



/* =====================================================
   8. ACTIVE NAVIGATION
   ===================================================== */

function initActiveNavLink() {

    const currentPage =
        getCurrentPageKey();


    /* ---------------------------------------------
       모든 active 초기화
       --------------------------------------------- */

    document
        .querySelectorAll(
            '[data-page]'
        )
        .forEach(link => {

            link.classList.remove(
                'active'
            );

        });


    /* ---------------------------------------------
       직접 연결된 페이지
       --------------------------------------------- */

    document
        .querySelectorAll(
            '[data-page]'
        )
        .forEach(link => {

            const page =
                (
                    link.dataset.page ||
                    ''
                ).toLowerCase();


            if (
                page ===
                currentPage
            ) {

                link.classList.add(
                    'active'
                );

            }

        });


    /* ---------------------------------------------
       WORKS 하위 페이지
       --------------------------------------------- */

    const worksPages = [

        'music',
        'movie',
        'book'

    ];


    if (
        worksPages.includes(
            currentPage
        )
    ) {

        const wrappers =
            document.querySelectorAll(
                '.nav-dropdown-wrapper'
            );


        wrappers.forEach(wrapper => {

            const links =
                wrapper.querySelectorAll(
                    'a[href]'
                );


            const isWorks =
                Array.from(links)
                    .some(link => {

                        const href =
                            link.getAttribute(
                                'href'
                            ) || '';


                        return (
                            href.includes(
                                '/music'
                            ) ||
                            href.includes(
                                '/movie'
                            ) ||
                            href.includes(
                                '/book'
                            )
                        );

                    });


            if (isWorks) {

                wrapper.classList.add(
                    'active'
                );

            }

        });

    }


    /* ---------------------------------------------
       FAITH 하위 페이지
       --------------------------------------------- */

    const faithPages = [

        'bible',
        'worship'

    ];


    if (
        faithPages.includes(
            currentPage
        )
    ) {

        const wrappers =
            document.querySelectorAll(
                '.nav-dropdown-wrapper'
            );


        wrappers.forEach(wrapper => {

            const links =
                wrapper.querySelectorAll(
                    'a[href]'
                );


            const isFaith =
                Array.from(links)
                    .some(link => {

                        const href =
                            link.getAttribute(
                                'href'
                            ) || '';


                        return (
                            href.includes(
                                '/bible'
                            ) ||
                            href.includes(
                                '/worship'
                            )
                        );

                    });


            if (isFaith) {

                wrapper.classList.add(
                    'active'
                );

            }

        });

    }


    /* ---------------------------------------------
       SISTER SQUAD
       --------------------------------------------- */

    const squadPages = [

        'sistersquad',
        'sistersquad2',
        'game',
        'gameinfo'

    ];


    if (
        squadPages.includes(
            currentPage
        )
    ) {

        /* -----------------------------------------
           PC SQUAD dropdown active
           ----------------------------------------- */

        const wrappers =
            document.querySelectorAll(
                '.nav-dropdown-wrapper'
            );


        wrappers.forEach(wrapper => {

            const links =
                wrapper.querySelectorAll(
                    'a[href]'
                );


            const isSquad =
                Array.from(links)
                    .some(link => {

                        const href =
                            (
                                link.getAttribute(
                                    'href'
                                ) || ''
                            ).toLowerCase();


                        return (

                            href.includes(
                                'sistersquad'
                            ) ||

                            href.includes(
                                'sister-squad'
                            ) ||

                            href.includes(
                                'gameinfo'
                            ) ||

                            href === '/game' ||

                            href === 'game'

                        );

                    });


            if (isSquad) {

                wrapper.classList.add(
                    'active'
                );

            }

        });


        /* -----------------------------------------
           SQUAD 하위 링크 active
           ----------------------------------------- */

        document
            .querySelectorAll(
                '[data-page]'
            )
            .forEach(link => {

                const page =
                    (
                        link.dataset.page ||
                        ''
                    ).toLowerCase();


                let shouldActivate = false;


                if (
                    page ===
                    currentPage
                ) {

                    shouldActivate = true;

                }


                /*
                 * GAME 페이지 호환
                 *
                 * data-page="game"
                 * 실제 URL="/gameinfo.html"
                 */

                if (
                    page === 'game' &&
                    currentPage === 'gameinfo'
                ) {

                    shouldActivate = true;

                }


                if (
                    shouldActivate &&
                    (
                        page === 'sistersquad' ||
                        page === 'sistersquad2' ||
                        page === 'game'
                    )
                ) {

                    link.classList.add(
                        'active'
                    );

                }

            });


        /* -----------------------------------------
           모바일 SQUAD 버튼 active
           ----------------------------------------- */

        const mobileSquad =
            document.querySelector(
                '[data-mobile-menu="squad"]'
            );


        if (mobileSquad) {

            mobileSquad.classList.add(
                'active'
            );

        }

    }


    /* ---------------------------------------------
       모바일 WORKS / FAITH 버튼
       --------------------------------------------- */

    const mobileWorks =
        document.querySelector(
            '[data-mobile-menu="works"]'
        );


    const mobileFaith =
        document.querySelector(
            '[data-mobile-menu="faith"]'
        );


    if (
        mobileWorks &&
        worksPages.includes(
            currentPage
        )
    ) {

        mobileWorks.classList.add(
            'active'
        );

    }


    if (
        mobileFaith &&
        faithPages.includes(
            currentPage
        )
    ) {

        mobileFaith.classList.add(
            'active'
        );

    }


    /* ---------------------------------------------
       모바일 MORE 내부 페이지
       --------------------------------------------- */

    const morePages = [

        'journal',
        'about',
        'privacy',
        'terms'

    ];


    if (
        morePages.includes(
            currentPage
        )
    ) {

        const moreButton =
            document.getElementById(
                'mobileMoreBtn'
            );


        if (moreButton) {

            moreButton.classList.add(
                'active'
            );

        }

    }

}



/* =====================================================
   9. LANGUAGE DROPDOWN
   ===================================================== */

function initLangDropdown() {

    const wrapper =
        document.getElementById(
            'langWrapper'
        );


    const toggleBtn =
        document.getElementById(
            'langToggleBtn'
        );


    if (
        !wrapper ||
        !toggleBtn
    ) {

        return;

    }


    /* ---------------------------------------------
       Toggle
       --------------------------------------------- */

    toggleBtn.addEventListener(
        'click',
        event => {

            event.stopPropagation();


            const isOpen =
                wrapper.classList.toggle(
                    'active'
                );


            toggleBtn.setAttribute(
                'aria-expanded',
                String(isOpen)
            );

        }
    );


    /* ---------------------------------------------
       외부 클릭
       --------------------------------------------- */

    document.addEventListener(
        'click',
        event => {

            if (
                !wrapper.contains(
                    event.target
                )
            ) {

                wrapper.classList.remove(
                    'active'
                );


                toggleBtn.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }

        }
    );


    /* ---------------------------------------------
       언어 버튼
       --------------------------------------------- */

    wrapper
        .querySelectorAll(
            '.lang-btn'
        )
        .forEach(btn => {

            btn.addEventListener(
                'click',
                () => {

                    setLanguage(
                        btn.dataset.lang
                    );

                }
            );

        });

}



/* =====================================================
   10. LANGUAGE SETTER
   ===================================================== */

function setLanguage(lang) {

    currentLang =
        i18n[lang]
            ? lang
            : 'ko';


    lang =
        currentLang;


    /* ---------------------------------------------
       HTML lang
       --------------------------------------------- */

    document.documentElement.lang =
        lang;


    /* ---------------------------------------------
       Local Storage
       --------------------------------------------- */

    try {

        localStorage.setItem(
            'pref-lang',
            lang
        );

    } catch (_) {}


    /* ---------------------------------------------
       data-i18n
       --------------------------------------------- */

    document
        .querySelectorAll(
            '[data-i18n]'
        )
        .forEach(el => {

            const key =
                el.dataset.i18n;


            if (
                i18n[lang][key] !==
                undefined
            ) {

                el.innerHTML =
                    i18n[lang][key];

            }

        });


    /* ---------------------------------------------
       SEO META
       --------------------------------------------- */

    const dict =
        i18n[lang];


    if (
        dict.meta_title
    ) {

        document.title =
            dict.meta_title;

    }


    if (
        dict.meta_description
    ) {

        const metaDesc =
            document.querySelector(
                'meta[name="description"]'
            );


        if (metaDesc) {

            metaDesc.setAttribute(
                'content',
                dict.meta_description
            );

        }

    }


    if (
        dict.og_title
    ) {

        const ogTitle =
            document.querySelector(
                'meta[property="og:title"]'
            );


        if (ogTitle) {

            ogTitle.setAttribute(
                'content',
                dict.og_title
            );

        }

    }


    if (
        dict.og_description
    ) {

        const ogDesc =
            document.querySelector(
                'meta[property="og:description"]'
            );


        if (ogDesc) {

            ogDesc.setAttribute(
                'content',
                dict.og_description
            );

        }

    }


    if (
        dict.twitter_title
    ) {

        const twTitle =
            document.querySelector(
                'meta[name="twitter:title"]'
            );


        if (twTitle) {

            twTitle.setAttribute(
                'content',
                dict.twitter_title
            );

        }

    }


    if (
        dict.twitter_description
    ) {

        const twDesc =
            document.querySelector(
                'meta[name="twitter:description"]'
            );


        if (twDesc) {

            twDesc.setAttribute(
                'content',
                dict.twitter_description
            );

        }

    }


    /* ---------------------------------------------
       언어 버튼 active
       --------------------------------------------- */

    document
        .querySelectorAll(
            '.lang-btn'
        )
        .forEach(btn => {

            btn.classList.toggle(
                'active',
                btn.dataset.lang === lang
            );

        });


    /* ---------------------------------------------
       현재 언어 표시
       --------------------------------------------- */

    const display =
        document.getElementById(
            'currentLangText'
        );


    if (display) {

        display.textContent =
            lang === 'ko'
                ? 'KOR'
                : 'ENG';

    }


    /* ---------------------------------------------
       언어 메뉴 닫기
       --------------------------------------------- */

    const wrapper =
        document.getElementById(
            'langWrapper'
        );


    const toggleBtn =
        document.getElementById(
            'langToggleBtn'
        );


    if (wrapper) {

        wrapper.classList.remove(
            'active'
        );

    }


    if (toggleBtn) {

        toggleBtn.setAttribute(
            'aria-expanded',
            'false'
        );

    }


    /* ---------------------------------------------
       페이지별 언어 콜백
       --------------------------------------------- */

    if (
        typeof window.onLangChange ===
        'function'
    ) {

        window.onLangChange(
            lang
        );

    }

}


/* 외부 호출 */

window.setLanguage =
    setLanguage;


window.getCurrentLang =
    () => currentLang;



/* =====================================================
   11. SHARE MODAL
   ===================================================== */

function initShareModal() {

    const overlay =
        document.getElementById(
            'shareOverlay'
        );


    const openBtn =
        document.getElementById(
            'shareOpenBtn'
        );


    const copyBtn =
        document.getElementById(
            'shareCopyBtn'
        );


    const snsBtn =
        document.getElementById(
            'shareSNSBtn'
        );


    const closeBtn =
        document.getElementById(
            'shareCloseBtn'
        );


    if (!overlay) return;


    /* ---------------------------------------------
       Open
       --------------------------------------------- */

    function openModal() {

        overlay.style.display =
            'flex';


        overlay.setAttribute(
            'aria-hidden',
            'false'
        );


        setTimeout(
            () => {

                overlay.classList.add(
                    'active'
                );

            },
            10
        );

    }


    /* ---------------------------------------------
       Close
       --------------------------------------------- */

    function closeModal() {

        overlay.classList.remove(
            'active'
        );


        overlay.setAttribute(
            'aria-hidden',
            'true'
        );


        setTimeout(
            () => {

                overlay.style.display =
                    'none';

            },
            300
        );

    }


    /* ---------------------------------------------
       Open button
       --------------------------------------------- */

    if (openBtn) {

        openBtn.addEventListener(
            'click',
            openModal
        );

    }


    /* ---------------------------------------------
       Close button
       --------------------------------------------- */

    if (closeBtn) {

        closeBtn.addEventListener(
            'click',
            closeModal
        );

    }


    /* ---------------------------------------------
       Overlay click
       --------------------------------------------- */

    overlay.addEventListener(
        'click',
        event => {

            if (
                event.target ===
                overlay
            ) {

                closeModal();

            }

        }
    );


    /* ---------------------------------------------
       ESC
       --------------------------------------------- */

    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Escape' &&
                overlay.classList.contains(
                    'active'
                )
            ) {

                closeModal();

            }

        }
    );


    /* ---------------------------------------------
       COPY LINK
       --------------------------------------------- */

    if (copyBtn) {

        copyBtn.addEventListener(
            'click',
            async () => {

                const url =
                    window.location.href;


                let ok = false;


                /* Clipboard API */

                if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    try {

                        await navigator.clipboard.writeText(
                            url
                        );

                        ok = true;

                    } catch (_) {}

                }


                /* Fallback */

                if (!ok) {

                    const ta =
                        document.createElement(
                            'textarea'
                        );


                    ta.value =
                        url;


                    ta.id =
                        'temp-copy-area';


                    ta.style.cssText =
                        'position:fixed;left:-9999px;top:0;opacity:0';


                    document.body.appendChild(
                        ta
                    );


                    ta.focus();
                    ta.select();


                    try {

                        ok =
                            document.execCommand(
                                'copy'
                            );

                    } catch (_) {}


                    document.body.removeChild(
                        ta
                    );

                }


                if (ok) {

                    showToast(
                        i18n[currentLang]
                            .toast_copy
                    );

                }


                closeModal();

            }
        );

    }


    /* ---------------------------------------------
       SNS SHARE
       --------------------------------------------- */

    if (snsBtn) {

        snsBtn.addEventListener(
            'click',
            async () => {

                if (
                    navigator.share
                ) {

                    try {

                        await navigator.share({

                            title:
                                document.title ||
                                'Chris LEE.PAPA',

                            text:
                                'Chris LEE.PAPA',

                            url:
                                window.location.href

                        });

                    } catch (_) {

                        /*
                         * 사용자가 공유창을 닫은 경우
                         * 오류 메시지를 표시하지 않음
                         */

                    }

                } else {

                    showToast(
                        i18n[currentLang]
                            .toast_error
                    );

                }

            }
        );

    }

}



/* =====================================================
   12. TOAST
   ===================================================== */

function showToast(msg) {

    const toast =
        document.getElementById(
            'toast'
        );


    if (!toast) return;


    toast.textContent =
        msg;


    toast.style.display =
        'block';


    clearTimeout(
        showToast._timer
    );


    showToast._timer =
        setTimeout(
            () => {

                toast.style.display =
                    'none';

            },
            2500
        );

}


window.showToast =
    showToast;



/* =====================================================
   13. SECURITY
   ===================================================== */

/**
 * 기존 사이트의 보호 기능 유지
 *
 * 주의:
 * 이 기능은 콘텐츠 보호 목적이며
 * 완벽한 보안 기능은 아닙니다.
 */
function initSecurity() {

    /* ---------------------------------------------
       우클릭 방지
       --------------------------------------------- */

    document.addEventListener(
        'contextmenu',
        event => {

            event.preventDefault();

        }
    );


    /* ---------------------------------------------
       Copy
       --------------------------------------------- */

    document.addEventListener(
        'copy',
        event => {

            const target =
                event.target;


            const isCopyArea =
                target &&
                target.id ===
                'temp-copy-area';


            if (
                !isCopyArea &&
                window.getSelection &&
                window.getSelection()
                    .toString()
                    .length > 0
            ) {

                event.preventDefault();

            }

        }
    );


    /* ---------------------------------------------
       Keyboard protection
       --------------------------------------------- */

    document.addEventListener(
        'keydown',
        event => {

            const key =
                String(
                    event.key || ''
                ).toUpperCase();


            const target =
                event.target;


            const isCopyArea =
                target &&
                target.id ===
                'temp-copy-area';


            /* -----------------------------------------
               개발자 도구 / 소스 보기
               ----------------------------------------- */

            if (

                key === 'F12' ||

                (
                    event.ctrlKey &&
                    event.shiftKey &&
                    (
                        key === 'I' ||
                        key === 'J'
                    )
                ) ||

                (
                    event.ctrlKey &&
                    key === 'U'
                )

            ) {

                event.preventDefault();

                return;

            }


            /* -----------------------------------------
               선택 텍스트가 있는 경우
               Ctrl+C / Ctrl+S / Ctrl+P 제한
               ----------------------------------------- */

            if (

                event.ctrlKey &&

                (
                    key === 'C' ||
                    key === 'S' ||
                    key === 'P'
                ) &&

                !isCopyArea &&

                window.getSelection &&
                window.getSelection()
                    .toString()
                    .length > 0

            ) {

                event.preventDefault();

            }

        }
    );

}



/* =====================================================
   14. MOUSE ORB
   ===================================================== */

function initMouseOrb() {

    const orb =
        document.getElementById(
            'mouse-orb'
        );


    if (!orb) return;


    /* 모바일에서는 불필요 */

    if (
        window.matchMedia &&
        window.matchMedia(
            '(max-width: 900px)'
        ).matches
    ) {

        return;

    }


    document.addEventListener(
        'mousemove',
        event => {

            orb.style.left =
                event.clientX + 'px';


            orb.style.top =
                event.clientY + 'px';

        },
        {
            passive: true
        }
    );

}



/* =====================================================
   15. SERVICE WORKER
   ===================================================== */

if (
    'serviceWorker' in navigator
) {

    window.addEventListener(
        'load',
        () => {

            navigator.serviceWorker
                .register('/sw.js')

                .then(
                    () => {

                        console.log(
                            '[main.js] ServiceWorker registered'
                        );

                    }
                )

                .catch(
                    err => {

                        console.warn(
                            '[main.js] ServiceWorker failed',
                            err
                        );

                    }
                );

        }
    );

}



/* =====================================================
   16. ENTRY POINT
   ===================================================== */

if (
    document.readyState ===
    'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        loadComponents
    );

} else {

    loadComponents();

}
nav_squad_1: 'SISTER SQUAD',
nav_squad_2: 'SISTER SQUAD 2',
nav_game: 'GAME',
       
        share_title: 'SHARE ARCHIVE',
        share_desc:  '이곳의 기록과 영감을 소중한 사람들에게 전하세요.',
        share_copy:  'COPY LINK',
        share_sns:   'SNS SHARE',
        share_close: 'Close',

        footer_text:
            '© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',

        footer_privacy:
            '개인정보처리방침',

        footer_terms:
            '이용약관',

        toast_copy:
            '링크가 복사되었습니다 ✓',

        toast_error:
            '지원하지 않는 브라우저입니다.'
    },


    en: {

        nav_home:    'Home',
        nav_works:   'Works',
        nav_faith:   'Faith',
        nav_squad:   'Sister Squad',
        nav_play:    'Play',
        nav_journal: 'Journal',
        nav_about:   'About',

        nav_music:   'Music',
        nav_movie:   'Movies',
        nav_book:    'Books',

        nav_bible:   'Bible',
        nav_worship: 'Worship',

nav_squad_short: 'SQUAD',

nav_squad_1: 'SISTER SQUAD',
nav_squad_2: 'SISTER SQUAD 2',
nav_game: 'GAME',
       
        share_title: 'SHARE ARCHIVE',
        share_desc:
            'Share the records and inspiration here with your loved ones.',

        share_copy:  'COPY LINK',
        share_sns:   'SNS SHARE',
        share_close: 'Close',

        footer_text:
            '© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',

        footer_privacy:
            'Privacy Policy',

        footer_terms:
            'Terms of Use',

        toast_copy:
            'Link copied ✓',

        toast_error:
            'Sharing is not supported in this browser.'
    }

};


/* 런타임에 병합되는 최종 사전 */

let i18n = {
    ko: { ...BASE_I18N.ko },
    en: { ...BASE_I18N.en }
};

let currentLang = 'ko';



/* =====================================================
   2. COMPONENT LOADER
   ===================================================== */

/**
 * HTML 파일을 fetch하여 대상 요소에 삽입
 */
async function loadComponent(targetId, url) {

    const target = document.getElementById(targetId);

    if (!target) return;


    try {

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        target.innerHTML = await res.text();

    } catch (err) {

        console.warn(
            `[main.js] 컴포넌트 로드 실패: ${url}`,
            err
        );

    }

}


/**
 * Header + Footer를 병렬로 로드한 뒤
 * 모든 기능을 초기화
 */
async function loadComponents() {

    /* ---------------------------------------------
       PAGE_I18N 병합
       --------------------------------------------- */

    if (window.PAGE_I18N) {

        i18n.ko = {
            ...BASE_I18N.ko,
            ...(window.PAGE_I18N.ko || {})
        };

        i18n.en = {
            ...BASE_I18N.en,
            ...(window.PAGE_I18N.en || {})
        };

    }


    /* ---------------------------------------------
       Header / Footer 로드
       --------------------------------------------- */

    await Promise.all([

        loadComponent(
            'site-nav',
            'components/header.html'
        ),

        loadComponent(
            'site-footer',
            'components/footer.html'
        )

    ]);


    /* ---------------------------------------------
       공통 기능 초기화
       --------------------------------------------- */

    initScrollProgress();

    initNavScroll();

    initMobileMenu();

    initDesktopDropdowns();

    initActiveNavLink();

    initLangDropdown();

    initShareModal();

    initSecurity();

    initMouseOrb();


    /* ---------------------------------------------
       저장된 언어 적용
       --------------------------------------------- */

    let savedLang = 'ko';

    try {

        savedLang =
            localStorage.getItem('pref-lang') || 'ko';

    } catch (_) {}


    setLanguage(savedLang);


    /* ---------------------------------------------
       페이지별 초기화 콜백
       --------------------------------------------- */

    if (typeof window.onMainReady === 'function') {

        window.onMainReady();

    }

}



/* =====================================================
   3. SCROLL PROGRESS
   ===================================================== */

function initScrollProgress() {

    const bar =
        document.getElementById('scroll-progress');

    if (!bar) return;


    function updateProgress() {

        const scrolled =
            window.scrollY || window.pageYOffset || 0;

        const maxScroll =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            maxScroll > 0
                ? (scrolled / maxScroll) * 100
                : 0;


        bar.style.width =
            Math.min(100, Math.max(0, percentage)) + '%';

    }


    window.addEventListener(
        'scroll',
        updateProgress,
        { passive: true }
    );


    updateProgress();

}



/* =====================================================
   4. NAVIGATION SCROLL EFFECT
   ===================================================== */

function initNavScroll() {

    const nav =
        document.getElementById('main-nav');

    if (!nav) return;


    function updateNav() {

        nav.classList.toggle(
            'scrolled',
            window.scrollY > 40
        );

    }


    window.addEventListener(
        'scroll',
        updateNav,
        { passive: true }
    );


    updateNav();

}



/* =====================================================
   5. MOBILE NAVIGATION
   ===================================================== */

/**
 * 새로운 모바일 하단 메뉴
 *
 * HOME
 * WORKS
 * FAITH
 * SQUAD
 * MORE
 */
function initMobileMenu() {

    const moreBtn =
        document.getElementById('mobileMoreBtn');

    const moreOverlay =
        document.getElementById('mobileMoreOverlay');

    const moreClose =
        document.getElementById('mobileMoreClose');


    const worksBtn =
        document.querySelector(
            '[data-mobile-menu="works"]'
        );

    const faithBtn =
        document.querySelector(
            '[data-mobile-menu="faith"]'
        );
const squadBtn =
    document.querySelector(
        '[data-mobile-menu="squad"]'
    );

    const worksOverlay =
        document.getElementById('mobileWorksMenu');

    const faithOverlay =
        document.getElementById('mobileFaithMenu');
const squadOverlay =
    document.getElementById('mobileSquadMenu');

    /* ---------------------------------------------
       공통 패널 닫기
       --------------------------------------------- */

    function closeAllPanels() {

        [
           moreOverlay,
    worksOverlay,
    faithOverlay,
    squadOverlay
        ].forEach(panel => {

            if (!panel) return;

            panel.classList.remove('active');

            panel.setAttribute(
                'aria-hidden',
                'true'
            );

        });


        [
             moreBtn,
    worksBtn,
    faithBtn,
    squadBtn
        ].forEach(button => {

            if (!button) return;

            button.setAttribute(
                'aria-expanded',
                'false'
            );

        });


        document.body.classList.remove(
            'mobile-panel-open'
        );

    }


    /* ---------------------------------------------
       패널 열기
       --------------------------------------------- */

    function openPanel(panel, button) {

        if (!panel) return;


        closeAllPanels();


        panel.classList.add('active');

        panel.setAttribute(
            'aria-hidden',
            'false'
        );


        if (button) {

            button.setAttribute(
                'aria-expanded',
                'true'
            );

        }


        document.body.classList.add(
            'mobile-panel-open'
        );

    }


    /* ---------------------------------------------
       MORE
       --------------------------------------------- */

    if (moreBtn && moreOverlay) {

        moreBtn.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                const isOpen =
                    moreOverlay.classList.contains(
                        'active'
                    );


                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        moreOverlay,
                        moreBtn
                    );

                }

            }
        );

    }

   if (squadBtn && squadOverlay) {

    squadBtn.addEventListener(
        'click',
        event => {

            event.stopPropagation();

            const isOpen =
                squadOverlay.classList.contains(
                    'active'
                );

            if (isOpen) {

                closeAllPanels();

            } else {

                openPanel(
                    squadOverlay,
                    squadBtn
                );

            }

        }
    );

}

    /* ---------------------------------------------
       MORE 닫기
       --------------------------------------------- */

    if (moreClose) {

        moreClose.addEventListener(
            'click',
            closeAllPanels
        );

    }


    /* ---------------------------------------------
       WORKS
       --------------------------------------------- */

    if (worksBtn && worksOverlay) {

        worksBtn.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                const isOpen =
                    worksOverlay.classList.contains(
                        'active'
                    );


                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        worksOverlay,
                        worksBtn
                    );

                }

            }
        );

    }


    /* ---------------------------------------------
       FAITH
       --------------------------------------------- */

    if (faithBtn && faithOverlay) {

        faithBtn.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                const isOpen =
                    faithOverlay.classList.contains(
                        'active'
                    );


                if (isOpen) {

                    closeAllPanels();

                } else {

                    openPanel(
                        faithOverlay,
                        faithBtn
                    );

                }

            }
        );

    }


    /* ---------------------------------------------
       Overlay 배경 클릭
       --------------------------------------------- */

    [
        moreOverlay,
    worksOverlay,
    faithOverlay,
    squadOverlay
    ].forEach(overlay => {

        if (!overlay) return;


        overlay.addEventListener(
            'click',
            event => {

                if (event.target === overlay) {

                    closeAllPanels();

                }

            }
        );

    });


    /* ---------------------------------------------
       패널 안 링크 클릭
       --------------------------------------------- */

    [
        moreOverlay,
        worksOverlay,
        faithOverlay
    ].forEach(panel => {

        if (!panel) return;


        panel.querySelectorAll('a').forEach(link => {

            link.addEventListener(
                'click',
                () => {

                    closeAllPanels();

                }
            );

        });

    });


    /* ---------------------------------------------
       ESC로 닫기
       --------------------------------------------- */

    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Escape' &&
                (
                    moreOverlay?.classList.contains('active') ||
                    worksOverlay?.classList.contains('active') ||
                    faithOverlay?.classList.contains('active')
                )
            ) {

                closeAllPanels();

            }

        }
    );


    /* ---------------------------------------------
       화면이 PC로 전환되면 모바일 패널 닫기
       --------------------------------------------- */

    window.addEventListener(
        'resize',
        () => {

            if (window.innerWidth > 900) {

                closeAllPanels();

            }

        }
    );

}



/* =====================================================
   6. DESKTOP DROPDOWN
   ===================================================== */

/**
 * WORKS / FAITH 드롭다운
 *
 * PC 마우스 hover는 CSS가 담당하고
 * 키보드/터치/접근성은 JS가 담당합니다.
 */
function initDesktopDropdowns() {

    const wrappers =
        document.querySelectorAll(
            '.nav-dropdown-wrapper'
        );


    if (!wrappers.length) return;


    wrappers.forEach(wrapper => {

        const trigger =
            wrapper.querySelector(
                '.nav-dropdown-trigger'
            );


        if (!trigger) return;


        trigger.addEventListener(
            'click',
            event => {

                event.preventDefault();

                const isOpen =
                    wrapper.classList.contains(
                        'active'
                    );


                /* 다른 dropdown 닫기 */

                wrappers.forEach(other => {

                    if (other !== wrapper) {

                        other.classList.remove(
                            'active'
                        );

                        const otherTrigger =
                            other.querySelector(
                                '.nav-dropdown-trigger'
                            );


                        if (otherTrigger) {

                            otherTrigger.setAttribute(
                                'aria-expanded',
                                'false'
                            );

                        }

                    }

                });


                /* 현재 dropdown */

                wrapper.classList.toggle(
                    'active',
                    !isOpen
                );


                trigger.setAttribute(
                    'aria-expanded',
                    String(!isOpen)
                );

            }
        );

    });


    /* ---------------------------------------------
       외부 클릭 시 dropdown 닫기
       --------------------------------------------- */

    document.addEventListener(
        'click',
        event => {

            if (
                !event.target.closest(
                    '.nav-dropdown-wrapper'
                )
            ) {

                wrappers.forEach(wrapper => {

                    wrapper.classList.remove(
                        'active'
                    );


                    const trigger =
                        wrapper.querySelector(
                            '.nav-dropdown-trigger'
                        );


                    if (trigger) {

                        trigger.setAttribute(
                            'aria-expanded',
                            'false'
                        );

                    }

                });

            }

        }
    );


    /* ---------------------------------------------
       ESC
       --------------------------------------------- */

    document.addEventListener(
        'keydown',
        event => {

            if (event.key !== 'Escape') return;


            wrappers.forEach(wrapper => {

                wrapper.classList.remove(
                    'active'
                );


                const trigger =
                    wrapper.querySelector(
                        '.nav-dropdown-trigger'
                    );


                if (trigger) {

                    trigger.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                }

            });

        }
    );

}



/* =====================================================
   7. CURRENT PAGE ACTIVE NAVIGATION
   ===================================================== */

/**
 * 현재 URL을 기준으로 메뉴 자동 활성화
 *
 * /
 * /music
 * /movie
 * /book
 * /bible
 * /worship
 * /sistersquad
 * /sistersquad2
 * /gameinfo
 * /journal
 * /about
 */
function getCurrentPageKey() {

    let path =
        window.location.pathname || '/';


    /* query / hash 제거 */

    path =
        path.split('?')[0]
            .split('#')[0];


    /* 마지막 slash 제거 */

    path =
        path.replace(/\/+$/, '');


    /* 홈페이지 */

    if (
        path === '' ||
        path === '/'
    ) {

        return 'index';

    }


    /* 마지막 경로 */

    let filename =
        path.split('/').pop() || 'index';


    /* .html 제거 */

    filename =
        filename.replace(
            /\.html$/i,
            ''
        );


    return filename.toLowerCase();

}


function initActiveNavLink() {

    const currentPage =
        getCurrentPageKey();


    /* ---------------------------------------------
       모든 active 초기화
       --------------------------------------------- */

    document
        .querySelectorAll(
            '[data-page]'
        )
        .forEach(link => {

            link.classList.remove(
                'active'
            );

        });


    /* ---------------------------------------------
       직접 연결된 페이지
       --------------------------------------------- */

    document
        .querySelectorAll(
            '[data-page]'
        )
        .forEach(link => {

            const page =
                (
                    link.dataset.page || ''
                ).toLowerCase();


            if (page === currentPage) {

                link.classList.add(
                    'active'
                );

            }

        });


    /* ---------------------------------------------
       WORKS 하위 페이지
       --------------------------------------------- */

    const worksPages = [
        'music',
        'movie',
        'book'
    ];


    if (
        worksPages.includes(
            currentPage
        )
    ) {

        const worksWrapper =
            document.querySelector(
                '.nav-dropdown-wrapper:has([href="/music"])'
            );


        if (worksWrapper) {

            worksWrapper.classList.add(
                'active'
            );

        }

    }


    /* ---------------------------------------------
       FAITH 하위 페이지
       --------------------------------------------- */

    const faithPages = [
        'bible',
        'worship'
    ];


    if (
        faithPages.includes(
            currentPage
        )
    ) {

        const faithWrapper =
            document.querySelector(
                '.nav-dropdown-wrapper:has([href="/bible"])'
            );


        if (faithWrapper) {

            faithWrapper.classList.add(
                'active'
            );

        }

    }


    /* ---------------------------------------------
       SISTER SQUAD
       --------------------------------------------- */

    if (
        currentPage === 'sistersquad' ||
        currentPage === 'sistersquad2' ||
        currentPage === 'sister-squad'
    ) {

        document
            .querySelectorAll(
                '[data-page="sistersquad"]'
            )
            .forEach(link => {

                link.classList.add(
                    'active'
                );

            });

    }


    /* ---------------------------------------------
       모바일 WORKS / FAITH 버튼
       --------------------------------------------- */

    const mobileWorks =
        document.querySelector(
            '[data-mobile-menu="works"]'
        );


    const mobileFaith =
        document.querySelector(
            '[data-mobile-menu="faith"]'
        );


    if (
        mobileWorks &&
        worksPages.includes(currentPage)
    ) {

        mobileWorks.classList.add(
            'active'
        );

    }


    if (
        mobileFaith &&
        faithPages.includes(currentPage)
    ) {

        mobileFaith.classList.add(
            'active'
        );

    }


    /* ---------------------------------------------
       모바일 MORE 내부 페이지
       --------------------------------------------- */

    const morePages = [
        'gameinfo',
        'journal',
        'about',
        'privacy',
        'terms'
    ];


    if (
        morePages.includes(
            currentPage
        )
    ) {

        const moreButton =
            document.getElementById(
                'mobileMoreBtn'
            );


        if (moreButton) {

            moreButton.classList.add(
                'active'
            );

        }

    }

}



/* =====================================================
   8. LANGUAGE DROPDOWN
   ===================================================== */

function initLangDropdown() {

    const wrapper =
        document.getElementById(
            'langWrapper'
        );


    const toggleBtn =
        document.getElementById(
            'langToggleBtn'
        );


    if (
        !wrapper ||
        !toggleBtn
    ) {

        return;

    }


    /* ---------------------------------------------
       Toggle
       --------------------------------------------- */

    toggleBtn.addEventListener(
        'click',
        event => {

            event.stopPropagation();


            const isOpen =
                wrapper.classList.toggle(
                    'active'
                );


            toggleBtn.setAttribute(
                'aria-expanded',
                String(isOpen)
            );

        }
    );


    /* ---------------------------------------------
       외부 클릭
       --------------------------------------------- */

    document.addEventListener(
        'click',
        event => {

            if (
                !wrapper.contains(
                    event.target
                )
            ) {

                wrapper.classList.remove(
                    'active'
                );


                toggleBtn.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }

        }
    );


    /* ---------------------------------------------
       언어 버튼
       --------------------------------------------- */

    wrapper
        .querySelectorAll(
            '.lang-btn'
        )
        .forEach(btn => {

            btn.addEventListener(
                'click',
                () => {

                    setLanguage(
                        btn.dataset.lang
                    );

                }
            );

        });

}



/* =====================================================
   9. LANGUAGE SETTER
   ===================================================== */

function setLanguage(lang) {

    currentLang =
        i18n[lang]
            ? lang
            : 'ko';


    lang = currentLang;


    /* ---------------------------------------------
       HTML lang
       --------------------------------------------- */

    document.documentElement.lang =
        lang;


    /* ---------------------------------------------
       Local Storage
       --------------------------------------------- */

    try {

        localStorage.setItem(
            'pref-lang',
            lang
        );

    } catch (_) {}


    /* ---------------------------------------------
       data-i18n
       --------------------------------------------- */

    document
        .querySelectorAll(
            '[data-i18n]'
        )
        .forEach(el => {

            const key =
                el.dataset.i18n;


            if (
                i18n[lang][key] !== undefined
            ) {

                el.innerHTML =
                    i18n[lang][key];

            }

        });


    /* ---------------------------------------------
       SEO META
       --------------------------------------------- */

    const dict =
        i18n[lang];


    if (dict.meta_title) {

        document.title =
            dict.meta_title;

    }


    if (dict.meta_description) {

        const metaDesc =
            document.querySelector(
                'meta[name="description"]'
            );


        if (metaDesc) {

            metaDesc.setAttribute(
                'content',
                dict.meta_description
            );

        }

    }


    if (dict.og_title) {

        const ogTitle =
            document.querySelector(
                'meta[property="og:title"]'
            );


        if (ogTitle) {

            ogTitle.setAttribute(
                'content',
                dict.og_title
            );

        }

    }


    if (dict.og_description) {

        const ogDesc =
            document.querySelector(
                'meta[property="og:description"]'
            );


        if (ogDesc) {

            ogDesc.setAttribute(
                'content',
                dict.og_description
            );

        }

    }


    if (dict.twitter_title) {

        const twTitle =
            document.querySelector(
                'meta[name="twitter:title"]'
            );


        if (twTitle) {

            twTitle.setAttribute(
                'content',
                dict.twitter_title
            );

        }

    }


    if (dict.twitter_description) {

        const twDesc =
            document.querySelector(
                'meta[name="twitter:description"]'
            );


        if (twDesc) {

            twDesc.setAttribute(
                'content',
                dict.twitter_description
            );

        }

    }


    /* ---------------------------------------------
       언어 버튼 active
       --------------------------------------------- */

    document
        .querySelectorAll(
            '.lang-btn'
        )
        .forEach(btn => {

            btn.classList.toggle(
                'active',
                btn.dataset.lang === lang
            );

        });


    /* ---------------------------------------------
       현재 언어 표시
       --------------------------------------------- */

    const display =
        document.getElementById(
            'currentLangText'
        );


    if (display) {

        display.textContent =
            lang === 'ko'
                ? 'KOR'
                : 'ENG';

    }


    /* ---------------------------------------------
       언어 메뉴 닫기
       --------------------------------------------- */

    const wrapper =
        document.getElementById(
            'langWrapper'
        );


    const toggleBtn =
        document.getElementById(
            'langToggleBtn'
        );


    if (wrapper) {

        wrapper.classList.remove(
            'active'
        );

    }


    if (toggleBtn) {

        toggleBtn.setAttribute(
            'aria-expanded',
            'false'
        );

    }


    /* ---------------------------------------------
       페이지별 언어 콜백
       --------------------------------------------- */

    if (
        typeof window.onLangChange ===
        'function'
    ) {

        window.onLangChange(lang);

    }

}


/* 외부 호출 */

window.setLanguage =
    setLanguage;


window.getCurrentLang =
    () => currentLang;



/* =====================================================
   10. SHARE MODAL
   ===================================================== */

function initShareModal() {

    const overlay =
        document.getElementById(
            'shareOverlay'
        );


    const openBtn =
        document.getElementById(
            'shareOpenBtn'
        );


    const copyBtn =
        document.getElementById(
            'shareCopyBtn'
        );


    const snsBtn =
        document.getElementById(
            'shareSNSBtn'
        );


    const closeBtn =
        document.getElementById(
            'shareCloseBtn'
        );


    if (!overlay) return;


    /* ---------------------------------------------
       Open
       --------------------------------------------- */

    function openModal() {

        overlay.style.display =
            'flex';


        overlay.setAttribute(
            'aria-hidden',
            'false'
        );


        setTimeout(
            () => {

                overlay.classList.add(
                    'active'
                );

            },
            10
        );

    }


    /* ---------------------------------------------
       Close
       --------------------------------------------- */

    function closeModal() {

        overlay.classList.remove(
            'active'
        );


        overlay.setAttribute(
            'aria-hidden',
            'true'
        );


        setTimeout(
            () => {

                overlay.style.display =
                    'none';

            },
            300
        );

    }


    /* ---------------------------------------------
       Open button
       --------------------------------------------- */

    if (openBtn) {

        openBtn.addEventListener(
            'click',
            openModal
        );

    }


    /* ---------------------------------------------
       Close button
       --------------------------------------------- */

    if (closeBtn) {

        closeBtn.addEventListener(
            'click',
            closeModal
        );

    }


    /* ---------------------------------------------
       Overlay click
       --------------------------------------------- */

    overlay.addEventListener(
        'click',
        event => {

            if (
                event.target === overlay
            ) {

                closeModal();

            }

        }
    );


    /* ---------------------------------------------
       ESC
       --------------------------------------------- */

    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Escape' &&
                overlay.classList.contains(
                    'active'
                )
            ) {

                closeModal();

            }

        }
    );


    /* ---------------------------------------------
       COPY LINK
       --------------------------------------------- */

    if (copyBtn) {

        copyBtn.addEventListener(
            'click',
            async () => {

                const url =
                    window.location.href;


                let ok = false;


                /* Clipboard API */

                if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    try {

                        await navigator.clipboard.writeText(
                            url
                        );

                        ok = true;

                    } catch (_) {}

                }


                /* Fallback */

                if (!ok) {

                    const ta =
                        document.createElement(
                            'textarea'
                        );


                    ta.value =
                        url;


                    ta.id =
                        'temp-copy-area';


                    ta.style.cssText =
                        'position:fixed;left:-9999px;top:0;opacity:0';


                    document.body.appendChild(
                        ta
                    );


                    ta.focus();
                    ta.select();


                    try {

                        ok =
                            document.execCommand(
                                'copy'
                            );

                    } catch (_) {}


                    document.body.removeChild(
                        ta
                    );

                }


                if (ok) {

                    showToast(
                        i18n[currentLang]
                            .toast_copy
                    );

                }


                closeModal();

            }
        );

    }


    /* ---------------------------------------------
       SNS SHARE
       --------------------------------------------- */

    if (snsBtn) {

        snsBtn.addEventListener(
            'click',
            async () => {

                if (
                    navigator.share
                ) {

                    try {

                        await navigator.share({

                            title:
                                document.title ||
                                'Chris LEE.PAPA',

                            text:
                                'Chris LEE.PAPA',

                            url:
                                window.location.href

                        });

                    } catch (_) {

                        /* 사용자가 공유창을 닫은 경우
                           오류 메시지를 표시하지 않음 */

                    }

                } else {

                    showToast(
                        i18n[currentLang]
                            .toast_error
                    );

                }

            }
        );

    }

}



/* =====================================================
   11. TOAST
   ===================================================== */

function showToast(msg) {

    const toast =
        document.getElementById(
            'toast'
        );


    if (!toast) return;


    toast.textContent =
        msg;


    toast.style.display =
        'block';


    clearTimeout(
        showToast._timer
    );


    showToast._timer =
        setTimeout(
            () => {

                toast.style.display =
                    'none';

            },
            2500
        );

}


window.showToast =
    showToast;



/* =====================================================
   12. SECURITY
   ===================================================== */

/**
 * 기존 사이트의 보호 기능 유지
 *
 * 주의:
 * 이 기능은 콘텐츠 보호 목적이며
 * 완벽한 보안 기능은 아닙니다.
 */
function initSecurity() {

    /* ---------------------------------------------
       우클릭 방지
       --------------------------------------------- */

    document.addEventListener(
        'contextmenu',
        event => {

            event.preventDefault();

        }
    );


    /* ---------------------------------------------
       Copy
       --------------------------------------------- */

    document.addEventListener(
        'copy',
        event => {

            const target =
                event.target;


            const isCopyArea =
                target &&
                target.id ===
                'temp-copy-area';


            if (
                !isCopyArea &&
                window.getSelection &&
                window.getSelection()
                    .toString()
                    .length > 0
            ) {

                event.preventDefault();

            }

        }
    );


    /* ---------------------------------------------
       Keyboard protection
       --------------------------------------------- */

    document.addEventListener(
        'keydown',
        event => {

            const key =
                String(
                    event.key || ''
                ).toUpperCase();


            const target =
                event.target;


            const isCopyArea =
                target &&
                target.id ===
                'temp-copy-area';


            /* -----------------------------------------
               개발자 도구 / 소스 보기
               ----------------------------------------- */

            if (

                key === 'F12' ||

                (
                    event.ctrlKey &&
                    event.shiftKey &&
                    (
                        key === 'I' ||
                        key === 'J'
                    )
                ) ||

                (
                    event.ctrlKey &&
                    key === 'U'
                )

            ) {

                event.preventDefault();

                return;

            }


            /* -----------------------------------------
               선택 텍스트가 있는 경우
               Ctrl+C / Ctrl+S / Ctrl+P 제한
               ----------------------------------------- */

            if (

                event.ctrlKey &&

                (
                    key === 'C' ||
                    key === 'S' ||
                    key === 'P'
                ) &&

                !isCopyArea &&

                window.getSelection &&
                window.getSelection()
                    .toString()
                    .length > 0

            ) {

                event.preventDefault();

            }

        }
    );

}



/* =====================================================
   13. MOUSE ORB
   ===================================================== */

function initMouseOrb() {

    const orb =
        document.getElementById(
            'mouse-orb'
        );


    if (!orb) return;


    /* 모바일에서는 불필요 */

    if (
        window.matchMedia &&
        window.matchMedia(
            '(max-width: 900px)'
        ).matches
    ) {

        return;

    }


    document.addEventListener(
        'mousemove',
        event => {

            orb.style.left =
                event.clientX + 'px';


            orb.style.top =
                event.clientY + 'px';

        },
        {
            passive: true
        }
    );

}



/* =====================================================
   14. SERVICE WORKER
   ===================================================== */

if (
    'serviceWorker' in navigator
) {

    window.addEventListener(
        'load',
        () => {

            navigator.serviceWorker
                .register('/sw.js')

                .then(
                    () => {

                        console.log(
                            '[main.js] ServiceWorker registered'
                        );

                    }
                )

                .catch(
                    err => {

                        console.warn(
                            '[main.js] ServiceWorker failed',
                            err
                        );

                    }
                );

        }
    );

}



/* =====================================================
   15. ENTRY POINT
   ===================================================== */

if (
    document.readyState ===
    'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        loadComponents
    );

} else {

    loadComponents();

}
