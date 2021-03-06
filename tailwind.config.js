const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'pantone-black': '#24282B', //PANTONE 426 XGC
        'pantone-white': '#EDF1FF', // PANTONE 11-4001 TCX Brilliant White
        'pantone-red': '#C71F2D', // PANTONE 18-1763 TCX High Risk Red
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        changa_one: ['Changa One', ...defaultTheme.fontFamily.sans],
        ubuntu: ['Ubuntu', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  variants: {
    opacity: ['disabled']
  },
  plugins: [],
}