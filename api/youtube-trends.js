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

  async function getGlobalTrendingVideo() {
    // Prefer a general worldwide trending chart (not a channel or the user's own work).
    try {
      const response = await fetch('https://chartslist.com/', { headers: { 'User-Agent': 'Mozilla/5.0 ChrisLeePapaArchive/1.0' } });
      if (response.ok) {
        const html = await response.text();
        const anchors = [...html.matchAll(/<a\b[^>]*href=["']([^"']*(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
        for (const match of anchors) {
          const title = decode(match[3]);
          if (!title || /^(watch|youtube|play)$/i.test(title)) continue;
          return { id: match[2], title, url: 'https://www.youtube.com/watch?v=' + match[2], thumbnail: 'https://img.youtube.com/vi/' + match[2] + '/hqdefault.jpg' };
        }
      }
    } catch (_) {}

    // Fallback: public RSS feed for YouTube's global trending video chart.
    const response = await fetch('https://rsshub.app/youtube/charts/TrendingVideos/global', { headers: { 'User-Agent': 'ChrisLeePapaArchive/1.0' } });
    if (!response.ok) throw new Error('Global trending chart returned ' + response.status);
    const xml = await response.text();
    const items = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map(match => {
      const body = match[1];
      const field = name => (body.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>', 'i')) || [,''])[1];
      const title = decode(field('title'));
      const raw = decode(field('link')) + ' ' + field('description');
      const idMatch = raw.match(/(?:youtube\.com\/(?:watch\?(?:[^\s"'<>]*?&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
      if (!idMatch || !title) return null;
      return { id: idMatch[1], title, url: 'https://www.youtube.com/watch?v=' + idMatch[1], thumbnail: 'https://img.youtube.com/vi/' + idMatch[1] + '/hqdefault.jpg' };
    }).filter(Boolean);
    if (!items.length) throw new Error('No usable global trending video was returned');
    return items[0];
  }

  try {
    const musicVideo = {
      title: 'Daily Top Music Videos — Global',
      chart: 'YouTube Daily Top Music Videos',
      chartUrl: 'https://charts.youtube.com/',
      url: 'https://charts.youtube.com/',
      thumbnail: '/images/favicon.png'
    };
    const trendingVideo = await getGlobalTrendingVideo();
    if (false) {
      const alternative = await fetch('https://rsshub.app/youtube/charts/TrendingVideos/global', { headers: { 'User-Agent': 'ChrisLeePapaArchive/1.0' } });
      if (alternative.ok) {
        const xml = await alternative.text();
        const links = [...xml.matchAll(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/g)].map(m => m[1]);
        const other = links.find(id => id !== musicVideo.id);
        if (other) trendingVideo = { id: other, title: 'Global YouTube trending video', url: 'https://www.youtube.com/watch?v=' + other, thumbnail: 'https://img.youtube.com/vi/' + other + '/hqdefault.jpg' };
      }
    }
    return res.status(200).json({
      updatedAt: new Date().toISOString(),
      source: 'Official YouTube Daily Top Music Videos chart and worldwide trending chart',
      musicVideo,
      trendingVideo
    });
  } catch (error) {
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    return res.status(502).json({ error: 'Global YouTube charts are temporarily unavailable.', message: error.message });
  }
}
