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
    <>
      {name}
      <label
        htmlFor={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="flex w-full flex-col"
      >
        <Input
          variant="auth"
          placeholder={placeholder}
          type={type}
          register={register}
          error={error}
          className="p-2"
        />
        <div
          ref={lineRef}
          data-status="onBlur"
          className="h-1 origin-left bg-gray-300 transition ease-in-out data-[status=onBlur]:scale-x-0"
        />
        {error?.message && (
          <Text type="error" size="sm">
            {error.message}
          </Text>
        )}
      </label>
    </>
  )
}
