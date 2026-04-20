// Services.jsx — services page

const SERVICES = [
  {
    n: '01',
    title: 'Commerce systems',
    tag: 'E-commerce',
    summary: 'Replatforms, headless builds, subscriptions, and growth infrastructure for serious DTC brands.',
    deliverables: [
      'Shopify Plus / Hydrogen replatforms',
      'Headless storefronts (Next, Remix)',
      'Subscription engines (Recharge, Stay)',
      'Checkout & CRO optimization',
      'OMS, ERP, and 3PL integrations',
      'Loyalty & retention systems',
    ],
    when: 'You\'ve outgrown Shopify themes, your checkout is leaking conversion, or your stack is held together by Zapier.',
    duration: '6–16 weeks · fixed-bid or retainer',
  },
  {
    n: '02',
    title: 'Software platforms',
    tag: 'SaaS / Infra',
    summary: 'Backend systems, AI infrastructure, and developer-facing products built by people who\'ve shipped at scale.',
    deliverables: [
      'Greenfield product builds (0→1)',
      'Platform engineering & rewrites',
      'AI/ML infrastructure',
      'Developer tooling & SDKs',
      'API design & integrations',
      'Performance & reliability work',
    ],
    when: 'You need a senior team to ship a real system — not a discovery doc — and your in-house team is at capacity.',
    duration: '8–24 weeks · retainer or embedded',
  },
  {
    n: '03',
    title: 'Embedded teams',
    tag: 'Augmentation',
    summary: 'A founder + 1–3 senior operators embedded into your team for a quarter or longer.',
    deliverables: [
      'Daily presence in Slack & standups',
      'Code, design, and PM contributions',
      'Hiring & technical advisory',
      'Roadmap & architecture reviews',
      'Direct executive line to founders',
    ],
    when: 'You\'re a founder or CTO who needs senior shoulder-to-shoulder help — not a vendor relationship.',
    duration: '12 weeks minimum · monthly retainer',
  },
];

