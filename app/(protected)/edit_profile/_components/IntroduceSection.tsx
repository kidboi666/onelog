import TextArea from '@/components/shared/TextArea'
import Title from '@/components/shared/Title'
import { ComponentProps } from 'react'

export default function IntroduceSection({
  value,
  onChange,
}: ComponentProps<'textarea'>) {
  return (
    <>
      <Title>소개글</Title>
      <TextArea value={value} onChange={onChange} />
    </>
  )
}
