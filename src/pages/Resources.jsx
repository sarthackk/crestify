import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/shared/SEO.jsx';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import { useReveal } from '../components/shared/useReveal.js';

/* ─── Tools data ────────────────────────────────────────────────────────── */

const TOOLS = [
  {
    n: '01', tag: 'Calculator', cats: ['ecommerce', 'calculators'],
    title: 'D2C Profit Margin Calculator',
    desc: 'Know your numbers before you scale. Enter your costs and see your real margin, break-even ROAS, and minimum price.',
    features: ['Real margin after all costs', 'Break-even ROAS', 'Minimum price recommendation', 'Margin health indicator'],
    accent: '#c8f060', darkBg: '#0a0a0f', to: '/toolkit/margin-calculator', label: 'TOOL 01',
  },
  {
    n: '02', tag: 'Allocator', cats: ['ecommerce', 'planners'],
    title: 'Ad Budget Allocator',
    desc: "Know where every rupee goes before you spend it. Pick your brand stage and get a split across ads, UGC, and retention.",
    features: ['Stage-based allocation model', 'Ads / UGC / Retention split', 'Per-channel sub-breakdown', 'Stage-specific growth advice'],
    accent: '#c8f060', darkBg: '#08080f', to: '/toolkit/budget-allocator', label: 'TOOL 02',
  },
  {
    n: '03', tag: 'Generator', cats: ['ecommerce', 'planners'],
    title: 'UGC Brief Generator',
    desc: 'Generate a ready-to-send creator brief in 2 minutes. Category-specific AIDA structure, tone guidance, and deliverables.',
    features: ['8 product category templates', 'AIDA video structure built-in', 'Discount code & platform fields', 'One-click copy to clipboard'],
    accent: '#e879f9', darkBg: '#09090e', to: '/toolkit/ugc-brief', label: 'TOOL 03',
  },
  {
    n: '04', tag: 'Calculator', cats: ['ecommerce', 'saas', 'calculators'],
    title: 'LTV Calculator',
    desc: "Know exactly what a customer is worth — and how much you can afford to spend acquiring them. With LTV:CAC health score.",
    features: ['Customer LTV from AOV + frequency', 'LTV : CAC ratio & health score', 'Max CAC at 3:1 and 5:1', 'Industry benchmark guide'],
    accent: '#c8f060', darkBg: '#08100a', to: '/toolkit/ltv-calculator', label: 'TOOL 04',
  },
  {
    n: '05', tag: 'Planner', cats: ['ecommerce', 'planners'],
    title: 'Email Flow Planner',
    desc: "Pick your brand stage — get the exact Klaviyo flows to build, timing, and what each email in the sequence should say.",
    features: ['Stage-matched flow recommendations', 'Pre-launch → Scaling coverage', 'Subject line suggestions per email', 'Timing map per flow'],
    accent: '#ec4899', darkBg: '#0f0709', to: '/toolkit/email-flow-planner', label: 'TOOL 05',
  },
  {
    n: '06', tag: 'Builder', cats: ['ecommerce', 'planners'],
    title: 'Shopify App Stack Builder',
    desc: "Tell us your store stage and goals — get a curated, stage-matched app recommendation. No bloat, no guessing.",
    features: ['3 store stages', '8 goal categories', 'Pricing info for each app', 'Why each app makes sense for you'],
    accent: '#f59e0b', darkBg: '#100d05', to: '/toolkit/app-stack-builder', label: 'TOOL 06',
  },
  {
    n: '07', tag: 'Calculator', cats: ['ecommerce', 'calculators'],
    title: 'COD & Returns Calculator',
    desc: "Your listed margin is a lie. See what you actually keep after COD fees, shipping, and returns across 100 orders.",
    features: ['Real margin after COD charges', 'Return rate impact on profit', 'Per-100-orders breakdown', 'Break-even return rate'],
    accent: '#0d9b6a', darkBg: '#05100c', to: '/toolkit/cod-calculator', label: 'TOOL 07',
  },
  {
    n: '08', tag: 'Projector', cats: ['saas', 'calculators'],
    title: 'MRR Growth Projector',
    desc: "Enter your MRR, growth rate, and churn — see where you'll be in 6, 12, or 24 months with a visual bar chart projection.",
    features: ['6 / 12 / 24 month window', 'Growth vs churn net calculation', 'Visual MRR bar chart', 'Monthly milestone breakdown'],
    accent: '#6366f1', darkBg: '#07070f', to: '/toolkit/mrr-projector', label: 'TOOL 08',
  },
];

