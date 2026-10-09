import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const INK = '#3c3a36';
const GROUND = 270;

const links = [
  ['/', 'Home'],
  ['/about', 'About Me'],
  ['/guides', 'Guides'],
  ['/retreats', 'Retreats'],
  ['/recommendations', 'Recommendations'],
  ['/contact', 'Contact'],
];

// Hand-drawn Haussmann street. Each building is described by a few numbers and drawn by <Building>.
const BUILDINGS = [
  { x: -10, w: 200, top: 96, roof: '#aeb4b8', wall: '#e4d7b8', cols: 4, dormer: 'tri', chimney: 62 },
  { x: 190, w: 150, top: 118, roof: '#b4bac0', wall: '#aab5c6', cols: 3, dormer: 'arch', gable: true, awning: true },
  { x: 340, w: 220, top: 84, roof: '#b4b7b8', wall: '#e0d4b4', cols: 4, dormer: 'tri', chimney: 120 },
  { x: 560, w: 220, top: 58, roof: '#b9bcc2', wall: '#aab5c6', cols: 4, dormer: 'rect', balcony: true, chimney: 40 },
  { x: 780, w: 230, top: 92, roof: '#8b8d92', wall: '#e4d7b8', cols: 4, dormer: 'round', balcony: true, chimney: 190 },
  { x: 1010, w: 200, top: 102, roof: '#aeb4b8', wall: '#aab5c6', cols: 3, dormer: 'tri', chimney: 150 },
];

function Dormer({ cx, y, kind }) {
  const stroke = { stroke: INK, strokeWidth: 1.4, fill: '#f2ecde' };
  if (kind === 'round') {
    return (
      <g>
        <path d={`M${cx - 11} ${y + 22} V${y + 8} A11 11 0 0 1 ${cx + 11} ${y + 8} V${y + 22} Z`} {...stroke} />
        <circle cx={cx} cy={y + 12} r="4.5" fill="none" stroke={INK} strokeWidth="1.2" />
      </g>
    );
  }
  if (kind === 'arch') {
    return (
      <g>
        <path d={`M${cx - 10} ${y + 24} V${y + 10} A10 10 0 0 1 ${cx + 10} ${y + 10} V${y + 24} Z`} {...stroke} />
        <rect x={cx - 5} y={y + 11} width="10" height="12" fill="#5f7287" opacity="0.7" stroke={INK} strokeWidth="1" />
      </g>
    );
  }
  if (kind === 'rect') {
    return <rect x={cx - 7} y={y + 4} width="14" height="20" {...stroke} />;
  }
  return (
    <g>
      <path d={`M${cx - 13} ${y + 24} V${y + 12} L${cx} ${y} L${cx + 13} ${y + 12} V${y + 24} Z`} {...stroke} />
      <rect x={cx - 5} y={y + 12} width="10" height="12" rx="5" fill="#d9ccb0" stroke={INK} strokeWidth="1" />
    </g>
  );
}

function Building({ b }) {
  const { x, w, top, roof, wall, cols, dormer, chimney, balcony, gable, awning } = b;
  const roofH = 46;
  const wallTop = top + roofH;
  const groundTop = GROUND - 44;
  const rows = Math.max(1, Math.floor((groundTop - wallTop - 8) / 38));
  const dark = wall === '#aab5c6';
  const winFill = dark ? '#566b82' : '#d8cba9';
  const cx = (i) => x + (w * (i + 0.5)) / cols;
  return (
    <g>
      {chimney && (
        <g>
          <rect x={x + chimney} y={top - 18} width="20" height="22" fill="#d9c9a0" stroke={INK} strokeWidth="1.4" />
          <rect x={x + chimney - 2} y={top - 22} width="24" height="6" fill="#e6d8b2" stroke={INK} strokeWidth="1.4" />
        </g>
      )}
      <path
        d={gable ? `M${x + 12} ${top + 4} L${x + w / 2} ${top - 14} L${x + w - 12} ${top + 4} L${x + w} ${top + roofH} L${x} ${top + roofH} Z` : `M${x + 8} ${top} H${x + w - 8} L${x + w} ${top + roofH} H${x} Z`}
        fill={roof}
        stroke={INK}
        strokeWidth="1.8"
      />
      {Array.from({ length: cols - (gable ? 2 : 0) }, (_, i) => (
        <Dormer key={i} cx={gable ? x + w / 2 : cx(i)} y={top + 8} kind={dormer} />
      )).slice(0, gable ? 1 : cols)}
      <rect x={x} y={wallTop} width={w} height={GROUND - wallTop} fill={wall} stroke={INK} strokeWidth="1.8" />
      <rect x={x - 3} y={wallTop} width={w + 6} height="5" fill={dark ? '#c3cad6' : '#efe5c9'} stroke={INK} strokeWidth="1.4" />
      {Array.from({ length: rows }, (_, r) => {
        const y = wallTop + 14 + r * 38;
        return (
          <g key={r}>
            {Array.from({ length: cols }, (_, i) => (
              <g key={i}>
                <rect x={cx(i) - 8.5} y={y} width="17" height="26" fill={winFill} stroke={INK} strokeWidth="1.4" />
                <line x1={cx(i)} y1={y} x2={cx(i)} y2={y + 26} stroke={INK} strokeWidth="1" />
                <line x1={cx(i) - 8.5} y1={y + 12} x2={cx(i) + 8.5} y2={y + 12} stroke={INK} strokeWidth="0.9" />
                {(balcony || r === 0) && (
                  <g stroke={INK} strokeWidth="1">
                    <line x1={cx(i) - 11} y1={y + 26} x2={cx(i) + 11} y2={y + 26} strokeWidth="1.6" />
                    {[-8, -4, 0, 4, 8].map((d) => (
                      <line key={d} x1={cx(i) + d} y1={y + 19} x2={cx(i) + d} y2={y + 26} />
                    ))}
                  </g>
                )}
              </g>
            ))}
          </g>
        );
      })}
      {/* ground floor: arches and doors */}
      <line x1={x} y1={groundTop} x2={x + w} y2={groundTop} stroke={INK} strokeWidth="1.6" />
      {Array.from({ length: cols }, (_, i) => (
        <path
          key={i}
          d={`M${cx(i) - 13} ${GROUND} V${groundTop + 18} A13 13 0 0 1 ${cx(i) + 13} ${groundTop + 18} V${GROUND} Z`}
          fill={i % 2 ? '#c9bd9b' : '#7c8c9c'}
          opacity="0.9"
          stroke={INK}
          strokeWidth="1.4"
        />
      ))}
      {awning && (
        <g>
          <path d={`M${x - 4} ${groundTop + 4} H${x + w + 4} L${x + w} ${groundTop + 16} H${x} Z`} fill="#f4efe2" stroke={INK} strokeWidth="1.4" />
        </g>
      )}
    </g>
  );
}

