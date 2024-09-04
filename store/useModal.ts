import { create } from 'zustand'

type ModalType = 'confirmation' | 'success' | 'addSentence'

interface ModalState {
  isOpen: boolean
  type: ModalType | null
  data: any
  openModal: (type: ModalType, data?: any) => void
  closeModal: () => void
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  data: null,
  openModal: (type, data) => set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false, type: null, data: null }),
}))
