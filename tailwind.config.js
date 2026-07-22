/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fbf7f0',
          100: '#f6ece0',
          200: '#efe0cc',
          300: '#e4cbab',
        },
        ocean: {
          400: '#1aa39d',
          500: '#0e807b',
          600: '#0b6763',
          700: '#0a504d',
        },
        sunset: {
          400: '#f2a65a',
          500: '#e8824e',
          600: '#d9663f',
        },
        coral: '#e07a5f',
        gold: '#c9a24b',
        maroon: '#7b2d3a',
        ink: '#2c2320',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        serif: ['Marcellus', 'serif'],
        body: ['Poppins', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
        sway: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(18px)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}