const PLAYBOOKS = [
  {
    n: '01', tag: 'Influencer Marketing',
    title: 'The Influencer Outreach Playbook',
    subtitle: 'How to find, brief, close, and manage influencers on a small budget.',
    inside: ['Which influencer type to start with and why', 'Exact process for finding via hashtag + search', 'DM templates that get replies (barter and paid)', 'Brief format that sets expectations upfront', 'What to do when influencers ghost or post badly'],
    file: '/downloads/influencer_playbook.docx', color: '#0d9b6a', bg: '#f0faf6', pages: '18 pages',
  },
  {
    n: '02', tag: 'Paid Advertising',
    title: 'The Meta Ads Testing Framework',
    subtitle: 'How to test ads on a small budget, find what works, and scale without burning money.',
    inside: ['5-step framework from testing to scaling', 'Offer vs. positioning variations', 'Which metrics matter at the testing stage', 'When to brief UGC with winning message', 'Scaling rules — when to push and when to stop'],
    file: '/downloads/meta_ads_framework.docx', color: '#1a6fde', bg: '#f0f5ff', pages: '14 pages',
  },
  {
    n: '03', tag: 'Brand Launch',
    title: 'The New Brand Launch Blueprint',
    subtitle: 'How we take a D2C brand from zero to first sale — the exact process Kaart uses.',
    inside: ['Phase 1 — Research before a pixel is designed', 'Phase 2 — Micro branding and identity lock', 'Phase 3 — Full Figma UI, page by page', 'Phase 4 — Shopify build with right apps', 'Phase 5 & 6 — Pre-launch checklist and first sale'],
    file: '/downloads/ecommerce_launch_blueprint.docx', color: '#c47b1a', bg: '#fdf8f0', pages: '22 pages',
  },
];

const FILTERS = [
  { id: 'all',         label: 'All' },
  { id: 'ecommerce',   label: 'Ecommerce' },
  { id: 'saas',        label: 'SaaS' },
  { id: 'calculators', label: 'Calculators' },
  { id: 'planners',    label: 'Planners & Builders' },
];

/* ─── Tool Card ─────────────────────────────────────────────────────────── */

