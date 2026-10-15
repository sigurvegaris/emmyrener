import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const explore = [
  ['/', 'Home'],
  ['/about', 'About Me'],
  ['/guides', 'Guides'],
  ['/retreats', 'Retreats'],
  ['/recommendations', 'Recommendations'],
  ['/collabs', 'Collabs'],
  ['/contact', 'Contact'],
];

// Emmy's toile, washed light so the footer text stays easy to read.
// Set inline because CRA would try to bundle a url() written in the CSS file.
const background = {
  backgroundImage:
    'linear-gradient(rgba(250, 249, 246, 0.55), rgba(250, 249, 246, 0.55)), url(/videos/footer-toile.webp)',
};

function Footer() {
  return (
    <footer className="pf" style={background}>
      <div className="pf-main">
        <div className="pf-brand">
          <Link to="/" className="pf-logo">EMMY RENER</Link>
          <p className="pf-tag">Your Paris, made with love</p>
          <p className="pf-about">Digital Paris guides, recommendations and retreats by Emmy Rener.</p>
          <Link to="/retreats" className="pf-cta">Join Bon Vivant Summer</Link>
        </div>

        <div className="pf-col">
          <h4>Explore</h4>
          <ul>
            {explore.map(([to, label]) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="pf-col">
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="https://instagram.com/emmyrener" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li><a href="mailto:emmy@sophisticatedspreads.net">Email</a></li>
          </ul>
        </div>
      </div>

      <div className="pf-bottom">
        <p>© 2025 Emmy Rener. Made with ♡ in Paris.</p>
      </div>
    </footer>
  );
}

export default Footer;
