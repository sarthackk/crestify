import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/shared/SEO.jsx';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import { useReveal } from '../components/shared/useReveal.js';
import { TOOLS, CATEGORIES, PRICING_COLORS, STATUS_LABELS } from '../data/directory.js';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw9sYMSCxNAVzLqS8MxAhEqQchcZ349WIl1GukDyymNDUfHE3I0RUaHhBf1IVZsNtdc/exec';

const SUBMIT_CATEGORIES = ['AI', 'Productivity', 'Marketing', 'Dev Tools', 'Analytics', 'Design', 'Finance', 'HR & Hiring', 'Other'];
const PRICING_OPTIONS   = ['Free', 'Freemium', 'Paid'];

/* ─── Tool Card ─────────────────────────────────────────────────────────── */
function ToolCard({ tool }) {
  const status  = STATUS_LABELS[tool.status]  || STATUS_LABELS.live;
  const pricing = PRICING_COLORS[tool.pricing] || PRICING_COLORS.Freemium;

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="lift"
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <article style={{
        border: '1px solid var(--line-strong)',
        borderRadius: 6,
        background: 'var(--bg)',
        padding: 'clamp(20px, 2.5vw, 28px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Featured accent line */}
        {tool.featured && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--accent)' }} />
        )}

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          {/* Logo placeholder */}
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'var(--bg-deep)',
            border: '1px solid var(--line-strong)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span className="serif italic" style={{ fontSize: 20, color: 'var(--ink-3)' }}>
              {tool.name.charAt(0)}
            </span>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <span className="mono" style={{
              fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em',
              padding: '3px 8px', borderRadius: 999,
              background: pricing.bg, color: pricing.color, border: `1px solid ${pricing.border}`,
            }}>{tool.pricing}</span>
            <span className="mono" style={{
              fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em',
              padding: '3px 8px', borderRadius: 999,
              background: 'var(--bg-elev)', color: status.color,
              border: '1px solid var(--line-strong)',
            }}>● {status.label}</span>
          </div>
        </div>

        {/* Name + tagline */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <h3 className="serif" style={{ fontSize: 'clamp(18px, 2vw, 22px)', letterSpacing: '-0.01em' }}>{tool.name}</h3>
            <span className="mono" style={{
              fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em',
              background: 'var(--bg-elev)', color: 'var(--accent)',
              padding: '2px 7px', borderRadius: 999,
              border: '1px solid var(--line-strong)',
            }}>{tool.category}</span>
          </div>
          <p className="body" style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>
            {tool.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="body" style={{
          fontSize: 13.5, color: 'var(--ink-4)', lineHeight: 1.65, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {tool.description}
        </p>

        {/* Footer */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 14, borderTop: '1px solid var(--line)',
        }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            by {tool.founder}
          </span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Visit ↗
          </span>
        </div>
      </article>
    </a>
  );
}

/* ─── Submit Form ────────────────────────────────────────────────────────── */
function SubmitForm() {
  const [form, setForm] = useState({
    toolName: '', founderName: '', email: '', url: '',
    category: '', pricing: '', tagline: '', description: '', twitter: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const canSubmit = form.toolName && form.founderName && form.email && form.url && form.tagline;

  const fieldStyle = {
    width: '100%', padding: '14px 0',
    border: 'none', borderBottom: '1px solid var(--line-strong)',
    background: 'transparent',
    fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)',
    outline: 'none', transition: 'border-color 0.2s',
  };
  const labelStyle = {
    fontFamily: 'var(--mono)', fontSize: 10,
    color: 'var(--ink-4)', textTransform: 'uppercase',
    letterSpacing: '0.14em', display: 'block', marginBottom: 2,
  };
  const pillBase = {
    fontFamily: 'var(--mono)', fontSize: 10, padding: '7px 13px',
    borderRadius: 999, cursor: 'pointer', textTransform: 'uppercase',
    letterSpacing: '0.1em', transition: 'all 0.15s', background: 'transparent',
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      await fetch(SHEET_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'Directory Listing' }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{
        padding: 'clamp(32px, 5vw, 52px)',
        border: '1px solid var(--line-strong)',
        borderRadius: 6, background: 'var(--bg-elev)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 36, marginBottom: 20 }}>✦</div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>
          Submission received
        </div>
        <h3 className="serif italic" style={{ fontSize: 'clamp(22px, 3vw, 32px)', marginBottom: 14 }}>
          We'll review <em>{form.toolName}</em> and get back to you.
        </h3>
        <p className="body" style={{ color: 'var(--ink-3)', fontSize: 15, maxWidth: '40ch', margin: '0 auto 28px' }}>
          We review every submission manually. If your tool is a fit for the directory, we'll list it within 48 hours and drop you an email.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ toolName: '', founderName: '', email: '', url: '', category: '', pricing: '', tagline: '', description: '', twitter: '' }); }}
          className="mono"
          style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em', background: 'transparent', border: '1px solid var(--line-strong)', padding: '10px 20px', borderRadius: 999, cursor: 'pointer' }}
        >
          Submit another tool
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Row 1: Tool name + Founder name */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <label style={labelStyle}>Tool name *</label>
          <input style={fieldStyle} value={form.toolName} onChange={e => update('toolName', e.target.value)} placeholder="e.g. Notion, Linear" required />
        </div>
        <div>
          <label style={labelStyle}>Your name *</label>
          <input style={fieldStyle} value={form.founderName} onChange={e => update('founderName', e.target.value)} placeholder="Jane Doe" required />
        </div>
      </div>

      {/* Row 2: Email + Website */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <label style={labelStyle}>Email *</label>
          <input type="email" style={fieldStyle} value={form.email} onChange={e => update('email', e.target.value)} placeholder="jane@yourtool.com" required />
        </div>
        <div>
          <label style={labelStyle}>Website URL *</label>
          <input type="url" style={fieldStyle} value={form.url} onChange={e => update('url', e.target.value)} placeholder="https://yourtool.com" required />
        </div>
      </div>

      {/* Row 3: Twitter (optional) */}
      <div style={{ maxWidth: '50%' }}>
        <label style={labelStyle}>Twitter / X handle <span style={{ letterSpacing: 0, textTransform: 'none', color: 'var(--ink-4)', opacity: 0.6 }}>(optional)</span></label>
        <input style={fieldStyle} value={form.twitter} onChange={e => update('twitter', e.target.value)} placeholder="@yourtool" />
      </div>

      {/* Category */}
      <div>
        <label style={labelStyle}>Category</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {SUBMIT_CATEGORIES.map(c => (
            <button key={c} type="button" onClick={() => update('category', c === form.category ? '' : c)}
              style={{
                ...pillBase,
                border: `1px solid ${form.category === c ? 'var(--accent)' : 'var(--line-strong)'}`,
                background: form.category === c ? 'rgba(255,77,31,0.08)' : 'transparent',
                color: form.category === c ? 'var(--accent)' : 'var(--ink-3)',
              }}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div>
        <label style={labelStyle}>Pricing model</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          {PRICING_OPTIONS.map(p => (
            <button key={p} type="button" onClick={() => update('pricing', p === form.pricing ? '' : p)}
              style={{
                ...pillBase,
                border: `1px solid ${form.pricing === p ? 'var(--accent)' : 'var(--line-strong)'}`,
                background: form.pricing === p ? 'rgba(255,77,31,0.08)' : 'transparent',
                color: form.pricing === p ? 'var(--accent)' : 'var(--ink-3)',
              }}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <div>
        <label style={labelStyle}>One-line tagline *</label>
        <input style={fieldStyle} value={form.tagline} onChange={e => update('tagline', e.target.value)} placeholder="What your tool does in one sentence" required />
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>
          Description
          <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--ink-4)', opacity: 0.6, marginLeft: 8 }}>· who it's for and what makes it different</span>
        </label>
        <textarea rows={4}
          style={{ ...fieldStyle, resize: 'none', marginTop: 8, lineHeight: 1.65 }}
          value={form.description}
          onChange={e => update('description', e.target.value)}
          placeholder="Give us 2–3 sentences. Who is this for? What problem does it solve? What makes it different?"
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={loading || !canSubmit}
          className="btn btn-accent"
          style={{
            fontSize: 15, padding: '16px 28px',
            opacity: canSubmit && !loading ? 1 : 0.45,
            cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
            transition: 'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { if (canSubmit && !loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
        >
          {loading ? 'Submitting…' : 'Submit your tool →'}
        </button>
        <p className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 14 }}>
          Free to list · reviewed within 48h · no spam
        </p>
      </div>

    </form>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Directory() {
  useReveal();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? TOOLS
    : TOOLS.filter(t => t.category === activeCategory);

  return (
    <div className="page">
      <SEO
        title="SaaS Directory — Discover & List Independent SaaS Tools"
        description="A curated directory of indie SaaS tools built by founders. Browse by category or submit your own tool to get listed for free."
        canonical="/directory"
        keywords="SaaS directory, indie SaaS tools, SaaS listing, founder tools, software directory"
      />
      <Nav />

      {/* ── Hero ── */}
      <section style={{ paddingTop: 64, paddingBottom: 'clamp(40px, 6vw, 70px)' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}><Eyebrow index="01">SaaS Directory · Crestify</Eyebrow></div>
          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
            <div className="col-7">
              <h1 className="display" style={{ maxWidth: '16ch' }}>
                Tools built by <span className="italic" style={{ color: 'var(--ink-3)' }}>founders,</span>
                <br />for founders.
              </h1>
              <p className="body-lg" style={{ marginTop: 24, maxWidth: '48ch' }}>
                A curated directory of independent SaaS products. No VC-bloated platforms — just real tools built by people who ship. Browse freely, or get your own listed.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
                <a href="#submit" className="btn btn-accent" style={{ fontSize: 15, padding: '14px 24px' }}>
                  List your tool →
                </a>
                <a href="#directory" className="btn btn-ghost" style={{ fontSize: 15, padding: '14px 24px' }}>
                  Browse tools
                </a>
              </div>
            </div>
            <div className="col-5" style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Tools listed</div>
              <div className="serif" style={{ fontSize: 'clamp(44px, 8vw, 64px)', lineHeight: 1, marginTop: 6 }}>{TOOLS.length}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 16 }}>Free to list</div>
              <div className="serif italic" style={{ fontSize: 22, color: 'var(--accent)', marginTop: 4 }}>Always.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div id="directory" style={{ borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 'clamp(14px, 2vw, 20px) 0' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="mono"
                style={{
                  padding: '8px 14px',
                  border: '1px solid ' + (activeCategory === cat ? 'var(--ink)' : 'var(--line-strong)'),
                  background: activeCategory === cat ? 'var(--ink)' : 'transparent',
                  color: activeCategory === cat ? 'var(--bg)' : 'var(--ink-2)',
                  borderRadius: 999, fontSize: 11, textTransform: 'uppercase',
                  letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tool Grid ── */}
      <section className="section-pad">
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'clamp(60px, 8vw, 100px) 0' }}>
              <div className="serif italic" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--ink-3)', marginBottom: 16 }}>
                Nothing here yet.
              </div>
              <p className="body" style={{ color: 'var(--ink-4)', marginBottom: 28 }}>
                No tools in this category yet. Be the first to list one.
              </p>
              <a href="#submit" className="btn btn-accent" style={{ fontSize: 15, padding: '14px 24px' }}>
                List your tool →
              </a>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(16px, 2.5vw, 28px)',
            }}>
              {filtered.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Submit Section ── */}
      <section id="submit" className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 64px)', alignItems: 'end' }}>
            <div className="col-6">
              <Eyebrow>Get listed</Eyebrow>
              <h2 className="h2" style={{ marginTop: 16, fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 0.97, letterSpacing: '-0.025em' }}>
                Built something <span className="italic" style={{ color: 'var(--ink-3)' }}>worth sharing?</span>
              </h2>
            </div>
            <div className="col-6">
              <p className="body-lg" style={{ color: 'var(--ink-3)', maxWidth: '44ch', lineHeight: 1.7 }}>
                Fill in the form below. We review every submission manually — if your tool is a fit, it'll be live in the directory within 48 hours. Always free.
              </p>
              <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
                {['Free to list', 'Reviewed in 48h', 'No spam ever'].map(t => (
                  <span key={t} className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 8 }}>✦</span> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 820 }}>
            <SubmitForm />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ borderTop: '1px solid var(--line-strong)', padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'center' }}>
            <div className="col-8">
              <Eyebrow>From the studio</Eyebrow>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Need help building your SaaS?{' '}
                <span className="italic" style={{ color: 'var(--ink-3)' }}>We ship them.</span>
              </h2>
              <p className="body-lg" style={{ marginTop: 16, maxWidth: '48ch' }}>
                Crestify is the studio behind this directory. We build SaaS products, AI tools, and ecommerce systems — end to end.
              </p>
            </div>
            <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <Link to="/contact" className="btn btn-accent" style={{ fontSize: 16, padding: '18px 28px' }}>
                Brief us <span className="arr">→</span>
              </Link>
              <Link to="/work" className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>
                See our work →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
