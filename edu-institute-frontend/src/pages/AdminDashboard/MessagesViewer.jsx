import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MessagesViewer.css';

const MessagesViewer = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages`);
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/messages/${id}`);
      setMessages(prev => prev.filter(msg => msg._id !== id));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="messages-viewer">
      <h2>Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages received yet.</p>
      ) : (
        <ul className="message-list">
          {messages.map(msg => (
            <li key={msg._id} className="message-card">
              <h3>{msg.name} ({msg.email})</h3>
              <p><strong>Subject:</strong> {msg.subject}</p>
              <p>{msg.message}</p>
              <button onClick={() => handleDelete(msg._id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagesViewer;
