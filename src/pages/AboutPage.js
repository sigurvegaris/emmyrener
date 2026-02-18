import React from 'react';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

function AboutPage() {
  return (
    <PageTransition>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.grid}>
            {/* Photo */}
            <div style={styles.imageWrapper}>
              <img
                src="/videos/hero4.jpg"
                alt="Emmy Rener in Paris"
                style={styles.image}
              />
            </div>

            {/* Text */}
            <div style={styles.content}>
              <h1 style={styles.heading}>About Emmy</h1>
              
              <p style={styles.text}>
                Emmy Rener is a California girl who moved to Paris to study abroad in 2024.
                The city swept her off her feet, and so did her French boyfriend!
              </p>
              
              <p style={styles.text}>
                Over numerous trips and now years spent in Paris, she has sourced the crème
                de la crème for you. Whether you're taking a solo trip, coming for a cheese
                exploration, or looking to fall in love (with Paris of course) she has pulled
                together the highlights for you!
              </p>
              
              <p style={styles.text}>
                Follow{' '}
                <a 
                  href="https://instagram.com/emmyrener" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.link}
                  onMouseEnter={(e) => e.target.style.color = '#6d5940'}
                  onMouseLeave={(e) => e.target.style.color = '#8B7355'}
                >
                  @emmyrener
                </a>
                {' '}on Instagram for the most up to date advice, and enjoy the most beautiful city
                in the world!
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </PageTransition>
  );
}

const styles = {
  section: {
    backgroundColor: '#F7F4EF',
    minHeight: '70vh',
    padding: '8rem 2rem 4rem 2rem',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  heading: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 300,
    color: '#111111',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
    fontFamily: 'Lora, serif',
  },
  text: {
    fontSize: '1.125rem',
    fontWeight: 400,
    color: '#111111',
    lineHeight: 1.8,
    letterSpacing: '0.01em',
    fontFamily: 'Lora, serif',
  },
  link: {
    color: '#8B7355',
    fontWeight: 600,
    textDecoration: 'underline',
    transition: 'color 0.3s ease',
  },
};

export default AboutPage;