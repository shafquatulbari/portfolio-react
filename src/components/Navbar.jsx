import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { styles } from "../styles";
import { navLinks, moreNavLinks } from "../constants";

const logo = "/assets/logo.svg";
const menu = "/assets/menu.svg";
const close = "/assets/close.svg";

const Navbar = ({ currentSection, navigateToSection }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  // Map section id to route path
  const pathFor = (id) => (id === "hero" ? "/" : `/${id}`);

  // Update active state based on current section
  useEffect(() => {
    if (currentSection) {
      const allLinks = [...navLinks, ...moreNavLinks];
      const currentLink = allLinks.find((link) => link.id === currentSection);
      if (currentLink) {
        setActive(currentLink.title);
      }
    }
  }, [currentSection]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (showMoreDropdown && !event.target.closest(".more-dropdown")) {
        setShowMoreDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMoreDropdown]);

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
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
            if (typeof window !== "undefined") window.scrollTo(0, 0);
          }}
        >
          {/* Logo with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-md group-hover:bg-cyan-400/50 transition-all duration-300"></div>
            <Image
              src={logo}
              alt="logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain relative z-10 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              priority
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
        <ul className="list-none hidden sm:flex flex-row gap-8 items-center">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className="relative group"
              onClick={() => setActive(nav.title)}
            >
              {/* If on the single-page view, use in-page navigation; otherwise, route links */}
              {navigateToSection ? (
                <a
                  href={`#${nav.id}`}
                  className={`nav-link ${
                    active === nav.title ? "text-cyan-400" : "text-gray-300"
                  } hover:text-cyan-400 text-[16px] font-medium cursor-pointer transition-all duration-300 font-mono relative z-10`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(nav.title);
                    navigateToSection(nav.id);
                  }}
                >
                  <span className="text-cyan-400">
                    {String(index + 1).padStart(2, "0")}.
                  </span>{" "}
                  {nav.title}
                </a>
              ) : (
                <Link
                  href={pathFor(nav.id)}
                  className={`nav-link ${
                    active === nav.title ? "text-cyan-400" : "text-gray-300"
                  } hover:text-cyan-400 text-[16px] font-medium cursor-pointer transition-all duration-300 font-mono relative z-10`}
                >
                  <span className="text-cyan-400">
                    {String(index + 1).padStart(2, "0")}.
                  </span>{" "}
                  {nav.title}
                </Link>
              )}

              {/* Hover effect */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>

              {/* Active indicator */}
              {active === nav.title && (
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-full"></div>
              )}
            </li>
          ))}

          {/* More Dropdown */}
          <li className="relative group more-dropdown">
            <button
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              className={`nav-link ${
                moreNavLinks.some((link) => active === link.title)
                  ? "text-purple-400"
                  : "text-gray-300"
              } hover:text-purple-400 text-[16px] font-medium cursor-pointer transition-all duration-300 font-mono relative z-10 flex items-center gap-2`}
            >
              {/* Different logo for More */}
              <div className="relative">
                <div className="absolute inset-0 bg-purple-400/30 rounded blur-sm group-hover:bg-purple-400/50 transition-all duration-300"></div>
                <svg
                  className="w-4 h-4 relative z-10 filter drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
              <span className="text-purple-400">04.</span> More
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  showMoreDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Hover effect */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>

            {/* Dropdown Menu */}
            {showMoreDropdown && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md border border-purple-400/30 rounded-xl shadow-2xl overflow-hidden z-50">
                {/* Terminal header */}
                <div className="bg-gray-800/80 px-4 py-2 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-purple-400 text-xs font-mono">
                      more_nav.exe
                    </span>
                  </div>
                </div>

                {/* Dropdown items */}
                <div className="py-2">
                  {moreNavLinks.map((nav, index) =>
                    navigateToSection ? (
                      <a
                        key={nav.id}
                        href={`#${nav.id}`}
                        className={`block px-4 py-3 text-sm font-mono transition-all duration-300 hover:bg-purple-500/20 hover:text-purple-300 ${
                          active === nav.title
                            ? "text-purple-400 bg-purple-500/10"
                            : "text-gray-300"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActive(nav.title);
                          setShowMoreDropdown(false);
                          navigateToSection(nav.id);
                        }}
                      >
                        <span className="text-purple-400">
                          {String(index + 5).padStart(2, "0")}.
                        </span>{" "}
                        <span className="text-cyan-400">&gt;</span> {nav.title}
                      </a>
                    ) : (
                      <Link
                        key={nav.id}
                        href={pathFor(nav.id)}
                        onClick={() => setShowMoreDropdown(false)}
                        className={`block px-4 py-3 text-sm font-mono transition-all duration-300 hover:bg-purple-500/20 hover:text-purple-300 ${
                          active === nav.title
                            ? "text-purple-400 bg-purple-500/10"
                            : "text-gray-300"
                        }`}
                      >
                        <span className="text-purple-400">
                          {String(index + 5).padStart(2, "0")}.
                        </span>{" "}
                        <span className="text-cyan-400">&gt;</span> {nav.title}
                      </Link>
                    )
                  )}
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile Navigation with Enhanced Design */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur-sm group-hover:bg-cyan-400/30 transition-all duration-300"></div>
            <Image
              src={toggle ? close : menu}
              alt="menu"
              width={28}
              height={28}
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
              {/* Main navigation items */}
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className="relative group"
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  {navigateToSection ? (
                    <a
                      href={`#${nav.id}`}
                      className={`${
                        active === nav.title ? "text-cyan-400" : "text-gray-300"
                      } font-mono text-[14px] cursor-pointer hover:text-cyan-400 transition-all duration-300 flex items-center gap-2`}
                      onClick={(e) => {
                        e.preventDefault();
                        setToggle(!toggle);
                        setActive(nav.title);
                        navigateToSection(nav.id);
                      }}
                    >
                      <span className="text-cyan-400">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      <span className="text-green-400">&gt;</span>
                      {nav.title}
                    </a>
                  ) : (
                    <Link
                      href={pathFor(nav.id)}
                      className={`${
                        active === nav.title ? "text-cyan-400" : "text-gray-300"
                      } font-mono text-[14px] cursor-pointer hover:text-cyan-400 transition-all duration-300 flex items-center gap-2`}
                    >
                      <span className="text-cyan-400">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      <span className="text-green-400">&gt;</span>
                      {nav.title}
                    </Link>
                  )}

                  {/* Mobile hover effect */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </li>
              ))}

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent my-2"></div>

              {/* More navigation section */}
              <div className="text-purple-400 font-mono text-xs mb-2 flex items-center gap-2">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                MORE_OPTIONS
              </div>

              {/* More navigation items */}
              {moreNavLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className="relative group"
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  {navigateToSection ? (
                    <a
                      href={`#${nav.id}`}
                      className={`${
                        active === nav.title
                          ? "text-purple-400"
                          : "text-gray-300"
                      } font-mono text-[14px] cursor-pointer hover:text-purple-400 transition-all duration-300 flex items-center gap-2 pl-4`}
                      onClick={(e) => {
                        e.preventDefault();
                        setToggle(!toggle);
                        setActive(nav.title);
                        navigateToSection(nav.id);
                      }}
                    >
                      <span className="text-purple-400">
                        {String(index + 5).padStart(2, "0")}.
                      </span>
                      <span className="text-pink-400">&gt;</span>
                      {nav.title}
                    </a>
                  ) : (
                    <Link
                      href={pathFor(nav.id)}
                      className={`${
                        active === nav.title
                          ? "text-purple-400"
                          : "text-gray-300"
                      } font-mono text-[14px] cursor-pointer hover:text-purple-400 transition-all duration-300 flex items-center gap-2 pl-4`}
                    >
                      <span className="text-purple-400">
                        {String(index + 5).padStart(2, "0")}.
                      </span>
                      <span className="text-pink-400">&gt;</span>
                      {nav.title}
                    </Link>
                  )}

                  {/* Mobile hover effect */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
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
