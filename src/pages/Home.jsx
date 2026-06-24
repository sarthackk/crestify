import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import SEO, { orgSchema, websiteSchema } from '../components/shared/SEO.jsx';
import Placeholder from '../components/shared/Placeholder.jsx';
import { useReveal } from '../components/shared/useReveal.js';
import { MarkFoldedK } from '../components/kaart-logo/marks.jsx';

/* ─── Hero ──────────────────────────────────────────────────────────────── */
function HeroHome() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const ist = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Kolkata' });

  return (
    <section style={{ position: 'relative', paddingTop: 72, paddingBottom: 'clamp(70px, 10vw, 130px)', overflow: 'hidden' }}>
      {/* column grid overlay */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, var(--line) 1px, transparent 1px)', backgroundSize: 'calc(100% / 12) 100%', pointerEvents: 'none', opacity: 0.6 }} />

      <div className="container" style={{ position: 'relative' }}>

        {/* top meta row */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 64, flexWrap: 'wrap', gap: 16 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            <span style={{ color: 'var(--accent)' }}>§01</span>&nbsp;&nbsp;Founder-led execution studio · EST. 2023
          </span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            ● IST · {ist} · Dehradun, India
          </span>
        </div>

        {/* display headline */}
        <h1 className="display reveal" style={{ maxWidth: '16ch', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
          We build the{' '}
          <span className="italic" style={{ color: 'var(--ink-3)' }}>software</span>
          <br />your business{' '}
          <span className="italic" style={{ color: 'var(--ink-3)' }}>runs on.</span>
        </h1>

        {/* sub row */}
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginTop: 'clamp(44px, 7vw, 90px)', alignItems: 'end' }}>
          <p className="body-lg col-6" style={{ maxWidth: '44ch', color: 'var(--ink-2)' }}>
            E-commerce systems, software platforms, and embedded teams — built by founders, owned end to end. No juniors, no handoffs, no agencies playing middle-man.
          </p>
          <div className="col-6" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 28px' }}>Start a project <span className="arr">→</span></Link>
            <Link to="/work" className="btn btn-ghost" style={{ fontSize: 16, padding: '16px 28px' }}>See the work</Link>
          </div>
        </div>

        {/* proof pill strip */}
        <div className="reveal" style={{ display: 'flex', gap: 10, marginTop: 52, flexWrap: 'wrap' }}>
          {['50+ products shipped', '92% client retention', '2+ years operating', 'Remote · Global'].map(t => (
            <span key={t} className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', border: '1px solid var(--line-strong)', padding: '7px 14px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.12em', background: 'var(--bg-elev)' }}>{t}</span>
          ))}
        </div>

        {/* Kaart Studio callout — prominent bar for e-commerce visitors */}
        <Link to="/kaart" className="reveal" style={{ textDecoration: 'none', display: 'block', marginTop: 28 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 16, flexWrap: 'wrap',
            border: '1px solid #0d9b6a44',
            borderLeft: '3px solid #0d9b6a',
            borderRadius: 4,
            background: 'rgba(13,155,106,0.06)',
            padding: '14px 20px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,155,106,0.10)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,155,106,0.06)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ background: '#0d9b6a', borderRadius: 3, padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MarkFoldedK size={14} fg="#fff" />
              </div>
              <div>
                <div className="mono" style={{ fontSize: 9, color: '#0d9b6a', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 3 }}>Running a Shopify store?</div>
                <div style={{ fontSize: 14, color: 'var(--ink-1)', fontFamily: 'var(--sans)', fontWeight: 500 }}>
                  <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16 }}>Kaart Studio</span>
                  <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}> — our dedicated e-commerce arm handles Shopify builds, CRO &amp; growth.</span>
                </div>
              </div>
            </div>
            <span className="mono" style={{ fontSize: 11, color: '#0d9b6a', textTransform: 'uppercase', letterSpacing: '0.14em', flexShrink: 0 }}>Explore Kaart →</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ─── Client Logo Marquee ────────────────────────────────────────────────── */
const BRAND_CLIENTS = [
  { name: 'Giva',          img: '/logos/giva.png',       sector: 'Jewellery' },
  { name: "Haldiram's",    img: '/logos/haldirams.webp', sector: 'F&B' },
  { name: 'Nirakaar',      img: '/logos/nirakaar.svg',   sector: 'Wellness' },
  { name: 'James Aston',   img: '/logos/jamesaston.png', sector: 'Fashion' },
  { name: 'Prepnest',      img: '/logos/prepnest.png',   sector: 'Career Tech' },
  { name: 'Veda',          img: null,                    sector: 'Lifestyle' },
  { name: 'Match Trackers',img: null,                    sector: 'Sports Tech' },
  { name: 'Hubble',        img: null,                    sector: 'Design' },
  { name: 'Bersekr',       img: null,                    sector: 'Fitness' },
  { name: 'Quickhunt',     img: null,                    sector: 'Tech' },
];

function BrandLogo({ brand }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '0 clamp(28px, 4vw, 48px)',
      borderRight: '1px solid var(--line-strong)',
      flexShrink: 0,
    }}>
      {brand.img && !imgFailed ? (
        <img
          src={brand.img}
          alt={brand.name}
          onError={() => setImgFailed(true)}
          style={{ height: 28, width: 'auto', maxWidth: 120, objectFit: 'contain', filter: 'grayscale(1) brightness(0.5)', opacity: 0.8 }}
        />
      ) : (
        <span className="serif" style={{ fontSize: 15, fontStyle: 'italic', color: 'var(--ink-3)', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
          {brand.name}
        </span>
      )}
      <span className="mono" style={{ fontSize: 9, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
        {brand.sector}
      </span>
    </div>
  );
}

function ClientLogoMarquee() {
  const items = [...BRAND_CLIENTS, ...BRAND_CLIENTS];
  return (
    <div style={{
      borderTop: '1px solid var(--line-strong)',
      borderBottom: '1px solid var(--line-strong)',
      padding: '20px 0',
      overflow: 'hidden',
      background: 'var(--bg-elev)',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(to right, var(--bg-elev), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(to left, var(--bg-elev), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div className="marquee" style={{ '--duration': '38s' }}>
        <div className="marquee-track" style={{ gap: 0, alignItems: 'center' }}>
          {items.map((b, i) => <BrandLogo key={i} brand={b} />)}
        </div>
        <div className="marquee-track" aria-hidden style={{ gap: 0, alignItems: 'center' }}>
          {items.map((b, i) => <BrandLogo key={i} brand={b} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── Ticker ────────────────────────────────────────────────────────────── */
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

/* ─── Press ─────────────────────────────────────────────────────────────── */
const PRESS = [
  'Hindustan Times', 'Daily Hunt', 'Google News', 'Ahmedabad Mirror',
  'Lokmat Times', 'Republic India', 'The Startup Story', 'Financial Telegraph',
];

function PressMarquee() {
  const items = [...PRESS, ...PRESS, ...PRESS, ...PRESS];
  return (
    <div className="press-strip">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="press-strip-label">As seen in</div>
        <div className="marquee" style={{ flex: 1 }}>
          <div className="marquee-track">
            {items.map((name, i) => <span key={i} className="press-item">{name}<span className="press-item-dot" /></span>)}
          </div>
          <div className="marquee-track" aria-hidden>
            {items.map((name, i) => <span key={i} className="press-item">{name}<span className="press-item-dot" /></span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Stats ─────────────────────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { n: '50+', l: 'Products shipped' },
    { n: '92%', l: 'Client retention' },
    { n: '2+',  l: 'Years operating' },
    { n: '11+', l: 'Industries served' },
  ];
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(60px, 8vw, 110px) 0', borderTop: '1px solid var(--line-strong)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, #ffffff06 1px, transparent 1px)', backgroundSize: 'calc(100% / 6) 100%', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className="mono reveal" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 56 }}>
          <span style={{ color: 'var(--accent)' }}>§02</span>&nbsp;&nbsp;By the numbers
        </div>
        <div className="grid-4 keep-2" style={{ gap: 'var(--gap)' }}>
          {stats.map((s, i) => (
            <div key={s.l} className="reveal" style={{ '--i': i }}>
              <div className="serif" style={{ fontSize: 'clamp(56px, 8vw, 110px)', lineHeight: 0.88, letterSpacing: '-0.03em' }}>{s.n}</div>
              <div className="mono" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 16 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Selected Work ─────────────────────────────────────────────────────── */
const PROJECTS = [
  { n: '01', col: 'col-7', dark: true,  client: 'Giva',           sector: 'Jewellery · E-commerce', headline: 'Embedded dev retainer across multiple Shopify stores for India\'s fastest-growing fine jewellery brand.', metric: 'Multi-store · Live',  tag: 'Shopify · Retainer', href: 'https://giva.co',        ratio: '7 / 5', img: '/giva-store.png',  featured: true },
  { n: '02', col: 'col-5', dark: true,  client: "Haldiram's UK",   sector: 'F&B · Launch Signage',   headline: "Designed the window signage suite for Haldiram's first UK store — coming to London.",                   metric: 'London · Live',       tag: 'Signage · Print',    href: null,                     ratio: '5 / 5', img: '/haldirams-london.jpg', featured: true },
  { n: '03', col: 'col-5', dark: false, client: 'Nirakaar',        sector: 'Home Décor · Content',   headline: 'Full content engine for a sculptural home décor brand — UGC, social, and paid ads.',                    metric: 'Live',                tag: 'Content · UGC · Ads', href: 'https://nirakaar.in',   ratio: '5 / 5', img: '/nirakaar.png' },
  { n: '04', col: 'col-7', dark: false, client: 'James Aston',     sector: 'Fashion · E-commerce',   headline: 'Elevated Shopify experience for a premium leather goods brand built for a discerning customer.',         metric: 'Live',                tag: 'Shopify',            href: 'https://jamesaston.in',  ratio: '7 / 5', img: '/jamesaston.png' },
  { n: '05', col: 'col-7', dark: true,  client: 'Prepnest',        sector: 'Career Tech',             headline: 'Built the hiring OS for colleges, students, mentors, and HR.',                                          metric: '4 portals · Live',    tag: 'Full Stack · AI',    slug: 'prepnest',               ratio: '7 / 5', img: '/prepnest.png' },
  { n: '06', col: 'col-5', dark: true,  client: 'Match Trackers',  sector: 'Sports Tech',             headline: '100k+ users. Live scores and deep stats for cricket & football.',                                        metric: '100k+ users',         tag: 'MERN · Real-time',   slug: 'match-trackers',         ratio: '5 / 5', img: '/matchtrackers.png' },
];

function ProjectCard({ p }) {
  const inner = (
    <div style={p.featured ? { borderRadius: 8, border: '1.5px solid var(--accent)', padding: 10, background: 'rgba(255,77,31,0.03)' } : {}}>
      {p.img ? (
        <div style={{ aspectRatio: p.ratio, borderRadius: p.featured ? 4 : 6, overflow: 'hidden', position: 'relative', background: '#0a0a0e' }}>
          <img src={p.img} alt={`${p.client} · ${p.sector}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.55) brightness(0.45)' }} />
          <div style={{ position: 'absolute', inset: 0, background: p.dark ? 'rgba(14,10,30,0.55)' : 'rgba(10,14,10,0.45)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(18px, 3vw, 32px)' }}>
            <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 8 }}>{p.sector}</div>
            <div className="serif" style={{ fontSize: 'clamp(26px, 3.5vw, 46px)', fontStyle: 'italic', color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>{p.client}</div>
          </div>
          <div style={{ position: 'absolute', top: 16, right: 16 }}>
            <span className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '4px 10px', borderRadius: 999 }}>{p.tag}</span>
          </div>
        </div>
      ) : (
        <Placeholder label={`${p.client.toUpperCase()} · ${p.sector}`} dim="1400 × 1000" ratio={p.ratio} dark={p.dark} />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 18, gap: 16, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
            {p.n} / {p.tag}
            {p.featured && <span style={{ marginLeft: 10, color: 'var(--accent)', borderLeft: '1px solid var(--line-strong)', paddingLeft: 10 }}>Active client</span>}
          </div>
          <h3 className="h3" style={{ fontSize: 20, maxWidth: '28ch', lineHeight: 1.2 }}>{p.headline}</h3>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Result</div>
          <div className="serif" style={{ fontSize: 18, fontStyle: 'italic', marginTop: 3 }}>{p.metric}</div>
        </div>
      </div>
    </div>
  );

  const sharedStyle = { display: 'block', textDecoration: 'none', color: 'inherit' };

  if (p.slug) return (
    <Link to={`/work/${p.slug}`} className={`lift ${p.col}`} style={sharedStyle}>{inner}</Link>
  );
  if (p.href) return (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className={`lift ${p.col}`} style={sharedStyle}>{inner}</a>
  );
  return <div className={`lift ${p.col}`} style={sharedStyle}>{inner}</div>;
}


function SelectedWork() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)' }}>
      <div className="container">
        {/* statement header */}
        <div className="reveal" style={{ marginBottom: 'clamp(48px, 7vw, 90px)', paddingBottom: 'clamp(32px, 5vw, 56px)', borderBottom: '1px solid var(--line-strong)' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 20 }}>
            <span style={{ color: 'var(--accent)' }}>§03</span>&nbsp;&nbsp;Selected work
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(36px, 6vw, 82px)', lineHeight: 0.95, letterSpacing: '-0.03em', maxWidth: '16ch' }}>
              Built. Shipped. <span className="italic" style={{ color: 'var(--ink-3)' }}>Still live.</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
              <Link to="/work" className="btn btn-ghost" style={{ flexShrink: 0 }}>All case studies <span className="arr">→</span></Link>
              <Link to="/blog/crestify-studio-reviews" className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>
                See what brands say about Crestify →
              </Link>
            </div>
          </div>
        </div>
        <div className="grid" style={{ gap: 'var(--gap)', rowGap: 'clamp(32px, 5vw, 56px)' }}>
          {PROJECTS.map(p => <ProjectCard key={p.n} p={p} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────────────────────────── */
const SVC_CSS = `
  @keyframes svc-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes svc-rise   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
  @keyframes svc-bar1   { 0%,100%{height:35%} 50%{height:100%} }
  @keyframes svc-bar2   { 0%,100%{height:65%} 50%{height:30%} }
  @keyframes svc-bar3   { 0%,100%{height:50%} 50%{height:90%} }
  @keyframes svc-ping   { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(1.9);opacity:0} }
  @keyframes svc-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes svc-dash   { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
  @keyframes svc-sweep  { 0%{transform:translateX(-100%)} 100%{transform:translateX(250%)} }
`;

/* tiny SVG icon per service — only animates when the row is open */
function SvcIcon({ type, color, active }) {
  const s = { transition: 'all 0.3s' };
  if (type === 'arch') return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={s}>
      {[0,5,10].map((y,i) => (
        <rect key={i} x={i*1.5} y={y} width={22-i*3} height={4} rx={1}
          stroke={color} strokeWidth="1.5" fill="none" opacity={active ? 1 : 0.4}
          style={{ transition:`opacity 0.3s ${i*0.08}s` }} />
      ))}
    </svg>
  );
  if (type === 'rocket') return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      style={{ ...s, animation: active ? 'svc-rise 1.6s ease-in-out infinite' : 'none' }}>
      <path d="M11 3C11 3 15 6 15 12L11 15L7 12C7 6 11 3 11 3Z" stroke={color} strokeWidth="1.5" fill="none" opacity={active?1:0.4} />
      <circle cx="11" cy="10" r="2" fill={color} opacity={active?1:0.4} />
      <path d="M8 15L6 17M14 15L16 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={active?0.6:0.2} />
    </svg>
  );
  if (type === 'browser') return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={s}>
      <rect x="2" y="4" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5" fill="none" opacity={active?1:0.4} />
      <line x1="2" y1="8" x2="20" y2="8" stroke={color} strokeWidth="1.5" opacity={active?1:0.4} />
      <circle cx="5" cy="6" r="1" fill={color} opacity={active?1:0.4} />
      <circle cx="8" cy="6" r="1" fill={color} opacity={active?0.6:0.2} />
      {active && <rect x="4" y="10" width="14" height="2" rx="1" fill={color} opacity="0.15"
        style={{ animation:'svc-sweep 2s ease infinite', overflow:'hidden' }} />}
    </svg>
  );
  if (type === 'mobile') return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={s}>
      <rect x="7" y="2" width="8" height="18" rx="2" stroke={color} strokeWidth="1.5" fill="none" opacity={active?1:0.4} />
      <circle cx="11" cy="17" r="1" fill={color} opacity={active?1:0.3} />
      {[0,1,2].map(i => (
        <rect key={i} x={4+i*3} y={7-i*2} width="2" height={3+i*2} rx="0.5" fill={color} opacity={active?1:0.3}
          style={{ animation: active ? `svc-bar${i+1} ${1+i*0.2}s ease-in-out infinite` : 'none', transformOrigin:'bottom' }} />
      ))}
    </svg>
  );
  if (type === 'gear') return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      style={{ ...s, animation: active ? 'svc-spin 4s linear infinite' : 'none' }}>
      <circle cx="11" cy="11" r="3.5" stroke={color} strokeWidth="1.5" fill="none" opacity={active?1:0.4} />
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.5" strokeDasharray="3 2.5" fill="none" opacity={active?0.6:0.25} />
    </svg>
  );
  return null;
}

const SERVICES_HOME = [
  { n: '01', icon: 'arch',    color: '#3b82f6', dim: 'rgba(59,130,246,0.04)',  bdr: 'rgba(59,130,246,0.25)',
    title: 'Solution Architecture',
    body: 'We step in before anything gets built. Define the structure, system logic, and technical foundation your product actually needs to scale.',
    items: ['Understanding your product vision and constraints', 'Mapping user flows and system interactions', 'Defining product architecture and data structure', 'Choosing the right tech stack and scalability approach', 'Identifying risks and long-term bottlenecks early', 'Creating execution-ready technical documentation', 'Aligning product, design, and engineering decisions'] },
  { n: '02', icon: 'rocket',  color: '#ff4d1f', dim: 'rgba(255,77,31,0.04)',   bdr: 'rgba(255,77,31,0.25)',
    title: 'MVP Development',
    body: "When you're ready to build, we focus on getting the first version right — not just fast. An MVP that can evolve into real product.",
    items: ['Defining MVP scope based on real priorities', 'Structuring core product flows', 'Designing user experience with scalability in mind', 'Building clean, maintainable code foundations', 'Rapid iteration with continuous feedback loops', 'Preparing for future feature expansion', 'Supporting initial launch and early users'] },
  { n: '03', icon: 'browser', color: '#6c47ff', dim: 'rgba(108,71,255,0.04)',  bdr: 'rgba(108,71,255,0.25)',
    title: 'SaaS & Web Apps',
    body: 'Full-scale web products designed to handle real users, real complexity, and long-term growth. From internal dashboards to customer-facing platforms.',
    items: ['Product architecture planning', 'Scalable backend and database design', 'Secure authentication and access systems', 'Performance-focused frontend development', 'API integrations and third-party connections', 'Testing for reliability and edge cases', 'Continuous iteration and feature expansion'] },
  { n: '04', icon: 'mobile',  color: '#0d9b6a', dim: 'rgba(13,155,106,0.04)', bdr: 'rgba(13,155,106,0.25)',
    title: 'Mobile Applications',
    body: 'We design and develop mobile apps that feel smooth, intuitive, and stable. Built for real usage, not just app store presence.',
    items: ['Defining mobile-first user journeys', 'Platform-specific UX design', 'Optimised performance and responsiveness', 'Backend integration and data syncing', 'Security and user session management', 'Testing across devices and environments', 'Launch support and iteration planning'] },
  { n: '05', icon: 'gear',    color: '#f59e0b', dim: 'rgba(245,158,11,0.04)', bdr: 'rgba(245,158,11,0.25)',
    title: 'Internal Tools',
    body: 'Internal tools that simplify operations, improve visibility, and reduce friction. Many businesses struggle because their internal systems are fragmented.',
    items: ['Understanding workflows and operational gaps', 'Mapping process automation opportunities', 'Designing intuitive internal dashboards', 'Building role-based access systems', 'Integrating with existing business tools', 'Ensuring scalability for growing teams', 'Continuous improvements based on usage'] },
];

function HowWeWork() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <style>{SVC_CSS}</style>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 72px)', alignItems: 'end' }}>
          <div className="col-4">
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>
              <span style={{ color: 'var(--accent)' }}>§04</span>&nbsp;&nbsp;What we build
            </div>
          </div>
          <h2 className="h2 col-8" style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.97, letterSpacing: '-0.025em' }}>
            Five services. <span className="italic" style={{ color: 'var(--ink-3)' }}>All founder-led.</span>
          </h2>
        </div>

        <div style={{ borderTop: '1px solid var(--line-strong)' }}>
          {SERVICES_HOME.map((s, i) => {
            const isOpen = open === i;
            return (
              <div
                key={s.n}
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  borderBottom: '1px solid var(--line-strong)',
                  borderLeft: `3px solid ${isOpen ? s.color : 'transparent'}`,
                  background: isOpen ? s.dim : 'transparent',
                  padding: `clamp(22px,2.5vw,30px) 0 clamp(22px,2.5vw,30px) ${isOpen ? 'clamp(18px,2vw,28px)' : '0'}`,
                  cursor: 'pointer',
                  transition: 'background 0.3s, border-left-color 0.3s, padding 0.3s',
                  marginLeft: isOpen ? '-3px' : '0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
                  {/* section marker */}
                  <span
                    className="mono hide-mobile"
                    style={{ fontSize: 11, paddingTop: 3, flexShrink: 0, minWidth: 36, letterSpacing: '0.1em', color: isOpen ? s.color : 'var(--ink-4)', transition: 'color 0.3s' }}
                  >§{s.n}</span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* title row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        {/* animated icon */}
                        <div style={{ flexShrink: 0, width: 22, height: 22 }}>
                          <SvcIcon type={s.icon} color={s.color} active={isOpen} />
                        </div>
                        <h3 className="h3" style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', color: isOpen ? 'var(--ink)' : 'var(--ink)', transition: 'color 0.3s' }}>
                          {s.title}
                        </h3>
                      </div>
                      {/* toggle */}
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid ${isOpen ? s.color : 'var(--line-strong)'}`,
                        color: isOpen ? s.color : 'var(--ink-3)',
                        fontSize: 18, fontWeight: 300, lineHeight: 1,
                        transition: 'all 0.3s',
                        background: isOpen ? s.dim : 'transparent',
                      }}>
                        <span style={{ display: 'inline-block', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>+</span>
                      </div>
                    </div>

                    {/* body */}
                    <p className="body-lg" style={{ fontSize: 16, marginTop: 10, color: 'var(--ink-3)', maxWidth: '64ch', lineHeight: 1.7 }}>
                      {s.body}
                    </p>

                    {/* expandable items */}
                    <div style={{
                      overflow: 'hidden',
                      maxHeight: isOpen ? 500 : 0,
                      opacity: isOpen ? 1 : 0,
                      transition: 'max-height 0.45s ease, opacity 0.3s ease, margin 0.3s ease',
                      marginTop: isOpen ? 24 : 0,
                    }}>
                      {/* colour-tinted divider */}
                      <div style={{ height: 1, background: `linear-gradient(to right, ${s.color}55, transparent)`, marginBottom: 20 }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 48px' }}>
                        {s.items.map((item, ii) => (
                          <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'baseline', opacity: isOpen ? 1 : 0, transform: isOpen ? 'none' : 'translateY(4px)', transition: `opacity 0.3s ${ii * 0.04}s, transform 0.3s ${ii * 0.04}s` }}>
                            <span style={{ color: s.color, fontSize: 10, flexShrink: 0 }}>→</span>
                            <span className="body" style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>{item}</span>
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

/* ─── Process ───────────────────────────────────────────────────────────── */
const PROCESS_CSS = `
  @keyframes proc-radar  { 0%{transform:scale(1);opacity:.9} 100%{transform:scale(2.6);opacity:0} }
  @keyframes proc-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes proc-bar    { 0%{width:0%} 100%{width:100%} }
  @keyframes proc-dot-in { 0%{opacity:0;transform:scale(0)} 100%{opacity:1;transform:scale(1)} }
  @keyframes proc-scroll { 0%{transform:translateY(0)} 100%{transform:translateY(-40px)} }
  @keyframes proc-check  { 0%{stroke-dashoffset:56} 100%{stroke-dashoffset:0} }
  @keyframes proc-rise   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  @keyframes proc-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes proc-arrow  { 0%,100%{transform:translateX(0)} 50%{transform:translateX(7px)} }
  @keyframes proc-shimmer{ 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
`;

const STEPS = [
  {
    n: '01', title: 'Discovery', duration: '1–2 days',
    color: '#6c47ff', dim: 'rgba(108,71,255,0.07)', bdr: 'rgba(108,71,255,0.22)',
    body: "You tell us what you're building. We ask the right questions — about your users, constraints, timeline, and goals. No templates, no intake forms. Just a real conversation.",
    bullets: ['30-min founders call — no sales pitch', 'Goals, constraints & timeline mapped', 'Written summary sent post-call'],
    detail: "We'll send you a short brief after the call so both sides are aligned before anything starts.",
    Anim: ({ color }) => (
      <div style={{ width: 56, height: 56, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {[0, 0.6, 1.2].map((delay, i) => (
          <div key={i} style={{ position: 'absolute', width: 56, height: 56, borderRadius: '50%', border: `2px solid ${color}`, opacity: 0, animation: `proc-radar 2.4s ease-out ${delay}s infinite` }} />
        ))}
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: color }} />
      </div>
    ),
  },
  {
    n: '02', title: 'Scoping & proposal', duration: '2–3 days',
    color: '#ff4d1f', dim: 'rgba(255,77,31,0.07)', bdr: 'rgba(255,77,31,0.22)',
    body: "We define scope, tech stack, milestones, and a fixed price. You see exactly what we're building, how long it takes, and what it costs — before you commit.",
    bullets: ['Fixed-scope, fixed-price proposal', 'Tech stack decision with reasoning', 'Milestone & delivery schedule'],
    detail: "No surprise invoices. If scope changes, we discuss it openly before touching the budget.",
    Anim: ({ color }) => (
      <div style={{ width: 56, height: 40, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center', overflow: 'hidden' }}>
        {[100, 70, 85].map((pct, i) => (
          <div key={i} style={{ height: 6, background: 'var(--line-strong)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 99, background: color, width: `${pct}%`, animation: `proc-bar 1.4s ${i * 0.25}s ease both`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)', animation: 'proc-shimmer 2s 1.5s ease infinite' }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '03', title: 'Design & architecture', duration: '1–2 weeks',
    color: '#0891b2', dim: 'rgba(8,145,178,0.07)', bdr: 'rgba(8,145,178,0.22)',
    body: "We design the system before we build it. Wireframes, data models, API contracts, and component structure — all shared with you for review before a line of code is written.",
    bullets: ['Wireframes & UX flows shared for review', 'Data model & API contract defined', 'Component structure agreed upfront'],
    detail: "You'll have visibility into every design decision. We prefer catching problems here, not in production.",
    Anim: ({ color }) => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,12px)', gap: 7 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: 3, background: i % 5 === 0 ? color : 'var(--line-strong)', opacity: i % 5 === 0 ? 1 : 0.5, animation: `proc-dot-in 0.4s ${i * 0.06}s ease both` }} />
        ))}
      </div>
    ),
  },
  {
    n: '04', title: 'Build sprints', duration: '2–8 weeks',
    color: '#0d9b6a', dim: 'rgba(13,155,106,0.07)', bdr: 'rgba(13,155,106,0.22)',
    body: "We build in tight 2-week sprints. You get a working demo at the end of every sprint — something you can click through, test, and give feedback on. No black boxes.",
    bullets: ['2-week sprint cadence', 'Clickable demo every sprint', 'Direct Slack access to the team'],
    detail: "Weekly check-ins. Your feedback shapes the next sprint — we adjust before we pile on.",
    Anim: ({ color }) => (
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, lineHeight: 1.7, color: 'var(--ink-4)', overflow: 'hidden', height: 56, position: 'relative' }}>
        <div style={{ animation: 'proc-scroll 3s linear infinite' }}>
          {['$ npm run dev', '▶  vite ready', '✓  routes built', '⚡  hot reload', '$ git commit'].map((line, i) => (
            <div key={i} style={{ color: i === 1 ? color : 'var(--ink-4)' }}>{line}</div>
          ))}
        </div>
        <span style={{ color, animation: 'proc-blink 1s step-end infinite' }}>█</span>
      </div>
    ),
  },
  {
    n: '05', title: 'QA & launch', duration: '3–5 days',
    color: '#f59e0b', dim: 'rgba(245,158,11,0.07)', bdr: 'rgba(245,158,11,0.22)',
    body: "We test across devices, edge cases, and load scenarios before anything goes live. When it ships, it ships clean.",
    bullets: ['Cross-device & browser testing', 'Edge case & load scenario checks', 'Deployment, DNS & performance tuning'],
    detail: "We handle first-day monitoring and stay on-call for 24 hours post-launch.",
    Anim: ({ color }) => (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="22" stroke="var(--line-strong)" strokeWidth="3" />
        <circle cx="28" cy="28" r="22" stroke={color} strokeWidth="3" strokeDasharray="138" strokeDashoffset="0" strokeLinecap="round"
          style={{ animation: 'proc-spin 3s linear infinite', transformOrigin: '28px 28px' }} />
        <polyline points="18,28 25,35 38,20" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: 56, animation: 'proc-check 0.6s 0.4s ease forwards', strokeDashoffset: 56 }} />
      </svg>
    ),
  },
  {
    n: '06', title: 'Handoff & support', duration: 'Ongoing',
    color: '#e879f9', dim: 'rgba(232,121,249,0.07)', bdr: 'rgba(232,121,249,0.22)',
    body: "You own everything — code, repos, infrastructure. We document what we built and stay available for questions, fixes, and the next phase when you're ready.",
    bullets: ['100% code & repo ownership', 'Recorded walkthroughs + docs', '30 days post-launch support'],
    detail: "Most clients come back for phase 2. We'd love to be your long-term build partner.",
    Anim: ({ color }) => (
      <div style={{ position: 'relative', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 32, animation: 'proc-rise 2s ease-in-out infinite', filter: `drop-shadow(0 0 8px ${color})` }}>🚀</div>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', bottom: i * 6, left: '50%', transform: 'translateX(-50%)', width: 4 - i, height: 4 - i, borderRadius: '50%', background: color, opacity: 0.6 - i * 0.15 }} />
        ))}
      </div>
    ),
  },
];

function Process() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)', background: 'var(--bg-elev)' }}>
      <style>{PROCESS_CSS}</style>
      <div className="container">
        {/* header */}
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 64px)', alignItems: 'end' }}>
          <div className="col-4">
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>
              <span style={{ color: 'var(--accent)' }}>§05</span>&nbsp;&nbsp;How we work
            </div>
          </div>
          <div className="col-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.97, letterSpacing: '-0.025em' }}>
              Six steps. <span className="italic" style={{ color: 'var(--ink-3)' }}>No surprises.</span>
            </h2>
            <p className="body" style={{ maxWidth: '36ch', color: 'var(--ink-3)', fontSize: 15 }}>
              From first call to launch — click a step to see exactly what happens.
            </p>
          </div>
        </div>

        {/* interactive panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--gap)' }}>
          {/* Step selector row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2, background: 'var(--line-strong)', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--line-strong)' }}>
            {STEPS.map((s, i) => (
              <button
                key={s.n}
                onClick={() => setActive(i)}
                style={{
                  padding: 'clamp(12px, 1.5vw, 18px) clamp(8px, 1vw, 14px)',
                  background: active === i ? s.dim : 'var(--bg)',
                  border: 'none',
                  borderBottom: `3px solid ${active === i ? s.color : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}
                onMouseEnter={e => { if (active !== i) e.currentTarget.style.background = 'var(--bg-elev)'; }}
                onMouseLeave={e => { if (active !== i) e.currentTarget.style.background = 'var(--bg)'; }}
              >
                <span className="mono" style={{ fontSize: 10, color: active === i ? s.color : 'var(--ink-4)', letterSpacing: '0.1em', transition: 'color 0.2s' }}>{s.n}</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(10px, 1.2vw, 13px)', fontWeight: 500, color: active === i ? 'var(--ink)' : 'var(--ink-3)', textAlign: 'center', lineHeight: 1.2, transition: 'color 0.2s' }}>{s.title}</span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div style={{
            border: `1px solid ${step.bdr}`,
            borderTop: `3px solid ${step.color}`,
            borderRadius: 6,
            background: step.dim,
            padding: 'clamp(28px, 4vw, 52px)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(28px, 4vw, 52px)',
            alignItems: 'start',
            transition: 'border-color 0.3s, background 0.3s',
          }}>
            {/* LEFT: number, title, body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <span className="serif italic" style={{ fontSize: 'clamp(56px, 7vw, 88px)', lineHeight: 1, color: step.color, letterSpacing: '-0.03em', transition: 'color 0.3s' }}>
                  {step.n}
                </span>
                <span className="mono" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', background: 'var(--bg)', border: `1px solid ${step.bdr}`, color: step.color, padding: '5px 12px', borderRadius: 999, transition: 'all 0.3s' }}>
                  {step.duration}
                </span>
              </div>
              <h3 className="h3" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, color: 'var(--ink)' }}>{step.title}</h3>
              <p className="body" style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.75 }}>{step.body}</p>

              {/* nav arrows */}
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button onClick={() => setActive(a => Math.max(0, a - 1))} disabled={active === 0}
                  style={{ padding: '8px 16px', border: '1px solid var(--line-strong)', borderRadius: 999, background: 'transparent', color: active === 0 ? 'var(--ink-4)' : 'var(--ink)', cursor: active === 0 ? 'default' : 'pointer', fontFamily: 'var(--mono)', fontSize: 11, transition: 'all 0.2s', opacity: active === 0 ? 0.35 : 1 }}>
                  ← Prev
                </button>
                <button onClick={() => setActive(a => Math.min(STEPS.length - 1, a + 1))} disabled={active === STEPS.length - 1}
                  style={{ padding: '8px 16px', border: `1px solid ${step.color}`, borderRadius: 999, background: step.dim, color: step.color, cursor: active === STEPS.length - 1 ? 'default' : 'pointer', fontFamily: 'var(--mono)', fontSize: 11, transition: 'all 0.2s', opacity: active === STEPS.length - 1 ? 0.35 : 1, animation: active < STEPS.length - 1 ? 'proc-arrow 1.4s ease infinite' : 'none' }}>
                  Next →
                </button>
              </div>
            </div>

            {/* RIGHT: animation + bullets + note */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* animated visual */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ padding: 'clamp(20px, 3vw, 32px)', background: 'var(--bg)', border: `1px solid ${step.bdr}`, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.3s' }}>
                  <step.Anim color={step.color} />
                </div>
              </div>

              {/* bullet points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {step.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: step.color, fontSize: 11, flexShrink: 0, marginTop: 3, transition: 'color 0.3s' }}>✦</span>
                    <span className="body" style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>

              {/* note box */}
              <div style={{ padding: '16px 20px', background: 'var(--bg)', borderRadius: 6, border: `1px solid ${step.bdr}`, transition: 'border-color 0.3s' }}>
                <span className="mono" style={{ fontSize: 9, color: step.color, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 8, transition: 'color 0.3s' }}>
                  ↳ Good to know
                </span>
                <p className="body" style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.65 }}>{step.detail}</p>
              </div>

              {/* progress dots */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {STEPS.map((s, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    style={{ width: active === i ? 24 : 8, height: 8, borderRadius: 999, background: active === i ? step.color : 'var(--line-strong)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Founders ──────────────────────────────────────────────────────────── */
const FOUNDERS = [
  {
    name: 'Sarthak Tiwari', role: 'Founder · Your prime POC', initials: 'ST',
    bio: 'Think of me as your fractional CTO. I work closely with founders and teams to turn ideas into structured, scalable systems — whether that means defining architecture, guiding product decisions, or getting deeply involved in execution.',
    bio2: "When you work with Crestify, you're not just hiring a team. You're getting a builder who has been through the process many times.",
    photo: '/sarthak .jpeg',
    socials: [{ label: 'Portfolio', href: '/sarthak', internal: true }, { label: 'X', href: 'https://x.com/nosarthack' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sarthackk/' }, { label: 'Instagram', href: 'https://www.instagram.com/nosrthack' }],
  },
  {
    name: 'Aditya Tripathi', role: 'Operations · PM', initials: 'AT',
    bio: 'Aditya ensures that projects move smoothly from planning to execution. With a background in business, commerce, and sales, he focuses on aligning timelines, communication, and delivery — helping teams stay organised and every system move forward with clarity.',
    bio2: null,
    photo: '/aditya.jpeg',
    socials: [{ label: 'Instagram', href: 'https://www.instagram.com/trippy_thi/' }],
  },
];

function Founders() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)', background: 'var(--bg-elev)' }}>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(48px, 7vw, 80px)', alignItems: 'end' }}>
          <div className="col-4">
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>
              <span style={{ color: 'var(--accent)' }}>§06</span>&nbsp;&nbsp;Who runs the work
            </div>
          </div>
          <div className="col-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(32px, 5vw, 68px)', lineHeight: 0.97, letterSpacing: '-0.025em' }}>
              Founder-led, <span className="italic" style={{ color: 'var(--ink-3)' }}>end to end.</span>
            </h2>
            <p className="body" style={{ maxWidth: '36ch', color: 'var(--ink-3)', fontSize: 15 }}>
              The founders pitch the work and stay accountable on every project. A close team of 15 execute it.
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 'var(--gap)' }}>
          {FOUNDERS.map(f => (
            <article key={f.name} style={{ border: '1px solid var(--line-strong)', borderRadius: 4, background: 'var(--bg)', overflow: 'hidden' }}>
              {/* top photo band */}
              <div style={{ display: 'flex', gap: 24, padding: 'clamp(24px, 3vw, 36px)', borderBottom: '1px solid var(--line-strong)', alignItems: 'center' }}>
                <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', background: 'var(--bg-deep)', flexShrink: 0, border: '2px solid var(--line-strong)' }}>
                  {f.photo
                    ? <img src={f.photo} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg)', fontFamily: 'var(--serif)', fontSize: 28, fontStyle: 'italic' }}>{f.initials}</div>
                  }
                </div>
                <div>
                  <h3 className="serif" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontStyle: 'italic' }}>{f.name}</h3>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 6 }}>{f.role}</div>
                </div>
              </div>
              {/* bio */}
              <div style={{ padding: 'clamp(24px, 3vw, 36px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p className="body" style={{ fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.7 }}>{f.bio}</p>
                {f.bio2 && <p className="body" style={{ fontSize: 15.5, color: 'var(--ink-3)', lineHeight: 1.7 }}>{f.bio2}</p>}
                <div style={{ display: 'flex', gap: 8, paddingTop: 8, borderTop: '1px solid var(--line)', flexWrap: 'wrap', marginTop: 'auto' }}>
                  {f.socials.map(s => (
                    s.internal
                      ? <Link key={s.label} to={s.href} className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid var(--accent)', padding: '7px 13px', borderRadius: 999 }}>{s.label} →</Link>
                      : <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid var(--line-strong)', padding: '7px 13px', borderRadius: 999 }}>{s.label} ↗</a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Internal Products ─────────────────────────────────────────────────── */
const PRODUCTS = [
  { name: 'Mockzy',      desc: 'AI creative studio. Smartphone photo in, photorealistic ad-grade mockups, lifestyle images, and video out. Built for D2C brands.', meta: 'Live · 2025', href: 'https://mockzy.app',             status: 'live', img: '/mockzy.png' },
  { name: 'Sked',        desc: 'Scheduling infrastructure for teams and creators. Book, manage, and automate time — without the back-and-forth.',                  meta: 'Coming soon', href: 'https://sked.club',              status: 'soon', img: '/sked.png' },
  { name: 'Distrute',    desc: 'Distribution OS for SaaS founders. Run targeted influencer campaigns built specifically for software products. Currently in alpha.', meta: 'Alpha · 2025', href: 'https://distrute.vercel.app', status: 'soon', img: '/distrute.png' },
  { name: 'Grit School', desc: 'A school for the skills no one teaches. Practical, no-fluff programs for founders, operators, and people who want to build real things.', meta: 'Coming soon', href: 'https://grit-school.vercel.app/', status: 'soon', img: '/gritschool.png' },
];

function InternalProducts() {
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>
              <span style={{ color: 'var(--accent)' }}>§07</span>&nbsp;&nbsp;Own products
            </div>
          </div>
          <div className="col-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(32px, 5vw, 68px)', lineHeight: 0.97, letterSpacing: '-0.025em' }}>
              We eat <span className="italic" style={{ color: 'var(--ink-3)' }}>our own cooking.</span>
            </h2>
            <p className="body" style={{ maxWidth: '36ch', color: 'var(--ink-3)', fontSize: 15 }}>
              Four products built and run by the studio. Not side projects — real products with real users.
            </p>
          </div>
        </div>
        <div className="grid-4 keep-2" style={{ gap: 'var(--gap)', rowGap: 'clamp(28px, 4vw, 48px)' }}>
          {PRODUCTS.map(p => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="lift" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ position: 'relative', aspectRatio: '4 / 3', borderRadius: 6, overflow: 'hidden', background: '#0a0a0e' }}>
                {p.img ? (
                  <>
                    <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.55) brightness(0.45)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,18,0.50)' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px' }}>
                      <div className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6 }}>{p.meta}</div>
                      <div className="serif" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontStyle: 'italic', color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>{p.name}</div>
                    </div>
                  </>
                ) : (
                  <Placeholder label={p.name.toUpperCase()} dim="800 × 600" ratio="4 / 3" dark />
                )}
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

/* ─── FAQ ────────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects run 6–12 weeks end to end. A focused MVP can be ready in 4–6 weeks. Larger platforms — multi-portal SaaS, mobile apps, enterprise tools — typically run 10–16 weeks. We scope this precisely before you commit.',
  },
  {
    q: 'What does it cost to work with Crestify?',
    a: 'Projects are priced on fixed-scope basis — you know the number before we start. MVPs typically start at ₹3–5L. Full-scale SaaS or mobile builds range from ₹6–15L depending on complexity. We don\'t bill by the hour.',
  },
  {
    q: 'Do you work with very early-stage founders?',
    a: 'Yes — that\'s most of our clients. We\'re used to working from a napkin sketch or a 5-slide deck. We help you figure out what to build, not just how to build it. If you have an idea and a rough budget, that\'s enough to start the conversation.',
  },
  {
    q: 'Who will actually be working on my project?',
    a: 'The founders are your primary points of contact and stay accountable on every project. Sarthak leads product and engineering; Aditya handles operations and delivery. A small, senior team executes the work — no juniors flying solo, no handoffs to an account manager.',
  },
  {
    q: 'Do we own the code when the project is done?',
    a: 'Completely. You own 100% of the code, repositories, design files, and infrastructure from day one. We hand over everything clean and documented at the end of the engagement.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes, on request — at no extra cost and before any details are shared. Most clients ask for one before the first call, and we\'re always happy to sign.',
  },
  {
    q: 'Can you work with our existing team or codebase?',
    a: 'Yes. We regularly embed into existing teams as a senior build partner. We can work with your current codebase, your tools, and your processes — or help you migrate to something better if needed.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes 30 days of post-launch support for bug fixes and minor adjustments. After that, we offer flexible retainer arrangements for ongoing development. Many clients stay with us for the next phase.',
  },
  {
    q: 'What tech stack do you use?',
    a: 'We pick the right tool for the job — not the fashionable one. Most web products are React + Node or Next.js. Mobile apps in React Native. AI products with Python backends. We\'re comfortable across the full stack and won\'t force a tech preference that doesn\'t fit your product.',
  },
  {
    q: 'How do we get started?',
    a: 'Fill out the brief form on the contact page — it takes 5 minutes. One of the founders will read it and reply within 48 hours. If there\'s a fit, we schedule a call, and if the call goes well, we send you a proposal within 3 business days.',
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section-pad" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        {/* header */}
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 72px)', alignItems: 'end' }}>
          <div className="col-4">
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>
              <span style={{ color: 'var(--accent)' }}>§08</span>&nbsp;&nbsp;FAQs
            </div>
          </div>
          <div className="col-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.97, letterSpacing: '-0.025em' }}>
              Questions <span className="italic" style={{ color: 'var(--ink-3)' }}>we get asked.</span>
            </h2>
            <p className="body" style={{ maxWidth: '36ch', color: 'var(--ink-3)', fontSize: 15 }}>
              Honest answers. If something isn't here, just email us.
            </p>
          </div>
        </div>

        {/* accordion */}
        <div style={{ borderTop: '1px solid var(--line-strong)' }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="reveal"
                style={{ borderBottom: '1px solid var(--line-strong)', cursor: 'pointer', '--i': i }}
              >
                {/* question row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, padding: 'clamp(20px, 2.5vw, 28px) 0' }}>
                  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flex: 1 }}>
                    <span className="mono hide-mobile" style={{ color: 'var(--accent)', fontSize: 11, paddingTop: 2, flexShrink: 0, minWidth: 36, letterSpacing: '0.1em' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="body" style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.3 }}>
                      {faq.q}
                    </h3>
                  </div>
                  <span style={{ color: 'var(--ink-3)', fontSize: 22, flexShrink: 0, fontWeight: 300, lineHeight: 1, paddingTop: 2, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                </div>

                {/* answer */}
                <div style={{ overflow: 'hidden', maxHeight: isOpen ? 300 : 0, opacity: isOpen ? 1 : 0, transition: 'max-height 0.45s ease, opacity 0.3s ease, padding 0.3s ease', paddingBottom: isOpen ? 'clamp(20px, 2.5vw, 28px)' : 0, paddingLeft: 'calc(36px + 24px)' }}>
                  <p className="body" style={{ fontSize: 15.5, color: 'var(--ink-3)', lineHeight: 1.75, maxWidth: '64ch' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still got questions nudge */}
        <div className="reveal" style={{ marginTop: 'clamp(36px, 5vw, 56px)', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <p className="body" style={{ color: 'var(--ink-3)', fontSize: 15 }}>
            Still have a question?
          </p>
          <a href="mailto:contact@crestify.co" className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid var(--accent)', padding: '9px 16px', borderRadius: 999 }}>
            Email us directly →
          </a>
          <Link to="/contact" className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid var(--line-strong)', padding: '9px 16px', borderRadius: 999 }}>
            Start a project →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact CTA ───────────────────────────────────────────────────────── */
function ContactCTA() {
  return (
    <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(80px, 12vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
      {/* subtle grid */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, #ffffff06 1px, transparent 1px)', backgroundSize: 'calc(100% / 12) 100%', pointerEvents: 'none' }} />
      {/* accent glow */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 85% 30%, rgba(255,77,31,0.12), transparent 55%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="mono reveal" style={{ fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 28 }}>
          <span style={{ color: 'var(--accent)' }}>§09</span>&nbsp;&nbsp;Let's create
        </div>

        <h2 className="display reveal" style={{ color: 'var(--bg)', fontSize: 'clamp(56px, 11vw, 160px)', lineHeight: 0.9, letterSpacing: '-0.03em', maxWidth: '14ch' }}>
          Something <span className="italic" style={{ color: 'var(--accent)' }}>lasting.</span>
        </h2>

        <div className="grid reveal" style={{ gap: 'var(--gap)', marginTop: 'clamp(48px, 7vw, 90px)', alignItems: 'end' }}>
          <p className="body-lg col-6" style={{ color: '#9c9b95', maxWidth: '46ch', lineHeight: 1.7 }}>
            Tell us where you're stuck — replatforming, scaling infra, building from zero. We'll tell you in 48 hours whether we're the right team.
          </p>
          <div className="col-6" style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
            <Link to="/contact" className="btn" style={{ background: 'var(--bg)', color: 'var(--bg-deep)', fontSize: 16, padding: '18px 32px', fontWeight: 500 }}>
              Start a project <span className="arr">→</span>
            </Link>
            <a href="mailto:contact@crestify.co" className="mono" style={{ color: '#9c9b95', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              contact@crestify.co
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function Home() {
  useReveal();
  return (
    <div className="page">
      <SEO
        title="Crestify | Product Studio &amp; Shopify Agency for D2C Brands | The Kaart Studio"
        description="Crestify (also known as The Kaart Studio) is a founder-led product development studio and full-stack Shopify agency for D2C brands. We design, build, and ship SaaS products, AI tools, and high-converting Shopify stores. 46+ brand partnerships."
        canonical="/"
        keywords="crestify, crestify studio, kaart studio, kaart, product development studio India, Shopify agency D2C, SaaS development India, MVP development India"
        schema={[orgSchema, websiteSchema]}
      />
      <Nav />
      <HeroHome />
      <ClientLogoMarquee />
      <Ticker />
      <StatsBar />
      <SelectedWork />
      <PressMarquee />
      <HowWeWork />
      <Process />
      <Founders />
      <InternalProducts />
      <FAQ />
      <ContactCTA />
      <Footer />
    </div>
  );
}
