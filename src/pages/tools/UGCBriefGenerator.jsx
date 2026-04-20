import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { id: "skincare", label: "Skincare / Beauty", icon: "✦", focus: "Trust & results. Show before/after, texture, application. People need to believe it works before they try it." },
  { id: "apparel", label: "Apparel / Gym Wear", icon: "◈", focus: "Fit & feel. Show it on the body, movement, quality. People buy how it looks on a real person." },
  { id: "food", label: "Food / Edibles", icon: "◉", focus: "When to eat, taste reaction, effects after. Show the experience, not just the product." },
  { id: "interior", label: "Interior / Home Decor", icon: "▣", focus: "How it looks in a real space. Show it styled, in context. People want to visualize it in their home." },
  { id: "wellness", label: "Wellness / Supplements", icon: "◆", focus: "Trust & routine. Show how it fits into daily life, any noticeable effects, why you use it." },
  { id: "tech", label: "Tech / Gadgets", icon: "▲", focus: "Features in action. Show it being used, not just held. Demonstrate the problem it solves." },
  { id: "gifting", label: "Gifting / Lifestyle", icon: "●", focus: "Emotion & occasion. Show the unboxing, the reaction, the occasion it fits." },
  { id: "other", label: "Other", icon: "◇", focus: "Show the product clearly, use it on camera, and communicate what makes it worth buying." },
];

const aida = {
  skincare: { attention: "Open with a real skin concern or question — something your audience actually thinks about. No generic intros.", interest: "Introduce the product naturally. Talk about what it is, what it claims to do, first impressions of texture, smell, packaging.", desire: "Show yourself applying it. Talk about how it feels. If you have used it for a few days, share what you noticed. Be honest.", action: "End with a simple, natural CTA. Tell them where to get it, mention the discount code if any, keep it short." },
  apparel: { attention: "Start with a fit check or a style problem you were trying to solve. Make it relatable.", interest: "Show the product — talk about the quality, the fabric, how it fits. Do a quick try-on or movement shot.", desire: "Wear it naturally. Show it in a real context — gym, street, casual. Let the product speak through how you look.", action: "Tell them where to shop it. Mention any offer or code. Keep it conversational." },
  food: { attention: "Start with the moment — when you eat it, why you reached for it. Make it feel real and relatable.", interest: "Show the product, open it, talk about what it is. First impressions — smell, look, packaging.", desire: "Eat it on camera. Show your genuine reaction. Talk about how it tastes, any effects you noticed, when you would have it again.", action: "Tell them where to get it. If there is an offer, mention it naturally." },
  interior: { attention: "Start with the space or the problem — empty corner, dull room, something that needed a change.", interest: "Introduce the product. Show it out of the box, talk about the quality, materials, first impressions.", desire: "Show it styled in your actual space. Walk around it. Show different angles. Let people see how it fits into a real home.", action: "Tell them where to shop. Mention any offer. Keep it warm and natural." },
  wellness: { attention: "Start with the habit or the gap — what you were looking for, why you tried this.", interest: "Introduce the product. What it is, what it claims, how you take it, packaging first impressions.", desire: "Talk about your experience. How long you have been using it, what you have noticed, how it fits your routine. Be honest.", action: "Tell them where to get it and any discount. End on a genuine note." },
  tech: { attention: "Start with the problem the product solves. Make it something your audience actually faces.", interest: "Introduce the product. First impressions — design, build quality, what it does.", desire: "Show it being used. Demonstrate the feature that matters most. Real use, not a demo.", action: "Tell them where to get it. Mention any offer. Keep it direct." },
  gifting: { attention: "Start with the occasion or the feeling — what you were looking for, who it was for.", interest: "Show the unboxing. Talk about the packaging, the presentation, first impressions.", desire: "Show the product styled or gifted. Capture the reaction if possible. Talk about why it makes a great gift.", action: "Tell them where to shop it. Mention any offer. End warm." },
  other: { attention: "Open with something that immediately grabs attention — a question, a bold statement, or a relatable moment.", interest: "Introduce the product naturally. First impressions, what it is, what it does.", desire: "Show it being used. Talk about the experience. What makes it worth buying.", action: "Clear CTA at the end. Where to get it, any offer, keep it short." },
};

