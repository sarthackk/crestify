export default function handler(req, res) {
  return res.status(200).json({
    hasPassword: !!process.env.ADMIN_PASSWORD,
    passwordLength: process.env.ADMIN_PASSWORD?.length ?? 0,
    hasApiKey: !!process.env.ESIGN_API_KEY,
    receivedPassword: req.query.pw ?? '(none)',
    receivedLength: (req.query.pw ?? '').length,
    match: req.query.pw === process.env.ADMIN_PASSWORD,
  });
}
