import type { FolderColor } from "@/shared/types/enums";

/**
 * Base
 */
export interface ITodo {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string | null;
  isComplete: boolean;
  folderId: number;
  userId: string;
  index: number;
  memo: string;
}

export interface ITodoFolder {
  color: FolderColor;
  createdAt: string;
  id: number;
  index: number;
  name: string;
  userId: string;
}
