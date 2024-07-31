module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // Specify the directories and file types to scan for class names
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'HeaderFont': ['Concert One', 'sans-serif'], // Custom font family for headers
    },
    extend: {
      // Extend Tailwind's default theme with custom styles
    },
  },
  plugins: [
    require("daisyui"), // Include the DaisyUI plugin for additional UI components
  ],
};
