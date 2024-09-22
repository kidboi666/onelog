'use client'

import { useTodo } from '@/store/useTodo'
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

export default function AddTodoFolderModal() {
  const router = useRouter()
  const { setTodoFolders, todoFolders } = useTodo()
  const [folderName, onChangeFolderName] = useInput('')
  const [folderColor, setFolderColor] = useState<TTodoColor>('black')
  const colors: TTodoColor[] = [
    'black',
    'green',
    'yellow',
    'blue',
    'orange',
    'red',
    'purple',
  ]

  const handleColorClick = (selectedColor: TTodoColor) => {
    setFolderColor(selectedColor)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const currentIndex = localStorage.getItem('todo-index') || 0
    const nextIndex = Number(currentIndex) + 1
    const newFolder = {
      name: folderName,
      dotColor: folderColor,
      id: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      index: nextIndex,
    }
    const nextFolders = [...todoFolders, newFolder]
    localStorage.setItem('todo-index', nextIndex.toString())
    setTodoFolders(nextFolders)
    router.back()
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Text>폴더명</Text>
          <Input
            value={folderName}
            onChange={onChangeFolderName}
            className="dark:bg-var-dark"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Text>색상</Text>
          <div className="flex gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                variant="none"
                onClick={() => handleColorClick(color)}
                className={cn(
                  'relative size-4 rounded-full',
                  color === 'yellow' && 'bg-var-yellow',
                  color === 'orange' && 'bg-var-orange',
                  color === 'black' && 'bg-var-black',
                  color === 'blue' && 'bg-var-blue',
                  color === 'green' && 'bg-var-green',
                  color === 'red' && 'bg-red-500',
                  color === 'purple' && 'bg-purple-500',
                )}
              >
                {color === folderColor && (
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
        <Button type="submit" disabled={!folderName || !folderColor}>
          추가하기
        </Button>
      </form>
    </Modal>
  )
}
