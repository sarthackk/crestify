// shared/Chrome.jsx — nav + footer used across pages

const NAV_ITEMS = [
  { label: 'Work',     href: 'work.html',     key: 'work' },
  { label: 'Services', href: 'services.html', key: 'services' },
  { label: 'About',    href: 'about.html',    key: 'about' },
  { label: 'Contact',  href: 'contact.html',  key: 'contact' },
];

function Brand({ href = 'index.html' }) {
  return (
    <a href={href} className="brand" aria-label="Crestify home">
      <span className="brand-mark" />
      <span>Crestify</span>
    </a>
  );
}

function Nav({ active }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Brand />
        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.filter(i => i.key !== 'contact').map(item => (
            <a
              key={item.key}
              href={item.href}
              className={`nav-link ${active === item.key ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <a href="kaart.html" className="nav-link" style={{ color: '#0d9b6a' }} title="Our Shopify-focused sub-studio">
            Kaart Studio ↗
          </a>
          <a
            href="contact.html"
            className={`nav-link nav-cta ${active === 'contact' ? 'active' : ''}`}
            style={{
              background: active === 'contact' ? 'var(--ink)' : 'var(--accent)',
              color: 'white',
            }}
          >
            Start a project →
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <h4>Studio</h4>
            <p style={{ color: '#e6e4dc', fontSize: 15, lineHeight: 1.6, maxWidth: 320 }}>
              A founder-led execution studio building software & e-commerce systems with small, accountable teams.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
              <span className="tag" style={{ borderColor: '#ffffff22', color: '#9c9b95' }}>EST. 2021</span>
              <span className="tag" style={{ borderColor: '#ffffff22', color: '#9c9b95' }}>Remote / Global</span>
            </div>
          </div>
          <div>
            <h4>Sitemap</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="work.html">Work</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@crestify.co">hello@crestify.co</a></li>
              <li><a href="contact.html">Start a project</a></li>
              <li><a href="#">Press / inquiries</a></li>
            </ul>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <ul>
              <li><a href="#">LinkedIn ↗</a></li>
              <li><a href="#">GitHub ↗</a></li>
              <li><a href="#">Read.cv ↗</a></li>
              <li><a href="#">Twitter ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-wordmark serif italic">Crestify*</div>

        <div className="footer-bottom">
          <span>© 2021–2026 Crestify Studio</span>
          <span>Solution-first · Founder-led</span>
          <span>v3.0 — redesigned April 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ====== Reusable bits ====== */

function Eyebrow({ index, children, light }) {
  return (
    <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>
      {index ? <span style={{ marginRight: 10 }}>§{index}</span> : null}
      {children}
    </span>
  );
}

function Placeholder({ label = 'IMAGE', dim = '', dark = false, ratio = '4 / 3', style = {} }) {
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

function CornerLabel({ children, style = {} }) {
  return <div className="corner-label" style={style}>{children}</div>;
}

/* Make available globally for other Babel scripts */
Object.assign(window, { Nav, Footer, Brand, Eyebrow, Placeholder, CornerLabel, NAV_ITEMS });

/* === Global scroll-reveal === */
(function setupReveal() {
  if (typeof window === 'undefined') return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Re-attach as React mounts new nodes
  const attach = () => {
    document.querySelectorAll('.reveal:not(.in), .reveal-fade:not(.in)').forEach(el => observer.observe(el));
  };
  // Run repeatedly because React mounts children async
  setTimeout(attach, 50);
  setTimeout(attach, 300);
  setTimeout(attach, 800);
  setTimeout(attach, 1600);

  // MutationObserver to catch later mounts (tabs, accordions etc)
  const mo = new MutationObserver(() => attach());
  if (document.body) mo.observe(document.body, { childList: true, subtree: true });
  else window.addEventListener('DOMContentLoaded', () => mo.observe(document.body, { childList: true, subtree: true }));
})();
