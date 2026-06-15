/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./blog/*.html",
    "./js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'theme': '#FFFFFF',
        'theme-dark': '#E5E5E5',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
