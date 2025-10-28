import { MouseEvent, MutableRefObject, RefObject } from 'react'
import { ITodo } from '@/src/types/entities/todo'
import { FolderColor } from '@/src/types/enums/index'
import { List } from '@/src/components/List'
import { YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'
import Todo from '@/src/app/(playground)/todo/_components/Todo'

interface Props {
  todos: ITodo[]
  inProgressZone: RefObject<HTMLDivElement>
  showCompletedZone: boolean
  currentFolderColor: FolderColor
  onUpdateButtonClick: (e: MouseEvent, todo: ITodo) => void
  dragItem: MutableRefObject<ITodo | null>
  dragOverItem: MutableRefObject<ITodo | null>
  completedTodos: ITodo[]
  completedZone: RefObject<HTMLDivElement>
}

export default function TaskLists({
  todos,
  inProgressZone,
  showCompletedZone,
  currentFolderColor,
  onUpdateButtonClick,
  dragItem,
  dragOverItem,
  completedTodos,
  completedZone,
}: Props) {
  return (
    <YStack gap={4} className="sm:flex-row">
      {todos.length >= 1 && (
        <div
          ref={inProgressZone}
          className="flex w-full animate-fade-in flex-col gap-4 border border-transparent transition sm:w-72"
        >
          <YStack>
            <Title type="sub" className="text-nowrap">
              할 일
            </Title>
            <List className="flex flex-col gap-2">
              {todos.map((todo) => (
                <Todo
                  isDraggable
                  key={todo.id}
                  todo={todo}
                  isComplete={todo.isComplete}
                  folderColor={currentFolderColor || ''}
                  onUpdate={onUpdateButtonClick}
                  dragItem={dragItem}
                  dragOverItem={dragOverItem}
                  orderFrom="folder"
                />
              ))}
            </List>
          </YStack>
        </div>
      )}
      {showCompletedZone && (
        <div
          ref={completedZone}
          className="flex w-full animate-fade-in flex-col gap-4 border border-transparent transition sm:w-72"
        >
          <YStack>
            <Title type="sub" className="text-nowrap">
              완료됨
            </Title>
            <List className="flex flex-col gap-2">
              {completedTodos.map((todo) => (
                <Todo
                  isDraggable
                  key={todo.id}
                  todo={todo}
                  isComplete={todo.isComplete}
                  folderColor={currentFolderColor || ''}
                  onUpdate={onUpdateButtonClick}
                  dragItem={dragItem}
                  dragOverItem={dragOverItem}
                  orderFrom="folder"
                />
              ))}
            </List>
          </YStack>
        </div>
      )}
    </YStack>
  )
}
