import React from "react";
import { Link } from "react-router-dom"; // Add this line
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HeroSection.css";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1581090700227-1e8b64b8c27c",
    caption: "Modern Classrooms with Smart Learning",
  },
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    caption: "Vibrant Campus Life",
  },
  {
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    caption: "Hands-on Practical Labs",
  },
  {
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
    caption: "Library & Learning Resources",
  },
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 1000,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: false,
  pauseOnHover: false,
};

const HeroSection = () => {
  return (
    <div className="hero-container">
      <Slider {...sliderSettings} className="hero-slider">
        {slides.map((slide, index) => (
          <div key={index} className="hero-slide">
            <img src={slide.image} alt={`Slide ${index + 1}`} className="hero-slide-img" />
            <div className="hero-caption">{slide.caption}</div>
          </div>
        ))}
      </Slider>

      <div className="hero-overlay">
        <h1 className="hero-title">Welcome to Our Educational Institute</h1>
        <p className="hero-subtitle">Empowering the future through quality education</p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button apply">Apply Now</Link>
          <a href="/courses" className="cta-button explore">Explore Courses</a>
          <a href="/gallery" className="cta-button tour">Campus Tour</a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
