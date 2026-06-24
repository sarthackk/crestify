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
  red:      '#c8102e',
};

/* ─── Mobile styles ───────────────────────────────────────────────────────── */
const MOBILE_CSS = `
  .hd-service-row {
    display: grid;
    grid-template-columns: 48px 1fr 1fr;
    gap: clamp(20px, 3vw, 40px);
    padding: clamp(28px, 3vw, 40px) 0;
    border-bottom: 1px solid ${K.border};
    align-items: start;
  }
  .hd-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .hd-cta-grid {
    display: grid;
    grid-template-columns: 7fr 5fr;
    gap: var(--gap);
    align-items: center;
  }
  @media (max-width: 768px) {
    .hd-service-row {
      grid-template-columns: 1fr;
      gap: 14px;
    }
    .hd-service-icon { display: none; }
    .hd-service-body { padding-top: 0 !important; }
    .hd-cards-grid {
      grid-template-columns: 1fr;
    }
    .hd-cta-grid {
      grid-template-columns: 1fr;
      gap: 28px;
    }
    .hd-cta-right { align-items: flex-start; }
    .hd-section-heading {
      grid-template-columns: 1fr !important;
      gap: 12px !important;
    }
  }
`;

/* ─── Data ────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    n: '01', icon: '◈',
    title: 'Window Signage',
    body: "Large-format window graphics for the storefront — covering the full glass frontage with the brand's red and gold identity. Coming-soon panels, brand story panels, and the iconic 'A Legacy of Taste Since 1937' treatment, scaled for street impact.",
    pills: ['Large-format print', 'Window vinyls', 'Coming-soon graphics'],
  },
  {
    n: '02', icon: '◉',
    title: 'Launch Branding Panels',
    body: "Multiple panel compositions across the shopfront — each panel a self-contained brand statement. Haldiram's logo lockup, 'Coming to London' messaging, QR codes linked to the UK restaurant Instagram, and floral illustration details from the core brand system.",
    pills: ['Panel composition', 'Brand lockup', 'QR integration', 'Illustration'],
  },
  {
    n: '03', icon: '▲',
    title: 'Brand Consistency at Scale',
    body: "Haldiram's has one of the most recognisable visual identities in the world. Every element — the crimson red, the gold logotype, the floral motifs — had to match the global brand standard exactly while working at architectural scale.",
    pills: ['Colour matching', 'Typographic precision', 'Motif adaptation'],
  },
  {
    n: '04', icon: '⟳',
    title: 'Print-Ready Delivery',
    body: 'All artwork delivered at the correct size and specification for large-format print production. Bleed, colour profiles, resolution — handled so the installer and printer could go straight to production without back-and-forth.',
    pills: ['Print specs', 'Production-ready files', 'Bleed & colour profiles'],
  },
];

const HIGHLIGHTS = [
  {
    icon: '◈',
    label: 'London',
    sub: "Haldiram's first UK store",
    body: "This is Haldiram's first physical location in the United Kingdom — a landmark launch for one of India's most iconic brands entering the UK market.",
  },
  {
    icon: '●',
    label: 'Full shopfront',
    sub: 'Window signage suite',
    body: 'Multiple large-format panels covering the full glass frontage. Each panel designed as a standalone brand statement and as part of the overall composition.',
  },
  {
    icon: '⚡',
    label: 'Installed',
    sub: 'Live on the street',
    body: 'The banners are up. Pedestrians walking past the London location see Haldiram\'s red and gold announcing the arrival of the brand to the UK.',
  },
];

const PROCESS = [
  { step: '01', t: 'Brief', d: "Haldiram's UK briefed us on the London store launch. We needed to introduce the brand to a UK audience who may not know it — while staying completely true to the visual identity the Indian market has known for decades." },
  { step: '02', t: 'Concept', d: "We developed the panel compositions — deciding how to split the messaging across multiple windows, where to place the logo lockups, how to balance the 'Coming Soon' and 'Coming to London' calls-to-action with QR codes and brand story copy." },
  { step: '03', t: 'Refine', d: 'Iterated on the balance of red space vs. graphic density, the scale of the floral illustration motifs, and the hierarchy of information. The goal was impact at a glance and brand depth on closer inspection.' },
  { step: '04', t: 'Deliver', d: 'Final files delivered print-ready, at the correct specifications for large-format vinyl production. The artwork went straight to the printer and was installed on the shopfront.' },
];

/* ─── Components ──────────────────────────────────────────────────────────── */
function Pill({ children }) {
  return (
    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '3px 9px', borderRadius: 999, background: K.greenDim, color: K.green, border: `1px solid ${K.green}33` }}>
      {children}
    </span>
  );
}

