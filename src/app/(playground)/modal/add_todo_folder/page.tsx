'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useMe } from '@/src/store/hooks/useMe'
import useAddTodoFolder from '@/src/services/mutates/todo/useAddTodoFolder'
import { FolderColor } from '@/src/types/enums/index'
import useInput from '@/src/hooks/useInput'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import TextDisplay from '@/src/components/TextDisplay'
import ColorSelectButton from '@/src/app/(playground)/modal/_components/ColorSelectButton'

export default function AddTodoFolderModal() {
  const router = useRouter()
  const { me } = useMe()
  const [name, onChangeName] = useInput('')
  const [color, setColor] = useState<FolderColor>(FolderColor.BLACK)
  const { mutate: addTodoFolder } = useAddTodoFolder()

  const handleColorClick = (selectedColor: FolderColor) => {
    setColor(selectedColor)
  }

  const handleSubmit = (e: FormEvent) => {
    if (!me) return null

    e.preventDefault()
    const currentIndex = localStorage.getItem('todo-folder-index') || 0
    const nextIndex = Number(currentIndex) + 1
    const newFolder = {
      name,
      color,
      index: nextIndex,
      userId: me.id,
    }
    addTodoFolder(newFolder)
    localStorage.setItem('todo-folder-index', nextIndex.toString())
    router.back()
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <TextDisplay>폴더명</TextDisplay>
          <Input value={name} onChange={onChangeName} />
        </div>
        <div className="flex flex-col gap-2">
          <TextDisplay>색상</TextDisplay>
          <div className="flex gap-2">
            {Object.values(FolderColor).map((prefaredColor) => (
              <ColorSelectButton
                key={prefaredColor}
                selectedColor={color}
                color={prefaredColor}
                onColorClick={handleColorClick}
              />
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
