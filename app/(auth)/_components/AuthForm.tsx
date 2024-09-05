import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import { ComponentProps, useRef } from 'react'
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
  const lineRef = useRef<HTMLDivElement>(null)
  const handleFocus = () => {
    if (lineRef.current) {
      lineRef.current.setAttribute('data-status', 'onFocus')
    }
  }

  const handleBlur = () => {
    if (lineRef.current) {
      lineRef.current.setAttribute('data-status', 'onBlur')
    }
  }
  return (
    <Container className="flex flex-col gap-2">
      <Text type="caption">{name}</Text>
      <label
        htmlFor={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="relative flex w-full flex-col overflow-hidden rounded-b-md"
      >
        <Input
          variant="auth"
          placeholder={placeholder}
          type={type}
          register={register}
          error={error}
          className="p-2"
        />
        <Box
          ref={lineRef}
          dataStatus="onBlur"
          className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gray-300 transition ease-in-out data-[status=onBlur]:scale-x-0"
        />
      </label>
      {error?.message && (
        <Text type="error" size="sm">
          {error.message}
        </Text>
      )}
    </Container>
  )
}
