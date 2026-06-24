import { useParams, Link, Navigate } from 'react-router-dom';
import SEO, { breadcrumbSchema } from '../components/shared/SEO.jsx';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import Placeholder from '../components/shared/Placeholder.jsx';
import { useReveal } from '../components/shared/useReveal.js';
import { CASE_STUDIES } from './Work.jsx';

const DETAILS = {
  prepnest: {
    challenge: 'Campus placement is a four-sided problem. Students need to discover opportunities, mentors need to manage their time, placement cells need reporting they can defend, and employers need qualified shortlists — not inboxes full of PDFs. Prepnest was running all four sides on spreadsheets, WhatsApp groups, and a half-built MVP that had stalled for six months. Every new college made the cracks wider.',
    solution: 'We designed and built four purpose-fit portals — student, mentor, college admin, and employer — each with its own flows and permission model, all sharing a single API and database. An AI scoring layer reads every resume and surfaces the strongest candidates automatically, so coordinators stop ranking by hand. Mentor availability syncs live. Employers get a ranked, filterable shortlist instead of a folder of attachments.',
    outcome: 'Prepnest went live commercially inside the contracted timeline and now runs across multiple colleges. Placement coordinators say a cycle that used to eat two weeks of back-and-forth now closes in under a day — and for the first time the reporting holds up to scrutiny from administration.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Python (AI scoring)', 'AWS'],
    quote: { text: 'Four portals, one coherent product. They held the entire system in their heads and shipped it on time.', attr: 'Placement Director, Partner College' },
  },
  'pms-asset-builder': {
    challenge: "The Cadet Labs maintains technical documentation for a fleet of commercial vessels. Each ship's manuals run to thousands of pages — every set formatted differently, scanned at wildly varying quality, and rarely searchable. Finding one procedure for one piece of equipment on one vessel meant an engineer losing hours to manual digging, often under time pressure that doesn't forgive delay.",
    solution: 'We built an OCR ingestion pipeline that handles PDFs regardless of scan quality, extracts clean structured text, and passes it to an AI classification layer. Every document is automatically tagged by vessel, equipment category, and section type. The search interface returns the exact page — not a list of files to open one by one.',
    outcome: 'Searches that used to take hours now resolve in seconds. The system runs across four active ship projects — MV Atlas, ZX Shipping, Blue Ocean, and Neptune Cargo — with more vessels onboarding, and the same pipeline scales to each new fleet without re-engineering.',
    stack: ['Python', 'Tesseract OCR', 'OpenAI API', 'FastAPI', 'React', 'PostgreSQL'],
    quote: { text: 'Our engineers used to dread document searches. Now they just search.', attr: 'Operations Lead, The Cadet Labs' },
  },
  'match-trackers': {
    challenge: "Live-sports fans treat a one-second delay as a broken product. At 100k concurrent users during a major tournament, most platforms either throttle their data feeds or watch their servers fall over. Match Trackers needed to cover both cricket and football with the full depth — rankings, tables, head-to-head, odds — not just a scoreline that updates late.",
    solution: 'We built a custom real-time pipeline on the MERN stack, delivering over WebSockets with aggressive edge caching. League navigation, player rankings, point tables, head-to-head records, and fixtures all read from one unified data model, so a stat is never out of sync with the score. We load-tested the whole architecture before Asia Cup went live — not after the traffic arrived.',
    outcome: 'The platform held through Asia Cup with zero downtime and now serves 100k+ active users across cricket and football seasons. The odds integration — which most competitors avoid because it is genuinely hard to keep accurate in real time — became a core differentiator.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'WebSockets', 'Redis'],
    quote: { text: 'Asia Cup traffic, zero downtime. That was the test, and they passed it.', attr: 'Founder, Match Trackers' },
  },
  'equip-rentals': {
    challenge: 'Construction equipment rental ran on phone tag. Workers called vendors, vendors called back, availability was a guess, and delivery got coordinated over WhatsApp. There was no paper trail, no live view of what was free, and no way to grow past the personal relationships one founder could hold in their head.',
    solution: 'A React Native app with two distinct portals. Workers search by equipment type and location, pick a delivery slot, and track order status in real time. Vendors list their fleet with live availability, accept or decline requests, and run active rentals from a dedicated dashboard. Both sides share the same live state, so a booking is never double-promised.',
    outcome: 'Shipped on iOS and Android, with real vendors onboarded during the pilot — an active marketplace, not a demo. A booking that used to take several calls and a day of waiting now closes in minutes, and the platform finally has the record-keeping the phone-call era never produced.',
    stack: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'Firebase (realtime)'],
    quote: { text: 'Vendors started using it the week we launched. That told us everything.', attr: 'Co-founder, Equip Rentals' },
  },
  quickhunt: {
    challenge: "Quickhunt had built genuinely useful software — feedback collection, public roadmaps, changelog broadcasting — but visitors landed and couldn't tell what it did or why it mattered. Trial signups were low and drop-off was high. The team had diagnosed it correctly: the bottleneck was positioning and UX, not the product. They needed someone to fix the story, not rebuild the engine.",
    solution: "We ran a conversion-focused audit, then redesigned both the marketing site and the core webapp UI. The information architecture was rebuilt around the user's job-to-be-done, and every feature earned a single-sentence value statement instead of a paragraph of jargon. The new design system was delivered in Figma so the in-house team could keep building on it without us.",
    outcome: 'Trial signups rose meaningfully after launch, and the rebuilt onboarding cut "how do I do X" support tickets within the first month. Same features, same product — the redesign was what finally made people understand it. The Figma system is still in active use by the team.',
    stack: ['Figma', 'React', 'Framer Motion', 'Tailwind CSS'],
    quote: { text: 'We shipped the same features. The redesign was what made people finally get it.', attr: 'CEO, Quickhunt' },
  },
  'hubble-health': {
    challenge: "Hubble Health had a clinical story most cities never get — Kanpur's first zero-radiation diagnostic centre, offering fetal medicine, radiology, and pathology at a standard the city hadn't seen. But the digital presence didn't match the clinical ambition. Patients couldn't easily find services, grasp what made Hubble different, or book without picking up the phone — and in diagnostics, that first impression is a trust decision.",
    solution: "We designed and built the full website around trust and clarity. A dark, authoritative hero anchored on 'Advanced. Accurate. Assured.' leads into a dedicated page for each specialty. Doctor profiles do the credibility work. An opening-hours widget answers 'are they open right now?' at a glance. The appointment flow was deliberately kept to one decision and one click — no friction between intent and booking.",
    outcome: "The site went live at hubblehealth.in and became the centre's primary patient-acquisition channel. Patients now arrive at consultations already knowing Hubble's specialties and doctors, which cuts the time clinical staff spend on introductions and lets them get to care faster.",
    stack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    quote: { text: "Patients tell us they booked because the website felt like we knew what we were doing. That's exactly what we were going for.", attr: 'Founder, Hubble Health' },
  },
  mockzy: {
    challenge: "Every D2C brand needs professional imagery for every SKU — on white, in lifestyle settings, in video. A studio shoot costs thousands and takes weeks. General AI image tools demand prompt expertise and still produce inconsistent, off-brand results. The gap between 'we need more content' and 'we have more content' stayed expensive enough to throttle how fast brands could launch.",
    solution: "We built Mockzy: upload a single smartphone photo of a product and the AI pipeline returns photorealistic mockups, lifestyle scenes, and short-form video — no prompting required. Workspaces let teams organise by brand and campaign. Quick-start templates cover the common cases. Batch mode turns a product list into an entire catalog overnight while the team sleeps.",
    outcome: 'Mockzy launched commercially with paying users from day one. The batch-catalog feature became the primary acquisition driver — brands generate a full catalog in hours instead of weeks. It is an in-house product still in active development, with new scene types and video formats shipping regularly.',
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

  const crumbs = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: c.client, href: `/work/${c.slug}` },
  ]);

  return (
    <div className="page">
      <SEO
        title={`${c.client} Case Study — ${c.sector} · Crestify`}
        description={c.summary}
        canonical={`/work/${c.slug}`}
        keywords={`${c.client} case study, ${c.sector} development, ${c.tag}, product development India`}
        schema={crumbs}
      />
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
        {(c.img2 || c.img) ? (
          <div style={{ aspectRatio: '24 / 10', borderRadius: 6, overflow: 'hidden', background: c.dark ? '#0e0e14' : '#f0ede4' }}>
            <img
              src={c.img2 || c.img}
              alt={`${c.client} — ${c.sector}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ) : (
          <Placeholder
            label={`${c.client.toUpperCase()} · ${c.sector}`}
            dim="2400 × 1200"
            ratio="24 / 10"
            dark={c.dark}
          />
        )}
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
            <a href="mailto:contact@crestify.co" className="mono" style={{ color: '#9c9b95', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              contact@crestify.co
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
