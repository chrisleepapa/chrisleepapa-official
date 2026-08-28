/**
 * js/main.js — Chris LEE.PAPA Official Site
 * Cleaned for the develop branch.
 *
 * Responsibilities:
 *  - Load shared header/footer
 *  - Initialize shared navigation, language, share, security and UI behavior
 *  - Load only the page-specific scripts that actually belong to the current page
 *  - Keep SISTER SQUAD HUB, SISTER SQUAD 2 and other pages isolated
 */
'use strict';

const BASE_I18N = {
  ko: {
    nav_home: 'Home', nav_works: 'Works', nav_faith: 'Faith', nav_squad: 'Sister Squad',
    nav_play: 'Play', nav_journal: 'Journal', nav_about: 'About', nav_music: 'Music',
    nav_movie: 'Movies', nav_bible: 'Bible', nav_worship: 'Worship',
    nav_today: 'Today', nav_squad_short: 'SQUAD', nav_squad_1: 'SISTER SQUAD',
    nav_squad_2: 'SISTER SQUAD 2', nav_game: 'GAME', share_title: 'SHARE ARCHIVE',
    share_desc: '이곳의 기록과 영감을 소중한 사람들에게 전하세요.', share_copy: 'COPY LINK',
    share_sns: 'SNS SHARE', share_close: 'Close', footer_text: '© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',
    footer_privacy: '개인정보처리방침', footer_terms: '이용약관', toast_copy: '링크가 복사되었습니다 ✓',
    toast_error: '지원하지 않는 브라우저입니다.'
  },
  en: {
    nav_home: 'Home', nav_works: 'Works', nav_faith: 'Faith', nav_squad: 'Sister Squad',
    nav_play: 'Play', nav_journal: 'Journal', nav_about: 'About', nav_music: 'Music',
    nav_movie: 'Movies', nav_bible: 'Bible', nav_worship: 'Worship',
    nav_today: 'Today', nav_squad_short: 'SQUAD', nav_squad_1: 'SISTER SQUAD',
    nav_squad_2: 'SISTER SQUAD 2', nav_game: 'GAME', share_title: 'SHARE ARCHIVE',
    share_desc: 'Share the records and inspiration here with your loved ones.', share_copy: 'COPY LINK',
    share_sns: 'SNS SHARE', share_close: 'Close', footer_text: '© 2026 Chris LEE.PAPA — The Creative Archive. All rights reserved.',
    footer_privacy: 'Privacy Policy', footer_terms: 'Terms of Use', toast_copy: 'Link copied ✓',
    toast_error: 'Sharing is not supported in this browser.'
  }
};

let i18n = { ko: { ...BASE_I18N.ko }, en: { ...BASE_I18N.en } };
let currentLang = 'ko';

/* =========================================================
   PATH / RESOURCE HELPERS
   ========================================================= */
function getSiteRoot() {
  const script = document.querySelector('script[src*="main.js"]');
  if (script && script.src) {
    try { return new URL('../', script.src).href; } catch (_) {}
  }
  return new URL('/', document.baseURI).href;
}

