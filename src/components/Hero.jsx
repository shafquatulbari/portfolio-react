import { motion } from "framer-motion";
import { styles } from "../styles";
import { AvatarCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto bg-hero-pattern bg-cover bg-center bg-no-repeat">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#f926ee]" />
          <div className="w-1 sm:h-80 h-40 bg-[#ff51df80]" />
        </div>

        <div>
          <h1
            className={`${styles.heroHeadText} text-white relative`}
            style={{
              textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)", // Subtle shadow for overall text
            }}
          >
            Hi, I'm{" "}
            <span
              className="text-[#b36bff] relative"
              style={{
                textShadow: `
        5px 5px 1px rgba(0, 0, 0, 0.8) /* Blackish border */
      `,
              }}
            >
              Shafquat Ul Bari
            </span>
          </h1>

          <p
            className={`${styles.heroSubText} mt-2 relative`}
            style={{
              color: "#f1f1f1",
              textShadow: "1px 1px 6px rgba(0, 0, 0, 0.6)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            A passionate Computer Science graduate from the University of
            British Columbia <br className="sm:block hidden" />
            with expertise in Full Stack Development and SQA/QA Automation,
            specializing in building scalable applications and optimizing
            software testing processes.
          </p>
        </div>
      </div>

      <AvatarCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[#000000] bg-[#41b4f72c] flex justify-center items-start p-2 hover:shadow-lg hover:shadow-[#41b5f7] transition duration-300 ease-in-out">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-[#000000] mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