function UGCTool() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ brandName: "", productName: "", category: "", keyBenefit: "", targetCustomer: "", adAngle: "", discountCode: "", platform: "", notes: "" });
  const [brief, setBrief] = useState(null);
  const [copied, setCopied] = useState(false);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const selectedCat = categories.find((c) => c.id === form.category);

  const generate = () => {
    const cat = categories.find((c) => c.id === form.category);
    const a = aida[form.category];
    setBrief({ title: `UGC Brief — ${form.brandName} x Creator`, product: form.productName, brand: form.brandName, category: cat?.label, platform: form.platform || "Instagram Reels", duration: "35 to 45 seconds", format: "Vertical video, natural lighting, shot on phone is fine", tone: "Natural, conversational, in your own style. Not scripted. Not salesy.", categoryFocus: cat?.focus, angle: form.adAngle, targetCustomer: form.targetCustomer, keyBenefit: form.keyBenefit, discountCode: form.discountCode, notes: form.notes, aida: a });
    setStep(3);
  };

  const copyBrief = () => {
    if (!brief) return;
    const text = `UGC BRIEF — ${brief.brand} x Creator\n${"─".repeat(40)}\n\nPRODUCT: ${brief.product}\nCATEGORY: ${brief.category}\nPLATFORM: ${brief.platform}\nVIDEO LENGTH: ${brief.duration}\nFORMAT: ${brief.format}\n\nTONE & STYLE\n${brief.tone}\n\nWHAT THIS VIDEO NEEDS TO DO\n${brief.categoryFocus}\n\nKEY MESSAGE / AD ANGLE\n${brief.angle}\n\nWHO IS WATCHING THIS\n${brief.targetCustomer}\n\nTHE ONE THING TO COMMUNICATE\n${brief.keyBenefit}\n\nVIDEO STRUCTURE — AIDA FORMAT\n\n[ATTENTION — First 5 to 8 seconds]\n${brief.aida.attention}\n\n[INTEREST — Seconds 8 to 20]\n${brief.aida.interest}\n\n[DESIRE — Seconds 20 to 35]\n${brief.aida.desire}\n\n[ACTION — Last 5 to 10 seconds]\n${brief.aida.action}${brief.discountCode ? `\nMention discount code: ${brief.discountCode}` : ""}\n\n${brief.notes ? `ADDITIONAL NOTES\n${brief.notes}\n\n` : ""}DELIVERABLES\n→ 1 final video, 35 to 45 seconds, vertical format\n→ Ad rights — we will run this as a paid ad\n→ Website usage rights — we may feature this on our product page\n→ Up to 2 rounds of revisions before final approval\n→ Payment is released after final approval\n\nBuilt with the UGC Brief Generator by Kaart Studio · gritschool.co`.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#09090e", fontFamily: "'DM Mono', 'Courier New', monospace", color: "#ddddd5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        .ugc-input{width:100%;background:#0e0e18;border:1px solid #22223a;color:#ddddd5;font-family:'DM Mono',monospace;font-size:14px;padding:11px 14px;outline:none;border-radius:2px;transition:border-color 0.2s;}
        .ugc-input:focus{border-color:#e879f9;}
        .ugc-input::placeholder{color:#333348;}
        .ugc-cat{border:1px solid #22223a;border-radius:2px;padding:12px 14px;cursor:pointer;background:#0e0e18;transition:all 0.15s;text-align:left;width:100%;}
        .ugc-cat:hover{border-color:#3a3a5a;}
        .ugc-cat.active{border-color:#e879f9;background:#1a0a1e;}
        .ugc-btn{background:#e879f9;color:#09090e;border:none;padding:14px 28px;font-family:'DM Mono',monospace;font-size:13px;font-weight:500;cursor:pointer;border-radius:2px;letter-spacing:0.05em;transition:opacity 0.2s;}
        .ugc-btn:hover{opacity:0.85;}
        .ugc-btn:disabled{opacity:0.3;cursor:not-allowed;}
        .ugc-ghost{background:transparent;color:#888898;border:1px solid #22223a;padding:12px 24px;font-family:'DM Mono',monospace;font-size:12px;cursor:pointer;border-radius:2px;transition:all 0.2s;}
        .ugc-ghost:hover{border-color:#3a3a5a;color:#ddddd5;}
        .ugc-aida{border-left:2px solid #e879f9;padding:14px 18px;background:#0e0e18;border-radius:0 2px 2px 0;margin-bottom:10px;}
        .ugc-section{border:1px solid #22223a;border-radius:2px;padding:18px 20px;margin-bottom:10px;background:#0e0e18;}
        .ugc-dot{width:8px;height:8px;border-radius:50%;transition:background 0.2s;}
      `}</style>

      <div style={{ borderBottom: "1px solid #14141e", padding: "28px 24px 20px", background: "#0b0b12" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 5, height: 22, background: "#e879f9", borderRadius: 1 }} />
            <span style={{ fontSize: 10, color: "#444458", letterSpacing: "0.15em" }}>KAART STUDIO / TOOL 03</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 800, color: "#ddddd5", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            UGC Brief<br /><span style={{ color: "#e879f9" }}>Generator</span>
          </h1>
          <p style={{ marginTop: 8, color: "#444458", fontSize: 12, lineHeight: 1.6 }}>Generate a ready-to-send creator brief in 2 minutes.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="ugc-dot" style={{ background: step >= s ? "#e879f9" : "#22223a" }} />
                <span style={{ fontSize: 10, color: step >= s ? "#e879f9" : "#333348" }}>{s === 1 ? "Category" : s === 2 ? "Details" : "Brief"}</span>
                {s < 3 && <span style={{ color: "#22223a", fontSize: 10 }}>—</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "24px 24px 48px" }}>

        {step === 1 && (
          <div>
            <div style={{ fontSize: 10, color: "#444458", letterSpacing: "0.15em", marginBottom: 16 }}>WHAT KIND OF PRODUCT IS THIS?</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
              {categories.map((cat) => (
                <button key={cat.id} className={`ugc-cat ${form.category === cat.id ? "active" : ""}`} onClick={() => set("category", cat.id)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ color: form.category === cat.id ? "#e879f9" : "#444458", fontSize: 12 }}>{cat.icon}</span>
                    <span style={{ fontSize: 12, color: form.category === cat.id ? "#e879f9" : "#ddddd5" }}>{cat.label}</span>
                  </div>
                </button>
              ))}
            </div>
            {selectedCat && (
              <div style={{ background: "#1a0a1e", border: "1px solid #3a1a4a", borderRadius: 2, padding: "14px 16px", marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: "#e879f9", letterSpacing: "0.1em", marginBottom: 6 }}>WHAT TO FOCUS ON</div>
                <p style={{ fontSize: 12, color: "#888898", lineHeight: 1.6 }}>{selectedCat.focus}</p>
              </div>
            )}
            <button className="ugc-btn" disabled={!form.category} onClick={() => setStep(2)}>NEXT: PRODUCT DETAILS</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontSize: 10, color: "#444458", letterSpacing: "0.15em", marginBottom: 16 }}>TELL ME ABOUT THE PRODUCT</div>
            <div style={{ display: "grid", gap: 14, marginBottom: 20 }}>
              {[
                { key: "brandName", label: "Brand Name", placeholder: "eg. Kaart Studio" },
                { key: "productName", label: "Product Name", placeholder: "eg. Vitamin C Serum" },
                { key: "targetCustomer", label: "Who Is This For?", placeholder: "eg. women 22-35 who care about skincare" },
                { key: "keyBenefit", label: "One Key Benefit to Communicate", placeholder: "eg. reduces dark spots in 2 weeks" },
                { key: "adAngle", label: "Ad Angle / Message (from testing)", placeholder: "eg. gifting angle, problem-solution, daily routine" },
                { key: "discountCode", label: "Discount Code (optional)", placeholder: "eg. CREATOR10" },
                { key: "platform", label: "Platform", placeholder: "eg. Instagram Reels, YouTube Shorts" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label style={{ fontSize: 11, color: "#666678", display: "block", marginBottom: 6 }}>{label}</label>
                  <input className="ugc-input" placeholder={placeholder} value={form[key]} onChange={(e) => set(key, e.target.value)} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, color: "#666678", display: "block", marginBottom: 6 }}>Additional Notes (optional)</label>
                <textarea className="ugc-input" placeholder="Anything specific — what not to say, brand colors, competitor mentions to avoid..." value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} style={{ resize: "vertical" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="ugc-ghost" onClick={() => setStep(1)}>BACK</button>
              <button className="ugc-btn" disabled={!form.brandName || !form.productName || !form.keyBenefit} onClick={generate}>GENERATE BRIEF</button>
            </div>
          </div>
        )}

        {step === 3 && brief && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: "#444458", letterSpacing: "0.15em" }}>YOUR BRIEF IS READY</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="ugc-ghost" onClick={() => { setStep(1); setBrief(null); setForm({ brandName: "", productName: "", category: "", keyBenefit: "", targetCustomer: "", adAngle: "", discountCode: "", platform: "", notes: "" }); }}>NEW BRIEF</button>
                <button className="ugc-btn" onClick={copyBrief}>{copied ? "COPIED!" : "COPY BRIEF"}</button>
              </div>
            </div>

            <div style={{ background: "#1a0a1e", border: "1px solid #3a1a4a", borderRadius: 2, padding: "18px 20px", marginBottom: 10 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#e879f9", marginBottom: 4 }}>UGC Brief — {brief.brand} x Creator</div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[{ label: "Product", val: brief.product }, { label: "Category", val: brief.category }, { label: "Platform", val: brief.platform }, { label: "Length", val: brief.duration }].map(({ label, val }) => (
                  <div key={label}><span style={{ fontSize: 10, color: "#444458" }}>{label}: </span><span style={{ fontSize: 11, color: "#ddddd5" }}>{val}</span></div>
                ))}
              </div>
            </div>

            <div className="ugc-section">
              <div style={{ fontSize: 10, color: "#e879f9", letterSpacing: "0.1em", marginBottom: 8 }}>TONE & STYLE</div>
              <p style={{ fontSize: 12, color: "#888898", lineHeight: 1.6 }}>{brief.tone}</p>
            </div>

            <div className="ugc-section">
              <div style={{ fontSize: 10, color: "#e879f9", letterSpacing: "0.1em", marginBottom: 8 }}>WHAT THIS VIDEO NEEDS TO DO</div>
              <p style={{ fontSize: 12, color: "#888898", lineHeight: 1.6 }}>{brief.categoryFocus}</p>
            </div>

            <div className="ugc-section">
              <div style={{ fontSize: 10, color: "#e879f9", letterSpacing: "0.1em", marginBottom: 12 }}>KEY INFORMATION</div>
              {[{ label: "Ad Angle", val: brief.angle || "Not specified" }, { label: "Target Customer", val: brief.targetCustomer || "Not specified" }, { label: "Key Benefit to Communicate", val: brief.keyBenefit }, ...(brief.discountCode ? [{ label: "Discount Code", val: brief.discountCode }] : [])].map(({ label, val }) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, color: "#666678", marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 13, color: "#ddddd5" }}>{val}</div>
                </div>
              ))}
            </div>

            <div className="ugc-section">
              <div style={{ fontSize: 10, color: "#e879f9", letterSpacing: "0.1em", marginBottom: 14 }}>VIDEO STRUCTURE — AIDA FORMAT</div>
              {[{ label: "ATTENTION", time: "First 5 to 8 seconds", content: brief.aida.attention }, { label: "INTEREST", time: "Seconds 8 to 20", content: brief.aida.interest }, { label: "DESIRE", time: "Seconds 20 to 35", content: brief.aida.desire }, { label: "ACTION", time: "Last 5 to 10 seconds", content: brief.aida.action }].map(({ label, time, content }) => (
                <div className="ugc-aida" key={label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 10, color: "#e879f9", letterSpacing: "0.1em" }}>{label}</span>
                    <span style={{ fontSize: 10, color: "#444458" }}>{time}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#888898", lineHeight: 1.6 }}>{content}</p>
                  {label === "ACTION" && brief.discountCode && <p style={{ fontSize: 12, color: "#e879f9", marginTop: 6 }}>Mention discount code: {brief.discountCode}</p>}
                </div>
              ))}
            </div>

            <div className="ugc-section">
              <div style={{ fontSize: 10, color: "#e879f9", letterSpacing: "0.1em", marginBottom: 12 }}>DELIVERABLES</div>
              {["1 final video, 35 to 45 seconds, vertical format", "Ad rights — we will run this as a paid ad", "Website usage rights — we may feature this on our product page", "Up to 2 rounds of revisions before final approval", "Payment released after final approval"].map((d) => (
                <div key={d} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "#e879f9", fontSize: 10, marginTop: 2 }}>→</span>
                  <span style={{ fontSize: 12, color: "#888898" }}>{d}</span>
                </div>
              ))}
            </div>

            {brief.notes && (
              <div className="ugc-section">
                <div style={{ fontSize: 10, color: "#e879f9", letterSpacing: "0.1em", marginBottom: 8 }}>ADDITIONAL NOTES</div>
                <p style={{ fontSize: 12, color: "#888898", lineHeight: 1.6 }}>{brief.notes}</p>
              </div>
            )}

            <button className="ugc-btn" style={{ width: "100%", marginTop: 4 }} onClick={copyBrief}>{copied ? "COPIED!" : "COPY FULL BRIEF"}</button>

            <div style={{ borderTop: "1px solid #14141e", paddingTop: 16, marginTop: 20, display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: 11, color: "#333348" }}>Built by Sarthak Tiwari · Kaart Studio</div>
              <div style={{ fontSize: 11, color: "#333348" }}>gritschool.co</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UGCBriefGeneratorPage() {
  return (
    <div>
      <div style={{ background: "#060609", borderBottom: "1px solid #1a1a25", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
        <Link to="/toolkit" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555570", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>← Toolkit</Link>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#333348", letterSpacing: "0.1em" }}>TOOL 03 / 03</span>
      </div>
      <UGCTool />
    </div>
  );
}
