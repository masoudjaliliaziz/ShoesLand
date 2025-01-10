import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[]; // Array of image URLs
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const navigate = useNavigate()
  return (
    <div className="relative w-full mb-6">
      {/* Carousel Image */}
      <IoMdArrowRoundBack
        onClick={() => navigate(-1)}
        className="size-9 absolute left-3 font-bold"
      />

      <img
        src={images[currentIndex]}
        className="h-80 w-full object-cover rounded-lg"
        alt={`Product Image ${currentIndex + 1}`}
      />

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition-all"
        aria-label="Previous Image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition-all"
        aria-label="Next Image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots for Image Navigation */}
      <div className="flex justify-center mt-3 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
            aria-label={`Go to Image ${index + 1}`}
          ></button>
        ))}
      </div>
    </div >
  );
};

export default ImageCarousel;

