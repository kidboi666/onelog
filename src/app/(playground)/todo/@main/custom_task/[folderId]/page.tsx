'use client'

import { useSuspenseQueries } from '@tanstack/react-query'
import cn from '@/src/lib/cn'
import { useMe } from '@/src/store/hooks/useMe'
import { todoQuery } from '@/src/services/queries/todo/todo-query'
import { FolderColor } from '@/src/types/enums/index'
import { getTodoFolderColorClassName } from '@/src/utils/client-utils'
import TaskForm from '@/src/app/(playground)/todo/@main/_hooks/TaskForm'

interface Props {
  params: { folderId: string }
  searchParams: { color: string }
}

export default function CustomTaskPage({
  params: { folderId },
  searchParams: { color },
}: Props) {
  const { me } = useMe()
  const [{ data: todoFolders }, { data: fetchedTodos }] = useSuspenseQueries({
    queries: [
      todoQuery.getTodoFolder(me!.id),
      todoQuery.getTodoFromFolder(me!.id, Number(folderId)),
    ],
  })
  const sortedTodos = fetchedTodos.sort((a, b) => a.index - b.index)
  const todos = sortedTodos.filter((todo) => todo.isComplete === false)
  const completedTodos = sortedTodos.filter((todo) => todo.isComplete === true)
  const currentFolder = todoFolders.find(
    (folder) => folder.id === Number(folderId),
  )
  if (!me || !currentFolder) return null
  return (
    <div
      className={cn(
        'relative flex min-h-[calc(100dvh-64px)] w-full flex-col gap-4 overflow-y-auto rounded-md p-4 shadow-md',
        getTodoFolderColorClassName(color as FolderColor),
      )}
    >
      <TaskForm
        me={me}
        folderId={parseInt(folderId)}
        todos={todos}
        completedTodos={completedTodos}
        currentFolder={currentFolder}
      />
    </div>
  )
}