function HaldiHero() {
  return (
    <section style={{ background: K.bg, color: K.cream, padding: 'clamp(80px, 12vw, 140px) 0 clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#ffffff04 1px, transparent 1px), linear-gradient(90deg, #ffffff04 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <Link to="/kaart" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.muted, textTransform: 'uppercase', letterSpacing: '0.14em', textDecoration: 'none' }}>← Kaart Studio</Link>
          <span style={{ color: K.border }}>·</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Haldiram's UK</span>
        </div>

        {/* Hero grid */}
        <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
          <div className="col-8">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${K.green}12`, border: `1px solid ${K.green}28`, borderRadius: 999, padding: '5px 14px', marginBottom: 28 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: K.green }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: K.green, textTransform: 'uppercase', letterSpacing: '0.18em' }}>F&B · Launch Signage · London</span>
            </div>
            <h1 className="serif" style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.02, letterSpacing: '-0.02em', color: K.cream }}>
              Haldiram's UK.<br />
              <span className="italic" style={{ color: K.green }}>Coming to London.</span>
            </h1>
          </div>
          <div className="col-4" style={{ marginTop: 8 }}>
            <p className="body" style={{ color: K.muted, lineHeight: 1.7, marginBottom: 24 }}>
              Haldiram's — India's most iconic snack and F&B brand — is opening their first UK location in London. We designed the full window signage suite for the store launch.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: K.muted, textTransform: 'uppercase', letterSpacing: '0.14em', border: `1px solid ${K.border}`, borderRadius: 6, padding: '10px 16px' }}>
                Haldiram's UK
              </div>
            </div>
          </div>
        </div>

        {/* Tag strip */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 48, paddingTop: 32, borderTop: `1px solid ${K.border}` }}>
          {['Window Signage', 'Large-Format Print', 'Launch Campaign', 'Brand Identity', 'London Store'].map(t => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>
    </section>
  );
}

function HaldiServices() {
  return (
    <section style={{ background: K.surface, color: K.cream, padding: 'clamp(60px, 9vw, 120px) 0', borderTop: `1px solid ${K.border}` }}>
      <div className="container">
        <div className="grid hd-section-heading reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>§01 · What we delivered</span>
          </div>
          <div className="col-8">
            <h2 className="h2" style={{ color: K.cream, maxWidth: '28ch' }}>
              Built for the street. <span className="italic" style={{ color: K.green }}>True to the brand.</span>
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${K.border}` }}>
          {SERVICES.map((s, i) => (
            <div key={s.n} className="hd-service-row reveal" style={{ '--i': i }}>
              <div className="hd-service-icon" style={{ fontFamily: 'var(--mono)', fontSize: 20, color: K.green, paddingTop: 2 }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.muted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>§{s.n}</div>
                <h3 className="serif" style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: 16 }}>{s.title}</h3>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {s.pills.map(p => <Pill key={p}>{p}</Pill>)}
                </div>
              </div>
              <p className="body hd-service-body" style={{ color: K.muted, lineHeight: 1.7, paddingTop: 36 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HaldiHighlights() {
  return (
    <section style={{ background: K.bg, color: K.cream, padding: 'clamp(60px, 9vw, 120px) 0', borderTop: `1px solid ${K.border}` }}>
      <div className="container">
        <div className="grid hd-section-heading reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>§02 · The launch</span>
          </div>
          <div className="col-8">
            <h2 className="h2" style={{ color: K.cream }}>
              India's most loved snack brand. <span className="italic" style={{ color: K.green }}>On a London street.</span>
            </h2>
          </div>
        </div>

        <div className="hd-cards-grid reveal">
          {HIGHLIGHTS.map((card) => (
            <div key={card.label} style={{ background: K.card, border: `1px solid ${K.border}`, padding: 'clamp(24px, 3vw, 36px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 24, color: K.green }}>{card.icon}</div>
              <div>
                <h3 className="serif" style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.01em', color: K.cream, marginBottom: 4 }}>{card.label}</h3>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>{card.sub}</div>
              </div>
              <p className="body" style={{ fontSize: 14, color: K.muted, lineHeight: 1.65 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HaldiProcess() {
  return (
    <section style={{ background: K.surface, color: K.cream, padding: 'clamp(60px, 9vw, 120px) 0', borderTop: `1px solid ${K.border}` }}>
      <div className="container">
        <div className="grid hd-section-heading reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>§03 · How we worked</span>
          </div>
          <div className="col-8">
            <h2 className="h2" style={{ color: K.cream }}>
              Brief to installation. <span className="italic" style={{ color: K.green }}>Four steps.</span>
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

function HaldiCTA() {
  return (
    <section style={{ background: K.green, color: '#fff', padding: 'clamp(60px, 10vw, 120px) 0', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className="hd-cta-grid">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 20 }}>
              Kaart Studio · Design & Signage
            </div>
            <h2 className="serif" style={{ fontSize: 'clamp(28px, 5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff' }}>
              Opening somewhere new? <span className="italic">Make the launch unforgettable.</span>
            </h2>
          </div>
          <div className="hd-cta-right" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <p className="body" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '32ch', lineHeight: 1.7 }}>
              Whether it's a store launch, a pop-up, or a brand rollout — we design the visuals that make people stop and look.
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
export default function KaartHaldirams() {
  useReveal();
  return (
    <div style={{ background: K.bg }}>
      <style>{MOBILE_CSS}</style>
      <SEO
        title="Haldiram's UK × Kaart Studio | London Store Launch Signage"
        description="Kaart Studio designed the window signage suite for Haldiram's first UK store in London — large-format banners and launch graphics for one of India's most iconic brands."
        canonical="/kaart/haldirams"
        keywords="Haldiram's UK, London store launch, window signage, large format print, brand launch design, F&B signage"
      />
      <HaldiHero />
      <HaldiServices />
      <HaldiHighlights />
      <HaldiProcess />
      <HaldiCTA />
      <div style={{ background: K.bg }}>
        <Footer />
      </div>
    </div>
  );
}
