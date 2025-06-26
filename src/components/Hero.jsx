import { motion } from "framer-motion";
import { styles } from "../styles";
import { AvatarCanvas } from "./canvas";
import { useState, useEffect, useMemo } from "react";
import { useScrollTracking } from "../utils/scrollTracking";
const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [particleCount, setParticleCount] = useState(10); // Reduced default from 20 to 10

  // Add scroll tracking for Hero section
  const heroRef = useScrollTracking("hero_section");

  const roles = [
    "Full Stack Developer",
    "Software Engineer",
    "SDET Specialist",
    "Problem Solver",
  ];

  useEffect(() => {
    // Set particle count based on screen size - reduced counts
    const updateParticleCount = () => {
      setParticleCount(window.innerWidth < 768 ? 5 : 10); // Reduced from 10:20 to 5:10
    };

    updateParticleCount();
    window.addEventListener("resize", updateParticleCount);

    return () => window.removeEventListener("resize", updateParticleCount);
  }, []);

  // Memoize particles to prevent re-generation on every render
  const particles = useMemo(() => {
    return [...Array(particleCount)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 2 + Math.random() * 2,
    }));
  }, [particleCount]);

  useEffect(() => {
    const typeText = () => {
      const currentRole = roles[currentIndex];

      if (isTyping) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsTyping(false), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setCurrentIndex((prev) => (prev + 1) % roles.length);
          setIsTyping(true);
        }
      }
    };

    const timer = setTimeout(typeText, isTyping ? 100 : 50);
    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isTyping, roles]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen mx-auto bg-hero-pattern bg-cover bg-no-repeat bg-center overflow-hidden"
    >
      {/* Cyberpunk overlay with original background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern - responsive sizing with reduced opacity */}
        <div
          className="absolute inset-0 opacity-8" // Reduced from opacity-10 to opacity-8
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px", // Smaller grid on mobile
          }}
        />

        {/* Optimized floating particles using memoized array */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
            }}
          />
        ))}

        {/* Simplified animated lines - reduced from 4 to 2 */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" />
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Terminal and sidebar container - background layer */}
      <div
        className={`absolute inset-0 top-[80px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col sm:flex-row items-start gap-3 sm:gap-5 z-10`}
      >
        {/* Terminal-style sidebar - responsive positioning */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-row sm:flex-col justify-start sm:justify-center items-center mt-2 sm:mt-5 w-full sm:w-auto"
        >
          {/* Connection indicator */}
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-ping opacity-30"></div>
          </div>

          {/* Data stream line - horizontal on mobile, vertical on desktop */}
          <div className="h-1 w-20 sm:w-1 sm:h-40 md:sm:h-80 bg-gradient-to-r sm:bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 relative overflow-hidden ml-2 sm:ml-0 sm:mt-2">
            <div className="absolute h-full w-8 sm:w-full sm:h-8 bg-gradient-to-r sm:bg-gradient-to-b from-white/50 to-transparent animate-pulse"></div>
          </div>
        </motion.div>

        <div className="flex-1 w-full">
          {/* Terminal Window - responsive sizing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-cyan-400/20 p-3 sm:p-6 mb-4 sm:mb-8 shadow-2xl"
          >
            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 sm:ml-3 text-cyan-400 font-mono text-xs sm:text-sm">
                portfolio_terminal.exe
              </span>
            </div>

            <div className="font-mono text-xs sm:text-sm space-y-1 sm:space-y-2">
              <div className="text-green-400">
                <span className="text-cyan-400">visitor@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~/home</span>
                <span className="text-white">$ </span>
                <span className="text-purple-400 break-all">
                  cat developer_info.txt
                </span>
              </div>
              <div className="text-gray-300">
                &gt; Loading developer profile...
                <span className="animate-pulse ml-2">█</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Text content container - foreground layer */}
      <div
        className={`absolute inset-0 top-[80px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col sm:flex-row items-start gap-3 sm:gap-5 z-30 pointer-events-none`}
      >
        {/* Spacer to align with terminal layout */}
        <div className="flex flex-row sm:flex-col justify-start sm:justify-center items-center mt-2 sm:mt-5 w-full sm:w-auto opacity-0 pointer-events-none">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0"></div>
          <div className="h-1 w-20 sm:w-1 sm:h-40 md:sm:h-80 ml-2 sm:ml-0 sm:mt-2"></div>
        </div>

        <div className="flex-1 w-full">
          {/* Spacer for terminal window */}
          <div className="mb-4 sm:mb-8 p-3 sm:p-6 opacity-0 pointer-events-none">
            <div className="mb-2 sm:mb-4 h-4"></div>
            <div className="space-y-1 sm:space-y-2 h-8"></div>
          </div>

          {/* Main Content - responsive text sizes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pointer-events-auto"
          >
            <h1 className="text-white relative mb-2 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="text-cyan-400 font-mono">&gt; </span>
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative block sm:inline">
                Shafquat Ul Bari
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse"></div>
              </span>
            </h1>

            {/* Animated Role Display - responsive sizing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-4 sm:mb-6"
            >
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-mono">
                <span className="text-gray-400">I'm a </span>
                <span className="text-cyan-400">{displayText}</span>
                <span className="animate-pulse text-cyan-400">|</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-2 relative max-w-3xl text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed"
              style={{
                background:
                  "linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(31, 41, 55, 0.6))",
                padding: "15px sm:20px",
                borderRadius: "10px sm:15px",
                border: "1px solid rgba(56, 189, 248, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              A passionate Computer Science graduate from the University of
              British Columbia <br className="hidden sm:block" />
              with expertise in{" "}
              <span className="text-cyan-400 font-semibold">
                Full Stack Development
              </span>{" "}
              and <span className="text-purple-400 font-semibold">SDET</span>,
              specializing in building scalable applications and optimizing
              software testing processes.
            </motion.p>

            {/* Tech Stack Preview - responsive grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-4 sm:mt-8 flex flex-wrap gap-2 sm:gap-3"
            >
              {["React", "Node.js", "Python", "TypeScript", "MongoDB"].map(
                (tech, index) => (
                  <div
                    key={tech}
                    className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-900/60 backdrop-blur-sm rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-cyan-400 font-mono text-xs sm:text-sm group-hover:text-white transition-colors duration-300">
                      {tech}
                    </span>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Avatar container - middle layer - hidden on mobile */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden sm:block">
        <AvatarCanvas />
      </div>

      {/* Enhanced Scroll Indicator - responsive positioning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 sm:bottom-10 w-full flex justify-center items-center z-40"
      >
        <a href="#about">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-cyan-400/20 rounded-3xl blur-md group-hover:bg-cyan-400/40 transition-all duration-300"></div>

            {/* Main scroll indicator - responsive sizing */}
            <div className="relative w-[30px] h-[50px] sm:w-[35px] sm:h-[64px] rounded-3xl border-2 border-cyan-400/60 bg-gray-900/80 backdrop-blur-sm flex justify-center items-start p-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 group-hover:scale-110">
              <motion.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500 mb-1 shadow-lg shadow-cyan-400/50"
              />
            </div>

            {/* Terminal-style label - hidden on small screens */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
              scroll_down.exe
            </div>
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
