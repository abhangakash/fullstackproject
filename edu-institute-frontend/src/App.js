import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Faculty from './pages/Faculty';
import FacultyForm from './pages/FacultyForm';
import Login from './pages/login';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import Application from './pages/Application'; // Import the new Application component
import ThankYou from './pages/ThankYou'; // Import ThankYou page
import CourseDetail from './pages/CourseDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import RegistrationForm from "./components/RegistrationForm";
import ReactGA from 'react-ga4';
import Analytics from './pages/Analytics';








// Import other pages as needed
ReactGA.initialize('G-L7X4E7FD4Y');
ReactGA.send("pageview");


const App = () => {
  return (
    <Router>
            <Navbar /> {/* ✅ Add navbar here */}
            <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/add-faculty" element={<FacultyForm />} />
        <Route path="/login" element={<Login setToken={(t) => console.log('Token:', t)} />} />
        <Route path="/application" element={<Application />} />
        <Route path="/thank-you" element={<ThankYou />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/courses/:courseCode" element={<CourseDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/register" element={<RegistrationForm />} />


        {/* Add routes for other pages */}
      </Routes>
    </Router>
  );
};

export default App;
