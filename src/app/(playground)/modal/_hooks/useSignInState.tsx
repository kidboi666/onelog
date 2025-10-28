import useSignIn from '@/src/services/mutates/auth/use-sign-in'
import { useSignInOauth } from '@/src/services/mutates/auth/use-sign-in-oauth'

export default function useSignInState() {
  const {
    mutate: signIn,
    isPending: isEmailLoading,
    isSuccess: isEmailSuccess,
  } = useSignIn()
  const {
    mutate: signInKakao,
    isPending: isKakaoLoading,
    isSuccess: isKakaoSuccess,
  } = useSignInOauth()

  const isAuthenticating = isEmailLoading || isKakaoLoading
  const isSuccess = isEmailSuccess || isKakaoSuccess

  return {
    signIn,
    signInKakao,
    isAuthenticating,
    isSuccess,
    isEmailLoading,
    isKakaoLoading,
  }
}
