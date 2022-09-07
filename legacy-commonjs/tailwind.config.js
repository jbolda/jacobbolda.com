const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  mode: "jit",
  content: ["./src/**/*.js", "./content/**/*.js"],
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
  variants: {},
  plugins: [require("@tailwindcss/aspect-ratio")],
};
