import { create } from 'zustand'

interface Sentence {
  created_at: string
  content: string
  emotion_level: string
  id: string
}

interface SentenceState {
  sentences: Sentence[] | null
  setSentences: (sentences: Sentence[]) => void
}

export const useSentence = create<SentenceState>((set) => ({
  sentences: null,
  setSentences: (sentences) => set({ sentences }),
}))
