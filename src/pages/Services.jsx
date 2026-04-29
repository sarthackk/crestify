import { Link } from 'react-router-dom';
import SEO, { serviceSchema } from '../components/shared/SEO.jsx';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import { useReveal } from '../components/shared/useReveal.js';

const SERVICES = [
  {
    n: '01', title: 'Commerce systems', tag: 'E-commerce',
    summary: 'Replatforms, headless builds, subscriptions, and growth infrastructure for serious DTC brands.',
    deliverables: ['Shopify Plus / Hydrogen replatforms', 'Headless storefronts (Next, Remix)', 'Subscription engines (Recharge, Stay)', 'Checkout & CRO optimization', 'OMS, ERP, and 3PL integrations', 'Loyalty & retention systems'],
    when: "You've outgrown Shopify themes, your checkout is leaking conversion, or your stack is held together by Zapier.",
    duration: '6–16 weeks · fixed-bid or retainer',
  },
  {
    n: '02', title: 'Software platforms', tag: 'SaaS / Infra',
    summary: "Backend systems, AI infrastructure, and developer-facing products built by people who've shipped at scale.",
    deliverables: ['Greenfield product builds (0→1)', 'Platform engineering & rewrites', 'AI/ML infrastructure', 'Developer tooling & SDKs', 'API design & integrations', 'Performance & reliability work'],
    when: "You need a senior team to ship a real system — not a discovery doc — and your in-house team is at capacity.",
    duration: '8–24 weeks · retainer or embedded',
  },
  {
    n: '03', title: 'Embedded teams', tag: 'Augmentation',
    summary: 'A founder + 1–3 senior operators embedded into your team for a quarter or longer.',
    deliverables: ['Daily presence in Slack & standups', 'Code, design, and PM contributions', 'Hiring & technical advisory', 'Roadmap & architecture reviews', 'Direct executive line to founders'],
    when: "You're a founder or CTO who needs senior shoulder-to-shoulder help — not a vendor relationship.",
    duration: '12 weeks minimum · monthly retainer',
  },
];

