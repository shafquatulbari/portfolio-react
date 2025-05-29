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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container with Cyberpunk Border */}
        <div className="relative">
          {/* Animated glow border */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl" />

          {/* Main Card Content */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden">
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
                    stroke="#38bdf8"
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <circle cx="10" cy="10" r="1" fill="#38bdf8" />
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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

              {/* GitHub link */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open(source_code_link, "_blank")}
                  className="bg-gray-900/80 backdrop-blur-sm w-12 h-12 rounded-full flex justify-center items-center cursor-pointer border border-cyan-400/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
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
              <h3 className="text-white text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors duration-300 font-mono">
                <span className="text-cyan-400">&gt;</span> {name}
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

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-700/50">
                <div className="text-center">
                  <div className="text-cyan-400 text-xs font-mono">PERF</div>
                  <div className="text-white text-sm font-bold">95%</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 text-xs font-mono">SEC</div>
                  <div className="text-white text-sm font-bold">A+</div>
                </div>
                <div className="text-center">
                  <div className="text-pink-400 text-xs font-mono">UX</div>
                  <div className="text-white text-sm font-bold">★★★★★</div>
                </div>
              </div>
            </div>

            {/* Hover particles */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
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
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-30 animate-pulse" />
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl border border-cyan-400/20 px-8 py-6">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-cyan-400 font-mono text-sm">
                projects_portfolio.exe
              </div>
            </div>

            {/* Terminal command */}
            <div className="mb-4 font-mono text-sm">
              <div className="text-cyan-400">
                <span className="text-green-400">shafquat@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~/projects</span>
                <span className="text-white">$ </span>
                <span className="text-purple-400">ls -la --showcase</span>
              </div>
              <div className="text-gray-300 mt-1">
                &gt; Loading project files...
                <span className="animate-pulse ml-2">█</span>
              </div>
            </div>

            <h2
              className={`${styles.sectionHeadText} text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono`}
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
              color: "text-cyan-400",
            },
            { label: "Technologies", value: "15+", color: "text-purple-400" },
            { label: "Lines of Code", value: "50K+", color: "text-pink-400" },
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      {/* View More Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20 inline-block">
          <p className="text-gray-300 mb-4 font-mono">
            &gt; More projects available on GitHub
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open("https://github.com/shafquatulbari", "_blank")
            }
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-mono hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 border border-cyan-400/30"
          >
            <span className="flex items-center gap-2">
              <span>VIEW_ALL_PROJECTS</span>
              <span className="text-cyan-300">&gt;</span>
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Works, "projects");
