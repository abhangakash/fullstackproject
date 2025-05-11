import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AwardsAchievements.css'; // Ensure the appropriate CSS for styling

const AwardsAchievements = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch awards and achievements from backend
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/awards'); // Update with your correct API endpoint
        setAwards(res.data);
      } catch (err) {
        setError('Failed to load awards and achievements.');
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  return (
    <section className="awards-achievements-section">
      <h2>Awards & Achievements</h2>

      {loading ? (
        <div className="loading-message">Loading awards...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="awards-carousel">
          {awards.length > 0 ? (
            awards.map((award) => (
              <div key={award._id} className="award-card">
                <img src={award.imageUrl} alt={award.title} className="award-image" />
                <div className="award-details">
                  <h3>{award.title}</h3>
                  <p className="award-date">{award.date}</p>
                  <p className="award-description">{award.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-awards-message">No awards or achievements available.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default AwardsAchievements;
