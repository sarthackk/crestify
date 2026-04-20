import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import Placeholder from '../components/shared/Placeholder.jsx';
import { useReveal } from '../components/shared/useReveal.js';
import { MarkFoldedK } from '../components/kaart-logo/marks.jsx';

function HeroHome() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString('en-US', { hour12: false }) + ' UTC';

  return (
    <section style={{ position: 'relative', paddingTop: 64, paddingBottom: 'clamp(60px, 9vw, 110px)' }}>
      <div className="container">
        <Link to="/kaart" className="reveal" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '6px 6px 6px 10px',
          border: '1px solid var(--line-strong)',
          borderRadius: 999,
          marginBottom: 32,
          fontFamily: 'var(--mono)', fontSize: 11,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          background: 'var(--bg-elev)',
          transition: 'border-color 0.2s',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#0d9b6a'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line-strong)'}
        >
          {/* Kaart mark icon */}
          <span style={{ width: 28, height: 28, background: '#0d9b6a', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MarkFoldedK size={16} fg="#fff" />
          </span>
          <span style={{ color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis' }}>Kaart Studio</span>
          <span style={{ color: 'var(--ink-4)' }}>·</span>
          <span style={{ color: 'var(--ink)' }}>Shopify-only</span>
          <span style={{ background: '#0d9b6a', color: 'white', padding: '6px 12px', borderRadius: 999, flexShrink: 0 }}>
            Explore →
          </span>
        </Link>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 56, gap: 24, flexWrap: 'wrap' }}>
          <Eyebrow index="01">Solution-first studio · est. 2021</Eyebrow>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            ● Available · Q3 2026 · {time}
          </span>
        </div>

        <h1 className="display reveal" style={{ maxWidth: '18ch' }}>
          From idea to design to{' '}
          <span className="italic" style={{ color: 'var(--ink-3)' }}>shipped product.</span>
        </h1>

        <div className="grid reveal" style={{ gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 80px)', alignItems: 'end' }}>
          <p className="body-lg col-6" style={{ maxWidth: '46ch' }}>
            Crestify is a founder-led execution studio operating across <em className="serif italic">e-commerce</em> and <em className="serif italic">software systems</em>. Small teams. Close to the problem. Owners of the outcome.
          </p>
          <div className="col-6" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">Start a project <span className="arr">→</span></Link>
            <Link to="/work" className="btn btn-ghost">See selected work</Link>
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
      <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--ink)', overflow: 'hidden', borderRadius: 4 }}>
        <Placeholder dark label="FEATURED · Studio reel 02:14" dim="1920 × 1080" ratio="16 / 9" />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 78, height: 78, borderRadius: '50%',
            border: '1px solid #ffffff44',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            background: '#00000040',
            cursor: 'pointer',
          }}>
            <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid #fff', marginLeft: 4 }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 18, gap: 24, flexWrap: 'wrap' }}>
        <div className="serif italic" style={{ fontSize: 22, color: 'var(--ink-2)' }}>Inside the studio — 2025 reel</div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>02:14 · Watch reel ↗</div>
      </div>
    </div>
  );
}

