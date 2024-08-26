import Title from '@/components/shared/Title'
import { PropsWithChildren } from 'react'

const mock = ['무력하다', '블로그', '도서관', '책읽기', '쉬고싶다']

export default function FavoriteWords() {
  return (
    <div className="flex flex-col gap-4">
      <Title>가장 많이 사용하는</Title>
      <div className="flex gap-2">
        {mock.map((word) => (
          <Tag>{word}</Tag>
        ))}
      </div>
    </div>
  )
}

function Tag({ children }: PropsWithChildren) {
  return (
    <div className="rounded-md border border-gray-300 px-4 py-1 text-xs text-gray-600">
      {children}
    </div>
  )
}
