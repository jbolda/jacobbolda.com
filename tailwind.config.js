// const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f4f4",
          300: "#9ebba9",
          600: "#52777d",
          900: "#192c3b",
        },
      },
    },
  },
};
