/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'only-mobile': { max: '767px' },
      'only-tablet': { min: '768px', max: '991px' },
      'only-laptop': { min: '992px', max: '1199px' },
      'only-desktop': { min: '1200px' },
    },
  },
  plugins: [require('./src/styles/plugin/absolute-center')],
}