const SERVICES_HOME = [
  {
    n: '01', title: 'Solution Architecture',
    body: 'This is where we step in before anything gets built. We help you define the structure, system logic, and technical foundation your product actually needs to scale.',
    items: ['Understanding your product vision and constraints', 'Mapping user flows and system interactions', 'Defining product architecture and data structure', 'Choosing the right tech stack and scalability approach', 'Identifying risks and long-term bottlenecks early', 'Creating execution-ready technical documentation', 'Aligning product, design, and engineering decisions'],
  },
  {
    n: '02', title: 'MVP Development',
    body: "When you're ready to build, we focus on getting the first version right — not just fast. Our goal is to create an MVP that can evolve into real product.",
    items: ['Defining MVP scope based on real priorities', 'Structuring core product flows', 'Designing user experience with scalability in mind', 'Building clean, maintainable code foundations', 'Rapid iteration with continuous feedback loops', 'Preparing for future feature expansion', 'Supporting initial launch and early users'],
  },
  {
    n: '03', title: 'SaaS & Web Apps',
    body: 'We build full-scale web products designed to handle real users, real complexity, and long-term growth. From internal dashboards to customer-facing platforms.',
    items: ['Product architecture planning', 'Scalable backend and database design', 'Secure authentication and access systems', 'Performance-focused frontend development', 'API integrations and third-party connections', 'Testing for reliability and edge cases', 'Continuous iteration and feature expansion'],
  },
  {
    n: '04', title: 'Mobile Applications',
    body: 'We design and develop mobile apps that feel smooth, intuitive, and stable — not rushed or fragile. Built for real usage, not just app store presence.',
    items: ['Defining mobile-first user journeys', 'Platform-specific UX design', 'Optimised performance and responsiveness', 'Backend integration and data syncing', 'Security and user session management', 'Testing across devices and environments', 'Launch support and iteration planning'],
  },
  {
    n: '05', title: 'Internal Tools',
    body: 'We build internal tools that simplify operations, improve visibility, and reduce friction. Many businesses struggle because their internal systems are fragmented.',
    items: ['Understanding workflows and operational gaps', 'Mapping process automation opportunities', 'Designing intuitive internal dashboards', 'Building role-based access systems', 'Integrating with existing business tools', 'Ensuring scalability for growing teams', 'Continuous improvements based on usage'],
  },
];

