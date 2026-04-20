import { useState } from "react";
import { Link } from "react-router-dom";

const fmt = (n) => Math.round(n).toLocaleString("en-IN");

const stages = [
  { id: 1, label: "Stage 1", title: "New Brand", desc: "Just launching. Focus is on finding what works.", splits: { ads: 60, ugc: 30, retention: 10 }, color: "#60a5fa", bg: "#0a1628", border: "#1a3a5c" },
  { id: 2, label: "Stage 2", title: "Early Traction", desc: "Getting consistent sales. Time to double down on ads.", splits: { ads: 70, ugc: 20, retention: 10 }, color: "#c8f060", bg: "#0d1a08", border: "#2a4a15" },
  { id: 3, label: "Stage 3", title: "Scaling", desc: "Profitable and growing. Retention becomes critical.", splits: { ads: 60, ugc: 20, retention: 20 }, color: "#f59e0b", bg: "#1a1000", border: "#4a3000" },
];

const breakdowns = {
  ads: [{ label: "Testing (new creatives, audiences)", pct: 10 }, { label: "Scaling winning ads", pct: 70 }, { label: "Retargeting warm audiences", pct: 20 }],
  ugc: [{ label: "Nano influencer barter deals", pct: 50 }, { label: "UGC creator production", pct: 35 }, { label: "Content repurposing & editing", pct: 15 }],
  retention: [{ label: "Email flow setup & campaigns", pct: 50 }, { label: "WhatsApp / SMS marketing", pct: 30 }, { label: "Loyalty & repeat purchase offers", pct: 20 }],
};

const categories = [
  { key: "ads", label: "Performance Ads", sub: "Meta / Google", icon: "▲", desc: "Your primary growth engine. This is where you find customers at scale." },
  { key: "ugc", label: "UGC & Content", sub: "Influencers / Creators", icon: "◆", desc: "Fuel for your ads. Real content from real people outperforms everything." },
  { key: "retention", label: "Retention Marketing", sub: "Email / WhatsApp Funnels", icon: "●", desc: "Keeps customers coming back. Often ignored early but compounds over time." },
];

