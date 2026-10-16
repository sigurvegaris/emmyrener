import React, { useEffect, useRef, useState } from 'react';
import './RetreatSignupForm.css';

const ROOM_OPTIONS = ['Private room', 'Shared room', 'Not sure yet'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAIL_MS = 3600; // length of the envelope animation in RetreatSignupForm.css

// Interest-list sign-up as a postcard: a "Greetings from Provence" front that flips over to
// a writable back. On send it is tucked into an airmail envelope, sealed and flown off, then a
// thank-you note takes its place. Posts to /api/retreat-signup.
function RetreatSignupForm() {
  const [flipped, setFlipped] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('Not sure yet');
  const [website, setWebsite] = useState(''); // honeypot, left empty by real visitors
  const [status, setStatus] = useState('idle'); // idle | sending | mailing | done | error
  const [error, setError] = useState('');
  const [hints, setHints] = useState({});
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const flipBtnRef = useRef(null);
  const noteRef = useRef(null);
  const cardRef = useRef(null);

  const flip = (to) => {
    setFlipped(to);
    // Move focus to the face that just became visible.
    window.setTimeout(() => {
      if (to && nameRef.current) nameRef.current.focus({ preventScroll: true });
      if (!to && flipBtnRef.current) flipBtnRef.current.focus({ preventScroll: true });
    }, 450);
  };

  // Once the envelope has flown off, show the thank-you note.
  useEffect(() => {
    if (status !== 'mailing') return undefined;
    // Centre the card so the envelope is on screen, even when the tall phone layout was scrolled to Send.
    if (cardRef.current) cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => setStatus('done'), reduce ? 0 : MAIL_MS);
    return () => window.clearTimeout(t);
  }, [status]);

  useEffect(() => {
    if (status === 'done' && noteRef.current) {
      noteRef.current.focus({ preventScroll: true });
      noteRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Sign with your first name, so we know who it’s from.';
    if (!email.trim()) next.email = 'Add your email so we can write back.';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'That address doesn’t look quite right.';
    setHints(next);
    if (next.name && nameRef.current) nameRef.current.focus();
    else if (next.email && emailRef.current) emailRef.current.focus();
    return !next.name && !next.email;
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
        body: JSON.stringify({ name, email, room, website }),
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

  const first = name.trim();

  if (status === 'done') {
    return (
      <div className="pc">
        <div className="pc-note" role="status" tabIndex={-1} ref={noteRef}>
          <svg className="pc-note-tower" viewBox="0 0 60 120" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
              <path d="M30 4 L30 14 M27 14 H33 L35 34 H25 Z" />
              <path d="M25 34 L21 62 H39 L35 34" />
              <path d="M18 62 H42 M21 62 L12 112 M39 62 L48 112" />
              <path d="M16 90 H44 M18 90 Q30 74 42 90" />
              <path d="M12 112 H22 Q30 96 38 112 H48" />
              <path d="M23 46 L37 46 M26 40 L34 52 M34 40 L26 52" strokeWidth="0.8" />
            </g>
          </svg>
          <p className="pc-note-kicker">Your letter is on its way to Provence</p>
          <p className="pc-note-title">Merci{first ? `, ${first}` : ''}</p>
          <p className="pc-note-body">
            We are so happy you wrote. We will be saving a seat at our long table for you. It is not official until
            booking opens, but you are one step closer to seeing your name on it, and you will be among the very first
            to hear about the dates, the villa, and everything we have planned for Bon Vivant Summer.
          </p>
          <p className="pc-note-body">A little note from us is already waiting in your inbox (do peek in spam, just in case).</p>
          <p className="pc-note-sign">
            À très bientôt,
            <span>Emmy &amp; Hannah</span>
          </p>
        </div>
      </div>
    );
  }

  const mailing = status === 'mailing';

  return (
    <div
      ref={cardRef}
      className={`pc${mailing ? ' pc-mailing' : ''}`}
      style={{
        '--pc-photo': 'url(/videos/retreat-banner.webp)',
        '--pc-front': 'url(/videos/pc-paper-front.jpg)',
        '--pc-back': 'url(/videos/pc-paper-back.jpg)',
      }}
    >
      <div className={`pc-inner${flipped ? ' pc-flipped' : ''}`} aria-hidden={mailing || undefined}>
        {/* FRONT */}
        <div className="pc-face pc-front" inert={flipped || mailing} aria-hidden={flipped}>
          <div className="pc-paper pc-front-paper">
            <p className="pc-greetings">Greetings from</p>
            <p className="pc-photo-title">PROVENCE</p>
            <p className="pc-front-sub">Bon Vivant Summer &middot; [Month] 2027</p>
            <p className="pc-front-note">Summer camp for grown-ups. Rosé included.</p>
            <button type="button" className="pc-write" ref={flipBtnRef} onClick={() => flip(true)}>
              Write your note
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </div>

        {/* BACK */}
        <div className="pc-face pc-back" inert={!flipped || mailing} aria-hidden={!flipped}>
          <div className="pc-paper pc-back-paper">
            <form className="pc-form" onSubmit={submit} noValidate>
              {/* Message side */}
              <div className="pc-left">
                <p className="pc-script pc-dear">Chères Emmy &amp; Hannah,</p>
                <p className="pc-msg">
                  Save me a seat at the long table. I would love to be the very first to hear about Bon Vivant Summer,
                  and I simply cannot wait to see you in Provence.
                </p>
                <label className="pc-label" htmlFor="retreat-name">My first name</label>
                <input
                  id="retreat-name"
                  ref={nameRef}
                  className={`pc-input${hints.name ? ' pc-input-flag' : ''}`}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearHint('name');
                  }}
                  maxLength={80}
                  autoComplete="given-name"
                  aria-invalid={hints.name ? 'true' : undefined}
                  aria-describedby={hints.name ? 'retreat-name-hint' : undefined}
                />
                {hints.name && (
                  <p className="pc-hint" id="retreat-name-hint">{hints.name}</p>
                )}
                <p className="pc-love">
                  Bisous,
                  <span className="pc-script pc-signature">{first || ' '}</span>
                </p>
              </div>

              <div className="pc-divider" aria-hidden="true" />

              {/* Address side */}
              <div className="pc-right">
                <div className="pc-postage" aria-hidden="true">
                  <svg className="pc-postmark" viewBox="0 0 220 110">
                    <g fill="none" stroke="#3e4a6a" strokeWidth="1.6" opacity="0.55">
                      <circle cx="160" cy="55" r="44" />
                      <circle cx="160" cy="55" r="37" strokeWidth="0.8" />
                      <path d="M0 34 q 12 -9 24 0 t 24 0 t 24 0 t 24 0" />
                      <path d="M0 52 q 12 -9 24 0 t 24 0 t 24 0 t 24 0" />
                      <path d="M0 70 q 12 -9 24 0 t 24 0 t 24 0 t 24 0" />
                    </g>
                    <g fill="#3e4a6a" opacity="0.6" fontFamily="Cormorant Garamond, serif" textAnchor="middle">
                      <text x="160" y="48" fontSize="13" letterSpacing="3">PARIS</text>
                      <text x="160" y="62" fontSize="8" letterSpacing="1.5">14 · VII · 27</text>
                      <text x="160" y="74" fontSize="7" letterSpacing="1.5">R.F.</text>
                    </g>
                  </svg>
                  {/* Lavender: Provence */}
                  <svg className="pc-stamp pc-stamp-back" viewBox="0 0 90 108">
                    <rect x="4" y="4" width="82" height="100" fill="#fbf6ee" stroke="#fffdf8" strokeWidth="8" strokeDasharray="6 6" />
                    <rect x="12" y="12" width="66" height="84" fill="#ece4f0" stroke="#8b7355" strokeWidth="0.8" />
                    <g stroke="#6f8a5c" strokeWidth="1.6" strokeLinecap="round" fill="none">
                      <path d="M45 86 C45 70 44 56 45 38" />
                      <path d="M45 72 C39 68 35 64 33 58" />
                      <path d="M45 64 C51 60 55 56 57 50" />
                    </g>
                    <g fill="#7b62a3">
                      <ellipse cx="45" cy="30" rx="3.4" ry="6" />
                      <ellipse cx="40" cy="37" rx="3.4" ry="6" transform="rotate(-20 40 37)" />
                      <ellipse cx="50" cy="37" rx="3.4" ry="6" transform="rotate(20 50 37)" />
                      <ellipse cx="39" cy="47" rx="3.4" ry="6" transform="rotate(-24 39 47)" />
                      <ellipse cx="51" cy="47" rx="3.4" ry="6" transform="rotate(24 51 47)" />
                    </g>
                    <text x="45" y="93" textAnchor="middle" fontSize="7" letterSpacing="1.4" fill="#5a4128" fontFamily="Cormorant Garamond, serif">PROVENCE</text>
                  </svg>
                  {/* Eiffel Tower: Paris */}
                  <svg className="pc-stamp pc-stamp-front" viewBox="0 0 90 108">
                    <rect x="4" y="4" width="82" height="100" fill="#fbf6ee" stroke="#fffdf8" strokeWidth="8" strokeDasharray="6 6" />
                    <rect x="12" y="12" width="66" height="84" fill="#e3e8f0" stroke="#8b7355" strokeWidth="0.8" />
                    <g fill="none" stroke="#2c3550" strokeWidth="1.1" strokeLinejoin="round">
                      <path d="M45 20 V26 M43.5 26 H46.5 L47.5 38 H42.5 Z" />
                      <path d="M42.5 38 L40.5 52 H49.5 L47.5 38" />
                      <path d="M39 52 H51 M40.5 52 L35 80 M49.5 52 L55 80" />
                      <path d="M37.5 67 H52.5 M38.5 67 Q45 58 51.5 67" />
                      <path d="M35 80 H40 Q45 71 50 80 H55" />
                    </g>
                    <text x="45" y="92" textAnchor="middle" fontSize="7" letterSpacing="1.4" fill="#2c3550" fontFamily="Cormorant Garamond, serif">PARIS · 2,27€</text>
                  </svg>
                </div>
                <p className="pc-avion" aria-hidden="true">
                  <span>Par avion</span> By air mail
                </p>

                <label className="pc-label" htmlFor="retreat-email">Send the news to</label>
                <input
                  id="retreat-email"
                  ref={emailRef}
                  className={`pc-input${hints.email ? ' pc-input-flag' : ''}`}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearHint('email');
                  }}
                  autoComplete="email"
                  placeholder="your email"
                  aria-invalid={hints.email ? 'true' : undefined}
                  aria-describedby={hints.email ? 'retreat-email-hint' : undefined}
                />
                {hints.email && (
                  <p className="pc-hint" id="retreat-email-hint">{hints.email}</p>
                )}

                <fieldset className="pc-rooms">
                  <legend className="pc-label">I&rsquo;m dreaming of a&hellip;</legend>
                  {ROOM_OPTIONS.map((o) => (
                    <label key={o} className={`pc-chip${room === o ? ' pc-chip-on' : ''}`}>
                      <input
                        type="radio"
                        name="room"
                        value={o}
                        checked={room === o}
                        onChange={() => setRoom(o)}
                      />
                      {o}
                    </label>
                  ))}
                </fieldset>

                {/* Honeypot: hidden from people, tempting to bots */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pc-honey"
                />

                {status === 'error' && (
                  <p className="pc-hint pc-error" role="alert">{error}</p>
                )}

                <div className="pc-actions">
                  <button type="submit" className="pc-seal" disabled={status === 'sending' || mailing}>
                    <span className="pc-seal-main">{status === 'sending' ? 'Sending' : 'Send'}</span>
                    <span className="pc-seal-sub">{status === 'sending' ? '…' : 'with love'}</span>
                  </button>
                  <p className="pc-fine">Free to join. No commitment to book.</p>
                </div>
              </div>
            </form>

            <button type="button" className="pc-flip-back" onClick={() => flip(false)}>
              <span aria-hidden="true">&larr; </span>See the front
            </button>
          </div>
        </div>
      </div>

      {/* The send-off: the note is tucked into an airmail envelope, sealed, and flown away */}
      {mailing && (
        <div className="pc-scene" aria-hidden="true">
          <div className="env">
            <div className="env-back" />
            <div className="env-letter">
              <span className="pc-script">Chères Emmy &amp; Hannah,</span>
              <i />
              <i />
              <i />
              <span className="pc-script env-letter-sig">{first}</span>
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
        <p className="rt-sr" role="status">
          Sent! Your note is on its way.
        </p>
      )}
    </div>
  );
}

export default RetreatSignupForm;
