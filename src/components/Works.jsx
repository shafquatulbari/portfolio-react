import React, { useState, memo } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../../public/assets";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// Stagger container animation (decoupled from SectionWrapper)
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};

// Memoize ProjectCard for better performance
const ProjectCard = memo(
  ({ index, name, description, tags, image, source_code_link }) => {
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
  }
);

// Add display name for debugging
ProjectCard.displayName = "ProjectCard";

const Works = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project, index) => {
    setSelectedProject({ ...project, index });
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const openGitHubProfile = () => {
    window.open("https://github.com/shafquatulbari", "_blank");
  };

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="max-w-7xl mx-auto relative z-0 px-6 sm:px-16 py-10 sm:py-16 bg-black/50"
      id="projects"
    >
      <span className="hash-span" id="projects">
        &nbsp;
      </span>

      <div className="relative py-4 sm:py-6 lg:py-8 min-h-screen flex flex-col">
        {/* Compact Header */}
        <motion.div
          variants={textVariant()}
          className="text-center mb-6 sm:mb-8 lg:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">
            Projects
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Interactive showcase of my work
          </p>
        </motion.div>

        {/* First Row */}
        <div className="w-full px-2 sm:px-4 lg:px-6 grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-3xl mx-auto justify-items-center mb-4">
          {projects
            .slice(0, Math.ceil(projects.length / 2))
            .map((project, index) => (
              <motion.div
                key={project.name}
                className="relative group cursor-pointer h-full w-full max-w-xs"
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleProjectClick(project, index)}
              >
                {/* Card Background with Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-lg lg:rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden group-hover:border-purple-400/50 transition-all duration-300">
                  {/* Project Image - reduced height */}
                  <div className="relative h-24 sm:h-28 lg:h-32 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                    {/* Project Number - smaller */}
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
                      <div className="bg-gray-900/80 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs text-purple-400 font-mono border border-purple-400/30">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  {/* Project Info - reduced padding */}
                  <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white text-xs sm:text-sm lg:text-base font-bold mb-1 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                        {project.name}
                      </h3>
                    </div>

                    {/* Click hint - smaller */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to explore
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse"></div>
                        <div
                          className="w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Second Row */}
        <div className="w-full px-2 sm:px-4 lg:px-6 grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-3xl mx-auto justify-items-center">
          {projects
            .slice(Math.ceil(projects.length / 2))
            .map((project, index) => (
              <motion.div
                key={project.name}
                className="relative group cursor-pointer h-full w-full max-w-xs"
                variants={fadeIn(
                  "up",
                  "spring",
                  (index + Math.ceil(projects.length / 2)) * 0.1,
                  0.75
                )}
                onMouseEnter={() =>
                  setHoveredProject(index + Math.ceil(projects.length / 2))
                }
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ scale: 1.02 }}
                onClick={() =>
                  handleProjectClick(
                    project,
                    index + Math.ceil(projects.length / 2)
                  )
                }
              >
                {/* Card Background with Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-lg lg:rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden group-hover:border-purple-400/50 transition-all duration-300">
                  {/* Project Image - reduced height */}
                  <div className="relative h-24 sm:h-28 lg:h-32 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                    {/* Project Number - smaller */}
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
                      <div className="bg-gray-900/80 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs text-purple-400 font-mono border border-purple-400/30">
                        {String(
                          index + Math.ceil(projects.length / 2) + 1
                        ).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  {/* Project Info - reduced padding */}
                  <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white text-xs sm:text-sm lg:text-base font-bold mb-1 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                        {project.name}
                      </h3>
                    </div>

                    {/* Click hint - smaller */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to explore
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse"></div>
                        <div
                          className="w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* More Projects Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={openGitHubProfile}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white py-3 px-6 sm:px-8 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-3 mx-auto border border-purple-400/30 mt-8 sm:mt-10"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm sm:text-base">
            View More Projects on GitHub
          </span>
        </motion.button>

        {/* Project Detail Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-md z-50 flex items-center justify-center p-0 sm:p-6"
            onClick={closeModal}
          >
            <div
              className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-none sm:rounded-2xl border-0 sm:border border-purple-400/50 overflow-hidden max-w-5xl w-full h-[85vh] sm:max-h-[90vh] my-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header - Sticky */}
              <div className="sticky top-0 z-10 bg-gray-800/95 backdrop-blur-md border-b border-gray-700/50 p-4 sm:p-6 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                  <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold truncate">
                    {selectedProject.name}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-full flex items-center justify-center transition-all duration-300 group flex-shrink-0 ml-3"
                >
                  <div className="w-4 h-0.5 bg-red-400 rounded-full transform rotate-45 absolute"></div>
                  <div className="w-4 h-0.5 bg-red-400 rounded-full transform -rotate-45 absolute"></div>
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Project Image */}
                    <div className="relative">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.name}
                        className="w-full h-64 sm:h-80 object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-xl"></div>

                      {/* Project Links */}
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            window.open(
                              selectedProject.source_code_link,
                              "_blank"
                            )
                          }
                          className="bg-gray-900/80 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center border border-purple-400/30 hover:border-purple-400 transition-all duration-300"
                        >
                          <img
                            src={github}
                            alt="source code"
                            className="w-6 h-6 filter brightness-0 invert"
                          />
                        </motion.button>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <h3 className="text-cyan-400 font-mono text-sm mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          PROJECT_DESCRIPTION
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-base">
                          {selectedProject.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h3 className="text-purple-400 font-mono text-sm mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          TECHNOLOGIES_USED
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag.name}
                              className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${tag.color} border-current/50 hover:border-current`}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Stats */}
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                        <h3 className="text-green-400 font-mono text-sm mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          PROJECT_STATUS
                        </h3>
                        <div className="space-y-2 text-sm font-mono">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Project_ID:</span>
                            <span className="text-cyan-400">
                              PRJ_
                              {String(selectedProject.index + 1).padStart(
                                3,
                                "0"
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className="text-green-400">COMPLETED</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Technologies:</span>
                            <span className="text-purple-400">
                              {selectedProject.tags.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            window.open(
                              selectedProject.source_code_link,
                              "_blank"
                            )
                          }
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-lg font-medium hover:from-purple-400 hover:to-pink-400 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <img
                            src={github}
                            alt="github"
                            className="w-5 h-5 filter brightness-0 invert"
                          />
                          View Source Code
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Works;
