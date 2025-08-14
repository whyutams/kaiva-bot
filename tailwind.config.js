/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/server/**/*.{ejs,html,js}", "src/server/*.{ejs,html,js}"],
  theme: {
    extend: {
      colors: {
        discord: '#5865F2',
        'discord-dark': '#4752C4'
      },
    },
    plugins: [
      require('tailwind-scrollbar'),
      {
        autoprefixer: {},
      },
    ],
  }
}
