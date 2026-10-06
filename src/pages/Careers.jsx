import { useState } from 'react';
import SEO from '../components/shared/SEO.jsx';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import { useReveal } from '../components/shared/useReveal.js';

/* Same sheet the contact form lands in — submissions we actually check. */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw9sYMSCxNAVzLqS8MxAhEqQchcZ349WIl1GukDyymNDUfHE3I0RUaHhBf1IVZsNtdc/exec';

/* ─── Open roles (edit here) ─────────────────────────────────────────────── */
const ROLES = [
  {
    id: 'video-editor-graphics',
    title: 'Video Editor & Graphics',
    type: 'Full-time',
    location: 'Kanpur / Remote',
    pay: '₹20,000 / month',
    blurb: 'We make a lot of content — reels, social, brand films, ads. We need someone who can own the edit and the look, end to end.',
    does: [
      'Edit reels and short-form video for our brands and our own products',
      'Research content — trends, references, hooks and formats worth making',
      'Create graphics — social posts, thumbnails, simple brand assets',
      'Turn raw shoots into finished, scroll-stopping content',
      'Keep a steady output across a content calendar',
    ],
    looking: [
      'A strong reel/portfolio — show us what you’ve edited',
      'Fluency in editing tools (Premiere / After Effects / CapCut) and basic graphics (Photoshop / Illustrator / Canva)',
      'A feel for what performs on Instagram and short-form',
      'Self-driven — you research and bring ideas, not just execute briefs',
      'Reliable, consistent, and quick to turn things around',
    ],
  },
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
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', paddingTop: 'clamp(72px, 12vw, 140px)', paddingBottom: 'clamp(52px, 8vw, 104px)' }}>
      <div className="container">
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>Careers at Crestify</span>
        <h1 className="display" style={{ marginTop: 22, maxWidth: '16ch' }}>
          Come build — and <span className="italic" style={{ color: 'var(--accent)' }}>ship</span> — with us.
        </h1>
        <p className="body-lg" style={{ marginTop: 24, maxWidth: '46ch', color: 'var(--ink-5)' }}>
          We’re a small, founder-led studio that moves fast and ships real work for real brands. If you like ownership over hand-holding, you’ll fit right in. Here’s what we’re hiring for right now.
        </p>
        <div style={{ marginTop: 34 }}>
          <a href="#roles" className="btn btn-accent">See open roles <span className="arr">↓</span></a>
        </div>
      </div>
    </section>
  );
}

