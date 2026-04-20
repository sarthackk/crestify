// About.jsx — about page

function HeroAbout() {
  return (
    <section style={{ paddingTop: 64, paddingBottom: 'clamp(50px, 7vw, 90px)' }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <Eyebrow index="01">About the studio</Eyebrow>
        </div>

        <h1 className="display" style={{ maxWidth: '14ch' }}>
          A studio of <span className="italic" style={{ color: 'var(--ink-3)' }}>operators,</span><br />
          not consultants.
        </h1>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 80px)', alignItems: 'start',
        }}>
          <div style={{ gridColumn: 'span 4' }}>
            <Eyebrow>Started in</Eyebrow>
            <div className="serif" style={{ fontSize: 56, marginTop: 8, lineHeight: 1 }}>2021</div>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <p className="body-lg" style={{ maxWidth: '52ch' }}>
              Crestify was started by two operators tired of agencies that spec'd things they wouldn't ship themselves. We took the model apart and rebuilt it around a single rule: <em className="serif italic">the people who pitch the work do the work.</em>
            </p>
            <p className="body-lg" style={{ marginTop: 18, color: 'var(--ink-3)', maxWidth: '52ch' }}>
              Five years in, we're a tight team of senior practitioners across software and commerce. No juniors warming chairs. No outsourced delivery. No frameworks for sale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Big quote === */
function ManifestoQuote() {
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(80px, 12vw, 160px) 0' }}>
      <div className="container">
        <Eyebrow light>Manifesto · 03 lines</Eyebrow>
        <p className="serif" style={{
          fontSize: 'clamp(36px, 6vw, 88px)',
          lineHeight: 1.04,
          letterSpacing: '-0.018em',
          marginTop: 32,
          maxWidth: '20ch',
        }}>
          Strategy is cheap. <span className="italic" style={{ color: '#7c7a73' }}>Execution is everything.</span> We optimize for the second one.
        </p>
        <div style={{ marginTop: 56, display: 'flex', gap: 24, alignItems: 'center', color: '#9c9b95' }}>
          <div style={{ width: 48, height: 1, background: '#9c9b9555' }} />
          <span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>The founders</span>
        </div>
      </div>
    </section>
  );
}

/* === Timeline === */
const TIMELINE = [
  { y: '2021', t: 'Founded', d: 'Aman & Priya leave operator roles to start Crestify. First three engagements signed in 90 days.' },
  { y: '2022', t: 'First replatform', d: 'Lumen Outfitters migration ships. Establishes the studio\'s commerce practice.' },
  { y: '2023', t: 'Doctyn launches', d: 'First internal product released — engineering documentation tool now used by 400+ teams.' },
  { y: '2024', t: 'Vyssel launches', d: 'Headless commerce orchestration platform spun out of repeated client patterns.' },
  { y: '2025', t: 'Team of 11', d: 'Studio scales to eleven senior operators across two continents. Still founder-led on every project.' },
  { y: '2026', t: 'Bracelet beta', d: 'AI fulfillment ops opens to closed beta with 30 Shopify Plus partners.' },
];

