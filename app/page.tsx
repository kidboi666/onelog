import Box from '@/components/shared/Box'
import Container from '@/components/shared/Container'
import LinkButton from '@/components/shared/LinkButton'
import Title from '@/components/shared/Title'
import Image from 'next/image'

export default function MainPage() {
  return (
    <Container className="flex h-screen w-full flex-col items-center justify-center md:flex-row">
      <Box className="relative h-80 w-full md:size-full">
        <Image
          src="logo_vertical.svg"
          fill
          alt="로고 이미지"
          className="object-fill"
        />
      </Box>

      <Box className="flex w-full flex-col justify-center gap-12 p-4">
        <Box className="flex flex-col gap-4">
          <Title>지금 가입하세요.</Title>
          <Title>당신의 글쓰기 루틴을 만드세요.</Title>
        </Box>
        <Box className="flex flex-col gap-4">
          <LinkButton href="/signup">가입하러 가기</LinkButton>
          <Title size="sm">이미 하루한줄에 가입하셨나요?</Title>
          <LinkButton href="/signin" variant="secondary">
            로그인하러 가기
          </LinkButton>
        </Box>
      </Box>
    </Container>
  )
}
