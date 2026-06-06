/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#020205',
          900: '#0a0a0f',
          800: '#12121e',
          700: '#1b1b2a',
          600: '#2c2c3e',
        },
        accent: {
          orange: '#ff6600',
          red: '#ff003c',
          silver: '#cccccc',
          platinum: '#e5e7eb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #020205 0%, #12121e 100%)',
        'gradient-orange-red': 'linear-gradient(90deg, #ff6600 0%, #ff003c 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glow-orange': '0 0 15px rgba(255, 102, 0, 0.3)',
        'glow-red': '0 0 15px rgba(255, 0, 60, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
