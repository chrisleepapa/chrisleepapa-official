import fs from 'node:fs/promises';

const apiKey = process.env.YOUTUBE_API_KEY;
if (!apiKey) {
  console.error('Missing YOUTUBE_API_KEY GitHub Actions secret. Add a free YouTube Data API v3 key to enable daily updates.');
  process.exit(1);
}

const timeZone = 'Asia/Seoul';
const parts = new Intl.DateTimeFormat('en-CA', {
  timeZone, year: 'numeric', month: '2-digit', day: '2-digit'
}).formatToParts(new Date());
const current = Object.fromEntries(parts.map(p => [p.type, p.value]));
const todayKst = new Date(Date.UTC(Number(current.year), Number(current.month) - 1, Number(current.day)));
const yesterday = new Date(todayKst.getTime() - 86400000);
const dateKey = yesterday.toISOString().slice(0, 10);
const publishedAfter = yesterday.toISOString();
const publishedBefore = todayKst.toISOString();

const searches = [
  '한국 뉴스 이슈',
  '한국 인기 음악 엔터테인먼트',
  '한국 화제 영상'
];

async function youtube(path, params) {
  const url = new URL('https://www.googleapis.com/youtube/v3/' + path);
  for (const [key, value] of Object.entries({ ...params, key: apiKey })) url.searchParams.set(key, value);
  const response = await fetch(url);
  const body = await response.json();
  if (!response.ok) throw new Error('YouTube API ' + response.status + ': ' + (body.error?.message || response.statusText));
  return body;
}

const found = new Map();
for (const q of searches) {
  const data = await youtube('search', {
    part: 'snippet', type: 'video', order: 'viewCount', regionCode: 'KR',
    relevanceLanguage: 'ko', maxResults: '10',
    publishedAfter, publishedBefore, q
  });
  for (const item of data.items || []) {
    const id = item.id?.videoId;
    if (!id || found.has(id)) continue;
    found.set(id, {
      id,
      title: item.snippet?.title || 'YouTube video',
      channel: item.snippet?.channelTitle || '',
      publishedAt: item.snippet?.publishedAt || '',
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || ''
    });
  }
}

const candidates = [...found.values()];
if (candidates.length) {
  const stats = await youtube('videos', {
    part: 'statistics,snippet', id: candidates.map(v => v.id).join(',')
  });
  const byId = new Map((stats.items || []).map(v => [v.id, v]));
  for (const video of candidates) {
    const currentVideo = byId.get(video.id);
    video.viewCount = Number(currentVideo?.statistics?.viewCount || 0);
    if (currentVideo?.snippet?.thumbnails?.high?.url) video.thumbnail = currentVideo.snippet.thumbnails.high.url;
  }
}
const videos = candidates.sort((a, b) => b.viewCount - a.viewCount).slice(0, 3);
if (!videos.length) throw new Error('YouTube API returned no videos for ' + dateKey);
const output = { date: dateKey, timezone: timeZone, updatedAt: new Date().toISOString(), method: 'published-yesterday-ranked-by-current-views', videos };
await fs.writeFile('data/youtube-daily-top3.json', JSON.stringify(output, null, 2) + '\n');
console.log('Wrote ' + videos.length + ' videos for ' + dateKey);
for (const video of videos) console.log(video.viewCount + ' views — ' + video.title);
