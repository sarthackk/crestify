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
    title: 'UGC Creator Sourcing & Briefing',
    body: 'We find and vet creators who actually fit the Nirakaar aesthetic — not mass-market influencers, but people whose homes and taste align with the brand. Every creator gets a tight brief: exact angles, styling cues, messaging pillars. Nothing left to guesswork.',
    pills: ['Creator vetting', 'Brief writing', 'Relationship management', 'Deliverable tracking'],
  },
  {
    n: '02', icon: '◉',
    title: 'Content Production',
    body: 'Shoots, reels, carousels — built around the product and the season. We plan, direct, and produce content that shows off the tactility of hand-finished objects in a way stock photos never could. Every piece is on-brand and ready to publish.',
    pills: ['Shoot planning', 'Reel production', 'Carousel design', 'Brand-consistent editing'],
  },
  {
    n: '03', icon: '▲',
    title: 'Social Media Management',
    body: "We run Nirakaar's social channels day-to-day — scheduling, captions, community replies, and story content. The feed stays consistent, the tone stays right, and the team's time stays focused on what only they can do: make beautiful objects.",
    pills: ['Daily scheduling', 'Caption writing', 'Community management', 'Story content'],
  },
  {
    n: '04', icon: '⟳',
    title: 'Paid Ads with UGC Creatives',
    body: "UGC content feeds directly into paid campaigns on Meta and Instagram. We test creative angles, iterate on what performs, and scale what works — always using real-feeling content that doesn't look like an ad even when it is one.",
    pills: ['Meta ad management', 'UGC creative testing', 'Audience targeting', 'Performance iteration'],
  },
];

const REELS = {
  influencer: [
    { id: 'DYhW1eKSkpH' },
    { id: 'DYRvkLoJ9D6' },
    { id: 'DX4hxRQBJrd' },
  ],
  inhouse: [
    { id: 'DWY1EuAyQ-7' },
    { id: 'DWlmIXKSIBY' },
    { id: 'DW_dKRSDO1f' },
  ],
};

const PROCESS = [
  { step: '01', t: 'Brand immersion', d: 'Before a single brief goes out, we study the product, the aesthetic, the price point, and the customer. Nirakaar is a specific kind of brand — and the content has to be too.' },
  { step: '02', t: 'Creator matching', d: "We identify creators by lifestyle fit, not follower count. A creator whose apartment already looks like a Nirakaar customer's home is worth ten times a generic homewares influencer." },
  { step: '03', t: 'Brief and shoot', d: "Detailed briefs cover shot list, lighting direction, do's and don'ts. For in-house content we plan and direct shoots that put the product in real spaces, real light." },
  { step: '04', t: 'Publish and run ads', d: 'Content goes live on schedule. The best-performing organic pieces get repurposed into paid creative. We test, learn, and scale — the cycle keeps improving itself.' },
];

/* ─── Components ──────────────────────────────────────────────────────────── */
function Pill({ children }) {
  return (
    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '3px 9px', borderRadius: 999, background: K.greenDim, color: K.green, border: `1px solid ${K.green}33` }}>
      {children}
    </span>
  );
}

