/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warning' : '#dda15e',
        'content' : ' #1e2a3e',
        'card' : '#323B4A',
        'sidebar' : '#b8854f'
      },

    },
  },
  plugins: [
    require('daisyui'),
  ],
}

