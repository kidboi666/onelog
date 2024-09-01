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

export default function SignInPage() {
  const { mutate: signIn, isPending, isSuccess } = useSignIn()
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

  const handleSubmitSignIn = async (data: ISignIn) => {
    signIn(data, {
      onError: (error) => {
        setError('email', {
          type: 'validateError',
          message: error.message,
        })
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSignIn)}
      className="flex w-96 flex-col gap-4"
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
    </form>
  )
}
