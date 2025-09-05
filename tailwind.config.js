/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "gold-light": "#FDF5E6", // A very light, creamy gold
        "gold-medium": "#F3E5AB", // A classic light gold
        "gold-dark": "#C5B358", // A rich, darker gold
        "sand-light": "#F5F5DC", // A light, warm sand color
        "sand-medium": "#E7D8C5", // A medium, slightly darker sand
        "sand-dark": "#D2B48C",
        fawn: "#D4AB6C",
        platinum: "#EAE6DD",
        "anti-flash": "#F1F1F1",
        "dark-bg": "#1a1a1a",
        "dark-card": "#2a2a2a",
      },
      fontFamily: {
        copperplate: ["Copperplate Gothic", "serif"],
        serif: ["Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
