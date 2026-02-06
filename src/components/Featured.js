import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Featured.css';

function Featured() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // REORDERED: Marais → Wine → Café → Walk (a Paris day)
  const featuredSpots = [
    {
      image: '/videos/left2.jpg',
      title: 'Sunday in Le Marais',
      description: 'Where locals brunch'
    },
    {
      image: '/videos/left1.jpg',
      title: 'Where I Take Friends for Wine',
      description: 'Natural wine bars I trust'
    },
    {
      image: '/videos/left3.jpg',
      title: 'My Favorite Café to Read',
      description: 'Quiet corners of Paris'
    },
    {
      image: '/videos/left4.jpg',
      title: 'The Walk I Never Skip',
      description: 'Along the Seine at sunset'
    },
  ];

  return (
    <section id="featured" style={styles.section}>
<div style={styles.grid} className="featured-grid">
          {featuredSpots.map((spot, index) => (
            <Link
              key={index}
              to="/guides"
              style={styles.cardLink}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={styles.card}>
                <div 
                  style={{
                    ...styles.cardImage,
                    backgroundImage: `url(${spot.image})`,
                    transform: hoveredIndex === index ? 'scale(1.03)' : 'scale(1)',
                  }}
                />
            <div 
                style={{
                  ...styles.cardOverlay,
                  background: hoveredIndex === index 
                    ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
                }}
              >
                {/* Caption strip - scrapbook style */}
                <div style={styles.captionStrip}>
                  <h3 
                    style={{
                      ...styles.cardTitle,
                      transform: hoveredIndex === index ? 'translateY(-6px)' : 'translateY(0)',
                    }}
                  >
                    {spot.title}
                  </h3>
                  <p style={styles.cardDescription}>{spot.description}</p>
                </div>
                
                {/* Explore button */}
                <div 
                  style={{
                    ...styles.exploreButton,
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(10px)',
                  }}
                >
                    Explore Guides →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#F7F4EF',
    padding: '6rem 4rem',  // Increased side padding from 3rem
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  sectionTitle: {
    color: '#111111',
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 300,
    letterSpacing: '0.08em',  // Increased from 0.05em - magazine tracking
    textAlign: 'center',
    marginBottom: '5rem',
    fontFamily: 'Cormorant Garamond, serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
  },
  card: {
    position: 'relative',
    height: '420px',
    borderRadius: '4px',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)',
    border: '8px solid #FFFFFF',
    outline: '1px solid #E5E0D8',
  },
  cardImage: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: 'saturate(0.95) contrast(1.05)',  // Slight vintage photo feel
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '2rem',
    transition: 'background 0.4s ease',
  },
  cardTitle: {
    fontSize: '2rem',
    fontWeight: 400,
    color: 'white',
    letterSpacing: '0.08em',
    marginBottom: '0.5rem',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    textShadow: '0 3px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)',
    fontFamily: 'Caveat, cursive',
    lineHeight: 1.2,
  },
  cardDescription: {
    color: 'white',
    fontSize: '0.9375rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    opacity: 0.95,
    textShadow: '0 2px 6px rgba(0,0,0,0.7)',
    fontFamily: 'Cormorant Garamond, serif',
    fontStyle: 'italic',  // Adds personal note feel
  },
  cardLink: {
    textDecoration: 'none',
    display: 'block',
    cursor: 'pointer',
  },
  exploreButton: {
    marginTop: '1rem',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    paddingTop: '0.75rem',
    borderTop: '1px solid rgba(255,255,255,0.3)',
  },
};

export default Featured;