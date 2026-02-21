import React, { useState, useEffect } from 'react';

function FeaturedPicks() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const picks = [
    {
      image: '/videos/featuredpic1.png',
      title: 'Quiet Luxury',
      tag: 'Coffee',
      href: '#recommendations-cards'
    },
    {
      image: '/videos/featuredpic2.png',
      title: 'Seine Golden Hour Walk',
      tag: 'Walk',
    },
    {
      image: '/videos/featuredpic3.png',
      title: 'Paris Tea',
      tag: 'Class',
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % picks.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, picks.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleCardClick = () => {
    const target = document.getElementById('recommendations');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: 600, behavior: 'smooth' });
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.sectionTitle}>Featured Picks</h2>
      </div>

      <div style={styles.carouselWrapper}>
        <div style={styles.heroContainer}>
          {/* Carousel cards */}
          <div style={styles.carouselContainer}>
            {picks.map((pick, index) => (
              <div
                key={index}
                onClick={handleCardClick}
                style={{
                  ...styles.carouselSlide,
                  transform: `translateX(${(index - currentSlide) * 105}%)`,
                  opacity: index === currentSlide ? 1 : 0,
                  pointerEvents: index === currentSlide ? 'auto' : 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={styles.slideCard}>
                  <div
                    style={{
                      ...styles.cardImage,
                      backgroundImage: `url(${pick.image})`,
                    }}
                  />
                  <div style={styles.slideOverlay} />
                  <div style={styles.slideLabel}>
                    <span style={styles.slideTag}>{pick.tag}</span>
                    <h3 style={styles.slideTitle}>{pick.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div style={styles.dotsContainer}>
          {picks.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                ...styles.dot,
                backgroundColor: index === currentSlide ? '#8B7355' : 'rgba(139, 115, 85, 0.3)',
                width: index === currentSlide ? '48px' : '12px',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    marginBottom: '4rem',
    padding: '0',
    maxWidth: '100%',
    backgroundColor: '#FAF7F2',
  },
  header: {
    marginBottom: '3rem',
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
  carouselWrapper: {
    position: 'relative',
    width: '100%',
  },
  heroContainer: {
    position: 'relative',
    height: '600px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  carouselContainer: {
    position: 'relative',
    zIndex: 3,
    width: '100%',
    maxWidth: '600px',
    height: '500px',
  },
  carouselSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
  },
  slideCard: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 24px 64px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.2)',
  },
  cardImage: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  slideOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
    zIndex: 1,
  },
  slideLabel: {
    position: 'absolute',
    bottom: '3rem',
    left: '3rem',
    right: '3rem',
    zIndex: 2,
  },
  slideTag: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(12px)',
    padding: '0.625rem 1.25rem',
    borderRadius: '24px',
    marginBottom: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  slideTitle: {
    fontSize: '2.5rem',
    fontWeight: 400,
    color: '#FFFFFF',
    fontFamily: 'Lora, serif',
    lineHeight: 1.2,
    textShadow: '0 4px 16px rgba(0,0,0,0.6)',
    margin: 0,
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '2.5rem',
  },
  dot: {
    height: '12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: 0,
  },
};

export default FeaturedPicks;