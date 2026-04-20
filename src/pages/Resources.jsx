import { Link } from 'react-router-dom';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import { useReveal } from '../components/shared/useReveal.js';

const TOOLS = [
  {
    n: '01',
    tag: 'Calculator',
    title: 'D2C Profit Margin Calculator',
    desc: 'Know your numbers before you scale. Enter your costs and see your real margin, break-even ROAS, and recommended minimum price.',
    features: ['Real margin after all costs', 'ROAS needed to break even', 'Recommended minimum price', 'Margin health indicator'],
    accent: '#c8f060',
    darkBg: '#0a0a0f',
    to: '/toolkit/margin-calculator',
    label: 'TOOL 01',
  },
  {
    n: '02',
    tag: 'Allocator',
    title: 'Ad Budget Allocator',
    desc: "Know where every rupee goes before you spend it. Pick your brand's stage and get a breakdown of how to split your budget across ads, UGC, and retention.",
    features: ['Stage-based allocation model', 'Ads / UGC / Retention split', 'Per-channel sub-breakdown', 'Stage-specific growth advice'],
    accent: '#c8f060',
    darkBg: '#08080f',
    to: '/toolkit/budget-allocator',
    label: 'TOOL 02',
  },
  {
    n: '03',
    tag: 'Generator',
    title: 'UGC Brief Generator',
    desc: 'Generate a ready-to-send creator brief in 2 minutes. Category-specific AIDA structure, tone guidance, and deliverables — copy and send.',
    features: ['8 product category templates', 'AIDA video structure built-in', 'Discount code & platform fields', 'One-click copy to clipboard'],
    accent: '#e879f9',
    darkBg: '#09090e',
    to: '/toolkit/ugc-brief',
    label: 'TOOL 03',
  },
];

const PLAYBOOKS = [
  {
    n: '04',
    tag: 'Influencer Marketing',
    title: 'The Influencer Outreach Playbook',
    subtitle: 'How to find, brief, close, and manage influencers on a small budget.',
    inside: ['Which influencer type to start with and why', 'Exact process for finding via hashtag + search', 'DM templates that get replies (barter and paid)', 'Brief format that sets expectations upfront', 'What to do when influencers ghost or post badly'],
    file: '/downloads/influencer_playbook.docx',
    color: '#0d9b6a',
    bg: '#f0faf6',
    pages: '18 pages',
  },
  {
    n: '05',
    tag: 'Paid Advertising',
    title: 'The Meta Ads Testing Framework',
    subtitle: 'How to test ads on a small budget, find what works, and scale without burning money.',
    inside: ['5-step framework from testing budget to scaling', 'Offer vs. positioning variations that reveal signals', 'Which metrics matter at the testing stage', 'When and how to brief UGC with winning message', 'Scaling rules — when to push and when to stop'],
    file: '/downloads/meta_ads_framework.docx',
    color: '#1a6fde',
    bg: '#f0f5ff',
    pages: '14 pages',
  },
  {
    n: '06',
    tag: 'Brand Launch',
    title: 'The New Brand Launch Blueprint',
    subtitle: 'How we take a D2C brand from zero to first sale — the exact process Kaart uses.',
    inside: ['Phase 1 — Research before a pixel is designed', 'Phase 2 — Micro branding and identity lock', 'Phase 3 — Full Figma UI, page by page', 'Phase 4 — Shopify build with right apps', 'Phase 5 & 6 — Pre-launch checklist and first sale'],
    file: '/downloads/ecommerce_launch_blueprint.docx',
    color: '#c47b1a',
    bg: '#fdf8f0',
    pages: '22 pages',
  },
];

