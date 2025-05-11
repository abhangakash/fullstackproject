import React from 'react';
import HeroSection from '../components/HeroSection';
import RegistrationForm from '../components/RegistrationForm';
 import UpcomingEvents from '../components/UpcomingEvents';
// import NewsTicker from '../components/NewsTicker';
 import NoticeBoard from '../components/NoticeBoard';
 import AwardsAchievements from '../components/AwardsAchievements';
 import PhotosVideosGallery from '../components/PhotosVideosGallery';
 import "../styles/Home.css";

// import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
// import FAQ from '../components/FAQ';
// import ImportantLinks from '../components/ImportantLinks';
 import Footer from '../components/Footer';
// import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <RegistrationForm />
      <UpcomingEvents />
      <NoticeBoard />
      <AwardsAchievements />
      <PhotosVideosGallery />
         <Testimonials />
         <Footer />


      {/* 
      <NewsTicker />
      <NoticeBoard />
      
      <Gallery />
      <FAQ />
      <ImportantLinks />
       */}
    </div>
  );
};

export default Home;
