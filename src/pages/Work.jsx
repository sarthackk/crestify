import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import Placeholder from '../components/shared/Placeholder.jsx';
import { useReveal } from '../components/shared/useReveal.js';

export const CASE_STUDIES = [
  {
    slug: 'prepnest',
    n: '01', client: 'Prepnest', sector: 'Career Tech', year: '2024',
    headline: 'Built the hiring OS for colleges, students, mentors, and HR — in one platform.',
    summary: 'End-to-end commercial placement platform with four separate portals, AI resume scoring, mentor scheduling, and direct employer connections. Now live across multiple colleges and recruiting teams.',
    metrics: [{ k: '4', v: 'User portals' }, { k: 'AI', v: 'Resume screening' }, { k: 'Live', v: 'Commercial deploy' }],
    tag: 'Full Stack · AI', size: 'large',
  },
  {
    slug: 'pms-asset-builder',
    n: '02', client: 'PMS Asset Builder', sector: 'Maritime · Enterprise', year: '2024',
    headline: 'Turned thousands of ship manuals into a searchable, AI-classified library.',
    summary: 'Enterprise internal tool for The Cadet Labs: OCR pipeline ingests heavy documentation, AI classifies by vessel and equipment type. What took hours now takes seconds across MV Atlas, ZX Shipping, Blue Ocean, and Neptune Cargo.',
    metrics: [{ k: 'OCR', v: 'Doc ingestion' }, { k: 'AI', v: 'Classification' }, { k: '4+', v: 'Ship projects' }],
    tag: 'Enterprise AI', size: 'medium', dark: true,
  },
  {
    slug: 'match-trackers',
    n: '03', client: 'Match Trackers', sector: 'Sports Tech', year: '2023',
    headline: '100k+ users. Live scores, deep stats, and ODDS — built to survive tournament traffic.',
    summary: 'MERN stack sports platform for cricket and football. Custom real-time data pipelines, league navigation, player rankings, point tables, and upcoming fixtures. Held up through Asia Cup coverage without breaking.',
    metrics: [{ k: '100k+', v: 'Active users' }, { k: 'Live', v: 'Score pipelines' }, { k: 'Asia Cup', v: 'Traffic handled' }],
    tag: 'MERN · Real-time', size: 'medium',
  },
  {
    slug: 'equip-rentals',
    n: '04', client: 'Equip Rentals', sector: 'Construction Tech', year: '2024',
    headline: 'Took construction equipment rental from phone calls to a live booking app.',
    summary: 'Hybrid iOS + Android app with dual portals. Workers search by equipment type and location, book with delivery slots, track orders. Vendors list their fleet, manage requests, and track active rentals. Real vendors onboarded.',
    metrics: [{ k: 'iOS+Android', v: 'Hybrid app' }, { k: '2', v: 'Portal types' }, { k: 'Live', v: 'Vendors onboarded' }],
    tag: 'React Native', size: 'medium',
  },
  {
    slug: 'quickhunt',
    n: '05', client: 'Quickhunt', sector: 'SaaS · Product Design', year: '2023',
    headline: 'Redesigned a complex SaaS product so visitors finally understood — and converted.',
    summary: 'Full redesign of Quickhunt\'s website and webapp UI. Simplified feedback collection, roadmap management, and changelog broadcasting into clear conversion flows. Significantly improved trial signup rate.',
    metrics: [{ k: '↑', v: 'Trial signups' }, { k: 'Full', v: 'UI redesign' }, { k: 'Figma', v: 'Design system' }],
    tag: 'Product Design', size: 'medium', dark: true,
  },
  {
    slug: 'mockzy',
    n: '06', client: 'Mockzy', sector: 'AI Product · In-house', year: '2025',
    headline: 'A smartphone photo in. Photorealistic ad-grade imagery out. No prompts, no designer.',
    summary: 'AI creative studio for D2C brands: upload a product photo, get professional mockups, lifestyle images, and video content. Workspace management, quick-start templates, and batch catalog generation. Live with paying users.',
    metrics: [{ k: 'Live', v: 'Paying users' }, { k: 'AI', v: 'Image pipeline' }, { k: 'Batch', v: 'Catalog gen' }],
    tag: 'AI · SaaS', size: 'large',
  },
];

