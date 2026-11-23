import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import './RetreatsPage.css';
import './RetreatThanksPage.css';

const SITE_TITLE = 'Emmy Rener - Paris Travel Guides';

// Where the postcard lands after it is mailed off (/retreats/merci?name=Victor).
// A page of its own also gives Emmy a URL to count sign-ups from Instagram ads.
function RetreatThanksPage() {
  const [params] = useSearchParams();
  const name = (params.get('name') || '').trim().slice(0, 40);

  useEffect(() => {
    document.title = 'Merci | Bon Vivant Summer';
    return () => { document.title = SITE_TITLE; };
  }, []);

  return (
    <PageTransition>
      <div className="rt mc">
        <section className="mc-hero">
          <div className="mc-text">
            <p className="mc-script">Merci{name ? `, ${name}` : ''}!</p>
            <h1 className="mc-title">Your seat at our table is being saved.</h1>
            <p className="mc-lede">
              We’re dreaming of market mornings, long lunches, and rosé in the Provençal sunshine. We can’t wait to
              share it with you!
            </p>
            <p className="mc-body">
              You’ll be the first to know when bookings open. Keep an eye on your inbox (and check your spam folder!)
              for a little note from us.
            </p>
            <p className="mc-kicker">In the meantime</p>
            <p className="mc-body mc-body-tight">More from Provence is coming soon.</p>
            <p className="mc-body">
              Follow along on Instagram for a sneak peek at what’s to come.{' '}
              <a className="mc-ig" href="https://instagram.com/emmyrener" target="_blank" rel="noopener noreferrer">
                @emmyrener
              </a>
            </p>
            <p className="mc-back-wrap">
              <Link className="mc-back" to="/retreats">
                Back to Bon Vivant Summer
              </Link>
            </p>
            <p className="mc-sign">
              À très bientôt (see you very soon),
              <span>Emmy &amp; Hannah</span>
            </p>
          </div>
          {/* A postcard from the hosts: the photo front, with its written back laid over the corner */}
          <div className="mc-post">
            <figure className="mc-card">
              <img
                className="mc-card-photo"
                src="/videos/retreat-hosts.webp"
                width="900"
                height="1200"
                alt="Emmy and Hannah in a blue doorway covered in red roses"
              />
            </figure>
            <div className="mc-pb" aria-label="A postcard from Emmy and Hannah">
              <div className="mc-pb-msg">
                <p>Chère {name || 'amie'},</p>
                <p>Wish you were here! Can’t wait to see you in Provence.</p>
                <p className="mc-pb-sig">xx Emmy &amp; Hannah</p>
              </div>
              <div className="mc-pb-addr" aria-hidden="true">
                <img className="mc-pb-stamp" src="/videos/mc-stamp.png" width="98" height="116" alt="" />
                <img className="mc-pb-postmark" src="/videos/mc-postmark.png" width="228" height="118" alt="" />
                <p className="mc-pb-line">{name || 'You'}</p>
                <p className="mc-pb-line">A seat at our table</p>
                <p className="mc-pb-line">Provence, France</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
}

export default RetreatThanksPage;
