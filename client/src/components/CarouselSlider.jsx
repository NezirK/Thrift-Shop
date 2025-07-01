import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CarouselSlider.css';

const CarouselSlider = () => {
  return (
    <div className="carousel-container">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div className="carousel-slide">
          <img src="/Slideimg.1.png" alt="Slide 1" />
          <p className="legend">Discover Unique Styles</p>
        </div>
        <div className="carousel-slide">
          <img src="/Slideimg.2.png" alt="Slide 2" />
          <p className="legend">Vintage Meets Modern</p>
        </div>
        <div className="carousel-slide">
          <img src="/Slideimg.1.png" alt="Slide 3" />
          <p className="legend">Shop Your Vibe</p>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
