import { Link } from 'react-router-dom';
import SEO, { serviceSchema, faqSchema, breadcrumbSchema } from '../../components/shared/SEO.jsx';
import Nav from '../../components/shared/Nav.jsx';
import Footer from '../../components/shared/Footer.jsx';
import Eyebrow from '../../components/shared/Eyebrow.jsx';
import { useReveal } from '../../components/shared/useReveal.js';

const CAPABILITIES = [
  { n: '01', t: 'Greenfield SaaS Builds (0→1)', d: 'From architecture to deployed product. We design the data model, build the API, ship the frontend, and hand you working software — not a prototype.' },
  { n: '02', t: 'AI & ML Infrastructure', d: 'LLM integrations, fine-tuned model pipelines, RAG systems, and AI product features that actually work in production — not just in a Jupyter notebook.' },
  { n: '03', t: 'Platform Rewrites & Modernization', d: 'Legacy systems holding you back? We rewrite them — incrementally, without downtime, and without breaking the revenue engine while we work.' },
  { n: '04', t: 'API Design & Backend Engineering', d: 'RESTful and GraphQL APIs built for scale. Rate limiting, auth, webhooks, and documentation included. Developer-facing products are our specialty.' },
  { n: '05', t: 'Developer Tooling & SDKs', d: 'Internal tooling, CLI tools, client SDKs, and automation pipelines. We build the infrastructure other engineers use.' },
  { n: '06', t: 'Embedded Engineering Teams', d: 'A founder + 1–3 senior engineers embedded into your team for a quarter or longer. Code, architecture, and delivery accountability — not agency arms-length.' },
];

const STACK = [
  'React / Next.js', 'Node.js / FastAPI', 'Python (AI/ML)',
  'PostgreSQL / MongoDB', 'AWS / GCP', 'Docker / Kubernetes',
  'OpenAI / Anthropic APIs', 'Stripe', 'Redis',
];

const RESULTS = [
  { k: '40+', v: 'Products shipped' },
  { k: '0→1', v: 'Specialist team' },
  { k: 'AI', v: 'Native capability' },
  { k: '5yr', v: 'Operating track record' },
];

const FAQS = [
  { q: 'What makes Crestify different from a typical software agency?', a: 'The founders — Sarthak Tiwari — personally architects and ships every engagement. You get senior judgment on every decision, not junior execution under a project manager.' },
  { q: 'Do you take equity or only cash?', a: 'Both. For early-stage builds we sometimes take a small equity component alongside reduced cash. Mature companies pay standard retainers or fixed-bid fees.' },
  { q: 'How long does a SaaS product build take?', a: 'A greenfield 0→1 build typically runs 8–16 weeks depending on scope. We give fixed timelines with weekly demos — no surprises in week 10.' },
  { q: 'Can you build AI-powered features into our product?', a: 'Yes. AI integration is a core capability — LLM routing, RAG pipelines, fine-tuned models, and custom AI features that ship to production, not just demos.' },
  { q: 'Do you work with early-stage startups?', a: 'Yes. Many of our best engagements are with founders who have an idea and need a senior technical co-builder. We move fast and stay lean.' },
  { q: 'Where is your team based?', a: 'Core team in Dehradun and Toronto with extended senior operators across five timezones. We work async-first and overlap with both Indian and North American hours.' },
];

const PROJECTS = [
  { name: 'Prepnest', sector: 'Career Tech · SaaS', tag: 'Full Platform', result: '4-portal hiring OS for colleges, students, mentors, and employers. AI resume scoring. Live across multiple colleges.' },
  { name: 'PMS Asset Builder', sector: 'Maritime · Enterprise', tag: 'AI + OCR', result: 'OCR ingestion + AI classification for ship documentation. What took hours now takes seconds. 4 active ship projects.' },
  { name: 'Mockzy', sector: 'AI · D2C SaaS', tag: 'AI Product', result: 'AI creative studio for D2C brands. Batch catalog generation. Live with paying users from day one.' },
];

