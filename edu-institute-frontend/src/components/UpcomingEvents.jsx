import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UpcomingEvents.css'; // Make sure to create this CSS file

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events'); // Update with correct API route
        setEvents(res.data);
      } catch (err) {
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="events-section">
      <h2>Upcoming Events</h2>

      {loading ? (
        <div className="loading-message">Loading events...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="events-container">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.description}</p>
                <a href={event.link} className="event-link" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </div>
            ))
          ) : (
            <div className="no-events-message">No upcoming events.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
