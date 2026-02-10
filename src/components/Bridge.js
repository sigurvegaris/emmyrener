import React from 'react';

function Bridge() {
  return (
    <section style={styles.bridge}>
      <div style={styles.container}>
        {/* Handwritten-style quote */}
        <div style={styles.quoteBlock}>
          <span style={styles.quoteMarkOpen}>"</span>
          <p style={styles.mainText}>
            If a friend asked me where to go in Paris,
          </p>
          <p style={styles.emphasisText}>
            this is exactly what I'd send them.
          </p>
          <span style={styles.quoteMarkClose}>"</span>
        </div>
        
        {/* Signature-style line */}
        <div style={styles.signature}>
          <div style={styles.signatureLine}></div>
          <span style={styles.signatureText}>Emmy</span>
          <div style={styles.signatureLine}></div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  bridge: {
    backgroundColor: '#FAF7F2',
    padding: '4.5rem 2rem',  // Reduced from 6rem
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '650px',  // Reduced from 700px
    margin: '0 auto',
    position: 'relative',
  },
  quoteBlock: {
    position: 'relative',
    padding: '1.5rem 2.5rem',  // Reduced from 2rem 3rem
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    marginBottom: '1.5rem',  // Reduced from 2rem
  },
  quoteMarkOpen: {
    position: 'absolute',
    top: '-10px',
    left: '10px',
    fontSize: '4rem',  // Reduced from 5rem
    color: '#B7A99A',
    fontFamily: 'Cormorant Garamond, serif',
    lineHeight: 1,
    opacity: 0.3,
  },
  quoteMarkClose: {
    position: 'absolute',
    bottom: '-25px',  // Adjusted from -30px
    right: '10px',
    fontSize: '4rem',  // Reduced from 5rem
    color: '#B7A99A',
    fontFamily: 'Cormorant Garamond, serif',
    lineHeight: 1,
    opacity: 0.3,
  },
  mainText: {
    color: '#111111',
    fontSize: '1.5rem',
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: 1.5,
    fontFamily: 'Calligraffitti, cursive',
    margin: '0 0 0.375rem 0',
  },
  emphasisText: {
    color: '#8B7355',
    fontSize: '1.5rem',
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: 1.5,
    fontFamily: 'Calligraffitti, cursive',
    margin: 0,
  },
  signature: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',  // Reduced from 1rem
  },
  signatureLine: {
    width: '50px',  // Reduced from 60px
    height: '1px',
    backgroundColor: '#B7A99A',
    opacity: 0.5,
  },
  signatureText: {
    fontFamily: 'Calligraffitti, cursive',
    fontSize: '1.75rem',
    color: '#8B7355',
    fontWeight: 400,
  },
};

export default Bridge;