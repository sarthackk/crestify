import { Link } from 'react-router-dom';
import SEO, { serviceSchema, faqSchema, breadcrumbSchema } from '../../components/shared/SEO.jsx';
import Nav from '../../components/shared/Nav.jsx';
import Footer from '../../components/shared/Footer.jsx';
import Eyebrow from '../../components/shared/Eyebrow.jsx';
import { useReveal } from '../../components/shared/useReveal.js';

const DELIVERABLES = [
  { n: '01', t: 'Custom Shopify Theme Development', d: 'Pixel-perfect Liquid themes built from scratch. No bloated page-builders, no cookie-cutter templates. Core Web Vitals green across all devices.' },
  { n: '02', t: 'Shopify Hydrogen & Headless', d: 'Next-gen React storefronts on Shopify\'s own headless stack. Sub-1s LCP, edge-rendered, composable. For brands that have outgrown traditional themes.' },
  { n: '03', t: 'Shopify Plus Migration & Replatform', d: 'Full-stack migrations from WooCommerce, Magento, or legacy Shopify. Data integrity guaranteed. Zero revenue lost during cutover.' },
  { n: '04', t: 'Checkout & CRO Optimization', d: 'Shopify Checkout Extensions, one-page checkout, upsell flows, cart recovery. Every element tested against a conversion hypothesis.' },
  { n: '05', t: 'App Integrations & Custom Development', d: 'Klaviyo, Recharge, Loop Returns, Gorgias — integrated properly, not just connected. Custom apps when the ecosystem doesn\'t cut it.' },
  { n: '06', t: 'Shopify Growth Retainers', d: 'Monthly engagement covering CRO tests, new features, performance monitoring, and Klaviyo lifecycle management. Your senior Shopify team on retainer.' },
];

const RESULTS = [
  { k: '50+', v: 'Shopify stores built' },
  { k: '38%', v: 'Avg. conversion lift' },
  { k: '<1s', v: 'LCP target on all builds' },
  { k: '7', v: 'Kaart Studio live stores' },
];

const WHY = [
  {
    t: 'Founder-led, senior-only execution',
    d: 'Sarthak Tiwari personally leads every Shopify engagement. You get the person who pitched the project doing the actual work — not a junior developer following a spec sheet.',
  },
  {
    t: 'D2C-native thinking',
    d: 'We\'ve built for fashion, beauty, furniture, food, and fitness brands. We know the conversion logic, the inventory edge cases, and the Klaviyo flows that actually retain customers.',
  },
  {
    t: 'Performance is non-negotiable',
    d: 'Every store we ship targets sub-1s LCP and 90+ Lighthouse scores. Slow stores lose revenue. We don\'t build slow stores.',
  },
  {
    t: 'We stay after launch',
    d: 'Our retainer clients get a senior Shopify resource who knows their codebase. No handoff docs and goodbye. Real continuity.',
  },
];

const FAQS = [
  { q: 'Do you only do Shopify?', a: 'Our Kaart Studio division is Shopify-only. Crestify (the parent studio) handles SaaS, AI, and non-commerce software. If you need Shopify, Kaart is the right team.' },
  { q: 'How long does a Shopify build take?', a: 'A custom theme build typically runs 4–6 weeks. A Hydrogen headless build is 8–14 weeks. We give fixed timelines and hold to them.' },
  { q: 'Can you migrate my WooCommerce or Magento store?', a: 'Yes. We\'ve run full migrations with product data, customer records, order history, and SEO redirects intact. We\'ve never lost a client\'s data in a migration.' },
  { q: 'Do you handle Shopify Plus?', a: 'Yes. Shopify Plus-specific features — Checkout Extensions, Scripts, B2B, Expansion Stores — are part of our standard toolkit.' },
  { q: 'What does a Shopify retainer include?', a: 'Ongoing CRO, new feature development, Klaviyo flow management, performance audits, and a monthly strategy call. Minimum 12 weeks.' },
  { q: 'Are you based in India?', a: 'Our studio is based in Dehradun, India with operations in Toronto. We work with D2C brands globally and cover both Indian and North American business hours.' },
];

const PROJECTS = [
  { name: 'Furnicheer', sector: 'Furniture · Heritage', tag: 'Shopify Build', result: 'Editorial Shopify store for an Architectural Digest-featured brand. Global shipping. Live.' },
  { name: 'Mockzy', sector: 'AI · D2C Tools', tag: 'Product + Shopify', result: 'AI creative studio for D2C catalog generation. Paying users from day one.' },
  { name: 'Equip Rentals', sector: 'Construction Tech', tag: 'React Native', result: 'Marketplace app for construction equipment rental. iOS + Android. Live vendors onboarded.' },
];

