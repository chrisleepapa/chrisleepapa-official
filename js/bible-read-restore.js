/** Restore Bible chapter-read checks directly from persisted Supabase -CH rows. */
'use strict';
(() => {
  const SUPA_URL = 'https://cvfmkcxmxkmemmshfttn.supabase.co';
  const SUPA_KEY = 'sb_publishable_Bb_GkRPWRFeAPvIduwPTJg_O1z_sStm';
  let attempts = 0;
  const maxAttempts = 120;
  let restored = false;

  function getUserId() {
    try {
      const session = window.CLPAuth?.getUser?.();
      if (session?.initials) return String(session.initials).trim();
      const raw = localStorage.getItem('chrisleepapa-auth-session-v3');
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed?.initials) return String(parsed.initials).trim();
      const legacy = localStorage.getItem('bible_user_id');
      if (legacy) return String(legacy).trim();
    } catch (_) {}
    return '';
  }

  async function restore() {
    if (restored) return;
    attempts += 1;
    if (attempts > maxAttempts) return;

    if (typeof window.renderChapterGrid !== 'function' ||
        typeof window.renderContent !== 'function' ||
        typeof window.userState === 'undefined') {
      return setTimeout(restore, 200);
    }

    const grid = document.getElementById('chapterGrid');
    if (!grid) return setTimeout(restore, 200);

    const userId = getUserId();
    if (!userId) return setTimeout(restore, 300);

    try {
      const response = await fetch(
        `${SUPA_URL}/rest/v1/bible?select=verse_key,is_read&user_id=eq.${encodeURIComponent(userId)}&verse_key=like.*-CH`,
        {
          cache: 'no-store',
          headers: {
            apikey: SUPA_KEY,
            Authorization: `Bearer ${SUPA_KEY}`
          }
        }
      );
      if (!response.ok) throw new Error(`Supabase chapter restore HTTP ${response.status}`);

      const rows = await response.json();
      rows.forEach(row => {
        if (!row?.verse_key || !String(row.verse_key).endsWith('-CH')) return;
        const chKey = String(row.verse_key).slice(0, -3);
        window.userState.chapters[chKey] = row.is_read === true;
      });

      window.renderChapterGrid();
      window.renderContent();
      restored = true;
      console.info('[Bible] chapter-read state restored directly from Supabase:', rows.length);
    } catch (error) {
      console.error('[Bible] direct chapter-read restore failed:', error);
      if (attempts < maxAttempts) setTimeout(restore, 500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(restore, 500), { once: true });
  } else {
    setTimeout(restore, 500);
  }
})();
