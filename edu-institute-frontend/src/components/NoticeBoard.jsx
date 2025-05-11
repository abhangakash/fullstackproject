import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NoticeBoard.css'; // Ensure you have the appropriate CSS for styling

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch notices from backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notices'); // Update with your correct API endpoint
        setNotices(res.data);
      } catch (err) {
        setError('Failed to load notices.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <section className="notice-board-section">
      <h2>Notice Board</h2>

      {loading ? (
        <div className="loading-message">Loading notices...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="notice-board-container">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div key={notice._id} className="notice-card">
                <h3>{notice.title}</h3>
                <p className="notice-date">{new Date(notice.date).toLocaleDateString()}</p>
                <p className="notice-description">{notice.description}</p>
                {notice.link && (
                  <a href={notice.link} className="notice-link" target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="no-notices-message">No notices available.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default NoticeBoard;
