import React from 'react';
import './HomePage.css';

const images = [
  '/carousel1.jpg',
  '/carousel2.jpg',
  '/carousel3.jpg'
];

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="carousel-container">
        <div className="carousel-track">
          {images.map((img, index) => (
            <div className="carousel-slide" key={index}>
              <img src={img} alt={`Slide ${index}`} />
              <div className="overlay">
                <a href="/men">Meshkuj</a>
                <a href="/women">Femra</a>
                <a href="/kids">Fëmijë</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
