import Container from '@/components/shared/Container'
import TextArea from '@/components/shared/TextArea'
import Title from '@/components/shared/Title'
import { ComponentProps } from 'react'

export default function IntroduceSection({
  value,
  onChange,
}: ComponentProps<'textarea'>) {
  return (
    <Container className="flex w-full flex-col gap-8">
      <Title>소개글</Title>
      <TextArea value={value} onChange={onChange} className="px-2 py-1" />
    </Container>
  )
}
