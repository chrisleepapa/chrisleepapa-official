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
    return { link: response.url || url, details: extractArticleContent(html) };
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
  const q = encodeURIComponent(category.query + ' when:1d');
  const url = 'https://news.google.com/rss/search?q=' + q + '&hl=ko&gl=KR&ceid=KR:ko';
  const response = await fetch(url, { headers: { 'user-agent': 'ChrisLeePapaNewsBot/1.0' }, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error('Google News RSS ' + category.key + ': HTTP ' + response.status);
  const items = parseItems(await response.text());
  if (!items.length) throw new Error('No RSS items for ' + category.key);
  let chosen = null;
  for (const item of items.slice(0, 5)) {
    const article = await fetchArticleDetails(item.link);
    const details = article.details;
    const rssText = item.description.length > 100 && !item.description.includes(item.title) && !isGenericNewsBoilerplate(item.description) ? item.description : '';
    if (details.length || rssText) { chosen = { ...item, link: article.link, details, rssText }; break; }
  }
  if (!chosen) {
    const item = items[0];
    const article = await fetchArticleDetails(item.link);
    chosen = { ...item, link: article.link, details: article.details, rssText: '' };
  }
  const evidence = chosen.details.length ? chosen.details : (chosen.rssText ? [chosen.rssText] : []);
  const summary = evidence.join(' ').slice(0, 900).trim();
  const points = sentencePoints(evidence.join(' '));
  const titleEn = await translateToEnglish(chosen.title);
  const summaryEn = summary ? await translateToEnglish(summary) : '';
  const pointsEn = await Promise.all(points.map(translateToEnglish));
  const fallbackKo = '원문 언론사의 기사 본문을 자동으로 가져오지 못했습니다. 원문 링크에서 자세한 내용을 확인해주세요.';
  const fallbackEn = 'The publisher did not expose article text for automatic extraction. Open the original report for details.';
  return {
    category: category.key, categoryKo: category.ko, categoryEn: category.en,
    title: chosen.title, titleEn,
    summary: summary || fallbackKo, summaryEn: summaryEn || fallbackEn,
    points: points.length ? points : ['원문 기사에서 상세 내용을 확인할 수 있습니다.'],
    pointsKo: points.length ? points : ['원문 기사에서 상세 내용을 확인할 수 있습니다.'],
    pointsEn: pointsEn.length ? pointsEn : ['Open the original article for details.'],
    source: chosen.source, link: chosen.link, publishedAt: chosen.pubDate || new Date().toISOString()
  };
}
const results = await Promise.allSettled(categories.map(fetchCategory));
const cards = results.map((r, i) => r.status === 'fulfilled' ? r.value : null);
const failed = results.map((r, i) => r.status === 'rejected' ? { category: categories[i].key, error: String(r.reason) } : null).filter(Boolean);
if (cards.some(x => !x)) {
  console.error('One or more categories failed:', failed);
  throw new Error('Daily news refresh aborted to avoid publishing an incomplete six-card set.');
}
const now = new Date();
const dateParts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
const dateMap = Object.fromEntries(dateParts.map(part => [part.type, part.value]));
const date = `${dateMap.year}-${dateMap.month}-${dateMap.day}`;
const payload = { date, updatedAt: now.toISOString(), sourceNote: 'Google News RSS; headlines and descriptions link to the original publisher.', cards };
await mkdir('data', { recursive: true });
await writeFile('data/chris-news.json', JSON.stringify(payload, null, 2) + '\n');
console.log(`Prepared ${cards.length} news cards for ${date}.`);
