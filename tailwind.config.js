/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3D06D7',
        'primary-light': '#906FEE',
        'dark': '#1E0E4C',
        'light-grey': '#CFCADF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Koulen', 'sans-serif'],
      },
    },
  },
  plugins: [],
}