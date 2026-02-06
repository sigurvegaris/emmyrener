import React, { useState } from 'react';

function CameraEntry({ onCapture }) {
  const [focusing, setFocusing] = useState(false);
  const [captured, setCaptured] = useState(false);

  const handleCapture = () => {
    setFocusing(true);
    
    // Focus animation
    setTimeout(() => {
      setFocusing(false);
      setCaptured(true);
    }, 1000);
    
    // Reveal site
    setTimeout(() => {
      onCapture();
    }, 1500);
  };

  return (
    <div style={styles.container}>
      {/* Camera viewfinder */}
      <div style={styles.viewfinder}>
        {/* Emmy photo (zoomed out initially) */}
        <div 
          style={{
            ...styles.photo,
            transform: focusing ? 'scale(2.5)' : 'scale(1)',
            filter: focusing ? 'blur(0px)' : 'blur(2px)',
          }}
        />

        {/* Camera overlay UI */}
        <div style={styles.cameraUI}>
          {/* Top bar */}
          <div style={styles.topBar}>
            <div style={styles.cameraInfo}>
              <span style={styles.infoText}>AUTO</span>
              <span style={styles.infoText}>AWB</span>
            </div>
            <div style={styles.cameraInfo}>
              <span style={styles.infoText}>ISO 400</span>
              <span style={styles.infoText}>1/250</span>
            </div>
          </div>

          {/* Focus squares */}
          <div style={styles.focusSquares}>
            <div style={{...styles.focusSquare, top: '30%', left: '40%'}} />
            <div style={{...styles.focusSquare, top: '45%', left: '48%', ...styles.focusSquareActive}} />
            <div style={{...styles.focusSquare, top: '60%', left: '55%'}} />
          </div>

          {/* Center focus point */}
          <div style={styles.centerFocus}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="28" stroke={focusing ? '#4CAF50' : 'white'} strokeWidth="2" fill="none" opacity="0.8"/>
              <line x1="30" y1="5" x2="30" y2="15" stroke={focusing ? '#4CAF50' : 'white'} strokeWidth="2" opacity="0.8"/>
              <line x1="30" y1="45" x2="30" y2="55" stroke={focusing ? '#4CAF50' : 'white'} strokeWidth="2" opacity="0.8"/>
              <line x1="5" y1="30" x2="15" y2="30" stroke={focusing ? '#4CAF50' : 'white'} strokeWidth="2" opacity="0.8"/>
              <line x1="45" y1="30" x2="55" y2="30" stroke={focusing ? '#4CAF50' : 'white'} strokeWidth="2" opacity="0.8"/>
            </svg>
          </div>

          {/* Bottom bar */}
          <div style={styles.bottomBar}>
            <div style={styles.captureSection}>
              <button 
                onClick={handleCapture} 
                style={styles.captureButton}
                disabled={focusing || captured}
              >
                <div style={styles.captureButtonInner} />
              </button>
              <p style={styles.captureText}>TAP TO CAPTURE</p>
            </div>
          </div>

          {/* Grid lines */}
          <div style={styles.gridLines}>
            <div style={{...styles.gridLine, top: '33.33%', width: '100%', height: '1px'}} />
            <div style={{...styles.gridLine, top: '66.66%', width: '100%', height: '1px'}} />
            <div style={{...styles.gridLine, left: '33.33%', width: '1px', height: '100%'}} />
            <div style={{...styles.gridLine, left: '66.66%', width: '1px', height: '100%'}} />
          </div>
        </div>

        {/* Flash effect when captured */}
        {captured && <div style={styles.flash} />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  viewfinder: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  photo: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(/videos/emmy3.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  cameraUI: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  topBar: {
    position: 'absolute',
    top: '2rem',
    left: '2rem',
    right: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cameraInfo: {
    display: 'flex',
    gap: '1rem',
  },
  infoText: {
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: 500,
    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
    fontFamily: 'monospace',
  },
  focusSquares: {
    position: 'absolute',
    inset: 0,
  },
  focusSquare: {
    position: 'absolute',
    width: '40px',
    height: '40px',
    border: '1px solid rgba(255,255,255,0.4)',
    transform: 'translate(-50%, -50%)',
  },
  focusSquareActive: {
    border: '2px solid rgba(76, 175, 80, 0.8)',
    boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)',
  },
  centerFocus: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  bottomBar: {
    position: 'absolute',
    bottom: '3rem',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  captureSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    pointerEvents: 'auto',
  },
  captureButton: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '4px solid white',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  },
  captureButtonInner: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'white',
  },
  captureText: {
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
    fontFamily: 'monospace',
  },
  gridLines: {
    position: 'absolute',
    inset: 0,
    opacity: 0.3,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'white',
  },
  flash: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'white',
    animation: 'flash 0.3s ease-out',
  },
};

export default CameraEntry;