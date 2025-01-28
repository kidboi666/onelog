export interface IEmotionBaseAdapter {
  getEmotionAverage(userId: string): Promise<number>
}
