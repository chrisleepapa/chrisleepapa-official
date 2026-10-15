import { mkdir, writeFile } from 'node:fs/promises';

const categories = [
  {
    key: 'world', ko: '국제 · 정치 · 외교', en: 'WORLD · POLITICS · DIPLOMACY',
    query: 'world diplomacy international affairs',
    feeds: [
      { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
      { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss' },
      { name: 'Al Jazeera English', url: 'https://www.aljazeera.com/xml/rss/all.xml' }
    ]
  },
  {
    key: 'security', ko: '전쟁 · 안보', en: 'WAR · SECURITY',
    query: 'war conflict security',
    feeds: [
      { name: 'Al Jazeera English', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
      { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
      { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss' }
    ]
  },
  {
    key: 'economy', ko: '경제 · 시장', en: 'ECONOMY · MARKETS',
    query: 'global economy business markets',
    feeds: [
      { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/business/rss.xml' },
      { name: 'The Guardian', url: 'https://www.theguardian.com/business/rss' },
      { name: 'NPR', url: 'https://feeds.npr.org/1006/rss.xml' }
    ]
  },
  {
    key: 'science', ko: '과학 · 기술', en: 'SCIENCE · TECHNOLOGY',
    query: 'science technology AI research',
    feeds: [
      { name: 'Science News', url: 'https://www.sciencenews.org/feed' },
      { name: 'ScienceDaily · Top Science', url: 'https://www.sciencedaily.com/rss/top/science.xml', rssOnly: true },
      { name: 'ScienceDaily · Top Technology', url: 'https://www.sciencedaily.com/rss/top/technology.xml', rssOnly: true }
    ]
  },
  {
    key: 'climate', ko: '기후 · 재난 · 보건', en: 'CLIMATE · DISASTER · HEALTH',
    query: 'climate environment health disasters',
    feeds: [
      { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml' },
      { name: 'The Guardian', url: 'https://www.theguardian.com/environment/rss' },
      { name: 'Al Jazeera English', url: 'https://www.aljazeera.com/xml/rss/all.xml' }
    ]
  },
  {
    key: 'society', ko: '사회 · 문화', en: 'SOCIETY · CULTURE',
    query: 'society culture education',
    feeds: [
      { name: 'Yonhap News Agency', url: 'https://en.yna.co.kr/RSS/news.xml' },
      { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/education/rss.xml' },
      { name: 'The Guardian', url: 'https://www.theguardian.com/society/rss' }
    ]
  },
];

function decodeEntities(value = '') {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ').trim();
}
function tag(xml, name) {
  const m = xml.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>', 'i'));
  return m ? decodeEntities(m[1]) : '';
}
function parseItems(xml) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(m => {
    const item = m[1];
    const title = tag(item, 'title');
    const description = tag(item, 'description');
    const link = tag(item, 'link');
    const pubDate = tag(item, 'pubDate');
    const source = tag(item, 'source') || (title.includes(' - ') ? title.split(' - ').at(-1) : 'Google News');
    return { title: title.replace(/\s+-\s+[^-]+$/, '').trim(), description, link, pubDate, source };
  }).filter(x => x.title && x.link);
}

function cleanHtml(value = '') {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/\s+/g, ' ').trim();
}
function metaContent(html, key) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const name = (tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i) || [])[1];
    const content = (tag.match(/\bcontent\s*=\s*["']([^"']+)["']/i) || [])[1];
    if (name && content && name.toLowerCase() === key.toLowerCase()) return cleanHtml(content);
  }
  return '';
}
function isGenericNewsBoilerplate(value = '') {
  return /comprehensive up-to-date news coverage|aggregated from sources all over the world by google news|google news provides.*news coverage/i.test(value.replace(/\s+/g, ' ').trim());
}
function extractArticleTitle(html) {
  const metaTitle = metaContent(html, 'og:title') || metaContent(html, 'twitter:title');
  if (metaTitle) return metaTitle.replace(/\s*[|｜·-]\s*[^|｜·-]{2,40}$/, '').trim();
  const jsonHeadline = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of jsonHeadline) {
    try {
      const parsed = JSON.parse(match[1].trim());
      const nodes = Array.isArray(parsed) ? parsed : [parsed, ...(parsed['@graph'] || [])];
      for (const node of nodes) if (typeof node?.headline === 'string' && node.headline.length > 8) return cleanHtml(node.headline);
    } catch {}
  }
  const titleTag = (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  return titleTag ? cleanHtml(titleTag).replace(/\s*[|｜·-]\s*[^|｜·-]{2,40}$/, '').trim() : '';
}
function normalizedTitle(value = '') {
  return value.toLocaleLowerCase('ko').replace(/[^\p{L}\p{N}]+/gu, '');
}
function titleSimilarity(a, b) {
  const left = normalizedTitle(a);
  const right = normalizedTitle(b);
  if (!left || !right) return 0;
  if (left.includes(right) || right.includes(left)) return 1;
  const leftTokens = new Set((a.match(/[\p{L}\p{N}]{2,}/gu) || []).map(x => x.toLocaleLowerCase('ko')));
  const rightTokens = new Set((b.match(/[\p{L}\p{N}]{2,}/gu) || []).map(x => x.toLocaleLowerCase('ko')));
  if (!leftTokens.size || !rightTokens.size) return 0;
  const overlap = [...leftTokens].filter(token => rightTokens.has(token)).length;
  return overlap / Math.min(leftTokens.size, rightTokens.size);
}
function extractArticleContent(html) {
  const candidates = [];
  const meta = metaContent(html, 'og:description') || metaContent(html, 'description') || metaContent(html, 'twitter:description');
  if (meta && meta.length > 70 && !isGenericNewsBoilerplate(meta)) candidates.push(meta);
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1].trim());
      const nodes = Array.isArray(parsed) ? parsed : [parsed, ...(parsed['@graph'] || [])];
      for (const node of nodes) {
        const body = node && (node.articleBody || node.description);
        if (typeof body === 'string' && body.length > 100 && !isGenericNewsBoilerplate(body)) candidates.push(cleanHtml(body));
      }
    } catch {}
  }
  for (const match of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const paragraph = cleanHtml(match[1]);
    if (paragraph.length > 80 && !isGenericNewsBoilerplate(paragraph) && !/쿠키|개인정보|로그인|구독|저작권|무단전재|광고|기자\s*$/i.test(paragraph)) candidates.push(paragraph);
  }
  const unique = [];
  for (const candidate of candidates) {
    const text = candidate.trim();
    if (text.length > 50 && !unique.some(old => old.slice(0, 80) === text.slice(0, 80))) unique.push(text);
  }
  return unique.slice(0, 5);
}
async function fetchArticleDetails(url) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; ChrisLeePapaNewsBot/1.0)' },
      signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) return { link: url, details: [] };
    const html = await response.text();
    const finalUrl = response.url || url;
    let host = '';
    try { host = new URL(finalUrl).hostname.toLowerCase(); } catch {}
    // Google News RSS item URLs may not redirect to the publisher in automated requests.
    // Keep the original story-item URL as a usable fallback; its RSS excerpt is still checked below.
    if (host === 'news.google.com' || host.endsWith('.news.google.com')) return { link: url, details: [], articleTitle: '' };
    return { link: finalUrl, details: extractArticleContent(html), articleTitle: extractArticleTitle(html) };
  } catch {
    return { link: url, details: [] };
  }
}
function sentencePoints(text) {
  return (text.match(/[^.!?。！？]+[.!?。！？]?/g) || [])
    .map(s => s.trim()).filter(s => s.length > 25).slice(0, 3)
    .map(s => s.length > 220 ? s.slice(0, 217) + '…' : s);
}

