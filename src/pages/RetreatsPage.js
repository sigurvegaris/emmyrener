import React from 'react';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import RetreatSignupForm from '../components/RetreatSignupForm';
import RetreatPageNav from '../components/RetreatPageNav';
import './RetreatsPage.css';

// TODO(Emmy): Aix-en-Provence map image goes in the stay section once she sends it.
const WEEK = [
  { src: '/videos/retreat-market.webp', label: 'Au marché', alt: 'A cheese stall at a French market' },
  { src: '/videos/retreat-table.webp', label: 'À table', alt: 'A charcuterie and cheese board on a picnic table' },
  { src: '/videos/retreat-lavender.webp', label: 'Sur la route', alt: 'Rows of lavender in a Provence field' },
  { src: '/videos/retreat-orange.webp', label: 'Au soleil', alt: 'Oranges ripening on a tree in the sun' },
];

function RetreatsPage() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('interest-list');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageTransition>
      <div className="rt">
        {/* Opening: Emmy's finished banner design (title, dates and button are part of the image) */}
        <header className="rt-banner">
          <div className="rt-banner-frame">
            <picture>
              <source
                srcSet="/videos/retreat-banner.webp 1440w, /videos/retreat-banner-2880.webp 2880w"
                sizes="100vw"
                type="image/webp"
              />
              <img
                src="/videos/retreat-banner.jpg"
                width="1440"
                height="720"
                fetchPriority="high"
                decoding="async"
                alt="Bon Vivant Summer. Provence, [Month] 2027, 5 nights / 6 days. A lively, food-filled week in the South of France for women who want to explore, eat well, meet new people, and soak up the Provençal way of life."
              />
            </picture>
            <h1 className="rt-sr">Bon Vivant Summer</h1>
            {/* Clickable area over the button drawn in the image (desktop and tablet) */}
            <a
              href="#interest-list"
              onClick={scrollToForm}
              className="rt-banner-hit"
              aria-label="Get on the interest list"
            />
          </div>
          <a href="#interest-list" onClick={scrollToForm} className="rt-btn rt-banner-mobile">
            Get on the interest list
          </a>
        </header>

        <RetreatPageNav />

        <blockquote className="rt-quote">
          The South of France is more than rosé all day.
          <br />
          But we will, in fact, have a lot of rosé.
        </blockquote>

        {/* Concept */}
        <section id="concept" className="retreat-section rt-split">
          <img className="rt-photo" src="/videos/retreat-concept.webp" width="1000" height="667" loading="lazy" alt="Friends clinking glasses of rosé" />
          <div className="rt-text">
            <p className="rt-eyebrow">The concept</p>
            <h2 className="rt-h2">A seat at the table in Provence</h2>
            <p>
              The more time I spend exploring the South of France, the more I fall in love with it. Living in France
              has given me a seat at tables I never imagined my American self would be welcomed to: sharing wine,
              lingering over dinner, and learning to enjoy the moment.
            </p>
            <p>
              I want to bring that feeling to this community. Bon Vivant Summer is a chance to experience Provence
              together through the food, the people, the little discoveries, and the long, laughter-filled meals.
            </p>
            <p>
              I'm bringing in local French makers, chefs, and shop owners I've gotten to know, so you leave with more
              than a great trip. You leave knowing the people and places that make Provence what it is.
            </p>
          </div>
        </section>

        {/* Week */}
        <section id="week" className="retreat-section rt-band">
          <p className="rt-eyebrow rt-center">What the week might look like</p>
          <p className="rt-intro">
            Market mornings, cooking classes, antique finds, wellness, local collaborators, long lunches, free time,
            and a few surprises along the way. The exact itinerary is still taking shape, but the spirit is already
            here: curious, social, and very Provençal.
          </p>
          <div className="rt-week">
            {WEEK.map((w) => (
              <figure key={w.src} className="rt-fig">
                <img src={w.src} loading="lazy" alt={w.alt} width="800" height="1067" />
                <figcaption>{w.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Who */}
        <section id="who" className="retreat-section rt-who">
          <p className="rt-eyebrow rt-center">Who it's for</p>
          <p className="rt-big">
            An intimate group of 8 to 10 women ready for good food, new friends, and a week that feels like summer
            camp for grown-ups. Come with a friend or come solo.
          </p>
        </section>

        {/* Stay */}
        <section id="stay" className="retreat-section rt-split rt-flip">
          <div className="rt-text">
            <p className="rt-eyebrow">The stay</p>
            <h2 className="rt-h2">A villa outside Aix-en-Provence</h2>
            <p>
              We'll all stay under one roof in a private villa just outside Aix-en-Provence, tucked away but close
              enough to wander into town. We'll share the exact house once it's confirmed.
            </p>
          </div>
          <img className="rt-photo rt-tall" src="/videos/retreat-villa.webp" width="900" height="1200" loading="lazy" alt="A stone villa with shutters and climbing white roses" />
        </section>

        {/* Hosts */}
        <section id="hosts" className="retreat-section rt-band rt-split">
          <img className="rt-photo rt-tall" src="/videos/retreat-hosts.webp" width="900" height="1200" loading="lazy" alt="Emmy and Hannah in a blue doorway covered in red roses" />
          <div className="rt-text">
            <p className="rt-eyebrow">Your hosts</p>
            <h2 className="rt-h2">Emmy &amp; Hannah Rener</h2>
            <p>
              Sisters, co-hosts, and the people you'll want at your dinner table. Emmy brings the Provence she's come
              to know since moving to France: the producers, the markets, and the long lunches. Hannah brings years of
              creating experiences for luxury and hospitality brands, so every detail is handled and all you have to
              do is say yes to another glass.
            </p>
          </div>
        </section>

        {/* Interest list */}
        <section id="interest-list" className="retreat-section rt-join">
          <h2 className="rt-h2 rt-join-h">Get the first details</h2>
          <p className="rt-join-p">
            We're planning for [Month] 2027 and the details are coming together. Join the list to be the first to hear
            about dates, location, and booking.
          </p>
          <RetreatSignupForm />
          <p className="rt-fine">Joining the interest list is free and doesn't commit you to booking.</p>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}

export default RetreatsPage;
