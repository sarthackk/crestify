import { Link } from 'react-router-dom';
import SEO from '../components/shared/SEO.jsx';
import Footer from '../components/shared/Footer.jsx';
import { useReveal } from '../components/shared/useReveal.js';

/* ─── Design tokens ───────────────────────────────────────────────────────── */
const K = {
  bg:       '#060e09',
  surface:  '#0a1510',
  card:     '#0d1c14',
  border:   '#1a2e20',
  green:    '#0d9b6a',
  greenDim: '#0d9b6a44',
  cream:    '#e8e4d8',
  muted:    '#7d8a83',
  ink:      '#0e1411',
};

/* ─── Mobile styles ───────────────────────────────────────────────────────── */
const MOBILE_CSS = `
  .nk-service-row {
    display: grid;
    grid-template-columns: 48px 1fr 1fr;
    gap: clamp(20px, 3vw, 40px);
    padding: clamp(28px, 3vw, 40px) 0;
    border-bottom: 1px solid ${K.border};
    align-items: start;
  }
  .nk-reels-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .nk-cta-grid {
    display: grid;
    grid-template-columns: 7fr 5fr;
    gap: var(--gap);
    align-items: center;
  }
  @media (max-width: 768px) {
    .nk-service-row {
      grid-template-columns: 1fr;
      gap: 14px;
    }
    .nk-service-icon { display: none; }
    .nk-service-body { padding-top: 0 !important; }
    .nk-reels-grid {
      grid-template-columns: 1fr;
      max-width: 380px;
      margin: 0 auto;
    }
    .nk-cta-grid {
      grid-template-columns: 1fr;
      gap: 28px;
    }
    .nk-cta-right { align-items: flex-start; }
    .nk-section-heading {
      grid-template-columns: 1fr !important;
      gap: 12px !important;
    }
  }
`;

/* ─── Data ────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    n: '01', icon: '◈',
    title: 'Multi-store Shopify Management',
    body: 'Giva operates multiple Shopify stores across regions and product lines. We keep them in sync — consistent theme logic, shared component libraries, coordinated release cycles. When one store ships a feature, the others don\'t fall behind.',
    pills: ['Multi-store architecture', 'Theme sync', 'Release coordination', 'Store governance'],
  },
  {
    n: '02', icon: '◉',
    title: 'Custom Feature Development',
    body: 'Jewellery UX has requirements that off-the-shelf apps don\'t handle well. We build what\'s actually needed — ring size guides, metal type selectors, customisation flows, try-at-home booking integrations — directly in Liquid, React, and the Shopify API.',
    pills: ['Custom Liquid sections', 'Shopify apps', 'Jewellery UX features', 'API integrations'],
  },
  {
    n: '03', icon: '▲',
    title: 'Performance & CRO',
    body: 'Speed is conversion. We track Core Web Vitals across every storefront, hunt down LCP and INP regressions, and run structured CRO experiments — from PDP layout tests to checkout flow changes. Every sprint includes a performance checkpoint.',
    pills: ['Core Web Vitals', 'LCP / INP / CLS', 'A/B testing', 'Conversion rate optimisation'],
  },
  {
    n: '04', icon: '⟳',
    title: 'Integrations & Automations',
    body: 'Loyalty programmes, gifting flows, review systems, custom checkout extensions — Giva\'s stack is complex and growing. We scope, build, and maintain integrations so the marketing and ops teams get the tools they need without waiting on external agencies.',
    pills: ['Loyalty integrations', 'Gifting flows', 'Review systems', 'Checkout extensions'],
  },
];

const RETAINER_CARDS = [
  {
    icon: '💬',
    title: 'We join your Slack',
    body: 'From day one we\'re inside your team\'s workspace — in the right channels, looped into the right conversations. No ticket portals, no account managers. Direct access to the developers doing the work.',
  },
  {
    icon: '📅',
    title: 'Sprint planning every 2 weeks',
    body: 'We run two-week sprints aligned to your product roadmap. At the start of each sprint we scope, estimate, and commit to a list of deliverables. You always know what\'s being built and when it lands.',
  },
  {
    icon: '🚀',
    title: 'Ship to production, iterate',
    body: 'We deploy directly to your stores, run QA, and monitor after every release. After each sprint we review what shipped, what we learned, and what goes on the next board. The cycle keeps improving.',
  },
];

const PROCESS = [
  { step: '01', t: 'Brief', d: 'Every sprint starts with a brief — what the business needs, what the current stores lack, what\'s blocking growth. We ask the right questions so we\'re building the right things, not just filling tickets.' },
  { step: '02', t: 'Build', d: 'We work inside Giva\'s codebase, not in isolation. Features are built to the same standards as the rest of the theme — maintainable, documented, and tested before they go anywhere near production.' },
  { step: '03', t: 'Review', d: 'Before anything ships, we review with the team — functionality, edge cases, mobile behaviour, performance impact. Nothing merges that hasn\'t been seen by a real pair of eyes.' },
  { step: '04', t: 'Ship & iterate', d: 'After every release we monitor, gather data, and feed learnings back into the next sprint. The retainer model means we\'re accountable for what we ship long after the PR closes.' },
];

/* ─── Components ──────────────────────────────────────────────────────────── */
function Pill({ children }) {
  return (
    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '3px 9px', borderRadius: 999, background: K.greenDim, color: K.green, border: `1px solid ${K.green}33` }}>
      {children}
    </span>
  );
}

