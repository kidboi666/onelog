import Input from '@/components/shared/Input'
import Title from '@/components/shared/Title'
import useStateChange from '@/hooks/useStateChange'
import { ComponentProps } from 'react'

export default function NickNameSection({
  value,
  onChange,
}: ComponentProps<'input'>) {
  const [ref, open, close] = useStateChange<HTMLInputElement>()
  return (
    <>
      <Title>필명</Title>
      <div className="flex w-full flex-col">
        <Input
          onFocus={() => open()}
          onBlur={() => close()}
          variant="secondary"
          value={value}
          onChange={onChange}
        />
        <div
          ref={ref}
          data-status="closed"
          className="status-line data-line bg-gray-800"
        />
      </div>
    </>
  )
}
