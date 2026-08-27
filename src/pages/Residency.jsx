import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/shared/SEO.jsx';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import { useReveal } from '../components/shared/useReveal.js';

/* Same sheet the contact form lands in — submissions we actually check. */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw9sYMSCxNAVzLqS8MxAhEqQchcZ349WIl1GukDyymNDUfHE3I0RUaHhBf1IVZsNtdc/exec';

/* ─── Editable data ──────────────────────────────────────────────────────── */

const TRACKS = [
  {
    key: 'Stays',
    for: 'Homestays, hostels, boutique or newly opening properties.',
    build: 'Property site, booking or enquiry flow, brand presence, and a content shoot.',
    take: 'Travel for two from Kanpur, a minimum of 3 nights, meals, and full filming access.',
  },
  {
    key: 'Events',
    for: 'Festivals, markets, community meetups, conferences.',
    build: 'Event site, ticketing or registration, on-ground digital touchpoints, and event content.',
    take: 'Travel, stay for the duration, and full access to the event and its people.',
  },
  {
    key: 'Brands',
    for: 'Early-stage product or D2C brands.',
    build: 'Site, store, app, or internal systems — whatever the 10-day cap allows.',
    take: 'Equity or revenue share — agreed and documented before any work starts.',
  },
];

const FITS = [
  'Event site + ticketing / registration',
  'Property site + booking flow',
  'Digital menu + brand kit',
  'Community platform or directory (small scope)',
  'A content shoot — included in every residency',
];

const NEED = [
  ['Travel', 'Return travel for two from Kanpur.'],
  ['Stay', 'A place to sleep for the residency — 3 nights minimum for stays, the full duration for events.'],
  ['Meals', 'Food while we’re there.'],
  ['Filming access', 'Full permission to shoot reels, photos and a story on location.'],
  ['A decision-maker', 'Someone available to answer questions and sign off, so the build doesn’t stall.'],
];

const NOT_FOR = [
  'Anyone looking for a free agency.',
  'Builds that need months, not days.',
  'Work with no story in it — nothing to shoot, nothing to show.',
  'Hosts who can’t cover travel, stay and meals.',
  'Anyone expecting our paid rates to bend because of this.',
];

/* One host a month. Twelve a year. Edit status: 'open' | 'taken' | 'live'. */
const SLOTS = [
  { month: 'Jan', status: 'open' },
  { month: 'Feb', status: 'open' },
  { month: 'Mar', status: 'open' },
  { month: 'Apr', status: 'open' },
  { month: 'May', status: 'open' },
  { month: 'Jun', status: 'open' },
  { month: 'Jul', status: 'open' },
  { month: 'Aug', status: 'open' },
  { month: 'Sep', status: 'open' },
  { month: 'Oct', status: 'open' },
  { month: 'Nov', status: 'open' },
  { month: 'Dec', status: 'open' },
];

const PROOF = [
  { name: 'Giva', sector: 'Jewellery · D2C', img: '/giva-store.png', to: '/kaart/giva' },
  { name: "Haldiram's", sector: 'F&B · Retail', img: '/haldirams-london.jpg', to: '/kaart/haldirams' },
  { name: 'Eatops', sector: 'Café ERP · Product', img: '/eatops.png', href: 'https://eatops.co' },
  { name: 'Common Time', sector: 'Café · Custom Build', img: '/commontime.png', href: 'https://commontime.in' },
];