function getSiteFileUrl(file) {
  return new URL(String(file).replace(/^\//, ''), getSiteRoot()).href;
}

async function loadComponent(id, file) {
  const target = document.getElementById(id);
  if (!target) return false;

  try {
    const response = await fetch(getSiteFileUrl(file), { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    target.innerHTML = await response.text();
    return true;
  } catch (error) {
    console.warn(`[main.js] component load failed: ${file}`, error);
    return false;
  }
}

function getSavedLanguage() {
  try {
    const saved = localStorage.getItem('pref-lang');
    return saved === 'en' || saved === 'ko' ? saved : 'ko';
  } catch (_) {
    return 'ko';
  }
}

function getCurrentPageKey() {
  let path = (window.location.pathname || '/')
    .split('?')[0]
    .split('#')[0]
    .replace(/\/+$/, '');

  if (!path) return 'index';

  return ((path.split('/').pop() || 'index')
    .replace(/\.html$/i, '') || 'index').toLowerCase();
}

function loadScriptOnce(src, id) {
  if (id && document.getElementById(id)) return;
  if ([...document.scripts].some(script => script.src === new URL(src, document.baseURI).href)) return;

  const script = document.createElement('script');
  if (id) script.id = id;
  script.src = src;
  script.defer = true;
  document.head.appendChild(script);
}

/* =========================================================
   PAGE-SPECIFIC SCRIPT ROUTING

   IMPORTANT:
   The previous version used pathname.includes('sistersquad'),
   which caused /sistersquad-hub to also load the SISTER SQUAD 1
   content script. That script is not present in develop and caused
   an unnecessary 404. Page routing is now exact and isolated.
   ========================================================= */
function loadPageSpecificScripts() {
  const page = getCurrentPageKey();

  // SISTER SQUAD HUB only.
  if (page === 'sistersquad-hub') {
    const card = document.querySelector('.sq-links .sq-link:nth-child(1)');
    if (card) {
      card.style.backgroundImage = "url('/images/sistersquad1.png?v=20260828')";
    }

    loadScriptOnce('/js/sistersquad-hub-i18n.js?v=20260827', 'sistersquad-hub-i18n');
    return;
  }

  // SISTER SQUAD 2 only.
  if (page === 'sistersquad2') {
    loadScriptOnce('/js/sistersquad2-ost.js?v=20260826', 'sistersquad2-ost');
    return;
  }

  // SISTER SQUAD 1 intentionally has no dynamic content script here.
  // Its page content is already present in sistersquad.html.
}

/* =========================================================
   COMPONENT BOOTSTRAP
   ========================================================= */
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
  initBibleLogout();
  initSecurity();
  initMouseOrb();

  setLanguage(getSavedLanguage());
  loadPageSpecificScripts();

  if (typeof window.onMainReady === 'function') {
    window.onMainReady();
  }
}

/* =========================================================
   SCROLL / NAVIGATION
   ========================================================= */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = () => {
    const scroll = window.scrollY || window.pageYOffset || 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? Math.max(0, Math.min(100, (scroll / max) * 100)) : 0;
    bar.style.width = `${percent}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const update = () => nav.classList.toggle('scrolled', (window.scrollY || 0) > 40);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function closeDesktopDropdowns(except = null) {
  document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper => {
    if (wrapper === except) return;

    wrapper.classList.remove('active');
    const trigger = wrapper.querySelector('.nav-dropdown-trigger');
    if (trigger) {
      trigger.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

function initDesktopDropdowns() {
  document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper => {
    const trigger = wrapper.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const open = !wrapper.classList.contains('active');
      closeDesktopDropdowns(wrapper);
      wrapper.classList.toggle('active', open);
      trigger.classList.toggle('active', open);
      trigger.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-dropdown-wrapper') &&
        !event.target.closest('.lang-dropdown-wrapper')) {
      closeDesktopDropdowns();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeDesktopDropdowns();
  });
}

function initMobileMenu() {
  const moreBtn = document.getElementById('mobileMoreBtn');
  const morePanel = document.getElementById('mobileMoreOverlay');
  const faithBtn = document.querySelector('[data-mobile-menu="faith"]');
  const faithPanel = document.getElementById('mobileFaithMenu');
  const projectsBtn = document.querySelector('[data-mobile-menu="squad"]');
  const projectsPanel = document.getElementById('mobileSquadMenu');

  const panels = [morePanel, faithPanel, projectsPanel].filter(Boolean);
  const buttons = [moreBtn, faithBtn, projectsBtn].filter(Boolean);

  const closeAll = () => {
    panels.forEach(panel => {
      panel.classList.remove('active');
      panel.setAttribute('aria-hidden', 'true');
    });
    buttons.forEach(button => button.setAttribute('aria-expanded', 'false'));
    document.body.classList.remove('mobile-panel-open');
  };

  const openPanel = (panel, button) => {
    closeAll();
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
    if (button) button.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-panel-open');
  };

  [[moreBtn, morePanel], [faithBtn, faithPanel], [projectsBtn, projectsPanel]].forEach(([button, panel]) => {
    if (!button || !panel) return;

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      panel.classList.contains('active') ? closeAll() : openPanel(panel, button);
    });
  });

  document.querySelectorAll('#mobileMoreClose,#mobileSquadClose,.mobile-submenu-close')
    .forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      closeAll();
    }));

  panels.forEach(panel => {
    panel.addEventListener('click', event => {
      if (event.target === panel) closeAll();
    });

    panel.querySelectorAll('a').forEach(link => link.addEventListener('click', closeAll));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeAll();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeAll();
  });
}

/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */
function markActivePage(page) {
  document.querySelectorAll('[data-page]').forEach(link => {
    link.classList.toggle('active', (link.dataset.page || '').toLowerCase() === page);
  });
}

function activateDropdownContaining(selector) {
  document.querySelectorAll('.nav-dropdown-wrapper').forEach(wrapper => {
    const trigger = wrapper.querySelector('.nav-dropdown-trigger');
    const active = !!wrapper.querySelector(selector);

    wrapper.classList.toggle('active', active);
    if (trigger) {
      trigger.classList.toggle('active', active);
      trigger.setAttribute('aria-expanded', String(active));
    }
  });
}

function initActiveNavLink() {
  const page = getCurrentPageKey();
  markActivePage(page);

  const projectPages = [
    'sistersquad-hub', 'sistersquad', 'sistersquad2', 'world-lore',
    'game', 'gameinfo', 'miracleshot', 'music', 'movie'
  ];
  const faithPages = ['bible', 'worship'];
  const morePages = ['journal', 'about', 'privacy', 'terms'];

  const projectActive = projectPages.includes(page);
  const faithActive = faithPages.includes(page);
  const moreActive = morePages.includes(page);

  if (projectActive) {
    activateDropdownContaining(
      `[data-page="${page}"], [href*="sistersquad"], [href*="world-lore"], [href*="gameinfo"], [href*="miracleshot"], [href*="music"], [href*="movie"]`
    );
  }

  if (faithActive) {
    activateDropdownContaining(`[data-page="${page}"]`);
  }

  document.querySelectorAll('[data-mobile-menu="squad"]')
    .forEach(button => button.classList.toggle('active', projectActive));

  document.querySelectorAll('[data-mobile-menu="faith"]')
    .forEach(button => button.classList.toggle('active', faithActive));

  document.querySelectorAll('#mobileMoreBtn')
    .forEach(button => button.classList.toggle('active', moreActive));

  document.querySelectorAll('#mobileSquadMenu [href],#mobileFaithMenu [href],#mobileMoreOverlay [href]')
    .forEach(link => {
      const href = (link.getAttribute('href') || '')
        .replace(/^\//, '')
        .replace(/\.html$/i, '')
        .replace(/\/$/, '')
        .toLowerCase();
      link.classList.toggle('active', href === page);
    });

  if (page === 'today') {
    document.querySelectorAll('[data-page="today"]').forEach(link => link.classList.add('active'));
  }
}

/* =========================================================
   LANGUAGE
   ========================================================= */
function initLangDropdown() {
  [['langWrapper', 'langToggleBtn'], ['mobileLangWrapper', 'mobileLangToggleBtn']]
    .forEach(([wrapperId, toggleId]) => {
      const wrapper = document.getElementById(wrapperId);
      const toggle = document.getElementById(toggleId);
      if (!wrapper || !toggle) return;

      toggle.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();

        const open = !wrapper.classList.contains('active');
        document.querySelectorAll('.lang-dropdown-wrapper').forEach(w => w.classList.remove('active'));
        wrapper.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
      });

      wrapper.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          setLanguage(button.dataset.lang);
        });
      });
    });

  document.addEventListener('click', event => {
    document.querySelectorAll('.lang-dropdown-wrapper').forEach(wrapper => {
      if (!wrapper.contains(event.target)) {
        wrapper.classList.remove('active');
        const toggle = wrapper.querySelector('.lang-current');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function setLanguage(lang) {
  currentLang = i18n[lang] ? lang : 'ko';
  document.documentElement.lang = currentLang;

  try { localStorage.setItem('pref-lang', currentLang); } catch (_) {}

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    if (i18n[currentLang][key] !== undefined) {
      element.innerHTML = i18n[currentLang][key];
    }
  });

  const dict = i18n[currentLang];
  if (dict.meta_title) document.title = dict.meta_title;

  [
    ['meta[name="description"]', 'meta_description'],
    ['meta[property="og:title"]', 'og_title'],
    ['meta[property="og:description"]', 'og_description'],
    ['meta[name="twitter:title"]', 'twitter_title'],
    ['meta[name="twitter:description"]', 'twitter_description']
  ].forEach(([selector, key]) => {
    const element = document.querySelector(selector);
    if (element && dict[key]) element.setAttribute('content', dict[key]);
  });

  document.querySelectorAll('.lang-btn')
    .forEach(button => button.classList.toggle('active', button.dataset.lang === currentLang));

  const text = currentLang === 'ko' ? 'KOR' : 'ENG';
  const desktop = document.getElementById('currentLangText');
  const mobile = document.getElementById('mobileCurrentLangText');
  if (desktop) desktop.textContent = text;
  if (mobile) mobile.textContent = text;

  document.querySelectorAll('.lang-dropdown-wrapper').forEach(wrapper => wrapper.classList.remove('active'));
  document.querySelectorAll('.lang-current').forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));

  if (typeof window.onLangChange === 'function') {
    window.onLangChange(currentLang);
  }
}

window.setLanguage = setLanguage;
window.getCurrentLang = () => currentLang;

/* =========================================================
   SHARE MODAL
   ========================================================= */
function initShareModal() {
  const overlay = document.getElementById('shareOverlay');
  if (!overlay) return;

  const openButton = document.getElementById('shareOpenBtn');
  const closeButton = document.getElementById('shareCloseBtn');
  const copyButton = document.getElementById('shareCopyBtn');
  const snsButton = document.getElementById('shareSNSBtn');

  const close = () => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (!overlay.classList.contains('active')) overlay.style.display = 'none';
    }, 300);
  };

  const open = () => {
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => overlay.classList.add('active'));
  };

  if (openButton) openButton.addEventListener('click', open);
  if (closeButton) closeButton.addEventListener('click', close);
  overlay.addEventListener('click', event => {
    if (event.target === overlay) close();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay.classList.contains('active')) close();
  });

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const url = window.location.href;
      let ok = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(url);
          ok = true;
        } catch (_) {}
      }

      if (!ok) {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try { ok = document.execCommand('copy'); } catch (_) {}
        textarea.remove();
      }

      if (ok) showToast(i18n[currentLang].toast_copy);
      close();
    });
  }

  if (snsButton) {
    snsButton.addEventListener('click', async () => {
      if (!navigator.share) {
        showToast(i18n[currentLang].toast_error);
        return;
      }

      try {
        await navigator.share({
          title: document.title || 'Chris LEE.PAPA',
          text: 'Chris LEE.PAPA',
          url: window.location.href
        });
      } catch (_) {}
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.style.display = 'block';
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

window.showToast = showToast;

/* =========================================================
   BIBLE LOGOUT
   ========================================================= */
function initBibleLogout() {
  document.querySelectorAll(
    '#logoutBtn,#logoutButton,[data-action="logout"],[data-logout],.logout-btn,.logout-button'
  ).forEach(button => {
    if (button.dataset.logoutBound === 'true') return;
    button.dataset.logoutBound = 'true';

    button.addEventListener('click', event => {
      event.preventDefault();

      try {
        Object.keys(localStorage)
          .filter(key => /bible|auth|user|login|session/i.test(key))
          .forEach(key => localStorage.removeItem(key));
        Object.keys(sessionStorage).forEach(key => sessionStorage.removeItem(key));
      } catch (_) {}

      if (typeof window.onBibleLogout === 'function') {
        window.onBibleLogout();
      } else {
        window.location.href = '/bible';
      }
    });
  });
}

window.initBibleLogout = initBibleLogout;

/* =========================================================
   SECURITY / VISUAL EFFECTS
   ========================================================= */
function initSecurity() {
  document.addEventListener('contextmenu', event => {
    if (event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
    event.preventDefault();
  });

  document.addEventListener('copy', event => {
    if (event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
    if (window.getSelection && window.getSelection().toString()) event.preventDefault();
  });

  document.addEventListener('keydown', event => {
    if (event.target.closest && event.target.closest('input,textarea,select,[contenteditable="true"]')) return;

    const key = String(event.key || '').toUpperCase();

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
      ['C', 'S', 'P'].includes(key) &&
      window.getSelection &&
      window.getSelection().toString()
    ) {
      event.preventDefault();
    }
  });
}

function initMouseOrb() {
  const orb = document.getElementById('mouse-orb');
  if (!orb || !window.matchMedia || !window.matchMedia('(min-width:901px)').matches) return;

  document.addEventListener('mousemove', event => {
    orb.style.left = `${event.clientX}px`;
    orb.style.top = `${event.clientY}px`;
  }, { passive: true });
}

/* =========================================================
   SERVICE WORKER
   ========================================================= */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('[main.js] ServiceWorker registered'))
      .catch(error => console.warn('[main.js] ServiceWorker failed', error));
  });
}

/* =========================================================
   BOOT
   ========================================================= */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}
