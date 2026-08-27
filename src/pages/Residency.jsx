import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/shared/SEO.jsx';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import { useReveal } from '../components/shared/useReveal.js';

/* Same sheet the contact form lands in — submissions we actually check. */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw9sYMSCxNAVzLqS8MxAhEqQchcZ349WIl1GukDyymNDUfHE3I0RUaHhBf1IVZsNtdc/exec';

/* ─── Editable data ──────────────────────────────────────────────────────── */

const BUILD_WORDS = ['a booking flow', 'a digital menu', 'an event ticket system', 'a brand-new site', 'a little brand kit', 'a community app'];
const PLACES = ['Homestays', 'Hostels', 'Cafés', 'Festivals', 'Markets', 'New hotels', 'Early brands', 'Community events', 'Boutique stays', 'Meetups'];

const WE_BRING = ['Design + code', 'A camera', '~10 days', 'Full attention'];
const YOU_BRING = ['A place to stay', 'Meals', 'Room to film', 'A story'];

const TRACKS = [
  {
    key: 'Stays',
    for: 'Homestays, hostels, boutique or newly opening properties.',
    build: 'A property site, a booking or enquiry flow, some brand presence — and a proper content shoot while we’re there.',
    take: 'Travel for two from Kanpur, a few nights, meals, and the freedom to film.',
  },
  {
    key: 'Events',
    for: 'Festivals, markets, community meetups, conferences.',
    build: 'An event site, ticketing or registration, on-ground digital bits, and content from the middle of it all.',
    take: 'Travel, a place to stay for the run of it, and access to the event and its people.',
  },
  {
    key: 'Brands',
    for: 'Early-stage product or D2C brands doing something interesting.',
    build: 'A site, store, app, or the internal systems you’re missing — we figure out the right thing together.',
    take: 'Equity or revenue share — nothing heavy, just written down before we start.',
  },
];

const FITS = [
  'An event site with ticketing or registration',
  'A property site with a booking flow',
  'A digital menu and a little brand kit',
  'A small community platform or directory',
  'A content shoot — that comes with every one',
];

const NEED = [
  ['A place to land', 'Somewhere to stay while we’re there — a few nights for stays, the run of it for events.'],
  ['Travel', 'A hand with getting two of us there and back from Kanpur.'],
  ['Meals', 'Feed us and we’re happy.'],
  ['Room to film', 'The freedom to shoot reels, photos and a little story on location.'],
  ['Someone to talk to', 'A person we can bounce ideas off and get quick answers from, so it stays fun and moves.'],
];

const FIT = [
  'A place or a brand with a story in it — something worth building and worth filming.',
  'Work that fits in a week or two, not months.',
  'People who are up for experimenting alongside us, not handing over a spec.',
  'Somewhere we’d genuinely love to spend a little time.',
];

/* Roughly one at a time, through the year. Edit status: 'open' | 'taken' | 'live'. */
const SLOTS = [
  { month: 'Jan', status: 'open' }, { month: 'Feb', status: 'open' }, { month: 'Mar', status: 'open' },
  { month: 'Apr', status: 'open' }, { month: 'May', status: 'open' }, { month: 'Jun', status: 'open' },
  { month: 'Jul', status: 'open' }, { month: 'Aug', status: 'open' }, { month: 'Sep', status: 'open' },
  { month: 'Oct', status: 'open' }, { month: 'Nov', status: 'open' }, { month: 'Dec', status: 'open' },
];

const PROOF = [
  { name: 'Giva', sector: 'Jewellery · D2C', img: '/giva-store.png', to: '/kaart/giva' },
  { name: "Haldiram's", sector: 'F&B · Retail', img: '/haldirams-london.jpg', to: '/kaart/haldirams' },
  { name: 'Eatops', sector: 'Café ERP · Product', img: '/eatops.png', href: 'https://eatops.co' },
  { name: 'Common Time', sector: 'Café · Custom Build', img: '/commontime.png', href: 'https://commontime.in' },
];

