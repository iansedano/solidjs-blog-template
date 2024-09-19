/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Atkinson Hyperlegible, sans-serif",
        mono: "Inconsolata, monospace",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              color: theme("colors.gray.900"),
              backgroundColor: theme("colors.gray.100"),
              padding: theme("spacing.3"),
              borderRadius: "0.25em",
              scrollbarWidth: "thin",
              scrollbarColor: `${theme("colors.gray.400")} ${theme("colors.gray.700")}`,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
