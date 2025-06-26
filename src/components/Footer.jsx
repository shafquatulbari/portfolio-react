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
      // Reduced particle count from 30 to 20
      for (let i = 0; i < 20; i++) {
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
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
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
          transition={{ delay: 0.3 }}
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
