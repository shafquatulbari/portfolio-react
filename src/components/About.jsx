import React from "react";
import Tilt from "react-parallax-tilt"; // Change to a more reliable library if needed
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import web from "../../public/assets/services/web.png";
import backend from "../../public/assets/services/backend.png";
import sqa from "../../public/assets/services/sqa.png";
import automation from "../../public/assets/services/automation.png";

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
    title: "Back End Developer",
    icon: backend,
  },
  {
    title: "Front End Developer",
    icon: web,
  },
  {
    title: "SQA Engineer / SDET",
    icon: sqa,
  },
  {
    title: "Test Automation Engineer",
    icon: automation,
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
      I'm a **Software Engineer** specializing in **Full Stack Development** and
      **SQA/QA Automation**. Currently, I serve as an **SQA Engineer I** at
      Brain Station 23, where I contribute to the test automation for
      Grameenphone’s MyGP app, serving over 21 million monthly users. My
      expertise includes developing test scripts using WebdriverIO and Appium,
      validating backend API responses, and optimizing CI/CD pipelines.
      Previously, I've led and contributed to various full-stack projects,
      focusing on creating scalable and efficient applications. I hold a
      Computer Science degree from the University of British Columbia, where I
      honed my skills in software engineering and web development. Outside of technology, I am a fitness
      enthusiast who believes in discipline, continuous growth, and pushing
      limits.
    </motion.p>

    <div className="mt-20 flex flex-wrap gap-10">
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
  </>
);

export default SectionWrapper(About, "about");
