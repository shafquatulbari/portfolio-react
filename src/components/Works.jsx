import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../../public/assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="flex"
    >
      <Tilt
        tiltMaxAngleX={20} // Reduce tilt to minimize layout issues
        tiltMaxAngleY={20}
        scale={1}
        transitionSpeed={450}
        className="bg-tertiary p-5 rounded-2xl w-full max-w-[360px] min-w-[280px] flex flex-col shadow-lg"
        style={{
          background: "rgba(75, 0, 130, 0.90)", // Purplish background
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.7)", // Subtle shadow
          border: "1px solid rgba(255, 255, 255, 0.2)", // White border
        }}
      >
        <div className="relative w-full h-auto">
          <img
            src={image}
            alt={name}
            className="w-full h-auto object-cover rounded-2xl"
            loading="lazy"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex-grow">
          <h3
            className="text-white font-bold text-[20px] sm:text-[24px]"
            style={{
              textShadow: "0px 0px 8px rgba(255, 255, 255, 0.7)", // Subtle glow effect for title
            }}
          >
            {name}
          </h3>
          <p
            className="mt-2 text-[#e6e6e6] text-[12px] sm:text-[14px]"
            style={{
              textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)", // Subtle shadow for readability
            }}
          >
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[16px] sm:text-[16px] ${tag.color}`}
              style={{
                textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)", // Subtle shadow for tags
              }}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Transparent black background
            padding: "20px",
            borderRadius: "20px", // Rounded corners for a modern look
            textAlign: "center", // Centering the text
            margin: "0 auto", // Centers the card horizontally
            width: "fit-content", // Card takes up only as much space as needed
          }}
        >
          <h2
            className={`${styles.sectionHeadText} text-center`}
            style={{
              background: "linear-gradient(90deg, #aa00ff, #5e17eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 15px rgba(170, 0, 255, 0.9)", // Stronger glow for heading
              fontWeight: "bold",
            }}
          >
            PROJECTS
          </h2>
        </div>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
