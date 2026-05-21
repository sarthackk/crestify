import { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw9sYMSCxNAVzLqS8MxAhEqQchcZ349WIl1GukDyymNDUfHE3I0RUaHhBf1IVZsNtdc/exec';

/* ─── Context ────────────────────────────────────────────────────────────── */
const DrawerCtx = createContext({ open: false, setOpen: () => {} });
export function useDrawer() { return useContext(DrawerCtx); }

/* ─── Accent helper — green on Kaart pages, orange elsewhere ─────────────── */
function useAccent() {
  const { pathname } = useLocation();
  const isKaart = pathname.startsWith('/kaart');
  return {
    A:   isKaart ? '#0d9b6a' : '#ff4d1f',   // main accent
    Adim: isKaart ? '#0d9b6a1a' : '#ff4d1f1a', // bg tint
    Abdr: isKaart ? '#0d9b6a33' : '#ff4d1f33', // border
    Atxt: isKaart ? '#04261a' : '#1a0500',   // text on accent bg
    isKaart,
  };
}

/* ─── Provider ───────────────────────────────────────────────────────────── */
export function ContactDrawerProvider({ children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <DrawerCtx.Provider value={{ open, setOpen }}>
      {children}
      <DrawerPanel open={open} onClose={() => setOpen(false)} />
      <FloatingButton open={open} onToggle={() => setOpen(o => !o)} />
    </DrawerCtx.Provider>
  );
}

/* ─── Drawer Panel ───────────────────────────────────────────────────────── */
function DrawerPanel({ open, onClose }) {
  const { A, Adim, Abdr, Atxt } = useAccent();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', brief: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const SERVICES = ['Commerce', 'Software / SaaS', 'Mobile App', 'Internal Tool', 'Not sure'];
  const BUDGETS  = ['₹50k–₹1L', '₹1L–₹3L', '₹3L–₹5L', '₹5L–₹10L', '₹10L+'];

  const update    = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const canSubmit = form.name && form.email && form.brief;

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', phone: '', service: '', budget: '', brief: '' });
      }, 420);
      return () => clearTimeout(t);
    }
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'Quick Drawer' }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  };

  const iStyle = {
    width: '100%', padding: '12px 0',
    border: 'none', borderBottom: '1px solid #ffffff16',
    background: 'transparent',
    fontFamily: 'var(--sans)', fontSize: 15, color: '#f0ede4',
    outline: 'none',
  };
  const lStyle = {
    fontFamily: 'var(--mono)', fontSize: 10,
    color: '#6b7a72', textTransform: 'uppercase',
    letterSpacing: '0.14em', display: 'block', marginBottom: 2,
  };
  const pillBase = {
    fontFamily: 'var(--mono)', fontSize: 10,
    padding: '7px 13px', borderRadius: 999,
    cursor: 'pointer', textTransform: 'uppercase',
    letterSpacing: '0.1em', transition: 'all 0.15s',
    background: 'transparent',
  };

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1998,
          background: 'rgba(8,12,10,0.65)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick project brief"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 1999,
          width: 'min(480px, 100vw)',
          background: '#0e1411',
          boxShadow: open ? '-24px 0 80px rgba(0,0,0,0.5)' : 'none',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* header */}
        <div style={{
          padding: '22px 28px',
          borderBottom: '1px solid #ffffff10',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0, position: 'sticky', top: 0,
          background: '#0e1411', zIndex: 1,
        }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: A, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 5 }}>
              ● Taking new projects
            </div>
            <div className="serif italic" style={{ fontSize: 24, color: '#f0ede4', letterSpacing: '-0.01em' }}>
              Quick Brief
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1px solid #ffffff18', background: 'transparent',
              color: '#6b7a72', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, lineHeight: 1, flexShrink: 0,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffffff44'; e.currentTarget.style.color = '#f0ede4'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#ffffff18'; e.currentTarget.style.color = '#6b7a72'; }}
          >×</button>
        </div>

        {/* body */}
        <div style={{ padding: '28px', flex: 1 }}>
          {submitted ? (
            <div style={{ padding: '36px 28px', border: `1px solid ${Abdr}`, borderRadius: 6, background: Adim, marginTop: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>✦</div>
              <div className="mono" style={{ fontSize: 10, color: A, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>Brief received</div>
              <p style={{ fontSize: 17, color: '#f0ede4', lineHeight: 1.65, marginBottom: 24 }}>
                Thanks, <strong>{form.name.split(' ')[0]}</strong>. Both founders will read your brief in the next 24 hours and reply within 48.
              </p>
              <button
                onClick={onClose}
                className="mono"
                style={{ fontSize: 11, color: A, textTransform: 'uppercase', letterSpacing: '0.12em', background: 'transparent', border: `1px solid ${Abdr}`, padding: '10px 20px', borderRadius: 999, cursor: 'pointer' }}
              >
                Close panel ×
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* name + email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={lStyle}>Name *</label>
                  <input style={iStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Jane Doe" required />
                </div>
                <div>
                  <label style={lStyle}>Email *</label>
                  <input type="email" style={iStyle} value={form.email} onChange={e => update('email', e.target.value)} placeholder="jane@co.com" required />
                </div>
              </div>

              {/* phone */}
              <div>
                <label style={lStyle}>Phone</label>
                <input type="tel" style={iStyle} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" />
              </div>

              {/* service */}
              <div>
                <label style={lStyle}>What do you need?</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                  {SERVICES.map(s => (
                    <button key={s} type="button" onClick={() => update('service', s === form.service ? '' : s)}
                      style={{ ...pillBase, border: `1px solid ${form.service === s ? A : '#ffffff1a'}`, background: form.service === s ? Adim : 'transparent', color: form.service === s ? A : '#6b7a72' }}
                    >{s}</button>
                  ))}
                </div>
              </div>

              {/* budget */}
              <div>
                <label style={lStyle}>Budget range</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                  {BUDGETS.map(b => (
                    <button key={b} type="button" onClick={() => update('budget', b === form.budget ? '' : b)}
                      style={{ ...pillBase, border: `1px solid ${form.budget === b ? A : '#ffffff1a'}`, background: form.budget === b ? Adim : 'transparent', color: form.budget === b ? A : '#6b7a72' }}
                    >{b}</button>
                  ))}
                </div>
              </div>

              {/* brief */}
              <div>
                <label style={lStyle}>
                  Brief *
                  <span style={{ textTransform: 'none', letterSpacing: 0, color: '#ffffff22', marginLeft: 8 }}>· what are you building?</span>
                </label>
                <textarea rows={4}
                  style={{ ...iStyle, resize: 'none', marginTop: 8, lineHeight: 1.65 }}
                  value={form.brief}
                  onChange={e => update('brief', e.target.value)}
                  placeholder="What are you trying to ship? What's blocking you? What does success look like in 90 days?"
                  required
                />
              </div>

              {/* submit */}
              <button type="submit" disabled={loading || !canSubmit}
                style={{
                  background: A, color: Atxt,
                  border: 'none', borderRadius: 4,
                  padding: '16px 24px',
                  fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 15,
                  cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
                  opacity: canSubmit && !loading ? 1 : 0.5,
                  transition: 'opacity 0.2s, transform 0.15s',
                  textAlign: 'left', letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => { if (canSubmit && !loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
              >
                {loading ? 'Sending…' : 'Send brief →'}
              </button>

              <p className="mono" style={{ fontSize: 10, color: '#ffffff22', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>
                Both founders read every brief · Reply in 48h · NDA on request
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── Floating Button ────────────────────────────────────────────────────── */
const WA_CSS = `
  @keyframes wa-pulse {
    0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
    70%  { box-shadow: 0 0 0 10px rgba(37,211,102,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
  }
  @media (max-width: 480px) {
    .float-brief-label { display: none !important; }
    .float-brief-btn   { padding: 13px 14px !important; }
  }
`;

function FloatingButton({ open, onToggle }) {
  const { pathname } = useLocation();
  const { A, Atxt } = useAccent();
  const [scrolled, setScrolled] = useState(false);
  const hidden = pathname === '/contact';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = scrolled && !hidden;
  const rowStyle = {
    position: 'fixed', bottom: 28, right: 28, zIndex: 1997,
    display: 'flex', alignItems: 'center', gap: 10,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.92)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    pointerEvents: visible ? 'auto' : 'none',
  };

  return (
    <>
      <style>{WA_CSS}</style>
      <div style={rowStyle}>
        {/* WhatsApp */}
        <a
          href="https://wa.me/917992028684"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat with us on WhatsApp"
          style={{
            width: 46, height: 46, borderRadius: '50%',
            background: '#25d366',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(37,211,102,0.45)',
            animation: 'wa-pulse 2.4s ease-in-out infinite',
            transition: 'transform 0.18s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.animation = 'none'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.animation = 'wa-pulse 2.4s ease-in-out infinite'; }}
        >
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.672 4.61 1.835 6.504L4 29l7.696-1.817A12.94 12.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3z" fill="white"/>
            <path d="M21.844 18.71c-.306-.153-1.809-.893-2.089-.994-.28-.102-.484-.153-.688.153-.204.306-.79.994-.968 1.198-.179.204-.357.23-.663.077-.306-.154-1.292-.476-2.46-1.518-.91-.812-1.524-1.815-1.702-2.12-.178-.306-.019-.471.134-.623.137-.136.306-.357.46-.535.152-.179.203-.306.305-.51.102-.204.051-.383-.025-.536-.077-.153-.688-1.659-.942-2.272-.248-.597-.5-.516-.688-.526l-.587-.01c-.204 0-.535.077-.815.383-.28.306-1.07 1.045-1.07 2.549s1.096 2.957 1.248 3.16c.153.204 2.155 3.29 5.222 4.613.73.315 1.3.503 1.743.644.733.233 1.4.2 1.927.121.587-.087 1.808-.738 2.063-1.452.254-.714.254-1.326.178-1.452-.076-.127-.28-.204-.587-.357z" fill="#25d366"/>
          </svg>
        </a>

        {/* Brief us */}
        <button
          onClick={onToggle}
          aria-label={open ? 'Close quick brief' : 'Open quick brief'}
          className="float-brief-btn"
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: open ? '#0e1411' : A,
            color: open ? A : Atxt,
            border: open ? `1px solid ${A}44` : '1px solid transparent',
            borderRadius: 999,
            padding: '13px 22px',
            fontFamily: 'var(--mono)', fontSize: 11,
            textTransform: 'uppercase', letterSpacing: '0.13em',
            cursor: 'pointer',
            boxShadow: open
              ? '0 4px 24px rgba(0,0,0,0.4)'
              : `0 4px 28px ${A}66, 0 2px 8px rgba(0,0,0,0.2)`,
            transition: 'background 0.2s, color 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: 14, lineHeight: 1 }}>{open ? '×' : '✦'}</span>
          <span className="float-brief-label">{open ? 'Close' : 'Brief us'}</span>
        </button>
      </div>
    </>
  );
}
