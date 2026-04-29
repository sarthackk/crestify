/**
 * POST /api/webhook
 * Receives event notifications from eSignatures.io.
 * Configure this URL in your eSignatures.io dashboard under Settings → Webhooks:
 *   https://crestify.co/api/webhook
 *
 * Events fired:
 *   - contract-signed      → all parties have signed
 *   - signer-signed        → one signer has signed
 *   - contract-declined    → a signer declined
 *   - contract-expired     → contract passed deadline without signing
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const event = req.body;
    const eventType   = event.status;          // e.g. "contract-signed"
    const contract    = event.data?.contract;
    const contractId  = contract?.id;
    const title       = contract?.title;
    const signerEmail = contract?.signers?.[0]?.email;

    console.log(`[eSign webhook] ${eventType} | ${contractId} | ${title} | ${signerEmail}`);

    // ── You can extend this to: ──────────────────────────────────────────────
    // • Send yourself a Slack/WhatsApp notification
    // • Write to a database / Google Sheet
    // • Trigger a follow-up email via Resend
    // ─────────────────────────────────────────────────────────────────────────

    if (eventType === 'contract-signed') {
      console.log(`✅ CONTRACT SIGNED: "${title}" by ${signerEmail}`);
      // TODO: notify Sarthak via email/Slack
    }

    if (eventType === 'contract-declined') {
      console.log(`❌ CONTRACT DECLINED: "${title}" by ${signerEmail}`);
    }

    return res.status(200).json({ received: true });

  } catch (err) {
    console.error('webhook error:', err);
    return res.status(500).json({ error: 'Webhook handling failed' });
  }
}
