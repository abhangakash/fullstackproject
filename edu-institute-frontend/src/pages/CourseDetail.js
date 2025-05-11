import React from 'react';
import { useParams } from 'react-router-dom';

const courseDetails = {
  cse: {
    title: 'Computer Science Engineering (CSE)',
    content: 'In-depth curriculum focused on AI, ML, Web Dev, System Design, and Programming.'
  },
  it: {
    title: 'Information Technology (IT)',
    content: 'Specializes in software systems, networks, and emerging technologies.'
  },
  entc: {
    title: 'Electronics & Telecommunication (ENTC)',
    content: 'Deals with embedded systems, VLSI, signal processing, and IoT.'
  },
  ee: {
    title: 'Electrical Engineering (EE)',
    content: 'Focuses on circuits, power systems, and industrial automation.'
  },
  me: {
    title: 'Mechanical Engineering (ME)',
    content: 'Mechanical systems, thermal sciences, and robotics.'
  },
  ce: {
    title: 'Civil Engineering (CE)',
    content: 'Design and analysis of infrastructure projects like bridges and buildings.'
  }
};

const CourseDetail = () => {
  const { courseCode } = useParams();
  const course = courseDetails[courseCode];

  if (!course) return <h2>Course not found.</h2>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{course.title}</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{course.content}</p>
    </div>
  );
};

export default CourseDetail;