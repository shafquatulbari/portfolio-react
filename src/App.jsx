import { BrowserRouter } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  NeuralMatrix,
  NeuralProfile,
  Tech,
  Works,
  Footer,
} from "./components";
import PerformanceMonitor from "./components/PerformanceMonitor";

import {
  initScrollProgress,
  initSectionObserver,
} from "./utils/scrollProgress";

// Optimized GalaxyBackground component with reduced particles
const GalaxyBackground = () => {
  // Memoize background to prevent unnecessary re-renders
  const backgroundElements = useMemo(
    () => ({
      // Reduced star count for better performance
      stars: [...Array(50)].map((_, i) => ({
        key: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        opacity: Math.random() * 0.6 + 0.2,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
      })),
      // Reduced nebula count for better performance
      nebula: [...Array(4)].map((_, i) => ({
        key: i,
        left: `${Math.random() * 120 - 10}%`,
        top: `${Math.random() * 120 - 10}%`,
        width: `${Math.random() * 300 + 150}px`,
        height: `${Math.random() * 300 + 150}px`,
        background:
          i % 2 === 0
            ? "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
        animation: `float ${
          Math.random() * 15 + 10
        }s ease-in-out infinite alternate`,
        animationDelay: `${Math.random() * 8}s`,
      })),
      // Reduced shooting stars
      shootingStars: [...Array(2)].map((_, i) => ({
        key: i,
        animationDelay: `${Math.random() * 10 + 5}s`,
      })),
    }),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Optimized animated stars */}
      {backgroundElements.stars.map((star) => (
        <div
          key={star.key}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: star.left,
            top: star.top,
            width: star.width,
            height: star.height,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        />
      ))}

      {/* Optimized nebula clouds */}
      {backgroundElements.nebula.map((nebula) => (
        <div
          key={nebula.key}
          className="absolute rounded-full blur-xl"
          style={{
            left: nebula.left,
            top: nebula.top,
            width: nebula.width,
            height: nebula.height,
            background: nebula.background,
            animation: nebula.animation,
            animationDelay: nebula.animationDelay,
          }}
        />
      ))}

      {/* Optimized shooting stars */}
      {backgroundElements.shootingStars.map((star) => (
        <div
          key={star.key}
          className="absolute w-1 h-1 bg-white rounded-full opacity-0"
          style={{
            top: "20%",
            left: "-5%",
            animation: "shoot 4s linear infinite",
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  // State to track current section - only one section visible at a time
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    // Initialize scroll progress tracking
    const cleanupProgress = initScrollProgress();
    const cleanupObserver = initSectionObserver();

    // Prevent wheel events from navigating between sections
    const preventSectionNavigation = (e) => {
      // Allow scrolling within sections but prevent navigation between sections
      const target = e.target.closest(".snap-section-full");
      if (target && !target.classList.contains("active")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add event listeners to prevent unwanted scroll navigation
    document.addEventListener("wheel", preventSectionNavigation, {
      passive: false,
    });
    document.addEventListener("touchmove", preventSectionNavigation, {
      passive: false,
    });

    return () => {
      cleanupProgress();
      cleanupObserver();
      document.removeEventListener("wheel", preventSectionNavigation);
      document.removeEventListener("touchmove", preventSectionNavigation);
    };
  }, []);

  // Function to navigate to a specific section
  const navigateToSection = (sectionId) => {
    setCurrentSection(sectionId);
  };

  // Get the current section index for navigation
  const sections = [
    "hero",
    "neural-profile",
    "neural-matrix",
    "experience",
    "tech",
    "projects",
    "contact",
  ];
  const currentIndex = sections.indexOf(currentSection);

  // Navigation functions
  const navigateToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  const navigateToNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Performance Monitor */}
        <PerformanceMonitor />

        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar
            currentSection={currentSection}
            navigateToSection={navigateToSection}
          />
        </div>

        {/* Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-40">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all duration-300 ease-out"
            style={{
              width: "var(--scroll-progress, 0%)",
            }}
          />
        </div>

        {/* Main Content - Only show one section at a time */}
        <div className="scroll-container">
          <section
            id="hero"
            className={`snap-section-full bg-hero-pattern bg-cover bg-no-repeat bg-center ${
              currentSection === "hero" ? "active" : ""
            }`}
          >
            <Hero navigateToSection={navigateToSection} />
          </section>

          <section
            id="neural-profile"
            className={`snap-section-full bg-tech-pattern bg-cover bg-no-repeat bg-center relative ${
              currentSection === "neural-profile" ? "active" : ""
            }`}
          >
            <GalaxyBackground />
            <NeuralProfile />
          </section>

          <section
            id="neural-matrix"
            className={`snap-section-full bg-grid-pattern bg-cover bg-no-repeat bg-center relative ${
              currentSection === "neural-matrix" ? "active" : ""
            }`}
          >
            <GalaxyBackground />
            <NeuralMatrix />
          </section>

          <section
            id="experience"
            className={`snap-section-full bg-work-pattern bg-cover bg-no-repeat bg-center relative ${
              currentSection === "experience" ? "active" : ""
            }`}
          >
            <GalaxyBackground />
            <Experience />
          </section>

          <section
            id="tech"
            className={`snap-section-full bg-neon-pattern bg-cover bg-no-repeat bg-center relative ${
              currentSection === "tech" ? "active" : ""
            }`}
          >
            <GalaxyBackground />
            <Tech />
          </section>

          <section
            id="projects"
            className={`snap-section-full bg-rain-pattern bg-cover bg-no-repeat bg-center relative ${
              currentSection === "projects" ? "active" : ""
            }`}
          >
            <GalaxyBackground />
            <Works />
          </section>

          <section
            id="contact"
            className={`snap-section-full relative overflow-hidden ${
              currentSection === "contact" ? "active" : ""
            }`}
          >
            <Contact navigateToSection={navigateToSection} />
            <Footer />
          </section>
        </div>

        {/* Enhanced Navigation Buttons - Show on all sections except Hero */}
        {currentSection !== "hero" && (
          <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
            {/* Navigate Up Button */}
            <button
              onClick={() => {
                const sections = [
                  "hero",
                  "neural-profile",
                  "neural-matrix",
                  "experience",
                  "tech",
                  "projects",
                  "contact",
                ];
                const currentIndex = sections.indexOf(currentSection);
                if (currentIndex > 0) {
                  setCurrentSection(sections[currentIndex - 1]);
                }
              }}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white p-3 rounded-full shadow-2xl hover:shadow-purple-400/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-110 active:scale-95"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-xl"></div>

              {/* Up Arrow Icon */}
              <svg
                className="w-5 h-5 relative z-10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>

              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20 animate-ping group-hover:animate-none"></div>
            </button>

            {/* Navigate Down Button - Hide on Contact section */}
            {currentSection !== "contact" && (
              <button
                onClick={() => {
                  const sections = [
                    "hero",
                    "neural-profile",
                    "neural-matrix",
                    "experience",
                    "tech",
                    "projects",
                    "contact",
                  ];
                  const currentIndex = sections.indexOf(currentSection);
                  if (currentIndex < sections.length - 1) {
                    setCurrentSection(sections[currentIndex + 1]);
                  }
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white p-3 rounded-full shadow-2xl hover:shadow-cyan-400/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-110 active:scale-95"
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-xl"></div>

                {/* Down Arrow Icon */}
                <svg
                  className="w-5 h-5 relative z-10 group-hover:scale-110 group-hover:translate-y-1 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 14l-7 7m0 0l-7-7m7 7V4"
                  />
                </svg>

                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 animate-ping group-hover:animate-none"></div>
              </button>
            )}

            {/* Terminal-style labels - hidden on small screens */}
            <div className="absolute -right-20 top-0 text-purple-400 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
              navigate_up.exe
            </div>
            {currentSection !== "contact" && (
              <div className="absolute -right-20 bottom-0 text-cyan-400 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                navigate_down.exe
              </div>
            )}
          </div>
        )}

        {/* Home Navigation Button - Show only when NOT on Hero */}
        {currentSection !== "hero" && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => {
                setCurrentSection("hero");
              }}
              className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-400/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-110 active:scale-95"
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-xl"></div>

              {/* Home Icon */}
              <svg
                className="w-6 h-6 relative z-10 group-hover:scale-110 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>

              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 animate-ping group-hover:animate-none"></div>

              {/* Terminal-style label - hidden on small screens */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-pink-400 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                home.exe
              </div>
            </button>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
