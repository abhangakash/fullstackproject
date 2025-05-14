import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HeroSection.css";

// ✅ Import local images
// import campusImg from "/images/img11";
// import labsImg from "/images/img12";
// import libraryImg from "/images/img13";
// import libraryIm from "/images/img14";

const slides = [
  

  {
    image: "/images/img21.jpg",
    caption: "Hon. President Shashi ji",
  },
  {
    image: "/images/img22.jpg",
    caption: "It always seems impossible until it's done: Words by Shashi ji",
  },
  {
    image: "/images/img23.jpg",
    caption: "#लाडाचे शेठ",
  },
  {
    image: "/images/img15.jpg",
    caption: "The best way to predict the future is to create it : Shashi ji",
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
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="hero-slide-img"
            />
            <div className="hero-caption">{slide.caption}</div>
          </div>
        ))}
      </Slider>

      <div className="hero-overlay">
        <h1 className="hero-title">Welcome to Our Educational Institute</h1>
        <p className="hero-subtitle">Empowering the future through quality education</p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button apply">Apply Now</Link>
          <Link to="/courses" className="cta-button explore">Explore Courses</Link>
          <Link to="/gallery" className="cta-button tour">Campus Tour</Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
