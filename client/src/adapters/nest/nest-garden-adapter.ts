import { IGardenBaseAdapter, IGetGarden } from '@/src/types/garden'

export class NestGardenAdapter implements IGardenBaseAdapter {
  getGarden(parmas: IGetGarden): Promise<any> {
    return Promise.resolve(undefined)
  }
}
