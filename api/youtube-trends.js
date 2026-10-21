export default async function handler(req, res) {
  // Stable for a Korean calendar day; the selection rotates on the next day.
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=60');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const decode = (value = '') => value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  function dailySeed(dateText) {
    let hash = 2166136261;
    for (let i = 0; i < dateText.length; i++) {
      hash ^= dateText.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function dailyIndex(seed, salt, length) {
    let value = (seed ^ salt) >>> 0;
    value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
    value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
    return ((value ^ (value >>> 16)) >>> 0) % length;
  }

  async function getTop100MusicVideos() {
    // RSSHub's TopVideos route exposes entries from YouTube's official chart.
    const response = await fetch('https://rsshub.app/youtube/charts/TopVideos/global', {
      headers: {
        'User-Agent': 'Mozilla/5.0 ChrisLeePapaArchive/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml'
      }
    });
    if (!response.ok) throw new Error('YouTube Top Videos chart returned ' + response.status);
    const xml = await response.text();
    const items = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map((match, rank) => {
      const body = match[1];
      const field = name => (body.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>', 'i')) || [,''])[1];
      const title = decode(field('title'));
      const raw = decode(field('link')) + ' ' + field('description');
      const idMatch = raw.match(/(?:youtube\.com\/(?:watch\?(?:[^\s"'<>]*?&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
      if (!idMatch || !title) return null;
      const id = idMatch[1];
      return {
        id,
        title,
        chart: 'YouTube Top Music Videos',
        chartRank: rank + 1,
        url: 'https://www.youtube.com/watch?v=' + id,
        thumbnail: 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg'
      };
    }).filter(item => item).filter((item, index, all) => all.findIndex(other => other.id === item.id) === index);

    if (items.length < 2) throw new Error('The YouTube Top Music Videos chart returned fewer than two usable videos');
    return items.slice(0, 100);
  }

  try {
    const videos = await getTop100MusicVideos();
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const dateText = parts.find(p => p.type === 'year').value + '-' +
      parts.find(p => p.type === 'month').value + '-' +
      parts.find(p => p.type === 'day').value;
    const seed = dailySeed(dateText);
    const firstIndex = dailyIndex(seed, 0x13579bdf, videos.length) % videos.length;
    let secondIndex = dailyIndex(seed, 0x2468ace0, videos.length) % videos.length;
    if (secondIndex === firstIndex) secondIndex = (firstIndex + 1 + (seed % (videos.length - 1))) % videos.length;

    const musicVideo = { ...videos[firstIndex], slot: 'popular-music-video' };
    const trendingVideo = { ...videos[secondIndex], slot: 'global-trending-video' };

    return res.status(200).json({
      updatedAt: new Date().toISOString(),
      selectionDate: dateText,
      source: 'YouTube Top Music Videos chart — daily random selection from the Top 100',
      chartUrl: 'https://charts.youtube.com/charts/TopVideos/global/daily',
      chartSize: videos.length,
      musicVideo,
      trendingVideo
    });
  } catch (error) {
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(502).json({
      error: 'The YouTube Top Music Videos chart is temporarily unavailable.',
      message: error.message
    });
  }
}
