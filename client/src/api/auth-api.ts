import { fetcher } from '@/src/api/fetcher'
import { FETCH_URL } from '@/src/constants/url'

interface SignInRequest {
  email: string
  password: string
}

interface SignUpRequest extends SignInRequest {}

interface UpdateUserRequest {
  avatarUrl: string
  userName: string
  aboutMe: string
  mbti: string
}

export const authApi = {
  signIn: (params: SignInRequest) =>
    fetcher.post(FETCH_URL.AUTH.SIGN_IN, params),
  signUp: (params: SignUpRequest) =>
    fetcher.post(FETCH_URL.AUTH.SIGN_UP, params),
  signOut: () => fetcher.post(FETCH_URL.AUTH.SIGN_OUT),
  getSession: () => fetcher.get(FETCH_URL.AUTH.GET_SESSION),
  updateUser: (id: string, params: UpdateUserRequest) =>
    fetcher.patch(FETCH_URL.USER.UPDATE_USER(id), params),
  getUserInfo: () => fetcher.get(FETCH_URL.AUTH.GET_USER_INFO),
}
