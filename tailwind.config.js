/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#509ee3",
        primaryBlueHover: "#82b4e1",
      },
    },
  },
  plugins: [],
};
