export default function Placeholder({ label = 'IMAGE', dim = '', dark = false, ratio = '4 / 3', style = {} }) {
  return (
    <div
      className={`placeholder ${dark ? 'dark' : ''}`}
      style={{ aspectRatio: ratio, width: '100%', ...style }}
    >
      <span className="ph-meta">{label}</span>
      <span className="ph-dim">{dim}</span>
    </div>
  );
}
