/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#2D48B7", // Color 1
        "custom-orange": "#F18F01", // Color 2
        "custom-gray": "#D0D0D0", // Color 3
        "custom-bluelg": "#F2F5FF", // Color 4 
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Definir Montserrat como fuente
      },
    },
  },
  plugins: [],
};
