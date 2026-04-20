// Kaart.jsx — Shopify-focused sub-studio of Crestify
// Note: this page declares its own Nav so it can use green accent + sub-brand identity.

const KAART = {
  green: '#0d9b6a',
  greenDeep: '#085a3e',
  cream: '#f4f1e7',
  ink: '#0e1411',
};

function KaartNav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: 'blur(14px)',
      background: 'rgba(244, 241, 231, 0.85)',
      borderBottom: '1px solid #0e141114',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px var(--pad)', maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <a href="kaart.html" className="brand" style={{ color: KAART.ink, gap: 12 }}>
          <span style={{
            width: 26, height: 26,
            background: KAART.green,
            borderRadius: 6,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18,
          }}>k</span>
          <span style={{ fontSize: 22, whiteSpace: 'nowrap' }}>Kaart Studio<sup className="mono" style={{ fontSize: 9, marginLeft: 6, color: KAART.green, letterSpacing: '0.1em' }}>×CRESTIFY</sup></span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <a href="#services" className="nav-link" style={{ color: KAART.ink }}>Services</a>
          <a href="#work" className="nav-link" style={{ color: KAART.ink }}>Work</a>
          <a href="#process" className="nav-link" style={{ color: KAART.ink }}>Process</a>
          <a href="#pricing" className="nav-link" style={{ color: KAART.ink }}>Pricing</a>
          <a href="index.html" className="nav-link" style={{ color: '#5a6760' }}>↩ Crestify</a>
          <a href="#contact" className="nav-link nav-cta" style={{ background: KAART.green, color: 'white', marginLeft: 6 }}>Brief us →</a>
        </nav>
      </div>
    </header>
  );
}

