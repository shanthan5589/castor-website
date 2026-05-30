/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        castor: {
          ink: '#080C14',
          navy: '#0A2540',
          blue: '#246BFE',
          teal: '#00D4AA',
          fog: '#F4F5F8',
          line: '#E4E6ED',
          dark: '#06090F'
        }
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'sans-serif'],
        sans: ['DM Sans', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(10, 37, 64, 0.10)',
        glow: '0 0 60px rgba(36, 107, 254, 0.35)',
        'glow-teal': '0 0 60px rgba(0, 212, 170, 0.25)',
        'glow-lg': '0 32px 100px rgba(36, 107, 254, 0.28)',
        card: '0 8px 32px rgba(10, 37, 64, 0.07)'
      }
    }
  },
  plugins: []
};
