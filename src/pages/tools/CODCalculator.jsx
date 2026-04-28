import { useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#0d9b6a';
const fmt = n => `₹${Math.round(n).toLocaleString('en-IN')}`;
const pct = n => `${n.toFixed(1)}%`;

function Field({ label, hint, prefix, suffix, k, vals, set, placeholder, step }) {
  return (
    <div>
      <label style={{ fontFamily: 'var(--sans)', fontSize: 13, color: '#9c9b95', display: 'block', marginBottom: 6 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {prefix && <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--mono)', fontSize: 13, color: '#6a6a65', pointerEvents: 'none' }}>{prefix}</span>}
        <input
          type="number" value={vals[k]} placeholder={placeholder} step={step || 'any'}
          onChange={e => set(k, e.target.value)}
          style={{ width: '100%', background: '#ffffff08', border: '1px solid #ffffff18', borderRadius: 8, padding: `12px ${suffix ? '52px' : '14px'} 12px ${prefix ? '28px' : '14px'}`, fontFamily: 'var(--mono)', fontSize: 15, color: '#f0ede6', outline: 'none', boxSizing: 'border-box', appearance: 'textfield' }}
        />
        {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--mono)', fontSize: 11, color: '#6a6a65', pointerEvents: 'none' }}>{suffix}</span>}
      </div>
      {hint && <p style={{ fontSize: 12, color: '#4a4a45', marginTop: 4, lineHeight: 1.4 }}>{hint}</p>}
    </div>
  );
}

export default function CODCalculator() {
  const [v, setV] = useState({ price: '', cogs: '', shipping: '', codFee: '1.5', returnRate: '15', reverseShip: '' });
  const set = (k, val) => setV(p => ({ ...p, [k]: val }));

  const price      = parseFloat(v.price)      || 0;
  const cogs       = parseFloat(v.cogs)       || 0;
  const shipping   = parseFloat(v.shipping)   || 0;
  const codFee     = parseFloat(v.codFee)     || 0;
  const returnRate = parseFloat(v.returnRate) || 0;
  const reverseShip = parseFloat(v.reverseShip) || 0;

  const ready = price > 0 && cogs > 0;

  const codAmt      = price * (codFee / 100);
  const grossMargin = price - cogs - shipping - codAmt;
  const grossPct    = price > 0 ? (grossMargin / price) * 100 : 0;

  // Per 100 orders: (100 - returnRate) delivered, returnRate returned
  const delivered   = 100 - returnRate;
  const revenue100  = delivered * price;
  const cogs100     = 100 * cogs; // you still bear COGS on returns
  const ship100     = 100 * shipping;
  const cod100      = delivered * codAmt;
  const reverse100  = returnRate * reverseShip;
  const net100      = revenue100 - cogs100 - ship100 - cod100 - reverse100;
  const effectivePct = revenue100 > 0 ? (net100 / revenue100) * 100 : 0;

  const breakEven = price > 0 && (price - cogs - shipping - codAmt) > 0
    ? ((grossMargin) / (grossMargin + reverseShip + cogs)) * 100
    : null;

  const getColor = p => p > 20 ? '#22c55e' : p > 10 ? ACCENT : p > 0 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--bg)', fontFamily: 'var(--sans)' }}>
      <div style={{ borderBottom: '1px solid #ffffff0e', padding: '16px clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/toolkit" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>← Toolkit</Link>
          <span style={{ color: '#ffffff14' }}>|</span>
          <span className="mono" style={{ fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Tool 07 · COD & Returns Calculator</span>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 48px) clamp(60px, 8vw, 100px)' }}>
        <span className="mono" style={{ fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.15em' }}>COD & Returns Calculator</span>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.022em', color: '#f0ede6', marginTop: 10, maxWidth: '20ch' }}>
          Real margin after COD & returns
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#9c9b95', maxWidth: '52ch', marginTop: 14, marginBottom: 40 }}>
          Your listed margin is a lie. This shows what you actually keep after shipping, COD fees, and returns.
        </p>

        <div className="tool-grid">
          {/* Inputs */}
          <div style={{ background: '#ffffff06', border: '1px solid #ffffff0e', borderRadius: 12, padding: 'clamp(24px, 3vw, 40px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Product & logistics costs</div>
            <Field k="price"      label="Selling Price (MRP)"         placeholder="999"  prefix="₹" hint="What the customer pays"               vals={v} set={set} />
            <Field k="cogs"       label="Product Cost (COGS)"         placeholder="280"  prefix="₹" hint="Manufacturing / sourcing cost"        vals={v} set={set} />
            <Field k="shipping"   label="Forward Shipping Cost"       placeholder="80"   prefix="₹" hint="Per order courier charge"             vals={v} set={set} />
            <div style={{ borderTop: '1px solid #ffffff0c', paddingTop: 18 }}>
              <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>COD & returns</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <Field k="codFee"     label="COD Fee"               placeholder="1.5" suffix="%"  hint="Typically 1.5–2% of order value (Shiprocket, Delhivery)"   vals={v} set={set} step="0.1" />
                <Field k="returnRate" label="Return Rate"           placeholder="15"  suffix="%"  hint="% of orders returned — D2C average is 10–25%"              vals={v} set={set} step="1" />
                <Field k="reverseShip" label="Reverse Shipping Cost" placeholder="60" prefix="₹" hint="Cost to bring back a returned order"                        vals={v} set={set} />
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Per-order margin */}
            <div style={{ background: ready ? `${ACCENT}12` : '#ffffff06', border: `1px solid ${ready ? ACCENT + '44' : '#ffffff0e'}`, borderRadius: 12, padding: 'clamp(22px, 3vw, 36px)', transition: 'all 0.35s' }}>
              <div className="mono" style={{ fontSize: 10, color: ready ? ACCENT : '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>Gross margin per delivered order</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: 0.9, letterSpacing: '-0.025em', color: ready ? getColor(grossPct) : '#2a2a2a' }}>
                {ready ? pct(grossPct) : '—'}
              </div>
              {ready && (
                <p style={{ fontSize: 13, color: '#9c9b95', marginTop: 12, lineHeight: 1.5 }}>
                  {fmt(grossMargin)} per delivered order after COGS, shipping & COD charges.
                </p>
              )}
            </div>

            {/* Effective margin after returns */}
            {ready && returnRate > 0 && (
              <div style={{ background: `${getColor(effectivePct)}0e`, border: `1px solid ${getColor(effectivePct)}33`, borderRadius: 12, padding: 'clamp(20px, 3vw, 32px)' }}>
                <div className="mono" style={{ fontSize: 10, color: getColor(effectivePct), textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>Effective margin after returns ({returnRate}% RTR)</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1, letterSpacing: '-0.02em', color: getColor(effectivePct) }}>
                  {pct(effectivePct)}
                </div>
                <p style={{ fontSize: 13, color: '#9c9b95', marginTop: 10, lineHeight: 1.5 }}>
                  Net {fmt(net100 / 100)} per order on average across 100 shipments.
                </p>
              </div>
            )}

            {/* Cost breakdown per order */}
            {ready && (
              <div style={{ background: '#ffffff06', border: '1px solid #ffffff0e', borderRadius: 12, padding: 'clamp(20px, 3vw, 30px)' }}>
                <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>Where your money goes per order</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {[
                    { label: 'Selling price',     val: price,         c: ACCENT,    sign: '+' },
                    { label: 'Product cost',      val: -cogs,         c: '#ef4444', sign: '−' },
                    { label: 'Forward shipping',  val: -shipping,     c: '#f59e0b', sign: '−' },
                    { label: `COD fee (${codFee}%)`, val: -codAmt,    c: '#f97316', sign: '−' },
                  ].map(r => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: '#9c9b95' }}>{r.sign} {r.label}</span>
                      <span className="mono" style={{ fontSize: 13, color: r.c }}>{fmt(Math.abs(r.val))}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #ffffff10', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#f0ede6' }}>= Gross per order</span>
                    <span className="mono" style={{ fontSize: 15, color: getColor(grossPct) }}>{fmt(grossMargin)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Per 100 orders */}
        {ready && (
          <div style={{ marginTop: 28, background: '#ffffff04', border: '1px solid #ffffff0c', borderRadius: 12, padding: 'clamp(20px, 3vw, 36px)' }}>
            <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 18 }}>What 100 orders actually looks like</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {[
                { label: 'Delivered orders', val: `${delivered.toFixed(0)} / 100`, sub: `${returnRate}% returned`, c: ACCENT },
                { label: 'Net revenue', val: fmt(revenue100), sub: 'From delivered orders only', c: '#a5b4fc' },
                { label: 'Total costs', val: fmt(cogs100 + ship100 + cod100 + reverse100), sub: 'COGS + shipping + COD + returns', c: '#f97316' },
                { label: 'Net profit', val: fmt(net100), sub: `${pct(effectivePct)} effective margin`, c: getColor(effectivePct) },
                { label: 'Return drag', val: fmt(reverse100 + returnRate * cogs), sub: 'Lost to returns (ship + COGS)', c: '#ef4444' },
                { label: 'Break-even RTR', val: breakEven && breakEven > 0 ? `${breakEven.toFixed(1)}%` : 'N/A', sub: 'Max return rate before you lose money', c: '#f59e0b' },
              ].map(s => (
                <div key={s.label} style={{ background: `${s.c}0a`, border: `1px solid ${s.c}22`, borderRadius: 10, padding: 'clamp(14px, 2vw, 22px)' }}>
                  <div className="mono" style={{ fontSize: 9, color: s.c, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#f0ede6', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: '#4a4a45', marginTop: 5, lineHeight: 1.4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