function ToolCard({ t }) {
  return (
    <Link to={t.to} className="reveal" style={{ display: 'block', textDecoration: 'none', border: '1px solid var(--line-strong)', borderRadius: 6, overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s', background: 'var(--bg-elev)' }}>
      {/* Dark preview strip */}
      <div style={{ background: t.darkBg, padding: '28px 28px 24px', borderBottom: '1px solid var(--line-strong)', position: 'relative', minHeight: 110 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.label}</span>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.2vw, 26px)', color: '#e8e8e0', marginTop: 8, lineHeight: 1.1, maxWidth: '18ch' }}>{t.title}</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${t.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: t.accent, fontSize: 14 }}>→</span>
          </div>
        </div>
        {/* Accent line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 2, background: `linear-gradient(to right, ${t.accent}, transparent)` }} />
      </div>

      {/* Info strip */}
      <div style={{ padding: '20px 28px 24px' }}>
        <span className="mono" style={{ fontSize: 10, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.12em', background: `${t.accent}12`, padding: '3px 8px', borderRadius: 999, border: `1px solid ${t.accent}33` }}>{t.tag}</span>
        <p className="body" style={{ marginTop: 12, fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>{t.desc}</p>
        <ul style={{ listStyle: 'none', marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {t.features.map(f => (
            <li key={f} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ color: t.accent, fontSize: 9, flexShrink: 0 }}>→</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.04em' }}>{f}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: t.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Open tool →</span>
        </div>
      </div>
    </Link>
  );
}

function PlaybookCard({ p }) {
  return (
    <div className="reveal" style={{ border: '1px solid var(--line-strong)', borderRadius: 6, overflow: 'hidden', background: 'var(--bg-elev)' }}>
      <div style={{ background: p.bg, padding: '24px 24px 20px', borderBottom: '1px solid var(--line-strong)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="mono" style={{ fontSize: 9, color: p.color, textTransform: 'uppercase', letterSpacing: '0.15em', background: `${p.color}15`, padding: '3px 8px', borderRadius: 999 }}>{p.tag}</span>
          <span className="mono" style={{ fontSize: 10, color: p.color, opacity: 0.6 }}>{p.pages}</span>
        </div>
        <h3 className="serif" style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', marginTop: 14, lineHeight: 1.2, maxWidth: '24ch', color: '#1a1a1a' }}>{p.title}</h3>
        <p style={{ fontSize: 13, color: '#555', marginTop: 8, lineHeight: 1.5, fontFamily: 'var(--sans)' }}>{p.subtitle}</p>
      </div>

      <div style={{ padding: '18px 24px 22px' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>What's inside</div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {p.inside.map(item => (
            <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ color: p.color, fontSize: 9, flexShrink: 0 }}>→</span>
              <span className="body" style={{ fontSize: 13, color: 'var(--ink-2)' }}>{item}</span>
            </li>
          ))}
        </ul>
        <a href={p.file} download className="btn" style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, background: p.color, color: 'white', fontSize: 13, padding: '11px 20px', textDecoration: 'none', borderRadius: 4 }}>
          Download free <span style={{ fontSize: 16 }}>↓</span>
        </a>
        <span className="mono" style={{ display: 'block', fontSize: 10, color: 'var(--ink-4)', marginTop: 8, letterSpacing: '0.08em' }}>Free · No signup required</span>
      </div>
    </div>
  );
}

export default function Resources() {
  useReveal();
  return (
    <div className="page">
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: 64, paddingBottom: 'clamp(40px, 6vw, 70px)' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}><Eyebrow index="01">Free toolkit</Eyebrow></div>
          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
            <div className="col-7">
              <h1 className="display reveal" style={{ maxWidth: '18ch' }}>
                Tools and playbooks built from{' '}
                <span className="italic" style={{ color: 'var(--ink-3)' }}>real e-commerce work.</span>
              </h1>
            </div>
            <div className="col-5">
              <p className="body-lg reveal" style={{ maxWidth: '36ch' }}>
                Interactive tools and downloadable playbooks — everything we use at Kaart Studio, free for D2C founders.
              </p>
              <div style={{ marginTop: 20, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {['3 tools', '3 playbooks', 'Free · No signup'].map(t => (
                  <span key={t} className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
            <div className="col-4"><Eyebrow index="02">Interactive tools</Eyebrow></div>
            <h2 className="h2 col-8">Use in the browser. <span className="italic" style={{ color: 'var(--ink-3)' }}>No install needed.</span></h2>
          </div>
          <div className="grid-3" style={{ gap: 'var(--gap)' }}>
            {TOOLS.map(t => <ToolCard key={t.n} t={t} />)}
          </div>
        </div>
      </section>

      {/* Playbooks */}
      <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
            <div className="col-4"><Eyebrow index="03">Free playbooks</Eyebrow></div>
            <h2 className="h2 col-8">Download and keep. <span className="italic" style={{ color: 'var(--ink-3)' }}>No email required.</span></h2>
          </div>
          <div className="grid-3" style={{ gap: 'var(--gap)' }}>
            {PLAYBOOKS.map(p => <PlaybookCard key={p.n} p={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(70px, 10vw, 120px) 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--accent)' }} />
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'center' }}>
            <div className="col-7">
              <Eyebrow light>Want us to do this for you?</Eyebrow>
              <h2 className="display" style={{ color: 'var(--bg)', marginTop: 18, fontSize: 'clamp(40px, 6vw, 96px)', maxWidth: '18ch', lineHeight: 1.02 }}>
                We don't just write the playbook.{' '}
                <span className="italic" style={{ color: 'var(--accent)' }}>We run it.</span>
              </h2>
            </div>
            <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
              <p className="body" style={{ color: '#9c9b95', maxWidth: '34ch' }}>
                These tools are what we use in-house. If you want Kaart Studio running your store, growth, and content — talk to us.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                <Link to="/kaart#contact" className="btn" style={{ background: '#0d9b6a', color: 'white', fontSize: 15, padding: '14px 22px', textDecoration: 'none' }}>Work with Kaart ↗</Link>
                <Link to="/contact" className="btn btn-ghost" style={{ color: '#9c9b95', fontSize: 15, padding: '14px 22px' }}>Crestify projects</Link>
              </div>
              <a href="mailto:contact@crestify.co" className="mono" style={{ color: '#9c9b95', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>contact@crestify.co</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
