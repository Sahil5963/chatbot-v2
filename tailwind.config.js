/** @type {import('tailwindcss').Config} */
/*eslint-env node*/

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "ygpt-",
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-easing")],
};