async function translateText(value, target) {
  const source = String(value || '').trim();
  if (!source) return source;
  const containsHangul = text => /[\\uAC00-\\uD7A3]/.test(text);
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' + target + '&dt=t&q=' + encodeURIComponent(source.slice(0, 4500));
      const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error('Translation request failed: HTTP ' + response.status);
      const payload = await response.json();
      const translated = Array.isArray(payload?.[0])
        ? payload[0].map(part => part?.[0] || '').join('').trim()
        : '';
      if (!translated) throw new Error('Translation response was empty.');
      if (target === 'ko' && !containsHangul(translated)) {
        throw new Error('Korean translation did not contain Hangul; refusing to publish the source text as Korean.');
      }
      return translated;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 700 * attempt));
    }
  }
  throw new Error('Translation failed after 3 attempts: ' + String(lastError));
}
async function fetchCategory(category, globallySeenLinks = new Set(), globallySeenTitles = []) {
  // Prefer direct publisher RSS feeds. Aggregator feeds are deliberately not used:
  // they often leave the card linked to a search/result page rather than the actual report.
  const nowMs = Date.now();
  const maxAgeMs = 72 * 60 * 60 * 1000;
  const seenLinks = new Set();
  const failures = [];

  for (const feed of category.feeds || []) {
    let items = [];
    try {
      const response = await fetch(feed.url, {
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; ChrisLeePapaNewsBot/1.0)',
          accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*'
        },
        signal: AbortSignal.timeout(15000)
      });
      if (!response.ok) {
        failures.push(feed.name + ': HTTP ' + response.status);
        continue;
      }
      items = parseItems(await response.text());
    } catch (error) {
      failures.push(feed.name + ': ' + String(error));
      continue;
    }

    for (const item of items.slice(0, 35)) {
      const publishedMs = Date.parse(item.pubDate);
      if (!Number.isFinite(publishedMs) || publishedMs > nowMs + 5 * 60 * 1000 || nowMs - publishedMs > maxAgeMs) continue;
      let itemUrl;
      try {
        itemUrl = new URL(item.link);
        if (!['http:', 'https:'].includes(itemUrl.protocol)) continue;
      } catch { continue; }
      if (itemUrl.hostname === 'news.google.com' || itemUrl.hostname.includes('bing.com')) continue;
      const canonicalLink = itemUrl.href;
      if (seenLinks.has(canonicalLink) || globallySeenLinks.has(canonicalLink)) continue;
      seenLinks.add(canonicalLink);

      const rssText = cleanHtml(item.description || '');
      // ScienceDaily permits RSS headlines and summaries with attribution and a link,
      // but not republishing full article text; keep those entries RSS-only.
      const article = feed.rssOnly
        ? { link: canonicalLink, details: [], articleTitle: '' }
        : await fetchArticleDetails(canonicalLink);
      const detailText = (article.details || []).join(' ').trim();
      const articleTitle = article.articleTitle || '';
      if (articleTitle && titleSimilarity(item.title, articleTitle) < 0.25) continue;
      // Keep the six-card feed editorially distinct: never repeat the same or near-identical headline across categories.
      if (globallySeenTitles.some(title => titleSimilarity(item.title, title) >= 0.75)) continue;

      const summaryCandidate = !feed.rssOnly && detailText.length >= 100 && !isGenericNewsBoilerplate(detailText)
        ? detailText
        : rssText;
      const normalizedSummary = normalizedTitle(summaryCandidate);
      const normalizedHeadline = normalizedTitle(item.title);
      const headlineOnly = !summaryCandidate || summaryCandidate.length < 90 ||
        (normalizedHeadline && normalizedSummary.startsWith(normalizedHeadline) &&
          normalizedSummary.length - normalizedHeadline.length < 35);
      if (headlineOnly) continue;

      const source = feed.name;
      const summary = summaryCandidate.slice(0, 1100).trim();
      const points = sentencePoints(summary);
      if (points.length === 0 && summary.length < 180) continue;
      const safePoints = points.length ? points : [summary.slice(0, 180)];
      const [titleKo, summaryKo, pointsKo] = await Promise.all([
        translateText(item.title, 'ko'),
        translateText(summary, 'ko'),
        Promise.all(safePoints.map(point => translateText(point, 'ko')))
      ]);
      return {
        category: category.key, categoryKo: category.ko, categoryEn: category.en,
        title: item.title, titleEn: item.title, titleKo: titleKo || item.title,
        summary, summaryEn: summary, summaryKo: summaryKo || summary,
        points: safePoints,
        pointsKo: pointsKo.length ? pointsKo : safePoints,
        pointsEn: safePoints,
        source, link: canonicalLink, publishedAt: item.pubDate,
        summarySource: detailText.length >= 100 ? 'publisher article page' : feed.name + ' RSS excerpt'
      };
    }
  }

  console.error('News source diagnostics for ' + category.key + ': ' + failures.join(' | '));
  throw new Error('No recent, substantial, direct-publisher article passed validation for ' + category.key + '.');
}
const cards = [];
const globallySeenLinks = new Set();
const globallySeenTitles = [];
const failed = [];
// Run in category order so each selected article can be reserved before the next category searches.
for (const category of categories) {
  try {
    const card = await fetchCategory(category, globallySeenLinks, globallySeenTitles);
    cards.push(card);
    globallySeenLinks.add(card.link);
    globallySeenTitles.push(card.title);
  } catch (error) {
    cards.push(null);
    failed.push({ category: category.key, error: String(error) });
  }
}
if (failed.length) console.error('Category fallback diagnostics:', JSON.stringify(failed));
if (cards.some(x => !x)) {
  // Never silently publish old or fabricated content. Leave the existing JSON untouched
  // so the failed workflow is visible and the incomplete data is not presented as fresh.
  throw new Error('News refresh could not obtain six verified, non-headline-only cards. See category fallback diagnostics above.');
}
const now = new Date();
const dateParts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
const dateMap = Object.fromEntries(dateParts.map(part => [part.type, part.value]));
const date = `${dateMap.year}-${dateMap.month}-${dateMap.day}`;
const payload = { date, updatedAt: now.toISOString(), sourceNote: 'Direct publisher feeds from Science News, ScienceDaily, BBC News, The Guardian, Al Jazeera English, NPR and Yonhap. ScienceDaily entries use attributed RSS headlines and summaries with links; only direct article links published in the last 72 hours are accepted, and incomplete refreshes do not overwrite existing data.', cards };
await mkdir('data', { recursive: true });
await writeFile('data/chris-news.json', JSON.stringify(payload, null, 2) + '\n');
console.log(`Prepared ${cards.length} news cards for ${date}.`);

