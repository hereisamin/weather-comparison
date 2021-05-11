module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
      },
      colors:{
        chartColor: {
          first:  'rgb(148, 18, 18, 1)',
          second:'rgb(20, 148, 18, 1)',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
