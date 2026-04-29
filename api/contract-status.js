/**
 * GET /api/contract-status?contractId=xxx&password=xxx
 * Returns current status of a contract.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { contractId, password } = req.query;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const apiKey = process.env.ESIGN_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'eSignatures API key not configured' });
  if (!contractId) return res.status(400).json({ error: 'contractId required' });

  try {
    const response = await fetch(`https://esignatures.io/api/contracts/${contractId}?token=${apiKey}`);
    const data = await response.json();

    if (!response.ok || data.status !== 'ok') {
      return res.status(502).json({ error: data.message || 'eSignatures API error' });
    }

    const contract = data.data.contract;
    return res.status(200).json({
      contractId: contract.id,
      title:      contract.title,
      status:     contract.status,         // pending | signed | declined | expired
      signers:    contract.signers.map(s => ({
        name:     s.name,
        email:    s.email,
        status:   s.status,
        signedAt: s.signed_at || null,
        signUrl:  s.sign_page_url,
      })),
      createdAt:  contract.created_at,
      signedAt:   contract.signed_at || null,
    });

  } catch (err) {
    console.error('contract-status error:', err);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
}
