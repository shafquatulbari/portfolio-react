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
  return (
    <div className="relative py-16">
      {/* Section Header */}
      <motion.div variants={textVariant()} className="text-center mb-16">
        <p className={`${styles.sectionSubText} text-center mb-4`}>
          Portfolio showcase
        </p>

        {/* Enhanced title with terminal styling */}
        <div className="relative inline-block">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 rounded-2xl blur-sm opacity-30 animate-pulse" />
          <div className="relative bg-gradient-to-br from-gray-900/95 via-purple-900/30 to-gray-900/95 backdrop-blur-sm rounded-2xl border border-purple-400/20 px-8 py-6">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-purple-400 font-mono text-sm">
                projects_portfolio.exe
              </div>
            </div>

            {/* Terminal command */}
            <div className="mb-4 font-mono text-sm">
              <div className="text-purple-400">
                <span className="text-green-400">shafquat@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~/projects</span>
                <span className="text-white">$ </span>
                <span className="text-violet-400">ls -la --showcase</span>
              </div>
              <div className="text-gray-300 mt-1">
                &gt; Loading project files...
                <span className="animate-pulse ml-2">█</span>
              </div>
            </div>

            <h2
              className={`${styles.sectionHeadText} text-center bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-mono`}
            >
              &lt;PROJECTS /&gt;
            </h2>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-8 mt-8"
        >
          {[
            {
              label: "Total Projects",
              value: projects.length,
              color: "text-purple-400",
            },
            { label: "Technologies", value: "15+", color: "text-violet-400" },
            {
              label: "Lines of Code",
              value: "50K+",
              color: "text-fuchsia-400",
            },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Projects Sliding Container */}
      <div className="relative">
        {/* Gradient overlays for visual effect */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

        {/* Scrollable container */}
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div
            className="flex gap-8 pb-4 px-8"
            style={{ width: `${projects.length * 400}px` }}
          >
            {projects.map((project, index) => (
              <div key={`project-${index}`} className="flex-shrink-0 w-80">
                <ProjectCard index={index} {...project} />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/20">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-400 text-xs font-mono">
              SCROLL_HORIZONTAL
            </span>
            <div className="text-purple-400 text-xs">→</div>
          </div>
        </div>
      </div>

      {/* View More Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-purple-400/20 inline-block">
          <p className="text-gray-300 mb-4 font-mono">
            &gt; More projects available on GitHub
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open("https://github.com/shafquatulbari", "_blank")
            }
            className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-3 rounded-lg font-mono hover:from-purple-400 hover:to-violet-500 transition-all duration-300 border border-purple-400/30"
          >
            <span className="flex items-center gap-2">
              <span>VIEW_ALL_PROJECTS</span>
              <span className="text-purple-300">&gt;</span>
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Works, "projects");
