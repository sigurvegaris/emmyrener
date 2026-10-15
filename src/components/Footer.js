import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const COLUMNS = [
  { title: 'Explore', links: [['/', 'Home'], ['/about', 'About Me'], ['/contact', 'Contact']] },
  { title: 'Paris', links: [['/guides', 'Guides'], ['/recommendations', 'Recommendations']] },
  { title: 'Retreats', links: [['/retreats', 'Bon Vivant Summer'], ['/retreats', 'Join the Interest List']] },
  { title: 'Connect', links: [['/collabs', 'Collabs'], ['mailto:emmy@sophisticatedspreads.net', 'Email Emmy']] },
];

// Emmy's toile, washed light so the name stays easy to read.
// Set inline because CRA would try to bundle a url() written in the CSS file.
const toile = {
  backgroundImage:
    'linear-gradient(rgba(250, 249, 246, 0.6), rgba(250, 249, 246, 0.6)), url(/videos/footer-toile.webp)',
};

function FooterLink({ to, children }) {
  if (to.startsWith('mailto:')) return <a href={to}>{children}</a>;
  return <Link to={to}>{children}</Link>;
}

function Footer() {
  return (
    <footer className="pf">
      <div className="pf-top" style={toile}>
        <div className="pf-icons">
          <a href="https://instagram.com/emmyrener" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="1" className="pf-dot" />
            </svg>
          </a>
          <a href="mailto:emmy@sophisticatedspreads.net" aria-label="Email">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
              <path d="M3.5 6.5 12 13l8.5-6.5" />
            </svg>
          </a>
        </div>
        <Link to="/" className="pf-name">Emmy Rener</Link>
        <p className="pf-tag">Your Paris, made with love</p>
        <p className="pf-place">Paris, France</p>
      </div>

      <div className="pf-bottom">
        <div className="pf-cols">
          {COLUMNS.map((col) => (
            <div key={col.title} className="pf-col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map(([to, label]) => (
                  <li key={label}><FooterLink to={to}>{label}</FooterLink></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="pf-copy">© 2025 Emmy Rener. Made with ♡ in Paris.</p>
      </div>
    </footer>
  );
}

export default Footer;
