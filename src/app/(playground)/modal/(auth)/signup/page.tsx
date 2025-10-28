'use client'

import { signUpSchema } from '@/src/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ISignUp } from '@/src/types/dtos/auth'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import Modal from '@/src/components/Modal'
import { YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'
import useSignUpState from '@/src/app/(playground)/modal/_hooks/useSignUpState'
import AuthForm from '../../_components/AuthForm'

export default function SignUpModal() {
  const router = useRouter()
  const {
    signUp,
    signUpKakao,
    isKakaoLoading,
    isSuccess,
    isEmailLoading,
    isAuthenticating,
  } = useSignUpState()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      userName: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const handleSubmitSignUp = async (data: ISignUp) => {
    signUp(data, {
      onError: (error) => {
        console.error(error)
        setError('email', {
          type: 'validate',
          message: error.message,
        })
      },
    })
  }

  const handleSubmitKakaoSignUp = () => {
    signUpKakao()
  }

  return (
    <Modal className="w-[420px]">
      <form onSubmit={handleSubmit(handleSubmitSignUp)} className="w-full">
        <YStack gap={4}>
          <Title>회원가입</Title>
          <AuthForm
            register={register('email')}
            error={errors.email}
            type="email"
            name="이메일"
          />
          <AuthForm
            register={register('userName')}
            error={errors.userName}
            type="userName"
            name="필명"
          />
          <AuthForm
            register={register('password')}
            error={errors.password}
            type="password"
            name="비밀번호"
          />
          <AuthForm
            register={register('passwordConfirmation')}
            error={errors.passwordConfirmation}
            type="password"
            name="비밀번호 확인"
          />
          <Button
            size="sm"
            variant="teritory"
            className="w-fit self-end px-0"
            onClick={() => router.replace('/modal/signin')}
          >
            로그인하러 가기
          </Button>
          <Button
            isLoading={isEmailLoading}
            disabled={isAuthenticating || isSuccess}
            type="submit"
          >
            회원가입
          </Button>{' '}
          <Button
            variant="kakao"
            isLoading={isKakaoLoading}
            disabled={isAuthenticating || isSuccess}
            onClick={handleSubmitKakaoSignUp}
          >
            <Icon size={20}>
              <path
                d="M11.6144 3C6.30451 3 2 6.48454 2 10.7831C2 13.5255 3.75623 15.9314 6.4034 17.3177L5.38748 20.7042C5.32567 20.9098 5.55504 21.0797 5.7336 20.9606L9.58943 18.3899C10.2428 18.5035 10.9194 18.5662 11.6144 18.5662C16.9243 18.5662 21.2288 15.0816 21.2288 10.7831C21.2288 6.48454 16.9243 3 11.6144 3Z"
                fill="currentColor"
              />
            </Icon>{' '}
            카카오로 가입
          </Button>
        </YStack>
      </form>
    </Modal>
  )
}
