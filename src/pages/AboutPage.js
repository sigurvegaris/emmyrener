import React from 'react';
import About from '../components/About';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

function AboutPage() {
  return (
    <PageTransition>
      <div style={styles.page}>
        <div style={styles.spacer} />
        <About />
        <Footer />
      </div>
    </PageTransition>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FAF7F2',
  },
  spacer: {
    height: '80px',
  },
};

export default AboutPage;