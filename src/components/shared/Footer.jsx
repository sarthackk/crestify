import { Link } from 'react-router-dom';

export default function Footer() {
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/work">Work</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@crestify.co">hello@crestify.co</a></li>
              <li><Link to="/contact">Start a project</Link></li>
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
