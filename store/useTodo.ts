import { Todo, TodoFolder } from '@/types/todo'
import { create } from 'zustand'

interface TodoState {
  todoFolders: TodoFolder[]
  todos: Todo[]
  selectedFolder: TodoFolder | null
  successTodos: Todo[]
  setTodoFolders: (todoFolders: TodoFolder[]) => void
  setSelectFolder: (selectTodoFolder: TodoFolder | null) => void
  setTodos: (todos: Todo[]) => void
  setSuccessTodos: (todos: Todo[]) => void
}

export const useTodo = create<TodoState>((set) => ({
  todoFolders: [],
  selectedFolder: null,
  todos: [],
  successTodos: [],
  setTodoFolders: (todoFolders) => set({ todoFolders }),
  setSelectFolder: (selectTodoFolder) =>
    set({ selectedFolder: selectTodoFolder }),
  setTodos: (todos) => set({ todos }),
  setSuccessTodos: (successTodos) => set({ successTodos }),
}))
