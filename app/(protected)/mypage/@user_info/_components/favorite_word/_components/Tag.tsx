import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import RefBox from '@/components/shared/RefBox'
import Text from '@/components/shared/Text'
import useStateChange from '@/hooks/useStateChange'
import { IFavoriteWord } from '@/types/sentence'

interface Props {
  word: IFavoriteWord
}

export default function Tag({ word }: Props) {
  const { onClick, ref, open, close, onTransitionEnd } =
    useStateChange<HTMLDivElement>()
  return (
    <Container className="relative">
      <Button
        variant="secondary"
        size="sm"
        onMouseEnter={open}
        onMouseLeave={close}
        onClick={onClick}
        className="relative animate-fade-in text-xs font-light text-gray-600 hover:bg-gray-100"
      >
        {word.word}
      </Button>
      <RefBox
        isBackground
        isRounded
        dataStatus="closed"
        onTransitionEnd={onTransitionEnd}
        ref={ref}
        className="data-slideDown status-slideDown absolute -top-8 text-nowrap p-2 shadow-md"
      >
        <Text size="xs">사용횟수 : {word.count}</Text>
      </RefBox>
    </Container>
  )
}
