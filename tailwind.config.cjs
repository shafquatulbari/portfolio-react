/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        gradient: {
          blue: "linear-gradient(to right, #2193b0, #6dd5ed)",
        },
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        glow: "0px 0px 20px 5px rgba(65, 181, 247, 0.8)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/wallpaper.jpg')",
        "tech-pattern": "url('/src/assets/keyboard.jpg')",
        "work-pattern": "url('/src/assets/cyber-2.jpg')",
        "road-pattern": "url('/src/assets/roads.jpg')",
        "rain-pattern": "url('/src/assets/rain-city.jpg')",
      },
    },
  },
  plugins: [],
};
