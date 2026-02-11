import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const MobileMenu = () => (
    <div style={styles.mobileMenuOverlay} onClick={() => setMobileMenuOpen(false)}>
      <div style={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
        <Link to="/" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
          Home
        </Link>
        <Link to="/about" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
          About Me
        </Link>
        <Link to="/guides" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
          Guides
        </Link>
        <Link to="/recommendations" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
          Recommendations
        </Link>
        <Link to="/collabs" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
          Collabs
        </Link>
        <Link to="/contact" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
          Contact
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <nav style={{
        ...styles.nav,
        backgroundColor: mobileMenuOpen ? 'rgba(17, 17, 17, 0.95)' : 'rgba(247, 244, 239, 0.95)',
      }}>
        <div style={styles.container}>
          {/* Logo */}
          <Link to="/" style={styles.logo}>
            EMMY RENER
          </Link>

{/* Desktop Navigation */}
<div style={styles.desktopNav}>
            <Link 
              to="/" 
              style={styles.navLink}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#111111'}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              style={styles.navLink}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#111111'}
            >
              About Me
            </Link>
            <Link 
              to="/guides" 
              style={styles.navLink}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#111111'}
            >
              Guides
            </Link>
            <Link 
              to="/recommendations" 
              style={styles.navLink}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#111111'}
            >
              Recommendations
            </Link>
            <Link 
              to="/collabs" 
              style={styles.navLink}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#111111'}
            >
              Collabs
            </Link>
            <Link 
              to="/contact" 
              style={styles.navLink}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#111111'}
            >
              Contact
            </Link>
          </div>

          {/* Hamburger/X Button - ANIMATES */}
          <button
            style={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div style={styles.hamburgerContainer}>
              <span
                style={{
                  ...styles.hamburgerLine,
                  transform: mobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'rotate(0)',
                }}
              />
              <span
                style={{
                  ...styles.hamburgerLine,
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  ...styles.hamburgerLine,
                  transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'rotate(0)',
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu rendered at document.body level */}
      {mobileMenuOpen && createPortal(<MobileMenu />, document.body)}
    </>
  );
}

const styles = {
  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10001,
    padding: '1.5rem 2rem',
    backgroundColor: 'rgba(247, 244, 239, 0.95)',  // Cream color with slight transparency
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(183, 169, 154, 0.3)',  // Subtle taupe border
    transition: 'background-color 0.3s ease',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  logo: {
    color: '#111111',  // Changed from white to dark
    fontSize: '1.125rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textDecoration: 'none',
    textShadow: 'none',  // Remove shadow
  },
  desktopNav: {
    display: 'flex',
    gap: '2.5rem',
  },
  navLink: {
    color: '#111111',  // Changed from white to dark
    textDecoration: 'none',
    fontSize: '0.9375rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textShadow: 'none',  // Remove shadow
  },

  mobileMenuButton: {
    display: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    position: 'relative',
  },
  hamburgerContainer: {
    width: '28px',
    height: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: '3px',
    backgroundColor: '#111111',  // Changed from white to dark
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  },

  // Full screen overlay with fade-in animation
  mobileMenuOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(17, 17, 17, 0.92)',
    backdropFilter: 'blur(10px)',
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '7rem',
    animation: 'fadeIn 0.3s ease-out',
  },

  // Content wrapper with slide-up animation
  mobileMenuContent: {
    width: '100%',
    maxWidth: '520px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.25rem',
    alignItems: 'center',
    padding: '0 2rem 3rem',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    animation: 'slideUp 0.4s ease-out',
  },

  mobileNavLink: {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '2.25rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    fontFamily: 'Cormorant Garamond, serif',
    transition: 'color 0.3s ease',
  },
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  a[style*="mobileNavLink"]:hover {
    color: #8B7355 !important;
  }
`;
if (!document.querySelector('[data-nav-animations]')) {
  styleSheet.setAttribute('data-nav-animations', 'true');
  document.head.appendChild(styleSheet);
}

export default Navigation;