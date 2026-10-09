import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import RetreatSignupForm from '../components/RetreatSignupForm';

// TODO(Emmy): swap the collage placeholders below for her retreat photos. A mobile version of the hero would help.
const HERO_IMAGE = '/videos/retreat-hero.jpg';
const COLLAGE = ['/videos/emmy1.jpg', '/videos/emmy2.jpg', '/videos/emmy3.jpg', '/videos/featuredpic1.jpg'];

function RetreatsPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = windowWidth < 900;

  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('interest-list');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageTransition>
      <div style={styles.page}>
        {/* Hero: Emmy's finished design (title, dates and button are part of the image) */}
        <section style={styles.hero}>
          <div style={styles.heroFrame}>
            <picture>
              <source
                srcSet="/videos/retreat-hero.webp 1440w, /videos/retreat-hero-2880.webp 2880w"
                sizes="100vw"
                type="image/webp"
              />
              <img
                src={HERO_IMAGE}
                width="1440"
                height="720"
                fetchPriority="high"
                decoding="async"
                alt="Bon Vivant Summer. Provence, [Month] 2027, 5 nights / 6 days. A lively, food-filled week in the South of France for women who want to explore, eat well, meet new people, and soak up the Provençal way of life."
                style={styles.heroImg}
              />
            </picture>
            <h1 style={styles.srOnly}>Bon Vivant Summer</h1>
            {/* Clickable area over the button drawn in the image (desktop and tablet) */}
            {!isMobile && (
              <a
                href="#interest-list"
                onClick={scrollToForm}
                style={styles.heroButtonHotspot}
                aria-label="Get on the interest list"
              />
            )}
          </div>
          {isMobile && (
            <a href="#interest-list" onClick={scrollToForm} style={styles.mobileButton}>
              Get on the interest list
            </a>
          )}
        </section>

        <div style={styles.container}>
          {/* Concept */}
          <section style={styles.section}>
            <h2 style={styles.heading}>The concept</h2>
            <p style={styles.body}>
              The more time I spend exploring the South of France, the more I fall in love with it. Living in France
              has given me a seat at tables I never imagined my American self would be welcomed to: sharing wine,
              lingering over dinner, and learning to enjoy the moment.
            </p>
            <p style={styles.body}>
              I want to bring that feeling to this community. Bon Vivant Summer is a chance to experience Provence
              together through the food, the people, the little discoveries, and the long, laughter-filled meals.
            </p>
            <p style={styles.body}>
              I'm bringing in local French makers, chefs, and shop owners I've gotten to know, so you leave with more
              than a great trip. You leave knowing the people and places that make Provence what it is.
            </p>
          </section>

          {/* Photo collage */}
          <div
            style={{
              ...styles.collage,
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            }}
          >
            {COLLAGE.map((src, i) => (
              <div
                key={src}
                style={{
                  ...styles.collageTile,
                  backgroundImage: `url(${src})`,
                  transform: `rotate(${[-2, 1.5, -1, 2][i]}deg)`,
                }}
                role="img"
                aria-label="Retreat photo"
              />
            ))}
          </div>

          {/* Week */}
          <section style={styles.section}>
            <h2 style={styles.heading}>What the week might look like</h2>
            <p style={styles.body}>
              Market mornings, cooking classes, antique finds, wellness, local collaborators, long lunches, free time,
              and a few surprises along the way. The exact itinerary is still taking shape, but the spirit is already
              here: curious, social, and very Provençal.
            </p>
          </section>

          {/* Who */}
          <section style={styles.section}>
            <h2 style={styles.heading}>Who it's for</h2>
            <p style={styles.body}>
              An intimate group of 8 to 10 women ready for good food, new friends, and a week that feels like summer
              camp for grown-ups. Come with a friend or come solo.
            </p>
          </section>

          {/* Stay */}
          <section style={styles.section}>
            <h2 style={styles.heading}>The stay</h2>
            <p style={styles.body}>
              We'll all stay under one roof in a beautiful private home just outside Aix-en-Provence, tucked away but
              close enough to wander into town. We'll share the exact property once it's confirmed.
            </p>
            {/* TODO(Emmy): Aix-en-Provence map image goes here once she sends it. */}
          </section>

          {/* Hosts */}
          <section style={styles.section}>
            <h2 style={styles.heading}>Your hosts</h2>
            <p style={styles.body}>
              Sisters, co-hosts, and the people you'll want at your dinner table. Emmy brings her touches of the bon
              vivant life that she's come to know since moving to France: the producers, the markets, and the long
              lunches. Hannah brings years of creating experiences for luxury and hospitality brands, so every detail
              is handled and all you have to do is say yes to another glass.
            </p>
          </section>
        </div>

        {/* Interest list */}
        <section id="interest-list" style={styles.formSection}>
          <div style={styles.container}>
            <h2 style={{ ...styles.heading, textAlign: 'center' }}>Get the first details</h2>
            <p style={{ ...styles.body, textAlign: 'center', maxWidth: '620px', margin: '0 auto 3rem' }}>
              We're planning for [Month] 2027 and the details are coming together. Join the list to be the first to
              hear about dates, location, and booking.
            </p>
            <RetreatSignupForm />
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#FAF7F2' },
  hero: { paddingTop: '72px', backgroundColor: '#F7F4EF' }, // 72px clears the fixed-position nav
  heroFrame: { position: 'relative', maxWidth: '1600px', margin: '0 auto' },
  heroImg: { display: 'block', width: '100%', height: 'auto' },
  // Positioned over the "Get on the interest list" button in the 1440x720 design
  heroButtonHotspot: {
    position: 'absolute',
    left: '42.6%',
    top: '66.3%',
    width: '16.5%',
    height: '5.9%',
    display: 'block',
  },
  mobileButton: {
    display: 'block',
    margin: '1.5rem auto',
    width: 'fit-content',
    backgroundColor: '#4F5D3A',
    color: '#FFFFFF',
    textDecoration: 'none',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    padding: '1rem 2rem',
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    whiteSpace: 'nowrap',
  },
  container: { maxWidth: '820px', margin: '0 auto', padding: '0 2rem' },
  section: { padding: '4rem 0 1rem' },
  heading: {
    color: '#111111',
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
    fontWeight: 400,
    letterSpacing: '0.04em',
    marginBottom: '1.25rem',
  },
  body: { color: '#111111', fontSize: '1.0625rem', lineHeight: 1.8, opacity: 0.88, marginBottom: '1.25rem' },
  collage: {
    display: 'grid',
    gap: '1rem',
    maxWidth: '1100px',
    margin: '4rem auto 1rem',
    padding: '0 2rem',
  },
  collageTile: {
    aspectRatio: '3 / 4',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '8px solid #FFFFFF',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
  formSection: { padding: '6rem 0 7rem', backgroundColor: '#F7F4EF', marginTop: '4rem' },
};

export default RetreatsPage;
