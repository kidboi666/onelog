'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '@/lib/validators/auth'
import { ISignIn } from '@/types/auth'

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmitSignIn = async (authData: ISignIn) => {}

  return (
    <>
      <input />
      <input />
    </>
  )
}
