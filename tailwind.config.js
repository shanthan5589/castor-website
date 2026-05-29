/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        castor: {
          ink: '#0A0A0A',
          navy: '#0A2540',
          blue: '#246BFE',
          fog: '#F7F7F7',
          line: '#E7E9EE'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Neue Haas Grotesk Text', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(10, 37, 64, 0.10)'
      }
    }
  },
  plugins: []
};
