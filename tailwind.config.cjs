module.exports = {
  content: ["./src/**/*.{js,jsx}"],
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
        "hero-pattern": "url('/src/assets/wallpaper.jpg')",
        "tech-pattern": "url('/src/assets/keyboard.jpg')",
        "work-pattern": "url('/src/assets/cyber-2.jpg')",
        "road-pattern": "url('/src/assets/neon-city.gif')",
        "rain-pattern": "url('/src/assets/rain-city.jpg')",
        "universe-pattern": "url('/src/assets/purple-nebulae.gif')",
      },
    },
  },
  plugins: [],
};
