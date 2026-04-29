import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

/* ─── Decode portal data from URL hash ────────────────────────────────────── */

function decodePortal(str) {
  const raw = atob(str);
  const bytes = Uint8Array.from(raw, c => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function getPortalData(slug) {
  // 1. Try URL hash (primary — the full URL with #data is what gets shared)
  const hash = window.location.hash.slice(1);
  if (hash) {
    try { return decodePortal(hash); }
    catch { /* fall through */ }
  }
  // 2. Try localStorage (admin preview — same device)
  try {
    const portals = JSON.parse(localStorage.getItem('cr_portals') || '[]');
    const match = portals.find(p => p.slug === slug);
    if (match) return decodePortal(match.portalUrl.split('#')[1] || '');
  } catch { /* fall through */ }
  return null;
}

/* ─── Shared styles ───────────────────────────────────────────────────────── */

const C = {
  bg:      '#06060a',
  card:    '#0f0f16',
  border:  '#1a1a26',
  text:    '#e4e2dc',
  muted:   '#6a6880',
  accent:  '#ff4d1f',
  green:   '#0d9b6a',
  greenBg: '#0d2d1a',
};

/* ─── Not Found ───────────────────────────────────────────────────────────── */

function NotFound({ slug }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 24 }}>
        Crestify · Client Portal
      </div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 6vw, 72px)', color: C.text, lineHeight: 1.1, marginBottom: 20 }}>
        Portal not<br /><em style={{ color: C.accent }}>found.</em>
      </h1>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: C.muted, maxWidth: '40ch', lineHeight: 1.7, marginBottom: 32 }}>
        The link for <code style={{ fontFamily: 'var(--mono)', color: C.text }}>/clients/{slug}</code> didn't include the portal data, or the link may be incomplete.
      </p>
      <a href="mailto:hello@crestify.co" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: `1px solid ${C.accent}`, padding: '10px 20px', borderRadius: 999 }}>
        hello@crestify.co
      </a>
    </div>
  );
}

/* ─── Portal Header ───────────────────────────────────────────────────────── */

function PortalHeader({ data }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: `${C.bg}e8`, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '14px clamp(16px, 4vw, 40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        {/* Brand × Client */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, color: C.text, textDecoration: 'none', letterSpacing: '-0.02em' }}>
            Crestify*
          </Link>
          <span style={{ color: C.border, fontSize: 18 }}>×</span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, color: C.text }}>
            {data.clientShort}
          </span>
        </div>
        {/* Status chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.14em', background: '#f59e0b18', border: '1px solid #f59e0b44', padding: '5px 12px', borderRadius: 999 }}>
            ● Awaiting signature
          </span>
        </div>
      </div>
    </header>
  );
}

/* ─── Deal chips ──────────────────────────────────────────────────────────── */

function DealChip({ label, value }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '16px 20px', flex: '1 1 140px', minWidth: 0 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(18px, 2.5vw, 26px)', color: C.text, letterSpacing: '-0.01em', lineHeight: 1 }}>{value}</div>
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

function PortalHero({ data }) {
  return (
    <section style={{ padding: 'clamp(48px, 7vw, 90px) clamp(16px, 4vw, 40px) clamp(32px, 4vw, 48px)', maxWidth: 1000, margin: '0 auto' }}>
      {/* Eyebrow */}
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 24 }}>
        Engagement Portal · {data.startDate}
      </div>
      {/* Headline */}
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 6vw, 80px)', color: C.text, fontWeight: 400, lineHeight: 1.04, letterSpacing: '-0.025em', maxWidth: '18ch', marginBottom: 20 }}>
        Hi {data.clientShort},<br />
        <em style={{ color: C.accent }}>welcome aboard.</em>
      </h1>
      {/* Scope */}
      {data.scopeSummary && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.6vw, 18px)', color: C.muted, maxWidth: '52ch', lineHeight: 1.7, marginBottom: 36 }}>
          {data.scopeSummary}
        </p>
      )}
      {/* Deal chips */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {data.retainerMonthly && <DealChip label="Monthly retainer" value={`₹${data.retainerMonthly}`} />}
        {data.duration        && <DealChip label="Duration"         value={data.duration} />}
        {data.dailyHours      && <DealChip label="Daily hours"      value={`${data.dailyHours} hrs/day`} />}
        {data.startDate       && <DealChip label="Start date"       value={data.startDate} />}
      </div>
    </section>
  );
}

