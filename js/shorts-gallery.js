const filters = document.querySelectorAll('[data-short-filter]');
const shorts = document.querySelectorAll('.media-shorts-link');
for (const button of filters) {
  button.addEventListener('click', () => {
    for (const filter of filters) filter.setAttribute('aria-pressed', String(filter === button));
    const kind = button.dataset.shortFilter;
    for (const clip of shorts) clip.hidden = kind !== 'all' && clip.dataset.shortKind !== kind;
  });
}
for (const image of document.querySelectorAll('.media-shorts-thumb')) {
  function checkThumbnail() {
    if (image.naturalWidth > 120) return;
    if (image.src.endsWith('maxresdefault.jpg')) image.src = image.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
    else image.hidden = true;
  }
  image.addEventListener('error', checkThumbnail);
  image.addEventListener('load', checkThumbnail);
  if (image.complete) checkThumbnail();
}
