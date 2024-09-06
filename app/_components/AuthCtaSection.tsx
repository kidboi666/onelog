import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import LinkButton from '@/components/shared/LinkButton'
import Title from '@/components/shared/Title'

export default function AuthCtaSection() {
  return (
    <Container className="flex w-full justify-center">
      <Box className="flex w-96 flex-col gap-12 p-4">
        <Box className="flex flex-col gap-4">
          <Title>지금 가입하세요.</Title>
          <Title>당신의 글쓰기 루틴을 만드세요.</Title>
        </Box>
        <Box className="flex flex-col gap-4">
          <LinkButton href="/signup">가입하러 가기</LinkButton>
          <Title size="sm">이미 가입하셨나요?</Title>
          <LinkButton href="/signin" variant="secondary">
            로그인하러 가기
          </LinkButton>
        </Box>
      </Box>
    </Container>
  )
}