function GivaHero() {
  return (
    <section style={{ background: K.bg, color: K.cream, padding: 'clamp(80px, 12vw, 140px) 0 clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#ffffff04 1px, transparent 1px), linear-gradient(90deg, #ffffff04 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <Link to="/kaart" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.muted, textTransform: 'uppercase', letterSpacing: '0.14em', textDecoration: 'none' }}>← Kaart Studio</Link>
          <span style={{ color: K.border }}>·</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Giva</span>
        </div>

        {/* Hero grid */}
        <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
          <div className="col-8">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${K.green}12`, border: `1px solid ${K.green}28`, borderRadius: 999, padding: '5px 14px', marginBottom: 28 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: K.green }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: K.green, textTransform: 'uppercase', letterSpacing: '0.18em' }}>Jewellery · E-commerce · Retainer</span>
            </div>
            <h1 className="serif" style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.02, letterSpacing: '-0.02em', color: K.cream }}>
              Giva.<br />
              <span className="italic" style={{ color: K.green }}>Embedded. Every sprint.</span>
            </h1>
          </div>
          <div className="col-4" style={{ marginTop: 8 }}>
            <p className="body" style={{ color: K.muted, lineHeight: 1.7, marginBottom: 24 }}>
              Giva is India's fastest-growing fine jewellery brand. We're their embedded Shopify dev retainer — inside the team, shipping features, and keeping multiple stores moving forward every sprint.
            </p>
            <a href="https://giva.co" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em', textDecoration: 'none', border: `1px solid ${K.green}44`, borderRadius: 6, padding: '10px 16px' }}>
              Visit giva.co ↗
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 60px)', flexWrap: 'wrap', marginTop: 48, paddingTop: 32, borderTop: `1px solid ${K.border}` }}>
          {[
            { label: 'Multi-store', sub: 'Shopify management' },
            { label: 'Retainer model', sub: 'Embedded dev team' },
            { label: 'Ongoing', sub: 'Sprint-by-sprint' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="serif" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: K.cream, letterSpacing: '-0.02em' }}>{stat.label}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.muted, textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 4 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Tag strip */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
          {['Multi-store Shopify', 'Custom Development', 'Performance & CRO', 'Integrations', 'Retainer'].map(t => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>
    </section>
  );
}

function GivaServices() {
  return (
    <section style={{ background: K.surface, color: K.cream, padding: 'clamp(60px, 9vw, 120px) 0', borderTop: `1px solid ${K.border}` }}>
      <div className="container">
        <div className="grid nk-section-heading reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>§01 · What we do</span>
          </div>
          <div className="col-8">
            <h2 className="h2" style={{ color: K.cream, maxWidth: '28ch' }}>
              What we build. <span className="italic" style={{ color: K.green }}>Every sprint.</span>
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${K.border}` }}>
          {SERVICES.map((s, i) => (
            <div key={s.n} className="nk-service-row reveal" style={{ '--i': i }}>
              {/* Icon — hidden on mobile via CSS */}
              <div className="nk-service-icon" style={{ fontFamily: 'var(--mono)', fontSize: 20, color: K.green, paddingTop: 2 }}>{s.icon}</div>
              {/* Title + pills */}
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.muted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>§{s.n}</div>
                <h3 className="serif" style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: 16 }}>{s.title}</h3>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {s.pills.map(p => <Pill key={p}>{p}</Pill>)}
                </div>
              </div>
              {/* Body */}
              <p className="body nk-service-body" style={{ color: K.muted, lineHeight: 1.7, paddingTop: 36 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GivaRetainer() {
  return (
    <section style={{ background: K.bg, color: K.cream, padding: 'clamp(60px, 9vw, 120px) 0', borderTop: `1px solid ${K.border}` }}>
      <div className="container">
        <div className="grid nk-section-heading reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>§02 · The model</span>
          </div>
          <div className="col-8">
            <h2 className="h2" style={{ color: K.cream }}>
              How the retainer <span className="italic" style={{ color: K.green }}>works.</span>
            </h2>
          </div>
        </div>

        <div className="nk-reels-grid reveal">
          {RETAINER_CARDS.map((card, i) => (
            <div key={card.title} style={{ background: K.card, border: `1px solid ${K.border}`, borderRadius: 10, padding: 'clamp(24px, 3vw, 36px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <h3 className="serif" style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', lineHeight: 1.2, letterSpacing: '-0.01em', color: K.cream }}>{card.title}</h3>
              <p className="body" style={{ fontSize: 14, color: K.muted, lineHeight: 1.65 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GivaProcess() {
  return (
    <section style={{ background: K.bg, color: K.cream, padding: 'clamp(60px, 9vw, 120px) 0', borderTop: `1px solid ${K.border}` }}>
      <div className="container">
        <div className="grid nk-section-heading reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>§03 · How we work</span>
          </div>
          <div className="col-8">
            <h2 className="h2" style={{ color: K.cream }}>
              The cycle that <span className="italic" style={{ color: K.green }}>keeps shipping.</span>
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {PROCESS.map((step, i) => (
            <div key={step.step} className="reveal" style={{ '--i': i, background: K.card, border: `1px solid ${K.border}`, padding: 'clamp(24px, 3vw, 36px)', position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden style={{ position: 'absolute', top: -10, right: 12, fontFamily: 'var(--serif)', fontSize: 90, color: '#ffffff04', lineHeight: 1, userSelect: 'none' }}>{step.step}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.green, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 16 }}>{step.step}</div>
              <h3 className="serif" style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.01em' }}>{step.t}</h3>
              <p className="body" style={{ fontSize: 14, color: K.muted, lineHeight: 1.65 }}>{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GivaCTA() {
  return (
    <section style={{ background: K.green, color: '#fff', padding: 'clamp(60px, 10vw, 120px) 0', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className="nk-cta-grid">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 20 }}>
              Kaart Studio · Shopify Dev Retainer
            </div>
            <h2 className="serif" style={{ fontSize: 'clamp(28px, 5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff' }}>
              Running a Shopify brand that needs a <span className="italic">real dev team?</span>
            </h2>
          </div>
          <div className="nk-cta-right" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <p className="body" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '32ch', lineHeight: 1.7 }}>
              We embed directly inside your team — no agencies, no middlemen. Just a dev team that ships on your schedule.
            </p>
            <Link to="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: K.green, border: 'none', borderRadius: 6, padding: '14px 24px', fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Brief us →
            </Link>
            <Link to="/kaart"
              style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>
              ← Back to Kaart Studio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function KaartGiva() {
  useReveal();
  return (
    <div style={{ background: K.bg }}>
      <style>{MOBILE_CSS}</style>
      <SEO
        title="Giva × Kaart Studio | Shopify Dev Retainer for India's Fastest-Growing Jewellery Brand"
        description="Kaart Studio is embedded inside Giva's team as their Shopify dev retainer — shipping new features, custom storefronts, and performance improvements across multiple stores."
        canonical="/kaart/giva"
        keywords="Shopify retainer, embedded dev team, jewellery ecommerce, Giva Shopify, multi-store Shopify management"
      />
      <GivaHero />
      <GivaServices />
      <GivaRetainer />
      <GivaProcess />
      <GivaCTA />
      <div style={{ background: K.bg }}>
        <Footer />
      </div>
    </div>
  );
}
