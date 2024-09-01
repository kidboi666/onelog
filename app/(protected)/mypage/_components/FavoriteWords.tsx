import Title from '@/components/shared/Title'
import { PropsWithChildren } from 'react'

interface Props {
  words?: string[]
}

export default function FavoriteWords({ words }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Title>가장 많이 사용하는</Title>
      <div className="flex gap-2">
        {words?.map((word) => <Tag key={word}>{word}</Tag>)}
      </div>
    </div>
  )
}

function Tag({ children }: PropsWithChildren) {
  return (
    <div className="rounded-md border border-gray-300 px-4 py-1 text-xs text-gray-600 hover:bg-gray-100">
      {children}
    </div>
  )
}
