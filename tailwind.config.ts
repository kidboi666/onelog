import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'var-green': '#3FB580',
        'var-yellow': '#FED23F',
        'var-blue': '#2A9DEB',
        'var-black': '#131313',
        'var-orange': '#F5964B',
        'var-dark': '#191919',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        click: {
          from: { transform: 'scale(0.95)' },
          to: { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s linear',
        click: 'click 0.1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
