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

/* A warm note on fit — not a rulebook. */
const FIT = [
  'A place or a brand with a story in it — something worth building and worth filming.',
  'Work that fits in a week or two, not months.',
  'People who are up for experimenting alongside us, not handing over a spec.',
  'Somewhere we’d genuinely love to spend a little time.',
];

/* Roughly one at a time, through the year. Edit status: 'open' | 'taken' | 'live'. */
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
          We go somewhere, build what they need, and instead of an invoice — they <span className="italic" style={{ color: 'var(--accent)' }}>host us.</span>
        </h1>
        <p className="body-lg" style={{ marginTop: 26, maxWidth: '48ch', color: 'var(--ink-5)' }}>
          We’re looking for interesting places and people to work with — a café, a homestay, a new hostel, an event, an early brand. We come down, build something real together — a site, a menu, a ticketing flow — and shoot the story while we’re at it. You host us, we bring the studio.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginTop: 38 }}>
          <a href="#apply" className="btn btn-accent">Tell us about your place <span className="arr">→</span></a>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
            Roughly one at a time · around ten days
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── Numbers strip ──────────────────────────────────────────────────────── */
function Numbers() {
  const items = [
    ['1', 'host at a time'],
    ['~10', 'days of studio time'],
    ['3', 'nights or so, for stays'],
    ['12', 'or so a year'],
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
      <h2 className="h2" style={{ maxWidth: '22ch' }}>Three kinds of collaboration. Each one trades a little differently.</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 16, marginTop: 'clamp(32px, 4vw, 48px)' }}>
        {TRACKS.map((t, i) => (
          <div key={t.key} className="reveal lift" style={{ border: '1px solid var(--line-strong)', borderRadius: 8, padding: 'clamp(24px, 3vw, 34px)', background: 'var(--bg-elev)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span className="serif" style={{ fontSize: 26 }}>{t.key}</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)' }}>0{i + 1}</span>
            </div>
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
        {FITS.map((f) => (
          <li key={f} className="reveal" style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
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

/* ─── Proof ──────────────────────────────────────────────────────────────── */
function Proof() {
  return (
    <Sec index="04" tag="A bit of our work">
      <h2 className="h2" style={{ maxWidth: '20ch' }}>So you know we can actually build. Some of what we’ve shipped:</h2>
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
    <section className="section-pad-sm" style={{ background: 'var(--bg-deep)', color: 'var(--bg)' }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}><Eyebrow index="06" light>What makes a good fit</Eyebrow></div>
        <h2 className="h2" style={{ maxWidth: '18ch' }}>The kind of thing we get excited about.</h2>
        <ul style={{ listStyle: 'none', marginTop: 'clamp(28px, 4vw, 40px)', maxWidth: '50ch' }}>
          {FIT.map((n) => (
            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '16px 0', borderBottom: '1px solid #ffffff1a' }}>
              <span className="mono" style={{ color: 'var(--accent)', fontSize: 14 }}>+</span>
              <span className="body-lg" style={{ color: 'var(--bg)' }}>{n}</span>
            </li>
          ))}
        </ul>
        <p className="body-lg" style={{ marginTop: 24, color: 'var(--ink-5)', maxWidth: '46ch' }}>
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
      <SEO
        title="Crestify Residency — we build for a host, and they host us"
        description="A Crestify programme: we team up with interesting places and people — a café, homestay, hostel, event or early brand — build what they need in around ten days, and shoot the story. You host us, we bring the studio. Roughly one at a time."
        canonical="/residency"
        keywords="Crestify Residency, build in residence, studio on location, collaboration, hospitality website build, event ticketing build"
      />
      <Nav />
      <Hero />
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
