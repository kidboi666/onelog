import type { IFavoriteWord } from "@/entities/word/api/dtos";

/**
 * Base
 */
export interface IUsedWordBase {
  createdAt: string;
  id: number;
  userId: string;
  words: IFavoriteWord[] | null;
}

export interface IUsedWord extends IUsedWordBase {}

export interface IWord {
  count: number;
  createdAt: string;
  id: number;
  word: string;
}
