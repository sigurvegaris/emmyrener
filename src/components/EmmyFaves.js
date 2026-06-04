import React from 'react';
import './EmmyFaves.css';

function EmmyFaves() {
  return (
    <section className="emmys-faves-section">
      <div className="emmys-faves-container">
        {/* Header */}
        <div className="emmys-faves-header">
          <h2 className="emmys-faves-title">Emmy's Curated Collection</h2>
          <div className="emmys-faves-divider"></div>
          <p className="emmys-faves-subtitle">
            A carefully selected collection of pieces I've discovered and genuinely love
          </p>
        </div>

        {/* Content Grid */}
        <div className="emmys-faves-content">
          {/* Image Section */}
          <div className="emmys-faves-image-container">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600" 
              alt="Emmy's Curated Collection"
              className="emmys-faves-image"
            />
          </div>

          {/* Text Section */}
          <div className="emmys-faves-text-box">
            <h3 className="emmys-faves-text-title">Thoughtfully Chosen</h3>
            
            <p className="emmys-faves-text-paragraph">
              Beyond my Paris guides, I've curated a collection of objects and finds that have earned a permanent place in my life. Each piece represents a moment of discovery—whether found in a Parisian boutique or a trusted source back home.
            </p>

            <p className="emmys-faves-text-paragraph">
              There's no algorithm here, only authentic recommendations. I feature items because they bring me genuine joy and have passed the test of time in my everyday life.
            </p>

            <div className="emmys-faves-highlight">
              <p className="emmys-faves-highlight-text">
                Use code <span className="emmys-faves-code">EMMY15</span> for an exclusive discount on your first order
              </p>
            </div>

            <a 
              href="https://shopmy.us/shop/emmyrener?Section_id=2787730&tab=collections"
              target="_blank"
              rel="noopener noreferrer"
              className="emmys-faves-cta-button"
            >
              Explore Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmmyFaves;