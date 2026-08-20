/**
 * Chris LEE.PAPA — Unified Guestbook
 * Supabase 기반 통합 방명록
 * 모든 페이지 하단에 공통으로 삽입됩니다.
 *
 * ※ 닉네임: 영문 3글자 (대소문자 허용, 자동 대문자 변환)
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════
     Supabase 설정 (music.html 과 동일한 키)
     ══════════════════════════════════════ */
  const SUPA_URL  = 'https://cvfmkcxmxkmemmshfttn.supabase.co';
  const SUPA_KEY  = 'sb_publishable_Bb_GkRPWRFeAPvIduwPTJg_O1z_sStm';
  const TABLE     = 'guestbook';   // Supabase 테이블명

  /* ══════════════════════════════════════
     i18n — main.js 의 언어 전환(setLanguage)과 연동
     (guestbook.js 는 DOM을 직접 생성하므로 data-i18n 대신
      자체 사전을 두고 window.onLangChange 훅으로 갱신합니다)
     ══════════════════════════════════════ */
  const GB_I18N = {
    ko: {
      tag:            '✦ &nbsp; Guestbook &nbsp; ✦',
      title:          '당신의 <span>발자국</span>을 남겨주세요',
      label_nickname: 'Nickname',
      label_message:  'Message',
      name_hint_default: '영문 3글자',
      name_hint_more:    n => `${n}글자 더 입력해주세요`,
      name_hint_done:    '✓ 완성',
      message_placeholder: '이곳에 방문한 소감, 응원의 말을 남겨주세요 ✦',
      submit_btn:     '남기기',
      list_label:     'Messages',
      empty_text:     '가장 먼저 방명록에 메시지를 남겨보세요',
      load_more:      '더 보기',
      aria_label:     '방명록',
      toast_invalid_name: '✦  닉네임은 영문 3글자여야 합니다',
      toast_empty_msg:    '✦  메시지를 입력해주세요',
      toast_short_msg:    '✦  내용을 좀 더 입력해주세요',
      toast_success:      '✦  방명록에 기록되었습니다 🙏',
      toast_fail:         '✦  저장에 실패했습니다. 다시 시도해주세요',
    },
    en: {
      tag:            '✦ &nbsp; Guestbook &nbsp; ✦',
      title:           'Leave your <span>footprint</span> here',
      label_nickname: 'Nickname',
      label_message:  'Message',
      name_hint_default: '3 English letters',
      name_hint_more:    n => `${n} more letter${n > 1 ? 's' : ''} needed`,
      name_hint_done:    '✓ Complete',
      message_placeholder: 'Share your thoughts or a word of support here ✦',
      submit_btn:     'Submit',
      list_label:     'Messages',
      empty_text:     'Be the first to leave a message',
      load_more:      'Load More',
      aria_label:     'Guestbook',
      toast_invalid_name: '✦  Nickname must be 3 English letters',
      toast_empty_msg:    '✦  Please enter a message',
      toast_short_msg:    '✦  Please write a bit more',
      toast_success:      '✦  Your message has been recorded 🙏',
      toast_fail:         '✦  Failed to save. Please try again',
    },
  };

  /** 현재 언어 (main.js 와 동일한 localStorage 키 공유) */
  function getSavedLang() {
    try {
      return localStorage.getItem('pref-lang') === 'en' ? 'en' : 'ko';
    } catch (_) {
      return 'ko';
    }
  }

  let gbLang = getSavedLang();

  /** 번역 헬퍼 */
  function t(key) {
    const dict = GB_I18N[gbLang] || GB_I18N.ko;
    return dict[key] !== undefined ? dict[key] : GB_I18N.ko[key];
  }

  /* ══════════════════════════════════════
     CSS 주입
     ══════════════════════════════════════ */
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

    /* 닉네임 + 출신지 그리드 */
    .gb-form-row {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 16px;
      margin-bottom: 16px;
      align-items: start;
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

    /* 닉네임 힌트 */
    .gb-name-hint {
      font-family: 'Pretendard', sans-serif;
      font-size: 0.62rem;
      color: rgba(200,196,190,0.3);
      letter-spacing: 0.5px;
      margin-top: 2px;
    }

    .gb-name-hint.error {
      color: rgba(255,120,100,0.75);
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

    /* 닉네임 입력: 중앙 정렬 + 대문자 강조 */
    #gb-name {
      text-align: center;
      letter-spacing: 6px;
      font-family: 'Cinzel', serif;
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .gb-input.invalid {
      border-color: rgba(255,100,80,0.5);
      box-shadow: 0 0 0 3px rgba(255,80,60,0.08);
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

    /* 아바타: 영문 3글자 표시 */
    .gb-avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.08));
      border: 1px solid rgba(201,168,76,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Cinzel', serif;
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: rgba(201,168,76,0.9);
      flex-shrink: 0;
    }

    .gb-entry-meta { flex: 1; }

    .gb-entry-name {
      font-family: 'Cinzel', serif;
      font-size: 0.78rem;
      letter-spacing: 2px;
      color: rgba(240,236,228,0.9);
      display: block;
      margin-bottom: 3px;
      text-transform: uppercase;
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

    /* 로딩 스피너 */
    .gb-loading {
      text-align: center;
      padding: 40px 20px;
      color: rgba(201,168,76,0.4);
      font-family: 'Cinzel', serif;
      font-size: 0.65rem;
      letter-spacing: 4px;
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

  /* ══════════════════════════════════════
     유틸
     ══════════════════════════════════════ */

  /** XSS 방어 */
  function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /** 날짜 포맷 */
  function formatDate(iso) {
    const d = new Date(iso);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}.${pad(d.getMonth()+1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  /** 현재 페이지 라벨 */
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

  /** 닉네임 유효성 검사 — 영문 3글자만 허용 */
  function isValidNickname(value) {
    return /^[A-Za-z]{3}$/.test(value);
  }

  /* ══════════════════════════════════════
     토스트
     ══════════════════════════════════════ */
  let toastEl    = null;
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

  /* ══════════════════════════════════════
     Supabase API 헬퍼
     ══════════════════════════════════════ */
  const HEADERS = {
    apikey:        SUPA_KEY,
    Authorization: `Bearer ${SUPA_KEY}`,
    'Content-Type': 'application/json',
    'Prefer':      'return=minimal'
  };

  /** 방명록 목록 가져오기 (최신순) */
  async function fetchEntries() {
    const res = await fetch(
      `${SUPA_URL}/rest/v1/${TABLE}?order=created_at.desc`,
      { headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` } }
    );
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return res.json();
  }

  /** 방명록 글 저장 */
  async function insertEntry({ nickname, message, page }) {
    const res = await fetch(
      `${SUPA_URL}/rest/v1/${TABLE}`,
      {
        method:  'POST',
        headers: HEADERS,
        body:    JSON.stringify({ nickname, message, page })
      }
    );
    if (!res.ok) throw new Error(`Insert failed: ${res.status}`);
    return true;
  }

  /* ══════════════════════════════════════
     렌더링
     ══════════════════════════════════════ */
  const PAGE_SIZE   = 10;
  let   allEntries  = [];
  let   displayCount = PAGE_SIZE;

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
          <p>${sanitize(t('empty_text'))}</p>
        </div>`;
      if (moreBtn) moreBtn.style.display = 'none';
      return;
    }

    const visible = allEntries.slice(0, displayCount);
    container.innerHTML = visible.map((e, i) => {
      const nick = String(e.nickname || 'GUE').toUpperCase().slice(0, 3);
      const text = String(e.message || '');
      const date = e.created_at ? String(e.created_at).slice(0, 10) : '';
      const page = String(e.page || '');
      return `
        <div class="gb-entry" style="animation-delay:${i * 0.04}s">
          <div class="gb-entry-header">
            <div class="gb-avatar">${sanitize(nick)}</div>
            <div class="gb-entry-meta">
              <span class="gb-entry-name">${sanitize(nick)}</span>
              <div class="gb-entry-info">
                <span class="gb-entry-date">${sanitize(date)}</span>
                ${page ? `<span class="gb-entry-page">${sanitize(page)}</span>` : ''}
              </div>
            </div>
          </div>
          <p class="gb-entry-text">${sanitize(text).replace(/\n/g, '<br>')}</p>
        </div>
      `;
    }).join('');

    if (moreBtn) {
      moreBtn.textContent  = t('load_more');
      moreBtn.style.display = displayCount >= total ? 'none' : '';
    }
  }

  /* ══════════════════════════════════════
     HTML 생성
     ══════════════════════════════════════ */
  function buildGuestbookHTML() {
    return `
      <section id="guestbook-section" aria-label="${t('aria_label')}">
        <div class="gb-inner">

          <div class="gb-header">
            <span class="gb-tag" id="gb-tag">${t('tag')}</span>
            <h2 class="gb-title" id="gb-title-text">${t('title')}</h2>
            <div class="gb-divider"></div>
          </div>

          <!-- 작성 폼 -->
          <div class="gb-form-wrap">

            <div class="gb-form-row">
              <!-- 닉네임: 영문 3글자 -->
              <div class="gb-field">
                <label class="gb-label" for="gb-name" id="gb-label-nickname">${t('label_nickname')}</label>
                <input
                  id="gb-name"
                  class="gb-input"
                  type="text"
                  placeholder="ABC"
                  maxlength="3"
                  autocomplete="off"
                  spellcheck="false"
                  inputmode="text"
                />
                <span class="gb-name-hint" id="gb-name-hint">${t('name_hint_default')}</span>
              </div>

              <!-- 메시지 -->
              <div class="gb-field">
                <label class="gb-label" for="gb-message" id="gb-label-message">${t('label_message')}</label>
                <textarea
                  id="gb-message"
                  class="gb-textarea"
                  placeholder="${t('message_placeholder')}"
                  maxlength="300"
                ></textarea>
              </div>
            </div>

            <div class="gb-form-footer">
              <span class="gb-char-count" id="gb-char-count">0 / 300</span>
              <button class="gb-submit-btn" id="gb-submit-btn" type="button">
                <span id="gb-submit-btn-text">${t('submit_btn')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- 목록 헤더 -->
          <div class="gb-list-header">
            <span class="gb-list-label" id="gb-list-label">${t('list_label')}</span>
            <span class="gb-count-badge" id="gb-count">0</span>
          </div>

          <!-- 엔트리 목록 -->
          <div class="gb-entries" id="gb-entries-list">
            <div class="gb-loading">· · ·</div>
          </div>

          <div class="gb-load-more">
            <button class="gb-load-more-btn" id="gb-load-more-btn" type="button" style="display:none">
              ${t('load_more')}
            </button>
          </div>

        </div>
      </section>
    `;
  }

  /* ══════════════════════════════════════
     초기화
     ══════════════════════════════════════ */
  async function init() {
    /* site-footer 바로 앞에 삽입 */
    const footer  = document.getElementById('site-footer');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildGuestbookHTML();
    const section = wrapper.firstElementChild;

    if (footer) {
      footer.parentNode.insertBefore(section, footer);
    } else {
      document.body.appendChild(section);
    }

    /* ── 언어 전환 연동 ──
       main.js 의 setLanguage() 가 호출하는 window.onLangChange 를
       가로채어(체이닝) 방명록 UI 도 함께 갱신합니다. */
    function updateGbLanguage(lang) {
      gbLang = (lang === 'en') ? 'en' : 'ko';

      section.setAttribute('aria-label', t('aria_label'));

      const tagEl   = document.getElementById('gb-tag');
      const titleEl = document.getElementById('gb-title-text');
      const nickLbl = document.getElementById('gb-label-nickname');
      const msgLbl  = document.getElementById('gb-label-message');
      const submitTxt = document.getElementById('gb-submit-btn-text');
      const listLbl = document.getElementById('gb-list-label');
      const msgInput = document.getElementById('gb-message');
      const nickInput = document.getElementById('gb-name');
      const hintEl  = document.getElementById('gb-name-hint');

      if (tagEl)   tagEl.innerHTML   = t('tag');
      if (titleEl) titleEl.innerHTML = t('title');
      if (nickLbl) nickLbl.textContent = t('label_nickname');
      if (msgLbl)  msgLbl.textContent  = t('label_message');
      if (submitTxt) submitTxt.textContent = t('submit_btn');
      if (listLbl) listLbl.textContent = t('list_label');
      if (msgInput) msgInput.setAttribute('placeholder', t('message_placeholder'));

      /* 닉네임 힌트는 현재 입력 상태에 맞춰 재계산 */
      if (hintEl && nickInput) {
        const len = nickInput.value.length;
        if (len === 0) {
          hintEl.textContent = t('name_hint_default');
        } else if (len < 3) {
          hintEl.textContent = t('name_hint_more')(3 - len);
        } else {
          hintEl.textContent = t('name_hint_done');
        }
      }

      /* 빈 상태 문구 · 더 보기 버튼 문구 갱신 */
      renderEntries();
    }

    const existingOnLangChange = window.onLangChange;
    window.onLangChange = function (lang) {
      if (typeof existingOnLangChange === 'function') {
        try { existingOnLangChange(lang); } catch (e) { console.error('[Guestbook] onLangChange chain error:', e); }
      }
      updateGbLanguage(lang);
    };

    /* ── 데이터 로드 ── */
    try {
      allEntries = await fetchEntries();
    } catch (e) {
      console.error('[Guestbook] fetchEntries error:', e);
      allEntries = [];
    }
    renderEntries();

    /* ── 닉네임 입력 처리 ── */
    const nameInput = document.getElementById('gb-name');
    const nameHint  = document.getElementById('gb-name-hint');

    nameInput.addEventListener('input', () => {
      // 영문 외 문자 실시간 제거
      nameInput.value = nameInput.value.replace(/[^A-Za-z]/g, '').toUpperCase();

      const len = nameInput.value.length;
      if (len === 0) {
        nameHint.textContent = t('name_hint_default');
        nameHint.className   = 'gb-name-hint';
        nameInput.classList.remove('invalid');
      } else if (len < 3) {
        nameHint.textContent = t('name_hint_more')(3 - len);
        nameHint.className   = 'gb-name-hint error';
        nameInput.classList.add('invalid');
      } else {
        nameHint.textContent = t('name_hint_done');
        nameHint.className   = 'gb-name-hint';
        nameInput.classList.remove('invalid');
      }
    });

    /* ── 글자 수 카운터 ── */
    const msgEl   = document.getElementById('gb-message');
    const countEl = document.getElementById('gb-char-count');

    msgEl.addEventListener('input', () => {
      const len = msgEl.value.length;
      countEl.textContent = `${len} / 300`;
      countEl.classList.toggle('warn', len > 260);
    });

    /* ── 더보기 ── */
    document.getElementById('gb-load-more-btn')?.addEventListener('click', () => {
      displayCount += PAGE_SIZE;
      renderEntries();
    });

    /* ── 제출 ── */
    document.getElementById('gb-submit-btn')?.addEventListener('click', async () => {
      const nickname = nameInput.value.trim().toUpperCase();
      const message  = msgEl.value.trim();
      const page     = getPageLabel();
      const btn      = document.getElementById('gb-submit-btn');

      /* 닉네임 유효성 검사 */
      if (!isValidNickname(nickname)) {
        showGbToast(t('toast_invalid_name'));
        nameInput.classList.add('invalid');
        nameInput.focus();
        return;
      }

      /* 메시지 유효성 검사 */
      if (!message) {
        showGbToast(t('toast_empty_msg'));
        msgEl.focus();
        return;
      }
      if (message.length < 2) {
        showGbToast(t('toast_short_msg'));
        msgEl.focus();
        return;
      }

      /* 제출 */
      btn.classList.add('loading');
      try {
        await insertEntry({ nickname, message, page });

        /* 성공: 폼 초기화 */
        nameInput.value      = '';
        msgEl.value          = '';
        countEl.textContent  = '0 / 300';
        nameHint.textContent = t('name_hint_default');
        nameHint.className   = 'gb-name-hint';
        nameInput.classList.remove('invalid');
        displayCount = PAGE_SIZE;

        showGbToast(t('toast_success'));

        /* 목록 새로고침 */
        allEntries = await fetchEntries();
        renderEntries();
        section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      } catch (e) {
        console.error('[Guestbook] insertEntry error:', e);
        showGbToast(t('toast_fail'));
      } finally {
        btn.classList.remove('loading');
      }
    });

    /* ── Ctrl+Enter 단축키 ── */
    msgEl.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        document.getElementById('gb-submit-btn')?.click();
      }
    });
  }

  /* DOM 준비 후 실행 */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
