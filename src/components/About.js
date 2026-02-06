import React from "react";
import { Link } from 'react-router-dom';
import "./About.css";

function About() {
  return (
    <section id="about" className="aboutSection">
      <div className="aboutContainer">
        <div className="aboutGrid">
          {/* Left: Photo */}
          <div className="aboutImageWrap">
            <img
              src="/videos/hero4.jpg"
              alt="Emmy Rener in Paris"
              className="aboutImage"
            />
          </div>

          {/* Right: Text */}
          <div className="aboutText">
            <p className="aboutEyebrow">About</p>
            <h2 className="aboutHeading">Emmy Rener</h2>

            <div className="aboutCopy">
              <p className="aboutParagraph">
                Emmy Rener is a California girl who moved to Paris to study abroad in 2024.
                <br />
                The city swept her off her feet, and so did her French boyfriend!
              </p>

              <p className="aboutParagraph">
                Over numerous trips and now years spent in Paris, she has sourced the crème
                de la crème for you. Whether you're taking a solo trip, coming for a cheese
                exploration, or looking to fall in love (with Paris of course) she has pulled
                together the highlights for you!
              </p>

              <p className="aboutParagraph">
                Follow{" "}
                <a
                  href="https://instagram.com/emmyrener"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aboutLink"
                >
                  @emmyrener
                </a>{" "}
                on Instagram for the most up to date advice, and enjoy the most beautiful city
                in the world!
              </p>
            </div>

            <div className="aboutCta">
              <p className="aboutCtaText">Want to know more?</p>
              <Link to="/guides" className="aboutButton">
                View Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
