import { BrowserRouter } from "react-router-dom";
import { useEffect, useMemo } from "react";

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
      // Reduced star count from 200 to 50
      stars: [...Array(50)].map((_, i) => ({
        key: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        opacity: Math.random() * 0.6 + 0.2,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 4 + 3}s`,
      })),
      // Reduced nebula count from 8 to 4
      nebula: [...Array(4)].map((_, i) => ({
        key: i,
        left: `${Math.random() * 120 - 10}%`,
        top: `${Math.random() * 120 - 10}%`,
        width: `${Math.random() * 200 + 80}px`,
        height: `${Math.random() * 200 + 80}px`,
        background:
          i % 2 === 0
            ? "radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
        animation: `float ${
          Math.random() * 20 + 15
        }s ease-in-out infinite alternate`,
        animationDelay: `${Math.random() * 10}s`,
      })),
      // Reduced shooting stars from 3 to 2
      shootingStars: [...Array(2)].map((_, i) => ({
        key: i,
        animationDelay: `${Math.random() * 15 + 8}s`,
      })),
    }),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Galaxy background with stars and nebula effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-pink-900/15"></div>

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
  useEffect(() => {
    // Initialize scroll progress tracking
    const cleanupProgress = initScrollProgress();
    const cleanupObserver = initSectionObserver();

    return () => {
      cleanupProgress();
      cleanupObserver();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Performance Monitor */}
        <PerformanceMonitor />

        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
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

        {/* Main Content with Smoother Scroll */}
        <div className="scroll-smooth">
          <section
            id="hero"
            className="bg-hero-pattern bg-cover bg-no-repeat bg-center h-screen"
          >
            <Hero />
          </section>

          <section
            id="neural-profile"
            className="bg-tech-pattern bg-cover bg-no-repeat bg-center relative min-h-screen"
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
            <div className="relative z-20">
              <NeuralProfile />
            </div>
          </section>

          <section
            id="neural-matrix"
            className="bg-grid-pattern bg-cover bg-no-repeat bg-center relative min-h-screen"
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
            <div className="relative z-20">
              <NeuralMatrix />
            </div>
          </section>

          <section
            id="experience"
            className="bg-work-pattern bg-cover bg-no-repeat bg-center relative min-h-screen"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            <div className="relative z-20">
              <Experience />
            </div>
          </section>

          <section
            id="tech"
            className="bg-neon-pattern bg-cover bg-no-repeat bg-center relative min-h-screen"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            <div className="relative z-20">
              <Tech />
            </div>
          </section>

          <section
            id="projects"
            className="bg-rain-pattern bg-cover bg-no-repeat bg-center relative min-h-screen"
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
            <div className="relative z-20">
              <Works />
            </div>
          </section>

          <section
            id="contact"
            className="relative min-h-screen overflow-hidden"
          >
            <GalaxyBackground />
            <div className="relative z-20">
              <Contact />
              <Footer />
            </div>
          </section>
        </div>

        {/* Floating Action Button for Quick Navigation */}
        <div className="fixed bottom-6 left-6 z-40 lg:hidden">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white p-3 rounded-full shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 group"
          >
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
