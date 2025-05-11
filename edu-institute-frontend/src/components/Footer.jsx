import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Icons for social media
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-links">
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-conditions">Terms & Conditions</a></li>
            <li><a href="/Contact">Contact Us</a></li>
            <li><a href="/About">About Us</a></li>
          </ul>
        </div>

        <div className="footer-socials">
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Educational Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
