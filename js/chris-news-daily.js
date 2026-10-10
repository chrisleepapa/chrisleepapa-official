(() => {
  const root = document.getElementById('chris-news');
  if (!root) return;
  const grid = root.querySelector('.chris-news-grid');
  if (!grid) return;

  const safeText = (value) => String(value || '').trim();
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
  const render = (payload) => {
    if (!payload || !Array.isArray(payload.cards) || payload.cards.length !== 6) return;
    const lang = document.documentElement.lang === 'en' ? 'en' : 'ko';
    const frag = document.createDocumentFragment();
    payload.cards.forEach((item, index) => {
      const card = make('article', 'chris-news-card');
      const top = make('div', 'chris-news-card-top');
      top.append(make('span', '', 'CARD ' + String(index + 1).padStart(2, '0')));
      top.append(make('span', 'chris-news-card-date', dateLabel(payload.date, lang)));
      card.append(top);
      card.append(make('p', 'chris-news-card-kicker', lang === 'en' ? item.categoryEn : item.categoryKo));
      const title = make('h3', '', lang === 'en' ? item.titleEn || item.title : item.title);
      card.append(title);
      card.append(make('p', 'chris-news-summary', lang === 'en' ? item.summaryEn || item.summary : item.summary));
      const points = make('div', 'chris-news-points');
      (item.points || []).slice(0, 3).forEach((point) => points.append(make('div', 'chris-news-point', point)));
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
      ? 'Daily headlines collected from Google News RSS and linked to original reports. News date: ' + payload.date + '.'
      : 'Google 뉴스 RSS에서 매일 수집한 헤드라인이며 원문 기사로 연결됩니다. 뉴스 기준일: ' + payload.date + '.';
    const title = root.querySelector('#chris-news-title');
    if (title) title.textContent = "Chris's News";
  };

  const load = async () => {
    try {
      const response = await fetch('/data/chris-news.json?ts=' + Date.now(), { cache: 'no-store' });
      if (!response.ok) return;
      render(await response.json());
    } catch (error) {
      console.warn('Daily Chris\'s News data is not available; keeping the built-in cards.', error);
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