/* ─── Tab nav ─────────────────────────────────────────────────────────────── */

function TabNav({ active, onChange }) {
  const tabs = [
    { id: 'agreement', label: '📄 Agreement' },
    { id: 'invoice',   label: '🧾 Invoice & Payment' },
  ];
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: C.bg, position: 'sticky', top: 53, zIndex: 40 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', display: 'flex', gap: 0 }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              background: 'none', border: 'none', borderBottom: `2px solid ${active === t.id ? C.accent : 'transparent'}`,
              padding: '14px 20px', cursor: 'pointer',
              fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500,
              color: active === t.id ? C.text : C.muted,
              transition: 'all 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Agreement tab ───────────────────────────────────────────────────────── */

function AgreementTab({ data }) {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) clamp(16px, 4vw, 40px)' }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 26, color: C.text, marginBottom: 8 }}>
          Master Service Agreement &amp; Statement of Work
        </h2>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: C.muted }}>
          Please review the document carefully and sign at the bottom. Once signed, both parties will receive a copy automatically.
        </p>
      </div>

      {data.signingUrl ? (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              🔒 Secure document via eSignatures.io
            </span>
            <a href={data.signingUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}>
              Open in new tab ↗
            </a>
          </div>
          <iframe
            src={data.signingUrl}
            title="Document signing"
            style={{ width: '100%', height: 760, border: 'none', display: 'block' }}
            allow="camera; microphone"
          />
        </div>
      ) : (
        <div style={{ background: C.card, border: `1px dashed ${C.border}`, borderRadius: 8, padding: '60px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>📋</div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: C.text, marginBottom: 10 }}>
            Agreement being prepared
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: C.muted, maxWidth: '40ch', margin: '0 auto' }}>
            Your MSA &amp; SOW is being finalised. We'll send you the signing link as soon as it's ready.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Invoice tab ─────────────────────────────────────────────────────────── */

function InvoiceTab({ data }) {
  const [copiedField, setCopiedField] = useState('');

  function copyField(label, value) {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(label);
      setTimeout(() => setCopiedField(''), 2000);
    });
  }

  const th = { padding: '10px 16px', fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'left', color: C.muted, fontWeight: 400 };
  const td = { padding: '14px 16px', fontFamily: 'var(--sans)', fontSize: 14, color: C.text, verticalAlign: 'top', borderBottom: `1px solid ${C.border}` };

  const bankFields = [
    { label: 'Account Name', value: data.accountName },
    { label: 'Bank',         value: data.bankName },
    { label: 'Account No.',  value: data.accountNumber },
    { label: 'IFSC',         value: data.ifsc },
    { label: 'Account Type', value: data.accountType },
    { label: 'UPI',          value: data.upi },
  ].filter(f => f.value);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) clamp(16px, 4vw, 40px)', display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Invoice header */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ background: '#0e0e1a', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, borderBottom: `1px solid ${C.border}` }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6 }}>Invoice</div>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 32, color: C.text, letterSpacing: '-0.02em' }}>
              #{data.invoiceNumber || 'CR-001'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Effective date</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 16, color: C.text }}>{data.startDate || '—'}</div>
          </div>
        </div>

        {/* From / To */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${C.border}` }}>
          {[
            { label: 'From', name: 'Crestify Studio', detail: 'contact@crestify.co · +91 7992028684' },
            { label: 'To',   name: data.clientFull || data.clientShort, detail: `${data.duration || ''} engagement` },
          ].map(p => (
            <div key={p.label} style={{ padding: '18px 24px', borderRight: p.label === 'From' ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>{p.label}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, color: C.text, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: C.muted }}>{p.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment schedule */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, color: C.text }}>Payment Schedule</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              <th style={th}>Milestone</th>
              <th style={{ ...th, textAlign: 'right' }}>Amount (excl. GST)</th>
              <th style={{ ...th, textAlign: 'right' }}>Due</th>
            </tr>
          </thead>
          <tbody>
            {(data.milestones || []).map((m, i) => (
              <tr key={i}>
                <td style={td}>{m.label}</td>
                <td style={{ ...td, fontFamily: 'var(--mono)', fontSize: 15, color: C.accent, textAlign: 'right', whiteSpace: 'nowrap' }}>₹{m.amount}</td>
                <td style={{ ...td, fontFamily: 'var(--mono)', fontSize: 12, color: C.muted, textAlign: 'right', whiteSpace: 'nowrap' }}>{m.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '12px 20px', background: '#0a0a12', borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
            + 18% GST applicable on each invoice, charged separately · Invoices payable within <strong style={{ color: C.text }}>7 days</strong> of invoice date
          </p>
        </div>
      </div>

      {/* Bank details */}
      {bankFields.length > 0 && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, color: C.text }}>Bank Transfer Details</h3>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Click any field to copy</span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {bankFields.map(f => (
              <button
                key={f.label}
                onClick={() => copyField(f.label, f.value)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', background: copiedField === f.label ? `${C.green}18` : 'transparent', border: 'none', borderBottom: `1px solid ${C.border}`, cursor: 'pointer', gap: 16, transition: 'background 0.2s', textAlign: 'left' }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0 }}>{f.label}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color: copiedField === f.label ? C.green : C.text, flex: 1, textAlign: 'right' }}>
                  {copiedField === f.label ? `✓ Copied` : f.value}
                </span>
              </button>
            ))}
          </div>
          <div style={{ padding: '14px 20px', background: C.greenBg, borderTop: `1px solid ${C.green}44` }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: '#7dd3c0', lineHeight: 1.6 }}>
              Please use invoice number <strong style={{ color: '#a4ded6', fontFamily: 'var(--mono)' }}>#{data.invoiceNumber || 'CR-001'}</strong> as your payment reference. Let us know once the transfer is done and we'll confirm receipt.
            </p>
          </div>
        </div>
      )}

      {/* Contact */}
      <div style={{ padding: '20px 24px', border: `1px solid ${C.border}`, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Questions about this invoice?</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: C.text }}>
            <a href="mailto:hello@crestify.co" style={{ color: C.accent, textDecoration: 'none' }}>hello@crestify.co</a>
            {' · '}
            <a href="tel:+917992028684" style={{ color: C.text, textDecoration: 'none' }}>+91 7992028684</a>
          </div>
        </div>
        <a href="https://wa.me/917992028684" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: C.green, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', border: `1px solid ${C.green}`, padding: '8px 16px', borderRadius: 999 }}>
          WhatsApp ↗
        </a>
      </div>

    </div>
  );
}

/* ─── Portal footer ───────────────────────────────────────────────────────── */

function PortalFooter({ data }) {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: '24px clamp(16px, 4vw, 40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        © 2026 Crestify Studio · Prepared for {data.clientFull || data.clientShort} · Confidential
      </div>
      <Link to="/" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: C.muted, textDecoration: 'none' }}>
        crestify.co
      </Link>
    </footer>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function ClientPortal() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [tab, setTab]   = useState('agreement');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Decode on client side after mount (hash isn't available during SSR)
    const portal = getPortalData(slug);
    setData(portal);
    setReady(true);
  }, [slug]);

  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: C.muted }}>Loading…</div>
      </div>
    );
  }

  if (!data) return <NotFound slug={slug} />;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>
      <PortalHeader data={data} />
      <PortalHero   data={data} />
      <TabNav active={tab} onChange={setTab} />
      {tab === 'agreement' ? <AgreementTab data={data} /> : <InvoiceTab data={data} />}
      <PortalFooter data={data} />
    </div>
  );
}
