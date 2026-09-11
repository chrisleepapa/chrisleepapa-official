/* Chris's Pick media thumbnails: image separate from text action card */
'use strict';
(() => {
  const SPOTIFY_BY_TITLE = {
    'When the City Stood Still':'5qWOsYCJgw1bmXqvko7Thv',
    'To The Space':'1JyYgZ8VTbh5mASNezCTcJ',
    'Ensemble':'2X3dnf8vnhCSQ0c7H9oZht',
    'To Rise':'2OSKuof7gooLElmFYvoygK',
    '사랑한다고':'2s7tJtoaxDT8KUkJ3OL8DD',
    '2026 난리났어':'2AzUPgjWYDodUqFTNjPU1l',
    '벽력일섬':'25T549XyXnmiZhqGn7p4x4',
    '영역전개':'6rZBdEFTJ5mLwINtn9C8KZ',
    'We own the Cup':'0sR4hKvhzN4U2GaQKx6Qek',
    'Run It Back':'1VCjArWmxZJakdawRkEeCi'
  };
  const YOUTUBE = {
    'FURIOUS':'kAkGg2t1Ats',
    '역대급 출연진 귀칼 실사 촬영 현장 #귀멸의칼날':'byxLKvBHULk',
    '사랑한다고 MV':'vlt7VfCA8bM'
  };
  const rendered = new WeakSet();

  const addThumb = (card, src, alt) => {
    if (!card || !src || rendered.has(card)) return;

    const old = card.parentElement?.querySelector(':scope > .clp-pick-media-wrap > .clp-pick-media-thumb');
    if (old) { rendered.add(card); return; }

    const wrapper = document.createElement('div');
    wrapper.className = 'clp-pick-media-wrap';

    const img = document.createElement('img');
    img.className = 'clp-pick-media-thumb';
    img.src = src;
    img.alt = alt || '';
    img.loading = 'eager';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('error', () => wrapper.remove(), {once:true});

    const parent = card.parentElement;
    if (!parent) return;

    parent.insertBefore(wrapper, card);
    wrapper.appendChild(img);
    wrapper.appendChild(card);
    rendered.add(card);
  };

  const albumIdFromCard = (card, title) => {
    const href = card.getAttribute('href') || '';
    const match = href.match(/[?&]album=([^&#]+)/);
    return match ? decodeURIComponent(match[1]) : SPOTIFY_BY_TITLE[title] || '';
  };

  const apply = () => {
    const root = document.getElementById('chris-pick');
    if (!root) return;
    const card = root.querySelector('.clp-pick-main');
    const titleEl = root.querySelector('.clp-pick-title');
    if (!card || !titleEl) return;
    const title = titleEl.textContent.trim();

    const yt = YOUTUBE[title];
    if (yt) {
      addThumb(card, `https://img.youtube.com/vi/${yt}/maxresdefault.jpg`, `${title} YouTube thumbnail`);
      return;
    }

    const albumId = albumIdFromCard(card, title);
    if (!albumId) return;
    const cacheKey = `clp-spotify-art-${albumId}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      addThumb(card, cached, `${title} album cover`);
      return;
    }

    fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/album/${albumId}`)}`)
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Spotify oEmbed failed')))
      .then(data => {
        if (!data.thumbnail_url) return;
        sessionStorage.setItem(cacheKey, data.thumbnail_url);
        addThumb(card, data.thumbnail_url, `${title} album cover`);
      })
      .catch(() => {});
  };

  const style = document.createElement('style');
  style.textContent = `
    #chris-pick .clp-pick-media-wrap {
      width:100%;
      margin:0 0 22px;
    }
    #chris-pick .clp-pick-media-thumb {
      display:block;
      width:100%;
      aspect-ratio:16/9;
      object-fit:cover;
      object-position:center;
      margin:0;
      border-radius:inherit;
      background:#111;
      box-shadow:0 14px 35px rgba(0,0,0,.28);
    }
    #chris-pick .clp-pick-media-wrap > .clp-pick-main {
      margin-top:22px;
    }
    @media (max-width:700px){
      #chris-pick .clp-pick-media-wrap { margin-bottom:16px; }
      #chris-pick .clp-pick-media-wrap > .clp-pick-main { margin-top:16px; }
    }
  `;
  document.head.appendChild(style);

  const root = document.getElementById('chris-pick');
  if (root) {
    const observer = new MutationObserver(apply);
    observer.observe(root, {childList:true, subtree:true});
    apply();
  } else {
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  }
})();
