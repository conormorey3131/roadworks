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
        'theme': '#1E5BB8',
        'theme-dark': '#143F82',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
