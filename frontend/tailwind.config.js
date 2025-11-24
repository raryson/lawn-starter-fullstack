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
      boxShadow: {
        'inset-warm': 'inset 0 0.5px 1.5px 0 rgba(158, 158, 158, 0.75)',
      },
      spacing: {
        // Input component spacing - semantic naming for form inputs
        'input-inner': '7.5px',      // Vertical padding inside input
        'input-side': '10px',        // Base horizontal padding (left)
        'input-icon': '55.5px',      // Right padding to accommodate icon/button space
        'input-gap': '10px',         // Vertical margin around input
      },
      borderWidth: {
        'xs': '0.5px',
      },
    },
  },
  plugins: [],
}

