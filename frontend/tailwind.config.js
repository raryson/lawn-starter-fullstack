/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'xs': '2px',
      },
      colors: {
        'pinkish-grey': '#c4c4c4',
        'warm-grey-75': 'rgba(158, 158, 158, 0.75)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

