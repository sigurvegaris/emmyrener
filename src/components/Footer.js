import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer style={{
      ...styles.footer,
      backgroundImage: windowWidth <= 768 
        ? 'url(/videos/footer-image-mobile.png)'
        : 'url(/videos/footer-image.png)'
    }}>
      {/* Dark overlay for better text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
      }} />
      
      <div style={styles.container}>
        {/* Top section - Logo and tagline */}
        <div style={styles.topSection}>
          <h3 style={styles.logo}>EMMY RENER</h3>
          <p style={styles.tagline}>
            Your Paris, made with love
          </p>
        </div>

        {/* Middle section - Links */}
        <div style={styles.linksSection}>
          <div style={styles.linkColumn}>
            <h4 style={styles.columnTitle}>Explore</h4>
            <Link 
              to="/" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = '#E5E0D8'}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = '#E5E0D8'}
            >
              About Me
            </Link>
            <Link 
              to="/guides" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = '#E5E0D8'}
            >
              Guides
            </Link>
            <Link 
              to="/recommendations" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = '#E5E0D8'}
            >
              Recommendations
            </Link>
            <Link 
              to="/contact" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = '#E5E0D8'}
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
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = '#E5E0D8'}
            >
              Instagram
            </a>
            <a 
              href="mailto:emmy@sophisticatedspreads.net" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = '#E5E0D8'}
            >
              Email
            </a>
          </div>

          <div style={styles.linkColumn}>
            <h4 style={styles.columnTitle}>Resources</h4>
            <Link 
              to="/guides" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = '#E5E0D8'}
            >
              Paris Guides
            </Link>
            <Link 
              to="/recommendations" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = '#E5E0D8'}
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
    backgroundColor: '#F7F4EF',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '2.5rem 2rem',
    borderTop: '1px solid #E5E0D8',
    position: 'relative',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  topSection: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    color: '#FFFFFF',
  },
  tagline: {
    fontSize: '1rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: '#FFFFFF',
    fontStyle: 'italic',
    fontFamily: 'Lora, serif',
  },
  linksSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  columnTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    marginBottom: '0.5rem',
  },
  link: {
    color: '#E5E0D8',
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
    marginBottom: '1.5rem',
  },
  bottomSection: {
    textAlign: 'center',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(183, 169, 154, 0.2)',
  },
  copyright: {
    fontSize: '0.875rem',
    fontWeight: 300,
    color: '#FFFFFF',
    marginBottom: '0.5rem',
  },
  subtext: {
    fontSize: '0.8125rem',
    fontWeight: 300,
    color: '#E5E0D8',
    opacity: 0.9,
    fontStyle: 'italic',
  },
  seoLine: {
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: '#FFFFFF',
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
};

export default Footer;