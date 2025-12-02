/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic': ['Comic Sans MS', 'Comic Neue', 'cursive'],
        'papyrus': ['Papyrus', 'fantasy'],
      },
      colors: {
        'zine-pink': '#e91e63',
        'zine-purple': '#9c27b0',
        'zine-blue': '#2196f3',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [],
}