// Home.jsx — sections for the home page

function HeroHome() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString('en-US', { hour12: false }) + ' UTC';

  return (
    <section style={{ position: 'relative', paddingTop: 64, paddingBottom: 'clamp(60px, 9vw, 110px)' }}>
      <div className="container">
        <a href="kaart.html" className="reveal" style={{
          display: 'inline-flex', alignItems: 'center', gap: 14,
          padding: '8px 8px 8px 18px',
          border: '1px solid var(--line-strong)',
          borderRadius: 999,
          marginBottom: 32,
          fontFamily: 'var(--mono)', fontSize: 11,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          background: 'var(--bg-elev)',
          transition: 'border-color 0.2s, transform 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#0d9b6a'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line-strong)'}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0d9b6a' }} />
          <span style={{ color: 'var(--ink-3)' }}>New · Shopify-only studio</span>
          <span style={{ color: 'var(--ink)' }}>Visit Kaart Studio</span>
          <span style={{
            background: '#0d9b6a', color: 'white',
            padding: '6px 12px', borderRadius: 999,
          }}>Explore →</span>
        </a>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 56, gap: 24, flexWrap: 'wrap' }}>
          <Eyebrow index="01">Solution-first studio · est. 2021</Eyebrow>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            ● Available · Q3 2026 · {time}
          </span>
        </div>

        <h1 className="display reveal" style={{ maxWidth: '14ch' }}>
          We build the<br />
          <span className="italic" style={{ color: 'var(--ink-3)' }}>thing</span>, not the deck.
        </h1>

        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--gap)',
          marginTop: 'clamp(40px, 6vw, 80px)',
          alignItems: 'end',
        }}>
          <p className="body-lg" style={{ gridColumn: 'span 6', maxWidth: '46ch' }}>
            Crestify is a founder-led execution studio operating across <em className="serif italic">e-commerce</em> and <em className="serif italic">software systems</em>. Small teams. Close to the problem. Owners of the outcome.
          </p>
          <div style={{ gridColumn: 'span 6', display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <a href="contact.html" className="btn btn-primary">
              Start a project <span className="arr">→</span>
            </a>
            <a href="work.html" className="btn btn-ghost">
              See selected work
            </a>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(60px, 9vw, 110px)' }}>
        <FeatureFilm />
      </div>
    </section>
  );
}

function FeatureFilm() {
  return (
    <div className="container">
      <div style={{
        position: 'relative',
        aspectRatio: '16 / 9',
        background: 'var(--ink)',
        overflow: 'hidden',
        borderRadius: 4,
      }}>
        <div className="placeholder dark" style={{ aspectRatio: '16 / 9', width: '100%', height: '100%' }}>
          <span className="ph-meta">FEATURED · Studio reel 02:14</span>
          <span className="ph-dim">1920 × 1080</span>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: 78, height: 78, borderRadius: '50%',
              border: '1px solid #ffffff44',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)',
              background: '#00000040',
              cursor: 'pointer',
            }}>
              <div style={{
                width: 0, height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '16px solid #fff',
                marginLeft: 4,
              }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 18, gap: 24, flexWrap: 'wrap' }}>
        <div className="serif italic" style={{ fontSize: 22, color: 'var(--ink-2)' }}>
          Inside the studio — 2025 reel
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          02:14 · Watch reel ↗
        </div>
      </div>
    </div>
  );
}

/* ============ HOW WE WORK ============ */
const PRINCIPLES = [
  {
    n: '01',
    title: 'Ownership',
    body: 'We don\'t hand off Jira tickets. Outcomes ship under our name.',
    detail: 'Every engagement has a single accountable lead. No diffusion of responsibility, no hiding behind process.',
  },
  {
    n: '02',
    title: 'Embedded',
    body: 'We sit in your standups, channels, and codebase from day one.',
    detail: 'Async-first when it works, synchronous when it matters. We move at the speed of your team.',
  },
  {
    n: '03',
    title: 'Specialized',
    body: 'Two domains, deeply: e-commerce systems and software platforms.',
    detail: 'Saying no to everything else is what makes us fast at the things we say yes to.',
  },
  {
    n: '04',
    title: 'Partnerships',
    body: 'We build for years, not sprints. Most clients are still here.',
    detail: 'Average partnership: 2.4 years. We\'d rather grow with five teams than churn through fifty.',
  },
];

