import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FeaturedPicks() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const picks = [
    {
      image: '/videos/featured-coffee.jpg',
      title: 'Boot Café',
      neighborhood: 'Le Marais',
      tag: 'Coffee',
      href: '/recommendations#coffee',
      color: '#8B7355', // Fallback color if image fails
    },
    {
      image: '/videos/featured-walk.jpg',
      title: 'Seine Golden Hour Walk',
      neighborhood: 'Right Bank',
      tag: 'Walk',
      href: '/recommendations#walk',
      color: '#B7A99A',
    },
    {
      image: '/videos/featured-class.jpg',
      title: 'Croissant Class',
      neighborhood: 'Saint-Germain',
      tag: 'Class',
      href: '/recommendations#class',
      color: '#C9A96E',
    },
  ];

  return (
    <section style={styles.section}>
      {/* Section Header */}
      <div style={styles.header}>
        <h2 style={styles.sectionTitle}>Featured Picks</h2>
        <p style={styles.sectionSubtitle}>Three places I'd send my best friend first.</p>
      </div>

      {/* Editorial Grid */}
      <div style={styles.grid}>
        {/* Large Featured Card - Left */}
        <Link
          to={picks[0].href}
          style={styles.cardLink}
          aria-label={`${picks[0].title} in ${picks[0].neighborhood}`}
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div 
            style={{
              ...styles.card,
              ...styles.largeCard,
              backgroundColor: picks[0].color,
            }}
          >
            <div
              style={{
                ...styles.cardImage,
                backgroundImage: `url(${picks[0].image})`,
                transform: hoveredIndex === 0 ? 'scale(1.04)' : 'scale(1)',
              }}
            />
            <div
              style={{
                ...styles.overlay,
                background: hoveredIndex === 0
                  ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)',
              }}
            />
            <div
              style={{
                ...styles.cardContent,
                transform: hoveredIndex === 0 ? 'translateY(-6px)' : 'translateY(0)',
              }}
            >
              <span style={styles.tag}>{picks[0].tag}</span>
              <h3 style={styles.cardTitle}>{picks[0].title}</h3>
              <p style={styles.neighborhood}>{picks[0].neighborhood}</p>
            </div>
          </div>
        </Link>

        {/* Right Column - Two Stacked Cards */}
        <div style={styles.rightColumn}>
          {picks.slice(1).map((pick, index) => (
            <Link
              key={index + 1}
              to={pick.href}
              style={styles.cardLink}
              aria-label={`${pick.title} in ${pick.neighborhood}`}
              onMouseEnter={() => setHoveredIndex(index + 1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                style={{
                  ...styles.card,
                  ...styles.smallCard,
                  backgroundColor: pick.color,
                }}
              >
                <div
                  style={{
                    ...styles.cardImage,
                    backgroundImage: `url(${pick.image})`,
                    transform: hoveredIndex === index + 1 ? 'scale(1.04)' : 'scale(1)',
                  }}
                />
                <div
                  style={{
                    ...styles.overlay,
                    background: hoveredIndex === index + 1
                      ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)',
                  }}
                />
                <div
                  style={{
                    ...styles.cardContent,
                    transform: hoveredIndex === index + 1 ? 'translateY(-6px)' : 'translateY(0)',
                  }}
                >
                  <span style={styles.tag}>{pick.tag}</span>
                  <h3 style={styles.cardTitle}>{pick.title}</h3>
                  <p style={styles.neighborhood}>{pick.neighborhood}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    marginBottom: '4rem',
  },
  header: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 400,
    color: '#111111',
    marginBottom: '0.5rem',
    fontFamily: 'Lora, serif',
    letterSpacing: '0.02em',
  },
  sectionSubtitle: {
    fontSize: '0.9375rem',
    fontWeight: 400,
    color: '#111111',
    opacity: 0.7,
    fontFamily: 'Lora, serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1.5rem',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  cardLink: {
    textDecoration: 'none',
    display: 'block',
  },
  card: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  largeCard: {
    height: '410px',
  },
  smallCard: {
    height: '197px',
    flex: 1,
  },
  cardImage: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    transition: 'background 0.4s ease',
    zIndex: 1,
  },
  cardContent: {
    position: 'absolute',
    bottom: '2rem',
    left: '2rem',
    right: '2rem',
    zIndex: 2,
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  tag: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    padding: '0.375rem 0.875rem',
    borderRadius: '20px',
    marginBottom: '0.75rem',
    fontFamily: 'Montserrat, sans-serif',
  },
  cardTitle: {
    fontSize: '1.75rem',
    fontWeight: 400,
    color: '#FFFFFF',
    marginBottom: '0.375rem',
    fontFamily: 'Lora, serif',
    lineHeight: 1.2,
    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  neighborhood: {
    fontSize: '0.875rem',
    fontWeight: 400,
    color: '#FFFFFF',
    opacity: 0.9,
    fontFamily: 'Lora, serif',
    textShadow: '0 1px 4px rgba(0,0,0,0.3)',
  },
};

export default FeaturedPicks;