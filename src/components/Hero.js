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


  return (
    <section style={styles.hero}>
      {/* Background Image - Responsive */}
      <div style={{
        ...styles.backgroundImage,
        backgroundImage: windowWidth < 900 
          ? 'url(/videos/scrapbookhero-mobile.png)'
          : 'url(/videos/scrapbookhero-desktop.png)',
        backgroundSize: windowWidth < 900 ? '100% 100%' : 'cover',  // Stretch to fill on mobile
      }} />
      <div style={styles.overlay} />


      {/* Centered Hero Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Bonjour from Emmy in Paris</h1>
        
        <p style={styles.casualAside}>
        </p>
        
        <p style={styles.subheading}>
        these are the spots I tell my friends about before they visit
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
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
    filter: 'brightness(0.9)',
  },

  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 100%)',  // Reduced from 0.35-0.55
    zIndex: 2,
  },
  
  
  
  content: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    maxWidth: '700px',
    padding: '0 2rem',
  },
  
  heading: {
    color: '#FFFFFF',
    fontSize: 'clamp(3.5rem, 8vw, 7rem)',
    fontWeight: 300,
    letterSpacing: '0.08em',
    textShadow: '0 0 30px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,1), 0 4px 8px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.9), -2px -2px 4px rgba(0,0,0,0.9)',
    marginBottom: '0.75rem',
    fontFamily: 'Calligraffitti, cursive',
  },
  
  casualAside: {
    fontFamily: 'Calligraffitti, cursive',
    fontSize: '1.75rem',
    color: '#FFFFFF',
    marginBottom: '1.5rem',
    textShadow: '0 0 20px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,1), 0 3px 6px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.9)',
    opacity: 0.95,
  },
  
  subheading: {
    color: '#FFFFFF',
    fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
    fontWeight: 300,
    letterSpacing: '0.05em',
    textShadow: '0 0 20px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,1), 0 3px 6px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.9)',
    marginBottom: '3rem',
    lineHeight: 1.6,
  },
  
  ctaButton: {
    display: 'inline-block',
    color: '#FFFFFF',
    fontSize: '1.125rem',
    fontWeight: 400,
    letterSpacing: '0.08em',
    textDecoration: 'none',
    padding: '1.125rem 2.75rem',
    border: '2px solid rgba(255, 255, 255, 0.95)',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    textShadow: '0 0 15px rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,0.9)',
    fontFamily: 'Calligraffitti, cursive',
    boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
  },
};

export default Hero;