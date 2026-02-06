import React from 'react';

function Contact() {
  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        {/* Section intro */}
        <div style={styles.header}>
          <p style={styles.eyebrow}>Get in Touch</p>
          <h2 style={styles.heading}>Let's Connect</h2>
          <p style={styles.subheading}>
            Questions about the guides? Want to share your Paris experience? I'd love to hear from you.
          </p>
        </div>

        {/* Contact options */}
        <div style={styles.contactGrid}>
          {/* Instagram */}
          <a 
            href="https://instagram.com/emmyrener" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.contactCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}
          >
            <div style={styles.iconCircle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Instagram</h3>
            <p style={styles.cardDescription}>
              Follow for daily Paris insider tips and beautiful moments
            </p>
            <span style={styles.cardHandle}>@emmyrener</span>
          </a>

          {/* Email */}
          <a 
            href="mailto:emmy@sophisticatedspreads.net"
            style={styles.contactCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}
          >
            <div style={styles.iconCircle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Email</h3>
            <p style={styles.cardDescription}>
              For collaboration inquiries or questions about the guides
            </p>
            <span style={styles.cardHandle}>emmy@sophisticatedspreads.net</span>
          </a>
        </div>

        {/* Newsletter signup (optional) */}
        <div style={styles.newsletterSection}>
          <h3 style={styles.newsletterHeading}>Stay Updated</h3>
          <p style={styles.newsletterText}>
            Get notified when new guides are released and receive exclusive Paris tips
          </p>
          <div style={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={styles.emailInput}
            />
            <button 
              style={styles.subscribeButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6d5940'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            © 2025 Emmy Rener. Made with ♡ in Paris.
          </p>
          <div style={styles.footerLinks}>
            <a href="#hero" style={styles.footerLink}>Back to Top</a>
            <span style={styles.footerDivider}>•</span>
            <a href="#guides" style={styles.footerLink}>Guides</a>
            <span style={styles.footerDivider}>•</span>
            <a href="#recommendations" style={styles.footerLink}>Recommendations</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#FAF7F2',
    padding: '8rem 3rem 4rem 3rem',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '5rem',
  },
  eyebrow: {
    color: '#8B7355',
    fontSize: '0.8125rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  heading: {
    color: '#111111',
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 300,
    letterSpacing: '0.05em',
    marginBottom: '1.5rem',
    fontFamily: 'Cormorant Garamond, serif',
  },
  subheading: {
    color: '#111111',
    fontSize: '1.125rem',
    fontWeight: 400,
    lineHeight: 1.7,
    opacity: 0.85,
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '6rem',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    padding: '3rem 2rem',
    borderRadius: '8px',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  iconCircle: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#F7F4EF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    color: '#111111',
    fontSize: '1.5rem',
    fontWeight: 400,
    marginBottom: '0.75rem',
    fontFamily: 'Cormorant Garamond, serif',
  },
  cardDescription: {
    color: '#111111',
    fontSize: '0.9375rem',
    fontWeight: 400,
    lineHeight: 1.6,
    marginBottom: '1rem',
    opacity: 0.8,
  },
  cardHandle: {
    color: '#8B7355',
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
  },
  newsletterSection: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    marginBottom: '4rem',
  },
  newsletterHeading: {
    color: '#111111',
    fontSize: '1.75rem',
    fontWeight: 400,
    marginBottom: '1rem',
    fontFamily: 'Cormorant Garamond, serif',
  },
  newsletterText: {
    color: '#111111',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.7,
    marginBottom: '2rem',
    opacity: 0.85,
  },
  newsletterForm: {
    display: 'flex',
    gap: '1rem',
    maxWidth: '500px',
    margin: '0 auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emailInput: {
    flex: '1 1 300px',
    padding: '1rem 1.5rem',
    fontSize: '1rem',
    border: '2px solid #E5E0D8',
    borderRadius: '4px',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'border-color 0.3s ease',
    outline: 'none',
  },
  subscribeButton: {
    backgroundColor: '#8B7355',
    color: '#F7F4EF',
    padding: '1rem 2.5rem',
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Cormorant Garamond, serif',
  },
  footer: {
    textAlign: 'center',
    paddingTop: '3rem',
    borderTop: '1px solid rgba(139, 115, 85, 0.2)',
  },
  footerText: {
    color: '#111111',
    fontSize: '0.9375rem',
    fontWeight: 400,
    marginBottom: '1rem',
    opacity: 0.8,
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#8B7355',
    fontSize: '0.875rem',
    fontWeight: 400,
    textDecoration: 'none',
    transition: 'opacity 0.3s ease',
  },
  footerDivider: {
    color: '#8B7355',
    opacity: 0.5,
  },
};

export default Contact;