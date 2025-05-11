import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import MessagesViewer from './AdminDashboard/MessagesViewer';

import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    duration: '',
    level: '',
    department: '',
    imageUrl: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/courses', newCourse);
      setCourses([...courses, response.data]);
      setNewCourse({
        title: '',
        description: '',
        duration: '',
        level: '',
        department: '',
        imageUrl: ''
      });
      alert('Course added successfully!');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
        <MessagesViewer />
      {/*     <CourseManager /> */}
      <div className="add-course-section">
        <h2>Add New Course</h2>
        <form className="course-form" onSubmit={handleAddCourse}>
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={newCourse.duration}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="level"
            placeholder="Level"
            value={newCourse.level}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={newCourse.department}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL (Optional)"
            value={newCourse.imageUrl}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Course Description"
            value={newCourse.description}
            onChange={handleInputChange}
            rows="4"
            required
          />
          <button type="submit">Add Course</button>
        </form>
      </div>

      {/* Existing Courses */}
      <div className="course-list-section">
        <h2>Existing Courses</h2>
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course._id} className="course-item">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Level:</strong> {course.level}</p>
              <p><strong>Department:</strong> {course.department}</p>
              {course.imageUrl && <img src={course.imageUrl} alt={course.title} className="course-image" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;