import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  Footer,
} from "./components";

// Import GalaxyBackground component directly
const GalaxyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Galaxy background with stars and nebula effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/40 to-pink-900/20"></div>

      {/* Animated stars */}
      {[...Array(200)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            opacity: Math.random() * 0.8 + 0.2,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 4 + 2}s`,
          }}
        />
      ))}

      {/* Nebula clouds */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            left: `${Math.random() * 120 - 10}%`,
            top: `${Math.random() * 120 - 10}%`,
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            background:
              i % 2 === 0
                ? "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
            animation: `float ${
              Math.random() * 20 + 10
            }s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-0"
          style={{
            top: "20%",
            left: "-5%",
            animation: "shoot 3s linear infinite",
            animationDelay: `${Math.random() * 10 + 5}s`,
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary scroll-snap-y-mandatory h-screen overflow-y-scroll">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center scroll-snap-start scroll-snap-stop-always h-screen">
          <div className="fixed top-0 left-0 w-full z-50">
            <Navbar />
          </div>
          <Hero />
        </div>
        <div className="bg-tech-pattern bg-cover bg-no-repeat bg-center relative scroll-snap-start scroll-snap-stop-always min-h-screen">
          <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
          <div className="relative z-20">
            <About />
          </div>
        </div>
        <div className="bg-work-pattern bg-cover bg-no-repeat bg-center relative scroll-snap-start scroll-snap-stop-always min-h-screen">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20">
            <Experience />
          </div>
        </div>
        <div className="bg-neon-pattern bg-cover bg-no-repeat bg-center relative scroll-snap-start scroll-snap-stop-always min-h-screen">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20">
            <Tech />
          </div>
        </div>

        <div className="bg-rain-pattern bg-cover bg-no-repeat bg-center relative scroll-snap-start scroll-snap-stop-always min-h-screen">
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
          <div className="relative z-20">
            <Works />
          </div>
        </div>

        <div className="relative scroll-snap-start scroll-snap-stop-always min-h-screen overflow-hidden">
          {/* Galaxy Background for Contact Section */}
          <GalaxyBackground />
          <div className="relative z-20">
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
