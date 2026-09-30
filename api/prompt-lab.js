async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Prompt Lab is not configured yet.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const fields = ['idea','purpose','style','audience','output','other'];
    const values = Object.fromEntries(fields.map(key => [key, typeof body[key] === 'string' ? body[key].trim() : '']));
    if (!values.idea) return res.status(400).json({ error: 'idea is required' });

    const totalLength = fields.reduce((sum, key) => sum + values[key].length, 0);
    if (totalLength > 6500) return res.status(413).json({ error: 'Input is too long.' });

    const language = body.language === 'en' ? 'English' : 'Korean';
    const context = fields.map(key => values[key] ? `${key.toUpperCase()}: ${values[key]}` : '').filter(Boolean).join('\n');

    const instructions = `You are Prompt Lab, a prompt-writing assistant.
Turn the user's rough idea and optional details into ONE polished, ready-to-use prompt.

Rules:
- Return ONLY the final prompt. Do not add an explanation, title, analysis, bullets about your process, or quotation marks around the whole prompt.
- Preserve the user's intent. Do not invent specific facts, people, brands, copyrighted characters, or technical requirements that the user did not request.
- Resolve ambiguity by making the prompt clearer and more actionable without changing the intended goal.
- Combine the supplied purpose, style, audience, output requirements, and other notes naturally.
- Do not create an image, video, music, or other asset. Write the prompt that another AI tool could use.
- The final prompt should be detailed enough to be useful but not padded with generic filler.
- Write the final prompt in ${language}.
- If the user wrote a proper noun or product/tool name, keep it unless it conflicts with the user's request.

USER INPUT:
${context}`;

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_PROMPT_LAB_MODEL || 'gpt-5.6-luna',
        instructions,
        input: 'Create the final prompt now.',
        max_output_tokens: 900,
        store: false
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI Prompt Lab error:', data);
      return res.status(502).json({ error: 'OpenAI request failed.' });
    }

    const prompt = typeof data.output_text === 'string'
      ? data.output_text.trim()
      : (data.output || []).flatMap(item => item.content || []).filter(item => item.type === 'output_text').map(item => item.text).join('\n').trim();

    if (!prompt) return res.status(502).json({ error: 'No prompt returned.' });
    return res.status(200).json({ prompt });
  } catch (error) {
    console.error('Prompt Lab handler error:', error);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}


module.exports = handler;
