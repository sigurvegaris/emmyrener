import React, { useMemo, useState } from 'react';

function Recommendations() {
  const categories = [
    { id: 'experiences', label: 'Classes & Experiences' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'pharmacy', label: 'Pharmacy' },
  ];

  const [activeCategory, setActiveCategory] = useState('experiences');
  const [openPerkId, setOpenPerkId] = useState(null);

  // Replace these with Emmy’s final phrasing + links later.
  const recommendations = useMemo(() => ({
    experiences: [
      {
        id: 'kt-wellness',
        question: 'Need help building your itinerary?',
        description:
          'Meet Kiana, KT Wellness Concierge. Thoughtful planning support so your trip feels effortless.',
        buttonLabel: 'Visit KT Wellness Concierge',
        href: 'https://example.com',
      },
      {
        id: 'cheese-class',
        question: 'Want a Paris experience you’ll actually remember?',
        description:
          'A hands-on class that’s easy to fit between sightseeing and dinner.',
        buttonLabel: 'Browse Classes',
        href: 'https://example.com',
      },
    ],
    shopping: [
      {
        id: 'walk-app',
        question: 'Want to walk around Paris like a local?',
        description:
          'Download the Walk app and save the neighborhoods Emmy always returns to.',
        buttonLabel: 'Download the Walk App',
        href: 'https://example.com',
      },
      {
        id: 'flea-market',
        question: 'Looking for vintage pieces without the overwhelm?',
        description:
          'A few go-to markets and boutiques that are worth the time.',
        buttonLabel: 'Open Shopping List',
        href: 'https://example.com',
      },
    ],
    pharmacy: [
      {
        id: 'pharmacie-monge',
        question: 'Want to visit a French pharmacy?',
        description:
          'Pharmacie Monge Notre Dame is a perfect first stop for skincare staples and easy gifts.',
        buttonLabel: 'Open in Maps',
        href: 'https://example.com',
        perk: {
          label: "Perk: 10% off with Emmy’s code",
          helperText: 'Show this QR code at checkout to receive your discount.',
          // Use an actual image path when you have it (public/qr/pharmacie-monge.png)
          qrSrc: '/images/qr-placeholder.png',
        },
      },
    ],
  }), []);

  const activeList = recommendations[activeCategory] || [];

  const togglePerk = (id) => {
    setOpenPerkId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="recommendations" style={styles.section}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <svg width="60" height="2" style={{ marginBottom: '2rem' }}>
            <line x1="0" y1="1" x2="20" y2="1" stroke="#B7A99A" strokeWidth="1" opacity="0.6" />
            <circle cx="30" cy="1" r="2" fill="#B7A99A" opacity="0.6" />
            <line x1="40" y1="1" x2="60" y2="1" stroke="#B7A99A" strokeWidth="1" opacity="0.6" />
          </svg>

          <h2 style={styles.heading}>Recommendations</h2>
          <p style={styles.subheading}>A few favorites Emmy sends to friends</p>
        </div>

        {/* Category Tabs */}
        <div style={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenPerkId(null);
              }}
              style={{
                ...styles.tab,
                ...(activeCategory === cat.id ? styles.tabActive : {}),
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div style={styles.grid}>
          {activeList.map((rec) => {
            const isPerkOpen = openPerkId === rec.id;

            return (
              <div key={rec.id} style={styles.card}>
                <h3 style={styles.question}>{rec.question}</h3>
                <p style={styles.description}>{rec.description}</p>

                <a
                  href={rec.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.primaryLink}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6d5940')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8B7355')}
                >
                  {rec.buttonLabel}
                </a>

                {/* Perk */}
                {rec.perk && (
                  <div style={styles.perkArea}>
                    <button
                      type="button"
                      onClick={() => togglePerk(rec.id)}
                      style={styles.perkLink}
                    >
                      {rec.perk.label}
                    </button>

                    <div
                      style={{
                        ...styles.perkDrawer,
                        maxHeight: isPerkOpen ? 260 : 0,
                        opacity: isPerkOpen ? 1 : 0,
                        marginTop: isPerkOpen ? '1rem' : 0,
                      }}
                    >
                      <div style={styles.perkDrawerInner}>
                        <img
                          src={rec.perk.qrSrc}
                          alt="Discount QR code"
                          style={styles.qr}
                        />
                        <p style={styles.perkHelper}>{rec.perk.helperText}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={styles.cta}>
          <p style={styles.ctaText}>Want the full list with addresses, tips, and what to order?</p>
          <button style={styles.ctaButton}>Get the Complete Guide</button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#F7F4EF',
    padding: '6rem 2rem',
  },
  container: {
    maxWidth: '1050px',
    margin: '0 auto',
  },

  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
    fontWeight: 300,
    color: '#111111',
    marginBottom: '0.75rem',
    letterSpacing: '0.05em',
    fontFamily: 'Cormorant Garamond, serif',
  },
  subheading: {
    fontSize: '1.05rem',
    fontWeight: 300,
    color: '#8B7355',
    letterSpacing: '0.04em',
  },

  tabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2.5rem',
    flexWrap: 'wrap',
  },
  tab: {
    backgroundColor: 'transparent',
    border: '1px solid #B7A99A',
    color: '#8B7355',
    padding: '0.7rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: 400,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    fontFamily: 'Cormorant Garamond, serif',
  },
  tabActive: {
    backgroundColor: '#8B7355',
    color: '#F7F4EF',
    borderColor: '#8B7355',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '1.5rem',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '6px',
    padding: '2rem',
    borderLeft: '3px solid #B7A99A',
    display: 'flex',
    flexDirection: 'column',
  },

  question: {
    fontSize: '1.55rem',
    fontWeight: 500,
    color: '#111111',
    marginBottom: '0.75rem',
    letterSpacing: '0.02em',
    fontFamily: 'Cormorant Garamond, serif',
    lineHeight: 1.2,
  },
  description: {
    fontSize: '1rem',
    fontWeight: 300,
    color: '#111111',
    lineHeight: 1.7,
    opacity: 0.85,
    marginBottom: '1.25rem',
    maxWidth: '52ch',
  },

  primaryLink: {
    display: 'inline-block',
    backgroundColor: '#8B7355',
    color: '#F7F4EF',
    textDecoration: 'none',
    padding: '0.95rem 1.4rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    fontFamily: 'Cormorant Garamond, serif',
    transition: 'background-color 0.25s ease',
    width: 'fit-content',
  },

  perkArea: {
    marginTop: '1.25rem',
  },
  perkLink: {
    background: 'none',
    border: 'none',
    padding: 0,
    color: '#8B7355',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 400,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    letterSpacing: '0.02em',
    fontFamily: 'Cormorant Garamond, serif',
  },

  perkDrawer: {
    overflow: 'hidden',
    transition: 'all 0.25s ease',
  },
  perkDrawerInner: {
    backgroundColor: '#FAF7F2',
    borderRadius: '6px',
    padding: '1.25rem',
    display: 'flex',
    gap: '1.25rem',
    alignItems: 'center',
    border: '1px solid #E5E0D8',
  },
  qr: {
    width: '140px',
    height: '140px',
    objectFit: 'contain',
    borderRadius: '6px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E0D8',
  },
  perkHelper: {
    margin: 0,
    fontSize: '0.95rem',
    fontWeight: 300,
    color: '#111111',
    lineHeight: 1.6,
    opacity: 0.85,
    maxWidth: '36ch',
  },

  cta: {
    marginTop: '4rem',
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '6px',
  },
  ctaText: {
    fontSize: '1.05rem',
    fontWeight: 300,
    color: '#111111',
    marginBottom: '1.5rem',
  },
  ctaButton: {
    backgroundColor: '#8B7355',
    color: '#F7F4EF',
    border: 'none',
    padding: '1rem 2.25rem',
    fontSize: '0.85rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    cursor: 'pointer',
    transition: 'background-color 0.25s ease',
    fontFamily: 'Cormorant Garamond, serif',
    borderRadius: '6px',
  },
};

export default Recommendations;
