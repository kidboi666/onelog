import { IReport } from '@/src/types/dtos/report'
import { IReportBaseAdapter } from '@/src/types/services/index'

export const createNestReportAdapter = (): IReportBaseAdapter => {
  const sendReport = async (params: IReport) => {
    return Promise.resolve(undefined)
  }

  return { sendReport }
}