/* ─── Scoped styles / motion ─────────────────────────────────────────────── */
const CSS = `
.res-dotgrid { background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 26px 26px; }
.res-dotgrid-l { background-image: radial-gradient(rgba(14,14,14,0.06) 1px, transparent 1px); background-size: 26px 26px; }
.res-glow { position:absolute; border-radius:50%; filter: blur(70px); pointer-events:none; }
@keyframes res-marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.res-marquee { overflow:hidden; white-space:nowrap; display:flex; }
.res-marq-track { display:inline-flex; align-items:center; animation: res-marq 40s linear infinite; }
.res-marquee:hover .res-marq-track { animation-play-state: paused; }
@keyframes res-word { 0%{opacity:0; transform:translateY(10px)} 12%{opacity:1; transform:translateY(0)} 88%{opacity:1; transform:translateY(0)} 100%{opacity:0; transform:translateY(-10px)} }
.res-word { display:inline-block; animation: res-word 0.5s cubic-bezier(.2,.7,.2,1); }
.res-postcard { position:relative; transition: transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s, border-color .3s; }
.res-postcard:hover { transform: translateY(-5px) rotate(-.5deg); box-shadow: 0 20px 44px rgba(14,14,14,.13); border-color: var(--accent) !important; }
.res-stamp { position:absolute; top:16px; right:16px; width:40px; height:46px; border:1.5px dashed var(--line-strong); border-radius:4px; display:flex; align-items:center; justify-content:center; font-family:var(--serif); font-size:20px; color:var(--ink-4); transform: rotate(6deg); }
.res-postcard:hover .res-stamp { border-color: var(--accent); color: var(--accent); }
.res-polaroid { transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s; box-shadow: 0 8px 24px rgba(14,14,14,.12); }
.res-polaroid:hover { transform: rotate(0deg) translateY(-6px) scale(1.02) !important; box-shadow: 0 22px 50px rgba(14,14,14,.2); z-index:2; }
.res-tape { position:absolute; top:-9px; left:50%; width:64px; height:20px; transform: translateX(-50%) rotate(-2deg); background: rgba(255,77,31,0.22); border:1px solid rgba(255,77,31,0.35); }
@keyframes res-spin { to { transform: rotate(360deg); } }
.res-spin { animation: res-spin 16s linear infinite; }
@keyframes res-pulse { 0%,100%{opacity:1; transform:scale(1)} 50%{opacity:.4; transform:scale(.8)} }
.res-live { animation: res-pulse 1.8s ease-in-out infinite; }
.res-chip { display:inline-flex; align-items:center; gap:8px; font-family:var(--mono); font-size:11.5px; letter-spacing:.04em; padding:10px 14px; border:1px solid var(--line-strong); border-radius:999px; background:var(--bg-elev); }
`;

/* ─── Rotating word ──────────────────────────────────────────────────────── */
function Rotator({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span style={{ display: 'inline-block', color: 'var(--accent)' }}>
      <span key={i} className="res-word italic serif">{words[i]}</span>
    </span>
  );
}

