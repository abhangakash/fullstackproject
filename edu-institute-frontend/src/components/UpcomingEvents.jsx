import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UpcomingEvents.css';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);
        setEvents(res.data);
      } catch (err) {
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

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
                <p>{event.shortDescription || event.description.slice(0, 100) + '...'}</p>

                <button onClick={() => handleOpenModal(event)} className="learn-more-btn">
                  Learn More
                </button>
              </div>
            ))
          ) : (
            <div className="no-events-message">No upcoming events.</div>
          )}
        </div>
      )}

      {/* Modal Component */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseModal}>✖</button>
            <h2>{selectedEvent.title}</h2>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            {selectedEvent.link && (
              <p>
                <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer">
                  Visit Event Page
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
