// KaartLogos.jsx — logo exploration for Kaart Studio

const G = {
  green:     '#0d9b6a',
  greenDeep: '#085a3e',
  greenDark: '#04261a',
  cream:     '#f4f1e7',
  ink:       '#0e1411',
};

/* =========================================================
   LOGO MARKS — each is a self-contained SVG component
   sized via props (size for square, width/height for lockup)
   ========================================================= */

/* 01 — Folded map "K" */
function MarkFoldedK({ size = 120, fg = G.ink, bg = 'transparent' }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ background: bg }}>
      <g fill="none" stroke={fg} strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M 30 15 L 30 105" />
        <path d="M 30 60 L 90 15" />
        <path d="M 30 60 L 90 105" />
      </g>
      {/* map-fold dots */}
      <circle cx="30" cy="60" r="5" fill={fg} />
      <circle cx="90" cy="15" r="3" fill={fg} />
      <circle cx="90" cy="105" r="3" fill={fg} />
    </svg>
  );
}

/* 02 — Pin K (location marker) */
function MarkPinK({ size = 120, fg = G.green, ink = G.ink }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <path
        d="M60 12 C 36 12, 22 30, 22 50 C 22 78, 60 108, 60 108 C 60 108, 98 78, 98 50 C 98 30, 84 12, 60 12 Z"
        fill={fg}
      />
      <g fill="none" stroke={ink} strokeWidth="7" strokeLinecap="square">
        <path d="M 46 30 L 46 68" />
        <path d="M 46 50 L 70 32" />
        <path d="M 46 50 L 70 68" />
      </g>
    </svg>
  );
}

/* 03 — Card/tag shape with serif k */
function MarkTagK({ size = 120, fg = G.ink, accent = G.green }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <path
        d="M 18 18 H 88 L 106 38 V 102 H 18 Z"
        fill={fg}
      />
      {/* punch hole */}
      <circle cx="97" cy="29" r="4" fill={G.cream} />
      {/* serif k */}
      <text
        x="60" y="85"
        textAnchor="middle"
        fontFamily="'Instrument Serif', Georgia, serif"
        fontStyle="italic"
        fontSize="72"
        fill={accent}
      >k</text>
    </svg>
  );
}

/* 04 — Monogram in circle */
function MarkCircleMono({ size = 120, fg = G.green, ink = G.cream }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <circle cx="60" cy="60" r="56" fill={fg} />
      <text
        x="60" y="82"
        textAnchor="middle"
        fontFamily="'Instrument Serif', Georgia, serif"
        fontStyle="italic"
        fontSize="76"
        fill={ink}
      >k</text>
      {/* tiny cartographic tick */}
      <circle cx="60" cy="12" r="3" fill={ink} />
    </svg>
  );
}

/* 05 — Geometric cartographer K (triangular compass) */
function MarkCompassK({ size = 120, fg = G.ink, accent = G.green }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <rect x="8" y="8" width="104" height="104" fill={accent} />
      <g fill="none" stroke={fg} strokeWidth="9" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M 34 26 L 34 94" />
        <path d="M 34 60 L 86 26" />
        <path d="M 34 60 L 86 94" />
      </g>
      {/* corner tick */}
      <rect x="94" y="94" width="10" height="10" fill={fg} />
    </svg>
  );
}

/* 06 — Stacked dot + K (pin abstraction) */
function MarkDotK({ size = 120, fg = G.ink, dot = G.green }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <circle cx="60" cy="22" r="10" fill={dot} />
      <g fill="none" stroke={fg} strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M 30 46 L 30 108" />
        <path d="M 30 78 L 90 46" />
        <path d="M 30 78 L 90 108" />
      </g>
    </svg>
  );
}

/* =========================================================
   Lockups
   ========================================================= */
function Lockup({ Mark, markSize = 56, name = 'Kaart', bg = G.cream, fg = G.ink, markProps = {}, italic = true }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '28px 36px',
      background: bg,
      color: fg,
      width: '100%', height: '100%',
      boxSizing: 'border-box',
      justifyContent: 'center',
    }}>
      <Mark size={markSize} {...markProps} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontStyle: italic ? 'italic' : 'normal',
          fontSize: markSize * 0.82,
          letterSpacing: '-0.02em',
        }}>{name}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10, letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginTop: 6,
          color: fg === G.cream ? '#a4afa9' : '#5a6760',
        }}>Shopify studio · ×Crestify</span>
      </div>
    </div>
  );
}

