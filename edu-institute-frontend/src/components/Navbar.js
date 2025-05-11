import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className="navbar">
      <div className="navbar-logo">EduInstitute</div>

      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
        <li><NavLink to="/faculty" activeClassName="active">Faculty</NavLink></li>
       {/*} <li><NavLink to="/application" activeClassName="active">Application</NavLink></li>*/} {/* Updated Admission to Application */}
        <li><NavLink to="/courses" activeClassName="active">Courses</NavLink></li>
        <li><NavLink to="/gallery" activeClassName="active">Gallery</NavLink></li>
        <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>

        {/* Dropdown */}
        <li className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <span className="dropdown-toggle">Departments ▾</span>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li><NavLink to="/departments/cs">Computer Science</NavLink></li>
              <li><NavLink to="/departments/math">Mathematics</NavLink></li>
              <li><NavLink to="/departments/physics">Physics</NavLink></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
