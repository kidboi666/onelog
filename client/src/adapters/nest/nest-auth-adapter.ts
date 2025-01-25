'use client'

import { FETCH_URL } from '@/src/constants'
import {
  IAuthBaseAdapter,
  INestUserInfo,
  INestUserSession,
  ISignInRequest,
  ISignInResponse,
  ISignUpRequest,
  ISignUpResponse,
} from '@/src/types/auth'
import { fetcher } from '@/src/utils/fetcher'

export class NestAuthAdapter implements IAuthBaseAdapter {
  async signIn(params: ISignInRequest): Promise<ISignInResponse> {
    try {
      const response = await fetcher.post<ISignInResponse, ISignInRequest>(
        FETCH_URL.AUTH.SIGN_IN,
        params,
      )

      this.saveTokens(response.data)
      return response
    } catch (err) {
      throw err
    }
  }

  async signUp(params: ISignUpRequest): Promise<ISignUpResponse> {
    try {
      const response = await fetcher.post<ISignUpResponse, ISignInRequest>(
        FETCH_URL.AUTH.SIGN_UP,
        params,
      )
      this.saveTokens(response.data)
      return response
    } catch (err) {
      throw err
    }
  }

  async signOut(): Promise<void> {
    try {
      await fetcher.delete(FETCH_URL.AUTH.SIGN_OUT)
      this.removeTokens()
    } catch (err) {
      throw err
    }
  }

  async getSession(): Promise<INestUserSession> {
    try {
      return await fetcher.get<INestUserSession>(FETCH_URL.AUTH.GET_SESSION)
    } catch (err) {
      throw err
    }
  }

  async getUserInfo(): Promise<INestUserInfo> {
    try {
      return await fetcher.get<INestUserInfo>(FETCH_URL.AUTH.GET_USER_INFO)
    } catch (err) {
      throw err
    }
  }

  private saveTokens(response: ISignInResponse): void {
    localStorage.setItem('accessToken', response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)
  }

  private removeTokens(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}
