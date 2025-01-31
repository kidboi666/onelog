import { IGetGarden } from '@/src/types/dtos/garden'
import { IGardenBaseAdapter } from '@/src/types/services/index'

export const createNestGardenAdapter = (): IGardenBaseAdapter => {
  const getGarden = async (params: IGetGarden): Promise<any> => {
    return Promise.resolve(undefined)
  }

  return {
    getGarden,
  }
}