function BusinessCard({ Mark, markProps = {}, light = true }) {
  const bg = light ? G.cream : G.ink;
  const fg = light ? G.ink : G.cream;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: bg, color: fg,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 28, boxSizing: 'border-box',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Mark size={44} {...markProps} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: light ? '#5a6760' : '#a4afa9' }}>Est. 2024</span>
      </div>
      <div>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 32, letterSpacing: '-0.02em' }}>Priya Shah</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6, color: light ? '#5a6760' : '#a4afa9' }}>Co-founder · Kaart Studio</div>
        <div style={{ fontSize: 11, marginTop: 14, color: light ? '#1f2925' : '#cfd5d2' }}>
          priya@kaart.studio &nbsp;·&nbsp; kaart.studio
        </div>
      </div>
    </div>
  );
}

function Favicon({ Mark, markProps = {}, bg = G.green }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 14, left: 18,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
        color: bg === G.green ? '#04261a' : '#a4afa9',
      }}>favicon · 64px</div>
      <Mark size={80} {...markProps} />
    </div>
  );
}

/* =========================================================
   CANVAS
   ========================================================= */

const AB_W = 320, AB_H = 260;

function Page() {
  return (
    <DesignCanvas>
      {/* Header */}
      <div style={{ padding: '0 60px 40px', maxWidth: 1100 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5a6760' }}>Exploration · Kaart Studio logo · v1</div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 72, letterSpacing: '-0.02em', fontWeight: 400, marginTop: 8, color: G.ink }}>
          Six directions. <em style={{ color: G.green }}>One "k".</em>
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#1f2925', maxWidth: 640, marginTop: 12, lineHeight: 1.5 }}>
          The name <em>Kaart</em> is Dutch/Afrikaans for "map" or "card" — both useful metaphors for a studio that routes brands through Shopify. Each mark below leans on one of those cues: the geometric <b>K</b> as compass, the <b>pin</b> as location, or the <b>card/tag</b> as commerce.
        </p>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#5a6760', marginTop: 16, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          ↳ Scroll / pinch-zoom the canvas. Post-its are notes, not final copy.
        </div>
      </div>

      {/* SECTION 1 — The six marks */}
      <DCSection title="01 · Primary marks" subtitle="Pure glyphs — sized for favicon, avatar, and app-icon use.">
        <DCArtboard label="01 / Folded Map K" width={AB_W} height={AB_H}>
          <div style={{ width: '100%', height: '100%', background: G.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MarkFoldedK size={140} fg={G.ink} />
          </div>
        </DCArtboard>
        <DCArtboard label="02 / Pin K" width={AB_W} height={AB_H}>
          <div style={{ width: '100%', height: '100%', background: G.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MarkPinK size={150} />
          </div>
        </DCArtboard>
        <DCArtboard label="03 / Tag K (serif)" width={AB_W} height={AB_H}>
          <div style={{ width: '100%', height: '100%', background: G.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MarkTagK size={150} />
          </div>
        </DCArtboard>
        <DCArtboard label="04 / Circle Monogram" width={AB_W} height={AB_H}>
          <div style={{ width: '100%', height: '100%', background: G.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MarkCircleMono size={150} />
          </div>
        </DCArtboard>
        <DCArtboard label="05 / Compass Block" width={AB_W} height={AB_H}>
          <div style={{ width: '100%', height: '100%', background: G.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MarkCompassK size={150} />
          </div>
        </DCArtboard>
        <DCArtboard label="06 / Dot-above K" width={AB_W} height={AB_H}>
          <div style={{ width: '100%', height: '100%', background: G.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MarkDotK size={150} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* SECTION 2 — Horizontal lockups */}
      <DCSection title="02 · Horizontal lockups" subtitle="Mark + wordmark. Instrument Serif italic, JetBrains Mono tagline.">
        <DCArtboard label="Folded K · cream" width={460} height={150}>
          <Lockup Mark={MarkFoldedK} markProps={{ fg: G.ink }} />
        </DCArtboard>
        <DCArtboard label="Pin K · cream" width={460} height={150}>
          <Lockup Mark={MarkPinK} markProps={{ fg: G.green, ink: G.ink }} />
        </DCArtboard>
        <DCArtboard label="Tag K · cream" width={460} height={150}>
          <Lockup Mark={MarkTagK} markProps={{ fg: G.ink, accent: G.green }} />
        </DCArtboard>
        <DCArtboard label="Circle · cream" width={460} height={150}>
          <Lockup Mark={MarkCircleMono} markProps={{ fg: G.green, ink: G.cream }} />
        </DCArtboard>
        <DCArtboard label="Compass · cream" width={460} height={150}>
          <Lockup Mark={MarkCompassK} markProps={{ fg: G.ink, accent: G.green }} />
        </DCArtboard>
        <DCArtboard label="Dot-K · cream" width={460} height={150}>
          <Lockup Mark={MarkDotK} markProps={{ fg: G.ink, dot: G.green }} />
        </DCArtboard>
      </DCSection>

      {/* SECTION 3 — Dark variants */}
      <DCSection title="03 · Dark lockups" subtitle="Same marks, inverted for the site's dark bands and nav states.">
        <DCArtboard label="Folded · ink" width={460} height={150}>
          <Lockup Mark={MarkFoldedK} markProps={{ fg: G.green }} bg={G.ink} fg={G.cream} />
        </DCArtboard>
        <DCArtboard label="Pin · ink" width={460} height={150}>
          <Lockup Mark={MarkPinK} markProps={{ fg: G.green, ink: G.cream }} bg={G.ink} fg={G.cream} />
        </DCArtboard>
        <DCArtboard label="Tag · ink" width={460} height={150}>
          <Lockup Mark={MarkTagK} markProps={{ fg: G.cream, accent: G.green }} bg={G.ink} fg={G.cream} />
        </DCArtboard>
        <DCArtboard label="Circle · green" width={460} height={150}>
          <Lockup Mark={MarkCircleMono} markProps={{ fg: G.green, ink: G.greenDark }} bg={G.greenDark} fg={G.cream} />
        </DCArtboard>
      </DCSection>

      {/* SECTION 4 — Favicons / app icons */}
      <DCSection title="04 · Favicon & app icons" subtitle="64px rendering at full contrast. Recommended daily driver.">
        <DCArtboard label="Favicon · green bg" width={200} height={200}>
          <Favicon Mark={MarkFoldedK} markProps={{ fg: G.greenDark }} />
        </DCArtboard>
        <DCArtboard label="Favicon · cream bg" width={200} height={200}>
          <Favicon Mark={MarkFoldedK} markProps={{ fg: G.ink }} bg={G.cream} />
        </DCArtboard>
        <DCArtboard label="Favicon · ink bg" width={200} height={200}>
          <Favicon Mark={MarkFoldedK} markProps={{ fg: G.green }} bg={G.ink} />
        </DCArtboard>
        <DCArtboard label="Avatar · circle" width={200} height={200}>
          <div style={{ width: '100%', height: '100%', background: G.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MarkCircleMono size={120} />
          </div>
        </DCArtboard>
        <DCArtboard label="Avatar · compass" width={200} height={200}>
          <div style={{ width: '100%', height: '100%', background: G.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MarkCompassK size={120} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* SECTION 5 — In use */}
      <DCSection title="05 · In the wild" subtitle="Business card + site header test to check the mark at real scale.">
        <DCArtboard label="Business card · light (3.5×2 in)" width={420} height={240}>
          <BusinessCard Mark={MarkFoldedK} markProps={{ fg: G.ink }} light />
        </DCArtboard>
        <DCArtboard label="Business card · dark" width={420} height={240}>
          <BusinessCard Mark={MarkFoldedK} markProps={{ fg: G.green }} light={false} />
        </DCArtboard>
        <DCArtboard label="Site nav state" width={720} height={130}>
          <div style={{
            width: '100%', height: '100%',
            background: G.cream,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 32px', boxSizing: 'border-box',
            borderBottom: '1px solid #0e141122',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <MarkFoldedK size={32} fg={G.ink} />
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 24, color: G.ink, whiteSpace: 'nowrap' }}>
                Kaart Studio<sup style={{ fontFamily: "'JetBrains Mono', monospace", fontStyle: 'normal', fontSize: 9, color: G.green, marginLeft: 6, letterSpacing: '0.1em' }}>×CRESTIFY</sup>
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
              <span style={{ padding: '8px 12px', color: '#1f2925' }}>Services</span>
              <span style={{ padding: '8px 12px', color: '#1f2925' }}>Work</span>
              <span style={{ padding: '8px 12px', background: G.green, color: 'white', borderRadius: 999 }}>Brief us →</span>
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      {/* Notes */}
      <DCPostIt top={560} right={80} rotate={-3} width={210}>
        Recommending <b>01 / Folded Map K</b> as the primary.<br/><br/>
        Works as pure line-art at 16px · reads as a "k", a compass, and a map-fold. The dot at the fork doubles as a map pin.
      </DCPostIt>
      <DCPostIt top={620} right={80} rotate={2} width={200}>
        Keep the <b>Pin K</b> (02) as the social-avatar variant — it's louder and fills a circle beautifully.
      </DCPostIt>
      <DCPostIt bottom={200} left={80} rotate={-1.5} width={200}>
        Wordmark = Instrument Serif italic lowercase.<br/><br/>
        Never capitalize the logo. "kaart" is always lowercase.
      </DCPostIt>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Page />);
