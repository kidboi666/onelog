import { IEmotionBaseAdapter } from '@/src/types/emotion'

export class NestEmotionAdapter implements IEmotionBaseAdapter {
  async getEmotionAverage(userId: string): Promise<number> {
    return Promise.resolve(75)
  }
}
