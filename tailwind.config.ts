import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
        click: 'click 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
