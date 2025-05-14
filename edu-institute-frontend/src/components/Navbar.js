import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const closeOnResize = () => window.innerWidth > 768 && setIsOpen(false);
    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  return (
    <nav className="navbar glass">
      <div className="navbar-logo">
        <img src="/logo512.png" alt="Edu Logo" className="logo-icon" />
        <span>Edu Institute</span>
      </div>

      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        {[
          { to: '/', label: 'Home' },
          { to: '/about', label: 'About' },
          { to: '/faculty', label: 'Faculty' },
          { to: '/courses', label: 'Courses' },
          { to: '/gallery', label: 'Gallery' },
          { to: '/contact', label: 'Contact' },
        ].map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} exact="true" activeClassName="active" onClick={closeMenu}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
