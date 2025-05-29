import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn, textVariant } from "../utils/motion";

// Enhanced Transmission Animation Component
const TransmissionEffect = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Main transmission overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse" />

      {/* Enhanced signal bars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 bg-gradient-to-t from-cyan-400 via-purple-400 to-transparent opacity-70 signal-bar"
          style={{
            left: `${(i / 30) * 100}%`,
            width: "2px",
            height: `${Math.random() * 70 + 10}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}

      {/* Data streams */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute data-stream"
          style={{
            left: `${(i / 8) * 100}%`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      {/* Pulse rings */}
      <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-cyan-400/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 transmission-pulse" />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 border border-purple-400/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 transmission-pulse"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 border border-pink-400/10 rounded-full transform -translate-x-1/2 -translate-y-1/2 transmission-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Scanning lines */}
      <div className="absolute inset-0">
        <div
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"
          style={{ top: "20%" }}
        />
        <div
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse"
          style={{ top: "60%", animationDelay: "0.3s" }}
        />
        <div
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent animate-pulse"
          style={{ top: "80%", animationDelay: "0.6s" }}
        />
      </div>

      {/* Holographic interference */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              animation: `data-flow ${2 + i * 0.3}s linear infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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
    <>
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

      <div className="xl:mt-12 flex xl:flex-row flex-col gap-10 overflow-hidden relative z-10">
        {/* Contact Form */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.6] relative z-20"
        >
          {/* Form Container with Cyberpunk Border */}
          <div className="relative">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-30 animate-pulse" />
            <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl" />

            {/* Form Content */}
            <div className="relative p-8 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl border border-cyan-400/20">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-700/50">
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
              <div className="mb-6 font-mono text-sm">
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
                className="flex flex-col gap-6"
              >
                {/* Name Field */}
                <motion.label
                  className="flex flex-col"
                  variants={fadeIn("up", "spring", 0.1, 0.75)}
                >
                  <span className="text-cyan-400 font-medium mb-3 font-mono text-sm flex items-center gap-2">
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
                      className={`bg-gray-900/80 py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-2 transition-all duration-300 font-mono ${
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
                  <span className="text-cyan-400 font-medium mb-3 font-mono text-sm flex items-center gap-2">
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
                      className={`bg-gray-900/80 py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-2 transition-all duration-300 font-mono ${
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
                  <span className="text-cyan-400 font-medium mb-3 font-mono text-sm flex items-center gap-2">
                    <span className="text-green-400">&gt;</span> MESSAGE.content
                  </span>
                  <div className="relative">
                    <textarea
                      rows={7}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Encode your message here..."
                      className={`bg-gray-900/80 py-4 px-6 placeholder:text-gray-500 text-white rounded-lg outline-none border-2 transition-all duration-300 font-mono resize-none ${
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
                  className="relative group bg-gradient-to-r from-cyan-500 to-purple-600 py-4 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono overflow-hidden"
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
          className="xl:flex-1 xl:h-auto md:h-[600px] h-[400px] relative z-20"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-400/20 bg-gray-900/20 backdrop-blur-sm">
            {/* Transmission Effect Overlay */}
            <TransmissionEffect isActive={isTransmitting} />

            {/* Info Cards */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 z-10">
              <motion.div
                variants={fadeIn("up", "spring", 0.5, 0.75)}
                className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20 mb-6 w-full max-w-sm"
              >
                <h4 className="text-cyan-400 font-bold mb-3 font-mono">
                  DIRECT_CHANNELS
                </h4>
                <div className="space-y-3 text-sm">
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
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn("up", "spring", 0.6, 0.75)}
                className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-purple-400/20 w-full max-w-sm"
              >
                <h4 className="text-purple-400 font-bold mb-3 font-mono">
                  CONNECTION_STATS
                </h4>
                <div className="space-y-3 text-sm">
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
    </>
  );
};

export default SectionWrapper(Contact, "contact");
