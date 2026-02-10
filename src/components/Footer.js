import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={styles.footer}>
          {/* Dark overlay for better text readability */}
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark tint - adjust 0.5 for darkness (0.3 = lighter, 0.7 = darker)
      zIndex: 1,
    }} />
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
    backgroundColor: '#F7F4EF',
    backgroundImage: 'url(/videos/footer-image.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '2.5rem 2rem',  // Reduced from 4rem 3rem
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
    marginBottom: '2rem',  // Reduced from 4rem
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    color: '#FFFFFF',  // Changed from #F7F4EF to pure white
  },
  tagline: {
    fontSize: '1rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: '#FFFFFF',  // Changed to white
    fontStyle: 'italic',
    fontFamily: 'Calligraffitti, cursive',
  },
  linksSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',  // Reduced from 3rem
    marginBottom: '2rem',  // Reduced from 4rem
    textAlign: 'center',
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',  // Reduced from 1rem
  },
  columnTitle: {
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#FFFFFF',  // Changed to white
    marginBottom: '0.5rem',
  },
  link: {
    color: '#E5E0D8',  // Light beige
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
    marginBottom: '1.5rem',  // Reduced from 3rem
  },
  bottomSection: {
    textAlign: 'center',
    paddingTop: '1.5rem',  // Reduced from 2rem
    borderTop: '1px solid rgba(183, 169, 154, 0.2)',
  },
  copyright: {
    fontSize: '0.875rem',
    fontWeight: 300,
    color: '#FFFFFF',  // Changed to white
    marginBottom: '0.5rem',
  },
  subtext: {
    fontSize: '0.8125rem',
    fontWeight: 300,
    color: '#E5E0D8',  // Light beige
    opacity: 0.9,
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
    color: '#FFFFFF',  // Changed to white
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
};

export default Footer;