import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const TOWER_PATH =
  'M752 200 L778 200 Q820 140 862 200 L888 200 L846 118 L837 118 L832 72 L826 44 L820 4 L814 44 L808 72 L803 118 L794 118 Z';

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
          <path d={TOWER_PATH} />
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

      {/* The Seine, with the tower's reflection and a passing boat */}
      <svg
        className="pf-river"
        viewBox="0 0 1200 80"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="pf-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6a4a7c" />
            <stop offset="1" stopColor="#201936" />
          </linearGradient>
        </defs>
        <rect x="0" y="8" width="1200" height="72" fill="url(#pf-water)" />
        <g opacity="0.32" transform="translate(0 8) scale(1 -0.3) translate(0 -200)">
          <path d={TOWER_PATH} fill="#1b1530" />
        </g>
        <g className="pf-ripples">
          {[[120, 24], [300, 40], [520, 30], [700, 52], [790, 22], [860, 36], [980, 28], [1100, 48], [420, 60], [640, 66]].map(([rx, ry], i) => (
            <rect key={i} x={rx} y={ry} width={36 + (i % 3) * 18} height="1.6" rx="0.8" fill="#ffe3c2" opacity="0.45" style={{ animationDelay: `${i * 0.5}s` }} />
          ))}
        </g>
        <g className="pf-boat">
          <path d="M0 22 H96 L88 34 H10 Z" fill="#150f28" />
          <path d="M14 22 V12 Q14 8 18 8 H78 Q82 8 82 12 V22 Z" fill="#2c2347" />
          {[22, 34, 46, 58, 70].map((wx) => (
            <rect key={wx} x={wx} y="12" width="7" height="6" rx="1" fill="#ffd98a" />
          ))}
          <rect x="0" y="35" width="96" height="1.6" fill="#ffe3c2" opacity="0.25" />
        </g>
        <rect x="0" y="0" width="1200" height="8" fill="#241c3b" />
      </svg>

      {/* Charcuterie board on the quay */}
      <svg className="pf-board" viewBox="0 0 200 120" aria-hidden="true" focusable="false">
        <rect x="6" y="40" width="168" height="68" rx="14" fill="#a8723e" />
        <rect x="6" y="40" width="168" height="68" rx="14" fill="none" stroke="#7b4f27" strokeWidth="2.5" />
        <rect x="170" y="64" width="26" height="12" rx="6" fill="#a8723e" stroke="#7b4f27" strokeWidth="2.5" />
        <circle cx="187" cy="70" r="2.5" fill="#241c3b" />
        {/* brie wedge */}
        <path d="M22 88 L66 66 L66 96 L22 100 Z" fill="#f6dc8a" />
        <path d="M22 88 L66 66 L70 70 L26 92 Z" fill="#fff0b8" />
        <circle cx="44" cy="87" r="2.2" fill="#e2bd5c" /><circle cx="54" cy="84" r="1.8" fill="#e2bd5c" />
        {/* salami fan */}
        {[[84, 62], [96, 70], [108, 62], [120, 70]].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="11" fill="#b0432f" stroke="#7a2a1f" strokeWidth="1.5" />
            <circle cx={cx - 3} cy={cy - 2} r="1.6" fill="#f3c9b6" /><circle cx={cx + 3} cy={cy + 3} r="1.6" fill="#f3c9b6" />
          </g>
        ))}
        {/* baguette slices */}
        {[[82, 90], [102, 92], [122, 90]].map(([cx, cy], i) => (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx="10" ry="7" fill="#d9a35f" stroke="#a9763a" strokeWidth="1.5" />
            <ellipse cx={cx} cy={cy} rx="6" ry="4" fill="#f3d9a6" />
          </g>
        ))}
        {/* grapes */}
        {[[148, 62], [158, 62], [168, 62], [153, 71], [163, 71], [158, 80]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5.2" fill="#5a2f6e" stroke="#3a1c4a" strokeWidth="1" />
        ))}
        <path d="M158 56 q2 -8 8 -9" stroke="#4f5d3a" strokeWidth="2" fill="none" />
        {/* fig + cornichons */}
        <ellipse cx="146" cy="96" rx="8" ry="6.5" fill="#6c2d52" />
        <ellipse cx="146" cy="96" rx="3.5" ry="2.6" fill="#e8708f" />
        <rect x="130" y="52" width="14" height="5" rx="2.5" fill="#6f8a3b" /><rect x="132" y="59" width="14" height="5" rx="2.5" fill="#7c9944" />
        {/* glass of rosé */}
        <path d="M184 20 H198 L196 38 Q191 44 186 38 Z" fill="#f4a7b3" opacity="0.95" />
        <path d="M184 20 H198 L197.4 26 H184.6 Z" fill="#fff" opacity="0.4" />
        <rect x="190" y="40" width="2" height="10" fill="#ffe9cf" opacity="0.9" />
        <rect x="185" y="49" width="12" height="2.5" rx="1.2" fill="#ffe9cf" opacity="0.9" />
      </svg>
    </footer>
  );
}

export default Footer;
