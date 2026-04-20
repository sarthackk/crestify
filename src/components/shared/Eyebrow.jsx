export default function Eyebrow({ index, children, light }) {
  return (
    <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>
      {index ? <span style={{ marginRight: 10 }}>§{index}</span> : null}
      {children}
    </span>
  );
}
