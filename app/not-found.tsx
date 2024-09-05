import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container>
      <Box>이 페이지는 존재하지 않습니다. 다른 페이지를 검색해 보세요.</Box>
      <Link href="/search">검색</Link>
    </Container>
  )
}