function ToolCard({ t }) {
  return (
    <Link to={t.to} className="reveal" style={{ display: 'block', textDecoration: 'none', border: '1px solid var(--line-strong)', borderRadius: 6, overflow: 'hidden', background: 'var(--bg-elev)', transition: 'border-color 0.2s, transform 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent + '66'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; }}
    >
      <div style={{ background: t.darkBg, padding: '24px 24px 20px', borderBottom: '1px solid var(--line-strong)', position: 'relative', minHeight: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: t.accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.label}</span>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 2vw, 23px)', color: '#e8e8e0', marginTop: 8, lineHeight: 1.1, maxWidth: '18ch' }}>{t.title}</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${t.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: t.accent, fontSize: 13 }}>→</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 2, background: `linear-gradient(to right, ${t.accent}, transparent)` }} />
      </div>
      <div style={{ padding: '18px 22px 22px' }}>
        <span className="mono" style={{ fontSize: 9, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.12em', background: `${t.accent}12`, padding: '3px 8px', borderRadius: 999, border: `1px solid ${t.accent}33` }}>{t.tag}</span>
        <p className="body" style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6 }}>{t.desc}</p>
        <ul style={{ listStyle: 'none', marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {t.features.map(f => (
            <li key={f} style={{ display: 'flex', gap: 7, alignItems: 'baseline' }}>
              <span style={{ color: t.accent, fontSize: 8, flexShrink: 0 }}>→</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.04em' }}>{f}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 14 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: t.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Open tool →</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Playbook Card ─────────────────────────────────────────────────────── */

function PlaybookCard({ p }) {
  return (
    <div className="reveal" style={{ border: '1px solid var(--line-strong)', borderRadius: 6, overflow: 'hidden', background: 'var(--bg-elev)' }}>
      <div style={{ background: p.bg, padding: '22px 22px 18px', borderBottom: '1px solid var(--line-strong)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="mono" style={{ fontSize: 9, color: p.color, textTransform: 'uppercase', letterSpacing: '0.15em', background: `${p.color}15`, padding: '3px 8px', borderRadius: 999 }}>{p.tag}</span>
          <span className="mono" style={{ fontSize: 9.5, color: p.color, opacity: 0.6 }}>{p.pages}</span>
        </div>
        <h3 className="serif" style={{ fontSize: 'clamp(17px, 1.8vw, 21px)', marginTop: 12, lineHeight: 1.2, maxWidth: '24ch', color: '#1a1a1a' }}>{p.title}</h3>
        <p style={{ fontSize: 12.5, color: '#555', marginTop: 7, lineHeight: 1.5, fontFamily: 'var(--sans)' }}>{p.subtitle}</p>
      </div>
      <div style={{ padding: '16px 22px 20px' }}>
        <div className="mono" style={{ fontSize: 9.5, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>What's inside</div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {p.inside.map(item => (
            <li key={item} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ color: p.color, fontSize: 9, flexShrink: 0 }}>→</span>
              <span className="body" style={{ fontSize: 13, color: 'var(--ink-2)' }}>{item}</span>
            </li>
          ))}
        </ul>
        <a href={p.file} download className="btn" style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 8, background: p.color, color: 'white', fontSize: 13, padding: '10px 18px', textDecoration: 'none', borderRadius: 4 }}>
          Download free <span style={{ fontSize: 15 }}>↓</span>
        </a>
        <span className="mono" style={{ display: 'block', fontSize: 9.5, color: 'var(--ink-4)', marginTop: 7, letterSpacing: '0.08em' }}>Free · No signup required</span>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function Resources() {
  const [filter, setFilter] = useState('all');
  useReveal();

  const visible = filter === 'all' ? TOOLS : TOOLS.filter(t => t.cats.includes(filter));

  return (
    <div className="page">
      <SEO
        title="Free Toolkit — Calculators & Playbooks for D2C & SaaS Founders"
        description="Free tools built from real client work. Margin calculators, MRR projectors, COD return calculators, Shopify app stack builders, and more — no email required."
        canonical="/toolkit"
        keywords="D2C profit margin calculator, MRR calculator, Shopify app stack, ecommerce tools free, COD returns calculator India"
      />
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: 64, paddingBottom: 'clamp(40px, 6vw, 70px)' }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}><Eyebrow index="01">Free toolkit</Eyebrow></div>
          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
            <div className="col-7">
              <h1 className="display reveal" style={{ maxWidth: '14ch' }}>
                Free tools. <span className="italic" style={{ color: 'var(--ink-3)' }}>Real work.</span>
              </h1>
            </div>
            <div className="col-5">
              <p className="body-lg reveal" style={{ maxWidth: '36ch' }}>
                Everything we use at Crestify and Kaart Studio — free, no login, no strings.
              </p>
              <div style={{ marginTop: 20, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[
                  { n: TOOLS.length, l: 'Live tools' },
                  { n: PLAYBOOKS.length, l: 'Playbooks' },
                  { n: '∞', l: 'Always free' },
                ].map(s => (
                  <div key={s.l}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.n}</div>
                    <div className="mono" style={{ fontSize: 9.5, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(24px, 3.5vw, 36px)' }}>
            <div className="col-4"><Eyebrow index="02">Interactive tools</Eyebrow></div>
            <h2 className="h2 col-8">Use in the browser. <span className="italic" style={{ color: 'var(--ink-3)' }}>No install needed.</span></h2>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'clamp(24px, 3.5vw, 40px)', paddingBottom: 'clamp(20px, 3vw, 32px)', borderBottom: '1px solid var(--line)' }}>
            {FILTERS.map(f => {
              const count = f.id === 'all' ? TOOLS.length : TOOLS.filter(t => t.cats.includes(f.id)).length;
              const active = filter === f.id;
              return (
                <button key={f.id} onClick={() => setFilter(f.id)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, border: `1px solid ${active ? 'var(--ink)' : 'var(--line-strong)'}`, background: active ? 'var(--ink)' : 'transparent', color: active ? 'var(--bg)' : 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                  {f.label}
                  <span style={{ opacity: active ? 0.6 : 0.4, fontSize: 9 }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {visible.length > 0 ? (
            <div className="grid-3" style={{ gap: 'var(--gap)' }}>
              {visible.map(t => <ToolCard key={t.n} t={t} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>More tools coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Playbooks */}
      <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(24px, 3.5vw, 40px)' }}>
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
                These tools are what we use in-house. If you want us running your store, growth, and product — talk to us.
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