export default function SaaSDevelopment() {
  useReveal();

  const schema = [
    serviceSchema(
      'SaaS Product Development Company India',
      'End-to-end SaaS and software platform development for startups and scaleups. AI integration, backend engineering, and 0-to-1 product builds.',
      '/saas-development'
    ),
    faqSchema(FAQS.map(f => ({ q: f.q, a: f.a }))),
    breadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'SaaS Development', href: '/saas-development' },
    ]),
  ];

  return (
    <div className="page">
      <SEO
        title="SaaS Product Development Company India — Crestify"
        description="Founder-led SaaS and software development for startups and scaleups. 0→1 product builds, AI integration, platform engineering, and embedded senior teams. Based in India."
        canonical="/saas-development"
        keywords="SaaS development company India, software product development India, AI product development, MVP SaaS development, startup software development India, backend engineering India"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: 64, paddingBottom: 'clamp(50px, 7vw, 90px)' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <Eyebrow index="01">SaaS & Software Development · India</Eyebrow>
          </div>
          <h1 className="display" style={{ maxWidth: '16ch' }}>
            SaaS built by people who <span className="italic" style={{ color: 'var(--ink-3)' }}>operate it too.</span>
          </h1>
          <div className="grid" style={{ gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 70px)', alignItems: 'start' }}>
            <p className="body-lg col-7" style={{ maxWidth: '52ch' }}>
              Crestify is a founder-led software product studio. We design, build, and ship SaaS platforms, AI products, and developer-facing infrastructure — from zero to production. No juniors. No handoffs. No discovery decks that lead nowhere.
            </p>
            <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <Link to="/contact" className="btn btn-accent" style={{ fontSize: 16, padding: '18px 28px' }}>
                Start a project <span className="arr">→</span>
              </Link>
              <Link to="/work" className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                See our work →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: 'clamp(24px, 3vw, 40px) 0', gap: 32 }}>
            {RESULTS.map(r => (
              <div key={r.v} className="reveal">
                <div className="serif italic" style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--accent)', lineHeight: 1 }}>{r.k}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 6 }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad" style={{ borderBottom: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            <div className="col-4"><Eyebrow index="02">What we build</Eyebrow></div>
            <h2 className="h2 col-8">Software products. <span className="italic" style={{ color: 'var(--ink-3)' }}>Not deliverables.</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line-strong)' }}>
            {CAPABILITIES.map((c, i) => (
              <div key={c.n} className="reveal grid" style={{ '--i': i, gap: 'var(--gap)', padding: 'clamp(24px, 3vw, 40px) 0', borderBottom: '1px solid var(--line-strong)', alignItems: 'start' }}>
                <div className="col-4">
                  <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>§{c.n}</div>
                  <h3 className="serif" style={{ fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.2 }}>{c.t}</h3>
                </div>
                <p className="col-8 body" style={{ fontSize: 16, maxWidth: '52ch', paddingTop: 4 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="section-pad" style={{ background: 'var(--bg-elev)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 40 }}>
            <div className="col-4"><Eyebrow index="03">Our stack</Eyebrow></div>
            <h2 className="h2 col-8">Senior-chosen. <span className="italic" style={{ color: 'var(--ink-3)' }}>Production-proven.</span></h2>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {STACK.map(s => (
              <span key={s} className="mono reveal" style={{ padding: '10px 16px', border: '1px solid var(--line-strong)', borderRadius: 999, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)', background: 'var(--bg)' }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="section-pad">
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            <div className="col-4"><Eyebrow index="04">Selected work</Eyebrow></div>
            <h2 className="h2 col-8">Products shipped. <span className="italic" style={{ color: 'var(--ink-3)' }}>Still running.</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line-strong)' }}>
            {PROJECTS.map((p, i) => (
              <div key={p.name} className="reveal grid" style={{ '--i': i, gap: 'var(--gap)', padding: 'clamp(20px, 3vw, 36px) 0', borderBottom: '1px solid var(--line-strong)', alignItems: 'center' }}>
                <div className="col-3">
                  <div className="serif" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>{p.name}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 6 }}>{p.sector}</div>
                </div>
                <div className="col-3">
                  <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', background: 'var(--bg-elev)', padding: '4px 10px', borderRadius: 999 }}>{p.tag}</span>
                </div>
                <p className="col-6 body" style={{ fontSize: 15, color: 'var(--ink-3)' }}>{p.result}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link to="/work" className="btn btn-ghost">See all case studies</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 40 }}>
            <div className="col-4">
              <Eyebrow index="05">Asked often</Eyebrow>
              <h2 className="h2" style={{ marginTop: 16 }}>Quick <span className="italic" style={{ color: 'var(--ink-3)' }}>answers.</span></h2>
            </div>
            <div className="col-8">
              <div style={{ borderTop: '1px solid var(--line-strong)' }}>
                {FAQS.map((f, i) => (
                  <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid var(--line-strong)' }}>
                    <h3 className="serif" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', marginBottom: 8 }}>{f.q}</h3>
                    <p className="body" style={{ fontSize: 15, color: 'var(--ink-3)', maxWidth: '60ch' }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(80px, 12vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--accent)' }} />
        <div className="container">
          <Eyebrow light>Start a project</Eyebrow>
          <h2 className="display" style={{ color: 'var(--bg)', marginTop: 18, fontSize: 'clamp(44px, 7vw, 110px)', maxWidth: '16ch', lineHeight: 1.02 }}>
            Got something <span className="italic" style={{ color: 'var(--accent)' }}>worth building?</span>
          </h2>
          <p className="body-lg" style={{ color: '#9c9b95', maxWidth: '48ch', marginTop: 24 }}>
            Tell us what you are trying to ship. We will tell you in 48 hours if we are the right team.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 36, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/contact" className="btn" style={{ background: 'var(--accent)', color: 'white', fontSize: 16, padding: '18px 28px' }}>
              Brief us <span className="arr">→</span>
            </Link>
            <a href="mailto:hello@crestify.co" className="mono" style={{ color: '#9c9b95', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              hello@crestify.co
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
