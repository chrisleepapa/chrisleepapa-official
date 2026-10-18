import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';

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
    const source = tag(item, 'source') || (title.includes(' - ') ? title.split(' - ').at(-1) : 'International publisher');
    const enclosure = item.match(/<enclosure\b[^>]*\burl=["']([^"']+)["'][^>]*>/i);
    const mediaImage = item.match(/<media:(?:content|thumbnail)\b[^>]*\burl=["']([^"']+)["'][^>]*>/i);
    const htmlImage = (description.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i) || [])[1];
    const imageUrl = (enclosure || mediaImage || [])[1] || htmlImage || '';
    return { title: title.replace(/\s+-\s+[^-]+$/, '').trim(), description, link, pubDate, source, imageUrl };
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
function extractImageUrl(html, baseUrl) {
  const candidates = [];
  for (const meta of html.match(/<meta\b[^>]*>/gi) || []) {
    const key = (meta.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i) || [])[1] || '';
    const content = (meta.match(/\bcontent\s*=\s*["']([^"']+)["']/i) || [])[1] || '';
    if (/^(?:og:image|og:image:url|twitter:image|twitter:image:src)$/i.test(key) && content) candidates.push(content.trim());
  }
  for (const raw of candidates) {
    try {
      const image = new URL(raw, baseUrl);
      if (image.protocol === 'https:' && !/google\.com$|googleusercontent\.com$/.test(image.hostname) && !/logo|avatar|icon/i.test(image.pathname)) return image.href;
    } catch {}
  }
  return '';
}
function normalizeImageUrl(raw, baseUrl) {
  if (!raw) return '';
  try {
    const image = new URL(raw, baseUrl);
    if (image.protocol !== 'https:' || /^(?:localhost|127\.|0\.0\.0\.0)/i.test(image.hostname)) return '';
    return image.href;
  } catch { return ''; }
}
async function fetchArticleDetails(url) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; ChrisLeePapaNewsBot/1.0)' },
      signal: AbortSignal.timeout(7000)
    });
    if (!response.ok) return { link: url, details: [], imageUrl: '' };
    const html = await response.text();
    const finalUrl = response.url || url;
    let host = '';
    try { host = new URL(finalUrl).hostname.toLowerCase(); } catch {}
    // Google News RSS item URLs may not redirect to the publisher in automated requests.
    // Keep the original story-item URL as a usable fallback; its RSS excerpt is still checked below.
    if (host === 'news.google.com' || host.endsWith('.news.google.com')) return { link: url, details: [], articleTitle: '', imageUrl: '' };
    return {
      link: finalUrl,
      details: extractArticleContent(html),
      articleTitle: extractArticleTitle(html),
      imageUrl: extractImageUrl(html, finalUrl)
    };
  } catch {
    return { link: url, details: [], imageUrl: '' };
  }
}
function sentencePoints(text, excluded = []) {
  const blocked = new Set(excluded.map(normalizedTitle));
  return dedupeSentences(splitSentences(text))
    .filter(sentence => !blocked.has(normalizedTitle(sentence)))
    .slice(0, 3)
    .map(s => s.length > 220 ? s.slice(0, 217).replace(/[,;:]$/, '') + '…' : s);
}

let translatorProcess;
let translatorQueue = [];
let translatorReady = false;

function translateWithLocalModel(values) {
  if (!translatorProcess) {
    translatorProcess = spawn('python3', ['automation/translate-news-local.py'], { stdio: ['pipe', 'pipe', 'inherit'] });
    const lines = createInterface({ input: translatorProcess.stdout });
    lines.on('line', line => {
      let result;
      try { result = JSON.parse(line); }
      catch { result = { error: 'Local translator returned invalid worker output.' }; }
      const pending = translatorQueue.shift();
      if (pending) {
        if (result.error) pending.reject(new Error(result.error));
        else pending.resolve(result.values || []);
      }
    });
    translatorProcess.stdin.on('error', error => {
      for (const pending of translatorQueue.splice(0)) pending.reject(error);
    });
    translatorProcess.on('error', error => {
      for (const pending of translatorQueue.splice(0)) pending.reject(error);
    });
    translatorProcess.on('exit', code => {
      translatorReady = false;
      for (const pending of translatorQueue.splice(0)) pending.reject(new Error('Local translator exited with code ' + code));
      translatorProcess = null;
    });
  }
  return new Promise((resolve, reject) => {
    translatorQueue.push({ resolve, reject });
    translatorProcess.stdin.write(JSON.stringify({ values }) + '\n', error => {
      if (error) {
        const index = translatorQueue.findIndex(item => item.resolve === resolve);
        if (index >= 0) translatorQueue.splice(index, 1);
        reject(error);
      }
    });
  });
}

