const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#f66f4d',
        'secondary': '#ffd482',
        'danger': '#eb564c',
        'success': '#16b455',
        'info': '#0968c0',
        'pink': '#ff4062',
        'grey1': '#717579',
        'grey2': '#c1c1c1',
        'grey3': '#eaeaea',
        'grey4': '#f4f4f4',
        'dark1': '#203134',
        'dark2': '#17161e',
        'dark3': '#1f1e26',
        'dark4': '#2f2a36',
        'dark5': '#3b3741',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        DEFAULT: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
      }
    },
  },
  variants: {
    extend: {
      opacity: ['active'],
      backgroundColor: [
        'hover',
        'focus',
        'active',
        'odd',
      ],
      display: ['responsive'],
      textColor: [
        'focus-within',
        'hover',
        'active',
      ],
      placeholderColor: ['focus'],
      borderColor: ['focus', 'hover', 'active'],
      boxShadow: ['focus',],
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
