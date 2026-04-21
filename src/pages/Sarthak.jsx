import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import { useReveal } from '../components/shared/useReveal.js';

/* ─── Data (fill in your real details) ────────────────────────────────── */

const HEADLINE = 'Builder. Operator. Your fractional CTO.';
const TAGLINE  = "I turn messy ideas into structured systems — then ship them. I've co-founded startups, run growth experiments, led engineering teams, and spoken at events across India. Everything I build is meant to last.";

const STATS = [
  { n: '7+',   l: 'Years building' },
  { n: '40+',  l: 'Products shipped' },
  { n: '15+',  l: 'Startups advised' },
  { n: '20+',  l: 'Events & sessions' },
];

const VENTURES = [
  {
    name: 'Crestify',
    role: 'Co-Founder',
    year: '2021 – Present',
    desc: 'A product & engineering studio for startups. We design, build, and ship software end-to-end — from MVP to scale.',
    tags: ['Product Studio', 'Full-Stack', 'SaaS'],
    href: '/',
    accent: '#ff4d1f',
    status: 'Active',
  },
  {
    name: 'Kaart Studio',
    role: 'Co-Founder',
    year: '2022 – Present',
    desc: 'D2C brand growth studio. Strategy, Shopify builds, paid ads, UGC, influencer — all under one roof for e-commerce brands.',
    tags: ['E-Commerce', 'D2C', 'Growth'],
    href: '/kaart',
    accent: '#0d9b6a',
    status: 'Active',
  },
  // Add more ventures here
];

const PROJECTS = [
  {
    n: '01',
    title: 'Prepnest',
    category: 'EdTech · SaaS',
    desc: 'Built the full platform architecture for a competitive exam prep SaaS. Handled system design, API layer, and dashboard UI.',
    tags: ['React', 'Node.js', 'System Architecture'],
    href: '/work/prepnest',
  },
  {
    n: '02',
    title: 'PMS Asset Builder',
    category: 'Fintech · Internal Tool',
    desc: 'Designed and shipped an internal portfolio management tool for a wealth advisory firm. Complex data flows, clean UI.',
    tags: ['Internal Tool', 'Fintech', 'Dashboard'],
    href: '/work/pms-asset-builder',
  },
  {
    n: '03',
    title: 'Match Trackers',
    category: 'Sports · Web App',
    desc: 'Real-time sports tracking web app with live score updates, stats aggregation, and a fantasy layer.',
    tags: ['Real-time', 'Sports', 'Full-Stack'],
    href: '/work/match-trackers',
  },
  {
    n: '04',
    title: 'Quickhunt',
    category: 'HR · SaaS',
    desc: 'Job matching SaaS built for speed — employers post, candidates apply, AI suggests matches in under a second.',
    tags: ['AI', 'HR Tech', 'SaaS'],
    href: '/work/quickhunt',
  },
  {
    n: '05',
    title: 'Mockzy',
    category: 'EdTech · Tool',
    desc: 'Mock interview platform with AI feedback. Helped 5,000+ students prepare for technical and behavioural interviews.',
    tags: ['AI', 'EdTech', 'Platform'],
    href: '/work/mockzy',
  },
  {
    n: '06',
    title: 'Equip Rentals',
    category: 'Marketplace · Web App',
    desc: 'B2B equipment rental marketplace. End-to-end build from discovery to checkout with live availability tracking.',
    tags: ['Marketplace', 'B2B', 'Full-Stack'],
    href: '/work/equip-rentals',
  },
];

const EVENTS = [
  // { title: 'Talk / Workshop title', event: 'Event Name', location: 'City', year: '2024', type: 'Talk' },
  // Add real events — user to fill in
];

const SKILLS = [
  { cat: 'Engineering', items: ['System Architecture', 'Full-Stack Development', 'API Design', 'Cloud & DevOps', 'Mobile (React Native)', 'AI & Automation'] },
  { cat: 'Product', items: ['Product Strategy', 'MVP Scoping', 'Roadmap Planning', 'User Research', 'Prototyping', 'Data-Driven Iteration'] },
  { cat: 'Growth & Business', items: ['D2C Growth', 'Paid Advertising', 'Influencer Marketing', 'GTM Strategy', 'Pitch & Fundraise', 'Team Building'] },
];

const SOCIALS = [
  { label: 'X / Twitter', href: 'https://x.com/sarthaktiwari', icon: '𝕏' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'GitHub', href: '#', icon: 'gh' },
  { label: 'Email', href: 'mailto:sarthak@crestify.co', icon: '✉' },
];

