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
      green: 'bg-var-green dark:bg-var-green',
      black: 'bg-var-black text-white dark:bg-white dark:text-var-dark',
      yellow: 'bg-var-yellow dark:bg-var-yellow',
      blue: 'bg-var-blue dark:bg-var-blue',
      orange: 'bg-var-orange dark:bg-var-orange',
    },
  },
})

export const ringTheme = {
  width: {
    1: 'ring-1',
    2: 'ring-2',
    4: 'ring-4',
    8: 'ring-8',
  },
  color: {
    blue: 'ring-var-blue/65',
    orange: 'ring-var-orange/65',
    yellow: 'ring-var-yellow/65',
    green: 'ring-var-green/65',
    black: 'ring-var-black/65',
  },
}

export const useTheme = create<ThemeState>((set) => ({
  color: 'black',
  theme: 'light',
  setColor: (color: TColor) => set({ color }),
  setTheme: (theme: TTheme) => set({ theme }),
}))