function HowWeWork() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <Eyebrow index="02">How we work</Eyebrow>
          </div>
          <h2 className="h2 reveal" style={{ gridColumn: 'span 8' }}>
            Four operating principles. <span className="italic" style={{ color: 'var(--ink-3)' }}>No frameworks for sale.</span>
          </h2>
        </div>

        <div style={{ borderTop: '1px solid var(--line-strong)' }}>
          {PRINCIPLES.map((p, i) => {
            const isOpen = open === i;
            return (
              <div key={p.n}
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  borderBottom: '1px solid var(--line-strong)',
                  padding: '28px 0',
                  cursor: 'pointer',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: 'var(--gap)',
                  alignItems: 'start',
                  transition: 'background 0.3s',
                }}
              >
                <div className="mono" style={{ gridColumn: 'span 1', color: 'var(--ink-4)', fontSize: 12, paddingTop: 6 }}>
                  §{p.n}
                </div>
                <div style={{ gridColumn: 'span 4' }}>
                  <h3 className="h3">{p.title}</h3>
                </div>
                <div style={{ gridColumn: 'span 6' }}>
                  <p className="body-lg" style={{ fontSize: 19 }}>{p.body}</p>
                  <div style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? 200 : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease',
                    marginTop: isOpen ? 14 : 0,
                  }}>
                    <p className="body" style={{ fontSize: 14.5 }}>{p.detail}</p>
                  </div>
                </div>
                <div style={{ gridColumn: 'span 1', textAlign: 'right', color: 'var(--ink-3)', fontSize: 22, paddingTop: 4 }}>
                  {isOpen ? '–' : '+'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ SELECTED WORK ============ */
const PROJECTS = [
  {
    n: '01', client: 'Lumen Outfitters', sector: 'E-commerce / D2C',
    headline: 'Replatformed a 9-figure apparel brand in 11 weeks.',
    metric: '+38% conversion', tag: 'Shopify Hydrogen',
  },
  {
    n: '02', client: 'Hatchwell', sector: 'B2B SaaS',
    headline: 'Built the AI ops layer behind a logistics unicorn.',
    metric: '12M req/day', tag: 'Platform engineering',
  },
  {
    n: '03', client: 'Maris & Co.', sector: 'E-commerce / Beauty',
    headline: 'Rewired the subscription engine. Churn down 41%.',
    metric: '$4.2M ARR saved', tag: 'Subscriptions',
  },
];

function SelectedWork() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div style={{ gridColumn: 'span 8' }}>
            <Eyebrow index="03">Selected work</Eyebrow>
            <h2 className="h2 reveal" style={{ marginTop: 16 }}>
              A small portfolio. <span className="italic" style={{ color: 'var(--ink-3)' }}>Loud results.</span>
            </h2>
          </div>
          <div style={{ gridColumn: 'span 4', textAlign: 'right' }}>
            <a href="work.html" className="btn btn-ghost">Browse case studies <span className="arr">→</span></a>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)' }}>
          {PROJECTS.map((p, i) => (
            <a key={p.n} href="work.html" className="lift" style={{
              gridColumn: i === 0 ? 'span 7' : 'span 5',
              display: 'block',
            }}>
              <Placeholder
                label={`${p.client.toUpperCase()} · ${p.sector}`}
                dim={i === 0 ? '1600 × 1100' : '1200 × 1100'}
                ratio={i === 0 ? '7 / 5' : '5 / 5'}
                dark={i === 1}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 18, gap: 18 }}>
                <div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                    {p.n} / {p.tag}
                  </div>
                  <h3 className="h3" style={{ fontSize: 26, maxWidth: '24ch' }}>{p.headline}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>RESULT</div>
                  <div className="serif" style={{ fontSize: 22, fontStyle: 'italic' }}>{p.metric}</div>
                </div>
              </div>
            </a>
          ))}
          {/* second row */}
          <a href="work.html" className="lift" style={{ gridColumn: 'span 12', display: 'block', marginTop: 16 }}>
            <Placeholder label="MARIS & CO. · BEAUTY SUBSCRIPTIONS" dim="2200 × 900" ratio="22 / 9" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 18, gap: 18 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
                  03 / SUBSCRIPTIONS
                </div>
                <h3 className="h3" style={{ fontSize: 26, maxWidth: '40ch' }}>Rewired the subscription engine. Churn down 41%.</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>RESULT</div>
                <div className="serif" style={{ fontSize: 22, fontStyle: 'italic' }}>$4.2M ARR saved</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============ FOUNDERS ============ */
const FOUNDERS = [
  {
    name: 'Aman Verma',
    role: 'Co-founder · Software Systems',
    bio: 'Ex-Stripe & early-stage CTO. 14 years shipping platforms used by tens of millions.',
    creds: ['ex-Stripe', 'ex-Linear', 'YC W19'],
    initials: 'AV',
  },
  {
    name: 'Priya Shah',
    role: 'Co-founder · Commerce',
    bio: 'Built and sold a Shopify Plus agency. Specializes in DTC growth systems and replatforms.',
    creds: ['Shopify Plus Partner', 'ex-Glossier', 'Forbes 30u30'],
    initials: 'PS',
  },
];

