import React from "react";
import "../../styles/Departments.css";

const ENTCDepartment = ({ onClose }) => {
  return (
    <div className="department-popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Department of Electronics & Telecommunication Engineering</h2>

        <div className="department-images">
          <img src="/images/entc1.jpg" alt="Lab Setup" />
          <img src="/images/entc2.jpg" alt="Seminar" />
          <img src="/images/entc3.jpg" alt="Project Display" />
        </div>

        <p>
          The Department of Electronics & Telecommunication Engineering is dedicated
          to providing a strong foundation in electronics, signal processing,
          telecommunications, and embedded systems. Established with a vision to
          produce industry-ready engineers, the department integrates theoretical
          concepts with practical applications.
        </p>

        <p>
          Students engage in hands-on learning through state-of-the-art labs,
          project-based assignments, and technical workshops. The department is
          committed to developing professionals who are innovative, ethical, and
          adaptable to the evolving tech landscape.
        </p>

        <h3>Vision</h3>
        <ul>
          <li>To be a center of excellence in Electronics and Telecommunication Engineering education and research.</li>
        </ul>

        <h3>Mission</h3>
        <ul>
          <li>To impart quality education through a dynamic curriculum and modern infrastructure.</li>
          <li>To encourage innovation, entrepreneurship, and professional ethics.</li>
          <li>To strengthen industry-academic collaboration for real-world exposure.</li>
        </ul>
      </div>
    </div>
  );
};

export default ENTCDepartment;
