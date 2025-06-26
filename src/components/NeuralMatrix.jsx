import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
import web from "/assets/services/web.png";
import backend from "/assets/services/backend.png";
import sqa from "/assets/services/sqa.png";
import automation from "/assets/services/automation.png";

// Services array with enhanced descriptions
const services = [
  {
    title: "Back End Developer",
    icon: backend,
    description: "Scalable server architecture & API design",
    category: "CORE_SYSTEM",
    technologies: ["Node.js", "Python", "MongoDB", "APIs"],
    color: "cyan",
  },
  {
    title: "Front End Developer",
    icon: web,
    description: "Modern UI/UX with React & Next.js",
    category: "INTERFACE",
    technologies: ["React", "Next.js", "TypeScript", "CSS"],
    color: "purple",
  },
  {
    title: "SQA Engineer",
    icon: sqa,
    description: "Software quality assurance",
    category: "QUALITY_MATRIX",
    technologies: ["WebdriverIO", "Appium", "Jest", "Cypress"],
    color: "green",
  },
  {
    title: "Test Automation Engineer",
    icon: automation,
    description: "CI/CD pipelines & automated testing",
    category: "AUTOMATION",
    technologies: ["Jenkins", "Docker", "GitHub Actions", "Selenium"],
    color: "orange",
  },
];

