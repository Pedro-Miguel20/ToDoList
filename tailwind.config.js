module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // precisa incluir todos os seus arquivos React
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      rotate: { // você pode adicionar valores personalizados se quiser
        '15': '15deg',
        '30': '30deg',
        '45': '45deg',
      },
    },
  },
  plugins: [],
}