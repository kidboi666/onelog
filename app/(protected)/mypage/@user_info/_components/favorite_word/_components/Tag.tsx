import Button from '@/components/shared/Button'
import useStateChange from '@/hooks/useStateChange'
import { IFavoriteWord } from '@/types/sentence'
import TagInfo from './TagInfo'
import { useState } from 'react'

interface Props {
  word: IFavoriteWord
}

export default function Tag({ word }: Props) {
  const [isHover, setHover] = useState(false)
  const { onClick, ref, open, close, onTransitionEnd } =
    useStateChange<HTMLDivElement>()

  return (
    <div className="relative">
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
        className="relative text-xs font-light text-gray-600"
      >
        {word.word}
      </Button>
      <TagInfo
        word={word}
        isHover={isHover}
        onTransitionEnd={onTransitionEnd}
        targetRef={ref}
      />
    </div>
  )
}
