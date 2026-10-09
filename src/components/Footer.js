import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Deterministic pseudo-random numbers so the star field and rooftops are
// identical on every render.
function makeRand(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

const starRand = makeRand(7);
const STARS = Array.from({ length: 46 }, () => ({
  left: starRand() * 100,
  top: starRand() * 62,
  size: 1.5 + starRand() * 2,
  delay: starRand() * 4,
}));

// Row of Haussmann-style rooftops with mansard roofs and chimneys.
function rooftops(seed, minH, maxH, skip) {
  const rand = makeRand(seed);
  const out = [];
  let x = -10;
  while (x < 1210) {
    const w = 38 + rand() * 44;
    const h = minH + rand() * (maxH - minH);
    const top = 200 - h;
    if (!skip(x, x + w)) {
      out.push({ x, w, top, roof: 9 + rand() * 7, chimney: rand() > 0.6, windows: rand() > 0.5 });
    }
    x += w;
  }
  return out;
}
const FAR = rooftops(3, 55, 95, () => false);
const NEAR = rooftops(11, 28, 62, () => false);

const links = [
  ['/', 'Home'],
  ['/about', 'About Me'],
  ['/guides', 'Guides'],
  ['/retreats', 'Retreats'],
  ['/recommendations', 'Recommendations'],
  ['/contact', 'Contact'],
];

function Roof({ b, cls }) {
  const { x, w, top, roof, chimney } = b;
  const inset = 7;
  return (
    <g className={cls}>
      <rect x={x} y={top + roof} width={w + 0.5} height={200 - top} />
      <polygon points={`${x},${top + roof} ${x + inset},${top} ${x + w - inset},${top} ${x + w},${top + roof}`} />
      {chimney && <rect x={x + w * 0.6} y={top - 9} width="5" height="12" />}
    </g>
  );
}

function Footer() {
  return (
    <footer className="pf">
      <div className="pf-stars" aria-hidden="true">
        {STARS.map((st, i) => (
          <span
            key={i}
            className="pf-star"
            style={{
              left: `${st.left}%`,
              top: `${st.top}%`,
              width: st.size,
              height: st.size,
              animationDelay: `${st.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="pf-moon" aria-hidden="true" />

      <div className="pf-inner">
        <h3 className="pf-logo">EMMY RENER</h3>
        <p className="pf-tag">Your Paris, made with love</p>
        <Link to="/retreats" className="pf-cta">Join Bon Vivant Summer →</Link>

        <ul className="pf-links">
          {links.map(([to, label]) => (
            <li key={to}><Link to={to}>{label}</Link></li>
          ))}
          <li>
            <a href="https://instagram.com/emmyrener" target="_blank" rel="noopener noreferrer">Instagram</a>
          </li>
          <li><a href="mailto:emmy@sophisticatedspreads.net">Email</a></li>
        </ul>

        <p className="pf-small">Digital Paris Guides by Emmy Rener</p>
        <p className="pf-small">© 2025 Emmy Rener. Made with ♡ in Paris.</p>
        <p className="pf-small pf-italic">All recommendations are genuine and personally vetted</p>
        <button
          type="button"
          className="pf-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Back to top
        </button>
      </div>

      <svg
        className="pf-skyline"
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        focusable="false"
      >
        {FAR.map((b, i) => <Roof key={`f${i}`} b={b} cls="far" />)}

        {/* Sacré-Cœur */}
        <g className="far" style={{ opacity: 1 }}>
          <path d="M170 200 V150 Q200 120 230 150 V200 Z" />
          <path d="M215 200 V110 Q265 40 315 110 V200 Z" />
          <path d="M300 200 V150 Q330 120 360 150 V200 Z" />
          <rect x="263" y="30" width="4" height="14" />
        </g>
        {/* Notre-Dame */}
        <g className="far" style={{ opacity: 1 }}>
          <rect x="450" y="95" width="34" height="105" />
          <rect x="492" y="95" width="34" height="105" />
          <rect x="484" y="120" width="8" height="80" />
          <polygon points="505,50 510,95 500,95" />
        </g>

        {/* Eiffel Tower */}
        <g className="tower">
          <path d="M752 200 L778 200 Q820 140 862 200 L888 200 L846 118 L837 118 L832 72 L826 44 L820 4 L814 44 L808 72 L803 118 L794 118 Z" />
          <rect x="790" y="116" width="60" height="7" />
          <rect x="805" y="68" width="30" height="6" />
          <path d="M809 150 L831 150 L828 160 L812 160 Z" opacity="0" />
        </g>
        {[[812, 80], [828, 100], [806, 130], [836, 134], [820, 30], [818, 60], [830, 56]].map(([gx, gy], i) => (
          <circle key={i} className="pf-glint" cx={gx} cy={gy} r="2.2" style={{ animationDelay: `${i * 0.17}s` }} />
        ))}

        {NEAR.map((b, i) => <Roof key={`n${i}`} b={b} cls="near" />)}
        {NEAR.filter((b) => b.windows).map((b, i) => (
          <rect
            key={`w${i}`}
            className="pf-window"
            x={b.x + b.w / 2 - 2}
            y={b.top + b.roof + 8}
            width="4"
            height="6"
            style={{ animationDelay: `${(i % 7) * 0.8}s` }}
          />
        ))}
      </svg>
    </footer>
  );
}

export default Footer;
