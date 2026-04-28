import { useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#ec4899';

const STAGES = [
  { id: 'prelaunch', label: 'Pre-launch',   sub: 'Building the list' },
  { id: 'launched',  label: 'Just Launched',sub: '0–3 months live' },
  { id: 'growing',   label: 'Growing',      sub: '3–18 months' },
  { id: 'scaling',   label: 'Scaling',      sub: '18+ months, serious volume' },
];

const PLATFORMS = ['Klaviyo', 'Mailchimp', 'Omnisend', 'Other'];

const FLOWS = {
  prelaunch: [
    {
      name: 'Pre-launch Welcome Series',
      priority: '🔥 Must build first',
      emails: 3,
      timing: 'D0 → D2 → D5',
      color: ACCENT,
      desc: 'Capture waitlist signups and nurture them to purchase on launch day.',
      emails_detail: [
        { n: 1, subject: 'You\'re on the list — here\'s what\'s coming', purpose: 'Welcome + brand story. Build excitement. Tease the product without full reveal.' },
        { n: 2, subject: 'The problem we\'re solving (and why it matters)', purpose: 'Problem-solution story. Why this brand exists. Build emotional connection.' },
        { n: 3, subject: 'Launch is [X days away] — here\'s your early access', purpose: 'Countdown email. Early bird offer for waitlist. Hard CTA to buy on day 1.' },
      ],
    },
  ],
  launched: [
    {
      name: 'Welcome Series',
      priority: '🔥 Must build first',
      emails: 4,
      timing: 'D0 → D1 → D3 → D7',
      color: ACCENT,
      desc: 'Your highest-performing flow. First impression, brand story, and soft push to first purchase.',
      emails_detail: [
        { n: 1, subject: 'Welcome to [Brand] — here\'s what we\'re about', purpose: 'Immediate welcome. Brand story in 3 lines. Hero product showcase. No hard sell.' },
        { n: 2, subject: 'Why [Product Category] will never be the same', purpose: 'Product education. What makes you different. Social proof.' },
        { n: 3, subject: 'Real people, real results — [X] reviews', purpose: 'UGC/review heavy. Let customers do the selling.' },
        { n: 4, subject: 'Still thinking? Here\'s 10% off your first order', purpose: 'Conversion email. Discount + urgency. Last push before they go cold.' },
      ],
    },
    {
      name: 'Abandoned Cart',
      priority: '🔥 Build immediately after welcome',
      emails: 3,
      timing: '1hr → 24hr → 72hr',
      color: '#f97316',
      desc: 'The single highest-ROI flow in ecommerce. Catches buyers at peak intent.',
      emails_detail: [
        { n: 1, subject: 'You left something behind...', purpose: 'Soft reminder at 1 hour. Show the product. No discount yet.' },
        { n: 2, subject: 'Your cart is still waiting — [Product Name]', purpose: 'At 24hrs — add urgency. Low stock if true. Still no discount.' },
        { n: 3, subject: 'Last chance + a little something for you', purpose: 'At 72hrs — offer discount (5–10%). Include product reviews.' },
      ],
    },
  ],
  growing: [
    {
      name: 'Welcome Series',
      priority: '🔥 Foundation',
      emails: 5,
      timing: 'D0 → D1 → D3 → D5 → D10',
      color: ACCENT,
      desc: 'Extend to 5 emails. Add a dedicated UGC/review email and a brand values email.',
      emails_detail: [
        { n: 1, subject: 'Welcome to [Brand]', purpose: 'Brand story + hero visual' },
        { n: 2, subject: 'What makes us different', purpose: 'USP deep-dive' },
        { n: 3, subject: '[X] customers can\'t be wrong', purpose: 'Social proof email' },
        { n: 4, subject: 'What we stand for', purpose: 'Brand values / mission — builds loyalty' },
        { n: 5, subject: 'Ready to try? Here\'s a push', purpose: 'Final conversion email with offer' },
      ],
    },
    {
      name: 'Abandoned Cart (3-email)',
      priority: '🔥 Foundation',
      emails: 3,
      timing: '1hr → 24hr → 72hr',
      color: '#f97316',
      desc: 'Same structure as launched stage — optimise subject lines and test discount timing.',
      emails_detail: [
        { n: 1, subject: 'You left [Product] behind', purpose: 'Soft reminder, show product image prominently' },
        { n: 2, subject: 'Still interested in [Product]?', purpose: 'Urgency — low stock / limited time if applicable' },
        { n: 3, subject: 'We saved your cart + something special', purpose: 'Discount email. Include 2–3 reviews.' },
      ],
    },
    {
      name: 'Post-Purchase Series',
      priority: '⚡ Build next',
      emails: 3,
      timing: 'D0 → D3 → D14',
      color: '#22c55e',
      desc: 'Reinforce the purchase, reduce buyer\'s remorse, prime for repeat purchase.',
      emails_detail: [
        { n: 1, subject: 'Order confirmed ✓ — here\'s what happens next', purpose: 'Transactional feel. Shipping info. "You made a great choice."' },
        { n: 2, subject: 'Your [Product] is on the way — here\'s how to use it', purpose: 'Product education / tips. Reduces support tickets.' },
        { n: 3, subject: 'How\'s your [Product]? We\'d love to know', purpose: 'Review request + introduce complementary product.' },
      ],
    },
    {
      name: 'Browse Abandonment',
      priority: '⚡ Build next',
      emails: 2,
      timing: '4hr → 48hr',
      color: '#6366f1',
      desc: 'Catch window shoppers who viewed a product but didn\'t add to cart.',
      emails_detail: [
        { n: 1, subject: 'Still thinking about [Product]?', purpose: 'Show browsed product. Educational content. No discount.' },
        { n: 2, subject: 'Others are looking at this too...', purpose: 'Social proof + soft urgency. Product reviews.' },
      ],
    },
    {
      name: 'Win-Back',
      priority: '📈 Scale phase',
      emails: 3,
      timing: '60d → 75d → 90d since last order',
      color: '#f59e0b',
      desc: 'Re-engage customers who haven\'t bought in 60–90 days.',
      emails_detail: [
        { n: 1, subject: 'We miss you — here\'s what\'s new', purpose: 'New arrivals, what\'s changed. Soft re-engagement.' },
        { n: 2, subject: 'A gift from us — [10% off / free shipping]', purpose: 'Offer email. Make it feel personal.' },
        { n: 3, subject: 'Last chance to reconnect', purpose: 'Final email before suppressing. Hard offer + urgency.' },
      ],
    },
  ],
  scaling: [
    {
      name: 'All Growing Flows',
      priority: '🔥 Foundation',
      emails: null,
      timing: 'All of the above',
      color: ACCENT,
      desc: 'All flows from the growing stage should be live and optimised before adding more.',
      emails_detail: [],
    },
    {
      name: 'VIP Segment Flow',
      priority: '⚡ Scaling priority',
      emails: 2,
      timing: 'Trigger: VIP segment entry',
      color: '#a855f7',
      desc: 'When a customer crosses your VIP threshold (top 10% by spend) — acknowledge it.',
      emails_detail: [
        { n: 1, subject: 'You\'re officially a [Brand] VIP', purpose: 'Celebrate the milestone. Exclusive perk or early access.' },
        { n: 2, subject: 'Your VIP preview — [new collection]', purpose: 'Early access to new products before general release.' },
      ],
    },
    {
      name: 'Predictive Reorder',
      priority: '⚡ Scaling priority',
      emails: 2,
      timing: 'Trigger: predicted reorder date',
      color: '#0d9b6a',
      desc: 'For consumable products — email just before the customer runs out.',
      emails_detail: [
        { n: 1, subject: 'Running low on [Product]?', purpose: 'Sent 7–10 days before predicted reorder. Convenience framing.' },
        { n: 2, subject: 'Restock reminder + subscribe & save', purpose: 'Subscription upsell + reorder link. 3–4 days before predicted run-out.' },
      ],
    },
    {
      name: 'Birthday / Anniversary Flow',
      priority: '📈 Nice to have',
      emails: 2,
      timing: 'Trigger: birthday / signup anniversary',
      color: '#f59e0b',
      desc: 'One of the highest open-rate flows. People love feeling seen.',
      emails_detail: [
        { n: 1, subject: 'Happy birthday 🎂 — a gift from [Brand]', purpose: 'Sent 3 days before birthday. Exclusive birthday discount.' },
        { n: 2, subject: 'Your birthday offer expires tonight', purpose: 'Expiry reminder. Last push.' },
      ],
    },
  ],
};

export default function EmailFlowPlanner() {
  const [stage, setStage]     = useState(null);
  const [platform, setPlatform] = useState(null);
  const [open, setOpen]       = useState(null);

  const flows = stage ? FLOWS[stage] || [] : [];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--bg)', fontFamily: 'var(--sans)' }}>
      <div style={{ borderBottom: '1px solid #ffffff0e', padding: '16px clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/toolkit" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>← Toolkit</Link>
          <span style={{ color: '#ffffff14' }}>|</span>
          <span className="mono" style={{ fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Tool 05 · Email Flow Planner</span>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 48px) clamp(60px, 8vw, 100px)' }}>
        <span className="mono" style={{ fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Email Flow Planner</span>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.022em', color: '#f0ede6', marginTop: 10, maxWidth: '20ch' }}>
          Build your email flows the right way
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#9c9b95', maxWidth: '52ch', marginTop: 14, marginBottom: 40 }}>
          Pick your stage — get the exact flows to build, how many emails, timing, and what each one should say.
        </p>

        {/* Stage picker */}
        <div style={{ marginBottom: 28 }}>
          <div className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>Where is your brand right now?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {STAGES.map(s => (
              <button key={s.id} onClick={() => setStage(s.id)}
                style={{ padding: 'clamp(14px, 2vw, 20px)', borderRadius: 10, border: `1px solid ${stage === s.id ? ACCENT + '66' : '#ffffff14'}`, background: stage === s.id ? `${ACCENT}14` : '#ffffff06', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(14px, 1.8vw, 18px)', color: stage === s.id ? ACCENT : '#f0ede6', marginBottom: 4 }}>{s.label}</div>
                <div className="mono" style={{ fontSize: 9, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Platform picker */}
        <div style={{ marginBottom: 48 }}>
          <div className="mono" style={{ fontSize: 10, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>Your email platform</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PLATFORMS.map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                style={{ padding: '10px 18px', borderRadius: 999, border: `1px solid ${platform === p ? ACCENT + '55' : '#ffffff14'}`, background: platform === p ? `${ACCENT}12` : '#ffffff06', color: platform === p ? ACCENT : '#9c9b95', fontFamily: 'var(--mono)', fontSize: 11, cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {p}
              </button>
            ))}
          </div>
          {platform && platform !== 'Klaviyo' && (
            <p style={{ fontSize: 13, color: '#f59e0b', marginTop: 8 }}>⚡ We recommend switching to Klaviyo when you can — it's the industry standard for D2C and every flow below maps to it perfectly.</p>
          )}
        </div>

        {/* Flows */}
        {flows.length > 0 ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
              <div className="mono" style={{ fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                {STAGES.find(s => s.id === stage)?.label} stage — your flow plan
              </div>
              <span className="mono" style={{ fontSize: 10, color: '#6a6a65' }}>{flows.length} flows · {flows.reduce((n, f) => n + (f.emails || 0), 0)} emails total</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {flows.map((flow, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} style={{ border: `1px solid ${isOpen ? flow.color + '44' : '#ffffff0e'}`, borderRadius: 12, overflow: 'hidden', background: isOpen ? `${flow.color}06` : '#ffffff04', transition: 'all 0.3s' }}>
                    <button onClick={() => setOpen(isOpen ? null : i)}
                      style={{ width: '100%', padding: 'clamp(18px, 2.5vw, 26px) clamp(18px, 2.5vw, 28px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, flexWrap: 'wrap' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: flow.color, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 2vw, 22px)', color: '#f0ede6', lineHeight: 1.1 }}>{flow.name}</div>
                          <div style={{ display: 'flex', gap: 12, marginTop: 5, flexWrap: 'wrap' }}>
                            <span className="mono" style={{ fontSize: 9, color: flow.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{flow.priority}</span>
                            {flow.emails && <span className="mono" style={{ fontSize: 9, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{flow.emails} emails</span>}
                            <span className="mono" style={{ fontSize: 9, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{flow.timing}</span>
                          </div>
                        </div>
                      </div>
                      <span style={{ color: '#6a6a65', fontSize: 20, flexShrink: 0 }}>{isOpen ? '−' : '+'}</span>
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 clamp(18px, 2.5vw, 28px) clamp(20px, 3vw, 32px)' }}>
                        <p style={{ fontSize: 14, color: '#9c9b95', lineHeight: 1.7, marginBottom: 20 }}>{flow.desc}</p>
                        {flow.emails_detail.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {flow.emails_detail.map(e => (
                              <div key={e.n} style={{ background: '#ffffff06', border: '1px solid #ffffff0c', borderRadius: 8, padding: 'clamp(14px, 2vw, 20px)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <div style={{ width: 28, height: 28, borderRadius: 999, background: `${flow.color}1a`, border: `1px solid ${flow.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <span className="mono" style={{ fontSize: 10, color: flow.color }}>{e.n}</span>
                                </div>
                                <div>
                                  <div style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, color: '#f0ede6', marginBottom: 4 }}>"{e.subject}"</div>
                                  <p style={{ fontSize: 12, color: '#6a6a65', lineHeight: 1.5 }}>{e.purpose}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 32, background: `${ACCENT}0a`, border: `1px solid ${ACCENT}25`, borderRadius: 12, padding: 'clamp(20px, 3vw, 32px)' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: '#9c9b95', lineHeight: 1.7 }}>
                <span style={{ color: ACCENT, fontWeight: 500 }}>Kaart Studio tip:</span> Don't try to set up all flows at once. Build Welcome → Abandoned Cart → Post-Purchase in that order. Those three alone can recover 15–25% of lost revenue before you touch anything else.
              </p>
              <Link to="/kaart#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontFamily: 'var(--mono)', fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: `1px solid ${ACCENT}44`, padding: '10px 18px', borderRadius: 999 }}>
                Want Kaart to build these for you? ↗
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ background: '#ffffff04', border: '1px dashed #ffffff12', borderRadius: 12, padding: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="mono" style={{ fontSize: 11, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Select your brand stage above to see your flow plan</p>
          </div>
        )}
      </div>
    </div>
  );
}
