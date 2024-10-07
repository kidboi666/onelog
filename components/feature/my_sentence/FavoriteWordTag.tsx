import Button from '@/components/shared/Button'
import useStateChange from '@/hooks/useStateChange'
import { IFavoriteWord } from '@/types/sentence'
import TagInfo from './TagInfo'
import { useState } from 'react'
import { List } from '@/components/shared/List'

interface Props {
  word: IFavoriteWord
}

export default function FavoriteWordTag({ word }: Props) {
  const [isHover, setHover] = useState(false)
  const { onClick, ref, open, close, onTransitionEnd } =
    useStateChange<HTMLDivElement>()

  return (
    <List.Row className="relative">
      <Button
        variant="secondary"
        size="sm"
        onMouseEnter={() => {
          open()
          setHover(true)
        }}
        onMouseLeave={() => {
          close()
          setHover(false)
        }}
        onClick={onClick}
        className="relative bg-white text-xs font-light text-gray-600 shadow-md dark:bg-var-darkgray"
      >
        {word.word}
      </Button>
      <TagInfo
        word={word}
        isHover={isHover}
        onTransitionEnd={onTransitionEnd}
        targetRef={ref}
      />
    </List.Row>
  )
}
