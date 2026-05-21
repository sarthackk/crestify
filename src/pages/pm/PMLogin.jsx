import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, FB_READY } from '../../lib/firebase.js';
import { usePMAuth } from './PMAuth.jsx';

const K = '#0d9b6a'; // Kaart green

const S = {
  page:    { minHeight: '100vh', background: '#f3f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  wrap:    { width: '100%', maxWidth: 400 },
  label:   { fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#7a9e8a', marginBottom: 6, display: 'block' },
  input:   { width: '100%', background: '#fff', border: '1px solid #d4e6dc', borderRadius: 8, padding: '13px 16px', color: '#0d1f16', fontFamily: 'var(--sans)', fontSize: 15, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' },
  btn:     { width: '100%', background: K, color: '#fff', border: 'none', borderRadius: 8, padding: '14px', fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, cursor: 'pointer', marginTop: 6 },
  err:     { color: '#ef4444', fontFamily: 'var(--mono)', fontSize: 12, marginTop: 4 },
};

export default function PMLogin() {
  const { user } = usePMAuth();
  const [email,   setEmail]   = useState('');
  const [pw,      setPw]      = useState('');
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState('');
  const [reset,   setReset]   = useState(false);
  const [resetMsg, setResetMsg] = useState('');

  if (!FB_READY) return (
    <div style={S.page}>
      <div style={S.wrap}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#7a9e8a', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>Kaart Studio · PM</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 40, color: '#0d1f16', marginBottom: 16 }}>Setup required.</h1>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: '#5a5870', lineHeight: 1.7 }}>
          Firebase environment variables are not configured yet.<br />
          Add them to Vercel → Project Settings → Environment Variables, then redeploy.
        </p>
      </div>
    </div>
  );

  if (user) { window.location.replace('/pm'); return null; }

  async function login(e) {
    e.preventDefault();
    setLoading(true); setErr('');
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      window.location.replace('/pm');
    } catch (ex) {
      setErr(ex.code === 'auth/invalid-credential' || ex.code === 'auth/wrong-password'
        ? 'Wrong email or password.'
        : ex.code === 'auth/user-not-found'
        ? 'No account found.'
        : 'Sign-in failed. Try again.');
    } finally { setLoading(false); }
  }

  async function doReset(e) {
    e.preventDefault();
    if (!email) { setErr('Enter your email first.'); return; }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMsg('Reset email sent — check your inbox.');
    } catch { setErr('Could not send reset email.'); }
    finally { setLoading(false); }
  }

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        {/* Brand */}
        {/* Brand tag */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0d9b6a18', border: '1px solid #0d9b6a33', borderRadius: 999, padding: '5px 12px', marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: K }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K, textTransform: 'uppercase', letterSpacing: '0.18em' }}>Kaart Studio · Crestify PM</span>
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 6vw, 56px)', color: '#0d1f16', lineHeight: 1.05, marginBottom: 36 }}>
          {reset ? 'Reset password.' : 'Team login.'}
        </h1>

        {!reset ? (
          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={S.label}>Email</label>
              <input style={S.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@crestify.co" required
                onFocus={e => e.target.style.borderColor = K}
                onBlur={e  => e.target.style.borderColor = '#d4e6dc'} />
            </div>
            <div>
              <label style={S.label}>Password</label>
              <input style={S.input} type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" required
                onFocus={e => e.target.style.borderColor = K}
                onBlur={e  => e.target.style.borderColor = '#d4e6dc'} />
            </div>
            {err && <p style={S.err}>{err}</p>}
            <button type="submit" disabled={loading} style={{ ...S.btn, opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Signing in…' : 'Sign in →'}
            </button>
            <button type="button" onClick={() => { setReset(true); setErr(''); }}
              style={{ background: 'none', border: 'none', color: '#5a5870', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', marginTop: -8 }}>
              Forgot password?
            </button>
          </form>
        ) : (
          <form onSubmit={doReset} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={S.label}>Email</label>
              <input style={S.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@crestify.co" required
                onFocus={e => e.target.style.borderColor = '#ff4d1f'}
                onBlur={e  => e.target.style.borderColor = '#1e1e30'} />
            </div>
            {err && <p style={S.err}>{err}</p>}
            {resetMsg && <p style={{ color: '#0d9b6a', fontFamily: 'var(--mono)', fontSize: 12 }}>{resetMsg}</p>}
            <button type="submit" disabled={loading} style={{ ...S.btn, opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Sending…' : 'Send reset email →'}
            </button>
            <button type="button" onClick={() => { setReset(false); setErr(''); setResetMsg(''); }}
              style={{ background: 'none', border: 'none', color: '#5a5870', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer' }}>
              ← Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