/* ─── Section wrapper ────────────────────────────────────────────────────── */
function Sec({ index, tag, children, style }) {
  return (
    <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)', ...style }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}><Eyebrow index={index}>{tag}</Eyebrow></div>
        {children}
      </div>
    </section>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', paddingTop: 'clamp(72px, 12vw, 150px)', paddingBottom: 'clamp(56px, 9vw, 120px)' }}>
      <div className="container">
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>Crestify Residency</span>
        <h1 className="display" style={{ marginTop: 22, maxWidth: '18ch' }}>
          We build for one host a month. Instead of paying us, they <span className="italic" style={{ color: 'var(--accent)' }}>host us.</span>
        </h1>
        <p className="body-lg" style={{ marginTop: 26, maxWidth: '46ch', color: 'var(--ink-5)' }}>
          We go somewhere — a café, a homestay, a new hostel, an event, an early brand — and build what they need. A site, a ticketing system, a menu, a booking flow. We shoot content there too. They don’t pay us. They host us.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginTop: 38 }}>
          <a href="#apply" className="btn btn-accent">Apply to host <span className="arr">→</span></a>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
            One a month · Ten days · Twelve a year
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Numbers strip ──────────────────────────────────────────────────────── */
function Numbers() {
  const items = [
    ['1', 'host a month'],
    ['10', 'working days, capped'],
    ['3', 'nights minimum'],
    ['12', 'slots a year'],
  ];
  return (
    <section style={{ background: 'var(--bg-deep-elev)', color: 'var(--bg)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 0 }}>
        {items.map(([n, l], i) => (
          <div key={l} style={{ padding: 'clamp(28px, 4vw, 44px) 0', borderLeft: i === 0 ? 'none' : '1px solid #ffffff14', paddingLeft: i === 0 ? 0 : 'clamp(16px, 2vw, 28px)' }}>
            <div className="serif" style={{ fontSize: 'clamp(38px, 5vw, 56px)', lineHeight: 1, color: 'var(--accent)' }}>{n}</div>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-5)', marginTop: 8 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Tracks ─────────────────────────────────────────────────────────────── */
function Tracks() {
  return (
    <Sec index="02" tag="The three tracks">
      <h2 className="h2" style={{ maxWidth: '20ch' }}>Three kinds of host. What we take back differs.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 16, marginTop: 'clamp(32px, 4vw, 48px)' }}>
        {TRACKS.map((t, i) => (
          <div key={t.key} className="reveal lift" style={{ border: '1px solid var(--line-strong)', borderRadius: 8, padding: 'clamp(24px, 3vw, 34px)', background: 'var(--bg-elev)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span className="serif" style={{ fontSize: 26 }}>{t.key}</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>0{i + 1}</span>
            </div>
            <p className="body" style={{ color: 'var(--ink-3)' }}>{t.for}</p>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>We build</div>
              <p className="body" style={{ color: 'var(--ink-2)' }}>{t.build}</p>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 6 }}>We take</div>
              <p className="body" style={{ color: 'var(--ink-2)' }}>{t.take}</p>
            </div>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* ─── What fits in ten days ──────────────────────────────────────────────── */
function Fits() {
  return (
    <Sec index="03" tag="What fits in ten days">
      <h2 className="h2" style={{ maxWidth: '22ch' }}>Up to ten working days of studio time. That’s the unit — effort, not a fixed list.</h2>
      <p className="body-lg" style={{ marginTop: 18, maxWidth: '52ch', color: 'var(--ink-3)' }}>
        It lets a café menu and an event ticketing platform both fit. Pitch us something realistic. These are examples, not a contract:
      </p>
      <ul style={{ listStyle: 'none', marginTop: 'clamp(28px, 4vw, 40px)', borderTop: '1px solid var(--line)' }}>
        {FITS.map((f) => (
          <li key={f} className="reveal" style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
            <span className="mono" style={{ color: 'var(--accent)', fontSize: 13 }}>+</span>
            <span className="body-lg" style={{ color: 'var(--ink-2)' }}>{f}</span>
          </li>
        ))}
      </ul>
      <p className="body" style={{ marginTop: 24, color: 'var(--ink-3)', maxWidth: '54ch' }}>
        Anything beyond ten days is a normal, paid Crestify conversation — <Link to="/contact" style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>talk to us here</Link>.
      </p>
    </Sec>
  );
}

/* ─── Proof ──────────────────────────────────────────────────────────────── */
function Proof() {
  return (
    <Sec index="04" tag="Proof">
      <h2 className="h2" style={{ maxWidth: '20ch' }}>We can actually build. Some of what we’ve shipped:</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16, marginTop: 'clamp(32px, 4vw, 48px)' }}>
        {PROOF.map((p) => {
          const inner = (
            <>
              <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', background: 'var(--bg-deep)' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '14px 16px' }}>
                <div className="serif" style={{ fontSize: 19 }}>{p.name}</div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)', marginTop: 3 }}>{p.sector}</div>
              </div>
            </>
          );
          const style = { display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid var(--line-strong)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-elev)' };
          return p.to
            ? <Link key={p.name} to={p.to} className="reveal lift" style={style}>{inner}</Link>
            : <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="reveal lift" style={style}>{inner}</a>;
        })}
      </div>
    </Sec>
  );
}

/* ─── What we need ───────────────────────────────────────────────────────── */
function Need() {
  return (
    <Sec index="05" tag="What we need from you">
      <h2 className="h2" style={{ maxWidth: '18ch' }}>Requirements, not requests.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 1, marginTop: 'clamp(32px, 4vw, 48px)', background: 'var(--line-strong)', border: '1px solid var(--line-strong)', borderRadius: 8, overflow: 'hidden' }}>
        {NEED.map(([k, v]) => (
          <div key={k} style={{ background: 'var(--bg-elev)', padding: 'clamp(20px, 2.5vw, 28px)' }}>
            <div className="serif" style={{ fontSize: 20, marginBottom: 6 }}>{k}</div>
            <p className="body" style={{ color: 'var(--ink-3)' }}>{v}</p>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* ─── Who this isn't for ─────────────────────────────────────────────────── */
function NotFor() {
  return (
    <section className="section-pad-sm" style={{ background: 'var(--bg-deep)', color: 'var(--bg)' }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}><Eyebrow index="06" light>Who this isn’t for</Eyebrow></div>
        <h2 className="h2" style={{ maxWidth: '16ch' }}>Read this before you apply.</h2>
        <ul style={{ listStyle: 'none', marginTop: 'clamp(28px, 4vw, 40px)', maxWidth: '46ch' }}>
          {NOT_FOR.map((n) => (
            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '16px 0', borderBottom: '1px solid #ffffff1a' }}>
              <span className="mono" style={{ color: 'var(--accent)', fontSize: 14 }}>—</span>
              <span className="body-lg" style={{ color: 'var(--bg)' }}>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Calendar ───────────────────────────────────────────────────────────── */
function Calendar() {
  const meta = {
    open: { label: 'Open', dot: 'var(--accent)', muted: false },
    taken: { label: 'Taken', dot: 'var(--ink-4)', muted: true },
    live: { label: 'Live now', dot: '#0d9b6a', muted: false },
  };
  return (
    <Sec index="07" tag="The calendar">
      <h2 className="h2" style={{ maxWidth: '20ch' }}>Twelve slots. One live at a time.</h2>
      <p className="body-lg" style={{ marginTop: 18, maxWidth: '50ch', color: 'var(--ink-3)' }}>
        A new residency doesn’t start until the last one is delivered. You apply whenever; we slot you into a month. Flexible start, hard end.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 130px), 1fr))', gap: 10, marginTop: 'clamp(32px, 4vw, 48px)' }}>
        {SLOTS.map((s) => {
          const m = meta[s.status] || meta.open;
          return (
            <div key={s.month} style={{ border: '1px solid var(--line-strong)', borderRadius: 8, padding: '18px 16px', background: m.muted ? 'transparent' : 'var(--bg-elev)', opacity: m.muted ? 0.55 : 1 }}>
              <div className="serif" style={{ fontSize: 22 }}>{s.month}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: m.dot, flexShrink: 0 }} />
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{m.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Sec>
  );
}

/* ─── Application form ───────────────────────────────────────────────────── */
function Apply() {
  const [form, setForm] = useState({
    name: '', place: '', hostType: '', location: '', dates: '',
    offering: '', build: '', links: '', why: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canSubmit = form.name && form.place && form.location && form.why;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'Residency Application' }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  };

  const label = { display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 8 };
  const field = { width: '100%', padding: '13px 15px', border: '1px solid var(--line-strong)', borderRadius: 7, background: 'var(--bg-elev)', fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)', outline: 'none' };
  const row = { marginBottom: 20 };

  return (
    <section id="apply" className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)', background: 'var(--bg-elev)' }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}><Eyebrow index="08">Application</Eyebrow></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'start' }}>
          <div>
            <h2 className="h2" style={{ maxWidth: '14ch' }}>Apply to host a residency.</h2>
            <p className="body-lg" style={{ marginTop: 18, color: 'var(--ink-3)', maxWidth: '38ch' }}>
              We select hosts — you apply. Tell us the place and what you’d want built. The last question is the one that matters most.
            </p>
            <p className="mono" style={{ marginTop: 24, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
              One host a month · Ten days · Scope agreed in writing
            </p>
          </div>

          {submitted ? (
            <div style={{ border: '1px solid var(--line-strong)', borderRadius: 10, padding: 'clamp(32px, 5vw, 56px)', background: 'var(--bg)', textAlign: 'left' }}>
              <div className="serif" style={{ fontSize: 30 }}>Got it.</div>
              <p className="body-lg" style={{ marginTop: 12, color: 'var(--ink-3)', maxWidth: '34ch' }}>
                Your application is in. If the place and the pitch fit a slot, we’ll be in touch to lock a month.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 20, marginBottom: 20 }}>
                <div><label style={label}>Your name *</label><input style={field} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Who you are" /></div>
                <div><label style={label}>The place / brand *</label><input style={field} value={form.place} onChange={(e) => update('place', e.target.value)} placeholder="What it’s called" /></div>
              </div>
              <div style={{ ...row }}>
                <label style={label}>What kind of host</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Stay', 'Event', 'Brand'].map((h) => {
                    const on = form.hostType === h;
                    return (
                      <button type="button" key={h} onClick={() => update('hostType', h)} style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '9px 16px', borderRadius: 999, cursor: 'pointer', border: `1px solid ${on ? 'var(--accent)' : 'var(--line-strong)'}`, background: on ? 'var(--accent)' : 'transparent', color: on ? '#fff' : 'var(--ink-3)', transition: 'all 0.15s' }}>{h}</button>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 20, marginBottom: 20 }}>
                <div><label style={label}>Location *</label><input style={field} value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="City / where it is" /></div>
                <div><label style={label}>Proposed dates</label><input style={field} value={form.dates} onChange={(e) => update('dates', e.target.value)} placeholder="A month or window that works" /></div>
              </div>
              <div style={row}><label style={label}>What you’re offering</label><input style={field} value={form.offering} onChange={(e) => update('offering', e.target.value)} placeholder="Travel, stay, meals, access — and equity/rev-share for brands" /></div>
              <div style={row}><label style={label}>What you want built</label><textarea style={{ ...field, minHeight: 92, resize: 'vertical' }} value={form.build} onChange={(e) => update('build', e.target.value)} placeholder="Site, ticketing, menu, booking flow…" /></div>
              <div style={row}><label style={label}>Links</label><input style={field} value={form.links} onChange={(e) => update('links', e.target.value)} placeholder="Instagram, current site, anything" /></div>
              <div style={row}><label style={label}>Why this place is worth a residency *</label><textarea style={{ ...field, minHeight: 110, resize: 'vertical' }} value={form.why} onChange={(e) => update('why', e.target.value)} placeholder="The real question. What makes it worth a month of ours?" /></div>
              <button type="submit" className="btn btn-primary" disabled={!canSubmit || loading} style={{ opacity: !canSubmit || loading ? 0.5 : 1, cursor: !canSubmit || loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Sending…' : <>Send application <span className="arr">→</span></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Fine print ─────────────────────────────────────────────────────────── */
function FinePrint() {
  const lines = [
    'Up to 10 working days of studio time per residency. Anything beyond is a paid engagement.',
    'One revision round included. Scope is agreed in writing before travel.',
    'Content rights stay with Crestify. Hosts get full usage of everything we shoot.',
    'Equity or revenue-share arrangements are documented before any work starts.',
  ];
  return (
    <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(24px, 3vw, 36px)' }}><Eyebrow index="09">Fine print</Eyebrow></div>
        <ul style={{ listStyle: 'none', maxWidth: '60ch' }}>
          {lines.map((l) => (
            <li key={l} className="body" style={{ color: 'var(--ink-3)', padding: '12px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 14 }}>
              <span className="mono" style={{ color: 'var(--ink-4)', fontSize: 12 }}>§</span>{l}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Residency() {
  useReveal();
  return (
    <div className="page">
      <SEO
        title="Crestify Residency — one host a month, we build, they host us"
        description="A Crestify programme: each month we take on one host — a café, homestay, hostel, event or early brand — and build what they need in up to 10 working days. They don’t pay us; they host us. Twelve slots a year, one at a time."
        canonical="/residency"
        keywords="Crestify Residency, build in residence, studio on location, work trade, hospitality website build, event ticketing build"
      />
      <Nav />
      <Hero />
      <Numbers />
      <Sec index="01" tag="What this is">
        <h2 className="h2" style={{ maxWidth: '24ch' }}>One host a month. We build, we shoot, and we work for something other than money.</h2>
        <p className="body-lg" style={{ marginTop: 20, maxWidth: '54ch', color: 'var(--ink-3)' }}>
          We want to travel and work from places we wouldn’t otherwise get to. Content is newer for us than client work, and we want reps in real locations. We’d rather build something interesting for a small place than another safe deliverable for a large one.
        </p>
        <p className="body-lg" style={{ marginTop: 18, maxWidth: '54ch', color: 'var(--ink-3)' }}>
          This is a residency, not free work. We select hosts; they apply. It runs adjacent to the studio — our paid work isn’t part of this trade.
        </p>
      </Sec>
      <Tracks />
      <Fits />
      <Proof />
      <Need />
      <NotFor />
      <Calendar />
      <Apply />
      <FinePrint />
      <Footer />
    </div>
  );
}
