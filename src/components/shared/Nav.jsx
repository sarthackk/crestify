import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2.5 13.5C2.5 10.7386 5.01472 9 8 9C10.9853 9 13.5 10.7386 13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

const NAV_ITEMS = [
  { label: 'Work',      to: '/work',      key: 'work' },
  { label: 'Services',  to: '/services',  key: 'services' },
  { label: 'Toolkit',   to: '/toolkit',   key: 'toolkit' },
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
              {item.key === 'toolkit' && active !== 'toolkit' && (
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 16, height: 16, borderRadius: '50%', background: 'var(--accent)', color: 'white', fontFamily: 'var(--mono)', fontSize: 8, fontWeight: 700, letterSpacing: 0, verticalAlign: 'middle', lineHeight: 1, flexShrink: 0 }}>8</span>
              )}
            </Link>
          ))}
          <Link to="/kaart" className="nav-link" onClick={close} style={{ color: '#0d9b6a' }}>
            Kaart Studio ↗
          </Link>
          <Link
            to="/sarthak"
            onClick={close}
            title="Sarthak Tiwari · Founder portfolio"
            className="nav-icon-btn"
            style={{
              border: `1.5px solid ${active === 'sarthak' ? 'var(--accent)' : 'var(--line-strong)'}`,
              background: active === 'sarthak' ? 'var(--accent)' : 'var(--bg-elev)',
              color: active === 'sarthak' ? 'white' : 'var(--accent)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { if (active !== 'sarthak') { e.currentTarget.style.background = 'var(--bg-elev)'; e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.color = 'var(--accent)'; }}}
          >
            <span className="nav-icon-svg"><PersonIcon /></span>
            <span className="nav-icon-label">Sarthak Tiwari</span>
            <span className="nav-icon-arrow">→</span>
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
