/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mint: {
          500: '#6EE7B7',
          100: '#E0F2FE'
        },
        lavender: '#EDE9FE',
        white: '#FFFFFF',
        darkgray: '#111827'
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