export default function ShopifyDevelopment() {
  useReveal();

  const schema = [
    serviceSchema(
      'Shopify Development Agency India',
      'Custom Shopify theme development, Hydrogen headless builds, Shopify Plus migration, and D2C growth retainers for Indian and global brands.',
      '/shopify-development'
    ),
    faqSchema(FAQS.map(f => ({ q: f.q, a: f.a }))),
    breadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Shopify Development', href: '/shopify-development' },
    ]),
  ];

  return (
    <div className="page">
      <SEO
        title="Shopify Development Agency India — Kaart Studio × Crestify"
        description="Founder-led Shopify development for serious D2C brands. Custom themes, Hydrogen headless, Shopify Plus migrations, and growth retainers. Based in India, built for global brands."
        canonical="/shopify-development"
        keywords="Shopify development agency India, Shopify developer India, custom Shopify theme, Shopify Plus agency, Hydrogen headless Shopify, D2C ecommerce India"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: 64, paddingBottom: 'clamp(50px, 7vw, 90px)' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <Eyebrow index="01">Shopify Development Agency · India</Eyebrow>
          </div>
          <h1 className="display" style={{ maxWidth: '18ch' }}>
            Shopify built right. <span className="italic" style={{ color: 'var(--ink-3)' }}>By people who ship.</span>
          </h1>
          <div className="grid" style={{ gap: 'var(--gap)', marginTop: 'clamp(40px, 6vw, 70px)', alignItems: 'start' }}>
            <p className="body-lg col-7" style={{ maxWidth: '52ch' }}>
              We are a founder-led Shopify development studio. Every build is led by Sarthak Tiwari — not delegated to a junior. Custom themes, Hydrogen headless, Shopify Plus migrations, and growth retainers for D2C brands that take their store seriously.
            </p>
            <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <Link to="/contact" className="btn btn-accent" style={{ fontSize: 16, padding: '18px 28px' }}>
                Brief us on your store <span className="arr">→</span>
              </Link>
              <Link to="/kaart" className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                See Kaart Studio →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
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

      {/* Services */}
      <section className="section-pad" style={{ borderBottom: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            <div className="col-4"><Eyebrow index="02">What we build</Eyebrow></div>
            <h2 className="h2 col-8">Full-stack Shopify. <span className="italic" style={{ color: 'var(--ink-3)' }}>End to end.</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line-strong)' }}>
            {DELIVERABLES.map((d, i) => (
              <div key={d.n} className="reveal grid" style={{ '--i': i, gap: 'var(--gap)', padding: 'clamp(24px, 3vw, 40px) 0', borderBottom: '1px solid var(--line-strong)', alignItems: 'start' }}>
                <div className="col-4">
                  <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>§{d.n}</div>
                  <h3 className="serif" style={{ fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.2 }}>{d.t}</h3>
                </div>
                <p className="col-8 body" style={{ fontSize: 16, maxWidth: '52ch', paddingTop: 4 }}>{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-pad" style={{ background: 'var(--bg-elev)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            <div className="col-4"><Eyebrow index="03">Why Crestify</Eyebrow></div>
            <h2 className="h2 col-8">Not another agency. <span className="italic" style={{ color: 'var(--ink-3)' }}>A builder.</span></h2>
          </div>
          <div className="grid-2" style={{ gap: 'var(--gap)' }}>
            {WHY.map((w, i) => (
              <div key={w.t} className="reveal" style={{ '--i': i, padding: 'clamp(24px, 3vw, 36px)', border: '1px solid var(--line-strong)', borderRadius: 4, background: 'var(--bg)' }}>
                <h3 className="serif" style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.2 }}>{w.t}</h3>
                <p className="body" style={{ marginTop: 12, fontSize: 15, color: 'var(--ink-3)' }}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="section-pad">
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            <div className="col-4"><Eyebrow index="04">Selected work</Eyebrow></div>
            <h2 className="h2 col-8">Stores we've built. <span className="italic" style={{ color: 'var(--ink-3)' }}>All still running.</span></h2>
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
          <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
            <Link to="/work" className="btn btn-ghost">See all case studies</Link>
            <Link to="/kaart" className="btn btn-primary">See Kaart Studio <span className="arr">→</span></Link>
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
          <Eyebrow light>Start a Shopify project</Eyebrow>
          <h2 className="display" style={{ color: 'var(--bg)', marginTop: 18, fontSize: 'clamp(44px, 7vw, 110px)', maxWidth: '16ch', lineHeight: 1.02 }}>
            Your store, <span className="italic" style={{ color: 'var(--accent)' }}>done right.</span>
          </h2>
          <p className="body-lg" style={{ color: '#9c9b95', maxWidth: '48ch', marginTop: 24 }}>
            Tell us about your brand and where you're stuck. We reply within 48 hours with a clear plan — not a sales pitch.
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