/* ─── Components ──────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', paddingTop: 80, paddingBottom: 'clamp(80px, 12vw, 160px)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle grain texture via gradient */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 60% 0%, #1e1a1200 0%, #0e0e0e 80%)', pointerEvents: 'none' }} />
      {/* Accent glow */}
      <div aria-hidden style={{ position: 'absolute', top: -120, right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #ff4d1f18 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative' }}>
        {/* Label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'white', flexShrink: 0 }}>ST</div>
          <span className="mono" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Sarthak Tiwari · Personal</span>
          <div style={{ height: 1, flex: 1, background: '#ffffff14' }} />
          <span className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Based in Toronto & London</span>
        </div>

        {/* Main headline */}
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(56px, 10vw, 160px)', lineHeight: 1.0, letterSpacing: '-0.028em', maxWidth: '14ch', color: '#f0ede6' }}>
          Builder.<br />
          <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Operator.</span><br />
          Founder.
        </h1>

        <div style={{ marginTop: 'clamp(32px, 5vw, 60px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap)', alignItems: 'end', maxWidth: 1000 }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.7, color: '#9c9b95', maxWidth: '44ch' }}>
            {TAGLINE}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-accent" style={{ fontSize: 14, padding: '13px 22px' }}>Start a project →</Link>
              <a href="mailto:sarthak@crestify.co" className="btn" style={{ border: '1px solid #ffffff22', color: '#f0ede6', fontSize: 14, padding: '13px 22px' }}>Say hello</a>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} className="mono" style={{ fontSize: 12, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6a6a65'}
                >{s.icon}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ marginTop: 'clamp(64px, 9vw, 120px)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid #ffffff14' }}>
          {STATS.map((s, i) => (
            <div key={s.l} style={{ padding: 'clamp(24px, 3vw, 40px) 0', borderRight: i < STATS.length - 1 ? '1px solid #ffffff14' : 'none', paddingRight: 32 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.92, letterSpacing: '-0.025em', color: '#f0ede6' }}>{s.n}</div>
              <div className="mono" style={{ fontSize: 10.5, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 12 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ventures() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="col-4">
            <span className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>01 · Ventures</span>
            <h2 className="h2">Companies<br /><span className="italic" style={{ color: 'var(--ink-3)' }}>I've built.</span></h2>
          </div>
          <div className="col-8" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p className="body-lg" style={{ maxWidth: '44ch' }}>
              Every company started with a problem I couldn't stop thinking about. I built teams, shipped products, and operated them from zero.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {VENTURES.map((v, i) => (
            <article key={v.name} style={{ borderTop: '1px solid var(--line-strong)', ...(i === VENTURES.length - 1 ? { borderBottom: '1px solid var(--line-strong)' } : {}) }}>
              <a href={v.href} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--gap)', padding: 'clamp(28px, 4vw, 48px) 0', textDecoration: 'none', color: 'inherit', transition: 'background 0.2s', borderRadius: 4 }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-elev)'; e.currentTarget.style.paddingLeft = '16px'; e.currentTarget.style.paddingRight = '16px'; e.currentTarget.style.marginLeft = '-16px'; e.currentTarget.style.marginRight = '-16px'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '0'; e.currentTarget.style.paddingRight = '0'; e.currentTarget.style.marginLeft = '0'; e.currentTarget.style.marginRight = '0'; }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: v.status === 'Active' ? '#22c55e' : '#9c9b95', flexShrink: 0 }} />
                    <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{v.role} · {v.year}</span>
                    <span className="mono" style={{ fontSize: 10, color: v.status === 'Active' ? '#22c55e' : 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', background: v.status === 'Active' ? '#22c55e15' : 'var(--bg-elev)', padding: '2px 8px', borderRadius: 999, border: `1px solid ${v.status === 'Active' ? '#22c55e33' : 'var(--line-strong)'}` }}>{v.status}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 52px)', lineHeight: 1.0, letterSpacing: '-0.018em' }}>{v.name}</h3>
                  <p className="body" style={{ marginTop: 12, maxWidth: '56ch', fontSize: 15 }}>{v.desc}</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                    {v.tags.map(t => <span key={t} className="tag" style={{ fontSize: 10, borderColor: 'var(--line-strong)' }}>{t}</span>)}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', border: `1px solid ${v.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: v.accent, fontSize: 18 }}>→</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="col-4">
            <span className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>02 · Selected work</span>
            <h2 className="h2">Things I've <span className="italic" style={{ color: 'var(--ink-3)' }}>shipped.</span></h2>
          </div>
          <div className="col-8" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p className="body-lg" style={{ maxWidth: '44ch' }}>
              A selection of products and platforms built end-to-end — from architecture decisions to the final deploy.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap)' }}>
          {PROJECTS.map(p => (
            <Link key={p.n} to={p.href} className="reveal" style={{ display: 'block', textDecoration: 'none', border: '1px solid var(--line-strong)', borderRadius: 6, padding: 'clamp(20px, 2.5vw, 32px)', transition: 'border-color 0.2s, transform 0.2s', background: 'var(--bg)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <span className="mono" style={{ fontSize: 10, color: 'var(--ink-5)', letterSpacing: '0.1em' }}>{p.n}</span>
                <span style={{ color: 'var(--accent)', fontSize: 16, opacity: 0.6 }}>↗</span>
              </div>
              <span className="mono" style={{ fontSize: 9.5, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{p.category}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 2.2vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.012em', marginTop: 8 }}>{p.title}</h3>
              <p className="body" style={{ fontSize: 14, marginTop: 12, lineHeight: 1.6 }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 20, flexWrap: 'wrap' }}>
                {p.tags.map(t => (
                  <span key={t} className="mono" style={{ fontSize: 9.5, color: 'var(--ink-4)', background: 'var(--bg-elev)', padding: '3px 8px', borderRadius: 4, letterSpacing: '0.06em' }}>{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <Link to="/work" className="btn btn-ghost" style={{ fontSize: 14 }}>View all work →</Link>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-deep)', color: 'var(--bg)', borderTop: '1px solid #ffffff08' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="col-4">
            <span className="eyebrow eyebrow-light" style={{ display: 'block', marginBottom: 12 }}>03 · Capabilities</span>
            <h2 className="h2" style={{ color: 'var(--bg)' }}>What I<br /><span className="italic" style={{ color: '#9c9b95' }}>actually do.</span></h2>
          </div>
          <div className="col-8" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(16px, 1.35vw, 20px)', lineHeight: 1.7, color: '#9c9b95', maxWidth: '44ch' }}>
              I sit at the intersection of engineering, product, and growth. I can go deep on any of these, or play the generalist connecting all three.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap)' }}>
          {SKILLS.map(s => (
            <div key={s.cat} style={{ borderTop: '1px solid #ffffff14', paddingTop: 32 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 20 }}>{s.cat}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {s.items.map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                    <span style={{ color: '#ffffff22', fontSize: 10 }}>—</span>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 18, color: '#c8c6bf', lineHeight: 1.2 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  const placeholders = [
    { title: 'Your most recent talk', event: 'Event name', location: 'City', year: '2024', type: 'Talk' },
    { title: 'Workshop or panel title', event: 'Event name', location: 'City', year: '2024', type: 'Workshop' },
    { title: 'Keynote or session title', event: 'Event name', location: 'City', year: '2023', type: 'Keynote' },
  ];
  const items = EVENTS.length > 0 ? EVENTS : placeholders;
  const isEmpty = EVENTS.length === 0;

  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div className="col-4">
            <span className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>04 · Events & sessions</span>
            <h2 className="h2">On stage. <span className="italic" style={{ color: 'var(--ink-3)' }}>In rooms.</span></h2>
          </div>
          <div className="col-8" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p className="body-lg" style={{ maxWidth: '44ch' }}>
              I speak at events, run workshops, and guest on podcasts on product, startups, and the craft of building digital systems.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          {isEmpty && (
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20, opacity: 0.6 }}>
              ↓ Placeholder — replace with real events
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {items.map((e, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--line-strong)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--gap)', padding: 'clamp(20px, 3vw, 36px) 0', opacity: isEmpty ? 0.35 : 1 }}>
                <div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', background: '#ff4d1f12', padding: '2px 8px', borderRadius: 999, border: '1px solid #ff4d1f22' }}>{e.type}</span>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{e.year}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.2vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.012em' }}>{e.title}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }}>{e.event}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{e.location}</div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--line-strong)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectSection() {
  return (
    <section style={{ background: 'var(--accent)', color: 'white', padding: 'clamp(80px, 12vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: -80, right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #ffffff18 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap)', alignItems: 'center' }}>
          <div>
            <span className="mono" style={{ fontSize: 11, color: '#ffffff99', textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 16 }}>Let's build something</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(48px, 8vw, 120px)', lineHeight: 1.0, letterSpacing: '-0.025em', color: 'white' }}>
              Let's<br /><span style={{ fontStyle: 'italic' }}>talk.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.7, color: '#ffffffcc', maxWidth: '36ch' }}>
              Whether you're building something new, need a fractional CTO, or just want to swap ideas — I'm reachable.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn" style={{ background: 'white', color: 'var(--accent)', fontSize: 15, padding: '14px 24px' }}>Start a project →</Link>
              <a href="mailto:sarthak@crestify.co" className="btn" style={{ border: '1px solid #ffffff44', color: 'white', fontSize: 15, padding: '14px 24px' }}>sarthak@crestify.co</a>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 11, color: '#ffffff88', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid #ffffff33', padding: '8px 14px', borderRadius: 999, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ffffff22'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff88'; }}
                >{s.label} ↗</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function Sarthak() {
  useReveal();
  return (
    <div className="page">
      <Nav />
      <Hero />
      <Ventures />
      <Projects />
      <Skills />
      <EventsSection />
      <ConnectSection />
      <Footer />
    </div>
  );
}
