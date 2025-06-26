import React, { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);

  const handleGitHubClick = () => {
    window.open(source_code_link, "_blank");
  };

  const handleProjectClick = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="group"
    >
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1000}
        transitionSpeed={450}
        scale={1.02}
        className="w-full"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleProjectClick}
      >
        {/* Card Container with Cyberpunk Border */}
        <div className="relative">
          {/* Animated glow border with purple theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-2xl" />

          {/* Main Card Content */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-purple-900/30 to-gray-900/95 backdrop-blur-sm rounded-2xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 overflow-hidden">
            {/* Circuit pattern background */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <pattern
                  id={`circuit-project-${index}`}
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M10,0 L10,10 L20,10"
                    stroke="#a855f7"
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <circle cx="10" cy="10" r="1" fill="#a855f7" />
                </pattern>
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#circuit-project-${index})`}
                />
              </svg>
            </div>

            {/* Project Image */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

              {/* Holographic effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

              {/* GitHub link */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleGitHubClick}
                  className="bg-gray-900/80 backdrop-blur-sm w-12 h-12 rounded-full flex justify-center items-center cursor-pointer border border-purple-400/30 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-300"
                >
                  <img
                    src={github}
                    alt="source code"
                    className="w-6 h-6 object-contain filter brightness-0 invert"
                  />
                </motion.div>
              </div>

              {/* Status indicator */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-green-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs font-mono">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6 relative z-10">
              {/* Project Title */}
              <h3 className="text-white text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors duration-300 font-mono">
                <span className="text-purple-400">&gt;</span> {name}
              </h3>

              {/* Project Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {description}
              </p>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={`${name}-${tag.name}`}
                    className={`px-3 py-1 text-xs font-mono rounded-full border transition-all duration-300 ${tag.color} border-current/30 hover:border-current hover:shadow-sm hover:shadow-current/30`}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover particles */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="relative py-8 h-screen flex flex-col">
      {/* Compact Header */}
      <motion.div variants={textVariant()} className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Projects
        </h2>
        <p className="text-gray-400 text-sm">Interactive showcase of my work</p>
      </motion.div>

      {/* Compact Grid Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              className="relative group cursor-pointer h-full"
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ scale: 1.02 }}
              onClick={() => window.open(project.source_code_link, "_blank")}
            >
              {/* Card Background with Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden group-hover:border-purple-400/50 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                  {/* Quick Access Icons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gray-900/80 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center border border-purple-400/30">
                      <img
                        src={github}
                        alt="github"
                        className="w-4 h-4 filter brightness-0 invert"
                      />
                    </div>
                  </div>

                  {/* Project Number */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-purple-400 font-mono border border-purple-400/30">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-3 md:p-4 flex-1 flex flex-col">
                  <h3 className="text-white text-sm md:text-base font-bold mb-2 group-hover:text-purple-300 transition-colors duration-300 line-clamp-1">
                    {project.name}
                  </h3>

                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-3 flex-1 line-clamp-2 md:line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Tags - Compact */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.name}
                        className={`px-2 py-1 text-xs rounded-full border transition-all duration-300 ${tag.color} border-current/30 hover:border-current`}
                      >
                        {tag.name}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full border border-gray-500/30 text-gray-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Detail Overlay */}
                {hoveredProject === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute inset-0 bg-gray-900/95 backdrop-blur-md rounded-xl border border-purple-400/50 p-4 flex flex-col justify-between z-10"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white text-lg font-bold">
                          {project.name}
                        </h3>
                        <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                          Live
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* All Tech Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag.name}
                            className={`px-2 py-1 text-xs rounded-full border ${tag.color} border-current/50`}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm font-medium hover:from-purple-400 hover:to-pink-400 transition-all duration-300"
                      >
                        View Project →
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Hover particles */}
                {hoveredProject === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.3}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-6"
      >
        <div className="flex justify-center gap-6 text-sm">
          <div className="text-center">
            <div className="text-purple-400 font-bold">{projects.length}</div>
            <div className="text-gray-500">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-pink-400 font-bold">15+</div>
            <div className="text-gray-500">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-cyan-400 font-bold">50K+</div>
            <div className="text-gray-500">Lines of Code</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Works, "projects");
