'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import useUpdateTodoFolder from '@/src/services/mutates/todo/useUpdateTodoFolder'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { todoQuery } from '@/src/services/queries/todo/todo-query'
import { TodoFolderColorType } from '@/src/types/enums/index'
import useInput from '@/src/hooks/useInput'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Modal from '@/src/components/Modal'
import TextDisplay from '@/src/components/TextDisplay'
import ColorSelectButton from '@/src/app/(playground)/modal/_components/ColorSelectButton'

interface Props {
  params: { folderId: string }
}

export default function EditTodoFolderModal({ params }: Props) {
  const folderId = params.folderId
  const router = useRouter()
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))

  const { data: folders } = useSuspenseQuery(
    todoQuery.getTodoFolder(supabase, session!.id),
  )
  const folder = folders.find((item) => item.id === Number(folderId))
  const [name, onChangeName, setName] = useInput<string>('')
  const [color, setColor] = useState<TodoFolderColorType>(
    TodoFolderColorType.BLACK,
  )
  const { mutate: updateTodoFolder } = useUpdateTodoFolder()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateTodoFolder({ ...folder!, name, color })
    router.back()
  }

  const handleColorClick = (selectedColor: TodoFolderColorType) => {
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
            {Object.values(TodoFolderColorType).map((prefaredColor) => (
              <ColorSelectButton
                key={prefaredColor}
                color={prefaredColor}
                onColorClick={handleColorClick}
                selectedColor={color}
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
