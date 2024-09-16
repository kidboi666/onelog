/* eslint-disable react/no-array-index-key */
import { Dispatch, KeyboardEvent, SetStateAction, useState } from 'react'
import { List } from './List'
import Button from './Button'
import Text from './Text'
import { useInput } from '@/hooks/useInput'
import cn from '@/lib/cn'

interface Props {
  tags: string[]
  setTags: Dispatch<SetStateAction<string[]>>
}

export const TagsInput = ({ tags, setTags }: Props) => {
  const [text, onChangeText, setText] = useInput('')
  const [error, setError] = useState('')

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

  return (
    <>
      <div
        className={cn(
          'group flex flex-wrap gap-2 rounded-lg px-2 py-3 text-sm ring-1 ring-gray-300 transition dark:border-gray-600',
          error && 'border-red-500',
        )}
      >
        {tags.length !== 0 && (
          <List className="flex flex-wrap gap-2">
            {tags?.map((tag, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <List.Row key={tag + idx}>
                <Button
                  variant="secondary"
                  onClick={(e) => null}
                  className="rounded-xl px-2 py-[2px] text-xs font-medium text-gray-500 dark:text-gray-400 dark:ring-gray-600"
                >
                  {tag}
                </Button>
              </List.Row>
            ))}
          </List>
        )}
        <input
          name="tags"
          placeholder="태그를 추가하세요. 입력후 Enter. 삭제는 BackSpace"
          value={text}
          onChange={onChangeText}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-slate-800 outline-none transition dark:text-slate-400 dark:placeholder:text-slate-500"
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