function HowWeWork() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          <div className="col-4"><Eyebrow index="02">What we build</Eyebrow></div>
          <h2 className="h2 reveal col-8">
            Five services. <span className="italic" style={{ color: 'var(--ink-3)' }}>All founder-led.</span>
          </h2>
        </div>
        <div style={{ borderTop: '1px solid var(--line-strong)' }}>
          {SERVICES_HOME.map((s, i) => {
            const isOpen = open === i;
            const col1 = s.items.slice(0, Math.ceil(s.items.length / 2));
            const col2 = s.items.slice(Math.ceil(s.items.length / 2));
            return (
              <div key={s.n} onClick={() => setOpen(isOpen ? -1 : i)} style={{
                borderBottom: '1px solid var(--line-strong)', padding: '24px 0', cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <span className="mono hide-mobile" style={{ color: 'var(--accent)', fontSize: 12, paddingTop: 6, flexShrink: 0, minWidth: 32 }}>§{s.n}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                      <h3 className="h3">{s.title}</h3>
                      <span style={{ color: 'var(--ink-3)', fontSize: 22, flexShrink: 0 }}>{isOpen ? '–' : '+'}</span>
                    </div>
                    <p className="body-lg" style={{ fontSize: 17, marginTop: 6, color: 'var(--ink-3)', maxWidth: '60ch' }}>{s.body}</p>
                    <div style={{ overflow: 'hidden', maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0, transition: 'max-height 0.45s ease, opacity 0.3s ease, margin 0.3s ease', marginTop: isOpen ? 20 : 0 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 40px' }}>
                        {[...col1, ...col2].map(item => (
                          <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                            <span style={{ color: 'var(--accent)', fontSize: 10, flexShrink: 0 }}>→</span>
                            <span className="body" style={{ fontSize: 14.5 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// col pattern: 7,5 on row 1 then 5,7 on row 2 — mirrored Z-layout, no gaps
const PROJECTS = [
  { n: '01', col: 'col-7', dark: false, client: 'Prepnest',      sector: 'Career Tech',       headline: 'Built the hiring OS for colleges, students, mentors, and HR.',          metric: '4 portals · Live',    tag: 'Full Stack · AI',        slug: 'prepnest',      ratio: '7 / 5', dim: '1400 × 1000' },
  { n: '02', col: 'col-5', dark: true,  client: 'Match Trackers', sector: 'Sports Tech',        headline: '100k+ users. Live scores and deep stats for cricket & football.',      metric: '100k+ users',         tag: 'MERN · Real-time',       slug: 'match-trackers', ratio: '5 / 5', dim: '1000 × 1000' },
  { n: '03', col: 'col-5', dark: true,  client: 'Mockzy',         sector: 'AI Product',         headline: 'Smartphone photo in. Photorealistic ad-grade imagery out.',            metric: 'Live · Paying users', tag: 'AI · SaaS',              slug: 'mockzy',        ratio: '5 / 5', dim: '1000 × 1000' },
  { n: '04', col: 'col-7', dark: false, client: 'Equip Rentals',  sector: 'Construction Tech',  headline: 'Took construction equipment rental from phone calls to a live booking app.', metric: 'iOS + Android',  tag: 'React Native',           slug: 'equip-rentals', ratio: '7 / 5', dim: '1400 × 1000' },
];

function ProjectCard({ p }) {
  return (
    <Link to={`/work/${p.slug}`} className={`lift ${p.col}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      <Placeholder label={`${p.client.toUpperCase()} · ${p.sector}`} dim={p.dim} ratio={p.ratio} dark={p.dark} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 18, gap: 16, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>{p.n} / {p.tag}</div>
          <h3 className="h3" style={{ fontSize: 20, maxWidth: '28ch', lineHeight: 1.2 }}>{p.headline}</h3>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Result</div>
          <div className="serif" style={{ fontSize: 18, fontStyle: 'italic', marginTop: 3 }}>{p.metric}</div>
        </div>
      </div>
    </Link>
  );
}

function SelectedWork() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-8">
            <Eyebrow index="03">Selected work</Eyebrow>
            <h2 className="h2 reveal" style={{ marginTop: 16 }}>A small portfolio. <span className="italic" style={{ color: 'var(--ink-3)' }}>Loud results.</span></h2>
          </div>
          <div className="col-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/work" className="btn btn-ghost">Browse case studies <span className="arr">→</span></Link>
          </div>
        </div>
        <div className="grid" style={{ gap: 'var(--gap)', rowGap: 'clamp(32px, 5vw, 56px)' }}>
          {PROJECTS.map(p => <ProjectCard key={p.n} p={p} />)}
        </div>
      </div>
    </section>
  );
}

const FOUNDERS = [
  {
    name: 'Sarthak Tiwari', role: 'Founder · Your prime POC', initials: 'ST',
    bio: 'Think of me as your fractional CTO. I work closely with founders and teams to turn ideas into structured, scalable systems — whether that means defining architecture, guiding product decisions, or getting deeply involved in execution.',
    bio2: "When you work with Crestify, you're not just hiring a team. You're getting a builder who has been through the process many times.",
    socials: [{ label: 'X', href: 'https://x.com/sarthaktiwari' }, { label: 'Facebook', href: '#' }],
  },
  {
    name: 'Aditya Tripathi', role: 'Operations · PM', initials: 'AT',
    bio: 'Aditya ensures that projects move smoothly from planning to execution. With a background in business, commerce, and sales, he focuses on aligning timelines, communication, and delivery, helping teams and clients stay organised and ensuring every system we build moves forward with clarity.',
    bio2: null,
    socials: [{ label: 'X', href: '#' }, { label: 'Facebook', href: '#' }, { label: 'YouTube', href: '#' }],
  },
];

function Founders() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div className="col-5">
            <Eyebrow index="04">Who runs the work</Eyebrow>
            <h2 className="h2 reveal" style={{ marginTop: 16 }}>Founder-led, <span className="italic" style={{ color: 'var(--ink-3)' }}>end to end.</span></h2>
          </div>
          <p className="body-lg col-7" style={{ maxWidth: '54ch' }}>
            The founders pitch the work and stay accountable on every project. A close team of 15 people execute it — not a sales team handing you off to someone you've never met.
          </p>
        </div>

        <div className="grid-2" style={{ gap: 'var(--gap)' }}>
          {FOUNDERS.map(f => (
            <article key={f.name} style={{ border: '1px solid var(--line-strong)', padding: 'clamp(24px, 3vw, 40px)', borderRadius: 4, background: 'var(--bg-elev)', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--ink)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: 28, fontStyle: 'italic', flexShrink: 0 }}>{f.initials}</div>
                <div>
                  <h3 className="h3" style={{ fontSize: 24 }}>{f.name}</h3>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>{f.role}</div>
                </div>
              </div>
              <div>
                <p className="body" style={{ fontSize: 15.5, color: 'var(--ink-2)' }}>{f.bio}</p>
                {f.bio2 && <p className="body" style={{ fontSize: 15.5, color: 'var(--ink-3)', marginTop: 12 }}>{f.bio2}</p>}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line)', flexWrap: 'wrap' }}>
                {f.socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid var(--line-strong)', padding: '7px 13px', borderRadius: 999 }}>
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { n: '7+', l: 'Years operating' }, { n: '40+', l: 'Shipped engagements' },
    { n: '11+', l: 'Industries served' }, { n: '92%', l: 'Client retention' },
  ];
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(50px, 7vw, 90px) 0', borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid-4 keep-2" style={{ gap: 'var(--gap)' }}>
          {stats.map(s => (
            <div key={s.l}>
              <div className="serif" style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>{s.n}</div>
              <div className="mono" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 12 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  {
    name: 'Mockzy',
    desc: 'AI creative studio. Smartphone photo in, photorealistic ad-grade mockups, lifestyle images, and video out. Built for D2C brands.',
    meta: 'Live · 2025',
    href: 'https://mockzy.app',
    status: 'live',
  },
  {
    name: 'Sked',
    desc: 'Scheduling infrastructure for teams and creators. Book, manage, and automate time — without the back-and-forth.',
    meta: 'Live · 2024',
    href: 'https://sked.club',
    status: 'live',
  },
  {
    name: 'Grit School',
    desc: 'A school for the skills no one teaches. Practical, no-fluff programs for founders, operators, and people who want to build real things.',
    meta: 'Coming soon',
    href: 'https://grit-school.vercel.app/',
    status: 'soon',
  },
];

function InternalProducts() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-5">
            <Eyebrow index="05">Own products</Eyebrow>
            <h2 className="h2 reveal" style={{ marginTop: 16 }}>We eat <span className="italic" style={{ color: 'var(--ink-3)' }}>our own cooking.</span></h2>
          </div>
          <p className="body-lg col-7" style={{ maxWidth: '48ch' }}>
            Three products built and run by the studio. Not side projects — real products with real users.
          </p>
        </div>
        <div className="grid-3" style={{ gap: 'var(--gap)' }}>
          {PRODUCTS.map(p => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="lift" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ position: 'relative' }}>
                <Placeholder label={p.name.toUpperCase()} dim="800 × 600" ratio="4 / 3" dark />
                {p.status === 'soon' && (
                  <span className="mono" style={{ position: 'absolute', top: 14, left: 14, background: 'var(--accent)', color: 'white', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '4px 10px', borderRadius: 999 }}>
                    Coming soon
                  </span>
                )}
              </div>
              <div style={{ marginTop: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{p.meta}</div>
                  <span className="mono" style={{ fontSize: 11, color: p.status === 'soon' ? 'var(--accent)' : 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {p.status === 'soon' ? 'Preview ↗' : 'Visit ↗'}
                  </span>
                </div>
                <div className="serif" style={{ fontSize: 26 }}>{p.name}</div>
                <p className="body" style={{ marginTop: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section style={{ background: 'var(--accent)', color: 'white', padding: 'clamp(70px, 10vw, 140px) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
          <div className="col-8">
            <Eyebrow index="06" light>Let's create</Eyebrow>
            <h2 className="display" style={{ color: 'white', marginTop: 18, fontSize: 'clamp(48px, 9vw, 140px)' }}>
              Something <span className="italic">lasting.</span>
            </h2>
            <p className="body-lg" style={{ color: '#ffffffd9', marginTop: 24, maxWidth: '46ch' }}>
              Tell us where you're stuck — replatforming, scaling infra, building a product from zero. We'll tell you in 48 hours whether we're the right team.
            </p>
          </div>
          <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <Link to="/contact" className="btn" style={{ background: '#fff', color: 'var(--accent)', fontSize: 16, padding: '18px 28px' }}>
              Start a project <span className="arr">→</span>
            </Link>
            <a href="mailto:hello@crestify.co" className="mono" style={{ color: '#ffffffcc', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              hello@crestify.co
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = ['Solution-first', 'Founder-led', 'Embedded', 'E-commerce systems', 'Software platforms', 'Built to last', 'Small teams · Loud results'];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="ticker">
      <div className="marquee">
        <div className="marquee-track">
          {repeated.map((t, i) => <span key={i}>{t} <span className="ticker-dot">●</span></span>)}
        </div>
        <div className="marquee-track" aria-hidden>
          {repeated.map((t, i) => <span key={i}>{t} <span className="ticker-dot">●</span></span>)}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  useReveal();
  return (
    <div className="page">
      <Nav />
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
