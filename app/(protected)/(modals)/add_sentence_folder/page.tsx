'use client'

import Modal from '@/components/shared/Modal'
import Text from '@/components/shared/Text'
import Input from '@/components/shared/Input'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { FormEvent, useState } from 'react'
import { useInput } from '@/hooks/useInput'
import { TTodoColor } from '@/types/todo'
import cn from '@/lib/cn'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'
import useAddSentenceFolder from '@/services/mutates/sentence/useAddSentenceFolder'

const colors: TTodoColor[] = [
  'black',
  'green',
  'yellow',
  'blue',
  'orange',
  'red',
  'purple',
]

export default function AddTodoFolderModal() {
  const router = useRouter()
  const [name, onChangeName] = useInput('')
  const [color, setColor] = useState<TTodoColor>('black')
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: addSentenceFolder } = useAddSentenceFolder()

  const handleColorClick = (selectedColor: TTodoColor) => {
    setColor(selectedColor)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const currentIndex = localStorage.getItem('todo-folder-index') || 0
    const nextIndex = Number(currentIndex) + 1
    const newFolder = {
      name,
      color,
      index: nextIndex,
      userId: me!.userId,
    }
    addSentenceFolder(newFolder)
    localStorage.setItem('todo-folder-index', nextIndex.toString())
    router.back()
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Text>폴더명</Text>
          <Input
            value={name}
            onChange={onChangeName}
            className="dark:bg-var-dark"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Text>색상</Text>
          <div className="flex gap-2">
            {colors.map((prefaredColor) => (
              <Button
                key={prefaredColor}
                variant="none"
                onClick={() => handleColorClick(prefaredColor)}
                className={cn(
                  'relative size-4 rounded-full',
                  prefaredColor === 'yellow' && 'bg-var-yellow',
                  prefaredColor === 'orange' && 'bg-var-orange',
                  prefaredColor === 'black' && 'bg-var-black',
                  prefaredColor === 'blue' && 'bg-var-blue',
                  prefaredColor === 'green' && 'bg-var-green',
                  prefaredColor === 'red' && 'bg-red-500',
                  prefaredColor === 'purple' && 'bg-purple-500',
                )}
              >
                {prefaredColor === color && (
                  <Icon size={18} view={20} className="absolute text-white">
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </Icon>
                )}
              </Button>
            ))}
          </div>
        </div>
        <Button type="submit" disabled={!name || !color}>
          추가하기
        </Button>
      </form>
    </Modal>
  )
}
