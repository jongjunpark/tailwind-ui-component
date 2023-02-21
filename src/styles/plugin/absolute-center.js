const plugin = require('tailwindcss/plugin')

const absoluteCenter = plugin(function ({ addUtilities }) {
  addUtilities({
    '.absolute-center': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  })
})

module.exports = absoluteCenter
