const G = {
  green:     '#0d9b6a',
  greenDeep: '#085a3e',
  greenDark: '#04261a',
  cream:     '#f4f1e7',
  ink:       '#0e1411',
};

export function MarkFoldedK({ size = 120, fg = G.ink, bg = 'transparent' }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ background: bg }}>
      <g fill="none" stroke={fg} strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M 30 15 L 30 105" />
        <path d="M 30 60 L 90 15" />
        <path d="M 30 60 L 90 105" />
      </g>
      <circle cx="30" cy="60" r="5" fill={fg} />
      <circle cx="90" cy="15" r="3" fill={fg} />
      <circle cx="90" cy="105" r="3" fill={fg} />
    </svg>
  );
}

export function MarkPinK({ size = 120, fg = G.green, ink = G.ink }) {
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

export function MarkTagK({ size = 120, fg = G.ink, accent = G.green }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <path d="M 18 18 H 88 L 106 38 V 102 H 18 Z" fill={fg} />
      <circle cx="97" cy="29" r="4" fill={G.cream} />
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

export function MarkCircleMono({ size = 120, fg = G.green, ink = G.cream }) {
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
      <circle cx="60" cy="12" r="3" fill={ink} />
    </svg>
  );
}

export function MarkCompassK({ size = 120, fg = G.ink, accent = G.green }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <rect x="8" y="8" width="104" height="104" fill={accent} />
      <g fill="none" stroke={fg} strokeWidth="9" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M 34 26 L 34 94" />
        <path d="M 34 60 L 86 26" />
        <path d="M 34 60 L 86 94" />
      </g>
      <rect x="94" y="94" width="10" height="10" fill={fg} />
    </svg>
  );
}

export function MarkDotK({ size = 120, fg = G.ink, dot = G.green }) {
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
