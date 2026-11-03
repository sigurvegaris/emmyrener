import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RetreatSignupForm.css';

const ROOM_OPTIONS = ['Private room', 'Shared room', 'Not sure yet'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAIL_MS = 3600; // length of the envelope animation in RetreatSignupForm.css

// Interest-list sign-up: a simple, classic form. Posts to /api/retreat-signup; on success the note is
// tucked into an airmail envelope and flown off, then the visitor lands on /retreats/merci.
function RetreatSignupForm() {
  const navigate = useNavigate();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('Not sure yet');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot, left empty by real visitors
  const [status, setStatus] = useState('idle'); // idle | sending | mailing | error
  const [error, setError] = useState('');
  const [hints, setHints] = useState({});
  const refs = { first: useRef(null), last: useRef(null), email: useRef(null), consent: useRef(null) };
  const wrapRef = useRef(null);

  // Once the envelope has flown off, go to the thank-you page.
  useEffect(() => {
    if (status !== 'mailing') return undefined;
    if (wrapRef.current) wrapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => {
      navigate(`/retreats/merci?name=${encodeURIComponent(first.trim())}`);
    }, reduce ? 0 : MAIL_MS);
    return () => window.clearTimeout(t);
  }, [status, first, navigate]);

  const validate = () => {
    const next = {};
    if (!first.trim()) next.first = 'We’d love to know what to call you.';
    if (!last.trim()) next.last = 'Your last name helps us find you on the guest list.';
    if (!email.trim()) next.email = 'Where should Emmy & Hannah send the news?';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'That address looks a little off. Mind giving it another look?';
    if (!consent) next.consent = 'Tick the box so we have your blessing to write to you.';
    setHints(next);
    const firstBad = ['first', 'last', 'email', 'consent'].find((k) => next[k]);
    if (firstBad && refs[firstBad].current) refs[firstBad].current.focus();
    return !firstBad;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/retreat-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${first.trim()} ${last.trim()}`,
          email: email.trim(),
          room,
          message,
          website,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('mailing');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const clearHint = (field) => hints[field] && setHints((h) => ({ ...h, [field]: undefined }));

  const field = (key, label, value, set, props = {}) => (
    <div className="sf-field">
      <label className="sf-label" htmlFor={`retreat-${key}`}>{label}</label>
      <input
        id={`retreat-${key}`}
        ref={refs[key]}
        className={`sf-input${hints[key] ? ' sf-input-flag' : ''}`}
        value={value}
        onChange={(e) => {
          set(e.target.value);
          clearHint(key);
        }}
        aria-invalid={hints[key] ? 'true' : undefined}
        aria-describedby={hints[key] ? `retreat-${key}-hint` : undefined}
        {...props}
      />
      {hints[key] && <p className="sf-hint" id={`retreat-${key}-hint`}>{hints[key]}</p>}
    </div>
  );

  const mailing = status === 'mailing';

  return (
    <div className={`sf-wrap${mailing ? ' sf-mailing' : ''}`} ref={wrapRef}>
      <form className="sf" onSubmit={submit} noValidate aria-hidden={mailing ? 'true' : undefined}>
        <div className="sf-row">
          {field('first', 'First name', first, setFirst, { type: 'text', autoComplete: 'given-name', maxLength: 40 })}
          {field('last', 'Last name', last, setLast, { type: 'text', autoComplete: 'family-name', maxLength: 40 })}
        </div>
        {field('email', 'Email', email, setEmail, { type: 'email', autoComplete: 'email', inputMode: 'email' })}

        <fieldset className="sf-field sf-rooms">
          <legend className="sf-label">Which room are you dreaming of?</legend>
          <div className="sf-chips">
            {ROOM_OPTIONS.map((o) => (
              <label key={o} className={`sf-chip${room === o ? ' sf-chip-on' : ''}`}>
                <input type="radio" name="room" value={o} checked={room === o} onChange={() => setRoom(o)} />
                {o}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sf-field">
          <label className="sf-label" htmlFor="retreat-message">
            Anything you’d like us to know? <span className="sf-optional">(optional)</span>
          </label>
          <textarea
            id="retreat-message"
            className="sf-input sf-textarea"
            rows={3}
            maxLength={1000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Travelling with a friend, a dietary need, what you’re most excited for…"
          />
        </div>

        <label className={`sf-consent${hints.consent ? ' sf-consent-flag' : ''}`}>
          <input
            ref={refs.consent}
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              clearHint('consent');
            }}
            aria-describedby={hints.consent ? 'retreat-consent-hint' : undefined}
          />
          <span>Yes, Emmy &amp; Hannah may email me about Bon Vivant Summer.</span>
        </label>
        {hints.consent && <p className="sf-hint" id="retreat-consent-hint">{hints.consent}</p>}

        {/* Honeypot: hidden from people, tempting to bots */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sf-honey"
        />

        {status === 'error' && <p className="sf-hint sf-error" role="alert">{error}</p>}

        <button type="submit" className="sf-submit" disabled={status === 'sending' || mailing}>
          {status === 'sending' || mailing ? 'Sending…' : 'Join the interest list'}
        </button>
      </form>

      {/* The send-off: the note is tucked into an airmail envelope, sealed, and flown away */}
      {mailing && (
        <div className="sf-scene" aria-hidden="true">
          <div className="env">
            <div className="env-back" />
            <div className="env-letter">
              <span className="env-script">Chères Emmy &amp; Hannah,</span>
              <i />
              <i />
              <i />
              <span className="env-script env-letter-sig">{first.trim()}</span>
            </div>
            <div className="env-front" />
            <div className="env-flap" />
            <div className="env-seal">
              <span>E&amp;H</span>
            </div>
          </div>
        </div>
      )}
      {mailing && (
        <p className="sf-honey" role="status">
          Sent! Your note is on its way.
        </p>
      )}
    </div>
  );
}

export default RetreatSignupForm;
