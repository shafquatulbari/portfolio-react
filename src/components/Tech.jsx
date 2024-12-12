import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const TechCard = ({ index, name, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.5, type: "spring", stiffness: 50 }}
    className="w-[250px] h-[300px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] rounded-[20px] shadow-lg"
  >
    <div className="bg-[#1a1a2e] rounded-[20px] py-5 px-8 flex flex-col justify-center items-center">
      <img
        src={icon}
        alt={name}
        className="w-20 h-20 object-contain filter drop-shadow-md"
      />
      <h3 className="text-[#e0e0e0] text-[20px] font-bold text-center mt-4">
        {name}
      </h3>
    </div>
  </motion.div>
);

const Tech = () => {
  const [visibleTechs, setVisibleTechs] = useState([]);

  useEffect(() => {
    let timeoutIds = [];

    // Sequentially add each technology to the visible list
    technologies.forEach((tech, index) => {
      const timeoutId = setTimeout(() => {
        setVisibleTechs((prevTechs) => [...prevTechs, tech]);
      }, index * 500); // 500ms delay between each card
      timeoutIds.push(timeoutId);
    });

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {visibleTechs.map((technology, index) => (
        <TechCard
          key={technology.name}
          index={index}
          name={technology.name}
          icon={technology.icon}
        />
      ))}
    </div>
  );
};

export default SectionWrapper;
