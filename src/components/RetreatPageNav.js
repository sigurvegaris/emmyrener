import React, { useEffect, useRef, useState } from 'react';
import './RetreatPageNav.css';

const ITEMS = [
  { id: 'concept', label: 'The concept' },
  { id: 'week', label: 'The week' },
  { id: 'who', label: "Who it's for" },
  { id: 'stay', label: 'The stay' },
  { id: 'hosts', label: 'Your hosts' },
];

const JOIN_ID = 'interest-list';

// Sticky in-page menu: jump links, highlights the section you're reading, always offers "Join the list".
function RetreatPageNav() {
  const [active, setActive] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    const ids = [...ITEMS.map((i) => i.id), JOIN_ID];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keep the highlighted pill visible in the horizontally scrolling mobile menu.
  useEffect(() => {
    const list = listRef.current;
    const pill = list && list.querySelector('[aria-current="true"]');
    if (list && pill) list.scrollTo({ left: pill.offsetLeft - 24, behavior: 'smooth' });
  }, [active]);

  const jump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="rpn" aria-label="On this page">
      <div className="rpn-inner">
        <ul className="rpn-list" ref={listRef}>
          {ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={jump(item.id)}
                className="rpn-link"
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={`#${JOIN_ID}`} onClick={jump(JOIN_ID)} className="rpn-join">
          Join the list
        </a>
      </div>
    </nav>
  );
}

export default RetreatPageNav;
