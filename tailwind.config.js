/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f7f5',
          100: '#e8efea',
          200: '#d1dfd4',
          300: '#b0c8b5',
          400: '#86ad8e',
          500: '#6b9474',
          600: '#557a5d',
          700: '#46634c',
          800: '#3a5040',
          900: '#324237',
        },
        accent: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        brand: {
          green: '#86ad8e',
          'green-light': '#a8c4af',
          'green-dark': '#6b9474',
          'green-darker': '#557a5d',
          navy: '#2d3748',
          'navy-light': '#4a5568',
          'navy-dark': '#1a202c',
          sage: '#9bb59f',
          mint: '#b8d4bc',
          forest: '#5a7a62',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'gradient': 'gradient 6s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-sage': 'linear-gradient(135deg, #86ad8e 0%, #9bb59f 50%, #b8d4bc 100%)',
        'gradient-forest': 'linear-gradient(135deg, #5a7a62 0%, #86ad8e 50%, #6b9474 100%)',
        'gradient-mint': 'linear-gradient(135deg, #b8d4bc 0%, #86ad8e 50%, #9bb59f 100%)',
      }
    },
  },
  plugins: [],
};