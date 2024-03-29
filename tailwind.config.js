const plugin = require('tailwindcss/plugin');

const colors = require('tailwindcss/colors');
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      overflow: 'hidden',
      center: true,
      margin: {},
      screens: {
        xl: '1060px',
      },
    },
    fontSize: {
      '2xs': ['0.625rem', '0.75rem'],
      xs: ['0.75rem', '1rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.5rem', '2rem'],
      '3xl': ['1.875rem', '2.25rem'],
      '4xl': ['2.25rem', '2.5rem'],
      '5xl': ['3rem', '1'],
      '6xl': ['3.75rem', '1'],
      '7xl': ['4.5rem', '1'],
      '8xl': ['6rem', '1'],
      '9xl': ['8rem', '1'],
    },
    colors: {
      // tailwindcss 3.2 기본 color palette 22종 (colors를 그대로 모두 넣을 경우 deprecated color로 인한 warn 발생)
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#28323c',
    },
    screens: {
      sm: '320px',
      md: '768px',
      lg: '992px',
      xl: '1100px',
      screen_960: '961px',
      screen_1060: '1060px',
    },
    extend: {
      borderWidth: px0_10,
      fontSize: px0_100,
      minWidth: px0_1000,
      minHeight: px0_1000,
      maxWidth: px0_1000,
      maxHeight: px0_1000,
      spacing: px0_200,
      width: px0_1000,
      height: px0_1000,
      lineHeight: {
        normal: '1.4',
        1.5: '1.5',
        relaxed: '1.64',
        ...px0_100,
      },
      screens: {
        '2xl': '1280px',
        '3xl': '1920px',
        'only-mobile': { max: '767px' },
        'only-tablet': { min: '768px', max: '991px' },
        'laptop-sm': { min: '992px', max: '1099px' },
        'only-laptop': { min: '992px', max: '1199px' },
        'only-desktop': { min: '1200px' },
      },
      zIndex: {
        header: '999',
        modal: '1000',
        loading: '1001',
        popover: '11',
      },
      keyframes: {
        pop: {
          '0%, 100%': { opacity: 0 },
          '5%, 90%': { opacity: 1 },
        },
      },
      animation: {
        pop: 'pop 5s ease-in-out forwards',
      },
    },
  },
  plugins: [
    require('tailwind-children'),
    plugin(function ({ addVariant }) {
      addVariant('optional', '&:optional');
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('not-last', '&:not(:last-child)');
      addVariant('not-first', '&:not(:first-child)');
    }),
  ],
};
module.exports = config;
