import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../components/shared/useReveal.js';
import { MarkFoldedK } from '../components/kaart-logo/marks.jsx';

const K = {
  green: '#0d9b6a',
  greenDeep: '#085a3e',
  cream: '#f4f1e7',
  ink: '#0e1411',
};

function KaartNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: menuOpen ? 'none' : 'blur(14px)', background: menuOpen ? K.cream : 'rgba(244, 241, 231, 0.85)', borderBottom: '1px solid #0e141114' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px var(--pad)', maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <Link to="/kaart" className="brand" style={{ color: K.ink, gap: 12 }}>
          <span style={{ width: 30, height: 30, background: K.green, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MarkFoldedK size={18} fg="#fff" />
          </span>
          <span style={{ fontSize: 22, whiteSpace: 'nowrap' }}>
            Kaart Studio<sup className="mono" style={{ fontSize: 9, marginLeft: 6, color: K.green, letterSpacing: '0.1em' }}>×CRESTIFY</sup>
          </span>
        </Link>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ borderColor: '#0e141122' }}
        >
          <span style={{ background: K.ink, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ background: K.ink, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ background: K.ink, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>

        <nav className={`nav-links${menuOpen ? ' menu-open' : ''}`} style={{ background: menuOpen ? K.cream : undefined }}>
          <Link to="/kaart" className="nav-link" onClick={close} style={{ color: K.ink }}>← Back</Link>
          <a href="#milestone-1" className="nav-link" onClick={close} style={{ color: K.ink }}>Milestone 1</a>
          <a href="#milestone-2" className="nav-link" onClick={close} style={{ color: K.ink }}>Milestone 2</a>
          <a href="#retainer" className="nav-link" onClick={close} style={{ color: K.ink }}>Retainer</a>
          <a href="#contact" className="nav-link nav-cta" onClick={close} style={{ background: K.green, color: 'white', marginLeft: 6 }}>Brief us →</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MILESTONE 1 SERVICES ────────────────────────────────────────────────────
const MILESTONE_1 = [
  {
    n: '01', phase: 'Discovery', dur: '1–2 days',
    title: 'Brand & Audience Alignment',
    desc: 'We start by understanding your brand, product, audience, and goals. This phase sets the foundation — aligning expectations and defining what success looks like before a single pixel is designed.',
    items: ['Brand strategy & positioning', 'Audience & buyer persona mapping', 'Goal-setting & KPI definition', 'Onboarding & access setup'],
  },
  {
    n: '02', phase: 'Research', dur: '3 days',
    title: 'Market & Competitor Research',
    desc: 'We analyse competitors, market positioning, and customer behaviour. Every decision moving forward is backed by data and insights — not assumptions.',
    items: ['Competitor storefront teardown', 'Market positioning analysis', 'Customer behaviour insights', 'Best-in-class benchmarking'],
  },
  {
    n: '03', phase: 'CX Design', dur: '6–8 days',
    title: 'Conversion-Focused Storefront Design',
    desc: 'We design a high-converting storefront combining aesthetics with user psychology and content flow. Every section is built to guide users toward purchase — nothing is decorative without purpose.',
    items: ['Storefront UX wireframes', 'High-fidelity Figma designs', 'Mobile-first CX thinking', 'Section-by-section content flow'],
  },
  {
    n: '04', phase: 'Review', dur: '2 days',
    title: 'Design Walkthrough & Sign-Off',
    desc: 'We walk you through the entire experience before development begins. This ensures clarity, alignment, and zero surprises later — no rework mid-build.',
    items: ['Full design review call', 'Feedback integration round', 'Development scope lock', 'Final approval & handoff'],
  },
  {
    n: '05', phase: 'Development', dur: '8–12 days',
    title: 'Store Build & Integration',
    desc: 'We build a fast, scalable, and fully optimised Shopify store — integrating apps, automations, and conversion-focused features. Custom theme or headless, based on your goals.',
    items: ['Custom Shopify theme or headless build', 'App integrations & automations', 'Performance & speed optimisation', 'CRO-baked-in architecture'],
  },
  {
    n: '06', phase: 'Testing', dur: '2–4 days',
    title: 'QA, Testing & Launch',
    desc: 'We test flows, payments, responsiveness, and performance across devices and browsers. Everything is optimised before going live — a smooth launch with zero surprises.',
    items: ['End-to-end flow testing', 'Payment & checkout QA', 'Mobile + cross-browser checks', 'Performance audit & go-live'],
  },
];

// ─── MILESTONE 2 SERVICES ────────────────────────────────────────────────────
const MILESTONE_2 = [
  {
    n: '01', phase: 'Creatives', dur: '3–5 days',
    title: 'Graphics & Media Assets',
    desc: 'We create content strategies and produce high-performing creatives — including product visuals, ads, and social media assets that are ready to deploy across channels.',
    items: ['Product photography direction', 'Ad creative & static graphics', 'Social media content templates', 'Brand-consistent visual library'],
  },
  {
    n: '02', phase: 'Growth', dur: 'Continuous',
    title: 'ADs & UGC Engine',
    desc: 'We launch and test ad campaigns while working with creators to generate authentic UGC. This phase focuses on data collection, audience learning, and creative iteration.',
    items: ['Meta + TikTok campaign launch', 'UGC creator sourcing & briefing', 'A/B creative testing', 'Performance data collection'],
  },
  {
    n: '03', phase: 'Sales', dur: 'Post Step 2',
    title: 'Scaling Revenue',
    desc: 'As data compounds, we optimise campaigns and start driving consistent sales. Performance improves as we refine targeting, creatives, and audience segments.',
    items: ['Campaign optimisation & scaling', 'ROAS improvement cycles', 'Retargeting & lookalike audiences', 'Weekly performance reports'],
  },
  {
    n: '04', phase: 'CRO', dur: 'Ongoing',
    title: 'Store Optimisations',
    desc: 'We continuously improve your store, creatives, and funnels based on real user behaviour. Every change is tied to a conversion, retention, or revenue outcome.',
    items: ['Heatmap & session recording review', 'Conversion rate optimisation', 'Landing page testing', 'Product page improvements'],
  },
  {
    n: '05', phase: 'Retention', dur: 'Ongoing',
    title: 'Email & WhatsApp Funnels',
    desc: 'We set up email and WhatsApp automation flows — including abandoned cart recovery, repeat purchase sequences, and customer nurturing journeys.',
    items: ['Klaviyo flow setup & automation', 'WhatsApp broadcast sequences', 'Abandoned cart recovery', 'Post-purchase nurturing flows'],
  },
];

// ─── RETAINER SERVICES ───────────────────────────────────────────────────────
const RETAINER = [
  {
    title: 'Shopify Optimisation & Improvements',
    desc: 'Continuous improvements to your store — from UI tweaks to performance and conversion enhancements based on real user behaviour. Your store keeps getting better every month.',
    items: ['Monthly CRO audit & updates', 'Speed & performance monitoring', 'New feature rollouts', 'Merchandising & collection management'],
  },
  {
    title: 'Creatives & Graphics',
    desc: 'Ongoing creation of high-quality visuals, ad creatives, and content assets aligned with campaigns, product launches, and brand growth.',
    items: ['Monthly creative output', 'Ad creative refreshes', 'Social media asset production', 'Campaign-specific visuals'],
  },
  {
    title: 'Ads & Growth Management',
    desc: 'End-to-end campaign management — testing, scaling, and optimising ads to improve ROAS and drive consistent revenue growth month on month.',
    items: ['Full Meta + TikTok ad management', 'Budget scaling & ROAS tracking', 'Creative testing cycles', 'Monthly growth strategy call'],
  },
];

function HeroServices() {
  return (
    <section style={{ background: K.cream, color: K.ink, padding: 'clamp(60px, 9vw, 110px) 0 clamp(40px, 6vw, 70px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, #0e141108 1px, transparent 1px)', backgroundSize: 'calc(100% / 12) 100%', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className="reveal" style={{ marginBottom: 40 }}>
          <span className="mono" style={{ fontSize: 11, color: K.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            <span style={{ color: K.green }}>§01</span>&nbsp;&nbsp;Full service breakdown · Kaart Studio
          </span>
        </div>
        <h1 className="display reveal" style={{ color: K.ink, maxWidth: '18ch' }}>
          Everything we <span className="italic" style={{ color: K.green }}>do for you.</span>
        </h1>
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <p className="body-lg col-6" style={{ color: '#1f2925', maxWidth: '48ch' }}>
            Three milestone phases. One continuous growth engine. Here's exactly what happens from day one to a scaling brand.
          </p>
          <div className="col-6" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <a href="#contact" className="btn" style={{ background: K.ink, color: K.cream, fontSize: 15 }}>Start a project <span className="arr">→</span></a>
            <Link to="/kaart" className="btn btn-ghost" style={{ borderColor: '#0e141133', color: K.ink }}>← Back to Kaart</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneBanner({ label, title, sub, id, dark }) {
  return (
    <div id={id} style={{ background: dark ? K.ink : K.green, color: dark ? K.cream : '#04261a', padding: 'clamp(40px, 5vw, 60px) 0' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 'var(--gap)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', opacity: 0.6 }}>{label}</div>
            <div className="serif" style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.018em', marginTop: 8, fontStyle: 'italic' }}>{title}</div>
          </div>
          <p className="body-lg" style={{ maxWidth: '44ch', opacity: 0.8 }}>{sub}</p>
        </div>
      </div>
    </div>
  );
}

function ServiceCards({ items, accent }) {
  return (
    <section style={{ background: '#fdfcf6', padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vw, 36px)' }}>
          {items.map((s, i) => (
            <article key={s.n || s.title} className="reveal lift"
              onMouseEnter={e => e.currentTarget.style.borderColor = K.green}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#0e141118'}
              style={{ '--i': i, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', padding: 'clamp(28px, 3.5vw, 50px)', border: '1px solid #0e141118', borderRadius: 6, background: '#fff', alignItems: 'start', transition: 'border-color 0.25s, transform 0.4s', cursor: 'default' }}
            >
              {/* Left: phase + number */}
              <div className="col-3">
                {s.n && <div className="mono" style={{ fontSize: 11, color: K.green, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>§{s.n}</div>}
                {s.phase && <div className="mono" style={{ fontSize: 11, color: '#5a6760', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{s.phase}</div>}
                {s.dur && <div className="serif italic" style={{ fontSize: 15, color: K.green }}>{s.dur}</div>}
              </div>
              {/* Middle: title + desc */}
              <div className="col-5">
                <h3 className="serif" style={{ fontSize: 'clamp(20px, 2.2vw, 30px)', lineHeight: 1.15, letterSpacing: '-0.012em', marginBottom: 14 }}>{s.title}</h3>
                <p className="body" style={{ fontSize: 15, color: '#1f2925', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
              {/* Right: bullets */}
              <ul className="col-4" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {s.items.map(it => (
                  <li key={it} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 14 }}>
                    <span style={{ width: 6, height: 6, background: K.green, borderRadius: '50%', flexShrink: 0, marginTop: 6 }} />
                    <span style={{ color: '#1f2925' }}>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RetainerSection() {
  return (
    <section id="retainer" style={{ background: K.cream, padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span style={{ color: K.green }}>§04</span>&nbsp;&nbsp;Monthly Retainer
            </span>
          </div>
          <div className="col-8">
            <h2 className="h2">Scaling mode. <span className="italic" style={{ color: K.green }}>Month on month.</span></h2>
            <p className="body-lg" style={{ marginTop: 16, maxWidth: '50ch', color: '#1f2925' }}>
              Once your brand starts gaining traction, we move into a growth partnership — continuously improving your store, creatives, ads, and funnels to scale revenue.
            </p>
          </div>
        </div>
        <div className="grid-3" style={{ gap: 'var(--gap)' }}>
          {RETAINER.map((r, i) => (
            <article key={r.title} className="reveal lift" style={{ '--i': i, padding: 'clamp(24px, 3vw, 40px)', border: '1px solid #0e141122', borderRadius: 6, background: '#fdfcf6', display: 'flex', flexDirection: 'column', gap: 16, transition: 'border-color 0.25s, transform 0.4s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = K.green}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#0e141122'}
            >
              <div className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Included monthly</div>
              <h3 className="serif" style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{r.title}</h3>
              <p className="body" style={{ fontSize: 14.5, color: '#1f2925' }}>{r.desc}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #0e141118' }}>
                {r.items.map(it => (
                  <li key={it} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 13.5 }}>
                    <span style={{ color: K.green }}>→</span>
                    <span style={{ color: '#1f2925' }}>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyKaartStrip() {
  const reasons = [
    'End-to-end execution (no multiple vendors)',
    'Design + tech + marketing under one system',
    'Performance-first approach — not just aesthetics',
    'Fast execution with real feedback loops',
    'Built specifically for e-commerce brands',
  ];
  return (
    <section style={{ background: K.ink, color: K.cream, padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(30px, 4vw, 50px)' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>§05&nbsp;&nbsp;Why us</span>
          </div>
          <h2 className="h2 col-8" style={{ color: K.cream }}>
            Most agencies build <em className="serif italic" style={{ color: K.green }}>or</em> market.<br />We do both.
          </h2>
        </div>
        <ul style={{ listStyle: 'none', borderTop: '1px solid #ffffff1c' }}>
          {reasons.map((r, i) => (
            <li key={r} className="reveal" style={{ '--i': i, display: 'flex', gap: 24, padding: '20px 0', borderBottom: '1px solid #ffffff1c', alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: 11, color: K.green, minWidth: 28 }}>0{i + 1}</span>
              <span className="serif" style={{ fontSize: 'clamp(18px, 2.2vw, 28px)', letterSpacing: '-0.01em' }}>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServicesContact() {
  return (
    <section id="contact" style={{ background: K.green, color: '#04261a', padding: 'clamp(80px, 12vw, 160px) 0' }}>
      <div className="container">
        <span className="mono reveal" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.6 }}>§06&nbsp;&nbsp;Start a project</span>
        <h2 className="display reveal" style={{ color: '#04261a', marginTop: 22, fontSize: 'clamp(44px, 9vw, 130px)', maxWidth: '14ch' }}>
          Ready to <span className="italic">build?</span>
        </h2>
        <p className="body-lg reveal" style={{ color: '#1a4d36', marginTop: 28, maxWidth: '50ch' }}>
          Tell us about your brand, product, and where you're stuck. We'll come back with a clear plan and timeline within 48 hours.
        </p>
        <div className="reveal" style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="mailto:contact@crestify.co" className="btn" style={{ background: '#04261a', color: K.cream, fontSize: 16, padding: '18px 28px' }}>
            contact@crestify.co <span className="arr">→</span>
          </a>
          <a href="https://wa.me/917992028684" target="_blank" rel="noopener noreferrer" className="btn" style={{ border: '1px solid #04261a66', color: '#04261a', fontSize: 16, padding: '18px 28px' }}>
            WhatsApp us ↗
          </a>
        </div>
        <div className="reveal" style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid #04261a33', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/kaart" className="mono" style={{ fontSize: 11, color: '#1a4d36', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            ← Back to Kaart Studio
          </Link>
          <span style={{ color: '#04261a33' }}>·</span>
          <Link to="/" className="mono" style={{ fontSize: 11, color: '#1a4d36', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Crestify Studio ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function KaartServicesPage() {
  useReveal();
  return (
    <div className="page" style={{ background: K.cream }}>
      <KaartNav />
      <HeroServices />

      {/* Milestone 1: Store Build */}
      <MilestoneBanner
        id="milestone-1"
        label="Milestone 01 · Store Build"
        title="From idea to live store."
        sub="The first major milestone: a fully designed, built, and launched Shopify store ready to sell."
      />
      <ServiceCards items={MILESTONE_1} />

      {/* Milestone 2: Growth */}
      <MilestoneBanner
        id="milestone-2"
        label="Milestone 02 · Growth Phase"
        title="From live to traction."
        sub="With the store live, we shift to growth — creatives, ads, UGC, email, and continuous optimisation."
        dark
      />
      <ServiceCards items={MILESTONE_2} />

      {/* Retainer */}
      <RetainerSection />

      {/* Why us */}
      <WhyKaartStrip />

      {/* Contact */}
      <ServicesContact />
    </div>
  );
}
