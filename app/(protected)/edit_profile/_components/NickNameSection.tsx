import Input from '@/components/shared/Input'
import Title from '@/components/shared/Title'
import { ComponentProps } from 'react'

export default function NickNameSection({
  value,
  onChange,
}: ComponentProps<'input'>) {
  return (
    <>
      <Title>필명</Title>
      <Input variant="secondary" value={value} onChange={onChange} />
    </>
  )
}
