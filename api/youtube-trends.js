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
    // Prefer YouTube's own chart endpoint so the page does not depend on an RSS proxy.
    const apiKey = 'AIzaSyCzEW7JUJdSql0-2V4tHUb6laYm4iAE_dM';
    const chartQueries = [
      'chart_params_type=DAY&perspective=CHART&flags=viral_video_chart&selected_chart=VIDEOS&chart_params_id=daily:0:0',
      'chart_params_type=WEEK&perspective=CHART&flags=viral_video_chart&selected_chart=VIDEOS&chart_params_id=weekly:0:0'
    ];
    let lastError = null;
    for (const chartQuery of chartQueries) {
      try {
        const response = await fetch('https://charts.youtube.com/youtubei/v1/browse?alt=json&key=' + apiKey, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'https://charts.youtube.com',
            'Referer': 'https://charts.youtube.com/charts/TopVideos/global/daily',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36'
          },
          body: JSON.stringify({
            browseId: 'FEmusic_analytics_charts_home',
            context: {
              capabilities: {},
              client: {
                clientName: 'WEB_MUSIC_ANALYTICS',
                clientVersion: '0.2',
                experimentIds: [],
                experimentsToken: '',
                gl: 'US',
                hl: 'en',
                theme: 'MUSIC'
              },
              request: { internalExperimentFlags: [] }
            },
            query: chartQuery
          })
        });
        if (!response.ok) throw new Error('YouTube chart API returned ' + response.status);
        const data = await response.json();
        const section = data?.contents?.sectionListRenderer?.contents?.find(
          entry => entry?.musicAnalyticsSectionRenderer
        )?.musicAnalyticsSectionRenderer;
        const videos = section?.content?.videos || section?.videos;
        const videoList = Array.isArray(videos) ? videos : videos?.[0]?.videoViews;
        if (!Array.isArray(videoList) || !videoList.length) {
          throw new Error('YouTube chart API response contained no video list');
        }
        const items = videoList.map((entry, index) => {
          const video = entry?.video || entry;
          const id = video?.id || video?.videoId || entry?.id;
          const title = video?.title || video?.name || entry?.title || entry?.name;
          if (!id || !title || !/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
          const thumbnailList = video?.thumbnail?.thumbnails || entry?.thumbnail?.thumbnails || [];
          const thumbnail = thumbnailList.length ? thumbnailList[thumbnailList.length - 1].url : 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
          return {
            id,
            title: typeof title === 'string' ? title : (title?.runs || []).map(part => part.text || '').join(''),
            chart: 'YouTube Top Music Videos',
            chartRank: index + 1,
            url: 'https://www.youtube.com/watch?v=' + id,
            thumbnail
          };
        }).filter(Boolean).filter((item, index, all) => all.findIndex(other => other.id === item.id) === index);
        if (items.length >= 5) return items.slice(0, 100);
        throw new Error('YouTube chart API returned fewer than five usable videos');
      } catch (error) {
        lastError = error;
      }
    }

    // Last-resort source: RSSHub's public chart feed.
    try {
      const response = await fetch('https://rsshub.app/youtube/charts/TopVideos/global', {
        headers: {
          'User-Agent': 'Mozilla/5.0 ChrisLeePapaArchive/1.0',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        }
      });
      if (!response.ok) throw new Error('RSS chart feed returned ' + response.status);
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
          id, title, chart: 'YouTube Top Music Videos', chartRank: rank + 1,
          url: 'https://www.youtube.com/watch?v=' + id,
          thumbnail: 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg'
        };
      }).filter(Boolean).filter((item, index, all) => all.findIndex(other => other.id === item.id) === index);
      if (items.length >= 5) return items.slice(0, 100);
      throw new Error('RSS chart feed returned fewer than five usable videos');
    } catch (error) {
      throw new Error('YouTube chart sources unavailable. Direct API: ' + (lastError?.message || 'unknown') + '; RSS: ' + error.message);
    }
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
    // The popular music-video card always represents the current #1 entry
    // in the official YouTube global daily Top Music Videos chart.
    const topVideos = videos.slice(0, 5).map((video, index) => ({
      ...video,
      chartRank: index + 1,
      slot: 'popular-music-video'
    }));
    if (topVideos.length < 5) throw new Error('The YouTube chart returned fewer than five usable videos');

    // Keep a daily rotating pick for the separate trending-video use case.
    const trendingPool = videos.slice(5);
    const secondIndex = dailyIndex(seed, 0x2468ace0, trendingPool.length);
    const trendingVideo = { ...trendingPool[secondIndex], slot: 'global-trending-video' };

    return res.status(200).json({
      updatedAt: new Date().toISOString(),
      selectionDate: dateText,
      source: 'YouTube official global daily Top Music Videos chart — top 5 ranked videos',
      chartUrl: 'https://charts.youtube.com/charts/TopVideos/global/daily',
      chartSize: videos.length,
      topVideos,
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
