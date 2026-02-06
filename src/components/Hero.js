import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showPolaroids = windowWidth > 1024;

  return (
    <section style={styles.hero}>
      {/* Background Image */}
      <div style={styles.backgroundImage} />
      <div style={styles.overlay} />

      {/* Scrapbook Polaroid Overlays - ONLY ON DESKTOP */}
      {showPolaroids && (
        <div style={styles.scrapbookLayer}>
          {/* Top left corner */}
          <div style={{...styles.polaroid, ...styles.polaroid1}}>
            <div style={{
              ...styles.polaroidImage,
              backgroundImage: 'url(/videos/hero2.jpg)',
              height: '280px'
            }} />
            <p style={styles.polaroidCaption}>where I go every Sunday ☀️</p>
          </div>

          {/* Bottom right corner */}
          <div style={{...styles.polaroid, ...styles.polaroid2}}>
            <div style={{
              ...styles.polaroidImage,
              backgroundImage: 'url(/videos/hero4.jpg)',
              height: '260px'
            }} />
            <p style={styles.polaroidCaption}>my favorite corner</p>
          </div>

          {/* Washi tape accent */}
          <div style={{...styles.washiTape, ...styles.washi1}}></div>

          {/* Handwritten note */}
          <div style={styles.handwrittenNote}>
            (places I actually go)
          </div>
        </div>
      )}

      {/* Centered Hero Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Your Paris, Curated</h1>
        
        <p style={styles.casualAside}>
          not the guidebook version
        </p>
        
        <p style={styles.subheading}>
          The spots I send to friends before they visit
        </p>
        
        <Link to="/guides" style={styles.ctaButton}>
          come with me →
        </Link>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(/videos/hero1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)',
    zIndex: 2,
  },
  
  scrapbookLayer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 5,
  },
  
  polaroid: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    padding: '14px 14px 50px 14px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.35), 0 5px 12px rgba(0,0,0,0.25)',
  },
  
  polaroid1: {
    top: '12%',
    left: '3%',
    width: '300px',
    transform: 'rotate(-7deg)',
    zIndex: 3,
  },
  
  polaroid2: {
    bottom: '8%',
    right: '5%',
    width: '280px',
    transform: 'rotate(6deg)',
    zIndex: 3,
  },
  
  polaroidImage: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#E5E0D8',
  },
  
  polaroidCaption: {
    fontFamily: 'Caveat, cursive',
    fontSize: '1.25rem',
    color: '#111111',
    textAlign: 'center',
    marginTop: '12px',
    marginBottom: 0,
    lineHeight: 1.3,
    letterSpacing: '0.01em',
  },
  
  washiTape: {
    position: 'absolute',
    height: '28px',
    backgroundColor: 'rgba(247, 244, 239, 0.25)',
    border: '1px solid rgba(247, 244, 239, 0.4)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
  
  washi1: {
    top: '10%',
    left: '1.5%',
    width: '130px',
    transform: 'rotate(-8deg)',
  },
  
  handwrittenNote: {
    position: 'absolute',
    bottom: '15%',
    left: '50%',
    transform: 'translateX(-50%) rotate(-2deg)',
    fontFamily: 'Caveat, cursive',
    fontSize: '1.5rem',
    color: '#F7F4EF',
    textShadow: '0 3px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)',
    opacity: 0.95,
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '4px',
  },
  
  content: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    maxWidth: '700px',
    padding: '0 2rem',
  },
  
  heading: {
    color: 'white',
    fontSize: 'clamp(3.5rem, 8vw, 7rem)',
    fontWeight: 300,
    letterSpacing: '0.08em',
    textShadow: '0 4px 16px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
    marginBottom: '0.75rem',
    fontFamily: 'Cormorant Garamond, serif',
  },
  
  casualAside: {
    fontFamily: 'Caveat, cursive',
    fontSize: '1.75rem',
    color: '#F7F4EF',
    marginBottom: '1.5rem',
    textShadow: '0 3px 10px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)',
    opacity: 0.95,
  },
  
  subheading: {
    color: 'white',
    fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
    fontWeight: 300,
    letterSpacing: '0.05em',
    textShadow: '0 3px 10px rgba(0,0,0,0.7)',
    marginBottom: '3rem',
    lineHeight: 1.6,
  },
  
  ctaButton: {
    display: 'inline-block',
    color: 'white',
    fontSize: '1.125rem',
    fontWeight: 400,
    letterSpacing: '0.08em',
    textDecoration: 'none',
    padding: '1.125rem 2.75rem',
    border: '2px solid rgba(255, 255, 255, 0.85)',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(6px)',
    textShadow: '0 2px 6px rgba(0,0,0,0.4)',
    fontFamily: 'Cormorant Garamond, serif',
  },
};

export default Hero;