const ServiceMatrix = ({ service, index }) => {
  const [isActive, setIsActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      setScanProgress(0); // Reset progress when starting
      const timer = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    } else {
      setScanProgress(0); // Reset progress when not active
    }
  }, [isActive]);

  const getColorClasses = (color) => {
    const colors = {
      cyan: {
        primary: "text-cyan-400",
        secondary: "text-cyan-300",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/30",
        glow: "shadow-cyan-400/20",
      },
      purple: {
        primary: "text-purple-400",
        secondary: "text-purple-300",
        bg: "bg-purple-400/10",
        border: "border-purple-400/30",
        glow: "shadow-purple-400/20",
      },
      green: {
        primary: "text-green-400",
        secondary: "text-green-300",
        bg: "bg-green-400/10",
        border: "border-green-400/30",
        glow: "shadow-green-400/20",
      },
      orange: {
        primary: "text-orange-400",
        secondary: "text-orange-300",
        bg: "bg-orange-400/10",
        border: "border-orange-400/30",
        glow: "shadow-orange-400/20",
      },
    };
    return colors[color] || colors.cyan;
  };

  const colorClasses = getColorClasses(service.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
      }}
    >
      {/* Matrix grid background */}
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(90deg, ${
              service.color === "cyan"
                ? "#0891b2"
                : service.color === "purple"
                ? "#a855f7"
                : service.color === "green"
                ? "#10b981"
                : "#f97316"
            }20 1px, transparent 1px),
            linear-gradient(${
              service.color === "cyan"
                ? "#0891b2"
                : service.color === "purple"
                ? "#a855f7"
                : service.color === "green"
                ? "#10b981"
                : "#f97316"
            }20 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Main container - responsive sizing */}
      <div
        className={`relative bg-gray-900/80 backdrop-blur-sm rounded-xl border ${colorClasses.border} p-3 sm:p-6 transition-all duration-500 hover:${colorClasses.glow} hover:shadow-lg group-hover:border-opacity-60`}
      >
        {/* Header with category and scan line - responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
          <div
            className={`px-2 sm:px-3 py-1 rounded-full ${colorClasses.bg} ${colorClasses.border} border self-start`}
          >
            <span
              className={`text-xs font-mono ${colorClasses.primary} tracking-wider`}
            >
              {service.category}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isActive
                  ? colorClasses.primary.replace("text", "bg")
                  : "bg-gray-600"
              } transition-colors duration-300`}
            />
            <span
              className={`text-xs font-mono ${
                isActive ? colorClasses.primary : "text-gray-500"
              } transition-colors duration-300`}
            >
              {isActive ? "ACTIVE" : "STANDBY"}
            </span>
          </div>
        </div>

        {/* Progress bar - responsive spacing */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-gray-400">SYSTEM_SCAN</span>
            <span className={`text-xs font-mono ${colorClasses.primary}`}>
              {scanProgress}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
            <div
              className={`h-full ${colorClasses.primary.replace(
                "text",
                "bg"
              )} transition-all duration-75 ease-out`}
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>

        {/* Icon and title section */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <div
              className={`absolute inset-0 ${colorClasses.primary.replace(
                "text",
                "bg"
              )}/20 rounded-lg blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <div
              className={`relative p-3 ${colorClasses.bg} rounded-lg border ${colorClasses.border}`}
            >
              <img
                src={service.icon}
                alt={service.title}
                className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  console.error(`Failed to load image: ${service.icon}`, e);
                  e.target.style.backgroundColor =
                    service.color === "cyan"
                      ? "#0891b2"
                      : service.color === "purple"
                      ? "#a855f7"
                      : service.color === "green"
                      ? "#10b981"
                      : "#f97316";
                }}
              />
            </div>
          </div>
          <div className="flex-1">
            <h3
              className={`text-lg font-bold ${colorClasses.primary} mb-1 group-hover:${colorClasses.secondary} transition-colors duration-300`}
            >
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2">
          {service.technologies.map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isActive ? 1 : 0.7,
                scale: isActive ? 1 : 0.9,
              }}
              transition={{ delay: techIndex * 0.05 }}
              className={`px-2 py-1 text-xs font-mono ${colorClasses.bg} ${colorClasses.primary} rounded border ${colorClasses.border} hover:bg-opacity-20 transition-all duration-200 cursor-default`}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Scanning overlay effect */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <div
              className={`absolute left-0 w-full h-0.5 ${colorClasses.primary.replace(
                "text",
                "bg"
              )} opacity-80`}
              style={{
                top: `${scanProgress}%`,
                transition: "top 0.05s linear",
                boxShadow: `0 0 10px ${
                  service.color === "cyan"
                    ? "#22d3ee"
                    : service.color === "purple"
                    ? "#a855f7"
                    : service.color === "green"
                    ? "#22c55e"
                    : "#f97316"
                }`,
              }}
            />
            {/* Additional scanning effect trail */}
            <div
              className={`absolute left-0 w-full h-1 ${colorClasses.primary.replace(
                "text",
                "bg"
              )} opacity-30 blur-sm`}
              style={{
                top: `${Math.max(0, scanProgress - 5)}%`,
                transition: "top 0.05s linear",
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const NeuralMatrix = () => {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="max-w-7xl mx-auto relative z-0 px-6 sm:px-16 py-10 sm:py-16"
    >
      <span className="hash-span" id="neural-matrix">
        &nbsp;
      </span>

      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Grid overlay with background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Enhanced grid pattern for matrix effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
              animation: "gridShift 10s linear infinite",
            }}
          />

          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
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

          {/* Matrix-style scanning lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" />
          <div
            className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-pink-400/40 to-transparent animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Content with proper z-index */}
        <div className="relative z-10">
          {/* Header Section */}
          <motion.div variants={textVariant()} className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl sm:rounded-3xl blur-3xl" />

            <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-700/50">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Neural_Matrix
                  </h2>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                </div>
                <p className="text-gray-400 font-mono mb-2">
                  &gt; Scanning specialized subsystems...
                </p>
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-mono text-sm">
                    4 MODULES DETECTED
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 0.75)}
            className="relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <ServiceMatrix
                  key={service.title}
                  service={service}
                  index={index}
                />
              ))}
            </div>

            {/* System status footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-mono text-sm">
                    MATRIX_STATUS: OPERATIONAL
                  </span>
                </div>
                <p className="text-gray-400 text-xs font-mono">
                  All subsystems initialized and ready for deployment
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default NeuralMatrix;
