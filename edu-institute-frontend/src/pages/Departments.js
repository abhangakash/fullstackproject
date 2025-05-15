import React, { useState } from "react";
import "../styles/Departments.css";
// import { Link } from "react-router-dom";

// Import department components
import CSDepartment from "./DepartmentDetails/cs";
import ITDepartment from "./DepartmentDetails/it";
 import ENTCDepartment from "./DepartmentDetails/entc";
import MechanicalDepartment from "./DepartmentDetails/mech";
import AeroDepartment from "./DepartmentDetails/aero";

const departments = [
  { name: "Computer Engineering", short: "CS", id: "cs" },
  { name: "Information Technology", short: "IT", id: "it" },
  { name: "Electronics & Telecommunication", short: "ENTC", id: "entc" },
  { name: "Mechanical Engineering", short: "MECH", id: "mech" },
  { name: "Aeronautics", short: "AERO", id: "aero" },
];

const Departments = () => {
  const [selectedDept, setSelectedDept] = useState(null);

  const handleDeptClick = (dept) => {
    setSelectedDept(dept);
  };

  const closeModal = () => {
    setSelectedDept(null);
  };

  return (
    <div className="departments-container">
      <h1 className="departments-heading">Our Departments</h1>
      <div className="departments-grid">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="department-card"
            onClick={() => handleDeptClick(dept)}
          >
            <h2>{dept.short}</h2>
            <p>{dept.name}</p>
          </div>
        ))}
      </div>

      {/* Conditional Modals */}
      {selectedDept?.id === "cs" && <CSDepartment onClose={closeModal} />}
      {selectedDept?.id === "it" && <ITDepartment onClose={closeModal} />}
      {selectedDept?.id === "entc" && <ENTCDepartment onClose={closeModal} />}
      {selectedDept?.id === "mech" && <MechanicalDepartment onClose={closeModal} />}
      {selectedDept?.id === "aero" && <AeroDepartment onClose={closeModal} />}
    </div>
  );
};

export default Departments;