function NirakaarHero() {
  return (
    <section style={{ background: K.bg, color: K.cream, padding: 'clamp(80px, 12vw, 140px) 0 clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#ffffff04 1px, transparent 1px), linear-gradient(90deg, #ffffff04 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <Link to="/kaart" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.muted, textTransform: 'uppercase', letterSpacing: '0.14em', textDecoration: 'none' }}>← Kaart Studio</Link>
          <span style={{ color: K.border }}>·</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Nirakaar</span>
        </div>

        {/* Hero grid — uses site's .grid/.col classes which already handle mobile */}
        <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
          <div className="col-8">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${K.green}12`, border: `1px solid ${K.green}28`, borderRadius: 999, padding: '5px 14px', marginBottom: 28 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: K.green }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: K.green, textTransform: 'uppercase', letterSpacing: '0.18em' }}>Home Décor · Lifestyle · Ongoing</span>
            </div>
            <h1 className="serif" style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.02, letterSpacing: '-0.02em', color: K.cream }}>
              Nirakaar.<br />
              <span className="italic" style={{ color: K.green }}>The full content engine.</span>
            </h1>
          </div>
          <div className="col-4" style={{ marginTop: 8 }}>
            <p className="body" style={{ color: K.muted, lineHeight: 1.7, marginBottom: 24 }}>
              Nirakaar makes limited-batch, hand-finished sculptural objects for modern spaces. We run everything content — so their team stays focused on craft.
            </p>
            <a href="https://nirakaar.in" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em', textDecoration: 'none', border: `1px solid ${K.green}44`, borderRadius: 6, padding: '10px 16px' }}>
              Visit nirakaar.in ↗
            </a>
          </div>
        </div>

        {/* Tag strip */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 48, paddingTop: 32, borderTop: `1px solid ${K.border}` }}>
          {['UGC Creator Sourcing', 'Content Production', 'Social Media Management', 'Paid Ads', 'Creative Strategy'].map(t => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>
    </section>
  );
}

function NirakaarServices() {
  return (
    <section style={{ background: K.surface, color: K.cream, padding: 'clamp(60px, 9vw, 120px) 0', borderTop: `1px solid ${K.border}` }}>
      <div className="container">
        <div className="grid nk-section-heading reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>§01 · What we do</span>
          </div>
          <div className="col-8">
            <h2 className="h2" style={{ color: K.cream, maxWidth: '28ch' }}>
              Four pillars. <span className="italic" style={{ color: K.green }}>One team.</span>
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

function ReelEmbed({ id }) {
  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '177.78%', borderRadius: 10, overflow: 'hidden', background: '#0a1510', border: `1px solid ${K.border}` }}>
      <iframe
        src={`https://www.instagram.com/reel/${id}/embed/`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        scrolling="no"
        allowTransparency="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title={`Nirakaar reel ${id}`}
      />
      {/* Cover the likes / action bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 52, background: '#fff', zIndex: 2 }} />
    </div>
  );
}

function NirakaarContent() {
  return (
    <section style={{ background: K.bg, color: K.cream, padding: 'clamp(60px, 9vw, 120px) 0', borderTop: `1px solid ${K.border}` }}>
      <div className="container">
        <div className="grid nk-section-heading reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>§02 · The content</span>
          </div>
          <div className="col-8">
            <h2 className="h2" style={{ color: K.cream }}>
              Real work. <span className="italic" style={{ color: K.green }}>Real creators.</span>
            </h2>
          </div>
        </div>

        {/* Influencer collabs */}
        <div className="reveal" style={{ marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: K.green }} />
            <span className="mono" style={{ fontSize: 10, color: K.muted, textTransform: 'uppercase', letterSpacing: '0.16em' }}>Influencer Collaborations</span>
          </div>
          <div className="nk-reels-grid">
            {REELS.influencer.map(r => <ReelEmbed key={r.id} id={r.id} />)}
          </div>
        </div>

        {/* In-house content */}
        <div className="reveal">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: K.green }} />
            <span className="mono" style={{ fontSize: 10, color: K.muted, textTransform: 'uppercase', letterSpacing: '0.16em' }}>In-House Content</span>
          </div>
          <div className="nk-reels-grid">
            {REELS.inhouse.map(r => <ReelEmbed key={r.id} id={r.id} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function NirakaarProcess() {
  return (
    <section style={{ background: K.bg, color: K.cream, padding: 'clamp(60px, 9vw, 120px) 0', borderTop: `1px solid ${K.border}` }}>
      <div className="container">
        <div className="grid nk-section-heading reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>§03 · How we work</span>
          </div>
          <div className="col-8">
            <h2 className="h2" style={{ color: K.cream }}>
              The cycle that <span className="italic" style={{ color: K.green }}>keeps compounding.</span>
            </h2>
          </div>
        </div>

        {/* auto-fit already handles mobile nicely */}
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

function NirakaarCTA() {
  return (
    <section style={{ background: K.green, color: '#fff', padding: 'clamp(60px, 10vw, 120px) 0', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className="nk-cta-grid">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 20 }}>
              Kaart Studio · Content & Growth
            </div>
            <h2 className="serif" style={{ fontSize: 'clamp(28px, 5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff' }}>
              Running a brand that deserves a <span className="italic">real content engine?</span>
            </h2>
          </div>
          <div className="nk-cta-right" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <p className="body" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '32ch', lineHeight: 1.7 }}>
              We work with e-commerce brands that are serious about content. If that's you, let's talk.
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
export default function KaartNirakaar() {
  useReveal();
  return (
    <div style={{ background: K.bg }}>
      <style>{MOBILE_CSS}</style>
      <SEO
        title="Nirakaar × Kaart Studio — Content, UGC & Social"
        description="Kaart Studio runs the full content engine for Nirakaar — UGC creator sourcing, content production, social media management, and paid ads for a hand-crafted home décor brand."
        canonical="/kaart/nirakaar"
        keywords="UGC creator marketing, content production agency, social media management India, Shopify brand content"
      />
      <NirakaarHero />
      <NirakaarServices />
      <NirakaarContent />
      <NirakaarProcess />
      <NirakaarCTA />
      <div style={{ background: K.bg }}>
        <Footer />
      </div>
    </div>
  );
}
