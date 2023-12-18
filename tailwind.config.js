module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'HeaderFont': ['Concert One', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
