import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegistrationForm.css'; // Make sure to create this CSS file

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    branch: '',
    year: '',
  });

  const [status, setStatus] = useState({ submitted: false, error: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, formData);
      setStatus({ submitted: true, error: false, message: res.data.message });
      setFormData({ fullName: '', email: '', phone: '', branch: '', year: '' });
    } catch (error) {
      setStatus({
        submitted: false,
        error: true,
        message: error.response?.data?.message || 'Registration failed',
      });
    }
  };

  return (
    <section className="registration-section">
      <h2>Student Registration</h2>

      {status.submitted && !status.error ? (
        <div className="success-message">
          <h3>{status.message}</h3>
        </div>
      ) : (
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <select name="branch" required value={formData.branch} onChange={handleChange}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ENTC">ENTC</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
          <select name="year" required value={formData.year} onChange={handleChange}>
            <option value="">Select Year</option>
            <option value="First">First Year</option>
            <option value="Second">Second Year</option>
            <option value="Third">Third Year</option>
            <option value="Final">Final Year</option>
          </select>
          <button type="submit">Register</button>
        </form>
      )}

      {status.error && <p className="error-message">{status.message}</p>}
    </section>
  );
};

export default RegistrationForm;
