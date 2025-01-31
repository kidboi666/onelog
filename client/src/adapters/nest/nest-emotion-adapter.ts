import { IEmotionBaseAdapter } from '@/src/types/services/index'

export const createNestEmotionAdapter = (): IEmotionBaseAdapter => {
  const getEmotionAverage = async (userId: string): Promise<number> => {
    return Promise.resolve(75)
  }

  return {
    getEmotionAverage,
  }
}