/* ─── Count-up ───────────────────────────────────────────────────────────── */
function CountUp({ to, prefix = '', suffix = '' }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const dur = 900, start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        setN(Math.round(p * p * (3 - 2 * p) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

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
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 'clamp(72px, 12vw, 140px)', paddingBottom: 'clamp(52px, 8vw, 104px)' }}>
      <div className="res-dotgrid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      <div className="res-glow" style={{ width: 460, height: 460, background: 'rgba(255,77,31,0.22)', top: -140, right: -80 }} />
      <div className="res-glow" style={{ width: 380, height: 380, background: 'rgba(255,77,31,0.10)', bottom: -160, left: -120 }} />
      <div className="container" style={{ position: 'relative' }}>
        <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid #ffffff1f', borderRadius: 999, padding: '7px 14px' }}>
          <span className="res-live" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          Crestify Residency · Studio on location
        </span>
        <h1 className="display" style={{ marginTop: 26, maxWidth: '18ch' }}>
          We go somewhere, build what they need, and instead of an invoice — they <span className="italic" style={{ color: 'var(--accent)' }}>host us.</span>
        </h1>
        <p className="serif" style={{ marginTop: 24, fontSize: 'clamp(22px, 3.4vw, 34px)', color: 'var(--bg)', lineHeight: 1.2 }}>
          This month, we could build you <Rotator words={BUILD_WORDS} />.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginTop: 40 }}>
          <a href="#apply" className="btn btn-accent">Tell us about your place <span className="arr">→</span></a>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
            Roughly one at a time · around ten days
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee band ───────────────────────────────────────────────────────── */
function MarqueeBand() {
  const row = [...PLACES, ...PLACES];
  return (
    <div className="res-marquee" style={{ background: 'var(--accent)', color: '#fff', padding: '13px 0', borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
      {[0, 1].map((k) => (
        <div key={k} className="res-marq-track" aria-hidden={k === 1}>
          {row.map((p, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: 34 }}>
              {p}<span style={{ opacity: 0.55, marginLeft: 34 }}>✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── The trade (exchange visual) ────────────────────────────────────────── */
function Trade() {
  const Col = ({ title, items, accent }) => (
    <div style={{ flex: '1 1 240px', border: '1px solid var(--line-strong)', borderRadius: 12, padding: 'clamp(22px, 3vw, 32px)', background: 'var(--bg-elev)' }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent ? 'var(--accent)' : 'var(--ink-4)', marginBottom: 16 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
        {items.map((it) => <span key={it} className="res-chip" style={{ color: 'var(--ink-2)' }}>{it}</span>)}
      </div>
    </div>
  );
  return (
    <section className="section-pad-sm res-dotgrid-l" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(24px, 3vw, 36px)' }}><Eyebrow>The trade, in one look</Eyebrow></div>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 18, flexWrap: 'wrap' }}>
          <Col title="We bring the studio" items={WE_BRING} accent />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', minWidth: 72 }}>
            <div className="res-spin" style={{ width: 58, height: 58, borderRadius: '50%', border: '1.5px dashed var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: 22 }}>⇄</div>
          </div>
          <Col title="You host us" items={YOU_BRING} />
        </div>
        <p className="body" style={{ marginTop: 22, color: 'var(--ink-3)', maxWidth: '52ch' }}>
          No invoice changes hands. For brands, the exchange is a little equity or revenue share instead — written down before we start.
        </p>
      </div>
    </section>
  );
}

/* ─── Numbers strip ──────────────────────────────────────────────────────── */
function Numbers() {
  const items = [
    { to: 1, label: 'host at a time' },
    { to: 10, prefix: '~', label: 'days of studio time' },
    { to: 3, label: 'nights or so, for stays' },
    { to: 12, label: 'or so a year' },
  ];
  return (
    <section style={{ background: 'var(--bg-deep-elev)', color: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="res-dotgrid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 0 }}>
        {items.map((it, i) => (
          <div key={it.label} style={{ padding: 'clamp(30px, 4vw, 48px) 0', borderLeft: i === 0 ? 'none' : '1px solid #ffffff14', paddingLeft: i === 0 ? 0 : 'clamp(16px, 2vw, 28px)' }}>
            <div className="serif" style={{ fontSize: 'clamp(40px, 5.4vw, 62px)', lineHeight: 1, color: 'var(--accent)' }}>
              <CountUp to={it.to} prefix={it.prefix || ''} />
            </div>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-5)', marginTop: 10 }}>{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Tracks (postcards) ─────────────────────────────────────────────────── */
function Tracks() {
  return (
    <Sec index="02" tag="The three tracks">
      <h2 className="h2" style={{ maxWidth: '22ch' }}>Three kinds of collaboration. Each one trades a little differently.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 18, marginTop: 'clamp(32px, 4vw, 48px)' }}>
        {TRACKS.map((t, i) => (
          <div key={t.key} className="reveal res-postcard" style={{ border: '1px solid var(--line-strong)', borderRadius: 10, padding: 'clamp(24px, 3vw, 34px)', background: 'var(--bg-elev)', display: 'flex', flexDirection: 'column', gap: 18, borderTop: '3px solid var(--accent)' }}>
            <div className="res-stamp">0{i + 1}</div>
            <span className="serif" style={{ fontSize: 27 }}>{t.key}</span>
            <p className="body" style={{ color: 'var(--ink-3)' }}>{t.for}</p>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>What we’d build</div>
              <p className="body" style={{ color: 'var(--ink-2)' }}>{t.build}</p>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 6 }}>The exchange</div>
              <p className="body" style={{ color: 'var(--ink-2)' }}>{t.take}</p>
            </div>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* ─── What fits ──────────────────────────────────────────────────────────── */
function Fits() {
  return (
    <Sec index="03" tag="Roughly what fits">
      <h2 className="h2" style={{ maxWidth: '22ch' }}>Think of it as about ten days of studio time — a rough guide, not a contract.</h2>
      <p className="body-lg" style={{ marginTop: 18, maxWidth: '52ch', color: 'var(--ink-3)' }}>
        It’s enough for a café menu or an event platform, and we scope the real thing together. A few things that comfortably fit:
      </p>
      <ul style={{ listStyle: 'none', marginTop: 'clamp(28px, 4vw, 40px)', borderTop: '1px solid var(--line)' }}>
        {FITS.map((f, i) => (
          <li key={f} className="reveal" style={{ display: 'flex', gap: 18, alignItems: 'baseline', padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
            <span className="mono" style={{ color: 'var(--ink-4)', fontSize: 12, minWidth: 24 }}>0{i + 1}</span>
            <span className="mono" style={{ color: 'var(--accent)', fontSize: 13 }}>+</span>
            <span className="body-lg" style={{ color: 'var(--ink-2)' }}>{f}</span>
          </li>
        ))}
      </ul>
      <p className="body" style={{ marginTop: 24, color: 'var(--ink-3)', maxWidth: '54ch' }}>
        If it grows into something bigger, that’s a good problem — and a normal paid Crestify conversation. <Link to="/contact" style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>Say hi here</Link>.
      </p>
    </Sec>
  );
}

/* ─── Proof (polaroids) ──────────────────────────────────────────────────── */
function Proof() {
  const rot = [-2.2, 1.8, -1.4, 2];
  return (
    <Sec index="04" tag="A bit of our work" style={{ background: 'var(--bg-deep)', color: 'var(--bg)' }}>
      <h2 className="h2" style={{ maxWidth: '20ch', color: 'var(--bg)' }}>So you know we can actually build. A few we’ve shipped:</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 'clamp(20px, 3vw, 34px)', marginTop: 'clamp(40px, 5vw, 60px)' }}>
        {PROOF.map((p, i) => {
          const inner = (
            <>
              <span className="res-tape" />
              <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: '#111' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '12px 6px 4px' }}>
                <div className="serif" style={{ fontSize: 20, color: '#1a1a1a' }}>{p.name}</div>
                <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a8a86', marginTop: 2 }}>{p.sector}</div>
              </div>
            </>
          );
          const style = { display: 'block', position: 'relative', textDecoration: 'none', background: '#fff', padding: 10, borderRadius: 3, transform: `rotate(${rot[i % rot.length]}deg)` };
          return p.to
            ? <Link key={p.name} to={p.to} className="reveal res-polaroid" style={style}>{inner}</Link>
            : <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="reveal res-polaroid" style={style}>{inner}</a>;
        })}
      </div>
    </Sec>
  );
}

/* ─── What makes it work ─────────────────────────────────────────────────── */
function Need() {
  return (
    <Sec index="05" tag="What makes it work">
      <h2 className="h2" style={{ maxWidth: '20ch' }}>A few things from your side, and we handle the rest.</h2>
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

/* ─── What makes a good fit ──────────────────────────────────────────────── */
function Fit() {
  return (
    <section className="section-pad-sm res-dotgrid-l" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}><Eyebrow index="06">What makes a good fit</Eyebrow></div>
        <h2 className="h2" style={{ maxWidth: '18ch' }}>The kind of thing we get excited about.</h2>
        <ul style={{ listStyle: 'none', marginTop: 'clamp(28px, 4vw, 40px)', maxWidth: '52ch' }}>
          {FIT.map((n) => (
            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '16px 0', borderBottom: '1px solid var(--line-strong)' }}>
              <span className="mono" style={{ color: 'var(--accent)', fontSize: 14 }}>+</span>
              <span className="body-lg" style={{ color: 'var(--ink-2)' }}>{n}</span>
            </li>
          ))}
        </ul>
        <p className="body-lg" style={{ marginTop: 24, color: 'var(--ink-3)', maxWidth: '46ch' }}>
          It’s a trade, not free agency work — but if that sounds like a fun way to spend a week rather than a transaction, we’ll probably get along.
        </p>
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
    <Sec index="07" tag="Where we’re at">
      <h2 className="h2" style={{ maxWidth: '20ch' }}>We usually take one at a time.</h2>
      <p className="body-lg" style={{ marginTop: 18, maxWidth: '52ch', color: 'var(--ink-3)' }}>
        That way we can actually be present for it. Reach out whenever — we’ll figure out a window that works for both of us. Here’s roughly where the year stands:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 120px), 1fr))', gap: 10, marginTop: 'clamp(32px, 4vw, 48px)' }}>
        {SLOTS.map((s) => {
          const m = meta[s.status] || meta.open;
          return (
            <div key={s.month} className="lift" style={{ border: '1px solid var(--line-strong)', borderRadius: 8, padding: '18px 16px', background: m.muted ? 'transparent' : 'var(--bg-elev)', opacity: m.muted ? 0.5 : 1, borderTop: m.muted ? '1px solid var(--line-strong)' : `3px solid ${m.dot}` }}>
              <div className="serif" style={{ fontSize: 22 }}>{s.month}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10 }}>
                <span className={s.status === 'live' ? 'res-live' : ''} style={{ width: 7, height: 7, borderRadius: '50%', background: m.dot, flexShrink: 0 }} />
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
  const [form, setForm] = useState({ name: '', place: '', hostType: '', location: '', dates: '', offering: '', build: '', links: '', why: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canSubmit = form.name && form.place && form.location && form.why;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    try {
      await fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, source: 'Residency Application' }) });
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
        <div style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}><Eyebrow index="08">Say hello</Eyebrow></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'start' }}>
          <div>
            <h2 className="h2" style={{ maxWidth: '14ch' }}>Tell us about your place.</h2>
            <p className="body-lg" style={{ marginTop: 18, color: 'var(--ink-3)', maxWidth: '38ch' }}>
              No formal pitch needed — just tell us where you are and what you’re thinking. The last question is the one we love most.
            </p>
            <p className="mono" style={{ marginTop: 24, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
              We read every one · we’ll write back either way
            </p>
          </div>

          {submitted ? (
            <div style={{ border: '1px solid var(--line-strong)', borderRadius: 10, padding: 'clamp(32px, 5vw, 56px)', background: 'var(--bg)', textAlign: 'left' }}>
              <div className="serif" style={{ fontSize: 30 }}>Thanks — got it.</div>
              <p className="body-lg" style={{ marginTop: 12, color: 'var(--ink-3)', maxWidth: '34ch' }}>
                We’ll have a proper read and get back to you to see if there’s something fun here for both of us.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 20, marginBottom: 20 }}>
                <div><label style={label}>Your name *</label><input style={field} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Who you are" /></div>
                <div><label style={label}>The place / brand *</label><input style={field} value={form.place} onChange={(e) => update('place', e.target.value)} placeholder="What it’s called" /></div>
              </div>
              <div style={{ ...row }}>
                <label style={label}>What kind of thing is it</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Stay', 'Event', 'Brand', 'Something else'].map((h) => {
                    const on = form.hostType === h;
                    return (
                      <button type="button" key={h} onClick={() => update('hostType', h)} style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '9px 16px', borderRadius: 999, cursor: 'pointer', border: `1px solid ${on ? 'var(--accent)' : 'var(--line-strong)'}`, background: on ? 'var(--accent)' : 'transparent', color: on ? '#fff' : 'var(--ink-3)', transition: 'all 0.15s' }}>{h}</button>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 20, marginBottom: 20 }}>
                <div><label style={label}>Where is it *</label><input style={field} value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="City / where it is" /></div>
                <div><label style={label}>Rough timing</label><input style={field} value={form.dates} onChange={(e) => update('dates', e.target.value)} placeholder="A month or window that suits you" /></div>
              </div>
              <div style={row}><label style={label}>What you could offer</label><input style={field} value={form.offering} onChange={(e) => update('offering', e.target.value)} placeholder="Stay, meals, travel, access — or equity/rev-share for brands" /></div>
              <div style={row}><label style={label}>What you’d love built (roughly)</label><textarea style={{ ...field, minHeight: 92, resize: 'vertical' }} value={form.build} onChange={(e) => update('build', e.target.value)} placeholder="A site, ticketing, a menu, a booking flow… or just a problem you have" /></div>
              <div style={row}><label style={label}>Links</label><input style={field} value={form.links} onChange={(e) => update('links', e.target.value)} placeholder="Instagram, current site, anything" /></div>
              <div style={row}><label style={label}>Why here? What makes it interesting? *</label><textarea style={{ ...field, minHeight: 110, resize: 'vertical' }} value={form.why} onChange={(e) => update('why', e.target.value)} placeholder="The bit we care about most — what’s the story of the place?" /></div>
              <button type="submit" className="btn btn-primary" disabled={!canSubmit || loading} style={{ opacity: !canSubmit || loading ? 0.5 : 1, cursor: !canSubmit || loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Sending…' : <>Send it over <span className="arr">→</span></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── A few notes ────────────────────────────────────────────────────────── */
function FinePrint() {
  const lines = [
    'Think about ten working days of studio time — if it grows, that’s a normal paid conversation.',
    'We keep it light: a round of revisions, and we shape the scope together before we travel.',
    'We keep the content we shoot, and you get full use of all of it.',
    'For brands, we write down any equity or revenue-share before we start — keeps it clean for everyone.',
  ];
  return (
    <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(24px, 3vw, 36px)' }}><Eyebrow index="09">A few practical notes</Eyebrow></div>
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
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <SEO
        title="Crestify Residency — we build for a host, and they host us"
        description="A Crestify programme: we team up with interesting places and people — a café, homestay, hostel, event or early brand — build what they need in around ten days, and shoot the story. You host us, we bring the studio. Roughly one at a time."
        canonical="/interesting"
        keywords="Crestify Residency, build in residence, studio on location, collaboration, hospitality website build, event ticketing build"
      />
      <Nav />
      <Hero />
      <MarqueeBand />
      <Trade />
      <Numbers />
      <Sec index="01" tag="What this is">
        <h2 className="h2" style={{ maxWidth: '24ch' }}>One host at a time. We build, we shoot, and we do it for the experience as much as anything.</h2>
        <p className="body-lg" style={{ marginTop: 20, maxWidth: '54ch', color: 'var(--ink-3)' }}>
          Honestly? We want to work from places we wouldn’t otherwise get to, meet people doing interesting things, and get better at telling stories on camera. So instead of another safe deliverable for a big client, we’d rather build something real for a small place — and see where it goes.
        </p>
        <p className="body-lg" style={{ marginTop: 18, maxWidth: '54ch', color: 'var(--ink-3)' }}>
          It’s a trade, not free work, and it sits alongside the studio rather than under it. Both sides are experimenting a little — that’s the fun of it.
        </p>
      </Sec>
      <Tracks />
      <Fits />
      <Proof />
      <Need />
      <Fit />
      <Calendar />
      <Apply />
      <FinePrint />
      <Footer />
    </div>
  );
}
