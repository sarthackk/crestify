import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import { useReveal } from '../components/shared/useReveal.js';

const RESOURCES = [
  {
    n: '01',
    tag: 'Influencer Marketing',
    title: 'The Influencer Outreach Playbook',
    subtitle: 'How to find, brief, close, and manage influencers on a small budget. No fluff, just what actually works.',
    for: ['D2C founders doing influencer marketing for the first time', 'Brand owners who have tried influencers and got nothing back', 'Marketers managing influencer campaigns on tight budgets'],
    inside: [
      'Nano vs micro vs macro — which type to start with and why',
      'Exact process for finding influencers via hashtag + search discoverability',
      'DM templates that actually get replies (barter and paid)',
      'Brief format that sets expectations before anything ships',
      'How to manage the content without micromanaging',
      'What to do when influencers ghost, delay, or post badly',
    ],
    file: '/downloads/influencer_playbook.docx',
    color: '#0d9b6a',
    bg: '#f0faf6',
    pages: '18 pages',
  },
  {
    n: '02',
    tag: 'Paid Advertising',
    title: 'The Meta Ads Testing Framework',
    subtitle: 'How to test ads on a small budget, find what works, and scale without burning money on guesses.',
    for: ['D2C founders running their first Meta ad campaign', 'Brand owners who have burned budget on ads that didn\'t work', 'Marketers who want a repeatable system, not guesswork'],
    inside: [
      '5-step framework from testing budget to scaling winners',
      'How to create offer vs. positioning variations that actually reveal signals',
      'Which metrics matter at the testing stage (hint: not ROAS)',
      'When and how to brief UGC creators with your winning message',
      'Scaling rules — when to push budget and when to stop',
      'Retargeting setup after your winner is confirmed',
    ],
    file: '/downloads/meta_ads_framework.docx',
    color: '#1a6fde',
    bg: '#f0f5ff',
    pages: '14 pages',
  },
  {
    n: '03',
    tag: 'Brand Launch',
    title: 'The New Brand Launch Blueprint',
    subtitle: 'How we take a D2C brand from zero to first sale — the exact process we use at Kaart Studio.',
    for: ['Founders launching their first D2C brand', 'Entrepreneurs who have a product but don\'t know where to start', 'Anyone who wants to understand what a real brand launch looks like end to end'],
    inside: [
      'Phase 1 — Research & references before a single pixel is designed',
      'Phase 2 — Micro branding: locking identity before building store',
      'Phase 3 — Full UI design in Figma, page by page',
      'Phase 4 — Shopify build with the right apps from day one',
      'Phase 5 — Pre-launch checklist that covers what most brands miss',
      'Phase 6 — Launch week execution and first-sale strategy',
    ],
    file: '/downloads/ecommerce_launch_blueprint.docx',
    color: '#c47b1a',
    bg: '#fdf8f0',
    pages: '22 pages',
  },
];

