import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const ACCENT = '#6366f1';
const fmt = n => n >= 1000000 ? `₹${(n / 1000000).toFixed(2)}M` : n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n >= 1000 ? `₹${(n / 1000).toFixed(1)}k` : `₹${Math.round(n).toLocaleString('en-IN')}`;
const fmtShort = n => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 100000 ? `${(n / 100000).toFixed(1)}L` : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : Math.round(n).toString();

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

export default function MRRProjector() {
  const [v, setV] = useState({ mrr: '', growth: '', churn: '' });
  const [months, setMonths] = useState(12);
  const set = (k, val) => setV(p => ({ ...p, [k]: val }));

  const baseMRR  = parseFloat(v.mrr)    || 0;
  const growth   = parseFloat(v.growth) || 0;
  const churn    = parseFloat(v.churn)  || 0;
  const ready    = baseMRR > 0 && growth > 0;

  const data = useMemo(() => {
    if (!ready) return [];
    const arr = [];
    let mrr = baseMRR;
    for (let i = 1; i <= months; i++) {
      const newMRR   = mrr * (growth / 100);
      const churnMRR = mrr * (churn  / 100);
      mrr = mrr + newMRR - churnMRR;
      arr.push({ month: i, mrr });
    }
    return arr;
  }, [baseMRR, growth, churn, months]);

  const finalMRR  = data.length ? data[data.length - 1].mrr : 0;
  const finalARR  = finalMRR * 12;
  const maxMRR    = data.length ? Math.max(...data.map(d => d.mrr)) : 1;
  const netGrowth = finalMRR > 0 ? ((finalMRR - baseMRR) / baseMRR * 100).toFixed(1) : 0;
  const multiple  = baseMRR > 0 && finalMRR > 0 ? (finalMRR / baseMRR).toFixed(1) : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--bg)', fontFamily: 'var(--sans)' }}>
      <div style={{ borderBottom: '1px solid #ffffff0e', padding: '16px clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/toolkit" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#9c9b95', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>← Toolkit</Link>
          <span style={{ color: '#ffffff14' }}>|</span>
          <span className="mono" style={{ fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Tool 05 · MRR Growth Projector</span>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 48px) clamp(60px, 8vw, 100px)' }}>
        <span className="mono" style={{ fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.15em' }}>MRR Growth Projector</span>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.022em', color: '#f0ede6', marginTop: 10, maxWidth: '20ch' }}>
          MRR Growth Projector
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#9c9b95', maxWidth: '52ch', marginTop: 14, marginBottom: 40 }}>
          Enter your current MRR, growth rate, and churn — see where you'll be in 6, 12, or 24 months.
        </p>

        <div className="tool-grid">
          {/* Inputs */}
          <div style={{ background: '#ffffff06', border: '1px solid #ffffff0e', borderRadius: 12, padding: 'clamp(24px, 3vw, 40px)', display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Your numbers</div>
            <Field k="mrr"    label="Current MRR"          placeholder="50000"  prefix="₹"  hint="Monthly recurring revenue right now"          vals={v} set={set} />
            <Field k="growth" label="Monthly Growth Rate"  placeholder="12"     suffix="%"  hint="How much MRR grows each month (new customers + expansion)" vals={v} set={set} step="0.1" />
            <Field k="churn"  label="Monthly Churn Rate"   placeholder="3"      suffix="%"  hint="% of MRR lost per month to cancellations"     vals={v} set={set} step="0.1" />

            {/* Projection toggle */}
            <div>
              <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Projection window</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[6, 12, 24].map(m => (
                  <button key={m} onClick={() => setMonths(m)}
                    style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: `1px solid ${months === m ? ACCENT + '66' : '#ffffff18'}`, background: months === m ? `${ACCENT}14` : 'transparent', color: months === m ? ACCENT : '#6a6a65', fontFamily: 'var(--mono)', fontSize: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
                    {m}mo
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: `MRR at month ${months}`, val: finalMRR, c: ACCENT, show: ready },
                { label: `Projected ARR`,           val: finalARR, c: '#a5b4fc', show: ready },
              ].map(s => (
                <div key={s.label} style={{ background: s.show ? `${s.c}0e` : '#ffffff06', border: `1px solid ${s.show ? s.c + '33' : '#ffffff0e'}`, borderRadius: 10, padding: 'clamp(16px, 2vw, 24px)', transition: 'all 0.35s' }}>
                  <div className="mono" style={{ fontSize: 9, color: s.show ? s.c : '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1, letterSpacing: '-0.02em', color: s.show ? s.c : '#2a2a2a' }}>{s.show ? fmt(s.val) : '—'}</div>
                </div>
              ))}
            </div>

            {ready && multiple && (
              <div style={{ background: `${ACCENT}0a`, border: `1px solid ${ACCENT}25`, borderRadius: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: '#9c9b95' }}>Growth in {months} months</span>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color: ACCENT }}>+{netGrowth}%</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color: '#a5b4fc' }}>{multiple}× multiple</span>
                </div>
              </div>
            )}

            {/* Net growth rate info */}
            {ready && growth > 0 && churn > 0 && (
              <div style={{ background: '#ffffff06', border: '1px solid #ffffff0e', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ fontSize: 13, color: '#9c9b95' }}>Net monthly growth (growth − churn)</span>
                  <span className="mono" style={{ fontSize: 14, color: growth - churn > 0 ? '#22c55e' : '#ef4444' }}>
                    {growth - churn > 0 ? '+' : ''}{(growth - churn).toFixed(1)}%/mo
                  </span>
                </div>
                {growth - churn <= 0 && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 6 }}>⚠ Churn is eating all new growth. You need to reduce churn or increase growth rate.</p>}
              </div>
            )}
          </div>
        </div>

        {/* Bar chart */}
        {ready && data.length > 0 && (
          <div style={{ marginTop: 28, background: '#ffffff04', border: '1px solid #ffffff0c', borderRadius: 12, padding: 'clamp(20px, 3vw, 36px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
              <div className="mono" style={{ fontSize: 10, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.14em' }}>MRR over {months} months</div>
              <div style={{ display: 'flex', gap: 14 }}>
                <span className="mono" style={{ fontSize: 10, color: '#6a6a65' }}>Start: {fmt(baseMRR)}</span>
                <span className="mono" style={{ fontSize: 10, color: ACCENT }}>End: {fmt(finalMRR)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: months > 12 ? 3 : 6, height: 160 }}>
              {data.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ width: '100%', background: `linear-gradient(to top, ${ACCENT}, ${ACCENT}66)`, borderRadius: '3px 3px 0 0', transition: 'height 0.6s cubic-bezier(.2,.7,.2,1)', height: `${Math.max(4, (d.mrr / maxMRR) * 100)}%`, position: 'relative' }}
                    title={`Month ${d.month}: ${fmt(d.mrr)}`}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span className="mono" style={{ fontSize: 9, color: '#4a4a45' }}>Mo 1</span>
              {months > 12 && <span className="mono" style={{ fontSize: 9, color: '#4a4a45' }}>Mo {months / 2}</span>}
              <span className="mono" style={{ fontSize: 9, color: '#4a4a45' }}>Mo {months}</span>
            </div>

            {/* Monthly breakdown — last 4 */}
            <div style={{ marginTop: 20, borderTop: '1px solid #ffffff08', paddingTop: 16 }}>
              <div className="mono" style={{ fontSize: 9, color: '#4a4a45', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Selected milestones</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[3, 6, 9, 12].filter(m => m <= months).concat(months > 12 ? [18, 24].filter(m => m <= months) : []).slice(0, 4).map(m => {
                  const d = data[m - 1];
                  if (!d) return null;
                  return (
                    <div key={m} style={{ background: '#ffffff06', borderRadius: 8, padding: '12px 10px', textAlign: 'center' }}>
                      <div className="mono" style={{ fontSize: 9, color: '#6a6a65', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Month {m}</div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 2vw, 22px)', color: '#f0ede6', marginTop: 4 }}>{fmtShort(d.mrr)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {!ready && (
          <div style={{ marginTop: 28, background: '#ffffff04', border: '1px dashed #ffffff12', borderRadius: 12, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p className="mono" style={{ fontSize: 11, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enter your MRR and growth rate to see the projection</p>
          </div>
        )}
      </div>
    </div>
  );
}
