'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '@/lib/validators/auth'
import { ISignIn } from '@/types/auth'
import AuthForm from '../_components/AuthForm'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'
import useSignIn from '@/services/mutates/auth/useSignIn'
import LinkButton from '@/components/shared/LinkButton'
import Icon from '@/components/shared/Icon'
import { useSignInOAuth } from '@/services/mutates/auth/useSignInOAuth'

export default function SignInPage() {
  const { mutate: signIn, isPending, isSuccess } = useSignIn()
  const { mutate: signInOAuth } = useSignInOAuth()
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
      <LinkButton
        href="/signup"
        size="sm"
        variant="teritory"
        className="w-fit self-end"
      >
        가입하러 가기
      </LinkButton>
      <Button
        isLoading={isPending || isSuccess}
        disabled={isSuccess}
        type="submit"
      >
        로그인
      </Button>
      <Button
        onClick={handleSubmitOAuthSignIn}
        className="bg-var-yellow text-white"
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
  )
}
