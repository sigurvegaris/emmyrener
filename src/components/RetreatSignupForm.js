import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RetreatSignupForm.css';

const ROOM_OPTIONS = ['Private room', 'Shared room', 'Not sure yet'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAIL_MS = 3600; // length of the envelope animation in RetreatSignupForm.css

// Interest-list sign-up as a postcard: a "Greetings from Provence" front that flips over to
// a writable back. The back walks the visitor through it in three steps: the card zooms in on
// the signature, then on the address, then pulls back for a last look and a send. On send it is tucked into an airmail envelope, sealed and flown off, then the
// visitor lands on the thank-you page (/retreats/merci). Posts to /api/retreat-signup.
function RetreatSignupForm() {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('Not sure yet');
  const [website, setWebsite] = useState(''); // honeypot, left empty by real visitors
  const [status, setStatus] = useState('idle'); // idle | sending | mailing | error
  const [error, setError] = useState('');
  const [hints, setHints] = useState({});
  const [step, setStep] = useState(1); // 1 name, 2 email, 3 look over and send
  const [consent, setConsent] = useState(false);
  const [view, setView] = useState({ h: undefined, t: 'none' });
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const flipBtnRef = useRef(null);
  const cardRef = useRef(null);
  const stageRef = useRef(null);
  const zoomRef = useRef(null);
  const nameZoneRef = useRef(null);
  const emailZoneRef = useRef(null);
  const guideRef = useRef(null);
  const sealRef = useRef(null);

  const flip = (to) => {
    setFlipped(to);
    // Move focus to the face that just became visible.
    window.setTimeout(() => {
      if (to) focusStep(step);
      if (!to && flipBtnRef.current) flipBtnRef.current.focus({ preventScroll: true });
    }, 450);
  };

  // Once the envelope has flown off, go to the thank-you page.
  useEffect(() => {
    if (status !== 'mailing') return undefined;
    // Centre the card so the envelope is on screen, even when the tall phone layout was scrolled to Send.
    if (cardRef.current) cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => {
      const firstName = name.trim().split(/\s+/)[0];
      navigate(`/retreats/merci${firstName ? `?name=${encodeURIComponent(firstName)}` : ''}`);
    }, reduce ? 0 : MAIL_MS);
    return () => window.clearTimeout(t);
  }, [status, name, navigate]);

  const nameHint = (v) => {
    const parts = v.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return 'Every good letter needs a signature. Add your name so we know whose seat to save.';
    if (parts.length < 2) return 'Lovely! Could you add your last name too, so we can find you on the guest list?';
    return undefined;
  };
  const emailHint = (v) => {
    if (!v.trim()) return 'Almost there! Where should Emmy & Hannah send the news?';
    if (!EMAIL_RE.test(v.trim())) return 'Hmm, that address looks a little off. Mind giving it another look?';
    return undefined;
  };

  const focusStep = useCallback((n) => {
    const el = n === 1 ? nameRef.current : n === 2 ? emailRef.current : sealRef.current;
    if (el) el.focus({ preventScroll: true });
  }, []);

  const goTo = (n) => {
    setStep(n);
    window.setTimeout(() => focusStep(n), 380);
  };

  const next = () => {
    if (step === 1) {
      const h = nameHint(name);
      setHints((x) => ({ ...x, name: h }));
      if (h) return nameRef.current && nameRef.current.focus();
      return goTo(2);
    }
    if (step === 2) {
      const h = emailHint(email);
      setHints((x) => ({ ...x, email: h }));
      if (h) return emailRef.current && emailRef.current.focus();
      return goTo(3);
    }
    return undefined;
  };

  const validate = () => {
    const next = { name: nameHint(name), email: emailHint(email) };
    if (!consent) next.consent = 'One last thing: tick the box so we have your blessing to write to you.';
    setHints(next);
    if (next.name) goTo(1);
    else if (next.email) goTo(2);
    return !next.name && !next.email && !next.consent;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (step < 3) return next();
    if (!validate()) return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/retreat-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), room, website }),
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

  // Point the "camera" at the part of the card for this step: scale and pan the card inside a
  // fixed window. Step 3 shows the whole card. Measured in untransformed layout (offsets).
  const frame = useCallback(() => {
    const stage = stageRef.current;
    const layer = zoomRef.current;
    if (!stage || !layer) return;
    const W = stage.clientWidth;
    const H = layer.offsetHeight;
    const phone = W < 600;
    const zone = step === 1 ? nameZoneRef.current : step === 2 ? emailZoneRef.current : null;
    if (!zone) {
      setView({ h: H, t: 'none' });
      return;
    }
    const h = phone ? Math.min(H, 440) : H;
    let x = 0;
    let y = 0;
    for (let el = zone; el && el !== layer; el = el.offsetParent) {
      x += el.offsetLeft;
      y += el.offsetTop;
    }
    const zw = zone.offsetWidth;
    const zh = zone.offsetHeight;
    const s = Math.max(1, Math.min(1.7, (W * 0.9) / zw, (h * 0.8) / zh));
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
    const tx = clamp(W / 2 - s * (x + zw / 2), W - s * W, 0);
    const ty = clamp(h / 2 - s * (y + zh / 2), Math.min(0, h - s * H), 0);
    setView({ h, t: `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${s.toFixed(3)})` });
  }, [step]);

  useLayoutEffect(() => {
    frame();
  }, [frame, hints, flipped]);

  useEffect(() => {
    window.addEventListener('resize', frame);
    return () => window.removeEventListener('resize', frame);
  }, [frame]);

  // Keep the step and its guide on screen (on phones the card is taller than the screen).
  useEffect(() => {
    if (!flipped || !cardRef.current) return undefined;
    const t = window.setTimeout(() => {
      const card = cardRef.current.getBoundingClientRect();
      const guide = guideRef.current && guideRef.current.getBoundingClientRect();
      if (card.top < 70) window.scrollBy({ top: card.top - 90, behavior: 'smooth' });
      else if (guide && guide.bottom > window.innerHeight) {
        // the last step needs its Send button in view; earlier steps keep the card's top in view
        const by = guide.bottom - window.innerHeight + 16;
        window.scrollBy({ top: step === 3 ? by : Math.min(by, card.top - 90), behavior: 'smooth' });
      }
    }, 650);
    return () => window.clearTimeout(t);
  }, [step, flipped]);

  const clearHint = (field) => hints[field] && setHints((h) => ({ ...h, [field]: undefined }));

  const signature = name.trim();
  const first = signature.split(/\s+/)[0] || '';
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
            <p className="pc-front-sub">Bon Vivant Summer &middot; May 2027</p>
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
            <form onSubmit={submit} noValidate>
              <div className={`pc-stage${step < 3 ? ' pc-stage-zoom' : ''}`} ref={stageRef} style={{ height: view.h }}>
              <div className={`pc-form pc-at-${step}`} ref={zoomRef} style={{ transform: view.t }}>
              {/* Message side */}
              <div className="pc-left">
                <p className="pc-script pc-dear">Chères Emmy &amp; Hannah,</p>
                <p className="pc-msg">
                  Save me a seat at the long table. I would love to be the very first to hear about Bon Vivant Summer,
                  and I simply cannot wait to see you in Provence.
                </p>
                <div className="pc-zone pc-zone-name" ref={nameZoneRef}>
                <label className="pc-label" htmlFor="retreat-name">My full name</label>
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
                  autoComplete="name"
                  placeholder="first and last name"
                  aria-invalid={hints.name ? 'true' : undefined}
                  aria-describedby={hints.name ? 'retreat-name-hint' : undefined}
                />
                {hints.name && (
                  <p className="pc-hint" id="retreat-name-hint">{hints.name}</p>
                )}
                <p className="pc-love">
                  Bisous,
                  <span className="pc-script pc-signature">{signature || ' '}</span>
                </p>
                </div>
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
                      <text x="160" y="62" fontSize="8" letterSpacing="1.5">14 · V · 27</text>
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

                <div className="pc-zone pc-zone-email" ref={emailZoneRef}>
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
                </div>

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
              </div>
              </div>
              </div>

              {/* The guide: what to do on each step, and the send at the end */}
              <div className="pc-guide" ref={guideRef} aria-live="polite">
                <p className="pc-guide-step">Step {step} of 3</p>
                {step === 1 && (
                  <>
                    <p className="pc-guide-title">First, sign your note</p>
                    <p className="pc-guide-text">Your first and last name, just as you&rsquo;d like it on your place card.</p>
                  </>
                )}
                {step === 2 && (
                  <>
                    <p className="pc-guide-title">Where should we send the news?</p>
                    <p className="pc-guide-text">
                      Your email, so Emmy &amp; Hannah can write the moment booking opens. And which room are you
                      dreaming of?
                    </p>
                  </>
                )}
                {step === 3 && (
                  <>
                    <p className="pc-guide-title">Everything looks lovely{first ? `, ${first}` : ''}!</p>
                    <dl className="pc-sum">
                      <div><dt>Signed</dt><dd>{signature}</dd></div>
                      <div><dt>Send the news to</dt><dd>{email.trim()}</dd></div>
                      <div><dt>Dreaming of</dt><dd>{room === 'Not sure yet' ? 'Not sure yet' : `A ${room.toLowerCase()}`}</dd></div>
                    </dl>
                    <label className={`pc-consent${hints.consent ? ' pc-consent-flag' : ''}`}>
                      <input
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
                    {hints.consent && (
                      <p className="pc-hint" id="retreat-consent-hint">{hints.consent}</p>
                    )}
                    {status === 'error' && (
                      <p className="pc-hint pc-error" role="alert">{error}</p>
                    )}
                  </>
                )}

                <div className="pc-guide-actions">
                  {step === 1 ? (
                    <button type="button" className="pc-guide-back" onClick={() => flip(false)}>
                      <span aria-hidden="true">&larr; </span>See the front
                    </button>
                  ) : (
                    <button type="button" className="pc-guide-back" onClick={() => goTo(step - 1)}>
                      <span aria-hidden="true">&larr; </span>{step === 3 ? 'Make a change' : 'Back'}
                    </button>
                  )}
                  {step < 3 ? (
                    <button type="submit" className="pc-next">
                      Next<span aria-hidden="true"> &rarr;</span>
                    </button>
                  ) : (
                    <button type="submit" ref={sealRef} className="pc-seal" disabled={status === 'sending' || mailing}>
                      <span className="pc-seal-main">{status === 'sending' ? 'Sending' : 'Send'}</span>
                      <span className="pc-seal-sub">{status === 'sending' ? '…' : 'with love'}</span>
                    </button>
                  )}
                </div>
                {step === 3 && <p className="pc-fine">Free to join. No commitment to book.</p>}
              </div>
            </form>

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
