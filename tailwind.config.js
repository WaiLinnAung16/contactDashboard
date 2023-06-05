/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "gF": "279px",
        "s8": "359px",
        "se": "374px",
        "i12p": "389px",
        "ixr": "411px"
      }
    },
  },
  plugins: [],
};
