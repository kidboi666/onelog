import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import { ComponentProps } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface Props extends ComponentProps<'input'> {
  register: UseFormRegisterReturn
  error?: FieldError
}

export default function AuthForm({
  placeholder,
  type,
  name,
  register,
  error,
}: Props) {
  return (
    <label htmlFor={type} className="flex w-full flex-col gap-2">
      {name}
      <Input
        variant="auth"
        placeholder={placeholder}
        type={type}
        register={register}
        error={error}
        className="p-2"
      />
      {error?.message && (
        <Text type="error" size="sm">
          {error.message}
        </Text>
      )}
    </label>
  )
}
