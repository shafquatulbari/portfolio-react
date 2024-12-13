import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  //StarsCanvas,
  Footer,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <div className="fixed top-0 left-0 w-full z-50">
            <Navbar />
          </div>
          <Hero />
        </div>
        <div className="bg-tech-pattern bg-cover bg-no-repeat bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
          <div className="relative z-20">
            <About />
          </div>
        </div>
        <div className="bg-work-pattern bg-cover bg-no-repeat bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20">
            <Experience />
          </div>
        </div>
        <div className="bg-road-pattern bg-cover bg-no-repeat bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20">
            <Tech />
          </div>
        </div>

        <div className="bg-rain-pattern bg-cover bg-no-repeat bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20">
            <Works />
          </div>
        </div>

        <div className="bg-universe-pattern bg-cover bg-no-repeat bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
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
