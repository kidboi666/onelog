/* eslint-disable react/no-array-index-key */
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react'
import { List } from './List'
import Text from './Text'
import { useInput } from '@/hooks/useInput'
import cn from '@/lib/cn'
import Tag from './Tag'
import Input from './Input'

interface Props {
  tags: string[]
  disabled?: boolean
  setTags: Dispatch<SetStateAction<string[]>>
}

export const TagsInput = ({ tags, setTags, disabled }: Props) => {
  const [text, onChangeText, setText] = useInput('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDelete = (idx: number) => {
    const filterTag = tags?.filter((tag) => tag !== tags[idx])
    if (filterTag) {
      setTags(filterTag)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.nativeEvent.isComposing || !text) return
      setText('')
      setTags((prev: string[]) => [...prev, text])
    }

    if (e.key === ' ') {
      e.preventDefault()
      if (e.nativeEvent.isComposing || !text) return
    }

    if (e.key === 'Backspace') {
      if (tags && !text) {
        handleDelete(tags.length - 1)
      }
    }
    if (tags.length >= 10 && e.key !== 'Backspace') {
      setText('')
      setError('태그는 10개 까지만 등록 가능합니다.')
    } else {
      setError('')
    }
  }

  const handleInputClick = () => {
    if (!inputRef.current) return null

    inputRef.current.focus()
  }

  return (
    <>
      <div
        onClick={handleInputClick}
        className={cn(
          'group flex w-full cursor-text flex-wrap gap-2 rounded-lg py-2 text-xs transition dark:ring-zinc-600',
          error && 'border-red-500',
        )}
      >
        {tags.length !== 0 && (
          <List className="flex flex-wrap gap-2">
            {tags?.map((tag, idx) => <Tag key={idx} tag={tag} index={idx} />)}
          </List>
        )}
        <Input
          name="tags"
          variant="secondary"
          dimension="none"
          ref={inputRef}
          disabled={disabled}
          placeholder="태그를 추가하세요. 입력후 Enter. 삭제는 BackSpace"
          value={text}
          onChange={onChangeText}
          onKeyDown={handleKeyDown}
          className="w-72"
        />
      </div>
      {error && (
        <Text as="span" type="error">
          {error}
        </Text>
      )}
    </>
  )
}
