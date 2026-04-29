import { useState, useEffect, useCallback } from 'react';

/* ─── tiny helpers ────────────────────────────────────────────────────────── */
const STORAGE_KEY = 'cr_contracts';

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveToHistory(entry) {
  const history = loadHistory();
  history.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50))); // keep last 50
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const STATUS_COLOR = {
  pending:  '#f59e0b',
  signed:   '#22c55e',
  declined: '#ef4444',
  expired:  '#9c9b95',
};

/* ─── Password gate ───────────────────────────────────────────────────────── */
function PasswordGate({ onAuth }) {
  const [pw, setPw]     = useState('');
  const [err, setErr]   = useState('');
  const [loading, setLoading] = useState(false);

  async function check(e) {
    e.preventDefault();
    setLoading(true);
    setErr('');
    // Validate password by pinging templates endpoint
    const r = await fetch(`/api/templates?password=${encodeURIComponent(pw)}`);
    setLoading(false);
    if (r.ok) {
      sessionStorage.setItem('cr_admin_pw', pw);
      onAuth(pw);
    } else {
      setErr('Wrong password. Try again.');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div className="mono" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 32 }}>
          Crestify · Admin
        </div>
        <h1 className="serif" style={{ fontSize: 48, color: 'var(--bg)', lineHeight: 1 }}>
          Sign in.
        </h1>
        <form onSubmit={check} style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            autoFocus
            style={{ width: '100%', padding: '14px 16px', background: '#ffffff0f', border: '1px solid #ffffff22', borderRadius: 4, color: 'var(--bg)', fontFamily: 'var(--sans)', fontSize: 16, outline: 'none', boxSizing: 'border-box' }}
          />
          {err && <div className="mono" style={{ fontSize: 12, color: '#ef4444', letterSpacing: '0.06em' }}>{err}</div>}
          <button
            type="submit"
            disabled={loading || !pw}
            style={{ padding: '14px 24px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 4, fontFamily: 'var(--sans)', fontSize: 15, cursor: loading ? 'wait' : 'pointer', opacity: loading || !pw ? 0.6 : 1 }}
          >
            {loading ? 'Checking…' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Send form ───────────────────────────────────────────────────────────── */
function SendForm({ password, templates, onSent }) {
  const [form, setForm] = useState({
    templateId: '',
    title: '',
    clientName: '',
    clientEmail: '',
    clientCompany: '',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const canSend = form.templateId && form.clientName && form.clientEmail && form.title;

  async function send(e) {
    e.preventDefault();
    if (!canSend) return;
    setLoading(true);
    setErr('');

    try {
      const r = await fetch('/api/send-agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, ...form }),
      });
      const data = await r.json();
      if (!r.ok) { setErr(data.error || 'Failed to send'); setLoading(false); return; }

      const entry = {
        contractId:    data.contractId,
        signUrl:       data.signUrl,
        title:         form.title,
        clientName:    data.clientName,
        clientEmail:   data.clientEmail,
        clientCompany: form.clientCompany,
        status:        'pending',
        sentAt:        new Date().toISOString(),
      };
      saveToHistory(entry);
      onSent(entry);
      setForm({ templateId: '', title: '', clientName: '', clientEmail: '', clientCompany: '' });
    } catch {
      setErr('Network error. Check your connection.');
    }
    setLoading(false);
  }

  const labelStyle = { fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6, display: 'block' };
  const inputStyle = { width: '100%', padding: '13px 0', border: 'none', borderBottom: '1px solid var(--line-strong)', background: 'transparent', fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' };

  return (
    <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Template */}
      <div>
        <label style={labelStyle}>Document template *</label>
        {templates.length === 0 ? (
          <div className="mono" style={{ fontSize: 12, color: 'var(--ink-4)', paddingTop: 12 }}>
            No templates found. Create one in your eSignatures.io dashboard first, then it will appear here.
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 10 }}>
            {templates.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => { up('templateId', t.id); up('title', t.title); }}
                className="mono"
                style={{
                  padding: '10px 16px',
                  border: '1px solid ' + (form.templateId === t.id ? 'var(--ink)' : 'var(--line-strong)'),
                  background: form.templateId === t.id ? 'var(--ink)' : 'transparent',
                  color: form.templateId === t.id ? 'var(--bg)' : 'var(--ink-2)',
                  borderRadius: 999, fontSize: 11, textTransform: 'uppercase',
                  letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >{t.title}</button>
            ))}
          </div>
        )}
      </div>

      {/* Title override */}
      <div>
        <label style={labelStyle}>Agreement title *</label>
        <input style={inputStyle} value={form.title} onChange={e => up('title', e.target.value)} placeholder="e.g. MSA — Acme Inc" />
      </div>

      {/* Client info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div>
          <label style={labelStyle}>Client name *</label>
          <input style={inputStyle} value={form.clientName} onChange={e => up('clientName', e.target.value)} placeholder="Jane Doe" />
        </div>
        <div>
          <label style={labelStyle}>Company</label>
          <input style={inputStyle} value={form.clientCompany} onChange={e => up('clientCompany', e.target.value)} placeholder="Acme Inc." />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Client email *</label>
        <input type="email" style={inputStyle} value={form.clientEmail} onChange={e => up('clientEmail', e.target.value)} placeholder="jane@acme.co" />
      </div>

      {err && (
        <div style={{ padding: '12px 16px', background: '#ef444420', border: '1px solid #ef4444', borderRadius: 4 }}>
          <span className="mono" style={{ fontSize: 12, color: '#ef4444' }}>{err}</span>
        </div>
      )}

      <div style={{ paddingTop: 8 }}>
        <button
          type="submit"
          disabled={!canSend || loading}
          className="btn btn-accent"
          style={{ fontSize: 16, padding: '18px 28px', opacity: canSend && !loading ? 1 : 0.5, cursor: loading ? 'wait' : 'pointer' }}
        >
          {loading ? 'Sending…' : 'Send for signature →'}
        </button>
      </div>
    </form>
  );
}

/* ─── Success banner ──────────────────────────────────────────────────────── */
function SuccessBanner({ entry, onDismiss }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(entry.signUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ padding: 'clamp(24px, 4vw, 40px)', background: 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderLeft: '3px solid #22c55e', borderRadius: 4, marginBottom: 40 }}>
      <div className="mono" style={{ fontSize: 11, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
        ✓ Agreement sent · waiting for signature
      </div>
      <div className="serif" style={{ fontSize: 22, marginBottom: 6 }}>{entry.title}</div>
      <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 20 }}>
        → {entry.clientName} · {entry.clientEmail}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 200, padding: '10px 14px', background: 'var(--bg)', border: '1px solid var(--line-strong)', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {entry.signUrl}
        </div>
        <button
          onClick={copy}
          className="btn btn-primary"
          style={{ fontSize: 13, padding: '10px 18px', flexShrink: 0 }}
        >
          {copied ? '✓ Copied' : 'Copy signing link'}
        </button>
        <a href={entry.signUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 13, padding: '10px 18px' }}>
          Preview ↗
        </a>
        <button onClick={onDismiss} style={{ background: 'none', border: 'none', color: 'var(--ink-4)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dismiss</button>
      </div>
    </div>
  );
}

/* ─── Contract history row ────────────────────────────────────────────────── */
function ContractRow({ entry, password, onRefresh }) {
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);

  async function refresh() {
    setRefreshing(true);
    try {
      const r = await fetch(`/api/contract-status?contractId=${entry.contractId}&password=${encodeURIComponent(password)}`);
      if (r.ok) {
        const data = await r.json();
        onRefresh(entry.contractId, data.status);
      }
    } catch {}
    setRefreshing(false);
  }

  function copy() {
    navigator.clipboard.writeText(entry.signUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--line-strong)', alignItems: 'center', flexWrap: 'wrap' }}>
      {/* Info */}
      <div>
        <div className="serif" style={{ fontSize: 16 }}>{entry.title}</div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 3 }}>
          {entry.clientName} · {entry.clientEmail} {entry.clientCompany ? `· ${entry.clientCompany}` : ''}
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 3 }}>Sent {fmtDate(entry.sentAt)}</div>
      </div>

      {/* Status pill */}
      <span
        className="mono"
        style={{
          fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em',
          padding: '4px 10px', borderRadius: 999,
          background: (STATUS_COLOR[entry.status] || '#9c9b95') + '22',
          color: STATUS_COLOR[entry.status] || '#9c9b95',
          whiteSpace: 'nowrap',
        }}
      >● {entry.status}</span>

      {/* Refresh */}
      <button onClick={refresh} disabled={refreshing} style={{ background: 'none', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '6px 12px', cursor: refreshing ? 'wait' : 'pointer', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
        {refreshing ? '…' : '↻ Refresh'}
      </button>

      {/* Copy link */}
      {entry.signUrl && (
        <button onClick={copy} style={{ background: 'none', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
          {copied ? '✓ Copied' : 'Copy link'}
        </button>
      )}

      {/* Preview */}
      {entry.signUrl && (
        <a href={entry.signUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap', textDecoration: 'none' }}>
          Open ↗
        </a>
      )}
    </div>
  );
}

/* ─── Main admin page ─────────────────────────────────────────────────────── */
export default function SendAgreement() {
  const [password,  setPassword]  = useState(sessionStorage.getItem('cr_admin_pw') || '');
  const [authed,    setAuthed]    = useState(!!sessionStorage.getItem('cr_admin_pw'));
  const [templates, setTemplates] = useState([]);
  const [history,   setHistory]   = useState(loadHistory);
  const [lastSent,  setLastSent]  = useState(null);
  const [loadingTpl, setLoadingTpl] = useState(false);

  const fetchTemplates = useCallback(async (pw) => {
    setLoadingTpl(true);
    try {
      const r = await fetch(`/api/templates?password=${encodeURIComponent(pw)}`);
      if (r.ok) {
        const data = await r.json();
        setTemplates(data.templates || []);
      }
    } catch {}
    setLoadingTpl(false);
  }, []);

  useEffect(() => {
    if (authed && password) fetchTemplates(password);
  }, [authed, password, fetchTemplates]);

  function handleAuth(pw) {
    setPassword(pw);
    setAuthed(true);
  }

  function handleSent(entry) {
    setLastSent(entry);
    setHistory(loadHistory());
  }

  function handleRefresh(contractId, newStatus) {
    setHistory(prev => {
      const updated = prev.map(e => e.contractId === contractId ? { ...e, status: newStatus } : e);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function clearHistory() {
    if (!window.confirm('Clear all local history? Contracts still exist in eSignatures.io.')) return;
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }

  if (!authed) return <PasswordGate onAuth={handleAuth} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid var(--line-strong)', padding: '16px var(--pad)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="serif" style={{ fontSize: 20, letterSpacing: '-0.02em' }}>Crestify*</div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>/ agreements</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="https://esignatures.io/login" target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>
            eSignatures dashboard ↗
          </a>
          <button
            onClick={() => { sessionStorage.removeItem('cr_admin_pw'); setAuthed(false); setPassword(''); }}
            style={{ background: 'none', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >Sign out</button>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) var(--pad)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 4fr', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }}>

          {/* Left: send form */}
          <div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>§01 · New agreement</div>
            <h1 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.018em', marginBottom: 36 }}>
              Send a document.
            </h1>

            {lastSent && <SuccessBanner entry={lastSent} onDismiss={() => setLastSent(null)} />}

            {loadingTpl ? (
              <div className="mono" style={{ fontSize: 12, color: 'var(--ink-4)' }}>Loading templates…</div>
            ) : (
              <SendForm password={password} templates={templates} onSent={handleSent} />
            )}
          </div>

          {/* Right: info panel */}
          <div style={{ position: 'sticky', top: 80 }}>
            <div style={{ padding: 'clamp(20px, 3vw, 32px)', border: '1px solid var(--line-strong)', borderRadius: 4, background: 'var(--bg-elev)', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>How it works</div>
                <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 0 }}>
                  {[
                    'Pick a template from eSignatures.io',
                    'Enter the client name, company & email',
                    'Click send — they get an email with a signing link',
                    'They sign → both of you get a PDF copy by email',
                    'Use "Refresh" below to check status any time',
                  ].map((step, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="body" style={{ fontSize: 14 }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div style={{ borderTop: '1px solid var(--line-strong)', paddingTop: 20 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Add a new template</div>
                <p className="body" style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 12 }}>
                  Templates are managed in your eSignatures.io dashboard. Add your MSA, SOW, NDA etc. there — they auto-appear here.
                </p>
                <a href="https://esignatures.io/templates" target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>
                  Manage templates ↗
                </a>
              </div>

              <div style={{ borderTop: '1px solid var(--line-strong)', paddingTop: 20 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Cost</div>
                <p className="body" style={{ fontSize: 13.5, color: 'var(--ink-3)' }}>~$0.50 per signed document on the pay-as-you-go plan.</p>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div style={{ marginTop: 'clamp(56px, 8vw, 100px)', borderTop: '1px solid var(--line-strong)', paddingTop: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>§02 · Recent</div>
              <h2 className="serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>Sent agreements</h2>
            </div>
            {history.length > 0 && (
              <button onClick={clearHistory} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Clear history
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div style={{ padding: '40px 0', borderTop: '1px solid var(--line-strong)' }}>
              <p className="body" style={{ color: 'var(--ink-4)', fontSize: 15 }}>No agreements sent yet. Send one above and it will appear here.</p>
            </div>
          ) : (
            <div>
              <div style={{ borderTop: '1px solid var(--line-strong)' }}>
                {history.map(entry => (
                  <ContractRow
                    key={entry.contractId}
                    entry={entry}
                    password={password}
                    onRefresh={handleRefresh}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
