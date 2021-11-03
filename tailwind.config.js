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
        'pantone-darkblack': '#222222',
        'pantone-black': '#24282B', //PANTONE 426 XGC
        'pantone-gray': '#343739',
        'pantone-white': '#EDF1FF', // PANTONE 11-4001 TCX Brilliant White
        'pantone-red': '#C71F2D', // PANTONE 18-1763 TCX High Risk Red
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  variants: {
    opacity: ['disabled']
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
