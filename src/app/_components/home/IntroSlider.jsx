"use client"
import React, { useState, useEffect } from "react";

const IntroSlider = () => {
  const slides = [
    { id: 1, image: "images/banner1.png" },
    { id: 2, image: "images/banner1.png" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000); // 2-second delay

    return () => clearInterval(slideInterval); 
  }, []);

  return (
    <div className="relative lg:w-9/12 w-full my-19 rounded-lg mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out  mp-5"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="flex-none w-full ">
            <img src={slide.image} alt={`Slide ${slide.id}`} className="w-full rounded-[20px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroSlider;