function Timeline() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <Eyebrow index="02">Five years in</Eyebrow>
          </div>
          <h2 className="h2" style={{ gridColumn: 'span 8' }}>
            A short history. <span className="italic" style={{ color: 'var(--ink-3)' }}>Built deliberately.</span>
          </h2>
        </div>

        <div style={{ borderTop: '1px solid var(--line-strong)' }}>
          {TIMELINE.map((row, i) => (
            <div key={row.y} style={{
              display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'var(--gap)', padding: '24px 0',
              borderBottom: '1px solid var(--line-strong)',
              alignItems: 'baseline',
            }}>
              <div className="serif" style={{ gridColumn: 'span 2', fontSize: 40, color: 'var(--ink-3)' }}>{row.y}</div>
              <div className="serif" style={{ gridColumn: 'span 4', fontSize: 28, fontStyle: 'italic' }}>{row.t}</div>
              <p className="body" style={{ gridColumn: 'span 6', fontSize: 16, color: 'var(--ink-2)' }}>{row.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Founders Detailed === */
const FOUNDERS_LONG = [
  {
    name: 'Aman Verma',
    initials: 'AV',
    role: 'Co-founder · Software Systems',
    location: 'Toronto · GMT-5',
    bio: 'Spent 14 years building backend infrastructure for fintech and developer tools. Lead engineer for Stripe\'s payments-routing rewrite. Founding CTO of two seed-stage companies before Crestify.',
    focus: ['Platform engineering', 'Distributed systems', 'AI infrastructure', 'Developer tooling'],
    quote: 'Most of what slows companies down is technical debt nobody named. We name it, then we fix it.',
    creds: ['ex-Stripe', 'ex-Linear', 'YC W19', 'Author of \'Quiet Systems\''],
  },
  {
    name: 'Priya Shah',
    initials: 'PS',
    role: 'Co-founder · Commerce',
    location: 'London · GMT+0',
    bio: 'Operated and exited a Shopify Plus agency by 28. Has personally led 60+ DTC replatforms across apparel, beauty, and CPG. Advisor to four nine-figure brands.',
    focus: ['Headless commerce', 'Subscriptions', 'CRO & growth systems', 'Replatforming'],
    quote: 'Brands don\'t lose to competitors. They lose to the friction in their own checkout.',
    creds: ['Shopify Plus Partner', 'ex-Glossier', 'Forbes 30u30', 'NYT contributor'],
  },
];

function FoundersDetailed() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <Eyebrow index="03">The founders</Eyebrow>
          </div>
          <h2 className="h2" style={{ gridColumn: 'span 8' }}>
            The people <span className="italic" style={{ color: 'var(--ink-3)' }}>doing the work.</span>
          </h2>
        </div>

        {FOUNDERS_LONG.map((f, i) => (
          <article key={f.name} style={{
            display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--gap)', padding: 'clamp(40px, 5vw, 64px) 0',
            borderTop: '1px solid var(--line-strong)',
            borderBottom: i === FOUNDERS_LONG.length - 1 ? '1px solid var(--line-strong)' : 'none',
          }}>
            {/* Photo + identity */}
            <div style={{ gridColumn: 'span 4' }}>
              <div style={{
                aspectRatio: '4 / 5',
                background: 'var(--ink)',
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
              }}>
                <div className="placeholder dark" style={{ width: '100%', height: '100%' }}>
                  <div style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 96, fontStyle: 'italic',
                    color: '#3a3a3a',
                  }}>{f.initials}</div>
                  <span className="ph-meta">PORTRAIT · {f.name}</span>
                  <span className="ph-dim">800 × 1000</span>
                </div>
              </div>
              <div style={{ marginTop: 18 }}>
                <div className="serif" style={{ fontSize: 32 }}>{f.name}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 6 }}>{f.role}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>● {f.location}</div>
              </div>
            </div>

            {/* Body */}
            <div style={{ gridColumn: 'span 8' }}>
              <p className="serif" style={{
                fontSize: 'clamp(24px, 2.6vw, 38px)',
                lineHeight: 1.18, letterSpacing: '-0.012em',
                fontStyle: 'italic',
                color: 'var(--ink)',
                maxWidth: '24ch',
              }}>
                "{f.quote}"
              </p>
              <p className="body" style={{ fontSize: 16.5, color: 'var(--ink-2)', marginTop: 28, maxWidth: '60ch' }}>
                {f.bio}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 36 }}>
                <div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Focus areas</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {f.focus.map(x => (
                      <li key={x} className="serif" style={{ fontSize: 19 }}>— {x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Background</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {f.creds.map(c => <span key={c} className="tag">{c}</span>)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 18, marginTop: 32 }}>
                <a href="#" className="small" style={{ textDecoration: 'underline' }}>LinkedIn ↗</a>
                <a href="#" className="small" style={{ textDecoration: 'underline' }}>Read.cv ↗</a>
                <a href="#" className="small" style={{ textDecoration: 'underline' }}>Email ↗</a>
                <a href="#" className="small" style={{ textDecoration: 'underline' }}>Read essays ↗</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* === Stats === */
function StatsAbout() {
  const stats = [
    { n: '7+',  l: 'Years operating' },
    { n: '40+', l: 'Engagements shipped' },
    { n: '11',  l: 'Senior operators' },
    { n: '92%', l: 'Client retention' },
    { n: '2.4y',l: 'Avg. partnership' },
    { n: '3',   l: 'Internal products' },
  ];
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div className="container">
        <Eyebrow light>By the numbers</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 'var(--gap)', marginTop: 40 }}>
          {stats.map(s => (
            <div key={s.l}>
              <div className="serif" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>{s.n}</div>
              <div className="mono" style={{ fontSize: 10.5, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 12 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Trusted by (logo wall) === */
const CLIENTS = [
  'LUMEN', 'HATCHWELL', 'MARIS', 'NORTHWIND', 'OBLIQUE', 'CASCADIA',
  'AURELIA', 'POSTLAB', 'TRYHARD', 'KINSEY', 'RILEY/CO', 'VANTA',
];
function Clients() {
  return (
    <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="dot-divider" style={{ marginBottom: 32 }}>Trusted by — selected partners</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 0,
          border: '1px solid var(--line-strong)',
          borderRadius: 4,
          overflow: 'hidden',
        }}>
          {CLIENTS.map((c, i) => (
            <div key={c} style={{
              padding: '34px 14px',
              borderRight: (i + 1) % 6 === 0 ? 'none' : '1px solid var(--line-strong)',
              borderBottom: i < 6 ? '1px solid var(--line-strong)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--serif)', fontSize: 22,
              color: 'var(--ink-3)',
              letterSpacing: '0.04em',
            }}>{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === FAQ === */
const FAQS = [
  { q: 'How is Crestify different from a typical agency?', a: 'No sales team, no juniors. The two founders pitch the work, scope it, and stay in the build until shipping. Our overhead is intentionally tiny so you pay for senior reps, not coordination.' },
  { q: 'Do you take equity or only cash engagements?', a: 'Both. For early-stage product builds we sometimes take a small equity component alongside reduced cash. Mature companies pay standard retainers or fixed-bid project fees.' },
  { q: 'What\'s the smallest engagement you\'ll take?', a: 'Two weeks for an audit or strategy spike. Anything smaller and we can\'t do it well. Build engagements typically run 6–16 weeks.' },
  { q: 'Will I work with the founders or someone else?', a: 'The founders. Always. If we ever bring in a specialist for a sub-domain, we name them up front and stay accountable end-to-end.' },
  { q: 'Where are you located?', a: 'Toronto and London, with an extended team across five timezones. We work async-first but overlap with most North American and European business hours.' },
  { q: 'Do you sign NDAs before the first call?', a: 'Yes. Send one over with your intro email. We\'ll counter-sign within 24 hours.' },
];

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <Eyebrow index="04">Asked often</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16 }}>
              Questions, <span className="italic" style={{ color: 'var(--ink-3)' }}>answered.</span>
            </h2>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <div style={{ borderTop: '1px solid var(--line-strong)' }}>
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={i}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      borderBottom: '1px solid var(--line-strong)',
                      padding: '22px 0',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                      <h3 className="serif" style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', lineHeight: 1.2 }}>{f.q}</h3>
                      <span style={{ fontSize: 22, color: 'var(--ink-3)', flexShrink: 0 }}>{isOpen ? '–' : '+'}</span>
                    </div>
                    <div style={{
                      maxHeight: isOpen ? 240 : 0,
                      opacity: isOpen ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s',
                      marginTop: isOpen ? 14 : 0,
                    }}>
                      <p className="body" style={{ fontSize: 15.5, maxWidth: '60ch' }}>{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCTAabout() {
  return (
    <section style={{ background: 'var(--accent)', color: 'white', padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <Eyebrow light>Let's create</Eyebrow>
        <h2 className="display" style={{ color: 'white', marginTop: 18, fontSize: 'clamp(56px, 9vw, 140px)', maxWidth: '14ch' }}>
          Something <span className="italic">lasting.</span>
        </h2>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <a href="contact.html" className="btn" style={{ background: '#fff', color: 'var(--accent)', fontSize: 16, padding: '18px 28px' }}>
            Start a project <span className="arr">→</span>
          </a>
          <a href="work.html" className="btn" style={{ border: '1px solid #ffffff66', color: '#fff', fontSize: 16, padding: '18px 28px' }}>
            See selected work
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <div className="page">
      <Nav active="about" />
      <HeroAbout />
      <ManifestoQuote />
      <Timeline />
      <FoundersDetailed />
      <StatsAbout />
      <Clients />
      <FAQ />
      <ContactCTAabout />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AboutPage />);
