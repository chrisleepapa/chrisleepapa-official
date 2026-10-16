/* TODAY — personal prayer sticky notes */
'use strict';
(() => {
  const PREFIX='chrisleepapa-today-';
  const categories=[['family','가족','Family'],['health','건강','Health'],['gratitude','감사','Gratitude'],['work','일과 진로','Work & direction'],['church','교회와 이웃','Church & others'],['personal','개인 기도','Personal']];
  const states=[['praying','기도 중','In prayer'],['answered','응답에 감사','Answered with gratitude'],['ongoing','계속 맡겨 드리는 기도','Continuing in prayer']];
  const words={
    ko:{title:'🙏 오늘의 기도',subtitle:'오늘, 내 마음에 담아 둔 기도를 다시 만나요.',manage:'나의 기도노트',manageOpen:'기도노트 닫기',refresh:'다른 기도 만나기',emptyTitle:'아직 작성한 기도가 없어요',emptyText:'마음에 있는 기도를 포스트잇 한 장에 담아 보세요. 오늘의 기도에도 이 기도가 다시 찾아올 거예요.',emptyManage:'첫 번째 기도 포스트잇을 만들어 보세요.',add:'새 기도 작성',titleLabel:'기도 제목',titlePlaceholder:'예: 우리 가족을 위해',contentLabel:'기도 내용',contentPlaceholder:'마음에 있는 기도를 편안하게 적어 보세요.',category:'분류',status:'기도 상태',save:'포스트잇 저장',update:'수정 내용 저장',cancel:'취소',search:'기도 제목이나 내용 검색',allCategories:'모든 분류',allStates:'모든 상태',edit:'수정',del:'삭제',confirm:'이 기도 포스트잇을 삭제할까요? 삭제한 기록은 복구할 수 없습니다.',required:'기도 제목과 내용을 입력해 주세요.',saved:'기도를 저장했어요.',updated:'기도를 수정했어요.',deleted:'기도를 삭제했어요.',shown:'오늘의 기도를 변경했어요.',date:'작성일',private:'나의 기도는 로그인한 계정에 저장되며 다른 방문자에게 공개되지 않습니다.',noResults:'검색 조건에 맞는 기도가 없어요.',count:'개의 기도'},
    en:{title:'🙏 Today’s Prayer',subtitle:'Meet a prayer from your heart again today.',manage:'My Prayer Notes',manageOpen:'Close Prayer Notes',refresh:'Meet another prayer',emptyTitle:'Your prayer notes are waiting',emptyText:'Write a prayer on your first sticky note. It may return as your prayer of the day.',emptyManage:'Create your first prayer sticky note.',add:'Write a prayer',titleLabel:'Prayer title',titlePlaceholder:'e.g. For my family',contentLabel:'Prayer',contentPlaceholder:'Write what is on your heart.',category:'Category',status:'Prayer status',save:'Save sticky note',update:'Save changes',cancel:'Cancel',search:'Search prayer titles or text',allCategories:'All categories',allStates:'All statuses',edit:'Edit',del:'Delete',confirm:'Delete this prayer note? This cannot be undone.',required:'Please enter a prayer title and text.',saved:'Prayer saved.',updated:'Prayer updated.',deleted:'Prayer deleted.',shown:'Today’s prayer changed.',date:'Created',private:'Your prayers are saved to your account and are not public.',noResults:'No prayers match these filters.',count:' prayers'}
  };
  const lang=()=>document.documentElement.lang==='en'?'en':'ko';
  const tx=k=>words[lang()][k]||words.ko[k]||k;
  const user=()=>window.CLPAuth?.getUser?.();
  const today=()=>{const p=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const v=t=>(p.find(x=>x.type===t)||{}).value||'';return v('year')+'-'+v('month')+'-'+v('day')};
  const esc=v=>String(v==null?'':v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const keyFor=date=>PREFIX+String(user()?.initials||'').toUpperCase()+'-'+(date||today());
  const read=key=>{try{return JSON.parse(localStorage.getItem(key)||'null')}catch(_){return null}};
  const readData=()=>read(keyFor())||{};
  const saveData=patch=>{const key=keyFor(),old=read(key)||{};if(Object.prototype.hasOwnProperty.call(patch,'prayerNotes'))patch=Object.assign({},patch,{prayerNotesUpdatedAt:new Date().toISOString()});try{localStorage.setItem(key,JSON.stringify(Object.assign({},old,patch)));return true}catch(_){setStatus('저장 공간이 부족해 기록하지 못했습니다.');return false}};
  let notes=[],editingId=null,initialized=false;
  function style(){
    if(document.getElementById('prayer-notes-style'))return;
    const css=[
      "#todayPrayerStep{margin-bottom:22px}",
      ".prayer-feature-note{position:relative;overflow:hidden;margin:16px 0 12px;padding:24px 22px 20px;border:1px solid rgba(201,168,76,.35);border-radius:14px;background:linear-gradient(135deg,#f8e9a9,#fff5cf);color:#342d1e;box-shadow:0 8px 22px rgba(0,0,0,.10)}",
      ".prayer-feature-note:before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,#b58a45,#e7d69a,#b58a45)}",
      ".prayer-feature-kicker{margin:0 0 10px;color:#80682b;font-size:.72rem;letter-spacing:.09em;text-transform:uppercase}",
      ".prayer-feature-note h3{margin:0 0 12px;color:#342d1e;font-size:1.18rem;line-height:1.45}",
      ".prayer-feature-note p{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;color:#433a28;font-size:.96rem;line-height:1.9}",
      ".prayer-feature-meta{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:18px;padding-top:12px;border-top:1px solid rgba(128,104,43,.22);color:#80682b;font-size:.75rem}",
      ".prayer-feature-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:10px}",
      ".prayer-feature-actions button,.pn-button{min-height:40px;padding:9px 14px;border:1px solid rgba(201,168,76,.55);border-radius:9px;background:transparent;color:var(--text,#e8d08a);font:inherit;font-size:.83rem;cursor:pointer}",
      ".prayer-feature-actions .pn-primary,.pn-button.pn-primary{background:#c9a84c;color:#17140c;border-color:#c9a84c;font-weight:700}",
      "#myPrayerNotes{margin:20px 0 26px;padding:22px;border:1px solid rgba(201,168,76,.3);border-radius:18px;background:rgba(12,12,14,.96);color:#eee}",
      ".pn-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px}.pn-heading{margin:0;color:#e8d08a;font-size:1.12rem}",
      ".pn-description,.pn-private,.pn-statusline{color:#aaa;font-size:.82rem;line-height:1.65}.pn-private{margin:8px 0 16px}",
      ".pn-editor{margin:18px 0;padding:16px;border:1px solid rgba(201,168,76,.22);border-radius:13px;background:rgba(255,255,255,.025)}",
      ".pn-editor-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}.pn-field{display:flex;flex-direction:column;gap:7px;min-width:0;margin-bottom:12px}.pn-field label{color:#e8d08a;font-size:.82rem;font-weight:600}",
      ".pn-field input,.pn-field textarea,.pn-field select,.pn-filters input,.pn-filters select{box-sizing:border-box;width:100%;min-width:0;min-height:42px;padding:10px 11px;border:1px solid #514b3b;border-radius:9px;background:#101012;color:#f5f1e8;font:inherit;font-size:.88rem}.pn-field textarea{min-height:126px;resize:vertical;line-height:1.75}",
      ".pn-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.pn-statusline{min-height:20px;margin-right:auto}",
      ".pn-filters{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr) minmax(0,1fr);gap:8px;margin:18px 0}.pn-count{margin:0 0 10px;color:#aaa;font-size:.8rem}",
      ".pn-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:start}",
      ".pn-sticky{position:relative;min-width:0;padding:18px 16px 14px;border-radius:3px 3px 12px 3px;background:#f8e9a9;color:#342d1e;box-shadow:0 5px 14px rgba(0,0,0,.18);transform:rotate(-.25deg)}.pn-sticky:nth-child(3n+2){background:#dcebd7;transform:rotate(.35deg)}.pn-sticky:nth-child(3n){background:#f0ddd7;transform:rotate(-.15deg)}.pn-sticky:before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:rgba(116,88,36,.22)}",
      ".pn-sticky-top{display:flex;gap:5px;flex-wrap:wrap}.pn-sticky h3{margin:9px 0 10px;color:#342d1e;font-size:1rem;line-height:1.45;overflow-wrap:anywhere}.pn-note-text{min-height:54px;max-height:240px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;color:#433a28;font-size:.86rem;line-height:1.75}",
      ".pn-sticky-meta{display:flex;flex-wrap:wrap;gap:5px 9px;margin:14px 0 10px;padding-top:10px;border-top:1px solid rgba(80,65,35,.18);color:#68562d;font-size:.7rem}.pn-tag{display:inline-block;max-width:100%;padding:4px 7px;border-radius:999px;background:rgba(80,65,35,.10);color:#655126;font-size:.69rem;overflow-wrap:anywhere}",
      ".pn-sticky-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px}.pn-sticky-actions button{padding:6px 9px;border:1px solid rgba(80,65,35,.3);border-radius:7px;background:rgba(255,255,255,.35);color:#44371f;font:inherit;font-size:.75rem;cursor:pointer}.pn-empty{padding:22px 14px;border:1px dashed rgba(201,168,76,.4);border-radius:12px;color:#aaa;text-align:center;line-height:1.7}",
      "html[data-theme='light'] #myPrayerNotes{background:#fffdf8;border-color:#ded3bd;color:#30291f}html[data-theme='light'] .pn-heading,html[data-theme='light'] .pn-field label{color:#765b17}html[data-theme='light'] .pn-description,html[data-theme='light'] .pn-private,html[data-theme='light'] .pn-statusline,html[data-theme='light'] .pn-count{color:#625d52}",
      "html[data-theme='light'] .pn-editor{background:#faf7ef;border-color:#e2d8c5}html[data-theme='light'] .pn-field input,html[data-theme='light'] .pn-field textarea,html[data-theme='light'] .pn-field select,html[data-theme='light'] .pn-filters input,html[data-theme='light'] .pn-filters select{background:#fff;color:#29251f;border-color:#d2c9b6}",
      "html[data-theme='light'] .prayer-feature-actions button,html[data-theme='light'] .pn-button{color:#765b17}html[data-theme='light'] .prayer-feature-actions .pn-primary,html[data-theme='light'] .pn-button.pn-primary{color:#17140c}",
      "@media(max-width:900px){.pn-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:620px){#myPrayerNotes{padding:15px}.pn-editor-grid,.pn-filters{grid-template-columns:1fr}.pn-grid{grid-template-columns:1fr}.prayer-feature-note{padding:22px 17px 17px}.prayer-feature-note h3{font-size:1.08rem}}"
    ].join('');
    const s=document.createElement('style');s.id='prayer-notes-style';s.textContent=css;document.head.appendChild(s);
  }
  function catLabel(v){const x=categories.find(c=>c[0]===v);return x?x[lang()==='en'?2:1]:(v||'개인 기도')}
  function stateLabel(v){const x=states.find(c=>c[0]===v);return x?x[lang()==='en'?2:1]:states[0][lang()==='en'?2:1]}
  function options(list,selected,allLabel){return (allLabel?'<option value="">'+allLabel+'</option>':'')+list.map(x=>'<option value="'+x[0]+'" '+(selected===x[0]?'selected':'')+'>'+x[lang()==='en'?2:1]+'</option>').join('')}
  function build(){
    if(document.getElementById('myPrayerNotes'))return;
    const prayer=document.getElementById('todayPrayerStep');if(!prayer)return;
    const section=document.createElement('section');section.id='myPrayerNotes';section.className='today-card prayer-notes-section';section.hidden=true;
    section.innerHTML='<div class="pn-head"><div><h2 class="pn-heading">'+tx('manage')+'</h2><p class="pn-description">기도 하나를 포스트잇 한 장에 담고, 시간이 지나도 다시 찾아보세요.</p></div><button type="button" class="pn-button" id="pn-new">'+tx('add')+'</button></div>'+
      '<p class="pn-private">'+tx('private')+'</p><form class="pn-editor" id="pn-form" hidden>'+
      '<div class="pn-editor-grid"><div class="pn-field"><label for="pn-title">'+tx('titleLabel')+'</label><input id="pn-title" maxlength="100" required placeholder="'+tx('titlePlaceholder')+'"></div><div class="pn-field"><label for="pn-category">'+tx('category')+'</label><select id="pn-category">'+options(categories,'family')+'</select></div></div>'+
      '<div class="pn-field"><label for="pn-content">'+tx('contentLabel')+'</label><textarea id="pn-content" maxlength="3000" required placeholder="'+tx('contentPlaceholder')+'"></textarea></div>'+
      '<div class="pn-editor-grid"><div class="pn-field"><label for="pn-state">'+tx('status')+'</label><select id="pn-state">'+options(states,'praying')+'</select></div><div class="pn-field"><label for="pn-date">'+tx('date')+'</label><input id="pn-date" type="text" readonly></div></div>'+
      '<div class="pn-actions"><span class="pn-statusline" id="pn-statusline" role="status" aria-live="polite"></span><button class="pn-button pn-primary" id="pn-save" type="submit">'+tx('save')+'</button><button class="pn-button" id="pn-cancel" type="button">'+tx('cancel')+'</button></div></form>'+
      '<div class="pn-filters"><input id="pn-search" type="search" maxlength="100" placeholder="'+tx('search')+'"><select id="pn-cat-filter">'+options(categories,'',tx('allCategories'))+'</select><select id="pn-state-filter">'+options(states,'',tx('allStates'))+'</select></div>'+
      '<p class="pn-count" id="pn-count"></p><div class="pn-grid" id="pn-grid" aria-live="polite"></div>';
    prayer.insertAdjacentElement('afterend',section);
    document.getElementById('pn-new').addEventListener('click',()=>openEditor(null));
    document.getElementById('pn-cancel').addEventListener('click',closeEditor);
    document.getElementById('pn-form').addEventListener('submit',submitEditor);
    document.getElementById('pn-search').addEventListener('input',renderNotes);
    document.getElementById('pn-cat-filter').addEventListener('change',renderNotes);
    document.getElementById('pn-state-filter').addEventListener('change',renderNotes);
    document.getElementById('prayerNotesToggle').addEventListener('click',toggleNotes);
    document.getElementById('prayerTodayRefresh').addEventListener('click',selectAnother);
  }
  function setStatus(v){const el=document.getElementById('pn-statusline');if(el)el.textContent=v}
  function migrateLocal(){
    const data=readData();if(Array.isArray(data.prayerNotes))return data;
    const prefix=PREFIX+String(user()?.initials||'').toUpperCase()+'-',found=[];
    try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k||!k.startsWith(prefix))continue;const date=k.slice(prefix.length);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>=today())continue;const old=read(k);if(old&&Array.isArray(old.prayerNotes)&&old.prayerNotes.length)found.push({date,data:old})}}catch(_){}
    found.sort((a,b)=>b.date.localeCompare(a.date));
    if(found.length){saveData({prayerNotes:found[0].data.prayerNotes,prayerDailySelection:found[0].data.prayerDailySelection||null});return readData()}
    return data;
  }
  function chooseDaily(force){
    const data=readData(),saved=data.prayerDailySelection,current=saved&&saved.date===today()?saved.id:null;
    if(!force&&current&&notes.some(n=>n.id===current))return;
    if(!notes.length){saveData({prayerDailySelection:{date:today(),id:null}});return}
    let pool=notes.filter(n=>n.status!=='answered');if(!pool.length)pool=notes.slice();
    const prior=saved&&saved.id;let choices=pool.filter(n=>n.id!==prior);if(!choices.length)choices=pool;
    const picked=choices[Math.floor(Math.random()*choices.length)];
    saveData({prayerDailySelection:{date:today(),id:picked.id}});
  }
  function renderDaily(){
    const data=readData(),s=data.prayerDailySelection,note=s&&s.date===today()?notes.find(n=>n.id===s.id):null;
    const title=document.getElementById('dailyPrayerTitle'),body=document.getElementById('dailyPrayerContent');
    if(!title||!body)return;
    title.textContent=note?note.title:tx('emptyTitle');body.textContent=note?note.content:tx('emptyText');
    document.getElementById('dailyPrayerCategory').textContent=note?catLabel(note.category):'';
    document.getElementById('dailyPrayerDate').textContent=note?tx('date')+': '+(note.createdAt||today()):'';
    document.getElementById('dailyPrayerStatus').textContent=note?stateLabel(note.status):'';
    document.getElementById('prayerTodayRefresh').hidden=notes.length<2;
  }
  function selectAnother(){chooseDaily(true);renderDaily();setStatus(tx('shown'))}
  function toggleNotes(){
    const section=document.getElementById('myPrayerNotes');section.hidden=!section.hidden;
    document.getElementById('prayerNotesToggle').textContent=section.hidden?tx('manage'):tx('manageOpen');
    if(!section.hidden){renderNotes();section.scrollIntoView({behavior:'smooth',block:'start'})}
  }
  function openEditor(note){
    editingId=note?note.id:null;const form=document.getElementById('pn-form');form.hidden=false;
    document.getElementById('pn-title').value=note?note.title:'';
    document.getElementById('pn-content').value=note?note.content:'';
    document.getElementById('pn-category').value=note?note.category:'family';
    document.getElementById('pn-state').value=note?note.status:'praying';
    document.getElementById('pn-date').value=note?(note.createdAt||today()):today();
    document.getElementById('pn-save').textContent=note?tx('update'):tx('save');
    setStatus('');form.scrollIntoView({behavior:'smooth',block:'nearest'});document.getElementById('pn-title').focus();
  }
  function closeEditor(){editingId=null;document.getElementById('pn-form').hidden=true;document.getElementById('pn-form').reset();setStatus('')}
  function submitEditor(e){
    e.preventDefault();const title=document.getElementById('pn-title').value.trim(),content=document.getElementById('pn-content').value.trim();
    if(!title||!content){setStatus(tx('required'));return}
    const now=new Date().toISOString();
    if(editingId){notes=notes.map(n=>n.id===editingId?Object.assign({},n,{title,content,category:document.getElementById('pn-category').value,status:document.getElementById('pn-state').value,updatedAt:now}):n);setStatus(tx('updated'))}
    else{notes.unshift({id:'pn-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8),title,content,category:document.getElementById('pn-category').value,status:document.getElementById('pn-state').value,createdAt:today(),updatedAt:now});setStatus(tx('saved'))}
    if(!saveData({prayerNotes:notes}))return;
    if(!notes.some(n=>n.id===(readData().prayerDailySelection||{}).id))chooseDaily(false);
    closeEditor();renderDaily();renderNotes();
  }
  function deleteNote(id){
    if(!window.confirm(tx('confirm')))return;
    notes=notes.filter(n=>n.id!==id);let selection=readData().prayerDailySelection||null;if(selection&&selection.id===id)selection=null;
    saveData({prayerNotes:notes,prayerDailySelection:selection});chooseDaily(false);renderDaily();renderNotes();setStatus(tx('deleted'));
  }
  function renderNotes(){
    const grid=document.getElementById('pn-grid');if(!grid)return;
    const query=document.getElementById('pn-search').value.trim().toLocaleLowerCase(lang()==='en'?'en':'ko'),cat=document.getElementById('pn-cat-filter').value,state=document.getElementById('pn-state-filter').value;
    const filtered=notes.filter(n=>(!query||(n.title+' '+n.content).toLocaleLowerCase(lang()==='en'?'en':'ko').includes(query))&&(!cat||n.category===cat)&&(!state||n.status===state));
    document.getElementById('pn-count').textContent=notes.length+tx('count')+(filtered.length!==notes.length?' · '+filtered.length+' '+(lang()==='en'?'shown':'개 표시'):'');grid.innerHTML='';
    if(!filtered.length){const empty=document.createElement('div');empty.className='pn-empty';empty.style.gridColumn='1 / -1';empty.textContent=notes.length?tx('noResults'):tx('emptyManage');grid.appendChild(empty);return}
    filtered.forEach(n=>{
      const el=document.createElement('article');el.className='pn-sticky';
      const top=document.createElement('div');top.className='pn-sticky-top';
      const c=document.createElement('span');c.className='pn-tag';c.textContent=catLabel(n.category);
      const st=document.createElement('span');st.className='pn-tag';st.textContent=stateLabel(n.status);top.append(c,st);
      const h=document.createElement('h3');h.textContent=n.title;
      const body=document.createElement('div');body.className='pn-note-text';body.textContent=n.content;
      const meta=document.createElement('div');meta.className='pn-sticky-meta';meta.textContent=tx('date')+': '+(n.createdAt||today());
      const actions=document.createElement('div');actions.className='pn-sticky-actions';
      const edit=document.createElement('button');edit.type='button';edit.textContent=tx('edit');edit.addEventListener('click',()=>openEditor(n));
      const del=document.createElement('button');del.type='button';del.textContent=tx('del');del.addEventListener('click',()=>deleteNote(n.id));
      actions.append(edit,del);el.append(top,h,body,meta,actions);grid.appendChild(el);
    });
  }
  function applyLanguage(){
    if(!document.getElementById('myPrayerNotes'))return;
    document.querySelector('#todayPrayerStep [data-prayer-title]').textContent=tx('title');
    document.querySelector('#todayPrayerStep [data-prayer-subtitle]').textContent=tx('subtitle');
    document.getElementById('prayerNotesToggle').textContent=document.getElementById('myPrayerNotes').hidden?tx('manage'):tx('manageOpen');
    document.getElementById('prayerTodayRefresh').textContent=tx('refresh');
    document.getElementById('dailyPrayerKicker').textContent=lang()==='en'?'A PRAYER TO REVISIT TODAY':'오늘 다시 만난 기도';
    document.querySelector('#myPrayerNotes .pn-heading').textContent=tx('manage');
    document.querySelector('#myPrayerNotes .pn-description').textContent=lang()==='en'?'Keep each prayer on its own note, then revisit it over time.':'기도 하나를 포스트잇 한 장에 담고, 시간이 지나도 다시 찾아보세요.';
    document.querySelector('#myPrayerNotes .pn-private').textContent=tx('private');
    document.getElementById('pn-new').textContent=tx('add');
    document.querySelector('label[for="pn-title"]').textContent=tx('titleLabel');
    document.querySelector('label[for="pn-category"]').textContent=tx('category');
    document.querySelector('label[for="pn-content"]').textContent=tx('contentLabel');
    document.querySelector('label[for="pn-state"]').textContent=tx('status');
    document.querySelector('label[for="pn-date"]').textContent=tx('date');
    document.getElementById('pn-title').placeholder=tx('titlePlaceholder');
    document.getElementById('pn-content').placeholder=tx('contentPlaceholder');
    document.getElementById('pn-search').placeholder=tx('search');
    document.querySelectorAll('#pn-category,#pn-cat-filter').forEach(sel=>Array.from(sel.options).forEach(opt=>{opt.textContent=opt.value?catLabel(opt.value):tx('allCategories')}));
    document.querySelectorAll('#pn-state,#pn-state-filter').forEach(sel=>Array.from(sel.options).forEach(opt=>{opt.textContent=opt.value?stateLabel(opt.value):tx('allStates')}));
    document.getElementById('pn-save').textContent=editingId?tx('update'):tx('save');
    document.getElementById('pn-cancel').textContent=tx('cancel');renderDaily();renderNotes();
  }
  function boot(){
    const main=document.getElementById('todayApp');if(!main||main.hidden||!user()?.initials||initialized)return;
    initialized=true;style();build();const data=migrateLocal();notes=Array.isArray(data.prayerNotes)?data.prayerNotes.filter(n=>n&&n.id&&n.title&&n.content):[];
    chooseDaily(false);renderDaily();renderNotes();applyLanguage();
  }
  const previous=window.onLangChange;window.onLangChange=function(l){if(typeof previous==='function')previous(l);applyLanguage()};
  window.addEventListener('clp-today-data-hydrated',event=>{if(event.detail?.initials!==user()?.initials)return;const data=readData();notes=Array.isArray(data.prayerNotes)?data.prayerNotes.filter(n=>n&&n.id&&n.title&&n.content):[];chooseDaily(false);renderDaily();renderNotes()});
  function init(){const main=document.getElementById('todayApp');if(!main)return;new MutationObserver(()=>{if(!main.hidden)boot()}).observe(main,{attributes:true,attributeFilter:['hidden']});if(!main.hidden)boot()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();