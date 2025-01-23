import { AxiosError, AxiosResponse } from 'axios'
import { axiosInstance } from '@/src/lib/axios'

export class APIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public originalError: AxiosError,
  ) {
    super(message)
    this.name = 'APIError'
  }
}

const handleRequestError = (error: unknown) => {
  if (error instanceof AxiosError) {
    throw new APIError(
      error.response?.status ?? 500,
      error.response?.data?.message ?? error.message,
      error,
    )
  }
  throw error
}

const makeRequest = async <T>(
  requestFn: () => Promise<AxiosResponse<T>>,
): Promise<T> => {
  try {
    const response = await requestFn()
    return response.data
  } catch (err) {
    return handleRequestError(err)
  }
}

type RequestData<T = unknown> = T extends void ? undefined : T

export const fetcher = {
  post: async <T, D = void>(url: string, data?: RequestData<D>) => {
    return makeRequest<T>(() => axiosInstance.post(url, data))
  },
  get: async <T>(url: string) => {
    return makeRequest<T>(() => axiosInstance.get(url))
  },
  patch: async <T, D = void>(url: string, data: RequestData<D>) => {
    return makeRequest<T>(() => axiosInstance.patch(url, data))
  },
  delete: async <T>(url: string) => {
    return makeRequest<T>(() => axiosInstance.delete(url))
  },
}
