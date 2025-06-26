import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

const ExperienceCard = ({ experience, index, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`relative cursor-pointer group transition-all duration-500 ${
        isActive ? "scale-105" : "hover:scale-102"
      }`}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
          isActive
            ? "bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-xl"
            : "bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-lg group-hover:blur-xl group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20"
        }`}
      />

      {/* Card content */}
      <div
        className={`relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-500 ${
          isActive
            ? "border-cyan-400 shadow-2xl shadow-cyan-500/25"
            : "border-gray-700 hover:border-cyan-400/50"
        }`}
      >
        {/* Company header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {experience.company_name}
            </h3>
            <p className="text-cyan-400 font-semibold">{experience.title}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
              {experience.date}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-4" />

        {/* Experience points */}
        <div className="space-y-3">
          {experience.points.map((point, pointIndex) => (
            <motion.div
              key={pointIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isActive ? pointIndex * 0.1 : 0 }}
              className="flex items-start space-x-3"
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-gray-300 text-sm leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="relative inline-block">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />

          {/* Content */}
          <div className="relative bg-black/60 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8 shadow-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`${styles.sectionSubText} text-cyan-400 mb-4`}
            >
              What I've done so far
            </motion.p>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`${styles.sectionHeadText} text-white`}
              style={{
                background: "linear-gradient(90deg, #00ffff, #aa00ff, #ff006e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Work Experience
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.7, duration: 1 }}
              className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-4"
            />
          </div>
        </div>
      </motion.div>

      {/* Interactive Timeline */}
      {showContent && (
        <div className="max-w-6xl mx-auto px-6">
          {/* Timeline Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full p-2 shadow-2xl">
              <div className="flex space-x-2">
                {experiences.map((experience, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <span className="relative z-10 text-sm font-mono">
                      {experience.company_name}
                    </span>
                    {activeIndex === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Experience, "work");
