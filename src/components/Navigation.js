import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

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

  const MOBILE_LINKS = [
    ['/', 'Home'],
    ['/about', 'About Me'],
    ['/guides', 'Guides'],
    ['/retreats', 'Retreats'],
    ['/recommendations', 'Recommendations'],
    ['/collabs', 'Collabs'],
    ['/contact', 'Contact'],
  ];

  const MobileMenu = () => (
    <div style={styles.mobileMenuOverlay} onClick={() => setMobileMenuOpen(false)}>
      <div style={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
        {MOBILE_LINKS.map(([to, label]) => (
          <Link
            key={to}
            to={to}
            style={{ ...styles.mobileNavLink, ...(pathname === to ? styles.mobileNavLinkActive : {}) }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <a
          href="https://instagram.com/emmyrener"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.mobileMenuInsta}
        >
          @emmyrener
        </a>
      </div>
    </div>
  );

  return (
    <>
      <nav className="site-nav" style={styles.nav}>
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
              to="/retreats" 
              style={styles.navLink}
              onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#111111'}
            >
              Retreats
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
    backgroundColor: '#F7F4EF',
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '7rem',
    overflowY: 'auto',
    animation: 'fadeIn 0.3s ease-out',
  },

  // Content wrapper with slide-up animation
  mobileMenuContent: {
    width: '100%',
    maxWidth: '520px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.6rem',
    alignItems: 'center',
    padding: '0 2rem 3rem',
    animation: 'slideUp 0.4s ease-out',
  },

  mobileNavLink: {
    color: '#2C3550',
    textDecoration: 'none',
    fontSize: '1.9rem',
    fontWeight: 400,
    letterSpacing: '0.04em',
    transition: 'color 0.3s ease',
  },
  mobileNavLinkActive: {
    color: '#A77467',
    fontStyle: 'italic',
  },
  mobileMenuInsta: {
    marginTop: '1.4rem',
    paddingTop: '1.6rem',
    borderTop: '1px solid rgba(167, 116, 103, 0.4)',
    color: '#A77467',
    fontSize: '1rem',
    letterSpacing: '0.12em',
    textDecoration: 'none',
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


`;
if (!document.querySelector('[data-nav-animations]')) {
  styleSheet.setAttribute('data-nav-animations', 'true');
  document.head.appendChild(styleSheet);
}

export default Navigation;