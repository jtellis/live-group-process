/*
  Using CommonJS vs ESM for Tailwind CSS IntelliSense
    VS Code extension compatibility
*/
const colors = require('tailwindcss/colors');

module.exports = {
  /*
    NODE_ENV=production must be set to activate purging
  */
  purge: [
    './src/client/**/*.html',
    './src/client/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      primary: colors.coolGray,
      secondary: colors.indigo,
      accent: colors.fuchsia
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
