/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(red|blue|green|yellow|indigo|purple|pink|gray|emerald|sky)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
};
