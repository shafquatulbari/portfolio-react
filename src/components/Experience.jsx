import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(75, 0, 130, 0.9)", // Purplish background
        color: "#fff",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.9)", // Subtle shadow
        border: "1px solid rgba(255, 255, 255, 0.2)", // White border
        borderRadius: "20px",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(35, 38, 49, 0.9)" }}
      date={
        <span
          // Purple background with rounded corners, non transparent
          className="text-white bg-purple-950  px-5 py-2 rounded-full"
          style={{
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)", // Subtle shadow for text
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {experience.date}
        </span>
      }
      iconStyle={{
        background: experience.iconBg,
        borderRadius: "50%",
        //glow around icon with purple color
        boxShadow: "0px 0px 15px 10px rgba(170, 0, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="h-[90%] w-[90%] object-contain rounded-full drop-shadow-md"
          />
        </div>
      }
    >
      <div>
        <h3
          className="text-white text-[24px] font-bold"
          style={{
            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.7)", // Subtle glow effect for title
          }}
        >
          {experience.title}
        </h3>
        <p
          className="text-[#e6e6e6] text-[16px] font-semibold"
          style={{
            margin: 0,
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)", // Subtle shadow for company name
          }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-[#e0e0e0] text-[14px] pl-1 tracking-wider leading-6"
            style={{
              textShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)", // Slight shadow for readability
            }}
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
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Transparent black background
          padding: "16px",
          borderRadius: "20px", // Rounded corners for a modern look
          textAlign: "center", // Centering the text
          margin: "0 auto", // Centers the card horizontally
          width: "fit-content", // Card takes up only as much space as needed
        }}
      >
        <p
          className={`${styles.sectionSubText} text-center`}
          style={{
            color: "#e0e0ff", // Light purple text
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)", // Subtle glow effect
            fontStyle: "italic", // Adding emphasis
          }}
        >
          What I have done so far
        </p>
        <h2
          className="text-white font-black text-center"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)", // Larger font size with responsiveness
            background: "linear-gradient(90deg, #aa00ff, #5e17eb)", // Gradient text
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 15px rgba(170, 0, 255, 0.8)", // Glow effect
            fontWeight: "bold",
            lineHeight: "1.2", // Adjusted line height
          }}
        >
          Work Experience
        </h2>
      </div>

      <div className="mt-10 mb-5 flex flex-col px-4 sm:px-6 lg:px-8">
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
