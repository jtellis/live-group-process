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
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
