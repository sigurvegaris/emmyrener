import React, { useState } from 'react';

const ROOM_OPTIONS = ['Private room', 'Shared room', 'Not sure yet'];

// Interest-list sign-up styled as a postcard. Posts to /api/retreat-signup.
function RetreatSignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('Not sure yet');
  const [website, setWebsite] = useState(''); // honeypot, left empty by real visitors
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/retreat-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, room, website }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('done');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.stamp} aria-hidden="true">
        <span style={styles.stampText}>PROVENCE<br />2027</span>
      </div>
      <div style={styles.postmark} aria-hidden="true">
        AIX-EN-PROVENCE
      </div>

      {status === 'done' ? (
        <div style={styles.thanks}>
          <p style={styles.thanksTitle}>Merci, {name.trim() || 'friend'}!</p>
          <p style={styles.thanksBody}>
            You're on the list. A confirmation with the first details is on its way to your inbox.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} style={styles.form}>
          <p style={styles.salutation}>Dear Emmy &amp; Hannah,</p>
          <p style={styles.line}>Count me in for the first details of Bon Vivant Summer.</p>

          <label style={styles.label} htmlFor="retreat-name">From (first name)</label>
          <input
            id="retreat-name"
            style={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            required
            autoComplete="given-name"
          />

          <label style={styles.label} htmlFor="retreat-email">Send news to (email)</label>
          <input
            id="retreat-email"
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label style={styles.label} htmlFor="retreat-room">Room preference</label>
          <select id="retreat-room" style={styles.input} value={room} onChange={(e) => setRoom(e.target.value)}>
            {ROOM_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          {/* Honeypot: hidden from people, tempting to bots */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
          />

          {status === 'error' && <p style={styles.error} role="alert">{error}</p>}

          <button type="submit" style={styles.button} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Keep me posted'}
          </button>
          <p style={styles.fine}>Joining the interest list is free and doesn't commit you to booking.</p>
        </form>
      )}
    </div>
  );
}

const styles = {
  card: {
    position: 'relative',
    maxWidth: '620px',
    margin: '0 auto',
    padding: '3rem 2.25rem 2.25rem',
    backgroundColor: '#FFFDF8',
    border: '1px solid #E5E0D8',
    borderRadius: '4px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
    transform: 'rotate(-0.6deg)',
    backgroundImage:
      'repeating-linear-gradient(135deg, #C9786A 0 14px, transparent 14px 22px, #6F8FA8 22px 36px, transparent 36px 44px)',
    backgroundSize: '100% 8px',
    backgroundRepeat: 'no-repeat',
  },
  stamp: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    width: '72px',
    height: '84px',
    border: '2px dashed #8B7355',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transform: 'rotate(3deg)',
    backgroundColor: '#F7F4EF',
  },
  stampText: { fontFamily: 'Cormorant Garamond, serif', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#8B7355' },
  postmark: {
    position: 'absolute',
    top: '2.25rem',
    right: '5.75rem',
    fontSize: '0.6rem',
    letterSpacing: '0.12em',
    color: 'rgba(139,115,85,0.7)',
    border: '1.5px solid rgba(139,115,85,0.5)',
    borderRadius: '50%',
    padding: '1.1rem 0.5rem',
    transform: 'rotate(-12deg)',
  },
  form: { display: 'flex', flexDirection: 'column', paddingRight: '0' },
  salutation: { fontFamily: 'Calligraffitti, cursive', fontSize: '1.4rem', color: '#111', margin: '4.5rem 0 0.25rem' },
  line: { fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#111', marginBottom: '1.25rem' },
  label: { fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B7355', marginTop: '0.75rem' },
  input: {
    border: 'none',
    borderBottom: '2px solid #CFC6B8',
    backgroundColor: 'transparent',
    padding: '0.6rem 0.1rem',
    fontSize: '1.125rem',
    fontFamily: 'Cormorant Garamond, serif',
    outline: 'none',
    borderRadius: 0,
  },
  button: {
    marginTop: '1.75rem',
    alignSelf: 'flex-start',
    backgroundColor: '#8B7355',
    color: '#F7F4EF',
    border: 'none',
    borderRadius: '4px',
    padding: '1rem 2.5rem',
    fontSize: '1.125rem',
    fontFamily: 'Calligraffitti, cursive',
    cursor: 'pointer',
  },
  fine: { marginTop: '1.25rem', fontSize: '0.8125rem', fontStyle: 'italic', color: '#111', opacity: 0.7 },
  error: { marginTop: '1rem', color: '#A33', fontSize: '0.9375rem' },
  thanks: { padding: '3rem 0 1rem', textAlign: 'center' },
  thanksTitle: { fontFamily: 'Calligraffitti, cursive', fontSize: '1.9rem', color: '#111', marginBottom: '0.75rem' },
  thanksBody: { fontSize: '1.0625rem', lineHeight: 1.7, color: '#111', opacity: 0.85 },
};

export default RetreatSignupForm;
