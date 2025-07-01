import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-logo">
          <h2>Thrift Shop</h2>
          <p>Style that saves.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-categories">
          <h4>Categories</h4>
          <ul>
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/kids">Kids</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Subscribe</h4>
          <p>Get the latest deals and offers</p>
          <input type="email" placeholder="Your email" />
          <button>Subscribe</button>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Thrift Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
