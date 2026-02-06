import React, { useState } from 'react';

const fadeInUp = `
  @keyframes fadeInUp {
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

// Inject the keyframes into the page
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = fadeInUp;
  document.head.appendChild(styleSheet);
}

function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState('experiences');
  const [showQR, setShowQR] = useState(null);

  const recommendations = {
    experiences: [
      {
        question: "Need help building your itinerary?",
        description: "Meet Kiana KT, wellness concierge, who helps plan your days in Paris so everything flows effortlessly.",
        buttonLabel: "Visit KT Wellness",
        href: "https://www.ktwellnessconcierge.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
        perk: "10% off with Emmy's code"
      },
      {
        question: "Want to walk around Paris like a local?",
        description: "Download Le Walk app and follow the exact neighborhoods Emmy always returns to.",
        buttonLabel: "Download Le Walk",
        href: "https://apps.apple.com/ua/app/le-walk-audio-guides-tours/id6504635876"
      },
      {
        question: "Want to learn how to make real French croissants?",
        description: "Book this hands-on croissant class where you'll actually learn the technique, not just watch.",
        buttonLabel: "Book Croissant Class",
        href: "https://www.viator.com/fr-FR/tours/Paris/Paris-Bakery-Behind-The-Scene/d479-6159P10?pid=P00169719&mcid=42383&medium=link"
      },
      {
        question: "Want to understand French cheese culture?",
        description: "Join this cheesemaking workshop with wine tasting led by an actual expert.",
        buttonLabel: "Book Cheese Workshop",
        href: "https://www.viator.com/fr-FR/tours/Paris/Cheesemaking-workshop-and-wine-and-cheese-tasting-with-an-expert/d479-6838P5?pid=P00169719&mcid=42383&medium=link"
      },
      {
        question: "Want an intensive French cooking experience?",
        description: "Take a class with Susan Herrmann Loomis at On Rue Tatin, one of the most authentic culinary experiences in Paris.",
        buttonLabel: "Explore Classes",
        href: "https://onruetatin.com/",
        perk: "Discount code coming soon"
      },
      {
        question: "Want to hear classical music in a stunning chapel?",
        description: "Experience an opera performance at Sainte-Chapelle, one of Paris's most beautiful Gothic spaces.",
        buttonLabel: "View Performances",
        href: "https://www.sainte-chapelle.fr/agenda/les-heures-musicales-de-la-sainte-chapelle"
      }
    ],
    shopping: [
      {
        question: "Looking for vintage finds and flea markets?",
        description: "Follow Kissa Vintage Paris on Instagram for weekly market updates and the best vintage shopping spots.",
        buttonLabel: "Follow Kissa Vintage",
        href: "https://www.instagram.com/kissavintageparis"
      }
    ],
    pharmacy: [
      {
        question: "Want to visit a French pharmacy?",
        description: "Visit Pharmacie Monge Notre Dame, Emmy's go-to stop for skincare staples and easy gifts.",
        buttonLabel: "Open in Maps",
        href: "https://www.instagram.com/reel/DUIQYL_DJSU/?igsh=bHptb2hzMTZ0bTBo",
        perk: "10% off with QR code",
        qrImage: "/videos/qrcode-pharmacy.png"  // Changed from qrInfo to qrImage
      }
    ]
  };

  const tabs = [
    { id: 'experiences', label: 'Classes & Experiences', shortLabel: 'Experiences' },
    { id: 'shopping', label: 'Shopping Recommendations', shortLabel: 'Shopping' },
    { id: 'pharmacy', label: 'Pharmacy Recommendations', shortLabel: 'Pharmacy' }
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        
        {/* Page Header */}
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Recommendations</h1>
          <p style={styles.pageSubtitle}>
            A few favorite tools, places, and people I recommend to friends visiting Paris.
          </p>
        </div>
{/* Category Tabs */}
<div style={styles.tabsWrapper}>
          <div style={styles.tabsContainer}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab.id ? styles.activeTab : {})
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.backgroundColor = '#E5E0D8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.backgroundColor = '#F7F4EF';
                  }
                }}
              >
                {/* Show short label on mobile, full label on desktop */}
                <span className="tab-full">{tab.label}</span>
                <span className="tab-short">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations Grid */}
        <div 
          key={activeTab}  // Add this - forces re-render and re-animation on tab change
          style={{
            ...styles.grid,
            ...(recommendations[activeTab].length === 1 ? styles.singleCardGrid : {})
          }}
        >
          {recommendations[activeTab].map((rec, index) => (
            <div 
              key={index} 
              style={{
                ...styles.card,
                animationDelay: `${0.1 + (index * 0.1)}s`  // Reduced initial delay
              }}
            >
              
              <div style={styles.cardTop}>
                {/* Question */}
                <h3 style={styles.question}>{rec.question}</h3>
                
                {/* Description */}
                <p style={styles.description}>{rec.description}</p>
              </div>
              
              <div style={styles.cardBottom}>
                {/* Primary Button */}
                <a
                  href={rec.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.button}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#6d5940';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#8B7355';
                  }}
                >
                  {rec.buttonLabel} →
                </a>
                
                {/* Optional Perk */}
                {rec.perk && (
                  <div style={styles.perkSection}>
                    {rec.qrImage ? (
                      <>
                        <button
                          onClick={() => setShowQR(showQR === index ? null : index)}
                          style={styles.perkButton}
                          onMouseEnter={(e) => {
                            e.target.style.color = '#6d5940';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = '#8B7355';
                          }}
                        >
                          Perk: {rec.perk} {showQR === index ? '↑' : '↓'}
                        </button>
                        {showQR === index && (
                          <div style={styles.qrReveal}>
                            <img 
                              src={rec.qrImage} 
                              alt="QR Code for pharmacy discount" 
                              style={styles.qrImage}
                            />
                            <p style={styles.qrText}>Show this QR code at checkout for 10% off</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <p style={styles.perkText}>✨ Perk: {rec.perk}</p>
                    )}
                  </div>
                )}
              </div>
              
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={styles.bottomCTA}>
          <h3 style={styles.bottomHeading}>Have questions about any of these?</h3>
          <p style={styles.bottomText}>
            DM me on Instagram and I'll help you figure out what works for your trip.
          </p>
          <a 
            href="https://instagram.com/emmyrener"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.instagramButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6d5940';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#8B7355';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Message @emmyrener
          </a>
        </div>

      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#FAF7F2',
    padding: '2rem 2rem 4rem 2rem',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  
  // Page Header
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    animation: 'fadeInUp 0.6s ease-out',
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 300,
    color: '#111111',
    marginBottom: '0.75rem',
    fontFamily: 'Cormorant Garamond, serif',
    letterSpacing: '0.02em',
  },
  pageSubtitle: {
    fontSize: '1rem',
    fontWeight: 400,
    color: '#111111',
    opacity: 0.75,
    lineHeight: 1.6,
  },
  
  // Tabs
  tabsWrapper: {
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
    animation: 'fadeInUp 0.6s ease-out 0.1s backwards',  // Slight delay
  },
  tabsContainer: {
    display: 'inline-flex',
    backgroundColor: '#F7F4EF',
    padding: '0.375rem',
    borderRadius: '8px',
    gap: '0.25rem',
    border: '1px solid #E5E0D8',
  },
  tab: {
    border: 'none',
    padding: '0.625rem 1.25rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: '6px',
    letterSpacing: '0.02em',
  },
  activeTab: {
    backgroundColor: '#8B7355',
    color: '#F7F4EF',
  },
  inactiveTab: {
    backgroundColor: '#F7F4EF',
    color: '#111111',
  },
  
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
    justifyItems: 'center',  // Add this - centers items when they don't fill the row
  },
  
  // Card
  card: {
    backgroundColor: '#FFFFFF',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '420px',
    animation: 'fadeInUp 0.6s ease-out backwards',  // Will be set per card
  },
  
  cardTop: {
    marginBottom: '1.5rem',
  },
  
  cardBottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  
  // Question - Editorial size
  question: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#111111',
    lineHeight: 1.25,
    marginBottom: '1rem',
  },
  
  // Description
  description: {
    fontSize: '0.9375rem',
    fontWeight: 400,
    color: '#111111',
    lineHeight: 1.6,
  },
  
  // Button - Subtle, left-aligned
  button: {
    display: 'inline-block',
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    color: '#8B7355',
    padding: '0',
    fontSize: '0.9375rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none',
  },
  
  // Perk Section
  perkSection: {
    marginTop: '0.5rem',
  },
  perkButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#8B7355',
    fontSize: '0.8125rem',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '0',
    textDecoration: 'underline',
    letterSpacing: '0.02em',
    transition: 'color 0.3s ease',
  },
  perkText: {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: '#8B7355',
    letterSpacing: '0.02em',
    margin: 0,
  },
  qrReveal: {
    marginTop: '0.75rem',
    padding: '1rem',
    backgroundColor: '#F7F4EF',
    borderRadius: '6px',
    border: '1px solid #E5E0D8',
  },
  qrText: {
    fontSize: '0.8125rem',
    fontWeight: 400,
    color: '#111111',
    lineHeight: 1.5,
    margin: 0,
    textAlign: 'center',  // Add this
  },
  
  // Bottom CTA
  bottomCTA: {
    textAlign: 'center',
    padding: '2.5rem 2rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    marginTop: '2rem',
    animation: 'fadeInUp 0.6s ease-out 0.4s backwards',
  },
  bottomHeading: {
    fontSize: '1.5rem',
    fontWeight: 400,
    color: '#111111',
    marginBottom: '0.75rem',
    fontFamily: 'Cormorant Garamond, serif',
  },
  bottomText: {
    fontSize: '0.9375rem',
    fontWeight: 400,
    color: '#111111',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  instagramButton: {
    display: 'inline-block',
    backgroundColor: '#8B7355',
    color: '#F7F4EF',
    padding: '1rem 2rem',
    fontSize: '0.9375rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'Cormorant Garamond, serif',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
  },
  qrImage: {
    width: '100%',
    maxWidth: '200px',
    height: 'auto',
    display: 'block',
    margin: '0 auto 1rem auto',
    borderRadius: '4px',
  },
  singleCardGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  
};

export default RecommendationsPage;