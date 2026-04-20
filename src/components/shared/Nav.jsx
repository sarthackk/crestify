import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Work',      to: '/work',      key: 'work' },
  { label: 'Services',  to: '/services',  key: 'services' },
  { label: 'Toolkit', to: '/toolkit', key: 'toolkit' },
  { label: 'About',     to: '/about',     key: 'about' },
];

export function Brand({ to = '/' }) {
  return (
    <Link to={to} className="brand" aria-label="Crestify home">
      <span className="brand-mark" />
      <span>Crestify</span>
    </Link>
  );
}

export default function Nav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = pathname === '/' ? 'home' : pathname.replace('/', '').split('/')[0];
  const close = () => setMenuOpen(false);

  return (
    <header className={`nav${menuOpen ? ' menu-is-open' : ''}`}>
      <div className="nav-inner">
        <Brand />

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>

        <nav className={`nav-links${menuOpen ? ' menu-open' : ''}`} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              onClick={close}
              className={`nav-link ${active === item.key ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/kaart" className="nav-link" onClick={close} style={{ color: '#0d9b6a' }}>
            Kaart Studio ↗
          </Link>
          <Link
            to="/contact"
            onClick={close}
            className={`nav-link nav-cta ${active === 'contact' ? 'active' : ''}`}
            style={{
              background: active === 'contact' ? 'var(--ink)' : 'var(--accent)',
              color: 'white',
            }}
          >
            Start a project →
          </Link>
        </nav>
      </div>
    </header>
  );
}
