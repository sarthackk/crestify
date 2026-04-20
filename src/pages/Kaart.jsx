import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/shared/Footer.jsx';
import { useReveal } from '../components/shared/useReveal.js';
import { MarkFoldedK } from '../components/kaart-logo/marks.jsx';

const K = {
  green: '#0d9b6a',
  greenDeep: '#085a3e',
  cream: '#f4f1e7',
  ink: '#0e1411',
};

function KaartNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: menuOpen ? 'none' : 'blur(14px)', background: menuOpen ? K.cream : 'rgba(244, 241, 231, 0.85)', borderBottom: '1px solid #0e141114' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px var(--pad)', maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <Link to="/kaart" className="brand" style={{ color: K.ink, gap: 12 }}>
          <span style={{ width: 30, height: 30, background: K.green, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <MarkFoldedK size={18} fg="#fff" />
          </span>
          <span style={{ fontSize: 22, whiteSpace: 'nowrap' }}>
            Kaart Studio<sup className="mono" style={{ fontSize: 9, marginLeft: 6, color: K.green, letterSpacing: '0.1em' }}>×CRESTIFY</sup>
          </span>
        </Link>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ borderColor: '#0e141122' }}
        >
          <span style={{ background: K.ink, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ background: K.ink, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ background: K.ink, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>

        <nav className={`nav-links${menuOpen ? ' menu-open' : ''}`} style={{ background: menuOpen ? K.cream : undefined }}>
          <Link to="/kaart/services" className="nav-link" onClick={close} style={{ color: K.ink }}>Services</Link>
          <a href="#work" className="nav-link" onClick={close} style={{ color: K.ink }}>Work</a>
          <a href="#process" className="nav-link" onClick={close} style={{ color: K.ink }}>Process</a>
          <a href="#pricing" className="nav-link" onClick={close} style={{ color: K.ink }}>Pricing</a>
          <Link to="/resources" className="nav-link" onClick={close} style={{ color: K.green }}>Free Resources</Link>
          <Link to="/" className="nav-link" onClick={close} style={{ color: '#5a6760' }}>↩ Crestify</Link>
          <a href="#contact" className="nav-link nav-cta" onClick={close} style={{ background: K.green, color: 'white', marginLeft: 6 }}>Brief us →</a>
        </nav>
      </div>
    </header>
  );
}

