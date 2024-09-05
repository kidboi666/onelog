import Modal from '@/components/shared/Modal'
import Spinner, { Size } from '@/components/shared/Spinner'

export default function Loading() {
  return (
    <Modal>
      <Spinner size={Size.l} />
    </Modal>
  )
}
