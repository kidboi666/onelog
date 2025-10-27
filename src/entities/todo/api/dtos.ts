import type { FolderColor } from "@/shared/types/enums";

export interface ICreateTodo {
  name: string;
  folderId: number;
  userId?: string;
  index: number;
}

export interface ICreateTodoFolder {
  name: string;
  color: FolderColor;
  index: number;
  userId: string;
}

export interface IDeleteTodo {
  todoId: number;
  folderId: number;
}

export interface IUpdateTodo {
  id: number;
  name: string;
  folderId: number;
  userId: string;
  memo: string | null;
  isComplete: boolean;
  index: number;
}

export interface IUpdateTodoFolder {
  id: number;
  name: string;
  color: FolderColor;
  index: number;
}

export interface IGetTodoFromFolder {
  meId: string;
  folderId: number;
}

export interface IGetTodoIndex {
  meId: string;
  folderId: number;
}