function Person({ x, coat, hat, flip, className, style }) {
  return (
    <g className={className} style={style} transform={flip ? `translate(${x} 0) scale(-1 1)` : `translate(${x} 0)`}>
      <circle cx="0" cy="252" r="4.6" fill="#f0d9c0" stroke={INK} strokeWidth="1.2" />
      {hat && <path d="M-6 250 H6 L4 245 H-4 Z" fill={INK} />}
      <path d="M-6 258 L6 258 L8 280 L-8 280 Z" fill={coat} stroke={INK} strokeWidth="1.3" />
      <line x1="-3" y1="280" x2="-5" y2="294" stroke={INK} strokeWidth="2" />
      <line x1="3" y1="280" x2="6" y2="294" stroke={INK} strokeWidth="2" />
    </g>
  );
}

function Tree({ x }) {
  return (
    <g>
      <ellipse cx={x} cy={GROUND - 30} rx="12" ry="38" fill="#6f7d4c" stroke={INK} strokeWidth="1.4" />
      <path d={`M${x} ${GROUND - 60} V${GROUND - 5}`} stroke="#3f4a2b" strokeWidth="1.2" />
      <path d={`M${x - 11} ${GROUND + 10} H${x + 11} L${x + 9} ${GROUND + 28} H${x - 9} Z`} fill="#8e9094" stroke={INK} strokeWidth="1.4" />
    </g>
  );
}

function Lamp({ x }) {
  return (
    <g stroke={INK} strokeWidth="1.6" fill="none">
      <path d={`M${x} ${GROUND + 28} V${GROUND - 44} q0 -12 12 -12`} />
      <path d={`M${x + 8} ${GROUND - 56} h9 l-2 11 h-5 Z`} fill={INK} />
    </g>
  );
}

function CafeTable({ x, board }) {
  return (
    <g>
      <line x1={x} y1="283" x2={x} y2="297" stroke={INK} strokeWidth="1.6" />
      <line x1={x - 8} y1="297" x2={x + 8} y2="297" stroke={INK} strokeWidth="1.6" />
      <ellipse cx={x} cy="283" rx="15" ry="3.4" fill="#f4efe2" stroke={INK} strokeWidth="1.4" />
      {board && (
        <g>
          <rect x={x - 8} y="278.5" width="16" height="5" rx="2.5" fill="#a8723e" stroke="#7b4f27" strokeWidth="0.8" />
          <circle cx={x - 3} cy="280.8" r="1.3" fill="#b0432f" />
          <circle cx={x + 1} cy="280.8" r="1.3" fill="#f6dc8a" />
          <circle cx={x + 5} cy="280.8" r="1.3" fill="#5a2f6e" />
        </g>
      )}
    </g>
  );
}

function Footer() {
  return (
    <footer className="pf">
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
        className="pf-street"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* slight wobble so the lines look hand drawn */}
          <filter id="pf-sketch" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
          </filter>
        </defs>

        <g className="pf-birds" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round">
          <path d="M880 40 q8 -9 14 -2 q6 -7 14 2" />
          <path d="M930 70 q7 -8 12 -2 q5 -6 12 2" />
          <path d="M840 62 q6 -7 11 -2 q5 -5 11 2" />
        </g>

        <g filter="url(#pf-sketch)">
          {BUILDINGS.map((b) => <Building key={b.x} b={b} />)}

          <rect x="-10" y={GROUND} width="1230" height="40" fill="#ebe4d4" />
          <line x1="-10" y1={GROUND} x2="1210" y2={GROUND} stroke={INK} strokeWidth="1.8" />
          <g stroke={INK} strokeWidth="1.3" opacity="0.7">
            {Array.from({ length: 24 }, (_, i) => (
              <line key={i} x1={20 + i * 52} y1="298" x2={32 + i * 52} y2="291" />
            ))}
          </g>

          {[108, 358, 563, 752, 1012].map((tx) => <Tree key={tx} x={tx} />)}
          {[138, 388, 590, 790, 1040].map((lx) => <Lamp key={lx} x={lx} />)}

          <CafeTable x={50} />
          <CafeTable x={228} board />
          <Person x={42} coat="#7c6a58" hat />
          <Person x={218} coat="#5b6b7b" />
          <Person x={242} coat="#9a4f3f" flip />

          <Person x={430} coat="#8a5a3b" hat className="pf-walk pf-walk-a" />
          <Person x={870} coat="#6c7a86" className="pf-walk pf-walk-b" />
          <Person x={950} coat="#a3453d" flip className="pf-walk pf-walk-c" />
        </g>
      </svg>
    </footer>
  );
}

export default Footer;
