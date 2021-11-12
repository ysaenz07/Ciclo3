module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {colors: {
      naranja1: '#d24500',
      secondary: '#ba0',
    },},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
