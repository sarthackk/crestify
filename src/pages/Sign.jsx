import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * /sign?url=ENCODED_SIGN_URL
 *
 * Client-facing signing page. Receives the signing URL as a query param,
 * shows a branded intermediate screen, then embeds the signing experience.
 *
 * Usage: when you copy the signing link from the admin panel, you can either:
 *  A) Send the raw eSignatures.io URL directly (simplest)
 *  B) Send: https://crestify.co/sign?url=ENCODED_URL (keeps your branding)
 *
 * This page handles option B.
 */
export default function Sign() {
  const [params]  = useSearchParams();
  const signUrl   = params.get('url');
  const [stage, setStage] = useState('loading'); // loading | ready | invalid

  useEffect(() => {
    if (signUrl) {
      setStage('ready');
    } else {
      setStage('invalid');
    }
  }, [signUrl]);

  /* ── Styles ── */
  const mono = { fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.12em' };

  if (stage === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <span style={{ ...mono, fontSize: 12, color: 'var(--ink-4)' }}>Loading…</span>
      </div>
    );
  }

  if (stage === 'invalid') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', gap: 20, padding: 24 }}>
        <div className="serif" style={{ fontSize: 36 }}>Link not found.</div>
        <p className="body" style={{ color: 'var(--ink-3)', maxWidth: '40ch', textAlign: 'center' }}>
          This signing link appears to be invalid or expired. Please contact{' '}
          <a href="mailto:hello@crestify.co" style={{ color: 'var(--accent)' }}>hello@crestify.co</a>{' '}
          for a new one.
        </p>
      </div>
    );
  }

  /* ── Signing embed ── */
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

      {/* Minimal branded header */}
      <div style={{ borderBottom: '1px solid var(--line-strong)', padding: '14px var(--pad)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg)', flexShrink: 0 }}>
        <div className="serif" style={{ fontSize: 20, letterSpacing: '-0.02em' }}>Crestify*</div>
        <span style={{ ...mono, fontSize: 10, color: 'var(--ink-4)' }}>Document signing · Secure</span>
      </div>

      {/* Accent stripe */}
      <div style={{ height: 3, background: 'var(--accent)', flexShrink: 0 }} />

      {/* Signing iframe — full remaining height */}
      <iframe
        src={signUrl}
        title="Sign document"
        style={{ flex: 1, border: 'none', width: '100%', minHeight: 'calc(100vh - 56px)' }}
        allow="camera; microphone"
      />
    </div>
  );
}
