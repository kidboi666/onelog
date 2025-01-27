import { IGardenBaseAdapter } from '@/src/types/garden'

export class NestGardenAdapter implements IGardenBaseAdapter {
  getGarden(userId: string, selectedYear: number): Promise<any> {
    return Promise.resolve(undefined)
  }
}
