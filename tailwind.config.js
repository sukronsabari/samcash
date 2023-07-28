/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#1E293B',
        primary: '#047857',
        secondary: '#ECFDF5',
      },
    },
  },
  plugins: [],
};
