import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FeaturedPicks() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const picks = [
    {
      image: '/videos/featuredpic1.png',
      title: 'Quiet Luxury',
      tag: 'Coffee',
      href: '/recommendations#coffee',
    },
    {
      image: '/videos/featuredpic2.png',
      title: 'Seine Golden Hour Walk',
      tag: 'Walk',
      href: '/recommendations#walk',
    },
    {
      image: '/videos/featuredpic3.png',
      title: 'Paris Tea',
      tag: 'Class',
      href: '/recommendations#class',
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.sectionTitle}>Featured Picks</h2>
      </div>

      {/* Hero container with background */}
      <div style={styles.heroContainer}>
        {/* Blurred restaurant background */}
        <div style={styles.backgroundImage} />
        <div style={styles.backgroundOverlay} />

        {/* Floating image cards */}
        <div style={styles.floatingGrid}>
          {picks.map((pick, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <Link
                key={index}
                to={pick.href}
                style={styles.cardLink}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{
                  ...styles.imageCard,
                  transform: isHovered 
                    ? 'translateY(-16px) rotate(0deg)' 
                    : 'translateY(0) rotate(0deg)',
                  boxShadow: isHovered
                    ? '0 28px 56px rgba(0,0,0,0.3), 0 12px 24px rgba(0,0,0,0.2)'
                    : '0 16px 40px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.15)',
                }}>
                  {/* Full bleed image */}
                  <div
                    style={{
                      ...styles.cardImage,
                      backgroundImage: `url(${pick.image})`,
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    }}
                  />
                  
                  {/* Subtle gradient overlay */}
                  <div style={{
                    ...styles.imageOverlay,
                    opacity: isHovered ? 0.7 : 0.5,
                  }} />
                  
                  {/* Minimal label on hover */}
                  <div style={{
                    ...styles.hoverLabel,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                  }}>
                    <span style={styles.tag}>{pick.tag}</span>
                    <h3 style={styles.title}>{pick.title}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    marginBottom: '0',
    padding: '0',
    maxWidth: '100%',
    backgroundColor: '#FAF7F2',  // Add background color
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
    padding: '0 1.25rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 300,
    color: '#111111',
    fontFamily: 'Lora, serif',
    letterSpacing: '0.03em',
  },
  heroContainer: {
    position: 'relative',
    minHeight: '550px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
    overflow: 'hidden',
    borderRadius: '24px',  // Add rounded corners
    margin: '0 1.25rem',  // Add side margins so corners are visible
  },
  backgroundImage: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(/videos/hero1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.65)',
    transform: 'scale(1.1)',
    zIndex: 1,
  },
  backgroundOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(139,115,85,0.2) 0%, rgba(0,0,0,0.4) 100%)',
    zIndex: 2,
  },
  floatingGrid: {
    position: 'relative',
    zIndex: 3,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    maxWidth: '1200px',
    padding: '0 3rem',
    width: '100%',
  },
  cardLink: {
    textDecoration: 'none',
    display: 'block',
  },
  imageCard: {
    position: 'relative',
    aspectRatio: '3 / 4',  // Ensures all cards same size
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  cardImage: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
    transition: 'opacity 0.4s ease',
    zIndex: 1,
  },
  hoverLabel: {
    position: 'absolute',
    bottom: '2rem',
    left: '2rem',
    right: '2rem',
    zIndex: 2,
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  tag: {
    display: 'inline-block',
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    marginBottom: '0.75rem',
    fontFamily: 'Montserrat, sans-serif',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 400,
    color: '#FFFFFF',
    fontFamily: 'Lora, serif',
    lineHeight: 1.2,
    textShadow: '0 4px 12px rgba(0,0,0,0.5)',
  },
};

export default FeaturedPicks;