function ResourceCard({ r, i }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  const isEven = i % 2 === 0;

  return (
    <article className="reveal" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gap: 'var(--gap)',
      padding: 'clamp(40px, 5vw, 64px) 0',
      borderTop: '1px solid var(--line-strong)',
      alignItems: 'center',
    }}>
      {/* Left info col */}
      <div style={{ gridColumn: isEven ? '1 / 8' : '6 / 13', gridRow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.12em' }}>§{r.n}</span>
          <span className="mono" style={{ fontSize: 11, color: r.color, textTransform: 'uppercase', letterSpacing: '0.12em', background: r.bg, padding: '4px 10px', borderRadius: 999 }}>{r.tag}</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.1em' }}>{r.pages}</span>
        </div>

        <h2 className="serif" style={{ fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.015em', maxWidth: '22ch' }}>{r.title}</h2>
        <p className="body-lg" style={{ marginTop: 14, maxWidth: '44ch', color: 'var(--ink-3)' }}>{r.subtitle}</p>

        <div style={{ marginTop: 28 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>What's inside</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {r.inside.map(item => (
              <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ color: r.color, fontSize: 10, flexShrink: 0 }}>→</span>
                <span className="body" style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 32, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href={r.file}
            download
            onClick={handleDownload}
            className="btn"
            style={{ background: r.color, color: 'white', fontSize: 15, padding: '14px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            {downloading ? 'Downloading…' : <>Download free <span style={{ fontSize: 18 }}>↓</span></>}
          </a>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.1em' }}>Free · No signup</span>
        </div>
      </div>

      {/* Right visual col */}
      <div style={{ gridColumn: isEven ? '8 / 13' : '1 / 6', gridRow: 1 }}>
        <div style={{
          aspectRatio: '4 / 5',
          background: r.bg,
          borderRadius: 8,
          border: `1px solid ${r.color}22`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: 32,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ghost watermark */}
          <div className="serif italic" style={{
            position: 'absolute',
            fontSize: 'clamp(80px, 14vw, 160px)',
            color: `${r.color}10`,
            lineHeight: 1,
            userSelect: 'none',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap',
          }}>{r.n}</div>

          {/* Card mockup */}
          <div style={{ width: '100%', maxWidth: 240, position: 'relative', zIndex: 1 }}>
            {/* Doc preview card */}
            <div style={{ background: 'white', borderRadius: 6, padding: '20px 20px 16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 4, background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: 14 }}>
                    {r.n === '01' ? '📣' : r.n === '02' ? '📊' : '🚀'}
                  </span>
                </div>
                <span className="mono" style={{ fontSize: 9, color: r.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Kaart Studio</span>
              </div>
              <div style={{ fontSize: 12, fontFamily: 'var(--serif)', fontWeight: 600, lineHeight: 1.3, color: '#1a1a1a', marginBottom: 10 }}>{r.title}</div>
              {[0, 1, 2].map(j => (
                <div key={j} style={{ height: 6, background: j === 2 ? `${r.color}30` : '#f0f0f0', borderRadius: 3, marginBottom: 6, width: j === 2 ? '60%' : '100%' }} />
              ))}
              <div style={{ marginTop: 12, padding: '7px 12px', background: r.color, borderRadius: 4, textAlign: 'center' }}>
                <span style={{ color: 'white', fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}>FREE DOWNLOAD</span>
              </div>
            </div>

            {/* Who it's for pill */}
            <div style={{ marginTop: 12, background: 'white', borderRadius: 6, padding: '10px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="mono" style={{ fontSize: 9, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Who it's for</div>
              <div style={{ fontSize: 11, color: '#444', lineHeight: 1.5 }}>{r.for[0]}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ResourcesHero() {
  return (
    <section style={{ paddingTop: 64, paddingBottom: 'clamp(40px, 6vw, 70px)' }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}><Eyebrow index="01">Free resources</Eyebrow></div>
        <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
          <div className="col-7">
            <h1 className="display reveal" style={{ maxWidth: '18ch' }}>
              Tools built from{' '}
              <span className="italic" style={{ color: 'var(--ink-3)' }}>real e-commerce work.</span>
            </h1>
          </div>
          <div className="col-5">
            <p className="body-lg reveal" style={{ maxWidth: '38ch' }}>
              Frameworks, playbooks, and blueprints we use at Kaart Studio — free for founders who want to move faster.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {['3 resources', 'Free · No signup', 'By Kaart Studio'].map(t => (
                <span key={t} className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourcesList() {
  return (
    <section className="section-pad-sm">
      <div className="container">
        {RESOURCES.map((r, i) => <ResourceCard key={r.n} r={r} i={i} />)}
        {/* closing border */}
        <div style={{ borderTop: '1px solid var(--line-strong)', paddingTop: 40, marginTop: 0 }} />
      </div>
    </section>
  );
}

function ResourcesCTA() {
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(70px, 10vw, 120px) 0', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--accent)' }} />
      <div className="container">
        <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'center' }}>
          <div className="col-7">
            <Eyebrow light>Want us to do this for you?</Eyebrow>
            <h2 className="display" style={{ color: 'var(--bg)', marginTop: 18, fontSize: 'clamp(40px, 6vw, 96px)', maxWidth: '18ch', lineHeight: 1.02 }}>
              We don't just write the playbook.{' '}
              <span className="italic" style={{ color: 'var(--accent)' }}>We run it.</span>
            </h2>
          </div>
          <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <p className="body" style={{ color: '#9c9b95', maxWidth: '34ch' }}>
              These resources are what we use in-house. If you want Kaart Studio running your store, growth, and content — talk to us.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
              <Link to="/kaart#contact" className="btn" style={{ background: '#0d9b6a', color: 'white', fontSize: 15, padding: '14px 22px', textDecoration: 'none' }}>
                Work with Kaart ↗
              </Link>
              <Link to="/contact" className="btn btn-ghost" style={{ color: '#9c9b95', fontSize: 15, padding: '14px 22px' }}>
                Crestify projects
              </Link>
            </div>
            <a href="mailto:contact@crestify.co" className="mono" style={{ color: '#9c9b95', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              contact@crestify.co
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Resources() {
  useReveal();
  return (
    <div className="page">
      <Nav />
      <ResourcesHero />
      <ResourcesList />
      <ResourcesCTA />
      <Footer />
    </div>
  );
}
