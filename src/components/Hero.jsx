import { motion } from "framer-motion";
import { styles } from "../styles";
import { AvatarCanvas } from "./canvas";
import { useState, useEffect } from "react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const roles = [
    "Full Stack Developer",
    "Software Engineer",
    "SDET Specialist",
    "Problem Solver",
  ];

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
    <section className="relative w-full h-screen mx-auto bg-hero-pattern bg-cover bg-no-repeat bg-center overflow-hidden">
      {/* Cyberpunk overlay with original background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
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

        {/* Animated lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" />
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-pink-400/30 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        {/* Terminal-style sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center items-center mt-5"
        >
          {/* Connection indicator */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-ping opacity-30"></div>
          </div>

          {/* Data stream line */}
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 relative overflow-hidden">
            <div className="absolute w-full h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse"></div>
          </div>
        </motion.div>

        <div className="flex-1">
          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-cyan-400/20 p-6 mb-8 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-3 text-cyan-400 font-mono text-sm">
                portfolio_terminal.exe
              </span>
            </div>

            <div className="font-mono text-sm space-y-2">
              <div className="text-green-400">
                <span className="text-cyan-400">visitor@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~/home</span>
                <span className="text-white">$ </span>
                <span className="text-purple-400">cat developer_info.txt</span>
              </div>
              <div className="text-gray-300">
                &gt; Loading developer profile...
                <span className="animate-pulse ml-2">█</span>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className={`${styles.heroHeadText} text-white relative mb-4`}>
              <span className="text-cyan-400 font-mono">&gt; </span>
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative">
                Shafquat Ul Bari
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse"></div>
              </span>
            </h1>

            {/* Animated Role Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-4xl font-bold font-mono">
                <span className="text-gray-400">I'm a </span>
                <span className="text-cyan-400">{displayText}</span>
                <span className="animate-pulse text-cyan-400">|</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={`${styles.heroSubText} mt-2 relative max-w-3xl`}
              style={{
                color: "#e5e7eb",
                background:
                  "linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(31, 41, 55, 0.6))",
                padding: "20px",
                borderRadius: "15px",
                border: "1px solid rgba(56, 189, 248, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              A passionate Computer Science graduate from the University of
              British Columbia <br className="sm:block hidden" />
              with expertise in{" "}
              <span className="text-cyan-400 font-semibold">
                Full Stack Development
              </span>{" "}
              and <span className="text-purple-400 font-semibold">SDET</span>,
              specializing in building scalable applications and optimizing
              software testing processes.
            </motion.p>

            {/* Tech Stack Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {["React", "Node.js", "Python", "TypeScript", "MongoDB"].map(
                (tech, index) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-gray-900/60 backdrop-blur-sm rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-cyan-400 font-mono text-sm group-hover:text-white transition-colors duration-300">
                      {tech}
                    </span>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AvatarCanvas />

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10"
      >
        <a href="#about">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-cyan-400/20 rounded-3xl blur-md group-hover:bg-cyan-400/40 transition-all duration-300"></div>

            {/* Main scroll indicator */}
            <div className="relative w-[35px] h-[64px] rounded-3xl border-2 border-cyan-400/60 bg-gray-900/80 backdrop-blur-sm flex justify-center items-start p-2 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 group-hover:scale-110">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500 mb-1 shadow-lg shadow-cyan-400/50"
              />
            </div>

            {/* Terminal-style label */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              scroll_down.exe
            </div>
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
