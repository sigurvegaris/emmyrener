import React from 'react';

function Guides() {
  
  const guide = {
    gumroadLink: "https://emmyrener.gumroad.com/l/parisbyemmy",
    originalPrice: "$24",
    currentPrice: "$8.99"
  };

  const testimonials = [
    {
      quote: "Working with Emmy on our itinerary was the best decision we made for our France vacation!! She put so much thought and care into understanding exactly what we wanted and made it all happen effortlessly. Our trip was smooth, stress-free, and truly a vacation my husband and I will reminisce about for many years to come. Instead of worrying about logistics, we got to be fully present and enjoy every moment. And beyond her incredible planning skills, she's just a joy to work with. Emmy was warm, bubbly, and so fun throughout the entire process. I couldn't recommend her more highly!",
      author: "Olivia",
      location: "South Dakota"
    },
    {
      quote: "Emmy's recommendations felt exactly like having a local friend show us around Paris. Nothing felt touristy, everything felt special.",
      author: "Maria",
      location: "Los Angeles"
    },
    {
      quote: "We followed Emmy's Paris guide for three days and every single place was unforgettable. It felt like we had a local friend planning our trip.",
      author: "Sarah",
      location: "New York"
    },
  ];

  
  // Responsive state
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showStickyButton, setShowStickyButton] = React.useState(false);

  const [expandedReviews, setExpandedReviews] = React.useState({});


  // Responsive testimonials per page: 1 on mobile, 3 on desktop
  const testimonialsPerPage = windowWidth < 900 ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Track window width
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance carousel every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  // Sticky button on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setShowStickyButton(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (index) => {
    setCurrentIndex(index);
  };

    // Truncate text helper
    const truncateText = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
    };
  
    const toggleReview = (pageIndex, index) => {
      const key = `${pageIndex}-${index}`;
      setExpandedReviews(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    };

  return (
    <section id="guides" style={styles.section}>
      <div style={styles.container}>
                {/* INTRO SECTION - NEW */}
                <div style={styles.introSection}>
          <h1 style={styles.introHeading}>My Guides</h1>
          <p style={styles.introParagraph}>
            After living in Paris and trying hundreds of places, I have pulled together a list of my favorite spots in Paris. It is easy to be swept up in the spots you see on Instagram, or hear about on TikTok, but I pride myself in curating a true list of spots from a local who understands the Paris food scene and wants to bring you the best of the best. A lot of places on this guide you will have never seen me post about on my social media - because I genuinely don't want these places to reach the masses. Some of the best restaurants in Paris only have 16 seats! I hope you enjoy and I am entrusting you with this list of my favorites - so go spoil yourself rotten and order the dessert at breakfast, lunch, and dinner! Bon appetit!
          </p>
        </div>

        {/* Divider */}
        <div style={styles.divider} />
        
        {/* HERO - Two Column Layout */}
        <div style={styles.canvas}>
          
          {/* Left Column - Visual Anchor */}
          <div style={styles.leftColumn}>
            <div style={styles.phoneFrame}>
              <img 
                src="/videos/phone1.png" 
                alt="Paris Food Map on Phone" 
                style={styles.phoneImage}
              />
            </div>
            <p style={styles.phoneCaption}></p>
          </div>

          {/* Right Column - Decision Stack */}
          <div style={styles.rightColumn}>
            
          <h1 style={styles.headline}>
              25 Best Bites in Paris
            </h1>
                        {/* More guides coming soon */}
                        <p style={styles.comingSoon}>
              (More guides coming soon!)
            </p>

            <p style={styles.trustLine}>
              I lived in Paris for two years. I tried hundreds of spots. These are the 25 I send to friends before they visit.
            </p>

            <p style={styles.productClarity}>
              A food map you open on your phone that shows exactly where to go and what to order.
            </p>

            <p style={styles.coverageLine}>
              Morning cafés · Lunch between sightseeing · Memorable dinners · Dessert stops
            </p>

            <div style={styles.priceSection}>
              <span style={styles.originalPrice}>{guide.originalPrice}</span>
              <span style={styles.currentPrice}>{guide.currentPrice}</span>
            </div>

            <a 
              href={guide.gumroadLink}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.primaryButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#6d5940';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 32px rgba(139, 115, 85, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#8B7355';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 24px rgba(139, 115, 85, 0.3)';
              }}
            >
              Get the Paris Food Map
            </a>

            <p style={styles.exclusivityCloser}>
            </p>

          </div>
        </div>

        {/* What's Inside */}
        <div style={styles.whatsInsideSection}>
          <h3 style={styles.sectionTitle}>What's Inside:</h3>
          <div style={styles.whatsInsideGrid}>
            <div style={styles.insideItem}>
              <span style={styles.insideBullet}>✓</span>
              <span>Interactive map with all 25 locations</span>
            </div>
            <div style={styles.insideItem}>
              <span style={styles.insideBullet}>✓</span>
              <span>What to order at each spot</span>
            </div>
            <div style={styles.insideItem}>
              <span style={styles.insideBullet}>✓</span>
              <span>Price points and best times to visit</span>
            </div>
          </div>
        </div>

        {/* Every Type of Meal Covered */}
        <div style={styles.mealTypesSection}>
          <h3 style={styles.sectionTitle}>Every Type of Meal Covered</h3>
          <div style={styles.mealTypesGrid}>
            <div style={styles.mealCard}>
              <div style={styles.mealIcon}></div>
              <h4 style={styles.mealLabel}>Morning cafés</h4>
              <p style={styles.mealDescription}>Start your day right</p>
            </div>
            <div style={styles.mealCard}>
              <div style={styles.mealIcon}></div>
              <h4 style={styles.mealLabel}>Lunch between sightseeing</h4>
              <p style={styles.mealDescription}>Quick and authentic</p>
            </div>
            <div style={styles.mealCard}>
              <div style={styles.mealIcon}></div>
              <h4 style={styles.mealLabel}>Memorable dinners</h4>
              <p style={styles.mealDescription}>Worth planning around</p>
            </div>
            <div style={styles.mealCard}>
              <div style={styles.mealIcon}></div>
              <h4 style={styles.mealLabel}>Dessert stops</h4>
              <p style={styles.mealDescription}>Along the way</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div style={styles.finalCTASection}>
          <p style={styles.ctaPushLine}>
            If you only have a few days in Paris, this ensures every meal is memorable.
          </p>
          <a
            href={guide.gumroadLink}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.finalCTA}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6d5940';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#8B7355';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Get the Paris Guide — {guide.currentPrice}
          </a>
          <p style={styles.ctaSubtext}>Instant download • Use on your phone • 11 pages</p>
        </div>

        {/* Testimonials Carousel - FIXED */}
        <div style={styles.testimonialSection}>
          <h3 style={styles.testimonialHeading}>Loved by travelers around the world</h3>
          
          <div style={styles.carouselContainer}>
            {/* Left Arrow */}
            <button 
              onClick={goToPrev}
              style={{...styles.arrowButton, ...styles.leftArrow}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#8B7355';
                e.target.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.color = '#8B7355';
              }}
            >
              ‹
            </button>

            {/* Carousel Track */}
            <div style={styles.carouselTrack}>
              <div style={{
                ...styles.carouselSlides,
                transform: `translateX(-${currentIndex * 100}%)`,
              }}>
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div 
                    key={pageIndex} 
                    style={styles.carouselPage}
                  >
                    {testimonials
                      .slice(pageIndex * testimonialsPerPage, (pageIndex + 1) * testimonialsPerPage)
                      .map((testimonial, index) => {
                        const key = `${pageIndex}-${index}`;
                        const isExpanded = expandedReviews[key];
                        const needsTruncation = testimonial.quote.length > 150;
                        
                        return (
                          <div 
                            key={index} 
                            style={{
                              ...styles.testimonial,
                              flex: windowWidth < 900 ? '0 0 100%' : '0 0 calc(33.333% - 1.5rem)',
                            }}
                          >
                            <div style={styles.stars}>
                              {[...Array(5)].map((_, i) => (
                                <span key={i} style={styles.star}>★</span>
                              ))}
                            </div>
                            <p style={styles.testimonialText}>
                              "{isExpanded || !needsTruncation 
                                ? testimonial.quote 
                                : truncateText(testimonial.quote, 150)}"
                              {needsTruncation && (
                                <button
                                  onClick={() => toggleReview(pageIndex, index)}
                                  style={styles.readMoreButton}
                                  onMouseEnter={(e) => e.target.style.color = '#6d5940'}
                                  onMouseLeave={(e) => e.target.style.color = '#8B7355'}
                                >
                                  {isExpanded ? ' Read less' : ' Read more'}
                                </button>
                              )}
                            </p>
                            <p style={styles.testimonialAuthor}>— {testimonial.author}, {testimonial.location}</p>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={goToNext}
              style={{...styles.arrowButton, ...styles.rightArrow}}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#8B7355';
                e.target.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FFFFFF';
                e.target.style.color = '#8B7355';
              }}
            >
              ›
            </button>
          </div>

          {/* Dots */}
          <div style={styles.dotsContainer}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                style={{
                  ...styles.dot,
                  ...(currentIndex === index ? styles.activeDot : {}),
                }}
              />
            ))}
          </div>

          <p style={styles.reviewCount}>
            Showing {currentIndex * testimonialsPerPage + 1}–{Math.min((currentIndex + 1) * testimonialsPerPage, testimonials.length)} of {testimonials.length} reviews
          </p>
        </div>

      </div>

      {/* Sticky Buy Button */}
      {showStickyButton && (
        <div style={styles.stickyButtonContainer}>
          <a
            href={guide.gumroadLink}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.stickyButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            Get the Paris Food Map — {guide.currentPrice}
          </a>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#FFFFFF',
    padding: '5rem 2rem 3rem 2rem',  // Added more top padding
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  canvas: {
    display: 'grid',
    gridTemplateColumns: '35% 65%',
    gap: '3rem',
    alignItems: 'center',
    minHeight: '70vh',
    marginBottom: '3rem',
  },
  
  // LEFT COLUMN
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame: {
    width: '280px',
    height: '560px',
    backgroundColor: '#111111',
    borderRadius: '38px',
    padding: '12px',
    boxShadow: '0 30px 60px rgba(0,0,0,0.28)',
    overflow: 'hidden',
  },
  phoneImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '32px',
  },
  phoneCaption: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#8B7355',
    marginTop: '1.5rem',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: '0.02em',
  },
  
  // RIGHT COLUMN
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '2rem',
  },
  headline: {
    fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
    fontWeight: 300,
    color: '#111111',
    lineHeight: 1.05,
    letterSpacing: '0.01em',
    marginBottom: '1.25rem',
    fontFamily: 'Calligraffitti, cursive',
  },
  comingSoon: {
    fontSize: '1.125rem',
    fontWeight: 400,
    color: '#8B7355',
    fontStyle: 'italic',
    marginBottom: '1.5rem',
    fontFamily: 'Calligraffitti, cursive',
    opacity: 0.85,
  },
  trustLine: {
    fontSize: '0.98rem',
    lineHeight: 1.55,
    marginBottom: '1rem',
    opacity: 0.85,
  },
  productClarity: {
    fontSize: '1.15rem',
    fontWeight: 500,
    lineHeight: 1.45,
    marginBottom: '1rem',
  },
  coverageLine: {
    fontSize: '0.95rem',
    lineHeight: 1.5,
    marginBottom: '1.5rem',
    color: '#8B7355',
    letterSpacing: '0.02em',
  },
  priceSection: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  originalPrice: {
    fontSize: '1.4rem',
    color: '#CCCCCC',
    textDecoration: 'line-through',
  },
  currentPrice: {
    fontSize: '2.4rem',
    fontWeight: 700,
    color: '#8B7355',
  },
  primaryButton: {
    display: 'block',
    backgroundColor: '#8B7355',
    color: '#F7F4EF',
    fontSize: '1.15rem',
    fontWeight: 700,
    letterSpacing: '0.03em',
    textAlign: 'center',
    textDecoration: 'none',
    padding: '1.15rem 2rem',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 24px rgba(139, 115, 85, 0.25)',
    border: 'none',
    marginBottom: '1rem',
  },
  exclusivityCloser: {
    fontSize: '0.8125rem',
    fontWeight: 400,
    color: '#999999',
    lineHeight: 1.5,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  // SECTIONS
  whatsInsideSection: {
    backgroundColor: '#FAF7F2',
    padding: '3rem',
    borderRadius: '8px',
    marginBottom: '5rem',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: 600,
    color: '#111111',
    marginBottom: '2rem',
    fontFamily: 'Cormorant Garamond, serif',
  },
  whatsInsideGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  insideItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1.0625rem',
    fontWeight: 500,
    color: '#111111',
  },
  insideBullet: {
    color: '#8B7355',
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  
  mealTypesSection: {
    marginBottom: '5rem',
  },
  mealTypesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
  },
  mealCard: {
    textAlign: 'center',
    padding: '2rem 1rem',
  },
  mealIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  mealLabel: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#111111',
    marginBottom: '0.5rem',
  },
  mealDescription: {
    fontSize: '0.9375rem',
    fontWeight: 400,
    color: '#111111',
    opacity: 0.8,
  },
  
  finalCTASection: {
    textAlign: 'center',
    marginBottom: '6rem',
    padding: '4rem 2rem',
    backgroundColor: '#FAF7F2',
    borderRadius: '8px',
  },
  ctaPushLine: {
    fontSize: '1.375rem',
    fontWeight: 400,
    color: '#111111',
    marginBottom: '2rem',
    lineHeight: 1.5,
  },
  finalCTA: {
    display: 'inline-block',
    backgroundColor: '#8B7355',
    color: '#F7F4EF',
    padding: '1.5rem 3rem',
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textDecoration: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 24px rgba(139, 115, 85, 0.3)',
    border: 'none',
    marginBottom: '1rem',
  },
  ctaSubtext: {
    fontSize: '0.875rem',
    fontWeight: 400,
    color: '#8B7355',
    marginTop: '1rem',
  },

  // TESTIMONIALS CAROUSEL - FIXED
  testimonialSection: {
    paddingTop: '5rem',
    borderTop: '2px solid #E5E0D8',
  },
  testimonialHeading: {
    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
    fontWeight: 300,
    color: '#111111',
    textAlign: 'center',
    marginBottom: '3rem',
    letterSpacing: '0.05em',
    fontFamily: 'Cormorant Garamond, serif',
  },
  carouselContainer: {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 80px',
  },
  carouselTrack: {
    overflow: 'hidden',
  },
  carouselSlides: {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
  },
  carouselPage: {
    minWidth: '100%',
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    // ADD THIS NEW LINE:
    alignItems: 'flex-start',  // Allows cards to have different heights
  },
  testimonial: {
    backgroundColor: '#FAF7F2',
    padding: '2rem',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '280px',
    // ADD THIS NEW LINE:
    alignSelf: 'flex-start',  // Prevents expanding with siblings
  },
  stars: {
    display: 'flex',
    gap: '0.25rem',
    marginBottom: '1rem',
  },
  star: {
    color: '#C9A96E',
    fontSize: '1rem',
  },
  testimonialText: {
    fontSize: '1rem',
    fontWeight: 400,
    color: '#111111',
    lineHeight: 1.6,
    marginBottom: '1rem',
    // ADD THIS NEW LINE:
    flex: 1,
  },
  testimonialAuthor: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#8B7355',
    letterSpacing: '0.02em',
  },
  readMoreButton: {
    background: 'none',
    border: 'none',
    color: '#8B7355',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
    transition: 'color 0.3s ease',
    marginLeft: '0.25rem',
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    marginTop: '2rem',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#E5E0D8',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: 0,
  },
  activeDot: {
    backgroundColor: '#8B7355',
    width: '12px',
    height: '12px',
  },
  arrowButton: {
    position: 'absolute',
    top: '40%',
    transform: 'translateY(-50%)',
    backgroundColor: '#FFFFFF',
    border: '2px solid #E5E0D8',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    fontSize: '2rem',
    color: '#8B7355',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  leftArrow: {
    left: '10px',
  },
  rightArrow: {
    right: '10px',
  },
  reviewCount: {
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#8B7355',
    fontWeight: 500,
    marginTop: '1rem',
  },
  
  // STICKY BUTTON
  stickyButtonContainer: {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    animation: 'fadeInUp 0.4s ease-out',
  },
  stickyButton: {
    display: 'block',
    backgroundColor: '#8B7355',
    color: '#F7F4EF',
    padding: '1.25rem 2.5rem',
    fontSize: '1.125rem',
    fontWeight: 700,
    letterSpacing: '0.03em',
    textDecoration: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(139, 115, 85, 0.4)',
    border: 'none',
    whiteSpace: 'nowrap',
  },

  introSection: {
    maxWidth: '900px',
    margin: '0 auto 4rem auto',
    textAlign: 'center',
    padding: '0 2rem',
  },
  introHeading: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 300,
    color: '#111111',
    letterSpacing: '0.05em',
    marginBottom: '2rem',
    fontFamily: 'Calligraffitti, cursive',
  },
  introParagraph: {
    fontSize: '1.125rem',
    fontWeight: 400,
    color: '#111111',
    lineHeight: 1.8,
    letterSpacing: '0.01em',
    fontFamily: 'Calligraffitti, cursive',
    maxWidth: '800px',
    margin: '0 auto',
  },
  divider: {
    width: '100px',
    height: '1px',
    backgroundColor: '#E5E0D8',
    margin: '4rem auto',
  },
};

export default Guides;