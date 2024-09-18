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
      className="border-b border-zinc-300 px-0 py-4 text-4xl text-zinc-600 placeholder:text-zinc-200 dark:border-zinc-600 dark:bg-transparent dark:text-zinc-200 dark:placeholder:text-zinc-600"
      placeholder="제목을 입력하세요."
    />
  )
}