function Founders() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{ gridColumn: 'span 5' }}>
            <Eyebrow index="04">Who runs the work</Eyebrow>
            <h2 className="h2 reveal" style={{ marginTop: 16 }}>
              Founder-led, <span className="italic" style={{ color: 'var(--ink-3)' }}>end to end.</span>
            </h2>
          </div>
          <p className="body-lg" style={{ gridColumn: 'span 7', maxWidth: '54ch' }}>
            The people who pitched the work are the people doing the work. Two operators with deep domain reps — not a sales team handing you off to juniors after the contract.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gap)' }}>
          {FOUNDERS.map(f => (
            <article key={f.name} style={{
              border: '1px solid var(--line-strong)',
              padding: 'clamp(24px, 3vw, 40px)',
              borderRadius: 4,
              background: 'var(--bg-elev)',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}>
              <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{
                  width: 88, height: 88, borderRadius: '50%',
                  background: 'var(--ink)', color: 'var(--bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--serif)', fontSize: 32, fontStyle: 'italic',
                  flexShrink: 0,
                }}>{f.initials}</div>
                <div>
                  <h3 className="h3" style={{ fontSize: 28 }}>{f.name}</h3>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>{f.role}</div>
                </div>
              </div>
              <p className="body" style={{ fontSize: 16, color: 'var(--ink-2)' }}>{f.bio}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {f.creds.map(c => <span key={c} className="tag">{c}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                <a href="#" className="small" style={{ textDecoration: 'underline' }}>LinkedIn ↗</a>
                <a href="#" className="small" style={{ textDecoration: 'underline' }}>Read.cv ↗</a>
                <a href="#" className="small" style={{ textDecoration: 'underline' }}>Email ↗</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ STATS BAR ============ */
function StatsBar() {
  const stats = [
    { n: '7+',  l: 'Years operating' },
    { n: '40+', l: 'Shipped engagements' },
    { n: '11+', l: 'Industries served' },
    { n: '92%', l: 'Client retention' },
  ];
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(50px, 7vw, 90px) 0', borderTop: '1px solid var(--line-strong)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--gap)' }}>
        {stats.map(s => (
          <div key={s.l}>
            <div className="serif" style={{ fontSize: 'clamp(56px, 7vw, 96px)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>{s.n}</div>
            <div className="mono" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 12 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ INTERNAL PRODUCTS ============ */
const PRODUCTS = [
  { name: 'Vyssel', desc: 'Headless commerce orchestration for niche DTC.', meta: 'Live · 2024' },
  { name: 'Bracelet', desc: 'AI fulfillment ops for Shopify Plus stores.', meta: 'Beta · 2026' },
  { name: 'Doctyn', desc: 'Internal docs platform for engineering teams.', meta: 'Live · 2023' },
];

function InternalProducts() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{ gridColumn: 'span 5' }}>
            <Eyebrow index="05">Internal products</Eyebrow>
            <h2 className="h2 reveal" style={{ marginTop: 16 }}>
              We eat <span className="italic" style={{ color: 'var(--ink-3)' }}>our own cooking.</span>
            </h2>
          </div>
          <p className="body-lg" style={{ gridColumn: 'span 7', maxWidth: '52ch' }}>
            Three products built and run by the studio — each one a forcing function for the standards we hold client work to.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap)' }}>
          {PRODUCTS.map(p => (
            <a key={p.name} href="#" className="lift" style={{ display: 'block' }}>
              <Placeholder label={p.name.toUpperCase()} dim="800 × 600" ratio="4 / 3" dark />
              <div style={{ marginTop: 18 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>{p.meta}</div>
                <div className="serif" style={{ fontSize: 28 }}>{p.name}</div>
                <p className="body" style={{ marginTop: 6 }}>{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CONTACT CTA ============ */
function ContactCTA() {
  return (
    <section style={{ background: 'var(--accent)', color: 'white', padding: 'clamp(70px, 10vw, 140px) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', alignItems: 'end' }}>
          <div style={{ gridColumn: 'span 8' }}>
            <Eyebrow index="06" light>Let's create</Eyebrow>
            <h2 className="display" style={{ color: 'white', marginTop: 18, fontSize: 'clamp(56px, 9vw, 140px)' }}>
              Something <span className="italic">lasting.</span>
            </h2>
            <p className="body-lg" style={{ color: '#ffffffd9', marginTop: 24, maxWidth: '46ch' }}>
              Tell us where you're stuck — replatforming, scaling infra, building a product from zero. We'll tell you in 48 hours whether we're the right team.
            </p>
          </div>
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
            <a href="contact.html" className="btn" style={{ background: '#fff', color: 'var(--accent)', fontSize: 16, padding: '18px 28px' }}>
              Start a project <span className="arr">→</span>
            </a>
            <a href="mailto:hello@crestify.co" className="mono" style={{ color: '#ffffffcc', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              hello@crestify.co
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ TICKER ============ */
function Ticker() {
  const items = ['Solution-first', 'Founder-led', 'Embedded', 'E-commerce systems', 'Software platforms', 'Built to last', 'Small teams · Loud results'];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="ticker">
      <div className="marquee">
        <div className="marquee-track">
          {repeated.map((t, i) => (
            <span key={i}>{t} <span className="ticker-dot">●</span></span>
          ))}
        </div>
        <div className="marquee-track" aria-hidden>
          {repeated.map((t, i) => (
            <span key={i}>{t} <span className="ticker-dot">●</span></span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ====== Page assembly ====== */
function HomePage() {
  return (
    <div className="page">
      <Nav active="home" />
      <HeroHome />
      <Ticker />
      <HowWeWork />
      <SelectedWork />
      <Founders />
      <StatsBar />
      <InternalProducts />
      <ContactCTA />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HomePage />);
