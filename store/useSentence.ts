import { create } from 'zustand'

export interface ISentenceState {
  created_at: string
  content: string
  emotion_level: string
  id: number
  tags: string[]
}

interface SentenceState {
  sentences: ISentenceState[] | null
  setSentences: (sentences: ISentenceState[] | null) => void
}

export const useSentence = create<SentenceState>((set) => ({
  sentences: null,
  setSentences: (sentences) => set({ sentences }),
}))
