/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4B5DE6',
        'secondary': 'gray-500',
        'third' : '#6C14BC'
      },
      fontFamily: {
        //'Poppins'
        'sans': ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        'light': 300,
        'normal': 400,
        'medium': 500,
        'bold': 700,
        'extrabold': 900,
      },
    },
    
  },
  plugins: [],
}