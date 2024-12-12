import React from "react";
import Tilt from "react-parallax-tilt"; // Change to a more reliable library if needed
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import web from "../../public/assets/services/web.png";
import backend from "../../public/assets/services/backend.png";
import game from "../../public/assets/services/game.png";
import ml from "../../public/assets/services/ml.png";

// Define styles (You can move these to a CSS or Tailwind file if needed)
const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",
  heroHeadText:
    "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
  heroSubText:
    "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",
  sectionHeadText:
    "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText:
    "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
};

// Services array
const services = [
  {
    title: "Full Stack Developer",
    icon: web,
  },
  {
    title: "SQA Engineer",
    icon: backend,
  },
  {
    title: "Game Developer",
    icon: game,
  },
  {
    title: "AI/ML Engineer",
    icon: ml,
  },
];

const ServiceCard = ({ index, title, icon }) => (
  <Tilt
    className="xs:w-[250px] w-full"
    tiltMaxAngleX={35}
    tiltMaxAngleY={35}
    perspective={1000}
    transitionSpeed={400}
    scale={1.05} // Slight hover scaling for a polished effect
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] rounded-[20px] shadow-lg"
    >
      <div
        className="bg-[#1a1a2e] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Subtle card shadow
        }}
      >
        <img
          src={icon}
          alt={title}
          className="w-16 h-16 object-contain filter drop-shadow-lg"
        />
        <h3
          className="text-[#e0e0e0] text-[20px] font-bold text-center"
          style={{
            textShadow: "1px 1px 6px rgba(0, 0, 0, 0.8)", // Shadow for text
          }}
        >
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => (
  <>
    <motion.div variants={textVariant()}>
      <p
        className={`${styles.sectionSubText} text-[#b3b3ff]`}
        style={{
          textShadow: "1px 1px 5px rgba(0, 0, 0, 0.6)", // Blackish shadow for better readability
        }}
      >
        Introduction
      </p>
      <h2
        className={`${styles.sectionHeadText}`}
        style={{
          textShadow:
            "2px 2px 10px rgba(0, 0, 0, 0.8), 0px 0px 10px rgba(179, 107, 255, 0.8)", // Blackish border + subtle glow
          color: "#b36bff", // Purplish color for the heading
        }}
      >
        Overview.
      </h2>
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-4 text-[#e0e0e0] text-[17px] max-w-3xl leading-[30px]"
      style={{
        textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)", // Subtle shadow for text
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Blackish transparent background
        padding: "15px",
        borderRadius: "8px",
      }}
    >
      I'm a dedicated and adaptable software engineer with a strong foundation
      in full-stack development, game design, and machine learning. I pride
      myself on my leadership abilities, resilience, and a relentless pursuit of
      excellence in every project I undertake. In my free time, I thrive on
      outdoor adventures and believe in pushing my limits both mentally and
      physically—fitness is a core part of my life, and I often share my passion
      by training others. As the saying goes, "The man who moves a mountain
      begins by carrying away small stones," and I live by this philosophy,
      always striving to improve and grow.
    </motion.p>

    <div className="mt-20 flex flex-wrap gap-10">
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
  </>
);

export default SectionWrapper(About, "about");
