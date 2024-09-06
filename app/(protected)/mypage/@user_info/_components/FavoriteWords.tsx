import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Title from '@/components/shared/Title'
import { PropsWithChildren } from 'react'

interface Props {
  words?: string[]
}

export default function FavoriteWords({ words }: Props) {
  return (
    <Container className="flex flex-col gap-4">
      <Title>가장 많이 사용하는</Title>
      <Box className="flex gap-2">
        {words?.map((word) => <Tag key={word}>{word}</Tag>)}
      </Box>
    </Container>
  )
}

function Tag({ children }: PropsWithChildren) {
  return (
    <Box className="rounded-md border border-gray-300 px-4 py-1 text-xs text-gray-600 hover:bg-gray-100">
      {children}
    </Box>
  )
}
