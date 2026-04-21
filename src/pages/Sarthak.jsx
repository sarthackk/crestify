import { Link } from 'react-router-dom';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import { useReveal } from '../components/shared/useReveal.js';

/* ─── Hero ──────────────────────────────────────────────────────────────── */

function Hero() {
  const stats = [
    { n: '35+', l: 'Brands Built' },
    { n: '5+',  l: 'Years Operating' },
    { n: '5',   l: 'Active Ventures' },
    { n: '200+', l: 'Community Members Taught' },
  ];

  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', paddingTop: 80, paddingBottom: 'clamp(72px, 10vw, 130px)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: -160, right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, #ff4d1f14 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: -80, left: '15%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #0d9b6a0a 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative' }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 56 }}>
          <span className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.18em' }}>Sarthak Tiwari · Founder Portfolio</span>
          <div style={{ height: 1, flex: 1, maxWidth: 120, background: '#ffffff14' }} />
        </div>

        {/* Two-col layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(48px, 8.5vw, 136px)', lineHeight: 1.0, letterSpacing: '-0.028em', color: '#f0ede6', maxWidth: '14ch' }}>
              Builder.<br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Operator.</span><br />
              Founder.
            </h1>

            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(17px, 1.5vw, 21px)', lineHeight: 1.75, color: '#9c9b95', maxWidth: '52ch', marginTop: 'clamp(28px, 4vw, 48px)' }}>
              I've spent the last 5 years building brands, communities, and products from the ground up — across blockchain, ecommerce, design, and SaaS. Now I'm building <span style={{ color: '#f0ede6' }}>Crestify</span> and <span style={{ color: '#0d9b6a' }}>Kaart Studio.</span>
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 'clamp(28px, 4vw, 44px)', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-accent" style={{ fontSize: 15, padding: '14px 24px' }}>Start a project →</Link>
              <a href="mailto:sarthak@crestify.co" className="btn" style={{ border: '1px solid #ffffff22', color: '#f0ede6', fontSize: 15, padding: '14px 24px' }}>sarthak@crestify.co</a>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              {[
                { l: 'X / Twitter', h: 'https://x.com/sarthaktiwari' },
                { l: 'LinkedIn', h: '#' },
                { l: 'GitHub', h: '#' },
              ].map(s => (
                <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid #ffffff18', padding: '6px 12px', borderRadius: 999, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#ffffff18'; e.currentTarget.style.color = '#6a6a65'; }}
                >{s.l} ↗</a>
              ))}
            </div>
          </div>

          {/* Photo placeholder */}
          <div style={{ flexShrink: 0, width: 'clamp(200px, 20vw, 320px)' }}>
            <div style={{ aspectRatio: '3 / 4', background: '#1a1a1a', border: '1px solid #ffffff12', borderRadius: 8, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#ff4d1f22', border: '1px solid #ff4d1f33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--accent)' }}>ST</span>
              </div>
              <span className="mono" style={{ fontSize: 9, color: '#4a4a45', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', padding: '0 20px' }}>Founder photo<br />coming soon</span>
            </div>
          </div>
        </div>

        {/* Stat bar */}
        <div style={{ marginTop: 'clamp(56px, 8vw, 100px)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid #ffffff14' }}>
          {stats.map((s, i) => (
            <div key={s.l} style={{ padding: 'clamp(20px, 3vw, 36px) 0', borderRight: i < stats.length - 1 ? '1px solid #ffffff10' : 'none', paddingRight: 28 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 64px)', lineHeight: 0.92, letterSpacing: '-0.025em', color: '#f0ede6' }}>{s.n}</div>
              <div className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 10 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Ventures ──────────────────────────────────────────────────────────── */

const VENTURES = [
  {
    name: 'Crestify',
    role: 'Founder',
    type: 'Parent Studio',
    status: 'Active',
    statusColor: '#22c55e',
    accent: '#ff4d1f',
    bg: '#0e0e0e',
    desc: 'Crestify is the parent studio behind everything. We design and develop SaaS products, AI tools, and tech applications — end to end. From zero to shipped.',
    detail: 'Product & engineering studio for startups. We scope, design, build, and launch software — no juniors, no handoffs, no frameworks for sale.',
    tags: ['Product Studio', 'SaaS', 'AI', 'Full-Stack'],
    href: '/',
    cta: 'Visit Crestify',
  },
  {
    name: 'Kaart Studio',
    role: 'Co-Founder',
    type: 'Ecommerce Agency · Subsidiary',
    status: 'Active',
    statusColor: '#22c55e',
    accent: '#0d9b6a',
    bg: '#071410',
    desc: "End-to-end ecommerce for Shopify brands. Custom design, development, branding, UGC, performance marketing, WhatsApp flows, and Klaviyo retention. We don't just build stores — we build brands.",
    detail: 'From a blank brief to a live, growing brand — Kaart handles the full stack of D2C growth.',
    tags: ['Shopify', 'D2C', 'Growth', 'Performance Marketing', 'UGC'],
    href: '/kaart',
    cta: 'Visit Kaart Studio',
  },
  {
    name: 'Grit School',
    role: 'Founder',
    type: 'Cohort-Based Program',
    status: 'First Cohort Launching',
    statusColor: '#f59e0b',
    accent: '#f59e0b',
    bg: '#0f0c07',
    desc: 'Taking ecommerce founders from idea to execution. A cohort-based program built around community, accountability, and real brand building.',
    detail: 'Not a course. Not a community. A structured launchpad where people actually ship their first brand.',
    tags: ['EdTech', 'Ecommerce', 'Cohort', 'Community'],
    href: '#',
    cta: 'Join the waitlist',
  },
  {
    name: 'Mockzy',
    role: 'Builder',
    type: 'Internal AI SaaS Tool',
    status: 'Internal · Scaling',
    statusColor: '#6366f1',
    accent: '#6366f1',
    bg: '#07070f',
    desc: 'Built in-house at Crestify to power our own workflows. An AI SaaS product currently used internally — with broader plans ahead.',
    detail: 'Started as an internal tool. Grew into something we use on every project. Broader release is coming.',
    tags: ['AI SaaS', 'Internal Tool', 'Automation'],
    href: '/work/mockzy',
    cta: 'Learn more',
  },
  {
    name: 'SKED',
    role: 'Building',
    type: 'Hyper-Local Networking App',
    status: 'In Development',
    statusColor: '#ec4899',
    accent: '#ec4899',
    bg: '#0f070c',
    desc: 'A hyper-local networking and co-working app. Find people near you to work alongside, collaborate with, or network with in real life. LinkedIn — but local, real, and in-person.',
    detail: 'Built for the person who wants to get out of their apartment and work next to someone who gets it.',
    tags: ['Mobile App', 'Networking', 'Community', 'Location-Based'],
    href: '#',
    cta: 'Coming soon',
  },
];

function VentureCard({ v, idx }) {
  const isEven = idx % 2 === 0;
  return (
    <article className="reveal" style={{ background: v.bg, border: '1px solid #ffffff0e', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr', gap: 0 }}>
        {/* Info side */}
        <div style={{ padding: 'clamp(32px, 4vw, 56px)', borderRight: '1px solid #ffffff08', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', align: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontSize: 9, color: v.statusColor, textTransform: 'uppercase', letterSpacing: '0.14em', background: `${v.statusColor}18`, padding: '3px 10px', borderRadius: 999, border: `1px solid ${v.statusColor}30`, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: v.statusColor, display: 'inline-block' }} />
              {v.status}
            </span>
            <span className="mono" style={{ fontSize: 9, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{v.type}</span>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.0, color: '#f0ede6' }}>{v.name}</h3>
            <div className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 8 }}>{v.role}</div>
          </div>

          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.75, color: '#9c9b95', maxWidth: '38ch' }}>{v.desc}</p>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {v.tags.map(t => (
              <span key={t} className="mono" style={{ fontSize: 9.5, color: '#6a6a65', background: '#ffffff08', padding: '4px 9px', borderRadius: 4, letterSpacing: '0.06em', border: '1px solid #ffffff0c' }}>{t}</span>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 8 }}>
            <a href={v.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, color: v.accent, textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: `1px solid ${v.accent}44`, padding: '10px 18px', borderRadius: 999, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = `${v.accent}18`; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >{v.cta} ↗</a>
          </div>
        </div>

        {/* Visual side */}
        <div style={{ background: '#ffffff04', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px, 4vw, 56px)', gap: 16, minHeight: 280 }}>
          {/* Logo placeholder */}
          <div style={{ width: 72, height: 72, borderRadius: 16, background: `${v.accent}18`, border: `1px solid ${v.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 24, color: v.accent }}>{v.name[0]}</span>
          </div>
          {/* Mockup/screenshot placeholder */}
          <div style={{ width: '100%', maxWidth: 300, aspectRatio: '16 / 9', background: '#ffffff06', border: '1px solid #ffffff0e', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: `${v.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: v.accent, fontSize: 12 }}>⊡</span>
            </div>
            <span className="mono" style={{ fontSize: 8.5, color: '#4a4a45', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center' }}>Screenshot / Mockup</span>
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.6, color: '#4a4a45', maxWidth: '22ch', textAlign: 'center' }}>{v.detail}</p>
        </div>
      </div>
    </article>
  );
}

function Ventures() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-deep)', borderTop: '1px solid #ffffff0c' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(40px, 6vw, 72px)', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 12 }}>01 · Ventures</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.0, letterSpacing: '-0.022em', color: '#f0ede6' }}>
              What I'm <span style={{ fontStyle: 'italic', color: '#9c9b95' }}>building.</span>
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, lineHeight: 1.7, color: '#6a6a65', maxWidth: '36ch' }}>
            Five ventures — two active agencies, one launchpad, one AI tool, and one app in development.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 2.5vw, 32px)' }}>
          {VENTURES.map((v, i) => <VentureCard key={v.name} v={v} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── Agency Years ──────────────────────────────────────────────────────── */

const AGENCIES = [
  {
    name: 'Luscious Leopard',
    role: 'Design Lead & Project Manager',
    period: '2024',
    stat: '20+',
    statLabel: 'Brands',
    accent: '#f59e0b',
    badge: 'Shark Tank India Brands',
    desc: 'Shopify agency. Led design and project management across 20+ brands. Coordinated directly with founders, managed internal teams of designers and developers, and handled end-to-end delivery from brief to launch. Worked with brands featured on Shark Tank India, including Barker Bookie.',
    brands: ['Barker Bookie', 'Shark Tank India', '+ 18 more brands'],
    bullets: ['End-to-end Shopify brand delivery', 'Figma design to live store', 'Internal team management', 'Direct founder relationships'],
  },
  {
    name: 'Noir & Blanco',
    role: 'Design Lead',
    period: '2023',
    stat: '15+',
    statLabel: 'Projects',
    accent: '#e8e8e0',
    badge: null,
    desc: 'Shopify agency. Led design across 15+ ecommerce projects over 8 months. Figma, Shopify, team management, and implementation — including coding where needed given technical background.',
    brands: ['15+ ecommerce brands', 'D2C, Fashion, Lifestyle'],
    bullets: ['UI/UX design in Figma', 'Shopify theme implementation', 'Custom frontend development', 'Team coordination'],
  },
];

function AgencyYears() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="col-4">
            <span className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>02 · Agency Years</span>
            <h2 className="h2">
              35+ brands built.<br />
              <span className="italic" style={{ color: 'var(--ink-3)' }}>Here's where.</span>
            </h2>
          </div>
          <div className="col-8" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p className="body-lg" style={{ maxWidth: '48ch' }}>
              Before founding Crestify, I spent years inside agencies — not as a junior, but running design and delivery across dozens of real brands.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap)' }}>
          {AGENCIES.map(a => (
            <div key={a.name} className="reveal" style={{ border: '1px solid var(--line-strong)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-elev)' }}>
              {/* Header */}
              <div style={{ background: 'var(--bg-deep)', padding: 'clamp(24px, 3vw, 36px)', borderBottom: '1px solid #ffffff0e', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  {/* Logo placeholder */}
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: `${a.accent}18`, border: `1px solid ${a.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: a.accent }}>{a.name[0]}</span>
                  </div>
                  {a.badge && (
                    <span className="mono" style={{ fontSize: 9, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.1em', background: '#f59e0b18', padding: '4px 10px', borderRadius: 999, border: '1px solid #f59e0b33' }}>★ {a.badge}</span>
                  )}
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#f0ede6', lineHeight: 1.1 }}>{a.name}</div>
                <div className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>{a.role} · {a.period}</div>
                {/* Stat */}
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 48, lineHeight: 1, letterSpacing: '-0.02em', color: a.accent }}>{a.stat}</span>
                  <span className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{a.statLabel}</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
                <p className="body" style={{ fontSize: 14.5, lineHeight: 1.7, marginBottom: 20 }}>{a.desc}</p>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>What I did</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {a.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ color: 'var(--accent)', fontSize: 9, flexShrink: 0 }}>→</span>
                      <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-2)' }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Portfolio grid placeholder */}
                <div style={{ marginTop: 24 }}>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Portfolio samples</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ aspectRatio: '4/3', background: 'var(--bg)', border: '1px solid var(--line-strong)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="mono" style={{ fontSize: 8, color: 'var(--ink-5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Brand {i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand logo wall */}
        <div style={{ marginTop: 'clamp(48px, 6vw, 80px)', border: '1px solid var(--line-strong)', borderRadius: 8, padding: 'clamp(28px, 3.5vw, 48px)', background: 'var(--bg-elev)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Brands worked with across both agencies</span>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1, color: 'var(--ink)' }}>35+ brands</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0, border: '1px solid var(--line-strong)', borderRadius: 4, overflow: 'hidden' }}>
            {['Barker Bookie', 'Brand 02', 'Brand 03', 'Brand 04', 'Brand 05', 'Brand 06', 'Brand 07', 'Brand 08', 'Brand 09', 'Brand 10', 'Brand 11', 'Brand 12'].map((b, i) => (
              <div key={b} style={{ padding: '18px 10px', borderRight: (i + 1) % 6 === 0 ? 'none' : '1px solid var(--line-strong)', borderBottom: i < 6 ? '1px solid var(--line-strong)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: 'clamp(11px, 1.4vw, 15px)', color: 'var(--ink-4)', letterSpacing: '0.04em', textAlign: 'center' }}>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Community ─────────────────────────────────────────────────────────── */

const COMMUNITIES = [
  {
    name: 'WebCrux',
    role: 'Founder',
    period: '2022 – 2023',
    accent: '#6366f1',
    bg: '#07070f',
    headline: 'The largest blockchain community in Uttarakhand. Possibly North India.',
    desc: "A community-based startup built from college. Organized and hosted blockchain developer events at colleges across the region, partnering with some of the biggest names in the blockchain space. As a Filecoin Ambassador, hosted sessions, gave public talks, and took teams to colleges across North India to run on-ground events.",
    details: ['Events: Genesis, DeHashed, and more', 'Filecoin Ambassador — ran sessions and college tours', 'Took teams across North India', 'On-ground activations at colleges'],
    partners: ['Filecoin', 'Shardium', 'MOI Technology', 'Chainlink', 'Berachain', 'Avocado'],
    photoCount: 6,
    badge: 'Filecoin Ambassador',
  },
  {
    name: 'Era of NoCode',
    role: 'Head of Program',
    period: '2024',
    accent: '#0d9b6a',
    bg: '#060f0c',
    headline: 'Taught hundreds of people to build real products — without writing a line of code.',
    desc: 'Cohort-based tech startup. Worked directly with the founder as Head of Program — hosting sessions, managing the community, and running independent sprints teaching people how to build real products with no-code tools. Ran 2–3 full cohorts. Took the program offline to colleges including Masters Union.',
    details: ['Ran 2–3 full cohorts end-to-end', 'Offline sessions at Masters Union', 'Created "No Code 30" — a 30-day build sprint', 'Tools: Bubble, Zapier, Make, Shopify'],
    partners: ['Bubble', 'Zapier', 'Make', 'Shopify', 'Masters Union'],
    photoCount: 4,
    badge: 'No Code 30 Creator',
  },
];

function CommunitySection() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-deep)', borderTop: '1px solid #ffffff0c' }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <span className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 12 }}>03 · Community & Stage Presence</span>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.0, letterSpacing: '-0.022em', color: '#f0ede6', maxWidth: '16ch' }}>
            Before the companies, there was the <span style={{ fontStyle: 'italic', color: '#9c9b95' }}>community.</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vw, 48px)' }}>
          {COMMUNITIES.map((c, idx) => (
            <div key={c.name} className="reveal" style={{ background: c.bg, border: '1px solid #ffffff0e', borderRadius: 10, overflow: 'hidden' }}>
              {/* Top bar */}
              <div style={{ padding: 'clamp(28px, 4vw, 48px)', borderBottom: '1px solid #ffffff08' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: `${c.accent}1a`, border: `1px solid ${c.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: c.accent }}>{c.name[0]}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 40px)', color: '#f0ede6', lineHeight: 1.0 }}>{c.name}</div>
                      <div className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{c.role} · {c.period}</div>
                    </div>
                  </div>
                  <span className="mono" style={{ fontSize: 9, color: c.accent, textTransform: 'uppercase', letterSpacing: '0.12em', background: `${c.accent}18`, padding: '5px 12px', borderRadius: 999, border: `1px solid ${c.accent}30`, alignSelf: 'flex-start' }}>{c.badge}</span>
                </div>

                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(18px, 2.2vw, 28px)', lineHeight: 1.3, color: c.accent, maxWidth: '36ch', marginBottom: 16 }}>
                  "{c.headline}"
                </p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.75, color: '#9c9b95', maxWidth: '64ch' }}>{c.desc}</p>
              </div>

              {/* Details + Photos grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                {/* Details */}
                <div style={{ padding: 'clamp(24px, 3vw, 40px)', borderRight: '1px solid #ffffff08' }}>
                  <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Highlights</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {c.details.map(d => (
                      <li key={d} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                        <span style={{ color: c.accent, fontSize: 9, flexShrink: 0 }}>→</span>
                        <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: '#9c9b95', lineHeight: 1.4 }}>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: 28 }}>
                    <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>Partners</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {c.partners.map(p => (
                        <span key={p} className="mono" style={{ fontSize: 10, color: '#6a6a65', background: '#ffffff06', padding: '5px 10px', borderRadius: 4, border: '1px solid #ffffff0a', letterSpacing: '0.06em' }}>{p}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Photo gallery placeholder */}
                <div style={{ padding: 'clamp(24px, 3vw, 40px)' }}>
                  <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Event Photos</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {Array.from({ length: c.photoCount }).map((_, i) => (
                      <div key={i} style={{ aspectRatio: i === 0 ? '1/1' : '1/1', background: '#ffffff06', border: '1px solid #ffffff0c', borderRadius: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, gridColumn: i === 0 ? 'span 2' : 'span 1', gridRow: i === 0 ? 'span 2' : 'span 1' }}>
                        <span style={{ color: '#3a3a3a', fontSize: 16 }}>📷</span>
                        <span className="mono" style={{ fontSize: 7.5, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Event photo {i + 1}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: '#4a4a45', marginTop: 12, lineHeight: 1.5 }}>Photos from Genesis, DeHashed, and college events coming soon.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline ──────────────────────────────────────────────────────────── */

const TIMELINE = [
  { year: '2020', event: 'Started B.Tech at UPES, Dehradun.', note: 'Started exploring design and tech.', logo: 'UPES' },
  { year: '2021', event: 'Joined Open Source Community.', note: 'Started freelance graphic design. Discovered blockchain.', logo: null },
  { year: '2022', event: 'Joined Traibis as Lead Blockchain Developer.', note: 'Building a full-stack education metaverse with digital currencies and on-chain accreditations.', logo: 'Traibis' },
  { year: '2022', event: 'Founded WebCrux.', note: 'Became a Filecoin Ambassador. Grew the largest blockchain community in the region.', logo: 'WebCrux', accent: '#6366f1' },
  { year: '2023', event: 'Completed 10k Designers cohort.', note: 'Pivoted into product, UI/UX design. Deep focus on Figma and design systems.', logo: '10k Designers' },
  { year: '2023', event: 'Joined Noir & Blanco as Design Lead.', note: 'Led design across 15+ ecommerce brands. Figma, Shopify, team management.', logo: 'Noir & Blanco' },
  { year: '2024', event: 'Joined Luscious Leopard as Design Lead & Project Manager.', note: 'Concurrently served as Head of Program at Era of NoCode. Created No Code 30.', logo: 'Luscious Leopard', accent: '#f59e0b' },
  { year: 'Late 2024', event: 'Left agencies. Founded Crestify.', note: 'Launched Kaart Studio. Started building Grit School, Mockzy, and SKED.', logo: 'Crestify', accent: '#ff4d1f', highlight: true },
];

function Timeline() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="col-4">
            <span className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>04 · The Path</span>
            <h2 className="h2">How I got <span className="italic" style={{ color: 'var(--ink-3)' }}>here.</span></h2>
          </div>
          <div className="col-8" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p className="body-lg" style={{ maxWidth: '44ch' }}>Four years. One thread: build, ship, repeat — in whatever domain needed it most.</p>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{ position: 'absolute', left: 72, top: 0, bottom: 0, width: 1, background: 'var(--line-strong)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TIMELINE.map((t, i) => (
              <div key={i} className="reveal" style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 0, padding: 'clamp(18px, 2.5vw, 28px) 0', borderBottom: i < TIMELINE.length - 1 ? '1px solid var(--line)' : 'none', position: 'relative' }}>
                {/* Year */}
                <div style={{ paddingRight: 20, textAlign: 'right', paddingTop: 2 }}>
                  <span className="mono" style={{ fontSize: 9.5, color: t.highlight ? 'var(--accent)' : 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{t.year}</span>
                </div>

                {/* Dot + Content */}
                <div style={{ paddingLeft: 28, position: 'relative' }}>
                  {/* Dot */}
                  <div style={{ position: 'absolute', left: -5, top: 6, width: 9, height: 9, borderRadius: '50%', background: t.highlight ? 'var(--accent)' : t.accent || 'var(--line-strong)', border: `2px solid ${t.highlight ? 'var(--accent)' : t.accent || 'var(--bg)'}`, outline: t.highlight ? '3px solid #ff4d1f33' : 'none' }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 1.6vw, 22px)', lineHeight: 1.2, color: t.highlight ? 'var(--ink)' : 'var(--ink)', fontWeight: 400 }}>{t.event}</div>
                      <p className="body" style={{ fontSize: 13.5, marginTop: 5, color: 'var(--ink-3)' }}>{t.note}</p>
                    </div>
                    {/* Logo placeholder pill */}
                    {t.logo && (
                      <span className="mono" style={{ fontSize: 9, color: t.accent || 'var(--ink-5)', textTransform: 'uppercase', letterSpacing: '0.1em', background: t.highlight ? '#ff4d1f10' : 'var(--bg-elev)', padding: '4px 10px', borderRadius: 999, border: `1px solid ${t.accent ? t.accent + '40' : 'var(--line-strong)'}`, flexShrink: 0, alignSelf: 'flex-start', marginTop: 2 }}>{t.logo}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ────────────────────────────────────────────────────────────── */

const SKILL_GROUPS = [
  { cat: 'Design', items: ['Figma', 'UI/UX', 'Product Design', 'Brand Identity', 'Ecommerce Design', 'Graphic Design'] },
  { cat: 'Development', items: ['Shopify Custom', 'Blockchain Dev', 'Frontend', 'React', 'Node.js'] },
  { cat: 'No-Code', items: ['Bubble', 'Zapier', 'Make', 'Shopify', 'Webflow'] },
  { cat: 'Marketing', items: ['Klaviyo', 'WhatsApp Automation', 'Email Marketing', 'UGC', 'Performance Marketing'] },
  { cat: 'Leadership', items: ['Team Management', 'Project Management', 'Community Building', 'Program Management', 'Founder Relations'] },
  { cat: 'Domains', items: ['Ecommerce', 'SaaS', 'AI SaaS', 'Blockchain', 'EdTech', 'No-Code'] },
];

function Skills() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <div className="col-4">
            <span className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>05 · Skills</span>
            <h2 className="h2">The full <span className="italic" style={{ color: 'var(--ink-3)' }}>stack.</span></h2>
          </div>
          <div className="col-8" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p className="body-lg" style={{ maxWidth: '44ch' }}>Design, code, marketing, and ops — I've worked across all of them, and I know when to go deep vs. when to delegate.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(24px, 3vw, 40px)' }}>
          {SKILL_GROUPS.map(g => (
            <div key={g.cat} className="reveal">
              <div className="mono" style={{ fontSize: 10.5, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--line-strong)' }}>{g.cat}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {g.items.map(item => (
                  <span key={item} style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-2)', background: 'var(--bg)', padding: '5px 12px', borderRadius: 999, border: '1px solid var(--line-strong)', letterSpacing: '-0.003em' }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────────────────────────── */

function ClosingCTA() {
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(80px, 12vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, var(--accent), #0d9b6a)' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: -100, right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #ff4d1f10 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative' }}>
        <span className="mono" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block', marginBottom: 20 }}>06 · Let's connect</span>
        <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(56px, 10vw, 160px)', lineHeight: 1.0, letterSpacing: '-0.028em', color: '#f0ede6', maxWidth: '14ch' }}>
          Building<br />something?<br />
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Let's talk.</span>
        </h2>

        <div style={{ marginTop: 'clamp(40px, 6vw, 72px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap)', alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.7, color: '#9c9b95', maxWidth: '40ch', marginBottom: 32 }}>
              Whether you need a product built, a brand scaled, or just want to compare notes — I'm reachable. Direct line, no gatekeeping.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-accent" style={{ fontSize: 15, padding: '15px 26px' }}>Start a project →</Link>
              <a href="mailto:sarthak@crestify.co" className="btn" style={{ border: '1px solid #ffffff22', color: '#f0ede6', fontSize: 15, padding: '15px 26px' }}>sarthak@crestify.co</a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Where I operate from</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'Crestify', desc: 'Product & engineering studio', href: '/', color: '#ff4d1f' },
                { name: 'Kaart Studio', desc: 'D2C ecommerce agency', href: '/kaart', color: '#0d9b6a' },
              ].map(l => (
                <a key={l.name} href={l.href} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: '#ffffff06', border: '1px solid #ffffff0e', borderRadius: 8, textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#ffffff0e'}
                  onMouseLeave={e => e.currentTarget.style.background = '#ffffff06'}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${l.color}18`, border: `1px solid ${l.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: l.color }}>{l.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, color: '#f0ede6' }}>{l.name}</div>
                    <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{l.desc}</div>
                  </div>
                  <span style={{ color: l.color, marginLeft: 'auto', fontSize: 16 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function Sarthak() {
  useReveal();
  return (
    <div className="page">
      <Nav />
      <Hero />
      <Ventures />
      <AgencyYears />
      <CommunitySection />
      <Timeline />
      <Skills />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
