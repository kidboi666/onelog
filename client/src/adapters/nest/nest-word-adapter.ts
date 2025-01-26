'use client'

import {
  IGetMyUsedWords,
  IGetUsedWords,
  IUsedWord,
  IWord,
  IWordBaseAdapter,
} from '@/src/types/word'

export class NestWordAdapter implements IWordBaseAdapter {
  getMyUsedWords({ userId }: IGetMyUsedWords): Promise<IUsedWord[]> {
    throw new Error('Method not implemented.')
  }

  getUsedWords({ word }: IGetUsedWords): Promise<IWord[]> {
    throw new Error('Method not implemented.')
  }
}
