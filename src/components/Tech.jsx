import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const TechCard = ({ name, icon, style, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
    className="absolute"
    style={style}
  >
    <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] rounded-full bg-[#1a1a2e] flex flex-col items-center justify-center text-center border-2 border-transparent hover:border-pink-400 hover:scale-110 transition-all duration-300 shadow-lg cursor-pointer">
      <img
        src={icon}
        alt={name}
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
      />
      <p className="text-[10px] sm:text-[12px] text-white font-semibold mt-2">
        {name}
      </p>
    </div>
  </motion.div>
);

const Tech = () => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const updatePositions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;

        const radius = Math.min(containerWidth, containerHeight) / 3;
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;

        const newPositions = technologies.map((_, i) => {
          const angle = (i / technologies.length) * 2 * Math.PI;
          return {
            x: centerX + radius * Math.cos(angle) - 60,
            y: centerY + radius * Math.sin(angle) - 60,
          };
        });

        setPositions(newPositions);
      }
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square max-w-[90vw] sm:max-w-[500px] md:max-w-[600px] rounded-full bg-gradient-to-b from-[#0f0f2e] to-[#1a1a2e] overflow-hidden border-2 border-purple-500 shadow-xl"
    >
      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wider">
          SKILLS
        </h2>
      </div>

      {/* SVG Lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {positions.map((from, i) =>
          positions.map((to, j) => {
            if (i !== j && Math.random() > 0.7) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={from.x + 60}
                  y1={from.y + 60}
                  x2={to.x + 60}
                  y2={to.y + 60}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
              );
            }
            return null;
          })
        )}
      </svg>

      {/* Tech Cards */}
      {positions.length > 0 &&
        technologies.map((tech, index) => (
          <TechCard
            key={tech.name}
            name={tech.name}
            icon={tech.icon}
            index={index}
            style={{
              left: positions[index].x,
              top: positions[index].y,
            }}
          />
        ))}
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
