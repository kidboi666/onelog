'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '@/lib/validators/auth'
import { ISignUp } from '@/types/auth'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'
import AuthForm from '../_components/AuthForm'
import Link from 'next/link'
import { useSignUp } from '@/services/mutates/auth/useSignUp'

export default function SignUpPage() {
  const { mutate: signUp, isPending, isSuccess } = useSignUp()
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
      nickname: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const handleSubmitSignUp = async (data: ISignUp) => {
    signUp(data, {
      onError: (error) => {
        setError('email', {
          type: 'validate',
          message: error.message,
        })
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSignUp)}
      className="flex w-96 flex-col gap-2"
    >
      <Button size="sm" variant="teritory" className="w-fit">
        <Link href="/signin">로그인하러 가기</Link>
      </Button>
      <Title>회원가입</Title>
      <AuthForm
        register={register('email')}
        error={errors.email}
        type="email"
        name="이메일"
      />
      <AuthForm
        register={register('nickname')}
        error={errors.nickname}
        type="nickname"
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
      <Button isLoading={isPending} disabled={isSuccess} type="submit">
        회원가입
      </Button>
    </form>
  )
}
