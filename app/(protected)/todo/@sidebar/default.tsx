'use client'

import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Title from '@/components/shared/Title'
import cn from '@/lib/cn'
import { useEffect, useState } from 'react'
import TaskFolderSection from './_components/TaskFolderSection'
import AddFolderSection from './_components/AddFolderSection'
import SideMenuButtonSection from './_components/SideMenuButtonSection'
import { TodoFolder } from '@/types/todo'
import { useTodo } from '@/store/useTodo'

export const INIT_TODO_FOLDER: TodoFolder = {
  id: 0,
  name: '새로운 폴더',
  createdAt: 0,
  updatedAt: 0,
  dotColor: 'black',
}

export default function SideBar() {
  const [isOpenSide, setOpenSide] = useState(false)
  const { todoFolders, setTodoFolders } = useTodo()

  const handleSideMenu = () => {
    setOpenSide((prev) => !prev)
  }

  const handleAddTodoFolder = () => {
    const nextFolder = {
      ...INIT_TODO_FOLDER,
      id: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    const nextFolders = [...todoFolders, nextFolder]
    setTodoFolders(nextFolders)
  }

  useEffect(() => {
    const prevTodos = JSON.parse(localStorage.getItem('todo-folder')!) || []
    setTodoFolders([...prevTodos])
  }, [])

  useEffect(() => {
    localStorage.setItem('todo-folder', JSON.stringify(todoFolders))
  }, [todoFolders])

  return (
    <Container
      isBackground
      className={cn(
        'z-30 flex h-[calc(100dvh-80px)] w-80 flex-shrink-0 flex-col gap-4 p-4 shadow-md',
        isOpenSide ? 'w-72' : 'w-fit',
      )}
    >
      <Box col className="items-between h-full gap-2">
        <Box row className="items-center justify-between">
          {isOpenSide && <Title>전체</Title>}
          <SideMenuButtonSection
            isOpenSide={isOpenSide}
            onSideMenu={handleSideMenu}
          />
        </Box>
        <TaskFolderSection isOpenSide={isOpenSide} todoFolders={todoFolders} />
      </Box>
      <AddFolderSection isOpenSide={isOpenSide} onClick={handleAddTodoFolder} />
    </Container>
  )
}
