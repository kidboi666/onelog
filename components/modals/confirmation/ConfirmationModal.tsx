import { useModal } from '@/store/useModal'
import ModalContainer from '../ModalContainer'
import Title from '@/components/shared/Title'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'

export default function ConfirmationModal() {
  const { type, data, closeModal } = useModal()

  if (type !== 'confirmation') return null

  return (
    <ModalContainer className="">
      <Title>등록하시겠습니까?</Title>
      <div className="flex flex-col gap-4 rounded-md px-8 py-4 ring-1 ring-gray-300">
        <Title size="sm">입력한 오늘의 한줄</Title>
        <Text>{data.sentence}</Text>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => closeModal()}>
          아니오
        </Button>
        <Button
          isLoading={data.isPending || data.isSuccess}
          onClick={() => data.onSubmit()}
        >
          남기기
        </Button>
      </div>
    </ModalContainer>
  )
}
