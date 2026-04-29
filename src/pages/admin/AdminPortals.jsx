import { useState, useEffect } from 'react';

/* ─── Encoding helpers ────────────────────────────────────────────────────── */

export function encodePortal(data) {
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);
  let str = '';
  bytes.forEach(b => { str += String.fromCharCode(b); });
  return btoa(str);
}

function toSlug(str) {
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function fmtINR(str) {
  const n = parseInt(str.replace(/,/g, ''), 10);
  if (isNaN(n)) return '';
  return n.toLocaleString('en-IN');
}

function autoMilestones(retainerStr) {
  const n = parseInt(retainerStr.replace(/,/g, ''), 10);
  if (isNaN(n)) return null;
  const half = fmtINR(String(n / 2));
  const full = fmtINR(String(n));
  return [
    { label: '50% Advance — confirm engagement',            amount: half, due: 'Before Day 1' },
    { label: 'End of Month 1 — M1 balance + M2 advance',   amount: full, due: 'End of Month 1' },
    { label: 'End of Month 2 — Final balance',              amount: half, due: 'End of Month 2' },
  ];
}

/* ─── Storage ─────────────────────────────────────────────────────────────── */

const PORTALS_KEY = 'cr_portals';
const BANK_KEY    = 'cr_studio';

function loadPortals() {
  try { return JSON.parse(localStorage.getItem(PORTALS_KEY) || '[]'); }
  catch { return []; }
}
function savePortals(list) {
  localStorage.setItem(PORTALS_KEY, JSON.stringify(list.slice(0, 30)));
}
function loadBank() {
  try { return JSON.parse(localStorage.getItem(BANK_KEY) || 'null') || {}; }
  catch { return {}; }
}

/* ─── Password Gate ───────────────────────────────────────────────────────── */

function PasswordGate({ onAuth }) {
  const [pw, setPw]       = useState('');
  const [err, setErr]     = useState('');
  const [loading, setLoading] = useState(false);

  async function check(e) {
    e.preventDefault();
    setLoading(true); setErr('');
    const r = await fetch(`/api/templates?password=${encodeURIComponent(pw)}`);
    setLoading(false);
    if (r.ok) { sessionStorage.setItem('cr_admin_pw', pw); onAuth(pw); }
    else setErr('Wrong password.');
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div className="mono" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 32 }}>
          Crestify · Admin
        </div>
        <h1 className="serif" style={{ fontSize: 48, color: 'var(--bg)', lineHeight: 1 }}>Client Portals.</h1>
        <form onSubmit={check} style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            type="password" value={pw} onChange={e => setPw(e.target.value)}
            placeholder="Admin password"
            style={{ background: '#ffffff0e', border: '1px solid #ffffff18', borderRadius: 6, padding: '14px 16px', color: '#f0ede6', fontFamily: 'var(--mono)', fontSize: 14, outline: 'none', width: '100%' }}
            autoFocus
          />
          {err && <div style={{ color: '#ef4444', fontFamily: 'var(--mono)', fontSize: 12 }}>{err}</div>}
          <button type="submit" disabled={loading} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, padding: '14px', fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Checking…' : 'Enter →'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Bank Settings ───────────────────────────────────────────────────────── */

function BankSettings() {
  const [open, setOpen]   = useState(false);
  const [bank, setBank]   = useState(loadBank);
  const [saved, setSaved] = useState(false);

  function update(k, v) { setBank(b => ({ ...b, [k]: v })); }
  function save() {
    localStorage.setItem(BANK_KEY, JSON.stringify(bank));
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  const field = { background: 'var(--bg)', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '10px 12px', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', outline: 'none', width: '100%' };
  const label = { fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 5 };

  return (
    <div style={{ border: '1px solid var(--line-strong)', borderRadius: 6, marginBottom: 24, overflow: 'hidden' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: 'var(--bg-elev)', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        <span>⚙ Studio Bank Details — used in all invoices</span>
        <span>{open ? '↑ Close' : '↓ Edit'}</span>
      </button>
      {open && (
        <div style={{ padding: 20, borderTop: '1px solid var(--line-strong)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[['accountName','Account Name'],['bankName','Bank Name'],['accountNumber','Account Number'],['ifsc','IFSC Code'],['upi','UPI ID'],['accountType','Account Type']].map(([k, l]) => (
            <div key={k}>
              <label style={label}>{l}</label>
              <input style={field} value={bank[k] || ''} onChange={e => update(k, e.target.value)} placeholder={l} />
            </div>
          ))}
          <div style={{ gridColumn: '1 / -1' }}>
            <button onClick={save} style={{ background: saved ? '#22c55e' : 'var(--ink)', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 20px', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              {saved ? '✓ Saved' : 'Save bank details'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Portal Form ─────────────────────────────────────────────────────────── */

const EMPTY_FORM = {
  clientShort: '', clientFull: '', slug: '',
  startDate: '', duration: '2 months', dailyHours: '9', retainerMonthly: '',
  signingUrl: '', scopeSummary: '',
  invoiceNumber: '',
  milestones: [
    { label: '50% Advance — confirm engagement',           amount: '', due: 'Before Day 1' },
    { label: 'End of Month 1 — M1 balance + M2 advance',  amount: '', due: 'End of Month 1' },
    { label: 'End of Month 2 — Final balance',             amount: '', due: 'End of Month 2' },
  ],
};

function PortalForm({ onCreated, onCancel }) {
  const [form, setForm]         = useState(EMPTY_FORM);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied]     = useState(false);

  // Auto-slug from client short name
  useEffect(() => {
    if (form.clientShort) setForm(f => ({ ...f, slug: toSlug(f.clientShort) }));
  }, [form.clientShort]);

  // Auto invoice number on mount
  useEffect(() => {
    setForm(f => ({ ...f, invoiceNumber: `CR-${String(Date.now()).slice(-4)}` }));
  }, []);

  function update(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function updateMilestone(i, k, v) {
    setForm(f => {
      const ms = [...f.milestones];
      ms[i] = { ...ms[i], [k]: v };
      return { ...f, milestones: ms };
    });
  }

  function fillMilestones() {
    const ms = autoMilestones(form.retainerMonthly);
    if (ms) setForm(f => ({ ...f, milestones: ms }));
  }

  function generate() {
    const bank = loadBank();
    const portal = { ...form, ...bank, createdAt: Date.now() };
    const encoded = encodePortal(portal);
    const url = `https://crestify.co/clients/${form.slug}#${encoded}`;

    // Save to history
    const portals = loadPortals();
    portals.unshift({ slug: form.slug, clientShort: form.clientShort, clientFull: form.clientFull, portalUrl: url, createdAt: Date.now() });
    savePortals(portals);

    setGeneratedUrl(url);
    onCreated();
  }

  function copyUrl() {
    navigator.clipboard.writeText(generatedUrl).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }

  const field = { background: 'var(--bg)', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '10px 12px', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', outline: 'none', width: '100%' };
  const label = { fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 5 };
  const section = { fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14, marginTop: 4, paddingBottom: 8, borderBottom: '1px solid var(--line-strong)' };

  return (
    <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderRadius: 6, padding: 28, marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 className="serif" style={{ fontSize: 22 }}>New Client Portal</h2>
        <button onClick={onCancel} style={{ background: 'none', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)' }}>✕ Cancel</button>
      </div>

      {/* Section: Client */}
      <div style={section}>01 · Client</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 14, marginBottom: 24 }}>
        <div>
          <label style={label}>Short Name (display)</label>
          <input style={field} value={form.clientShort} onChange={e => update('clientShort', e.target.value)} placeholder="GIVA" />
        </div>
        <div>
          <label style={label}>Full Company Name</label>
          <input style={field} value={form.clientFull} onChange={e => update('clientFull', e.target.value)} placeholder="Indiejewel Fashions Private Limited" />
        </div>
        <div>
          <label style={label}>URL Slug</label>
          <input style={field} value={form.slug} onChange={e => update('slug', e.target.value)} placeholder="giva" />
        </div>
      </div>

      {/* Section: Deal */}
      <div style={section}>02 · Deal</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14, marginBottom: 24 }}>
        <div>
          <label style={label}>Start Date</label>
          <input style={field} value={form.startDate} onChange={e => update('startDate', e.target.value)} placeholder="30 April 2026" />
        </div>
        <div>
          <label style={label}>Duration</label>
          <input style={field} value={form.duration} onChange={e => update('duration', e.target.value)} placeholder="2 months" />
        </div>
        <div>
          <label style={label}>Daily Hours</label>
          <input style={field} type="number" value={form.dailyHours} onChange={e => update('dailyHours', e.target.value)} placeholder="9" />
        </div>
        <div>
          <label style={label}>Monthly Retainer (₹)</label>
          <input style={field} value={form.retainerMonthly} onChange={e => update('retainerMonthly', e.target.value)} placeholder="1,10,000" />
        </div>
      </div>

      {/* Section: Document */}
      <div style={section}>03 · Document</div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 24 }}>
        <div>
          <label style={label}>eSignatures.io Signing URL (paste from dashboard)</label>
          <input style={field} value={form.signingUrl} onChange={e => update('signingUrl', e.target.value)} placeholder="https://esignatures.io/contracts/..." />
        </div>
        <div>
          <label style={label}>Scope Summary (one-liner)</label>
          <input style={field} value={form.scopeSummary} onChange={e => update('scopeSummary', e.target.value)} placeholder="Shopify dev for GIVA Group" />
        </div>
      </div>

      {/* Section: Invoice */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid var(--line-strong)' }}>
        <div style={{ ...section, margin: 0, border: 'none', padding: 0 }}>04 · Invoice &amp; Milestones</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ ...label, marginBottom: 3 }}>Invoice #</label>
            <input style={{ ...field, width: 120 }} value={form.invoiceNumber} onChange={e => update('invoiceNumber', e.target.value)} />
          </div>
          <button onClick={fillMilestones} title="Auto-calculate from retainer" style={{ background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 14px', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', alignSelf: 'flex-end' }}>
            ⟳ Auto-fill
          </button>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        {form.milestones.map((m, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
            <input style={field} value={m.label} onChange={e => updateMilestone(i, 'label', e.target.value)} placeholder={`Milestone ${i + 1} label`} />
            <input style={field} value={m.amount} onChange={e => updateMilestone(i, 'amount', e.target.value)} placeholder="₹ Amount" />
            <input style={field} value={m.due} onChange={e => updateMilestone(i, 'due', e.target.value)} placeholder="Due date" />
          </div>
        ))}
      </div>

      {/* Generate */}
      <div style={{ borderTop: '1px solid var(--line-strong)', paddingTop: 20 }}>
        {!generatedUrl ? (
          <button
            onClick={generate}
            disabled={!form.clientShort || !form.slug}
            style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, padding: '14px 28px', fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, cursor: 'pointer', opacity: (!form.clientShort || !form.slug) ? 0.5 : 1 }}
          >
            Generate Portal URL →
          </button>
        ) : (
          <div style={{ background: '#0d2d1a', border: '1px solid #0d9b6a', borderRadius: 6, padding: 20 }}>
            <div className="mono" style={{ fontSize: 10, color: '#0d9b6a', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>✓ Portal created — share this link with {form.clientShort}</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <code style={{ flex: 1, background: '#ffffff0a', borderRadius: 4, padding: '10px 14px', fontFamily: 'var(--mono)', fontSize: 12, color: '#a4ded6', wordBreak: 'break-all' }}>
                {generatedUrl}
              </code>
              <button onClick={copyUrl} style={{ background: copied ? '#22c55e' : '#0d9b6a', color: '#04261a', border: 'none', borderRadius: 4, padding: '10px 16px', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0, fontWeight: 600 }}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Portal Card ─────────────────────────────────────────────────────────── */

function PortalCard({ portal, onDelete }) {
  const [copied, setCopied] = useState(false);

  function copyUrl() {
    navigator.clipboard.writeText(portal.portalUrl).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }

  const date = new Date(portal.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', border: '1px solid var(--line-strong)', borderRadius: 6, background: 'var(--bg)', marginBottom: 10 }}>
      <div style={{ width: 36, height: 36, background: 'var(--bg-deep)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--accent)', flexShrink: 0 }}>
        {portal.clientShort?.[0] || '?'}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>
          {portal.clientShort} <span style={{ color: 'var(--ink-4)', fontWeight: 400 }}>— {portal.clientFull}</span>
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 3 }}>
          crestify.co/clients/{portal.slug} · Created {date}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={copyUrl} style={{ background: copied ? '#22c55e22' : 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '7px 14px', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 10, color: copied ? '#22c55e' : 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {copied ? '✓ Copied' : 'Copy URL'}
        </button>
        <a href={portal.portalUrl} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '7px 14px', textDecoration: 'none', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Preview ↗
        </a>
        <button onClick={() => onDelete(portal.slug)} style={{ background: '#ff000010', border: '1px solid #ff000030', borderRadius: 4, padding: '7px 12px', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 10, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ✕
        </button>
      </div>
    </div>
  );
}

/* ─── Main Panel ──────────────────────────────────────────────────────────── */

function AdminPortalsPanel() {
  const [portals, setPortals]   = useState(loadPortals);
  const [creating, setCreating] = useState(false);

  function refresh() { setPortals(loadPortals()); }

  function handleDelete(slug) {
    if (!window.confirm(`Delete portal for "${slug}"?`)) return;
    const updated = portals.filter(p => p.slug !== slug);
    savePortals(updated);
    setPortals(updated);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: 'clamp(24px, 4vw, 48px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 8 }}>
              Crestify · Admin
            </div>
            <h1 className="serif" style={{ fontSize: 36, lineHeight: 1.1 }}>Client Portals</h1>
            <p style={{ marginTop: 8, fontSize: 14, color: 'var(--ink-3)', maxWidth: '52ch' }}>
              Create a branded onboarding page for each client. They get a clean URL with their document to sign and payment details.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <a href="/admin/agreements" style={{ background: 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderRadius: 6, padding: '10px 16px', textDecoration: 'none', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              ← Agreements
            </a>
            <button
              onClick={() => setCreating(true)}
              disabled={creating}
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, opacity: creating ? 0.5 : 1 }}
            >
              + New Portal
            </button>
          </div>
        </div>

        {/* Bank settings (collapsible) */}
        <BankSettings />

        {/* Create form */}
        {creating && (
          <PortalForm
            onCreated={() => { refresh(); }}
            onCancel={() => setCreating(false)}
          />
        )}

        {/* Portal list */}
        <div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>
            {portals.length === 0 ? 'No portals yet' : `${portals.length} portal${portals.length !== 1 ? 's' : ''} created`}
          </div>
          {portals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 24px', border: '1px dashed var(--line-strong)', borderRadius: 6, color: 'var(--ink-4)' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔗</div>
              <div className="serif" style={{ fontSize: 20 }}>No portals yet</div>
              <div style={{ fontSize: 14, marginTop: 8 }}>Click "New Portal" to create your first client onboarding page.</div>
            </div>
          )}
          {portals.map(p => (
            <PortalCard key={p.slug + p.createdAt} portal={p} onDelete={handleDelete} />
          ))}
        </div>

      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function AdminPortals() {
  const [pw, setPw] = useState(() => sessionStorage.getItem('cr_admin_pw') || '');

  if (!pw) return <PasswordGate onAuth={setPw} />;
  return <AdminPortalsPanel />;
}
