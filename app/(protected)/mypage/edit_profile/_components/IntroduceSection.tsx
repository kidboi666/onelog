import TextArea from '@/components/shared/TextArea'
import Title from '@/components/shared/Title'
import useStateChange from '@/hooks/useStateChange'
import { ComponentProps } from 'react'

export default function IntroduceSection({
  value,
  onChange,
}: ComponentProps<'textarea'>) {
  const [ref, open, close] = useStateChange<HTMLDivElement>()
  return (
    <>
      <Title>소개글</Title>
      <div className="flex flex-col">
        <TextArea
          onFocus={() => open()}
          onBlur={() => close()}
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
