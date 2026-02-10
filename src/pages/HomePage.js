import React from 'react';
import { Link } from 'react-router-dom';
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
      {/* My Guides Button */}
      <div style={{
        backgroundColor: '#F7F4EF',
        padding: '3rem 2rem',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Link 
          to="/guides"
          style={{
            display: 'inline-block',
            backgroundColor: '#8B7355',
            color: '#F7F4EF',
            fontSize: '1.25rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textAlign: 'center',
            textDecoration: 'none',
            padding: '1.25rem 3rem',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 6px 20px rgba(139, 115, 85, 0.3)',
            border: 'none',
            fontFamily: 'Calligraffitti, cursive',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#6d5940';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#8B7355';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          My Guides to Paris →
        </Link>
      </div>
      <Featured />
      <Reviews />
      <Footer />
    </PageTransition>
  );
}

export default HomePage;