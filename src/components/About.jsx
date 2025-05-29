import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import web from "../../public/assets/services/web.png";
import backend from "../../public/assets/services/backend.png";
import sqa from "../../public/assets/services/sqa.png";
import automation from "../../public/assets/services/automation.png";

// Define styles (You can move these to a CSS or Tailwind file if needed)
const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",
  heroHeadText:
    "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
  heroSubText:
    "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",
  sectionHeadText:
    "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText:
    "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
};

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
    title: "SQA Engineer / SDET",
    icon: sqa,
    description: "Test automation & quality assurance",
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
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        setIsActive(false);
        setScanProgress(0);
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

      {/* Main container */}
      <div
        className={`relative bg-gray-900/80 backdrop-blur-sm rounded-xl border ${colorClasses.border} p-6 transition-all duration-500 hover:${colorClasses.glow} hover:shadow-lg group-hover:border-opacity-60`}
      >
        {/* Header with category and scan line */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`px-3 py-1 rounded-full ${colorClasses.bg} ${colorClasses.border} border`}
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

        {/* Progress bar */}
        <div className="mb-6">
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
                className="w-8 h-8 object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                style={{
                  filter: `brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(${
                    service.color === "cyan"
                      ? "180deg"
                      : service.color === "purple"
                      ? "270deg"
                      : service.color === "green"
                      ? "120deg"
                      : "30deg"
                  })`,
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
              className={`absolute top-0 left-0 w-full h-0.5 ${colorClasses.primary.replace(
                "text",
                "bg"
              )} animate-pulse`}
              style={{
                top: `${scanProgress}%`,
                transition: "top 0.1s ease-out",
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const About = () => {
  const [typingText, setTypingText] = useState("");
  const fullText =
    "I'm a Software Engineer specializing in Full Stack Development and SDET. Currently, I serve as an SQA Engineer I at Brain Station 23, where I contribute to the test automation for Grameenphone's MyGP app, serving over 21 million monthly users.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Header Section with Futuristic Design */}
      <motion.div variants={textVariant()} className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />

        <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 mb-12">
          <p className="text-cyan-400 text-lg font-mono tracking-wider mb-4 relative">
            <span className="text-purple-400">&gt;</span> SYSTEM_STATUS:{" "}
            <span className="text-green-400">ONLINE</span>
            <span className="ml-4 text-purple-400">&gt;</span> ROLE:{" "}
            <span className="text-yellow-400">SOFTWARE_ENGINEER</span>
          </p>

          <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
            Neural_Profile
            <span className="text-cyan-400 animate-pulse">.</span>
          </h2>
        </div>
      </motion.div>

      {/* Bio Section with Terminal Style */}
      <motion.div variants={fadeIn("", "", 0.1, 1)} className="relative mb-12">
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 font-mono text-sm relative overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400">~/portfolio/about.exe</span>
            </div>
            <div className="text-cyan-400 text-xs">NEURAL_NETWORK_v2.0.1</div>
          </div>

          {/* Terminal content */}
          <div className="space-y-4">
            <div className="text-cyan-400">
              <span className="text-purple-400">user@portfolio</span>:
              <span className="text-yellow-400">~$</span>{" "}
              ./initialize_profile.sh
            </div>

            <div className="text-green-400 mb-4">
              [INFO] Loading neural profile...
              <br />
              [SUCCESS] Profile initialized successfully
            </div>

            <div className="text-gray-300 leading-relaxed">
              <span className="text-purple-400">&gt;</span>{" "}
              <span className="text-cyan-400">CORE_IDENTITY:</span>
              <br />
              {typingText}
              <span className="animate-pulse text-cyan-400">|</span>
            </div>

            <div className="text-gray-300 leading-relaxed mt-6">
              <span className="text-purple-400">&gt;</span>{" "}
              <span className="text-cyan-400">EXPERTISE_DOMAINS:</span>
              <br />
              <span className="text-yellow-400">
                • Full-Stack Development
              </span>{" "}
              - React, Node.js, Python
              <br />
              <span className="text-yellow-400">• Test Automation</span> -
              WebdriverIO, Appium, CI/CD
              <br />
              <span className="text-yellow-400">• Quality Assurance</span> -
              Backend API validation
              <br />
              <span className="text-yellow-400">• System Architecture</span> -
              Scalable applications
            </div>

            <div className="text-gray-300 leading-relaxed mt-6">
              <span className="text-purple-400">&gt;</span>{" "}
              <span className="text-cyan-400">EDUCATION_MATRIX:</span>
              <br />
              <span className="text-green-400">
                University of British Columbia
              </span>{" "}
              - Computer Science
              <br />
              <span className="text-gray-400">
                └─ Software Engineering & Web Development Focus
              </span>
            </div>

            <div className="text-gray-300 leading-relaxed mt-6">
              <span className="text-purple-400">&gt;</span>{" "}
              <span className="text-cyan-400">PERSONAL_PROTOCOLS:</span>
              <br />
              <span className="text-pink-400">Fitness Enthusiast</span> |
              Discipline & Continuous Growth
              <br />
              <span className="text-gray-400">
                └─ Pushing limits in technology and life
              </span>
            </div>

            <div className="text-green-400 mt-6">
              [STATUS] Profile scan complete. All systems operational.
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services Grid with Enhanced Design */}
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.75)}
        className="relative"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Neural_Matrix
            </h3>
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
                SYSTEM_STATUS: OPERATIONAL
              </span>
            </div>
            <p className="text-gray-400 text-xs font-mono">
              All subsystems initialized and ready for deployment
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");
