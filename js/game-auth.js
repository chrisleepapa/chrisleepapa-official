/** Shared account auth for game pages. Uses the exact TODAY login visual style. */
'use strict';
(() => {
    const GAME_PAGES = new Set(['game','booktop','fiveinrow','curling','tetris','switch']);
    const page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/i, '').toLowerCase();
    if (!GAME_PAGES.has(page)) return;
    let accountInitials = '';

    function loadAuth() {
        if (window.CLPAuth) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = '/js/auth.js'; s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
        });
    }

    function addModalStyles() {
        if (document.getElementById('clp-game-auth-style')) return;
        const style = document.createElement('style'); style.id = 'clp-game-auth-style';
        style.textContent = `
#clp-game-auth{position:fixed;inset:0;z-index:5000;background:rgba(0,0,0,.82);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:20px}
#clp-game-auth .auth-box{width:min(420px,92vw);box-sizing:border-box;background:#0a0a0f;border:1px solid rgba(201,168,76,.45);border-radius:22px;padding:30px;box-shadow:0 30px 80px #000;font-family:'Noto Sans KR',system-ui,sans-serif}
#clp-game-auth .auth-box h2{text-align:center;color:#e8d08a;font:600 1.3rem 'Cinzel',serif;letter-spacing:.1em;margin:0 0 8px}
#clp-game-auth .auth-box p{text-align:center;color:#888;font:.82rem 'Noto Sans KR',sans-serif;line-height:1.7;margin:0 0 22px}
#clp-game-auth .auth-input{width:100%;height:46px;box-sizing:border-box;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.12);border-radius:10px;color:#eee;padding:11px 12px;outline:none;text-align:center;margin-bottom:12px;font-size:1rem}
#clp-game-auth .auth-input:focus{border-color:rgba(201,168,76,.55)}
#clp-game-auth .auth-input:first-of-type{text-transform:uppercase;letter-spacing:.16em}
#clp-game-auth .pin-input{letter-spacing:8px;font-weight:bold}
#clp-game-auth .auth-submit{width:100%;height:46px;border:1px solid rgba(201,168,76,.4);border-radius:10px;padding:0 15px;color:#c9a84c;background:transparent;cursor:pointer;white-space:nowrap;font-size:.9rem;font-weight:600;margin-top:5px}
#clp-game-auth .auth-submit:hover{background:rgba(201,168,76,.1)}
#clp-game-auth .auth-error{color:#e89b8a;text-align:center;min-height:20px;font:.75rem 'Noto Sans KR',sans-serif;margin:7px 0}
#clp-game-auth .auth-note{text-align:center!important;margin:15px 0 0!important;font-size:.72rem!important;color:#666!important}
@media(max-width:700px){#clp-game-auth .auth-box{padding:25px}}
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
        input.value=accountInitials; input.readOnly=true; input.setAttribute('readonly','readonly'); input.setAttribute('aria-readonly','true'); input.setAttribute('tabindex','-1'); input.setAttribute('title','로그인된 계정 이니셜');
        input.style.setProperty('caret-color','transparent','important'); input.style.setProperty('cursor','default','important'); input.style.setProperty('user-select','none','important'); input.style.setProperty('-webkit-user-select','none','important'); input.style.setProperty('pointer-events','none','important'); input.classList.add('clp-account-initials');
    }
    function protectAccountFields(){if(accountInitials)findAccountFields().forEach(markAccountField)}
    function blockUserEditing(event){const target=event.target;if(!isAccountField(target))return;if(event.type==='focusin'){markAccountField(target);target.blur();return}event.preventDefault();event.stopImmediatePropagation();markAccountField(target)}
    ['beforeinput','input','keydown','paste','cut','drop','mousedown','mouseup','click','focusin'].forEach(type=>document.addEventListener(type,blockUserEditing,true));

    function showLogin() {
        addModalStyles();
        const wrap=document.createElement('div'); wrap.id='clp-game-auth';
        wrap.innerHTML=`<div class="auth-box"><h2>YOUR TODAY</h2><p>사이트 공통 계정으로 로그인하면<br>나만의 기록을 저장할 수 있습니다.</p><form autocomplete="on"><input class="auth-input" id="clp-game-login-initials" maxlength="3" minlength="3" pattern="[A-Za-z]{3}" autocomplete="username" autocapitalize="characters" placeholder="INITIALS (예: CLP)" required><input class="auth-input pin-input" id="clp-game-login-pin" type="password" inputmode="numeric" maxlength="4" minlength="4" pattern="[0-9]{4}" autocomplete="current-password" placeholder="4자리 PIN" required><div class="auth-error" id="clp-game-auth-error" aria-live="polite"></div><button class="auth-submit" type="submit">LOGIN / CREATE</button><p class="auth-note">한 번 로그인하면 성경 등 로그인 필요한 메뉴에서도 같은 계정을 사용합니다.</p></form></div>`;
        document.body.appendChild(wrap);
        const form=wrap.querySelector('form');
        form.addEventListener('submit',async e=>{e.preventDefault();const error=wrap.querySelector('#clp-game-auth-error');error.textContent='';const r=await window.CLPAuth.login(wrap.querySelector('#clp-game-login-initials').value,wrap.querySelector('#clp-game-login-pin').value,true);if(!r.ok){error.textContent=r.error||'로그인 정보를 확인해주세요.';return;}wrap.remove();location.reload()});
    }
    async function init(){try{await loadAuth();if(!window.CLPAuth||!window.CLPAuth.isLoggedIn()){showLogin();return}const user=window.CLPAuth.getUser();accountInitials=String(user?.initials||'').trim().toUpperCase();if(!accountInitials)return;const apply=()=>protectAccountFields();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();setTimeout(apply,300);setTimeout(apply,1000)}catch(e){console.error('[game-auth]',e)}}
    init();
})();
