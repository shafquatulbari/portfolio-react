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
          <Navbar />
          <Hero />
        </div>
        <div className="bg-tech-pattern bg-cover bg-no-repeat bg-center">
          <About />
        </div>
        <div className="bg-work-pattern bg-cover bg-no-repeat bg-center">
          <Experience />
        </div>
        <div className="bg-road-pattern bg-cover bg-no-repeat bg-center">
          <Tech />
        </div>
        <div className="bg-rain-pattern bg-cover bg-no-repeat bg-center">
          <Works />
        </div>
        <div className="bg-universe-pattern bg-cover bg-no-repeat bg-center">
          <Contact />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
