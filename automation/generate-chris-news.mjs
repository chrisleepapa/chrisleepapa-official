import { mkdir, writeFile } from 'node:fs/promises';

const categories = [
  { key: 'world', ko: '국제 · 정치 · 외교', en: 'WORLD · POLITICS · DIPLOMACY', query: 'world politics diplomacy international relations' },
  { key: 'security', ko: '전쟁 · 안보', en: 'WAR · SECURITY', query: 'war security conflict defense' },
  { key: 'economy', ko: '경제 · 시장', en: 'ECONOMY · MARKETS', query: 'global economy markets business finance' },
  { key: 'science', ko: '과학 · 기술', en: 'SCIENCE · TECHNOLOGY', query: 'science technology AI research' },
  { key: 'climate', ko: '기후 · 재난 · 보건', en: 'CLIMATE · DISASTER · HEALTH', query: 'climate disaster health public health' },
  { key: 'society', ko: '사회 · 문화', en: 'SOCIETY · CULTURE', query: 'society culture education arts' },
];

function decodeEntities(value = '') {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
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
async function fetchCategory(category) {
  const q = encodeURIComponent(category.query + ' when:1d');
  const url = `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
  const response = await fetch(url, { headers: { 'user-agent': 'ChrisLeePapaNewsBot/1.0' }, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`Google News RSS ${category.key}: HTTP ${response.status}`);
  const items = parseItems(await response.text());
  if (!items.length) throw new Error(`No RSS items for ${category.key}`);
  const item = items[0];
  return {
    category: category.key, categoryKo: category.ko, categoryEn: category.en,
    title: item.title,
    summary: item.description || `Latest report from ${item.source}. Open the source article for the full story.`,
    points: [
      `Source: ${item.source}`,
      item.pubDate ? `Published: ${new Date(item.pubDate).toISOString().slice(0, 10)}` : 'Latest report',
      'Read the linked report for updates and full context.'
    ],
    source: item.source, link: item.link, publishedAt: item.pubDate || new Date().toISOString()
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
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
const payload = { date, updatedAt: now.toISOString(), sourceNote: 'Google News RSS; headlines and descriptions link to the original publisher.', cards };
await mkdir('data', { recursive: true });
await writeFile('data/chris-news.json', JSON.stringify(payload, null, 2) + '\n');
console.log(`Prepared ${cards.length} news cards for ${date}.`);
