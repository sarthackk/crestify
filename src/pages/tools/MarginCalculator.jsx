import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const fmt = (n) => isNaN(n) || !isFinite(n) ? "0" : Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 });
const pct = (n) => isNaN(n) || !isFinite(n) ? "0" : Number(n).toFixed(1);

function MarginTool() {
  const [inputs, setInputs] = useState({ sellingPrice: "", manufacturing: "", packaging: "", shipping: "", returns: "", platformFee: "", adSpend: "" });
  const [results, setResults] = useState(null);
  const set = (key, val) => setInputs((prev) => ({ ...prev, [key]: val }));

  useEffect(() => {
    const sp = parseFloat(inputs.sellingPrice) || 0;
    if (sp === 0) { setResults(null); return; }
    const mfg = parseFloat(inputs.manufacturing) || 0;
    const pkg = parseFloat(inputs.packaging) || 0;
    const ship = parseFloat(inputs.shipping) || 0;
    const ret = parseFloat(inputs.returns) || 0;
    const platform = (parseFloat(inputs.platformFee) || 0) / 100 * sp;
    const ads = parseFloat(inputs.adSpend) || 0;
    const totalCost = mfg + pkg + ship + ret + platform + ads;
    const grossProfit = sp - totalCost;
    const margin = (grossProfit / sp) * 100;
    const recommendedPrice = totalCost / 0.35;
    const roasNeeded = ads > 0 ? sp / ads : 0;
    let health = "danger", healthLabel = "Losing Money", healthMsg = "Your costs exceed revenue. Raise price or cut costs.";
    if (margin >= 40) { health = "great"; healthLabel = "Healthy Margin"; healthMsg = "Strong margins. You can scale profitably."; }
    else if (margin >= 25) { health = "good"; healthLabel = "Decent Margin"; healthMsg = "Workable but tight. Watch your ad spend carefully."; }
    else if (margin >= 10) { health = "warn"; healthLabel = "Thin Margin"; healthMsg = "Very little room for error. Hard to scale on this."; }
    setResults({ totalCost, grossProfit, margin, recommendedPrice, roasNeeded, health, healthLabel, healthMsg, platform, sp });
  }, [inputs]);

  const fields = [
    { key: "sellingPrice", label: "Selling Price", icon: "₹", hint: "What you charge the customer" },
    { key: "manufacturing", label: "Manufacturing Cost", icon: "₹", hint: "Per unit production cost" },
    { key: "packaging", label: "Packaging Cost", icon: "₹", hint: "Box, bag, inserts per unit" },
    { key: "shipping", label: "Shipping Cost", icon: "₹", hint: "Per order delivery cost" },
    { key: "returns", label: "Returns Provision", icon: "₹", hint: "Average return cost per unit" },
    { key: "platformFee", label: "Platform Fee", icon: "%", hint: "Shopify, payment gateway %" },
    { key: "adSpend", label: "Ad Spend per Order", icon: "₹", hint: "Total ad spend / orders" },
  ];

  const healthColors = {
    great: { bg: "#0a2e1a", border: "#1a5c35", text: "#4ade80", badge: "#16a34a", badgeTxt: "#dcfce7" },
    good: { bg: "#1a2a0a", border: "#3a5c15", text: "#a3e635", badge: "#65a30d", badgeTxt: "#f7fee7" },
    warn: { bg: "#2a1a00", border: "#7c4a00", text: "#fb923c", badge: "#ea580c", badgeTxt: "#fff7ed" },
    danger: { bg: "#2a0a0a", border: "#7c1515", text: "#f87171", badge: "#dc2626", badgeTxt: "#fef2f2" },
  };
  const hc = results ? healthColors[results.health] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'DM Mono', 'Courier New', monospace", color: "#e8e8e0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        .mc-input { width:100%; background:#13131a; border:1px solid #2a2a3a; color:#e8e8e0; font-family:'DM Mono',monospace; font-size:15px; padding:12px 16px 12px 40px; outline:none; transition:border-color 0.2s; border-radius:2px; }
        .mc-input:focus { border-color:#c8f060; }
        .mc-input::placeholder { color:#3a3a4a; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }
        input[type=number] { -moz-appearance:textfield; }
        .mc-row { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #1a1a25; }
        .mc-row:last-child { border-bottom:none; }
        .mc-bar { width:100%; height:4px; background:#1a1a25; border-radius:2px; margin-top:8px; overflow:hidden; }
        .mc-bar-fill { height:100%; border-radius:2px; transition:width 0.6s cubic-bezier(0.16,1,0.3,1); }
        .mc-tag { font-size:10px; font-family:'DM Mono',monospace; padding:3px 8px; border-radius:2px; letter-spacing:0.05em; }
        .glow-text { text-shadow:0 0 20px rgba(200,240,96,0.3); }
      `}</style>

      <div style={{ borderBottom: "1px solid #1a1a25", padding: "32px 24px 24px", background: "#0d0d14" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 6, height: 28, background: "#c8f060", borderRadius: 1 }} />
            <span style={{ fontSize: 10, color: "#555570", letterSpacing: "0.15em" }}>KAART STUDIO / TOOL 01</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800, color: "#e8e8e0", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            D2C Profit Margin<br /><span style={{ color: "#c8f060" }} className="glow-text">Calculator</span>
          </h1>
          <p style={{ marginTop: 10, color: "#555570", fontSize: 13, lineHeight: 1.6 }}>Know your numbers before you scale. Built by Sarthak Tiwari.</p>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 24px 48px" }}>
        <div style={{ background: "#0d0d14", border: "1px solid #1a1a25", borderRadius: 4, padding: "24px", marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: "#555570", letterSpacing: "0.15em", marginBottom: 20 }}>INPUT YOUR NUMBERS</div>
          <div style={{ display: "grid", gap: 14 }}>
            {fields.map(({ key, label, icon, hint }) => (
              <div key={key}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontSize: 12, color: "#9090a0", letterSpacing: "0.05em" }}>{label}</label>
                  <span style={{ fontSize: 11, color: "#3a3a4a" }}>{hint}</span>
                </div>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#555570", fontSize: 13 }}>{icon}</span>
                  <input className="mc-input" type="number" placeholder="0" value={inputs[key]} onChange={(e) => set(key, e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {results && (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ background: hc.bg, border: `1px solid ${hc.border}`, borderRadius: 4, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 10, color: hc.text, letterSpacing: "0.15em", marginBottom: 6 }}>MARGIN HEALTH</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: hc.text, lineHeight: 1 }}>{pct(results.margin)}%</div>
                  <div style={{ fontSize: 12, color: "#9090a0", marginTop: 6 }}>net margin</div>
                </div>
                <span className="mc-tag" style={{ background: hc.badge, color: hc.badgeTxt }}>{results.healthLabel}</span>
              </div>
              <div style={{ marginTop: 16 }}>
                <div className="mc-bar"><div className="mc-bar-fill" style={{ width: `${Math.min(Math.max(results.margin, 0), 100)}%`, background: hc.text }} /></div>
              </div>
              <p style={{ marginTop: 12, fontSize: 12, color: "#9090a0", lineHeight: 1.5 }}>{results.healthMsg}</p>
            </div>

            <div style={{ background: "#0d0d14", border: "1px solid #1a1a25", borderRadius: 4, padding: "20px 24px" }}>
              <div style={{ fontSize: 10, color: "#555570", letterSpacing: "0.15em", marginBottom: 16 }}>COST BREAKDOWN</div>
              {[
                { label: "Selling Price", value: results.sp, color: "#c8f060" },
                { label: "Total Cost per Order", value: results.totalCost, color: "#f87171" },
                { label: "Gross Profit", value: results.grossProfit, color: results.grossProfit >= 0 ? "#4ade80" : "#f87171" },
                { label: "Platform Fee (calculated)", value: results.platform, color: "#9090a0" },
              ].map(({ label, value, color }) => (
                <div className="mc-row" key={label}>
                  <span style={{ fontSize: 13, color: "#9090a0" }}>{label}</span>
                  <span style={{ fontSize: 15, color, fontWeight: 500 }}>₹{fmt(value)}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#0d0d14", border: "1px solid #1a1a25", borderRadius: 4, padding: "20px 24px" }}>
              <div style={{ fontSize: 10, color: "#555570", letterSpacing: "0.15em", marginBottom: 16 }}>KEY METRICS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "ROAS Needed to Break Even", value: `${pct(results.roasNeeded)}x`, hint: "Min return on ad spend" },
                  { label: "Recommended Min. Price", value: `₹${fmt(results.recommendedPrice)}`, hint: "For 35% margin target" },
                ].map(({ label, value, hint }) => (
                  <div key={label} style={{ background: "#13131a", border: "1px solid #2a2a3a", borderRadius: 2, padding: "14px" }}>
                    <div style={{ fontSize: 10, color: "#555570", lineHeight: 1.4, marginBottom: 8 }}>{label}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#c8f060" }}>{value}</div>
                    <div style={{ fontSize: 10, color: "#3a3a4a", marginTop: 4 }}>{hint}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#0d0d14", border: "1px solid #2a2a3a", borderLeft: "3px solid #c8f060", borderRadius: 4, padding: "16px 20px" }}>
              <div style={{ fontSize: 10, color: "#c8f060", letterSpacing: "0.15em", marginBottom: 8 }}>QUICK INSIGHT</div>
              <p style={{ fontSize: 13, color: "#9090a0", lineHeight: 1.6 }}>
                {results.margin < 0 ? `You are losing ₹${fmt(Math.abs(results.grossProfit))} on every order. Before running any ads, fix your pricing or cut costs.`
                  : results.margin < 25 ? `With only ${pct(results.margin)}% margin, every rupee of ad spend matters. Test before scaling. The ROAS you need is ${pct(results.roasNeeded)}x.`
                  : `You have room to scale. At ${pct(results.margin)}% margin, you can afford to test aggressively and still stay profitable.`}
              </p>
            </div>

            <div style={{ borderTop: "1px solid #1a1a25", paddingTop: 20, marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "#555570" }}>Built by Sarthak Tiwari</div>
                <div style={{ fontSize: 11, color: "#3a3a4a", marginTop: 2 }}>Kaart Studio · Grit School</div>
              </div>
              <div style={{ fontSize: 11, color: "#3a3a4a" }}>Want to build your brand properly? gritschool.co</div>
            </div>
          </div>
        )}

        {!results && (
          <div style={{ border: "1px dashed #1a1a25", borderRadius: 4, padding: "40px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>↑</div>
            <div style={{ fontSize: 13, color: "#3a3a4a" }}>Enter your selling price to see results</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MarginCalculatorPage() {
  return (
    <div>
      {/* Back nav */}
      <div style={{ background: "#060609", borderBottom: "1px solid #1a1a25", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
        <Link to="/toolkit" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555570", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          ← Toolkit
        </Link>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#333348", letterSpacing: "0.1em" }}>TOOL 01 / 03</span>
      </div>
      <MarginTool />
    </div>
  );
}
