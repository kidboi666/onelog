import { ITodo } from '@/src/types/entities/todo'

export const useTodoStorage = (folderId: number) => {
  const updateIndexes = (
    todos: ITodo[],
    completedTodos: ITodo[],
    prevIndex: any,
  ) => {
    let completedLastIndex = prevIndex?.completed ?? 0
    let inProgressLastIndex = prevIndex?.inProgress ?? 0

    if (completedTodos) {
      completedLastIndex = completedTodos[completedTodos.length - 1]?.index
    }
    if (todos) {
      inProgressLastIndex = todos[todos.length - 1]?.index
    }

    localStorage.setItem(
      folderId.toString(),
      JSON.stringify({
        completed: completedLastIndex,
        in_progress: inProgressLastIndex,
      }),
    )
  }

  const getStoredIndexes = (): { completed: number; inProgress: number } => {
    const defaultValue = { completed: 0, inProgress: 0 }
    return JSON.parse(
      localStorage.getItem(folderId.toString()) ?? JSON.stringify(defaultValue),
    )
  }

  return { updateIndexes, getStoredIndexes }
}
