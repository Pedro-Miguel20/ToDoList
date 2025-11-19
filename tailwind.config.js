export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
];
export const theme = {
  extend: {
    rotate: {
      "15": "15deg",
      "30": "30deg",
      "45": "45deg",
    },
  },
};
export const plugins = {
  tailwindcss: {},
  autoprefixer: {},
};
