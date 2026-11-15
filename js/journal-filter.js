(() => {
  const filter = document.getElementById('journal-filter');
  const status = document.getElementById('journal-filter-status');
  const entries = [...document.querySelectorAll('[data-journal-topic]')];
  const buttons = [...filter.querySelectorAll('button[data-topic]')];

  filter.addEventListener('click', event => {
    const chosen = event.target.closest('button[data-topic]');
    if (!chosen) return;
    const topic = chosen.dataset.topic;
    const visibleEntries = entries.filter(entry => {
      const show = topic === 'all' || entry.dataset.journalTopic === topic;
      entry.hidden = !show;
      return show;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button === chosen)));
    status.textContent = document.documentElement.lang === 'en'
      ? `Showing ${visibleEntries.length} journal entries`
      : `저널 ${visibleEntries.length}편 표시`;
  });

  filter.hidden = false;
})();
