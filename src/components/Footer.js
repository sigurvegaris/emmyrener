import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const links = [
  ['/', 'Home'],
  ['/about', 'About Me'],
  ['/guides', 'Guides'],
  ['/retreats', 'Retreats'],
  ['/recommendations', 'Recommendations'],
  ['/contact', 'Contact'],
];

function Footer() {
  return (
    <footer className="pf" style={{ backgroundImage: "url(/videos/footer-toile.webp)" }}>
      {/* Emmy's toile pattern fills the footer; the details sit on a paper card in the middle */}
      <div className="pf-inner">
        <h3 className="pf-logo">EMMY RENER</h3>
        <p className="pf-tag">Your Paris, made with love</p>
        <Link to="/retreats" className="pf-cta">Join Bon Vivant Summer →</Link>

        <ul className="pf-links">
          {links.map(([to, label]) => (
            <li key={to}><Link to={to}>{label}</Link></li>
          ))}
          <li>
            <a href="https://instagram.com/emmyrener" target="_blank" rel="noopener noreferrer">Instagram</a>
          </li>
          <li><a href="mailto:emmy@sophisticatedspreads.net">Email</a></li>
        </ul>

        <p className="pf-small">Digital Paris Guides by Emmy Rener</p>
        <p className="pf-small">© 2025 Emmy Rener. Made with ♡ in Paris.</p>
        <p className="pf-small pf-italic">All recommendations are genuine and personally vetted</p>
        <button
          type="button"
          className="pf-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}

export default Footer;
