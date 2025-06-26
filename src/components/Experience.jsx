import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";

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

const ExperienceCard = ({
  experience,
  index,
  isActive,
  onClick,
  isDetailed,
  position = "center", // "left", "center", "right"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCardScale = () => {
    if (isDetailed) return 1;
    if (isActive) return 1;
    if (position === "center") return 0.9;
    return 0.75;
  };

  const getCardOpacity = () => {
    if (isDetailed) return 1;
    if (isActive) return 1;
    if (position === "center") return 0.7;
    return 0.4;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: getCardOpacity(),
        y: 0,
        scale: getCardScale(),
        filter: isActive ? "brightness(1)" : "brightness(0.6)",
      }}
      transition={{
        delay: index * 0.1,
        layout: { duration: 0.5 },
        scale: { duration: 0.3 },
        opacity: { duration: 0.3 },
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer transition-all duration-700 flex-shrink-0 ${
        isDetailed ? "w-full" : "w-80 md:w-96"
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
      {/* Glow effect - simplified */}
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
          isActive || isDetailed
            ? "bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-lg scale-105"
            : isHovered
            ? "bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-pink-500/15 blur-lg"
            : "bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 blur-lg"
        }`}
      />{" "}
      {/* Card content */}
      <div
        className={`folded-card relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl border-2 transition-all duration-700 overflow-hidden h-full flex flex-col ${
          isActive || isDetailed
            ? "border-cyan-400 shadow-2xl shadow-cyan-500/25"
            : isHovered
            ? "border-purple-400/70 shadow-xl shadow-purple-500/20"
            : "border-gray-700/50 hover:border-gray-600"
        } ${
          isDetailed
            ? "detailed p-6 lg:p-8"
            : isActive
            ? "active p-4 lg:p-6 h-[400px] lg:h-[450px]"
            : "p-3 lg:p-4 h-[350px] lg:h-[400px]"
        }`}
      >
        {/* Terminal header */}
        <div
          className={`flex items-center gap-2 ${isDetailed ? "mb-4" : "mb-2"}`}
        >
          <div className="flex gap-1">
            <div
              className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${
                isActive || isDetailed ? "bg-green-400" : "bg-red-500"
              }`}
            ></div>
            <div
              className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${
                isActive || isDetailed ? "bg-yellow-400" : "bg-yellow-500"
              }`}
            ></div>
            <div
              className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${
                isActive || isDetailed ? "bg-red-400" : "bg-gray-500"
              }`}
            ></div>
          </div>
          <div
            className={`font-mono text-cyan-400 ${
              isDetailed ? "text-xs" : isActive ? "text-xs" : "text-[10px]"
            }`}
          >
            exp_{index + 1}.exe
          </div>
          <div
            className={`ml-auto font-mono text-gray-400 ${
              isDetailed ? "text-xs" : isActive ? "text-xs" : "text-[10px]"
            }`}
          >
            [{isActive || isHovered || isDetailed ? "ACTIVE" : "STANDBY"}]
          </div>
        </div>

        {/* Company header */}
        <div className={`${isDetailed ? "grid md:grid-cols-2 gap-6" : ""}`}>
          <div className="h-full flex flex-col">
            <div
              className={`flex items-start justify-between ${
                isDetailed ? "mb-4" : "mb-2"
              }`}
            >
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight ${
                    isDetailed
                      ? "text-2xl md:text-3xl mb-2"
                      : isActive
                      ? "text-lg lg:text-xl mb-2"
                      : "text-sm lg:text-base mb-1"
                  }`}
                >
                  {experience.company_name}
                </h3>
                <p
                  className={`text-pink-400 font-semibold leading-tight ${
                    isDetailed
                      ? "text-lg md:text-xl mb-3"
                      : isActive
                      ? "text-sm lg:text-base mb-2"
                      : "text-xs lg:text-sm mb-1"
                  }`}
                >
                  {experience.title}
                </p>
              </div>
              {!isDetailed && (
                <div className="text-right flex-shrink-0 ml-2">
                  <div
                    className={`text-gray-300 font-mono bg-gray-800/70 px-2 py-1 rounded border border-cyan-400/30 ${
                      isActive ? "text-xs" : "text-[10px]"
                    }`}
                  >
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
            <div
              className={`relative ${
                isDetailed ? "mb-6" : isActive ? "mb-3" : "mb-2"
              }`}
            >
              <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`bg-cyan-400 rounded-full animate-pulse ${
                    isActive || isDetailed ? "w-2 h-2" : "w-1.5 h-1.5"
                  }`}
                />
              </div>
            </div>

            {/* Experience points */}
            <div
              className={`space-y-2 flex-1 overflow-hidden ${
                isDetailed
                  ? "max-h-none space-y-4"
                  : isActive
                  ? "max-h-[250px] overflow-y-auto"
                  : "max-h-[150px]"
              }`}
            >
              {(isActive || isDetailed
                ? experience.points
                : experience.points.slice(0, 2)
              ).map((point, pointIndex) => (
                <motion.div
                  key={pointIndex}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: isActive || isDetailed ? pointIndex * 0.1 : 0,
                    duration: 0.5,
                  }}
                  className="flex items-start space-x-2 group"
                >
                  <div className="relative mt-1.5 flex-shrink-0">
                    <div
                      className={`bg-cyan-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300 ${
                        isActive || isDetailed ? "w-2 h-2" : "w-1.5 h-1.5"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-cyan-400 rounded-full group-hover:bg-purple-400 animate-ping opacity-20 ${
                        isActive || isDetailed ? "w-2 h-2" : "w-1.5 h-1.5"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 ${
                      isDetailed
                        ? "text-base"
                        : isActive
                        ? "text-sm"
                        : "text-xs line-clamp-2"
                    }`}
                  >
                    {isActive ||
                      (isDetailed && (
                        <span className="text-green-400 font-mono text-xs">
                          [LOG]{" "}
                        </span>
                      ))}
                    {point}
                  </p>
                </motion.div>
              ))}

              {/* Show more indicator for folded cards */}
              {!isActive && !isDetailed && experience.points.length > 2 && (
                <div className="text-center pt-2">
                  <span className="text-cyan-400 text-xs font-mono">
                    +{experience.points.length - 2} more...
                  </span>
                </div>
              )}
            </div>

            {/* Click to expand hint for non-detailed view */}
            {!isDetailed && !isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="mt-auto pt-2"
              >
                <div className="text-center">
                  <div className="inline-flex items-center gap-1 text-[10px] text-cyan-400 font-mono bg-gray-800/50 px-2 py-1 rounded border border-cyan-400/30">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                    Click to expand
                  </div>
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
  const [isDragging, setIsDragging] = useState(false);

  // Slider refs and motion values
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  // Card dimensions
  const cardWidth = 320; // Fixed card width
  const cardGap = 32; // Gap between cards
  const totalCardWidth = cardWidth + cardGap;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Center the active card
  useEffect(() => {
    if (containerRef.current && !isDragging && detailedView === null) {
      const containerWidth = containerRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - cardWidth / 2;
      const targetX = centerOffset - activeIndex * totalCardWidth;
      x.set(targetX);
    }
  }, [activeIndex, x, isDragging, detailedView, totalCardWidth, cardWidth]);

  // Handle drag end to snap to nearest card
  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const currentX = x.get();
    const velocity = info.velocity.x;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const centerOffset = containerWidth / 2 - cardWidth / 2;

    // Calculate which card should be in center based on current position
    let targetIndex = Math.round((centerOffset - currentX) / totalCardWidth);

    // Adjust for velocity (swipe detection)
    if (Math.abs(velocity) > 500) {
      if (velocity > 0 && targetIndex > 0) {
        targetIndex -= 1;
      } else if (velocity < 0 && targetIndex < experiences.length - 1) {
        targetIndex += 1;
      }
    }

    const clampedIndex = Math.max(
      0,
      Math.min(experiences.length - 1, targetIndex)
    );
    setActiveIndex(clampedIndex);
  };

  const handleCardClick = (index) => {
    if (activeIndex === index) {
      // If clicking the active card, toggle detailed view
      if (detailedView === index) {
        setDetailedView(null);
      } else {
        setDetailedView(index);
      }
    } else {
      // If clicking a different card, make it active
      setActiveIndex(index);
      setDetailedView(null);
    }
  };

  // Navigation functions
  const goToSlide = (index) => {
    setActiveIndex(index);
    setDetailedView(null);
  };

  const nextSlide = () => {
    if (activeIndex < experiences.length - 1) {
      setActiveIndex((prev) => prev + 1);
      setDetailedView(null);
    }
  };

  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      setDetailedView(null);
    }
  };

  // Get card position relative to active card
  const getCardPosition = (index) => {
    if (index < activeIndex) return "left";
    if (index > activeIndex) return "right";
    return "center";
  };

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (detailedView !== null) return;

      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick(activeIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, detailedView]);

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="max-w-7xl mx-auto relative z-0 px-6 sm:px-16 py-10 sm:py-16 bg-black/50"
    >
      <style jsx>{`
        .experience-slider {
          touch-action: pan-x;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        .experience-slider:active {
          cursor: grabbing !important;
        }

        @media (max-width: 768px) {
          .experience-slider {
            touch-action: pan-x;
            -webkit-overflow-scrolling: touch;
          }
        }

        .experience-card-wrapper {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        .experience-card-wrapper:hover {
          transform: translateY(-4px) scale(1.02);
        }

        .navigation-arrow {
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
          will-change: transform;
        }

        .navigation-arrow:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.4);
        }

        .navigation-arrow:active:not(:disabled) {
          transform: scale(0.95);
        }

        .timeline-dot {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .timeline-dot:hover {
          transform: scale(1.1);
        }

        .timeline-dot:active {
          transform: scale(0.95);
        }

        @media (hover: none) and (pointer: coarse) {
          .navigation-arrow:hover {
            transform: none;
            box-shadow: none;
          }

          .experience-card-wrapper:hover {
            transform: none;
          }

          .timeline-dot:hover {
            transform: none;
          }
        }
      `}</style>
      <span className="hash-span" id="work">
        &nbsp;
      </span>

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

          {/* Floating particles - reduced from 20 to 8 */}
          {[...Array(8)].map((_, i) => (
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

            {/* Terminal window with Enhanced Blur */}
            <div className="relative bg-gray-900/90 backdrop-blur-lg border border-cyan-400/30 rounded-2xl shadow-2xl overflow-hidden max-w-4xl glassmorphism">
              {/* Terminal header */}
              <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm px-4 lg:px-6 py-3 border-b border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-900 font-mono text-sm ml-4">
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
              {/* Timeline Navigation - Enhanced with navigation buttons */}
              {detailedView === null && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center gap-4 mb-6 lg:mb-8"
                >
                  {/* Timeline dots */}
                  <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2 shadow-2xl">
                    <div className="flex items-center space-x-1 text-xs font-mono text-center">
                      <button
                        onClick={prevSlide}
                        disabled={activeIndex === 0}
                        className="text-cyan-400 px-2 py-1 hover:text-cyan-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Previous experience"
                      >
                        ←
                      </button>
                      <span className="text-cyan-400 px-2 py-1">Timeline:</span>
                      {experiences.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`timeline-dot w-8 h-8 rounded-lg border transition-all duration-300 ${
                            activeIndex === index
                              ? "bg-cyan-400 border-cyan-400 text-gray-900"
                              : "border-gray-600 text-gray-400 hover:border-cyan-400/50"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={nextSlide}
                        disabled={activeIndex === experiences.length - 1}
                        className="text-cyan-400 px-2 py-1 hover:text-cyan-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Next experience"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  {/* Slide indicator */}
                  <div className="text-center">
                    <span className="text-gray-400 text-xs font-mono">
                      {activeIndex + 1} / {experiences.length} • Drag to
                      navigate • Click active card for details
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Experience Cards - Horizontal Slider */}
              <motion.div
                layout
                className={`relative ${
                  detailedView !== null
                    ? "w-full"
                    : "h-[450px] lg:h-[500px] overflow-hidden"
                }`}
              >
                {detailedView !== null ? (
                  // Detailed view - show single card
                  <div className="w-full">
                    <ExperienceCard
                      key={detailedView}
                      experience={experiences[detailedView]}
                      index={detailedView}
                      isActive={true}
                      isDetailed={true}
                      onClick={() => handleCardClick(detailedView)}
                    />
                  </div>
                ) : (
                  // Slider view
                  <div
                    ref={containerRef}
                    className="relative w-full h-full"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <motion.div
                      ref={sliderRef}
                      style={{ x }}
                      drag="x"
                      dragConstraints={{ left: -2000, right: 2000 }}
                      dragElastic={0.2}
                      dragMomentum={false}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={handleDragEnd}
                      className="experience-slider flex gap-8 h-full cursor-grab active:cursor-grabbing select-none items-center"
                      whileTap={{ cursor: "grabbing" }}
                    >
                      {experiences.map((experience, index) => (
                        <div key={index} className="experience-card-wrapper">
                          <ExperienceCard
                            experience={experience}
                            index={index}
                            isActive={activeIndex === index}
                            isDetailed={false}
                            position={getCardPosition(index)}
                            onClick={() => handleCardClick(index)}
                          />
                        </div>
                      ))}
                    </motion.div>

                    {/* Navigation arrows */}
                    <button
                      onClick={prevSlide}
                      disabled={activeIndex === 0}
                      className="navigation-arrow absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gray-900/80 backdrop-blur-sm border border-cyan-400/30 rounded-full flex items-center justify-center text-cyan-400 hover:border-cyan-400 hover:bg-gray-800/80 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ←
                    </button>

                    <button
                      onClick={nextSlide}
                      disabled={activeIndex === experiences.length - 1}
                      className="navigation-arrow absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gray-900/80 backdrop-blur-sm border border-cyan-400/30 rounded-full flex items-center justify-center text-cyan-400 hover:border-cyan-400 hover:bg-gray-800/80 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      →
                    </button>
                  </div>
                )}
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
    </motion.section>
  );
};

export default Experience;
