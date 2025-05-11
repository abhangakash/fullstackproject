import React, { useState } from "react";
import "../styles/Admission.css"; // Importing the CSS file

const Admission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a server or database
    setFormSubmitted(true);
  };

  return (
    <div className="admission-container">
      <h1 className="admission-title">Admission Process</h1>

      <div className="admission-info">
        <section>
          <h2>Eligibility Criteria</h2>
          <ul>
            <li>Must have completed 10+2 or equivalent for undergraduate courses.</li>
            <li>Must have a bachelor’s degree for postgraduate courses.</li>
            <li>Specific course requirements are listed on the course page.</li>
          </ul>
        </section>

        <section>
          <h2>How to Apply</h2>
          <ol>
            <li>Fill out the application form below.</li>
            <li>Submit the required documents (e.g., ID proof, academic certificates).</li>
            <li>Our team will contact you for further steps.</li>
          </ol>
        </section>
      </div>

      <div className="admission-form">
        <h2>Application Form</h2>
        {formSubmitted ? (
          <div className="success-message">
            <h3>Thank you for your application!</h3>
            <p>Our team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course">Course Applying For</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select a Course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
                <option value="Ph.D.">Ph.D.</option>
                {/* Add more courses as required */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Admission;
