/**
 * GET /api/templates?password=xxx
 * Lists all templates from eSignatures.io account.
 * Returns empty array (not an error) if none exist yet.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.query;

  // ── 1. Password check first — 401 only for wrong password ──
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const apiKey = process.env.ESIGN_API_KEY;
  if (!apiKey) {
    // Password was right, API key missing — still let them in with empty templates
    return res.status(200).json({ templates: [], warning: 'ESIGN_API_KEY not configured' });
  }

  // ── 2. Try fetching templates — never return non-200 for eSign errors ──
  try {
    const response = await fetch(`https://esignatures.io/api/templates?token=${apiKey}`);
    const data = await response.json();

    // If eSign API fails, return empty list — don't block login
    if (!response.ok || data.status !== 'ok') {
      console.error('eSignatures templates error:', data);
      return res.status(200).json({ templates: [], warning: data.message || 'Could not load templates' });
    }

    const templates = (data.data?.templates || []).map(t => ({
      id:    t.id,
      title: t.title,
      pages: t.pages,
    }));

    return res.status(200).json({ templates });

  } catch (err) {
    console.error('templates fetch error:', err);
    // Network error — still let them in
    return res.status(200).json({ templates: [], warning: 'Network error fetching templates' });
  }
}
