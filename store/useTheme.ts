import { TColor, TTheme } from '@/types/theme'
import { cva } from 'class-variance-authority'
import { create } from 'zustand'

interface ThemeState {
  color: TColor
  theme: TTheme
  setColor: (color: TColor) => void
  setTheme: (theme: TTheme) => void
}

export const colorTheme = cva('', {
  variants: {
    color: {
      green: 'bg-var-green',
      black: 'bg-var-black text-white dark:bg-white dark:text-var-dark',
      yellow: 'bg-var-yellow',
      blue: 'bg-var-blue',
      orange: 'bg-var-orange',
    },
  },
})

export const useTheme = create<ThemeState>((set) => ({
  color: 'black',
  theme: 'light',
  setColor: (color: TColor) => set({ color }),
  setTheme: (theme: TTheme) => set({ theme }),
}))
