module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#ffffff", // Change to white for better contrast
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        gradient: {
          blue: "linear-gradient(to right, #2193b0, #6dd5ed)",
          glow: "linear-gradient(90deg, rgba(0, 255, 255, 0.4), rgba(255, 0, 255, 0.4))",
        },
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        glow: "0px 0px 10px 2px rgba(255, 255, 255, 0.8)", // White glow for icons
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/assets/wallpaper.jpg')",
        "tech-pattern": "url('/assets/keyboard.jpg')",
        "work-pattern": "url('/assets/spaceship.gif')",
        "neon-pattern": "url('/assets/neon-city.png')",
        "rain-pattern": "url('/assets/cyberpunk.gif')",
        "grid-pattern": "url('/assets/grid.png')",
      },
      scrollSnapType: {
        "y-mandatory": "y mandatory",
        "x-mandatory": "x mandatory",
      },
      scrollSnapAlign: {
        start: "start",
        center: "center",
        end: "end",
      },
      animation: {
        "spin-slow": "spin-slow 20s linear infinite",
        "spin-reverse-slow": "spin-reverse-slow 25s linear infinite",
        "orbital-glow": "orbital-glow 3s ease-in-out infinite",
        "holographic-shimmer": "holographic-shimmer 2s linear infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scroll-snap-y-mandatory": {
          "scroll-snap-type": "y mandatory",
        },
        ".scroll-snap-x-mandatory": {
          "scroll-snap-type": "x mandatory",
        },
        ".scroll-snap-start": {
          "scroll-snap-align": "start",
        },
        ".scroll-snap-center": {
          "scroll-snap-align": "center",
        },
        ".scroll-snap-end": {
          "scroll-snap-align": "end",
        },
        ".scroll-snap-stop-always": {
          "scroll-snap-stop": "always",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
