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
        'theme': '#8B2BE2',
        'theme-dark': '#6B21A8',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