function HeroServices() {
  return (
    <section style={{ paddingTop: 64, paddingBottom: 'clamp(50px, 7vw, 90px)' }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <Eyebrow index="01">What we do</Eyebrow>
        </div>
        <h1 className="display" style={{ maxWidth: '14ch' }}>
          Three offers. <span className="italic" style={{ color: 'var(--ink-3)' }}>No menu.</span>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 70px)' }}>
          <p className="body-lg" style={{ gridColumn: 'span 7', maxWidth: '52ch' }}>
            We don't sell logos, decks, or strategy memos. Every engagement ends with something running in production — owned by your team, documented, and yours forever.
          </p>
          <div style={{ gridColumn: 'span 5', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 12 }}>
            <a href="#offers" className="btn btn-ghost">Jump to offers ↓</a>
            <a href="contact.html" className="btn btn-primary">Start a project <span className="arr">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesList() {
  return (
    <section id="offers" className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        {SERVICES.map((s, i) => (
          <article key={s.n} style={{
            display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--gap)', padding: 'clamp(50px, 7vw, 90px) 0',
            borderBottom: '1px solid var(--line-strong)',
            borderTop: i === 0 ? '1px solid var(--line-strong)' : 'none',
          }}>
            <div style={{ gridColumn: 'span 5' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
                §{s.n} / {s.tag}
              </div>
              <h2 className="h1" style={{ fontSize: 'clamp(40px, 5.5vw, 76px)' }}>{s.title}</h2>
              <p className="body-lg" style={{ marginTop: 22, maxWidth: '36ch' }}>{s.summary}</p>

              <div style={{ marginTop: 36, padding: 24, background: 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderRadius: 4 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>When to call us</div>
                <p className="serif italic" style={{ fontSize: 19, lineHeight: 1.3 }}>{s.when}</p>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                  Duration · {s.duration}
                </div>
              </div>
            </div>

            <div style={{ gridColumn: 'span 7' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 18 }}>Capabilities</div>
              <ul style={{ listStyle: 'none', borderTop: '1px solid var(--line-strong)' }}>
                {s.deliverables.map((d, j) => (
                  <li key={d} style={{
                    display: 'grid', gridTemplateColumns: '40px 1fr',
                    padding: '18px 0',
                    borderBottom: '1px solid var(--line-strong)',
                    alignItems: 'center',
                  }}>
                    <span className="mono" style={{ color: 'var(--ink-4)', fontSize: 11 }}>0{j+1}</span>
                    <span className="serif" style={{ fontSize: 22 }}>{d}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 30, display: 'flex', gap: 12 }}>
                <a href="contact.html" className="btn btn-primary">Brief us on this <span className="arr">→</span></a>
                <a href="work.html" className="btn btn-ghost">See related work</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* === Process === */
const PROCESS = [
  { n: '01', t: 'Intro call', d: '30 minutes with both founders. We listen first, then tell you whether we\'re a fit.', dur: 'Week 1' },
  { n: '02', t: 'Scoping spike', d: 'A paid 1–2 week deep-dive. You get a real plan, real estimates, and real architecture — yours to keep.', dur: 'Week 1–2' },
  { n: '03', t: 'Build', d: 'We embed, ship in tight increments, and demo every Friday. No surprises in week 8.', dur: 'Week 3+' },
  { n: '04', t: 'Handoff', d: 'Code, docs, runbooks, and a 30-day support window. We don\'t own your roadmap forever.', dur: 'Final week' },
];

function Process() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <Eyebrow index="02">How an engagement runs</Eyebrow>
          </div>
          <h2 className="h2" style={{ gridColumn: 'span 8' }}>
            Four stages. <span className="italic" style={{ color: 'var(--ink-3)' }}>No surprises.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--gap)' }}>
          {PROCESS.map(p => (
            <div key={p.n} style={{
              borderTop: '1px solid var(--ink)',
              paddingTop: 22,
            }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{p.dur}</div>
              <div className="serif" style={{ fontSize: 30, marginTop: 14, fontStyle: 'italic' }}>{p.t}</div>
              <p className="body" style={{ marginTop: 12, fontSize: 14.5 }}>{p.d}</p>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', marginTop: 18, letterSpacing: '0.12em' }}>§{p.n}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === What we don't do === */
const WONT = [
  'Pure design retainers without engineering',
  'Web3 / NFT / token launches',
  'SEO content farms or marketing sites alone',
  'Pitch decks or fundraising material',
  'Discovery sprints that don\'t lead to a build',
  'Team augmentation by junior contractors',
];

function WhatWeDont() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)' }}>
          <div style={{ gridColumn: 'span 5' }}>
            <Eyebrow index="03">What we don't do</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16 }}>
              Saying no <span className="italic" style={{ color: 'var(--ink-3)' }}>is the whole point.</span>
            </h2>
            <p className="body-lg" style={{ marginTop: 22, maxWidth: '40ch' }}>
              Specialization compounds. We pass on plenty of good work to stay sharp at the work we're great at.
            </p>
          </div>
          <ul style={{ gridColumn: 'span 7', listStyle: 'none', borderTop: '1px solid var(--line-strong)' }}>
            {WONT.map((w, i) => (
              <li key={w} style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '20px 0', borderBottom: '1px solid var(--line-strong)',
              }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 14 }}>✕</span>
                <span className="serif" style={{ fontSize: 22, color: 'var(--ink-3)' }}>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactCTAservices() {
  return (
    <section style={{ background: 'var(--accent)', color: 'white', padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <Eyebrow light>Let's create</Eyebrow>
        <h2 className="display" style={{ color: 'white', marginTop: 18, fontSize: 'clamp(56px, 9vw, 140px)', maxWidth: '14ch' }}>
          Something <span className="italic">lasting.</span>
        </h2>
        <a href="contact.html" className="btn" style={{ background: '#fff', color: 'var(--accent)', fontSize: 16, padding: '18px 28px', marginTop: 32 }}>
          Start a project <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <div className="page">
      <Nav active="services" />
      <HeroServices />
      <ServicesList />
      <Process />
      <WhatWeDont />
      <ContactCTAservices />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ServicesPage />);