function HeroWork() {
  return (
    <section style={{ paddingTop: 64, paddingBottom: 'clamp(40px, 6vw, 70px)' }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}><Eyebrow index="01">Selected work · 2023–2026</Eyebrow></div>
        <h1 className="display" style={{ maxWidth: '16ch' }}>
          Built. Shipped. <span className="italic" style={{ color: 'var(--ink-3)' }}>Still running.</span>
        </h1>
        <div className="grid" style={{ gap: 'var(--gap)', marginTop: 'clamp(40px, 5vw, 60px)' }}>
          <p className="body-lg col-7" style={{ maxWidth: '52ch' }}>
            A small portfolio on purpose. Every project below was led end-to-end by the founders, shipped to production, and is still running.
          </p>
          <div className="col-5" style={{ textAlign: 'right' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>NDA work · not shown</div>
            <div className="serif" style={{ fontSize: 'clamp(44px, 8vw, 64px)', lineHeight: 1, marginTop: 6 }}>14+</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Filters() {
  const [active, setActive] = useState('All');
  const filters = ['All', 'E-commerce', 'Software / Platform', '2025', '2024', '2023'];
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '0 var(--pad) clamp(30px, 4vw, 50px)', maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      {filters.map(f => (
        <button key={f} onClick={() => setActive(f)} className="mono" style={{ padding: '10px 16px', border: '1px solid ' + (active === f ? 'var(--ink)' : 'var(--line-strong)'), background: active === f ? 'var(--ink)' : 'transparent', color: active === f ? 'var(--bg)' : 'var(--ink-2)', borderRadius: 999, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.2s' }}>{f}</button>
      ))}
    </div>
  );
}

function CaseCard({ c }) {
  return (
    <Link
      to={`/work/${c.slug}`}
      className={`lift ${c.size === 'large' ? 'col-12' : 'col-6'}`}
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <Placeholder
        label={`${c.client.toUpperCase()} · ${c.sector}`}
        dim={c.size === 'large' ? '2400 × 1200' : '1400 × 1100'}
        ratio={c.size === 'large' ? '24 / 12' : '14 / 11'}
        dark={c.dark}
      />
      <div style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            §{c.n} · {c.year}
          </div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{c.tag}</span>
        </div>
        <h3 className="serif" style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.15, letterSpacing: '-0.012em', maxWidth: '32ch' }}>
          {c.headline}
        </h3>
        <p className="body" style={{ marginTop: 12, maxWidth: '52ch', color: 'var(--ink-3)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {c.summary}
        </p>
        <div style={{ display: 'flex', gap: 24, marginTop: 22, paddingTop: 20, borderTop: '1px solid var(--line-strong)' }}>
          {c.metrics.map(m => (
            <div key={m.v}>
              <div className="serif italic" style={{ fontSize: 24, color: 'var(--accent)', lineHeight: 1 }}>{m.k}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 5 }}>{m.v}</div>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Case study →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CaseGrid() {
  return (
    <section className="section-pad-sm">
      <Filters />
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', rowGap: 'clamp(50px, 7vw, 90px)' }}>
          {CASE_STUDIES.map((c) => <CaseCard key={c.n} c={c} />)}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: 'Crestify shipped in three months what our internal team had been arguing about for two years. They fixed the problem and they fixed the team.', who: 'Anika Lowell, CTO · Hatchwell' },
    { q: "The first agency we've hired where the founder's name on the contract is also the name in our git history.", who: 'Marcus Reid, CEO · Maris & Co.' },
  ];
  return (
    <section className="section-pad" style={{ background: 'var(--bg-deep)', color: 'var(--bg)' }}>
      <div className="container">
        <Eyebrow light>What clients say</Eyebrow>
        <div className="grid-2" style={{ gap: 'clamp(40px, 6vw, 80px)', marginTop: 40 }}>
          {quotes.map(q => (
            <blockquote key={q.who}>
              <p className="serif italic" style={{ fontSize: 'clamp(24px, 2.6vw, 36px)', lineHeight: 1.18, letterSpacing: '-0.012em' }}>"{q.q}"</p>
              <div className="mono" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 28, paddingTop: 18, borderTop: '1px solid #ffffff22' }}>{q.who}</div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTAWork() {
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(80px, 12vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
      {/* Accent strip */}
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--accent)' }} />
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
          <div className="col-8">
            <Eyebrow light>Start a project</Eyebrow>
            <h2 className="display" style={{ color: 'var(--bg)', marginTop: 18, fontSize: 'clamp(48px, 8vw, 130px)', maxWidth: '16ch', lineHeight: 1.02 }}>
              Got something <span className="italic" style={{ color: 'var(--accent)' }}>worth building?</span>
            </h2>
          </div>
          <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <p className="body" style={{ color: '#9c9b95', maxWidth: '32ch' }}>
              Tell us what you're building. We'll tell you in 48 hours if we're the right team.
            </p>
            <Link to="/contact" className="btn" style={{ background: 'var(--accent)', color: 'white', fontSize: 16, padding: '18px 28px', marginTop: 8 }}>
              Brief us <span className="arr">→</span>
            </Link>
            <a href="mailto:hello@crestify.co" className="mono" style={{ color: '#9c9b95', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              hello@crestify.co
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Work() {
  useReveal();
  return (
    <div className="page">
      <Nav />
      <HeroWork />
      <CaseGrid />
      <Testimonials />
      <ContactCTAWork />
      <Footer />
    </div>
  );
}
