const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'color-scrollbar-light-thumb': '#839E99',
        'color-scrollbar-light-track': '#E1E8FF',
        'color-scrollbar-dark-thumb': '#485155',
        'color-scrollbar-dark-track': '#181A1B',
        'pantone-darkblack': '#1D1F21',
        'pantone-black': '#24282B', //PANTONE 426 XGC
        'pantone-gray': '#2B2F31',
        'pantone-white': '#EDF1FF', // PANTONE 11-4001 TCX Brilliant White
        'pantone-red': '#C71F2D', // PANTONE 18-1763 TCX High Risk Red
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  variants: {
    opacity: ['disabled'],
    scrollbars: ['dark'],
    scrollbar: ['rounded']
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide')
  ],
}
