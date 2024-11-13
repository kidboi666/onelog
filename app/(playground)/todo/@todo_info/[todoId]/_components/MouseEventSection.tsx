'use client'

import useDataDrivenAnimation from '@/hooks/useStateChange'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useRef } from 'react'
import BackButtonSection from './BackButtonSection'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/me-query'
import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/types/supabase'
import { todoQuery } from '@/services/queries/todo/todo-query'

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
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me!.userId, Number(folderId)),
  )
  const isMouseDown = useRef<boolean>(false)
  const {
    close,
    open,
    ref: insideRef,
  } = useDataDrivenAnimation<HTMLDivElement>()
  let todo: Tables<'todo'>

  if (todos) {
    todo = todos.find((item) => item.id === Number(todoId))!
  }

  const handleCloseTodoInfo = () => {
    close()
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
      open()
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
