import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
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
    <div className="flex flex-col gap-2">
      <Title as="h2" type="sub" size="xs">
        {name}
      </Title>
      <label htmlFor={type} className="relative flex w-full flex-col">
        <Input
          variant="primary"
          placeholder={placeholder}
          type={type}
          register={register}
          error={error}
          className="mt-2"
        />
      </label>
      {error?.message && (
        <Text type="error" size="sm">
          {error.message}
        </Text>
      )}
    </div>
  )
}
