module.exports = {
    darkMode: 'class',
    content: [
      './src/**/*.{html,js}',
      './pages/**/*.{html,js}',
    ],
    theme: {
      colors: {
        'black': '#201F1D',
        'white': '#FFFFFF',
        'bg': '#F2F1ED',
        'accent': '#2DBEB1',
      },
      fontSize: {
        xs: ['32px', '39px'],
        base: ['48px', '59px'],
        xl: ['72px', '88px'],
      },
      extend: {
        fontFamily: {
          'montserrat': ['Montserrat', 'sans-serif'],
        },
      },
    },
    plugins: [],
}
