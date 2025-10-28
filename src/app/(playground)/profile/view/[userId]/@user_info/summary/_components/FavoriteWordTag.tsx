import { useState } from 'react'
import { IFavoriteWord } from '@/src/types/dtos/word'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import Button from '@/src/components/Button'
import { List } from '@/src/components/List'
import TagInfo from './TagInfo'

interface Props {
  word: IFavoriteWord
}

export default function FavoriteWordTag({ word }: Props) {
  const [trigger, setTrigger] = useState(false)
  const { onClick, ref, close, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  const handleTagClick = () => {
    onClick()
    setTrigger(true)
  }
  return (
    <List.Row className="relative">
      <Button
        variant="secondary"
        size="sm"
        ref={buttonRef}
        onClick={handleTagClick}
        className="relative bg-white text-xs font-light text-gray-600 shadow-md dark:bg-var-darkgray"
      >
        {word.word}
      </Button>
      <TagInfo
        word={word}
        trigger={trigger}
        onTransitionEnd={onTransitionEnd}
        targetRef={ref}
      />
    </List.Row>
  )
}
