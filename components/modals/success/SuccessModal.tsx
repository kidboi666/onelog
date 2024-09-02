import { useModal } from '@/store/useModal'
import ModalContainer from '../ModalContainer'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'

export default function SuccessModal() {
  const { data, type, closeModal } = useModal()

  if (type !== 'success') return null

  const handleButtonClick = () => {
    if (data.onSubmit) {
      data.onSubmit()
    }
    closeModal()
  }

  return (
    <ModalContainer>
      <Title>등록에 성공하였습니다.</Title>
      <Button onClick={handleButtonClick}>확인</Button>
    </ModalContainer>
  )
}
