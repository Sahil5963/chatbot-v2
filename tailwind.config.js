/** @type {import('tailwindcss').Config} */
/*eslint-env node*/

const { nextui } = require("@nextui-org/theme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/components/spinner.js"],
  prefix: "ygpt-",
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-easing"), nextui({})],
};
