import { TColor, TTheme } from '@/types/theme'
import { create } from 'zustand'

interface ThemeState {
  color: TColor
  theme: TTheme
  setColor: (color: TColor) => void
  setTheme: (theme: TTheme) => void
}

export const useTheme = create<ThemeState>((set) => ({
  color: 'gray',
  theme: 'light',
  setColor: (color: TColor) => set({ color }),
  setTheme: (theme: TTheme) => set({ theme }),
}))
