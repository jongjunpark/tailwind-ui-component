const plugin = require('tailwindcss/plugin')

const dropdown = plugin(function ({ addUtilities }) {
  addUtilities({
    '.menu-default': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  })
})

module.exports = dropdown
