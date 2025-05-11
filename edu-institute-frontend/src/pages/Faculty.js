import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Faculty.css"; // Importing the CSS file

const Faculty = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetching faculty data from the backend
    axios.get("http://localhost:5000/api/faculty")
      .then((response) => {
        setFacultyData(response.data); // Set the fetched faculty data to state
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching faculty data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="faculty-container">
      <h1 className="faculty-title">Our Faculty</h1>
      <div className="faculty-list">
        {facultyData.map((faculty) => (
          <div className="faculty-card" key={faculty._id}>
            <img src={faculty.photo} alt={faculty.name} className="faculty-photo" />
            <div className="faculty-info">
              <h3>{faculty.name}</h3>
              <p>{faculty.designation}</p>
              <p>{faculty.department}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
