export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const feeds = [
    { key: 'musicVideo', url: 'https://rsshub.app/youtube/charts/TopVideos/global', type: 'music' },
    { key: 'trendingVideo', url: 'https://rsshub.app/youtube/charts/TrendingVideos/global', type: 'trending' }
  ];

  function decode(value = '') {
    return value
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function parseFeed(xml, type) {
    const items = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map(match => {
      const body = match[1];
      const field = name => (body.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>', 'i')) || [,''])[1];
      const rawTitle = decode(field('title'));
      const rawLink = decode(field('link'));
      const description = field('description');
      const raw = rawLink + ' ' + description;
      const idMatch = raw.match(/(?:youtube\.com\/(?:watch\?(?:[^\s"'<>]*?&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
      const videoId = idMatch && idMatch[1];
      if (!videoId || !rawTitle) return null;
      const title = rawTitle.replace(/\s+-\s+YouTube Music Charts.*$/i, '').replace(/\s+-\s+[^-]{1,100}$/, (m) => m);
      return {
        id: videoId,
        title,
        channel: decode(field('author') || field('dc:creator')),
        url: 'https://www.youtube.com/watch?v=' + videoId,
        thumbnail: 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg',
        type
      };
    }).filter(Boolean);
    return items;
  }

  try {
    const results = await Promise.all(feeds.map(async feed => {
      const response = await fetch(feed.url, { headers: { 'User-Agent': 'ChrisLeePapa-CreativeArchive/1.0' } });
      if (!response.ok) throw new Error('Chart source returned ' + response.status);
      return { key: feed.key, items: parseFeed(await response.text(), feed.type) };
    }));
    const data = Object.fromEntries(results.map(item => [item.key, item.items[0] || null]));
    if (!data.musicVideo || !data.trendingVideo) {
      throw new Error('One or more global YouTube chart feeds returned no usable video');
    }
    return res.status(200).json({
      updatedAt: new Date().toISOString(),
      source: 'YouTube Music Charts via RSSHub',
      musicVideo: data.musicVideo,
      trendingVideo: data.trendingVideo
    });
  } catch (error) {
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    return res.status(502).json({
      error: 'Global YouTube charts are temporarily unavailable.',
      message: error.message
    });
  }
}
