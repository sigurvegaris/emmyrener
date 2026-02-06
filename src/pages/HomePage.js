import React from 'react';
import Hero from '../components/Hero';
import Bridge from '../components/Bridge';
import Featured from '../components/Featured';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Bridge />
      <Featured />
      <Reviews />
      <Footer />
    </PageTransition>
  );
}

export default HomePage;