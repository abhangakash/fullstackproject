import React, { useState } from 'react';
import axios from 'axios';
import '../styles/contact.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    mobile: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        address: '',
        email: '',
        mobile: '',
        message: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error sending message.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Get in Touch</h2>
        <div className="info-item">
          <FaMapMarkerAlt className="icon" />
          <p>123 Edu Street, Knowledge City, State - 123456</p>
        </div>
        <div className="info-item">
          <FaPhoneAlt className="icon" />
          <p>+91 98765 43210</p>
        </div>
        <div className="info-item">
          <FaEnvelope className="icon" />
          <p>info@eduinstitute.com</p>
        </div>
      </div>

      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input name="address" type="text" placeholder="Your Address" value={formData.address} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <input name="mobile" type="tel" placeholder="Your Mobile Number" value={formData.mobile} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
