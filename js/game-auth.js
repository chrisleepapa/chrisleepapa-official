/** Shared account auth for game pages. */
'use strict';
(() => {
    const GAME_PAGES = new Set(['game','booktop','fiveinrow','curling','tetris','switch']);
    const page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/i, '').toLowerCase();
    if (!GAME_PAGES.has(page)) return;
    let accountInitials = '';

    function loadAuth() {
        if (window.CLPAuth) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const s = document.createElement('script'); s.src = '/js/auth.js'; s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
        });
    }

    function addModalStyles() {
        if (document.getElementById('clp-game-auth-style')) return;
        const style = document.createElement('style'); style.id = 'clp-game-auth-style';
        style.textContent = `
#clp-game-auth{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:24px;background:rgba(2,2,5,.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
#clp-game-auth .clp-auth-card{width:min(430px,calc(100vw - 36px));box-sizing:border-box;padding:38px 34px 34px;border:1px solid rgba(201,168,76,.38);border-radius:22px;background:linear-gradient(150deg,#17161b 0%,#0c0c10 100%);box-shadow:0 30px 90px rgba(0,0,0,.65);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
#clp-game-auth .clp-auth-mark{width:52px;height:52px;margin:0 auto 18px;border:1px solid rgba(201,168,76,.65);border-radius:50%;display:grid;place-items:center;color:#c9a84c;font-size:22px}
#clp-game-auth h2{margin:0;text-align:center;color:#f7f4ec;font-size:1.55rem;font-weight:700;letter-spacing:.02em}
#clp-game-auth .clp-auth-desc{margin:10px 0 28px;text-align:center;color:#aaa7b0;font-size:.95rem;line-height:1.65}
#clp-game-auth .clp-auth-label{display:block;margin:0 0 8px;color:#d0ccd4;font-size:.86rem;font-weight:700}
#clp-game-auth .clp-auth-hint{font-weight:400;color:#85828b;margin-left:5px}
#clp-game-auth input{display:block;width:100%;height:56px;box-sizing:border-box;margin:0 0 18px;padding:0 16px;border:1px solid rgba(255,255,255,.14);border-radius:11px;background:#1b1b21;color:#fff;outline:none;font-size:1.08rem}
#clp-game-auth input:focus{border-color:rgba(201,168,76,.85);box-shadow:0 0 0 4px rgba(201,168,76,.1)}
#clp-game-auth #clp-game-login-initials{text-transform:uppercase;letter-spacing:.28em;text-align:center;font-weight:650}
#clp-game-auth #clp-game-login-pin{letter-spacing:.42em;text-align:center;font-weight:650}
#clp-game-auth button{display:block;width:100%;height:56px;margin-top:4px;border:0;border-radius:11px;background:#c9a84c;color:#0a0907;font-size:1rem;font-weight:800;cursor:pointer}
#clp-game-auth button:hover{filter:brightness(1.06)}
#clp-game-auth #clp-game-auth-error{min-height:22px;margin-top:12px;text-align:center;color:#ef9b9b;font-size:.88rem}
@media(max-width:460px){#clp-game-auth{padding:16px}#clp-game-auth .clp-auth-card{width:100%;padding:32px 22px 28px;border-radius:19px}#clp-game-auth h2{font-size:1.4rem}}
        `;
        document.head.appendChild(style);
    }

    function isAccountField(el) {
        if (!el || el.tagName !== 'INPUT' || el.type === 'hidden') return false;
        if (el.id === 'clp-game-login-initials' || el.id === 'clp-game-login-pin') return false;
        return !!el.matches('#player-initial, #player-initials, #initialsInput, #playerInitials, [name="initial"], [name="initials"], .initials-input, input[id*="initial" i], input[name*="initial" i]');
    }
    function findAccountFields() { return Array.from(document.querySelectorAll('input')).filter(isAccountField); }
    function markAccountField(input) {
        if (!input || !accountInitials) return;
        input.value = accountInitials; input.readOnly = true; input.setAttribute('readonly','readonly'); input.setAttribute('aria-readonly','true'); input.setAttribute('tabindex','-1'); input.setAttribute('title','로그인된 계정 이니셜');
        input.style.setProperty('caret-color','transparent','important'); input.style.setProperty('cursor','default','important'); input.style.setProperty('user-select','none','important'); input.style.setProperty('-webkit-user-select','none','important'); input.style.setProperty('pointer-events','none','important'); input.classList.add('clp-account-initials');
    }
    function protectAccountFields() { if (accountInitials) findAccountFields().forEach(markAccountField); }
    function blockUserEditing(event) {
        const target=event.target; if(!isAccountField(target))return;
        if(event.type==='focusin'){markAccountField(target);target.blur();return;}
        event.preventDefault();event.stopImmediatePropagation();markAccountField(target);
    }
    ['beforeinput','input','keydown','paste','cut','drop','mousedown','mouseup','click','focusin'].forEach(type=>document.addEventListener(type,blockUserEditing,true));

    function showLogin() {
        addModalStyles();
        const wrap=document.createElement('div'); wrap.id='clp-game-auth';
        wrap.innerHTML=`<div class="clp-auth-card"><div class="clp-auth-mark">✦</div><h2>게임 로그인</h2><p class="clp-auth-desc">사이트 공통 계정으로 로그인하세요.</p><form autocomplete="on"><label class="clp-auth-label" for="clp-game-login-initials">이니셜 <span class="clp-auth-hint">영문 3글자</span></label><input id="clp-game-login-initials" maxlength="3" minlength="3" pattern="[A-Za-z]{3}" placeholder="ABC" autocomplete="username" autocapitalize="characters" required><label class="clp-auth-label" for="clp-game-login-pin">PIN <span class="clp-auth-hint">숫자 4자리</span></label><input id="clp-game-login-pin" maxlength="4" minlength="4" pattern="[0-9]{4}" inputmode="numeric" type="password" placeholder="1234" autocomplete="current-password" required><button type="submit">로그인</button><div id="clp-game-auth-error" aria-live="polite"></div></form></div>`;
        document.body.appendChild(wrap);
        const form=wrap.querySelector('form');
        form.addEventListener('submit',async e=>{e.preventDefault();const error=wrap.querySelector('#clp-game-auth-error');error.textContent='';const r=await window.CLPAuth.login(wrap.querySelector('#clp-game-login-initials').value,wrap.querySelector('#clp-game-login-pin').value,true);if(!r.ok){error.textContent=r.error||'로그인 정보를 확인해주세요.';return;}wrap.remove();location.reload();});
    }
    async function init(){try{await loadAuth();if(!window.CLPAuth||!window.CLPAuth.isLoggedIn()){showLogin();return;}const user=window.CLPAuth.getUser();accountInitials=String(user?.initials||'').trim().toUpperCase();if(!accountInitials)return;const apply=()=>protectAccountFields();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();setTimeout(apply,300);setTimeout(apply,1000);}catch(e){console.error('[game-auth]',e);}}
    init();
})();
