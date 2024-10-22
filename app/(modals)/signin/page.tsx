'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import cn from '@/lib/cn'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignInOAuth } from '@/services/mutates/auth/useSignInOAuth'
import { signInSchema } from '@/lib/validators/auth'
import useSignIn from '@/services/mutates/auth/useSignIn'
import { ISignIn } from '@/types/auth'
import AuthForm from '../_components/AuthForm'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { useRouter } from 'next/navigation'
import Modal from '@/components/shared/Modal'

export default function SignInModal() {
  const router = useRouter()
  const {
    mutate: signIn,
    isPending: isNormalAuthPending,
    isSuccess: isNormalAuthSuccess,
  } = useSignIn()
  const {
    mutate: signInOAuth,
    isPending: isOAuthPending,
    isSuccess: isOAuthSuccess,
  } = useSignInOAuth()
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
  const isPending = useMemo(
    () => isNormalAuthPending || isOAuthPending,
    [isNormalAuthPending, isOAuthPending],
  )
  const isSuccess = useMemo(
    () => isNormalAuthSuccess || isOAuthSuccess,
    [isNormalAuthSuccess, isOAuthSuccess],
  )

  const handleSubmitSignIn = (data: ISignIn) => {
    signIn(data, {
      onError: (error) => {
        setError('email', {
          type: 'validateError',
          message: error.message,
        })
      },
    })
  }

  const handleSubmitOAuthSignIn = () => {
    signInOAuth()
  }

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(handleSubmitSignIn)}
        className="flex w-full flex-col gap-4 md:w-96"
      >
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
          className="w-fit self-end"
          onClick={() => router.replace('/signup')}
        >
          가입하러 가기
        </Button>
        <Button
          isLoading={isNormalAuthPending || isNormalAuthSuccess}
          disabled={isPending || isSuccess}
          type="submit"
        >
          로그인
        </Button>
        <Button
          isLoading={isOAuthPending || isOAuthSuccess}
          disabled={isPending || isSuccess}
          onClick={handleSubmitOAuthSignIn}
          className={cn(
            'bg-var-yellow text-white dark:bg-var-yellow',
            isPending || isSuccess ? 'bg-gray-300 dark:bg-gray-500' : '',
          )}
        >
          <Icon size={20}>
            <path
              d="M11.6144 3C6.30451 3 2 6.48454 2 10.7831C2 13.5255 3.75623 15.9314 6.4034 17.3177L5.38748 20.7042C5.32567 20.9098 5.55504 21.0797 5.7336 20.9606L9.58943 18.3899C10.2428 18.5035 10.9194 18.5662 11.6144 18.5662C16.9243 18.5662 21.2288 15.0816 21.2288 10.7831C21.2288 6.48454 16.9243 3 11.6144 3Z"
              fill="currentColor"
            />
          </Icon>
          카카오 로그인
        </Button>
      </form>
    </Modal>
  )
}
