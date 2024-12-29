'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import cn from '@/src/lib/cn';
import { signUpSchema } from '@/src/lib/validators/auth';
import { useSignInOAuth } from '@/src/services/mutates/auth/useSignInOAuth';
import useSignUp from '@/src/services/mutates/auth/useSignUp';
import { ISignUp } from '@/src/types/auth';
import Button from '@/src/components/Button';
import Icon from '@/src/components/Icon'
import Modal from '@/src/components/Modal'
import { YStack } from '@/src/components/Stack';
import Title from '@/src/components/Title';
import AuthForm from '../../_components/AuthForm';


export default function SignUpModal() {
  const router = useRouter()
  const {
    mutate: signUp,
    isPending: isNormalAuthPending,
    isSuccess: isNormalAuthSuccess,
  } = useSignUp()
  const {
    mutate: signUpOAuth,
    isPending: isOAuthPending,
    isSuccess: isOAuthSuccess,
  } = useSignInOAuth()
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
  const isPending = useMemo(
    () => isNormalAuthPending || isOAuthPending,
    [isNormalAuthPending, isOAuthPending],
  )
  const isSuccess = useMemo(
    () => isNormalAuthSuccess || isOAuthSuccess,
    [isNormalAuthSuccess, isOAuthSuccess],
  )

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

  const handleSubmitOAuthSignUp = () => {
    signUpOAuth()
  }

  return (
    <Modal className="w-[420px]">
      <form onSubmit={handleSubmit(handleSubmitSignUp)} className="w-full">
        <YStack gap={4}>
          <Title>회원가입</Title>
          <AuthForm register={register('email')} error={errors.email} type="email" name="이메일" />
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
            isLoading={isNormalAuthPending || isNormalAuthSuccess}
            disabled={isPending || isSuccess}
            type="submit"
          >
            회원가입
          </Button>{' '}
          <Button
            isLoading={isOAuthPending || isOAuthSuccess}
            disabled={isPending || isSuccess}
            onClick={handleSubmitOAuthSignUp}
            className={cn(
              'bg-var-yellow text-white ring-var-yellow dark:bg-var-yellow',
              isPending || isSuccess ? 'bg-gray-300 dark:bg-gray-500' : '',
            )}
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
