import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import './RetreatsPage.css';
import './RetreatThanksPage.css';

// Where the postcard lands after it is mailed off (/retreats/merci?name=Victor).
// A page of its own also gives Emmy a URL to count sign-ups from Instagram ads.
function RetreatThanksPage() {
  const [params] = useSearchParams();
  const name = (params.get('name') || '').trim().slice(0, 40);

  useEffect(() => {
    document.title = 'Merci | Bon Vivant Summer';
  }, []);

  return (
    <PageTransition>
      <div className="rt mc">
        <section className="mc-hero">
          <div className="mc-text">
            <p className="mc-script">Merci{name ? `, ${name}` : ''}!</p>
            <h1 className="mc-title">Your seat at our table is being saved</h1>
            <p className="mc-lede">
              We’re already picturing you there: market mornings, long lunches in the garden, and a glass of rosé
              while the sun goes down. We can’t wait to share it all with you.
            </p>
            <img className="mc-roses" src="/email/roses-divider.png" width="200" height="34" alt="" />
            <p className="mc-body">
              You’ll be the very first to know when booking opens, along with all the details. A little letter from us
              is already on its way to your inbox; if you don’t see it in a few minutes, peek in Promotions or spam and
              drag it to your inbox, so you never miss a note from us.
            </p>
            <p className="mc-kicker">Next step</p>
            <p className="mc-body">
              Come along for the ride on Instagram, where we share the markets, the long tables, and everything we’re
              planning for May.
            </p>
            <div className="mc-actions">
              <a className="mc-btn" href="https://instagram.com/emmyrener" target="_blank" rel="noopener noreferrer">
                Follow @emmyrener
              </a>
              <Link className="mc-back" to="/retreats">
                Back to Bon Vivant Summer
              </Link>
            </div>
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
