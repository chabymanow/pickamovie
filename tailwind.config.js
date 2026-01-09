/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zen_dots: ["var(--font-zen_dots)"],
        poppins: ["var(--font-poppins)"],
      },
      colors: colors, // enables bg-blue-900, etc.
      // or: colors: { ...colors }  (either is fine)
    },
  },
  plugins: [],
};
