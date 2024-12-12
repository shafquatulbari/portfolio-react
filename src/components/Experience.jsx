import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(27, 77, 106, 0.85)", // Semi-transparent background
        color: "#fff",
        boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)", // Subtle glow
        border: "1px solid rgba(255, 255, 255, 0.2)", // Add border
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(35, 38, 49, 0.85)" }}
      date={experience.date}
      iconStyle={{
        background: experience.iconBg,
        borderRadius: "50%",
        boxShadow: "0px 0px 10px 2px rgba(0, 255, 255, 0.8)", // Glow effect
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold drop-shadow-lg">
          {experience.title}
        </h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p
          className={`${styles.sectionSubText} text-center`}
          style={{
            color: "#e0e0ff", // Light purple text
            textShadow: "0 0 10px rgba(255, 255, 255, 0.7)", // Subtle glow effect
          }}
        >
          What I have done so far
        </p>
        <h2
          className={`${styles.sectionHeadText} text-center`}
          style={{
            background: "linear-gradient(90deg, #aa00ff, #5e17eb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 15px rgba(170, 0, 255, 0.8)",
            animation: "glow 2s infinite alternate",
          }}
        >
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
