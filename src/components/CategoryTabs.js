import React from 'react';

function CategoryTabs({ activeTab, setActiveTab, isMobile }) {
  return (
    <div style={styles.wrapper}>
      <p style={styles.instructions}>
        Tap a category to see Emmy's recommendations
      </p>
      
      <div style={styles.grid}>
        {/* First two tabs side by side */}
        <button
          onClick={() => setActiveTab('experiences')}
          style={{
            ...styles.button,
            backgroundColor: activeTab === 'experiences' ? '#8B7355' : '#e9dfd4',
            color: activeTab === 'experiences' ? '#FFFFFF' : '#5a4a3a',
          }}
        >
          {isMobile ? 'Experiences' : 'Classes & Experiences'}
        </button>
        
        <button
          onClick={() => setActiveTab('shopping')}
          style={{
            ...styles.button,
            backgroundColor: activeTab === 'shopping' ? '#8B7355' : '#e9dfd4',
            color: activeTab === 'shopping' ? '#FFFFFF' : '#5a4a3a',
          }}
        >
          {isMobile ? 'Shopping' : 'Shopping Recommendations'}
        </button>
        
        {/* Third tab full width */}
        <button
          onClick={() => setActiveTab('pharmacy')}
          style={{
            ...styles.button,
            ...styles.fullWidthButton,
            backgroundColor: activeTab === 'pharmacy' ? '#8B7355' : '#e9dfd4',
            color: activeTab === 'pharmacy' ? '#FFFFFF' : '#5a4a3a',
          }}
        >
          {isMobile ? 'Pharmacy' : 'Pharmacy Recommendations'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    textAlign: 'center',
    margin: '2rem auto 2.25rem auto',
    padding: '0 1.25rem',
    maxWidth: '600px',
  },
  instructions: {
    fontSize: '0.875rem',
    color: '#666666',
    marginBottom: '1.25rem',
    fontFamily: 'Lora, serif',
    fontWeight: 400,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
  },
  button: {
    height: '48px',
    border: '1px solid #e9dfd4',
    borderRadius: '12px',
    fontSize: '0.9375rem',
    fontWeight: 600,
    fontFamily: 'Lora, serif',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
  },
  fullWidthButton: {
    gridColumn: '1 / -1',
  },
};

export default CategoryTabs;