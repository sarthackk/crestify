// Work.jsx — case studies index

const CASE_STUDIES = [
  {
    n: '01', client: 'Lumen Outfitters', sector: 'E-commerce / Apparel',
    year: '2025',
    headline: 'Replatformed a 9-figure apparel brand in 11 weeks.',
    summary: 'Migrated 240k SKUs and 11 international storefronts off legacy Magento onto Shopify Hydrogen — without freezing the merch calendar.',
    metrics: [{ k: '+38%', v: 'Conversion rate' }, { k: '−62%', v: 'Page load' }, { k: '11 wks', v: 'Total build' }],
    tag: 'Replatform', size: 'large',
  },
  {
    n: '02', client: 'Hatchwell', sector: 'B2B SaaS / Logistics',
    year: '2024',
    headline: 'Built the AI ops layer behind a logistics unicorn.',
    summary: 'Greenfield ML inference platform processing 12M routing decisions a day across 14 regions.',
    metrics: [{ k: '12M/day', v: 'Inference req' }, { k: '99.97%', v: 'Uptime' }, { k: '$11M', v: 'ARR enabled' }],
    tag: 'Platform', size: 'medium', dark: true,
  },
  {
    n: '03', client: 'Maris & Co.', sector: 'E-commerce / Beauty',
    year: '2024',
    headline: 'Rewired the subscription engine. Churn down 41%.',
    summary: 'Replaced a fragmented Recharge + custom-glue setup with a unified subscription, retention, and dunning system.',
    metrics: [{ k: '−41%', v: 'Churn' }, { k: '$4.2M', v: 'ARR saved' }, { k: '8 wks', v: 'Build' }],
    tag: 'Subscriptions', size: 'medium',
  },
  {
    n: '04', client: 'Northwind Supply', sector: 'B2B / Industrial',
    year: '2023',
    headline: 'A B2B portal that finally feels consumer-grade.',
    summary: 'Custom quoting, dealer portal, and ERP integration for a $400M industrial supplier.',
    metrics: [{ k: '4.8/5', v: 'Dealer NPS' }, { k: '−73%', v: 'Quote turnaround' }],
    tag: 'B2B Commerce', size: 'medium',
  },
  {
    n: '05', client: 'Postlab', sector: 'Developer tools',
    year: '2023',
    headline: 'Doubled API throughput while cutting cloud spend in half.',
    summary: 'Rewrote the core ingestion pipeline in Rust. Slashed p99 latency from 840ms to 92ms.',
    metrics: [{ k: '2.1×', v: 'Throughput' }, { k: '−51%', v: 'Cloud cost' }, { k: '92ms', v: 'p99 latency' }],
    tag: 'Performance', size: 'medium', dark: true,
  },
  {
    n: '06', client: 'Aurelia', sector: 'E-commerce / Jewelry',
    year: '2025',
    headline: 'Headless storefront, 3D try-on, sub-second loads.',
    summary: 'Designed and built a flagship headless storefront with WebGL try-on shipped to global stores.',
    metrics: [{ k: '+24%', v: 'AOV' }, { k: '0.8s', v: 'LCP' }, { k: '6 mkts', v: 'Launched' }],
    tag: 'Headless', size: 'large',
  },
];

function HeroWork() {
  return (
    <section style={{ paddingTop: 64, paddingBottom: 'clamp(40px, 6vw, 70px)' }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <Eyebrow index="01">Selected work · 2023–2026</Eyebrow>
        </div>
        <h1 className="display" style={{ maxWidth: '14ch' }}>
          Six projects. <span className="italic" style={{ color: 'var(--ink-3)' }}>One studio.</span>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginTop: 'clamp(40px, 5vw, 60px)' }}>
          <p className="body-lg" style={{ gridColumn: 'span 7', maxWidth: '52ch' }}>
            A small portfolio on purpose. Every project below was led end-to-end by the founders, shipped to production, and is still running.
          </p>
          <div style={{ gridColumn: 'span 5', textAlign: 'right' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>NDA work · not shown</div>
            <div className="serif" style={{ fontSize: 64, lineHeight: 1, marginTop: 6 }}>14+</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Filters() {
  const [active, setActive] = React.useState('All');
  const filters = ['All', 'E-commerce', 'Software / Platform', '2025', '2024', '2023'];
  return (
    <div className="container" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '0 var(--pad) clamp(30px, 4vw, 50px)' }}>
      {filters.map(f => (
        <button key={f}
          onClick={() => setActive(f)}
          className="mono"
          style={{
            padding: '10px 16px',
            border: '1px solid ' + (active === f ? 'var(--ink)' : 'var(--line-strong)'),
            background: active === f ? 'var(--ink)' : 'transparent',
            color: active === f ? 'var(--bg)' : 'var(--ink-2)',
            borderRadius: 999,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >{f}</button>
      ))}
    </div>
  );
}

function CaseGrid() {
  return (
    <section className="section-pad-sm">
      <Filters />
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', rowGap: 'clamp(50px, 7vw, 90px)' }}>
          {CASE_STUDIES.map((c, i) => {
            const span = c.size === 'large' ? 'span 12' : (i % 2 === 0 ? 'span 7' : 'span 5');
            // alternate large rows
            let col = c.size === 'large' ? 'span 12' : 'span 6';
            return (
              <a key={c.n} href="#" className="lift" style={{ gridColumn: col, display: 'block' }}>
                <Placeholder
                  label={`${c.client.toUpperCase()} · ${c.sector}`}
                  dim={c.size === 'large' ? '2400 × 1200' : '1400 × 1100'}
                  ratio={c.size === 'large' ? '24 / 12' : '14 / 11'}
                  dark={c.dark}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 30, marginTop: 22, alignItems: 'flex-start' }}>
                  <div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
                      §{c.n} · {c.year} · {c.tag}
                    </div>
                    <h3 className="serif" style={{ fontSize: 'clamp(24px, 2.4vw, 32px)', lineHeight: 1.12, letterSpacing: '-0.012em', maxWidth: '24ch' }}>{c.headline}</h3>
                    <p className="body" style={{ marginTop: 12, fontSize: 15, maxWidth: '52ch' }}>{c.summary}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 18, paddingTop: 4 }}>
                    {c.metrics.map(m => (
                      <div key={m.v} style={{ textAlign: 'right' }}>
                        <div className="serif italic" style={{ fontSize: 24, color: 'var(--accent)' }}>{m.k}</div>
                        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{m.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: 'Crestify shipped in three months what our internal team had been arguing about for two years. They fixed the problem and they fixed the team.', who: 'Anika Lowell, CTO · Hatchwell' },
    { q: 'The first agency we\'ve hired where the founder\'s name on the contract is also the name in our git history.', who: 'Marcus Reid, CEO · Maris & Co.' },
  ];
  return (
    <section className="section-pad" style={{ background: 'var(--bg-deep)', color: 'var(--bg)' }}>
      <div className="container">
        <Eyebrow light>What clients say</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(40px, 6vw, 80px)', marginTop: 40 }}>
          {quotes.map(q => (
            <blockquote key={q.who}>
              <p className="serif italic" style={{ fontSize: 'clamp(24px, 2.6vw, 36px)', lineHeight: 1.18, letterSpacing: '-0.012em' }}>
                "{q.q}"
              </p>
              <div className="mono" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 28, paddingTop: 18, borderTop: '1px solid #ffffff22' }}>{q.who}</div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTAwork() {
  return (
    <section style={{ background: 'var(--accent)', color: 'white', padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <Eyebrow light>Your project · next</Eyebrow>
        <h2 className="display" style={{ color: 'white', marginTop: 18, fontSize: 'clamp(56px, 9vw, 140px)', maxWidth: '14ch' }}>
          Be the <span className="italic">07.</span>
        </h2>
        <a href="contact.html" className="btn" style={{ background: '#fff', color: 'var(--accent)', fontSize: 16, padding: '18px 28px', marginTop: 32 }}>
          Start a project <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
}

function WorkPage() {
  return (
    <div className="page">
      <Nav active="work" />
      <HeroWork />
      <CaseGrid />
      <Testimonials />
      <ContactCTAwork />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<WorkPage />);
