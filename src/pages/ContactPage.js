import React from 'react';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

function ContactPage() {
  return (
    <PageTransition>
      <div style={styles.page}>
        <div style={styles.spacer} />
        <Contact />
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

export default ContactPage;