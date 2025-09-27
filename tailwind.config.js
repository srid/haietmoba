/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app.js"
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#42a5f5',
      }
    },
  },
  plugins: [],
}