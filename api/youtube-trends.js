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

  async function getDailyMusicVideo() {
    // Use Billboard's official Global 200 chart as the ranking source.
    // Billboard ranks songs (not standalone music videos), so resolve the #1 song
    // to a YouTube video for playback while retaining the chart rank/source metadata.
    const response = await fetch('https://ca.billboard.com/charts/billboard-global-200', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ChrisLeePapaArchive/1.0)' }
    });
    if (!response.ok) throw new Error('Billboard Global 200 returned ' + response.status);
    const html = await response.text();

    let songTitle = '';
    let artist = '';
    // Billboard's chart page exposes the chart entries as title and artist headings.
    const titleMatches = [...html.matchAll(/<h3\\b[^>]*>([\\s\\S]*?)<\\/h3>/gi)];
    for (let i = 0; i < titleMatches.length; i++) {
      const candidate = decode(titleMatches[i][1]);
      if (!candidate || /^(billboard global 200|this week|last week|peak pos\.?|weeks on chart)$/i.test(candidate)) continue;
      if (/^week of/i.test(candidate)) continue;
      // Chart title and artist headings are adjacent in the Billboard chart markup.
      const next = i + 1 < titleMatches.length ? decode(titleMatches[i + 1][1]) : '';
      if (candidate.length > 1 && next && !/^(lw|peak|weeks|this week|last week)$/i.test(next)) {
        songTitle = candidate;
        artist = next;
        break;
      }
    }

    if (!songTitle) {
      // Alternate markup: chart item title is in an h3 and artist is in a nearby h3.
      const plain = decode(html);
      const chartAt = plain.indexOf('BILLBOARD GLOBAL 200');
      if (chartAt >= 0) {
        const section = plain.slice(chartAt, chartAt + 5000);
        const match = section.match(/(?:1\\s+)([A-Za-z0-9][^]{1,100}?)\\s{2,}([A-Z][^]{1,100}?)(?:\\s{2,}|2\\s)/);
        if (match) { songTitle = match[1].trim(); artist = match[2].trim(); }
      }
    }
    if (!songTitle) throw new Error('Could not parse the #1 song from Billboard Global 200');

    const query = encodeURIComponent(songTitle + ' ' + artist + ' official music video');
    const videoResponse = await fetch('https://www.youtube.com/results?search_query=' + query, {
      headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36' }
    });
    if (!videoResponse.ok) throw new Error('YouTube search returned ' + videoResponse.status);
    const videoHtml = await videoResponse.text();
    const ids = [...videoHtml.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)].map(m => m[1]);
    const id = ids.find((value, index) => ids.indexOf(value) === index);
    if (!id) throw new Error('Could not find a YouTube video for Billboard Global 200 #1: ' + songTitle);

    return {
      id,
      title: songTitle + ' — ' + artist,
      channel: artist,
      chart: 'Billboard Global 200',
      chartRank: 1,
      chartUrl: 'https://www.billboard.com/charts/billboard-global-200/',
      url: 'https://www.youtube.com/watch?v=' + id,
      thumbnail: 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg'
    };
  }

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
    const musicVideo = await getDailyMusicVideo();
    let trendingVideo = await getGlobalTrendingVideo();
    if (trendingVideo.id === musicVideo.id) {
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
      source: 'Music Charty daily global music chart and worldwide trending chart',
      musicVideo,
      trendingVideo
    });
  } catch (error) {
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    return res.status(502).json({ error: 'Global YouTube charts are temporarily unavailable.', message: error.message });
  }
}
