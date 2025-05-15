import React from "react";
import { useNavigate } from "react-router-dom";
import "./it.css";

const ITDepartment = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      console.warn("onClose prop is not a function");
    }
    navigate("/departments"); // optional navigation on close
  };

  return (
    <div className="department-popup">
      <div className="popup-content">
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
        <h2>Department of Information Technology</h2>

        <div className="popup-images">
          <img src="https://picsum.photos/id/1041/800/400" alt="IT Lab 1" />
          <img src="https://picsum.photos/id/1045/800/400" alt="IT Lab 2" />
          <img src="https://picsum.photos/id/1050/800/400" alt="IT Event" />
        </div>

        <p>
          The Department of Information Technology focuses on producing well-rounded
          graduates with technical skills and industry awareness. It emphasizes
          hands-on experience, teamwork, and professional development.
        </p>

        <p>
          The department is equipped with modern infrastructure and computing
          facilities, encouraging innovative thinking and project development.
          Students regularly participate in technical events, hackathons, and
          research activities.
        </p>

        <p>
          Alumni are contributing to renowned organizations across the globe.
          Department promotes a culture of learning through MOOC certifications,
          industrial collaborations, and active student clubs.
        </p>

        <h3>Vision:</h3>
        <p>• To build globally competent IT professionals through innovation and excellence.</p>

        <h3>Mission:</h3>
        <p>• To provide comprehensive education in Information Technology.</p>
        <p>• To foster innovation, ethical values, and industry collaboration.</p>
        <p>• To motivate research and life-long learning.</p>
      </div>
    </div>
  );
};

export default ITDepartment;
