import React, { useState } from "react";
import "./Carousel.css";

const Carousel = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-modal">
      <div className="carousel-content">
        <button className="btn btn-close" onClick={onClose}>Close</button>
        <button className="btn btn-prev" onClick={handlePrev}>Prev</button>
        <img src={images[currentIndex].url} alt={images[currentIndex].title} />
        <button className="btn btn-next" onClick={handleNext}>Next</button>
        <p>{images[currentIndex].title}</p>
      </div>
    </div>
  );
};

export default Carousel;