import Input from '@/components/shared/Input'
import { ComponentProps } from 'react'

export default function TitleInput({
  value,
  onChange,
}: ComponentProps<'input'>) {
  return (
    <Input
      value={value}
      onChange={onChange}
      variant="none"
      dimension="lg"
      className="border-b border-gray-300 px-0 py-4 text-4xl text-gray-600 placeholder:text-gray-300 dark:bg-transparent dark:text-gray-300 dark:placeholder:text-gray-600"
      placeholder="제목을 입력하세요."
    />
  )
}
