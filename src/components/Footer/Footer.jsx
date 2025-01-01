import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="landingpage__footer">
      <div className="landingpage__footer__newsletter">
        <h3>Subscribe to Our Newsletter</h3>
        <form className="landingpage__footer__form">
          <input
            type="email"
            placeholder="Enter your email"
            className="landingpage__footer__input"
          />
          <button type="submit" className="landingpage__footer__subscribe">
            Subscribe
          </button>
        </form>
      </div>

      <div className="landingpage__footer__social">
        <h3>Follow Us</h3>
        <div className="landingpage__footer__social__icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="landingpage__footer__links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/terms">Terms & Conditions</a></li>
          <li><a href="/rules">Rules & Regulations</a></li>
          <li><a href="/rulebook">Rule Book</a></li>
          <li><a href="/license">License</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>

      <div className="landingpage__footer__copy">
        <p>© {new Date().getFullYear()} Creative Minds All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
