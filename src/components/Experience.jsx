import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

const ExperienceCard = ({
  experience,
  index,
  isActive,
  onClick,
  isDetailed,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, layout: { duration: 0.3 } }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer transition-all duration-500 ${
        isDetailed
          ? "col-span-full"
          : isActive
          ? "scale-105 z-10"
          : "hover:scale-102"
      }`}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            animation:
              isActive || isHovered ? "gridShift 2s linear infinite" : "none",
          }}
        />
      </div>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
          isActive || isDetailed
            ? "bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 blur-xl scale-110"
            : isHovered
            ? "bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-lg scale-105"
            : "bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-lg"
        }`}
      />

      {/* Card content */}
      <div
        className={`relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
          isActive || isDetailed
            ? "border-cyan-400 shadow-2xl shadow-cyan-500/25"
            : isHovered
            ? "border-purple-400/70 shadow-xl shadow-purple-500/20"
            : "border-gray-700/50 hover:border-gray-600"
        } ${isDetailed ? "p-8" : "p-6"}`}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                isActive || isDetailed ? "bg-green-400" : "bg-red-500"
              }`}
            ></div>
            <div
              className={`w-2 h-2 rounded-full ${
                isActive || isDetailed ? "bg-yellow-400" : "bg-yellow-500"
              }`}
            ></div>
            <div
              className={`w-2 h-2 rounded-full ${
                isActive || isDetailed ? "bg-red-400" : "bg-gray-500"
              }`}
            ></div>
          </div>
          <div className="text-xs font-mono text-cyan-400">
            experience_{index + 1}.exe
          </div>
          <div className="ml-auto text-xs font-mono text-gray-400">
            [{isActive || isHovered || isDetailed ? "ACTIVE" : "STANDBY"}]
          </div>
        </div>

        {/* Company header */}
        <div className={`${isDetailed ? "grid md:grid-cols-2 gap-6" : ""}`}>
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3
                  className={`font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 ${
                    isDetailed ? "text-3xl md:text-4xl" : "text-xl"
                  }`}
                >
                  {experience.company_name}
                </h3>
                <p
                  className={`text-pink-400 font-semibold mb-3 ${
                    isDetailed ? "text-lg md:text-xl" : "text-sm"
                  }`}
                >
                  {experience.title}
                </p>
              </div>
              {!isDetailed && (
                <div className="text-right">
                  <div className="text-xs text-gray-300 font-mono bg-gray-800/70 px-3 py-1 rounded-full border border-cyan-400/30">
                    {experience.date}
                  </div>
                </div>
              )}
            </div>

            {/* Date for detailed view */}
            {isDetailed && (
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-gray-800/70 px-4 py-2 rounded-lg border border-cyan-400/30">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 font-mono text-sm">
                    {experience.date}
                  </span>
                </div>
              </div>
            )}

            {/* Matrix-style divider */}
            <div className="relative mb-6">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Experience points */}
            <div
              className={`space-y-4 ${
                isDetailed ? "max-h-none" : "max-h-40 overflow-hidden"
              }`}
            >
              {experience.points.map((point, pointIndex) => (
                <motion.div
                  key={pointIndex}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: isActive || isDetailed ? pointIndex * 0.1 : 0,
                    duration: 0.5,
                  }}
                  className="flex items-start space-x-3 group"
                >
                  <div className="relative mt-2 flex-shrink-0">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-cyan-400 rounded-full group-hover:bg-purple-400 animate-ping opacity-20" />
                  </div>
                  <p
                    className={`text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 ${
                      isDetailed ? "text-base" : "text-sm"
                    }`}
                  >
                    <span className="text-green-400 font-mono text-xs">
                      [LOG]{" "}
                    </span>
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Click to expand hint for non-detailed view */}
            {!isDetailed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="mt-4 text-center"
              >
                <div className="inline-flex items-center gap-2 text-xs text-cyan-400 font-mono bg-gray-800/50 px-3 py-1 rounded-full border border-cyan-400/30">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                  Click to view details
                </div>
              </motion.div>
            )}
          </div>

          {/* Additional details for expanded view */}
          {isDetailed && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Skills/Technologies used */}
              {experience.technologies && (
                <div>
                  <h4 className="text-cyan-400 font-mono text-sm mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    TECHNOLOGIES_USED
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-800/70 text-cyan-300 text-xs font-mono rounded-full border border-cyan-400/30 hover:border-cyan-400/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key achievements */}
              {experience.achievements && (
                <div>
                  <h4 className="text-purple-400 font-mono text-sm mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    KEY_ACHIEVEMENTS
                  </h4>
                  <div className="space-y-2">
                    {experience.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System status */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <h4 className="text-green-400 font-mono text-sm mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  SYSTEM_STATUS
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Experience_ID:</span>
                    <span className="text-cyan-400">
                      EXP_{String(index + 1).padStart(3, "0")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400">VERIFIED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Impact_Level:</span>
                    <span className="text-purple-400">HIGH</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Close button for detailed view */}
        {isDetailed && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="absolute top-4 right-4 w-8 h-8 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-full flex items-center justify-center transition-all duration-300 group"
          >
            <div className="w-4 h-0.5 bg-red-400 rounded-full transform rotate-45 absolute"></div>
            <div className="w-4 h-0.5 bg-red-400 rounded-full transform -rotate-45 absolute"></div>
          </motion.button>
        )}

        {/* Active indicator */}
        {(isActive || isDetailed) && !isDetailed && (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center border-2 border-gray-900 shadow-lg"
          >
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          </motion.div>
        )}

        {/* Scanning overlay effect */}
        {(isActive || isHovered || isDetailed) && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <motion.div
              className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
              animate={{
                top: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                boxShadow: "0 0 10px #22d3ee",
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [detailedView, setDetailedView] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (index) => {
    if (detailedView === index) {
      setDetailedView(null);
    } else {
      setDetailedView(index);
      setActiveIndex(index);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cyberpunk background */}
      <div className="absolute inset-0">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridShift 20s linear infinite",
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Scanning lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" />
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 lg:mb-16 relative z-10 px-4"
      >
        <div className="relative inline-block">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />

          {/* Terminal window */}
          <div className="relative bg-gray-900/90 backdrop-blur-sm border border-cyan-400/30 rounded-2xl shadow-2xl overflow-hidden max-w-4xl">
            {/* Terminal header */}
            <div className="flex items-center justify-between bg-gray-800/50 px-4 lg:px-6 py-3 border-b border-gray-700/50">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 font-mono text-sm ml-4">
                  experience_terminal.exe
                </span>
              </div>
              <div className="text-xs font-mono text-cyan-400">
                NEURAL_NET_v2.1.0
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-4 lg:p-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-cyan-400 mb-2 text-sm lg:text-base font-mono"
              >
                &gt; Professional Timeline Accessed
              </motion.p>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white mb-3 text-2xl lg:text-4xl xl:text-5xl font-black"
                style={{
                  background:
                    "linear-gradient(90deg, #00ffff, #aa00ff, #ff006e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                Work Experience.exe
              </motion.h2>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.7, duration: 1 }}
                className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10"
          >
            {/* Timeline Navigation - only show when not in detailed view */}
            {detailedView === null && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-8 lg:mb-12"
              >
                <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2 lg:p-3 shadow-2xl overflow-x-auto">
                  <div className="flex space-x-2 min-w-max">
                    {experiences.map((experience, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-3 lg:px-6 py-2 lg:py-3 rounded-xl font-medium transition-all duration-300 text-sm lg:text-base font-mono whitespace-nowrap ${
                          activeIndex === index
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg border border-cyan-400/50"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/70 border border-gray-600/30"
                        }`}
                      >
                        <span className="relative z-10">
                          {experience.company_name}
                        </span>
                        {activeIndex === index && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Experience Cards Grid */}
            <motion.div
              layout
              className={`grid gap-6 lg:gap-8 ${
                detailedView !== null
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={index}
                  experience={experience}
                  index={index}
                  isActive={activeIndex === index}
                  isDetailed={detailedView === index}
                  onClick={() => handleCardClick(index)}
                />
              ))}
            </motion.div>

            {/* Back to grid button for mobile */}
            {detailedView !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mt-8 lg:hidden"
              >
                <button
                  onClick={() => setDetailedView(null)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-mono text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <div className="w-4 h-0.5 bg-white rounded-full"></div>
                  <span>Back to Grid</span>
                </button>
              </motion.div>
            )}

            {/* System status footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-12 lg:mt-16 text-center"
            >
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-mono text-sm">
                    EXPERIENCE_MATRIX: OPERATIONAL
                  </span>
                </div>
                <p className="text-gray-400 text-xs font-mono">
                  {experiences.length} experience modules loaded and verified
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
