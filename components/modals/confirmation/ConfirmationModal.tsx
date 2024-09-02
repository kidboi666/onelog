import { useModal } from '@/store/useModal'
import ModalContainer from '../ModalContainer'
import Title from '@/components/shared/Title'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import cn from '@/lib/cn'

export default function ConfirmationModal() {
  const { type, data, closeModal } = useModal()

  if (type !== 'confirmation') return null

  return (
    <ModalContainer as="form">
      <Title>등록하시겠습니까?</Title>
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="flex flex-col items-center">
          <Button
            variant="emptyStyle"
            className={cn(
              'flex size-12 items-center justify-center rounded-sm border border-blue-300 text-blue-500',
              data.emotionLevel.color,
            )}
          >
            <Text>{data.emotionLevel.percent}</Text>
          </Button>
        </div>
        <Text>{data.sentence}</Text>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => closeModal()}>
          취소하기
        </Button>
        <Button
          isLoading={data.isPending || data.isSuccess}
          onClick={() => data.onSubmit()}
        >
          등록하기
        </Button>
      </div>
    </ModalContainer>
  )
}
