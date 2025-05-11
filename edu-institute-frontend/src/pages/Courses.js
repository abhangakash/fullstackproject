import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/Courses.css";

Modal.setAppElement("#root"); // Ensure accessibility

const allCourses = [
  { id: 1, title: "Data Structures and Algorithms", branch: "CS", description: "Learn the essential data structures and algorithms used in computer science.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "This course covers fundamental data structures such as arrays, linked lists, stacks, queues, trees, and graphs, along with essential algorithms including sorting, searching, and dynamic programming." },
  { id: 2, title: "Computer Networks", branch: "CS", description: "Study the principles of computer networking and communication.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "Learn about network models, protocols, security measures, and practical implementation strategies used in modern networking." },
  { id: 3, title: "Digital Electronics", branch: "ENTC", description: "Understand digital circuits and their applications in electronics.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "This course explores logic gates, combinational and sequential circuits, memory devices, and digital signal processing." },
  { id: 4, title: "Signal Processing", branch: "ENTC", description: "Dive into signal analysis and processing techniques used in telecommunications.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "Key topics include Fourier analysis, convolution, filtering techniques, and practical applications in audio and image processing." },
  { id: 5, title: "Mechanical Vibrations", branch: "ME", description: "Study the vibrations and oscillations in mechanical systems.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "Understand free and forced vibrations, damping mechanisms, and vibration isolation techniques in mechanical structures." },
  { id: 6, title: "Thermodynamics", branch: "ME", description: "Learn the principles of thermodynamics and their application in mechanical engineering.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "Covers laws of thermodynamics, heat transfer methods, and thermodynamic cycles used in engines and power plants." },
  { id: 7, title: "Control Systems", branch: "AE", description: "Study the fundamentals of control theory and its applications in aeronautical engineering.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "Topics include feedback control, stability analysis, PID controllers, and aerospace control applications." },
  { id: 8, title: "Fluid Mechanics", branch: "AE", description: "Understand the properties and behavior of fluids and their engineering applications.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "Learn about fluid properties, pressure distribution, laminar and turbulent flow, and applications in aerodynamics." },
  { id: 9, title: "Embedded Systems", branch: "ENTC", description: "Learn about embedded systems design and their applications in electronics.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "Covers microcontroller architectures, real-time operating systems, and embedded software development techniques." }
];

const CoursesNew = () => {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filterCourses = (branch) => setSelectedBranch(branch);
  const filteredCourses = selectedBranch === "All" ? allCourses : allCourses.filter(course => course.branch === selectedBranch);

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