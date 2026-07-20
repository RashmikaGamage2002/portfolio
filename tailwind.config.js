/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B0B0B',
        secondary: '#121212',
        accent: '#00BFFF',
        lightText: '#FFFFFF',
        dimText: '#A0A0A0',
      }
    },
  },
  plugins: [],
};
