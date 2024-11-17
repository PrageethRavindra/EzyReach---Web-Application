/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        brandPurple: '#8906E6',
        brandPink: '#FF00E2',
        brandGray: '#1C1E3A',
        brandDark: '#050D2B',
      },
    },
  },
  plugins: [],
};
