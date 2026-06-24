import { Link } from 'react-router-dom';

const COLS = [
  {
    heading: 'Studio',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Work', to: '/work' },
      { label: 'Services', to: '/services' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Shopify Development', to: '/shopify-development' },
      { label: 'SaaS Development', to: '/saas-development' },
      { label: 'MVP Development', to: '/mvp-development' },
      { label: 'Kaart Studio ↗', to: '/kaart' },
      { label: 'Free Toolkit', to: '/toolkit' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'SaaS Directory', to: '/directory' },
      { label: 'About Crestify', to: '/blog/about-crestify-shopify-agency' },
      { label: 'Crestify Studio Reviews', to: '/blog/crestify-studio-reviews' },
      { label: 'Why Choose Crestify', to: '/blog/why-choose-crestify-shopify-agency' },
      { label: 'Sarthak Tiwari', to: '/sarthak' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'contact@crestify.co', href: 'mailto:contact@crestify.co' },
      { label: 'Start a project', to: '/contact' },
      { label: 'Press inquiries', href: 'mailto:press@crestify.co' },
      { label: '+91 7992028684', href: 'tel:+917992028684' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Top: brand blurb + nav columns */}
        <div className="footer-top" style={{ alignItems: 'start' }}>

          {/* Brand column */}
          <div style={{ gridColumn: '1 / 2' }}>
            <div className="serif" style={{ fontSize: 22, letterSpacing: '-0.02em', marginBottom: 14 }}>Crestify*</div>
            <p style={{ color: '#e6e4dc', fontSize: 14.5, lineHeight: 1.65, maxWidth: 240 }}>
              A founder-led execution studio building software and ecommerce systems with small, accountable teams.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
              <span className="tag" style={{ borderColor: '#ffffff22', color: '#9c9b95', fontSize: 10 }}>EST. 2023</span>
              <span className="tag" style={{ borderColor: '#ffffff22', color: '#9c9b95', fontSize: 10 }}>Remote · Global</span>
              <span className="tag" style={{ borderColor: '#ffffff22', color: '#9c9b95', fontSize: 10 }}>50+ shipped</span>
            </div>
          </div>

          {/* Nav columns */}
          {COLS.map(col => (
            <div key={col.heading}>
              <h4 style={{ marginBottom: 18 }}>{col.heading}</h4>
              <ul>
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.to
                      ? <Link to={link.to}>{link.label}</Link>
                      : <a href={link.href} target={link.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{link.label}</a>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark */}
        <div className="footer-wordmark serif italic">Crestify*</div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© 2023–2026 Crestify Studio</span>
          <span>Solution-first · Founder-led</span>
          <span>v3.1 — updated April 2026</span>
        </div>

      </div>
    </footer>
  );
}
