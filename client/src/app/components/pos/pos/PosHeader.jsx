"use client";
import React, { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaBoxes } from "react-icons/fa";

const categories = [
  "Electronics",
  "Clothes",
  "Shoes",
  "Watches",
  "Furniture",
  "Sports",
];

const PosHeader = () => {
  const containerRef = useRef(null);

  // Left scroll
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  // Right scroll
  const scrollRight = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    // যদি একদম শেষে চলে যায় → আবার প্রথম থেকে শুরু হবে
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Auto Scroll every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full p-2 bg-white shadow-sm overflow-x-hidden">
      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 shadow rounded-full z-10 hover:bg-white"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 shadow rounded-full z-10 hover:bg-white"
      >
        <FaChevronRight />
      </button>

      {/* Category Cards */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-4 px-10 scroll-smooth"
        style={{
          msOverflowStyle: "none", // IE & Edge
          scrollbarWidth: "none", // Firefox
        }}
      >
        {/* Chrome, Safari scrollbar hide */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-40 h-20 bg-gray-100 hover:bg-blue-100 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow"
          >
            <FaBoxes className="text-gray-600" />
            <span className="text-gray-700 font-medium">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PosHeader;