function HeroServices() {
  return (
    <section style={{ paddingTop: 64, paddingBottom: 'clamp(50px, 7vw, 90px)' }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}><Eyebrow index="01">What we do</Eyebrow></div>
        <h1 className="display" style={{ maxWidth: '14ch' }}>
          Three offers. <span className="italic" style={{ color: 'var(--ink-3)' }}>No menu.</span>
        </h1>
        <div className="grid" style={{ gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 70px)' }}>
          <p className="body-lg col-7" style={{ maxWidth: '52ch' }}>
            We don't sell logos, decks, or strategy memos. Every engagement ends with something running in production — owned by your team, documented, and yours forever.
          </p>
          <div className="col-5" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <a href="#offers" className="btn btn-ghost">Jump to offers ↓</a>
            <Link to="/contact" className="btn btn-primary">Start a project <span className="arr">→</span></Link>
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
          <article key={s.n} className="grid" style={{ gap: 'var(--gap)', padding: 'clamp(40px, 7vw, 90px) 0', borderBottom: '1px solid var(--line-strong)', borderTop: i === 0 ? '1px solid var(--line-strong)' : 'none' }}>
            <div className="col-5">
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>§{s.n} / {s.tag}</div>
              <h2 className="h1" style={{ fontSize: 'clamp(36px, 5.5vw, 76px)' }}>{s.title}</h2>
              <p className="body-lg" style={{ marginTop: 22, maxWidth: '36ch' }}>{s.summary}</p>
              <div style={{ marginTop: 32, padding: 24, background: 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderRadius: 4 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>When to call us</div>
                <p className="serif italic" style={{ fontSize: 18, lineHeight: 1.3 }}>{s.when}</p>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                  Duration · {s.duration}
                </div>
              </div>
            </div>

            <div className="col-7">
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 18 }}>Capabilities</div>
              <ul style={{ listStyle: 'none', borderTop: '1px solid var(--line-strong)' }}>
                {s.deliverables.map((d, j) => (
                  <li key={d} style={{ display: 'flex', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--line-strong)', alignItems: 'center' }}>
                    <span className="mono" style={{ color: 'var(--accent)', fontSize: 10, flexShrink: 0 }}>§0{j + 1}</span>
                    <span className="serif" style={{ fontSize: 'clamp(17px, 1.8vw, 21px)' }}>{d}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 30, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Brief us on this <span className="arr">→</span></Link>
                <Link to="/work" className="btn btn-ghost">See related work</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const PROCESS = [
  { n: '01', t: 'Intro call', d: "30 minutes with both founders. We listen first, then tell you whether we're a fit.", dur: 'Week 1' },
  { n: '02', t: 'Scoping spike', d: 'A paid 1–2 week deep-dive. You get a real plan, real estimates, and real architecture — yours to keep.', dur: 'Week 1–2' },
  { n: '03', t: 'Build', d: 'We embed, ship in tight increments, and demo every Friday. No surprises in week 8.', dur: 'Week 3+' },
  { n: '04', t: 'Handoff', d: "Code, docs, runbooks, and a 30-day support window. We don't own your roadmap forever.", dur: 'Final week' },
];

function Process() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div className="col-4"><Eyebrow index="02">How an engagement runs</Eyebrow></div>
          <h2 className="h2 col-8">Four stages. <span className="italic" style={{ color: 'var(--ink-3)' }}>No surprises.</span></h2>
        </div>
        <div className="grid-4 keep-2" style={{ gap: 'var(--gap)' }}>
          {PROCESS.map(p => (
            <div key={p.n} style={{ borderTop: '1px solid var(--ink)', paddingTop: 22 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{p.dur}</div>
              <div className="serif" style={{ fontSize: 28, marginTop: 14, fontStyle: 'italic' }}>{p.t}</div>
              <p className="body" style={{ marginTop: 12, fontSize: 14.5 }}>{p.d}</p>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', marginTop: 18, letterSpacing: '0.12em' }}>§{p.n}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const WONT = [
  'Pure design retainers without engineering', 'Web3 / NFT / token launches',
  'SEO content farms or marketing sites alone', 'Pitch decks or fundraising material',
  "Discovery sprints that don't lead to a build", 'Team augmentation by junior contractors',
];

function WhatWeDont() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)' }}>
          <div className="col-5">
            <Eyebrow index="03">What we don't do</Eyebrow>
            <h2 className="h2" style={{ marginTop: 16 }}>Saying no <span className="italic" style={{ color: 'var(--ink-3)' }}>is the whole point.</span></h2>
            <p className="body-lg" style={{ marginTop: 22, maxWidth: '40ch' }}>
              Specialization compounds. We pass on plenty of good work to stay sharp at the work we're great at.
            </p>
          </div>
          <ul className="col-7" style={{ listStyle: 'none', borderTop: '1px solid var(--line-strong)', alignSelf: 'start' }}>
            {WONT.map(w => (
              <li key={w} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 0', borderBottom: '1px solid var(--line-strong)' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 14, flexShrink: 0 }}>✕</span>
                <span className="serif" style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--ink-3)' }}>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactCTAServices() {
  return (
    <section style={{ background: 'var(--accent)', color: 'white', padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <Eyebrow light>Let's create</Eyebrow>
        <h2 className="display" style={{ color: 'white', marginTop: 18, fontSize: 'clamp(48px, 9vw, 140px)', maxWidth: '14ch' }}>
          Something <span className="italic">lasting.</span>
        </h2>
        <Link to="/contact" className="btn" style={{ background: '#fff', color: 'var(--accent)', fontSize: 16, padding: '18px 28px', marginTop: 32 }}>
          Start a project <span className="arr">→</span>
        </Link>
      </div>
    </section>
  );
}

export default function Services() {
  useReveal();
  return (
    <div className="page">
      <SEO
        title="Services — SaaS, AI, Ecommerce & Mobile Development"
        description="From solution architecture to shipped product. Crestify builds SaaS applications, AI tools, MVP products, mobile apps, and ecommerce systems for startups and D2C brands."
        canonical="/services"
        keywords="SaaS development India, MVP development startup, AI product development, mobile app development India, ecommerce development agency"
        schema={serviceSchema('Software Product Development', 'End-to-end product development for SaaS, AI tools, ecommerce, and mobile — from architecture to launch.', '/services')}
      />
      <Nav />
      <HeroServices />
      <ServicesList />
      <Process />
      <WhatWeDont />
      <ContactCTAServices />
      <Footer />
    </div>
  );
}
