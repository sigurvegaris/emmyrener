import React from 'react';

function Reviews() {
  const [expandedReview, setExpandedReview] = React.useState(null);
  
  const reviews = [
    {
      quote: "We followed Emmy's Paris guide for three days and every single place was unforgettable. It felt like we had a local friend planning our trip.",
      author: "Sarah",
      location: "New York"
    },
    {
      quote: "These were genuinely the best meals of our entire trip. We would never have found these spots without Emmy's recommendations.",
      author: "Alex",
      location: "Toronto"
    },
    {
      quote: "Emmy's recommendations felt exactly like having a local friend show us around Paris. Nothing felt touristy, everything felt special.",
      author: "Maria",
      location: "Los Angeles"
    },
    {
      quote: "Working with Emmy on our itinerary was the best decision we made for our France vacation!! She put so much thought and care into understanding exactly what we wanted and made it all happen effortlessly. Our trip was smooth, stress-free, and truly a vacation my husband and I will reminisce about for many years to come. Instead of worrying about logistics, we got to be fully present and enjoy every moment. And beyond her incredible planning skills, she's just a joy to work with. Emmy was warm, bubbly, and so fun throughout the entire process. I couldn't recommend her more highly!",
      author: "Jennifer",
      location: "Chicago"
    },
    {
      quote: "I'm so glad I found Emmy's guide before our trip. Every restaurant was incredible and the walking routes she suggested were perfect. Worth every penny.",
      author: "James",
      location: "London"
    },
    {
      quote: "We used Emmy's Paris guide for our honeymoon and it was perfect. The wine bars, the hidden cafés, the Sunday walk — everything was exactly what we wanted.",
      author: "Sophie",
      location: "Sydney"
    },
  ];

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Section title */}
        <h2 style={styles.heading}>
          Loved by travelers around the world
        </h2>
        
        {/* Verified line */}
        <p style={styles.verifiedLine}>
          Verified travelers from New York, Toronto, Los Angeles, London, Sydney
        </p>

        {/* Reviews grid - floating, no boxes */}
        <div style={styles.gridWrapper}>
          <div style={styles.topRow}>
            {reviews.slice(0, 3).map((review, index) => (
              <div key={index} style={styles.reviewCard}>
                {/* Stars */}
                <div style={styles.stars}>
                  <span style={styles.star}>★</span>
                  <span style={styles.star}>★</span>
                  <span style={styles.star}>★</span>
                  <span style={styles.star}>★</span>
                  <span style={styles.star}>★</span>
                </div>
                
                {/* Quote */}
                <p style={styles.quote}>
                  "{expandedReview === index ? review.quote : truncateText(review.quote, 200)}"
                  {review.quote.length > 200 && (
                    <button
                      onClick={() => setExpandedReview(expandedReview === index ? null : index)}
                      style={styles.expandButton}
                      onMouseEnter={(e) => e.target.style.color = '#6d5940'}
                      onMouseLeave={(e) => e.target.style.color = '#8B7355'}
                    >
                      {expandedReview === index ? ' Read less' : ' Read more'}
                    </button>
                  )}
                </p>
                
                {/* Attribution */}
                <p style={styles.attribution}>
                  — {review.author}, {review.location}
                </p>
              </div>
            ))}
          </div>
          
          <div style={styles.bottomRow}>
            {reviews.slice(3, 6).map((review, index) => (
              <div key={index + 3} style={styles.reviewCard}>
                {/* Stars */}
                <div style={styles.stars}>
                  <span style={styles.star}>★</span>
                  <span style={styles.star}>★</span>
                  <span style={styles.star}>★</span>
                  <span style={styles.star}>★</span>
                  <span style={styles.star}>★</span>
                </div>
                
                {/* Quote */}
                <p style={styles.quote}>
                  "{expandedReview === index + 3 ? review.quote : truncateText(review.quote, 200)}"
                  {review.quote.length > 200 && (
                    <button
                      onClick={() => setExpandedReview(expandedReview === index + 3 ? null : index + 3)}
                      style={styles.expandButton}
                      onMouseEnter={(e) => e.target.style.color = '#6d5940'}
                      onMouseLeave={(e) => e.target.style.color = '#8B7355'}
                    >
                      {expandedReview === index + 3 ? ' Read less' : ' Read more'}
                    </button>
                  )}
                </p>
                
                {/* Attribution */}
                <p style={styles.attribution}>
                  — {review.author}, {review.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: '#FAF7F2',
    padding: '7rem 3rem',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  heading: {
    color: '#111111',
    fontSize: 'clamp(1.875rem, 3.5vw, 2.5rem)',
    fontWeight: 300,
    letterSpacing: '0.05em',
    textAlign: 'center',
    marginBottom: '1rem',
    fontFamily: 'Cormorant Garamond, serif',
  },
  verifiedLine: {
    color: '#8B7355',
    fontSize: '0.9375rem',
    fontWeight: 400,
    letterSpacing: '0.05em',
    textAlign: 'center',
    marginBottom: '5rem',
    opacity: 0.85,
  },
  gridWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
  },
  topRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '3rem',
  },
  bottomRow: {
    display: 'grid',
    justifyContent: 'center',
    gap: '3rem',
  },
  reviewCard: {
    textAlign: 'left',
    maxWidth: '320px',
  },
  stars: {
    display: 'flex',
    gap: '0.25rem',
    marginBottom: '1.25rem',
    justifyContent: 'flex-start',
  },
  star: {
    color: '#C9A96E',
    fontSize: '1.125rem',
  },
  quote: {
    color: '#111111',
    fontSize: 'clamp(1.25rem, 2vw, 1.375rem)',
    fontWeight: 300,
    lineHeight: 1.7,
    marginBottom: '1.5rem',
    fontStyle: 'italic',
    fontFamily: 'Cormorant Garamond, serif',
    minHeight: '6.5rem',
  },
  attribution: {
    color: '#8B7355',
    fontSize: '0.9375rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
  },
  expandButton: {
    background: 'none',
    border: 'none',
    color: '#8B7355',
    fontSize: '0.9375rem',
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    fontStyle: 'normal',
    textDecoration: 'underline',
    transition: 'color 0.3s ease',
    marginLeft: '0.25rem',
  },
};

export default Reviews;