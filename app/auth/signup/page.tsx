'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '@/lib/validators/auth'
import { ISignIn } from '@/types/auth'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'
import AuthForm from '../_components/AuthForm'

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordCheck: '',
    },
  })

  const handleSubmitSignUp = async (authData: ISignIn) => {}

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSignUp)}
      className="flex w-96 flex-col gap-2"
    >
      <Title>회원가입</Title>
      <AuthForm
        register={register('email')}
        error={errors.email}
        type="email"
        name="이메일"
      />
      <AuthForm
        register={register('nickname')}
        error={errors.email}
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
        register={register('passwordCheck')}
        error={errors.password}
        type="password"
        name="비밀번호 확인"
      />
      <Button>로그인</Button>
    </form>
  )
}
