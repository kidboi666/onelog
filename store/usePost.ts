import { create } from 'zustand'

export interface IPostState {
  created_at: string
  content: string
  emotion_level: string
  id: number
  tags: string[]
}

interface PostState {
  posts: IPostState[] | null
  setPosts: (posts: IPostState[] | null) => void
}

export const usePost = create<PostState>((set) => ({
  posts: null,
  setPosts: (posts) => set({ posts }),
}))
