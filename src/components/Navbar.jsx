import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../../public/assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-4 fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg shadow-cyan-400/20 border-b border-cyan-400/20"
          : "bg-gray-900/80 backdrop-blur-sm border-b border-cyan-400/10"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo and Title with Cyberpunk Effects */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* Logo with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-md group-hover:bg-cyan-400/50 transition-all duration-300"></div>
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 object-contain relative z-10 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Terminal-style title */}
          <div className="relative">
            <p className="text-white text-[20px] font-extrabold cursor-pointer flex font-mono group-hover:text-cyan-300 transition-all duration-300">
              <span className="text-cyan-400">&gt; </span>
              <span className="text-white">Shafquat</span>
              <span className="hidden sm:inline-block text-gray-400 ml-2">
                <span className="text-purple-400">[</span>
                <span className="text-cyan-400">SWE</span>
                <span className="text-gray-400"> | </span>
                <span className="text-pink-400">SDET</span>
                <span className="text-purple-400">]</span>
              </span>
            </p>

            {/* Typing cursor */}
            <span className="inline-block w-2 h-5 bg-cyan-400 ml-1 animate-pulse"></span>
          </div>
        </Link>

        {/* Desktop Navigation with Cyberpunk Style */}
        <ul className="list-none hidden sm:flex flex-row gap-8">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className="relative group"
              onClick={() => setActive(nav.title)}
            >
              <a
                href={`#${nav.id}`}
                className={`${
                  active === nav.title ? "text-cyan-400" : "text-gray-300"
                } hover:text-cyan-400 text-[16px] font-medium cursor-pointer transition-all duration-300 font-mono relative z-10`}
              >
                <span className="text-cyan-400">
                  {String(index + 1).padStart(2, "0")}.
                </span>{" "}
                {nav.title}
              </a>

              {/* Hover effect */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>

              {/* Active indicator */}
              {active === nav.title && (
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-full"></div>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Navigation with Enhanced Design */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur-sm group-hover:bg-cyan-400/30 transition-all duration-300"></div>
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain relative z-10 filter drop-shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={() => setToggle(!toggle)}
            />
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-gray-900/95 backdrop-blur-md absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-xl shadow-2xl border border-cyan-400/20 transition-all duration-300`}
          >
            {/* Terminal header */}
            <div className="absolute top-0 left-0 right-0 bg-gray-800/80 px-4 py-2 rounded-t-xl border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-cyan-400 text-xs font-mono">
                  nav_menu.exe
                </span>
              </div>
            </div>

            <ul className="list-none flex flex-col gap-4 mt-8 w-full">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className="relative group"
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a
                    href={`#${nav.id}`}
                    className={`${
                      active === nav.title ? "text-cyan-400" : "text-gray-300"
                    } font-mono text-[14px] cursor-pointer hover:text-cyan-400 transition-all duration-300 flex items-center gap-2`}
                  >
                    <span className="text-cyan-400">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="text-green-400">&gt;</span>
                    {nav.title}
                  </a>

                  {/* Mobile hover effect */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
