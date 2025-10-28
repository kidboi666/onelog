import { useRouter } from 'next/navigation'
import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import useAddTodo from '@/src/services/mutates/todo/useAddTodo'
import useUpdateTodo from '@/src/services/mutates/todo/useUpdateTodo'
import { ITodoFolder } from '@/src/types/dtos/todo'
import { IUserInfo } from '@/src/types/entities/auth'
import { ITodo } from '@/src/types/entities/todo'
import useInput from '@/src/hooks/useInput'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import { ROUTES } from '@/src/routes'
import { YStack } from '@/src/components/Stack'
import TaskHeader from '@/src/app/(playground)/todo/@main/_components/TaskHeader'
import TaskInput from '@/src/app/(playground)/todo/@main/_components/TaskInput'
import TaskLists from '@/src/app/(playground)/todo/@main/_components/TaskLists'
import { useTodoStorage } from '@/src/app/(playground)/todo/@main/_hooks/useTodoStorage'

interface Props {
  me: IUserInfo
  folderId: number
  currentFolder: ITodoFolder
  todos: ITodo[]
  completedTodos: ITodo[]
}

export default function TaskForm({
  me,
  folderId,
  currentFolder,
  todos,
  completedTodos,
}: Props) {
  const router = useRouter()
  const [todoText, onChangeTodoText, setTodoText] = useInput('')
  const { onClick, ref, close, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const dropdownRef = useOutsideClick<HTMLButtonElement>(close)
  const { updateIndexes, getStoredIndexes } = useTodoStorage(Number(folderId))

  const { mutate: addTodo } = useAddTodo()
  const { mutate: updateTodo } = useUpdateTodo()

  const [showCompletedZone, setShowCompletedZone] = useState(false)
  const dragItem = useRef<ITodo | null>(null)
  const dragOverItem = useRef<ITodo | null>(null)
  const completedZone = useRef<HTMLDivElement>(null)
  const inProgressZone = useRef<HTMLDivElement>(null)

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault()
    const { inProgress: currentIndex } = getStoredIndexes()
    const nextTodo = {
      name: todoText,
      folderId: currentFolder.id,
      userId: me.id,
      index: Number(currentIndex) + 1,
    }
    addTodo(nextTodo, {
      onSuccess: () => setTodoText(''),
    })
  }

  const handleUpdateButtonClick = (e: MouseEvent, selectedTodo: ITodo) => {
    e.stopPropagation()
    const folderIndex = getStoredIndexes()
    const inProgressLastIndex = folderIndex.inProgress ?? 0
    const completedLastIndex = folderIndex.completed ?? 0

    if (selectedTodo.isComplete) {
      updateTodo({
        ...selectedTodo,
        index: inProgressLastIndex + 1,
        isComplete: false,
      })
    } else {
      updateTodo({
        ...selectedTodo,
        index: completedLastIndex + 1,
        isComplete: true,
      })
    }
  }

  useEffect(() => {
    const isCompletedTodo = completedTodos.length >= 1
    const willCompleted = dragItem.current !== null
    setShowCompletedZone(isCompletedTodo || willCompleted)

    const prevIndex = getStoredIndexes()
    updateIndexes(todos, completedTodos, prevIndex)
  }, [todos, completedTodos])

  useEffect(() => {
    if (!currentFolder) {
      router.push(ROUTES.TODO.MAIN)
    }
  }, [currentFolder])

  if (!currentFolder) return null

  return (
    <form onSubmit={handleSubmitTodo}>
      <YStack gap={4}>
        <YStack>
          <TaskHeader
            currentFolder={currentFolder}
            dropdownRef={dropdownRef}
            targetRef={ref}
            onTransitionEnd={onTransitionEnd}
            onClick={onClick}
          />
          <TaskInput todoText={todoText} onChangeTodoText={onChangeTodoText} />
        </YStack>
        <TaskLists
          todos={todos}
          currentFolderColor={currentFolder.color}
          completedTodos={completedTodos}
          completedZone={completedZone}
          inProgressZone={inProgressZone}
          dragItem={dragItem}
          dragOverItem={dragOverItem}
          onUpdateButtonClick={handleUpdateButtonClick}
          showCompletedZone={showCompletedZone}
        />
      </YStack>
    </form>
  )
}
