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
        'accent-hover': '#4CD6BD',
      },
      fontSize: {
        xxs: ['24px', '28px'],
        xs: ['32px', '39px'],
        sm: ['38px', '39px'],
        base: ['48px', '59px'],
        xl: ['72px', '76px'],
      },
      screens: {
        'xs': '360px',
        'sm': '620px',
      },
      extend: {
        fontFamily: {
          'montserrat': ['Montserrat', 'sans-serif'],
        },
      },
    },
    plugins: [],
}
