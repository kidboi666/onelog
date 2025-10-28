'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { useMe } from '@/src/store/hooks/useMe'
import { todoQuery } from '@/src/services/queries/todo/todo-query'
import { ITodo } from '@/src/types/entities/todo'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import BackButtonSection from './BackButtonSection'

interface Props {
  todoId: string
  folderId: string
}

export default function MouseEventSection({
  children,
  todoId,
  folderId,
}: PropsWithChildren<Props>) {
  const router = useRouter()
  const { me } = useMe()
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(me!.id, Number(folderId)),
  )
  const isMouseDown = useRef<boolean>(false)
  const {
    close,
    open,
    ref: insideRef,
  } = useDataDrivenAnimation<HTMLDivElement>()
  let todo: ITodo | null

  if (todos) {
    todo = todos.find((item) => item.id === Number(todoId)) || null
  }

  const handleCloseTodoInfo = () => {
    void close()
    setTimeout(() => {
      router.back()
    }, 100)
  }

  const handleMouseDown = () => {
    isMouseDown.current = true
  }

  const handleMouseUp = () => {
    if (isMouseDown.current) {
      handleCloseTodoInfo()
    }
    isMouseDown.current = false
  }

  useEffect(() => {
    setTimeout(() => {
      void open()
    }, 100)
  }, [])

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="fixed inset-0 z-40 animate-fade-in overflow-hidden bg-black/15"
      />
      <div
        ref={insideRef}
        data-status="closed"
        className="absolute bottom-0 right-0 z-50 flex h-full w-80 origin-right flex-col justify-between gap-4 overflow-hidden bg-white p-4 shadow-md transition data-[status=closed]:translate-x-20 data-[status=closed]:opacity-0 dark:bg-var-darkgray"
      >
        <BackButtonSection onClose={handleCloseTodoInfo} />
        {children}
      </div>
    </>
  )
}
