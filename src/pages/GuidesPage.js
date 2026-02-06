import React from 'react';
import Guides from '../components/Guides';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

function GuidesPage() {
  return (
    <PageTransition>
      <div style={styles.page}>
        <div style={styles.spacer} />
        <Guides />
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

export default GuidesPage;