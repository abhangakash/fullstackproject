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
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import RegistrationForm from "./components/RegistrationForm";
import ReactGA from 'react-ga4';
import Departments from './pages/Departments';
import CSDepartment from "./pages/DepartmentDetails/cs";
import ITDepartment from "./pages/DepartmentDetails/it";
import ENTCDepartment from "./pages/DepartmentDetails/entc";
import MECHDepartment from "./pages/DepartmentDetails/mech";
import AERODepartment from "./pages/DepartmentDetails/aero";








// Import other pages as needed
ReactGA.initialize('G-L7X4E7FD4Y');
ReactGA.send("pageview");


const App = () => {
  return (
    <Router>
            <Navbar /> {/* ✅ Add navbar here */}
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
         <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/register" element={<RegistrationForm />} />
         <Route path="/departments" element={<Departments />} />
      <Route path="/departments/cs" element={<CSDepartment />} />
            <Route path="/departments/it" element={<ITDepartment />} />
            <Route path="/departments/entc" element={<ENTCDepartment />} />
      <Route path="/departments/mech" element={<MECHDepartment />} />
            <Route path="/departments/aero" element={<AERODepartment />} />






        {/* Add routes for other pages */}
      </Routes>
    </Router>
  );
};

export default App;
