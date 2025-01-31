import { FETCH_URL } from '@/src/constants'
import {
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  ISignUpResponse,
  IUpdateUserInfo,
} from '@/src/types/dtos/auth'
import {
  INestUserInfo,
  INestUserSession,
  IUploadAvatar,
} from '@/src/types/entities/auth'
import { IAuthBaseAdapter } from '@/src/types/services/index'
import { fetcher } from '@/src/utils/fetcher'

export const createNestAuthAdapter = (): IAuthBaseAdapter => {
  const signIn = async (params: ISignInRequest): Promise<ISignInResponse> => {
    try {
      const response = await fetcher.post<ISignInResponse, ISignInRequest>(
        FETCH_URL.AUTH.SIGN_IN,
        params,
      )

      saveTokens(response.data)
      return response
    } catch (err) {
      throw err
    }
  }

  const signUp = async (params: ISignUpRequest): Promise<ISignUpResponse> => {
    try {
      const response = await fetcher.post<ISignUpResponse, ISignInRequest>(
        FETCH_URL.AUTH.SIGN_UP,
        params,
      )
      saveTokens(response.data)
      return response
    } catch (err) {
      throw err
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      await fetcher.delete(FETCH_URL.AUTH.SIGN_OUT)
      removeTokens()
    } catch (err) {
      throw err
    }
  }

  const getSession = async (): Promise<INestUserSession> => {
    try {
      return await fetcher.get<INestUserSession>(FETCH_URL.AUTH.GET_SESSION)
    } catch (err) {
      throw err
    }
  }

  const getUserInfo = async (): Promise<INestUserInfo> => {
    try {
      return await fetcher.get<INestUserInfo>(FETCH_URL.AUTH.GET_USER_INFO)
    } catch (err) {
      throw err
    }
  }

  const saveTokens = (response: ISignInResponse): void => {
    localStorage.setItem('accessToken', response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)
  }

  const removeTokens = (): void => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const deleteAvatarImage = (imageUrl: string): Promise<void> => {
    return Promise.resolve(undefined)
  }

  const updateUserInfo = (params: IUpdateUserInfo): Promise<void> => {
    return Promise.resolve(undefined)
  }

  const uploadAvatarImage = (params: IUploadAvatar): Promise<string> => {
    return Promise.resolve('')
  }

  return {
    signIn,
    signUp,
    signOut,
    getSession,
    getUserInfo,
    deleteAvatarImage,
    updateUserInfo,
    uploadAvatarImage,
  }
}
