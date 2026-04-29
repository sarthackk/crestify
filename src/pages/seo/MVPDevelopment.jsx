import { Link } from 'react-router-dom';
import SEO, { serviceSchema, faqSchema, breadcrumbSchema } from '../../components/shared/SEO.jsx';
import Nav from '../../components/shared/Nav.jsx';
import Footer from '../../components/shared/Footer.jsx';
import Eyebrow from '../../components/shared/Eyebrow.jsx';
import { useReveal } from '../../components/shared/useReveal.js';

const PROCESS = [
  { n: '01', t: 'Scoping spike', dur: 'Week 1–2', d: 'A paid 1–2 week deep-dive. You get a real architecture plan, real estimates, and a feature list cut to the true MVP — yours to keep even if we do not build it.' },
  { n: '02', t: 'Design sprint', dur: 'Week 2–3', d: 'Wireframes, interaction design, and a component system. We design for the user journey — not for the portfolio. Every screen has a job.' },
  { n: '03', t: 'Build in sprints', dur: 'Week 3–10', d: 'Two-week sprints with a Friday demo. You see working software every cycle. No surprises in week 8. No "almost done" for six months.' },
  { n: '04', t: 'Launch & handoff', dur: 'Final week', d: 'Deployed, documented, and handed over with a 30-day support window. You own the code, the infrastructure, and the roadmap.' },
];

const WHAT_YOU_GET = [
  'Deployed, working product — not a prototype',
  'Full source code ownership, no lock-in',
  'Documented codebase your team can extend',
  'Architecture built to scale when you raise',
  'Direct line to the founder throughout',
  '30-day post-launch support window',
];

const RESULTS = [
  { k: '8–12', v: 'Weeks to MVP' },
  { k: '0→1', v: 'Our specialty' },
  { k: '40+', v: 'Products shipped' },
  { k: '92%', v: 'Client retention' },
];

const FAQS = [
  { q: 'What exactly is included in an MVP build?', a: 'Core feature set, deployed product, source code, basic documentation, and a 30-day support window. We cut scope ruthlessly to ship fast — then you validate before adding more.' },
  { q: 'How do you decide what goes in the MVP?', a: 'We run a scoping spike: a paid 1–2 week engagement where we identify the one core job your product does, and cut everything else. You get a real spec, not a feature wish list.' },
  { q: 'How long does an MVP build take?', a: 'Typically 8–12 weeks from signed contract to deployed product. Complex AI features or multi-platform builds can run to 16 weeks. We give fixed timelines and hold them.' },
  { q: 'Do you work with non-technical founders?', a: 'Yes. Many of our best client relationships are with founders who have domain expertise and a sharp problem statement but need a technical co-builder. We translate business logic into product.' },
  { q: 'Can you build with AI features from day one?', a: 'Yes. AI-native product builds — LLM integrations, recommendation engines, document processing, image generation — are a core capability, not an add-on.' },
  { q: 'What happens after the MVP is launched?', a: 'You own the code and can run it independently. Most clients move to a retainer or embedded model with us once they have validated the MVP and raised. We are available but not required.' },
];

const PROJECTS = [
  { name: 'Prepnest', sector: 'Career Tech', tag: '0→1 Platform', result: 'Four-portal hiring OS built and shipped within contracted timeline. Now live at multiple colleges.' },
  { name: 'Match Trackers', sector: 'Sports Tech', tag: 'MERN · Real-time', result: 'Live sports platform handling 100k+ users through Asia Cup. Built, launched, scaled.' },
  { name: 'Equip Rentals', sector: 'Construction Tech', tag: 'React Native MVP', result: 'Dual-portal marketplace app. iOS + Android. Real vendors onboarded in pilot week.' },
];

const GOOD_FIT = [
  'You have a validated problem and need a technical co-builder',
  'You need working software in under 12 weeks',
  'You want the founder on your calls, not a project manager',
  'You are pre-seed to Series A and building your core product',
  'You need AI-native features from day one',
];

const BAD_FIT = [
  'You just want to "explore the idea" without committing to a build',
  'You need a discovery document, not a deployed product',
  'You want 10 agencies to compete on a brief',
  'Your RFP runs longer than your runway',
];

