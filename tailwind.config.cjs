/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inria Sans, sans-serif",
        mono: "Courier Prime, monospace",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              color: theme("colors.gray.900"),
              backgroundColor: theme("colors.gray.100"),
              padding: "0.2em 0.4em",
              borderRadius: "0.25em",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
