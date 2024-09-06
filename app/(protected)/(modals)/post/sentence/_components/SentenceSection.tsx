import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import Input from '@/components/shared/Input'
import RefBox from '@/components/shared/RefBox'
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
    <Container className="flex w-full flex-col items-center gap-8 md:w-[400px]">
      <Title type="sub" size="sm">
        오늘을 한 줄로 기억해보세요.
      </Title>
      <Box className="flex w-full flex-col">
        <Input
          onFocus={open}
          onBlur={close}
          value={sentence}
          onChange={onChangeSentence}
          variant="secondary"
          className="w-full py-2"
        />
        <RefBox
          ref={ref}
          dataStatus="closed"
          className="status-line data-line bg-var-black dark:bg-white"
        />
      </Box>
      <Button
        type="submit"
        isLoading={isPending}
        disabled={!sentence || !selectedStatusPercent}
      >
        한줄 남기기
      </Button>
    </Container>
  )
}
