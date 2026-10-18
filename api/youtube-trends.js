export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=86400');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const decode = (value = '') => value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  function parseTrendingFeed(xml) {
    return [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map(match => {
      const body = match[1];
      const field = name => (body.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>', 'i')) || [,''])[1];
      const title = decode(field('title'));
      const raw = decode(field('link')) + ' ' + field('description');
      const idMatch = raw.match(/(?:youtube\.com\/(?:watch\?(?:[^\s"'<>]*?&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
      if (!idMatch || !title) return null;
      return { id: idMatch[1], title: title.replace(/\s+-\s+YouTube Music Charts.*$/i, ''), url: 'https://www.youtube.com/watch?v=' + idMatch[1], thumbnail: 'https://img.youtube.com/vi/' + idMatch[1] + '/hqdefault.jpg' };
    }).filter(Boolean);
  }

  async function getDailyMusicVideo() {
    const response = await fetch('https://musiccharty.com/', { headers: { 'User-Agent': 'Mozilla/5.0 ChrisLeePapaArchive/1.0' } });
    if (!response.ok) throw new Error('Global daily music chart returned ' + response.status);
    const html = await response.text();
    const tags = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
    for (const tag of tags) {
      const src = (tag.match(/(?:src|data-src)=["']([^"']*i\.ytimg\.com\/vi\/([A-Za-z0-9_-]{11})\/hqdefault\.jpg[^"']*)["']/i) || []);
      if (!src[2]) continue;
      const alt = (tag.match(/alt=["']([^"']*)["']/i) || [,''])[1];
      const label = decode(alt).replace(/^Image:\s*/i, '');
      if (!label) continue;
      const by = label.match(/^(.*)\s+by\s+(.+)$/i);
      return {
        id: src[2],
        title: by ? by[1].trim() : label,
        channel: by ? by[2].trim() : '',
        url: 'https://www.youtube.com/watch?v=' + src[2],
        thumbnail: 'https://img.youtube.com/vi/' + src[2] + '/hqdefault.jpg'
      };
    }
    throw new Error('Could not find a video in the daily global music chart');
  }

  try {
    const [musicVideo, trendResponse] = await Promise.all([
      getDailyMusicVideo(),
      fetch('https://rsshub.app/youtube/charts/TrendingVideos/global', { headers: { 'User-Agent': 'ChrisLeePapaArchive/1.0' } })
    ]);
    if (!trendResponse.ok) throw new Error('Global trending video chart returned ' + trendResponse.status);
    const trendingItems = parseTrendingFeed(await trendResponse.text());
    const trendingVideo = trendingItems.find(item => item.id !== musicVideo.id);
    if (!trendingVideo) throw new Error('No usable global trending video was returned');
    return res.status(200).json({
      updatedAt: new Date().toISOString(),
      source: 'Music Charty daily global music chart and YouTube Charts via RSSHub',
      musicVideo,
      trendingVideo
    });
  } catch (error) {
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    return res.status(502).json({ error: 'Global YouTube charts are temporarily unavailable.', message: error.message });
  }
}
