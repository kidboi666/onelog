import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUserInfo } from '@/src/types/entities/auth'

interface MeState {
  me: IUserInfo | null
  setMe: (me: IUserInfo | null) => void
  clearMe: () => void
}

export const useMe = create<MeState>()(
  persist(
    (set) => ({
      me: null,
      setMe: (me) => set({ me }),
      clearMe: () => set({ me: null }),
    }),
    { name: 'auth-storage' },
  ),
)
