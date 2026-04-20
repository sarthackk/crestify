import { useParams, Link, Navigate } from 'react-router-dom';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import Placeholder from '../components/shared/Placeholder.jsx';
import { useReveal } from '../components/shared/useReveal.js';
import { CASE_STUDIES } from './Work.jsx';

const DETAILS = {
  prepnest: {
    challenge: 'College placement is a four-sided market — students need discovery, mentors need scheduling, colleges need reporting, and employers need qualified shortlists. Prepnest was trying to run this on spreadsheets, WhatsApp groups, and a half-built MVP that had stalled for six months.',
    solution: 'We designed and built four purpose-fit portals — student, mentor, college admin, and employer — each with its own UX flow and permission model, all sharing one API and database. AI resume scoring surfaces the top candidates automatically. Mentor availability syncs in real time. Employers get a live shortlist, not a PDF.',
    outcome: 'The platform went live commercially within the contracted timeline and is now deployed across multiple colleges. Placement coordinators report the process that used to take two weeks of back-and-forth now takes under a day.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Python (AI scoring)', 'AWS'],
    quote: { text: 'Four portals, one coherent product. They held the whole thing in their heads and shipped it.', attr: 'Placement Director, Partner College' },
  },
  'pms-asset-builder': {
    challenge: "The Cadet Labs manages technical documentation for a fleet of commercial vessels. Ship manuals run to thousands of pages per vessel, each formatted differently, scanned at varying quality. Finding a specific procedure for a specific piece of equipment on a specific ship meant hours of manual search.",
    solution: 'We built an OCR ingestion pipeline that processes PDFs regardless of scan quality, extracts structured text, and feeds it to an AI classification layer. Documents are automatically tagged by vessel, equipment category, and section type. The search interface surfaces exact pages, not just documents.',
    outcome: 'What previously took hours of manual digging now returns results in seconds. The system is deployed across MV Atlas, ZX Shipping, Blue Ocean, and Neptune Cargo — four active ship projects — with more onboarding.',
    stack: ['Python', 'Tesseract OCR', 'OpenAI API', 'FastAPI', 'React', 'PostgreSQL'],
    quote: { text: 'Our engineers used to dread document searches. Now they just search.', attr: 'Operations Lead, The Cadet Labs' },
  },
  'match-trackers': {
    challenge: "Sports fans expect live scores instantly. A one-second delay feels broken. At 100k concurrent users during a major tournament, most platforms either throttle the data or let the servers fall over. The client needed a platform that could handle both cricket and football, with full stats — not just scores.",
    solution: 'We built a custom real-time data pipeline on the MERN stack with WebSocket delivery and aggressive edge caching. League navigation, player rankings, point tables, head-to-head stats, and upcoming fixtures all pull from the same unified data model. The architecture was load-tested before Asia Cup went live.',
    outcome: 'The platform held through Asia Cup without a single incident. It now serves 100k+ active users across cricket and football seasons. The odds integration — which most competitors avoid due to complexity — became a key differentiator.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'WebSockets', 'Redis'],
    quote: { text: 'Asia Cup traffic, zero downtime. That was the test and they passed it.', attr: 'Founder, Match Trackers' },
  },
  'equip-rentals': {
    challenge: 'Construction equipment rental ran entirely on phone calls. Workers called vendors, vendors called back, availability was guesswork, and delivery coordination happened over WhatsApp. There was no paper trail and no way to scale beyond personal relationships.',
    solution: 'A React Native app with two distinct portals: workers search by equipment type and location, pick delivery slots, and track order status in real time. Vendors list their fleet with availability, accept or decline requests, and manage active rentals from a dedicated dashboard. Both sides share live state.',
    outcome: 'The app shipped on iOS and Android. Real vendors were onboarded during the pilot — not a demo, an active marketplace. Booking that previously took multiple calls and a day of back-and-forth now closes in minutes.',
    stack: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'Firebase (realtime)'],
    quote: { text: 'Vendors started using it the week we launched. That told us everything.', attr: 'Co-founder, Equip Rentals' },
  },
  quickhunt: {
    challenge: "Quickhunt had built a genuinely useful SaaS product — feedback collection, public roadmaps, changelog broadcasting — but visitors couldn't figure out what it did or why they should care. Trial signups were low and drop-off was high. The product team knew the problem was positioning and UX, not the product itself.",
    solution: 'Full redesign of the marketing site and the core webapp UI. We ran a conversion-focused audit, rebuilt the information architecture around the user\'s job-to-be-done, and designed a new Figma system that the internal team could maintain. Every feature got a single-sentence value statement, not a paragraph.',
    outcome: 'Trial signup rate increased significantly post-launch. The redesigned webapp reduced onboarding confusion — support tickets about "how do I do X" dropped within the first month. The Figma system is still in active use.',
    stack: ['Figma', 'React', 'Framer Motion', 'Tailwind CSS'],
    quote: { text: 'We shipped the same features. The redesign was what made people finally get it.', attr: 'CEO, Quickhunt' },
  },
  mockzy: {
    challenge: "D2C brands need professional product imagery for every SKU — on white backgrounds, in lifestyle settings, in video. A photo studio shoot costs thousands and takes weeks. AI image tools require prompt expertise and produce inconsistent results. The gap between \"we need more content\" and \"we have more content\" was too expensive.",
    solution: "We built Mockzy: upload a smartphone photo of your product, and the AI pipeline generates photorealistic mockups, lifestyle scenes, and short-form video content — no prompting required. Workspace management lets teams organise by brand and campaign. Quick-start templates handle the most common use cases. Batch mode generates an entire catalog overnight.",
    outcome: 'Mockzy launched commercially with paying users from day one. The batch catalog feature became the primary acquisition driver — brands could generate a full product catalog in hours instead of weeks. Active development continues with new scene types and video formats.',
    stack: ['React', 'Python', 'Stable Diffusion (fine-tuned)', 'ComfyUI', 'FastAPI', 'S3', 'Stripe'],
    quote: { text: 'Our catalog went from 12 hero shots to 200 lifestyle images in a weekend. That is not an exaggeration.', attr: 'Brand Manager, Early Adopter' },
  },
};

