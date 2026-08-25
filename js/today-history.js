/* TODAY history: Supabase-backed archive UI for memo, prayer and tasks. */
'use strict';
(() => {
    if (!/today(?:\.html)?$/i.test(location.pathname.split('/').pop() || 'today.html')) return;

    const SUPA_URL = 'https://cvfmkcxmxkmemmshfttn.supabase.co';
    const SUPA_KEY = 'sb_publishable_Bb_GkRPWRFeAPvIduwPTJg_O1z_sStm';

    const session = () => window.CLPAuth?.getUser?.();
    const date = () => new Date().toISOString().slice(0,10);
    const rpc = async (name, body) => {
        const r = await fetch(`${SUPA_URL}/rest/v1/rpc/${name}`, {
            method:'POST', headers:{apikey:SUPA_KEY,Authorization:`Bearer ${SUPA_KEY}`,'Content-Type':'application/json'}, body:JSON.stringify(body)
        });
        if (!r.ok) throw new Error(`RPC ${name}: ${r.status}`);
        return r.json();
    };
    const localKey = d => `chrisleepapa-today-${session()?.initials}-${d}`;
    const readLocal = d => { try { return JSON.parse(localStorage.getItem(localKey(d)) || '{}'); } catch (_) { return {}; } };

    function addStyles() {
        if (document.getElementById('today-history-style')) return;
        const s=document.createElement('style'); s.id='today-history-style'; s.textContent=`
            .today-history{margin:22px 0 0;padding:24px;background:linear-gradient(145deg,rgba(18,16,14,.96),rgba(8,8,11,.96));border:1px solid rgba(201,168,76,.18);border-radius:20px}.today-history h2{font:600 1rem 'Cinzel',serif;letter-spacing:.12em;color:#c9a84c;margin:0 0 16px}.history-tools{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}.history-tools input,.history-tools select{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.12);border-radius:9px;color:#eee;padding:10px 11px}.history-tools input{flex:1;min-width:180px}.history-tools button{border:1px solid rgba(201,168,76,.4);border-radius:9px;background:transparent;color:#c9a84c;padding:9px 13px;cursor:pointer}.history-list{display:flex;flex-direction:column;gap:9px}.history-item{padding:13px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.025)}.history-date{color:#c9a84c;font-size:.76rem;margin-bottom:7px}.history-preview{color:#ddd;font:.84rem/1.55 'Noto Sans KR',sans-serif;white-space:pre-wrap}.history-actions{display:flex;gap:7px;margin-top:9px}.history-actions button{border:1px solid rgba(255,255,255,.12);background:transparent;color:#aaa;border-radius:7px;padding:5px 9px;cursor:pointer}.history-empty{color:rgba(238,238,238,.4);font-size:.84rem;padding:10px 0}
        `; document.head.appendChild(s);
    }

    function ensureUI(){
        if(document.getElementById('todayHistory')) return;
        const main=document.getElementById('todayApp'); if(!main) return;
        const section=document.createElement('section'); section.className='today-history'; section.id='todayHistory';
        section.innerHTML=`<h2>📚 MY DAILY ARCHIVE</h2><div class="history-tools"><input id="historySearch" type="search" placeholder="메모·기도 검색"><input id="historyDate" type="date"><button id="historyClear">전체 보기</button></div><div class="history-list" id="historyList"></div>`;
        main.appendChild(section);
        document.getElementById('historySearch').addEventListener('input',render);
        document.getElementById('historyDate').addEventListener('change',render);
        document.getElementById('historyClear').addEventListener('click',()=>{document.getElementById('historySearch').value='';document.getElementById('historyDate').value='';render();});
    }

    async function dates(){
        const u=session(); if(!u?.initials||!u?.pinHash) return [];
        try {
            const r=await fetch(`${SUPA_URL}/rest/v1/clp_today?select=record_date,data,updated_at&account_id=eq.${encodeURIComponent(u.initials)}&order=record_date.desc`,{headers:{apikey:SUPA_KEY,Authorization:`Bearer ${SUPA_KEY}`} });
            if(r.ok) return await r.json();
        } catch (_) {}
        return [];
    }

    let records=[];
    async function load(){
        records=await dates();
        const today=date();
        if(!records.some(x=>x.record_date===today)) records.push({record_date:today,data:readLocal(today)});
        records.sort((a,b)=>String(b.record_date).localeCompare(String(a.record_date)));
        render();
    }

    function render(){
        const list=document.getElementById('historyList'); if(!list) return;
        const q=(document.getElementById('historySearch')?.value||'').trim().toLowerCase();
        const d=document.getElementById('historyDate')?.value||'';
        const filtered=records.filter(r=>{const data=r.data||{}; const text=[data.memo,data.prayer,...(data.todos||[]).map(x=>x.text)].join('\n').toLowerCase(); return (!d||r.record_date===d)&&(!q||text.includes(q));});
        list.innerHTML='';
        if(!filtered.length){list.innerHTML='<div class="history-empty">저장된 기록이 없습니다.</div>';return;}
        filtered.forEach(r=>{
            const data=r.data||{}; const item=document.createElement('div'); item.className='history-item';
            const memo=String(data.memo||'').trim(), prayer=String(data.prayer||'').trim(), todos=(data.todos||[]).map(x=>x.text).filter(Boolean);
            item.innerHTML=`<div class="history-date">${r.record_date}</div><div class="history-preview"></div><div class="history-actions"><button type="button" data-edit="${r.record_date}">이 날짜 열기</button><button type="button" data-delete="${r.record_date}">삭제</button></div>`;
            const preview=item.querySelector('.history-preview'); preview.textContent=[memo?`📝 ${memo}`:'',prayer?`🙏 ${prayer}`:'',todos.length?`✅ ${todos.join(' · ')}`:''].filter(Boolean).join('\n')||'내용 없음';
            item.querySelector('[data-edit]').onclick=()=>openDate(r.record_date);
            item.querySelector('[data-delete]').onclick=()=>removeDate(r.record_date);
            list.appendChild(item);
        });
    }

    function openDate(d){
        const current=date();
        if(d===current){document.getElementById('todayMemo')?.focus();return;}
        const r=records.find(x=>x.record_date===d); if(!r)return;
        /* 과거 기록은 편집 전 해당 날짜를 로컬 키로 복원하고 TODAY 입력창에 표시합니다. */
        const data=r.data||{}; const memo=document.getElementById('todayMemo'), prayer=document.getElementById('todayPrayer');
        if(memo)memo.value=data.memo||''; if(prayer)prayer.value=data.prayer||'';
        alert(`${d} 기록을 불러왔습니다.\n현재 TODAY 화면은 오늘 날짜 기준 저장이므로, 과거 기록 자체를 수정하려면 날짜 편집 기능을 별도로 활성화할 수 있습니다.`);
    }

    async function removeDate(d){
        const u=session(); if(!u?.initials||!u?.pinHash||!confirm(`${d} 기록을 삭제할까요?`)) return;
        try { await rpc('clp_delete_today',{p_initials:u.initials,p_pin_hash:u.pinHash,p_date:d}); } catch(_){ try{localStorage.removeItem(localKey(d));}catch(__){} }
        records=records.filter(r=>r.record_date!==d); render();
    }

    function boot(){addStyles();ensureUI();load();}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,500),{once:true});else setTimeout(boot,500);
})();
