/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inria Sans, sans-serif",
        mono: "Courier Prime, monospace",
      },
    },
  },
  plugins: [],
};
