/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    fontFamily: {
      sans: ['Quicksand', ...fontFamily.sans],
    },
    extend: {
      colors: {
        primary: '#191919',
        secondary: '#D1CD30',
        white: '#FFFFFF',
        danger: '#F47C7C',
        warning: '#F7F48B',
        success: '#A1DE93',
        info: '#70A1D7',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
}
