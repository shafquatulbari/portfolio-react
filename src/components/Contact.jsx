import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { slideIn, fadeIn, textVariant } from "../utils/motion";

// Stagger container animation (decoupled from SectionWrapper)
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};

// Enhanced Transmission Animation Component - Optimized
const TransmissionEffect = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Main transmission overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse" />

      {/* Reduced signal bars for better performance */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 bg-gradient-to-t from-cyan-400 via-purple-400 to-transparent opacity-70 signal-bar"
          style={{
            left: `${(i / 15) * 100}%`,
            width: "2px",
            height: `${Math.random() * 70 + 10}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}

      {/* Reduced data streams */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute data-stream"
          style={{
            left: `${(i / 5) * 100}%`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      {/* Simplified pulse rings */}
      <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-cyan-400/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 transmission-pulse" />
    </div>
  );
};

const Contact = ({ navigateToSection }) => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsTransmitting(true);

    // Simulate transmission effect
    setTimeout(() => {
      emailjs
        .send(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            to_name: "Shafquat",
            from_email: form.email,
            to_email: "shafquat.bari11@gmail.com",
            message: form.message,
          },
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            setLoading(false);
            setIsTransmitting(false);
            alert(
              "🚀 Message transmitted successfully! I'll get back to you soon."
            );

            setForm({
              name: "",
              email: "",
              message: "",
            });
          },
          (error) => {
            setLoading(false);
            setIsTransmitting(false);
            console.error(error);

            alert("❌ Transmission failed. Please try again.");
          }
        );
    }, 1500);
  };

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="max-w-7xl mx-auto relative z-0 px-6 sm:px-16 py-10 sm:py-16"
    >
      <span className="hash-span" id="contact">
        &nbsp;
      </span>

      {/* Section Header */}
      <motion.div
        variants={textVariant()}
        className="text-center mb-16 relative z-10"
      >
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-8 h-8 border-2 border-cyan-400 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <h2
            className={`${styles.sectionHeadText} text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent`}
          >
            System Status: Online
          </h2>
        </div>
        <p className={`${styles.sectionSubText} text-center font-mono`}>
          Ready for new connections and collaborations
        </p>
      </motion.div>

      <div className="lg:mt-8 xl:mt-12 flex lg:flex-row flex-col gap-6 lg:gap-8 xl:gap-10 overflow-hidden relative z-10">
        {/* Contact Form */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-1 lg:flex-[0.65] xl:flex-[0.6] relative z-20"
        >
          {/* Form Container with Cyberpunk Border */}
          <div className="relative">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-30 animate-pulse" />
            <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl" />

            {/* Form Content with Enhanced Blur */}
            <div className="relative p-6 lg:p-8 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md rounded-2xl border border-cyan-400/20 glassmorphism">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6 lg:mb-8 pb-3 lg:pb-4 border-b border-gray-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-cyan-400 font-mono text-sm">
                  contact_terminal.exe
                </div>
              </div>

              {/* Terminal Output */}
              <div className="mb-4 lg:mb-6 font-mono text-sm">
                <div className="text-cyan-400">
                  <span className="text-green-400">shafquat@portfolio</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~/contact</span>
                  <span className="text-white">$ </span>
                  <span className="text-purple-400">
                    initialize_communication_protocol
                  </span>
                </div>
                <div className="text-gray-300 mt-2">
                  &gt; Establishing secure connection...
                  <span className="animate-pulse ml-2">█</span>
                </div>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 lg:gap-6"
              >
                {/* Name Field */}
                <motion.label
                  className="flex flex-col"
                  variants={fadeIn("up", "spring", 0.1, 0.75)}
                >
                  <span className="text-cyan-400 font-medium mb-2 lg:mb-3 font-mono text-sm flex items-center gap-2">
                    <span className="text-green-400">&gt;</span> IDENTITY.name
                  </span>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your identification..."
                      className={`bg-gray-900/80 py-3 lg:py-4 px-4 lg:px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-2 transition-all duration-300 font-mono ${
                        focusedField === "name"
                          ? "border-cyan-400 shadow-lg shadow-cyan-400/20"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    />
                    {focusedField === "name" && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </motion.label>

                {/* Email Field */}
                <motion.label
                  className="flex flex-col"
                  variants={fadeIn("up", "spring", 0.2, 0.75)}
                >
                  <span className="text-cyan-400 font-medium mb-2 lg:mb-3 font-mono text-sm flex items-center gap-2">
                    <span className="text-green-400">&gt;</span> CONTACT.email
                  </span>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter communication channel..."
                      className={`bg-gray-900/80 py-3 lg:py-4 px-4 lg:px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-2 transition-all duration-300 font-mono ${
                        focusedField === "email"
                          ? "border-cyan-400 shadow-lg shadow-cyan-400/20"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    />
                    {focusedField === "email" && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </motion.label>

                {/* Message Field */}
                <motion.label
                  className="flex flex-col"
                  variants={fadeIn("up", "spring", 0.3, 0.75)}
                >
                  <span className="text-cyan-400 font-medium mb-2 lg:mb-3 font-mono text-sm flex items-center gap-2">
                    <span className="text-green-400">&gt;</span> MESSAGE.content
                  </span>
                  <div className="relative">
                    <textarea
                      rows={6}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Encode your message here..."
                      className={`bg-gray-900/80 py-3 lg:py-4 px-4 lg:px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-2 transition-all duration-300 font-mono resize-none ${
                        focusedField === "message"
                          ? "border-cyan-400 shadow-lg shadow-cyan-400/20"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    />
                    {focusedField === "message" && (
                      <div className="absolute right-3 top-4">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </motion.label>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  variants={fadeIn("up", "spring", 0.4, 0.75)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group bg-gradient-to-r from-cyan-500 to-purple-600 py-3 lg:py-4 px-6 lg:px-8 rounded-xl outline-none w-fit text-white font-bold shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND_MESSAGE</span>
                        <span className="text-green-400">&gt;</span>
                      </>
                    )}
                  </div>
                </motion.button>
              </form>

              {/* Status Display */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-cyan-400/30"
                >
                  <div className="text-cyan-400 font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span>Status: Encoding message...</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <span>Status: Establishing connection...</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <span>Status: Transmitting data...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Background Section */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="flex-1 lg:flex-[0.35] xl:flex-1 lg:h-auto md:h-[550px] h-[400px] relative z-20"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-400/20 bg-gray-900/20 backdrop-blur-sm">
            {/* Transmission Effect Overlay */}
            <TransmissionEffect isActive={isTransmitting} />

            {/* Info Cards */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 lg:p-6 xl:p-8 z-10">
              <motion.div
                variants={fadeIn("up", "spring", 0.5, 0.75)}
                className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 lg:p-5 xl:p-6 border border-cyan-400/20 mb-4 lg:mb-6 w-full max-w-sm"
              >
                <h4 className="text-cyan-400 font-bold mb-2 lg:mb-3 font-mono text-sm lg:text-base">
                  DIRECT_CHANNELS
                </h4>
                <div className="space-y-2 lg:space-y-3 text-xs lg:text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Email: Available 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">
                      Response: &lt; 24 hours
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Status: Online</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">
                      Current time: {currentTime.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">
                      Status: Ready for new projects
                      <span className="animate-pulse ml-2 text-green-400">
                        ●
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn("up", "spring", 0.6, 0.75)}
                className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 lg:p-5 xl:p-6 border border-purple-400/20 w-full max-w-sm"
              >
                <h4 className="text-purple-400 font-bold mb-2 lg:mb-3 font-mono text-sm lg:text-base">
                  CONNECTION_STATS
                </h4>
                <div className="space-y-2 lg:space-y-3 text-xs lg:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Encryption:</span>
                    <span className="text-green-400">AES-256</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Latency:</span>
                    <span className="text-cyan-400">&lt; 50ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Protocol:</span>
                    <span className="text-pink-400">HTTPS/2</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
