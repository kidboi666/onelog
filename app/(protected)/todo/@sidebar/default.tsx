'use client'

import cn from '@/lib/cn'
import { useState, useTransition } from 'react'
import TaskFolderSection from './_components/TaskFolderSection'
import SideMenuButtonSection from './_components/SideMenuButtonSection'
import { TodoFolder } from '@/types/todo'
import { useRouter } from 'next/navigation'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import Line from '@/components/shared/Line'
import TodoMenuSection from './_components/TodoMenuSection'
import { List } from '@/components/shared/List'
import { TODO_MENU } from '../_constants'
import Spinner from '@/components/shared/Spinner'
import { useSuspenseQuery } from '@tanstack/react-query'
import { todoFolderQuery } from '@/services/queries/todo/todoFolderQuery'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import useStateChange from '@/hooks/useStateChange'

export const INIT_TODO_FOLDER: TodoFolder = {
  id: 0,
  name: '새로운 폴더',
  createdAt: 0,
  updatedAt: 0,
  dotColor: 'black',
  index: 0,
}

interface Props {
  searchParams: { folder_id: string; color?: string }
}

export default function SideBarPage({ searchParams }: Props) {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()
  const [isOpenSide, setOpenSide] = useState(false)
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me.userId),
  )
  const { ref, open, close, onTransitionEnd } = useStateChange<HTMLDivElement>()

  const handleSideMenu = () => {
    setOpenSide((prev) => !prev)
    if (isOpenSide) {
      close()
    } else {
      open()
    }
    localStorage.setItem('open-side', (!isOpenSide).toString())
  }

  const handleMenuSelect = (menu: (typeof TODO_MENU)[number]['name']) => {
    router.push(`/todo/${menu}`)
  }

  const handleAddTodoFolder = () => {
    router.push(`/add_todo_folder?${searchParams.toString()}`)
  }

  return (
    <div
      className={cn(
        'relative z-30 flex h-[calc(100dvh-80px)] flex-shrink-0 flex-col gap-4 p-4 shadow-md transition',
        isOpenSide ? 'w-72' : 'w-fit',
      )}
    >
      <div className="absolute left-0 top-0 -z-10 h-full w-[74px] bg-white dark:bg-var-darkgray" />
      <div
        ref={ref}
        onTransitionEnd={onTransitionEnd}
        data-status="closed"
        className="absolute left-0 top-0 -z-10 hidden h-full w-72 origin-left bg-white transition ease-in-out data-[status=closed]:scale-x-75 data-[status=closed]:opacity-0 dark:bg-var-darkgray"
      />
      <div className="flex h-full flex-col gap-2">
        <SideMenuButtonSection
          isOpenSide={isOpenSide}
          onSideMenu={handleSideMenu}
        />
        <List className="flex flex-col gap-2">
          {TODO_MENU.map((menu) => (
            <TodoMenuSection
              key={menu.id}
              menu={menu}
              isOpenSide={isOpenSide}
              onMenuSelect={handleMenuSelect}
            />
          ))}
        </List>
        <Line />
        <TaskFolderSection isOpenSide={isOpenSide} todoFolders={todoFolders} />
      </div>
      <div
        className={cn(
          'flex justify-between gap-2',
          isOpenSide ? '' : 'flex-col',
        )}
      >
        <Button
          variant="icon"
          onClick={() => startTransition(() => handleAddTodoFolder())}
          className="gap-2"
        >
          {isLoading ? (
            <Spinner size={18} />
          ) : (
            <Icon view="0 -960 960 960" size={18}>
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
            </Icon>
          )}
          {isOpenSide && <span className="animate-fade-in">새 폴더 추가</span>}
        </Button>
        <Button variant="icon">
          <Icon view="0 -960 960 960" size={18}>
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
          </Icon>
        </Button>
      </div>
    </div>
  )
}
