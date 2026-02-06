import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Top section - Logo and tagline */}
        <div style={styles.topSection}>
          <h3 style={styles.logo}>EMMY RENER</h3>
          <p style={styles.tagline}>
            Your Paris, curated with love
          </p>
        </div>

        {/* Middle section - Links */}
        <div style={styles.linksSection}>
          <div style={styles.linkColumn}>
            <h4 style={styles.columnTitle}>Explore</h4>
            <Link 
              to="/" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#F7F4EF'}
              onMouseLeave={(e) => e.target.style.color = '#B7A99A'}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#F7F4EF'}
              onMouseLeave={(e) => e.target.style.color = '#B7A99A'}
            >
              About Me
            </Link>
            <Link 
              to="/guides" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#F7F4EF'}
              onMouseLeave={(e) => e.target.style.color = '#B7A99A'}
            >
              Guides
            </Link>
            <Link 
              to="/recommendations" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#F7F4EF'}
              onMouseLeave={(e) => e.target.style.color = '#B7A99A'}
            >
              Recommendations
            </Link>
            <Link 
              to="/contact" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#F7F4EF'}
              onMouseLeave={(e) => e.target.style.color = '#B7A99A'}
            >
              Contact
            </Link>
          </div>

          <div style={styles.linkColumn}>
            <h4 style={styles.columnTitle}>Connect</h4>
            <a 
              href="https://instagram.com/emmyrener" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#F7F4EF'}
              onMouseLeave={(e) => e.target.style.color = '#B7A99A'}
            >
              Instagram
            </a>
            <a 
              href="mailto:emmy@sophisticatedspreads.net" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#F7F4EF'}
              onMouseLeave={(e) => e.target.style.color = '#B7A99A'}
            >
              Email
            </a>
          </div>

          <div style={styles.linkColumn}>
            <h4 style={styles.columnTitle}>Resources</h4>
            <Link 
              to="/guides" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#F7F4EF'}
              onMouseLeave={(e) => e.target.style.color = '#B7A99A'}
            >
              Paris Guides
            </Link>
            <Link 
              to="/recommendations" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#F7F4EF'}
              onMouseLeave={(e) => e.target.style.color = '#B7A99A'}
            >
              Trusted Partners
            </Link>
          </div>
        </div>

        {/* Decorative divider */}
        <div style={styles.divider}>
          <svg width="60" height="2">
            <line x1="0" y1="1" x2="20" y2="1" stroke="#B7A99A" strokeWidth="1" opacity="0.5"/>
            <circle cx="30" cy="1" r="2" fill="#B7A99A" opacity="0.5"/>
            <line x1="40" y1="1" x2="60" y2="1" stroke="#B7A99A" strokeWidth="1" opacity="0.5"/>
          </svg>
        </div>

        {/* Bottom section - Copyright */}
{/* Bottom section - Copyright */}
<div style={styles.bottomSection}>
          <p style={styles.seoLine}>
            Digital Paris Guides by Emmy Rener
          </p>
          <p style={styles.copyright}>
            © 2025 Emmy Rener. Made with ♡ in Paris.
          </p>
          <p style={styles.subtext}>
            All recommendations are genuine and personally vetted
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#111111',
    color: '#F7F4EF',
    padding: '5rem 3rem 3rem 3rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  topSection: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    color: '#F7F4EF',
  },
  tagline: {
    fontSize: '1rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: '#B7A99A',
    fontStyle: 'italic',
    fontFamily: 'Cormorant Garamond, serif',
  },
  linksSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '3rem',
    marginBottom: '4rem',
    textAlign: 'center',
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  columnTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#F7F4EF',
    marginBottom: '0.5rem',
  },
  link: {
    color: '#B7A99A',
    fontSize: '0.9375rem',
    fontWeight: 300,
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    letterSpacing: '0.02em',
  },
  divider: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  bottomSection: {
    textAlign: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(183, 169, 154, 0.2)',
  },
  copyright: {
    fontSize: '0.875rem',
    fontWeight: 300,
    color: '#B7A99A',
    marginBottom: '0.5rem',
  },
  subtext: {
    fontSize: '0.8125rem',
    fontWeight: 300,
    color: '#B7A99A',
    opacity: 0.7,
    fontStyle: 'italic',
  },
  logoColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left',  // Left-aligned instead of centered
  },
  seoLine: {
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: '#F7F4EF',
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
};

export default Footer;