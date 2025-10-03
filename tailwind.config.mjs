/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // If you actually use animations from tailwindcss-animate, keep this.
  // Otherwise, remove the line below.
  plugins: [require("tailwindcss-animate")],
};