function KaartHero() {
  return (
    <section style={{
      position: 'relative',
      paddingTop: 56,
      paddingBottom: 'clamp(60px, 9vw, 110px)',
      background: KAART.cream,
      color: KAART.ink,
      overflow: 'hidden',
    }}>
      {/* Decorative grid lines */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(to right, #0e141108 1px, transparent 1px)',
        backgroundSize: 'calc(100% / 12) 100%',
        pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap', marginBottom: 56 }}>
          <span className="mono" style={{ fontSize: 11, color: KAART.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            <span style={{ color: KAART.green }}>§01</span>&nbsp;&nbsp;Shopify-only · A Crestify studio
          </span>
          <span className="mono" style={{ fontSize: 11, color: '#5a6760', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            ● Booking Q3 · 40+ stores shipped
          </span>
        </div>

        <h1 className="display reveal" style={{ maxWidth: '13ch', color: KAART.ink }}>
          Shopify, <span className="italic" style={{ color: KAART.green }}>done</span><br/>
          like it&rsquo;s yours.
        </h1>

        <div className="reveal" style={{
          display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 70px)', alignItems: 'end',
        }}>
          <p className="body-lg" style={{ gridColumn: 'span 6', color: '#1f2925', maxWidth: '46ch' }}>
            Custom themes, headless rebuilds, UGC and social — the entire e-commerce engine, run end-to-end by operators who&rsquo;ve shipped <em className="serif italic">forty-plus</em> Shopify stores for brands, agencies, and founders.
          </p>
          <div style={{ gridColumn: 'span 6', display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <a href="#contact" className="btn" style={{ background: KAART.ink, color: KAART.cream, fontSize: 15 }}>Brief us <span className="arr">→</span></a>
            <a href="#work" className="btn btn-ghost" style={{ borderColor: '#0e141133', color: KAART.ink }}>See the stores</a>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="container reveal" style={{ marginTop: 'clamp(60px, 8vw, 100px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: '#5a6760', flexWrap: 'wrap' }}>
          <span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Built on</span>
          <span style={{ flex: 1, height: 1, background: '#0e141122' }} />
          <span className="serif italic" style={{ fontSize: 22, color: KAART.ink }}>Shopify Plus</span>
          <span style={{ color: '#0e141133' }}>·</span>
          <span className="serif italic" style={{ fontSize: 22, color: KAART.ink }}>Hydrogen</span>
          <span style={{ color: '#0e141133' }}>·</span>
          <span className="serif italic" style={{ fontSize: 22, color: KAART.ink }}>Liquid</span>
          <span style={{ color: '#0e141133' }}>·</span>
          <span className="serif italic" style={{ fontSize: 22, color: KAART.ink }}>Klaviyo</span>
          <span style={{ color: '#0e141133' }}>·</span>
          <span className="serif italic" style={{ fontSize: 22, color: KAART.ink }}>Recharge</span>
        </div>
      </div>
    </section>
  );
}

/* === Stat strip === */
function KaartStats() {
  const stats = [
    { n: '40+', l: 'Shopify stores shipped' },
    { n: '$120M+', l: 'GMV processed yearly' },
    { n: '12+', l: 'Agency white-label clients' },
    { n: '4.9/5', l: 'Avg client rating' },
  ];
  return (
    <section style={{ background: KAART.ink, color: KAART.cream, padding: 'clamp(50px, 7vw, 90px) 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--gap)' }}>
        {stats.map((s, i) => (
          <div key={s.l} className="reveal" style={{ '--i': i, borderTop: `1px solid ${KAART.green}`, paddingTop: 22 }}>
            <div className="serif" style={{ fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 1, letterSpacing: '-0.02em', color: KAART.cream }}>{s.n}</div>
            <div className="mono" style={{ fontSize: 11, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 14 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* === SERVICES === */
const KAART_SERVICES = [
  {
    n: '01',
    title: 'Custom Shopify themes',
    summary: 'Bespoke Liquid themes built from your brand, not from a template marketplace.',
    bullets: ['Bespoke design + Liquid build', 'Section-based, merchandiser-friendly', 'Native Shopify Plus features', 'Performance budget enforced'],
  },
  {
    n: '02',
    title: 'Headless rebuilds',
    summary: 'Hydrogen, Next, or Remix storefronts when speed and flexibility matter more than shortcuts.',
    bullets: ['Hydrogen / Next / Remix', 'Sanity, Contentful, or Storyblok CMS', 'Sub-second LCP target', 'Edge-deployed globally'],
  },
  {
    n: '03',
    title: 'UGC & social marketing',
    summary: 'In-house creator network producing TikTok-ready UGC, ads, and organic for DTC brands.',
    bullets: ['Creator sourcing & briefs', 'UGC, talking-head, demo formats', 'Paid social + organic editorial', 'Monthly content engine'],
  },
  {
    n: '04',
    title: 'End-to-end e-com management',
    summary: 'A done-for-you operating team: store, ads, email, retention, fulfillment, customer ops.',
    bullets: ['Klaviyo lifecycle + flows', 'Meta + TikTok ad ops', 'Catalog + merchandising', 'CX & 3PL coordination'],
  },
];

function KaartServices() {
  return (
    <section id="services" style={{ background: KAART.cream, color: KAART.ink, padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <span className="mono" style={{ fontSize: 11, color: KAART.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span style={{ color: KAART.green }}>§02</span>&nbsp;&nbsp;What we do
            </span>
          </div>
          <h2 className="h2" style={{ gridColumn: 'span 8' }}>
            One stack. <span className="italic" style={{ color: KAART.green }}>Four offers.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gap)' }}>
          {KAART_SERVICES.map((s, i) => (
            <article key={s.n} className="reveal lift" style={{
              '--i': i,
              border: '1px solid #0e141122',
              padding: 'clamp(28px, 3vw, 40px)',
              borderRadius: 6,
              background: '#fdfcf6',
              display: 'flex', flexDirection: 'column', gap: 18,
              transition: 'border-color 0.25s, transform 0.4s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = KAART.green}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#0e141122'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="mono" style={{ fontSize: 11, color: KAART.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>§{s.n}</span>
                <span className="mono" style={{ fontSize: 11, color: '#5a6760', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Service</span>
              </div>
              <h3 className="serif" style={{ fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.04, letterSpacing: '-0.018em' }}>{s.title}</h3>
              <p className="body" style={{ fontSize: 16, color: '#1f2925' }}>{s.summary}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6, paddingTop: 18, borderTop: '1px solid #0e141118' }}>
                {s.bullets.map(b => (
                  <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 14.5, color: '#1f2925' }}>
                    <span style={{ width: 6, height: 6, background: KAART.green, borderRadius: '50%', flexShrink: 0, transform: 'translateY(-2px)' }} />
                    {b}
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

/* === WORK MARQUEE === */
const KAART_PROJECTS = [
  { name: 'Lumen Outfitters', kind: 'Theme rebuild', metric: '+38% conv', dark: false },
  { name: 'Maris & Co.',     kind: 'Subscriptions', metric: '−41% churn', dark: true },
  { name: 'Aurelia',         kind: 'Headless · Hydrogen', metric: '0.8s LCP', dark: false },
  { name: 'Bramble',         kind: 'Custom theme', metric: '+62% AOV', dark: true },
  { name: 'Northwind',       kind: 'B2B portal', metric: '4.8 NPS', dark: false },
  { name: 'Kinsey & Co.',    kind: 'UGC engine', metric: '8M views', dark: true },
];

function KaartWork() {
  const [hover, setHover] = React.useState(null);
  return (
    <section id="work" style={{ background: '#0a100d', color: KAART.cream, padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <span className="mono" style={{ fontSize: 11, color: KAART.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              §03&nbsp;&nbsp;Selected stores
            </span>
          </div>
          <h2 className="h2" style={{ gridColumn: 'span 8', color: KAART.cream }}>
            Forty-plus shipped. <span className="italic" style={{ color: KAART.green }}>Six worth showing.</span>
          </h2>
        </div>

        <ul style={{ listStyle: 'none', borderTop: '1px solid #ffffff1c' }}>
          {KAART_PROJECTS.map((p, i) => (
            <li key={p.name} className="reveal" style={{ '--i': i }}>
              <a href="#" style={{
                display: 'grid',
                gridTemplateColumns: '60px 2fr 2fr 1fr 40px',
                gap: 'var(--gap)',
                padding: '28px 0',
                borderBottom: '1px solid #ffffff1c',
                alignItems: 'center',
                color: KAART.cream,
                transition: 'background 0.25s, padding 0.25s',
                position: 'relative',
              }}
                onMouseEnter={e => {
                  setHover(i);
                  e.currentTarget.style.background = '#ffffff04';
                  e.currentTarget.style.paddingLeft = '14px';
                  e.currentTarget.style.paddingRight = '14px';
                }}
                onMouseLeave={e => {
                  setHover(null);
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.paddingLeft = '0';
                  e.currentTarget.style.paddingRight = '0';
                }}
              >
                <span className="mono" style={{ fontSize: 11, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.12em' }}>0{i+1}</span>
                <span className="serif" style={{ fontSize: 'clamp(24px, 2.6vw, 36px)', letterSpacing: '-0.012em' }}>{p.name}</span>
                <span style={{ fontSize: 14.5, color: '#a4afa9' }}>{p.kind}</span>
                <span className="serif italic" style={{ fontSize: 22, color: KAART.green, textAlign: 'right' }}>{p.metric}</span>
                <span style={{ textAlign: 'right', fontSize: 18, color: hover === i ? KAART.green : '#7d8a83', transition: 'color 0.25s, transform 0.25s', transform: hover === i ? 'translateX(4px)' : 'translateX(0)' }}>↗</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="reveal" style={{ marginTop: 50, display: 'flex', justifyContent: 'flex-end' }}>
          <a href="#contact" className="btn" style={{ background: KAART.green, color: '#0a100d', fontSize: 15 }}>Talk about your store <span className="arr">→</span></a>
        </div>
      </div>
    </section>
  );
}

/* === PROCESS === */
const KAART_PROCESS = [
  { n: '01', t: 'Audit', d: 'A free 30-minute store teardown. We tell you what we\'d fix in 90 days.', dur: 'Day 1' },
  { n: '02', t: 'Scope', d: 'Paid 1-week deep-dive. Architecture, design direction, fixed quote.', dur: 'Week 1' },
  { n: '03', t: 'Build', d: 'Friday demos, no surprise invoices. Theme/headless/UGC engine ships in increments.', dur: 'Week 2–8' },
  { n: '04', t: 'Run', d: 'Optional monthly retainer: ad ops, email, merchandising, CRO. We babysit the engine.', dur: 'Ongoing' },
];

function KaartProcess() {
  const [active, setActive] = React.useState(0);
  return (
    <section id="process" style={{ background: KAART.cream, color: KAART.ink, padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <span className="mono" style={{ fontSize: 11, color: KAART.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span style={{ color: KAART.green }}>§04</span>&nbsp;&nbsp;How an engagement runs
            </span>
          </div>
          <h2 className="h2" style={{ gridColumn: 'span 8' }}>
            From audit to <span className="italic" style={{ color: KAART.green }}>ongoing.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', alignItems: 'flex-start' }}>
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {KAART_PROCESS.map((p, i) => (
              <button key={p.n}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '50px 1fr auto',
                  alignItems: 'center', gap: 16,
                  padding: '22px 18px',
                  border: 'none',
                  borderTop: i === 0 ? '1px solid #0e141122' : 'none',
                  borderBottom: '1px solid #0e141122',
                  background: active === i ? KAART.ink : 'transparent',
                  color: active === i ? KAART.cream : KAART.ink,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s',
                  borderRadius: 0,
                }}
              >
                <span className="mono" style={{ fontSize: 11, color: active === i ? KAART.green : '#5a6760', letterSpacing: '0.12em' }}>§{p.n}</span>
                <span className="serif" style={{ fontSize: 'clamp(22px, 2.4vw, 32px)' }}>{p.t}</span>
                <span className="mono" style={{ fontSize: 11, color: active === i ? '#7d8a83' : '#5a6760', letterSpacing: '0.12em' }}>{p.dur}</span>
              </button>
            ))}
          </div>

          <div style={{ gridColumn: 'span 7', padding: 'clamp(28px, 4vw, 56px)', background: '#fdfcf6', border: '1px solid #0e141122', borderRadius: 6, minHeight: 320 }}>
            <div className="mono" style={{ fontSize: 11, color: KAART.green, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Step {KAART_PROCESS[active].n} · {KAART_PROCESS[active].dur}
            </div>
            <div className="serif" key={active} style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginTop: 14, fontStyle: 'italic', animation: 'reveal-up 0.45s ease' }}>
              {KAART_PROCESS[active].t}
            </div>
            <p className="body-lg" style={{ marginTop: 22, maxWidth: '40ch' }}>
              {KAART_PROCESS[active].d}
            </p>
            <div style={{ marginTop: 40, display: 'flex', gap: 6 }}>
              {KAART_PROCESS.map((_, i) => (
                <span key={i} style={{
                  height: 4, flex: i === active ? 4 : 1,
                  background: i === active ? KAART.green : '#0e141122',
                  borderRadius: 2,
                  transition: 'flex 0.4s, background 0.4s',
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === PRICING === */
const KAART_PRICING = [
  { name: 'Theme', price: 'from $14k', dur: '4–6 weeks', items: ['Custom Liquid theme', 'Mobile-first design', 'Up to 8 templates', 'Performance budget'], hi: false },
  { name: 'Headless', price: 'from $48k', dur: '8–14 weeks', items: ['Hydrogen / Next storefront', 'Headless CMS integration', 'Edge deployment', 'Sub-1s LCP target'], hi: true },
  { name: 'Run', price: 'from $9k/mo', dur: 'monthly retainer', items: ['Klaviyo + flows', 'Paid social ops', 'Merchandising & CRO', 'UGC content engine'], hi: false },
];

function KaartPricing() {
  return (
    <section id="pricing" style={{ background: '#fdfcf6', color: KAART.ink, padding: 'clamp(70px, 10vw, 130px) 0', borderTop: '1px solid #0e141122' }}>
      <div className="container">
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <span className="mono" style={{ fontSize: 11, color: KAART.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span style={{ color: KAART.green }}>§05</span>&nbsp;&nbsp;What it costs
            </span>
          </div>
          <h2 className="h2" style={{ gridColumn: 'span 8' }}>
            Honest pricing. <span className="italic" style={{ color: KAART.green }}>Up front.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap)' }}>
          {KAART_PRICING.map((p, i) => (
            <div key={p.name} className="reveal lift" style={{
              '--i': i,
              padding: 'clamp(28px, 3vw, 40px)',
              borderRadius: 6,
              background: p.hi ? KAART.ink : KAART.cream,
              color: p.hi ? KAART.cream : KAART.ink,
              border: p.hi ? '1px solid ' + KAART.green : '1px solid #0e141122',
              display: 'flex', flexDirection: 'column', gap: 20,
              position: 'relative',
            }}>
              {p.hi && <span className="mono" style={{
                position: 'absolute', top: -10, left: 28,
                background: KAART.green, color: '#0a100d',
                padding: '4px 10px', borderRadius: 4,
                fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>Most chosen</span>}
              <div className="mono" style={{ fontSize: 11, color: p.hi ? KAART.green : KAART.greenDeep, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.dur}</div>
              <div>
                <div className="serif" style={{ fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1, fontStyle: 'italic' }}>{p.name}</div>
                <div className="serif" style={{ fontSize: 28, marginTop: 12, color: p.hi ? '#a4afa9' : '#5a6760' }}>{p.price}</div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, borderTop: p.hi ? '1px solid #ffffff22' : '1px solid #0e141122' }}>
                {p.items.map(it => (
                  <li key={it} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 14.5 }}>
                    <span style={{ color: KAART.green }}>→</span>{it}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn" style={{
                marginTop: 'auto',
                background: p.hi ? KAART.green : KAART.ink,
                color: p.hi ? '#0a100d' : KAART.cream,
                fontSize: 14, justifyContent: 'center',
              }}>Brief us <span className="arr">→</span></a>
            </div>
          ))}
        </div>

        <p className="reveal small" style={{ marginTop: 32, color: '#5a6760', textAlign: 'center' }}>
          White-label engagements & agency partnerships available — <a href="#contact" className="u-link" style={{ color: KAART.greenDeep }}>get in touch</a>.
        </p>
      </div>
    </section>
  );
}

/* === TESTIMONIAL CAROUSEL === */
const KAART_QUOTES = [
  { q: 'Kaart shipped a Hydrogen rebuild that out-performed our agency\'s six-month attempt — in nine weeks. Conversion is up 38%, page weight down 60%.', who: 'Maya Olsen', role: 'Head of Digital · Lumen Outfitters' },
  { q: 'They are the only Shopify partner I\'ve worked with who can run dev, design, AND social without dropping a thread. Our retention manager wants to clone them.', who: 'Daniel Reyes', role: 'Founder · Maris & Co.' },
  { q: 'We white-label Kaart on three of our agency clients. Senior, accountable, and they make us look good.', who: 'Karina Patel', role: 'CEO · Bright Studio (agency partner)' },
];

function KaartTestimonials() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % KAART_QUOTES.length), 6500);
    return () => clearInterval(t);
  }, []);
  const cur = KAART_QUOTES[i];
  return (
    <section style={{ background: KAART.green, color: '#04261a', padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <span className="mono" style={{ fontSize: 11, color: '#04261a', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            §06&nbsp;&nbsp;Clients · in their own words
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {KAART_QUOTES.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Quote ${idx+1}`} style={{
                width: idx === i ? 32 : 12, height: 4,
                border: 'none', cursor: 'pointer',
                background: idx === i ? '#04261a' : '#04261a44',
                transition: 'all 0.4s', borderRadius: 2,
              }} />
            ))}
          </div>
        </div>

        <blockquote key={i} style={{ animation: 'reveal-up 0.5s ease' }}>
          <p className="serif" style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.1, letterSpacing: '-0.018em', maxWidth: '24ch' }}>
            &ldquo;{cur.q}&rdquo;
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 44, height: 1, background: '#04261a' }} />
            <div>
              <div className="serif italic" style={{ fontSize: 20 }}>{cur.who}</div>
              <div className="mono" style={{ fontSize: 11, color: '#04261acc', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>{cur.role}</div>
            </div>
          </div>
        </blockquote>
      </div>
    </section>
  );
}

/* === FAQ === */
const KAART_FAQS = [
  { q: 'Do you only work on Shopify?', a: 'Yes. Kaart is a Shopify-only studio. If you need software or non-commerce work, our parent studio Crestify covers that.' },
  { q: 'Can you white-label for our agency?', a: 'Often. We white-label for roughly twelve agencies. NDA, shared Slack, and we never go around you to your client.' },
  { q: 'How fast can you start?', a: 'Audit calls within the week. Paid scoping starts in 7–10 days. Builds typically begin 2–3 weeks after sign-off.' },
  { q: 'Do you handle ads & content too?', a: 'Yes — that\'s the "Run" engagement. Klaviyo lifecycle, Meta + TikTok ad ops, UGC creation, and merchandising all run by the same team that built the store.' },
  { q: 'What if I just need a quick fix?', a: 'We do focused 1–2 week sprints for performance, conversion, or migration cleanup. Email and we\'ll quote within 48 hours.' },
];

function KaartFAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ background: KAART.cream, color: KAART.ink, padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 40 }}>
          <div style={{ gridColumn: 'span 4' }}>
            <span className="mono" style={{ fontSize: 11, color: KAART.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span style={{ color: KAART.green }}>§07</span>&nbsp;&nbsp;Asked often
            </span>
          </div>
          <h2 className="h2" style={{ gridColumn: 'span 8' }}>
            Quick <span className="italic" style={{ color: KAART.green }}>answers.</span>
          </h2>
        </div>

        <div style={{ borderTop: '1px solid #0e141122' }}>
          {KAART_FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="reveal" style={{ '--i': i }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '24px 0', border: 'none', background: 'transparent',
                  borderBottom: '1px solid #0e141122',
                  cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                    <span className="serif" style={{ fontSize: 'clamp(20px, 2vw, 26px)', color: KAART.ink, lineHeight: 1.2 }}>{f.q}</span>
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: isOpen ? KAART.green : 'transparent',
                      border: '1px solid ' + (isOpen ? KAART.green : '#0e141133'),
                      color: isOpen ? '#04261a' : KAART.ink,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, transition: 'all 0.25s',
                      flexShrink: 0,
                    }}>{isOpen ? '–' : '+'}</span>
                  </div>
                  <div style={{
                    maxHeight: isOpen ? 200 : 0,
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease, margin 0.3s',
                    marginTop: isOpen ? 12 : 0,
                  }}>
                    <p className="body" style={{ fontSize: 15.5, color: '#1f2925', maxWidth: '60ch' }}>{f.a}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* === CONTACT CTA === */
function KaartContact() {
  return (
    <section id="contact" style={{
      background: KAART.ink, color: KAART.cream,
      padding: 'clamp(80px, 12vw, 160px) 0',
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 80% 20%, ${KAART.green}22, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <span className="mono reveal" style={{ fontSize: 11, color: KAART.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          §08&nbsp;&nbsp;Brief us
        </span>
        <h2 className="display reveal" style={{
          color: KAART.cream, marginTop: 22,
          fontSize: 'clamp(56px, 9vw, 140px)', maxWidth: '14ch',
        }}>
          Got a Shopify <span className="italic" style={{ color: KAART.green }}>problem?</span>
        </h2>
        <p className="body-lg reveal" style={{ color: '#a4afa9', marginTop: 28, maxWidth: '52ch' }}>
          Tell us your URL and what's broken — speed, conversion, retention, or just an old theme that\'s aged out. We&rsquo;ll send back an audit within 48 hours, free.
        </p>
        <div className="reveal" style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="mailto:hello@kaart.studio" className="btn" style={{ background: KAART.green, color: '#04261a', fontSize: 16, padding: '18px 28px' }}>
            hello@kaart.studio <span className="arr">→</span>
          </a>
          <a href="contact.html" className="btn" style={{ border: '1px solid #ffffff44', color: KAART.cream, fontSize: 16, padding: '18px 28px' }}>
            Or use the Crestify brief form
          </a>
        </div>

        <div className="reveal" style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap)', paddingTop: 40, borderTop: '1px solid #ffffff1c' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Studio</div>
            <p className="body" style={{ color: '#cfd5d2', marginTop: 8, fontSize: 14.5 }}>Toronto · London · async-first</p>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Parent</div>
            <p className="body" style={{ marginTop: 8, fontSize: 14.5 }}>
              <a href="index.html" className="u-link" style={{ color: KAART.green }}>Crestify Studio ↗</a>
            </p>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Elsewhere</div>
            <p className="body" style={{ color: '#cfd5d2', marginTop: 8, fontSize: 14.5, display: 'flex', gap: 12 }}>
              <a href="#" className="u-link">Instagram ↗</a>
              <a href="#" className="u-link">TikTok ↗</a>
              <a href="#" className="u-link">LinkedIn ↗</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === MARQUEE BAND === */
function KaartBand() {
  const items = ['Shopify Plus', '40+ stores shipped', 'Headless ready', 'Klaviyo expert', 'UGC engine', 'Agency white-label', 'Toronto · London'];
  const arr = [...items, ...items, ...items];
  return (
    <div style={{ background: KAART.green, color: '#04261a', padding: '14px 0', overflow: 'hidden' }}>
      <div className="marquee">
        <div className="marquee-track" style={{ fontFamily: 'var(--mono)', fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.18em', animationDuration: '50s' }}>
          {arr.map((t, i) => <span key={i}>{t} <span style={{ color: '#04261a99' }}>✦</span></span>)}
        </div>
        <div className="marquee-track" aria-hidden style={{ fontFamily: 'var(--mono)', fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.18em', animationDuration: '50s' }}>
          {arr.map((t, i) => <span key={i}>{t} <span style={{ color: '#04261a99' }}>✦</span></span>)}
        </div>
      </div>
    </div>
  );
}

/* === FOOTER === */
function KaartFooter() {
  return (
    <footer style={{ background: '#04100a', color: '#a4afa9', padding: 'clamp(50px, 7vw, 80px) var(--pad) 28px' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <div className="serif" style={{ fontSize: 'clamp(80px, 16vw, 240px)', lineHeight: 0.85, color: KAART.cream, fontStyle: 'italic', letterSpacing: '-0.04em' }}>kaart*</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingTop: 24, borderTop: '1px solid #ffffff1c', flexWrap: 'wrap', gap: 16 }}>
          <span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>© Kaart Studio · A <a href="index.html" style={{ color: KAART.green }} className="u-link">Crestify</a> studio</span>
          <span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Shopify-only · 40+ stores · Booking 2026</span>
        </div>
      </div>
    </footer>
  );
}

function KaartPage() {
  return (
    <div className="page" style={{ background: KAART.cream }}>
      <KaartNav />
      <KaartHero />
      <KaartBand />
      <KaartStats />
      <KaartServices />
      <KaartWork />
      <KaartProcess />
      <KaartTestimonials />
      <KaartPricing />
      <KaartFAQ />
      <KaartContact />
      <KaartFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<KaartPage />);
