import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../styles/Courses.css";

Modal.setAppElement("#root"); // Ensure accessibility

const CoursesNew = () => {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  // Fetch courses from the API when the component mounts
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/courses`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const filterCourses = (branch) => setSelectedBranch(branch);
  const filteredCourses = selectedBranch === "All" ? courses : courses.filter(course => course.branch === selectedBranch);

  return (
    <div className="container">
      <h2>Explore Our Courses</h2>

      {/* Branch Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => filterCourses("All")}>All</button>
        <button onClick={() => filterCourses("CS")}>Computer Science</button>
        <button onClick={() => filterCourses("ENTC")}>Electronics and Telecom</button>
        <button onClick={() => filterCourses("ME")}>Mechanical Engineering</button>
        <button onClick={() => filterCourses("AE")}>Aeronautical Engineering</button>
      </div>

      {/* Courses Grid */}
      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <img src={course.imageUrl} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button className="learn-more" onClick={() => setSelectedCourse(course)}>Learn More</button>
          </div>
        ))}
      </div>

      {/* Modal for Course Details */}
      {selectedCourse && (
        <Modal 
          isOpen={!!selectedCourse} 
          onRequestClose={() => setSelectedCourse(null)} 
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h2>{selectedCourse.title}</h2>
          <p>{selectedCourse.description}</p>
          <hr />
          <p><strong>Detailed Information:</strong> {selectedCourse.fullDetails}</p>
          <button onClick={() => setSelectedCourse(null)}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default CoursesNew;
