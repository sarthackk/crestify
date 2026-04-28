import { useState } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#c8f060';
const fmt = n => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n >= 1000 ? `₹${(n / 1000).toFixed(1)}k` : `₹${Math.round(n).toLocaleString('en-IN')}`;

function Field({ label, hint, prefix, suffix, k, vals, set, placeholder }) {
  return (
    <div>
      <label style={{ fontFamily: 'var(--sans)', fontSize: 13, color: '#9c9b95', display: 'block', marginBottom: 6 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {prefix && <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--mono)', fontSize: 13, color: '#6a6a65', pointerEvents: 'none' }}>{prefix}</span>}
        <input
          type="number" value={vals[k]} placeholder={placeholder}
          onChange={e => set(k, e.target.value)}
          style={{ width: '100%', background: '#ffffff08', border: '1px solid #ffffff18', borderRadius: 8, padding: `12px ${suffix ? '56px' : '14px'} 12px ${prefix ? '28px' : '14px'}`, fontFamily: 'var(--mono)', fontSize: 15, color: '#f0ede6', outline: 'none', boxSizing: 'border-box', appearance: 'textfield' }}
        />
        {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--mono)', fontSize: 11, color: '#6a6a65', pointerEvents: 'none' }}>{suffix}</span>}
      </div>
      {hint && <p style={{ fontSize: 12, color: '#4a4a45', marginTop: 4, lineHeight: 1.4 }}>{hint}</p>}
    </div>
  );
}

export default function LTVCalculator() {
  const [v, setV] = useState({ aov: '', freq: '', life: '', cac: '' });
  const set = (k, val) => setV(p => ({ ...p, [k]: val }));

  const aov  = parseFloat(v.aov)  || 0;
  const freq = parseFloat(v.freq) || 0;
  const life = parseFloat(v.life) || 0;
  const cac  = parseFloat(v.cac)  || 0;

  const ltv   = aov * freq * life;
  const ratio = cac > 0 && ltv > 0 ? ltv / cac : null;
  const ready = ltv > 0;

  const HEALTH = ratio === null ? null
    : ratio < 1   ? { l: 'Critical',  c: '#ef4444', note: "You're losing money on every customer. Reduce CAC or increase AOV urgently." }
    : ratio < 2   ? { l: 'Weak',      c: '#f97316', note: 'Barely viable. Reduce acquisition costs or increase repeat purchase rate.' }
    : ratio < 3   ? { l: 'Below avg', c: '#f59e0b', note: 'Below the 3:1 benchmark. Doable but tight.' }
    : ratio < 5   ? { l: 'Healthy',   c: ACCENT,    note: "You're in the green. Investable unit economics." }
    :               { l: 'Excellent', c: '#22c55e', note: 'Outstanding. Strong room to scale paid acquisition.' };

  const BENCHMARKS = [
    { range: '< 1:1', l: 'Critical',  c: '#ef4444', note: 'Losing money' },
    { range: '1–3:1', l: 'Below avg', c: '#f59e0b', note: 'Needs work' },
    { range: '3–5:1', l: 'Healthy',   c: ACCENT,    note: 'Industry benchmark' },
    { range: '5:1+',  l: 'Excellent', c: '#22c55e', note: 'Scale freely' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--bg)', fontFamily: 'var(--sans)' }}>
      <div style={{ borderBottom: '1px solid #ffffff0e', padding: '16px clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/toolkit" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>← Toolkit</Link>
          <span style={{ color: '#ffffff14' }}>|</span>
          <span className="mono" style={{ fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Tool 04 · LTV Calculator</span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 48px) clamp(60px, 8vw, 100px)' }}>
        <span className="mono" style={{ fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.15em' }}>LTV Calculator</span>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.022em', color: '#f0ede6', marginTop: 10, maxWidth: '20ch' }}>
          Customer Lifetime Value
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#9c9b95', maxWidth: '52ch', marginTop: 14, marginBottom: 40 }}>
          Know what a customer is worth — and exactly how much you can afford to spend acquiring them.
        </p>

        <div className="tool-grid">
          {/* Inputs */}
          <div style={{ background: '#ffffff06', border: '1px solid #ffffff0e', borderRadius: 12, padding: 'clamp(24px, 3vw, 40px)', display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Your numbers</div>
            <Field k="aov"  label="Average Order Value"         placeholder="1200" prefix="₹" hint="Typical cart value of an order" vals={v} set={set} />
            <Field k="freq" label="Purchases per Year"          placeholder="3.5"             hint="How many times does a customer buy per year?" vals={v} set={set} />
            <Field k="life" label="Avg. Customer Lifespan"      placeholder="2"   suffix="yrs" hint="Average years a customer stays active" vals={v} set={set} />
            <div style={{ borderTop: '1px solid #ffffff0c', paddingTop: 20 }}>
              <Field k="cac" label="Current CAC (optional)" placeholder="800" prefix="₹" hint="What you currently spend to acquire one customer" vals={v} set={set} />
            </div>
          </div>

          {/* Outputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Main LTV */}
            <div style={{ background: ready ? `${ACCENT}12` : '#ffffff06', border: `1px solid ${ready ? ACCENT + '44' : '#ffffff0e'}`, borderRadius: 12, padding: 'clamp(22px, 3vw, 36px)', transition: 'all 0.35s' }}>
              <div className="mono" style={{ fontSize: 10, color: ready ? ACCENT : '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>Customer LTV</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(52px, 8vw, 88px)', lineHeight: 0.9, letterSpacing: '-0.025em', color: ready ? ACCENT : '#2a2a2a' }}>
                {ready ? fmt(ltv) : '—'}
              </div>
              {ready && (
                <p style={{ fontSize: 13, color: '#9c9b95', marginTop: 12, lineHeight: 1.5 }}>
                  Each customer brings you {fmt(ltv)} over their lifetime.{' '}
                  {aov > 0 && freq > 0 && <span>{(freq * life).toFixed(1)} orders × {fmt(aov)} AOV.</span>}
                </p>
              )}
            </div>

            {/* Ratio */}
            {HEALTH && (
              <div style={{ background: `${HEALTH.c}10`, border: `1px solid ${HEALTH.c}35`, borderRadius: 12, padding: 'clamp(20px, 3vw, 32px)' }}>
                <div className="mono" style={{ fontSize: 10, color: HEALTH.c, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>LTV : CAC Ratio</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1, letterSpacing: '-0.02em', color: HEALTH.c }}>{ratio.toFixed(1)}:1</span>
                  <span className="mono" style={{ fontSize: 11, color: HEALTH.c, textTransform: 'uppercase', letterSpacing: '0.1em', background: `${HEALTH.c}1a`, padding: '4px 10px', borderRadius: 999 }}>{HEALTH.l}</span>
                </div>
                <p style={{ fontSize: 13, color: '#9c9b95', marginTop: 10, lineHeight: 1.5 }}>{HEALTH.note}</p>
              </div>
            )}

            {/* Max CAC targets */}
            {ready && (
              <div style={{ background: '#ffffff06', border: '1px solid #ffffff0e', borderRadius: 12, padding: 'clamp(20px, 3vw, 32px)' }}>
                <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>Max CAC you can afford</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'At 3:1 (minimum healthy)',  val: ltv / 3, c: ACCENT },
                    { label: 'At 5:1 (strong)',           val: ltv / 5, c: '#22c55e' },
                  ].map(r => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, color: '#9c9b95' }}>{r.label}</span>
                      <span className="mono" style={{ fontSize: 16, color: r.c }}>{fmt(r.val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!ready && (
              <div style={{ background: '#ffffff04', border: '1px dashed #ffffff12', borderRadius: 12, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, flex: 1 }}>
                <p className="mono" style={{ fontSize: 11, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Fill in your numbers</p>
              </div>
            )}
          </div>
        </div>

        {/* Benchmark bar */}
        <div style={{ marginTop: 28, background: '#ffffff04', border: '1px solid #ffffff0c', borderRadius: 12, padding: 'clamp(20px, 3vw, 32px)' }}>
          <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 18 }}>LTV : CAC benchmark guide</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {BENCHMARKS.map(b => (
              <div key={b.range} style={{ textAlign: 'center', padding: '14px 8px', background: `${b.c}0a`, borderRadius: 8, border: `1px solid ${b.c}20` }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 2vw, 24px)', color: b.c }}>{b.range}</div>
                <div className="mono" style={{ fontSize: 9, color: b.c, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{b.l}</div>
                <div style={{ fontSize: 11, color: '#4a4a45', marginTop: 4 }}>{b.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
