import { useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#f59e0b';

const STAGES = [
  { id: 'launch',  label: 'Just Launched',         sub: '₹0 – ₹5L / month' },
  { id: 'growing', label: 'Growing',                sub: '₹5L – ₹50L / month' },
  { id: 'scaling', label: 'Scaling',                sub: '₹50L+ / month' },
];

const GOALS = [
  { id: 'reviews',      label: 'Boost Reviews & UGC',     icon: '⭐' },
  { id: 'email',        label: 'Email & SMS Retention',   icon: '📧' },
  { id: 'upsell',       label: 'Upsell & Bundles',        icon: '📦' },
  { id: 'subscriptions',label: 'Subscriptions',           icon: '🔁' },
  { id: 'analytics',    label: 'Analytics & Attribution', icon: '📊' },
  { id: 'shipping',     label: 'Shipping & Returns',      icon: '🚚' },
  { id: 'seo',          label: 'Page Speed & SEO',        icon: '⚡' },
  { id: 'loyalty',      label: 'Loyalty Program',         icon: '🏆' },
];

const APPS = {
  reviews: {
    label: 'Reviews & UGC',
    launch:  [{ name: 'Judge.me',  tag: 'Free plan available', why: 'Best free reviews app. Auto-request, photo reviews, widget customization. Start here.' }],
    growing: [{ name: 'Okendo',    tag: 'From $19/mo',         why: 'Richer attributes, video reviews, customer profiles. Great for building trust at scale.' }, { name: 'Junip',  tag: 'From $19/mo', why: 'Clean UI, on-brand review widgets. Good alternative to Okendo.' }],
    scaling: [{ name: 'Yotpo',     tag: 'Enterprise',          why: 'Full suite: reviews, SMS, loyalty. Makes sense when you need everything in one platform.' }],
  },
  email: {
    label: 'Email & SMS',
    launch:  [{ name: 'Klaviyo',   tag: 'Free up to 250 contacts', why: 'Industry standard for D2C. Start free, the flows you build will scale with you.' }],
    growing: [{ name: 'Klaviyo',   tag: 'Paid tier',               why: 'Same platform — just unlock SMS, more segments, and predictive analytics.' }, { name: 'Postscript', tag: 'From $100/mo', why: 'Best dedicated SMS platform if you want to run SMS as a serious channel.' }],
    scaling: [{ name: 'Klaviyo',   tag: 'Full suite',              why: 'At scale, Klaviyo\'s predictive analytics and CDI integrations become genuinely valuable.' }, { name: 'Attentive', tag: 'Enterprise SMS', why: 'Best-in-class SMS for high volume senders.' }],
  },
  upsell: {
    label: 'Upsell & Bundles',
    launch:  [{ name: 'Frequently Bought Together', tag: 'From $9.99/mo', why: 'Simple, effective product bundling. Minimal setup, immediate AOV lift.' }],
    growing: [{ name: 'Zipify OCU', tag: 'From $35/mo', why: 'Post-purchase upsells — one click, no re-entering payment. Highest-intent moment.' }, { name: 'Bold Bundles', tag: 'From $14.99/mo', why: 'Custom bundle builder with flexible discount types.' }],
    scaling: [{ name: 'Rebuy',      tag: 'From $99/mo', why: 'AI-powered recommendations, smart cart, post-purchase flows. Worth it above ₹25L/mo.' }],
  },
  subscriptions: {
    label: 'Subscriptions',
    launch:  [{ name: 'Seal Subscriptions', tag: 'Free plan available', why: 'Best free option. Solid core subscription functionality without locking you in.' }],
    growing: [{ name: 'Recharge',    tag: 'From $99/mo', why: 'Most widely used. Large ecosystem of integrations. Solid at growth stage.' }],
    scaling: [{ name: 'Skio',        tag: 'Revenue share', why: 'Better UX, faster checkout, lower churn. Preferred by high-growth DTC brands.' }, { name: 'Smartrr', tag: 'From $299/mo', why: 'Premium subscriber experience — member portal, loyalty bundles.' }],
  },
  analytics: {
    label: 'Analytics & Attribution',
    launch:  [{ name: 'Google Analytics 4', tag: 'Free', why: 'Set this up before anything else. Know your traffic.' }, { name: 'Shopify Analytics', tag: 'Built-in', why: 'Good enough for early stage. Cohort reports, sales by channel.' }],
    growing: [{ name: 'Triple Whale', tag: 'From $129/mo', why: 'Best post-iOS14 attribution. Real-time ROAS by channel. Built for DTC.' }],
    scaling: [{ name: 'Northbeam',   tag: 'From $500/mo', why: 'More granular attribution, better for omnichannel brands.' }, { name: 'Polar Analytics', tag: 'From $300/mo', why: 'Beautifully designed, strong segmentation and cohort analysis.' }],
  },
  shipping: {
    label: 'Shipping & Returns',
    launch:  [{ name: 'Shiprocket', tag: 'Pay per shipment', why: 'Best for India. Multi-courier, NDR management, COD.' }, { name: 'AfterShip', tag: 'Free plan', why: 'Branded tracking page. Reduces "where is my order?" support tickets.' }],
    growing: [{ name: 'Loop Returns', tag: 'From $59/mo', why: 'Self-serve returns portal. Reduces refunds, improves exchange rate.' }, { name: 'Delhivery / XB', tag: 'Negotiated rates', why: 'Direct courier integration at volume for better rates.' }],
    scaling: [{ name: 'Shipbob',    tag: 'Fulfilment network', why: 'Outsourced fulfilment with US/UK warehouses if you\'re going global.' }],
  },
  seo: {
    label: 'Page Speed & SEO',
    launch:  [{ name: 'TinyIMG',    tag: 'From $4.99/mo', why: 'Auto image compression. Biggest free speed win on Shopify.' }, { name: 'Plug in SEO', tag: 'Free plan', why: 'SEO audit and fix — meta tags, structured data, sitemap.' }],
    growing: [{ name: 'SearchPie',  tag: 'From $39/mo', why: 'JSON-LD, speed optimisation, and SEO all in one. Worth it at growth stage.' }],
    scaling: [{ name: 'Instant',    tag: 'From $299/mo', why: 'Headless storefront on Shopify. Meaningfully faster page load. Conversion lift.' }],
  },
  loyalty: {
    label: 'Loyalty Program',
    launch:  [{ name: 'Smile.io',   tag: 'Free plan available', why: 'Points, referrals, VIP tiers. Free plan covers basics for early stage.' }],
    growing: [{ name: 'Smile.io',   tag: 'From $49/mo', why: 'Unlock referral program and deeper customisation. Strong ROI for repeat-purchase categories.' }, { name: 'Growave', tag: 'From $49/mo', why: 'Reviews + loyalty + wishlist in one. Good value bundle.' }],
    scaling: [{ name: 'LoyaltyLion', tag: 'From $399/mo', why: 'Advanced segmentation, analytics, and custom tiers. Enterprise-grade loyalty.' }, { name: 'Yotpo Loyalty', tag: 'Enterprise', why: 'Tight integration with Yotpo reviews and SMS for a unified retention stack.' }],
  },
};

export default function AppStackBuilder() {
  const [stage, setStage]   = useState(null);
  const [goals, setGoals]   = useState([]);

  const toggleGoal = g => setGoals(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g]);
  const ready = stage && goals.length > 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--bg)', fontFamily: 'var(--sans)' }}>
      <div style={{ borderBottom: '1px solid #ffffff0e', padding: '16px clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/toolkit" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>← Toolkit</Link>
          <span style={{ color: '#ffffff14' }}>|</span>
          <span className="mono" style={{ fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Tool 06 · App Stack Builder</span>
        </div>
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 48px) clamp(60px, 8vw, 100px)' }}>
        <span className="mono" style={{ fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Shopify App Stack Builder</span>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.022em', color: '#f0ede6', marginTop: 10, maxWidth: '20ch' }}>
          Build your Shopify app stack
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#9c9b95', maxWidth: '52ch', marginTop: 14, marginBottom: 40 }}>
          Tell us where you are and what you need — get a curated, stage-matched app recommendation. No fluff, no bloat.
        </p>

        {/* Step 1: Stage */}
        <div style={{ marginBottom: 36 }}>
          <div className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>Step 1 — Where is your store right now?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {STAGES.map(s => (
              <button key={s.id} onClick={() => setStage(s.id)}
                style={{ padding: 'clamp(16px, 2.5vw, 24px)', borderRadius: 10, border: `1px solid ${stage === s.id ? ACCENT + '66' : '#ffffff18'}`, background: stage === s.id ? `${ACCENT}14` : '#ffffff06', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 2vw, 22px)', color: stage === s.id ? ACCENT : '#f0ede6', marginBottom: 4 }}>{s.label}</div>
                <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Goals */}
        <div style={{ marginBottom: 48 }}>
          <div className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>Step 2 — What do you want to improve? (pick all that apply)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {GOALS.map(g => {
              const on = goals.includes(g.id);
              return (
                <button key={g.id} onClick={() => toggleGoal(g.id)}
                  style={{ padding: 'clamp(12px, 2vw, 18px)', borderRadius: 10, border: `1px solid ${on ? ACCENT + '55' : '#ffffff14'}`, background: on ? `${ACCENT}12` : '#ffffff06', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{g.icon}</div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: on ? ACCENT : '#9c9b95', lineHeight: 1.3 }}>{g.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {ready ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div className="mono" style={{ fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4 }}>Your recommended stack</div>
                <p style={{ fontSize: 14, color: '#6a6a65' }}>Based on {STAGES.find(s => s.id === stage)?.label} stage · {goals.length} goal{goals.length > 1 ? 's' : ''} selected</p>
              </div>
              <span className="mono" style={{ fontSize: 11, color: '#6a6a65', background: '#ffffff08', padding: '6px 14px', borderRadius: 999, border: '1px solid #ffffff12' }}>{goals.length} categories · {goals.reduce((n, g) => n + (APPS[g]?.[stage]?.length || 0), 0)} apps</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {goals.map(gId => {
                const cat   = APPS[gId];
                const recs  = cat?.[stage] || [];
                const goal  = GOALS.find(g => g.id === gId);
                if (!recs.length) return null;
                return (
                  <div key={gId} style={{ border: '1px solid #ffffff0e', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ background: `${ACCENT}10`, borderBottom: '1px solid #ffffff0c', padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 16 }}>{goal?.icon}</span>
                      <span className="mono" style={{ fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{cat.label}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {recs.map((app, i) => (
                        <div key={app.name} style={{ padding: 'clamp(16px, 2.5vw, 24px) 22px', borderBottom: i < recs.length - 1 ? '1px solid #ffffff08' : 'none', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                          <div style={{ width: 40, height: 40, borderRadius: 8, background: `${ACCENT}18`, border: `1px solid ${ACCENT}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: ACCENT }}>{app.name[0]}</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                              <span style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, color: '#f0ede6' }}>{app.name}</span>
                              <span className="mono" style={{ fontSize: 9, color: '#6a6a65', background: '#ffffff08', padding: '3px 8px', borderRadius: 999, border: '1px solid #ffffff10', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{app.tag}</span>
                            </div>
                            <p style={{ fontSize: 13, color: '#9c9b95', marginTop: 5, lineHeight: 1.6 }}>{app.why}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 32, background: `${ACCENT}0a`, border: `1px solid ${ACCENT}25`, borderRadius: 12, padding: 'clamp(20px, 3vw, 32px)' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: '#9c9b95', lineHeight: 1.7 }}>
                <span style={{ color: ACCENT, fontWeight: 500 }}>Kaart Studio tip:</span> Don't install all of these at once. Start with the 1–2 that match your biggest gap, get them working well, then layer in more. More apps = more site weight and potential conflicts.
              </p>
              <Link to="/kaart#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontFamily: 'var(--mono)', fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: `1px solid ${ACCENT}44`, padding: '10px 18px', borderRadius: 999 }}>
                Want us to set this up? Talk to Kaart ↗
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ background: '#ffffff04', border: '1px dashed #ffffff12', borderRadius: 12, padding: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <p className="mono" style={{ fontSize: 11, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>
              {!stage ? 'Select your store stage above' : 'Select at least one goal to see recommendations'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
