'use client'

import Modal from '@/components/shared/Modal'
import Text from '@/components/shared/Text'
import { FormEvent, useEffect, useState } from 'react'
import Input from '@/components/shared/Input'
import Button from '@/components/shared/Button'
import { useInput } from '@/hooks/useInput'
import cn from '@/lib/cn'
import Icon from '@/components/shared/Icon'
import { useTodo } from '@/store/useTodo'
import { TodoFolder, TTodoColor } from '@/types/todo'
import { useRouter } from 'next/navigation'

interface Props {
  params: { folderId: string }
}

export default function EditTodoFolderModal({ params }: Props) {
  const folderId = params.folderId
  const router = useRouter()
  const { todoFolders, setTodoFolders } = useTodo()
  const [foundedTargetFolder, setFoundedTargetFolder] = useState<TodoFolder>({
    name: '',
    id: 0,
    dotColor: 'black',
    createdAt: 0,
    updatedAt: 0,
    index: 0,
  })
  const [prevFolders, setPrevFolders] = useState<TodoFolder[]>([])
  const [folderName, onChangeFolderName, setFolderName] = useInput<string>('')
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const modifiedFolder = {
      ...foundedTargetFolder,
      name: folderName,
      dotColor: folderColor,
    }
    const modifiedFolders = [...prevFolders, modifiedFolder]
    setTodoFolders(modifiedFolders)
    router.back()
  }

  const handleColorClick = (selectedColor: TTodoColor) => {
    setFolderColor(selectedColor)
  }

  useEffect(() => {
    const foundTodoFolder = todoFolders.find(
      (folder) => folder.id === Number(folderId),
    )
    setPrevFolders(
      todoFolders.filter((folder) => folder.id !== Number(folderId)),
    )
    setFolderName(foundTodoFolder!.name!)
    setFolderColor(foundTodoFolder!.dotColor!)
    setFoundedTargetFolder(foundTodoFolder!)
  }, [])

  return (
    <Modal className="bg-var-lightgray">
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
        <Button
          type="submit"
          disabled={
            foundedTargetFolder?.name === folderName &&
            foundedTargetFolder?.dotColor === folderColor
          }
        >
          수정하기
        </Button>
      </form>
    </Modal>
  )
}
