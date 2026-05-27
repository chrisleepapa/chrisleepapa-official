/**
 * Chris LEE.PAPA — Unified Guestbook
 * Persistent Storage 기반 통합 방명록
 * 모든 페이지 하단에 공통으로 삽입됩니다.
 */

(function () {
  'use strict';

  /* ── 스토리지 키 ── */
  const STORAGE_KEY = 'guestbook-entries';
  const SHARED = true; // 모든 방문자 공유

  /* ── CSS 주입 ── */
  const style = document.createElement('style');
  style.textContent = `
    /* ===== GUESTBOOK SECTION ===== */
    #guestbook-section {
      position: relative;
      width: 100%;
      background: #030305;
      border-top: 1px solid rgba(201,168,76,0.15);
      padding: 80px 0 100px;
      overflow: hidden;
      z-index: 10;
    }

    #guestbook-section::before {
      content: '';
      position: absolute;
      top: 0; left: 50%; transform: translateX(-50%);
      width: 600px; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
    }

    #guestbook-section::after {
      content: '';
      position: absolute;
      top: -200px; left: 50%; transform: translateX(-50%);
      width: 800px; height: 400px;
      background: radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%);
      pointer-events: none;
    }

    .gb-inner {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 2;
    }

    /* ── 헤더 ── */
    .gb-header {
      text-align: center;
      margin-bottom: 52px;
    }

    .gb-tag {
      font-family: 'Cinzel', serif;
      font-size: 0.68rem;
      letter-spacing: 5px;
      color: rgba(201,168,76,0.6);
      text-transform: uppercase;
      display: block;
      margin-bottom: 12px;
    }

    .gb-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      font-weight: 300;
      color: rgba(240,236,228,0.85);
      letter-spacing: 0.1em;
      line-height: 1.2;
    }

    .gb-title span {
      background: linear-gradient(108deg, #b8922a 0%, #e8d08a 30%, #fffbe8 55%, #c9a84c 75%, #e8d08a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .gb-divider {
      width: 120px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
      margin: 18px auto 0;
    }

    /* ── 작성 폼 ── */
    .gb-form-wrap {
      background: rgba(10,10,18,0.7);
      border: 1px solid rgba(201,168,76,0.18);
      border-radius: 24px;
      padding: 36px 40px;
      backdrop-filter: blur(20px);
      margin-bottom: 48px;
      transition: border-color 0.4s, box-shadow 0.4s;
    }

    .gb-form-wrap:focus-within {
      border-color: rgba(201,168,76,0.4);
      box-shadow: 0 0 40px rgba(201,168,76,0.07);
    }

    .gb-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .gb-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .gb-label {
      font-family: 'Cinzel', serif;
      font-size: 0.6rem;
      letter-spacing: 3px;
      color: rgba(201,168,76,0.65);
      text-transform: uppercase;
    }

    .gb-input,
    .gb-textarea {
      background: rgba(3,3,5,0.6);
      border: 1px solid rgba(201,168,76,0.15);
      border-radius: 12px;
      color: rgba(240,236,228,0.9);
      font-family: 'Pretendard', 'Noto Serif KR', serif;
      font-size: 0.92rem;
      padding: 12px 16px;
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s;
      -webkit-appearance: none;
      resize: none;
      width: 100%;
      box-sizing: border-box;
    }

    .gb-input::placeholder,
    .gb-textarea::placeholder {
      color: rgba(200,196,190,0.3);
    }

    .gb-input:focus,
    .gb-textarea:focus {
      border-color: rgba(201,168,76,0.5);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.06);
    }

    .gb-textarea { min-height: 100px; margin-bottom: 20px; }

    .gb-form-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }

    .gb-char-count {
      font-family: 'Pretendard', sans-serif;
      font-size: 0.75rem;
      color: rgba(200,196,190,0.35);
    }

    .gb-char-count.warn { color: rgba(255,150,100,0.7); }

    .gb-submit-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 32px;
      background: transparent;
      border: 1px solid rgba(201,168,76,0.45);
      border-radius: 50px;
      color: var(--gold-light, #e8d08a);
      font-family: 'Cinzel', serif;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
      position: relative;
      overflow: hidden;
    }

    .gb-submit-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04));
      opacity: 0;
      transition: opacity 0.3s;
    }

    .gb-submit-btn:hover::before { opacity: 1; }
    .gb-submit-btn:hover {
      border-color: rgba(201,168,76,0.75);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(201,168,76,0.18);
    }

    .gb-submit-btn:active { transform: translateY(0); }

    .gb-submit-btn svg {
      width: 14px; height: 14px;
      transition: transform 0.3s;
    }
    .gb-submit-btn:hover svg { transform: translateX(3px); }

    .gb-submit-btn.loading { opacity: 0.6; pointer-events: none; }

    /* ── 토스트 ── */
    .gb-toast {
      position: fixed;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(10,10,18,0.92);
      border: 1px solid rgba(201,168,76,0.35);
      border-radius: 50px;
      padding: 12px 28px;
      font-family: 'Cinzel', serif;
      font-size: 0.7rem;
      letter-spacing: 2px;
      color: var(--gold-light, #e8d08a);
      backdrop-filter: blur(20px);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
      z-index: 9999;
      white-space: nowrap;
    }

    .gb-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* ── 엔트리 목록 ── */
    .gb-list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .gb-list-label {
      font-family: 'Cinzel', serif;
      font-size: 0.62rem;
      letter-spacing: 4px;
      color: rgba(201,168,76,0.55);
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .gb-list-label::after {
      content: '';
      display: inline-block;
      width: 60px;
      height: 1px;
      background: linear-gradient(90deg, rgba(201,168,76,0.3), transparent);
    }

    .gb-count-badge {
      background: rgba(201,168,76,0.12);
      border: 1px solid rgba(201,168,76,0.25);
      border-radius: 20px;
      padding: 3px 12px;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.72rem;
      color: rgba(201,168,76,0.7);
    }

    .gb-entries {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .gb-entry {
      background: rgba(10,10,18,0.6);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 18px;
      padding: 24px 28px;
      transition: border-color 0.3s, box-shadow 0.3s;
      animation: gbEntryIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
    }

    @keyframes gbEntryIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .gb-entry:hover {
      border-color: rgba(201,168,76,0.15);
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    }

    .gb-entry-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 12px;
    }

    .gb-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.08));
      border: 1px solid rgba(201,168,76,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Cinzel', serif;
      font-size: 0.9rem;
      color: rgba(201,168,76,0.8);
      flex-shrink: 0;
      font-weight: 700;
    }

    .gb-entry-meta { flex: 1; }

    .gb-entry-name {
      font-family: 'Cinzel', serif;
      font-size: 0.78rem;
      letter-spacing: 1.5px;
      color: rgba(240,236,228,0.9);
      display: block;
      margin-bottom: 3px;
    }

    .gb-entry-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .gb-entry-date {
      font-family: 'Pretendard', sans-serif;
      font-size: 0.7rem;
      color: rgba(200,196,190,0.35);
    }

    .gb-entry-page {
      font-family: 'Pretendard', sans-serif;
      font-size: 0.62rem;
      color: rgba(201,168,76,0.5);
      background: rgba(201,168,76,0.07);
      border: 1px solid rgba(201,168,76,0.15);
      border-radius: 10px;
      padding: 2px 8px;
    }

    .gb-entry-text {
      font-family: 'Noto Serif KR', serif;
      font-size: 0.92rem;
      line-height: 1.85;
      color: rgba(240,236,228,0.75);
      word-break: keep-all;
    }

    /* 삭제 버튼 (본인 글) */
    .gb-delete-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(200,196,190,0.2);
      transition: color 0.2s;
      padding: 4px;
      display: flex;
      align-items: center;
    }
    .gb-delete-btn:hover { color: rgba(255,100,100,0.6); }
    .gb-delete-btn svg { width: 14px; height: 14px; }

    /* 빈 상태 */
    .gb-empty {
      text-align: center;
      padding: 60px 20px;
      color: rgba(200,196,190,0.25);
    }

    .gb-empty-icon {
      font-size: 2.5rem;
      margin-bottom: 16px;
      opacity: 0.4;
      display: block;
    }

    .gb-empty p {
      font-family: 'Cinzel', serif;
      font-size: 0.7rem;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    /* 더보기 */
    .gb-load-more {
      display: flex;
      justify-content: center;
      margin-top: 32px;
    }

    .gb-load-more-btn {
      background: none;
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 50px;
      padding: 10px 28px;
      font-family: 'Cinzel', serif;
      font-size: 0.6rem;
      letter-spacing: 3px;
      color: rgba(201,168,76,0.5);
      cursor: pointer;
      transition: all 0.3s;
      text-transform: uppercase;
    }
    .gb-load-more-btn:hover {
      border-color: rgba(201,168,76,0.45);
      color: rgba(201,168,76,0.8);
    }

    .gb-load-more-btn:disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    /* ── 반응형 ── */
    @media (max-width: 640px) {
      #guestbook-section { padding: 60px 0 80px; }
      .gb-form-wrap { padding: 24px 20px; }
      .gb-form-row { grid-template-columns: 1fr; }
      .gb-entry { padding: 18px 18px; }
      .gb-form-footer { flex-direction: column; align-items: flex-end; }
    }
  `;
  document.head.appendChild(style);

  /* ── 현재 페이지명 ── */
  function getPageLabel() {
    const path = location.pathname.replace(/\/$/, '').split('/').pop() || 'index';
    const map = {
      '': 'Home', 'index': 'Home', 'bible': 'Bible', 'worship': 'Worship',
      'book': 'Book', 'music': 'Music', 'movie': 'Movie', 'game': 'Game',
      'gameinfo': 'Game', 'about': 'About', 'contact': 'Contact',
      'guestbook': 'Guestbook'
    };
    return map[path] || path.charAt(0).toUpperCase() + path.slice(1);
  }

  /* ── 날짜 포맷 ── */
  function formatDate(iso) {
    const d = new Date(iso);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}.${pad(d.getMonth()+1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  /* ── 아바타 이니셜 ── */
  function getInitial(name) {
    const n = name.trim();
    if (!n) return '✦';
    // 한글이면 첫 글자
    if (/[\uac00-\ud7a3]/.test(n[0])) return n[0];
    return n[0].toUpperCase();
  }

  /* ── 세션 ID (삭제 권한용) ── */
  function getSessionId() {
    let id = sessionStorage.getItem('gb-session');
    if (!id) {
      id = Math.random().toString(36).slice(2);
      sessionStorage.setItem('gb-session', id);
    }
    return id;
  }

  /* ── 스토리지 헬퍼 ── */
  async function loadEntries() {
    try {
      const res = await window.storage.get(STORAGE_KEY, SHARED);
      if (!res) return [];
      return JSON.parse(res.value);
    } catch { return []; }
  }

  async function saveEntries(entries) {
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(entries), SHARED);
      return true;
    } catch { return false; }
  }

  /* ── 토스트 ── */
  let toastEl = null;
  let toastTimer = null;

  function showGbToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'gb-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  /* ── XSS 방어 ── */
  function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ── 엔트리 렌더 ── */
  const PAGE_SIZE = 10;
  let allEntries = [];
  let displayCount = PAGE_SIZE;
  const sessionId = getSessionId();

  function renderEntries() {
    const container = document.getElementById('gb-entries-list');
    const countEl   = document.getElementById('gb-count');
    const moreBtn   = document.getElementById('gb-load-more-btn');
    if (!container) return;

    const total = allEntries.length;
    if (countEl) countEl.textContent = total;

    if (total === 0) {
      container.innerHTML = `
        <div class="gb-empty">
          <span class="gb-empty-icon">✦</span>
          <p>Be the first to leave a message</p>
        </div>`;
      if (moreBtn) moreBtn.style.display = 'none';
      return;
    }

    const visible = allEntries.slice(0, displayCount);
    container.innerHTML = visible.map((e, i) => `
      <div class="gb-entry" style="animation-delay:${i * 0.04}s">
        <div class="gb-entry-header">
          <div class="gb-avatar">${sanitize(getInitial(e.name))}</div>
          <div class="gb-entry-meta">
            <span class="gb-entry-name">${sanitize(e.name)}</span>
            <div class="gb-entry-info">
              <span class="gb-entry-date">${formatDate(e.date)}</span>
              <span class="gb-entry-page">${sanitize(e.page)}</span>
            </div>
          </div>
          ${e.sessionId === sessionId ? `
          <button class="gb-delete-btn" data-id="${e.id}" title="삭제" aria-label="삭제">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>` : ''}
        </div>
        <p class="gb-entry-text">${sanitize(e.message).replace(/\n/g, '<br>')}</p>
      </div>
    `).join('');

    // 삭제 이벤트
    container.querySelectorAll('.gb-delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        allEntries = allEntries.filter(e => e.id !== id);
        await saveEntries(allEntries);
        renderEntries();
        showGbToast('✦  삭제되었습니다');
      });
    });

    if (moreBtn) {
      moreBtn.style.display = displayCount >= total ? 'none' : '';
    }
  }

  /* ── 방명록 HTML 생성 ── */
  function buildGuestbookHTML() {
    return `
      <section id="guestbook-section" aria-label="방명록">
        <div class="gb-inner">

          <div class="gb-header">
            <span class="gb-tag">✦ &nbsp; Guestbook &nbsp; ✦</span>
            <h2 class="gb-title">당신의 <span>발자국</span>을 남겨주세요</h2>
            <div class="gb-divider"></div>
          </div>

          <!-- 작성 폼 -->
          <div class="gb-form-wrap">
            <div class="gb-form-row">
              <div class="gb-field">
                <label class="gb-label" for="gb-name">이름 / Name</label>
                <input
                  id="gb-name"
                  class="gb-input"
                  type="text"
                  placeholder="익명"
                  maxlength="20"
                  autocomplete="off"
                  spellcheck="false"
                />
              </div>
              <div class="gb-field">
                <label class="gb-label" for="gb-from">어디서 오셨나요?</label>
                <input
                  id="gb-from"
                  class="gb-input"
                  type="text"
                  placeholder="Seoul, Korea"
                  maxlength="30"
                  autocomplete="off"
                />
              </div>
            </div>

            <textarea
              id="gb-message"
              class="gb-textarea"
              placeholder="이곳에 방문한 소감, 응원의 말, 또는 기도 제목을 남겨주세요 ✦"
              maxlength="300"
            ></textarea>

            <div class="gb-form-footer">
              <span class="gb-char-count" id="gb-char-count">0 / 300</span>
              <button class="gb-submit-btn" id="gb-submit-btn" type="button">
                <span>남기기</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- 목록 -->
          <div class="gb-list-header">
            <span class="gb-list-label">Messages</span>
            <span class="gb-count-badge" id="gb-count">0</span>
          </div>

          <div class="gb-entries" id="gb-entries-list">
            <!-- 엔트리 렌더링 -->
          </div>

          <div class="gb-load-more">
            <button class="gb-load-more-btn" id="gb-load-more-btn" type="button" style="display:none">
              더 보기 · Load More
            </button>
          </div>

        </div>
      </section>
    `;
  }

  /* ── 초기화 ── */
  async function init() {
    // site-footer 바로 앞에 삽입
    const footer = document.getElementById('site-footer');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildGuestbookHTML();
    const section = wrapper.firstElementChild;

    if (footer) {
      footer.parentNode.insertBefore(section, footer);
    } else {
      document.body.appendChild(section);
    }

    // 데이터 로드
    allEntries = await loadEntries();
    renderEntries();

    // 글자 수 카운터
    const msgEl  = document.getElementById('gb-message');
    const countEl = document.getElementById('gb-char-count');
    msgEl.addEventListener('input', () => {
      const len = msgEl.value.length;
      countEl.textContent = `${len} / 300`;
      countEl.classList.toggle('warn', len > 260);
    });

    // 더보기
    document.getElementById('gb-load-more-btn')?.addEventListener('click', () => {
      displayCount += PAGE_SIZE;
      renderEntries();
    });

    // 제출
    document.getElementById('gb-submit-btn')?.addEventListener('click', async () => {
      const name    = (document.getElementById('gb-name').value.trim()  || '익명');
      const from    = (document.getElementById('gb-from').value.trim()  || '');
      const message = msgEl.value.trim();

      if (!message) {
        showGbToast('✦  메시지를 입력해주세요');
        msgEl.focus();
        return;
      }

      const btn = document.getElementById('gb-submit-btn');
      btn.classList.add('loading');

      const entry = {
        id:        Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        name:      name + (from ? ` · ${from}` : ''),
        message,
        page:      getPageLabel(),
        date:      new Date().toISOString(),
        sessionId: sessionId
      };

      allEntries = [entry, ...allEntries];
      const ok = await saveEntries(allEntries);

      btn.classList.remove('loading');

      if (ok) {
        document.getElementById('gb-name').value    = '';
        document.getElementById('gb-from').value    = '';
        msgEl.value = '';
        countEl.textContent = '0 / 300';
        displayCount = PAGE_SIZE;
        renderEntries();
        showGbToast('✦  방명록에 기록되었습니다');
        section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        showGbToast('✦  저장에 실패했습니다. 다시 시도해주세요');
      }
    });

    // Enter 키 (Ctrl+Enter로 제출)
    msgEl.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        document.getElementById('gb-submit-btn')?.click();
      }
    });
  }

  /* 스토리지 API 없으면 조용히 스킵 */
  if (window.storage) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  } else {
    console.warn('[Guestbook] window.storage unavailable — skipping guestbook init');
  }

})();
