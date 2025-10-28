import { useSignInOauth } from '@/src/services/mutates/auth/use-sign-in-oauth'
import useSignUp from '@/src/services/mutates/auth/use-sign-up'

export default function useSignUpState() {
  const {
    mutate: signUp,
    isPending: isEmailLoading,
    isSuccess: isEmailSuccess,
  } = useSignUp()
  const {
    mutate: signUpKakao,
    isPending: isKakaoLoading,
    isSuccess: isKakaoSuccess,
  } = useSignInOauth()

  const isAuthenticating = isEmailLoading || isKakaoLoading
  const isSuccess = isEmailSuccess || isKakaoSuccess

  return {
    signUp,
    signUpKakao,
    isAuthenticating,
    isEmailLoading,
    isKakaoLoading,
    isSuccess,
  }
}
