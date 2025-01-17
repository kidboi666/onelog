import { fetcher } from '@/src/api/fetcher'
import { FETCH_URL } from '@/src/constants/url'

export const authApi = {
  getSession: async () => {
    return await fetcher(FETCH_URL.AUTH.GET_SESSION)
  },
  signIn: async ({ email, password }: { email: string; password: string }) => {
    return await fetcher(FETCH_URL.AUTH.SIGN_IN, 'POST', { email, password })
  },
  signUp: async ({ email, password }: { email: string; password: string }) => {
    return await fetcher(FETCH_URL.AUTH.SIGN_UP, 'POST', { email, password })
  },
  signOut: async ({ id }: { id: string }) => {
    return await fetcher(FETCH_URL.AUTH.SIGN_OUT, 'POST', { id })
  },
}
