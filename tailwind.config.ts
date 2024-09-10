import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import { PluginCreator } from 'tailwindcss/types/config'

const pluginContainer: PluginCreator = ({ addUtilities }) => {
  addUtilities({
    '.no-scrollbar::-webkit-scrollbar': {
      display: 'none',
    },
    '.no-scrollbar': {
      scrollbarWidth: 'none', // Firefox
      msOverflowStyle: 'none', // IE and Edge
    },
    '.garden-scrollbar-light': {
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '8px',
        background: '#d3d3d3',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#b5b5b5',
      },
    },
    '.gardent-scrollbar-dark': {
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '8px',
        background: '#222224',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#3b3b3e',
      },
    },
  })
}

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
        'var-gray': '#9CA3AF',
        'var-lightgray': '#F5F5F7',
        'var-darkgray': '#222224',
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
  plugins: [typography, pluginContainer],
}
export default config
