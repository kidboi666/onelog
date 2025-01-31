'use client'

import { signInSchema } from '@/src/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ISignIn } from '@/src/types/dtos/auth'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import Modal from '@/src/components/Modal'
import { YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'
import useSignInState from '@/src/app/(playground)/modal/_hooks/useSignInState'
import AuthForm from '../../_components/AuthForm'

export default function SignInModal() {
  const router = useRouter()
  const {
    signIn,
    signInKakao,
    isAuthenticating,
    isKakaoLoading,
    isEmailLoading,
    isSuccess,
  } = useSignInState()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmitSignIn = (data: ISignIn) => {
    signIn(data, {
      onError: (error) => {
        console.error(error)
        setError('email', {
          type: 'validateError',
          message: error.message,
        })
      },
    })
  }

  const handleSubmitKakaoSignIn = () => {
    signInKakao()
  }

  return (
    <Modal className="w-[420px]">
      <form onSubmit={handleSubmit(handleSubmitSignIn)} className="w-full">
        <YStack gap={4}>
          <Title>로그인</Title>
          <AuthForm
            register={register('email')}
            error={errors.email}
            type="email"
            name="이메일"
          />
          <AuthForm
            register={register('password')}
            error={errors.password}
            type="password"
            name="비밀번호"
          />
          <Button
            size="sm"
            variant="teritory"
            className="w-fit self-end px-0"
            onClick={() => router.replace('/modal/signup')}
          >
            가입하러 가기
          </Button>
          <Button
            isLoading={isEmailLoading}
            disabled={isAuthenticating || isSuccess}
            type="submit"
          >
            로그인
          </Button>
          <Button
            variant="kakao"
            isLoading={isKakaoLoading}
            disabled={isAuthenticating || isSuccess}
            onClick={handleSubmitKakaoSignIn}
          >
            <Icon size={20}>
              <path
                d="M11.6144 3C6.30451 3 2 6.48454 2 10.7831C2 13.5255 3.75623 15.9314 6.4034 17.3177L5.38748 20.7042C5.32567 20.9098 5.55504 21.0797 5.7336 20.9606L9.58943 18.3899C10.2428 18.5035 10.9194 18.5662 11.6144 18.5662C16.9243 18.5662 21.2288 15.0816 21.2288 10.7831C21.2288 6.48454 16.9243 3 11.6144 3Z"
                fill="currentColor"
              />
            </Icon>
            카카오 로그인
          </Button>
        </YStack>
      </form>
    </Modal>
  )
}
