'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { useMe } from '@/src/store/hooks/useMe'
import useUpdateTodoFolder from '@/src/services/mutates/todo/useUpdateTodoFolder'
import { todoQuery } from '@/src/services/queries/todo/todo-query'
import { FolderColor } from '@/src/types/enums/index'
import useInput from '@/src/hooks/useInput'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import TextDisplay from '@/src/components/TextDisplay'
import ColorSelectButton from '@/src/app/(playground)/modal/_components/ColorSelectButton'

interface Props {
  params: { folderId: string }
}

export default function EditTodoFolderModal({ params: { folderId } }: Props) {
  const router = useRouter()
  const { me } = useMe()
  const { data: folders } = useSuspenseQuery(
    todoQuery.getTodoFolder(me?.id ?? ''),
  )
  const folder = folders.find((item) => item.id === Number(folderId))
  const [name, onChangeName, setName] = useInput<string>('')
  const [color, setColor] = useState<FolderColor>(FolderColor.BLACK)
  const { mutate: updateTodoFolder } = useUpdateTodoFolder()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateTodoFolder({ ...folder!, name, color })
    router.back()
  }

  const handleColorClick = (selectedColor: FolderColor) => {
    setColor(selectedColor)
  }

  useEffect(() => {
    setName(folder!.name)
    setColor(folder!.color)
  }, [folder])

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <TextDisplay>폴더명</TextDisplay>
          <Input
            value={name}
            onChange={onChangeName}
            className="dark:bg-var-dark"
          />
        </div>
        <div className="flex flex-col gap-2">
          <TextDisplay>색상</TextDisplay>
          <div className="flex gap-2">
            {Object.values(FolderColor).map((prefaredColor) => (
              <ColorSelectButton
                key={prefaredColor}
                color={prefaredColor}
                selectedColor={color}
                onColorClick={handleColorClick}
              />
            ))}
          </div>
        </div>
        <Button
          type="submit"
          disabled={folder?.name === name && folder?.color === color}
        >
          수정하기
        </Button>
      </form>
    </Modal>
  )
}
