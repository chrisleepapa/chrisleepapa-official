const categoryLabels = new Map([
  ['message', '남기는 글'],
  ['suggestion', '개선 제안'],
  ['bug', '오류 신고']
]);
const allowedOrigins = new Set(['https://chrisleepapa.com', 'https://www.chrisleepapa.com', 'https://develop.chrisleepapa.com']);

module.exports = async function sendSupportFeedback(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method' });
  }
  if (!allowedOrigins.has(req.headers.origin) || !/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) {
    return res.status(403).json({ error: 'origin_or_format' });
  }
  const { category, subject, message, id, website } = req.body || {};
  const label = categoryLabels.get(category);
  if (!label || website || typeof subject !== 'string' || typeof message !== 'string' ||
      !subject.trim() || subject.length > 100 || !message.trim() || message.length > 3000 ||
      typeof id !== 'string' || !/^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(id)) {
    return res.status(400).json({ error: 'invalid_feedback' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'feedback_unavailable' });
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'Idempotency-Key': 'website-support/' + id
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        from: 'Chris LEE.PAPA 지원 <support@mail.chrisleepapa.com>',
        to: ['papamunglog@gmail.com'],
        subject: '[사이트 지원] ' + label,
        text: '유형: ' + label + '\n제목: ' + subject.trim() + '\n\n' + message.trim()
      })
    });
    if (!response.ok) return res.status(502).json({ error: 'delivery_failed' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'delivery_failed' });
  }
};
