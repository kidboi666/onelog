import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Title from '@/components/shared/Title'
import useStateChange from '@/hooks/useStateChange'
import { ChangeEvent } from 'react'

interface Props {
  onChangeSentence: (e: ChangeEvent<HTMLInputElement>) => void
  sentence: string
  selectedStatusPercent: string
  isPending: boolean
}

export default function SentenceSection({
  onChangeSentence,
  sentence,
  selectedStatusPercent,
  isPending,
}: Props) {
  const [ref, open, close] = useStateChange<HTMLDivElement>()
  return (
    <>
      <Title>오늘을 한 줄로 기억해보세요.</Title>
      <div className="flex w-full flex-col">
        <Input
          onFocus={open}
          onBlur={close}
          value={sentence}
          onChange={onChangeSentence}
          variant="secondary"
          className="w-full py-2"
        />
        <div
          ref={ref}
          data-status="closed"
          className="status-line data-line bg-var-gray dark:bg-white"
        />
      </div>
      <Button
        type="submit"
        isLoading={isPending}
        disabled={!sentence || !selectedStatusPercent}
      >
        한줄 남기기
      </Button>
    </>
  )
}
