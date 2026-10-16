import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

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
  const text = value.replace(/\s+/g, ' ').trim();
  return /comprehensive up-to-date news coverage|aggregated from sources all over the world by google news|google news provides.*news coverage|this will let google show .* news articles|match or are related to your search|read more:|image source:|photograph:|photograph by|getty images|wikimedia commons|adapted by .*hirshfeld|sign up for our newsletter|subscribe to our newsletter|cookie settings|accept all cookies|privacy policy|terms and conditions/i.test(text);
}
function splitSentences(value = '') {
  return (String(value).match(/[^.!?。！？]+[.!?。！？]?/g) || [])
    .map(s => s.replace(/\s+/g, ' ').trim())
    .filter(s => s.length >= 45 && s.length <= 420)
    .filter(s => !isGenericNewsBoilerplate(s))
    .filter(s => !/^(?:[A-Z][a-z]+\s+){0,3}(?:\d{1,2},?\s+)?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2}\b/i.test(s));
}
function dedupeSentences(sentences) {
  const seen = new Set();
  const out = [];
  for (const sentence of sentences) {
    const key = normalizedTitle(sentence);
    if (!key || key.length < 30 || seen.has(key)) continue;
    if (out.some(old => titleSimilarity(old, sentence) >= 0.82)) continue;
    seen.add(key);
    out.push(sentence);
  }
  return out;
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
      signal: AbortSignal.timeout(7000)
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
function sentencePoints(text, excluded = []) {
  const blocked = new Set(excluded.map(normalizedTitle));
  return dedupeSentences(splitSentences(text))
    .filter(sentence => !blocked.has(normalizedTitle(sentence)))
    .slice(0, 3)
    .map(s => s.length > 220 ? s.slice(0, 217).replace(/[,;:]$/, '') + '…' : s);
}

async function translateSegments(values, target) {
  if (target !== 'ko') throw new Error('This news workflow currently supports Korean output only.');
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is missing. Add it as a GitHub Actions repository secret; no fallback translator will publish poor-quality Korean.');

  const prompt = [
    'You are the Korean-language editor of Chris\'s News, a concise, trustworthy daily news digest.',
    'Translate and professionally rewrite the supplied English news fields into natural, polished Korean used by a Korean news publication.',
    'Preserve facts and uncertainty. Never invent facts, names, numbers, causes, quotes, or context.',
    'Use fluent Korean grammar and natural Korean word order. Do not leave ordinary English words in the Korean output.',
    'Use commonly accepted Korean forms for proper names when known; retain English only for names normally written in English.',
    'Remove RSS/search-engine boilerplate, credits, duplicate wording, fragments, and awkward literal translations.',
    'Write a concise and accurate title, a 2–3 sentence Korean summary, and distinct useful key points.',
    'Each key point must add a different fact and avoid repeating the title, summary, or another point.',
    'Use a neutral tone, no sensationalism, and no editorial opinion.',
    'Return only JSON with this shape: {\"titleKo\":\"...\",\"summaryKo\":\"...\",\"pointsKo\":[\"...\",\"...\"]}.',
    'Input English fields:', JSON.stringify({ title: values[0] || '', summary: values[1] || '', keyPoints: values.slice(2) })
  ].join('\\n');

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            titleKo: { type: 'STRING' },
            summaryKo: { type: 'STRING' },
            pointsKo: { type: 'ARRAY', items: { type: 'STRING' } }
          },
          required: ['titleKo', 'summaryKo', 'pointsKo']
        },
        temperature: 0.2,
        maxOutputTokens: 1200
      }
    }),
    signal: AbortSignal.timeout(45000)
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error('Gemini news translation failed: ' + (body?.error?.message || ('HTTP ' + response.status)));
  const generated = body?.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
  if (!generated) throw new Error('Gemini returned no translated news content.');
  let parsed;
  try { parsed = JSON.parse(generated); } catch { throw new Error('Gemini returned invalid JSON for news translation.'); }
  const titleKo = String(parsed.titleKo || '').trim();
  const summaryKo = String(parsed.summaryKo || '').trim();
  const pointsKo = Array.isArray(parsed.pointsKo) ? parsed.pointsKo.map(value => String(value || '').trim()).filter(Boolean) : [];
  const hasHangul = value => /[\\uAC00-\\uD7A3]/.test(value);
  const normalize = value => value.toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, '');
  const distinctPoints = [...new Map(pointsKo.map(point => [normalize(point), point])).values()];
  const allKorean = [titleKo, summaryKo, ...distinctPoints].every(hasHangul);
  const boilerplate = /this will let google show|match or are related to your search|comprehensive up-to-date news coverage|검색 결과|구글에 표시/i.test([titleKo, summaryKo, ...distinctPoints].join(' '));
  if (!titleKo || titleKo.length < 8 || !summaryKo || summaryKo.length < 60 || distinctPoints.length < 2 || !allKorean || boilerplate) {
    throw new Error('Gemini output failed Korean language, completeness, or boilerplate quality checks.');
  }
  return [titleKo, summaryKo, ...distinctPoints.slice(0, Math.max(2, values.length - 2))];
}

