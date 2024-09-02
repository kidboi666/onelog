import { useModal } from '@/store/useModal'
import ModalContainer from '../ModalContainer'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'
import { useEffect } from 'react'

export default function SuccessModal() {
  const { type, closeModal } = useModal()

  const handleEnterPush = (e?: KeyboardEvent) => {
    if (e?.key === 'Enter') {
      closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEnterPush)

    return () => {
      document.removeEventListener('keydown', handleEnterPush)
    }
  }, [])

  if (type !== 'success') return null

  return (
    <ModalContainer>
      <Title>요청이 완료되었습니다.</Title>
      <Button onClick={closeModal}>확인</Button>
    </ModalContainer>
  )
}
