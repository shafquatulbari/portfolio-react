import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faFileDownload,
  faRocket,
  faCode,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

// Animated Background Component
const CyberpunkBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          animationDelay: Math.random() * 5,
          duration: Math.random() * 3 + 2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Animated lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-pulse" />
      <div
        className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
};

// Stats Component
const FooterStats = () => {
  const stats = [
    { icon: faCode, value: "500K+", label: "Lines of Code" },
    { icon: faRocket, value: "15+", label: "Projects Launched" },
    { icon: faCoffee, value: "∞", label: "Cups of Coffee" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center group"
        >
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 group-hover:scale-105">
            <FontAwesomeIcon
              icon={stat.icon}
              className="text-3xl text-cyan-400 mb-3 group-hover:text-purple-400 transition-colors duration-300"
            />
            <div className="text-2xl font-bold text-white mb-1 font-mono">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    {
      icon: faGithub,
      href: "https://github.com/shafquatulbari",
      label: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      icon: faLinkedin,
      href: "https://www.linkedin.com/in/shafquatulbari/",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: faEnvelope,
      href: "mailto:shafquat.bari11@gmail.com",
      label: "Email",
      color: "hover:text-red-400",
    },
    {
      icon: faFileDownload,
      href: "/shafquat.pdf",
      label: "Resume",
      color: "hover:text-green-400",
      isDownload: true,
    },
  ];

  return (
    <footer className="relative bg-gray-950 text-white py-16 overflow-hidden">
      <CyberpunkBackground />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-8 border-2 border-cyan-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              System Status: Online
            </h2>
          </div>
          <p className="text-gray-300 font-mono text-sm">
            Ready for new connections and collaborations
          </p>
        </motion.div>

        {/* Stats Section */}
        <FooterStats />

        {/* Terminal Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-cyan-400 font-mono text-sm">
              system_info.sh
            </div>
          </div>

          <div className="font-mono text-sm space-y-2">
            <div className="text-cyan-400">
              <span className="text-green-400">shafquat@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~/footer</span>
              <span className="text-white">$ </span>
              <span className="text-purple-400">uptime</span>
            </div>
            <div className="text-gray-300 ml-4">
              → System uptime: Always online
            </div>
            <div className="text-gray-300 ml-4">
              → Current time: {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-gray-300 ml-4">
              → Status: Ready for new projects
              <span className="animate-pulse ml-2 text-green-400">●</span>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-center mb-8 text-cyan-400 font-mono">
            ESTABLISH_CONNECTION.protocols
          </h3>
          <div className="flex justify-center flex-wrap gap-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative flex flex-col items-center p-4 bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 ${link.color}`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />

                <FontAwesomeIcon
                  icon={link.icon}
                  className="text-2xl mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-mono relative z-10">
                  {link.label}
                </span>

                {/* Connection indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-gray-900 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-700/50 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-sm text-gray-400">
              <span className="text-cyan-400">©</span> 2025 Shafquat Ul Bari
              <span className="text-purple-400 mx-2">|</span>
              All rights reserved
            </div>

            <div className="flex items-center gap-4 text-sm font-mono">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Build: v2.0.1</span>
              </div>
              <div className="text-gray-600">|</div>
              <div className="text-gray-400">Made with ❤️ and lots of ☕</div>
            </div>
          </div>

          {/* ASCII Art */}
          <div className="mt-8 text-xs font-mono text-gray-600 opacity-50">
            <pre>{`
    ╔══════════════════════════════════════════════════════════════╗
    ║                    END OF TRANSMISSION                        ║
    ╚══════════════════════════════════════════════════════════════╝
            `}</pre>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
