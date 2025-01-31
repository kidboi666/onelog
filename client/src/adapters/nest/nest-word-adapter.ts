import { IWordBaseAdapter } from '@/src/types/services/index'

export const createNestWordAdapter = (): IWordBaseAdapter => {
  const getMyUsedWords = async (userId: string) => {
    return Promise.resolve(null)
  }

  const getUsedWords = async (word: string) => {
    return Promise.resolve(null)
  }

  return {
    getMyUsedWords,
    getUsedWords,
  }
}
