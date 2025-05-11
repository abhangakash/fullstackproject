import React from 'react';
import Slider from 'react-slick'; // Import the slick slider
import '../styles/Testimonials.css';

// Sample Testimonial Data
const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Student',
    feedback: 'This institution has transformed my career! The learning environment is excellent.',
    image: 'https://via.placeholder.com/150x150?text=John+Doe'
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Alumni',
    feedback: 'The professors are highly skilled and the curriculum is always updated to meet industry standards.',
    image: 'https://via.placeholder.com/150x150?text=Jane+Smith'
  },
  {
    id: 3,
    name: 'Robert Brown',
    position: 'Faculty',
    feedback: 'I’ve seen many of my students go on to do great things. This institution has provided me with immense opportunities.',
    image: 'https://via.placeholder.com/150x150?text=Robert+Brown'
  },
  {
    id: 4,
    name: 'Sarah Lee',
    position: 'Student',
    feedback: 'The campus life is vibrant, and the resources available to students are top-notch. Highly recommend!',
    image: 'https://via.placeholder.com/150x150?text=Sarah+Lee'
  },
];

const Testimonials = () => {
  const settings = {
    dots: true, // Enable dots for navigation
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Disable the previous/next arrows
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  return (
    <section className="testimonials-section">
      <h2>What Our Students & Faculty Say</h2>
      <Slider {...settings} className="testimonials-slider">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-image">
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <div className="testimonial-content">
              <h3>{testimonial.name}</h3>
              <p className="position">{testimonial.position}</p>
              <p className="feedback">{testimonial.feedback}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
