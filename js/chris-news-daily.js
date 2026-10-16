(() => {
  const root = document.getElementById('chris-news');
  if (!root) return;
  const grid = root.querySelector('.chris-news-grid');
  if (!grid) return;

  const safeText = (value) => String(value || '')
    .replace(/<a\b[^>]*>/gi, '')
    .replace(/<\/a>|<font\b[^>]*>|<\/font>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ').trim();
  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const dateLabel = (date, lang) => {
    if (lang === 'en') {
      const d = new Date(date + 'T12:00:00+09:00');
      return Number.isNaN(d.getTime()) ? date : new Intl.DateTimeFormat('en-US', {month:'short',day:'2-digit',year:'numeric',timeZone:'Asia/Seoul'}).format(d).toUpperCase();
    }
    return date.replaceAll('-', '.');
  };
  const articleDateLabel = (value, fallback, lang) => {
    const parsed = value ? new Date(value) : null;
    const date = parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date((fallback || '') + 'T12:00:00+09:00');
    if (Number.isNaN(date.getTime())) return fallback || '';
    if (lang === 'en') return 'ARTICLE ' + new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'Asia/Seoul' }).format(date).toUpperCase();
    const parts = new Intl.DateTimeFormat('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Seoul' }).format(date);
    return '기사 ' + parts.replaceAll('-', '.');
  };
  const hasHangul = (value) => /[\uAC00-\uD7A3]/.test(String(value || ''));
  const hasBoilerplate = (value) => /this will let google show|match or are related to your search|comprehensive up-to-date news coverage|a working is named/i.test(String(value || ''));
  const validatePayload = (payload, lang) => {
    if (!payload || !Array.isArray(payload.cards) || payload.cards.length !== 6) return false;
    const seenTitles = new Set();
    for (const item of payload.cards) {
      const title = lang === 'en' ? (item.titleEn || item.title) : item.titleKo;
      const summary = lang === 'en' ? (item.summaryEn || item.summary) : item.summaryKo;
      const points = lang === 'en' ? (item.pointsEn || item.points) : item.pointsKo;
      const normalized = String(title || '').toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, '');
      if (!title || !summary || !Array.isArray(points) || points.length < 2 ||
          (lang === 'ko' && (!hasHangul(title) || !hasHangul(summary) || points.some(point => !hasHangul(point)))) ||
          [title, summary, ...points].some(hasBoilerplate) || seenTitles.has(normalized)) return false;
      const uniquePoints = new Set(points.map(point => String(point).toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, '')));
      if (uniquePoints.size < Math.min(2, points.length)) return false;
      seenTitles.add(normalized);
    }
    return true;
  };
  const render = (payload) => {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    if (!validatePayload(payload, lang)) throw new Error('News data failed language and editorial quality checks.');
    const frag = document.createDocumentFragment();
    payload.cards.forEach((item, index) => {
      const card = make('article', 'chris-news-card chris-news-card--' + (item.category || 'default'));
      card.dataset.category = item.category || 'default';
      const top = make('div', 'chris-news-card-top');
      top.append(make('span', '', 'CARD ' + String(index + 1).padStart(2, '0')));
      top.append(make('span', 'chris-news-card-date', articleDateLabel(item.publishedAt, payload.date, lang)));
      card.append(top);
      card.append(make('p', 'chris-news-card-kicker', lang === 'en' ? item.categoryEn : item.categoryKo));
      const title = make('h3', '', lang === 'en' ? item.titleEn || item.title : item.titleKo);
      card.append(title);
      card.append(make('p', 'chris-news-summary', safeText(lang === 'en' ? item.summaryEn || item.summary : item.summaryKo)));
      const points = make('div', 'chris-news-points');
      (lang === 'en' ? item.pointsEn || item.points : item.pointsKo).slice(0, 3).forEach((point) => points.append(make('div', 'chris-news-point', point)));
      card.append(points);
      const footer = make('div', 'chris-news-card-footer');
      const link = make('a', 'chris-news-source', (item.source || '원문 보기') + ' ↗');
      link.href = item.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', (lang === 'en' ? 'Read source: ' : '원문 보기: ') + (item.source || item.title));
      footer.append(link);
      card.append(footer);
      frag.append(card);
    });
    grid.replaceChildren(frag);
    grid.dataset.dailyNewsDate = payload.date;
    const note = root.querySelector('.chris-news-note span');
    if (note) note.textContent = lang === 'en'
      ? 'Daily stories collected from direct publisher RSS feeds and linked to original reports. News date: ' + payload.date + '.'
      : 'BBC·가디언·알자지라·NPR·연합뉴스 등 언론사 RSS에서 직접 수집한 기사이며 원문으로 연결됩니다. 뉴스 기준일: ' + payload.date + '.';
    const title = root.querySelector('#chris-news-title');
    if (title) title.textContent = "Chris's News";
  };

  const load = async () => {
    try {
      const response = await fetch('/data/chris-news.json?ts=' + Date.now(), { cache: 'no-store' });
      if (!response.ok) throw new Error('News data request failed: ' + response.status);
      const payload = await response.json();
      render(payload);
    } catch (error) {
      console.warn("Daily Chris's News data is not available.", error);
      const note = root.querySelector('.chris-news-note span');
      if (note) note.textContent = document.documentElement.lang === 'en'
        ? 'The latest news failed editorial or language checks. Please try again later.'
        : '최신 뉴스의 번역 또는 품질 검증에 실패했습니다. 기존 기사를 임의로 바꾸지 않고 잠시 후 다시 확인합니다.';
    }
  };
  load();
  new MutationObserver(() => {
    const payloadDate = grid.dataset.dailyNewsDate;
    if (!payloadDate) return;
    // Re-fetch on language changes so the six cards use the matching translated fields.
    load();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();