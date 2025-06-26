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

const NeuralProfile = () => {
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
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="max-w-7xl mx-auto relative z-0 px-6 sm:px-16 py-10 sm:py-16"
    >
      <span className="hash-span" id="neural-profile">
        &nbsp;
      </span>

      <div className="relative w-full py-6 sm:py-8 lg:py-12 overflow-hidden">
        {/* Cyberpunk overlay with background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Circuit-like pattern for profile */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.2) 1px, transparent 1px)
            `,
              backgroundSize: "100px 100px",
            }}
          />

          {/* Floating particles - reduced from 20 to 12 */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}

          {/* Animated neural network lines */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse" />
          <div
            className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Content with proper z-index */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Header Section with Futuristic Design - responsive */}
          <motion.div
            variants={textVariant()}
            className="relative mb-6 sm:mb-8 lg:mb-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-xl sm:rounded-2xl blur-2xl" />

            <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-700/50">
              <p className="text-purple-400 text-xs sm:text-sm lg:text-base font-mono tracking-wider mb-2 sm:mb-3 relative flex flex-col sm:flex-row gap-1 sm:gap-3">
                <span>
                  <span className="text-cyan-400">&gt;</span> SYSTEM_STATUS:{" "}
                  <span className="text-green-400">ONLINE</span>
                </span>
                <span>
                  <span className="text-cyan-400">&gt;</span> ROLE:{" "}
                  <span className="text-yellow-400">SOFTWARE_ENGINEER</span>
                </span>
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-5 leading-tight">
                Neural_Profile
                <span className="text-purple-400 animate-pulse">.</span>
              </h2>
            </div>
          </motion.div>

          {/* Bio Section with Terminal Style - responsive */}
          <motion.div variants={fadeIn("", "", 0.1, 1)} className="relative">
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-gray-700/50 font-mono text-xs sm:text-sm relative overflow-hidden">
              {/* Terminal header - responsive */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-700/50 gap-2 sm:gap-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-xs">
                    ~/portfolio/profile.exe
                  </span>
                </div>
                <div className="text-purple-400 text-xs">
                  NEURAL_NETWORK_v2.0.1
                </div>
              </div>

              {/* Terminal content - responsive spacing */}
              <div className="space-y-2 sm:space-y-3">
                <div className="text-purple-400 break-all sm:break-normal">
                  <span className="text-cyan-400">user@portfolio</span>:
                  <span className="text-yellow-400">~$</span>{" "}
                  ./initialize_profile.sh
                </div>

                <div className="text-green-400 mb-2 sm:mb-3">
                  [INFO] Loading neural profile...
                  <br />
                  [SUCCESS] Profile initialized successfully
                </div>

                <div className="text-gray-300 leading-relaxed">
                  <span className="text-cyan-400">&gt;</span>{" "}
                  <span className="text-purple-400">CORE_IDENTITY:</span>
                  <br />
                  {typingText}
                  <span className="animate-pulse text-purple-400">|</span>
                </div>

                <div className="text-gray-300 leading-relaxed mt-3 sm:mt-4">
                  <span className="text-cyan-400">&gt;</span>{" "}
                  <span className="text-purple-400">EXPERTISE_DOMAINS:</span>
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
                  <span className="text-yellow-400">
                    • System Architecture
                  </span>{" "}
                  - Scalable applications
                </div>

                <div className="text-gray-300 leading-relaxed mt-3 sm:mt-4">
                  <span className="text-cyan-400">&gt;</span>{" "}
                  <span className="text-purple-400">EDUCATION_MATRIX:</span>
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

                <div className="text-gray-300 leading-relaxed mt-3 sm:mt-4">
                  <span className="text-cyan-400">&gt;</span>{" "}
                  <span className="text-purple-400">CURRENT_DEPLOYMENT:</span>
                  <br />
                  <span className="text-pink-400">Brain Station 23 Ltd.</span> -
                  SQA Engineer I
                  <br />
                  <span className="text-gray-400">
                    └─ MyGP App Test Automation (21M+ monthly users)
                  </span>
                </div>

                <div className="text-gray-300 leading-relaxed mt-3 sm:mt-4">
                  <span className="text-cyan-400">&gt;</span>{" "}
                  <span className="text-purple-400">PERSONAL_PROTOCOLS:</span>
                  <br />
                  <span className="text-pink-400">Fitness Enthusiast</span> |
                  Discipline & Continuous Growth
                  <br />
                  <span className="text-gray-400">
                    └─ Pushing limits in technology and life
                  </span>
                </div>

                <div className="text-gray-300 leading-relaxed mt-3 sm:mt-4">
                  <span className="text-cyan-400">&gt;</span>{" "}
                  <span className="text-purple-400">MISSION_STATEMENT:</span>
                  <br />
                  <span className="text-cyan-300">
                    "Building robust, scalable solutions while ensuring the
                    highest quality standards through comprehensive testing and
                    automation."
                  </span>
                </div>

                <div className="text-green-400 mt-4 sm:mt-5">
                  [STATUS] Profile scan complete. All systems operational.
                </div>
              </div>

              {/* Neural network visualization overlay */}
              <div className="absolute top-2 right-2 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 opacity-20 pointer-events-none">
                <div className="relative w-full h-full">
                  {/* Neural nodes */}
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse"
                      style={{
                        left: `${(i % 3) * 40 + 10}%`,
                        top: `${Math.floor(i / 3) * 40 + 10}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                  {/* Neural connections */}
                  <svg className="absolute inset-0 w-full h-full">
                    <line
                      x1="20%"
                      y1="20%"
                      x2="60%"
                      y2="20%"
                      stroke="rgba(147, 51, 234, 0.3)"
                      strokeWidth="1"
                    />
                    <line
                      x1="60%"
                      y1="20%"
                      x2="100%"
                      y2="20%"
                      stroke="rgba(147, 51, 234, 0.3)"
                      strokeWidth="1"
                    />
                    <line
                      x1="20%"
                      y1="20%"
                      x2="20%"
                      y2="60%"
                      stroke="rgba(147, 51, 234, 0.3)"
                      strokeWidth="1"
                    />
                    <line
                      x1="60%"
                      y1="20%"
                      x2="60%"
                      y2="60%"
                      stroke="rgba(147, 51, 234, 0.3)"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default NeuralProfile;