/* ─── Role card ──────────────────────────────────────────────────────────── */
function Role({ r }) {
  return (
    <article style={{ border: '1px solid var(--line-strong)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-elev)' }}>
      <div style={{ padding: 'clamp(24px, 4vw, 40px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 999, padding: '5px 12px' }}>{r.type}</span>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', border: '1px solid var(--line-strong)', borderRadius: 999, padding: '5px 12px' }}>{r.location}</span>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', border: '1px solid var(--line-strong)', borderRadius: 999, padding: '5px 12px' }}>{r.pay}</span>
        </div>
        <h2 className="h2" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1 }}>{r.title}</h2>
        <p className="body-lg" style={{ marginTop: 14, color: 'var(--ink-3)', maxWidth: '58ch' }}>{r.blurb}</p>
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ padding: 'clamp(22px, 3vw, 34px)', borderRight: '1px solid var(--line)' }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>What you’ll do</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {r.does.map(d => (
              <li key={d} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span className="mono" style={{ color: 'var(--accent)', fontSize: 12, lineHeight: 1.5 }}>+</span>
                <span className="body" style={{ color: 'var(--ink-2)' }}>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ padding: 'clamp(22px, 3vw, 34px)' }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 16 }}>What we’re looking for</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {r.looking.map(d => (
              <li key={d} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span className="mono" style={{ color: 'var(--ink-4)', fontSize: 12, lineHeight: 1.5 }}>→</span>
                <span className="body" style={{ color: 'var(--ink-2)' }}>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ padding: 'clamp(20px, 3vw, 28px) clamp(24px, 4vw, 40px)', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <span className="body" style={{ color: 'var(--ink-3)', fontSize: 13 }}>Sound like you? Apply below — bring your reel.</span>
        <a href="#apply" className="btn btn-primary">Apply for this role <span className="arr">↓</span></a>
      </div>
    </article>
  );
}

/* ─── Application form ───────────────────────────────────────────────────── */
function Apply() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: ROLES[0].title, portfolio: '', experience: '', note: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canSubmit = form.name && form.email && form.portfolio;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    try {
      await fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, source: 'Careers Application' }) });
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
        <div style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}><Eyebrow index="02">Apply</Eyebrow></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'start' }}>
          <div>
            <h2 className="h2" style={{ maxWidth: '14ch' }}>Send us your work.</h2>
            <p className="body-lg" style={{ marginTop: 18, color: 'var(--ink-3)', maxWidth: '38ch' }}>
              The reel matters more than the résumé. Drop a link to your best edits and a line about you — we read every application and reply.
            </p>
            <p className="mono" style={{ marginTop: 24, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
              Or email us · contact@crestify.co
            </p>
          </div>

          {submitted ? (
            <div style={{ border: '1px solid var(--line-strong)', borderRadius: 10, padding: 'clamp(32px, 5vw, 56px)', background: 'var(--bg)', textAlign: 'left' }}>
              <div className="serif" style={{ fontSize: 30 }}>Thanks — got it.</div>
              <p className="body-lg" style={{ marginTop: 12, color: 'var(--ink-3)', maxWidth: '34ch' }}>
                We’ll have a look at your work and get back to you if it’s a fit. Good luck!
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 20, marginBottom: 20 }}>
                <div><label style={label}>Your name *</label><input style={field} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Full name" /></div>
                <div><label style={label}>Email *</label><input style={field} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@email.com" /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 20, marginBottom: 20 }}>
                <div><label style={label}>Phone / WhatsApp</label><input style={field} value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91…" /></div>
                <div>
                  <label style={label}>Role</label>
                  <select style={field} value={form.role} onChange={(e) => update('role', e.target.value)}>
                    {ROLES.map(r => <option key={r.id} value={r.title}>{r.title}</option>)}
                  </select>
                </div>
              </div>
              <div style={row}><label style={label}>Portfolio / reel link *</label><input style={field} value={form.portfolio} onChange={(e) => update('portfolio', e.target.value)} placeholder="Drive, Instagram, YouTube, Behance…" /></div>
              <div style={row}><label style={label}>Experience</label><input style={field} value={form.experience} onChange={(e) => update('experience', e.target.value)} placeholder="e.g. 2 years editing reels, freelance, in-house…" /></div>
              <div style={row}><label style={label}>A line about you</label><textarea style={{ ...field, minHeight: 100, resize: 'vertical' }} value={form.note} onChange={(e) => update('note', e.target.value)} placeholder="What you love editing, tools you use, anything you want us to know." /></div>
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

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Careers() {
  useReveal();
  return (
    <div className="page">
      <SEO
        title="Careers — join Crestify"
        description="We're hiring at Crestify. Current opening: a full-time Video Editor & Graphics person to edit reels, research content and create graphics. ₹20,000/month, Kanpur or remote. Apply with your reel."
        canonical="/careers"
        keywords="Crestify careers, video editor job, reels editor, graphics designer job Kanpur, content creator job"
      />
      <Nav />
      <Hero />
      <Sec index="01" tag="Open roles" style={{ borderTop: 'none' }}>
        <div id="roles" style={{ scrollMarginTop: 80 }}>
          <h2 className="h2" style={{ maxWidth: '18ch', marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            One opening, <span className="italic" style={{ color: 'var(--ink-3)' }}>right now.</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {ROLES.map(r => <Role key={r.id} r={r} />)}
          </div>
        </div>
      </Sec>
      <Apply />
      <Footer />
    </div>
  );
}