function sourceProperNouns(source) {
  const words = new Set();
  // Allow English names and official entities that occur inside the original sentence.
  const text = String(source || '');
  const commonCapitalizedWords = new Set([
    'a','an','the','and','or','but','if','then','than','when','while','where','who','what','why','how',
    'he','she','it','they','we','you','i','his','her','their','our','your','its','this','that','these','those',
    'after','before','during','following','amid','among','from','with','without','into','onto','over','under',
    'as','at','by','for','in','on','to','of','up','out','off','about','around','across','through',
    'says','said','say','calls','called','plans','planned','killed','dead','living','telling','alone',
    'three','two','one','new','technology','banks','bank','might','help','stink','hole','bitter','end',
    'lead','updates','adds','photos','attention','seoul'
  ]);
  for (const token of text.match(/[A-Za-z][A-Za-z0-9.'&-]*/g) || []) {
    const lower = token.toLowerCase();
    if (/^[A-Z]{2,}$/.test(token)) words.add(lower);
    else if (/^[A-Z][a-z]/.test(token) && !commonCapitalizedWords.has(lower)) words.add(lower);
  }
  return words;
}
function hasUntranslatedEnglish(source, translated) {
  const allowed = sourceProperNouns(source);
  const latinWords = String(translated || '').match(/[A-Za-z][A-Za-z'-]*/g) || [];
  return latinWords.some(word => {
    const lower = word.toLowerCase();
    if (/^[A-Z]{2,}$/.test(word) || allowed.has(lower)) return false;
    // Names and place names may remain English, but ordinary lowercase English words
    // embedded in a Korean sentence indicate that translation was incomplete.
    return /^[a-z]/.test(word);
  });
}

async function translateSegments(values, target) {
  if (target !== 'ko') throw new Error('This news workflow currently supports Korean output only.');
  const translated = await translateWithLocalModel(values);
  if (translated.length !== values.length) throw new Error('Local translation returned an unexpected number of fields.');

  const titleKo = String(translated[0] || '').trim();
  const summaryKo = String(translated[1] || '').trim();
  const pointsKo = translated.slice(2).map(value => String(value || '').trim()).filter(Boolean);
  const hasHangul = value => /[\uAC00-\uD7A3]/.test(value);
  const normalize = value => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
  const distinctPoints = [...new Map(pointsKo.map(point => [normalize(point), point])).values()];
  const translations = [titleKo, summaryKo, ...distinctPoints];
  const allKorean = translations.every(hasHangul);
  // Validate against each corresponding English source field. Proper nouns and acronyms
  // may stay English; ordinary untranslated English words may not.
  const mixedEnglish = translations.some((value, index) => hasUntranslatedEnglish(values[index] || '', value));
  const boilerplate = /comprehensive up-to-date news coverage|match or are related to your search|검색 결과|구글에 표시/i.test(translations.join(' '));
  const obviousBadKorean = /촬영에서 살았던|의심의 여지도|검색 의 어딘가|영광스러운 전쟁|상대는 모두에 모여/i.test(translations.join(' '));
  if (!titleKo || titleKo.length < 8 || !summaryKo || summaryKo.length < 60 ||
      distinctPoints.length < 2 || !allKorean || mixedEnglish || boilerplate || obviousBadKorean) {
    throw new Error('Local translation failed Korean completeness or mixed-English quality checks.');
  }
  return [titleKo, summaryKo, ...distinctPoints.slice(0, Math.max(2, values.length - 2))];
}
async function fetchCategory(category, globallySeenLinks = new Set(), globallySeenTitles = []) {
  const nowMs = Date.now();
  const maxAgeMs = 72 * 60 * 60 * 1000;
  const failures = [];
  const seenLinks = new Set();
  const candidateLimit = 30;

  // Fetch every configured publisher feed first, then compare their timestamps together.
  // This prevents the first configured publisher from winning merely because it appears first.
  const feedCandidates = [];
  for (const feed of category.feeds || []) {
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
      const items = parseItems(await response.text());
      for (const item of items.slice(0, 50)) {
        const publishedMs = Date.parse(item.pubDate);
        if (!Number.isFinite(publishedMs) || publishedMs > nowMs + 5 * 60 * 1000 || nowMs - publishedMs > maxAgeMs) continue;
        let itemUrl;
        try {
          itemUrl = new URL(item.link);
          if (!['http:', 'https:'].includes(itemUrl.protocol)) continue;
        } catch { continue; }
        if (itemUrl.hostname === 'news.google.com' || itemUrl.hostname.includes('bing.com')) continue;
        feedCandidates.push({ feed, item, publishedMs, canonicalLink: itemUrl.href });
      }
    } catch (error) {
      failures.push(feed.name + ': ' + String(error));
    }
  }

  feedCandidates.sort((a, b) => b.publishedMs - a.publishedMs);
  let candidatesChecked = 0;
  for (const candidate of feedCandidates) {
    if (candidatesChecked >= candidateLimit) break;
    const { feed, item, canonicalLink } = candidate;
    if (seenLinks.has(canonicalLink) || globallySeenLinks.has(canonicalLink)) continue;
    seenLinks.add(canonicalLink);
    candidatesChecked++;

    const rssText = cleanHtml(item.description || '');
    const article = feed.rssOnly
      ? { link: canonicalLink, details: [], articleTitle: '', imageUrl: '' }
      : await fetchArticleDetails(canonicalLink);
    const detailText = (article.details || []).join(' ').trim();
    const articleTitle = article.articleTitle || '';
    if (articleTitle && titleSimilarity(item.title, articleTitle) < 0.25) continue;
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

    const summarySentences = cleanSentences.slice(0, 2);
    const summary = summarySentences.join(' ').slice(0, 650).trim();
    const points = sentencePoints(rawCandidate, summarySentences);
    if (summary.length < 90 || points.length < 2) continue;

    let translatedFields;
    try {
      translatedFields = await translateSegments([item.title, summary, ...points], 'ko');
    } catch (error) {
      // A single article with poor machine translation must not abort the whole category.
      // Continue to the next recent publisher candidate and only fail if none pass validation.
      console.error('Skipping article after Korean translation quality check for ' + category.key + ': ' + item.title + ' — ' + String(error));
      continue;
    }
    const titleKo = translatedFields[0];
    const summaryKo = translatedFields[1];
    const translatedPoints = dedupeSentences(translatedFields.slice(2));
    if (!titleKo || !summaryKo || translatedPoints.length < 2 ||
        /this will let google show|match or are related to your search/i.test(summaryKo)) continue;

    return {
      category: category.key, categoryKo: category.ko, categoryEn: category.en,
      title: item.title, titleEn: item.title, titleKo,
      summary, summaryEn: summary, summaryKo,
      points, pointsKo: translatedPoints, pointsEn: points,
      source: feed.name, link: canonicalLink, publishedAt: item.pubDate,
      imageUrl: normalizeImageUrl(article.imageUrl || item.imageUrl, canonicalLink),
      summarySource: detailText.length >= 100 ? 'publisher article page' : feed.name + ' RSS excerpt'
    };
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
// Keep the six selected category stories in newest-first publication order.
cards.sort((a, b) => Date.parse(b.publishedAt || '') - Date.parse(a.publishedAt || ''));

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
const payload = { date, updatedAt: now.toISOString(), sourceNote: 'International publisher feeds only, including BBC News, The Guardian, Al Jazeera English, NPR, Science News and ScienceDaily. Articles link to the original publisher; only direct article links published in the last 72 hours are accepted, and incomplete refreshes do not overwrite existing data.', cards };
await mkdir('data', { recursive: true });
await writeFile('data/chris-news.json', JSON.stringify(payload, null, 2) + '\n');
console.log(`Prepared ${cards.length} news cards for ${date}.`);
