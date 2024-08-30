'use client'

import ConfirmationModal from '@/components/modals/confirmation/ConfirmationModal'
import SuccessModal from '@/components/modals/success/SuccessModal'
import { useModal } from '@/store/useModal'

export default function ModalProvider() {
  const { isOpen, closeModal } = useModal()
  if (!isOpen) return null

  return (
    <div
      onClick={() => closeModal()}
      className="fixed inset-0 z-50 bg-black/50"
    >
      <div onClick={(e) => e.stopPropagation()}>
        <ConfirmationModal />
        <SuccessModal />
      </div>
    </div>
  )
}
