import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const TechCard = ({ index, name, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2, type: "spring", stiffness: 50 }}
    className="w-[200px] h-[138px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] rounded-[15px] shadow-lg flex-shrink-0 transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
  >
    <div className="bg-[#1a1a2e] rounded-[15px] py-4 px-6 flex flex-col justify-center items-center">
      <img
        src={icon}
        alt={name}
        className="w-16 h-16 object-contain filter drop-shadow-md"
      />
      <h3 className="text-[#e0e0e0] text-[16px] font-bold text-center mt-4">
        {name}
      </h3>
    </div>
  </motion.div>
);

const Tech = () => {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;

      const currentScroll = scrollContainerRef.current.scrollLeft;
      const scrollAmount = direction === "left" ? -300 : 300;

      if (
        (direction === "left" && currentScroll > 0) ||
        (direction === "right" && currentScroll < maxScrollLeft)
      ) {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Scroll Buttons */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg z-10 hover:bg-gray-600"
      >
        &#8592;
      </button>
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg z-10 hover:bg-gray-600"
      >
        &#8594;
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-6 px-4 py-6"
      >
        {technologies.map((technology, index) => (
          <TechCard
            key={technology.name}
            index={index}
            name={technology.name}
            icon={technology.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
