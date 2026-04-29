/**
 * POST /api/send-agreement
 * Creates a contract via eSignatures.io and returns the signing link.
 *
 * Body: {
 *   password: string,
 *   templateId: string,
 *   title: string,
 *   clientName: string,
 *   clientEmail: string,
 *   clientCompany?: string,
 *   fields?: { api_key: string, value: string }[]
 * }
 */
export default async function handler(req, res) {
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password, templateId, title, clientName, clientEmail, clientCompany, fields = [] } = req.body;

  // Auth check
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const apiKey = process.env.ESIGN_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'eSignatures API key not configured' });

  // Build placeholder fields — always inject client name, company, date
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const allFields = [
    { api_key: 'client_name',    value: clientName },
    { api_key: 'client_company', value: clientCompany || clientName },
    { api_key: 'date',           value: today },
    { api_key: 'effective_date', value: today },
    ...fields,
  ];

  try {
    const response = await fetch(`https://esignatures.io/api/contracts?token=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template_id: templateId,
        title: title || `${clientName} — Agreement`,
        signers: [{ name: clientName, email: clientEmail }],
        placeholder_fields: allFields,
        metadata: JSON.stringify({ company: clientCompany, sentAt: new Date().toISOString() }),
      }),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'ok') {
      console.error('eSignatures error:', data);
      return res.status(502).json({ error: data.message || 'eSignatures API error', detail: data });
    }

    const contract  = data.data.contract;
    const signer    = contract.signers[0];
    const signUrl   = signer.sign_page_url;
    const contractId = contract.id;

    return res.status(200).json({
      contractId,
      signUrl,
      status: contract.status,
      clientName,
      clientEmail,
    });

  } catch (err) {
    console.error('send-agreement error:', err);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
}
