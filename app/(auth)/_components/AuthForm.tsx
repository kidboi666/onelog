import Container from '@/components/shared/Container'
import Input from '@/components/shared/Input'
import RefBox from '@/components/shared/RefBox'
import Text from '@/components/shared/Text'
import useStateChange from '@/hooks/useStateChange'
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
  const { ref, open, close } = useStateChange<HTMLDivElement>()
  return (
    <Container className="flex flex-col gap-2">
      <Text type="body">{name}</Text>
      <label
        htmlFor={type}
        onFocus={open}
        onBlur={close}
        className="relative flex w-full flex-col"
      >
        <Input
          variant="secondary"
          placeholder={placeholder}
          type={type}
          register={register}
          error={error}
          className="mt-2"
        />
        <RefBox
          ref={ref}
          dataStatus="closed"
          className="absolute -bottom-1 left-0 h-1 w-full origin-left bg-gray-800 transition ease-in-out data-[status=closed]:scale-x-0 dark:bg-gray-300"
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
