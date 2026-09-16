/* Bible chapter persistence: harden the actual Supabase write path used by bible.html. */
'use strict';
(() => {
  if (window.__clpBibleDirectPersistenceInstalled) return;
  const nativeFetch = window.fetch.bind(window);
  const SUPA_PATH = '/rest/v1/bible';

  function getChapterPayload(init) {
    try {
      if (!init || typeof init.body !== 'string') return null;
      const payload = JSON.parse(init.body);
      if (!payload || typeof payload !== 'object') return null;
      if (typeof payload.verse_key !== 'string' || !payload.verse_key.endsWith('-CH')) return null;
      return payload;
    } catch (_) {
      return null;
    }
  }

  window.fetch = async function(input, init) {
    const url = typeof input === 'string' ? input : input?.url || '';
    const method = String(init?.method || (typeof input !== 'string' ? input?.method : 'GET')).toUpperCase();
    const chapterPayload = method === 'POST' && url.includes(SUPA_PATH) ? getChapterPayload(init) : null;
    if (!chapterPayload) return nativeFetch(input, init);

    let lastError = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await nativeFetch(input, init);
        if (response.ok) {
          console.info('[Bible] chapter persistence confirmed:', chapterPayload.verse_key, chapterPayload.is_read);
          return response;
        }
        lastError = new Error(`Bible chapter save HTTP ${response.status}`);
      } catch (error) {
        lastError = error;
      }
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, attempt * 300));
    }
    throw lastError || new Error('Bible chapter save failed');
  };

  window.__clpBibleDirectPersistenceInstalled = true;
  console.info('[Bible] direct Supabase chapter persistence installed');
})();
