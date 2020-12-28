// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.js", "./content/**/*.js"],
  theme: {},
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    // require("@tailwindcss/ui")
  ],
};
