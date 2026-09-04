/** Shared site authentication + shared login modal. */
'use strict';
(() => {
    const ACCOUNT_PREFIX='chrisleepapa-account-v3-', SESSION_KEY='chrisleepapa-auth-session-v3', TODAY_PREFIX='chrisleepapa-today-';
    const SUPA_URL='https://cvfmkcxmxkmemmshfttn.supabase.co', SUPA_KEY='sb_publishable_Bb_GkRPWRFeAPvIduwPTJg_O1z_sStm';
    const read=(key,fallback=null)=>{try{const v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v)}catch(_){return fallback}};
    const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch(_){return false}};
    const remove=key=>{try{localStorage.removeItem(key)}catch(_) {}};
    async function hash(value){const data=new TextEncoder().encode(value);const digest=await crypto.subtle.digest('SHA-256',data);return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('')}
    function normalizeInitials(v){return String(v||'').trim().toUpperCase()}
    function validInitials(v){return /^[A-Z]{3}$/.test(v)} function validPin(v){return /^\d{4}$/.test(String(v||''))}
    function getUser(){const s=read(SESSION_KEY,null);return s&&validInitials(s.initials)?s:null} function isLoggedIn(){return !!getUser()}
    async function supabaseRPC(name,body){try{const r=await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`,{method:'POST',headers:{apikey:SUPA_KEY,Authorization:`Bearer ${SUPA_KEY}`,'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)});if(!r.ok)return{ok:false,status:r.status};return{ok:true,data:await r.json()}}catch(_){return{ok:false,status:0}}}
    async function login(initials,pin,createIfMissing=true){initials=normalizeInitials(initials);pin=String(pin||'').trim();if(!validInitials(initials))return{ok:false,error:'이니셜은 영문 3자리로 입력해주세요.'};if(!validPin(pin))return{ok:false,error:'PIN은 숫자 4자리로 입력해주세요.'};const pinHash=await hash(pin),key=ACCOUNT_PREFIX+initials,localAccount=read(key,null);const remote=await supabaseRPC('clp_login',{p_initials:initials,p_pin_hash:pinHash,p_create_if_missing:!!createIfMissing});if(remote.ok){const result=Array.isArray(remote.data)?remote.data[0]:remote.data;if(!result||result.ok!==true)return{ok:false,error:result?.error||'로그인 정보를 확인해주세요.'}}else if(localAccount&&localAccount.pinHash!==pinHash)return{ok:false,error:'PIN이 일치하지 않습니다.'};else if(!localAccount&&!createIfMissing)return{ok:false,error:'등록되지 않은 계정입니다.'};if(!localAccount)write(key,{initials,pinHash,createdAt:new Date().toISOString()});const session={initials,pinHash,loginAt:new Date().toISOString(),backend:remote.ok?'supabase':'local-cache'};write(SESSION_KEY,session);window.dispatchEvent(new CustomEvent('chrisleepapa-auth-change',{detail:{user:session}}));await hydrateTodayFromSupabase(session);return{ok:true,user:session}}
    function logout(){remove(SESSION_KEY);window.dispatchEvent(new CustomEvent('chrisleepapa-auth-change',{detail:{user:null}}))}
    function clearLegacyTodaySession(){remove('chrisleepapa-today-session')}
    function todayKeyForUser(initials,date){return`${TODAY_PREFIX}${initials}-${date}`}
    function todayDateFromKey(key){const m=String(key||'').match(/^chrisleepapa-today-[A-Z]{3}-(\d{4}-\d{2}-\d{2})$/i);return m?m[1]:null}
    async function hydrateTodayFromSupabase(session){if(!session?.initials||!session?.pinHash)return;const date=new Date().toISOString().slice(0,10);const remote=await supabaseRPC('clp_load_today',{p_initials:session.initials,p_pin_hash:session.pinHash,p_date:date});if(!remote.ok||!remote.data)return;const data=Array.isArray(remote.data)?remote.data[0]:remote.data;if(!data||data.ok===false)return;write(todayKeyForUser(session.initials,date),data.data||{todos:[],memo:'',prayer:''})}
    let syncing=false;async function syncTodayKey(key,rawValue){if(syncing)return;const session=getUser(),date=todayDateFromKey(key);if(!session?.initials||!session?.pinHash||!date)return;let payload;try{payload=JSON.parse(rawValue)}catch(_){return}if(!payload||typeof payload!=='object')return;syncing=true;try{await supabaseRPC('clp_save_today',{p_initials:session.initials,p_pin_hash:session.pinHash,p_date:date,p_data:payload})}finally{syncing=false}}
    try{const proto=Storage.prototype,original=proto.setItem;if(!proto.__clpTodaySyncPatched){proto.setItem=function(key,value){const result=original.call(this,key,value);if(this===localStorage&&String(key).startsWith(TODAY_PREFIX))syncTodayKey(String(key),String(value));return result};Object.defineProperty(proto,'__clpTodaySyncPatched',{value:true})}}catch(_){ }

    /* One shared login modal used by TODAY, GAME and BIBLE entry points. */
    function showLoginModal(options={}){
        const existing=document.getElementById('clp-shared-login-modal'); if(existing)return;
        const prefix=options.prefix||'clp-shared';
        if(!document.getElementById('clp-shared-login-style')){const style=document.createElement('style');style.id='clp-shared-login-style';style.textContent=`
#clp-shared-login-modal{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.82);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:20px;font-family:'Noto Sans KR',system-ui,sans-serif}
#clp-shared-login-modal .auth-box{width:min(420px,92vw);box-sizing:border-box;background:#0a0a0f;border:1px solid rgba(201,168,76,.45);border-radius:22px;padding:30px;box-shadow:0 30px 80px #000}
#clp-shared-login-modal h2{text-align:center;color:#e8d08a;font:600 1.3rem 'Cinzel',serif;letter-spacing:.1em;margin:0 0 8px}
#clp-shared-login-modal p{text-align:center;color:#888;font:.82rem 'Noto Sans KR',sans-serif;line-height:1.7;margin:0 0 22px}
#clp-shared-login-modal .auth-input{width:100%;height:46px;box-sizing:border-box;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.12);border-radius:10px;color:#eee;padding:11px 12px;outline:none;text-align:center;margin-bottom:12px;font-size:1rem}
#clp-shared-login-modal .auth-input:focus{border-color:rgba(201,168,76,.55)}
#clp-shared-login-modal .pin-input{letter-spacing:8px;font-weight:bold}
#clp-shared-login-modal .auth-submit{width:100%;height:46px;border:1px solid rgba(201,168,76,.4);border-radius:10px;padding:0 15px;color:#c9a84c;background:transparent;cursor:pointer;white-space:nowrap;font-size:.9rem;font-weight:600;margin-top:5px}
#clp-shared-login-modal .auth-submit:hover{background:rgba(201,168,76,.1)}
#clp-shared-login-modal .auth-error{color:#e89b8a;text-align:center;min-height:20px;font:.75rem 'Noto Sans KR',sans-serif;margin:7px 0}
#clp-shared-login-modal .auth-note{text-align:center!important;margin:15px 0 0!important;font-size:.72rem!important;color:#666!important}
@media(max-width:700px){#clp-shared-login-modal .auth-box{padding:25px}}
        `;document.head.appendChild(style)}
        const modal=document.createElement('div');modal.id='clp-shared-login-modal';modal.innerHTML=`<div class="auth-box"><h2>YOUR ID</h2><p>나만의 기록과 경험을 이어가는<br>Chris LEE.PAPA의 개인 계정입니다.</p><form autocomplete="on"><input class="auth-input" id="${prefix}-initials" maxlength="3" minlength="3" pattern="[A-Za-z]{3}" autocomplete="username" autocapitalize="characters" placeholder="INITIALS (예: CLP)" required><input class="auth-input pin-input" id="${prefix}-pin" type="password" inputmode="numeric" maxlength="4" minlength="4" pattern="[0-9]{4}" autocomplete="current-password" placeholder="4자리 PIN" required><div class="auth-error" aria-live="polite"></div><button class="auth-submit" type="submit">LOGIN / CREATE</button><p class="auth-note">TODAY, BIBLE, GAME 등 개인 기능에서 같은 계정을 사용할 수 있습니다.</p></form></div>`;document.body.appendChild(modal);
        const form=modal.querySelector('form');form.addEventListener('submit',async e=>{e.preventDefault();const err=modal.querySelector('.auth-error');err.textContent='';const result=await login(modal.querySelector(`#${prefix}-initials`).value,modal.querySelector(`#${prefix}-pin`).value,true);if(!result.ok){err.textContent=result.error;return}modal.remove();if(typeof options.onSuccess==='function')options.onSuccess(result.user)});modal.querySelector(`#${prefix}-initials`).focus();
    }

    window.CLPAuth={login,logout,getUser,isLoggedIn,normalizeInitials,validInitials,validPin,clearLegacyTodaySession,sessionKey:SESSION_KEY,supabaseUrl:SUPA_URL,backend:'supabase',showLoginModal};
    try{const legacy=localStorage.getItem('chrisleepapa-today-session'),current=localStorage.getItem(SESSION_KEY);if(!current&&legacy){const initials=normalizeInitials(legacy);if(validInitials(initials))write(SESSION_KEY,{initials,loginAt:new Date().toISOString(),migrated:true})}}catch(_){ }
    function autoResumeToday(){if(!isLoggedIn())return;const button=document.getElementById('authSubmit'),initials=document.getElementById('authInitials'),pin=document.getElementById('authPin');if(!button||!initials||!pin)return;const session=getUser();initials.value=session.initials;pin.value='';if(typeof window.startToday==='function'){try{window.startToday();return}catch(_){}}window.dispatchEvent(new CustomEvent('chrisleepapa-auth-ready',{detail:{user:session,autoResume:true}}))}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(autoResumeToday,0),{once:true});else setTimeout(autoResumeToday,0);
})();