export default function CaseStudy() {
  useReveal();
  const { slug } = useParams();
  const c = CASE_STUDIES.find(x => x.slug === slug);
  const d = DETAILS[slug];

  if (!c || !d) return <Navigate to="/work" replace />;

  const idx = CASE_STUDIES.indexOf(c);
  const prev = CASE_STUDIES[idx - 1];
  const next = CASE_STUDIES[idx + 1];

  return (
    <div className="page">
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: 64, paddingBottom: 'clamp(40px, 6vw, 70px)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <Eyebrow index={c.n}>{c.sector} · {c.year}</Eyebrow>
            <Link to="/work" className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>← All work</Link>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>{c.tag}</div>
          <h1 className="display" style={{ maxWidth: '22ch', fontSize: 'clamp(32px, 5vw, 72px)' }}>{c.headline}</h1>

          {/* Metrics bar */}
          <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 60px)', marginTop: 'clamp(32px, 5vw, 56px)', paddingTop: 24, borderTop: '1px solid var(--line-strong)', flexWrap: 'wrap' }}>
            {c.metrics.map(m => (
              <div key={m.v}>
                <div className="serif italic" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', color: 'var(--accent)', lineHeight: 1 }}>{m.k}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 6 }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="container" style={{ marginBottom: 'clamp(50px, 7vw, 90px)' }}>
        <Placeholder
          label={`${c.client.toUpperCase()} · ${c.sector}`}
          dim="2400 × 1200"
          ratio="24 / 10"
          dark={c.dark}
        />
      </div>

      {/* Body */}
      <section className="section-pad-sm">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 8vw, 100px)' }}>

          {/* Challenge */}
          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'start' }}>
            <div className="col-4" style={{ paddingTop: 4 }}>
              <Eyebrow>The challenge</Eyebrow>
              <div className="serif italic" style={{ fontSize: 'clamp(48px, 7vw, 88px)', lineHeight: 1, color: 'var(--line-strong)', marginTop: 16, userSelect: 'none' }}>01</div>
            </div>
            <p className="col-8 serif" style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.45, maxWidth: '48ch' }}>{d.challenge}</p>
          </div>

          {/* Solution */}
          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'start' }}>
            <div className="col-4" style={{ paddingTop: 4 }}>
              <Eyebrow>What we built</Eyebrow>
              <div className="serif italic" style={{ fontSize: 'clamp(48px, 7vw, 88px)', lineHeight: 1, color: 'var(--line-strong)', marginTop: 16, userSelect: 'none' }}>02</div>
            </div>
            <p className="col-8 body-lg" style={{ maxWidth: '48ch' }}>{d.solution}</p>
          </div>

          {/* Second image */}
          <Placeholder
            label={`${c.client.toUpperCase()} · Detail`}
            dim="2400 × 900"
            ratio="24 / 9"
            dark={!c.dark}
          />

          {/* Outcome */}
          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'start' }}>
            <div className="col-4" style={{ paddingTop: 4 }}>
              <Eyebrow>The outcome</Eyebrow>
              <div className="serif italic" style={{ fontSize: 'clamp(48px, 7vw, 88px)', lineHeight: 1, color: 'var(--line-strong)', marginTop: 16, userSelect: 'none' }}>03</div>
            </div>
            <div className="col-8">
              <p className="body-lg" style={{ maxWidth: '48ch' }}>{d.outcome}</p>
              <div style={{ marginTop: 32, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {d.stack.map(s => (
                  <span key={s} className="mono" style={{ padding: '7px 14px', border: '1px solid var(--line-strong)', borderRadius: 999, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)' }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Quote */}
      {d.quote && (
        <section className="section-pad" style={{ background: 'var(--bg-deep)', color: 'var(--bg)' }}>
          <div className="container">
            <blockquote style={{ maxWidth: '42ch' }}>
              <p className="serif italic" style={{ fontSize: 'clamp(22px, 3vw, 40px)', lineHeight: 1.18, letterSpacing: '-0.012em' }}>"{d.quote.text}"</p>
              <div className="mono" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 28, paddingTop: 18, borderTop: '1px solid #ffffff22' }}>{d.quote.attr}</div>
            </blockquote>
          </div>
        </section>
      )}

      {/* Prev / Next nav */}
      <section style={{ borderTop: '1px solid var(--line-strong)', padding: 'clamp(36px, 5vw, 64px) 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          {prev ? (
            <Link to={`/work/${prev.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>← Previous</div>
              <div className="serif" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>{prev.client}</div>
            </Link>
          ) : <div />}
          <Link to="/work" className="btn btn-ghost">All work</Link>
          {next ? (
            <Link to={`/work/${next.slug}`} style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Next →</div>
              <div className="serif" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>{next.client}</div>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(60px, 8vw, 100px) 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--accent)' }} />
        <div className="container">
          <Eyebrow light>Start a project</Eyebrow>
          <h2 className="display" style={{ color: 'var(--bg)', marginTop: 18, fontSize: 'clamp(44px, 7vw, 110px)', maxWidth: '16ch', lineHeight: 1.02 }}>
            Got something <span className="italic" style={{ color: 'var(--accent)' }}>worth building?</span>
          </h2>
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
