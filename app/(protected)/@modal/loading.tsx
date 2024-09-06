import Modal from '@/components/shared/Modal'
import Spinner from '@/components/shared/Spinner'

export default function Loading() {
  return (
    <Modal>
      <Spinner size={60} />
    </Modal>
  )
}
