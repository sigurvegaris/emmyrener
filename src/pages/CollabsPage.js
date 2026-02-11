import React from 'react';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

function CollabsPage() {
  return (
    <PageTransition>
      <section style={styles.section}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Collabs</h1>
          
          <p style={styles.text}>
            Want to work with Emmy? Contact me at{' '}
            <a 
              href="mailto:emmy@sophisticatedspreads.net" 
              style={styles.emailLink}
              onMouseEnter={(e) => e.target.style.color = '#6d5940'}
              onMouseLeave={(e) => e.target.style.color = '#8B7355'}
            >
              emmy@sophisticatedspreads.net
            </a>
            {' '}for all social media needs including content creation, brand partnerships, user generated content and more!
          </p>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8rem 2rem 4rem 2rem',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 300,
    color: '#111111',
    letterSpacing: '0.05em',
    marginBottom: '2.5rem',
    fontFamily: 'Calligraffitti, cursive',
  },
  text: {
    fontSize: '1.25rem',
    fontWeight: 400,
    color: '#111111',
    lineHeight: 1.8,
    letterSpacing: '0.01em',
    fontFamily: 'Calligraffitti, cursive',
  },
  emailLink: {
    color: '#8B7355',
    fontWeight: 600,
    textDecoration: 'underline',
    transition: 'color 0.3s ease',
  },
};

export default CollabsPage;