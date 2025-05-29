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

        <div className="relative scroll-snap-start scroll-snap-stop-always min-h-screen">
          <Contact />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
