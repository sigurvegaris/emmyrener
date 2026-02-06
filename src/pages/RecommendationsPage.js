import React from 'react';
import RecommendationsPageComponent from '../components/RecommendationsPage';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

function RecommendationsPage() {
  return (
    <PageTransition>
      <div style={styles.page}>
        <div style={styles.spacer} />
        <RecommendationsPageComponent />
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

export default RecommendationsPage;