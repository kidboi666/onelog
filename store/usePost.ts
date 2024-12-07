import { create } from 'zustand'

export interface IPostState {
  created_at: string
  content: string
  emotion_level: string
  id: number
  tags: string[]
}

interface ToastState {
  toast: boolean
  openToast: (text: string) => void
}

export const useToast = create<ToastState>((set) => ({
  toast: false,
  openToast: (text) => set(text),
}))
