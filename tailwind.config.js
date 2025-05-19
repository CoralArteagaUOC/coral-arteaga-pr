module.exports = {
  mode:'jit',
  purge:['./src/**/*.{js,jsx,ts,tsx', './public/index'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {colors:{
      primary: '#000',
      secondary:'#fff',
    }},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
