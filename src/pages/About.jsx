import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import Placeholder from '../components/shared/Placeholder.jsx';
import { useReveal } from '../components/shared/useReveal.js';

function HeroAbout() {
  return (
    <section style={{ paddingTop: 64, paddingBottom: 'clamp(50px, 7vw, 90px)' }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}><Eyebrow index="01">About the studio</Eyebrow></div>
        <h1 className="display" style={{ maxWidth: '14ch' }}>
          A studio of <span className="italic" style={{ color: 'var(--ink-3)' }}>operators,</span><br />not consultants.
        </h1>
        <div className="grid" style={{ gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }}>
          <div className="col-4">
            <Eyebrow>Started in</Eyebrow>
            <div className="serif" style={{ fontSize: 56, marginTop: 8, lineHeight: 1 }}>2021</div>
          </div>
          <div className="col-8">
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

function ManifestoQuote() {
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(80px, 12vw, 160px) 0' }}>
      <div className="container">
        <Eyebrow light>Manifesto · 03 lines</Eyebrow>
        <p className="serif" style={{ fontSize: 'clamp(28px, 6vw, 88px)', lineHeight: 1.04, letterSpacing: '-0.018em', marginTop: 32, maxWidth: '20ch' }}>
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


const FOUNDERS_LONG = [
  {
    name: 'Sarthak Tiwari', initials: 'ST', role: 'Founder · Your prime POC',
    bio: "Think of me as your fractional CTO. I work closely with founders and teams to turn ideas into structured, scalable systems — whether that means defining architecture, guiding product decisions, or getting deeply involved in execution.",
    bio2: "When you work with Crestify, you're not just hiring a team. You're getting a builder who has been through the process many times.",
    focus: ['System architecture', 'Product decisions', 'AI & automation', 'Full-stack delivery'],
    quote: "The people who pitch the work should do the work. We built the whole studio around that.",
    socials: [
      { label: 'Portfolio', href: '/sarthak', internal: true },
      { label: 'X', href: 'https://x.com/sarthaktiwari' },
      { label: 'Facebook', href: '#' },
    ],
  },
  {
    name: 'Aditya Tripathi', initials: 'AT', role: 'Operations · PM',
    bio: "Aditya ensures that projects move smoothly from planning to execution. With a background in business, commerce, and sales, he focuses on aligning timelines, communication, and delivery, helping teams and clients stay organised and ensuring every system we build moves forward with clarity.",
    bio2: null,
    focus: ['Project management', 'Client operations', 'Sales & commerce', 'Delivery systems'],
    quote: "Clarity in delivery is a feature. We make sure nothing falls between the cracks.",
    socials: [
      { label: 'X', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  },
];

function FoundersDetailed() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          <div className="col-4"><Eyebrow index="03">The founders</Eyebrow></div>
          <h2 className="h2 col-8">The people <span className="italic" style={{ color: 'var(--ink-3)' }}>doing the work.</span></h2>
        </div>

        {FOUNDERS_LONG.map((f, i) => (
          <article key={f.name} className="grid" style={{ gap: 'var(--gap)', padding: 'clamp(40px, 5vw, 64px) 0', borderTop: '1px solid var(--line-strong)', borderBottom: i === FOUNDERS_LONG.length - 1 ? '1px solid var(--line-strong)' : 'none' }}>
            <div className="col-4">
              <div style={{ aspectRatio: '4 / 5', background: 'var(--ink)', position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
                <Placeholder dark label={`PORTRAIT · ${f.name}`} dim="800 × 1000" ratio="4 / 5" />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--serif)', fontSize: 96, fontStyle: 'italic', color: '#3a3a3a', pointerEvents: 'none' }}>{f.initials}</div>
              </div>
              <div style={{ marginTop: 18 }}>
                <div className="serif" style={{ fontSize: 28 }}>{f.name}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 6 }}>{f.role}</div>
              </div>
            </div>

            <div className="col-8">
              <p className="serif" style={{ fontSize: 'clamp(20px, 2.6vw, 36px)', lineHeight: 1.2, letterSpacing: '-0.012em', fontStyle: 'italic', color: 'var(--ink)', maxWidth: '26ch', borderLeft: '3px solid var(--accent)', paddingLeft: 20 }}>
                "{f.quote}"
              </p>
              <p className="body-lg" style={{ marginTop: 32, maxWidth: '46ch' }}>{f.bio}</p>
              {f.bio2 && <p className="body-lg" style={{ marginTop: 16, maxWidth: '46ch', color: 'var(--ink-3)' }}>{f.bio2}</p>}
              <div style={{ marginTop: 40 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Focus areas</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {f.focus.map(x => <li key={x} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}><span style={{ color: 'var(--accent)', fontSize: 10 }}>→</span><span className="serif" style={{ fontSize: 17 }}>{x}</span></li>)}
                </ul>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
                {f.socials.map(s => (
                  s.internal
                    ? <Link key={s.label} to={s.href} className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid var(--accent)', padding: '8px 14px', borderRadius: 999 }}>{s.label} →</Link>
                    : <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid var(--line-strong)', padding: '8px 14px', borderRadius: 999 }}>{s.label} ↗</a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatsAbout() {
  const stats = [
    { n: '7+', l: 'Years operating' }, { n: '40+', l: 'Engagements shipped' },
    { n: '11', l: 'Senior operators' }, { n: '92%', l: 'Client retention' },
    { n: '2.4y', l: 'Avg. partnership' }, { n: '3', l: 'Internal products' },
  ];
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div className="container">
        <Eyebrow light>By the numbers</Eyebrow>
        <div className="grid-6 keep-3" style={{ gap: 'var(--gap)', marginTop: 40 }}>
          {stats.map(s => (
            <div key={s.l}>
              <div className="serif" style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>{s.n}</div>
              <div className="mono" style={{ fontSize: 10.5, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 12 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CLIENTS = ['LUMEN', 'HATCHWELL', 'MARIS', 'NORTHWIND', 'OBLIQUE', 'CASCADIA', 'AURELIA', 'POSTLAB', 'TRYHARD', 'KINSEY', 'RILEY/CO', 'VANTA'];

function Clients() {
  return (
    <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="dot-divider" style={{ marginBottom: 32 }}>Trusted by — selected partners</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0, border: '1px solid var(--line-strong)', borderRadius: 4, overflow: 'hidden' }}>
          {CLIENTS.map((c, i) => (
            <div key={c} style={{ padding: '24px 10px', borderRight: (i + 1) % 6 === 0 ? 'none' : '1px solid var(--line-strong)', borderBottom: i < 6 ? '1px solid var(--line-strong)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: 'clamp(14px, 2vw, 22px)', color: 'var(--ink-3)', letterSpacing: '0.04em', textAlign: 'center' }}>{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: 'How is Crestify different from a typical agency?', a: 'We have a close team of 15 people who work across projects — but the founders pitch the work, scope it, and stay accountable on every engagement. You never get handed off to someone you have never met. The team executes, the founders own the outcome.' },
  { q: 'Do you take equity or only cash engagements?', a: 'Both. For early-stage product builds we sometimes take a small equity component alongside reduced cash. Mature companies pay standard retainers or fixed-bid project fees.' },
  { q: "What's the smallest engagement you'll take?", a: "Two weeks for an audit or strategy spike. Anything smaller and we can't do it well. Build engagements typically run 6–16 weeks." },
  { q: 'Will I work with the founders or someone else?', a: "You will always have the founders as your primary point of contact and accountability. We have a team of 15 people who work on projects, but Sarthak and Aditya stay involved end-to-end — from the first call to the final ship." },
  { q: 'Where are you located?', a: 'Toronto and London, with an extended team across five timezones. We work async-first but overlap with most North American and European business hours.' },
  { q: 'Do you sign NDAs before the first call?', a: "Yes. Send one over with your intro email. We'll counter-sign within 24 hours." },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)' }}>
          <div className="col-4">
            <Eyebrow index="04">Asked often</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16 }}>Questions, <span className="italic" style={{ color: 'var(--ink-3)' }}>answered.</span></h2>
          </div>
          <div className="col-8">
            <div style={{ borderTop: '1px solid var(--line-strong)' }}>
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} onClick={() => setOpen(isOpen ? -1 : i)} style={{ borderBottom: '1px solid var(--line-strong)', padding: '20px 0', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                      <h3 className="serif" style={{ fontSize: 'clamp(17px, 1.8vw, 22px)', lineHeight: 1.2 }}>{f.q}</h3>
                      <span style={{ fontSize: 22, color: 'var(--ink-3)', flexShrink: 0 }}>{isOpen ? '–' : '+'}</span>
                    </div>
                    <div style={{ maxHeight: isOpen ? 240 : 0, opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s', marginTop: isOpen ? 14 : 0 }}>
                      <p className="body" style={{ fontSize: 15, maxWidth: '60ch' }}>{f.a}</p>
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

function ContactCTAAbout() {
  return (
    <section style={{ background: 'var(--accent)', color: 'white', padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <Eyebrow light>Let's create</Eyebrow>
        <h2 className="display" style={{ color: 'white', marginTop: 18, fontSize: 'clamp(48px, 9vw, 140px)', maxWidth: '14ch' }}>
          Something <span className="italic">lasting.</span>
        </h2>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn" style={{ background: '#fff', color: 'var(--accent)', fontSize: 16, padding: '18px 28px' }}>Start a project <span className="arr">→</span></Link>
          <Link to="/work" className="btn" style={{ border: '1px solid #ffffff66', color: '#fff', fontSize: 16, padding: '18px 28px' }}>See selected work</Link>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  useReveal();
  return (
    <div className="page">
      <Nav />
      <HeroAbout />
      <ManifestoQuote />
      <FoundersDetailed />
      <StatsAbout />
      <Clients />
      <FAQ />
      <ContactCTAAbout />
      <Footer />
    </div>
  );
}
