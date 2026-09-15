(() => {
  'use strict';

  function loadAuth() {
    if (window.CLPAuth) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-clp-shared-auth]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = '/js/auth.js?v=20260915-1';
      script.async = false;
      script.dataset.clpSharedAuth = 'true';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function addStyles() {
    if (document.getElementById('clp-site-auth-ui-style')) return;
    const style = document.createElement('style');
    style.id = 'clp-site-auth-ui-style';
    style.textContent = `
      #clp-site-account{display:flex;align-items:center;gap:7px;margin-left:8px}
      #clp-site-account .clp-account-id{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:30px;padding:0 9px;border:1px solid rgba(201,168,76,.42);border-radius:15px;color:#c9a84c;background:rgba(201,168,76,.06);font:600 .68rem/1 'Noto Sans KR',sans-serif;letter-spacing:.12em}
      #clp-site-account button{height:30px;border:1px solid rgba(255,255,255,.14);border-radius:15px;padding:0 9px;background:transparent;color:#aaa;cursor:pointer;font:500 .62rem/1 'Noto Sans KR',sans-serif;letter-spacing:.05em;white-space:nowrap}
      #clp-site-account button:hover{color:#eee;border-color:rgba(201,168,76,.35)}
      #clp-site-account .clp-login-btn{color:#c9a84c;border-color:rgba(201,168,76,.35)}
      #clp-mobile-account{display:none;align-items:center;gap:6px;margin-left:4px}
      #clp-mobile-account .clp-account-id{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:28px;padding:0 8px;border:1px solid rgba(201,168,76,.42);border-radius:14px;color:#c9a84c;background:rgba(201,168,76,.06);font:600 .62rem/1 'Noto Sans KR',sans-serif;letter-spacing:.1em}
      #clp-mobile-account button{height:28px;border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:0 8px;background:transparent;color:#aaa;font:500 .58rem/1 'Noto Sans KR',sans-serif;white-space:nowrap}
      #clp-mobile-account .clp-login-btn{color:#c9a84c;border-color:rgba(201,168,76,.35)}
      @media(max-width:760px){
        #clp-site-account{display:none}
        #clp-mobile-account{display:flex}
      }
      @media(min-width:761px){
        #clp-mobile-account{display:none}
      }
    `;
    document.head.appendChild(style);
  }

  function makeAccount(containerId, mobile) {
    const container = document.getElementById(containerId);
    if (!container || container.querySelector('.clp-account-id, .clp-login-btn')) return;
    const id = document.createElement('span');
    id.className = 'clp-account-id';
    id.setAttribute('aria-label', 'Account ID');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'clp-login-btn';
    button.textContent = 'LOGIN';
    button.addEventListener('click', () => window.CLPAuth?.showLoginModal({
      prefix: mobile ? 'clp-mobile-login' : 'clp-header-login',
      onSuccess: render
    }));
    container.append(id, button);
    container._clpId = id;
    container._clpButton = button;
  }

  function render() {
    const user = window.CLPAuth?.getUser?.();
    const containers = [document.getElementById('clp-site-account'), document.getElementById('clp-mobile-account')].filter(Boolean);
    containers.forEach(container => {
      const id = container._clpId;
      const button = container._clpButton;
      if (!id || !button) return;
      if (user?.initials) {
        id.textContent = user.initials;
        id.style.display = 'inline-flex';
        button.textContent = 'LOG OUT';
        button.classList.remove('clp-login-btn');
        button.onclick = () => {
          window.CLPAuth.logout();
          render();
        };
      } else {
        id.textContent = '';
        id.style.display = 'none';
        button.textContent = 'LOGIN';
        button.classList.add('clp-login-btn');
        button.onclick = () => window.CLPAuth?.showLoginModal({
          prefix: container.id === 'clp-mobile-account' ? 'clp-mobile-login' : 'clp-header-login',
          onSuccess: render
        });
      }
    });
  }

  function initUI() {
    addStyles();
    const navRight = document.querySelector('#main-nav .nav-right');
    if (navRight && !document.getElementById('clp-site-account')) {
      const account = document.createElement('div');
      account.id = 'clp-site-account';
      navRight.insertBefore(account, navRight.firstChild);
    }
    const mobileTools = document.getElementById('mobileHeaderTools');
    if (mobileTools && !document.getElementById('clp-mobile-account')) {
      const account = document.createElement('div');
      account.id = 'clp-mobile-account';
      mobileTools.insertBefore(account, mobileTools.firstChild);
    }
    makeAccount('clp-site-account', false);
    makeAccount('clp-mobile-account', true);
    render();
    window.addEventListener('chrisleepapa-auth-change', render);
  }

  function init() {
    loadAuth().then(initUI).catch(() => {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