export default function MVPDevelopment() {
  useReveal();

  const schema = [
    serviceSchema(
      'MVP Development for Startups India',
      'End-to-end MVP development for founders and early-stage startups. From scoping to deployed product in 8–12 weeks. AI-native. Founder-led.',
      '/mvp-development'
    ),
    faqSchema(FAQS.map(f => ({ q: f.q, a: f.a }))),
    breadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'MVP Development', href: '/mvp-development' },
    ]),
  ];

  return (
    <div className="page">
      <SEO
        title="MVP Development for Startups India — Crestify"
        description="Founder-led MVP development in 8–12 weeks. From scoping spike to deployed product. AI-native builds, full code ownership, no lock-in. For pre-seed to Series A startups."
        canonical="/mvp-development"
        keywords="MVP development India, startup MVP development, MVP development company India, product development startup India, build MVP fast India, founder-led product studio"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: 64, paddingBottom: 'clamp(50px, 7vw, 90px)' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <Eyebrow index="01">MVP Development · India</Eyebrow>
          </div>
          <h1 className="display" style={{ maxWidth: '16ch' }}>
            From idea to deployed product. <span className="italic" style={{ color: 'var(--ink-3)' }}>8–12 weeks.</span>
          </h1>
          <div className="grid" style={{ gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 70px)', alignItems: 'start' }}>
            <p className="body-lg col-7" style={{ maxWidth: '52ch' }}>
              Crestify builds MVPs for founders who need working software, not a discovery report. We scope it, design it, build it, and hand it over fully deployed — with code you own and a team you can call.
            </p>
            <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <Link to="/contact" className="btn btn-accent" style={{ fontSize: 16, padding: '18px 28px' }}>
                Tell us what you are building <span className="arr">→</span>
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

      {/* How it works */}
      <section className="section-pad" style={{ borderBottom: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            <div className="col-4"><Eyebrow index="02">How an MVP engagement runs</Eyebrow></div>
            <h2 className="h2 col-8">Four stages. <span className="italic" style={{ color: 'var(--ink-3)' }}>No surprises.</span></h2>
          </div>
          <div className="grid-4 keep-2" style={{ gap: 'var(--gap)' }}>
            {PROCESS.map((p, i) => (
              <div key={p.n} className="reveal" style={{ '--i': i, borderTop: '1px solid var(--ink)', paddingTop: 22 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{p.dur}</div>
                <div className="serif" style={{ fontSize: 28, marginTop: 14, fontStyle: 'italic' }}>{p.t}</div>
                <p className="body" style={{ marginTop: 12, fontSize: 14.5 }}>{p.d}</p>
                <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', marginTop: 18, letterSpacing: '0.12em' }}>§{p.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="section-pad" style={{ background: 'var(--bg-elev)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)' }}>
            <div className="col-4">
              <Eyebrow index="03">What you get</Eyebrow>
              <h2 className="h2" style={{ marginTop: 16 }}>Real software. <span className="italic" style={{ color: 'var(--ink-3)' }}>Not a demo.</span></h2>
              <p className="body-lg" style={{ marginTop: 20, maxWidth: '36ch' }}>Every MVP we ship is production-grade, deployed, and fully handed over. You own everything.</p>
            </div>
            <ul className="col-8" style={{ listStyle: 'none', borderTop: '1px solid var(--line-strong)', alignSelf: 'start' }}>
              {WHAT_YOU_GET.map((w, i) => (
                <li key={w} className="reveal" style={{ '--i': i, display: 'flex', alignItems: 'center', gap: 16, padding: '18px 0', borderBottom: '1px solid var(--line-strong)' }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 14, flexShrink: 0 }}>→</span>
                  <span className="serif" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)' }}>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Good fit / Bad fit */}
      <section className="section-pad">
        <div className="container">
          <div className="grid-2" style={{ gap: 'var(--gap)' }}>
            <div>
              <Eyebrow>Good fit</Eyebrow>
              <h3 className="serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginTop: 16, marginBottom: 24 }}>We're right for you <span className="italic">if...</span></h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {GOOD_FIT.map(g => (
                  <li key={g} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                    <span className="body" style={{ fontSize: 15 }}>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: 'clamp(24px, 3vw, 40px)', background: 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderRadius: 4 }}>
              <Eyebrow>Not a fit</Eyebrow>
              <h3 className="serif" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginTop: 16, marginBottom: 24 }}>We pass if <span className="italic">you need...</span></h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {BAD_FIT.map(b => (
                  <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                    <span style={{ color: 'var(--ink-4)', flexShrink: 0 }}>✕</span>
                    <span className="body" style={{ fontSize: 15, color: 'var(--ink-3)' }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            <div className="col-4"><Eyebrow index="04">MVPs we shipped</Eyebrow></div>
            <h2 className="h2 col-8">Zero to live. <span className="italic" style={{ color: 'var(--ink-3)' }}>All still running.</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line-strong)' }}>
            {PROJECTS.map((p, i) => (
              <div key={p.name} className="reveal grid" style={{ '--i': i, gap: 'var(--gap)', padding: 'clamp(20px, 3vw, 36px) 0', borderBottom: '1px solid var(--line-strong)', alignItems: 'center' }}>
                <div className="col-3">
                  <div className="serif" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>{p.name}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 6 }}>{p.sector}</div>
                </div>
                <div className="col-3">
                  <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', background: 'var(--bg)', padding: '4px 10px', borderRadius: 999 }}>{p.tag}</span>
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
      <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
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
      <section style={{ background: 'var(--accent)', color: 'white', padding: 'clamp(80px, 12vw, 160px) 0' }}>
        <div className="container">
          <Eyebrow light>Start your MVP</Eyebrow>
          <h2 className="display" style={{ color: 'white', marginTop: 18, fontSize: 'clamp(44px, 8vw, 120px)', maxWidth: '16ch' }}>
            8 weeks to <span className="italic">something real.</span>
          </h2>
          <p className="body-lg" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '48ch', marginTop: 24 }}>
            Send us a few sentences about what you are building. We will reply within 48 hours with a yes, a no, or a clarifying question.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 36, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/contact" className="btn" style={{ background: '#fff', color: 'var(--accent)', fontSize: 16, padding: '18px 28px' }}>
              Brief us <span className="arr">→</span>
            </Link>
            <a href="mailto:hello@crestify.co" className="mono" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              hello@crestify.co
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
