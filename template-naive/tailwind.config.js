module.exports = {
  mode: 'jit',
  purge: {
    enable: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0960bd'
        }
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      }
    },
  },
  plugins: [],
}