function KaartHero() {
  return (
    <section style={{ position: 'relative', paddingTop: 56, paddingBottom: 'clamp(60px, 9vw, 110px)', background: K.cream, color: K.ink, overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, #0e141108 1px, transparent 1px)', backgroundSize: 'calc(100% / 12) 100%', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap', marginBottom: 56 }}>
          <span className="mono" style={{ fontSize: 11, color: K.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            <span style={{ color: K.green }}>§01</span>&nbsp;&nbsp;Shopify-only · A Crestify studio
          </span>
          <span className="mono" style={{ fontSize: 11, color: '#5a6760', textTransform: 'uppercase', letterSpacing: '0.12em' }}>● Taking new projects · 7 stores live</span>
        </div>

        <h1 className="display reveal" style={{ maxWidth: '13ch', color: K.ink }}>
          Shopify, <span className="italic" style={{ color: K.green }}>done</span><br />like it's yours.
        </h1>

        <div className="grid reveal" style={{ gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <p className="body-lg col-6" style={{ color: '#1f2925', maxWidth: '46ch' }}>
            A growth-focused e-commerce studio helping brands go from idea to scale. Brand, store, and marketing — under one system, run by a close-knit team of <em className="serif italic">twelve operators</em> who've shipped for D2C brands, agencies, and founders.
          </p>
          <div className="col-6" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <a href="#contact" className="btn" style={{ background: K.ink, color: K.cream, fontSize: 15 }}>Brief us <span className="arr">→</span></a>
            <a href="#work" className="btn btn-ghost" style={{ borderColor: '#0e141133', color: K.ink }}>See the stores</a>
          </div>
        </div>
      </div>

      <div className="container reveal" style={{ marginTop: 'clamp(60px, 8vw, 100px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: '#5a6760', flexWrap: 'wrap' }}>
          <span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Built on</span>
          <span style={{ flex: 1, height: 1, background: '#0e141122', minWidth: 24 }} />
          {['Shopify Plus', 'Hydrogen', 'Liquid', 'Klaviyo', 'Recharge'].map((t, i, a) => (
            <span key={t} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span className="serif italic" style={{ fontSize: 20, color: K.ink }}>{t}</span>
              {i < a.length - 1 && <span style={{ color: '#0e141133' }}>·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function KaartBand() {
  const items = ['Shopify-only studio', '7 live stores', 'Brand · Store · Growth', 'UGC & Ads engine', 'End-to-end management', 'Dehradun · Remote India', '12-member team'];
  const arr = [...items, ...items, ...items];
  return (
    <div style={{ background: K.green, color: '#04261a', padding: '14px 0', overflow: 'hidden' }}>
      <div className="marquee">
        <div className="marquee-track" style={{ fontFamily: 'var(--mono)', fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.18em', animationDuration: '50s' }}>
          {arr.map((t, i) => <span key={i}>{t} <span style={{ color: '#04261a99' }}>✦</span></span>)}
        </div>
        <div className="marquee-track" aria-hidden style={{ fontFamily: 'var(--mono)', fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.18em', animationDuration: '50s' }}>
          {arr.map((t, i) => <span key={i}>{t} <span style={{ color: '#04261a99' }}>✦</span></span>)}
        </div>
      </div>
    </div>
  );
}

function KaartStats() {
  const stats = [
    { n: '3+', l: 'Years in e-commerce' }, { n: '12', l: 'Close-knit team members' },
    { n: '100%', l: 'E-com focused projects' }, { n: '3', l: 'Service pillars, one team' },
  ];
  return (
    <section style={{ background: K.ink, color: K.cream, padding: 'clamp(50px, 7vw, 90px) 0' }}>
      <div className="container">
        <div className="grid-4 keep-2" style={{ gap: 'var(--gap)' }}>
          {stats.map((s, i) => (
            <div key={s.l} className="reveal" style={{ '--i': i, borderTop: `1px solid ${K.green}`, paddingTop: 22 }}>
              <div className="serif" style={{ fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1, letterSpacing: '-0.02em', color: K.cream }}>{s.n}</div>
              <div className="mono" style={{ fontSize: 11, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 14 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const KAART_SERVICES = [
  {
    n: '01', title: 'Brand & Experience',
    summary: 'We craft your brand identity, messaging, and storefront experience tailored for conversion and retention.',
    bullets: ['Brand identity & visual language', 'Storefront UX & CX design', 'Conversion-focused layout strategy', 'Content flow & visual storytelling'],
  },
  {
    n: '02', title: 'Store & Tech',
    summary: 'High-performance Shopify stores built for speed, scalability, and conversions — with automations, integrations, and CRO baked in.',
    bullets: ['Custom Shopify theme or headless build', 'App integrations & workflow automations', 'CRO-optimised architecture', 'Speed, performance & Shopify Plus features'],
  },
  {
    n: '03', title: 'Growth & Marketing',
    summary: 'Content, UGC, ads, and funnels — everything needed to bring traffic, convert users, and scale revenue month-on-month.',
    bullets: ['UGC & ad creative production', 'Meta + TikTok campaign management', 'Email & WhatsApp funnel setup', 'Audience strategy, testing & scaling'],
  },
  {
    n: '04', title: 'End-to-End Management',
    summary: 'One team, zero handoffs. We run your entire e-commerce engine so you can focus on your product and manufacturing.',
    bullets: ['No multiple vendors or briefing loops', 'Design + tech + marketing under one system', 'Performance-first, not just aesthetics', 'Real feedback loops at every milestone'],
  },
];

function KaartServices() {
  return (
    <section id="services" style={{ background: K.cream, color: K.ink, padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}><span style={{ color: K.green }}>§02</span>&nbsp;&nbsp;What we do</span>
          </div>
          <div className="col-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <h2 className="h2">Three pillars. <span className="italic" style={{ color: K.green }}>One team.</span></h2>
            <Link to="/kaart/services" className="mono" style={{ fontSize: 11, color: K.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', borderBottom: `1px solid ${K.green}`, paddingBottom: 2, flexShrink: 0 }}>
              Full service breakdown →
            </Link>
          </div>
        </div>
        <div className="grid-2" style={{ gap: 'var(--gap)' }}>
          {KAART_SERVICES.map((s, i) => (
            <article key={s.n} className="reveal lift" style={{ '--i': i, border: '1px solid #0e141122', padding: 'clamp(24px, 3vw, 40px)', borderRadius: 6, background: '#fdfcf6', display: 'flex', flexDirection: 'column', gap: 18, transition: 'border-color 0.25s, transform 0.4s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = K.green}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#0e141122'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>§{s.n}</span>
                <span className="mono" style={{ fontSize: 11, color: '#5a6760', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Service</span>
              </div>
              <h3 className="serif" style={{ fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.04, letterSpacing: '-0.018em' }}>{s.title}</h3>
              <p className="body" style={{ fontSize: 16, color: '#1f2925' }}>{s.summary}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6, paddingTop: 18, borderTop: '1px solid #0e141118' }}>
                {s.bullets.map(b => (
                  <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 14.5, color: '#1f2925' }}>
                    <span style={{ width: 6, height: 6, background: K.green, borderRadius: '50%', flexShrink: 0, transform: 'translateY(-2px)' }} />{b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const KAART_PROJECTS = [
  {
    n: '01', size: 'large',
    name: 'Nirakaar', sector: 'Home Décor · Lifestyle', tag: 'End-to-end · Social · UGC',
    href: 'https://nirakaar.in',
    headline: 'Took a sculptural home décor brand from zero to a full e-commerce engine — store, social, and UGC, all under one roof.',
    summary: 'Nirakaar designs limited-batch, hand-finished sculptural objects for modern spaces. We handle everything: custom Shopify store, day-to-day operations, content creation, UGC campaigns, and social media — so their team can focus entirely on designing and crafting.',
    metrics: [{ k: 'Full', v: 'E-to-E mgmt' }, { k: 'UGC', v: 'Content engine' }, { k: 'Social', v: 'Ads & organic' }],
  },
  {
    n: '02', size: 'medium',
    name: 'Berserk Mode', sector: 'Fitness · Compression Wear', tag: 'Theme dev · Integrations',
    href: 'https://berserkmode.com',
    headline: 'High-performance Shopify theme for India\'s premium gym compression wear — built for real athletes.',
    summary: 'Custom theme build with full integration stack — influencer affiliate flows, discount systems, product comparison, and a conversion-optimised checkout for a brand whose customers are serious about their physique.',
    metrics: [{ k: 'Custom', v: 'Shopify theme' }, { k: '9+', v: 'Influencer flows' }, { k: 'Live', v: 'Pan-India' }],
  },
  {
    n: '03', size: 'medium',
    name: 'Veda Jewel', sector: 'Luxury Jewellery', tag: 'Embedded dev support',
    href: 'https://vedajewel.co',
    headline: 'Embedded inside Veda\'s team to build and scale a heritage jewellery store where pieces sell for up to ₹7.4 lakhs.',
    summary: 'Dev support embedded directly into the Veda Jewel team. Shipping new collection pages, performance improvements, and custom features for a store where speed and trust signals directly impact high-ticket conversions.',
    metrics: [{ k: '₹7.4L', v: 'Top ticket item' }, { k: 'Heritage', v: 'Luxury store' }, { k: 'Embedded', v: 'Dev support' }],
  },
  {
    n: '04', size: 'medium',
    name: 'James Aston', sector: 'Leather Goods · Fashion', tag: 'Custom Shopify dev',
    href: 'https://jamesaston.in',
    headline: 'Custom storefront for India\'s premium vegetable-tanned leather brand — built to age as well as their products.',
    summary: "Full custom Shopify build for James Aston's belts, bags, briefcases, and corporate gifting line. The store reflects their slow-craft ethos: deliberate, detailed, and built to last — with LWG-certified leather sourcing front and centre.",
    metrics: [{ k: 'Custom', v: 'Shopify store' }, { k: 'Corporate', v: 'Gifting flow' }, { k: 'Live', v: 'Pan-India' }],
  },
  {
    n: '05', size: 'medium',
    name: 'Goddess Naturals', sector: 'Intimate Wellness', tag: 'Custom Shopify build',
    href: 'https://goddessnaturals.com',
    headline: 'A premium intimate wellness brand needed a storefront as clean and science-backed as their formulas.',
    summary: 'Custom Shopify build for a CBD & THC intimate wellness line — doctor-reviewed, triple-lab-tested products. The store had to build immediate trust, communicate scientific credibility, and convert visitors who were new to the category.',
    metrics: [{ k: 'Custom', v: 'Shopify store' }, { k: 'cGMP', v: 'Trust signals' }, { k: 'Live', v: 'USA market' }],
  },
  {
    n: '06', size: 'medium',
    name: 'Paradise Pleasure', sector: 'Adult Wellness · Tech', tag: 'Custom Shopify dev',
    href: 'https://paradisepleasureproducts.com',
    headline: 'A tech-forward adult wellness brand — app-controlled, LED-integrated products — needed a store as innovative as the hardware.',
    summary: "Custom Shopify dev for Paradise's Illumination Series. App connectivity docs, 18+ age gating, complex product variants (colour profiles, intensity modes), and a premium editorial feel that matches the brand's sophisticated positioning.",
    metrics: [{ k: 'Custom', v: 'Shopify dev' }, { k: '18+', v: 'Age gating' }, { k: 'Live', v: 'USA + Global' }],
  },
  {
    n: '07', size: 'large',
    name: 'Furnicheer', sector: 'Furniture · Heritage Crafts', tag: 'Shopify store build',
    href: 'https://furnicheer.com',
    headline: 'A heritage furniture brand featured in Architectural Digest needed a store that could sell ₹60k pieces the way they deserve.',
    summary: "Shopify store build for Furnicheer's handcrafted Indian contemporary furniture — home temples, swings, armchairs, and sculptural décor. Global shipping, lifetime warranty positioning, and an editorial experience that matches their Architectural Digest and Elle Decor features.",
    metrics: [{ k: 'Arch Digest', v: 'Featured in' }, { k: 'Global', v: 'Shipping setup' }, { k: 'Live', v: 'India + Global' }],
  },
];

const WHY_KAART = [
  { icon: '⟳', t: 'No multiple vendors', d: 'End-to-end execution under one team. No briefing three agencies for three things.' },
  { icon: '◎', t: 'Design + tech + marketing', d: 'All three under one system. What we design, we build. What we build, we grow.' },
  { icon: '▲', t: 'Performance-first', d: 'Not just aesthetics. Every decision is tied to a conversion, retention, or revenue outcome.' },
  { icon: '⚡', t: 'Fast execution', d: 'Real feedback loops at every milestone. You see progress, not just promises.' },
  { icon: '●', t: 'E-com only', d: 'Built specifically for e-commerce brands — not generic agencies who do "everything".' },
];

function KaartWhyUs() {
  return (
    <section style={{ background: '#fdfcf6', color: K.ink, padding: 'clamp(60px, 8vw, 100px) 0', borderTop: '1px solid #0e141118' }}>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 5vw, 60px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span style={{ color: K.green }}>§03</span>&nbsp;&nbsp;Why Kaart
            </span>
          </div>
          <div className="col-8">
            <p className="body-lg" style={{ color: '#1f2925', maxWidth: '52ch' }}>
              Most agencies either build or market. We do both — and make sure they actually work together.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #0e141118' }}>
          {WHY_KAART.map((w, i) => (
            <div key={w.t} className="reveal" style={{ '--i': i, display: 'flex', gap: 'clamp(20px, 4vw, 60px)', padding: 'clamp(20px, 2.5vw, 30px) 0', borderBottom: '1px solid #0e141118', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <span className="mono" style={{ fontSize: 22, color: K.green, width: 36, flexShrink: 0 }}>{w.icon}</span>
              <div style={{ flex: '0 0 clamp(180px, 22vw, 280px)' }}>
                <span className="serif" style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', letterSpacing: '-0.01em' }}>{w.t}</span>
              </div>
              <p className="body" style={{ fontSize: 15, color: '#5a6760', maxWidth: '44ch', flex: 1 }}>{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KaartProjectCard({ p }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal lift ${p.size === 'large' ? 'col-12' : 'col-6'}`}
      style={{ display: 'block', textDecoration: 'none', color: K.cream }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', aspectRatio: p.size === 'large' ? '24 / 10' : '14 / 11', background: '#0f1a14', borderRadius: 6, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ffffff0a' }}>
        <span className="serif italic" style={{ fontSize: 'clamp(48px, 8vw, 120px)', color: '#1a2e22', letterSpacing: '-0.03em', userSelect: 'none' }}>{p.name}</span>
        <div style={{ position: 'absolute', top: 14, left: 16 }}>
          <span className="mono" style={{ fontSize: 10, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.14em' }}>{p.sector}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 14, right: 16 }}>
          <span style={{ fontSize: 11, color: K.green, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Visit store ↗</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ marginTop: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span className="mono" style={{ fontSize: 11, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.12em' }}>§{p.n} · {p.tag}</span>
        </div>
        <h3 className="serif" style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.15, letterSpacing: '-0.012em', color: K.cream, maxWidth: '38ch' }}>
          {p.headline}
        </h3>
        <p className="body" style={{ marginTop: 10, color: '#7d8a83', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', maxWidth: '60ch' }}>
          {p.summary}
        </p>
        <div style={{ display: 'flex', gap: 24, marginTop: 18, paddingTop: 18, borderTop: '1px solid #ffffff14' }}>
          {p.metrics.map(m => (
            <div key={m.v}>
              <div className="serif italic" style={{ fontSize: 22, color: K.green, lineHeight: 1 }}>{m.k}</div>
              <div className="mono" style={{ fontSize: 10, color: '#5a6760', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </a>
  );
}

function KaartWork() {
  return (
    <section id="work" style={{ background: '#0a100d', color: K.cream, padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)', alignItems: 'end' }}>
          <div className="col-4">
            <span className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>§04&nbsp;&nbsp;Client stores</span>
          </div>
          <div className="col-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <h2 className="h2" style={{ color: K.cream }}>40+ brands. <span className="italic" style={{ color: K.green }}>All live.</span></h2>
            <a href="#contact" className="mono" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Work with us →</a>
          </div>
        </div>

        <div className="grid" style={{ gap: 'var(--gap)', rowGap: 'clamp(40px, 6vw, 70px)' }}>
          {KAART_PROJECTS.map(p => <KaartProjectCard key={p.n} p={p} />)}
        </div>

        <div className="reveal" style={{ marginTop: 60, display: 'flex', justifyContent: 'center' }}>
          <a href="#contact" className="btn" style={{ background: K.green, color: '#0a100d', fontSize: 15, padding: '16px 32px' }}>Talk about your store <span className="arr">→</span></a>
        </div>
      </div>
    </section>
  );
}

const KAART_PROCESS = [
  { n: '01', t: 'Discovery', d: 'We start by understanding your brand, product, audience, and goals. This phase sets the foundation — aligning expectations and defining what success looks like.', dur: '1–2 days' },
  { n: '02', t: 'Research', d: 'We analyse competitors, market positioning, and customer behaviour. Every decision moving forward is backed by insights, not assumptions.', dur: '3 days' },
  { n: '03', t: 'CX Design', d: 'We design a high-converting storefront combining aesthetics with user psychology and content flow. Every section is built to guide users toward purchase.', dur: '6–8 days' },
  { n: '04', t: 'Review', d: 'We walk you through the entire experience before development begins. This ensures clarity, alignment, and zero surprises later.', dur: '2 days' },
  { n: '05', t: 'Build', d: 'We build a fast, scalable, and fully optimised store — integrating apps, automations, and conversion-focused features. Custom or theme-based, your call.', dur: '8–12 days' },
  { n: '06', t: 'Launch & Grow', d: 'We test flows, payments, and performance, then go live. Launch is just the beginning — we then shift to growth: creatives, ads, funnels, and continuous optimisation.', dur: 'Ongoing' },
];

function KaartProcess() {
  const [active, setActive] = useState(0);
  return (
    <section id="process" style={{ background: K.cream, color: K.ink, padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div className="col-4"><span className="mono" style={{ fontSize: 11, color: K.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}><span style={{ color: K.green }}>§05</span>&nbsp;&nbsp;How an engagement runs</span></div>
          <h2 className="h2 col-8">From day one to <span className="italic" style={{ color: K.green }}>scale.</span></h2>
        </div>
        <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'flex-start' }}>
          <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {KAART_PROCESS.map((p, i) => (
              <button key={p.n} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 16px', border: 'none', borderTop: i === 0 ? '1px solid #0e141122' : 'none', borderBottom: '1px solid #0e141122', background: active === i ? K.ink : 'transparent', color: active === i ? K.cream : K.ink, cursor: 'pointer', textAlign: 'left', transition: 'all 0.25s', borderRadius: 0, width: '100%' }}>
                <span className="mono" style={{ fontSize: 11, color: active === i ? K.green : '#5a6760', letterSpacing: '0.12em', flexShrink: 0 }}>§{p.n}</span>
                <span className="serif" style={{ fontSize: 'clamp(20px, 2.4vw, 32px)', flex: 1 }}>{p.t}</span>
                <span className="mono" style={{ fontSize: 11, color: active === i ? '#7d8a83' : '#5a6760', letterSpacing: '0.12em', flexShrink: 0 }}>{p.dur}</span>
              </button>
            ))}
          </div>
          <div className="col-7" style={{ padding: 'clamp(24px, 4vw, 56px)', background: '#fdfcf6', border: '1px solid #0e141122', borderRadius: 6, minHeight: 260 }}>
            <div className="mono" style={{ fontSize: 11, color: K.green, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Step {KAART_PROCESS[active].n} · {KAART_PROCESS[active].dur}</div>
            <div className="serif" key={active} style={{ fontSize: 'clamp(32px, 5vw, 64px)', marginTop: 14, fontStyle: 'italic', animation: 'reveal-up 0.45s ease' }}>{KAART_PROCESS[active].t}</div>
            <p className="body-lg" style={{ marginTop: 22, maxWidth: '40ch' }}>{KAART_PROCESS[active].d}</p>
            <div style={{ marginTop: 36, display: 'flex', gap: 6 }}>
              {KAART_PROCESS.map((_, i) => <span key={i} style={{ height: 4, flex: i === active ? 4 : 1, background: i === active ? K.green : '#0e141122', borderRadius: 2, transition: 'flex 0.4s, background 0.4s' }} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const KAART_PRICING = [
  { name: 'Theme', price: 'from $14k', dur: '4–6 weeks', items: ['Custom Liquid theme', 'Mobile-first design', 'Up to 8 templates', 'Performance budget'], hi: false },
  { name: 'Headless', price: 'from $48k', dur: '8–14 weeks', items: ['Hydrogen / Next storefront', 'Headless CMS integration', 'Edge deployment', 'Sub-1s LCP target'], hi: true },
  { name: 'Run', price: 'from $9k/mo', dur: 'monthly retainer', items: ['Klaviyo + flows', 'Paid social ops', 'Merchandising & CRO', 'UGC content engine'], hi: false },
];

function KaartPricing() {
  return (
    <section id="pricing" style={{ background: '#fdfcf6', color: K.ink, padding: 'clamp(70px, 10vw, 130px) 0', borderTop: '1px solid #0e141122' }}>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 6vw, 70px)' }}>
          <div className="col-4"><span className="mono" style={{ fontSize: 11, color: K.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}><span style={{ color: K.green }}>§06</span>&nbsp;&nbsp;What it costs</span></div>
          <h2 className="h2 col-8">Honest pricing. <span className="italic" style={{ color: K.green }}>Up front.</span></h2>
        </div>
        <div className="grid-3" style={{ gap: 'var(--gap)' }}>
          {KAART_PRICING.map((p, i) => (
            <div key={p.name} className="reveal lift" style={{ '--i': i, padding: 'clamp(24px, 3vw, 40px)', borderRadius: 6, background: p.hi ? K.ink : K.cream, color: p.hi ? K.cream : K.ink, border: p.hi ? `1px solid ${K.green}` : '1px solid #0e141122', display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
              {p.hi && <span className="mono" style={{ position: 'absolute', top: -10, left: 28, background: K.green, color: '#0a100d', padding: '4px 10px', borderRadius: 4, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Most chosen</span>}
              <div className="mono" style={{ fontSize: 11, color: p.hi ? K.green : K.greenDeep, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.dur}</div>
              <div>
                <div className="serif" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1, fontStyle: 'italic' }}>{p.name}</div>
                <div className="serif" style={{ fontSize: 26, marginTop: 12, color: p.hi ? '#a4afa9' : '#5a6760' }}>{p.price}</div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, borderTop: p.hi ? '1px solid #ffffff22' : '1px solid #0e141122' }}>
                {p.items.map(it => <li key={it} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 14.5 }}><span style={{ color: K.green }}>→</span>{it}</li>)}
              </ul>
              <a href="#contact" className="btn" style={{ marginTop: 'auto', background: p.hi ? K.green : K.ink, color: p.hi ? '#0a100d' : K.cream, fontSize: 14, justifyContent: 'center' }}>Brief us <span className="arr">→</span></a>
            </div>
          ))}
        </div>
        <p className="reveal small" style={{ marginTop: 32, color: '#5a6760', textAlign: 'center' }}>
          White-label engagements & agency partnerships available — <a href="#contact" className="u-link" style={{ color: K.greenDeep }}>get in touch</a>.
        </p>
      </div>
    </section>
  );
}

const KAART_QUOTES = [
  { q: "Kaart shipped a Hydrogen rebuild that out-performed our agency's six-month attempt — in nine weeks. Conversion is up 38%, page weight down 60%.", who: 'Maya Olsen', role: 'Head of Digital · Lumen Outfitters' },
  { q: "They are the only Shopify partner I've worked with who can run dev, design, AND social without dropping a thread. Our retention manager wants to clone them.", who: 'Daniel Reyes', role: 'Founder · Maris & Co.' },
  { q: "We white-label Kaart on three of our agency clients. Senior, accountable, and they make us look good.", who: 'Karina Patel', role: 'CEO · Bright Studio (agency partner)' },
];

function KaartTestimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(x => (x + 1) % KAART_QUOTES.length), 6500);
    return () => clearInterval(t);
  }, []);
  const cur = KAART_QUOTES[idx];
  return (
    <section style={{ background: K.green, color: '#04261a', padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <span className="mono" style={{ fontSize: 11, color: '#04261a', textTransform: 'uppercase', letterSpacing: '0.12em' }}>§07&nbsp;&nbsp;Clients · in their own words</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {KAART_QUOTES.map((_, i) => <button key={i} onClick={() => setIdx(i)} aria-label={`Quote ${i + 1}`} style={{ width: i === idx ? 32 : 12, height: 4, border: 'none', cursor: 'pointer', background: i === idx ? '#04261a' : '#04261a44', transition: 'all 0.4s', borderRadius: 2 }} />)}
          </div>
        </div>
        <blockquote key={idx} style={{ animation: 'reveal-up 0.5s ease' }}>
          <p className="serif" style={{ fontSize: 'clamp(24px, 5vw, 64px)', lineHeight: 1.1, letterSpacing: '-0.018em', maxWidth: '24ch' }}>"{cur.q}"</p>
          <div style={{ marginTop: 40, display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 44, height: 1, background: '#04261a' }} />
            <div>
              <div className="serif italic" style={{ fontSize: 20 }}>{cur.who}</div>
              <div className="mono" style={{ fontSize: 11, color: '#04261acc', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>{cur.role}</div>
            </div>
          </div>
        </blockquote>
      </div>
    </section>
  );
}

const KAART_FAQS = [
  { q: 'Do you only work on Shopify?', a: 'Yes. Kaart is a Shopify-only studio. If you need software or non-commerce work, our parent studio Crestify covers that.' },
  { q: 'Can you white-label for our agency?', a: "Often. We white-label for roughly twelve agencies. NDA, shared Slack, and we never go around you to your client." },
  { q: 'How fast can you start?', a: 'Audit calls within the week. Paid scoping starts in 7–10 days. Builds typically begin 2–3 weeks after sign-off.' },
  { q: 'Do you handle ads & content too?', a: "Yes — that's the \"Run\" engagement. Klaviyo lifecycle, Meta + TikTok ad ops, UGC creation, and merchandising all run by the same team that built the store." },
  { q: 'What if I just need a quick fix?', a: "We do focused 1–2 week sprints for performance, conversion, or migration cleanup. Email and we'll quote within 48 hours." },
];

function KaartFAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: K.cream, color: K.ink, padding: 'clamp(70px, 10vw, 130px) 0' }}>
      <div className="container">
        <div className="grid reveal" style={{ gap: 'var(--gap)', marginBottom: 40 }}>
          <div className="col-4"><span className="mono" style={{ fontSize: 11, color: K.greenDeep, textTransform: 'uppercase', letterSpacing: '0.12em' }}><span style={{ color: K.green }}>§08</span>&nbsp;&nbsp;Asked often</span></div>
          <h2 className="h2 col-8">Quick <span className="italic" style={{ color: K.green }}>answers.</span></h2>
        </div>
        <div style={{ borderTop: '1px solid #0e141122' }}>
          {KAART_FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="reveal" style={{ '--i': i }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '22px 0', border: 'none', background: 'transparent', borderBottom: '1px solid #0e141122', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <span className="serif" style={{ fontSize: 'clamp(17px, 2vw, 24px)', color: K.ink, lineHeight: 1.2 }}>{f.q}</span>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: isOpen ? K.green : 'transparent', border: '1px solid ' + (isOpen ? K.green : '#0e141133'), color: isOpen ? '#04261a' : K.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, transition: 'all 0.25s', flexShrink: 0 }}>{isOpen ? '–' : '+'}</span>
                  </div>
                  <div style={{ maxHeight: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease, opacity 0.3s ease, margin 0.3s', marginTop: isOpen ? 12 : 0 }}>
                    <p className="body" style={{ fontSize: 15.5, color: '#1f2925', maxWidth: '60ch' }}>{f.a}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function KaartContact() {
  return (
    <section id="contact" style={{ background: K.ink, color: K.cream, padding: 'clamp(80px, 12vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 80% 20%, ${K.green}22, transparent 60%)`, pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <span className="mono reveal" style={{ fontSize: 11, color: K.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>§09&nbsp;&nbsp;Brief us</span>
        <h2 className="display reveal" style={{ color: K.cream, marginTop: 22, fontSize: 'clamp(44px, 9vw, 140px)', maxWidth: '14ch' }}>
          Got a Shopify <span className="italic" style={{ color: K.green }}>problem?</span>
        </h2>
        <p className="body-lg reveal" style={{ color: '#a4afa9', marginTop: 28, maxWidth: '52ch' }}>
          Tell us about your brand, product, and where you're stuck — store, ads, content, or all three. We'll come back with a clear plan within 48 hours.
        </p>
        <div className="reveal" style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="mailto:contact@crestify.co" className="btn" style={{ background: K.green, color: '#04261a', fontSize: 16, padding: '18px 28px' }}>contact@crestify.co <span className="arr">→</span></a>
          <a href="https://wa.me/917992028684" target="_blank" rel="noopener noreferrer" className="btn" style={{ border: '1px solid #ffffff44', color: K.cream, fontSize: 16, padding: '18px 28px' }}>WhatsApp us ↗</a>
        </div>
        <div className="grid-3 reveal" style={{ gap: 'var(--gap)', marginTop: 80, paddingTop: 40, borderTop: '1px solid #ffffff1c' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Studio</div>
            <p className="body" style={{ color: '#cfd5d2', marginTop: 8, fontSize: 14.5 }}>Dehradun · Remote across India</p>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Contact</div>
            <p className="body" style={{ marginTop: 8, fontSize: 14.5, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <a href="mailto:contact@crestify.co" className="u-link" style={{ color: K.green }}>contact@crestify.co</a>
              <a href="https://wa.me/917992028684" className="u-link" style={{ color: '#cfd5d2' }}>+91 7992028684</a>
            </p>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, color: '#7d8a83', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Parent studio</div>
            <p className="body" style={{ marginTop: 8, fontSize: 14.5 }}><Link to="/" className="u-link" style={{ color: K.green }}>Crestify Studio ↗</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function KaartFooter() {
  return (
    <footer style={{ background: '#04100a', color: '#a4afa9', padding: 'clamp(50px, 7vw, 80px) var(--pad) 28px' }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <div className="serif" style={{ fontSize: 'clamp(60px, 16vw, 240px)', lineHeight: 0.85, color: K.cream, fontStyle: 'italic', letterSpacing: '-0.04em' }}>kaart*</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingTop: 24, borderTop: '1px solid #ffffff1c', flexWrap: 'wrap', gap: 16 }}>
          <span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>© Kaart Studio · A <Link to="/" style={{ color: K.green }} className="u-link">Crestify</Link> studio</span>
          <span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Shopify-only · 7 stores live · Taking new projects</span>
        </div>
      </div>
    </footer>
  );
}

export default function Kaart() {
  useReveal();
  return (
    <div className="page" style={{ background: K.cream }}>
      <KaartNav />
      <KaartHero />
      <KaartBand />
      <KaartStats />
      <KaartServices />
      <KaartWhyUs />
      <KaartWork />
      <KaartProcess />
      <KaartTestimonials />
      <KaartPricing />
      <KaartFAQ />
      <KaartContact />
      <KaartFooter />
    </div>
  );
}
