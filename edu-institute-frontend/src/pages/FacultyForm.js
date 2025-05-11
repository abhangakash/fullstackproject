import React, { useState } from 'react';
import axios from 'axios';

const FacultyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    designation: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.department.trim()) newErrors.department = 'Department is required.';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validate()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/faculty', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('✅ Faculty added successfully!');
      setFormData({ name: '', department: '', designation: '' });
      setErrors({});
    } catch (err) {
      console.error(err);
      setMessage('❌ Error adding faculty. Check authentication or server.');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '40px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ textAlign: 'center' }}>Add New Faculty</h2>
      {message && <p style={{ textAlign: 'center', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Department:</label><br />
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
          {errors.department && <span style={{ color: 'red' }}>{errors.department}</span>}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Designation:</label><br />
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
          {errors.designation && <span style={{ color: 'red' }}>{errors.designation}</span>}
        </div>
        <button type="submit" style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>Add Faculty</button>
      </form>
    </div>
  );
};

export default FacultyForm;
