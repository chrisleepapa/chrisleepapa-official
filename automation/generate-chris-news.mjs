import { mkdir, writeFile } from 'node:fs/promises';

const categories = [
  { key: 'world', ko: '국제 · 정치 · 외교', en: 'WORLD · POLITICS · DIPLOMACY', query: '국제 정치 외교 주요 뉴스' },
  { key: 'security', ko: '전쟁 · 안보', en: 'WAR · SECURITY', query: '전쟁 안보 국제 분쟁 주요 뉴스' },
  { key: 'economy', ko: '경제 · 시장', en: 'ECONOMY · MARKETS', query: '세계 경제 금융 시장 주요 뉴스' },
  { key: 'science', ko: '과학 · 기술', en: 'SCIENCE · TECHNOLOGY', query: '과학 기술 인공지능 연구 주요 뉴스' },
  { key: 'climate', ko: '기후 · 재난 · 보건', en: 'CLIMATE · DISASTER · HEALTH', query: '기후 재난 보건 건강 주요 뉴스' },
  { key: 'society', ko: '사회 · 문화', en: 'SOCIETY · CULTURE', query: '사회 문화 교육 예술 주요 뉴스' },
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

async function translateToEnglish(value) {
  try {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=' + encodeURIComponent(value.slice(0, 4500));
    const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
    if (!response.ok) return value;
    const payload = await response.json();
    return Array.isArray(payload?.[0]) ? payload[0].map(part => part?.[0] || '').join('').trim() || value : value;
  } catch {
    return value;
  }
}
async function fetchCategory(category) {
  // Try several topic-specific queries. Google News RSS may return items whose
  // publisher pages block bots, so a substantial RSS excerpt is an acceptable
  // fallback, but headline-only cards are never published.
  const queries = [
    category.query,
    ...(category.fallbackQueries || []),
    category.key === 'world' ? '세계 주요 뉴스 국제 외교 최신' :
    category.key === 'security' ? '국제 분쟁 군사 안보 최신 뉴스' :
    category.key === 'economy' ? '세계 경제 기업 금융 최신 뉴스' :
    category.key === 'science' ? 'AI 과학 기술 연구 최신 뉴스' :
    category.key === 'climate' ? '기후변화 자연재해 보건 최신 뉴스' :
    '사회 문화 교육 환경 최신 뉴스',
    category.key === 'world' ? 'world news diplomacy latest' :
    category.key === 'security' ? 'war conflict security latest news' :
    category.key === 'economy' ? 'global economy markets latest news' :
    category.key === 'science' ? 'science technology AI latest news' :
    category.key === 'climate' ? 'climate disaster health latest news' :
    'society culture education latest news'
  ];
  const nowMs = Date.now();
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
  const seenLinks = new Set();
  let chosen = null;
  let lastCount = 0;

  for (const query of [...new Set(queries.filter(Boolean))]) {
    const url = 'https://news.google.com/rss/search?q=' + encodeURIComponent(query) + '&hl=ko&gl=KR&ceid=KR:ko';
    let items = [];
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; ChrisLeePapaNewsBot/1.0)' },
        signal: AbortSignal.timeout(20000)
      });
      if (!response.ok) {
        console.warn('RSS query failed for ' + category.key + ' (' + query + '): HTTP ' + response.status);
        continue;
      }
      items = parseItems(await response.text());
    } catch (error) {
      console.warn('RSS query failed for ' + category.key + ' (' + query + '): ' + String(error));
      continue;
    }
    lastCount = Math.max(lastCount, items.length);
    for (const item of items.slice(0, 40)) {
      const publishedMs = Date.parse(item.pubDate);
      if (!Number.isFinite(publishedMs) || publishedMs > nowMs + 5 * 60 * 1000 || nowMs - publishedMs > maxAgeMs) continue;
      if (seenLinks.has(item.link)) continue;
      seenLinks.add(item.link);

      let article;
      try { article = await fetchArticleDetails(item.link); }
      catch { article = { link: item.link, details: [], articleTitle: '' }; }
      if (!article.link) continue;
      let hostname = '';
      try { hostname = new URL(article.link).hostname.toLowerCase(); } catch { continue; }
      const isGoogleNewsItem = hostname === 'news.google.com' || hostname.endsWith('.news.google.com');
      const titleMatches = isGoogleNewsItem || !article.articleTitle || titleSimilarity(item.title, article.articleTitle) >= 0.25;
      if (!titleMatches) continue;

      const detailText = (article.details || []).join(' ').trim();
      const rssText = cleanHtml(item.description || '');
      const usableDetail = detailText.length >= 70 && !isGenericNewsBoilerplate(detailText);
      const usableRss = rssText.length >= 45 && !isGenericNewsBoilerplate(rssText);
      if (usableDetail || usableRss) {
        chosen = {
          ...item,
          link: isGoogleNewsItem ? item.link : article.link,
          details: usableDetail ? article.details : [rssText],
          summarySource: usableDetail ? 'publisher article page' : 'Google News RSS excerpt'
        };
        break;
      }
    }
    if (chosen) break;
  }

  if (!chosen) {
    throw new Error('No usable article excerpt found for ' + category.key + ' after trying ' + queries.length + ' queries (' + lastCount + ' RSS items in largest result).');
  }

  const summary = chosen.details.join(' ').slice(0, 1100).trim();
  if (summary.length < 45) throw new Error('Article excerpt too short for ' + category.key + '.');
  const points = sentencePoints(summary);
  const titleEn = await translateToEnglish(chosen.title);
  const summaryEn = await translateToEnglish(summary);
  const pointsEn = await Promise.all(points.map(translateToEnglish));
  return {
    category: category.key, categoryKo: category.ko, categoryEn: category.en,
    title: chosen.title, titleEn,
    summary, summaryEn: summaryEn || summary,
    points: points.length ? points : [summary.slice(0, 180)],
    pointsKo: points.length ? points : [summary.slice(0, 180)],
    pointsEn: pointsEn.length ? pointsEn : [summary.slice(0, 180)],
    source: chosen.source, link: chosen.link, publishedAt: chosen.pubDate || new Date().toISOString(),
    summarySource: chosen.summarySource
  };
}
const results = await Promise.allSettled(categories.map(fetchCategory));
const cards = results.map((r, i) => r.status === 'fulfilled' ? r.value : null);
const failed = results.map((r, i) => r.status === 'rejected' ? { category: categories[i].key, error: String(r.reason) } : null).filter(Boolean);
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
const payload = { date, updatedAt: now.toISOString(), sourceNote: 'Daily Google News RSS discovery; publisher-page summaries are preferred, with substantial RSS excerpts used when publisher pages block extraction. Stories are limited to the last 7 days.', cards };
await mkdir('data', { recursive: true });
await writeFile('data/chris-news.json', JSON.stringify(payload, null, 2) + '\n');
console.log(`Prepared ${cards.length} news cards for ${date}.`);

