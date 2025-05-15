import React from "react";
import "./aero.css";

const AeronauticsDepartment = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Department of Aeronautics</h2>

        <div className="department-images">
          <img src="/images/aero1.jpg" alt="Aeronautics Lab" />
          <img src="/images/aero2.jpg" alt="Wind Tunnel" />
          <img src="/images/aero3.jpg" alt="Aircraft Model" />
        </div>

        <p>
          The Department of Aeronautics focuses on the study of aircraft design,
          aerodynamics, propulsion, and aerospace materials. It aims to prepare
          students for careers in the rapidly evolving aerospace sector.
        </p>

        <p>
          Equipped with advanced laboratories including wind tunnels and flight
          simulators, the department emphasizes hands-on experience and research.
          Students are encouraged to engage in projects and collaborations with
          leading aerospace organizations.
        </p>

        <h3>Vision</h3>
        <ul>
          <li>To become a center of excellence in aerospace education and research.</li>
        </ul>

        <h3>Mission</h3>
        <ul>
          <li>To deliver quality education that integrates theory and practical skills.</li>
          <li>To promote innovative research and industry collaboration.</li>
          <li>To develop skilled aerospace engineers committed to ethical standards.</li>
        </ul>
      </div>
    </div>
  );
};

export default AeronauticsDepartment;