async function fetchCategory(category, globallySeenLinks = new Set(), globallySeenTitles = []) {
  // Prefer direct publisher RSS feeds. Aggregator feeds are deliberately not used:
  // they often leave the card linked to a search/result page rather than the actual report.
  const nowMs = Date.now();
  const maxAgeMs = 72 * 60 * 60 * 1000;
  const seenLinks = new Set();
  const failures = [];
  let candidatesChecked = 0;
  const maxCandidatesPerCategory = 8;

  for (const feed of category.feeds || []) {
    if (candidatesChecked >= maxCandidatesPerCategory) break;
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
      if (candidatesChecked >= maxCandidatesPerCategory) break;
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
      candidatesChecked++;

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

      const rawCandidate = !feed.rssOnly && detailText.length >= 100 && !isGenericNewsBoilerplate(detailText)
        ? detailText
        : rssText;
      const cleanSentences = dedupeSentences(splitSentences(rawCandidate));
      const normalizedSummary = normalizedTitle(rawCandidate);
      const normalizedHeadline = normalizedTitle(item.title);
      const headlineOnly = cleanSentences.length < 3 || rawCandidate.length < 150 ||
        (normalizedHeadline && normalizedSummary.startsWith(normalizedHeadline) &&
          normalizedSummary.length - normalizedHeadline.length < 35);
      if (headlineOnly) continue;

      // Keep the editorial summary short, then choose different sentences for the key points.
      // Never publish credits, search-engine snippets, duplicated sentences, or truncated fragments.
      const summarySentences = cleanSentences.slice(0, 2);
      const summary = summarySentences.join(' ').slice(0, 650).trim();
      const points = sentencePoints(rawCandidate, summarySentences);
      if (summary.length < 90 || points.length < 2) continue;
      const safePoints = points;
      const source = feed.name;
      const translatedFields = await translateSegments([item.title, summary, ...safePoints], 'ko');
      const titleKo = translatedFields[0];
      const summaryKo = translatedFields[1];
      const pointsKo = translatedFields.slice(2);
      const translatedPoints = dedupeSentences(pointsKo);
      if (!titleKo || !summaryKo || translatedPoints.length < 2 ||
          /this will let google show|match or are related to your search/i.test(summaryKo)) continue;
      return {
        category: category.key, categoryKo: category.ko, categoryEn: category.en,
        title: item.title, titleEn: item.title, titleKo,
        summary, summaryEn: summary, summaryKo,
        points: safePoints,
        pointsKo: translatedPoints,
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
for (const card of cards) {
  const pointsKo = dedupeSentences(card.pointsKo || []);
  const pointsEn = dedupeSentences(card.pointsEn || []);
  if (!card.titleKo || !/[\uAC00-\uD7A3]/.test(card.titleKo) ||
      !card.summaryKo || !/[\uAC00-\uD7A3]/.test(card.summaryKo) ||
      pointsKo.length < 2 || pointsEn.length < 2 ||
      isGenericNewsBoilerplate(card.summaryKo) || isGenericNewsBoilerplate(card.summaryEn)) {
    throw new Error('Quality gate rejected incomplete, untranslated, duplicated, or boilerplate news card: ' + card.category);
  }
  card.pointsKo = pointsKo.slice(0, 3);
  card.pointsEn = pointsEn.slice(0, 3);
  card.points = card.pointsEn;
}
const now = new Date();
const dateParts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
const dateMap = Object.fromEntries(dateParts.map(part => [part.type, part.value]));
const date = `${dateMap.year}-${dateMap.month}-${dateMap.day}`;
const payload = { date, updatedAt: now.toISOString(), sourceNote: 'Direct publisher feeds from Science News, ScienceDaily, BBC News, The Guardian, Al Jazeera English, NPR and Yonhap. ScienceDaily entries use attributed RSS headlines and summaries with links; only direct article links published in the last 72 hours are accepted, and incomplete refreshes do not overwrite existing data.', cards };
await mkdir('data', { recursive: true });
await writeFile('data/chris-news.json', JSON.stringify(payload, null, 2) + '\n');
console.log(`Prepared ${cards.length} news cards for ${date}.`);

