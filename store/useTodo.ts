import { Todo, TodoFolder } from '@/types/todo'
import { create } from 'zustand'

export type TodoMenu = 'main' | 'monthly' | 'weekly'

interface TodoState {
  todoFolders: TodoFolder[]
  todos: Todo[]
  selectedFolder: TodoFolder | null
  selectedFolderId: number | null
  selectedMenu: TodoMenu | null
  successTodos: Todo[]
  setSelectedFolderId: (folderId: number | null) => void
  setTodoFolders: (todoFolders: TodoFolder[]) => void
  setSelectedFolder: (selectTodoFolder: TodoFolder | null) => void
  setSelectedMenu: (selectedMenu: TodoMenu | null) => void
  setTodos: (todos: Todo[]) => void
  setSuccessTodos: (todos: Todo[]) => void
}

export const useTodo = create<TodoState>((set) => ({
  todoFolders: [],
  selectedFolder: null,
  selectedFolderId: null,
  selectedMenu: 'main',
  todos: [],
  successTodos: [],
  setTodoFolders: (todoFolders) => set({ todoFolders }),
  setSelectedFolder: (selectedFolder) =>
    set({ selectedFolder, selectedMenu: null }),
  setSelectedFolderId: (selectedFolderId: number | null) =>
    set({ selectedFolderId, selectedMenu: null }),
  setSelectedMenu: (selectedMenu) =>
    set({ selectedMenu, selectedFolder: null, selectedFolderId: null }),
  setTodos: (todos) => set({ todos }),
  setSuccessTodos: (successTodos) => set({ successTodos }),
}))
