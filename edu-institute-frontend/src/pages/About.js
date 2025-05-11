import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <div className="about-content">
        <p>
          At ABC Institute of Technology, we believe education is the foundation for innovation and progress.
          Our institution is committed to providing a high-quality, accessible, and industry-relevant learning
          experience for students from all backgrounds.
        </p>

        <p>
          Founded with a vision to bridge the gap between academic theory and real-world application,
          we offer a wide range of programs in technology, business, and science—designed to equip students
          with the skills and mindset required to thrive in a fast-changing world.
        </p>

        <h2>Our Mission</h2>
        <p>
          To deliver transformative education through rigorous academics, hands-on learning, and a commitment 
          to diversity and inclusion. We aim to develop critical thinkers, innovators, and leaders who can 
          make meaningful contributions to society.
        </p>

        <h2>Our Vision</h2>
        <p>
          To be a forward-thinking institution recognized for academic excellence, impactful research, and 
          community engagement—empowering students to shape the future with integrity, empathy, and purpose.
        </p>

        <p>
          Whether you’re starting your educational journey or advancing your career, ABC Institute of Technology 
          is here to support your goals every step of the way.
        </p>
      </div>
    </div>
  );
};

export default About;
