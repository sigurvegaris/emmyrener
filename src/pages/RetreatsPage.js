import React from 'react';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import RetreatSignupForm from '../components/RetreatSignupForm';
import './RetreatsPage.css';

// TODO(Emmy): Aix-en-Provence map image goes in the stay section once she sends it.
const WEEK = [
  { src: '/videos/retreat-market.webp', label: 'Au marché', alt: 'A cheese stall at a French market' },
  { src: '/videos/retreat-wk-lunch.webp', label: 'À table', alt: 'A table laid for lunch on the grass outside a stone cottage' },
  { src: '/videos/retreat-lavender.webp', label: 'Sur la route', alt: 'Rows of lavender in a Provence field' },
  { src: '/videos/retreat-wk-orange.webp', label: 'Au soleil', alt: 'Oranges ripening on a tree in the sun' },
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
        {/* Opening: Emmy's photo collage with the title card set in its empty center */}
        <header className="rt-banner">
          <div className="rt-banner-frame">
            <picture>
              <source
                type="image/webp"
                srcSet="/videos/retreat-collage-960.webp 960w, /videos/retreat-collage-1440.webp 1440w, /videos/retreat-collage-1920.webp 1920w, /videos/retreat-collage-2880.webp 2880w"
                sizes="(min-width: 1600px) 1600px, 100vw"
              />
              <img
                src="/videos/retreat-collage.jpg"
                width="1440"
                height="720"
                fetchPriority="high"
                decoding="async"
                alt="A collage of Provence: Emmy and Hannah in a blue doorway covered in red roses, lavender bundles, a selfie with horses, croissants, a café street, a charcuterie board with wine, a long table set in the vines, strawberries at the market, and pink spritzes"
              />
            </picture>
            <div className="rt-banner-copy">
              <p className="rt-welcome">Welcome to a</p>
              <h1 className="rt-title">Bon Vivant Summer</h1>
              <p className="rt-def">
                <em>bon vivant</em> /bɔ̃ viˈvɑ̃/ noun: a person who loves luxury, fine food, good wine, and an active
                social life
              </p>
              <p className="rt-meta">Provence · [Month] 2027 · 5 nights / 6 days</p>
              <p className="rt-lede">
                A lively, food-filled week in the South of France for women who want to explore, eat well, meet new
                people, and soak up the Provençal way of life.
              </p>
              <a href="#interest-list" onClick={scrollToForm} className="rt-btn">
                Get on the interest list
              </a>
            </div>
          </div>
        </header>

        {/* Concept: a centered statement, then two tall photos side by side */}
        <section id="concept" className="retreat-section rt-sec">
          <h2 className="rt-cap">A seat at the table in Provence</h2>
          <div className="rt-prose">
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
          <div className="rt-pair">
            <img src="/videos/retreat-pair-garden.webp" width="1000" height="1333" loading="lazy" alt="A garden lunch table under string lights with flowers, tarts and wine" />
            <img src="/videos/retreat-pair-blossom.webp" width="1000" height="1333" loading="lazy" alt="A table set for dinner on the lawn under a blossoming tree" />
          </div>
        </section>

        {/* Full-width photo with the rosé line over it */}
        <section className="rt-banner2" aria-label="A toast">
          <picture>
            <source media="(min-width: 700px)" srcSet="/videos/retreat-toast-1600.webp" />
            <img src="/videos/retreat-toast-900.webp" width="1600" height="900" loading="lazy" alt="Friends raising glasses of wine over dinner" />
          </picture>
          <p className="rt-banner2-text">
            The South of France is more than rosé all day.
            <br />
            But we will, in fact, have a lot of rosé.
          </p>
        </section>

        {/* Week */}
        <section id="week" className="retreat-section rt-sec">
          <h2 className="rt-cap">What the week might look like</h2>
          <p className="rt-prose rt-prose-one">
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
          <h2 className="rt-cap">Who it's for</h2>
          <p className="rt-big">
            An intimate group of 8 to 10 women ready for good food, new friends, and a week that feels like summer
            camp for grown-ups. Come with a friend or come solo.
          </p>
        </section>

        {/* Stay and hosts as two cards */}
        {/* Stay: the whole house, uncropped, beside the details */}
        <section id="stay" className="retreat-section rt-sec rt-stay">
          <img src="/videos/retreat-villa.webp" width="900" height="1200" loading="lazy" alt="A stone villa with shutters and climbing white roses" />
          <div className="rt-stay-text">
            <h2 className="rt-cap">The stay</h2>
            <p className="rt-sub">A villa outside Aix-en-Provence</p>
            <p>
              We'll all stay under one roof in a private villa just outside Aix-en-Provence, tucked away but close
              enough to wander into town. We'll share the exact house once it's confirmed.
            </p>
          </div>
        </section>

        {/* Hosts: their own full-width spotlight */}
        <section id="hosts" className="retreat-section rt-hosts">
          <div className="rt-hosts-inner">
            <div className="rt-hosts-photo">
              <img src="/videos/retreat-hosts.webp" width="900" height="1200" loading="lazy" alt="Emmy and Hannah in a blue doorway covered in red roses" />
            </div>
            <div className="rt-hosts-text">
              <p className="rt-kicker">Your hosts</p>
              <h2 className="rt-hosts-name">Emmy <span>&amp;</span> Hannah</h2>
              <p className="rt-hosts-last">Rener</p>
              <p>
                Sisters, co-hosts, and the people you'll want at your dinner table. Emmy brings the Provence she's come
                to know since moving to France: the producers, the markets, and the long lunches. Hannah brings years of
                creating experiences for luxury and hospitality brands, so every detail is handled and all you have to
                do is say yes to another glass.
              </p>
              <a className="rt-outline" href="#interest-list" onClick={scrollToForm}>Get on the interest list</a>
            </div>
          </div>
        </section>

        {/* Interest list */}
        <section id="interest-list" className="retreat-section rt-join">
          <h2 className="rt-cap rt-join-h">Get the first details</h2>
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
