import React, { useRef, useState } from 'react';
import './RetreatSignupForm.css';

const ROOM_OPTIONS = ['Private room', 'Shared room', 'Not sure yet'];

// Interest-list sign-up as a postcard: a "Greetings from Provence" front that flips over to
// a writable back. Posts to /api/retreat-signup.
function RetreatSignupForm() {
  const [flipped, setFlipped] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('Not sure yet');
  const [website, setWebsite] = useState(''); // honeypot, left empty by real visitors
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');
  const nameRef = useRef(null);
  const flipBtnRef = useRef(null);

  const flip = (to) => {
    setFlipped(to);
    // Move focus to the face that just became visible.
    window.setTimeout(() => {
      if (to && nameRef.current) nameRef.current.focus({ preventScroll: true });
      if (!to && flipBtnRef.current) flipBtnRef.current.focus({ preventScroll: true });
    }, 450);
  };

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

  const first = name.trim();

  return (
    <div className="pc" style={{
        "--pc-photo": "url(/videos/retreat-banner.webp)",
        "--pc-front": "url(/videos/postcard-front.jpg)",
        "--pc-back": "url(/videos/postcard-back.jpg)",
      }}>
      <div className={`pc-inner${flipped ? ' pc-flipped' : ''}`}>
        {/* FRONT */}
        <div className="pc-face pc-front" inert={flipped} aria-hidden={flipped}>
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
        <div className="pc-face pc-back" inert={!flipped} aria-hidden={!flipped}>
          <div className="pc-paper pc-back-paper">
            {status === 'done' ? (
              <div className="pc-sent" role="status">
                <svg className="pc-sent-mark" viewBox="0 0 200 200" aria-hidden="true">
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#4F5D3A" strokeWidth="5" />
                  <circle cx="100" cy="100" r="72" fill="none" stroke="#4F5D3A" strokeWidth="2" />
                  <defs>
                    <path id="pc-sent-arc" d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
                  </defs>
                  <text fontSize="15" letterSpacing="4" fill="#4F5D3A" fontFamily="Lora, serif">
                    <textPath href="#pc-sent-arc">AIX-EN-PROVENCE · BON VIVANT · </textPath>
                  </text>
                  <text x="100" y="112" textAnchor="middle" fontSize="34" fill="#4F5D3A" fontFamily="Lora, serif" fontWeight="700">
                    SENT
                  </text>
                </svg>
                <p className="pc-sent-title">Merci{first ? `, ${first}` : ''}!</p>
                <p className="pc-sent-body">
                  Your postcard is on its way. Watch your inbox for the first details, and check spam just in case.
                </p>
              </div>
            ) : (
              <form className="pc-form" onSubmit={submit}>
                {/* Message side */}
                <div className="pc-left">
                  <p className="pc-hand pc-dear">Dear Emmy &amp; Hannah,</p>
                  <p className="pc-hand pc-msg">
                    Save me a seat at the long table! I'd love to hear first about Bon Vivant Summer.
                  </p>
                  <label className="pc-label" htmlFor="retreat-name">My first name</label>
                  <input
                    id="retreat-name"
                    ref={nameRef}
                    className="pc-input pc-hand"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                    required
                    autoComplete="given-name"
                  />
                  <p className="pc-hand pc-love">
                    Love,
                    <span className="pc-signature">{first || ' '}</span>
                  </p>
                </div>

                <div className="pc-divider" aria-hidden="true" />

                {/* Address side */}
                <div className="pc-right">
                  <div className="pc-postage" aria-hidden="true">
                    <svg className="pc-postmark" viewBox="0 0 220 110">
                      <g fill="none" stroke="#8B7355" strokeWidth="2" opacity="0.7">
                        <circle cx="160" cy="55" r="46" />
                        <circle cx="160" cy="55" r="38" strokeWidth="1" />
                        <path d="M0 30 q 12 -10 24 0 t 24 0 t 24 0 t 24 0" />
                        <path d="M0 50 q 12 -10 24 0 t 24 0 t 24 0 t 24 0" />
                        <path d="M0 70 q 12 -10 24 0 t 24 0 t 24 0 t 24 0" />
                      </g>
                      <text x="160" y="52" textAnchor="middle" fontSize="11" letterSpacing="2" fill="#8B7355" fontFamily="Lora, serif">AIX-EN</text>
                      <text x="160" y="67" textAnchor="middle" fontSize="11" letterSpacing="2" fill="#8B7355" fontFamily="Lora, serif">PROVENCE</text>
                    </svg>
                    <svg className="pc-stamp" viewBox="0 0 90 108">
                      <rect x="4" y="4" width="82" height="100" fill="#FBF3E4" stroke="#FFFDF8" strokeWidth="8" strokeDasharray="6 6" />
                      <rect x="12" y="12" width="66" height="84" fill="#EFE3F2" stroke="#8B7355" strokeWidth="1" />
                      <g stroke="#5F8F4F" strokeWidth="2" strokeLinecap="round" fill="none">
                        <path d="M45 88 C45 70 44 56 45 38" />
                        <path d="M45 74 C38 70 34 66 32 60" />
                        <path d="M45 66 C52 62 56 58 58 52" />
                      </g>
                      <g fill="#7B58A8">
                        <ellipse cx="45" cy="30" rx="4" ry="7" />
                        <ellipse cx="39" cy="38" rx="4" ry="7" transform="rotate(-20 39 38)" />
                        <ellipse cx="51" cy="38" rx="4" ry="7" transform="rotate(20 51 38)" />
                        <ellipse cx="38" cy="50" rx="4" ry="7" transform="rotate(-24 38 50)" />
                        <ellipse cx="52" cy="50" rx="4" ry="7" transform="rotate(24 52 50)" />
                      </g>
                      <text x="45" y="94" textAnchor="middle" fontSize="8" letterSpacing="1.5" fill="#4F5D3A" fontFamily="Lora, serif">FRANCE 2027</text>
                    </svg>
                  </div>

                  <label className="pc-label" htmlFor="retreat-email">Send the news to</label>
                  <input
                    id="retreat-email"
                    className="pc-input pc-hand"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="your email"
                  />

                  <fieldset className="pc-rooms">
                    <legend className="pc-label">I'm dreaming of a&hellip;</legend>
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
                    <p className="pc-error" role="alert">{error}</p>
                  )}

                  <div className="pc-actions">
                    <button type="submit" className="pc-seal" disabled={status === 'sending'}>
                      <span className="pc-seal-main">{status === 'sending' ? 'Sending' : 'Send'}</span>
                      <span className="pc-seal-sub">{status === 'sending' ? '…' : 'with love'}</span>
                    </button>
                    <p className="pc-fine">Free to join. No commitment to book.</p>
                  </div>
                </div>
              </form>
            )}

            {status !== 'done' && (
              <button type="button" className="pc-flip-back" onClick={() => flip(false)}>
                <span aria-hidden="true">&larr; </span>See the front
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetreatSignupForm;
