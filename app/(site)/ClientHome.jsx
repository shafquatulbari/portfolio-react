"use client";

import nextDynamic from "next/dynamic";
import { Suspense, useMemo, useEffect, useRef, useState } from "react";
import { Navbar, Footer, PerformanceMonitor } from "@/src/components";
import {
  initScrollProgress,
  initSectionObserver,
} from "@/src/utils/scrollProgress";
import {
  safeNavigateToSection,
  createSafeCleanup,
  throttleTouchEvents,
  isMobileDevice,
  performMemoryCleanup,
} from "@/src/utils/mobileNavFix";

const Hero = nextDynamic(() => import("@/src/components/Hero"), {
  ssr: false,
  loading: () => <div className="p-10">Loading hero...</div>,
});
const NeuralProfile = nextDynamic(
  () => import("@/src/components/NeuralProfile"),
  {
    ssr: false,
  }
);
const NeuralMatrix = nextDynamic(
  () => import("@/src/components/NeuralMatrix"),
  {
    ssr: false,
  }
);
const Experience = nextDynamic(() => import("@/src/components/Experience"), {
  ssr: false,
});
const Tech = nextDynamic(() => import("@/src/components/Tech"), { ssr: false });
const Works = nextDynamic(() => import("@/src/components/Works"), {
  ssr: false,
});
const Contact = nextDynamic(() => import("@/src/components/Contact"), {
  ssr: false,
});

const GalaxyBackground = () => {
  const backgroundElements = useMemo(
    () => ({
      stars: [...Array(15)].map((_, i) => ({
        key: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        opacity: Math.random() * 0.5 + 0.2,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${Math.random() * 4 + 3}s`,
      })),
      nebula: [...Array(1)].map((_, i) => ({
        key: i,
        left: `${Math.random() * 120 - 10}%`,
        top: `${Math.random() * 120 - 10}%`,
        width: `${Math.random() * 200 + 120}px`,
        height: `${Math.random() * 200 + 120}px`,
        background:
          i % 2 === 0
            ? "radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
        animation: `float ${
          Math.random() * 20 + 15
        }s ease-in-out infinite alternate`,
        animationDelay: `${Math.random() * 15}s`,
      })),
    }),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
    </div>
  );
};

export default function ClientHome() {
  const [currentSection, setCurrentSection] = useState("hero");
  const cleanupRef = useRef(createSafeCleanup());
  const isMobile = isMobileDevice();

  useEffect(() => {
    const cleanupProgress = initScrollProgress();
    const cleanupObserver = initSectionObserver();

    const preventSectionNavigation = (e) => {
      const target = e.target.closest(".snap-section-full");
      if (target && !target.classList.contains("active")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const throttledTouchMove = throttleTouchEvents(
      preventSectionNavigation,
      50
    );

    document.addEventListener("wheel", preventSectionNavigation, {
      passive: false,
    });

    if (isMobile) {
      document.addEventListener("touchmove", throttledTouchMove, {
        passive: false,
      });
    } else {
      document.addEventListener("touchmove", preventSectionNavigation, {
        passive: false,
      });
    }

    let memoryCleanupInterval;
    if (isMobile) {
      memoryCleanupInterval = setInterval(performMemoryCleanup, 30000);
      cleanupRef.current.addTimer(memoryCleanupInterval);
    }

    return () => {
      cleanupProgress();
      cleanupObserver();
      cleanupRef.current.cleanup();
      document.removeEventListener("wheel", preventSectionNavigation);
      document.removeEventListener(
        "touchmove",
        isMobile ? throttledTouchMove : preventSectionNavigation
      );
      if (memoryCleanupInterval) clearInterval(memoryCleanupInterval);
    };
  }, [isMobile]);

  const navigateToSection = (sectionId) => {
    safeNavigateToSection(setCurrentSection, sectionId, isMobile ? 500 : 300);
  };

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

  return (
    <div className="relative z-0 bg-primary">
      <PerformanceMonitor />

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <GalaxyBackground />
      </div>

      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar
          currentSection={currentSection}
          navigateToSection={navigateToSection}
        />
      </div>

      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-40">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all duration-300 ease-out"
          style={{ width: "var(--scroll-progress, 0%)" }}
        />
      </div>

      <div className="scroll-container">
        <section
          id="hero"
          className={`snap-section-full bg-hero-pattern bg-cover bg-no-repeat bg-center ${
            currentSection === "hero" ? "active" : ""
          }`}
        >
          {currentSection === "hero" && (
            <Suspense fallback={<div className="p-10">Loading hero...</div>}>
              <Hero navigateToSection={navigateToSection} />
            </Suspense>
          )}
        </section>

        <section
          id="neural-profile"
          className={`snap-section-full bg-tech-pattern bg-cover bg-no-repeat bg-center relative ${
            currentSection === "neural-profile" ? "active" : ""
          }`}
        >
          {currentSection === "neural-profile" && <NeuralProfile />}
        </section>

        <section
          id="neural-matrix"
          className={`snap-section-full bg-grid-pattern bg-cover bg-no-repeat bg-center relative ${
            currentSection === "neural-matrix" ? "active" : ""
          }`}
        >
          {currentSection === "neural-matrix" && <NeuralMatrix />}
        </section>

        <section
          id="experience"
          className={`snap-section-full bg-work-pattern bg-cover bg-no-repeat bg-center relative ${
            currentSection === "experience" ? "active" : ""
          }`}
        >
          {currentSection === "experience" && <Experience />}
        </section>

        <section
          id="tech"
          className={`snap-section-full bg-neon-pattern bg-cover bg-no-repeat bg-center relative ${
            currentSection === "tech" ? "active" : ""
          }`}
        >
          {currentSection === "tech" && <Tech />}
        </section>

        <section
          id="projects"
          className={`snap-section-full bg-rain-pattern bg-cover bg-no-repeat bg-center relative ${
            currentSection === "projects" ? "active" : ""
          }`}
        >
          {currentSection === "projects" && <Works />}
        </section>

        <section
          id="contact"
          className={`snap-section-full relative overflow-hidden ${
            currentSection === "contact" ? "active" : ""
          }`}
        >
          {currentSection === "contact" && (
            <>
              <Contact navigateToSection={navigateToSection} />
              <Footer />
            </>
          )}
        </section>
      </div>

      {currentSection !== "hero" && (
        <div className="fixed bottom-20 sm:bottom-16 md:bottom-12 lg:bottom-8 left-4 sm:left-6 z-40 flex flex-col gap-3">
          <button
            onClick={() =>
              currentIndex > 0 && navigateToSection(sections[currentIndex - 1])
            }
            className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white p-3 rounded-full shadow-2xl hover:shadow-purple-400/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-110 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-xl" />
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20 animate-ping group-hover:animate-none" />
          </button>

          {currentSection !== "contact" && (
            <button
              onClick={() =>
                currentIndex < sections.length - 1 &&
                navigateToSection(sections[currentIndex + 1])
              }
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white p-3 rounded-full shadow-2xl hover:shadow-cyan-400/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-110 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-xl" />
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
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 animate-ping group-hover:animate-none" />
            </button>
          )}
        </div>
      )}

      {currentSection !== "hero" && (
        <div className="fixed bottom-20 sm:bottom-16 md:bottom-12 lg:bottom-8 right-4 sm:right-6 z-40">
          <button
            onClick={() => navigateToSection("hero")}
            className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-400/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-110 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-xl" />
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 animate-ping group-hover:animate-none" />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-pink-400 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
              home.exe
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
