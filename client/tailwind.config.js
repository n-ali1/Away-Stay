/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00b4d8",
        second: "#778da9",
        third: "#1b263b",
        fourth: "#0d1b2a",
      },
    },
  },
  plugins: [],
};
