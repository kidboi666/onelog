import { ComponentProps } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import Input from '@/src/components/Input'
import { YStack } from '@/src/components/Stack'
import Text from '@/src/components/Text'
import Title from '@/src/components/Title'

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
    <YStack className="w-full">
      <Title as="h2" type="sub" size="xs">
        {name}
      </Title>
      <label htmlFor={type} className="relative">
        <Input
          variant="primary"
          placeholder={placeholder}
          type={type}
          register={register}
          error={error}
          className="mt-2 w-full"
        />
      </label>
      {error?.message && (
        <Text type="error" size="sm">
          {error.message}
        </Text>
      )}
    </YStack>
  )
}
