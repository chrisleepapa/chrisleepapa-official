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

  function openLogin() {
    window.CLPAuth?.showLoginModal({
      prefix: 'clp-header-login',
      onSuccess: () => window.location.reload()
    });
  }

  function addStyles() {
    if (document.getElementById('clp-site-auth-ui-style')) return;
    const style = document.createElement('style');
    style.id = 'clp-site-auth-ui-style';
    style.textContent = `
      #clp-site-account-bar{width:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;padding:12px 16px;margin:0 auto;background:rgba(3,3,5,.72);border-top:1px solid rgba(201,168,76,.12);border-bottom:1px solid rgba(201,168,76,.12);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
      #clp-site-account-inner{width:min(900px,100%);display:flex;align-items:center;justify-content:flex-end;gap:8px;box-sizing:border-box}
      #clp-site-account-label{margin-right:auto;color:#777;font:500 .62rem/1.5 'Noto Sans KR',sans-serif;letter-spacing:.12em}
      #clp-site-account-id{display:none;align-items:center;justify-content:center;min-width:36px;height:30px;padding:0 10px;border:1px solid rgba(201,168,76,.42);border-radius:15px;color:#c9a84c;background:rgba(201,168,76,.06);font:600 .68rem/1 'Noto Sans KR',sans-serif;letter-spacing:.12em}
      #clp-site-account-bar button{height:30px;border:1px solid rgba(255,255,255,.14);border-radius:15px;padding:0 12px;background:transparent;color:#aaa;cursor:pointer;font:500 .62rem/1 'Noto Sans KR',sans-serif;letter-spacing:.05em;white-space:nowrap}
      #clp-site-account-bar button:hover{color:#eee;border-color:rgba(201,168,76,.35)}
      #clp-site-account-bar .clp-login-btn{color:#c9a84c;border-color:rgba(201,168,76,.35)}
      @media(max-width:700px){
        #clp-site-account-bar{padding:10px 12px}
        #clp-site-account-inner{justify-content:flex-end;gap:6px}
        #clp-site-account-label{font-size:.56rem;letter-spacing:.07em}
        #clp-site-account-bar button{height:28px;padding:0 9px;font-size:.58rem}
        #clp-site-account-id{height:28px;min-width:32px;padding:0 8px;font-size:.6rem}
      }
    `;
    document.head.appendChild(style);
  }

  function findInsertionPoint() {
    const hero = document.getElementById('project-page-image-hero');
    if (hero) return hero;
    const sqHero = document.querySelector('.sq-hero');
    if (sqHero) return sqHero;
    return document.querySelector('.page-header');
  }

  function createBar() {
    if (document.getElementById('clp-site-account-bar')) return document.getElementById('clp-site-account-bar');
    const point = findInsertionPoint();
    if (!point || !point.parentNode) return null;

    const bar = document.createElement('div');
    bar.id = 'clp-site-account-bar';
    bar.innerHTML = `
      <div id="clp-site-account-inner">
        <span id="clp-site-account-label">PERSONAL ACCOUNT</span>
        <span id="clp-site-account-id" aria-label="Account ID"></span>
        <button type="button" id="clp-site-account-btn" class="clp-login-btn">LOGIN</button>
      </div>`;
    point.parentNode.insertBefore(bar, point.nextSibling);
    bar.querySelector('#clp-site-account-btn').onclick = openLogin;
    return bar;
  }

  function render() {
    const id = document.getElementById('clp-site-account-id');
    const button = document.getElementById('clp-site-account-btn');
    if (!id || !button) return;
    const user = window.CLPAuth?.getUser?.();
    if (user?.initials) {
      id.textContent = user.initials;
      id.style.display = 'inline-flex';
      button.textContent = 'LOG OUT';
      button.classList.remove('clp-login-btn');
      button.onclick = () => {
        window.CLPAuth.logout();
        window.location.reload();
      };
    } else {
      id.textContent = '';
      id.style.display = 'none';
      button.textContent = 'LOGIN';
      button.classList.add('clp-login-btn');
      button.onclick = openLogin;
    }
  }

  function initUI() {
    addStyles();
    const bar = createBar();
    if (!bar) {
      setTimeout(initUI, 250);
      return;
    }
    render();
    window.addEventListener('chrisleepapa-auth-change', render);
  }

  function init() { loadAuth().then(initUI).catch(() => {}); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