function BudgetTool() {
  const [budget, setBudget] = useState("");
  const [selectedStage, setSelectedStage] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const stage = stages.find((s) => s.id === selectedStage);
  const b = parseFloat(budget) || 0;
  const allocated = stage ? { ads: (b * stage.splits.ads) / 100, ugc: (b * stage.splits.ugc) / 100, retention: (b * stage.splits.retention) / 100 } : null;

  return (
    <div style={{ minHeight: "100vh", background: "#08080f", fontFamily: "'DM Mono', 'Courier New', monospace", color: "#e0e0d8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        input[type=number]{-moz-appearance:textfield;}
        .ba-stage{border:1px solid #1a1a28;border-radius:3px;padding:16px;cursor:pointer;transition:all 0.2s;background:#0d0d18;}
        .ba-stage:hover{border-color:#3a3a50;}
        .ba-cat{border:1px solid #1a1a28;border-radius:3px;overflow:hidden;transition:border-color 0.2s;}
        .ba-cat:hover{border-color:#2a2a3a;}
        .ba-cat-hdr{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;cursor:pointer;background:#0d0d18;}
        .ba-bdr{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #12121e;font-size:12px;}
        .ba-bdr:last-child{border-bottom:none;}
        .ba-budget{width:100%;background:#0d0d18;border:1px solid #2a2a3a;color:#e0e0d8;font-family:'DM Mono',monospace;font-size:20px;padding:14px 16px 14px 44px;outline:none;border-radius:3px;transition:border-color 0.2s;}
        .ba-budget:focus{border-color:#c8f060;}
        .ba-budget::placeholder{color:#2a2a3a;}
        .ba-bar{height:3px;background:#1a1a28;border-radius:2px;margin-top:10px;overflow:hidden;}
        .ba-bar-fill{height:100%;border-radius:2px;transition:width 0.8s cubic-bezier(0.16,1,0.3,1);}
      `}</style>

      <div style={{ borderBottom: "1px solid #12121e", padding: "32px 24px 24px", background: "#0a0a12" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 5, height: 24, background: "#c8f060", borderRadius: 1 }} />
            <span style={{ fontSize: 10, color: "#444458", letterSpacing: "0.15em" }}>KAART STUDIO / TOOL 02</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 5vw, 34px)", fontWeight: 800, color: "#e0e0d8", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Ad Budget<br /><span style={{ color: "#c8f060" }}>Allocator</span>
          </h1>
          <p style={{ marginTop: 10, color: "#444458", fontSize: 12, lineHeight: 1.6 }}>Know where every rupee goes before you spend it. Built by Sarthak Tiwari.</p>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 24px 48px" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, color: "#444458", letterSpacing: "0.15em", marginBottom: 12 }}>MONTHLY AD BUDGET</div>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#444458", fontSize: 16 }}>₹</span>
            <input className="ba-budget" type="number" placeholder="50000" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, color: "#444458", letterSpacing: "0.15em", marginBottom: 12 }}>WHERE IS YOUR BRAND RIGHT NOW?</div>
          <div style={{ display: "grid", gap: 8 }}>
            {stages.map((s) => (
              <div key={s.id} className="ba-stage" style={{ borderColor: selectedStage === s.id ? s.color : undefined, background: selectedStage === s.id ? s.bg : undefined }} onClick={() => setSelectedStage(s.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 10, color: selectedStage === s.id ? s.color : "#444458", letterSpacing: "0.1em", border: `1px solid ${selectedStage === s.id ? s.color : "#2a2a3a"}`, padding: "3px 8px", borderRadius: 2 }}>{s.label}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: selectedStage === s.id ? s.color : "#e0e0d8" }}>{s.title}</div>
                      <div style={{ fontSize: 11, color: "#444458", marginTop: 2 }}>{s.desc}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "#444458", textAlign: "right", flexShrink: 0 }}>
                    <div style={{ color: selectedStage === s.id ? s.color : "#444458" }}>{s.splits.ads}% ads</div>
                    <div>{s.splits.ugc}% ugc</div>
                    <div>{s.splits.retention}% retention</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {stage && b > 0 && (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ background: stage.bg, border: `1px solid ${stage.border}`, borderRadius: 3, padding: "20px", marginBottom: 4 }}>
              <div style={{ fontSize: 10, color: stage.color, letterSpacing: "0.15em", marginBottom: 16 }}>YOUR ALLOCATION — {stage.title.toUpperCase()}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {categories.map(({ key, label }) => (
                  <div key={key}>
                    <div style={{ fontSize: 10, color: "#444458", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px, 3vw, 22px)", fontWeight: 800, color: stage.color, lineHeight: 1 }}>₹{fmt(allocated[key])}</div>
                    <div style={{ fontSize: 10, color: "#444458", marginTop: 4 }}>{stage.splits[key]}% of budget</div>
                    <div className="ba-bar"><div className="ba-bar-fill" style={{ width: `${stage.splits[key]}%`, background: stage.color }} /></div>
                  </div>
                ))}
              </div>
            </div>

            {categories.map(({ key, label, sub, icon, desc }) => (
              <div key={key} className="ba-cat" style={{ borderColor: expanded === key ? "#2a2a3a" : undefined }}>
                <div className="ba-cat-hdr" onClick={() => setExpanded(expanded === key ? null : key)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 10, color: stage.color }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 13, color: "#e0e0d8", fontWeight: 500 }}>{label}</div>
                      <div style={{ fontSize: 11, color: "#444458" }}>{sub}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 15, color: stage.color, fontWeight: 500 }}>₹{fmt(allocated[key])}</div>
                      <div style={{ fontSize: 10, color: "#444458" }}>{stage.splits[key]}%</div>
                    </div>
                    <span style={{ color: "#444458", fontSize: 12 }}>{expanded === key ? "▲" : "▼"}</span>
                  </div>
                </div>
                {expanded === key && (
                  <div style={{ padding: "0 20px 16px", background: "#0a0a12" }}>
                    <p style={{ fontSize: 12, color: "#666678", lineHeight: 1.6, marginBottom: 14, paddingTop: 14, borderTop: "1px solid #12121e" }}>{desc}</p>
                    <div style={{ fontSize: 10, color: "#444458", letterSpacing: "0.1em", marginBottom: 10 }}>HOW TO SPLIT THIS</div>
                    {breakdowns[key].map(({ label: bl, pct }) => (
                      <div className="ba-bdr" key={bl}>
                        <span style={{ color: "#666678" }}>{bl}</span>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ color: stage.color, marginRight: 12 }}>₹{fmt(allocated[key] * pct / 100)}</span>
                          <span style={{ color: "#444458" }}>{pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div style={{ background: "#0d0d18", border: "1px solid #1a1a28", borderLeft: `3px solid ${stage.color}`, borderRadius: 3, padding: "16px 20px" }}>
              <div style={{ fontSize: 10, color: stage.color, letterSpacing: "0.15em", marginBottom: 8 }}>WHAT TO FOCUS ON AT THIS STAGE</div>
              <p style={{ fontSize: 12, color: "#666678", lineHeight: 1.7 }}>
                {stage.id === 1 && "You are finding your footing. Put most of your energy into testing what message works and getting real UGC from nano influencers. Do not scale until you have a proven creative."}
                {stage.id === 2 && "You have something working. Now double down on ads with the winning message. Keep UGC flowing to give your ad account fresh content. Retention is still small but start building email flows now."}
                {stage.id === 3 && "You are scaling. At this stage retention starts compounding — every repeat customer costs you nothing in acquisition. Keep ads and UGC consistent and invest more in keeping customers you already have."}
              </p>
            </div>

            <div style={{ borderTop: "1px solid #12121e", paddingTop: 20, marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "#444458" }}>Built by Sarthak Tiwari</div>
                <div style={{ fontSize: 11, color: "#2a2a3a", marginTop: 2 }}>Kaart Studio · Grit School</div>
              </div>
              <div style={{ fontSize: 11, color: "#2a2a3a" }}>gritschool.co</div>
            </div>
          </div>
        )}

        {(!stage || !b) && (
          <div style={{ border: "1px dashed #1a1a28", borderRadius: 3, padding: "40px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#2a2a3a" }}>{!b ? "Enter your budget above" : "Select your brand stage to see the allocation"}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BudgetAllocatorPage() {
  return (
    <div>
      <div style={{ background: "#060609", borderBottom: "1px solid #1a1a25", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
        <Link to="/toolkit" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555570", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>← Toolkit</Link>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#333348", letterSpacing: "0.1em" }}>TOOL 02 / 03</span>
      </div>
      <BudgetTool />
    </div>
  );
}
