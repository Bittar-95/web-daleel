const plugin = require('tailwindcss/plugin');
import "./src/Assets/css/style.css"
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/Assets/css/**/*.{css,scss}" 
      ],
    theme: {
    extend: {
      colors: {
        'bg-1': 'var(--bg-1)',
        'bg-2': 'var(--bg-2)',
        'text-1': 'var(--text-1)',
        'text-2': 'var(--text-2)',
        'text-success': 'var(--text-success)',
        'text-error': 'var(--text-error)',
      },
      boxShadow: {
        'shadow-1': 'var(--shadow-1)',
        'shadow-2': 'var(--shadow-2)',
      },
    },
  },
  plugins: [],
}
