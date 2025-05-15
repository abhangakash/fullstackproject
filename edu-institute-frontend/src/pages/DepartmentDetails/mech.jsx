import React from "react";
import "./mech.css";

const MechanicalDepartment = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Department of Mechanical Engineering</h2>

        <div className="department-images">
          <img src="/images/mech1.jpg" alt="Workshop" />
          <img src="/images/mech2.jpg" alt="CAD Lab" />
          <img src="/images/mech3.jpg" alt="Project Model" />
        </div>

        <p>
          The Department of Mechanical Engineering offers a comprehensive program
          focusing on design, manufacturing, and thermal sciences. It prepares
          students for careers in diverse industries through a combination of
          theoretical knowledge and practical skills.
        </p>

        <p>
          State-of-the-art laboratories and workshops provide hands-on
          experience in areas such as material testing, fluid mechanics,
          robotics, and CAD/CAM. The department encourages innovation and
          interdisciplinary collaboration to address real-world engineering
          challenges.
        </p>

        <h3>Vision</h3>
        <ul>
          <li>To be a leading department in mechanical engineering education and research.</li>
        </ul>

        <h3>Mission</h3>
        <ul>
          <li>To provide quality education with a focus on innovation and practical learning.</li>
          <li>To foster research and development activities aligned with industry needs.</li>
          <li>To promote ethical practices and lifelong learning among students.</li>
        </ul>
      </div>
    </div>
  );
};

export default MechanicalDepartment;
